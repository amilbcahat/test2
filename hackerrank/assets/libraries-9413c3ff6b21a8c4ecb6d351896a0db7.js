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
}(window.jQuery), function($, undefined) {
var alreadyInitialized = function() {
var events = $._data(document, "events");
return events && events.click && $.grep(events.click, function(e) {
return "rails" === e.namespace;
}).length;
};
alreadyInitialized() && $.error("jquery-ujs has already been loaded!");
var rails;
$.rails = rails = {
linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",
formSubmitSelector:"form",
formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
fileInputSelector:"input:file",
linkDisableSelector:"a[data-disable-with]",
CSRFProtection:function(xhr) {
var token = $('meta[name="csrf-token"]').attr("content");
token && xhr.setRequestHeader("X-CSRF-Token", token);
},
fire:function(obj, name, data) {
var event = $.Event(name);
return obj.trigger(event, data), event.result !== !1;
},
confirm:function(message) {
return confirm(message);
},
ajax:function(options) {
return $.ajax(options);
},
href:function(element) {
return element.attr("href");
},
handleRemote:function(element) {
var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;
if (rails.fire(element, "ajax:before")) {
if (elCrossDomain = element.data("cross-domain"), crossDomain = elCrossDomain === undefined ? null :elCrossDomain, 
withCredentials = element.data("with-credentials") || null, dataType = element.data("type") || $.ajaxSettings && $.ajaxSettings.dataType, 
element.is("form")) {
method = element.attr("method"), url = element.attr("action"), data = element.serializeArray();
var button = element.data("ujs:submit-button");
button && (data.push(button), element.data("ujs:submit-button", null));
} else element.is(rails.inputChangeSelector) ? (method = element.data("method"), 
url = element.data("url"), data = element.serialize(), element.data("params") && (data = data + "&" + element.data("params"))) :(method = element.data("method"), 
url = rails.href(element), data = element.data("params") || null);
options = {
type:method || "GET",
data:data,
dataType:dataType,
beforeSend:function(xhr, settings) {
return settings.dataType === undefined && xhr.setRequestHeader("accept", "*/*;q=0.5, " + settings.accepts.script), 
rails.fire(element, "ajax:beforeSend", [ xhr, settings ]);
},
success:function(data, status, xhr) {
element.trigger("ajax:success", [ data, status, xhr ]);
},
complete:function(xhr, status) {
element.trigger("ajax:complete", [ xhr, status ]);
},
error:function(xhr, status, error) {
element.trigger("ajax:error", [ xhr, status, error ]);
},
xhrFields:{
withCredentials:withCredentials
},
crossDomain:crossDomain
}, url && (options.url = url);
var jqxhr = rails.ajax(options);
return element.trigger("ajax:send", jqxhr), jqxhr;
}
return !1;
},
handleMethod:function(link) {
var href = rails.href(link), method = link.data("method"), target = link.attr("target"), csrf_token = $("meta[name=csrf-token]").attr("content"), csrf_param = $("meta[name=csrf-param]").attr("content"), form = $('<form method="post" action="' + href + '"></form>'), metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';
csrf_param !== undefined && csrf_token !== undefined && (metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />'), 
target && form.attr("target", target), form.hide().append(metadata_input).appendTo("body"), 
form.submit();
},
disableFormElements:function(form) {
form.find(rails.disableSelector).each(function() {
var element = $(this), method = element.is("button") ? "html" :"val";
element.data("ujs:enable-with", element[method]()), element[method](element.data("disable-with")), 
element.prop("disabled", !0);
});
},
enableFormElements:function(form) {
form.find(rails.enableSelector).each(function() {
var element = $(this), method = element.is("button") ? "html" :"val";
element.data("ujs:enable-with") && element[method](element.data("ujs:enable-with")), 
element.prop("disabled", !1);
});
},
allowAction:function(element) {
var callback, message = element.data("confirm"), answer = !1;
return message ? (rails.fire(element, "confirm") && (answer = rails.confirm(message), 
callback = rails.fire(element, "confirm:complete", [ answer ])), answer && callback) :!0;
},
blankInputs:function(form, specifiedSelector, nonBlank) {
var input, valueToCheck, inputs = $(), selector = specifiedSelector || "input,textarea", allInputs = form.find(selector);
return allInputs.each(function() {
if (input = $(this), valueToCheck = input.is(":checkbox,:radio") ? input.is(":checked") :input.val(), 
!valueToCheck == !nonBlank) {
if (input.is(":radio") && allInputs.filter('input:radio:checked[name="' + input.attr("name") + '"]').length) return !0;
inputs = inputs.add(input);
}
}), inputs.length ? inputs :!1;
},
nonBlankInputs:function(form, specifiedSelector) {
return rails.blankInputs(form, specifiedSelector, !0);
},
stopEverything:function(e) {
return $(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), 
!1;
},
callFormSubmitBindings:function(form, event) {
var events = form.data("events"), continuePropagation = !0;
return events !== undefined && events.submit !== undefined && $.each(events.submit, function(i, obj) {
return "function" == typeof obj.handler ? continuePropagation = obj.handler(event) :void 0;
}), continuePropagation;
},
disableElement:function(element) {
element.data("ujs:enable-with", element.html()), element.html(element.data("disable-with")), 
element.bind("click.railsDisable", function(e) {
return rails.stopEverything(e);
});
},
enableElement:function(element) {
element.data("ujs:enable-with") !== undefined && (element.html(element.data("ujs:enable-with")), 
element.data("ujs:enable-with", !1)), element.unbind("click.railsDisable");
}
}, rails.fire($(document), "rails:attachBindings") && ($.ajaxPrefilter(function(options, originalOptions, xhr) {
options.crossDomain || rails.CSRFProtection(xhr);
}), $(document).delegate(rails.linkDisableSelector, "ajax:complete", function() {
rails.enableElement($(this));
}), $(document).delegate(rails.linkClickSelector, "click.rails", function(e) {
var link = $(this), method = link.data("method"), data = link.data("params");
if (!rails.allowAction(link)) return rails.stopEverything(e);
if (link.is(rails.linkDisableSelector) && rails.disableElement(link), link.data("remote") !== undefined) {
if (!(!e.metaKey && !e.ctrlKey || method && "GET" !== method || data)) return !0;
var handleRemote = rails.handleRemote(link);
return handleRemote === !1 ? rails.enableElement(link) :handleRemote.error(function() {
rails.enableElement(link);
}), !1;
}
return link.data("method") ? (rails.handleMethod(link), !1) :void 0;
}), $(document).delegate(rails.inputChangeSelector, "change.rails", function(e) {
var link = $(this);
return rails.allowAction(link) ? (rails.handleRemote(link), !1) :rails.stopEverything(e);
}), $(document).delegate(rails.formSubmitSelector, "submit.rails", function(e) {
var form = $(this), remote = form.data("remote") !== undefined, blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector), nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
if (!rails.allowAction(form)) return rails.stopEverything(e);
if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, "ajax:aborted:required", [ blankRequiredInputs ])) return rails.stopEverything(e);
if (remote) {
if (nonBlankFileInputs) {
setTimeout(function() {
rails.disableFormElements(form);
}, 13);
var aborted = rails.fire(form, "ajax:aborted:file", [ nonBlankFileInputs ]);
return aborted || setTimeout(function() {
rails.enableFormElements(form);
}, 13), aborted;
}
return !$.support.submitBubbles && $().jquery < "1.7" && rails.callFormSubmitBindings(form, e) === !1 ? rails.stopEverything(e) :(rails.handleRemote(form), 
!1);
}
setTimeout(function() {
rails.disableFormElements(form);
}, 13);
}), $(document).delegate(rails.formInputClickSelector, "click.rails", function(event) {
var button = $(this);
if (!rails.allowAction(button)) return rails.stopEverything(event);
var name = button.attr("name"), data = name ? {
name:name,
value:button.val()
} :null;
button.closest("form").data("ujs:submit-button", data);
}), $(document).delegate(rails.formSubmitSelector, "ajax:beforeSend.rails", function(event) {
this == event.target && rails.disableFormElements($(this));
}), $(document).delegate(rails.formSubmitSelector, "ajax:complete.rails", function(event) {
this == event.target && rails.enableFormElements($(this));
}), $(function() {
csrf_token = $("meta[name=csrf-token]").attr("content"), csrf_param = $("meta[name=csrf-param]").attr("content"), 
$('form input[name="' + csrf_param + '"]').val(csrf_token);
}));
}(jQuery), /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.effects.core.js, jquery.effects.blind.js, jquery.effects.bounce.js, jquery.effects.clip.js, jquery.effects.drop.js, jquery.effects.explode.js, jquery.effects.fade.js, jquery.effects.fold.js, jquery.effects.highlight.js, jquery.effects.pulsate.js, jquery.effects.scale.js, jquery.effects.shake.js, jquery.effects.slide.js, jquery.effects.transfer.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.tabs.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
function($, undefined) {
function focusable(element, isTabIndexNotNaN) {
var nodeName = element.nodeName.toLowerCase();
if ("area" === nodeName) {
var img, map = element.parentNode, mapName = map.name;
return element.href && mapName && "map" === map.nodeName.toLowerCase() ? (img = $("img[usemap=#" + mapName + "]")[0], 
!!img && visible(img)) :!1;
}
return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled :"a" == nodeName ? element.href || isTabIndexNotNaN :isTabIndexNotNaN) && visible(element);
}
function visible(element) {
return !$(element).parents().andSelf().filter(function() {
return "hidden" === $.curCSS(this, "visibility") || $.expr.filters.hidden(this);
}).length;
}
$.ui = $.ui || {}, $.ui.version || ($.extend($.ui, {
version:"1.8.23",
keyCode:{
ALT:18,
BACKSPACE:8,
CAPS_LOCK:20,
COMMA:188,
COMMAND:91,
COMMAND_LEFT:91,
COMMAND_RIGHT:93,
CONTROL:17,
DELETE:46,
DOWN:40,
END:35,
ENTER:13,
ESCAPE:27,
HOME:36,
INSERT:45,
LEFT:37,
MENU:93,
NUMPAD_ADD:107,
NUMPAD_DECIMAL:110,
NUMPAD_DIVIDE:111,
NUMPAD_ENTER:108,
NUMPAD_MULTIPLY:106,
NUMPAD_SUBTRACT:109,
PAGE_DOWN:34,
PAGE_UP:33,
PERIOD:190,
RIGHT:39,
SHIFT:16,
SPACE:32,
TAB:9,
UP:38,
WINDOWS:91
}
}), $.fn.extend({
propAttr:$.fn.prop || $.fn.attr,
_focus:$.fn.focus,
focus:function(delay, fn) {
return "number" == typeof delay ? this.each(function() {
var elem = this;
setTimeout(function() {
$(elem).focus(), fn && fn.call(elem);
}, delay);
}) :this._focus.apply(this, arguments);
},
scrollParent:function() {
var scrollParent;
return scrollParent = $.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
return /(relative|absolute|fixed)/.test($.curCSS(this, "position", 1)) && /(auto|scroll)/.test($.curCSS(this, "overflow", 1) + $.curCSS(this, "overflow-y", 1) + $.curCSS(this, "overflow-x", 1));
}).eq(0) :this.parents().filter(function() {
return /(auto|scroll)/.test($.curCSS(this, "overflow", 1) + $.curCSS(this, "overflow-y", 1) + $.curCSS(this, "overflow-x", 1));
}).eq(0), /fixed/.test(this.css("position")) || !scrollParent.length ? $(document) :scrollParent;
},
zIndex:function(zIndex) {
if (zIndex !== undefined) return this.css("zIndex", zIndex);
if (this.length) for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document; ) {
if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), 
!isNaN(value) && 0 !== value)) return value;
elem = elem.parent();
}
return 0;
},
disableSelection:function() {
return this.bind(($.support.selectstart ? "selectstart" :"mousedown") + ".ui-disableSelection", function(event) {
event.preventDefault();
});
},
enableSelection:function() {
return this.unbind(".ui-disableSelection");
}
}), $("<a>").outerWidth(1).jquery || $.each([ "Width", "Height" ], function(i, name) {
function reduce(elem, size, border, margin) {
return $.each(side, function() {
size -= parseFloat($.curCSS(elem, "padding" + this, !0)) || 0, border && (size -= parseFloat($.curCSS(elem, "border" + this + "Width", !0)) || 0), 
margin && (size -= parseFloat($.curCSS(elem, "margin" + this, !0)) || 0);
}), size;
}
var side = "Width" === name ? [ "Left", "Right" ] :[ "Top", "Bottom" ], type = name.toLowerCase(), orig = {
innerWidth:$.fn.innerWidth,
innerHeight:$.fn.innerHeight,
outerWidth:$.fn.outerWidth,
outerHeight:$.fn.outerHeight
};
$.fn["inner" + name] = function(size) {
return size === undefined ? orig["inner" + name].call(this) :this.each(function() {
$(this).css(type, reduce(this, size) + "px");
});
}, $.fn["outer" + name] = function(size, margin) {
return "number" != typeof size ? orig["outer" + name].call(this, size) :this.each(function() {
$(this).css(type, reduce(this, size, !0, margin) + "px");
});
};
}), $.extend($.expr[":"], {
data:$.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
return function(elem) {
return !!$.data(elem, dataName);
};
}) :function(elem, i, match) {
return !!$.data(elem, match[3]);
},
focusable:function(element) {
return focusable(element, !isNaN($.attr(element, "tabindex")));
},
tabbable:function(element) {
var tabIndex = $.attr(element, "tabindex"), isTabIndexNaN = isNaN(tabIndex);
return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}
}), $(function() {
var body = document.body, div = body.appendChild(div = document.createElement("div"));
div.offsetHeight, $.extend(div.style, {
minHeight:"100px",
height:"auto",
padding:0,
borderWidth:0
}), $.support.minHeight = 100 === div.offsetHeight, $.support.selectstart = "onselectstart" in div, 
body.removeChild(div).style.display = "none";
}), $.curCSS || ($.curCSS = $.css), $.extend($.ui, {
plugin:{
add:function(module, option, set) {
var proto = $.ui[module].prototype;
for (var i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([ option, set[i] ]);
},
call:function(instance, name, args) {
var set = instance.plugins[name];
if (set && instance.element[0].parentNode) for (var i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args);
}
},
contains:function(a, b) {
return document.compareDocumentPosition ? 16 & a.compareDocumentPosition(b) :a !== b && a.contains(b);
},
hasScroll:function(el, a) {
if ("hidden" === $(el).css("overflow")) return !1;
var scroll = a && "left" === a ? "scrollLeft" :"scrollTop", has = !1;
return el[scroll] > 0 ? !0 :(el[scroll] = 1, has = el[scroll] > 0, el[scroll] = 0, 
has);
},
isOverAxis:function(x, reference, size) {
return x > reference && reference + size > x;
},
isOver:function(y, x, top, left, height, width) {
return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width);
}
}));
}(jQuery), function($, undefined) {
if ($.cleanData) {
var _cleanData = $.cleanData;
$.cleanData = function(elems) {
for (var elem, i = 0; null != (elem = elems[i]); i++) try {
$(elem).triggerHandler("remove");
} catch (e) {}
_cleanData(elems);
};
} else {
var _remove = $.fn.remove;
$.fn.remove = function(selector, keepData) {
return this.each(function() {
return keepData || (!selector || $.filter(selector, [ this ]).length) && $("*", this).add([ this ]).each(function() {
try {
$(this).triggerHandler("remove");
} catch (e) {}
}), _remove.call($(this), selector, keepData);
});
};
}
$.widget = function(name, base, prototype) {
var fullName, namespace = name.split(".")[0];
name = name.split(".")[1], fullName = namespace + "-" + name, prototype || (prototype = base, 
base = $.Widget), $.expr[":"][fullName] = function(elem) {
return !!$.data(elem, name);
}, $[namespace] = $[namespace] || {}, $[namespace][name] = function(options, element) {
arguments.length && this._createWidget(options, element);
};
var basePrototype = new base();
basePrototype.options = $.extend(!0, {}, basePrototype.options), $[namespace][name].prototype = $.extend(!0, basePrototype, {
namespace:namespace,
widgetName:name,
widgetEventPrefix:$[namespace][name].prototype.widgetEventPrefix || name,
widgetBaseClass:fullName
}, prototype), $.widget.bridge(name, $[namespace][name]);
}, $.widget.bridge = function(name, object) {
$.fn[name] = function(options) {
var isMethodCall = "string" == typeof options, args = Array.prototype.slice.call(arguments, 1), returnValue = this;
return options = !isMethodCall && args.length ? $.extend.apply(null, [ !0, options ].concat(args)) :options, 
isMethodCall && "_" === options.charAt(0) ? returnValue :(isMethodCall ? this.each(function() {
var instance = $.data(this, name), methodValue = instance && $.isFunction(instance[options]) ? instance[options].apply(instance, args) :instance;
return methodValue !== instance && methodValue !== undefined ? (returnValue = methodValue, 
!1) :void 0;
}) :this.each(function() {
var instance = $.data(this, name);
instance ? instance.option(options || {})._init() :$.data(this, name, new object(options, this));
}), returnValue);
};
}, $.Widget = function(options, element) {
arguments.length && this._createWidget(options, element);
}, $.Widget.prototype = {
widgetName:"widget",
widgetEventPrefix:"",
options:{
disabled:!1
},
_createWidget:function(options, element) {
$.data(element, this.widgetName, this), this.element = $(element), this.options = $.extend(!0, {}, this.options, this._getCreateOptions(), options);
var self = this;
this.element.bind("remove." + this.widgetName, function() {
self.destroy();
}), this._create(), this._trigger("create"), this._init();
},
_getCreateOptions:function() {
return $.metadata && $.metadata.get(this.element[0])[this.widgetName];
},
_create:function() {},
_init:function() {},
destroy:function() {
this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled");
},
widget:function() {
return this.element;
},
option:function(key, value) {
var options = key;
if (0 === arguments.length) return $.extend({}, this.options);
if ("string" == typeof key) {
if (value === undefined) return this.options[key];
options = {}, options[key] = value;
}
return this._setOptions(options), this;
},
_setOptions:function(options) {
var self = this;
return $.each(options, function(key, value) {
self._setOption(key, value);
}), this;
},
_setOption:function(key, value) {
return this.options[key] = value, "disabled" === key && this.widget()[value ? "addClass" :"removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", value), 
this;
},
enable:function() {
return this._setOption("disabled", !1);
},
disable:function() {
return this._setOption("disabled", !0);
},
_trigger:function(type, event, data) {
var prop, orig, callback = this.options[type];
if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type :this.widgetEventPrefix + type).toLowerCase(), 
event.target = this.element[0], orig = event.originalEvent) for (prop in orig) prop in event || (event[prop] = orig[prop]);
return this.element.trigger(event, data), !($.isFunction(callback) && callback.call(this.element[0], event, data) === !1 || event.isDefaultPrevented());
}
};
}(jQuery), function($) {
var mouseHandled = !1;
$(document).mouseup(function() {
mouseHandled = !1;
}), $.widget("ui.mouse", {
options:{
cancel:":input,option",
distance:1,
delay:0
},
_mouseInit:function() {
var self = this;
this.element.bind("mousedown." + this.widgetName, function(event) {
return self._mouseDown(event);
}).bind("click." + this.widgetName, function(event) {
return !0 === $.data(event.target, self.widgetName + ".preventClickEvent") ? ($.removeData(event.target, self.widgetName + ".preventClickEvent"), 
event.stopImmediatePropagation(), !1) :void 0;
}), this.started = !1;
},
_mouseDestroy:function() {
this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
},
_mouseDown:function(event) {
if (!mouseHandled) {
this._mouseStarted && this._mouseUp(event), this._mouseDownEvent = event;
var self = this, btnIsLeft = 1 == event.which, elIsCancel = "string" == typeof this.options.cancel && event.target.nodeName ? $(event.target).closest(this.options.cancel).length :!1;
return btnIsLeft && !elIsCancel && this._mouseCapture(event) ? (this.mouseDelayMet = !this.options.delay, 
this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
self.mouseDelayMet = !0;
}, this.options.delay)), this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(event) !== !1, 
!this._mouseStarted) ? (event.preventDefault(), !0) :(!0 === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"), 
this._mouseMoveDelegate = function(event) {
return self._mouseMove(event);
}, this._mouseUpDelegate = function(event) {
return self._mouseUp(event);
}, $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
event.preventDefault(), mouseHandled = !0, !0)) :!0;
}
},
_mouseMove:function(event) {
return !$.browser.msie || document.documentMode >= 9 || event.button ? this._mouseStarted ? (this._mouseDrag(event), 
event.preventDefault()) :(this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== !1, 
this._mouseStarted ? this._mouseDrag(event) :this._mouseUp(event)), !this._mouseStarted) :this._mouseUp(event);
},
_mouseUp:function(event) {
return $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
this._mouseStarted && (this._mouseStarted = !1, event.target == this._mouseDownEvent.target && $.data(event.target, this.widgetName + ".preventClickEvent", !0), 
this._mouseStop(event)), !1;
},
_mouseDistanceMet:function(event) {
return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
},
_mouseDelayMet:function() {
return this.mouseDelayMet;
},
_mouseStart:function() {},
_mouseDrag:function() {},
_mouseStop:function() {},
_mouseCapture:function() {
return !0;
}
});
}(jQuery), function($) {
$.widget("ui.draggable", $.ui.mouse, {
widgetEventPrefix:"drag",
options:{
addClasses:!0,
appendTo:"parent",
axis:!1,
connectToSortable:!1,
containment:!1,
cursor:"auto",
cursorAt:!1,
grid:!1,
handle:!1,
helper:"original",
iframeFix:!1,
opacity:!1,
refreshPositions:!1,
revert:!1,
revertDuration:500,
scope:"default",
scroll:!0,
scrollSensitivity:20,
scrollSpeed:20,
snap:!1,
snapMode:"both",
snapTolerance:20,
stack:!1,
zIndex:!1
},
_create:function() {
"original" != this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), 
this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), 
this._mouseInit();
},
destroy:function() {
return this.element.data("draggable") ? (this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), 
this._mouseDestroy(), this) :void 0;
},
_mouseCapture:function(event) {
var o = this.options;
return this.helper || o.disabled || $(event.target).is(".ui-resizable-handle") ? !1 :(this.handle = this._getHandle(event), 
this.handle ? (o.iframeFix && $(o.iframeFix === !0 ? "iframe" :o.iframeFix).each(function() {
$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
width:this.offsetWidth + "px",
height:this.offsetHeight + "px",
position:"absolute",
opacity:"0.001",
zIndex:1e3
}).css($(this).offset()).appendTo("body");
}), !0) :!1);
},
_mouseStart:function(event) {
var o = this.options;
return this.helper = this._createHelper(event), this.helper.addClass("ui-draggable-dragging"), 
this._cacheHelperProportions(), $.ui.ddmanager && ($.ui.ddmanager.current = this), 
this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), 
this.offset = this.positionAbs = this.element.offset(), this.offset = {
top:this.offset.top - this.margins.top,
left:this.offset.left - this.margins.left
}, $.extend(this.offset, {
click:{
left:event.pageX - this.offset.left,
top:event.pageY - this.offset.top
},
parent:this._getParentOffset(),
relative:this._getRelativeOffset()
}), this.originalPosition = this.position = this._generatePosition(event), this.originalPageX = event.pageX, 
this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), 
o.containment && this._setContainment(), this._trigger("start", event) === !1 ? (this._clear(), 
!1) :(this._cacheHelperProportions(), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), 
this._mouseDrag(event, !0), $.ui.ddmanager && $.ui.ddmanager.dragStart(this, event), 
!0);
},
_mouseDrag:function(event, noPropagation) {
if (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"), 
!noPropagation) {
var ui = this._uiHash();
if (this._trigger("drag", event, ui) === !1) return this._mouseUp({}), !1;
this.position = ui.position;
}
return this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
$.ui.ddmanager && $.ui.ddmanager.drag(this, event), !1;
},
_mouseStop:function(event) {
var dropped = !1;
$.ui.ddmanager && !this.options.dropBehaviour && (dropped = $.ui.ddmanager.drop(this, event)), 
this.dropped && (dropped = this.dropped, this.dropped = !1);
for (var element = this.element[0], elementInDom = !1; element && (element = element.parentNode); ) element == document && (elementInDom = !0);
if (!elementInDom && "original" === this.options.helper) return !1;
if ("invalid" == this.options.revert && !dropped || "valid" == this.options.revert && dropped || this.options.revert === !0 || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped)) {
var self = this;
$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
self._trigger("stop", event) !== !1 && self._clear();
});
} else this._trigger("stop", event) !== !1 && this._clear();
return !1;
},
_mouseUp:function(event) {
return this.options.iframeFix === !0 && $("div.ui-draggable-iframeFix").each(function() {
this.parentNode.removeChild(this);
}), $.ui.ddmanager && $.ui.ddmanager.dragStop(this, event), $.ui.mouse.prototype._mouseUp.call(this, event);
},
cancel:function() {
return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) :this._clear(), 
this;
},
_getHandle:function(event) {
var handle = this.options.handle && $(this.options.handle, this.element).length ? !1 :!0;
return $(this.options.handle, this.element).find("*").andSelf().each(function() {
this == event.target && (handle = !0);
}), handle;
},
_createHelper:function(event) {
var o = this.options, helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [ event ])) :"clone" == o.helper ? this.element.clone().removeAttr("id") :this.element;
return helper.parents("body").length || helper.appendTo("parent" == o.appendTo ? this.element[0].parentNode :o.appendTo), 
helper[0] == this.element[0] || /(fixed|absolute)/.test(helper.css("position")) || helper.css("position", "absolute"), 
helper;
},
_adjustOffsetFromHelper:function(obj) {
"string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
left:+obj[0],
top:+obj[1] || 0
}), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), 
"top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
},
_getParentOffset:function() {
this.offsetParent = this.helper.offsetParent();
var po = this.offsetParent.offset();
return "absolute" == this.cssPosition && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), 
po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && $.browser.msie) && (po = {
top:0,
left:0
}), {
top:po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
left:po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
};
},
_getRelativeOffset:function() {
if ("relative" == this.cssPosition) {
var p = this.element.position();
return {
top:p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
left:p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
};
}
return {
top:0,
left:0
};
},
_cacheMargins:function() {
this.margins = {
left:parseInt(this.element.css("marginLeft"), 10) || 0,
top:parseInt(this.element.css("marginTop"), 10) || 0,
right:parseInt(this.element.css("marginRight"), 10) || 0,
bottom:parseInt(this.element.css("marginBottom"), 10) || 0
};
},
_cacheHelperProportions:function() {
this.helperProportions = {
width:this.helper.outerWidth(),
height:this.helper.outerHeight()
};
},
_setContainment:function() {
var o = this.options;
if ("parent" == o.containment && (o.containment = this.helper[0].parentNode), ("document" == o.containment || "window" == o.containment) && (this.containment = [ "document" == o.containment ? 0 :$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == o.containment ? 0 :$(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == o.containment ? 0 :$(window).scrollLeft()) + $("document" == o.containment ? document :window).width() - this.helperProportions.width - this.margins.left, ("document" == o.containment ? 0 :$(window).scrollTop()) + ($("document" == o.containment ? document :window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
/^(document|window|parent)$/.test(o.containment) || o.containment.constructor == Array) o.containment.constructor == Array && (this.containment = o.containment); else {
var c = $(o.containment), ce = c[0];
if (!ce) return;
var over = (c.offset(), "hidden" != $(ce).css("overflow"));
this.containment = [ (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0), (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0), (over ? Math.max(ce.scrollWidth, ce.offsetWidth) :ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (over ? Math.max(ce.scrollHeight, ce.offsetHeight) :ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
this.relative_container = c;
}
},
_convertPositionTo:function(d, pos) {
pos || (pos = this.position);
var mod = "absolute" == d ? 1 :-1, scroll = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent), scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
return {
top:pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()) * mod),
left:pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft()) * mod)
};
},
_generatePosition:function(event) {
var o = this.options, scroll = "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName), pageX = event.pageX, pageY = event.pageY;
if (this.originalPosition) {
var containment;
if (this.containment) {
if (this.relative_container) {
var co = this.relative_container.offset();
containment = [ this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top ];
} else containment = this.containment;
event.pageX - this.offset.click.left < containment[0] && (pageX = containment[0] + this.offset.click.left), 
event.pageY - this.offset.click.top < containment[1] && (pageY = containment[1] + this.offset.click.top), 
event.pageX - this.offset.click.left > containment[2] && (pageX = containment[2] + this.offset.click.left), 
event.pageY - this.offset.click.top > containment[3] && (pageY = containment[3] + this.offset.click.top);
}
if (o.grid) {
var top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] :this.originalPageY;
pageY = containment ? top - this.offset.click.top < containment[1] || top - this.offset.click.top > containment[3] ? top - this.offset.click.top < containment[1] ? top + o.grid[1] :top - o.grid[1] :top :top;
var left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] :this.originalPageX;
pageX = containment ? left - this.offset.click.left < containment[0] || left - this.offset.click.left > containment[2] ? left - this.offset.click.left < containment[0] ? left + o.grid[0] :left - o.grid[0] :left :left;
}
}
return {
top:pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()),
left:pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft())
};
},
_clear:function() {
this.helper.removeClass("ui-draggable-dragging"), this.helper[0] == this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
this.helper = null, this.cancelHelperRemoval = !1;
},
_trigger:function(type, event, ui) {
return ui = ui || this._uiHash(), $.ui.plugin.call(this, type, [ event, ui ]), "drag" == type && (this.positionAbs = this._convertPositionTo("absolute")), 
$.Widget.prototype._trigger.call(this, type, event, ui);
},
plugins:{},
_uiHash:function() {
return {
helper:this.helper,
position:this.position,
originalPosition:this.originalPosition,
offset:this.positionAbs
};
}
}), $.extend($.ui.draggable, {
version:"1.8.23"
}), $.ui.plugin.add("draggable", "connectToSortable", {
start:function(event, ui) {
var inst = $(this).data("draggable"), o = inst.options, uiSortable = $.extend({}, ui, {
item:inst.element
});
inst.sortables = [], $(o.connectToSortable).each(function() {
var sortable = $.data(this, "sortable");
sortable && !sortable.options.disabled && (inst.sortables.push({
instance:sortable,
shouldRevert:sortable.options.revert
}), sortable.refreshPositions(), sortable._trigger("activate", event, uiSortable));
});
},
stop:function(event, ui) {
var inst = $(this).data("draggable"), uiSortable = $.extend({}, ui, {
item:inst.element
});
$.each(inst.sortables, function() {
this.instance.isOver ? (this.instance.isOver = 0, inst.cancelHelperRemoval = !0, 
this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), 
this.instance._mouseStop(event), this.instance.options.helper = this.instance.options._helper, 
"original" == inst.options.helper && this.instance.currentItem.css({
top:"auto",
left:"auto"
})) :(this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", event, uiSortable));
});
},
drag:function(event, ui) {
var inst = $(this).data("draggable"), self = this;
$.each(inst.sortables, function() {
this.instance.positionAbs = inst.positionAbs, this.instance.helperProportions = inst.helperProportions, 
this.instance.offset.click = inst.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, 
this.instance.currentItem = $(self).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), 
this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
return ui.helper[0];
}, event.target = this.instance.currentItem[0], this.instance._mouseCapture(event, !0), 
this.instance._mouseStart(event, !0, !0), this.instance.offset.click.top = inst.offset.click.top, 
this.instance.offset.click.left = inst.offset.click.left, this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left, 
this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top, 
inst._trigger("toSortable", event), inst.dropped = this.instance.element, inst.currentItem = inst.element, 
this.instance.fromOutside = inst), this.instance.currentItem && this.instance._mouseDrag(event)) :this.instance.isOver && (this.instance.isOver = 0, 
this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", event, this.instance._uiHash(this.instance)), 
this.instance._mouseStop(event, !0), this.instance.options.helper = this.instance.options._helper, 
this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), 
inst._trigger("fromSortable", event), inst.dropped = !1);
});
}
}), $.ui.plugin.add("draggable", "cursor", {
start:function() {
var t = $("body"), o = $(this).data("draggable").options;
t.css("cursor") && (o._cursor = t.css("cursor")), t.css("cursor", o.cursor);
},
stop:function() {
var o = $(this).data("draggable").options;
o._cursor && $("body").css("cursor", o._cursor);
}
}), $.ui.plugin.add("draggable", "opacity", {
start:function(event, ui) {
var t = $(ui.helper), o = $(this).data("draggable").options;
t.css("opacity") && (o._opacity = t.css("opacity")), t.css("opacity", o.opacity);
},
stop:function(event, ui) {
var o = $(this).data("draggable").options;
o._opacity && $(ui.helper).css("opacity", o._opacity);
}
}), $.ui.plugin.add("draggable", "scroll", {
start:function() {
var i = $(this).data("draggable");
i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName && (i.overflowOffset = i.scrollParent.offset());
},
drag:function(event) {
var i = $(this).data("draggable"), o = i.options, scrolled = !1;
i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName ? (o.axis && "x" == o.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed :event.pageY - i.overflowOffset.top < o.scrollSensitivity && (i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed)), 
o.axis && "y" == o.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed :event.pageX - i.overflowOffset.left < o.scrollSensitivity && (i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed))) :(o.axis && "x" == o.axis || (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) :$(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed))), 
o.axis && "y" == o.axis || (event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) :$(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)))), 
scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(i, event);
}
}), $.ui.plugin.add("draggable", "snap", {
start:function() {
var i = $(this).data("draggable"), o = i.options;
i.snapElements = [], $(o.snap.constructor != String ? o.snap.items || ":data(draggable)" :o.snap).each(function() {
var $t = $(this), $o = $t.offset();
this != i.element[0] && i.snapElements.push({
item:this,
width:$t.outerWidth(),
height:$t.outerHeight(),
top:$o.top,
left:$o.left
});
});
},
drag:function(event, ui) {
for (var inst = $(this).data("draggable"), o = inst.options, d = o.snapTolerance, x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height, i = inst.snapElements.length - 1; i >= 0; i--) {
var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width, t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;
if (x1 > l - d && r + d > x1 && y1 > t - d && b + d > y1 || x1 > l - d && r + d > x1 && y2 > t - d && b + d > y2 || x2 > l - d && r + d > x2 && y1 > t - d && b + d > y1 || x2 > l - d && r + d > x2 && y2 > t - d && b + d > y2) {
if ("inner" != o.snapMode) {
var ts = Math.abs(t - y2) <= d, bs = Math.abs(b - y1) <= d, ls = Math.abs(l - x2) <= d, rs = Math.abs(r - x1) <= d;
ts && (ui.position.top = inst._convertPositionTo("relative", {
top:t - inst.helperProportions.height,
left:0
}).top - inst.margins.top), bs && (ui.position.top = inst._convertPositionTo("relative", {
top:b,
left:0
}).top - inst.margins.top), ls && (ui.position.left = inst._convertPositionTo("relative", {
top:0,
left:l - inst.helperProportions.width
}).left - inst.margins.left), rs && (ui.position.left = inst._convertPositionTo("relative", {
top:0,
left:r
}).left - inst.margins.left);
}
var first = ts || bs || ls || rs;
if ("outer" != o.snapMode) {
var ts = Math.abs(t - y1) <= d, bs = Math.abs(b - y2) <= d, ls = Math.abs(l - x1) <= d, rs = Math.abs(r - x2) <= d;
ts && (ui.position.top = inst._convertPositionTo("relative", {
top:t,
left:0
}).top - inst.margins.top), bs && (ui.position.top = inst._convertPositionTo("relative", {
top:b - inst.helperProportions.height,
left:0
}).top - inst.margins.top), ls && (ui.position.left = inst._convertPositionTo("relative", {
top:0,
left:l
}).left - inst.margins.left), rs && (ui.position.left = inst._convertPositionTo("relative", {
top:0,
left:r - inst.helperProportions.width
}).left - inst.margins.left);
}
!inst.snapElements[i].snapping && (ts || bs || ls || rs || first) && inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
snapItem:inst.snapElements[i].item
})), inst.snapElements[i].snapping = ts || bs || ls || rs || first;
} else inst.snapElements[i].snapping && inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
snapItem:inst.snapElements[i].item
})), inst.snapElements[i].snapping = !1;
}
}
}), $.ui.plugin.add("draggable", "stack", {
start:function() {
var o = $(this).data("draggable").options, group = $.makeArray($(o.stack)).sort(function(a, b) {
return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
});
if (group.length) {
var min = parseInt(group[0].style.zIndex) || 0;
$(group).each(function(i) {
this.style.zIndex = min + i;
}), this[0].style.zIndex = min + group.length;
}
}
}), $.ui.plugin.add("draggable", "zIndex", {
start:function(event, ui) {
var t = $(ui.helper), o = $(this).data("draggable").options;
t.css("zIndex") && (o._zIndex = t.css("zIndex")), t.css("zIndex", o.zIndex);
},
stop:function(event, ui) {
var o = $(this).data("draggable").options;
o._zIndex && $(ui.helper).css("zIndex", o._zIndex);
}
});
}(jQuery), function($) {
$.widget("ui.droppable", {
widgetEventPrefix:"drop",
options:{
accept:"*",
activeClass:!1,
addClasses:!0,
greedy:!1,
hoverClass:!1,
scope:"default",
tolerance:"intersect"
},
_create:function() {
var o = this.options, accept = o.accept;
this.isover = 0, this.isout = 1, this.accept = $.isFunction(accept) ? accept :function(d) {
return d.is(accept);
}, this.proportions = {
width:this.element[0].offsetWidth,
height:this.element[0].offsetHeight
}, $.ui.ddmanager.droppables[o.scope] = $.ui.ddmanager.droppables[o.scope] || [], 
$.ui.ddmanager.droppables[o.scope].push(this), o.addClasses && this.element.addClass("ui-droppable");
},
destroy:function() {
for (var drop = $.ui.ddmanager.droppables[this.options.scope], i = 0; i < drop.length; i++) drop[i] == this && drop.splice(i, 1);
return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), 
this;
},
_setOption:function(key, value) {
"accept" == key && (this.accept = $.isFunction(value) ? value :function(d) {
return d.is(value);
}), $.Widget.prototype._setOption.apply(this, arguments);
},
_activate:function(event) {
var draggable = $.ui.ddmanager.current;
this.options.activeClass && this.element.addClass(this.options.activeClass), draggable && this._trigger("activate", event, this.ui(draggable));
},
_deactivate:function(event) {
var draggable = $.ui.ddmanager.current;
this.options.activeClass && this.element.removeClass(this.options.activeClass), 
draggable && this._trigger("deactivate", event, this.ui(draggable));
},
_over:function(event) {
var draggable = $.ui.ddmanager.current;
draggable && (draggable.currentItem || draggable.element)[0] != this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), 
this._trigger("over", event, this.ui(draggable)));
},
_out:function(event) {
var draggable = $.ui.ddmanager.current;
draggable && (draggable.currentItem || draggable.element)[0] != this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), 
this._trigger("out", event, this.ui(draggable)));
},
_drop:function(event, custom) {
var draggable = custom || $.ui.ddmanager.current;
if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return !1;
var childrenIntersection = !1;
return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
var inst = $.data(this, "droppable");
return inst.options.greedy && !inst.options.disabled && inst.options.scope == draggable.options.scope && inst.accept.call(inst.element[0], draggable.currentItem || draggable.element) && $.ui.intersect(draggable, $.extend(inst, {
offset:inst.element.offset()
}), inst.options.tolerance) ? (childrenIntersection = !0, !1) :void 0;
}), childrenIntersection ? !1 :this.accept.call(this.element[0], draggable.currentItem || draggable.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), 
this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", event, this.ui(draggable)), 
this.element) :!1;
},
ui:function(c) {
return {
draggable:c.currentItem || c.element,
helper:c.helper,
position:c.position,
offset:c.positionAbs
};
}
}), $.extend($.ui.droppable, {
version:"1.8.23"
}), $.ui.intersect = function(draggable, droppable, toleranceMode) {
if (!droppable.offset) return !1;
var x1 = (draggable.positionAbs || draggable.position.absolute).left, x2 = x1 + draggable.helperProportions.width, y1 = (draggable.positionAbs || draggable.position.absolute).top, y2 = y1 + draggable.helperProportions.height, l = droppable.offset.left, r = l + droppable.proportions.width, t = droppable.offset.top, b = t + droppable.proportions.height;
switch (toleranceMode) {
case "fit":
return x1 >= l && r >= x2 && y1 >= t && b >= y2;

case "intersect":
return l < x1 + draggable.helperProportions.width / 2 && x2 - draggable.helperProportions.width / 2 < r && t < y1 + draggable.helperProportions.height / 2 && y2 - draggable.helperProportions.height / 2 < b;

case "pointer":
var draggableLeft = (draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left, draggableTop = (draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top, isOver = $.ui.isOver(draggableTop, draggableLeft, t, l, droppable.proportions.height, droppable.proportions.width);
return isOver;

case "touch":
return (y1 >= t && b >= y1 || y2 >= t && b >= y2 || t > y1 && y2 > b) && (x1 >= l && r >= x1 || x2 >= l && r >= x2 || l > x1 && x2 > r);

default:
return !1;
}
}, $.ui.ddmanager = {
current:null,
droppables:{
"default":[]
},
prepareOffsets:function(t, event) {
var m = $.ui.ddmanager.droppables[t.options.scope] || [], type = event ? event.type :null, list = (t.currentItem || t.element).find(":data(droppable)").andSelf();
droppablesLoop:for (var i = 0; i < m.length; i++) if (!(m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element))) {
for (var j = 0; j < list.length; j++) if (list[j] == m[i].element[0]) {
m[i].proportions.height = 0;
continue droppablesLoop;
}
m[i].visible = "none" != m[i].element.css("display"), m[i].visible && ("mousedown" == type && m[i]._activate.call(m[i], event), 
m[i].offset = m[i].element.offset(), m[i].proportions = {
width:m[i].element[0].offsetWidth,
height:m[i].element[0].offsetHeight
});
}
},
drop:function(draggable, event) {
var dropped = !1;
return $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
this.options && (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance) && (dropped = this._drop.call(this, event) || dropped), 
!this.options.disabled && this.visible && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.isout = 1, 
this.isover = 0, this._deactivate.call(this, event)));
}), dropped;
},
dragStart:function(draggable, event) {
draggable.element.parents(":not(body,html)").bind("scroll.droppable", function() {
draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event);
});
},
drag:function(draggable, event) {
draggable.options.refreshPositions && $.ui.ddmanager.prepareOffsets(draggable, event), 
$.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
if (!this.options.disabled && !this.greedyChild && this.visible) {
var intersects = $.ui.intersect(draggable, this, this.options.tolerance), c = intersects || 1 != this.isover ? intersects && 0 == this.isover ? "isover" :null :"isout";
if (c) {
var parentInstance;
if (this.options.greedy) {
var parent = this.element.parents(":data(droppable):eq(0)");
parent.length && (parentInstance = $.data(parent[0], "droppable"), parentInstance.greedyChild = "isover" == c ? 1 :0);
}
parentInstance && "isover" == c && (parentInstance.isover = 0, parentInstance.isout = 1, 
parentInstance._out.call(parentInstance, event)), this[c] = 1, this["isout" == c ? "isover" :"isout"] = 0, 
this["isover" == c ? "_over" :"_out"].call(this, event), parentInstance && "isout" == c && (parentInstance.isout = 0, 
parentInstance.isover = 1, parentInstance._over.call(parentInstance, event));
}
}
});
},
dragStop:function(draggable, event) {
draggable.element.parents(":not(body,html)").unbind("scroll.droppable"), draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event);
}
};
}(jQuery), function($) {
$.widget("ui.resizable", $.ui.mouse, {
widgetEventPrefix:"resize",
options:{
alsoResize:!1,
animate:!1,
animateDuration:"slow",
animateEasing:"swing",
aspectRatio:!1,
autoHide:!1,
containment:!1,
ghost:!1,
grid:!1,
handles:"e,s,se",
helper:!1,
maxHeight:null,
maxWidth:null,
minHeight:10,
minWidth:10,
zIndex:1e3
},
_create:function() {
var self = this, o = this.options;
if (this.element.addClass("ui-resizable"), $.extend(this, {
_aspectRatio:!!o.aspectRatio,
aspectRatio:o.aspectRatio,
originalElement:this.element,
_proportionallyResizeElements:[],
_helper:o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" :null
}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap($('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
position:this.element.css("position"),
width:this.element.outerWidth(),
height:this.element.outerHeight(),
top:this.element.css("top"),
left:this.element.css("left")
})), this.element = this.element.parent().data("resizable", this.element.data("resizable")), 
this.elementIsWrapper = !0, this.element.css({
marginLeft:this.originalElement.css("marginLeft"),
marginTop:this.originalElement.css("marginTop"),
marginRight:this.originalElement.css("marginRight"),
marginBottom:this.originalElement.css("marginBottom")
}), this.originalElement.css({
marginLeft:0,
marginTop:0,
marginRight:0,
marginBottom:0
}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), 
this._proportionallyResizeElements.push(this.originalElement.css({
position:"static",
zoom:1,
display:"block"
})), this.originalElement.css({
margin:this.originalElement.css("margin")
}), this._proportionallyResize()), this.handles = o.handles || ($(".ui-resizable-handle", this.element).length ? {
n:".ui-resizable-n",
e:".ui-resizable-e",
s:".ui-resizable-s",
w:".ui-resizable-w",
se:".ui-resizable-se",
sw:".ui-resizable-sw",
ne:".ui-resizable-ne",
nw:".ui-resizable-nw"
} :"e,s,se"), this.handles.constructor == String) {
"all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
var n = this.handles.split(",");
this.handles = {};
for (var i = 0; i < n.length; i++) {
var handle = $.trim(n[i]), hname = "ui-resizable-" + handle, axis = $('<div class="ui-resizable-handle ' + hname + '"></div>');
axis.css({
zIndex:o.zIndex
}), "se" == handle && axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[handle] = ".ui-resizable-" + handle, 
this.element.append(axis);
}
}
this._renderAxis = function(target) {
target = target || this.element;
for (var i in this.handles) {
if (this.handles[i].constructor == String && (this.handles[i] = $(this.handles[i], this.element).show()), 
this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
var axis = $(this.handles[i], this.element), padWrapper = 0;
padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() :axis.outerWidth();
var padPos = [ "padding", /ne|nw|n/.test(i) ? "Top" :/se|sw|s/.test(i) ? "Bottom" :/^e$/.test(i) ? "Right" :"Left" ].join("");
target.css(padPos, padWrapper), this._proportionallyResize();
}
$(this.handles[i]).length;
}
}, this._renderAxis(this.element), this._handles = $(".ui-resizable-handle", this.element).disableSelection(), 
this._handles.mouseover(function() {
if (!self.resizing) {
if (this.className) var axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
self.axis = axis && axis[1] ? axis[1] :"se";
}
}), o.autoHide && (this._handles.hide(), $(this.element).addClass("ui-resizable-autohide").hover(function() {
o.disabled || ($(this).removeClass("ui-resizable-autohide"), self._handles.show());
}, function() {
o.disabled || self.resizing || ($(this).addClass("ui-resizable-autohide"), self._handles.hide());
})), this._mouseInit();
},
destroy:function() {
this._mouseDestroy();
var _destroy = function(exp) {
$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
};
if (this.elementIsWrapper) {
_destroy(this.element);
var wrapper = this.element;
wrapper.after(this.originalElement.css({
position:wrapper.css("position"),
width:wrapper.outerWidth(),
height:wrapper.outerHeight(),
top:wrapper.css("top"),
left:wrapper.css("left")
})).remove();
}
return this.originalElement.css("resize", this.originalResizeStyle), _destroy(this.originalElement), 
this;
},
_mouseCapture:function(event) {
var handle = !1;
for (var i in this.handles) $(this.handles[i])[0] == event.target && (handle = !0);
return !this.options.disabled && handle;
},
_mouseStart:function(event) {
var o = this.options, iniPos = this.element.position(), el = this.element;
this.resizing = !0, this.documentScroll = {
top:$(document).scrollTop(),
left:$(document).scrollLeft()
}, (el.is(".ui-draggable") || /absolute/.test(el.css("position"))) && el.css({
position:"absolute",
top:iniPos.top,
left:iniPos.left
}), this._renderProxy();
var curleft = num(this.helper.css("left")), curtop = num(this.helper.css("top"));
o.containment && (curleft += $(o.containment).scrollLeft() || 0, curtop += $(o.containment).scrollTop() || 0), 
this.offset = this.helper.offset(), this.position = {
left:curleft,
top:curtop
}, this.size = this._helper ? {
width:el.outerWidth(),
height:el.outerHeight()
} :{
width:el.width(),
height:el.height()
}, this.originalSize = this._helper ? {
width:el.outerWidth(),
height:el.outerHeight()
} :{
width:el.width(),
height:el.height()
}, this.originalPosition = {
left:curleft,
top:curtop
}, this.sizeDiff = {
width:el.outerWidth() - el.width(),
height:el.outerHeight() - el.height()
}, this.originalMousePosition = {
left:event.pageX,
top:event.pageY
}, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio :this.originalSize.width / this.originalSize.height || 1;
var cursor = $(".ui-resizable-" + this.axis).css("cursor");
return $("body").css("cursor", "auto" == cursor ? this.axis + "-resize" :cursor), 
el.addClass("ui-resizable-resizing"), this._propagate("start", event), !0;
},
_mouseDrag:function(event) {
var el = this.helper, smp = (this.options, this.originalMousePosition), a = this.axis, dx = event.pageX - smp.left || 0, dy = event.pageY - smp.top || 0, trigger = this._change[a];
if (!trigger) return !1;
{
var data = trigger.apply(this, [ event, dx, dy ]);
$.browser.msie && $.browser.version < 7, this.sizeDiff;
}
return this._updateVirtualBoundaries(event.shiftKey), (this._aspectRatio || event.shiftKey) && (data = this._updateRatio(data, event)), 
data = this._respectSize(data, event), this._propagate("resize", event), el.css({
top:this.position.top + "px",
left:this.position.left + "px",
width:this.size.width + "px",
height:this.size.height + "px"
}), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), 
this._updateCache(data), this._trigger("resize", event, this.ui()), !1;
},
_mouseStop:function(event) {
this.resizing = !1;
var o = this.options, self = this;
if (this._helper) {
var pr = this._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 :self.sizeDiff.height, soffsetw = ista ? 0 :self.sizeDiff.width, s = {
width:self.helper.width() - soffsetw,
height:self.helper.height() - soffseth
}, left = parseInt(self.element.css("left"), 10) + (self.position.left - self.originalPosition.left) || null, top = parseInt(self.element.css("top"), 10) + (self.position.top - self.originalPosition.top) || null;
o.animate || this.element.css($.extend(s, {
top:top,
left:left
})), self.helper.height(self.size.height), self.helper.width(self.size.width), this._helper && !o.animate && this._proportionallyResize();
}
return $("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), 
this._propagate("stop", event), this._helper && this.helper.remove(), !1;
},
_updateVirtualBoundaries:function(forceAspectRatio) {
var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
b = {
minWidth:isNumber(o.minWidth) ? o.minWidth :0,
maxWidth:isNumber(o.maxWidth) ? o.maxWidth :1/0,
minHeight:isNumber(o.minHeight) ? o.minHeight :0,
maxHeight:isNumber(o.maxHeight) ? o.maxHeight :1/0
}, (this._aspectRatio || forceAspectRatio) && (pMinWidth = b.minHeight * this.aspectRatio, 
pMinHeight = b.minWidth / this.aspectRatio, pMaxWidth = b.maxHeight * this.aspectRatio, 
pMaxHeight = b.maxWidth / this.aspectRatio, pMinWidth > b.minWidth && (b.minWidth = pMinWidth), 
pMinHeight > b.minHeight && (b.minHeight = pMinHeight), pMaxWidth < b.maxWidth && (b.maxWidth = pMaxWidth), 
pMaxHeight < b.maxHeight && (b.maxHeight = pMaxHeight)), this._vBoundaries = b;
},
_updateCache:function(data) {
this.options;
this.offset = this.helper.offset(), isNumber(data.left) && (this.position.left = data.left), 
isNumber(data.top) && (this.position.top = data.top), isNumber(data.height) && (this.size.height = data.height), 
isNumber(data.width) && (this.size.width = data.width);
},
_updateRatio:function(data) {
var cpos = (this.options, this.position), csize = this.size, a = this.axis;
return isNumber(data.height) ? data.width = data.height * this.aspectRatio :isNumber(data.width) && (data.height = data.width / this.aspectRatio), 
"sw" == a && (data.left = cpos.left + (csize.width - data.width), data.top = null), 
"nw" == a && (data.top = cpos.top + (csize.height - data.height), data.left = cpos.left + (csize.width - data.width)), 
data;
},
_respectSize:function(data, event) {
var o = (this.helper, this._vBoundaries), a = (this._aspectRatio || event.shiftKey, 
this.axis), ismaxw = isNumber(data.width) && o.maxWidth && o.maxWidth < data.width, ismaxh = isNumber(data.height) && o.maxHeight && o.maxHeight < data.height, isminw = isNumber(data.width) && o.minWidth && o.minWidth > data.width, isminh = isNumber(data.height) && o.minHeight && o.minHeight > data.height;
isminw && (data.width = o.minWidth), isminh && (data.height = o.minHeight), ismaxw && (data.width = o.maxWidth), 
ismaxh && (data.height = o.maxHeight);
var dw = this.originalPosition.left + this.originalSize.width, dh = this.position.top + this.size.height, cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
isminw && cw && (data.left = dw - o.minWidth), ismaxw && cw && (data.left = dw - o.maxWidth), 
isminh && ch && (data.top = dh - o.minHeight), ismaxh && ch && (data.top = dh - o.maxHeight);
var isNotwh = !data.width && !data.height;
return isNotwh && !data.left && data.top ? data.top = null :isNotwh && !data.top && data.left && (data.left = null), 
data;
},
_proportionallyResize:function() {
this.options;
if (this._proportionallyResizeElements.length) for (var element = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
var prel = this._proportionallyResizeElements[i];
if (!this.borderDif) {
var b = [ prel.css("borderTopWidth"), prel.css("borderRightWidth"), prel.css("borderBottomWidth"), prel.css("borderLeftWidth") ], p = [ prel.css("paddingTop"), prel.css("paddingRight"), prel.css("paddingBottom"), prel.css("paddingLeft") ];
this.borderDif = $.map(b, function(v, i) {
var border = parseInt(v, 10) || 0, padding = parseInt(p[i], 10) || 0;
return border + padding;
});
}
$.browser.msie && ($(element).is(":hidden") || $(element).parents(":hidden").length) || prel.css({
height:element.height() - this.borderDif[0] - this.borderDif[2] || 0,
width:element.width() - this.borderDif[1] - this.borderDif[3] || 0
});
}
},
_renderProxy:function() {
var el = this.element, o = this.options;
if (this.elementOffset = el.offset(), this._helper) {
this.helper = this.helper || $('<div style="overflow:hidden;"></div>');
var ie6 = $.browser.msie && $.browser.version < 7, ie6offset = ie6 ? 1 :0, pxyoffset = ie6 ? 2 :-1;
this.helper.addClass(this._helper).css({
width:this.element.outerWidth() + pxyoffset,
height:this.element.outerHeight() + pxyoffset,
position:"absolute",
left:this.elementOffset.left - ie6offset + "px",
top:this.elementOffset.top - ie6offset + "px",
zIndex:++o.zIndex
}), this.helper.appendTo("body").disableSelection();
} else this.helper = this.element;
},
_change:{
e:function(event, dx) {
return {
width:this.originalSize.width + dx
};
},
w:function(event, dx) {
var cs = (this.options, this.originalSize), sp = this.originalPosition;
return {
left:sp.left + dx,
width:cs.width - dx
};
},
n:function(event, dx, dy) {
var cs = (this.options, this.originalSize), sp = this.originalPosition;
return {
top:sp.top + dy,
height:cs.height - dy
};
},
s:function(event, dx, dy) {
return {
height:this.originalSize.height + dy
};
},
se:function(event, dx, dy) {
return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
},
sw:function(event, dx, dy) {
return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
},
ne:function(event, dx, dy) {
return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
},
nw:function(event, dx, dy) {
return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
}
},
_propagate:function(n, event) {
$.ui.plugin.call(this, n, [ event, this.ui() ]), "resize" != n && this._trigger(n, event, this.ui());
},
plugins:{},
ui:function() {
return {
originalElement:this.originalElement,
element:this.element,
helper:this.helper,
position:this.position,
size:this.size,
originalSize:this.originalSize,
originalPosition:this.originalPosition
};
}
}), $.extend($.ui.resizable, {
version:"1.8.23"
}), $.ui.plugin.add("resizable", "alsoResize", {
start:function() {
var self = $(this).data("resizable"), o = self.options, _store = function(exp) {
$(exp).each(function() {
var el = $(this);
el.data("resizable-alsoresize", {
width:parseInt(el.width(), 10),
height:parseInt(el.height(), 10),
left:parseInt(el.css("left"), 10),
top:parseInt(el.css("top"), 10)
});
});
};
"object" != typeof o.alsoResize || o.alsoResize.parentNode ? _store(o.alsoResize) :o.alsoResize.length ? (o.alsoResize = o.alsoResize[0], 
_store(o.alsoResize)) :$.each(o.alsoResize, function(exp) {
_store(exp);
});
},
resize:function(event, ui) {
var self = $(this).data("resizable"), o = self.options, os = self.originalSize, op = self.originalPosition, delta = {
height:self.size.height - os.height || 0,
width:self.size.width - os.width || 0,
top:self.position.top - op.top || 0,
left:self.position.left - op.left || 0
}, _alsoResize = function(exp, c) {
$(exp).each(function() {
var el = $(this), start = $(this).data("resizable-alsoresize"), style = {}, css = c && c.length ? c :el.parents(ui.originalElement[0]).length ? [ "width", "height" ] :[ "width", "height", "top", "left" ];
$.each(css, function(i, prop) {
var sum = (start[prop] || 0) + (delta[prop] || 0);
sum && sum >= 0 && (style[prop] = sum || null);
}), el.css(style);
});
};
"object" != typeof o.alsoResize || o.alsoResize.nodeType ? _alsoResize(o.alsoResize) :$.each(o.alsoResize, function(exp, c) {
_alsoResize(exp, c);
});
},
stop:function() {
$(this).removeData("resizable-alsoresize");
}
}), $.ui.plugin.add("resizable", "animate", {
stop:function(event) {
var self = $(this).data("resizable"), o = self.options, pr = self._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 :self.sizeDiff.height, soffsetw = ista ? 0 :self.sizeDiff.width, style = {
width:self.size.width - soffsetw,
height:self.size.height - soffseth
}, left = parseInt(self.element.css("left"), 10) + (self.position.left - self.originalPosition.left) || null, top = parseInt(self.element.css("top"), 10) + (self.position.top - self.originalPosition.top) || null;
self.element.animate($.extend(style, top && left ? {
top:top,
left:left
} :{}), {
duration:o.animateDuration,
easing:o.animateEasing,
step:function() {
var data = {
width:parseInt(self.element.css("width"), 10),
height:parseInt(self.element.css("height"), 10),
top:parseInt(self.element.css("top"), 10),
left:parseInt(self.element.css("left"), 10)
};
pr && pr.length && $(pr[0]).css({
width:data.width,
height:data.height
}), self._updateCache(data), self._propagate("resize", event);
}
});
}
}), $.ui.plugin.add("resizable", "containment", {
start:function() {
var self = $(this).data("resizable"), o = self.options, el = self.element, oc = o.containment, ce = oc instanceof $ ? oc.get(0) :/parent/.test(oc) ? el.parent().get(0) :oc;
if (ce) if (self.containerElement = $(ce), /document/.test(oc) || oc == document) self.containerOffset = {
left:0,
top:0
}, self.containerPosition = {
left:0,
top:0
}, self.parentData = {
element:$(document),
left:0,
top:0,
width:$(document).width(),
height:$(document).height() || document.body.parentNode.scrollHeight
}; else {
var element = $(ce), p = [];
$([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name) {
p[i] = num(element.css("padding" + name));
}), self.containerOffset = element.offset(), self.containerPosition = element.position(), 
self.containerSize = {
height:element.innerHeight() - p[3],
width:element.innerWidth() - p[1]
};
var co = self.containerOffset, ch = self.containerSize.height, cw = self.containerSize.width, width = $.ui.hasScroll(ce, "left") ? ce.scrollWidth :cw, height = $.ui.hasScroll(ce) ? ce.scrollHeight :ch;
self.parentData = {
element:ce,
left:co.left,
top:co.top,
width:width,
height:height
};
}
},
resize:function(event) {
var self = $(this).data("resizable"), o = self.options, co = (self.containerSize, 
self.containerOffset), cp = (self.size, self.position), pRatio = self._aspectRatio || event.shiftKey, cop = {
top:0,
left:0
}, ce = self.containerElement;
ce[0] != document && /static/.test(ce.css("position")) && (cop = co), cp.left < (self._helper ? co.left :0) && (self.size.width = self.size.width + (self._helper ? self.position.left - co.left :self.position.left - cop.left), 
pRatio && (self.size.height = self.size.width / self.aspectRatio), self.position.left = o.helper ? co.left :0), 
cp.top < (self._helper ? co.top :0) && (self.size.height = self.size.height + (self._helper ? self.position.top - co.top :self.position.top), 
pRatio && (self.size.width = self.size.height * self.aspectRatio), self.position.top = self._helper ? co.top :0), 
self.offset.left = self.parentData.left + self.position.left, self.offset.top = self.parentData.top + self.position.top;
var woset = Math.abs((self._helper ? self.offset.left - cop.left :self.offset.left - cop.left) + self.sizeDiff.width), hoset = Math.abs((self._helper ? self.offset.top - cop.top :self.offset.top - co.top) + self.sizeDiff.height), isParent = self.containerElement.get(0) == self.element.parent().get(0), isOffsetRelative = /relative|absolute/.test(self.containerElement.css("position"));
isParent && isOffsetRelative && (woset -= self.parentData.left), woset + self.size.width >= self.parentData.width && (self.size.width = self.parentData.width - woset, 
pRatio && (self.size.height = self.size.width / self.aspectRatio)), hoset + self.size.height >= self.parentData.height && (self.size.height = self.parentData.height - hoset, 
pRatio && (self.size.width = self.size.height * self.aspectRatio));
},
stop:function() {
var self = $(this).data("resizable"), o = self.options, co = (self.position, self.containerOffset), cop = self.containerPosition, ce = self.containerElement, helper = $(self.helper), ho = helper.offset(), w = helper.outerWidth() - self.sizeDiff.width, h = helper.outerHeight() - self.sizeDiff.height;
self._helper && !o.animate && /relative/.test(ce.css("position")) && $(this).css({
left:ho.left - cop.left - co.left,
width:w,
height:h
}), self._helper && !o.animate && /static/.test(ce.css("position")) && $(this).css({
left:ho.left - cop.left - co.left,
width:w,
height:h
});
}
}), $.ui.plugin.add("resizable", "ghost", {
start:function() {
var self = $(this).data("resizable"), o = self.options, cs = self.size;
self.ghost = self.originalElement.clone(), self.ghost.css({
opacity:.25,
display:"block",
position:"relative",
height:cs.height,
width:cs.width,
margin:0,
left:0,
top:0
}).addClass("ui-resizable-ghost").addClass("string" == typeof o.ghost ? o.ghost :""), 
self.ghost.appendTo(self.helper);
},
resize:function() {
{
var self = $(this).data("resizable");
self.options;
}
self.ghost && self.ghost.css({
position:"relative",
height:self.size.height,
width:self.size.width
});
},
stop:function() {
{
var self = $(this).data("resizable");
self.options;
}
self.ghost && self.helper && self.helper.get(0).removeChild(self.ghost.get(0));
}
}), $.ui.plugin.add("resizable", "grid", {
resize:function(event) {
{
var self = $(this).data("resizable"), o = self.options, cs = self.size, os = self.originalSize, op = self.originalPosition, a = self.axis;
o._aspectRatio || event.shiftKey;
}
o.grid = "number" == typeof o.grid ? [ o.grid, o.grid ] :o.grid;
var ox = Math.round((cs.width - os.width) / (o.grid[0] || 1)) * (o.grid[0] || 1), oy = Math.round((cs.height - os.height) / (o.grid[1] || 1)) * (o.grid[1] || 1);
/^(se|s|e)$/.test(a) ? (self.size.width = os.width + ox, self.size.height = os.height + oy) :/^(ne)$/.test(a) ? (self.size.width = os.width + ox, 
self.size.height = os.height + oy, self.position.top = op.top - oy) :/^(sw)$/.test(a) ? (self.size.width = os.width + ox, 
self.size.height = os.height + oy, self.position.left = op.left - ox) :(self.size.width = os.width + ox, 
self.size.height = os.height + oy, self.position.top = op.top - oy, self.position.left = op.left - ox);
}
});
var num = function(v) {
return parseInt(v, 10) || 0;
}, isNumber = function(value) {
return !isNaN(parseInt(value, 10));
};
}(jQuery), function($) {
$.widget("ui.selectable", $.ui.mouse, {
options:{
appendTo:"body",
autoRefresh:!0,
distance:0,
filter:"*",
tolerance:"touch"
},
_create:function() {
var self = this;
this.element.addClass("ui-selectable"), this.dragged = !1;
var selectees;
this.refresh = function() {
selectees = $(self.options.filter, self.element[0]), selectees.addClass("ui-selectee"), 
selectees.each(function() {
var $this = $(this), pos = $this.offset();
$.data(this, "selectable-item", {
element:this,
$element:$this,
left:pos.left,
top:pos.top,
right:pos.left + $this.outerWidth(),
bottom:pos.top + $this.outerHeight(),
startselected:!1,
selected:$this.hasClass("ui-selected"),
selecting:$this.hasClass("ui-selecting"),
unselecting:$this.hasClass("ui-unselecting")
});
});
}, this.refresh(), this.selectees = selectees.addClass("ui-selectee"), this._mouseInit(), 
this.helper = $("<div class='ui-selectable-helper'></div>");
},
destroy:function() {
return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), 
this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), 
this._mouseDestroy(), this;
},
_mouseStart:function(event) {
var self = this;
if (this.opos = [ event.pageX, event.pageY ], !this.options.disabled) {
var options = this.options;
this.selectees = $(options.filter, this.element[0]), this._trigger("start", event), 
$(options.appendTo).append(this.helper), this.helper.css({
left:event.clientX,
top:event.clientY,
width:0,
height:0
}), options.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
var selectee = $.data(this, "selectable-item");
selectee.startselected = !0, event.metaKey || event.ctrlKey || (selectee.$element.removeClass("ui-selected"), 
selectee.selected = !1, selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0, 
self._trigger("unselecting", event, {
unselecting:selectee.element
}));
}), $(event.target).parents().andSelf().each(function() {
var selectee = $.data(this, "selectable-item");
if (selectee) {
var doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected");
return selectee.$element.removeClass(doSelect ? "ui-unselecting" :"ui-selected").addClass(doSelect ? "ui-selecting" :"ui-unselecting"), 
selectee.unselecting = !doSelect, selectee.selecting = doSelect, selectee.selected = doSelect, 
doSelect ? self._trigger("selecting", event, {
selecting:selectee.element
}) :self._trigger("unselecting", event, {
unselecting:selectee.element
}), !1;
}
});
}
},
_mouseDrag:function(event) {
var self = this;
if (this.dragged = !0, !this.options.disabled) {
var options = this.options, x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
if (x1 > x2) {
var tmp = x2;
x2 = x1, x1 = tmp;
}
if (y1 > y2) {
var tmp = y2;
y2 = y1, y1 = tmp;
}
return this.helper.css({
left:x1,
top:y1,
width:x2 - x1,
height:y2 - y1
}), this.selectees.each(function() {
var selectee = $.data(this, "selectable-item");
if (selectee && selectee.element != self.element[0]) {
var hit = !1;
"touch" == options.tolerance ? hit = !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) :"fit" == options.tolerance && (hit = selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2), 
hit ? (selectee.selected && (selectee.$element.removeClass("ui-selected"), selectee.selected = !1), 
selectee.unselecting && (selectee.$element.removeClass("ui-unselecting"), selectee.unselecting = !1), 
selectee.selecting || (selectee.$element.addClass("ui-selecting"), selectee.selecting = !0, 
self._trigger("selecting", event, {
selecting:selectee.element
}))) :(selectee.selecting && ((event.metaKey || event.ctrlKey) && selectee.startselected ? (selectee.$element.removeClass("ui-selecting"), 
selectee.selecting = !1, selectee.$element.addClass("ui-selected"), selectee.selected = !0) :(selectee.$element.removeClass("ui-selecting"), 
selectee.selecting = !1, selectee.startselected && (selectee.$element.addClass("ui-unselecting"), 
selectee.unselecting = !0), self._trigger("unselecting", event, {
unselecting:selectee.element
}))), selectee.selected && (event.metaKey || event.ctrlKey || selectee.startselected || (selectee.$element.removeClass("ui-selected"), 
selectee.selected = !1, selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0, 
self._trigger("unselecting", event, {
unselecting:selectee.element
}))));
}
}), !1;
}
},
_mouseStop:function(event) {
var self = this;
this.dragged = !1;
this.options;
return $(".ui-unselecting", this.element[0]).each(function() {
var selectee = $.data(this, "selectable-item");
selectee.$element.removeClass("ui-unselecting"), selectee.unselecting = !1, selectee.startselected = !1, 
self._trigger("unselected", event, {
unselected:selectee.element
});
}), $(".ui-selecting", this.element[0]).each(function() {
var selectee = $.data(this, "selectable-item");
selectee.$element.removeClass("ui-selecting").addClass("ui-selected"), selectee.selecting = !1, 
selectee.selected = !0, selectee.startselected = !0, self._trigger("selected", event, {
selected:selectee.element
});
}), this._trigger("stop", event), this.helper.remove(), !1;
}
}), $.extend($.ui.selectable, {
version:"1.8.23"
});
}(jQuery), function($) {
$.widget("ui.sortable", $.ui.mouse, {
widgetEventPrefix:"sort",
ready:!1,
options:{
appendTo:"parent",
axis:!1,
connectWith:!1,
containment:!1,
cursor:"auto",
cursorAt:!1,
dropOnEmpty:!0,
forcePlaceholderSize:!1,
forceHelperSize:!1,
grid:!1,
handle:!1,
helper:"original",
items:"> *",
opacity:!1,
placeholder:!1,
revert:!1,
scroll:!0,
scrollSensitivity:20,
scrollSpeed:20,
scope:"default",
tolerance:"intersect",
zIndex:1e3
},
_create:function() {
var o = this.options;
this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), 
this.floating = this.items.length ? "x" === o.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) :!1, 
this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
},
destroy:function() {
$.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), 
this._mouseDestroy();
for (var i = this.items.length - 1; i >= 0; i--) this.items[i].item.removeData(this.widgetName + "-item");
return this;
},
_setOption:function(key, value) {
"disabled" === key ? (this.options[key] = value, this.widget()[value ? "addClass" :"removeClass"]("ui-sortable-disabled")) :$.Widget.prototype._setOption.apply(this, arguments);
},
_mouseCapture:function(event, overrideHandle) {
var that = this;
if (this.reverting) return !1;
if (this.options.disabled || "static" == this.options.type) return !1;
this._refreshItems(event);
{
var currentItem = null, self = this;
$(event.target).parents().each(function() {
return $.data(this, that.widgetName + "-item") == self ? (currentItem = $(this), 
!1) :void 0;
});
}
if ($.data(event.target, that.widgetName + "-item") == self && (currentItem = $(event.target)), 
!currentItem) return !1;
if (this.options.handle && !overrideHandle) {
var validHandle = !1;
if ($(this.options.handle, currentItem).find("*").andSelf().each(function() {
this == event.target && (validHandle = !0);
}), !validHandle) return !1;
}
return this.currentItem = currentItem, this._removeCurrentsFromItems(), !0;
},
_mouseStart:function(event, overrideHandle, noActivation) {
var o = this.options, self = this;
if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(event), 
this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), 
this.offset = this.currentItem.offset(), this.offset = {
top:this.offset.top - this.margins.top,
left:this.offset.left - this.margins.left
}, $.extend(this.offset, {
click:{
left:event.pageX - this.offset.left,
top:event.pageY - this.offset.top
},
parent:this._getParentOffset(),
relative:this._getRelativeOffset()
}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), 
this.originalPosition = this._generatePosition(event), this.originalPageX = event.pageX, 
this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), 
this.domPosition = {
prev:this.currentItem.prev()[0],
parent:this.currentItem.parent()[0]
}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), 
o.containment && this._setContainment(), o.cursor && ($("body").css("cursor") && (this._storedCursor = $("body").css("cursor")), 
$("body").css("cursor", o.cursor)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), 
this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), 
this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), 
this._trigger("start", event, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), 
!noActivation) for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", event, self._uiHash(this));
return $.ui.ddmanager && ($.ui.ddmanager.current = this), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), 
this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(event), 
!0;
},
_mouseDrag:function(event) {
if (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"), 
this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll) {
var o = this.options, scrolled = !1;
this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed :event.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed), 
this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed :event.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed)) :(event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) :$(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed)), 
event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) :$(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed))), 
scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event);
}
this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px");
for (var i = this.items.length - 1; i >= 0; i--) {
var item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item);
if (intersection && itemElement != this.currentItem[0] && this.placeholder[1 == intersection ? "next" :"prev"]()[0] != itemElement && !$.ui.contains(this.placeholder[0], itemElement) && ("semi-dynamic" == this.options.type ? !$.ui.contains(this.element[0], itemElement) :!0)) {
if (this.direction = 1 == intersection ? "down" :"up", "pointer" != this.options.tolerance && !this._intersectsWithSides(item)) break;
this._rearrange(event, item), this._trigger("change", event, this._uiHash());
break;
}
}
return this._contactContainers(event), $.ui.ddmanager && $.ui.ddmanager.drag(this, event), 
this._trigger("sort", event, this._uiHash()), this.lastPositionAbs = this.positionAbs, 
!1;
},
_mouseStop:function(event, noPropagation) {
if (event) {
if ($.ui.ddmanager && !this.options.dropBehaviour && $.ui.ddmanager.drop(this, event), 
this.options.revert) {
var self = this, cur = self.placeholder.offset();
self.reverting = !0, $(this.helper).animate({
left:cur.left - this.offset.parent.left - self.margins.left + (this.offsetParent[0] == document.body ? 0 :this.offsetParent[0].scrollLeft),
top:cur.top - this.offset.parent.top - self.margins.top + (this.offsetParent[0] == document.body ? 0 :this.offsetParent[0].scrollTop)
}, parseInt(this.options.revert, 10) || 500, function() {
self._clear(event);
});
} else this._clear(event, noPropagation);
return !1;
}
},
cancel:function() {
var self = this;
if (this.dragging) {
this._mouseUp({
target:null
}), "original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") :this.currentItem.show();
for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("deactivate", null, self._uiHash(this)), 
this.containers[i].containerCache.over && (this.containers[i]._trigger("out", null, self._uiHash(this)), 
this.containers[i].containerCache.over = 0);
}
return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
"original" != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), 
$.extend(this, {
helper:null,
dragging:!1,
reverting:!1,
_noFinalSort:null
}), this.domPosition.prev ? $(this.domPosition.prev).after(this.currentItem) :$(this.domPosition.parent).prepend(this.currentItem)), 
this;
},
serialize:function(o) {
var items = this._getItemsAsjQuery(o && o.connected), str = [];
return o = o || {}, $(items).each(function() {
var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[-=_](.+)/);
res && str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] :res[2]));
}), !str.length && o.key && str.push(o.key + "="), str.join("&");
},
toArray:function(o) {
var items = this._getItemsAsjQuery(o && o.connected), ret = [];
return o = o || {}, items.each(function() {
ret.push($(o.item || this).attr(o.attribute || "id") || "");
}), ret;
},
_intersectsWith:function(item) {
var x1 = this.positionAbs.left, x2 = x1 + this.helperProportions.width, y1 = this.positionAbs.top, y2 = y1 + this.helperProportions.height, l = item.left, r = l + item.width, t = item.top, b = t + item.height, dyClick = this.offset.click.top, dxClick = this.offset.click.left, isOverElement = y1 + dyClick > t && b > y1 + dyClick && x1 + dxClick > l && r > x1 + dxClick;
return "pointer" == this.options.tolerance || this.options.forcePointerForContainers || "pointer" != this.options.tolerance && this.helperProportions[this.floating ? "width" :"height"] > item[this.floating ? "width" :"height"] ? isOverElement :l < x1 + this.helperProportions.width / 2 && x2 - this.helperProportions.width / 2 < r && t < y1 + this.helperProportions.height / 2 && y2 - this.helperProportions.height / 2 < b;
},
_intersectsWithPointer:function(item) {
var isOverElementHeight = "x" === this.options.axis || $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height), isOverElementWidth = "y" === this.options.axis || $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width), isOverElement = isOverElementHeight && isOverElementWidth, verticalDirection = this._getDragVerticalDirection(), horizontalDirection = this._getDragHorizontalDirection();
return isOverElement ? this.floating ? horizontalDirection && "right" == horizontalDirection || "down" == verticalDirection ? 2 :1 :verticalDirection && ("down" == verticalDirection ? 2 :1) :!1;
},
_intersectsWithSides:function(item) {
var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height), isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width), verticalDirection = this._getDragVerticalDirection(), horizontalDirection = this._getDragHorizontalDirection();
return this.floating && horizontalDirection ? "right" == horizontalDirection && isOverRightHalf || "left" == horizontalDirection && !isOverRightHalf :verticalDirection && ("down" == verticalDirection && isOverBottomHalf || "up" == verticalDirection && !isOverBottomHalf);
},
_getDragVerticalDirection:function() {
var delta = this.positionAbs.top - this.lastPositionAbs.top;
return 0 != delta && (delta > 0 ? "down" :"up");
},
_getDragHorizontalDirection:function() {
var delta = this.positionAbs.left - this.lastPositionAbs.left;
return 0 != delta && (delta > 0 ? "right" :"left");
},
refresh:function(event) {
return this._refreshItems(event), this.refreshPositions(), this;
},
_connectWith:function() {
var options = this.options;
return options.connectWith.constructor == String ? [ options.connectWith ] :options.connectWith;
},
_getItemsAsjQuery:function(connected) {
var items = [], queries = [], connectWith = this._connectWith();
if (connectWith && connected) for (var i = connectWith.length - 1; i >= 0; i--) for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
var inst = $.data(cur[j], this.widgetName);
inst && inst != this && !inst.options.disabled && queries.push([ $.isFunction(inst.options.items) ? inst.options.items.call(inst.element) :$(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst ]);
}
queries.push([ $.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
options:this.options,
item:this.currentItem
}) :$(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]);
for (var i = queries.length - 1; i >= 0; i--) queries[i][0].each(function() {
items.push(this);
});
return $(items);
},
_removeCurrentsFromItems:function() {
for (var list = this.currentItem.find(":data(" + this.widgetName + "-item)"), i = 0; i < this.items.length; i++) for (var j = 0; j < list.length; j++) list[j] == this.items[i].item[0] && this.items.splice(i, 1);
},
_refreshItems:function(event) {
this.items = [], this.containers = [ this ];
var items = this.items, queries = [ [ $.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
item:this.currentItem
}) :$(this.options.items, this.element), this ] ], connectWith = this._connectWith();
if (connectWith && this.ready) for (var i = connectWith.length - 1; i >= 0; i--) for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
var inst = $.data(cur[j], this.widgetName);
inst && inst != this && !inst.options.disabled && (queries.push([ $.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
item:this.currentItem
}) :$(inst.options.items, inst.element), inst ]), this.containers.push(inst));
}
for (var i = queries.length - 1; i >= 0; i--) for (var targetData = queries[i][1], _queries = queries[i][0], j = 0, queriesLength = _queries.length; queriesLength > j; j++) {
var item = $(_queries[j]);
item.data(this.widgetName + "-item", targetData), items.push({
item:item,
instance:targetData,
width:0,
height:0,
left:0,
top:0
});
}
},
refreshPositions:function(fast) {
this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
for (var i = this.items.length - 1; i >= 0; i--) {
var item = this.items[i];
if (item.instance == this.currentContainer || !this.currentContainer || item.item[0] == this.currentItem[0]) {
var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) :item.item;
fast || (item.width = t.outerWidth(), item.height = t.outerHeight());
var p = t.offset();
item.left = p.left, item.top = p.top;
}
}
if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (var i = this.containers.length - 1; i >= 0; i--) {
var p = this.containers[i].element.offset();
this.containers[i].containerCache.left = p.left, this.containers[i].containerCache.top = p.top, 
this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), 
this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
}
return this;
},
_createPlaceholder:function(that) {
var self = that || this, o = self.options;
if (!o.placeholder || o.placeholder.constructor == String) {
var className = o.placeholder;
o.placeholder = {
element:function() {
var el = $(document.createElement(self.currentItem[0].nodeName)).addClass(className || self.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
return className || (el.style.visibility = "hidden"), el;
},
update:function(container, p) {
(!className || o.forcePlaceholderSize) && (p.height() || p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css("paddingTop") || 0, 10) - parseInt(self.currentItem.css("paddingBottom") || 0, 10)), 
p.width() || p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css("paddingLeft") || 0, 10) - parseInt(self.currentItem.css("paddingRight") || 0, 10)));
}
};
}
self.placeholder = $(o.placeholder.element.call(self.element, self.currentItem)), 
self.currentItem.after(self.placeholder), o.placeholder.update(self, self.placeholder);
},
_contactContainers:function(event) {
for (var innermostContainer = null, innermostIndex = null, i = this.containers.length - 1; i >= 0; i--) if (!$.ui.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
if (innermostContainer && $.ui.contains(this.containers[i].element[0], innermostContainer.element[0])) continue;
innermostContainer = this.containers[i], innermostIndex = i;
} else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", event, this._uiHash(this)), 
this.containers[i].containerCache.over = 0);
if (innermostContainer) if (1 === this.containers.length) this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), 
this.containers[innermostIndex].containerCache.over = 1; else if (this.currentContainer != this.containers[innermostIndex]) {
for (var dist = 1e4, itemWithLeastDistance = null, base = this.positionAbs[this.containers[innermostIndex].floating ? "left" :"top"], j = this.items.length - 1; j >= 0; j--) if ($.ui.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
var cur = this.containers[innermostIndex].floating ? this.items[j].item.offset().left :this.items[j].item.offset().top;
Math.abs(cur - base) < dist && (dist = Math.abs(cur - base), itemWithLeastDistance = this.items[j], 
this.direction = cur - base > 0 ? "down" :"up");
}
if (!itemWithLeastDistance && !this.options.dropOnEmpty) return;
this.currentContainer = this.containers[innermostIndex], itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, !0) :this._rearrange(event, null, this.containers[innermostIndex].element, !0), 
this._trigger("change", event, this._uiHash()), this.containers[innermostIndex]._trigger("change", event, this._uiHash(this)), 
this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), 
this.containers[innermostIndex].containerCache.over = 1;
}
},
_createHelper:function(event) {
var o = this.options, helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [ event, this.currentItem ])) :"clone" == o.helper ? this.currentItem.clone() :this.currentItem;
return helper.parents("body").length || $("parent" != o.appendTo ? o.appendTo :this.currentItem[0].parentNode)[0].appendChild(helper[0]), 
helper[0] == this.currentItem[0] && (this._storedCSS = {
width:this.currentItem[0].style.width,
height:this.currentItem[0].style.height,
position:this.currentItem.css("position"),
top:this.currentItem.css("top"),
left:this.currentItem.css("left")
}), ("" == helper[0].style.width || o.forceHelperSize) && helper.width(this.currentItem.width()), 
("" == helper[0].style.height || o.forceHelperSize) && helper.height(this.currentItem.height()), 
helper;
},
_adjustOffsetFromHelper:function(obj) {
"string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
left:+obj[0],
top:+obj[1] || 0
}), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), 
"top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
},
_getParentOffset:function() {
this.offsetParent = this.helper.offsetParent();
var po = this.offsetParent.offset();
return "absolute" == this.cssPosition && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), 
po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && $.browser.msie) && (po = {
top:0,
left:0
}), {
top:po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
left:po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
};
},
_getRelativeOffset:function() {
if ("relative" == this.cssPosition) {
var p = this.currentItem.position();
return {
top:p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
left:p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
};
}
return {
top:0,
left:0
};
},
_cacheMargins:function() {
this.margins = {
left:parseInt(this.currentItem.css("marginLeft"), 10) || 0,
top:parseInt(this.currentItem.css("marginTop"), 10) || 0
};
},
_cacheHelperProportions:function() {
this.helperProportions = {
width:this.helper.outerWidth(),
height:this.helper.outerHeight()
};
},
_setContainment:function() {
var o = this.options;
if ("parent" == o.containment && (o.containment = this.helper[0].parentNode), ("document" == o.containment || "window" == o.containment) && (this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $("document" == o.containment ? document :window).width() - this.helperProportions.width - this.margins.left, ($("document" == o.containment ? document :window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
!/^(document|window|parent)$/.test(o.containment)) {
var ce = $(o.containment)[0], co = $(o.containment).offset(), over = "hidden" != $(ce).css("overflow");
this.containment = [ co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) :ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) :ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ];
}
},
_convertPositionTo:function(d, pos) {
pos || (pos = this.position);
var mod = "absolute" == d ? 1 :-1, scroll = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent), scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
return {
top:pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()) * mod),
left:pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft()) * mod)
};
},
_generatePosition:function(event) {
var o = this.options, scroll = "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
"relative" != this.cssPosition || this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset());
var pageX = event.pageX, pageY = event.pageY;
if (this.originalPosition && (this.containment && (event.pageX - this.offset.click.left < this.containment[0] && (pageX = this.containment[0] + this.offset.click.left), 
event.pageY - this.offset.click.top < this.containment[1] && (pageY = this.containment[1] + this.offset.click.top), 
event.pageX - this.offset.click.left > this.containment[2] && (pageX = this.containment[2] + this.offset.click.left), 
event.pageY - this.offset.click.top > this.containment[3] && (pageY = this.containment[3] + this.offset.click.top)), 
o.grid)) {
var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
pageY = this.containment ? top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3] ? top - this.offset.click.top < this.containment[1] ? top + o.grid[1] :top - o.grid[1] :top :top;
var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
pageX = this.containment ? left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2] ? left - this.offset.click.left < this.containment[0] ? left + o.grid[0] :left - o.grid[0] :left :left;
}
return {
top:pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()),
left:pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft())
};
},
_rearrange:function(event, i, a, hardRefresh) {
a ? a[0].appendChild(this.placeholder[0]) :i.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? i.item[0] :i.item[0].nextSibling), 
this.counter = this.counter ? ++this.counter :1;
var self = this, counter = this.counter;
window.setTimeout(function() {
counter == self.counter && self.refreshPositions(!hardRefresh);
}, 0);
},
_clear:function(event, noPropagation) {
this.reverting = !1;
var delayedTriggers = [];
if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), 
this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
for (var i in this._storedCSS) ("auto" == this._storedCSS[i] || "static" == this._storedCSS[i]) && (this._storedCSS[i] = "");
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
} else this.currentItem.show();
if (this.fromOutside && !noPropagation && delayedTriggers.push(function(event) {
this._trigger("receive", event, this._uiHash(this.fromOutside));
}), !this.fromOutside && this.domPosition.prev == this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent == this.currentItem.parent()[0] || noPropagation || delayedTriggers.push(function(event) {
this._trigger("update", event, this._uiHash());
}), !$.ui.contains(this.element[0], this.currentItem[0])) {
noPropagation || delayedTriggers.push(function(event) {
this._trigger("remove", event, this._uiHash());
});
for (var i = this.containers.length - 1; i >= 0; i--) $.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !noPropagation && (delayedTriggers.push(function(c) {
return function(event) {
c._trigger("receive", event, this._uiHash(this));
};
}.call(this, this.containers[i])), delayedTriggers.push(function(c) {
return function(event) {
c._trigger("update", event, this._uiHash(this));
};
}.call(this, this.containers[i])));
}
for (var i = this.containers.length - 1; i >= 0; i--) noPropagation || delayedTriggers.push(function(c) {
return function(event) {
c._trigger("deactivate", event, this._uiHash(this));
};
}.call(this, this.containers[i])), this.containers[i].containerCache.over && (delayedTriggers.push(function(c) {
return function(event) {
c._trigger("out", event, this._uiHash(this));
};
}.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
if (this._storedCursor && $("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), 
this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" :this._storedZIndex), 
this.dragging = !1, this.cancelHelperRemoval) {
if (!noPropagation) {
this._trigger("beforeStop", event, this._uiHash());
for (var i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
this._trigger("stop", event, this._uiHash());
}
return this.fromOutside = !1, !1;
}
if (noPropagation || this._trigger("beforeStop", event, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, 
!noPropagation) {
for (var i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
this._trigger("stop", event, this._uiHash());
}
return this.fromOutside = !1, !0;
},
_trigger:function() {
$.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
},
_uiHash:function(inst) {
var self = inst || this;
return {
helper:self.helper,
placeholder:self.placeholder || $([]),
position:self.position,
originalPosition:self.originalPosition,
offset:self.positionAbs,
item:self.currentItem,
sender:inst ? inst.element :null
};
}
}), $.extend($.ui.sortable, {
version:"1.8.23"
});
}(jQuery), jQuery.effects || function($, undefined) {
function getRGB(color) {
var result;
return color && color.constructor == Array && 3 == color.length ? color :(result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) ? [ parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10) ] :(result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) ? [ 2.55 * parseFloat(result[1]), 2.55 * parseFloat(result[2]), 2.55 * parseFloat(result[3]) ] :(result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) ? [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ] :(result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) ? [ parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16) ] :(result = /rgba\(0, 0, 0, 0\)/.exec(color)) ? colors.transparent :colors[$.trim(color).toLowerCase()];
}
function getColor(elem, attr) {
var color;
do {
if (color = ($.curCSS || $.css)(elem, attr), "" != color && "transparent" != color || $.nodeName(elem, "body")) break;
attr = "backgroundColor";
} while (elem = elem.parentNode);
return getRGB(color);
}
function getElementStyles() {
var key, camelCase, style = document.defaultView ? document.defaultView.getComputedStyle(this, null) :this.currentStyle, newStyle = {};
if (style && style.length && style[0] && style[style[0]]) for (var len = style.length; len--; ) key = style[len], 
"string" == typeof style[key] && (camelCase = key.replace(/\-(\w)/g, function(all, letter) {
return letter.toUpperCase();
}), newStyle[camelCase] = style[key]); else for (key in style) "string" == typeof style[key] && (newStyle[key] = style[key]);
return newStyle;
}
function filterStyles(styles) {
var name, value;
for (name in styles) value = styles[name], (null == value || $.isFunction(value) || name in shorthandStyles || /scrollbar/.test(name) || !/color/i.test(name) && isNaN(parseFloat(value))) && delete styles[name];
return styles;
}
function styleDifference(oldStyle, newStyle) {
var name, diff = {
_:0
};
for (name in newStyle) oldStyle[name] != newStyle[name] && (diff[name] = newStyle[name]);
return diff;
}
function _normalizeArguments(effect, options, speed, callback) {
return "object" == typeof effect && (callback = options, speed = null, options = effect, 
effect = options.effect), $.isFunction(options) && (callback = options, speed = null, 
options = {}), ("number" == typeof options || $.fx.speeds[options]) && (callback = speed, 
speed = options, options = {}), $.isFunction(speed) && (callback = speed, speed = null), 
options = options || {}, speed = speed || options.duration, speed = $.fx.off ? 0 :"number" == typeof speed ? speed :speed in $.fx.speeds ? $.fx.speeds[speed] :$.fx.speeds._default, 
callback = callback || options.complete, [ effect, options, speed, callback ];
}
function standardSpeed(speed) {
return !speed || "number" == typeof speed || $.fx.speeds[speed] ? !0 :"string" != typeof speed || $.effects[speed] ? !1 :!0;
}
$.effects = {}, $.each([ "backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor" ], function(i, attr) {
$.fx.step[attr] = function(fx) {
fx.colorInit || (fx.start = getColor(fx.elem, attr), fx.end = getRGB(fx.end), fx.colorInit = !0), 
fx.elem.style[attr] = "rgb(" + Math.max(Math.min(parseInt(fx.pos * (fx.end[0] - fx.start[0]) + fx.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(fx.pos * (fx.end[1] - fx.start[1]) + fx.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(fx.pos * (fx.end[2] - fx.start[2]) + fx.start[2], 10), 255), 0) + ")";
};
});
var colors = {
aqua:[ 0, 255, 255 ],
azure:[ 240, 255, 255 ],
beige:[ 245, 245, 220 ],
black:[ 0, 0, 0 ],
blue:[ 0, 0, 255 ],
brown:[ 165, 42, 42 ],
cyan:[ 0, 255, 255 ],
darkblue:[ 0, 0, 139 ],
darkcyan:[ 0, 139, 139 ],
darkgrey:[ 169, 169, 169 ],
darkgreen:[ 0, 100, 0 ],
darkkhaki:[ 189, 183, 107 ],
darkmagenta:[ 139, 0, 139 ],
darkolivegreen:[ 85, 107, 47 ],
darkorange:[ 255, 140, 0 ],
darkorchid:[ 153, 50, 204 ],
darkred:[ 139, 0, 0 ],
darksalmon:[ 233, 150, 122 ],
darkviolet:[ 148, 0, 211 ],
fuchsia:[ 255, 0, 255 ],
gold:[ 255, 215, 0 ],
green:[ 0, 128, 0 ],
indigo:[ 75, 0, 130 ],
khaki:[ 240, 230, 140 ],
lightblue:[ 173, 216, 230 ],
lightcyan:[ 224, 255, 255 ],
lightgreen:[ 144, 238, 144 ],
lightgrey:[ 211, 211, 211 ],
lightpink:[ 255, 182, 193 ],
lightyellow:[ 255, 255, 224 ],
lime:[ 0, 255, 0 ],
magenta:[ 255, 0, 255 ],
maroon:[ 128, 0, 0 ],
navy:[ 0, 0, 128 ],
olive:[ 128, 128, 0 ],
orange:[ 255, 165, 0 ],
pink:[ 255, 192, 203 ],
purple:[ 128, 0, 128 ],
violet:[ 128, 0, 128 ],
red:[ 255, 0, 0 ],
silver:[ 192, 192, 192 ],
white:[ 255, 255, 255 ],
yellow:[ 255, 255, 0 ],
transparent:[ 255, 255, 255 ]
}, classAnimationActions = [ "add", "remove", "toggle" ], shorthandStyles = {
border:1,
borderBottom:1,
borderColor:1,
borderLeft:1,
borderRight:1,
borderTop:1,
borderWidth:1,
margin:1,
padding:1
};
$.effects.animateClass = function(value, duration, easing, callback) {
return $.isFunction(easing) && (callback = easing, easing = null), this.queue(function() {
var newStyle, that = $(this), originalStyleAttr = that.attr("style") || " ", originalStyle = filterStyles(getElementStyles.call(this)), className = that.attr("class") || "";
$.each(classAnimationActions, function(i, action) {
value[action] && that[action + "Class"](value[action]);
}), newStyle = filterStyles(getElementStyles.call(this)), that.attr("class", className), 
that.animate(styleDifference(originalStyle, newStyle), {
queue:!1,
duration:duration,
easing:easing,
complete:function() {
$.each(classAnimationActions, function(i, action) {
value[action] && that[action + "Class"](value[action]);
}), "object" == typeof that.attr("style") ? (that.attr("style").cssText = "", that.attr("style").cssText = originalStyleAttr) :that.attr("style", originalStyleAttr), 
callback && callback.apply(this, arguments), $.dequeue(this);
}
});
});
}, $.fn.extend({
_addClass:$.fn.addClass,
addClass:function(classNames, speed, easing, callback) {
return speed ? $.effects.animateClass.apply(this, [ {
add:classNames
}, speed, easing, callback ]) :this._addClass(classNames);
},
_removeClass:$.fn.removeClass,
removeClass:function(classNames, speed, easing, callback) {
return speed ? $.effects.animateClass.apply(this, [ {
remove:classNames
}, speed, easing, callback ]) :this._removeClass(classNames);
},
_toggleClass:$.fn.toggleClass,
toggleClass:function(classNames, force, speed, easing, callback) {
return "boolean" == typeof force || force === undefined ? speed ? $.effects.animateClass.apply(this, [ force ? {
add:classNames
} :{
remove:classNames
}, speed, easing, callback ]) :this._toggleClass(classNames, force) :$.effects.animateClass.apply(this, [ {
toggle:classNames
}, force, speed, easing ]);
},
switchClass:function(remove, add, speed, easing, callback) {
return $.effects.animateClass.apply(this, [ {
add:add,
remove:remove
}, speed, easing, callback ]);
}
}), $.extend($.effects, {
version:"1.8.23",
save:function(element, set) {
for (var i = 0; i < set.length; i++) null !== set[i] && element.data("ec.storage." + set[i], element[0].style[set[i]]);
},
restore:function(element, set) {
for (var i = 0; i < set.length; i++) null !== set[i] && element.css(set[i], element.data("ec.storage." + set[i]));
},
setMode:function(el, mode) {
return "toggle" == mode && (mode = el.is(":hidden") ? "show" :"hide"), mode;
},
getBaseline:function(origin, original) {
var y, x;
switch (origin[0]) {
case "top":
y = 0;
break;

case "middle":
y = .5;
break;

case "bottom":
y = 1;
break;

default:
y = origin[0] / original.height;
}
switch (origin[1]) {
case "left":
x = 0;
break;

case "center":
x = .5;
break;

case "right":
x = 1;
break;

default:
x = origin[1] / original.width;
}
return {
x:x,
y:y
};
},
createWrapper:function(element) {
if (element.parent().is(".ui-effects-wrapper")) return element.parent();
var props = {
width:element.outerWidth(!0),
height:element.outerHeight(!0),
"float":element.css("float")
}, wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
fontSize:"100%",
background:"transparent",
border:"none",
margin:0,
padding:0
}), active = document.activeElement;
try {
active.id;
} catch (e) {
active = document.body;
}
return element.wrap(wrapper), (element[0] === active || $.contains(element[0], active)) && $(active).focus(), 
wrapper = element.parent(), "static" == element.css("position") ? (wrapper.css({
position:"relative"
}), element.css({
position:"relative"
})) :($.extend(props, {
position:element.css("position"),
zIndex:element.css("z-index")
}), $.each([ "top", "left", "bottom", "right" ], function(i, pos) {
props[pos] = element.css(pos), isNaN(parseInt(props[pos], 10)) && (props[pos] = "auto");
}), element.css({
position:"relative",
top:0,
left:0,
right:"auto",
bottom:"auto"
})), wrapper.css(props).show();
},
removeWrapper:function(element) {
var parent, active = document.activeElement;
return element.parent().is(".ui-effects-wrapper") ? (parent = element.parent().replaceWith(element), 
(element[0] === active || $.contains(element[0], active)) && $(active).focus(), 
parent) :element;
},
setTransition:function(element, list, factor, value) {
return value = value || {}, $.each(list, function(i, x) {
var unit = element.cssUnit(x);
unit[0] > 0 && (value[x] = unit[0] * factor + unit[1]);
}), value;
}
}), $.fn.extend({
effect:function(effect) {
var args = _normalizeArguments.apply(this, arguments), args2 = {
options:args[1],
duration:args[2],
callback:args[3]
}, mode = args2.options.mode, effectMethod = $.effects[effect];
return $.fx.off || !effectMethod ? mode ? this[mode](args2.duration, args2.callback) :this.each(function() {
args2.callback && args2.callback.call(this);
}) :effectMethod.call(this, args2);
},
_show:$.fn.show,
show:function(speed) {
if (standardSpeed(speed)) return this._show.apply(this, arguments);
var args = _normalizeArguments.apply(this, arguments);
return args[1].mode = "show", this.effect.apply(this, args);
},
_hide:$.fn.hide,
hide:function(speed) {
if (standardSpeed(speed)) return this._hide.apply(this, arguments);
var args = _normalizeArguments.apply(this, arguments);
return args[1].mode = "hide", this.effect.apply(this, args);
},
__toggle:$.fn.toggle,
toggle:function(speed) {
if (standardSpeed(speed) || "boolean" == typeof speed || $.isFunction(speed)) return this.__toggle.apply(this, arguments);
var args = _normalizeArguments.apply(this, arguments);
return args[1].mode = "toggle", this.effect.apply(this, args);
},
cssUnit:function(key) {
var style = this.css(key), val = [];
return $.each([ "em", "px", "%", "pt" ], function(i, unit) {
style.indexOf(unit) > 0 && (val = [ parseFloat(style), unit ]);
}), val;
}
});
var baseEasings = {};
$.each([ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function(i, name) {
baseEasings[name] = function(p) {
return Math.pow(p, i + 2);
};
}), $.extend(baseEasings, {
Sine:function(p) {
return 1 - Math.cos(p * Math.PI / 2);
},
Circ:function(p) {
return 1 - Math.sqrt(1 - p * p);
},
Elastic:function(p) {
return 0 === p || 1 === p ? p :-Math.pow(2, 8 * (p - 1)) * Math.sin((80 * (p - 1) - 7.5) * Math.PI / 15);
},
Back:function(p) {
return p * p * (3 * p - 2);
},
Bounce:function(p) {
for (var pow2, bounce = 4; p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11; ) ;
return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - p, 2);
}
}), $.each(baseEasings, function(name, easeIn) {
$.easing["easeIn" + name] = easeIn, $.easing["easeOut" + name] = function(p) {
return 1 - easeIn(1 - p);
}, $.easing["easeInOut" + name] = function(p) {
return .5 > p ? easeIn(2 * p) / 2 :easeIn(-2 * p + 2) / -2 + 1;
};
});
}(jQuery), function($) {
$.effects.blind = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], mode = $.effects.setMode(el, o.options.mode || "hide"), direction = o.options.direction || "vertical";
$.effects.save(el, props), el.show();
var wrapper = $.effects.createWrapper(el).css({
overflow:"hidden"
}), ref = "vertical" == direction ? "height" :"width", distance = "vertical" == direction ? wrapper.height() :wrapper.width();
"show" == mode && wrapper.css(ref, 0);
var animation = {};
animation[ref] = "show" == mode ? distance :0, wrapper.animate(animation, o.duration, o.options.easing, function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(el[0], arguments), el.dequeue();
});
});
};
}(jQuery), function($) {
$.effects.bounce = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], mode = $.effects.setMode(el, o.options.mode || "effect"), direction = o.options.direction || "up", distance = o.options.distance || 20, times = o.options.times || 5, speed = o.duration || 250;
/show|hide/.test(mode) && props.push("opacity"), $.effects.save(el, props), el.show(), 
$.effects.createWrapper(el);
var ref = "up" == direction || "down" == direction ? "top" :"left", motion = "up" == direction || "left" == direction ? "pos" :"neg", distance = o.options.distance || ("top" == ref ? el.outerHeight(!0) / 3 :el.outerWidth(!0) / 3);
if ("show" == mode && el.css("opacity", 0).css(ref, "pos" == motion ? -distance :distance), 
"hide" == mode && (distance /= 2 * times), "hide" != mode && times--, "show" == mode) {
var animation = {
opacity:1
};
animation[ref] = ("pos" == motion ? "+=" :"-=") + distance, el.animate(animation, speed / 2, o.options.easing), 
distance /= 2, times--;
}
for (var i = 0; times > i; i++) {
var animation1 = {}, animation2 = {};
animation1[ref] = ("pos" == motion ? "-=" :"+=") + distance, animation2[ref] = ("pos" == motion ? "+=" :"-=") + distance, 
el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing), 
distance = "hide" == mode ? 2 * distance :distance / 2;
}
if ("hide" == mode) {
var animation = {
opacity:0
};
animation[ref] = ("pos" == motion ? "-=" :"+=") + distance, el.animate(animation, speed / 2, o.options.easing, function() {
el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments);
});
} else {
var animation1 = {}, animation2 = {};
animation1[ref] = ("pos" == motion ? "-=" :"+=") + distance, animation2[ref] = ("pos" == motion ? "+=" :"-=") + distance, 
el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing, function() {
$.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments);
});
}
el.queue("fx", function() {
el.dequeue();
}), el.dequeue();
});
};
}(jQuery), function($) {
$.effects.clip = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right", "height", "width" ], mode = $.effects.setMode(el, o.options.mode || "hide"), direction = o.options.direction || "vertical";
$.effects.save(el, props), el.show();
var wrapper = $.effects.createWrapper(el).css({
overflow:"hidden"
}), animate = "IMG" == el[0].tagName ? wrapper :el, ref = {
size:"vertical" == direction ? "height" :"width",
position:"vertical" == direction ? "top" :"left"
}, distance = "vertical" == direction ? animate.height() :animate.width();
"show" == mode && (animate.css(ref.size, 0), animate.css(ref.position, distance / 2));
var animation = {};
animation[ref.size] = "show" == mode ? distance :0, animation[ref.position] = "show" == mode ? 0 :distance / 2, 
animate.animate(animation, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(el[0], arguments), el.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.drop = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right", "opacity" ], mode = $.effects.setMode(el, o.options.mode || "hide"), direction = o.options.direction || "left";
$.effects.save(el, props), el.show(), $.effects.createWrapper(el);
var ref = "up" == direction || "down" == direction ? "top" :"left", motion = "up" == direction || "left" == direction ? "pos" :"neg", distance = o.options.distance || ("top" == ref ? el.outerHeight(!0) / 2 :el.outerWidth(!0) / 2);
"show" == mode && el.css("opacity", 0).css(ref, "pos" == motion ? -distance :distance);
var animation = {
opacity:"show" == mode ? 1 :0
};
animation[ref] = ("show" == mode ? "pos" == motion ? "+=" :"-=" :"pos" == motion ? "-=" :"+=") + distance, 
el.animate(animation, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(this, arguments), el.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.explode = function(o) {
return this.queue(function() {
var rows = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) :3, cells = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) :3;
o.options.mode = "toggle" == o.options.mode ? $(this).is(":visible") ? "hide" :"show" :o.options.mode;
var el = $(this).show().css("visibility", "hidden"), offset = el.offset();
offset.top -= parseInt(el.css("marginTop"), 10) || 0, offset.left -= parseInt(el.css("marginLeft"), 10) || 0;
for (var width = el.outerWidth(!0), height = el.outerHeight(!0), i = 0; rows > i; i++) for (var j = 0; cells > j; j++) el.clone().appendTo("body").wrap("<div></div>").css({
position:"absolute",
visibility:"visible",
left:-j * (width / cells),
top:-i * (height / rows)
}).parent().addClass("ui-effects-explode").css({
position:"absolute",
overflow:"hidden",
width:width / cells,
height:height / rows,
left:offset.left + j * (width / cells) + ("show" == o.options.mode ? (j - Math.floor(cells / 2)) * (width / cells) :0),
top:offset.top + i * (height / rows) + ("show" == o.options.mode ? (i - Math.floor(rows / 2)) * (height / rows) :0),
opacity:"show" == o.options.mode ? 0 :1
}).animate({
left:offset.left + j * (width / cells) + ("show" == o.options.mode ? 0 :(j - Math.floor(cells / 2)) * (width / cells)),
top:offset.top + i * (height / rows) + ("show" == o.options.mode ? 0 :(i - Math.floor(rows / 2)) * (height / rows)),
opacity:"show" == o.options.mode ? 1 :0
}, o.duration || 500);
setTimeout(function() {
"show" == o.options.mode ? el.css({
visibility:"visible"
}) :el.css({
visibility:"visible"
}).hide(), o.callback && o.callback.apply(el[0]), el.dequeue(), $("div.ui-effects-explode").remove();
}, o.duration || 500);
});
};
}(jQuery), function($) {
$.effects.fade = function(o) {
return this.queue(function() {
var elem = $(this), mode = $.effects.setMode(elem, o.options.mode || "hide");
elem.animate({
opacity:mode
}, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
o.callback && o.callback.apply(this, arguments), elem.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.fold = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], mode = $.effects.setMode(el, o.options.mode || "hide"), size = o.options.size || 15, horizFirst = !!o.options.horizFirst, duration = o.duration ? o.duration / 2 :$.fx.speeds._default / 2;
$.effects.save(el, props), el.show();
var wrapper = $.effects.createWrapper(el).css({
overflow:"hidden"
}), widthFirst = "show" == mode != horizFirst, ref = widthFirst ? [ "width", "height" ] :[ "height", "width" ], distance = widthFirst ? [ wrapper.width(), wrapper.height() ] :[ wrapper.height(), wrapper.width() ], percent = /([0-9]+)%/.exec(size);
percent && (size = parseInt(percent[1], 10) / 100 * distance["hide" == mode ? 0 :1]), 
"show" == mode && wrapper.css(horizFirst ? {
height:0,
width:size
} :{
height:size,
width:0
});
var animation1 = {}, animation2 = {};
animation1[ref[0]] = "show" == mode ? distance[0] :size, animation2[ref[1]] = "show" == mode ? distance[1] :0, 
wrapper.animate(animation1, duration, o.options.easing).animate(animation2, duration, o.options.easing, function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(el[0], arguments), el.dequeue();
});
});
};
}(jQuery), function($) {
$.effects.highlight = function(o) {
return this.queue(function() {
var elem = $(this), props = [ "backgroundImage", "backgroundColor", "opacity" ], mode = $.effects.setMode(elem, o.options.mode || "show"), animation = {
backgroundColor:elem.css("backgroundColor")
};
"hide" == mode && (animation.opacity = 0), $.effects.save(elem, props), elem.show().css({
backgroundImage:"none",
backgroundColor:o.options.color || "#ffff99"
}).animate(animation, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
"hide" == mode && elem.hide(), $.effects.restore(elem, props), "show" == mode && !$.support.opacity && this.style.removeAttribute("filter"), 
o.callback && o.callback.apply(this, arguments), elem.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.pulsate = function(o) {
return this.queue(function() {
var elem = $(this), mode = $.effects.setMode(elem, o.options.mode || "show"), times = 2 * (o.options.times || 5) - 1, duration = o.duration ? o.duration / 2 :$.fx.speeds._default / 2, isVisible = elem.is(":visible"), animateTo = 0;
isVisible || (elem.css("opacity", 0).show(), animateTo = 1), ("hide" == mode && isVisible || "show" == mode && !isVisible) && times--;
for (var i = 0; times > i; i++) elem.animate({
opacity:animateTo
}, duration, o.options.easing), animateTo = (animateTo + 1) % 2;
elem.animate({
opacity:animateTo
}, duration, o.options.easing, function() {
0 == animateTo && elem.hide(), o.callback && o.callback.apply(this, arguments);
}), elem.queue("fx", function() {
elem.dequeue();
}).dequeue();
});
};
}(jQuery), function($) {
$.effects.puff = function(o) {
return this.queue(function() {
var elem = $(this), mode = $.effects.setMode(elem, o.options.mode || "hide"), percent = parseInt(o.options.percent, 10) || 150, factor = percent / 100, original = {
height:elem.height(),
width:elem.width()
};
$.extend(o.options, {
fade:!0,
mode:mode,
percent:"hide" == mode ? percent :100,
from:"hide" == mode ? original :{
height:original.height * factor,
width:original.width * factor
}
}), elem.effect("scale", o.options, o.duration, o.callback), elem.dequeue();
});
}, $.effects.scale = function(o) {
return this.queue(function() {
var el = $(this), options = $.extend(!0, {}, o.options), mode = $.effects.setMode(el, o.options.mode || "effect"), percent = parseInt(o.options.percent, 10) || (0 == parseInt(o.options.percent, 10) ? 0 :"hide" == mode ? 0 :100), direction = o.options.direction || "both", origin = o.options.origin;
"effect" != mode && (options.origin = origin || [ "middle", "center" ], options.restore = !0);
var original = {
height:el.height(),
width:el.width()
};
el.from = o.options.from || ("show" == mode ? {
height:0,
width:0
} :original);
var factor = {
y:"horizontal" != direction ? percent / 100 :1,
x:"vertical" != direction ? percent / 100 :1
};
el.to = {
height:original.height * factor.y,
width:original.width * factor.x
}, o.options.fade && ("show" == mode && (el.from.opacity = 0, el.to.opacity = 1), 
"hide" == mode && (el.from.opacity = 1, el.to.opacity = 0)), options.from = el.from, 
options.to = el.to, options.mode = mode, el.effect("size", options, o.duration, o.callback), 
el.dequeue();
});
}, $.effects.size = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity" ], props1 = [ "position", "top", "bottom", "left", "right", "overflow", "opacity" ], props2 = [ "width", "height", "overflow" ], cProps = [ "fontSize" ], vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ], hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ], mode = $.effects.setMode(el, o.options.mode || "effect"), restore = o.options.restore || !1, scale = o.options.scale || "both", origin = o.options.origin, original = {
height:el.height(),
width:el.width()
};
if (el.from = o.options.from || original, el.to = o.options.to || original, origin) {
var baseline = $.effects.getBaseline(origin, original);
el.from.top = (original.height - el.from.height) * baseline.y, el.from.left = (original.width - el.from.width) * baseline.x, 
el.to.top = (original.height - el.to.height) * baseline.y, el.to.left = (original.width - el.to.width) * baseline.x;
}
var factor = {
from:{
y:el.from.height / original.height,
x:el.from.width / original.width
},
to:{
y:el.to.height / original.height,
x:el.to.width / original.width
}
};
("box" == scale || "both" == scale) && (factor.from.y != factor.to.y && (props = props.concat(vProps), 
el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from), el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to)), 
factor.from.x != factor.to.x && (props = props.concat(hProps), el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from), 
el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to))), ("content" == scale || "both" == scale) && factor.from.y != factor.to.y && (props = props.concat(cProps), 
el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from), el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to)), 
$.effects.save(el, restore ? props :props1), el.show(), $.effects.createWrapper(el), 
el.css("overflow", "hidden").css(el.from), ("content" == scale || "both" == scale) && (vProps = vProps.concat([ "marginTop", "marginBottom" ]).concat(cProps), 
hProps = hProps.concat([ "marginLeft", "marginRight" ]), props2 = props.concat(vProps).concat(hProps), 
el.find("*[width]").each(function() {
var child = $(this);
restore && $.effects.save(child, props2);
var c_original = {
height:child.height(),
width:child.width()
};
child.from = {
height:c_original.height * factor.from.y,
width:c_original.width * factor.from.x
}, child.to = {
height:c_original.height * factor.to.y,
width:c_original.width * factor.to.x
}, factor.from.y != factor.to.y && (child.from = $.effects.setTransition(child, vProps, factor.from.y, child.from), 
child.to = $.effects.setTransition(child, vProps, factor.to.y, child.to)), factor.from.x != factor.to.x && (child.from = $.effects.setTransition(child, hProps, factor.from.x, child.from), 
child.to = $.effects.setTransition(child, hProps, factor.to.x, child.to)), child.css(child.from), 
child.animate(child.to, o.duration, o.options.easing, function() {
restore && $.effects.restore(child, props2);
});
})), el.animate(el.to, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
0 === el.to.opacity && el.css("opacity", el.from.opacity), "hide" == mode && el.hide(), 
$.effects.restore(el, restore ? props :props1), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments), 
el.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.shake = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], direction = ($.effects.setMode(el, o.options.mode || "effect"), 
o.options.direction || "left"), distance = o.options.distance || 20, times = o.options.times || 3, speed = o.duration || o.options.duration || 140;
$.effects.save(el, props), el.show(), $.effects.createWrapper(el);
var ref = "up" == direction || "down" == direction ? "top" :"left", motion = "up" == direction || "left" == direction ? "pos" :"neg", animation = {}, animation1 = {}, animation2 = {};
animation[ref] = ("pos" == motion ? "-=" :"+=") + distance, animation1[ref] = ("pos" == motion ? "+=" :"-=") + 2 * distance, 
animation2[ref] = ("pos" == motion ? "-=" :"+=") + 2 * distance, el.animate(animation, speed, o.options.easing);
for (var i = 1; times > i; i++) el.animate(animation1, speed, o.options.easing).animate(animation2, speed, o.options.easing);
el.animate(animation1, speed, o.options.easing).animate(animation, speed / 2, o.options.easing, function() {
$.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments);
}), el.queue("fx", function() {
el.dequeue();
}), el.dequeue();
});
};
}(jQuery), function($) {
$.effects.slide = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], mode = $.effects.setMode(el, o.options.mode || "show"), direction = o.options.direction || "left";
$.effects.save(el, props), el.show(), $.effects.createWrapper(el).css({
overflow:"hidden"
});
var ref = "up" == direction || "down" == direction ? "top" :"left", motion = "up" == direction || "left" == direction ? "pos" :"neg", distance = o.options.distance || ("top" == ref ? el.outerHeight(!0) :el.outerWidth(!0));
"show" == mode && el.css(ref, "pos" == motion ? isNaN(distance) ? "-" + distance :-distance :distance);
var animation = {};
animation[ref] = ("show" == mode ? "pos" == motion ? "+=" :"-=" :"pos" == motion ? "-=" :"+=") + distance, 
el.animate(animation, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(this, arguments), el.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.transfer = function(o) {
return this.queue(function() {
var elem = $(this), target = $(o.options.to), endPosition = target.offset(), animation = {
top:endPosition.top,
left:endPosition.left,
height:target.innerHeight(),
width:target.innerWidth()
}, startPosition = elem.offset(), transfer = $('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(o.options.className).css({
top:startPosition.top,
left:startPosition.left,
height:elem.innerHeight(),
width:elem.innerWidth(),
position:"absolute"
}).animate(animation, o.duration, o.options.easing, function() {
transfer.remove(), o.callback && o.callback.apply(elem[0], arguments), elem.dequeue();
});
});
};
}(jQuery), function($) {
$.widget("ui.accordion", {
options:{
active:0,
animated:"slide",
autoHeight:!0,
clearStyle:!1,
collapsible:!1,
event:"click",
fillSpace:!1,
header:"> li > :first-child,> :not(li):even",
icons:{
header:"ui-icon-triangle-1-e",
headerSelected:"ui-icon-triangle-1-s"
},
navigation:!1,
navigationFilter:function() {
return this.href.toLowerCase() === location.href.toLowerCase();
}
},
_create:function() {
var self = this, options = self.options;
if (self.running = 0, self.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), 
self.headers = self.element.find(options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
options.disabled || $(this).addClass("ui-state-hover");
}).bind("mouseleave.accordion", function() {
options.disabled || $(this).removeClass("ui-state-hover");
}).bind("focus.accordion", function() {
options.disabled || $(this).addClass("ui-state-focus");
}).bind("blur.accordion", function() {
options.disabled || $(this).removeClass("ui-state-focus");
}), self.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"), 
options.navigation) {
var current = self.element.find("a").filter(options.navigationFilter).eq(0);
if (current.length) {
var header = current.closest(".ui-accordion-header");
self.active = header.length ? header :current.closest(".ui-accordion-content").prev();
}
}
self.active = self._findActive(self.active || options.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), 
self.active.next().addClass("ui-accordion-content-active"), self._createIcons(), 
self.resize(), self.element.attr("role", "tablist"), self.headers.attr("role", "tab").bind("keydown.accordion", function(event) {
return self._keydown(event);
}).next().attr("role", "tabpanel"), self.headers.not(self.active || "").attr({
"aria-expanded":"false",
"aria-selected":"false",
tabIndex:-1
}).next().hide(), self.active.length ? self.active.attr({
"aria-expanded":"true",
"aria-selected":"true",
tabIndex:0
}) :self.headers.eq(0).attr("tabIndex", 0), $.browser.safari || self.headers.find("a").attr("tabIndex", -1), 
options.event && self.headers.bind(options.event.split(" ").join(".accordion ") + ".accordion", function(event) {
self._clickHandler.call(self, event, this), event.preventDefault();
});
},
_createIcons:function() {
var options = this.options;
options.icons && ($("<span></span>").addClass("ui-icon " + options.icons.header).prependTo(this.headers), 
this.active.children(".ui-icon").toggleClass(options.icons.header).toggleClass(options.icons.headerSelected), 
this.element.addClass("ui-accordion-icons"));
},
_destroyIcons:function() {
this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons");
},
destroy:function() {
var options = this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), 
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), 
this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
var contents = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
return (options.autoHeight || options.fillHeight) && contents.css("height", ""), 
$.Widget.prototype.destroy.call(this);
},
_setOption:function(key, value) {
$.Widget.prototype._setOption.apply(this, arguments), "active" == key && this.activate(value), 
"icons" == key && (this._destroyIcons(), value && this._createIcons()), "disabled" == key && this.headers.add(this.headers.next())[value ? "addClass" :"removeClass"]("ui-accordion-disabled ui-state-disabled");
},
_keydown:function(event) {
if (!(this.options.disabled || event.altKey || event.ctrlKey)) {
var keyCode = $.ui.keyCode, length = this.headers.length, currentIndex = this.headers.index(event.target), toFocus = !1;
switch (event.keyCode) {
case keyCode.RIGHT:
case keyCode.DOWN:
toFocus = this.headers[(currentIndex + 1) % length];
break;

case keyCode.LEFT:
case keyCode.UP:
toFocus = this.headers[(currentIndex - 1 + length) % length];
break;

case keyCode.SPACE:
case keyCode.ENTER:
this._clickHandler({
target:event.target
}, event.target), event.preventDefault();
}
return toFocus ? ($(event.target).attr("tabIndex", -1), $(toFocus).attr("tabIndex", 0), 
toFocus.focus(), !1) :!0;
}
},
resize:function() {
var maxHeight, options = this.options;
if (options.fillSpace) {
if ($.browser.msie) {
var defOverflow = this.element.parent().css("overflow");
this.element.parent().css("overflow", "hidden");
}
maxHeight = this.element.parent().height(), $.browser.msie && this.element.parent().css("overflow", defOverflow), 
this.headers.each(function() {
maxHeight -= $(this).outerHeight(!0);
}), this.headers.next().each(function() {
$(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()));
}).css("overflow", "auto");
} else options.autoHeight && (maxHeight = 0, this.headers.next().each(function() {
maxHeight = Math.max(maxHeight, $(this).height("").height());
}).height(maxHeight));
return this;
},
activate:function(index) {
this.options.active = index;
var active = this._findActive(index)[0];
return this._clickHandler({
target:active
}, active), this;
},
_findActive:function(selector) {
return selector ? "number" == typeof selector ? this.headers.filter(":eq(" + selector + ")") :this.headers.not(this.headers.not(selector)) :selector === !1 ? $([]) :this.headers.filter(":eq(0)");
},
_clickHandler:function(event, target) {
var options = this.options;
if (!options.disabled) {
if (!event.target) {
if (!options.collapsible) return;
this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header), 
this.active.next().addClass("ui-accordion-content-active");
var toHide = this.active.next(), data = {
options:options,
newHeader:$([]),
oldHeader:options.active,
newContent:$([]),
oldContent:toHide
}, toShow = this.active = $([]);
return this._toggle(toShow, toHide, data), void 0;
}
var clicked = $(event.currentTarget || target), clickedIsActive = clicked[0] === this.active[0];
if (options.active = options.collapsible && clickedIsActive ? !1 :this.headers.index(clicked), 
!(this.running || !options.collapsible && clickedIsActive)) {
var active = this.active, toShow = clicked.next(), toHide = this.active.next(), data = {
options:options,
newHeader:clickedIsActive && options.collapsible ? $([]) :clicked,
oldHeader:this.active,
newContent:clickedIsActive && options.collapsible ? $([]) :toShow,
oldContent:toHide
}, down = this.headers.index(this.active[0]) > this.headers.index(clicked[0]);
this.active = clickedIsActive ? $([]) :clicked, this._toggle(toShow, toHide, data, clickedIsActive, down), 
active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header), 
clickedIsActive || (clicked.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(options.icons.header).addClass(options.icons.headerSelected), 
clicked.next().addClass("ui-accordion-content-active"));
}
}
},
_toggle:function(toShow, toHide, data, clickedIsActive, down) {
var self = this, options = self.options;
self.toShow = toShow, self.toHide = toHide, self.data = data;
var complete = function() {
return self ? self._completed.apply(self, arguments) :void 0;
};
if (self._trigger("changestart", null, self.data), self.running = 0 === toHide.size() ? toShow.size() :toHide.size(), 
options.animated) {
var animOptions = {};
animOptions = options.collapsible && clickedIsActive ? {
toShow:$([]),
toHide:toHide,
complete:complete,
down:down,
autoHeight:options.autoHeight || options.fillSpace
} :{
toShow:toShow,
toHide:toHide,
complete:complete,
down:down,
autoHeight:options.autoHeight || options.fillSpace
}, options.proxied || (options.proxied = options.animated), options.proxiedDuration || (options.proxiedDuration = options.duration), 
options.animated = $.isFunction(options.proxied) ? options.proxied(animOptions) :options.proxied, 
options.duration = $.isFunction(options.proxiedDuration) ? options.proxiedDuration(animOptions) :options.proxiedDuration;
var animations = $.ui.accordion.animations, duration = options.duration, easing = options.animated;
!easing || animations[easing] || $.easing[easing] || (easing = "slide"), animations[easing] || (animations[easing] = function(options) {
this.slide(options, {
easing:easing,
duration:duration || 700
});
}), animations[easing](animOptions);
} else options.collapsible && clickedIsActive ? toShow.toggle() :(toHide.hide(), 
toShow.show()), complete(!0);
toHide.prev().attr({
"aria-expanded":"false",
"aria-selected":"false",
tabIndex:-1
}).blur(), toShow.prev().attr({
"aria-expanded":"true",
"aria-selected":"true",
tabIndex:0
}).focus();
},
_completed:function(cancel) {
this.running = cancel ? 0 :--this.running, this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
height:"",
overflow:""
}), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), 
this._trigger("change", null, this.data));
}
}), $.extend($.ui.accordion, {
version:"1.8.23",
animations:{
slide:function(options, additions) {
if (options = $.extend({
easing:"swing",
duration:300
}, options, additions), !options.toHide.size()) return options.toShow.animate({
height:"show",
paddingTop:"show",
paddingBottom:"show"
}, options), void 0;
if (!options.toShow.size()) return options.toHide.animate({
height:"hide",
paddingTop:"hide",
paddingBottom:"hide"
}, options), void 0;
var originalWidth, overflow = options.toShow.css("overflow"), percentDone = 0, showProps = {}, hideProps = {}, fxAttrs = [ "height", "paddingTop", "paddingBottom" ], s = options.toShow;
originalWidth = s[0].style.width, s.width(s.parent().width() - parseFloat(s.css("paddingLeft")) - parseFloat(s.css("paddingRight")) - (parseFloat(s.css("borderLeftWidth")) || 0) - (parseFloat(s.css("borderRightWidth")) || 0)), 
$.each(fxAttrs, function(i, prop) {
hideProps[prop] = "hide";
var parts = ("" + $.css(options.toShow[0], prop)).match(/^([\d+-.]+)(.*)$/);
showProps[prop] = {
value:parts[1],
unit:parts[2] || "px"
};
}), options.toShow.css({
height:0,
overflow:"hidden"
}).show(), options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate(hideProps, {
step:function(now, settings) {
"height" == settings.prop && (percentDone = settings.end - settings.start === 0 ? 0 :(settings.now - settings.start) / (settings.end - settings.start)), 
options.toShow[0].style[settings.prop] = percentDone * showProps[settings.prop].value + showProps[settings.prop].unit;
},
duration:options.duration,
easing:options.easing,
complete:function() {
options.autoHeight || options.toShow.css("height", ""), options.toShow.css({
width:originalWidth,
overflow:overflow
}), options.complete();
}
});
},
bounceslide:function(options) {
this.slide(options, {
easing:options.down ? "easeOutBounce" :"swing",
duration:options.down ? 1e3 :200
});
}
}
});
}(jQuery), function($) {
var requestIndex = 0;
$.widget("ui.autocomplete", {
options:{
appendTo:"body",
autoFocus:!1,
delay:300,
minLength:1,
position:{
my:"left top",
at:"left bottom",
collision:"none"
},
source:null
},
pending:0,
_create:function() {
var suppressKeyPress, self = this, doc = this.element[0].ownerDocument;
this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
role:"textbox",
"aria-autocomplete":"list",
"aria-haspopup":"true"
}).bind("keydown.autocomplete", function(event) {
if (!self.options.disabled && !self.element.propAttr("readOnly")) {
suppressKeyPress = !1;
var keyCode = $.ui.keyCode;
switch (event.keyCode) {
case keyCode.PAGE_UP:
self._move("previousPage", event);
break;

case keyCode.PAGE_DOWN:
self._move("nextPage", event);
break;

case keyCode.UP:
self._keyEvent("previous", event);
break;

case keyCode.DOWN:
self._keyEvent("next", event);
break;

case keyCode.ENTER:
case keyCode.NUMPAD_ENTER:
self.menu.active && (suppressKeyPress = !0, event.preventDefault());

case keyCode.TAB:
if (!self.menu.active) return;
self.menu.select(event);
break;

case keyCode.ESCAPE:
self.element.val(self.term), self.close(event);
break;

default:
clearTimeout(self.searching), self.searching = setTimeout(function() {
self.term != self.element.val() && (self.selectedItem = null, self.search(null, event));
}, self.options.delay);
}
}
}).bind("keypress.autocomplete", function(event) {
suppressKeyPress && (suppressKeyPress = !1, event.preventDefault());
}).bind("focus.autocomplete", function() {
self.options.disabled || (self.selectedItem = null, self.previous = self.element.val());
}).bind("blur.autocomplete", function(event) {
self.options.disabled || (clearTimeout(self.searching), self.closing = setTimeout(function() {
self.close(event), self._change(event);
}, 150));
}), this._initSource(), this.menu = $("<ul></ul>").addClass("ui-autocomplete").appendTo($(this.options.appendTo || "body", doc)[0]).mousedown(function(event) {
var menuElement = self.menu.element[0];
$(event.target).closest(".ui-menu-item").length || setTimeout(function() {
$(document).one("mousedown", function(event) {
event.target === self.element[0] || event.target === menuElement || $.ui.contains(menuElement, event.target) || self.close();
});
}, 1), setTimeout(function() {
clearTimeout(self.closing);
}, 13);
}).menu({
focus:function(event, ui) {
var item = ui.item.data("item.autocomplete");
!1 !== self._trigger("focus", event, {
item:item
}) && /^key/.test(event.originalEvent.type) && self.element.val(item.value);
},
selected:function(event, ui) {
var item = ui.item.data("item.autocomplete"), previous = self.previous;
self.element[0] !== doc.activeElement && (self.element.focus(), self.previous = previous, 
setTimeout(function() {
self.previous = previous, self.selectedItem = item;
}, 1)), !1 !== self._trigger("select", event, {
item:item
}) && self.element.val(item.value), self.term = self.element.val(), self.close(event), 
self.selectedItem = item;
},
blur:function() {
self.menu.element.is(":visible") && self.element.val() !== self.term && self.element.val(self.term);
}
}).zIndex(this.element.zIndex() + 1).css({
top:0,
left:0
}).hide().data("menu"), $.fn.bgiframe && this.menu.element.bgiframe(), self.beforeunloadHandler = function() {
self.element.removeAttr("autocomplete");
}, $(window).bind("beforeunload", self.beforeunloadHandler);
},
destroy:function() {
this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), 
this.menu.element.remove(), $(window).unbind("beforeunload", this.beforeunloadHandler), 
$.Widget.prototype.destroy.call(this);
},
_setOption:function(key, value) {
$.Widget.prototype._setOption.apply(this, arguments), "source" === key && this._initSource(), 
"appendTo" === key && this.menu.element.appendTo($(value || "body", this.element[0].ownerDocument)[0]), 
"disabled" === key && value && this.xhr && this.xhr.abort();
},
_initSource:function() {
var array, url, self = this;
$.isArray(this.options.source) ? (array = this.options.source, this.source = function(request, response) {
response($.ui.autocomplete.filter(array, request.term));
}) :"string" == typeof this.options.source ? (url = this.options.source, this.source = function(request, response) {
self.xhr && self.xhr.abort(), self.xhr = $.ajax({
url:url,
data:request,
dataType:"json",
success:function(data) {
response(data);
},
error:function() {
response([]);
}
});
}) :this.source = this.options.source;
},
search:function(value, event) {
return value = null != value ? value :this.element.val(), this.term = this.element.val(), 
value.length < this.options.minLength ? this.close(event) :(clearTimeout(this.closing), 
this._trigger("search", event) !== !1 ? this._search(value) :void 0);
},
_search:function(value) {
this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
term:value
}, this._response());
},
_response:function() {
var that = this, index = ++requestIndex;
return function(content) {
index === requestIndex && that.__response(content), that.pending--, that.pending || that.element.removeClass("ui-autocomplete-loading");
};
},
__response:function(content) {
!this.options.disabled && content && content.length ? (content = this._normalize(content), 
this._suggest(content), this._trigger("open")) :this.close();
},
close:function(event) {
clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), 
this.menu.deactivate(), this._trigger("close", event));
},
_change:function(event) {
this.previous !== this.element.val() && this._trigger("change", event, {
item:this.selectedItem
});
},
_normalize:function(items) {
return items.length && items[0].label && items[0].value ? items :$.map(items, function(item) {
return "string" == typeof item ? {
label:item,
value:item
} :$.extend({
label:item.label || item.value,
value:item.value || item.label
}, item);
});
},
_suggest:function(items) {
var ul = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
this._renderMenu(ul, items), this.menu.deactivate(), this.menu.refresh(), ul.show(), 
this._resizeMenu(), ul.position($.extend({
of:this.element
}, this.options.position)), this.options.autoFocus && this.menu.next(new $.Event("mouseover"));
},
_resizeMenu:function() {
var ul = this.menu.element;
ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()));
},
_renderMenu:function(ul, items) {
var self = this;
$.each(items, function(index, item) {
self._renderItem(ul, item);
});
},
_renderItem:function(ul, item) {
return $("<li></li>").data("item.autocomplete", item).append($("<a></a>").text(item.label)).appendTo(ul);
},
_move:function(direction, event) {
return this.menu.element.is(":visible") ? this.menu.first() && /^previous/.test(direction) || this.menu.last() && /^next/.test(direction) ? (this.element.val(this.term), 
this.menu.deactivate(), void 0) :(this.menu[direction](event), void 0) :(this.search(null, event), 
void 0);
},
widget:function() {
return this.menu.element;
},
_keyEvent:function(keyEvent, event) {
(!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(keyEvent, event), 
event.preventDefault());
}
}), $.extend($.ui.autocomplete, {
escapeRegex:function(value) {
return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
},
filter:function(array, term) {
var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
return $.grep(array, function(value) {
return matcher.test(value.label || value.value || value);
});
}
});
}(jQuery), /*
 * jQuery UI Menu (not officially released)
 * 
 * This widget isn't yet finished and the API is subject to change. We plan to finish
 * it for the next release. You're welcome to give it a try anyway and give us feedback,
 * as long as you're okay with migrating your code later on. We can help with that, too.
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Menu
 *
 * Depends:
 *	jquery.ui.core.js
 *  jquery.ui.widget.js
 */
function($) {
$.widget("ui.menu", {
_create:function() {
var self = this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
role:"listbox",
"aria-activedescendant":"ui-active-menuitem"
}).click(function(event) {
$(event.target).closest(".ui-menu-item a").length && (event.preventDefault(), self.select(event));
}), this.refresh();
},
refresh:function() {
var self = this, items = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
items.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(event) {
self.activate(event, $(this).parent());
}).mouseleave(function() {
self.deactivate();
});
},
activate:function(event, item) {
if (this.deactivate(), this.hasScroll()) {
var offset = item.offset().top - this.element.offset().top, scroll = this.element.scrollTop(), elementHeight = this.element.height();
0 > offset ? this.element.scrollTop(scroll + offset) :offset >= elementHeight && this.element.scrollTop(scroll + offset - elementHeight + item.height());
}
this.active = item.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), 
this._trigger("focus", event, {
item:item
});
},
deactivate:function() {
this.active && (this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), 
this._trigger("blur"), this.active = null);
},
next:function(event) {
this.move("next", ".ui-menu-item:first", event);
},
previous:function(event) {
this.move("prev", ".ui-menu-item:last", event);
},
first:function() {
return this.active && !this.active.prevAll(".ui-menu-item").length;
},
last:function() {
return this.active && !this.active.nextAll(".ui-menu-item").length;
},
move:function(direction, edge, event) {
if (!this.active) return this.activate(event, this.element.children(edge)), void 0;
var next = this.active[direction + "All"](".ui-menu-item").eq(0);
next.length ? this.activate(event, next) :this.activate(event, this.element.children(edge));
},
nextPage:function(event) {
if (this.hasScroll()) {
if (!this.active || this.last()) return this.activate(event, this.element.children(".ui-menu-item:first")), 
void 0;
var base = this.active.offset().top, height = this.element.height(), result = this.element.children(".ui-menu-item").filter(function() {
var close = $(this).offset().top - base - height + $(this).height();
return 10 > close && close > -10;
});
result.length || (result = this.element.children(".ui-menu-item:last")), this.activate(event, result);
} else this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" :":last"));
},
previousPage:function(event) {
if (this.hasScroll()) {
if (!this.active || this.first()) return this.activate(event, this.element.children(".ui-menu-item:last")), 
void 0;
var base = this.active.offset().top, height = this.element.height(), result = this.element.children(".ui-menu-item").filter(function() {
var close = $(this).offset().top - base + height - $(this).height();
return 10 > close && close > -10;
});
result.length || (result = this.element.children(".ui-menu-item:first")), this.activate(event, result);
} else this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" :":first"));
},
hasScroll:function() {
return this.element.height() < this.element[$.fn.prop ? "prop" :"attr"]("scrollHeight");
},
select:function(event) {
this._trigger("selected", event, {
item:this.active
});
}
});
}(jQuery), function($) {
var lastActive, startXPos, startYPos, clickDragged, baseClasses = "ui-button ui-widget ui-state-default ui-corner-all", stateClasses = "ui-state-hover ui-state-active ", typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", formResetHandler = function() {
var buttons = $(this).find(":ui-button");
setTimeout(function() {
buttons.button("refresh");
}, 1);
}, radioGroup = function(radio) {
var name = radio.name, form = radio.form, radios = $([]);
return name && (radios = form ? $(form).find("[name='" + name + "']") :$("[name='" + name + "']", radio.ownerDocument).filter(function() {
return !this.form;
})), radios;
};
$.widget("ui.button", {
options:{
disabled:null,
text:!0,
label:null,
icons:{
primary:null,
secondary:null
}
},
_create:function() {
this.element.closest("form").unbind("reset.button").bind("reset.button", formResetHandler), 
"boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.propAttr("disabled") :this.element.propAttr("disabled", this.options.disabled), 
this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
var self = this, options = this.options, toggleButton = "checkbox" === this.type || "radio" === this.type, hoverClass = "ui-state-hover" + (toggleButton ? "" :" ui-state-active"), focusClass = "ui-state-focus";
null === options.label && (options.label = this.buttonElement.html()), this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter.button", function() {
options.disabled || ($(this).addClass("ui-state-hover"), this === lastActive && $(this).addClass("ui-state-active"));
}).bind("mouseleave.button", function() {
options.disabled || $(this).removeClass(hoverClass);
}).bind("click.button", function(event) {
options.disabled && (event.preventDefault(), event.stopImmediatePropagation());
}), this.element.bind("focus.button", function() {
self.buttonElement.addClass(focusClass);
}).bind("blur.button", function() {
self.buttonElement.removeClass(focusClass);
}), toggleButton && (this.element.bind("change.button", function() {
clickDragged || self.refresh();
}), this.buttonElement.bind("mousedown.button", function(event) {
options.disabled || (clickDragged = !1, startXPos = event.pageX, startYPos = event.pageY);
}).bind("mouseup.button", function(event) {
options.disabled || (startXPos !== event.pageX || startYPos !== event.pageY) && (clickDragged = !0);
})), "checkbox" === this.type ? this.buttonElement.bind("click.button", function() {
return options.disabled || clickDragged ? !1 :($(this).toggleClass("ui-state-active"), 
self.buttonElement.attr("aria-pressed", self.element[0].checked), void 0);
}) :"radio" === this.type ? this.buttonElement.bind("click.button", function() {
if (options.disabled || clickDragged) return !1;
$(this).addClass("ui-state-active"), self.buttonElement.attr("aria-pressed", "true");
var radio = self.element[0];
radioGroup(radio).not(radio).map(function() {
return $(this).button("widget")[0];
}).removeClass("ui-state-active").attr("aria-pressed", "false");
}) :(this.buttonElement.bind("mousedown.button", function() {
return options.disabled ? !1 :($(this).addClass("ui-state-active"), lastActive = this, 
$(document).one("mouseup", function() {
lastActive = null;
}), void 0);
}).bind("mouseup.button", function() {
return options.disabled ? !1 :($(this).removeClass("ui-state-active"), void 0);
}).bind("keydown.button", function(event) {
return options.disabled ? !1 :((event.keyCode == $.ui.keyCode.SPACE || event.keyCode == $.ui.keyCode.ENTER) && $(this).addClass("ui-state-active"), 
void 0);
}).bind("keyup.button", function() {
$(this).removeClass("ui-state-active");
}), this.buttonElement.is("a") && this.buttonElement.keyup(function(event) {
event.keyCode === $.ui.keyCode.SPACE && $(this).click();
})), this._setOption("disabled", options.disabled), this._resetButton();
},
_determineButtonType:function() {
if (this.type = this.element.is(":checkbox") ? "checkbox" :this.element.is(":radio") ? "radio" :this.element.is("input") ? "input" :"button", 
"checkbox" === this.type || "radio" === this.type) {
var ancestor = this.element.parents().filter(":last"), labelSelector = "label[for='" + this.element.attr("id") + "']";
this.buttonElement = ancestor.find(labelSelector), this.buttonElement.length || (ancestor = ancestor.length ? ancestor.siblings() :this.element.siblings(), 
this.buttonElement = ancestor.filter(labelSelector), this.buttonElement.length || (this.buttonElement = ancestor.find(labelSelector))), 
this.element.addClass("ui-helper-hidden-accessible");
var checked = this.element.is(":checked");
checked && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", checked);
} else this.buttonElement = this.element;
},
widget:function() {
return this.buttonElement;
},
destroy:function() {
this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(baseClasses + " " + stateClasses + " " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), 
this.hasTitle || this.buttonElement.removeAttr("title"), $.Widget.prototype.destroy.call(this);
},
_setOption:function(key, value) {
return $.Widget.prototype._setOption.apply(this, arguments), "disabled" === key ? (value ? this.element.propAttr("disabled", !0) :this.element.propAttr("disabled", !1), 
void 0) :(this._resetButton(), void 0);
},
refresh:function() {
var isDisabled = this.element.is(":disabled");
isDisabled !== this.options.disabled && this._setOption("disabled", isDisabled), 
"radio" === this.type ? radioGroup(this.element[0]).each(function() {
$(this).is(":checked") ? $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") :$(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
}) :"checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") :this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));
},
_resetButton:function() {
if ("input" === this.type) return this.options.label && this.element.val(this.options.label), 
void 0;
var buttonElement = this.buttonElement.removeClass(typeClasses), buttonText = $("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(), icons = this.options.icons, multipleIcons = icons.primary && icons.secondary, buttonClasses = [];
icons.primary || icons.secondary ? (this.options.text && buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" :icons.primary ? "-primary" :"-secondary")), 
icons.primary && buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>"), 
icons.secondary && buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>"), 
this.options.text || (buttonClasses.push(multipleIcons ? "ui-button-icons-only" :"ui-button-icon-only"), 
this.hasTitle || buttonElement.attr("title", buttonText))) :buttonClasses.push("ui-button-text-only"), 
buttonElement.addClass(buttonClasses.join(" "));
}
}), $.widget("ui.buttonset", {
options:{
items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
},
_create:function() {
this.element.addClass("ui-buttonset");
},
_init:function() {
this.refresh();
},
_setOption:function(key, value) {
"disabled" === key && this.buttons.button("option", key, value), $.Widget.prototype._setOption.apply(this, arguments);
},
refresh:function() {
var rtl = "rtl" === this.element.css("direction");
this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
return $(this).button("widget")[0];
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right" :"ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left" :"ui-corner-right").end().end();
},
destroy:function() {
this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
return $(this).button("widget")[0];
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), $.Widget.prototype.destroy.call(this);
}
});
}(jQuery), function($, undefined) {
function Datepicker() {
this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], 
this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", 
this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", 
this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", 
this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", 
this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", 
this.regional = [], this.regional[""] = {
closeText:"Done",
prevText:"Prev",
nextText:"Next",
currentText:"Today",
monthNames:[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
monthNamesShort:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
dayNames:[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
dayNamesShort:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
dayNamesMin:[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
weekHeader:"Wk",
dateFormat:"mm/dd/yy",
firstDay:0,
isRTL:!1,
showMonthAfterYear:!1,
yearSuffix:""
}, this._defaults = {
showOn:"focus",
showAnim:"fadeIn",
showOptions:{},
defaultDate:null,
appendText:"",
buttonText:"...",
buttonImage:"",
buttonImageOnly:!1,
hideIfNoPrevNext:!1,
navigationAsDateFormat:!1,
gotoCurrent:!1,
changeMonth:!1,
changeYear:!1,
yearRange:"c-10:c+10",
showOtherMonths:!1,
selectOtherMonths:!1,
showWeek:!1,
calculateWeek:this.iso8601Week,
shortYearCutoff:"+10",
minDate:null,
maxDate:null,
duration:"fast",
beforeShowDay:null,
beforeShow:null,
onSelect:null,
onChangeMonthYear:null,
onClose:null,
numberOfMonths:1,
showCurrentAtPos:0,
stepMonths:1,
stepBigMonths:12,
altField:"",
altFormat:"",
constrainInput:!0,
showButtonPanel:!1,
autoSize:!1,
disabled:!1
}, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
}
function bindHover(dpDiv) {
var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return dpDiv.bind("mouseout", function(event) {
var elem = $(event.target).closest(selector);
elem.length && elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover");
}).bind("mouseover", function(event) {
var elem = $(event.target).closest(selector);
!$.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] :instActive.input[0]) && elem.length && (elem.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), 
elem.addClass("ui-state-hover"), elem.hasClass("ui-datepicker-prev") && elem.addClass("ui-datepicker-prev-hover"), 
elem.hasClass("ui-datepicker-next") && elem.addClass("ui-datepicker-next-hover"));
});
}
function extendRemove(target, props) {
$.extend(target, props);
for (var name in props) (null == props[name] || props[name] == undefined) && (target[name] = props[name]);
return target;
}
function isArray(a) {
return a && ($.browser.safari && "object" == typeof a && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/));
}
$.extend($.ui, {
datepicker:{
version:"1.8.23"
}
});
var PROP_NAME = "datepicker", dpuuid = new Date().getTime(), instActive;
$.extend(Datepicker.prototype, {
markerClassName:"hasDatepicker",
maxRows:4,
log:function() {
this.debug && console.log.apply("", arguments);
},
_widgetDatepicker:function() {
return this.dpDiv;
},
setDefaults:function(settings) {
return extendRemove(this._defaults, settings || {}), this;
},
_attachDatepicker:function(target, settings) {
var inlineSettings = null;
for (var attrName in this._defaults) {
var attrValue = target.getAttribute("date:" + attrName);
if (attrValue) {
inlineSettings = inlineSettings || {};
try {
inlineSettings[attrName] = eval(attrValue);
} catch (err) {
inlineSettings[attrName] = attrValue;
}
}
}
var nodeName = target.nodeName.toLowerCase(), inline = "div" == nodeName || "span" == nodeName;
target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
var inst = this._newInst($(target), inline);
inst.settings = $.extend({}, settings || {}, inlineSettings || {}), "input" == nodeName ? this._connectDatepicker(target, inst) :inline && this._inlineDatepicker(target, inst);
},
_newInst:function(target, inline) {
var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
return {
id:id,
input:target,
selectedDay:0,
selectedMonth:0,
selectedYear:0,
drawMonth:0,
drawYear:0,
inline:inline,
dpDiv:inline ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) :this.dpDiv
};
},
_connectDatepicker:function(target, inst) {
var input = $(target);
inst.append = $([]), inst.trigger = $([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst), 
input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(event, key, value) {
inst.settings[key] = value;
}).bind("getData.datepicker", function(event, key) {
return this._get(inst, key);
}), this._autoSize(inst), $.data(target, PROP_NAME, inst), inst.settings.disabled && this._disableDatepicker(target));
},
_attachments:function(input, inst) {
var appendText = this._get(inst, "appendText"), isRTL = this._get(inst, "isRTL");
inst.append && inst.append.remove(), appendText && (inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>"), 
input[isRTL ? "before" :"after"](inst.append)), input.unbind("focus", this._showDatepicker), 
inst.trigger && inst.trigger.remove();
var showOn = this._get(inst, "showOn");
if (("focus" == showOn || "both" == showOn) && input.focus(this._showDatepicker), 
"button" == showOn || "both" == showOn) {
var buttonText = this._get(inst, "buttonText"), buttonImage = this._get(inst, "buttonImage");
inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
src:buttonImage,
alt:buttonText,
title:buttonText
}) :$('<button type="button"></button>').addClass(this._triggerClass).html("" == buttonImage ? buttonText :$("<img/>").attr({
src:buttonImage,
alt:buttonText,
title:buttonText
}))), input[isRTL ? "before" :"after"](inst.trigger), inst.trigger.click(function() {
return $.datepicker._datepickerShowing && $.datepicker._lastInput == input[0] ? $.datepicker._hideDatepicker() :$.datepicker._datepickerShowing && $.datepicker._lastInput != input[0] ? ($.datepicker._hideDatepicker(), 
$.datepicker._showDatepicker(input[0])) :$.datepicker._showDatepicker(input[0]), 
!1;
});
}
},
_autoSize:function(inst) {
if (this._get(inst, "autoSize") && !inst.inline) {
var date = new Date(2009, 11, 20), dateFormat = this._get(inst, "dateFormat");
if (dateFormat.match(/[DM]/)) {
var findMax = function(names) {
for (var max = 0, maxI = 0, i = 0; i < names.length; i++) names[i].length > max && (max = names[i].length, 
maxI = i);
return maxI;
};
date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" :"monthNamesShort"))), 
date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" :"dayNamesShort")) + 20 - date.getDay());
}
inst.input.attr("size", this._formatDate(inst, date).length);
}
},
_inlineDatepicker:function(target, inst) {
var divSpan = $(target);
divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
inst.settings[key] = value;
}).bind("getData.datepicker", function(event, key) {
return this._get(inst, key);
}), $.data(target, PROP_NAME, inst), this._setDate(inst, this._getDefaultDate(inst), !0), 
this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target), 
inst.dpDiv.css("display", "block"));
},
_dialogDatepicker:function(input, date, onSelect, settings, pos) {
var inst = this._dialogInst;
if (!inst) {
this.uuid += 1;
var id = "dp" + this.uuid;
this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px;"/>'), 
this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), 
inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {}, 
$.data(this._dialogInput[0], PROP_NAME, inst);
}
if (extendRemove(inst.settings, settings || {}), date = date && date.constructor == Date ? this._formatDate(inst, date) :date, 
this._dialogInput.val(date), this._pos = pos ? pos.length ? pos :[ pos.pageX, pos.pageY ] :null, 
!this._pos) {
var browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight, scrollX = document.documentElement.scrollLeft || document.body.scrollLeft, scrollY = document.documentElement.scrollTop || document.body.scrollTop;
this._pos = [ browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY ];
}
return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), 
inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), 
this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), 
$.data(this._dialogInput[0], PROP_NAME, inst), this;
},
_destroyDatepicker:function(target) {
var $target = $(target), inst = $.data(target, PROP_NAME);
if ($target.hasClass(this.markerClassName)) {
var nodeName = target.nodeName.toLowerCase();
$.removeData(target, PROP_NAME), "input" == nodeName ? (inst.append.remove(), inst.trigger.remove(), 
$target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) :("div" == nodeName || "span" == nodeName) && $target.removeClass(this.markerClassName).empty();
}
},
_enableDatepicker:function(target) {
var $target = $(target), inst = $.data(target, PROP_NAME);
if ($target.hasClass(this.markerClassName)) {
var nodeName = target.nodeName.toLowerCase();
if ("input" == nodeName) target.disabled = !1, inst.trigger.filter("button").each(function() {
this.disabled = !1;
}).end().filter("img").css({
opacity:"1.0",
cursor:""
}); else if ("div" == nodeName || "span" == nodeName) {
var inline = $target.children("." + this._inlineClass);
inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled");
}
this._disabledInputs = $.map(this._disabledInputs, function(value) {
return value == target ? null :value;
});
}
},
_disableDatepicker:function(target) {
var $target = $(target), inst = $.data(target, PROP_NAME);
if ($target.hasClass(this.markerClassName)) {
var nodeName = target.nodeName.toLowerCase();
if ("input" == nodeName) target.disabled = !0, inst.trigger.filter("button").each(function() {
this.disabled = !0;
}).end().filter("img").css({
opacity:"0.5",
cursor:"default"
}); else if ("div" == nodeName || "span" == nodeName) {
var inline = $target.children("." + this._inlineClass);
inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled");
}
this._disabledInputs = $.map(this._disabledInputs, function(value) {
return value == target ? null :value;
}), this._disabledInputs[this._disabledInputs.length] = target;
}
},
_isDisabledDatepicker:function(target) {
if (!target) return !1;
for (var i = 0; i < this._disabledInputs.length; i++) if (this._disabledInputs[i] == target) return !0;
return !1;
},
_getInst:function(target) {
try {
return $.data(target, PROP_NAME);
} catch (err) {
throw "Missing instance data for this datepicker";
}
},
_optionDatepicker:function(target, name, value) {
var inst = this._getInst(target);
if (2 == arguments.length && "string" == typeof name) return "defaults" == name ? $.extend({}, $.datepicker._defaults) :inst ? "all" == name ? $.extend({}, inst.settings) :this._get(inst, name) :null;
var settings = name || {};
if ("string" == typeof name && (settings = {}, settings[name] = value), inst) {
this._curInst == inst && this._hideDatepicker();
var date = this._getDateDatepicker(target, !0), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max");
extendRemove(inst.settings, settings), null !== minDate && settings.dateFormat !== undefined && settings.minDate === undefined && (inst.settings.minDate = this._formatDate(inst, minDate)), 
null !== maxDate && settings.dateFormat !== undefined && settings.maxDate === undefined && (inst.settings.maxDate = this._formatDate(inst, maxDate)), 
this._attachments($(target), inst), this._autoSize(inst), this._setDate(inst, date), 
this._updateAlternate(inst), this._updateDatepicker(inst);
}
},
_changeDatepicker:function(target, name, value) {
this._optionDatepicker(target, name, value);
},
_refreshDatepicker:function(target) {
var inst = this._getInst(target);
inst && this._updateDatepicker(inst);
},
_setDateDatepicker:function(target, date) {
var inst = this._getInst(target);
inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst));
},
_getDateDatepicker:function(target, noDefault) {
var inst = this._getInst(target);
return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) :null;
},
_doKeyDown:function(event) {
var inst = $.datepicker._getInst(event.target), handled = !0, isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
if (inst._keyEvent = !0, $.datepicker._datepickerShowing) switch (event.keyCode) {
case 9:
$.datepicker._hideDatepicker(), handled = !1;
break;

case 13:
var sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
sel[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
var onSelect = $.datepicker._get(inst, "onSelect");
if (onSelect) {
var dateStr = $.datepicker._formatDate(inst);
onSelect.apply(inst.input ? inst.input[0] :null, [ dateStr, inst ]);
} else $.datepicker._hideDatepicker();
return !1;

case 27:
$.datepicker._hideDatepicker();
break;

case 33:
$.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") :-$.datepicker._get(inst, "stepMonths"), "M");
break;

case 34:
$.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") :+$.datepicker._get(inst, "stepMonths"), "M");
break;

case 35:
(event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target), handled = event.ctrlKey || event.metaKey;
break;

case 36:
(event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
break;

case 37:
(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 :-1, "D"), 
handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") :-$.datepicker._get(inst, "stepMonths"), "M");
break;

case 38:
(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"), 
handled = event.ctrlKey || event.metaKey;
break;

case 39:
(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 :1, "D"), 
handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") :+$.datepicker._get(inst, "stepMonths"), "M");
break;

case 40:
(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"), 
handled = event.ctrlKey || event.metaKey;
break;

default:
handled = !1;
} else 36 == event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) :handled = !1;
handled && (event.preventDefault(), event.stopPropagation());
},
_doKeyPress:function(event) {
var inst = $.datepicker._getInst(event.target);
if ($.datepicker._get(inst, "constrainInput")) {
var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")), chr = String.fromCharCode(event.charCode == undefined ? event.keyCode :event.charCode);
return event.ctrlKey || event.metaKey || " " > chr || !chars || chars.indexOf(chr) > -1;
}
},
_doKeyUp:function(event) {
var inst = $.datepicker._getInst(event.target);
if (inst.input.val() != inst.lastVal) try {
var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() :null, $.datepicker._getFormatConfig(inst));
date && ($.datepicker._setDateFromField(inst), $.datepicker._updateAlternate(inst), 
$.datepicker._updateDatepicker(inst));
} catch (err) {
$.datepicker.log(err);
}
return !0;
},
_showDatepicker:function(input) {
if (input = input.target || input, "input" != input.nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]), 
!$.datepicker._isDisabledDatepicker(input) && $.datepicker._lastInput != input) {
var inst = $.datepicker._getInst(input);
$.datepicker._curInst && $.datepicker._curInst != inst && ($.datepicker._curInst.dpDiv.stop(!0, !0), 
inst && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
var beforeShow = $.datepicker._get(inst, "beforeShow"), beforeShowSettings = beforeShow ? beforeShow.apply(input, [ input, inst ]) :{};
if (beforeShowSettings !== !1) {
extendRemove(inst.settings, beforeShowSettings), inst.lastVal = null, $.datepicker._lastInput = input, 
$.datepicker._setDateFromField(inst), $.datepicker._inDialog && (input.value = ""), 
$.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input), $.datepicker._pos[1] += input.offsetHeight);
var isFixed = !1;
$(input).parents().each(function() {
return isFixed |= "fixed" == $(this).css("position"), !isFixed;
}), isFixed && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, 
$.datepicker._pos[1] -= document.documentElement.scrollTop);
var offset = {
left:$.datepicker._pos[0],
top:$.datepicker._pos[1]
};
if ($.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
position:"absolute",
display:"block",
top:"-1000px"
}), $.datepicker._updateDatepicker(inst), offset = $.datepicker._checkOffset(inst, offset, isFixed), 
inst.dpDiv.css({
position:$.datepicker._inDialog && $.blockUI ? "static" :isFixed ? "fixed" :"absolute",
display:"none",
left:offset.left + "px",
top:offset.top + "px"
}), !inst.inline) {
var showAnim = $.datepicker._get(inst, "showAnim"), duration = $.datepicker._get(inst, "duration"), postProcess = function() {
var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
if (cover.length) {
var borders = $.datepicker._getBorders(inst.dpDiv);
cover.css({
left:-borders[0],
top:-borders[1],
width:inst.dpDiv.outerWidth(),
height:inst.dpDiv.outerHeight()
});
}
};
inst.dpDiv.zIndex($(input).zIndex() + 1), $.datepicker._datepickerShowing = !0, 
$.effects && $.effects[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) :inst.dpDiv[showAnim || "show"](showAnim ? duration :null, postProcess), 
showAnim && duration || postProcess(), inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input.focus(), 
$.datepicker._curInst = inst;
}
}
}
},
_updateDatepicker:function(inst) {
var self = this;
self.maxRows = 4;
var borders = $.datepicker._getBorders(inst.dpDiv);
instActive = inst, inst.dpDiv.empty().append(this._generateHTML(inst)), this._attachHandlers(inst);
var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
cover.length && cover.css({
left:-borders[0],
top:-borders[1],
width:inst.dpDiv.outerWidth(),
height:inst.dpDiv.outerHeight()
}), inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();
var numMonths = this._getNumberOfMonths(inst), cols = numMonths[1], width = 17;
if (inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), 
cols > 1 && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em"), 
inst.dpDiv[(1 != numMonths[0] || 1 != numMonths[1] ? "add" :"remove") + "Class"]("ui-datepicker-multi"), 
inst.dpDiv[(this._get(inst, "isRTL") ? "add" :"remove") + "Class"]("ui-datepicker-rtl"), 
inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input[0] != document.activeElement && inst.input.focus(), 
inst.yearshtml) {
var origyearshtml = inst.yearshtml;
setTimeout(function() {
origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml), 
origyearshtml = inst.yearshtml = null;
}, 0);
}
},
_getBorders:function(elem) {
var convert = function(value) {
return {
thin:1,
medium:2,
thick:3
}[value] || value;
};
return [ parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width"))) ];
},
_checkOffset:function(inst, offset, isFixed) {
var dpWidth = inst.dpDiv.outerWidth(), dpHeight = inst.dpDiv.outerHeight(), inputWidth = inst.input ? inst.input.outerWidth() :0, inputHeight = inst.input ? inst.input.outerHeight() :0, viewWidth = document.documentElement.clientWidth + (isFixed ? 0 :$(document).scrollLeft()), viewHeight = document.documentElement.clientHeight + (isFixed ? 0 :$(document).scrollTop());
return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth :0, offset.left -= isFixed && offset.left == inst.input.offset().left ? $(document).scrollLeft() :0, 
offset.top -= isFixed && offset.top == inst.input.offset().top + inputHeight ? $(document).scrollTop() :0, 
offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) :0), 
offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) :0), 
offset;
},
_findPos:function(obj) {
for (var inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" == obj.type || 1 != obj.nodeType || $.expr.filters.hidden(obj)); ) obj = obj[isRTL ? "previousSibling" :"nextSibling"];
var position = $(obj).offset();
return [ position.left, position.top ];
},
_hideDatepicker:function(input) {
var inst = this._curInst;
if (inst && (!input || inst == $.data(input, PROP_NAME)) && this._datepickerShowing) {
var showAnim = this._get(inst, "showAnim"), duration = this._get(inst, "duration"), postProcess = function() {
$.datepicker._tidyDialog(inst);
};
$.effects && $.effects[showAnim] ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) :inst.dpDiv["slideDown" == showAnim ? "slideUp" :"fadeIn" == showAnim ? "fadeOut" :"hide"](showAnim ? duration :null, postProcess), 
showAnim || postProcess(), this._datepickerShowing = !1;
var onClose = this._get(inst, "onClose");
onClose && onClose.apply(inst.input ? inst.input[0] :null, [ inst.input ? inst.input.val() :"", inst ]), 
this._lastInput = null, this._inDialog && (this._dialogInput.css({
position:"absolute",
left:"0",
top:"-100px"
}), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1;
}
},
_tidyDialog:function(inst) {
inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
},
_checkExternalClick:function(event) {
if ($.datepicker._curInst) {
var $target = $(event.target), inst = $.datepicker._getInst($target[0]);
($target[0].id != $.datepicker._mainDivId && 0 == $target.parents("#" + $.datepicker._mainDivId).length && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst) && $.datepicker._hideDatepicker();
}
},
_adjustDate:function(id, offset, period) {
var target = $(id), inst = this._getInst(target[0]);
this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" == period ? this._get(inst, "showCurrentAtPos") :0), period), 
this._updateDatepicker(inst));
},
_gotoToday:function(id) {
var target = $(id), inst = this._getInst(target[0]);
if (this._get(inst, "gotoCurrent") && inst.currentDay) inst.selectedDay = inst.currentDay, 
inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear; else {
var date = new Date();
inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
inst.drawYear = inst.selectedYear = date.getFullYear();
}
this._notifyChange(inst), this._adjustDate(target);
},
_selectMonthYear:function(id, select, period) {
var target = $(id), inst = this._getInst(target[0]);
inst["selected" + ("M" == period ? "Month" :"Year")] = inst["draw" + ("M" == period ? "Month" :"Year")] = parseInt(select.options[select.selectedIndex].value, 10), 
this._notifyChange(inst), this._adjustDate(target);
},
_selectDay:function(id, month, year, td) {
var target = $(id);
if (!$(td).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(target[0])) {
var inst = this._getInst(target[0]);
inst.selectedDay = inst.currentDay = $("a", td).html(), inst.selectedMonth = inst.currentMonth = month, 
inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
}
},
_clearDate:function(id) {
{
var target = $(id);
this._getInst(target[0]);
}
this._selectDate(target, "");
},
_selectDate:function(id, dateStr) {
var target = $(id), inst = this._getInst(target[0]);
dateStr = null != dateStr ? dateStr :this._formatDate(inst), inst.input && inst.input.val(dateStr), 
this._updateAlternate(inst);
var onSelect = this._get(inst, "onSelect");
onSelect ? onSelect.apply(inst.input ? inst.input[0] :null, [ dateStr, inst ]) :inst.input && inst.input.trigger("change"), 
inst.inline ? this._updateDatepicker(inst) :(this._hideDatepicker(), this._lastInput = inst.input[0], 
"object" != typeof inst.input[0] && inst.input.focus(), this._lastInput = null);
},
_updateAlternate:function(inst) {
var altField = this._get(inst, "altField");
if (altField) {
var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"), date = this._getDate(inst), dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
$(altField).each(function() {
$(this).val(dateStr);
});
}
},
noWeekends:function(date) {
var day = date.getDay();
return [ day > 0 && 6 > day, "" ];
},
iso8601Week:function(date) {
var checkDate = new Date(date.getTime());
checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
var time = checkDate.getTime();
return checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
},
parseDate:function(format, value, settings) {
if (null == format || null == value) throw "Invalid arguments";
if (value = "object" == typeof value ? value.toString() :value + "", "" == value) return null;
var shortYearCutoff = (settings ? settings.shortYearCutoff :null) || this._defaults.shortYearCutoff;
shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff :new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10);
for (var dayNamesShort = (settings ? settings.dayNamesShort :null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames :null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort :null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames :null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = !1, lookAhead = function(match) {
var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
return matches && iFormat++, matches;
}, getNumber = function(match) {
var isDoubled = lookAhead(match), size = "@" == match ? 14 :"!" == match ? 20 :"y" == match && isDoubled ? 4 :"o" == match ? 3 :2, digits = new RegExp("^\\d{1," + size + "}"), num = value.substring(iValue).match(digits);
if (!num) throw "Missing number at position " + iValue;
return iValue += num[0].length, parseInt(num[0], 10);
}, getName = function(match, shortNames, longNames) {
var names = $.map(lookAhead(match) ? longNames :shortNames, function(v, k) {
return [ [ k, v ] ];
}).sort(function(a, b) {
return -(a[1].length - b[1].length);
}), index = -1;
if ($.each(names, function(i, pair) {
var name = pair[1];
return value.substr(iValue, name.length).toLowerCase() == name.toLowerCase() ? (index = pair[0], 
iValue += name.length, !1) :void 0;
}), -1 != index) return index + 1;
throw "Unknown name at position " + iValue;
}, checkLiteral = function() {
if (value.charAt(iValue) != format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
iValue++;
}, iValue = 0, iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? checkLiteral() :literal = !1; else switch (format.charAt(iFormat)) {
case "d":
day = getNumber("d");
break;

case "D":
getName("D", dayNamesShort, dayNames);
break;

case "o":
doy = getNumber("o");
break;

case "m":
month = getNumber("m");
break;

case "M":
month = getName("M", monthNamesShort, monthNames);
break;

case "y":
year = getNumber("y");
break;

case "@":
var date = new Date(getNumber("@"));
year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
break;

case "!":
var date = new Date((getNumber("!") - this._ticksTo1970) / 1e4);
year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
break;

case "'":
lookAhead("'") ? checkLiteral() :literal = !0;
break;

default:
checkLiteral();
}
if (iValue < value.length) throw "Extra/unparsed characters found in date: " + value.substring(iValue);
if (-1 == year ? year = new Date().getFullYear() :100 > year && (year += new Date().getFullYear() - new Date().getFullYear() % 100 + (shortYearCutoff >= year ? 0 :-100)), 
doy > -1) for (month = 1, day = doy; ;) {
var dim = this._getDaysInMonth(year, month - 1);
if (dim >= day) break;
month++, day -= dim;
}
var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) throw "Invalid date";
return date;
},
ATOM:"yy-mm-dd",
COOKIE:"D, dd M yy",
ISO_8601:"yy-mm-dd",
RFC_822:"D, d M y",
RFC_850:"DD, dd-M-y",
RFC_1036:"D, d M y",
RFC_1123:"D, d M yy",
RFC_2822:"D, d M yy",
RSS:"D, d M y",
TICKS:"!",
TIMESTAMP:"@",
W3C:"yy-mm-dd",
_ticksTo1970:24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
formatDate:function(format, date, settings) {
if (!date) return "";
var dayNamesShort = (settings ? settings.dayNamesShort :null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames :null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort :null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames :null) || this._defaults.monthNames, lookAhead = function(match) {
var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
return matches && iFormat++, matches;
}, formatNumber = function(match, value, len) {
var num = "" + value;
if (lookAhead(match)) for (;num.length < len; ) num = "0" + num;
return num;
}, formatName = function(match, value, shortNames, longNames) {
return lookAhead(match) ? longNames[value] :shortNames[value];
}, output = "", literal = !1;
if (date) for (var iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) :literal = !1; else switch (format.charAt(iFormat)) {
case "d":
output += formatNumber("d", date.getDate(), 2);
break;

case "D":
output += formatName("D", date.getDay(), dayNamesShort, dayNames);
break;

case "o":
output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
break;

case "m":
output += formatNumber("m", date.getMonth() + 1, 2);
break;

case "M":
output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
break;

case "y":
output += lookAhead("y") ? date.getFullYear() :(date.getYear() % 100 < 10 ? "0" :"") + date.getYear() % 100;
break;

case "@":
output += date.getTime();
break;

case "!":
output += 1e4 * date.getTime() + this._ticksTo1970;
break;

case "'":
lookAhead("'") ? output += "'" :literal = !0;
break;

default:
output += format.charAt(iFormat);
}
return output;
},
_possibleChars:function(format) {
for (var chars = "", literal = !1, lookAhead = function(match) {
var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
return matches && iFormat++, matches;
}, iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) :literal = !1; else switch (format.charAt(iFormat)) {
case "d":
case "m":
case "y":
case "@":
chars += "0123456789";
break;

case "D":
case "M":
return null;

case "'":
lookAhead("'") ? chars += "'" :literal = !0;
break;

default:
chars += format.charAt(iFormat);
}
return chars;
},
_get:function(inst, name) {
return inst.settings[name] !== undefined ? inst.settings[name] :this._defaults[name];
},
_setDateFromField:function(inst, noDefault) {
if (inst.input.val() != inst.lastVal) {
var date, defaultDate, dateFormat = this._get(inst, "dateFormat"), dates = inst.lastVal = inst.input ? inst.input.val() :null;
date = defaultDate = this._getDefaultDate(inst);
var settings = this._getFormatConfig(inst);
try {
date = this.parseDate(dateFormat, dates, settings) || defaultDate;
} catch (event) {
this.log(event), dates = noDefault ? "" :dates;
}
inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() :0, 
inst.currentMonth = dates ? date.getMonth() :0, inst.currentYear = dates ? date.getFullYear() :0, 
this._adjustInstDate(inst);
}
},
_getDefaultDate:function(inst) {
return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
},
_determineDate:function(inst, date, defaultDate) {
var offsetNumeric = function(offset) {
var date = new Date();
return date.setDate(date.getDate() + offset), date;
}, offsetString = function(offset) {
try {
return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
} catch (e) {}
for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) :null) || new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches; ) {
switch (matches[2] || "d") {
case "d":
case "D":
day += parseInt(matches[1], 10);
break;

case "w":
case "W":
day += 7 * parseInt(matches[1], 10);
break;

case "m":
case "M":
month += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
break;

case "y":
case "Y":
year += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
}
matches = pattern.exec(offset);
}
return new Date(year, month, day);
}, newDate = null == date || "" === date ? defaultDate :"string" == typeof date ? offsetString(date) :"number" == typeof date ? isNaN(date) ? defaultDate :offsetNumeric(date) :new Date(date.getTime());
return newDate = newDate && "Invalid Date" == newDate.toString() ? defaultDate :newDate, 
newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)), 
this._daylightSavingAdjust(newDate);
},
_daylightSavingAdjust:function(date) {
return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 :0), date) :null;
},
_setDate:function(inst, date, noChange) {
var clear = !date, origMonth = inst.selectedMonth, origYear = inst.selectedYear, newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(), 
inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth == inst.selectedMonth && origYear == inst.selectedYear || noChange || this._notifyChange(inst), 
this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" :this._formatDate(inst));
},
_getDate:function(inst) {
var startDate = !inst.currentYear || inst.input && "" == inst.input.val() ? null :this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
return startDate;
},
_attachHandlers:function(inst) {
var stepMonths = this._get(inst, "stepMonths"), id = "#" + inst.id.replace(/\\\\/g, "\\");
inst.dpDiv.find("[data-handler]").map(function() {
var handler = {
prev:function() {
window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, -stepMonths, "M");
},
next:function() {
window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, +stepMonths, "M");
},
hide:function() {
window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker();
},
today:function() {
window["DP_jQuery_" + dpuuid].datepicker._gotoToday(id);
},
selectDay:function() {
return window["DP_jQuery_" + dpuuid].datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), 
!1;
},
selectMonth:function() {
return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "M"), 
!1;
},
selectYear:function() {
return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "Y"), 
!1;
}
};
$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
});
},
_generateHTML:function(inst) {
var today = new Date();
today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
var isRTL = this._get(inst, "isRTL"), showButtonPanel = this._get(inst, "showButtonPanel"), hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"), navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"), numMonths = this._getNumberOfMonths(inst), showCurrentAtPos = this._get(inst, "showCurrentAtPos"), stepMonths = this._get(inst, "stepMonths"), isMultiMonth = 1 != numMonths[0] || 1 != numMonths[1], currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) :new Date(9999, 9, 9)), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), drawMonth = inst.drawMonth - showCurrentAtPos, drawYear = inst.drawYear;
if (0 > drawMonth && (drawMonth += 12, drawYear--), maxDate) {
var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
for (maxDraw = minDate && minDate > maxDraw ? minDate :maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw; ) drawMonth--, 
0 > drawMonth && (drawMonth = 11, drawYear--);
}
inst.drawMonth = drawMonth, inst.drawYear = drawYear;
var prevText = this._get(inst, "prevText");
prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) :prevText;
var prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" :"w") + '">' + prevText + "</span></a>" :hideIfNoPrevNext ? "" :'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" :"w") + '">' + prevText + "</span></a>", nextText = this._get(inst, "nextText");
nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) :nextText;
var next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" :"e") + '">' + nextText + "</span></a>" :hideIfNoPrevNext ? "" :'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" :"e") + '">' + nextText + "</span></a>", currentText = this._get(inst, "currentText"), gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate :today;
currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) :currentText;
var controls = inst.inline ? "" :'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(inst, "closeText") + "</button>", buttonPanel = showButtonPanel ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls :"") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + currentText + "</button>" :"") + (isRTL ? "" :controls) + "</div>" :"", firstDay = parseInt(this._get(inst, "firstDay"), 10);
firstDay = isNaN(firstDay) ? 0 :firstDay;
for (var showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"), dayNamesMin = (this._get(inst, "dayNamesShort"), 
this._get(inst, "dayNamesMin")), monthNames = this._get(inst, "monthNames"), monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"), showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"), defaultDate = (this._get(inst, "calculateWeek") || this.iso8601Week, 
this._getDefaultDate(inst)), html = "", row = 0; row < numMonths[0]; row++) {
var group = "";
this.maxRows = 4;
for (var col = 0; col < numMonths[1]; col++) {
var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)), cornerClass = " ui-corner-all", calender = "";
if (isMultiMonth) {
if (calender += '<div class="ui-datepicker-group', numMonths[1] > 1) switch (col) {
case 0:
calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" :"left");
break;

case numMonths[1] - 1:
calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" :"right");
break;

default:
calender += " ui-datepicker-group-middle", cornerClass = "";
}
calender += '">';
}
calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && 0 == row ? isRTL ? next :prev :"") + (/all|right/.test(cornerClass) && 0 == row ? isRTL ? prev :next :"") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
for (var thead = showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" :"", dow = 0; 7 > dow; dow++) {
var day = (dow + firstDay) % 7;
thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' :"") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>";
}
calender += thead + "</tr></thead><tbody>";
var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
drawYear == inst.selectedYear && drawMonth == inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth));
var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7, curRows = Math.ceil((leadDays + daysInMonth) / 7), numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows :curRows :curRows;
this.maxRows = numRows;
for (var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)), dRow = 0; numRows > dRow; dRow++) {
calender += "<tr>";
for (var tbody = showWeek ? '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>" :"", dow = 0; 7 > dow; dow++) {
var daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] :null, [ printDate ]) :[ !0, "" ], otherMonth = printDate.getMonth() != drawMonth, unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && minDate > printDate || maxDate && printDate > maxDate;
tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" :"") + (otherMonth ? " ui-datepicker-other-month" :"") + (printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent || defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime() ? " " + this._dayOverClass :"") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" :"") + (otherMonth && !showOtherMonths ? "" :" " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass :"") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" :"")) + '"' + (otherMonth && !showOtherMonths || !daySettings[2] ? "" :' title="' + daySettings[2] + '"') + (unselectable ? "" :' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" :unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" :'<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" :"") + (printDate.getTime() == currentDate.getTime() ? " ui-state-active" :"") + (otherMonth ? " ui-priority-secondary" :"") + '" href="#">' + printDate.getDate() + "</a>") + "</td>", 
printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate);
}
calender += tbody + "</tr>";
}
drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col == numMonths[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' :"") :""), 
group += calender;
}
html += group;
}
return html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' :""), 
inst._keyEvent = !1, html;
},
_generateMonthYearHeader:function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
var changeMonth = this._get(inst, "changeMonth"), changeYear = this._get(inst, "changeYear"), showMonthAfterYear = this._get(inst, "showMonthAfterYear"), html = '<div class="ui-datepicker-title">', monthHtml = "";
if (secondary || !changeMonth) monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>"; else {
var inMinYear = minDate && minDate.getFullYear() == drawYear, inMaxYear = maxDate && maxDate.getFullYear() == drawYear;
monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
for (var month = 0; 12 > month; month++) (!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' :"") + ">" + monthNamesShort[month] + "</option>");
monthHtml += "</select>";
}
if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" :"&#xa0;")), 
!inst.yearshtml) if (inst.yearshtml = "", secondary || !changeYear) html += '<span class="ui-datepicker-year">' + drawYear + "</span>"; else {
var years = this._get(inst, "yearRange").split(":"), thisYear = new Date().getFullYear(), determineYear = function(value) {
var year = value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :parseInt(value, 10);
return isNaN(year) ? thisYear :year;
}, year = determineYear(years[0]), endYear = Math.max(year, determineYear(years[1] || ""));
for (year = minDate ? Math.max(year, minDate.getFullYear()) :year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) :endYear, 
inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; endYear >= year; year++) inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' :"") + ">" + year + "</option>";
inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null;
}
return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" :"&#xa0;") + monthHtml), 
html += "</div>";
},
_adjustInstDate:function(inst, offset, period) {
var year = inst.drawYear + ("Y" == period ? offset :0), month = inst.drawMonth + ("M" == period ? offset :0), day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" == period ? offset :0), date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
inst.drawYear = inst.selectedYear = date.getFullYear(), ("M" == period || "Y" == period) && this._notifyChange(inst);
},
_restrictMinMax:function(inst, date) {
var minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), newDate = minDate && minDate > date ? minDate :date;
return newDate = maxDate && newDate > maxDate ? maxDate :newDate;
},
_notifyChange:function(inst) {
var onChange = this._get(inst, "onChangeMonthYear");
onChange && onChange.apply(inst.input ? inst.input[0] :null, [ inst.selectedYear, inst.selectedMonth + 1, inst ]);
},
_getNumberOfMonths:function(inst) {
var numMonths = this._get(inst, "numberOfMonths");
return null == numMonths ? [ 1, 1 ] :"number" == typeof numMonths ? [ 1, numMonths ] :numMonths;
},
_getMinMaxDate:function(inst, minMax) {
return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
},
_getDaysInMonth:function(year, month) {
return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
},
_getFirstDayOfMonth:function(year, month) {
return new Date(year, month, 1).getDay();
},
_canAdjustMonth:function(inst, offset, curYear, curMonth) {
var numMonths = this._getNumberOfMonths(inst), date = this._daylightSavingAdjust(new Date(curYear, curMonth + (0 > offset ? offset :numMonths[0] * numMonths[1]), 1));
return 0 > offset && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())), 
this._isInRange(inst, date);
},
_isInRange:function(inst, date) {
var minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max");
return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime());
},
_getFormatConfig:function(inst) {
var shortYearCutoff = this._get(inst, "shortYearCutoff");
return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff :new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10), 
{
shortYearCutoff:shortYearCutoff,
dayNamesShort:this._get(inst, "dayNamesShort"),
dayNames:this._get(inst, "dayNames"),
monthNamesShort:this._get(inst, "monthNamesShort"),
monthNames:this._get(inst, "monthNames")
};
},
_formatDate:function(inst, day, month, year) {
day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth, 
inst.currentYear = inst.selectedYear);
var date = day ? "object" == typeof day ? day :this._daylightSavingAdjust(new Date(year, month, day)) :this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
}
}), $.fn.datepicker = function(options) {
if (!this.length) return this;
$.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), 
$.datepicker.initialized = !0);
var otherArgs = Array.prototype.slice.call(arguments, 1);
return "string" != typeof options || "isDisabled" != options && "getDate" != options && "widget" != options ? "option" == options && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs)) :this.each(function() {
"string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this ].concat(otherArgs)) :$.datepicker._attachDatepicker(this, options);
}) :$.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs));
}, $.datepicker = new Datepicker(), $.datepicker.initialized = !1, $.datepicker.uuid = new Date().getTime(), 
$.datepicker.version = "1.8.23", window["DP_jQuery_" + dpuuid] = $;
}(jQuery), function($, undefined) {
var uiDialogClasses = "ui-dialog ui-widget ui-widget-content ui-corner-all ", sizeRelatedOptions = {
buttons:!0,
height:!0,
maxHeight:!0,
maxWidth:!0,
minHeight:!0,
minWidth:!0,
width:!0
}, resizableRelatedOptions = {
maxHeight:!0,
maxWidth:!0,
minHeight:!0,
minWidth:!0
};
$.widget("ui.dialog", {
options:{
autoOpen:!0,
buttons:{},
closeOnEscape:!0,
closeText:"close",
dialogClass:"",
draggable:!0,
hide:null,
height:"auto",
maxHeight:!1,
maxWidth:!1,
minHeight:150,
minWidth:150,
modal:!1,
position:{
my:"center",
at:"center",
collision:"fit",
using:function(pos) {
var topOffset = $(this).css(pos).offset().top;
0 > topOffset && $(this).css("top", pos.top - topOffset);
}
},
resizable:!0,
show:null,
stack:!0,
title:"",
width:300,
zIndex:1e3
},
_create:function() {
this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), 
this.options.title = this.options.title || this.originalTitle;
{
var self = this, options = self.options, title = options.title || "&#160;", titleId = $.ui.dialog.getTitleId(self.element), uiDialog = (self.uiDialog = $("<div></div>")).appendTo(document.body).hide().addClass(uiDialogClasses + options.dialogClass).css({
zIndex:options.zIndex
}).attr("tabIndex", -1).css("outline", 0).keydown(function(event) {
options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE && (self.close(event), 
event.preventDefault());
}).attr({
role:"dialog",
"aria-labelledby":titleId
}).mousedown(function(event) {
self.moveToTop(!1, event);
}), uiDialogTitlebar = (self.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(uiDialog), 
(self.uiDialogTitlebar = $("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(uiDialog)), uiDialogTitlebarClose = $('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
uiDialogTitlebarClose.addClass("ui-state-hover");
}, function() {
uiDialogTitlebarClose.removeClass("ui-state-hover");
}).focus(function() {
uiDialogTitlebarClose.addClass("ui-state-focus");
}).blur(function() {
uiDialogTitlebarClose.removeClass("ui-state-focus");
}).click(function(event) {
return self.close(event), !1;
}).appendTo(uiDialogTitlebar);
(self.uiDialogTitlebarCloseText = $("<span></span>")).addClass("ui-icon ui-icon-closethick").text(options.closeText).appendTo(uiDialogTitlebarClose), 
$("<span></span>").addClass("ui-dialog-title").attr("id", titleId).html(title).prependTo(uiDialogTitlebar);
}
$.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose) && (options.beforeClose = options.beforeclose), 
uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection(), options.draggable && $.fn.draggable && self._makeDraggable(), 
options.resizable && $.fn.resizable && self._makeResizable(), self._createButtons(options.buttons), 
self._isOpen = !1, $.fn.bgiframe && uiDialog.bgiframe();
},
_init:function() {
this.options.autoOpen && this.open();
},
destroy:function() {
var self = this;
return self.overlay && self.overlay.destroy(), self.uiDialog.hide(), self.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), 
self.uiDialog.remove(), self.originalTitle && self.element.attr("title", self.originalTitle), 
self;
},
widget:function() {
return this.uiDialog;
},
close:function(event) {
var maxZ, thisZ, self = this;
if (!1 !== self._trigger("beforeClose", event)) return self.overlay && self.overlay.destroy(), 
self.uiDialog.unbind("keypress.ui-dialog"), self._isOpen = !1, self.options.hide ? self.uiDialog.hide(self.options.hide, function() {
self._trigger("close", event);
}) :(self.uiDialog.hide(), self._trigger("close", event)), $.ui.dialog.overlay.resize(), 
self.options.modal && (maxZ = 0, $(".ui-dialog").each(function() {
this !== self.uiDialog[0] && (thisZ = $(this).css("z-index"), isNaN(thisZ) || (maxZ = Math.max(maxZ, thisZ)));
}), $.ui.dialog.maxZ = maxZ), self;
},
isOpen:function() {
return this._isOpen;
},
moveToTop:function(force, event) {
var saveScroll, self = this, options = self.options;
return options.modal && !force || !options.stack && !options.modal ? self._trigger("focus", event) :(options.zIndex > $.ui.dialog.maxZ && ($.ui.dialog.maxZ = options.zIndex), 
self.overlay && ($.ui.dialog.maxZ += 1, self.overlay.$el.css("z-index", $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ)), 
saveScroll = {
scrollTop:self.element.scrollTop(),
scrollLeft:self.element.scrollLeft()
}, $.ui.dialog.maxZ += 1, self.uiDialog.css("z-index", $.ui.dialog.maxZ), self.element.attr(saveScroll), 
self._trigger("focus", event), self);
},
open:function() {
if (!this._isOpen) {
var self = this, options = self.options, uiDialog = self.uiDialog;
return self.overlay = options.modal ? new $.ui.dialog.overlay(self) :null, self._size(), 
self._position(options.position), uiDialog.show(options.show), self.moveToTop(!0), 
options.modal && uiDialog.bind("keydown.ui-dialog", function(event) {
if (event.keyCode === $.ui.keyCode.TAB) {
var tabbables = $(":tabbable", this), first = tabbables.filter(":first"), last = tabbables.filter(":last");
return event.target !== last[0] || event.shiftKey ? event.target === first[0] && event.shiftKey ? (last.focus(1), 
!1) :void 0 :(first.focus(1), !1);
}
}), $(self.element.find(":tabbable").get().concat(uiDialog.find(".ui-dialog-buttonpane :tabbable").get().concat(uiDialog.get()))).eq(0).focus(), 
self._isOpen = !0, self._trigger("open"), self;
}
},
_createButtons:function(buttons) {
var self = this, hasButtons = !1, uiDialogButtonPane = $("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), uiButtonSet = $("<div></div>").addClass("ui-dialog-buttonset").appendTo(uiDialogButtonPane);
self.uiDialog.find(".ui-dialog-buttonpane").remove(), "object" == typeof buttons && null !== buttons && $.each(buttons, function() {
return !(hasButtons = !0);
}), hasButtons && ($.each(buttons, function(name, props) {
props = $.isFunction(props) ? {
click:props,
text:name
} :props;
var button = $('<button type="button"></button>').click(function() {
props.click.apply(self.element[0], arguments);
}).appendTo(uiButtonSet);
$.each(props, function(key, value) {
"click" !== key && (key in button ? button[key](value) :button.attr(key, value));
}), $.fn.button && button.button();
}), uiDialogButtonPane.appendTo(self.uiDialog));
},
_makeDraggable:function() {
function filteredUi(ui) {
return {
position:ui.position,
offset:ui.offset
};
}
var heightBeforeDrag, self = this, options = self.options, doc = $(document);
self.uiDialog.draggable({
cancel:".ui-dialog-content, .ui-dialog-titlebar-close",
handle:".ui-dialog-titlebar",
containment:"document",
start:function(event, ui) {
heightBeforeDrag = "auto" === options.height ? "auto" :$(this).height(), $(this).height($(this).height()).addClass("ui-dialog-dragging"), 
self._trigger("dragStart", event, filteredUi(ui));
},
drag:function(event, ui) {
self._trigger("drag", event, filteredUi(ui));
},
stop:function(event, ui) {
options.position = [ ui.position.left - doc.scrollLeft(), ui.position.top - doc.scrollTop() ], 
$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag), self._trigger("dragStop", event, filteredUi(ui)), 
$.ui.dialog.overlay.resize();
}
});
},
_makeResizable:function(handles) {
function filteredUi(ui) {
return {
originalPosition:ui.originalPosition,
originalSize:ui.originalSize,
position:ui.position,
size:ui.size
};
}
handles = handles === undefined ? this.options.resizable :handles;
var self = this, options = self.options, position = self.uiDialog.css("position"), resizeHandles = "string" == typeof handles ? handles :"n,e,s,w,se,sw,ne,nw";
self.uiDialog.resizable({
cancel:".ui-dialog-content",
containment:"document",
alsoResize:self.element,
maxWidth:options.maxWidth,
maxHeight:options.maxHeight,
minWidth:options.minWidth,
minHeight:self._minHeight(),
handles:resizeHandles,
start:function(event, ui) {
$(this).addClass("ui-dialog-resizing"), self._trigger("resizeStart", event, filteredUi(ui));
},
resize:function(event, ui) {
self._trigger("resize", event, filteredUi(ui));
},
stop:function(event, ui) {
$(this).removeClass("ui-dialog-resizing"), options.height = $(this).height(), options.width = $(this).width(), 
self._trigger("resizeStop", event, filteredUi(ui)), $.ui.dialog.overlay.resize();
}
}).css("position", position).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se");
},
_minHeight:function() {
var options = this.options;
return "auto" === options.height ? options.minHeight :Math.min(options.minHeight, options.height);
},
_position:function(position) {
var isVisible, myAt = [], offset = [ 0, 0 ];
position ? (("string" == typeof position || "object" == typeof position && "0" in position) && (myAt = position.split ? position.split(" ") :[ position[0], position[1] ], 
1 === myAt.length && (myAt[1] = myAt[0]), $.each([ "left", "top" ], function(i, offsetPosition) {
+myAt[i] === myAt[i] && (offset[i] = myAt[i], myAt[i] = offsetPosition);
}), position = {
my:myAt.join(" "),
at:myAt.join(" "),
offset:offset.join(" ")
}), position = $.extend({}, $.ui.dialog.prototype.options.position, position)) :position = $.ui.dialog.prototype.options.position, 
isVisible = this.uiDialog.is(":visible"), isVisible || this.uiDialog.show(), this.uiDialog.css({
top:0,
left:0
}).position($.extend({
of:window
}, position)), isVisible || this.uiDialog.hide();
},
_setOptions:function(options) {
var self = this, resizableOptions = {}, resize = !1;
$.each(options, function(key, value) {
self._setOption(key, value), key in sizeRelatedOptions && (resize = !0), key in resizableRelatedOptions && (resizableOptions[key] = value);
}), resize && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", resizableOptions);
},
_setOption:function(key, value) {
var self = this, uiDialog = self.uiDialog;
switch (key) {
case "beforeclose":
key = "beforeClose";
break;

case "buttons":
self._createButtons(value);
break;

case "closeText":
self.uiDialogTitlebarCloseText.text("" + value);
break;

case "dialogClass":
uiDialog.removeClass(self.options.dialogClass).addClass(uiDialogClasses + value);
break;

case "disabled":
value ? uiDialog.addClass("ui-dialog-disabled") :uiDialog.removeClass("ui-dialog-disabled");
break;

case "draggable":
var isDraggable = uiDialog.is(":data(draggable)");
isDraggable && !value && uiDialog.draggable("destroy"), !isDraggable && value && self._makeDraggable();
break;

case "position":
self._position(value);
break;

case "resizable":
var isResizable = uiDialog.is(":data(resizable)");
isResizable && !value && uiDialog.resizable("destroy"), isResizable && "string" == typeof value && uiDialog.resizable("option", "handles", value), 
isResizable || value === !1 || self._makeResizable(value);
break;

case "title":
$(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || "&#160;"));
}
$.Widget.prototype._setOption.apply(self, arguments);
},
_size:function() {
var nonContentHeight, minContentHeight, options = this.options, isVisible = this.uiDialog.is(":visible");
if (this.element.show().css({
width:"auto",
minHeight:0,
height:0
}), options.minWidth > options.width && (options.width = options.minWidth), nonContentHeight = this.uiDialog.css({
height:"auto",
width:options.width
}).height(), minContentHeight = Math.max(0, options.minHeight - nonContentHeight), 
"auto" === options.height) if ($.support.minHeight) this.element.css({
minHeight:minContentHeight,
height:"auto"
}); else {
this.uiDialog.show();
var autoHeight = this.element.css("height", "auto").height();
isVisible || this.uiDialog.hide(), this.element.height(Math.max(autoHeight, minContentHeight));
} else this.element.height(Math.max(options.height - nonContentHeight, 0));
this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
}
}), $.extend($.ui.dialog, {
version:"1.8.23",
uuid:0,
maxZ:0,
getTitleId:function($el) {
var id = $el.attr("id");
return id || (this.uuid += 1, id = this.uuid), "ui-dialog-title-" + id;
},
overlay:function(dialog) {
this.$el = $.ui.dialog.overlay.create(dialog);
}
}), $.extend($.ui.dialog.overlay, {
instances:[],
oldInstances:[],
maxZ:0,
events:$.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(event) {
return event + ".dialog-overlay";
}).join(" "),
create:function(dialog) {
0 === this.instances.length && (setTimeout(function() {
$.ui.dialog.overlay.instances.length && $(document).bind($.ui.dialog.overlay.events, function(event) {
return $(event.target).zIndex() < $.ui.dialog.overlay.maxZ ? !1 :void 0;
});
}, 1), $(document).bind("keydown.dialog-overlay", function(event) {
dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE && (dialog.close(event), 
event.preventDefault());
}), $(window).bind("resize.dialog-overlay", $.ui.dialog.overlay.resize));
var $el = (this.oldInstances.pop() || $("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
width:this.width(),
height:this.height()
});
return $.fn.bgiframe && $el.bgiframe(), this.instances.push($el), $el;
},
destroy:function($el) {
var indexOf = $.inArray($el, this.instances);
-1 != indexOf && this.oldInstances.push(this.instances.splice(indexOf, 1)[0]), 0 === this.instances.length && $([ document, window ]).unbind(".dialog-overlay"), 
$el.remove();
var maxZ = 0;
$.each(this.instances, function() {
maxZ = Math.max(maxZ, this.css("z-index"));
}), this.maxZ = maxZ;
},
height:function() {
var scrollHeight, offsetHeight;
return $.browser.msie && $.browser.version < 7 ? (scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), 
offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), 
offsetHeight > scrollHeight ? $(window).height() + "px" :scrollHeight + "px") :$(document).height() + "px";
},
width:function() {
var scrollWidth, offsetWidth;
return $.browser.msie ? (scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), 
offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), 
offsetWidth > scrollWidth ? $(window).width() + "px" :scrollWidth + "px") :$(document).width() + "px";
},
resize:function() {
var $overlays = $([]);
$.each($.ui.dialog.overlay.instances, function() {
$overlays = $overlays.add(this);
}), $overlays.css({
width:0,
height:0
}).css({
width:$.ui.dialog.overlay.width(),
height:$.ui.dialog.overlay.height()
});
}
}), $.extend($.ui.dialog.overlay.prototype, {
destroy:function() {
$.ui.dialog.overlay.destroy(this.$el);
}
});
}(jQuery), function($) {
$.ui = $.ui || {};
var horizontalPositions = /left|center|right/, verticalPositions = /top|center|bottom/, center = "center", support = {}, _position = $.fn.position, _offset = $.fn.offset;
$.fn.position = function(options) {
if (!options || !options.of) return _position.apply(this, arguments);
options = $.extend({}, options);
var targetWidth, targetHeight, basePosition, target = $(options.of), targetElem = target[0], collision = (options.collision || "flip").split(" "), offset = options.offset ? options.offset.split(" ") :[ 0, 0 ];
return 9 === targetElem.nodeType ? (targetWidth = target.width(), targetHeight = target.height(), 
basePosition = {
top:0,
left:0
}) :targetElem.setTimeout ? (targetWidth = target.width(), targetHeight = target.height(), 
basePosition = {
top:target.scrollTop(),
left:target.scrollLeft()
}) :targetElem.preventDefault ? (options.at = "left top", targetWidth = targetHeight = 0, 
basePosition = {
top:options.of.pageY,
left:options.of.pageX
}) :(targetWidth = target.outerWidth(), targetHeight = target.outerHeight(), basePosition = target.offset()), 
$.each([ "my", "at" ], function() {
var pos = (options[this] || "").split(" ");
1 === pos.length && (pos = horizontalPositions.test(pos[0]) ? pos.concat([ center ]) :verticalPositions.test(pos[0]) ? [ center ].concat(pos) :[ center, center ]), 
pos[0] = horizontalPositions.test(pos[0]) ? pos[0] :center, pos[1] = verticalPositions.test(pos[1]) ? pos[1] :center, 
options[this] = pos;
}), 1 === collision.length && (collision[1] = collision[0]), offset[0] = parseInt(offset[0], 10) || 0, 
1 === offset.length && (offset[1] = offset[0]), offset[1] = parseInt(offset[1], 10) || 0, 
"right" === options.at[0] ? basePosition.left += targetWidth :options.at[0] === center && (basePosition.left += targetWidth / 2), 
"bottom" === options.at[1] ? basePosition.top += targetHeight :options.at[1] === center && (basePosition.top += targetHeight / 2), 
basePosition.left += offset[0], basePosition.top += offset[1], this.each(function() {
var collisionPosition, elem = $(this), elemWidth = elem.outerWidth(), elemHeight = elem.outerHeight(), marginLeft = parseInt($.curCSS(this, "marginLeft", !0)) || 0, marginTop = parseInt($.curCSS(this, "marginTop", !0)) || 0, collisionWidth = elemWidth + marginLeft + (parseInt($.curCSS(this, "marginRight", !0)) || 0), collisionHeight = elemHeight + marginTop + (parseInt($.curCSS(this, "marginBottom", !0)) || 0), position = $.extend({}, basePosition);
"right" === options.my[0] ? position.left -= elemWidth :options.my[0] === center && (position.left -= elemWidth / 2), 
"bottom" === options.my[1] ? position.top -= elemHeight :options.my[1] === center && (position.top -= elemHeight / 2), 
support.fractions || (position.left = Math.round(position.left), position.top = Math.round(position.top)), 
collisionPosition = {
left:position.left - marginLeft,
top:position.top - marginTop
}, $.each([ "left", "top" ], function(i, dir) {
$.ui.position[collision[i]] && $.ui.position[collision[i]][dir](position, {
targetWidth:targetWidth,
targetHeight:targetHeight,
elemWidth:elemWidth,
elemHeight:elemHeight,
collisionPosition:collisionPosition,
collisionWidth:collisionWidth,
collisionHeight:collisionHeight,
offset:offset,
my:options.my,
at:options.at
});
}), $.fn.bgiframe && elem.bgiframe(), elem.offset($.extend(position, {
using:options.using
}));
});
}, $.ui.position = {
fit:{
left:function(position, data) {
var win = $(window), over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft();
position.left = over > 0 ? position.left - over :Math.max(position.left - data.collisionPosition.left, position.left);
},
top:function(position, data) {
var win = $(window), over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop();
position.top = over > 0 ? position.top - over :Math.max(position.top - data.collisionPosition.top, position.top);
}
},
flip:{
left:function(position, data) {
if (data.at[0] !== center) {
var win = $(window), over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft(), myOffset = "left" === data.my[0] ? -data.elemWidth :"right" === data.my[0] ? data.elemWidth :0, atOffset = "left" === data.at[0] ? data.targetWidth :-data.targetWidth, offset = -2 * data.offset[0];
position.left += data.collisionPosition.left < 0 ? myOffset + atOffset + offset :over > 0 ? myOffset + atOffset + offset :0;
}
},
top:function(position, data) {
if (data.at[1] !== center) {
var win = $(window), over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop(), myOffset = "top" === data.my[1] ? -data.elemHeight :"bottom" === data.my[1] ? data.elemHeight :0, atOffset = "top" === data.at[1] ? data.targetHeight :-data.targetHeight, offset = -2 * data.offset[1];
position.top += data.collisionPosition.top < 0 ? myOffset + atOffset + offset :over > 0 ? myOffset + atOffset + offset :0;
}
}
}
}, $.offset.setOffset || ($.offset.setOffset = function(elem, options) {
/static/.test($.curCSS(elem, "position")) && (elem.style.position = "relative");
var curElem = $(elem), curOffset = curElem.offset(), curTop = parseInt($.curCSS(elem, "top", !0), 10) || 0, curLeft = parseInt($.curCSS(elem, "left", !0), 10) || 0, props = {
top:options.top - curOffset.top + curTop,
left:options.left - curOffset.left + curLeft
};
"using" in options ? options.using.call(elem, props) :curElem.css(props);
}, $.fn.offset = function(options) {
var elem = this[0];
return elem && elem.ownerDocument ? options ? $.isFunction(options) ? this.each(function(i) {
$(this).offset(options.call(this, i, $(this).offset()));
}) :this.each(function() {
$.offset.setOffset(this, options);
}) :_offset.call(this) :null;
}), $.curCSS || ($.curCSS = $.css), function() {
var testElement, testElementParent, testElementStyle, offset, offsetTotal, body = document.getElementsByTagName("body")[0], div = document.createElement("div");
testElement = document.createElement(body ? "div" :"body"), testElementStyle = {
visibility:"hidden",
width:0,
height:0,
border:0,
margin:0,
background:"none"
}, body && $.extend(testElementStyle, {
position:"absolute",
left:"-1000px",
top:"-1000px"
});
for (var i in testElementStyle) testElement.style[i] = testElementStyle[i];
testElement.appendChild(div), testElementParent = body || document.documentElement, 
testElementParent.insertBefore(testElement, testElementParent.firstChild), div.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", 
offset = $(div).offset(function(_, offset) {
return offset;
}).offset(), testElement.innerHTML = "", testElementParent.removeChild(testElement), 
offsetTotal = offset.top + offset.left + (body ? 2e3 :0), support.fractions = offsetTotal > 21 && 22 > offsetTotal;
}();
}(jQuery), function($, undefined) {
$.widget("ui.progressbar", {
options:{
value:0,
max:100
},
min:0,
_create:function() {
this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
role:"progressbar",
"aria-valuemin":this.min,
"aria-valuemax":this.options.max,
"aria-valuenow":this._value()
}), this.valueDiv = $("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), 
this.oldValue = this._value(), this._refreshValue();
},
destroy:function() {
this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), 
this.valueDiv.remove(), $.Widget.prototype.destroy.apply(this, arguments);
},
value:function(newValue) {
return newValue === undefined ? this._value() :(this._setOption("value", newValue), 
this);
},
_setOption:function(key, value) {
"value" === key && (this.options.value = value, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), 
$.Widget.prototype._setOption.apply(this, arguments);
},
_value:function() {
var val = this.options.value;
return "number" != typeof val && (val = 0), Math.min(this.options.max, Math.max(this.min, val));
},
_percentage:function() {
return 100 * this._value() / this.options.max;
},
_refreshValue:function() {
var value = this.value(), percentage = this._percentage();
this.oldValue !== value && (this.oldValue = value, this._trigger("change")), this.valueDiv.toggle(value > this.min).toggleClass("ui-corner-right", value === this.options.max).width(percentage.toFixed(0) + "%"), 
this.element.attr("aria-valuenow", value);
}
}), $.extend($.ui.progressbar, {
version:"1.8.23"
});
}(jQuery), function($) {
var numPages = 5;
$.widget("ui.slider", $.ui.mouse, {
widgetEventPrefix:"slide",
options:{
animate:!1,
distance:0,
max:100,
min:0,
orientation:"horizontal",
range:!1,
step:1,
value:0,
values:null
},
_create:function() {
var self = this, o = this.options, existingHandles = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", handleCount = o.values && o.values.length || 1, handles = [];
this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, 
this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (o.disabled ? " ui-slider-disabled ui-disabled" :"")), 
this.range = $([]), o.range && (o.range === !0 && (o.values || (o.values = [ this._valueMin(), this._valueMin() ]), 
o.values.length && 2 !== o.values.length && (o.values = [ o.values[0], o.values[0] ])), 
this.range = $("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === o.range || "max" === o.range ? " ui-slider-range-" + o.range :"")));
for (var i = existingHandles.length; handleCount > i; i += 1) handles.push(handle);
this.handles = existingHandles.add($(handles.join("")).appendTo(self.element)), 
this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(event) {
event.preventDefault();
}).hover(function() {
o.disabled || $(this).addClass("ui-state-hover");
}, function() {
$(this).removeClass("ui-state-hover");
}).focus(function() {
o.disabled ? $(this).blur() :($(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), 
$(this).addClass("ui-state-focus"));
}).blur(function() {
$(this).removeClass("ui-state-focus");
}), this.handles.each(function(i) {
$(this).data("index.ui-slider-handle", i);
}), this.handles.keydown(function(event) {
var allowed, curVal, newVal, step, index = $(this).data("index.ui-slider-handle");
if (!self.options.disabled) {
switch (event.keyCode) {
case $.ui.keyCode.HOME:
case $.ui.keyCode.END:
case $.ui.keyCode.PAGE_UP:
case $.ui.keyCode.PAGE_DOWN:
case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
if (event.preventDefault(), !self._keySliding && (self._keySliding = !0, $(this).addClass("ui-state-active"), 
allowed = self._start(event, index), allowed === !1)) return;
}
switch (step = self.options.step, curVal = newVal = self.options.values && self.options.values.length ? self.values(index) :self.value(), 
event.keyCode) {
case $.ui.keyCode.HOME:
newVal = self._valueMin();
break;

case $.ui.keyCode.END:
newVal = self._valueMax();
break;

case $.ui.keyCode.PAGE_UP:
newVal = self._trimAlignValue(curVal + (self._valueMax() - self._valueMin()) / numPages);
break;

case $.ui.keyCode.PAGE_DOWN:
newVal = self._trimAlignValue(curVal - (self._valueMax() - self._valueMin()) / numPages);
break;

case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
if (curVal === self._valueMax()) return;
newVal = self._trimAlignValue(curVal + step);
break;

case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
if (curVal === self._valueMin()) return;
newVal = self._trimAlignValue(curVal - step);
}
self._slide(event, index, newVal);
}
}).keyup(function(event) {
var index = $(this).data("index.ui-slider-handle");
self._keySliding && (self._keySliding = !1, self._stop(event, index), self._change(event, index), 
$(this).removeClass("ui-state-active"));
}), this._refreshValue(), this._animateOff = !1;
},
destroy:function() {
return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), 
this._mouseDestroy(), this;
},
_mouseCapture:function(event) {
var position, normValue, distance, closestHandle, self, index, allowed, offset, mouseOverHandle, o = this.options;
return o.disabled ? !1 :(this.elementSize = {
width:this.element.outerWidth(),
height:this.element.outerHeight()
}, this.elementOffset = this.element.offset(), position = {
x:event.pageX,
y:event.pageY
}, normValue = this._normValueFromMouse(position), distance = this._valueMax() - this._valueMin() + 1, 
self = this, this.handles.each(function(i) {
var thisDistance = Math.abs(normValue - self.values(i));
distance > thisDistance && (distance = thisDistance, closestHandle = $(this), index = i);
}), o.range === !0 && this.values(1) === o.min && (index += 1, closestHandle = $(this.handles[index])), 
allowed = this._start(event, index), allowed === !1 ? !1 :(this._mouseSliding = !0, 
self._handleIndex = index, closestHandle.addClass("ui-state-active").focus(), offset = closestHandle.offset(), 
mouseOverHandle = !$(event.target).parents().andSelf().is(".ui-slider-handle"), 
this._clickOffset = mouseOverHandle ? {
left:0,
top:0
} :{
left:event.pageX - offset.left - closestHandle.width() / 2,
top:event.pageY - offset.top - closestHandle.height() / 2 - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
}, this.handles.hasClass("ui-state-hover") || this._slide(event, index, normValue), 
this._animateOff = !0, !0));
},
_mouseStart:function() {
return !0;
},
_mouseDrag:function(event) {
var position = {
x:event.pageX,
y:event.pageY
}, normValue = this._normValueFromMouse(position);
return this._slide(event, this._handleIndex, normValue), !1;
},
_mouseStop:function(event) {
return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(event, this._handleIndex), 
this._change(event, this._handleIndex), this._handleIndex = null, this._clickOffset = null, 
this._animateOff = !1, !1;
},
_detectOrientation:function() {
this.orientation = "vertical" === this.options.orientation ? "vertical" :"horizontal";
},
_normValueFromMouse:function(position) {
var pixelTotal, pixelMouse, percentMouse, valueTotal, valueMouse;
return "horizontal" === this.orientation ? (pixelTotal = this.elementSize.width, 
pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left :0)) :(pixelTotal = this.elementSize.height, 
pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top :0)), 
percentMouse = pixelMouse / pixelTotal, percentMouse > 1 && (percentMouse = 1), 
0 > percentMouse && (percentMouse = 0), "vertical" === this.orientation && (percentMouse = 1 - percentMouse), 
valueTotal = this._valueMax() - this._valueMin(), valueMouse = this._valueMin() + percentMouse * valueTotal, 
this._trimAlignValue(valueMouse);
},
_start:function(event, index) {
var uiHash = {
handle:this.handles[index],
value:this.value()
};
return this.options.values && this.options.values.length && (uiHash.value = this.values(index), 
uiHash.values = this.values()), this._trigger("start", event, uiHash);
},
_slide:function(event, index, newVal) {
var otherVal, newValues, allowed;
this.options.values && this.options.values.length ? (otherVal = this.values(index ? 0 :1), 
2 === this.options.values.length && this.options.range === !0 && (0 === index && newVal > otherVal || 1 === index && otherVal > newVal) && (newVal = otherVal), 
newVal !== this.values(index) && (newValues = this.values(), newValues[index] = newVal, 
allowed = this._trigger("slide", event, {
handle:this.handles[index],
value:newVal,
values:newValues
}), otherVal = this.values(index ? 0 :1), allowed !== !1 && this.values(index, newVal, !0))) :newVal !== this.value() && (allowed = this._trigger("slide", event, {
handle:this.handles[index],
value:newVal
}), allowed !== !1 && this.value(newVal));
},
_stop:function(event, index) {
var uiHash = {
handle:this.handles[index],
value:this.value()
};
this.options.values && this.options.values.length && (uiHash.value = this.values(index), 
uiHash.values = this.values()), this._trigger("stop", event, uiHash);
},
_change:function(event, index) {
if (!this._keySliding && !this._mouseSliding) {
var uiHash = {
handle:this.handles[index],
value:this.value()
};
this.options.values && this.options.values.length && (uiHash.value = this.values(index), 
uiHash.values = this.values()), this._trigger("change", event, uiHash);
}
},
value:function(newValue) {
return arguments.length ? (this.options.value = this._trimAlignValue(newValue), 
this._refreshValue(), this._change(null, 0), void 0) :this._value();
},
values:function(index, newValue) {
var vals, newValues, i;
if (arguments.length > 1) return this.options.values[index] = this._trimAlignValue(newValue), 
this._refreshValue(), this._change(null, index), void 0;
if (!arguments.length) return this._values();
if (!$.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(index) :this.value();
for (vals = this.options.values, newValues = arguments[0], i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(newValues[i]), 
this._change(null, i);
this._refreshValue();
},
_setOption:function(key, value) {
var i, valsLength = 0;
switch ($.isArray(this.options.values) && (valsLength = this.options.values.length), 
$.Widget.prototype._setOption.apply(this, arguments), key) {
case "disabled":
value ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), 
this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) :(this.handles.propAttr("disabled", !1), 
this.element.removeClass("ui-disabled"));
break;

case "orientation":
this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), 
this._refreshValue();
break;

case "value":
this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
break;

case "values":
for (this._animateOff = !0, this._refreshValue(), i = 0; valsLength > i; i += 1) this._change(null, i);
this._animateOff = !1;
}
},
_value:function() {
var val = this.options.value;
return val = this._trimAlignValue(val);
},
_values:function(index) {
var val, vals, i;
if (arguments.length) return val = this.options.values[index], val = this._trimAlignValue(val);
for (vals = this.options.values.slice(), i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(vals[i]);
return vals;
},
_trimAlignValue:function(val) {
if (val <= this._valueMin()) return this._valueMin();
if (val >= this._valueMax()) return this._valueMax();
var step = this.options.step > 0 ? this.options.step :1, valModStep = (val - this._valueMin()) % step, alignValue = val - valModStep;
return 2 * Math.abs(valModStep) >= step && (alignValue += valModStep > 0 ? step :-step), 
parseFloat(alignValue.toFixed(5));
},
_valueMin:function() {
return this.options.min;
},
_valueMax:function() {
return this.options.max;
},
_refreshValue:function() {
var valPercent, lastValPercent, value, valueMin, valueMax, oRange = this.options.range, o = this.options, self = this, animate = this._animateOff ? !1 :o.animate, _set = {};
this.options.values && this.options.values.length ? this.handles.each(function(i) {
valPercent = (self.values(i) - self._valueMin()) / (self._valueMax() - self._valueMin()) * 100, 
_set["horizontal" === self.orientation ? "left" :"bottom"] = valPercent + "%", $(this).stop(1, 1)[animate ? "animate" :"css"](_set, o.animate), 
self.options.range === !0 && ("horizontal" === self.orientation ? (0 === i && self.range.stop(1, 1)[animate ? "animate" :"css"]({
left:valPercent + "%"
}, o.animate), 1 === i && self.range[animate ? "animate" :"css"]({
width:valPercent - lastValPercent + "%"
}, {
queue:!1,
duration:o.animate
})) :(0 === i && self.range.stop(1, 1)[animate ? "animate" :"css"]({
bottom:valPercent + "%"
}, o.animate), 1 === i && self.range[animate ? "animate" :"css"]({
height:valPercent - lastValPercent + "%"
}, {
queue:!1,
duration:o.animate
}))), lastValPercent = valPercent;
}) :(value = this.value(), valueMin = this._valueMin(), valueMax = this._valueMax(), 
valPercent = valueMax !== valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 :0, 
_set["horizontal" === self.orientation ? "left" :"bottom"] = valPercent + "%", this.handle.stop(1, 1)[animate ? "animate" :"css"](_set, o.animate), 
"min" === oRange && "horizontal" === this.orientation && this.range.stop(1, 1)[animate ? "animate" :"css"]({
width:valPercent + "%"
}, o.animate), "max" === oRange && "horizontal" === this.orientation && this.range[animate ? "animate" :"css"]({
width:100 - valPercent + "%"
}, {
queue:!1,
duration:o.animate
}), "min" === oRange && "vertical" === this.orientation && this.range.stop(1, 1)[animate ? "animate" :"css"]({
height:valPercent + "%"
}, o.animate), "max" === oRange && "vertical" === this.orientation && this.range[animate ? "animate" :"css"]({
height:100 - valPercent + "%"
}, {
queue:!1,
duration:o.animate
}));
}
}), $.extend($.ui.slider, {
version:"1.8.23"
});
}(jQuery), function($, undefined) {
function getNextTabId() {
return ++tabId;
}
function getNextListId() {
return ++listId;
}
var tabId = 0, listId = 0;
$.widget("ui.tabs", {
options:{
add:null,
ajaxOptions:null,
cache:!1,
cookie:null,
collapsible:!1,
disable:null,
disabled:[],
enable:null,
event:"click",
fx:null,
idPrefix:"ui-tabs-",
load:null,
panelTemplate:"<div></div>",
remove:null,
select:null,
show:null,
spinner:"<em>Loading&#8230;</em>",
tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"
},
_create:function() {
this._tabify(!0);
},
_setOption:function(key, value) {
if ("selected" == key) {
if (this.options.collapsible && value == this.options.selected) return;
this.select(value);
} else this.options[key] = value, this._tabify();
},
_tabId:function(a) {
return a.title && a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + getNextTabId();
},
_sanitizeSelector:function(hash) {
return hash.replace(/:/g, "\\:");
},
_cookie:function() {
var cookie = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + getNextListId());
return $.cookie.apply(null, [ cookie ].concat($.makeArray(arguments)));
},
_ui:function(tab, panel) {
return {
tab:tab,
panel:panel,
index:this.anchors.index(tab)
};
},
_cleanup:function() {
this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
var el = $(this);
el.html(el.data("label.tabs")).removeData("label.tabs");
});
},
_tabify:function(init) {
function resetStyle($el, fx) {
$el.css("display", ""), !$.support.opacity && fx.opacity && $el[0].style.removeAttribute("filter");
}
var self = this, o = this.options, fragmentId = /^#.+/;
this.list = this.element.find("ol,ul").eq(0), this.lis = $(" > li:has(a[href])", this.list), 
this.anchors = this.lis.map(function() {
return $("a", this)[0];
}), this.panels = $([]), this.anchors.each(function(i, a) {
var baseEl, href = $(a).attr("href"), hrefBase = href.split("#")[0];
if (hrefBase && (hrefBase === location.toString().split("#")[0] || (baseEl = $("base")[0]) && hrefBase === baseEl.href) && (href = a.hash, 
a.href = href), fragmentId.test(href)) self.panels = self.panels.add(self.element.find(self._sanitizeSelector(href))); else if (href && "#" !== href) {
$.data(a, "href.tabs", href), $.data(a, "load.tabs", href.replace(/#.*$/, ""));
var id = self._tabId(a);
a.href = "#" + id;
var $panel = self.element.find("#" + id);
$panel.length || ($panel = $(o.panelTemplate).attr("id", id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(self.panels[i - 1] || self.list), 
$panel.data("destroy.tabs", !0)), self.panels = self.panels.add($panel);
} else o.disabled.push(i);
}), init ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), 
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), 
this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), 
o.selected === undefined ? (location.hash && this.anchors.each(function(i, a) {
return a.hash == location.hash ? (o.selected = i, !1) :void 0;
}), "number" != typeof o.selected && o.cookie && (o.selected = parseInt(self._cookie(), 10)), 
"number" != typeof o.selected && this.lis.filter(".ui-tabs-selected").length && (o.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), 
o.selected = o.selected || (this.lis.length ? 0 :-1)) :null === o.selected && (o.selected = -1), 
o.selected = o.selected >= 0 && this.anchors[o.selected] || o.selected < 0 ? o.selected :0, 
o.disabled = $.unique(o.disabled.concat($.map(this.lis.filter(".ui-state-disabled"), function(n) {
return self.lis.index(n);
}))).sort(), -1 != $.inArray(o.selected, o.disabled) && o.disabled.splice($.inArray(o.selected, o.disabled), 1), 
this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), 
o.selected >= 0 && this.anchors.length && (self.element.find(self._sanitizeSelector(self.anchors[o.selected].hash)).removeClass("ui-tabs-hide"), 
this.lis.eq(o.selected).addClass("ui-tabs-selected ui-state-active"), self.element.queue("tabs", function() {
self._trigger("show", null, self._ui(self.anchors[o.selected], self.element.find(self._sanitizeSelector(self.anchors[o.selected].hash))[0]));
}), this.load(o.selected)), $(window).bind("unload", function() {
self.lis.add(self.anchors).unbind(".tabs"), self.lis = self.anchors = self.panels = null;
})) :o.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[o.collapsible ? "addClass" :"removeClass"]("ui-tabs-collapsible"), 
o.cookie && this._cookie(o.selected, o.cookie);
for (var li, i = 0; li = this.lis[i]; i++) $(li)[-1 == $.inArray(i, o.disabled) || $(li).hasClass("ui-tabs-selected") ? "removeClass" :"addClass"]("ui-state-disabled");
if (o.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs"), 
"mouseover" !== o.event) {
var addState = function(state, el) {
el.is(":not(.ui-state-disabled)") && el.addClass("ui-state-" + state);
}, removeState = function(state, el) {
el.removeClass("ui-state-" + state);
};
this.lis.bind("mouseover.tabs", function() {
addState("hover", $(this));
}), this.lis.bind("mouseout.tabs", function() {
removeState("hover", $(this));
}), this.anchors.bind("focus.tabs", function() {
addState("focus", $(this).closest("li"));
}), this.anchors.bind("blur.tabs", function() {
removeState("focus", $(this).closest("li"));
});
}
var hideFx, showFx;
o.fx && ($.isArray(o.fx) ? (hideFx = o.fx[0], showFx = o.fx[1]) :hideFx = showFx = o.fx);
var showTab = showFx ? function(clicked, $show) {
$(clicked).closest("li").addClass("ui-tabs-selected ui-state-active"), $show.hide().removeClass("ui-tabs-hide").animate(showFx, showFx.duration || "normal", function() {
resetStyle($show, showFx), self._trigger("show", null, self._ui(clicked, $show[0]));
});
} :function(clicked, $show) {
$(clicked).closest("li").addClass("ui-tabs-selected ui-state-active"), $show.removeClass("ui-tabs-hide"), 
self._trigger("show", null, self._ui(clicked, $show[0]));
}, hideTab = hideFx ? function(clicked, $hide) {
$hide.animate(hideFx, hideFx.duration || "normal", function() {
self.lis.removeClass("ui-tabs-selected ui-state-active"), $hide.addClass("ui-tabs-hide"), 
resetStyle($hide, hideFx), self.element.dequeue("tabs");
});
} :function(clicked, $hide) {
self.lis.removeClass("ui-tabs-selected ui-state-active"), $hide.addClass("ui-tabs-hide"), 
self.element.dequeue("tabs");
};
this.anchors.bind(o.event + ".tabs", function() {
var el = this, $li = $(el).closest("li"), $hide = self.panels.filter(":not(.ui-tabs-hide)"), $show = self.element.find(self._sanitizeSelector(el.hash));
if ($li.hasClass("ui-tabs-selected") && !o.collapsible || $li.hasClass("ui-state-disabled") || $li.hasClass("ui-state-processing") || self.panels.filter(":animated").length || self._trigger("select", null, self._ui(this, $show[0])) === !1) return this.blur(), 
!1;
if (o.selected = self.anchors.index(this), self.abort(), o.collapsible) {
if ($li.hasClass("ui-tabs-selected")) return o.selected = -1, o.cookie && self._cookie(o.selected, o.cookie), 
self.element.queue("tabs", function() {
hideTab(el, $hide);
}).dequeue("tabs"), this.blur(), !1;
if (!$hide.length) return o.cookie && self._cookie(o.selected, o.cookie), self.element.queue("tabs", function() {
showTab(el, $show);
}), self.load(self.anchors.index(this)), this.blur(), !1;
}
if (o.cookie && self._cookie(o.selected, o.cookie), !$show.length) throw "jQuery UI Tabs: Mismatching fragment identifier.";
$hide.length && self.element.queue("tabs", function() {
hideTab(el, $hide);
}), self.element.queue("tabs", function() {
showTab(el, $show);
}), self.load(self.anchors.index(this)), $.browser.msie && this.blur();
}), this.anchors.bind("click.tabs", function() {
return !1;
});
},
_getIndex:function(index) {
return "string" == typeof index && (index = this.anchors.index(this.anchors.filter("[href$='" + index + "']"))), 
index;
},
destroy:function() {
var o = this.options;
return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), 
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), 
this.anchors.each(function() {
var href = $.data(this, "href.tabs");
href && (this.href = href);
var $this = $(this).unbind(".tabs");
$.each([ "href", "load", "cache" ], function(i, prefix) {
$this.removeData(prefix + ".tabs");
});
}), this.lis.unbind(".tabs").add(this.panels).each(function() {
$.data(this, "destroy.tabs") ? $(this).remove() :$(this).removeClass([ "ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide" ].join(" "));
}), o.cookie && this._cookie(null, o.cookie), this;
},
add:function(url, label, index) {
index === undefined && (index = this.anchors.length);
var self = this, o = this.options, $li = $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label)), id = url.indexOf("#") ? this._tabId($("a", $li)[0]) :url.replace("#", "");
$li.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
var $panel = self.element.find("#" + id);
return $panel.length || ($panel = $(o.panelTemplate).attr("id", id).data("destroy.tabs", !0)), 
$panel.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), 
index >= this.lis.length ? ($li.appendTo(this.list), $panel.appendTo(this.list[0].parentNode)) :($li.insertBefore(this.lis[index]), 
$panel.insertBefore(this.panels[index])), o.disabled = $.map(o.disabled, function(n) {
return n >= index ? ++n :n;
}), this._tabify(), 1 == this.anchors.length && (o.selected = 0, $li.addClass("ui-tabs-selected ui-state-active"), 
$panel.removeClass("ui-tabs-hide"), this.element.queue("tabs", function() {
self._trigger("show", null, self._ui(self.anchors[0], self.panels[0]));
}), this.load(0)), this._trigger("add", null, this._ui(this.anchors[index], this.panels[index])), 
this;
},
remove:function(index) {
index = this._getIndex(index);
var o = this.options, $li = this.lis.eq(index).remove(), $panel = this.panels.eq(index).remove();
return $li.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(index + (index + 1 < this.anchors.length ? 1 :-1)), 
o.disabled = $.map($.grep(o.disabled, function(n) {
return n != index;
}), function(n) {
return n >= index ? --n :n;
}), this._tabify(), this._trigger("remove", null, this._ui($li.find("a")[0], $panel[0])), 
this;
},
enable:function(index) {
index = this._getIndex(index);
var o = this.options;
if (-1 != $.inArray(index, o.disabled)) return this.lis.eq(index).removeClass("ui-state-disabled"), 
o.disabled = $.grep(o.disabled, function(n) {
return n != index;
}), this._trigger("enable", null, this._ui(this.anchors[index], this.panels[index])), 
this;
},
disable:function(index) {
index = this._getIndex(index);
var o = this.options;
return index != o.selected && (this.lis.eq(index).addClass("ui-state-disabled"), 
o.disabled.push(index), o.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[index], this.panels[index]))), 
this;
},
select:function(index) {
if (index = this._getIndex(index), -1 == index) {
if (!this.options.collapsible || -1 == this.options.selected) return this;
index = this.options.selected;
}
return this.anchors.eq(index).trigger(this.options.event + ".tabs"), this;
},
load:function(index) {
index = this._getIndex(index);
var self = this, o = this.options, a = this.anchors.eq(index)[0], url = $.data(a, "load.tabs");
if (this.abort(), !url || 0 !== this.element.queue("tabs").length && $.data(a, "cache.tabs")) return this.element.dequeue("tabs"), 
void 0;
if (this.lis.eq(index).addClass("ui-state-processing"), o.spinner) {
var span = $("span", a);
span.data("label.tabs", span.html()).html(o.spinner);
}
return this.xhr = $.ajax($.extend({}, o.ajaxOptions, {
url:url,
success:function(r, s) {
self.element.find(self._sanitizeSelector(a.hash)).html(r), self._cleanup(), o.cache && $.data(a, "cache.tabs", !0), 
self._trigger("load", null, self._ui(self.anchors[index], self.panels[index]));
try {
o.ajaxOptions.success(r, s);
} catch (e) {}
},
error:function(xhr, s) {
self._cleanup(), self._trigger("load", null, self._ui(self.anchors[index], self.panels[index]));
try {
o.ajaxOptions.error(xhr, s, index, a);
} catch (e) {}
}
})), self.element.dequeue("tabs"), this;
},
abort:function() {
return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), 
this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this;
},
url:function(index, url) {
return this.anchors.eq(index).removeData("cache.tabs").data("load.tabs", url), this;
},
length:function() {
return this.anchors.length;
}
}), $.extend($.ui.tabs, {
version:"1.8.23"
}), $.extend($.ui.tabs.prototype, {
rotation:null,
rotate:function(ms, continuing) {
var self = this, o = this.options, rotate = self._rotate || (self._rotate = function(e) {
clearTimeout(self.rotation), self.rotation = setTimeout(function() {
var t = o.selected;
self.select(++t < self.anchors.length ? t :0);
}, ms), e && e.stopPropagation();
}), stop = self._unrotate || (self._unrotate = continuing ? function() {
rotate();
} :function(e) {
e.clientX && self.rotate(null);
});
return ms ? (this.element.bind("tabsshow", rotate), this.anchors.bind(o.event + ".tabs", stop), 
rotate()) :(clearTimeout(self.rotation), this.element.unbind("tabsshow", rotate), 
this.anchors.unbind(o.event + ".tabs", stop), delete this._rotate, delete this._unrotate), 
this;
}
});
}(jQuery), function() {
function eq(a, b, stack) {
if (a === b) return 0 !== a || 1 / a == 1 / b;
if (null == a || null == b) return a === b;
if (a._chain && (a = a._wrapped), b._chain && (b = b._wrapped), a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
var className = toString.call(a);
if (className != toString.call(b)) return !1;
switch (className) {
case "[object String]":
return a == String(b);

case "[object Number]":
return a != +a ? b != +b :0 == a ? 1 / a == 1 / b :a == +b;

case "[object Date]":
case "[object Boolean]":
return +a == +b;

case "[object RegExp]":
return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
}
if ("object" != typeof a || "object" != typeof b) return !1;
for (var length = stack.length; length--; ) if (stack[length] == a) return !0;
stack.push(a);
var size = 0, result = !0;
if ("[object Array]" == className) {
if (size = a.length, result = size == b.length) for (;size-- && (result = size in a == size in b && eq(a[size], b[size], stack)); ) ;
} else {
if ("constructor" in a != "constructor" in b || a.constructor != b.constructor) return !1;
for (var key in a) if (_.has(a, key) && (size++, !(result = _.has(b, key) && eq(a[key], b[key], stack)))) break;
if (result) {
for (key in b) if (_.has(b, key) && !size--) break;
result = !size;
}
}
return stack.pop(), result;
}
var root = this, previousUnderscore = root._, breaker = {}, ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype, slice = ArrayProto.slice, unshift = ArrayProto.unshift, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty, nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind, _ = function(obj) {
return new wrapper(obj);
};
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), 
exports._ = _) :root._ = _, _.VERSION = "1.3.3";
var each = _.each = _.forEach = function(obj, iterator, context) {
if (null != obj) if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context); else if (obj.length === +obj.length) {
for (var i = 0, l = obj.length; l > i; i++) if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
} else for (var key in obj) if (_.has(obj, key) && iterator.call(context, obj[key], key, obj) === breaker) return;
};
_.map = _.collect = function(obj, iterator, context) {
var results = [];
return null == obj ? results :nativeMap && obj.map === nativeMap ? obj.map(iterator, context) :(each(obj, function(value, index, list) {
results[results.length] = iterator.call(context, value, index, list);
}), obj.length === +obj.length && (results.length = obj.length), results);
}, _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
var initial = arguments.length > 2;
if (null == obj && (obj = []), nativeReduce && obj.reduce === nativeReduce) return context && (iterator = _.bind(iterator, context)), 
initial ? obj.reduce(iterator, memo) :obj.reduce(iterator);
if (each(obj, function(value, index, list) {
initial ? memo = iterator.call(context, memo, value, index, list) :(memo = value, 
initial = !0);
}), !initial) throw new TypeError("Reduce of empty array with no initial value");
return memo;
}, _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
var initial = arguments.length > 2;
if (null == obj && (obj = []), nativeReduceRight && obj.reduceRight === nativeReduceRight) return context && (iterator = _.bind(iterator, context)), 
initial ? obj.reduceRight(iterator, memo) :obj.reduceRight(iterator);
var reversed = _.toArray(obj).reverse();
return context && !initial && (iterator = _.bind(iterator, context)), initial ? _.reduce(reversed, iterator, memo, context) :_.reduce(reversed, iterator);
}, _.find = _.detect = function(obj, iterator, context) {
var result;
return any(obj, function(value, index, list) {
return iterator.call(context, value, index, list) ? (result = value, !0) :void 0;
}), result;
}, _.filter = _.select = function(obj, iterator, context) {
var results = [];
return null == obj ? results :nativeFilter && obj.filter === nativeFilter ? obj.filter(iterator, context) :(each(obj, function(value, index, list) {
iterator.call(context, value, index, list) && (results[results.length] = value);
}), results);
}, _.reject = function(obj, iterator, context) {
var results = [];
return null == obj ? results :(each(obj, function(value, index, list) {
iterator.call(context, value, index, list) || (results[results.length] = value);
}), results);
}, _.every = _.all = function(obj, iterator, context) {
var result = !0;
return null == obj ? result :nativeEvery && obj.every === nativeEvery ? obj.every(iterator, context) :(each(obj, function(value, index, list) {
return (result = result && iterator.call(context, value, index, list)) ? void 0 :breaker;
}), !!result);
};
var any = _.some = _.any = function(obj, iterator, context) {
iterator || (iterator = _.identity);
var result = !1;
return null == obj ? result :nativeSome && obj.some === nativeSome ? obj.some(iterator, context) :(each(obj, function(value, index, list) {
return result || (result = iterator.call(context, value, index, list)) ? breaker :void 0;
}), !!result);
};
_.include = _.contains = function(obj, target) {
var found = !1;
return null == obj ? found :nativeIndexOf && obj.indexOf === nativeIndexOf ? -1 != obj.indexOf(target) :found = any(obj, function(value) {
return value === target;
});
}, _.invoke = function(obj, method) {
var args = slice.call(arguments, 2);
return _.map(obj, function(value) {
return (_.isFunction(method) ? method || value :value[method]).apply(value, args);
});
}, _.pluck = function(obj, key) {
return _.map(obj, function(value) {
return value[key];
});
}, _.max = function(obj, iterator, context) {
if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
if (!iterator && _.isEmpty(obj)) return -1/0;
var result = {
computed:-1/0
};
return each(obj, function(value, index, list) {
var computed = iterator ? iterator.call(context, value, index, list) :value;
computed >= result.computed && (result = {
value:value,
computed:computed
});
}), result.value;
}, _.min = function(obj, iterator, context) {
if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
if (!iterator && _.isEmpty(obj)) return 1/0;
var result = {
computed:1/0
};
return each(obj, function(value, index, list) {
var computed = iterator ? iterator.call(context, value, index, list) :value;
computed < result.computed && (result = {
value:value,
computed:computed
});
}), result.value;
}, _.shuffle = function(obj) {
var rand, shuffled = [];
return each(obj, function(value, index) {
rand = Math.floor(Math.random() * (index + 1)), shuffled[index] = shuffled[rand], 
shuffled[rand] = value;
}), shuffled;
}, _.sortBy = function(obj, val, context) {
var iterator = _.isFunction(val) ? val :function(obj) {
return obj[val];
};
return _.pluck(_.map(obj, function(value, index, list) {
return {
value:value,
criteria:iterator.call(context, value, index, list)
};
}).sort(function(left, right) {
var a = left.criteria, b = right.criteria;
return void 0 === a ? 1 :void 0 === b ? -1 :b > a ? -1 :a > b ? 1 :0;
}), "value");
}, _.groupBy = function(obj, val) {
var result = {}, iterator = _.isFunction(val) ? val :function(obj) {
return obj[val];
};
return each(obj, function(value, index) {
var key = iterator(value, index);
(result[key] || (result[key] = [])).push(value);
}), result;
}, _.sortedIndex = function(array, obj, iterator) {
iterator || (iterator = _.identity);
for (var low = 0, high = array.length; high > low; ) {
var mid = low + high >> 1;
iterator(array[mid]) < iterator(obj) ? low = mid + 1 :high = mid;
}
return low;
}, _.toArray = function(obj) {
return obj ? _.isArray(obj) ? slice.call(obj) :_.isArguments(obj) ? slice.call(obj) :obj.toArray && _.isFunction(obj.toArray) ? obj.toArray() :_.values(obj) :[];
}, _.size = function(obj) {
return _.isArray(obj) ? obj.length :_.keys(obj).length;
}, _.first = _.head = _.take = function(array, n, guard) {
return null == n || guard ? array[0] :slice.call(array, 0, n);
}, _.initial = function(array, n, guard) {
return slice.call(array, 0, array.length - (null == n || guard ? 1 :n));
}, _.last = function(array, n, guard) {
return null == n || guard ? array[array.length - 1] :slice.call(array, Math.max(array.length - n, 0));
}, _.rest = _.tail = function(array, index, guard) {
return slice.call(array, null == index || guard ? 1 :index);
}, _.compact = function(array) {
return _.filter(array, function(value) {
return !!value;
});
}, _.flatten = function(array, shallow) {
return _.reduce(array, function(memo, value) {
return _.isArray(value) ? memo.concat(shallow ? value :_.flatten(value)) :(memo[memo.length] = value, 
memo);
}, []);
}, _.without = function(array) {
return _.difference(array, slice.call(arguments, 1));
}, _.uniq = _.unique = function(array, isSorted, iterator) {
var initial = iterator ? _.map(array, iterator) :array, results = [];
return array.length < 3 && (isSorted = !0), _.reduce(initial, function(memo, value, index) {
return (isSorted ? _.last(memo) === value && memo.length :_.include(memo, value)) || (memo.push(value), 
results.push(array[index])), memo;
}, []), results;
}, _.union = function() {
return _.uniq(_.flatten(arguments, !0));
}, _.intersection = _.intersect = function(array) {
var rest = slice.call(arguments, 1);
return _.filter(_.uniq(array), function(item) {
return _.every(rest, function(other) {
return _.indexOf(other, item) >= 0;
});
});
}, _.difference = function(array) {
var rest = _.flatten(slice.call(arguments, 1), !0);
return _.filter(array, function(value) {
return !_.include(rest, value);
});
}, _.zip = function() {
for (var args = slice.call(arguments), length = _.max(_.pluck(args, "length")), results = new Array(length), i = 0; length > i; i++) results[i] = _.pluck(args, "" + i);
return results;
}, _.indexOf = function(array, item, isSorted) {
if (null == array) return -1;
var i, l;
if (isSorted) return i = _.sortedIndex(array, item), array[i] === item ? i :-1;
if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
for (i = 0, l = array.length; l > i; i++) if (i in array && array[i] === item) return i;
return -1;
}, _.lastIndexOf = function(array, item) {
if (null == array) return -1;
if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
for (var i = array.length; i--; ) if (i in array && array[i] === item) return i;
return -1;
}, _.range = function(start, stop, step) {
arguments.length <= 1 && (stop = start || 0, start = 0), step = arguments[2] || 1;
for (var len = Math.max(Math.ceil((stop - start) / step), 0), idx = 0, range = new Array(len); len > idx; ) range[idx++] = start, 
start += step;
return range;
};
var ctor = function() {};
_.bind = function(func, context) {
var bound, args;
if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
if (!_.isFunction(func)) throw new TypeError();
return args = slice.call(arguments, 2), bound = function() {
if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
ctor.prototype = func.prototype;
var self = new ctor(), result = func.apply(self, args.concat(slice.call(arguments)));
return Object(result) === result ? result :self;
};
}, _.bindAll = function(obj) {
var funcs = slice.call(arguments, 1);
return 0 == funcs.length && (funcs = _.functions(obj)), each(funcs, function(f) {
obj[f] = _.bind(obj[f], obj);
}), obj;
}, _.memoize = function(func, hasher) {
var memo = {};
return hasher || (hasher = _.identity), function() {
var key = hasher.apply(this, arguments);
return _.has(memo, key) ? memo[key] :memo[key] = func.apply(this, arguments);
};
}, _.delay = function(func, wait) {
var args = slice.call(arguments, 2);
return setTimeout(function() {
return func.apply(null, args);
}, wait);
}, _.defer = function(func) {
return _.delay.apply(_, [ func, 1 ].concat(slice.call(arguments, 1)));
}, _.throttle = function(func, wait) {
var context, args, timeout, throttling, more, result, whenDone = _.debounce(function() {
more = throttling = !1;
}, wait);
return function() {
context = this, args = arguments;
var later = function() {
timeout = null, more && func.apply(context, args), whenDone();
};
return timeout || (timeout = setTimeout(later, wait)), throttling ? more = !0 :result = func.apply(context, args), 
whenDone(), throttling = !0, result;
};
}, _.debounce = function(func, wait, immediate) {
var timeout;
return function() {
var context = this, args = arguments, later = function() {
timeout = null, immediate || func.apply(context, args);
};
immediate && !timeout && func.apply(context, args), clearTimeout(timeout), timeout = setTimeout(later, wait);
};
}, _.once = function(func) {
var memo, ran = !1;
return function() {
return ran ? memo :(ran = !0, memo = func.apply(this, arguments));
};
}, _.wrap = function(func, wrapper) {
return function() {
var args = [ func ].concat(slice.call(arguments, 0));
return wrapper.apply(this, args);
};
}, _.compose = function() {
var funcs = arguments;
return function() {
for (var args = arguments, i = funcs.length - 1; i >= 0; i--) args = [ funcs[i].apply(this, args) ];
return args[0];
};
}, _.after = function(times, func) {
return 0 >= times ? func() :function() {
return --times < 1 ? func.apply(this, arguments) :void 0;
};
}, _.keys = nativeKeys || function(obj) {
if (obj !== Object(obj)) throw new TypeError("Invalid object");
var keys = [];
for (var key in obj) _.has(obj, key) && (keys[keys.length] = key);
return keys;
}, _.values = function(obj) {
return _.map(obj, _.identity);
}, _.functions = _.methods = function(obj) {
var names = [];
for (var key in obj) _.isFunction(obj[key]) && names.push(key);
return names.sort();
}, _.extend = function(obj) {
return each(slice.call(arguments, 1), function(source) {
for (var prop in source) obj[prop] = source[prop];
}), obj;
}, _.pick = function(obj) {
var result = {};
return each(_.flatten(slice.call(arguments, 1)), function(key) {
key in obj && (result[key] = obj[key]);
}), result;
}, _.defaults = function(obj) {
return each(slice.call(arguments, 1), function(source) {
for (var prop in source) null == obj[prop] && (obj[prop] = source[prop]);
}), obj;
}, _.clone = function(obj) {
return _.isObject(obj) ? _.isArray(obj) ? obj.slice() :_.extend({}, obj) :obj;
}, _.tap = function(obj, interceptor) {
return interceptor(obj), obj;
}, _.isEqual = function(a, b) {
return eq(a, b, []);
}, _.isEmpty = function(obj) {
if (null == obj) return !0;
if (_.isArray(obj) || _.isString(obj)) return 0 === obj.length;
for (var key in obj) if (_.has(obj, key)) return !1;
return !0;
}, _.isElement = function(obj) {
return !(!obj || 1 != obj.nodeType);
}, _.isArray = nativeIsArray || function(obj) {
return "[object Array]" == toString.call(obj);
}, _.isObject = function(obj) {
return obj === Object(obj);
}, _.isArguments = function(obj) {
return "[object Arguments]" == toString.call(obj);
}, _.isArguments(arguments) || (_.isArguments = function(obj) {
return !(!obj || !_.has(obj, "callee"));
}), _.isFunction = function(obj) {
return "[object Function]" == toString.call(obj);
}, _.isString = function(obj) {
return "[object String]" == toString.call(obj);
}, _.isNumber = function(obj) {
return "[object Number]" == toString.call(obj);
}, _.isFinite = function(obj) {
return _.isNumber(obj) && isFinite(obj);
}, _.isNaN = function(obj) {
return obj !== obj;
}, _.isBoolean = function(obj) {
return obj === !0 || obj === !1 || "[object Boolean]" == toString.call(obj);
}, _.isDate = function(obj) {
return "[object Date]" == toString.call(obj);
}, _.isRegExp = function(obj) {
return "[object RegExp]" == toString.call(obj);
}, _.isNull = function(obj) {
return null === obj;
}, _.isUndefined = function(obj) {
return void 0 === obj;
}, _.has = function(obj, key) {
return hasOwnProperty.call(obj, key);
}, _.noConflict = function() {
return root._ = previousUnderscore, this;
}, _.identity = function(value) {
return value;
}, _.times = function(n, iterator, context) {
for (var i = 0; n > i; i++) iterator.call(context, i);
}, _.escape = function(string) {
return ("" + string).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}, _.result = function(object, property) {
if (null == object) return null;
var value = object[property];
return _.isFunction(value) ? value.call(object) :value;
}, _.mixin = function(obj) {
each(_.functions(obj), function(name) {
addToWrapper(name, _[name] = obj[name]);
});
};
var idCounter = 0;
_.uniqueId = function(prefix) {
var id = idCounter++;
return prefix ? prefix + id :id;
}, _.templateSettings = {
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};
var noMatch = /.^/, escapes = {
"\\":"\\",
"'":"'",
r:"\r",
n:"\n",
t:"	",
u2028:"\u2028",
u2029:"\u2029"
};
for (var p in escapes) escapes[escapes[p]] = p;
var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g, unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g, unescape = function(code) {
return code.replace(unescaper, function(match, escape) {
return escapes[escape];
});
};
_.template = function(text, data, settings) {
settings = _.defaults(settings || {}, _.templateSettings);
var source = "__p+='" + text.replace(escaper, function(match) {
return "\\" + escapes[match];
}).replace(settings.escape || noMatch, function(match, code) {
return "'+\n_.escape(" + unescape(code) + ")+\n'";
}).replace(settings.interpolate || noMatch, function(match, code) {
return "'+\n(" + unescape(code) + ")+\n'";
}).replace(settings.evaluate || noMatch, function(match, code) {
return "';\n" + unescape(code) + "\n;__p+='";
}) + "';\n";
settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), source = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + source + "return __p;\n";
var render = new Function(settings.variable || "obj", "_", source);
if (data) return render(data, _);
var template = function(data) {
return render.call(this, data, _);
};
return template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}", 
template;
}, _.chain = function(obj) {
return _(obj).chain();
};
var wrapper = function(obj) {
this._wrapped = obj;
};
_.prototype = wrapper.prototype;
var result = function(obj, chain) {
return chain ? _(obj).chain() :obj;
}, addToWrapper = function(name, func) {
wrapper.prototype[name] = function() {
var args = slice.call(arguments);
return unshift.call(args, this._wrapped), result(func.apply(_, args), this._chain);
};
};
_.mixin(_), each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(name) {
var method = ArrayProto[name];
wrapper.prototype[name] = function() {
var wrapped = this._wrapped;
method.apply(wrapped, arguments);
var length = wrapped.length;
return "shift" != name && "splice" != name || 0 !== length || delete wrapped[0], 
result(wrapped, this._chain);
};
}), each([ "concat", "join", "slice" ], function(name) {
var method = ArrayProto[name];
wrapper.prototype[name] = function() {
return result(method.apply(this._wrapped, arguments), this._chain);
};
}), wrapper.prototype.chain = function() {
return this._chain = !0, this;
}, wrapper.prototype.value = function() {
return this._wrapped;
};
}.call(this), function() {
var Backbone, root = this, previousBackbone = root.Backbone, array = [], push = array.push, slice = array.slice, splice = array.splice;
Backbone = "undefined" != typeof exports ? exports :root.Backbone = {}, Backbone.VERSION = "1.0.0";
var _ = root._;
_ || "undefined" == typeof require || (_ = require("underscore")), Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$, 
Backbone.noConflict = function() {
return root.Backbone = previousBackbone, this;
}, Backbone.emulateHTTP = !1, Backbone.emulateJSON = !1;
var Events = Backbone.Events = {
on:function(name, callback, context) {
if (!eventsApi(this, "on", name, [ callback, context ]) || !callback) return this;
this._events || (this._events = {});
var events = this._events[name] || (this._events[name] = []);
return events.push({
callback:callback,
context:context,
ctx:context || this
}), this;
},
once:function(name, callback, context) {
if (!eventsApi(this, "once", name, [ callback, context ]) || !callback) return this;
var self = this, once = _.once(function() {
self.off(name, once), callback.apply(this, arguments);
});
return once._callback = callback, this.on(name, once, context);
},
off:function(name, callback, context) {
var retain, ev, events, names, i, l, j, k;
if (!this._events || !eventsApi(this, "off", name, [ callback, context ])) return this;
if (!name && !callback && !context) return this._events = {}, this;
for (names = name ? [ name ] :_.keys(this._events), i = 0, l = names.length; l > i; i++) if (name = names[i], 
events = this._events[name]) {
if (this._events[name] = retain = [], callback || context) for (j = 0, k = events.length; k > j; j++) ev = events[j], 
(callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) && retain.push(ev);
retain.length || delete this._events[name];
}
return this;
},
trigger:function(name) {
if (!this._events) return this;
var args = slice.call(arguments, 1);
if (!eventsApi(this, "trigger", name, args)) return this;
var events = this._events[name], allEvents = this._events.all;
return events && triggerEvents(events, args), allEvents && triggerEvents(allEvents, arguments), 
this;
},
stopListening:function(obj, name, callback) {
var listeners = this._listeners;
if (!listeners) return this;
var deleteListener = !name && !callback;
"object" == typeof name && (callback = this), obj && ((listeners = {})[obj._listenerId] = obj);
for (var id in listeners) listeners[id].off(name, callback, this), deleteListener && delete this._listeners[id];
return this;
}
}, eventSplitter = /\s+/, eventsApi = function(obj, action, name, rest) {
if (!name) return !0;
if ("object" == typeof name) {
for (var key in name) obj[action].apply(obj, [ key, name[key] ].concat(rest));
return !1;
}
if (eventSplitter.test(name)) {
for (var names = name.split(eventSplitter), i = 0, l = names.length; l > i; i++) obj[action].apply(obj, [ names[i] ].concat(rest));
return !1;
}
return !0;
}, triggerEvents = function(events, args) {
var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
switch (args.length) {
case 0:
for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx);
return;

case 1:
for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx, a1);
return;

case 2:
for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx, a1, a2);
return;

case 3:
for (;++i < l; ) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
return;

default:
for (;++i < l; ) (ev = events[i]).callback.apply(ev.ctx, args);
}
}, listenMethods = {
listenTo:"on",
listenToOnce:"once"
};
_.each(listenMethods, function(implementation, method) {
Events[method] = function(obj, name, callback) {
var listeners = this._listeners || (this._listeners = {}), id = obj._listenerId || (obj._listenerId = _.uniqueId("l"));
return listeners[id] = obj, "object" == typeof name && (callback = this), obj[implementation](name, callback, this), 
this;
};
}), Events.bind = Events.on, Events.unbind = Events.off, _.extend(Backbone, Events);
var Model = Backbone.Model = function(attributes, options) {
var defaults, attrs = attributes || {};
options || (options = {}), this.cid = _.uniqueId("c"), this.attributes = {}, _.extend(this, _.pick(options, modelOptions)), 
options.parse && (attrs = this.parse(attrs, options) || {}), (defaults = _.result(this, "defaults")) && (attrs = _.defaults({}, attrs, defaults)), 
this.set(attrs, options), this.changed = {}, this.initialize.apply(this, arguments);
}, modelOptions = [ "url", "urlRoot", "collection" ];
_.extend(Model.prototype, Events, {
changed:null,
validationError:null,
idAttribute:"id",
initialize:function() {},
toJSON:function() {
return _.clone(this.attributes);
},
sync:function() {
return Backbone.sync.apply(this, arguments);
},
get:function(attr) {
return this.attributes[attr];
},
escape:function(attr) {
return _.escape(this.get(attr));
},
has:function(attr) {
return null != this.get(attr);
},
set:function(key, val, options) {
var attr, attrs, unset, changes, silent, changing, prev, current;
if (null == key) return this;
if ("object" == typeof key ? (attrs = key, options = val) :(attrs = {})[key] = val, 
options || (options = {}), !this._validate(attrs, options)) return !1;
unset = options.unset, silent = options.silent, changes = [], changing = this._changing, 
this._changing = !0, changing || (this._previousAttributes = _.clone(this.attributes), 
this.changed = {}), current = this.attributes, prev = this._previousAttributes, 
this.idAttribute in attrs && (this.id = attrs[this.idAttribute]);
for (attr in attrs) val = attrs[attr], _.isEqual(current[attr], val) || changes.push(attr), 
_.isEqual(prev[attr], val) ? delete this.changed[attr] :this.changed[attr] = val, 
unset ? delete current[attr] :current[attr] = val;
if (!silent) {
changes.length && (this._pending = !0);
for (var i = 0, l = changes.length; l > i; i++) this.trigger("change:" + changes[i], this, current[changes[i]], options);
}
if (changing) return this;
if (!silent) for (;this._pending; ) this._pending = !1, this.trigger("change", this, options);
return this._pending = !1, this._changing = !1, this;
},
unset:function(attr, options) {
return this.set(attr, void 0, _.extend({}, options, {
unset:!0
}));
},
clear:function(options) {
var attrs = {};
for (var key in this.attributes) attrs[key] = void 0;
return this.set(attrs, _.extend({}, options, {
unset:!0
}));
},
hasChanged:function(attr) {
return null == attr ? !_.isEmpty(this.changed) :_.has(this.changed, attr);
},
changedAttributes:function(diff) {
if (!diff) return this.hasChanged() ? _.clone(this.changed) :!1;
var val, changed = !1, old = this._changing ? this._previousAttributes :this.attributes;
for (var attr in diff) _.isEqual(old[attr], val = diff[attr]) || ((changed || (changed = {}))[attr] = val);
return changed;
},
previous:function(attr) {
return null != attr && this._previousAttributes ? this._previousAttributes[attr] :null;
},
previousAttributes:function() {
return _.clone(this._previousAttributes);
},
fetch:function(options) {
options = options ? _.clone(options) :{}, void 0 === options.parse && (options.parse = !0);
var model = this, success = options.success;
return options.success = function(resp) {
return model.set(model.parse(resp, options), options) ? (success && success(model, resp, options), 
model.trigger("sync", model, resp, options), void 0) :!1;
}, wrapError(this, options), this.sync("read", this, options);
},
save:function(key, val, options) {
var attrs, method, xhr, attributes = this.attributes;
if (null == key || "object" == typeof key ? (attrs = key, options = val) :(attrs = {})[key] = val, 
!(!attrs || options && options.wait || this.set(attrs, options))) return !1;
if (options = _.extend({
validate:!0
}, options), !this._validate(attrs, options)) return !1;
attrs && options.wait && (this.attributes = _.extend({}, attributes, attrs)), void 0 === options.parse && (options.parse = !0);
var model = this, success = options.success;
return options.success = function(resp) {
model.attributes = attributes;
var serverAttrs = model.parse(resp, options);
return options.wait && (serverAttrs = _.extend(attrs || {}, serverAttrs)), _.isObject(serverAttrs) && !model.set(serverAttrs, options) ? !1 :(success && success(model, resp, options), 
model.trigger("sync", model, resp, options), void 0);
}, wrapError(this, options), method = this.isNew() ? "create" :options.patch ? "patch" :"update", 
"patch" === method && (options.attrs = attrs), xhr = this.sync(method, this, options), 
attrs && options.wait && (this.attributes = attributes), xhr;
},
destroy:function(options) {
options = options ? _.clone(options) :{};
var model = this, success = options.success, destroy = function() {
model.trigger("destroy", model, model.collection, options);
};
if (options.success = function(resp) {
(options.wait || model.isNew()) && destroy(), success && success(model, resp, options), 
model.isNew() || model.trigger("sync", model, resp, options);
}, this.isNew()) return options.success(), !1;
wrapError(this, options);
var xhr = this.sync("delete", this, options);
return options.wait || destroy(), xhr;
},
url:function() {
var base = _.result(this, "urlRoot") || _.result(this.collection, "url") || urlError();
return this.isNew() ? base :base + ("/" === base.charAt(base.length - 1) ? "" :"/") + encodeURIComponent(this.id);
},
parse:function(resp) {
return resp;
},
clone:function() {
return new this.constructor(this.attributes);
},
isNew:function() {
return null == this.id;
},
isValid:function(options) {
return this._validate({}, _.extend(options || {}, {
validate:!0
}));
},
_validate:function(attrs, options) {
if (!options.validate || !this.validate) return !0;
attrs = _.extend({}, this.attributes, attrs);
var error = this.validationError = this.validate(attrs, options) || null;
return error ? (this.trigger("invalid", this, error, _.extend(options || {}, {
validationError:error
})), !1) :!0;
}
});
var modelMethods = [ "keys", "values", "pairs", "invert", "pick", "omit" ];
_.each(modelMethods, function(method) {
Model.prototype[method] = function() {
var args = slice.call(arguments);
return args.unshift(this.attributes), _[method].apply(_, args);
};
});
var Collection = Backbone.Collection = function(models, options) {
options || (options = {}), options.url && (this.url = options.url), options.model && (this.model = options.model), 
void 0 !== options.comparator && (this.comparator = options.comparator), this._reset(), 
this.initialize.apply(this, arguments), models && this.reset(models, _.extend({
silent:!0
}, options));
}, setOptions = {
add:!0,
remove:!0,
merge:!0
}, addOptions = {
add:!0,
merge:!1,
remove:!1
};
_.extend(Collection.prototype, Events, {
model:Model,
initialize:function() {},
toJSON:function(options) {
return this.map(function(model) {
return model.toJSON(options);
});
},
sync:function() {
return Backbone.sync.apply(this, arguments);
},
add:function(models, options) {
return this.set(models, _.defaults(options || {}, addOptions));
},
remove:function(models, options) {
models = _.isArray(models) ? models.slice() :[ models ], options || (options = {});
var i, l, index, model;
for (i = 0, l = models.length; l > i; i++) model = this.get(models[i]), model && (delete this._byId[model.id], 
delete this._byId[model.cid], index = this.indexOf(model), this.models.splice(index, 1), 
this.length--, options.silent || (options.index = index, model.trigger("remove", model, this, options)), 
this._removeReference(model));
return this;
},
set:function(models, options) {
options = _.defaults(options || {}, setOptions), options.parse && (models = this.parse(models, options)), 
_.isArray(models) || (models = models ? [ models ] :[]);
var i, l, model, existing, sort, at = options.at, sortable = this.comparator && null == at && options.sort !== !1, sortAttr = _.isString(this.comparator) ? this.comparator :null, toAdd = [], toRemove = [], modelMap = {};
for (i = 0, l = models.length; l > i; i++) (model = this._prepareModel(models[i], options)) && ((existing = this.get(model)) ? (options.remove && (modelMap[existing.cid] = !0), 
options.merge && (existing.set(model.attributes, options), sortable && !sort && existing.hasChanged(sortAttr) && (sort = !0))) :options.add && (toAdd.push(model), 
model.on("all", this._onModelEvent, this), this._byId[model.cid] = model, null != model.id && (this._byId[model.id] = model)));
if (options.remove) {
for (i = 0, l = this.length; l > i; ++i) modelMap[(model = this.models[i]).cid] || toRemove.push(model);
toRemove.length && this.remove(toRemove, options);
}
if (toAdd.length && (sortable && (sort = !0), this.length += toAdd.length, null != at ? splice.apply(this.models, [ at, 0 ].concat(toAdd)) :push.apply(this.models, toAdd)), 
sort && this.sort({
silent:!0
}), options.silent) return this;
for (i = 0, l = toAdd.length; l > i; i++) (model = toAdd[i]).trigger("add", model, this, options);
return sort && this.trigger("sort", this, options), this;
},
reset:function(models, options) {
options || (options = {});
for (var i = 0, l = this.models.length; l > i; i++) this._removeReference(this.models[i]);
return options.previousModels = this.models, this._reset(), this.add(models, _.extend({
silent:!0
}, options)), options.silent || this.trigger("reset", this, options), this;
},
push:function(model, options) {
return model = this._prepareModel(model, options), this.add(model, _.extend({
at:this.length
}, options)), model;
},
pop:function(options) {
var model = this.at(this.length - 1);
return this.remove(model, options), model;
},
unshift:function(model, options) {
return model = this._prepareModel(model, options), this.add(model, _.extend({
at:0
}, options)), model;
},
shift:function(options) {
var model = this.at(0);
return this.remove(model, options), model;
},
slice:function(begin, end) {
return this.models.slice(begin, end);
},
get:function(obj) {
return null == obj ? void 0 :this._byId[null != obj.id ? obj.id :obj.cid || obj];
},
at:function(index) {
return this.models[index];
},
where:function(attrs, first) {
return _.isEmpty(attrs) ? first ? void 0 :[] :this[first ? "find" :"filter"](function(model) {
for (var key in attrs) if (attrs[key] !== model.get(key)) return !1;
return !0;
});
},
findWhere:function(attrs) {
return this.where(attrs, !0);
},
sort:function(options) {
if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
return options || (options = {}), _.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) :this.models.sort(_.bind(this.comparator, this)), 
options.silent || this.trigger("sort", this, options), this;
},
sortedIndex:function(model, value, context) {
value || (value = this.comparator);
var iterator = _.isFunction(value) ? value :function(model) {
return model.get(value);
};
return _.sortedIndex(this.models, model, iterator, context);
},
pluck:function(attr) {
return _.invoke(this.models, "get", attr);
},
fetch:function(options) {
options = options ? _.clone(options) :{}, void 0 === options.parse && (options.parse = !0);
var success = options.success, collection = this;
return options.success = function(resp) {
var method = options.reset ? "reset" :"set";
collection[method](resp, options), success && success(collection, resp, options), 
collection.trigger("sync", collection, resp, options);
}, wrapError(this, options), this.sync("read", this, options);
},
create:function(model, options) {
if (options = options ? _.clone(options) :{}, !(model = this._prepareModel(model, options))) return !1;
options.wait || this.add(model, options);
var collection = this, success = options.success;
return options.success = function(resp) {
options.wait && collection.add(model, options), success && success(model, resp, options);
}, model.save(null, options), model;
},
parse:function(resp) {
return resp;
},
clone:function() {
return new this.constructor(this.models);
},
_reset:function() {
this.length = 0, this.models = [], this._byId = {};
},
_prepareModel:function(attrs, options) {
if (attrs instanceof Model) return attrs.collection || (attrs.collection = this), 
attrs;
options || (options = {}), options.collection = this;
var model = new this.model(attrs, options);
return model._validate(attrs, options) ? model :(this.trigger("invalid", this, attrs, options), 
!1);
},
_removeReference:function(model) {
this === model.collection && delete model.collection, model.off("all", this._onModelEvent, this);
},
_onModelEvent:function(event, model, collection, options) {
("add" !== event && "remove" !== event || collection === this) && ("destroy" === event && this.remove(model, options), 
model && event === "change:" + model.idAttribute && (delete this._byId[model.previous(model.idAttribute)], 
null != model.id && (this._byId[model.id] = model)), this.trigger.apply(this, arguments));
}
});
var methods = [ "forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain" ];
_.each(methods, function(method) {
Collection.prototype[method] = function() {
var args = slice.call(arguments);
return args.unshift(this.models), _[method].apply(_, args);
};
});
var attributeMethods = [ "groupBy", "countBy", "sortBy" ];
_.each(attributeMethods, function(method) {
Collection.prototype[method] = function(value, context) {
var iterator = _.isFunction(value) ? value :function(model) {
return model.get(value);
};
return _[method](this.models, iterator, context);
};
});
var View = Backbone.View = function(options) {
this.cid = _.uniqueId("view"), this._configure(options || {}), this._ensureElement(), 
this.initialize.apply(this, arguments), this.delegateEvents();
}, delegateEventSplitter = /^(\S+)\s*(.*)$/, viewOptions = [ "model", "collection", "el", "id", "attributes", "className", "tagName", "events" ];
_.extend(View.prototype, Events, {
tagName:"div",
$:function(selector) {
return this.$el.find(selector);
},
initialize:function() {},
render:function() {
return this;
},
remove:function() {
return this.$el.remove(), this.stopListening(), this;
},
setElement:function(element, delegate) {
return this.$el && this.undelegateEvents(), this.$el = element instanceof Backbone.$ ? element :Backbone.$(element), 
this.el = this.$el[0], delegate !== !1 && this.delegateEvents(), this;
},
delegateEvents:function(events) {
if (!events && !(events = _.result(this, "events"))) return this;
this.undelegateEvents();
for (var key in events) {
var method = events[key];
if (_.isFunction(method) || (method = this[events[key]]), method) {
var match = key.match(delegateEventSplitter), eventName = match[1], selector = match[2];
method = _.bind(method, this), eventName += ".delegateEvents" + this.cid, "" === selector ? this.$el.on(eventName, method) :this.$el.on(eventName, selector, method);
}
}
return this;
},
undelegateEvents:function() {
return this.$el.off(".delegateEvents" + this.cid), this;
},
_configure:function(options) {
this.options && (options = _.extend({}, _.result(this, "options"), options)), _.extend(this, _.pick(options, viewOptions)), 
this.options = options;
},
_ensureElement:function() {
if (this.el) this.setElement(_.result(this, "el"), !1); else {
var attrs = _.extend({}, _.result(this, "attributes"));
this.id && (attrs.id = _.result(this, "id")), this.className && (attrs["class"] = _.result(this, "className"));
var $el = Backbone.$("<" + _.result(this, "tagName") + ">").attr(attrs);
this.setElement($el, !1);
}
}
}), Backbone.sync = function(method, model, options) {
var type = methodMap[method];
_.defaults(options || (options = {}), {
emulateHTTP:Backbone.emulateHTTP,
emulateJSON:Backbone.emulateJSON
});
var params = {
type:type,
dataType:"json"
};
if (options.url || (params.url = _.result(model, "url") || urlError()), null != options.data || !model || "create" !== method && "update" !== method && "patch" !== method || (params.contentType = "application/json", 
params.data = JSON.stringify(options.attrs || model.toJSON(options))), options.emulateJSON && (params.contentType = "application/x-www-form-urlencoded", 
params.data = params.data ? {
model:params.data
} :{}), options.emulateHTTP && ("PUT" === type || "DELETE" === type || "PATCH" === type)) {
params.type = "POST", options.emulateJSON && (params.data._method = type);
var beforeSend = options.beforeSend;
options.beforeSend = function(xhr) {
return xhr.setRequestHeader("X-HTTP-Method-Override", type), beforeSend ? beforeSend.apply(this, arguments) :void 0;
};
}
"GET" === params.type || options.emulateJSON || (params.processData = !1), "PATCH" !== params.type || !window.ActiveXObject || window.external && window.external.msActiveXFilteringEnabled || (params.xhr = function() {
return new ActiveXObject("Microsoft.XMLHTTP");
});
var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
return model.trigger("request", model, xhr, options), xhr;
};
var methodMap = {
create:"POST",
update:"PUT",
patch:"PATCH",
"delete":"DELETE",
read:"GET"
};
Backbone.ajax = function() {
return Backbone.$.ajax.apply(Backbone.$, arguments);
};
var Router = Backbone.Router = function(options) {
options || (options = {}), options.routes && (this.routes = options.routes), this._bindRoutes(), 
this.initialize.apply(this, arguments);
}, optionalParam = /\((.*?)\)/g, namedParam = /(\(\?)?:\w+/g, splatParam = /\*\w+/g, escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
_.extend(Router.prototype, Events, {
initialize:function() {},
route:function(route, name, callback) {
_.isRegExp(route) || (route = this._routeToRegExp(route)), _.isFunction(name) && (callback = name, 
name = ""), callback || (callback = this[name]);
var router = this;
return Backbone.history.route(route, function(fragment) {
var args = router._extractParameters(route, fragment);
callback && callback.apply(router, args), router.trigger.apply(router, [ "route:" + name ].concat(args)), 
router.trigger("route", name, args), Backbone.history.trigger("route", router, name, args);
}), this;
},
navigate:function(fragment, options) {
return Backbone.history.navigate(fragment, options), this;
},
_bindRoutes:function() {
if (this.routes) {
this.routes = _.result(this, "routes");
for (var route, routes = _.keys(this.routes); null != (route = routes.pop()); ) this.route(route, this.routes[route]);
}
},
_routeToRegExp:function(route) {
return route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
return optional ? match :"([^/]+)";
}).replace(splatParam, "(.*?)"), new RegExp("^" + route + "$");
},
_extractParameters:function(route, fragment) {
var params = route.exec(fragment).slice(1);
return _.map(params, function(param) {
return param ? decodeURIComponent(param) :null;
});
}
});
var History = Backbone.History = function() {
this.handlers = [], _.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, 
this.history = window.history);
}, routeStripper = /^[#\/]|\s+$/g, rootStripper = /^\/+|\/+$/g, isExplorer = /msie [\w.]+/, trailingSlash = /\/$/;
History.started = !1, _.extend(History.prototype, Events, {
interval:50,
getHash:function(window) {
var match = (window || this).location.href.match(/#(.*)$/);
return match ? match[1] :"";
},
getFragment:function(fragment, forcePushState) {
if (null == fragment) if (this._hasPushState || !this._wantsHashChange || forcePushState) {
fragment = this.location.pathname;
var root = this.root.replace(trailingSlash, "");
fragment.indexOf(root) || (fragment = fragment.substr(root.length));
} else fragment = this.getHash();
return fragment.replace(routeStripper, "");
},
start:function(options) {
if (History.started) throw new Error("Backbone.history has already been started");
History.started = !0, this.options = _.extend({}, {
root:"/"
}, this.options, options), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, 
this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
var fragment = this.getFragment(), docMode = document.documentMode, oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || 7 >= docMode);
this.root = ("/" + this.root + "/").replace(rootStripper, "/"), oldIE && this._wantsHashChange && (this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, 
this.navigate(fragment)), this._hasPushState ? Backbone.$(window).on("popstate", this.checkUrl) :this._wantsHashChange && "onhashchange" in window && !oldIE ? Backbone.$(window).on("hashchange", this.checkUrl) :this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), 
this.fragment = fragment;
var loc = this.location, atRoot = loc.pathname.replace(/[^\/]$/, "$&/") === this.root;
return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot ? (this.fragment = this.getFragment(null, !0), 
this.location.replace(this.root + this.location.search + "#" + this.fragment), !0) :(this._wantsPushState && this._hasPushState && atRoot && loc.hash && (this.fragment = this.getHash().replace(routeStripper, ""), 
this.history.replaceState({}, document.title, this.root + this.fragment + loc.search)), 
this.options.silent ? void 0 :this.loadUrl());
},
stop:function() {
Backbone.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), 
clearInterval(this._checkUrlInterval), History.started = !1;
},
route:function(route, callback) {
this.handlers.unshift({
route:route,
callback:callback
});
},
checkUrl:function() {
var current = this.getFragment();
return current === this.fragment && this.iframe && (current = this.getFragment(this.getHash(this.iframe))), 
current === this.fragment ? !1 :(this.iframe && this.navigate(current), this.loadUrl() || this.loadUrl(this.getHash()), 
void 0);
},
loadUrl:function(fragmentOverride) {
var fragment = this.fragment = this.getFragment(fragmentOverride), matched = _.any(this.handlers, function(handler) {
return handler.route.test(fragment) ? (handler.callback(fragment), !0) :void 0;
});
return matched;
},
navigate:function(fragment, options) {
if (!History.started) return !1;
if (options && options !== !0 || (options = {
trigger:options
}), fragment = this.getFragment(fragment || ""), this.fragment !== fragment) {
this.fragment = fragment;
var url = this.root + fragment;
if (this._hasPushState) this.history[options.replace ? "replaceState" :"pushState"]({}, document.title, url); else {
if (!this._wantsHashChange) return this.location.assign(url);
this._updateHash(this.location, fragment, options.replace), this.iframe && fragment !== this.getFragment(this.getHash(this.iframe)) && (options.replace || this.iframe.document.open().close(), 
this._updateHash(this.iframe.location, fragment, options.replace));
}
options.trigger && this.loadUrl(fragment);
}
},
_updateHash:function(location, fragment, replace) {
if (replace) {
var href = location.href.replace(/(javascript:|#).*$/, "");
location.replace(href + "#" + fragment);
} else location.hash = "#" + fragment;
}
}), Backbone.history = new History();
var extend = function(protoProps, staticProps) {
var child, parent = this;
child = protoProps && _.has(protoProps, "constructor") ? protoProps.constructor :function() {
return parent.apply(this, arguments);
}, _.extend(child, parent, staticProps);
var Surrogate = function() {
this.constructor = child;
};
return Surrogate.prototype = parent.prototype, child.prototype = new Surrogate(), 
protoProps && _.extend(child.prototype, protoProps), child.__super__ = parent.prototype, 
child;
};
Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
var urlError = function() {
throw new Error('A "url" property or function must be specified');
}, wrapError = function(model, options) {
var error = options.error;
options.error = function(resp) {
error && error(model, resp, options), model.trigger("error", model, resp, options);
};
};
}.call(this), /*
Copyright 2012 Igor Vaynberg

Version: @@ver@@ Timestamp: @@timestamp@@

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
function defaultEscapeMarkup(markup) {
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
handler && handler.abort(), options.params && ($.isFunction(options.params) ? $.extend(params, options.params.call(self)) :$.extend(params, options.params)), 
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
function checkFormatter(formatter, formatterName) {
if ($.isFunction(formatter)) return !0;
if (!formatter) return !1;
throw new Error(formatterName + " must be a function or a falsy value");
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
var KEY, AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer, $document, scrollBarDimensions, lastMousePosition = {
x:0,
y:0
}, KEY = {
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
lastMousePosition.x = e.pageX, lastMousePosition.y = e.pageY;
}), AbstractSelect2 = clazz(Object, {
bind:function(func) {
var self = this;
return function() {
func.apply(self, arguments);
};
},
init:function(opts) {
var results, search, disabled, readonly, resultsSelector = ".select2-results";
this.opts = opts = this.prepareOpts(opts), this.id = opts.id, opts.element.data("select2") !== undefined && null !== opts.element.data("select2") && opts.element.data("select2").destroy(), 
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
var element = this.opts.element, select2 = element.data("select2");
this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), 
select2 !== undefined && (select2.container.remove(), select2.dropdown.remove(), 
element.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus", this.autofocus || !1), 
this.elementTabIndex ? element.attr({
tabindex:this.elementTabIndex
}) :element.removeAttr("tabindex"), element.show());
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
var children, placeholderOption, process, data = {
results:[],
more:!1
}, term = query.term;
process = function(element, collection) {
var group;
element.is("option") ? query.matcher(term, element.text(), element) && collection.push(self.optionToData(element)) :element.is("optgroup") && (group = self.optionToData(element), 
element.children().each2(function(i, elm) {
process(elm, group.children);
}), group.children.length > 0 && collection.push(group));
}, children = element.children(), this.getPlaceholder() !== undefined && children.length > 0 && (placeholderOption = this.getPlaceholderOption(), 
placeholderOption && (children = children.not(placeholderOption))), children.each2(function(i, elm) {
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
var mask, maskCss, cid = this.containerId, scroll = "scroll." + cid, resize = "resize." + cid, orient = "orientationchange." + cid;
this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), 
this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()), 
mask = $("#select2-drop-mask"), 0 == mask.length && (mask = $(document.createElement("div")), 
mask.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), mask.hide(), 
mask.appendTo(this.body()), mask.on("mousedown touchstart click", function(e) {
var self, dropdown = $("#select2-drop");
dropdown.length > 0 && (self = dropdown.data("select2"), self.opts.selectOnBlur && self.selectHighlighted({
noFocus:!0
}), self.close(), e.preventDefault(), e.stopPropagation());
})), this.dropdown.prev()[0] !== mask[0] && this.dropdown.before(mask), $("#select2-drop").removeAttr("id"), 
this.dropdown.attr("id", "select2-drop"), maskCss = _makeMaskCss(), mask.css(maskCss).show(), 
this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active");
var that = this;
this.container.parents().add(window).each(function() {
$(this).on(resize + " " + scroll + " " + orient, function() {
var maskCss = _makeMaskCss();
$("#select2-drop-mask").css(maskCss), that.positionDropdown();
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
externalSearch:function(term) {
this.open(), this.search.val(term), this.updateResults(!1);
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
search.removeClass("select2-active"), self.positionDropdown();
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
initial && this.showSearch && this.showSearch(!0), void 0;
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
items:data
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
data ? (this.highlight(index), this.onSelect(data, options)) :options.noFocus && this.close();
},
getPlaceholder:function() {
var placeholderOption;
return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((placeholderOption = this.getPlaceholderOption()) !== undefined ? placeholderOption.text() :undefined);
},
getPlaceholderOption:function() {
if (this.select) {
var firstOption = this.select.children().first();
if (this.opts.placeholderOption !== undefined) return "first" === this.opts.placeholderOption && firstOption || "function" == typeof this.opts.placeholderOption && this.opts.placeholderOption(this.select);
if ("" === firstOption.text() && "" === firstOption.val()) return firstOption;
}
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
return "resolve" === this.opts.width ? (style = this.opts.element.css("width"), 
style.indexOf("%") > 0 ? style :0 === this.opts.element.outerWidth(!1) ? "auto" :this.opts.element.outerWidth(!1) + "px") :null;
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
}).html([ "<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>", "   <span>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>", "   <div><b></b></div>", "</a>", "<input class='select2-focusser select2-offscreen' type='text'/>", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>" ].join(""));
return container;
},
enableInterface:function() {
this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled());
},
opening:function() {
var el, range, len;
this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0), this.parent.opening.apply(this, arguments), 
this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.search.focus(), 
el = this.search.get(0), el.createTextRange ? (range = el.createTextRange(), range.collapse(!1), 
range.select()) :el.setSelectionRange && (len = this.search.val().length, el.setSelectionRange(len, len)), 
this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), this.opts.element.trigger($.Event("select2-open"));
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
this.opts.minimumResultsForSearch < 0 ? this.showSearch(!1) :this.showSearch(!0), 
this.selection = selection = container.find(".select2-choice"), this.focusser = container.find(".select2-focusser"), 
this.focusser.attr("id", "s2id_autogen" + nextUid()), $("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.focusser.attr("id")), 
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
if (this.isInterfaceEnabled() && e.which !== KEY.TAB && !KEY.isControl(e) && !KEY.isFunctionKey(e) && e.which !== KEY.ESC) {
if (this.opts.openOnEnter === !1 && e.which === KEY.ENTER) return killEvent(e), 
void 0;
if (e.which == KEY.DOWN || e.which == KEY.UP || e.which == KEY.ENTER && this.opts.openOnEnter) {
if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;
return this.open(), killEvent(e), void 0;
}
return e.which == KEY.DELETE || e.which == KEY.BACKSPACE ? (this.opts.allowClear && this.clear(), 
killEvent(e), void 0) :void 0;
}
})), installKeyUpChangeEvent(this.focusser), this.focusser.on("keyup-change input", this.bind(function(e) {
if (this.opts.minimumResultsForSearch >= 0) {
if (e.stopPropagation(), this.opened()) return;
this.open();
}
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
if (data) {
var placeholderOption = this.getPlaceholderOption();
this.opts.element.val(placeholderOption ? placeholderOption.val() :""), this.selection.find("span").empty(), 
this.selection.removeData("select2-data"), this.setPlaceholder(), triggerChange !== !1 && (this.opts.element.trigger({
type:"select2-removed",
val:this.id(data),
choice:data
}), this.triggerChange({
removed:data
}));
}
},
initSelection:function() {
if (this.isPlaceholderOptionSelected()) this.updateSelection([]), this.close(), 
this.setPlaceholder(); else {
var self = this;
this.opts.initSelection.call(null, this.opts.element, function(selected) {
selected !== undefined && null !== selected && (self.updateSelection(selected), 
self.close(), self.setPlaceholder());
});
}
},
isPlaceholderOptionSelected:function() {
var placeholderOption;
return (placeholderOption = this.getPlaceholderOption()) !== undefined && placeholderOption.is(":selected") || "" === this.opts.element.val() || this.opts.element.val() === undefined || null === this.opts.element.val();
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
return this.select && this.getPlaceholderOption() === undefined ? undefined :this.parent.getPlaceholder.apply(this, arguments);
},
setPlaceholder:function() {
var placeholder = this.getPlaceholder();
if (this.isPlaceholderOptionSelected() && placeholder !== undefined) {
if (this.select && this.getPlaceholderOption() === undefined) return;
this.selection.find("span").html(this.opts.escapeMarkup(placeholder)), this.selection.addClass("select2-default"), 
this.container.removeClass("select2-allowclear");
}
},
postprocessResults:function(data, initial, noHighlightUpdate) {
var selected = 0, self = this;
if (this.findHighlightableChoices().each2(function(i, elm) {
return equal(self.id(elm.data("select2-data")), self.opts.element.val()) ? (selected = i, 
!1) :void 0;
}), noHighlightUpdate !== !1 && (initial === !0 && selected >= 0 ? this.highlight(selected) :this.highlight(0)), 
initial === !0) {
var min = this.opts.minimumResultsForSearch;
min >= 0 && this.showSearch(countResults(data.results) >= min);
}
},
showSearch:function(showSearchInput) {
this.showSearchInput !== showSearchInput && (this.showSearchInput = showSearchInput, 
this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !showSearchInput), 
this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !showSearchInput), 
$(this.dropdown, this.container).toggleClass("select2-with-searchbox", showSearchInput));
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
var formatted, cssClass, container = this.selection.find("span");
this.selection.data("select2-data", data), container.empty(), formatted = this.opts.formatSelection(data, container, this.opts.escapeMarkup), 
formatted !== undefined && container.append(formatted), cssClass = this.opts.formatSelectionCssClass(data, container), 
cssClass !== undefined && container.addClass(cssClass), this.selection.removeClass("select2-default"), 
this.opts.allowClear && this.getPlaceholder() !== undefined && this.container.addClass("select2-allowclear");
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
if (!val && 0 !== val) return this.clear(triggerChange), void 0;
if (this.opts.initSelection === undefined) throw new Error("cannot call val() if initSelection() is not defined");
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
}), this.close(), void 0;

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
})), this.container.on("click", selector, this.bind(function(e) {
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
var formatted, cssClass, enableChoice = !data.locked, enabledItem = $("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"), disabledItem = $("<li class='select2-search-choice select2-locked'><div></div></li>"), choice = enableChoice ? enabledItem :disabledItem, id = this.id(data), val = this.getVal();
formatted = this.opts.formatSelection(data, choice.find("div"), this.opts.escapeMarkup), 
formatted != undefined && choice.find("div").replaceWith("<div>" + formatted + "</div>"), 
cssClass = this.opts.formatSelectionCssClass(data, choice.find("div")), cssClass != undefined && choice.addClass(cssClass), 
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
}), -1 == this.highlight() && noHighlightUpdate !== !1 && self.highlight(0), !this.opts.createSearchChoice && !choices.filter(".select2-result:not(.select2-selected)").length > 0 && (!data || data && !data.more && 0 === this.results.find(".select2-no-results").length) && checkFormatter(self.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + self.opts.formatNoMatches(self.search.val()) + "</li>");
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
var ids = $.map(data, self.id);
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
var opts, select2, method, value, multiple, args = Array.prototype.slice.call(arguments, 0), allowedMethods = [ "val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "readonly", "positionDropdown", "data", "search" ], valueMethods = [ "val", "opened", "isFocused", "container", "data" ], methodsMap = {
search:"externalSearch"
};
return this.each(function() {
if (0 === args.length || "object" == typeof args[0]) opts = 0 === args.length ? {} :$.extend({}, args[0]), 
opts.element = $(this), "select" === opts.element.get(0).tagName.toLowerCase() ? multiple = opts.element.prop("multiple") :(multiple = opts.multiple || !1, 
"tags" in opts && (opts.multiple = multiple = !0)), select2 = multiple ? new MultiSelect2() :new SingleSelect2(), 
select2.init(opts); else {
if ("string" != typeof args[0]) throw "Invalid arguments to select2 plugin: " + args;
if (indexOf(args[0], allowedMethods) < 0) throw "Unknown method: " + args[0];
if (value = undefined, select2 = $(this).data("select2"), select2 === undefined) return;
if (method = args[0], "container" === method ? value = select2.container :"dropdown" === method ? value = select2.dropdown :(methodsMap[method] && (method = methodsMap[method]), 
value = select2[method].apply(select2, args.slice(1))), indexOf(args[0], valueMethods) >= 0) return !1;
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
formatSelection:function(data, container, escapeMarkup) {
return data ? escapeMarkup(data.text) :undefined;
},
sortResults:function(results) {
return results;
},
formatResultCssClass:function() {
return undefined;
},
formatSelectionCssClass:function() {
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
escapeMarkup:defaultEscapeMarkup,
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
markMatch:markMatch,
escapeMarkup:defaultEscapeMarkup
},
"class":{
"abstract":AbstractSelect2,
single:SingleSelect2,
multi:MultiSelect2
}
};
}
}(jQuery), function() {
var methodMap = {
create:"POST",
update:"PUT",
"delete":"DELETE",
read:"GET"
}, getUrl = function(object) {
return object && object.url ? _.isFunction(object.url) ? object.url() :object.url :null;
}, urlError = function() {
throw new Error("A 'url' property or function must be specified");
};
Backbone.sync = function(method, model, options) {
var type = methodMap[method], params = _.extend({
type:type,
dataType:"json",
beforeSend:function(xhr) {
var token = $('meta[name="csrf-token"]').attr("content");
token && xhr.setRequestHeader("X-CSRF-Token", token), model.trigger("sync:start");
}
}, options);
if (params.url || (params.url = getUrl(model) || urlError()), !params.data && model && ("create" == method || "update" == method)) {
params.contentType = "application/json";
var data = {};
model.paramRoot ? data[model.paramRoot] = model.toJSON() :data = model.toJSON(), 
params.data = JSON.stringify(data);
}
"GET" !== params.type && (params.processData = !1);
var complete = options.complete;
return params.complete = function(jqXHR, textStatus) {
model.trigger("sync:end"), complete && complete(jqXHR, textStatus);
}, $.ajax(params);
};
}.call(this), function($) {
return $.extend($.fn, {
backboneLink:function(model) {
return $(this).find(":input").each(function() {
var el, name;
return el = $(this), name = el.attr("name"), model.bind("change:" + name, function() {
return el.val(model.get(name));
}), $(this).bind("change", function() {
var attrs;
return el = $(this), attrs = {}, attrs[el.attr("name")] = el.val(), model.set(attrs);
});
});
}
});
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
}(window.jQuery), window.Modernizr = function(window, document, undefined) {
function setCss(str) {
mStyle.cssText = str;
}
function is(obj, type) {
return typeof obj === type;
}
var inputElem, featureName, hasOwnProp, version = "2.6.1", Modernizr = {}, docElement = document.documentElement, mod = "modernizr", modElem = document.createElement(mod), mStyle = modElem.style, tests = ({}.toString, 
{}), classes = [], slice = classes.slice, injectElementWithStyles = function(rule, callback, nodes, testnames) {
var style, ret, node, div = document.createElement("div"), body = document.body, fakeBody = body ? body :document.createElement("body");
if (parseInt(nodes, 10)) for (;nodes--; ) node = document.createElement("div"), 
node.id = testnames ? testnames[nodes] :mod + (nodes + 1), div.appendChild(node);
return style = [ "&#173;", '<style id="s', mod, '">', rule, "</style>" ].join(""), 
div.id = mod, (body ? div :fakeBody).innerHTML += style, fakeBody.appendChild(div), 
body || (fakeBody.style.background = "", docElement.appendChild(fakeBody)), ret = callback(div, rule), 
body ? div.parentNode.removeChild(div) :fakeBody.parentNode.removeChild(fakeBody), 
!!ret;
}, testMediaQuery = function(mq) {
var matchMedia = window.matchMedia || window.msMatchMedia;
if (matchMedia) return matchMedia(mq).matches;
var bool;
return injectElementWithStyles("@media " + mq + " { #" + mod + " { position: absolute; } }", function(node) {
bool = "absolute" == (window.getComputedStyle ? getComputedStyle(node, null) :node.currentStyle).position;
}), bool;
}, _hasOwnProperty = {}.hasOwnProperty;
hasOwnProp = is(_hasOwnProperty, "undefined") || is(_hasOwnProperty.call, "undefined") ? function(object, property) {
return property in object && is(object.constructor.prototype[property], "undefined");
} :function(object, property) {
return _hasOwnProperty.call(object, property);
}, Function.prototype.bind || (Function.prototype.bind = function(that) {
var target = this;
if ("function" != typeof target) throw new TypeError();
var args = slice.call(arguments, 1), bound = function() {
if (this instanceof bound) {
var F = function() {};
F.prototype = target.prototype;
var self = new F(), result = target.apply(self, args.concat(slice.call(arguments)));
return Object(result) === result ? result :self;
}
return target.apply(that, args.concat(slice.call(arguments)));
};
return bound;
});
for (var feature in tests) hasOwnProp(tests, feature) && (featureName = feature.toLowerCase(), 
Modernizr[featureName] = tests[feature](), classes.push((Modernizr[featureName] ? "" :"no-") + featureName));
return Modernizr.addTest = function(feature, test) {
if ("object" == typeof feature) for (var key in feature) hasOwnProp(feature, key) && Modernizr.addTest(key, feature[key]); else {
if (feature = feature.toLowerCase(), Modernizr[feature] !== undefined) return Modernizr;
test = "function" == typeof test ? test() :test, enableClasses && (docElement.className += " " + (test ? "" :"no-") + feature), 
Modernizr[feature] = test;
}
return Modernizr;
}, setCss(""), modElem = inputElem = null, Modernizr._version = version, Modernizr.mq = testMediaQuery, 
Modernizr.testStyles = injectElementWithStyles, Modernizr;
}(this, this.document), function(undefined) {
function padToken(func, count) {
return function(a) {
return leftZeroFill(func.call(this, a), count);
};
}
function ordinalizeToken(func, period) {
return function(a) {
return this.lang().ordinal(func.call(this, a), period);
};
}
function Language() {}
function Moment(config) {
checkOverflow(config), extend(this, config);
}
function Duration(duration) {
var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
this._input = duration, this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 36e5 * hours, 
this._days = +days + 7 * weeks, this._months = +months + 12 * years, this._data = {}, 
this._bubble();
}
function extend(a, b) {
for (var i in b) b.hasOwnProperty(i) && (a[i] = b[i]);
return b.hasOwnProperty("toString") && (a.toString = b.toString), b.hasOwnProperty("valueOf") && (a.valueOf = b.valueOf), 
a;
}
function absRound(number) {
return 0 > number ? Math.ceil(number) :Math.floor(number);
}
function leftZeroFill(number, targetLength) {
for (var output = number + ""; output.length < targetLength; ) output = "0" + output;
return output;
}
function addOrSubtractDurationFromMoment(mom, duration, isAdding, ignoreUpdateOffset) {
var minutes, hours, milliseconds = duration._milliseconds, days = duration._days, months = duration._months;
milliseconds && mom._d.setTime(+mom._d + milliseconds * isAdding), (days || months) && (minutes = mom.minute(), 
hours = mom.hour()), days && mom.date(mom.date() + days * isAdding), months && mom.month(mom.month() + months * isAdding), 
milliseconds && !ignoreUpdateOffset && moment.updateOffset(mom), (days || months) && (mom.minute(minutes), 
mom.hour(hours));
}
function isArray(input) {
return "[object Array]" === Object.prototype.toString.call(input);
}
function isDate(input) {
return "[object Date]" === Object.prototype.toString.call(input) || input instanceof Date;
}
function compareArrays(array1, array2, dontConvert) {
var i, len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0;
for (i = 0; len > i; i++) (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
return diffs + lengthDiff;
}
function normalizeUnits(units) {
if (units) {
var lowered = units.toLowerCase().replace(/(.)s$/, "$1");
units = unitAliases[units] || camelFunctions[lowered] || lowered;
}
return units;
}
function normalizeObjectUnits(inputObject) {
var normalizedProp, prop, normalizedInput = {};
for (prop in inputObject) inputObject.hasOwnProperty(prop) && (normalizedProp = normalizeUnits(prop), 
normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]));
return normalizedInput;
}
function makeList(field) {
var count, setter;
if (0 === field.indexOf("week")) count = 7, setter = "day"; else {
if (0 !== field.indexOf("month")) return;
count = 12, setter = "month";
}
moment[field] = function(format, index) {
var i, getter, method = moment.fn._lang[field], results = [];
if ("number" == typeof format && (index = format, format = undefined), getter = function(i) {
var m = moment().utc().set(setter, i);
return method.call(moment.fn._lang, m, format || "");
}, null != index) return getter(index);
for (i = 0; count > i; i++) results.push(getter(i));
return results;
};
}
function toInt(argumentForCoercion) {
var coercedNumber = +argumentForCoercion, value = 0;
return 0 !== coercedNumber && isFinite(coercedNumber) && (value = coercedNumber >= 0 ? Math.floor(coercedNumber) :Math.ceil(coercedNumber)), 
value;
}
function daysInMonth(year, month) {
return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}
function daysInYear(year) {
return isLeapYear(year) ? 366 :365;
}
function isLeapYear(year) {
return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function checkOverflow(m) {
var overflow;
m._a && -2 === m._pf.overflow && (overflow = m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :-1, 
m._pf._overflowDayOfYear && (YEAR > overflow || overflow > DATE) && (overflow = DATE), 
m._pf.overflow = overflow);
}
function initializeParsingFlags(config) {
config._pf = {
empty:!1,
unusedTokens:[],
unusedInput:[],
overflow:-2,
charsLeftOver:0,
nullInput:!1,
invalidMonth:null,
invalidFormat:!1,
userInvalidated:!1,
iso:!1
};
}
function isValid(m) {
return null == m._isValid && (m._isValid = !isNaN(m._d.getTime()) && m._pf.overflow < 0 && !m._pf.empty && !m._pf.invalidMonth && !m._pf.nullInput && !m._pf.invalidFormat && !m._pf.userInvalidated, 
m._strict && (m._isValid = m._isValid && 0 === m._pf.charsLeftOver && 0 === m._pf.unusedTokens.length)), 
m._isValid;
}
function normalizeLanguage(key) {
return key ? key.toLowerCase().replace("_", "-") :key;
}
function loadLang(key, values) {
return values.abbr = key, languages[key] || (languages[key] = new Language()), languages[key].set(values), 
languages[key];
}
function unloadLang(key) {
delete languages[key];
}
function getLangDefinition(key) {
var j, lang, next, split, i = 0, get = function(k) {
if (!languages[k] && hasModule) try {
require("./lang/" + k);
} catch (e) {}
return languages[k];
};
if (!key) return moment.fn._lang;
if (!isArray(key)) {
if (lang = get(key)) return lang;
key = [ key ];
}
for (;i < key.length; ) {
for (split = normalizeLanguage(key[i]).split("-"), j = split.length, next = normalizeLanguage(key[i + 1]), 
next = next ? next.split("-") :null; j > 0; ) {
if (lang = get(split.slice(0, j).join("-"))) return lang;
if (next && next.length >= j && compareArrays(split, next, !0) >= j - 1) break;
j--;
}
i++;
}
return moment.fn._lang;
}
function removeFormattingTokens(input) {
return input.match(/\[[\s\S]/) ? input.replace(/^\[|\]$/g, "") :input.replace(/\\/g, "");
}
function makeFormatFunction(format) {
var i, length, array = format.match(formattingTokens);
for (i = 0, length = array.length; length > i; i++) array[i] = formatTokenFunctions[array[i]] ? formatTokenFunctions[array[i]] :removeFormattingTokens(array[i]);
return function(mom) {
var output = "";
for (i = 0; length > i; i++) output += array[i] instanceof Function ? array[i].call(mom, format) :array[i];
return output;
};
}
function formatMoment(m, format) {
return m.isValid() ? (format = expandFormat(format, m.lang()), formatFunctions[format] || (formatFunctions[format] = makeFormatFunction(format)), 
formatFunctions[format](m)) :m.lang().invalidDate();
}
function expandFormat(format, lang) {
function replaceLongDateFormatTokens(input) {
return lang.longDateFormat(input) || input;
}
var i = 5;
for (localFormattingTokens.lastIndex = 0; i >= 0 && localFormattingTokens.test(format); ) format = format.replace(localFormattingTokens, replaceLongDateFormatTokens), 
localFormattingTokens.lastIndex = 0, i -= 1;
return format;
}
function getParseRegexForToken(token, config) {
var a;
switch (token) {
case "DDDD":
return parseTokenThreeDigits;

case "YYYY":
case "GGGG":
case "gggg":
return parseTokenFourDigits;

case "YYYYY":
case "GGGGG":
case "ggggg":
return parseTokenSixDigits;

case "S":
case "SS":
case "SSS":
case "DDD":
return parseTokenOneToThreeDigits;

case "MMM":
case "MMMM":
case "dd":
case "ddd":
case "dddd":
return parseTokenWord;

case "a":
case "A":
return getLangDefinition(config._l)._meridiemParse;

case "X":
return parseTokenTimestampMs;

case "Z":
case "ZZ":
return parseTokenTimezone;

case "T":
return parseTokenT;

case "SSSS":
return parseTokenDigits;

case "MM":
case "DD":
case "YY":
case "GG":
case "gg":
case "HH":
case "hh":
case "mm":
case "ss":
case "M":
case "D":
case "d":
case "H":
case "h":
case "m":
case "s":
case "w":
case "ww":
case "W":
case "WW":
case "e":
case "E":
return parseTokenOneOrTwoDigits;

default:
return a = new RegExp(regexpEscape(unescapeFormat(token.replace("\\", "")), "i"));
}
}
function timezoneMinutesFromString(string) {
var tzchunk = (parseTokenTimezone.exec(string) || [])[0], parts = (tzchunk + "").match(parseTimezoneChunker) || [ "-", 0, 0 ], minutes = +(60 * parts[1]) + toInt(parts[2]);
return "+" === parts[0] ? -minutes :minutes;
}
function addTimeToArrayFromToken(token, input, config) {
var a, datePartArray = config._a;
switch (token) {
case "M":
case "MM":
null != input && (datePartArray[MONTH] = toInt(input) - 1);
break;

case "MMM":
case "MMMM":
a = getLangDefinition(config._l).monthsParse(input), null != a ? datePartArray[MONTH] = a :config._pf.invalidMonth = input;
break;

case "D":
case "DD":
null != input && (datePartArray[DATE] = toInt(input));
break;

case "DDD":
case "DDDD":
null != input && (config._dayOfYear = toInt(input));
break;

case "YY":
datePartArray[YEAR] = toInt(input) + (toInt(input) > 68 ? 1900 :2e3);
break;

case "YYYY":
case "YYYYY":
datePartArray[YEAR] = toInt(input);
break;

case "a":
case "A":
config._isPm = getLangDefinition(config._l).isPM(input);
break;

case "H":
case "HH":
case "h":
case "hh":
datePartArray[HOUR] = toInt(input);
break;

case "m":
case "mm":
datePartArray[MINUTE] = toInt(input);
break;

case "s":
case "ss":
datePartArray[SECOND] = toInt(input);
break;

case "S":
case "SS":
case "SSS":
case "SSSS":
datePartArray[MILLISECOND] = toInt(1e3 * ("0." + input));
break;

case "X":
config._d = new Date(1e3 * parseFloat(input));
break;

case "Z":
case "ZZ":
config._useUTC = !0, config._tzm = timezoneMinutesFromString(input);
break;

case "w":
case "ww":
case "W":
case "WW":
case "d":
case "dd":
case "ddd":
case "dddd":
case "e":
case "E":
token = token.substr(0, 1);

case "gg":
case "gggg":
case "GG":
case "GGGG":
case "GGGGG":
token = token.substr(0, 2), input && (config._w = config._w || {}, config._w[token] = input);
}
}
function dateFromConfig(config) {
var i, date, currentDate, yearToUse, fixYear, w, temp, lang, weekday, week, input = [];
if (!config._d) {
for (currentDate = currentDateArray(config), config._w && null == config._a[DATE] && null == config._a[MONTH] && (fixYear = function(val) {
return val ? val.length < 3 ? parseInt(val, 10) > 68 ? "19" + val :"20" + val :val :null == config._a[YEAR] ? moment().weekYear() :config._a[YEAR];
}, w = config._w, null != w.GG || null != w.W || null != w.E ? temp = dayOfYearFromWeeks(fixYear(w.GG), w.W || 1, w.E, 4, 1) :(lang = getLangDefinition(config._l), 
weekday = null != w.d ? parseWeekday(w.d, lang) :null != w.e ? parseInt(w.e, 10) + lang._week.dow :0, 
week = parseInt(w.w, 10) || 1, null != w.d && weekday < lang._week.dow && week++, 
temp = dayOfYearFromWeeks(fixYear(w.gg), week, weekday, lang._week.doy, lang._week.dow)), 
config._a[YEAR] = temp.year, config._dayOfYear = temp.dayOfYear), config._dayOfYear && (yearToUse = null == config._a[YEAR] ? currentDate[YEAR] :config._a[YEAR], 
config._dayOfYear > daysInYear(yearToUse) && (config._pf._overflowDayOfYear = !0), 
date = makeUTCDate(yearToUse, 0, config._dayOfYear), config._a[MONTH] = date.getUTCMonth(), 
config._a[DATE] = date.getUTCDate()), i = 0; 3 > i && null == config._a[i]; ++i) config._a[i] = input[i] = currentDate[i];
for (;7 > i; i++) config._a[i] = input[i] = null == config._a[i] ? 2 === i ? 1 :0 :config._a[i];
input[HOUR] += toInt((config._tzm || 0) / 60), input[MINUTE] += toInt((config._tzm || 0) % 60), 
config._d = (config._useUTC ? makeUTCDate :makeDate).apply(null, input);
}
}
function dateFromObject(config) {
var normalizedInput;
config._d || (normalizedInput = normalizeObjectUnits(config._i), config._a = [ normalizedInput.year, normalizedInput.month, normalizedInput.day, normalizedInput.hour, normalizedInput.minute, normalizedInput.second, normalizedInput.millisecond ], 
dateFromConfig(config));
}
function currentDateArray(config) {
var now = new Date();
return config._useUTC ? [ now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ] :[ now.getFullYear(), now.getMonth(), now.getDate() ];
}
function makeDateFromStringAndFormat(config) {
config._a = [], config._pf.empty = !0;
var i, parsedInput, tokens, token, skipped, lang = getLangDefinition(config._l), string = "" + config._i, stringLength = string.length, totalParsedInputLength = 0;
for (tokens = expandFormat(config._f, lang).match(formattingTokens) || [], i = 0; i < tokens.length; i++) token = tokens[i], 
parsedInput = (getParseRegexForToken(token, config).exec(string) || [])[0], parsedInput && (skipped = string.substr(0, string.indexOf(parsedInput)), 
skipped.length > 0 && config._pf.unusedInput.push(skipped), string = string.slice(string.indexOf(parsedInput) + parsedInput.length), 
totalParsedInputLength += parsedInput.length), formatTokenFunctions[token] ? (parsedInput ? config._pf.empty = !1 :config._pf.unusedTokens.push(token), 
addTimeToArrayFromToken(token, parsedInput, config)) :config._strict && !parsedInput && config._pf.unusedTokens.push(token);
config._pf.charsLeftOver = stringLength - totalParsedInputLength, string.length > 0 && config._pf.unusedInput.push(string), 
config._isPm && config._a[HOUR] < 12 && (config._a[HOUR] += 12), config._isPm === !1 && 12 === config._a[HOUR] && (config._a[HOUR] = 0), 
dateFromConfig(config), checkOverflow(config);
}
function unescapeFormat(s) {
return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
return p1 || p2 || p3 || p4;
});
}
function regexpEscape(s) {
return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function makeDateFromStringAndArray(config) {
var tempConfig, bestMoment, scoreToBeat, i, currentScore;
if (0 === config._f.length) return config._pf.invalidFormat = !0, config._d = new Date(0/0), 
void 0;
for (i = 0; i < config._f.length; i++) currentScore = 0, tempConfig = extend({}, config), 
initializeParsingFlags(tempConfig), tempConfig._f = config._f[i], makeDateFromStringAndFormat(tempConfig), 
isValid(tempConfig) && (currentScore += tempConfig._pf.charsLeftOver, currentScore += 10 * tempConfig._pf.unusedTokens.length, 
tempConfig._pf.score = currentScore, (null == scoreToBeat || scoreToBeat > currentScore) && (scoreToBeat = currentScore, 
bestMoment = tempConfig));
extend(config, bestMoment || tempConfig);
}
function makeDateFromString(config) {
var i, string = config._i, match = isoRegex.exec(string);
if (match) {
for (config._pf.iso = !0, i = 4; i > 0; i--) if (match[i]) {
config._f = isoDates[i - 1] + (match[6] || " ");
break;
}
for (i = 0; 4 > i; i++) if (isoTimes[i][1].exec(string)) {
config._f += isoTimes[i][0];
break;
}
parseTokenTimezone.exec(string) && (config._f += "Z"), makeDateFromStringAndFormat(config);
} else config._d = new Date(string);
}
function makeDateFromInput(config) {
var input = config._i, matched = aspNetJsonRegex.exec(input);
input === undefined ? config._d = new Date() :matched ? config._d = new Date(+matched[1]) :"string" == typeof input ? makeDateFromString(config) :isArray(input) ? (config._a = input.slice(0), 
dateFromConfig(config)) :isDate(input) ? config._d = new Date(+input) :"object" == typeof input ? dateFromObject(config) :config._d = new Date(input);
}
function makeDate(y, m, d, h, M, s, ms) {
var date = new Date(y, m, d, h, M, s, ms);
return 1970 > y && date.setFullYear(y), date;
}
function makeUTCDate(y) {
var date = new Date(Date.UTC.apply(null, arguments));
return 1970 > y && date.setUTCFullYear(y), date;
}
function parseWeekday(input, language) {
if ("string" == typeof input) if (isNaN(input)) {
if (input = language.weekdaysParse(input), "number" != typeof input) return null;
} else input = parseInt(input, 10);
return input;
}
function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime(milliseconds, withoutSuffix, lang) {
var seconds = round(Math.abs(milliseconds) / 1e3), minutes = round(seconds / 60), hours = round(minutes / 60), days = round(hours / 24), years = round(days / 365), args = 45 > seconds && [ "s", seconds ] || 1 === minutes && [ "m" ] || 45 > minutes && [ "mm", minutes ] || 1 === hours && [ "h" ] || 22 > hours && [ "hh", hours ] || 1 === days && [ "d" ] || 25 >= days && [ "dd", days ] || 45 >= days && [ "M" ] || 345 > days && [ "MM", round(days / 30) ] || 1 === years && [ "y" ] || [ "yy", years ];
return args[2] = withoutSuffix, args[3] = milliseconds > 0, args[4] = lang, substituteTimeAgo.apply({}, args);
}
function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
var adjustedMoment, end = firstDayOfWeekOfYear - firstDayOfWeek, daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();
return daysToDayOfWeek > end && (daysToDayOfWeek -= 7), end - 7 > daysToDayOfWeek && (daysToDayOfWeek += 7), 
adjustedMoment = moment(mom).add("d", daysToDayOfWeek), {
week:Math.ceil(adjustedMoment.dayOfYear() / 7),
year:adjustedMoment.year()
};
}
function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
var daysToAdd, dayOfYear, d = new Date(Date.UTC(year, 0)).getUTCDay();
return weekday = null != weekday ? weekday :firstDayOfWeek, daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 :0), 
dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1, {
year:dayOfYear > 0 ? year :year - 1,
dayOfYear:dayOfYear > 0 ? dayOfYear :daysInYear(year - 1) + dayOfYear
};
}
function makeMoment(config) {
var input = config._i, format = config._f;
return "undefined" == typeof config._pf && initializeParsingFlags(config), null === input ? moment.invalid({
nullInput:!0
}) :("string" == typeof input && (config._i = input = getLangDefinition().preparse(input)), 
moment.isMoment(input) ? (config = extend({}, input), config._d = new Date(+input._d)) :format ? isArray(format) ? makeDateFromStringAndArray(config) :makeDateFromStringAndFormat(config) :makeDateFromInput(config), 
new Moment(config));
}
function makeGetterAndSetter(name, key) {
moment.fn[name] = moment.fn[name + "s"] = function(input) {
var utc = this._isUTC ? "UTC" :"";
return null != input ? (this._d["set" + utc + key](input), moment.updateOffset(this), 
this) :this._d["get" + utc + key]();
};
}
function makeDurationGetter(name) {
moment.duration.fn[name] = function() {
return this._data[name];
};
}
function makeDurationAsGetter(name, factor) {
moment.duration.fn["as" + name] = function() {
return +this / factor;
};
}
function makeGlobal(deprecate) {
var warned = !1, local_moment = moment;
"undefined" == typeof ender && (this.moment = deprecate ? function() {
return !warned && console && console.warn && (warned = !0, console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")), 
local_moment.apply(null, arguments);
} :moment);
}
for (var moment, i, VERSION = "2.4.0", round = Math.round, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, languages = {}, hasModule = "undefined" != typeof module && module.exports, aspNetJsonRegex = /^\/?Date\((\-?\d+)/i, aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{1,4}/, parseTokenSixDigits = /[+\-]?\d{1,6}/, parseTokenDigits = /\d+/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, parseTokenT = /T/i, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, isoRegex = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d:?\d\d|Z)?)?$/, isoFormat = "YYYY-MM-DDTHH:mm:ssZ", isoDates = [ "YYYY-MM-DD", "GGGG-[W]WW", "GGGG-[W]WW-E", "YYYY-DDD" ], isoTimes = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], parseTimezoneChunker = /([\+\-]|\d\d)/gi, proxyGettersAndSetters = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), unitMillisecondFactors = {
Milliseconds:1,
Seconds:1e3,
Minutes:6e4,
Hours:36e5,
Days:864e5,
Months:2592e6,
Years:31536e6
}, unitAliases = {
ms:"millisecond",
s:"second",
m:"minute",
h:"hour",
d:"day",
D:"date",
w:"week",
W:"isoWeek",
M:"month",
y:"year",
DDD:"dayOfYear",
e:"weekday",
E:"isoWeekday",
gg:"weekYear",
GG:"isoWeekYear"
}, camelFunctions = {
dayofyear:"dayOfYear",
isoweekday:"isoWeekday",
isoweek:"isoWeek",
weekyear:"weekYear",
isoweekyear:"isoWeekYear"
}, formatFunctions = {}, ordinalizeTokens = "DDD w W M D d".split(" "), paddedTokens = "M D H h m s w W".split(" "), formatTokenFunctions = {
M:function() {
return this.month() + 1;
},
MMM:function(format) {
return this.lang().monthsShort(this, format);
},
MMMM:function(format) {
return this.lang().months(this, format);
},
D:function() {
return this.date();
},
DDD:function() {
return this.dayOfYear();
},
d:function() {
return this.day();
},
dd:function(format) {
return this.lang().weekdaysMin(this, format);
},
ddd:function(format) {
return this.lang().weekdaysShort(this, format);
},
dddd:function(format) {
return this.lang().weekdays(this, format);
},
w:function() {
return this.week();
},
W:function() {
return this.isoWeek();
},
YY:function() {
return leftZeroFill(this.year() % 100, 2);
},
YYYY:function() {
return leftZeroFill(this.year(), 4);
},
YYYYY:function() {
return leftZeroFill(this.year(), 5);
},
gg:function() {
return leftZeroFill(this.weekYear() % 100, 2);
},
gggg:function() {
return this.weekYear();
},
ggggg:function() {
return leftZeroFill(this.weekYear(), 5);
},
GG:function() {
return leftZeroFill(this.isoWeekYear() % 100, 2);
},
GGGG:function() {
return this.isoWeekYear();
},
GGGGG:function() {
return leftZeroFill(this.isoWeekYear(), 5);
},
e:function() {
return this.weekday();
},
E:function() {
return this.isoWeekday();
},
a:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !0);
},
A:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !1);
},
H:function() {
return this.hours();
},
h:function() {
return this.hours() % 12 || 12;
},
m:function() {
return this.minutes();
},
s:function() {
return this.seconds();
},
S:function() {
return toInt(this.milliseconds() / 100);
},
SS:function() {
return leftZeroFill(toInt(this.milliseconds() / 10), 2);
},
SSS:function() {
return leftZeroFill(this.milliseconds(), 3);
},
SSSS:function() {
return leftZeroFill(this.milliseconds(), 3);
},
Z:function() {
var a = -this.zone(), b = "+";
return 0 > a && (a = -a, b = "-"), b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
},
ZZ:function() {
var a = -this.zone(), b = "+";
return 0 > a && (a = -a, b = "-"), b + leftZeroFill(toInt(10 * a / 6), 4);
},
z:function() {
return this.zoneAbbr();
},
zz:function() {
return this.zoneName();
},
X:function() {
return this.unix();
}
}, lists = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ]; ordinalizeTokens.length; ) i = ordinalizeTokens.pop(), 
formatTokenFunctions[i + "o"] = ordinalizeToken(formatTokenFunctions[i], i);
for (;paddedTokens.length; ) i = paddedTokens.pop(), formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
for (formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3), extend(Language.prototype, {
set:function(config) {
var prop, i;
for (i in config) prop = config[i], "function" == typeof prop ? this[i] = prop :this["_" + i] = prop;
},
_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
months:function(m) {
return this._months[m.month()];
},
_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
monthsShort:function(m) {
return this._monthsShort[m.month()];
},
monthsParse:function(monthName) {
var i, mom, regex;
for (this._monthsParse || (this._monthsParse = []), i = 0; 12 > i; i++) if (this._monthsParse[i] || (mom = moment.utc([ 2e3, i ]), 
regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, ""), this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")), 
this._monthsParse[i].test(monthName)) return i;
},
_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdays:function(m) {
return this._weekdays[m.day()];
},
_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysShort:function(m) {
return this._weekdaysShort[m.day()];
},
_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
weekdaysMin:function(m) {
return this._weekdaysMin[m.day()];
},
weekdaysParse:function(weekdayName) {
var i, mom, regex;
for (this._weekdaysParse || (this._weekdaysParse = []), i = 0; 7 > i; i++) if (this._weekdaysParse[i] || (mom = moment([ 2e3, 1 ]).day(i), 
regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, ""), 
this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")), this._weekdaysParse[i].test(weekdayName)) return i;
},
_longDateFormat:{
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D YYYY",
LLL:"MMMM D YYYY LT",
LLLL:"dddd, MMMM D YYYY LT"
},
longDateFormat:function(key) {
var output = this._longDateFormat[key];
return !output && this._longDateFormat[key.toUpperCase()] && (output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(val) {
return val.slice(1);
}), this._longDateFormat[key] = output), output;
},
isPM:function(input) {
return "p" === (input + "").toLowerCase().charAt(0);
},
_meridiemParse:/[ap]\.?m?\.?/i,
meridiem:function(hours, minutes, isLower) {
return hours > 11 ? isLower ? "pm" :"PM" :isLower ? "am" :"AM";
},
_calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
calendar:function(key, mom) {
var output = this._calendar[key];
return "function" == typeof output ? output.apply(mom) :output;
},
_relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
relativeTime:function(number, withoutSuffix, string, isFuture) {
var output = this._relativeTime[string];
return "function" == typeof output ? output(number, withoutSuffix, string, isFuture) :output.replace(/%d/i, number);
},
pastFuture:function(diff, output) {
var format = this._relativeTime[diff > 0 ? "future" :"past"];
return "function" == typeof format ? format(output) :format.replace(/%s/i, output);
},
ordinal:function(number) {
return this._ordinal.replace("%d", number);
},
_ordinal:"%d",
preparse:function(string) {
return string;
},
postformat:function(string) {
return string;
},
week:function(mom) {
return weekOfYear(mom, this._week.dow, this._week.doy).week;
},
_week:{
dow:0,
doy:6
},
_invalidDate:"Invalid date",
invalidDate:function() {
return this._invalidDate;
}
}), moment = function(input, format, lang, strict) {
return "boolean" == typeof lang && (strict = lang, lang = undefined), makeMoment({
_i:input,
_f:format,
_l:lang,
_strict:strict,
_isUTC:!1
});
}, moment.utc = function(input, format, lang, strict) {
var m;
return "boolean" == typeof lang && (strict = lang, lang = undefined), m = makeMoment({
_useUTC:!0,
_isUTC:!0,
_l:lang,
_i:input,
_f:format,
_strict:strict
}).utc();
}, moment.unix = function(input) {
return moment(1e3 * input);
}, moment.duration = function(input, key) {
var sign, ret, parseIso, isDuration = moment.isDuration(input), isNumber = "number" == typeof input, duration = isDuration ? input._input :isNumber ? {} :input, match = null;
return isNumber ? key ? duration[key] = input :duration.milliseconds = input :(match = aspNetTimeSpanJsonRegex.exec(input)) ? (sign = "-" === match[1] ? -1 :1, 
duration = {
y:0,
d:toInt(match[DATE]) * sign,
h:toInt(match[HOUR]) * sign,
m:toInt(match[MINUTE]) * sign,
s:toInt(match[SECOND]) * sign,
ms:toInt(match[MILLISECOND]) * sign
}) :(match = isoDurationRegex.exec(input)) && (sign = "-" === match[1] ? -1 :1, 
parseIso = function(inp) {
var res = inp && parseFloat(inp.replace(",", "."));
return (isNaN(res) ? 0 :res) * sign;
}, duration = {
y:parseIso(match[2]),
M:parseIso(match[3]),
d:parseIso(match[4]),
h:parseIso(match[5]),
m:parseIso(match[6]),
s:parseIso(match[7]),
w:parseIso(match[8])
}), ret = new Duration(duration), isDuration && input.hasOwnProperty("_lang") && (ret._lang = input._lang), 
ret;
}, moment.version = VERSION, moment.defaultFormat = isoFormat, moment.updateOffset = function() {}, 
moment.lang = function(key, values) {
var r;
return key ? (values ? loadLang(normalizeLanguage(key), values) :null === values ? (unloadLang(key), 
key = "en") :languages[key] || getLangDefinition(key), r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key), 
r._abbr) :moment.fn._lang._abbr;
}, moment.langData = function(key) {
return key && key._lang && key._lang._abbr && (key = key._lang._abbr), getLangDefinition(key);
}, moment.isMoment = function(obj) {
return obj instanceof Moment;
}, moment.isDuration = function(obj) {
return obj instanceof Duration;
}, i = lists.length - 1; i >= 0; --i) makeList(lists[i]);
for (moment.normalizeUnits = function(units) {
return normalizeUnits(units);
}, moment.invalid = function(flags) {
var m = moment.utc(0/0);
return null != flags ? extend(m._pf, flags) :m._pf.userInvalidated = !0, m;
}, moment.parseZone = function(input) {
return moment(input).parseZone();
}, extend(moment.fn = Moment.prototype, {
clone:function() {
return moment(this);
},
valueOf:function() {
return +this._d + 6e4 * (this._offset || 0);
},
unix:function() {
return Math.floor(+this / 1e3);
},
toString:function() {
return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
},
toDate:function() {
return this._offset ? new Date(+this) :this._d;
},
toISOString:function() {
return formatMoment(moment(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
},
toArray:function() {
var m = this;
return [ m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds(), m.milliseconds() ];
},
isValid:function() {
return isValid(this);
},
isDSTShifted:function() {
return this._a ? this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) :moment(this._a)).toArray()) > 0 :!1;
},
parsingFlags:function() {
return extend({}, this._pf);
},
invalidAt:function() {
return this._pf.overflow;
},
utc:function() {
return this.zone(0);
},
local:function() {
return this.zone(0), this._isUTC = !1, this;
},
format:function(inputString) {
var output = formatMoment(this, inputString || moment.defaultFormat);
return this.lang().postformat(output);
},
add:function(input, val) {
var dur;
return dur = "string" == typeof input ? moment.duration(+val, input) :moment.duration(input, val), 
addOrSubtractDurationFromMoment(this, dur, 1), this;
},
subtract:function(input, val) {
var dur;
return dur = "string" == typeof input ? moment.duration(+val, input) :moment.duration(input, val), 
addOrSubtractDurationFromMoment(this, dur, -1), this;
},
diff:function(input, units, asFloat) {
var diff, output, that = this._isUTC ? moment(input).zone(this._offset || 0) :moment(input).local(), zoneDiff = 6e4 * (this.zone() - that.zone());
return units = normalizeUnits(units), "year" === units || "month" === units ? (diff = 432e5 * (this.daysInMonth() + that.daysInMonth()), 
output = 12 * (this.year() - that.year()) + (this.month() - that.month()), output += (this - moment(this).startOf("month") - (that - moment(that).startOf("month"))) / diff, 
output -= 6e4 * (this.zone() - moment(this).startOf("month").zone() - (that.zone() - moment(that).startOf("month").zone())) / diff, 
"year" === units && (output /= 12)) :(diff = this - that, output = "second" === units ? diff / 1e3 :"minute" === units ? diff / 6e4 :"hour" === units ? diff / 36e5 :"day" === units ? (diff - zoneDiff) / 864e5 :"week" === units ? (diff - zoneDiff) / 6048e5 :diff), 
asFloat ? output :absRound(output);
},
from:function(time, withoutSuffix) {
return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
},
fromNow:function(withoutSuffix) {
return this.from(moment(), withoutSuffix);
},
calendar:function() {
var diff = this.diff(moment().zone(this.zone()).startOf("day"), "days", !0), format = -6 > diff ? "sameElse" :-1 > diff ? "lastWeek" :0 > diff ? "lastDay" :1 > diff ? "sameDay" :2 > diff ? "nextDay" :7 > diff ? "nextWeek" :"sameElse";
return this.format(this.lang().calendar(format, this));
},
isLeapYear:function() {
return isLeapYear(this.year());
},
isDST:function() {
return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
},
day:function(input) {
var day = this._isUTC ? this._d.getUTCDay() :this._d.getDay();
return null != input ? (input = parseWeekday(input, this.lang()), this.add({
d:input - day
})) :day;
},
month:function(input) {
var dayOfMonth, utc = this._isUTC ? "UTC" :"";
return null != input ? "string" == typeof input && (input = this.lang().monthsParse(input), 
"number" != typeof input) ? this :(dayOfMonth = this.date(), this.date(1), this._d["set" + utc + "Month"](input), 
this.date(Math.min(dayOfMonth, this.daysInMonth())), moment.updateOffset(this), 
this) :this._d["get" + utc + "Month"]();
},
startOf:function(units) {
switch (units = normalizeUnits(units)) {
case "year":
this.month(0);

case "month":
this.date(1);

case "week":
case "isoWeek":
case "day":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
return "week" === units ? this.weekday(0) :"isoWeek" === units && this.isoWeekday(1), 
this;
},
endOf:function(units) {
return units = normalizeUnits(units), this.startOf(units).add("isoWeek" === units ? "week" :units, 1).subtract("ms", 1);
},
isAfter:function(input, units) {
return units = "undefined" != typeof units ? units :"millisecond", +this.clone().startOf(units) > +moment(input).startOf(units);
},
isBefore:function(input, units) {
return units = "undefined" != typeof units ? units :"millisecond", +this.clone().startOf(units) < +moment(input).startOf(units);
},
isSame:function(input, units) {
return units = "undefined" != typeof units ? units :"millisecond", +this.clone().startOf(units) === +moment(input).startOf(units);
},
min:function(other) {
return other = moment.apply(null, arguments), this > other ? this :other;
},
max:function(other) {
return other = moment.apply(null, arguments), other > this ? this :other;
},
zone:function(input) {
var offset = this._offset || 0;
return null == input ? this._isUTC ? offset :this._d.getTimezoneOffset() :("string" == typeof input && (input = timezoneMinutesFromString(input)), 
Math.abs(input) < 16 && (input = 60 * input), this._offset = input, this._isUTC = !0, 
offset !== input && addOrSubtractDurationFromMoment(this, moment.duration(offset - input, "m"), 1, !0), 
this);
},
zoneAbbr:function() {
return this._isUTC ? "UTC" :"";
},
zoneName:function() {
return this._isUTC ? "Coordinated Universal Time" :"";
},
parseZone:function() {
return "string" == typeof this._i && this.zone(this._i), this;
},
hasAlignedHourOffset:function(input) {
return input = input ? moment(input).zone() :0, (this.zone() - input) % 60 === 0;
},
daysInMonth:function() {
return daysInMonth(this.year(), this.month());
},
dayOfYear:function(input) {
var dayOfYear = round((moment(this).startOf("day") - moment(this).startOf("year")) / 864e5) + 1;
return null == input ? dayOfYear :this.add("d", input - dayOfYear);
},
weekYear:function(input) {
var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
return null == input ? year :this.add("y", input - year);
},
isoWeekYear:function(input) {
var year = weekOfYear(this, 1, 4).year;
return null == input ? year :this.add("y", input - year);
},
week:function(input) {
var week = this.lang().week(this);
return null == input ? week :this.add("d", 7 * (input - week));
},
isoWeek:function(input) {
var week = weekOfYear(this, 1, 4).week;
return null == input ? week :this.add("d", 7 * (input - week));
},
weekday:function(input) {
var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
return null == input ? weekday :this.add("d", input - weekday);
},
isoWeekday:function(input) {
return null == input ? this.day() || 7 :this.day(this.day() % 7 ? input :input - 7);
},
get:function(units) {
return units = normalizeUnits(units), this[units]();
},
set:function(units, value) {
return units = normalizeUnits(units), "function" == typeof this[units] && this[units](value), 
this;
},
lang:function(key) {
return key === undefined ? this._lang :(this._lang = getLangDefinition(key), this);
}
}), i = 0; i < proxyGettersAndSetters.length; i++) makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ""), proxyGettersAndSetters[i]);
makeGetterAndSetter("year", "FullYear"), moment.fn.days = moment.fn.day, moment.fn.months = moment.fn.month, 
moment.fn.weeks = moment.fn.week, moment.fn.isoWeeks = moment.fn.isoWeek, moment.fn.toJSON = moment.fn.toISOString, 
extend(moment.duration.fn = Duration.prototype, {
_bubble:function() {
var seconds, minutes, hours, years, milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data;
data.milliseconds = milliseconds % 1e3, seconds = absRound(milliseconds / 1e3), 
data.seconds = seconds % 60, minutes = absRound(seconds / 60), data.minutes = minutes % 60, 
hours = absRound(minutes / 60), data.hours = hours % 24, days += absRound(hours / 24), 
data.days = days % 30, months += absRound(days / 30), data.months = months % 12, 
years = absRound(months / 12), data.years = years;
},
weeks:function() {
return absRound(this.days() / 7);
},
valueOf:function() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12);
},
humanize:function(withSuffix) {
var difference = +this, output = relativeTime(difference, !withSuffix, this.lang());
return withSuffix && (output = this.lang().pastFuture(difference, output)), this.lang().postformat(output);
},
add:function(input, val) {
var dur = moment.duration(input, val);
return this._milliseconds += dur._milliseconds, this._days += dur._days, this._months += dur._months, 
this._bubble(), this;
},
subtract:function(input, val) {
var dur = moment.duration(input, val);
return this._milliseconds -= dur._milliseconds, this._days -= dur._days, this._months -= dur._months, 
this._bubble(), this;
},
get:function(units) {
return units = normalizeUnits(units), this[units.toLowerCase() + "s"]();
},
as:function(units) {
return units = normalizeUnits(units), this["as" + units.charAt(0).toUpperCase() + units.slice(1) + "s"]();
},
lang:moment.fn.lang,
toIsoString:function() {
var years = Math.abs(this.years()), months = Math.abs(this.months()), days = Math.abs(this.days()), hours = Math.abs(this.hours()), minutes = Math.abs(this.minutes()), seconds = Math.abs(this.seconds() + this.milliseconds() / 1e3);
return this.asSeconds() ? (this.asSeconds() < 0 ? "-" :"") + "P" + (years ? years + "Y" :"") + (months ? months + "M" :"") + (days ? days + "D" :"") + (hours || minutes || seconds ? "T" :"") + (hours ? hours + "H" :"") + (minutes ? minutes + "M" :"") + (seconds ? seconds + "S" :"") :"P0D";
}
});
for (i in unitMillisecondFactors) unitMillisecondFactors.hasOwnProperty(i) && (makeDurationAsGetter(i, unitMillisecondFactors[i]), 
makeDurationGetter(i.toLowerCase()));
makeDurationAsGetter("Weeks", 6048e5), moment.duration.fn.asMonths = function() {
return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years();
}, moment.lang("en", {
ordinal:function(number) {
var b = number % 10, output = 1 === toInt(number % 100 / 10) ? "th" :1 === b ? "st" :2 === b ? "nd" :3 === b ? "rd" :"th";
return number + output;
}
}), hasModule ? (module.exports = moment, makeGlobal(!0)) :"function" == typeof define && define.amd ? define("moment", function(require, exports, module) {
return module.config().noGlobal !== !0 && makeGlobal(module.config().noGlobal === undefined), 
moment;
}) :makeGlobal();
}.call(this), /*!
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
}), function($, window, undefined) {
"use strict";
var defaults = {
version:"2.1",
tipLocation:"bottom",
nubPosition:"auto",
scroll:!0,
scrollSpeed:300,
timer:0,
autoStart:!1,
startTimerOnClick:!0,
startOffset:0,
nextButton:!0,
tipAnimation:"fade",
pauseAfter:[],
tipAnimationFadeSpeed:300,
cookieMonster:!1,
cookieName:"joyride",
cookieDomain:!1,
cookiePath:!1,
localStorage:!1,
localStorageKey:"joyride",
tipContainer:"body",
modal:!1,
expose:!1,
postExposeCallback:$.noop,
preRideCallback:$.noop,
postRideCallback:$.noop,
preStepCallback:$.noop,
postStepCallback:$.noop,
template:{
link:'<a href="#close" class="joyride-close-tip">&times;</a>',
timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
wrapper:'<div class="joyride-content-wrapper clearfix" role="dialog"></div>',
button:'<a href="#" class="pull-right joyride-next-tip"></a>',
modal:'<div class="joyride-modal-bg"></div>',
expose:'<div class="joyride-expose-wrapper"></div>',
exposeCover:'<div class="joyride-expose-cover"></div>'
}
}, Modernizr = Modernizr || !1, settings = {}, methods = {
init:function(opts) {
return this.each(function() {
$.isEmptyObject(settings) ? (settings = $.extend(!0, defaults, opts), settings.document = window.document, 
settings.$document = $(settings.document), settings.$window = $(window), settings.$content_el = $(this), 
settings.$body = $(settings.tipContainer), settings.body_offset = $(settings.tipContainer).position(), 
settings.$tip_content = $("> li", settings.$content_el), settings.paused = !1, settings.attempts = 0, 
settings.tipLocationPatterns = {
top:[ "bottom" ],
bottom:[],
left:[ "right", "top", "bottom" ],
right:[ "left", "top", "bottom" ]
}, methods.jquery_check(), $.isFunction($.cookie) || (settings.cookieMonster = !1), 
settings.cookieMonster && $.cookie(settings.cookieName) || settings.localStorage && methods.support_localstorage() && localStorage.getItem(settings.localStorageKey) || (settings.$tip_content.each(function(index) {
methods.create({
$li:$(this),
index:index
});
}), settings.autoStart && (!settings.startTimerOnClick && settings.timer > 0 ? (methods.show("init"), 
methods.startTimer()) :methods.show("init"))), settings.$document.on("click.joyride", ".joyride-next-tip, .joyride-modal-bg", function(e) {
e.preventDefault(), settings.$li.next().length < 1 ? methods.end() :settings.timer > 0 ? (clearTimeout(settings.automate), 
methods.hide(), methods.show(), methods.startTimer()) :(methods.hide(), methods.show());
}), settings.$document.on("click.joyride", ".joyride-close-tip", function(e) {
e.preventDefault(), methods.end();
}), settings.$window.bind("resize.joyride", function() {
if (settings.$li) {
if (settings.exposed && settings.exposed.length > 0) {
var $els = $(settings.exposed);
$els.each(function() {
var $this = $(this);
methods.un_expose($this), methods.expose($this);
});
}
methods.is_phone() ? methods.pos_phone() :methods.pos_default();
}
})) :methods.restart();
});
},
resume:function() {
methods.set_li(), methods.show();
},
nextTip:function() {
settings.$li.next().length < 1 ? methods.end() :settings.timer > 0 ? (clearTimeout(settings.automate), 
methods.hide(), methods.show(), methods.startTimer()) :(methods.hide(), methods.show());
},
tip_template:function(opts) {
var $blank, content, $wrapper;
return opts.tip_class = opts.tip_class || "", $blank = $(settings.template.tip).addClass(opts.tip_class), 
content = $.trim($(opts.li).html()) + methods.button_text(opts.button_text) + settings.template.link + methods.timer_instance(opts.index), 
$wrapper = $(settings.template.wrapper), opts.li.attr("data-aria-labelledby") && $wrapper.attr("aria-labelledby", opts.li.attr("data-aria-labelledby")), 
opts.li.attr("data-aria-describedby") && $wrapper.attr("aria-describedby", opts.li.attr("data-aria-describedby")), 
$blank.append($wrapper), $blank.first().attr("data-index", opts.index), $(".joyride-content-wrapper", $blank).append(content), 
$blank[0];
},
timer_instance:function(index) {
var txt;
return txt = 0 === index && settings.startTimerOnClick && settings.timer > 0 || 0 === settings.timer ? "" :methods.outerHTML($(settings.template.timer)[0]);
},
button_text:function(txt) {
return settings.nextButton ? (txt = $.trim(txt) || "Next", txt = methods.outerHTML($(settings.template.button).append(txt)[0])) :txt = "", 
txt;
},
create:function(opts) {
var buttonText = opts.$li.attr("data-button") || opts.$li.attr("data-text"), tipClass = opts.$li.attr("class"), $tip_content = $(methods.tip_template({
tip_class:tipClass,
index:opts.index,
button_text:buttonText,
li:opts.$li
}));
$(settings.tipContainer).append($tip_content);
},
show:function(init) {
var ii, p, opts = {}, opts_arr = [], opts_len = 0, $timer = null;
if (settings.$li === undefined || -1 === $.inArray(settings.$li.index(), settings.pauseAfter)) if (settings.paused ? settings.paused = !1 :methods.set_li(init), 
settings.attempts = 0, settings.$li.length && settings.$target.length > 0) {
for (init && (settings.preRideCallback(settings.$li.index(), settings.$next_tip), 
settings.modal && methods.show_modal()), settings.preStepCallback(settings.$li.index(), settings.$next_tip), 
opts_arr = (settings.$li.data("options") || ":").split(";"), opts_len = opts_arr.length, 
ii = opts_len - 1; ii >= 0; ii--) p = opts_arr[ii].split(":"), 2 === p.length && (opts[$.trim(p[0])] = $.trim(p[1]));
settings.tipSettings = $.extend({}, settings, opts), settings.tipSettings.tipLocationPattern = settings.tipLocationPatterns[settings.tipSettings.tipLocation], 
settings.modal && settings.expose && methods.expose(), !/body/i.test(settings.$target.selector) && settings.scroll && methods.scroll_to(), 
methods.is_phone() ? methods.pos_phone(!0) :methods.pos_default(!0), $timer = $(".joyride-timer-indicator", settings.$next_tip), 
/pop/i.test(settings.tipAnimation) ? ($timer.outerWidth(0), settings.timer > 0 ? (settings.$next_tip.show(), 
$timer.animate({
width:$(".joyride-timer-indicator-wrap", settings.$next_tip).outerWidth()
}, settings.timer)) :settings.$next_tip.show()) :/fade/i.test(settings.tipAnimation) && ($timer.outerWidth(0), 
settings.timer > 0 ? (settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed), 
settings.$next_tip.show(), $timer.animate({
width:$(".joyride-timer-indicator-wrap", settings.$next_tip).outerWidth()
}, settings.timer)) :settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed)), 
settings.$current_tip = settings.$next_tip, $(".joyride-next-tip", settings.$current_tip).focus(), 
methods.tabbable(settings.$current_tip);
} else settings.$li && settings.$target.length < 1 ? methods.show() :methods.end(); else settings.paused = !0;
},
is_phone:function() {
return Modernizr ? Modernizr.mq("only screen and (max-width: 767px)") :settings.$window.width() < 767 ? !0 :!1;
},
support_localstorage:function() {
return Modernizr ? Modernizr.localstorage :!!window.localStorage;
},
hide:function() {
settings.modal && settings.expose && methods.un_expose(), settings.modal || $(".joyride-modal-bg").hide(), 
settings.$current_tip.hide(), settings.postStepCallback(settings.$li.index(), settings.$current_tip);
},
set_li:function(init) {
init ? (settings.$li = settings.$tip_content.eq(settings.startOffset), methods.set_next_tip(), 
settings.$current_tip = settings.$next_tip) :(settings.$li = settings.$li.next(), 
methods.set_next_tip()), methods.set_target();
},
set_next_tip:function() {
settings.$next_tip = $(".joyride-tip-guide[data-index=" + settings.$li.index() + "]");
},
set_target:function() {
var cl = settings.$li.attr("data-class"), id = settings.$li.attr("data-id"), $sel = function() {
return id ? $(settings.document.getElementById(id)) :cl ? $("." + cl).filter(":visible").first() :$("body");
};
settings.$target = $sel();
},
scroll_to:function() {
var window_half, tipOffset;
window_half = settings.$window.height() / 2, tipOffset = Math.ceil(settings.$target.offset().top - window_half + settings.$next_tip.outerHeight()), 
$("html, body").stop().animate({
scrollTop:tipOffset
}, settings.scrollSpeed);
},
paused:function() {
return -1 === $.inArray(settings.$li.index() + 1, settings.pauseAfter) ? !0 :!1;
},
destroy:function() {
$.isEmptyObject(settings) || settings.$document.off(".joyride"), $(window).off(".joyride"), 
$(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"), $(".joyride-tip-guide, .joyride-modal-bg").remove(), 
clearTimeout(settings.automate), settings = {};
},
restart:function() {
settings.autoStart ? (methods.hide(), settings.$li = undefined, methods.show("init")) :(!settings.startTimerOnClick && settings.timer > 0 ? (methods.show("init"), 
methods.startTimer()) :methods.show("init"), settings.autoStart = !0);
},
pos_default:function(init) {
var $nub = (Math.ceil(settings.$window.height() / 2), settings.$next_tip.offset(), 
$(".joyride-nub", settings.$next_tip)), nub_width = Math.ceil($nub.outerWidth() / 2), nub_height = Math.ceil($nub.outerHeight() / 2), toggle = init || !1;
if (toggle && (settings.$next_tip.css("visibility", "hidden"), settings.$next_tip.show()), 
/body/i.test(settings.$target.selector)) settings.$li.length && methods.pos_modal($nub); else {
var topAdjustment = settings.tipSettings.tipAdjustmentY ? parseInt(settings.tipSettings.tipAdjustmentY) :0, leftAdjustment = settings.tipSettings.tipAdjustmentX ? parseInt(settings.tipSettings.tipAdjustmentX) :0;
methods.bottom() ? (settings.$next_tip.css({
top:settings.$target.offset().top + nub_height + settings.$target.outerHeight() + topAdjustment,
left:settings.$target.offset().left + leftAdjustment
}), /right/i.test(settings.tipSettings.nubPosition) && settings.$next_tip.css("left", settings.$target.offset().left - settings.$next_tip.outerWidth() + settings.$target.outerWidth()), 
methods.nub_position($nub, settings.tipSettings.nubPosition, "top")) :methods.top() ? (settings.$next_tip.css({
top:settings.$target.offset().top - settings.$next_tip.outerHeight() - nub_height + topAdjustment,
left:settings.$target.offset().left + leftAdjustment
}), methods.nub_position($nub, settings.tipSettings.nubPosition, "bottom")) :methods.right() ? (settings.$next_tip.css({
top:settings.$target.offset().top + topAdjustment,
left:settings.$target.outerWidth() + settings.$target.offset().left + nub_width + leftAdjustment
}), methods.nub_position($nub, settings.tipSettings.nubPosition, "left")) :methods.left() && (settings.$next_tip.css({
top:settings.$target.offset().top + topAdjustment,
left:settings.$target.offset().left - settings.$next_tip.outerWidth() - nub_width + leftAdjustment
}), methods.nub_position($nub, settings.tipSettings.nubPosition, "right")), !methods.visible(methods.corners(settings.$next_tip)) && settings.attempts < settings.tipSettings.tipLocationPattern.length && ($nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), 
settings.tipSettings.tipLocation = settings.tipSettings.tipLocationPattern[settings.attempts], 
settings.attempts++, methods.pos_default(!0));
}
toggle && (settings.$next_tip.hide(), settings.$next_tip.css("visibility", "visible"));
},
pos_phone:function(init) {
var tip_height = settings.$next_tip.outerHeight(), target_height = (settings.$next_tip.offset(), 
settings.$target.outerHeight()), $nub = $(".joyride-nub", settings.$next_tip), nub_height = Math.ceil($nub.outerHeight() / 2), toggle = init || !1;
$nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), 
toggle && (settings.$next_tip.css("visibility", "hidden"), settings.$next_tip.show()), 
/body/i.test(settings.$target.selector) ? settings.$li.length && methods.pos_modal($nub) :methods.top() ? (settings.$next_tip.offset({
top:settings.$target.offset().top - tip_height - nub_height
}), $nub.addClass("bottom")) :(settings.$next_tip.offset({
top:settings.$target.offset().top + target_height + nub_height
}), $nub.addClass("top")), toggle && (settings.$next_tip.hide(), settings.$next_tip.css("visibility", "visible"));
},
pos_modal:function($nub) {
methods.center(), $nub.hide(), methods.show_modal();
},
show_modal:function() {
$(".joyride-modal-bg").length < 1 && $("body").append(settings.template.modal).show(), 
/pop/i.test(settings.tipAnimation) ? $(".joyride-modal-bg").show() :$(".joyride-modal-bg").fadeIn(settings.tipAnimationFadeSpeed);
},
expose:function() {
var expose, exposeCover, el, origCSS, randId = "expose-" + Math.floor(1e4 * Math.random());
if (arguments.length > 0 && arguments[0] instanceof $) el = arguments[0]; else {
if (!settings.$target || /body/i.test(settings.$target.selector)) return !1;
el = settings.$target;
}
return el.length < 1 ? (window.console && console.error("element not valid", el), 
!1) :(expose = $(settings.template.expose), settings.$body.append(expose), expose.css({
top:el.offset().top,
left:el.offset().left,
width:el.outerWidth(!0),
height:el.outerHeight(!0)
}), exposeCover = $(settings.template.exposeCover), origCSS = {
zIndex:el.css("z-index"),
position:el.css("position")
}, el.css("z-index", 1 * expose.css("z-index") + 1), "static" == origCSS.position && el.css("position", "relative"), 
el.data("expose-css", origCSS), exposeCover.css({
top:el.offset().top,
left:el.offset().left,
width:el.outerWidth(!0),
height:el.outerHeight(!0)
}), settings.$body.append(exposeCover), expose.addClass(randId), exposeCover.addClass(randId), 
settings.tipSettings.exposeClass && (expose.addClass(settings.tipSettings.exposeClass), 
exposeCover.addClass(settings.tipSettings.exposeClass)), el.data("expose", randId), 
settings.postExposeCallback(settings.$li.index(), settings.$next_tip, el), methods.add_exposed(el), 
void 0);
},
un_expose:function() {
var exposeId, el, expose, origCSS, clearAll = !1;
if (arguments.length > 0 && arguments[0] instanceof $) el = arguments[0]; else {
if (!settings.$target || /body/i.test(settings.$target.selector)) return !1;
el = settings.$target;
}
return el.length < 1 ? (window.console && console.error("element not valid", el), 
!1) :(exposeId = el.data("expose"), expose = $("." + exposeId), arguments.length > 1 && (clearAll = arguments[1]), 
clearAll === !0 ? $(".joyride-expose-wrapper,.joyride-expose-cover").remove() :expose.remove(), 
origCSS = el.data("expose-css"), "auto" == origCSS.zIndex ? el.css("z-index", "") :el.css("z-index", origCSS.zIndex), 
origCSS.position != el.css("position") && ("static" == origCSS.position ? el.css("position", "") :el.css("position", origCSS.position)), 
el.removeData("expose"), el.removeData("expose-z-index"), methods.remove_exposed(el), 
void 0);
},
add_exposed:function(el) {
settings.exposed = settings.exposed || [], el instanceof $ ? settings.exposed.push(el[0]) :"string" == typeof el && settings.exposed.push(el);
},
remove_exposed:function(el) {
var search;
el instanceof $ ? search = el[0] :"string" == typeof el && (search = el), settings.exposed = settings.exposed || [];
for (var i = 0; i < settings.exposed.length; i++) if (settings.exposed[i] == search) return settings.exposed.splice(i, 1), 
void 0;
},
center:function() {
var $w = settings.$window;
return settings.$next_tip.css({
top:($w.height() - settings.$next_tip.outerHeight()) / 2 + $w.scrollTop(),
left:($w.width() - settings.$next_tip.outerWidth()) / 2 + $w.scrollLeft()
}), !0;
},
bottom:function() {
return /bottom/i.test(settings.tipSettings.tipLocation);
},
top:function() {
return /top/i.test(settings.tipSettings.tipLocation);
},
right:function() {
return /right/i.test(settings.tipSettings.tipLocation);
},
left:function() {
return /left/i.test(settings.tipSettings.tipLocation);
},
corners:function(el) {
var w = settings.$window, window_half = w.height() / 2, tipOffset = Math.ceil(settings.$target.offset().top - window_half + settings.$next_tip.outerHeight()), right = w.width() + w.scrollLeft(), offsetBottom = w.height() + tipOffset, bottom = w.height() + w.scrollTop(), top = w.scrollTop();
return top > tipOffset && (top = 0 > tipOffset ? 0 :tipOffset), offsetBottom > bottom && (bottom = offsetBottom), 
[ el.offset().top < top, right < el.offset().left + el.outerWidth(), bottom < el.offset().top + el.outerHeight(), w.scrollLeft() > el.offset().left ];
},
visible:function(hidden_corners) {
for (var i = hidden_corners.length; i--; ) if (hidden_corners[i]) return !1;
return !0;
},
nub_position:function(nub, pos, def) {
"auto" === pos ? nub.addClass(def) :nub.addClass(pos);
},
startTimer:function() {
settings.$li.length ? settings.automate = setTimeout(function() {
methods.hide(), methods.show(), methods.startTimer();
}, settings.timer) :clearTimeout(settings.automate);
},
end:function() {
settings.cookieMonster && $.cookie(settings.cookieName, "ridden", {
expires:365,
domain:settings.cookieDomain,
path:settings.cookiePath
}), settings.localStorage && localStorage.setItem(settings.localStorageKey, !0), 
settings.timer > 0 && clearTimeout(settings.automate), settings.modal && settings.expose && methods.un_expose(), 
settings.$current_tip && settings.$current_tip.hide(), settings.$li && (settings.postStepCallback(settings.$li.index(), settings.$current_tip), 
settings.postRideCallback(settings.$li.index(), settings.$current_tip)), $(".joyride-modal-bg").hide();
},
jquery_check:function() {
return $.isFunction($.fn.on) ? !0 :($.fn.on = function(types, sel, fn) {
return this.delegate(sel, types, fn);
}, $.fn.off = function(types, sel, fn) {
return this.undelegate(sel, types, fn);
}, !1);
},
outerHTML:function(el) {
return el.outerHTML || new XMLSerializer().serializeToString(el);
},
version:function() {
return settings.version;
},
tabbable:function(el) {
$(el).on("keydown", function(event) {
if (!event.isDefaultPrevented() && event.keyCode && 27 === event.keyCode) return event.preventDefault(), 
methods.end(), void 0;
if (9 === event.keyCode) {
var tabbables = $(el).find(":tabbable"), first = tabbables.filter(":first"), last = tabbables.filter(":last");
event.target !== last[0] || event.shiftKey ? event.target === first[0] && event.shiftKey && (last.focus(1), 
event.preventDefault()) :(first.focus(1), event.preventDefault());
}
});
}
};
$.fn.joyride = function(method) {
return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof method && method ? ($.error("Method " + method + " does not exist on jQuery.joyride"), 
void 0) :methods.init.apply(this, arguments);
};
}(jQuery, this), /**
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
}(jQuery), function(factory) {
"function" == typeof define && define.amd ? define([ "jquery" ], factory) :factory(jQuery);
}(function($) {
function _parseSettings(settings) {
if (settings.minTime && (settings.minTime = _time2int(settings.minTime)), settings.maxTime && (settings.maxTime = _time2int(settings.maxTime)), 
settings.durationTime && "function" != typeof settings.durationTime && (settings.durationTime = _time2int(settings.durationTime)), 
settings.disableTimeRanges.length > 0) {
for (var i in settings.disableTimeRanges) settings.disableTimeRanges[i] = [ _time2int(settings.disableTimeRanges[i][0]), _time2int(settings.disableTimeRanges[i][1]) ];
settings.disableTimeRanges = settings.disableTimeRanges.sort(function(a, b) {
return a[0] - b[0];
});
}
return settings;
}
function _render(self) {
var settings = self.data("timepicker-settings"), list = self.data("timepicker-list");
list && list.length && (list.remove(), self.data("timepicker-list", !1)), list = $("<ul />", {
"class":"ui-timepicker-list"
});
var wrapped_list = $("<div />", {
"class":"ui-timepicker-wrapper",
tabindex:-1
});
wrapped_list.css({
display:"none",
position:"absolute"
}).append(list), settings.className && wrapped_list.addClass(settings.className), 
null === settings.minTime && null === settings.durationTime || !settings.showDuration || wrapped_list.addClass("ui-timepicker-with-duration");
var durStart = settings.minTime;
"function" == typeof settings.durationTime ? durStart = _time2int(settings.durationTime()) :null !== settings.durationTime && (durStart = settings.durationTime);
var start = null !== settings.minTime ? settings.minTime :0, end = null !== settings.maxTime ? settings.maxTime :start + _ONE_DAY - 1;
start >= end && (end += _ONE_DAY);
for (var dr = settings.disableTimeRanges, drCur = 0, drLen = dr.length, i = start; end >= i; i += 60 * settings.step) {
var timeInt = i % _ONE_DAY, row = $("<li />");
if (row.data("time", timeInt), row.text(_int2time(timeInt, settings.timeFormat)), 
(null !== settings.minTime || null !== settings.durationTime) && settings.showDuration) {
var duration = $("<span />");
duration.addClass("ui-timepicker-duration"), duration.text(" (" + _int2duration(i - durStart) + ")"), 
row.append(duration);
}
drLen > drCur && (timeInt >= dr[drCur][1] && (drCur += 1), dr[drCur] && timeInt >= dr[drCur][0] && timeInt < dr[drCur][1] && row.addClass("ui-timepicker-disabled")), 
list.append(row);
}
wrapped_list.data("timepicker-input", self), self.data("timepicker-list", wrapped_list);
var appendTo = settings.appendTo;
"string" == typeof appendTo ? appendTo = $(appendTo) :"function" == typeof appendTo && (appendTo = appendTo(self)), 
appendTo.append(wrapped_list), _setSelected(self, list), list.on("click", "li", function() {
self.off("focus.timepicker"), self.on("focus.timepicker-ie-hack", function() {
self.off("focus.timepicker-ie-hack"), self.on("focus.timepicker", methods.show);
}), _hideKeyboard(self) || self[0].focus(), list.find("li").removeClass("ui-timepicker-selected"), 
$(this).addClass("ui-timepicker-selected"), _selectValue(self) && (self.trigger("hideTimepicker"), 
wrapped_list.hide());
});
}
function _generateBaseDate() {
return new Date(1970, 1, 1, 0, 0, 0);
}
function _attachCloseHandler(settings) {
"ontouchstart" in document ? $("body").on("touchstart.ui-timepicker", _closeHandler) :($("body").on("mousedown.ui-timepicker", _closeHandler), 
settings.closeOnWindowScroll && $(window).on("scroll.ui-timepicker", _closeHandler));
}
function _closeHandler(e) {
var target = $(e.target), input = target.closest(".ui-timepicker-input");
0 === input.length && 0 === target.closest(".ui-timepicker-wrapper").length && (methods.hide(), 
$("body").unbind(".ui-timepicker"), $(window).unbind(".ui-timepicker"));
}
function _hideKeyboard(self) {
var settings = self.data("timepicker-settings");
return (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && settings.disableTouchKeyboard;
}
function _findRow(self, list, value) {
if (!value && 0 !== value) return !1;
var settings = self.data("timepicker-settings"), out = !1, halfStep = 30 * settings.step;
return list.find("li").each(function(i, obj) {
var jObj = $(obj), offset = jObj.data("time") - value;
return Math.abs(offset) < halfStep || offset == halfStep ? (out = jObj, !1) :void 0;
}), out;
}
function _setSelected(self, list) {
list.find("li").removeClass("ui-timepicker-selected");
var timeValue = _time2int(_getTimeValue(self));
if (null !== timeValue) {
var selected = _findRow(self, list, timeValue);
if (selected) {
var topDelta = selected.offset().top - list.offset().top;
(topDelta + selected.outerHeight() > list.outerHeight() || 0 > topDelta) && list.scrollTop(list.scrollTop() + selected.position().top - selected.outerHeight()), 
selected.addClass("ui-timepicker-selected");
}
}
}
function _formatValue() {
if ("" !== this.value) {
var self = $(this), list = self.data("timepicker-list");
if (!list || !list.is(":visible")) {
var seconds = _time2int(this.value);
if (null === seconds) return self.trigger("timeFormatError"), void 0;
var settings = self.data("timepicker-settings"), rangeError = !1;
if (null !== settings.minTime && seconds < settings.minTime ? rangeError = !0 :null !== settings.maxTime && seconds > settings.maxTime && (rangeError = !0), 
$.each(settings.disableTimeRanges, function() {
return seconds >= this[0] && seconds < this[1] ? (rangeError = !0, !1) :void 0;
}), settings.forceRoundTime) {
var offset = seconds % (60 * settings.step);
offset >= 30 * settings.step ? seconds += 60 * settings.step - offset :seconds -= offset;
}
var prettyTime = _int2time(seconds, settings.timeFormat);
rangeError ? _setTimeValue(self, prettyTime, "error") && self.trigger("timeRangeError") :_setTimeValue(self, prettyTime);
}
}
}
function _getTimeValue(self) {
return self.is("input") ? self.val() :self.data("ui-timepicker-value");
}
function _setTimeValue(self, value, source) {
return self.data("ui-timepicker-value", value), self.is("input") && self.val(value), 
self.data("ui-timepicker-value") != value ? ("select" == source ? self.trigger("selectTime").trigger("changeTime").trigger("change") :"error" != source && self.trigger("changeTime"), 
!0) :(self.trigger("selectTime"), !1);
}
function _keydownhandler(e) {
var self = $(this), list = self.data("timepicker-list");
if (!list || !list.is(":visible")) {
if (40 != e.keyCode) return _screenInput(e, self);
_hideKeyboard(self) || self.focus();
}
switch (e.keyCode) {
case 13:
return _selectValue(self) && methods.hide.apply(this), e.preventDefault(), !1;

case 38:
var selected = list.find(".ui-timepicker-selected");
return selected.length ? selected.is(":first-child") || (selected.removeClass("ui-timepicker-selected"), 
selected.prev().addClass("ui-timepicker-selected"), selected.prev().position().top < selected.outerHeight() && list.scrollTop(list.scrollTop() - selected.outerHeight())) :(list.find("li").each(function(i, obj) {
return $(obj).position().top > 0 ? (selected = $(obj), !1) :void 0;
}), selected.addClass("ui-timepicker-selected")), !1;

case 40:
return selected = list.find(".ui-timepicker-selected"), 0 === selected.length ? (list.find("li").each(function(i, obj) {
return $(obj).position().top > 0 ? (selected = $(obj), !1) :void 0;
}), selected.addClass("ui-timepicker-selected")) :selected.is(":last-child") || (selected.removeClass("ui-timepicker-selected"), 
selected.next().addClass("ui-timepicker-selected"), selected.next().position().top + 2 * selected.outerHeight() > list.outerHeight() && list.scrollTop(list.scrollTop() + selected.outerHeight())), 
!1;

case 27:
list.find("li").removeClass("ui-timepicker-selected"), methods.hide();
break;

case 9:
methods.hide();
break;

default:
return _screenInput(e, self);
}
}
function _screenInput(e, self) {
return !self.data("timepicker-settings").disableTextInput || e.ctrlKey || e.altKey || e.metaKey || 2 != e.keyCode && e.keyCode < 46;
}
function _keyuphandler(e) {
var self = $(this), list = self.data("timepicker-list");
if (!list || !list.is(":visible")) return !0;
switch (e.keyCode) {
case 96:
case 97:
case 98:
case 99:
case 100:
case 101:
case 102:
case 103:
case 104:
case 105:
case 48:
case 49:
case 50:
case 51:
case 52:
case 53:
case 54:
case 55:
case 56:
case 57:
case 65:
case 77:
case 80:
case 186:
case 8:
case 46:
_setSelected(self, list);
break;

default:
return;
}
}
function _selectValue(self) {
var settings = self.data("timepicker-settings"), list = self.data("timepicker-list"), timeValue = null, cursor = list.find(".ui-timepicker-selected");
if (cursor.hasClass("ui-timepicker-disabled")) return !1;
if (cursor.length ? timeValue = cursor.data("time") :_getTimeValue(self) && (timeValue = _time2int(_getTimeValue(self)), 
_setSelected(self, list)), null !== timeValue) {
var timeString = _int2time(timeValue, settings.timeFormat);
_setTimeValue(self, timeString, "select");
}
return !0;
}
function _int2duration(seconds) {
var duration, minutes = Math.round(seconds / 60);
if (Math.abs(minutes) < 60) duration = [ minutes, _lang.mins ]; else if (60 == minutes) duration = [ "1", _lang.hr ]; else {
var hours = (minutes / 60).toFixed(1);
"." != _lang.decimal && (hours = hours.replace(".", _lang.decimal)), duration = [ hours, _lang.hrs ];
}
return duration.join(" ");
}
function _int2time(seconds, format) {
if (null !== seconds) {
for (var hour, code, time = new Date(_baseDate.valueOf() + 1e3 * seconds), output = "", i = 0; i < format.length; i++) switch (code = format.charAt(i)) {
case "a":
output += time.getHours() > 11 ? "pm" :"am";
break;

case "A":
output += time.getHours() > 11 ? "PM" :"AM";
break;

case "g":
hour = time.getHours() % 12, output += 0 === hour ? "12" :hour;
break;

case "G":
output += time.getHours();
break;

case "h":
hour = time.getHours() % 12, 0 !== hour && 10 > hour && (hour = "0" + hour), output += 0 === hour ? "12" :hour;
break;

case "H":
hour = time.getHours(), output += hour > 9 ? hour :"0" + hour;
break;

case "i":
var minutes = time.getMinutes();
output += minutes > 9 ? minutes :"0" + minutes;
break;

case "s":
seconds = time.getSeconds(), output += seconds > 9 ? seconds :"0" + seconds;
break;

default:
output += code;
}
return output;
}
}
function _time2int(timeString) {
if ("" === timeString) return null;
if (!timeString || timeString + 0 == timeString) return timeString;
"object" == typeof timeString && (timeString = timeString.getHours() + ":" + _pad2(timeString.getMinutes()) + ":" + _pad2(timeString.getSeconds())), 
timeString = timeString.toLowerCase();
{
var time;
new Date(0);
}
if (-1 === timeString.indexOf(":") ? (time = timeString.match(/^([0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/), 
time || (time = timeString.match(/^([0-2][0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/))) :time = timeString.match(/^(\d{1,2})(?::([0-5][0-9]))?(?::([0-5][0-9]))?\s*([pa]?)m?$/), 
!time) return null;
var hours, hour = parseInt(1 * time[1], 10);
hours = time[4] ? 12 == hour ? "p" == time[4] ? 12 :0 :hour + ("p" == time[4] ? 12 :0) :hour;
var minutes = 1 * time[2] || 0, seconds = 1 * time[3] || 0;
return 3600 * hours + 60 * minutes + seconds;
}
function _pad2(n) {
return ("0" + n).slice(-2);
}
var _baseDate = _generateBaseDate(), _ONE_DAY = 86400, _defaults = {
className:null,
minTime:null,
maxTime:null,
durationTime:null,
step:30,
showDuration:!1,
timeFormat:"g:ia",
scrollDefaultNow:!1,
scrollDefaultTime:!1,
selectOnBlur:!1,
disableTouchKeyboard:!0,
forceRoundTime:!1,
appendTo:"body",
disableTimeRanges:[],
closeOnWindowScroll:!1,
disableTextInput:!1
}, _lang = {
decimal:".",
mins:"mins",
hr:"hr",
hrs:"hrs"
}, methods = {
init:function(options) {
return this.each(function() {
var self = $(this);
if ("SELECT" == self[0].tagName) {
for (var attrs = {
type:"text",
value:self.val()
}, raw_attrs = self[0].attributes, i = 0; i < raw_attrs.length; i++) attrs[raw_attrs[i].nodeName] = raw_attrs[i].nodeValue;
var input = $("<input />", attrs);
self.replaceWith(input), self = input;
}
var settings = $.extend({}, _defaults);
options && (settings = $.extend(settings, options)), settings.lang && (_lang = $.extend(_lang, settings.lang)), 
settings = _parseSettings(settings), self.data("timepicker-settings", settings), 
self.prop("autocomplete", "off"), self.on("click.timepicker focus.timepicker", methods.show), 
self.on("change.timepicker", _formatValue), self.on("keydown.timepicker", _keydownhandler), 
self.on("keyup.timepicker", _keyuphandler), self.addClass("ui-timepicker-input"), 
_formatValue.call(self.get(0));
});
},
show:function() {
var self = $(this), settings = self.data("timepicker-settings");
_hideKeyboard(self) && self.blur();
var list = self.data("timepicker-list");
if (!self.prop("readonly") && (list && 0 !== list.length && "function" != typeof settings.durationTime || (_render(self), 
list = self.data("timepicker-list")), !list.is(":visible"))) {
methods.hide(), list.show(), self.offset().top + self.outerHeight(!0) + list.outerHeight() > $(window).height() + $(window).scrollTop() ? list.offset({
left:self.offset().left + parseInt(list.css("marginLeft").replace("px", ""), 10),
top:self.offset().top - list.outerHeight() + parseInt(list.css("marginTop").replace("px", ""), 10)
}) :list.offset({
left:self.offset().left + parseInt(list.css("marginLeft").replace("px", ""), 10),
top:self.offset().top + self.outerHeight() + parseInt(list.css("marginTop").replace("px", ""), 10)
});
var selected = list.find(".ui-timepicker-selected");
if (selected.length || (_getTimeValue(self) ? selected = _findRow(self, list, _time2int(_getTimeValue(self))) :settings.scrollDefaultNow ? selected = _findRow(self, list, _time2int(new Date())) :settings.scrollDefaultTime !== !1 && (selected = _findRow(self, list, _time2int(settings.scrollDefaultTime)))), 
selected && selected.length) {
var topOffset = list.scrollTop() + selected.position().top - selected.outerHeight();
list.scrollTop(topOffset);
} else list.scrollTop(0);
_attachCloseHandler(settings), self.trigger("showTimepicker");
}
},
hide:function() {
$(".ui-timepicker-wrapper:visible").each(function() {
var list = $(this), self = list.data("timepicker-input"), settings = self.data("timepicker-settings");
settings && settings.selectOnBlur && _selectValue(self), list.hide(), self.trigger("hideTimepicker");
});
},
option:function(key, value) {
var self = this, settings = self.data("timepicker-settings"), list = self.data("timepicker-list");
if ("object" == typeof key) settings = $.extend(settings, key); else if ("string" == typeof key && "undefined" != typeof value) settings[key] = value; else if ("string" == typeof key) return settings[key];
return settings = _parseSettings(settings), self.data("timepicker-settings", settings), 
list && (list.remove(), self.data("timepicker-list", !1)), self;
},
getSecondsFromMidnight:function() {
return _time2int(_getTimeValue(this));
},
getTime:function(relative_date) {
var self = this;
return relative_date || (relative_date = new Date()), relative_date.setHours(0, 0, 0, 0), 
new Date(relative_date.valueOf() + 1e3 * _time2int(_getTimeValue(self)));
},
setTime:function(value) {
var self = this, prettyTime = _int2time(_time2int(value), self.data("timepicker-settings").timeFormat);
_setTimeValue(self, prettyTime), self.data("timepicker-list") && _setSelected(self, self.data("timepicker-list"));
},
remove:function() {
var self = this;
self.hasClass("ui-timepicker-input") && (self.removeAttr("autocomplete", "off"), 
self.removeClass("ui-timepicker-input"), self.removeData("timepicker-settings"), 
self.off(".timepicker"), self.data("timepicker-list") && self.data("timepicker-list").remove(), 
self.removeData("timepicker-list"));
}
};
$.fn.timepicker = function(method) {
return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof method && method ? ($.error("Method " + method + " does not exist on jQuery.timepicker"), 
void 0) :methods.init.apply(this, arguments);
};
}), /*
  Forked Version of
  jQuery Tags Input Plugin 1.3.3

  Copyright (c) 2011 XOXCO, Inc

  Documentation for this plugin lives here:
  **NEVER UPGRADE**
  http://xoxco.com/clickable/jquery-tags-input
  **NEVER UPGRADE**

  Licensed under the MIT license:
  http://www.opensource.org/licenses/mit-license.php

  forked by: shiv@hackerrank.com
  author: ben@xoxco.com
*/
function($) {
var delimiter = new Array(), tags_callbacks = new Array();
$.fn.doAutosize = function(o) {
var minWidth = $(this).data("minwidth"), maxWidth = $(this).data("maxwidth"), val = "", input = $(this), testSubject = $("#" + $(this).data("tester_id"));
if (val !== (val = input.val())) {
var escaped = val.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
testSubject.html(escaped);
var testerWidth = testSubject.width(), newWidth = testerWidth + o.comfortZone >= minWidth ? testerWidth + o.comfortZone :minWidth, currentWidth = input.width(), isValidWidthChange = currentWidth > newWidth && newWidth >= minWidth || newWidth > minWidth && maxWidth > newWidth;
isValidWidthChange && input.width(newWidth);
}
}, $.fn.resetAutosize = function(options) {
var minWidth = $(this).data("minwidth") || options.minInputWidth || $(this).width(), maxWidth = $(this).data("maxwidth") || options.maxInputWidth || $(this).closest(".tagsinput").width() - options.inputPadding, input = $(this), testSubject = $("<tester/>").css({
position:"absolute",
top:-9999,
left:-9999,
width:"auto",
fontSize:input.css("fontSize"),
fontFamily:input.css("fontFamily"),
fontWeight:input.css("fontWeight"),
letterSpacing:input.css("letterSpacing"),
whiteSpace:"nowrap"
}), testerId = $(this).attr("id") + "_autosize_tester";
!$("#" + testerId).length > 0 && (testSubject.attr("id", testerId), testSubject.appendTo("body")), 
input.data("minwidth", minWidth), input.data("maxwidth", maxWidth), input.data("tester_id", testerId), 
input.css("width", minWidth);
}, $.fn.addTag = function(value, options) {
return options = jQuery.extend({
focus:!1,
callback:!0
}, options), this.each(function() {
var id = $(this).attr("id"), tagslist = $(this).val().split(delimiter[id]);
if ("" == tagslist[0] && (tagslist = new Array()), value = jQuery.trim(value), options.unique) {
var skipTag = $(this).tagExist(value);
1 == skipTag && $("#" + id + "_tag").addClass("not_valid");
} else var skipTag = !1;
if ("" != value && 1 != skipTag) {
if ($("<span>").addClass("tag").append($("<span>").text(value).append("&nbsp;&nbsp;"), $("<a>", {
href:"#",
title:"Removing tag",
text:"x"
}).click(function() {
return $("#" + id).removeTag(escape(value));
})).insertBefore("#" + id + "_addTag"), tagslist.push(value), $("#" + id + "_tag").val(""), 
options.focus ? $("#" + id + "_tag").focus() :$("#" + id + "_tag").blur(), $.fn.tagsInput.updateTagsField(this, tagslist), 
options.callback && tags_callbacks[id] && tags_callbacks[id].onAddTag) {
var f = tags_callbacks[id].onAddTag;
f.call(this, value);
}
if (!options.silent && tags_callbacks[id] && tags_callbacks[id].onChange) {
var i = tagslist.length, f = tags_callbacks[id].onChange;
f.call(this, $(this), tagslist[i - 1]);
}
}
}), !1;
}, $.fn.removeTag = function(value) {
return value = unescape(value), this.each(function() {
var id = $(this).attr("id"), old = $(this).val().split(delimiter[id]);
for ($("#" + id + "_tagsinput .tag").remove(), str = "", i = 0; i < old.length; i++) old[i] != value && (str = str + delimiter[id] + old[i]);
if ($.fn.tagsInput.silentImportTags(this, str), tags_callbacks[id] && tags_callbacks[id].onRemoveTag) {
var f = tags_callbacks[id].onRemoveTag;
f.call(this, value);
}
if (tags_callbacks[id] && tags_callbacks[id].onChange) {
var f = tags_callbacks[id].onChange;
f.call(this, $(this), []);
}
}), !1;
}, $.fn.tagExist = function(val) {
var id = $(this).attr("id"), tagslist = $(this).val().split(delimiter[id]);
return jQuery.inArray(val, tagslist) >= 0;
}, $.fn.importTags = function(str) {
id = $(this).attr("id"), $("#" + id + "_tagsinput .tag").remove(), $.fn.tagsInput.importTags(this, str);
}, $.fn.silentImportTags = function(str) {
id = $(this).attr("id"), $("#" + id + "_tagsinput .tag").remove(), $.fn.tagsInput.silentImportTags(this, str);
}, $.fn.tagsInput = function(options) {
var settings = jQuery.extend({
interactive:!0,
defaultText:"add a tag",
minChars:0,
width:"300px",
height:"100px",
autocomplete:{
selectFirst:!1
},
hide:!0,
delimiter:",",
unique:!0,
removeWithBackspace:!0,
placeholderColor:"#666666",
autosize:!0,
comfortZone:20,
inputPadding:12
}, options);
return this.each(function() {
settings.hide && $(this).hide();
var id = $(this).attr("id");
(!id || delimiter[$(this).attr("id")]) && (id = $(this).attr("id", "tags" + new Date().getTime()).attr("id"));
var data = jQuery.extend({
pid:id,
real_input:"#" + id,
holder:"#" + id + "_tagsinput",
input_wrapper:"#" + id + "_addTag",
fake_input:"#" + id + "_tag"
}, settings);
delimiter[id] = data.delimiter, (settings.onAddTag || settings.onRemoveTag || settings.onChange) && (tags_callbacks[id] = new Array(), 
tags_callbacks[id].onAddTag = settings.onAddTag, tags_callbacks[id].onRemoveTag = settings.onRemoveTag, 
tags_callbacks[id].onChange = settings.onChange);
var markup = '<div id="' + id + '_tagsinput" class="tagsinput"><div id="' + id + '_addTag">';
if (settings.interactive && (markup = markup + '<input id="' + id + '_tag" value="" data-default="' + settings.defaultText + '" />'), 
markup += '</div><div class="tags_clear"></div></div>', $(markup).insertAfter(this), 
$(data.holder).css("width", settings.width), $(data.holder).css("min-height", settings.height), 
$(data.holder).css("height", "100%"), "" != $(data.real_input).val() && $.fn.tagsInput.importTags($(data.real_input), $(data.real_input).val()), 
settings.interactive) {
if ($(data.fake_input).val($(data.fake_input).attr("data-default")), $(data.fake_input).css("color", settings.placeholderColor), 
$(data.fake_input).resetAutosize(settings), $(data.holder).bind("click", data, function(event) {
$(event.data.fake_input).focus();
}), $(data.fake_input).bind("focus", data, function(event) {
$(event.data.fake_input).val() == $(event.data.fake_input).attr("data-default") && $(event.data.fake_input).val(""), 
$(event.data.fake_input).css("color", "#000000");
}), void 0 != settings.autocomplete_url) {
autocomplete_options = {
source:settings.autocomplete_url
};
for (attrname in settings.autocomplete) autocomplete_options[attrname] = settings.autocomplete[attrname];
void 0 !== jQuery.Autocompleter ? ($(data.fake_input).autocomplete(settings.autocomplete_url, settings.autocomplete), 
$(data.fake_input).bind("result", data, function(event, data) {
data && $("#" + id).addTag(data[0] + "", {
focus:!0,
unique:settings.unique
});
})) :void 0 !== jQuery.ui.autocomplete && ($(data.fake_input).autocomplete(autocomplete_options), 
$(data.fake_input).bind("autocompleteselect", data, function(event, ui) {
return $(event.data.real_input).addTag(ui.item.value, {
focus:!0,
unique:settings.unique
}), !1;
}));
} else $(data.fake_input).bind("blur", data, function(event) {
var d = $(this).attr("data-default");
return "" != $(event.data.fake_input).val() && $(event.data.fake_input).val() != d ? event.data.minChars <= $(event.data.fake_input).val().length && (!event.data.maxChars || event.data.maxChars >= $(event.data.fake_input).val().length) && $(event.data.real_input).addTag($(event.data.fake_input).val(), {
focus:!0,
unique:settings.unique
}) :($(event.data.fake_input).val($(event.data.fake_input).attr("data-default")), 
$(event.data.fake_input).css("color", settings.placeholderColor)), !1;
});
$(data.fake_input).bind("keypress", data, function(event) {
return event.which == event.data.delimiter.charCodeAt(0) || 13 == event.which ? (event.preventDefault(), 
event.data.minChars <= $(event.data.fake_input).val().length && (!event.data.maxChars || event.data.maxChars >= $(event.data.fake_input).val().length) && $(event.data.real_input).addTag($(event.data.fake_input).val(), {
focus:!0,
unique:settings.unique
}), $(event.data.fake_input).resetAutosize(settings), !1) :(event.data.autosize && $(event.data.fake_input).doAutosize(settings), 
void 0);
}), data.removeWithBackspace && $(data.fake_input).bind("keydown", function(event) {
if (8 == event.keyCode && "" == $(this).val()) {
event.preventDefault();
var last_tag = $(this).closest(".tagsinput").find(".tag:last").text(), id = $(this).attr("id").replace(/_tag$/, "");
last_tag = last_tag.replace(/[\s]+x$/, ""), $("#" + id).removeTag(escape(last_tag)), 
$(this).trigger("focus");
}
}), $(data.fake_input).blur(), data.unique && $(data.fake_input).keydown(function(event) {
(8 == event.keyCode || String.fromCharCode(event.which).match(/\w+|[áéíóúÁÉÍÓÚñÑ,/]+/)) && $(this).removeClass("not_valid");
});
}
}), this;
}, $.fn.tagsInput.updateTagsField = function(obj, tagslist) {
var id = $(obj).attr("id");
$(obj).val(tagslist.join(delimiter[id]));
}, $.fn.tagsInput.importTags = function(obj, val) {
$(obj).val("");
var id = $(obj).attr("id"), tags = val.split(delimiter[id]);
for (i = 0; i < tags.length; i++) $(obj).addTag(tags[i], {
focus:!1,
callback:!1
});
if (tags_callbacks[id] && tags_callbacks[id].onChange) {
var f = tags_callbacks[id].onChange;
f.call(obj, obj, tags[i]);
}
}, $.fn.tagsInput.silentImportTags = function(obj, val) {
$(obj).val("");
var id = $(obj).attr("id"), tags = val.split(delimiter[id]);
for (i = 0; i < tags.length; i++) $(obj).addTag(tags[i], {
focus:!1,
callback:!1,
silent:!0
});
};
}(jQuery), function($) {
"use strict";
$.ajaxPrefilter(function(options) {
return options.iframe ? (options.originalURL = options.url, "iframe") :void 0;
}), $.ajaxTransport("iframe", function(options, origOptions) {
function cleanUp() {
markers.prop("disabled", !1), form.remove(), iframe.one("load", function() {
iframe.remove();
}), iframe.attr("src", "javascript:false;");
}
var form = null, iframe = null, name = "iframe-" + $.now(), files = $(options.files).filter(":file:enabled"), markers = null, accepts = null;
return options.dataTypes.shift(), options.data = origOptions.data, files.length ? (form = $("<form enctype='multipart/form-data' method='post'></form>").hide().attr({
action:options.originalURL,
target:name
}), "string" == typeof options.data && options.data.length > 0 && $.error("data must not be serialized"), 
$.each(options.data || {}, function(name, value) {
$.isPlainObject(value) && (name = value.name, value = value.value), $("<input type='hidden' />").attr({
name:name,
value:value
}).appendTo(form);
}), $("<input type='hidden' value='IFrame' name='X-Requested-With' />").appendTo(form), 
accepts = options.dataTypes[0] && options.accepts[options.dataTypes[0]] ? options.accepts[options.dataTypes[0]] + ("*" !== options.dataTypes[0] ? ", */*; q=0.01" :"") :options.accepts["*"], 
$("<input type='hidden' name='X-HTTP-Accept'>").attr("value", accepts).appendTo(form), 
markers = files.after(function() {
return $(this).clone().prop("disabled", !0);
}).next(), files.appendTo(form), {
send:function(headers, completeCallback) {
iframe = $("<iframe src='javascript:false;' name='" + name + "' id='" + name + "' style='display:none'></iframe>"), 
iframe.one("load", function() {
iframe.one("load", function() {
var doc = this.contentWindow ? this.contentWindow.document :this.contentDocument ? this.contentDocument :this.document, root = doc.documentElement ? doc.documentElement :doc.body, textarea = root.getElementsByTagName("textarea")[0], type = textarea && textarea.getAttribute("data-type") || null, status = textarea && textarea.getAttribute("data-status") || 200, statusText = textarea && textarea.getAttribute("data-statusText") || "OK", content = {
html:root.innerHTML,
text:type ? textarea.value :root ? root.textContent || root.innerText :null
};
cleanUp(), completeCallback(status, statusText, content, type ? "Content-Type: " + type :null);
}), form[0].submit();
}), $("body").append(form, iframe);
},
abort:function() {
null !== iframe && (iframe.unbind("load").attr("src", "javascript:false;"), cleanUp());
}
}) :void 0;
});
}(jQuery), function($) {
function Countdown() {
function timerCallBack(timestamp) {
var drawStart = 1e12 > timestamp ? perfAvail ? performance.now() + performance.timing.navigationStart :now() :timestamp || now();
drawStart - animationStartTime >= 1e3 && (plugin._updateTargets(), animationStartTime = drawStart), 
requestAnimationFrame(timerCallBack);
}
this.regional = [], this.regional[""] = {
labels:[ "Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds" ],
labels1:[ "Year", "Month", "Week", "Day", "Hour", "Minute", "Second" ],
compactLabels:[ "y", "m", "w", "d" ],
whichLabels:null,
digits:[ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ],
timeSeparator:":",
isRTL:!1
}, this._defaults = {
until:null,
since:null,
timezone:null,
serverSync:null,
format:"dHMS",
layout:"",
compact:!1,
significant:0,
description:"",
expiryUrl:"",
expiryText:"",
alwaysExpire:!1,
onExpiry:null,
onTick:null,
tickInterval:1
}, $.extend(this._defaults, this.regional[""]), this._serverSyncs = [];
var now = "function" == typeof Date.now ? Date.now :function() {
return new Date().getTime();
}, perfAvail = window.performance && "function" == typeof window.performance.now, requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null, animationStartTime = 0;
!requestAnimationFrame || $.noRequestAnimationFrame ? ($.noRequestAnimationFrame = null, 
setInterval(function() {
plugin._updateTargets();
}, 980)) :(animationStartTime = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || now(), 
requestAnimationFrame(timerCallBack));
}
function isNotChained(command, otherArgs) {
return "option" == command && (0 == otherArgs.length || 1 == otherArgs.length && "string" == typeof otherArgs[0]) ? !0 :$.inArray(command, getters) > -1;
}
var Y = 0, O = 1, W = 2, D = 3, H = 4, M = 5, S = 6;
$.extend(Countdown.prototype, {
markerClassName:"hasCountdown",
propertyName:"countdown",
_rtlClass:"countdown_rtl",
_sectionClass:"countdown_section",
_amountClass:"countdown_amount",
_rowClass:"countdown_row",
_holdingClass:"countdown_holding",
_showClass:"countdown_show",
_descrClass:"countdown_descr",
_timerTargets:[],
setDefaults:function(options) {
this._resetExtraLabels(this._defaults, options), $.extend(this._defaults, options || {});
},
UTCDate:function(tz, year, month, day, hours, mins, secs, ms) {
"object" == typeof year && year.constructor == Date && (ms = year.getMilliseconds(), 
secs = year.getSeconds(), mins = year.getMinutes(), hours = year.getHours(), day = year.getDate(), 
month = year.getMonth(), year = year.getFullYear());
var d = new Date();
return d.setUTCFullYear(year), d.setUTCDate(1), d.setUTCMonth(month || 0), d.setUTCDate(day || 1), 
d.setUTCHours(hours || 0), d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? 60 * tz :tz)), 
d.setUTCSeconds(secs || 0), d.setUTCMilliseconds(ms || 0), d;
},
periodsToSeconds:function(periods) {
return 31557600 * periods[0] + 2629800 * periods[1] + 604800 * periods[2] + 86400 * periods[3] + 3600 * periods[4] + 60 * periods[5] + periods[6];
},
_attachPlugin:function(target, options) {
if (target = $(target), !target.hasClass(this.markerClassName)) {
var inst = {
options:$.extend({}, this._defaults),
_periods:[ 0, 0, 0, 0, 0, 0, 0 ]
};
target.addClass(this.markerClassName).data(this.propertyName, inst), this._optionPlugin(target, options);
}
},
_addTarget:function(target) {
this._hasTarget(target) || this._timerTargets.push(target);
},
_hasTarget:function(target) {
return $.inArray(target, this._timerTargets) > -1;
},
_removeTarget:function(target) {
this._timerTargets = $.map(this._timerTargets, function(value) {
return value == target ? null :value;
});
},
_updateTargets:function() {
for (var i = this._timerTargets.length - 1; i >= 0; i--) this._updateCountdown(this._timerTargets[i]);
},
_optionPlugin:function(target, options, value) {
target = $(target);
var inst = target.data(this.propertyName);
if (!options || "string" == typeof options && null == value) {
var name = options;
return options = (inst || {}).options, options && name ? options[name] :options;
}
if (target.hasClass(this.markerClassName)) {
if (options = options || {}, "string" == typeof options) {
var name = options;
options = {}, options[name] = value;
}
options.layout && (options.layout = options.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), 
this._resetExtraLabels(inst.options, options);
var timezoneChanged = inst.options.timezone != options.timezone;
$.extend(inst.options, options), this._adjustSettings(target, inst, null != options.until || null != options.since || timezoneChanged);
var now = new Date();
(inst._since && inst._since < now || inst._until && inst._until > now) && this._addTarget(target[0]), 
this._updateCountdown(target, inst);
}
},
_updateCountdown:function(target, inst) {
var $target = $(target);
if (inst = inst || $target.data(this.propertyName)) {
if ($target.html(this._generateHTML(inst)).toggleClass(this._rtlClass, inst.options.isRTL), 
$.isFunction(inst.options.onTick)) {
var periods = "lap" != inst._hold ? inst._periods :this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
(1 == inst.options.tickInterval || this.periodsToSeconds(periods) % inst.options.tickInterval == 0) && inst.options.onTick.apply(target, [ periods ]);
}
var expired = "pause" != inst._hold && (inst._since ? inst._now.getTime() < inst._since.getTime() :inst._now.getTime() >= inst._until.getTime());
if (expired && !inst._expiring) {
if (inst._expiring = !0, this._hasTarget(target) || inst.options.alwaysExpire) {
if (this._removeTarget(target), $.isFunction(inst.options.onExpiry) && inst.options.onExpiry.apply(target, []), 
inst.options.expiryText) {
var layout = inst.options.layout;
inst.options.layout = inst.options.expiryText, this._updateCountdown(target, inst), 
inst.options.layout = layout;
}
inst.options.expiryUrl && (window.location = inst.options.expiryUrl);
}
inst._expiring = !1;
} else "pause" == inst._hold && this._removeTarget(target);
$target.data(this.propertyName, inst);
}
},
_resetExtraLabels:function(base, options) {
var changingLabels = !1;
for (var n in options) if ("whichLabels" != n && n.match(/[Ll]abels/)) {
changingLabels = !0;
break;
}
if (changingLabels) for (var n in base) n.match(/[Ll]abels[02-9]|compactLabels1/) && (base[n] = null);
},
_adjustSettings:function(target, inst, recalc) {
for (var now, serverOffset = 0, serverEntry = null, i = 0; i < this._serverSyncs.length; i++) if (this._serverSyncs[i][0] == inst.options.serverSync) {
serverEntry = this._serverSyncs[i][1];
break;
}
if (null != serverEntry) serverOffset = inst.options.serverSync ? serverEntry :0, 
now = new Date(); else {
var serverResult = $.isFunction(inst.options.serverSync) ? inst.options.serverSync.apply(target, []) :null;
now = new Date(), serverOffset = serverResult ? now.getTime() - serverResult.getTime() :0, 
this._serverSyncs.push([ inst.options.serverSync, serverOffset ]);
}
var timezone = inst.options.timezone;
timezone = null == timezone ? -now.getTimezoneOffset() :timezone, (recalc || !recalc && null == inst._until && null == inst._since) && (inst._since = inst.options.since, 
null != inst._since && (inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null)), 
inst._since && serverOffset && inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset)), 
inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now)), 
serverOffset && inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset)), 
inst._show = this._determineShow(inst);
},
_destroyPlugin:function(target) {
target = $(target), target.hasClass(this.markerClassName) && (this._removeTarget(target[0]), 
target.removeClass(this.markerClassName).empty().removeData(this.propertyName));
},
_pausePlugin:function(target) {
this._hold(target, "pause");
},
_lapPlugin:function(target) {
this._hold(target, "lap");
},
_resumePlugin:function(target) {
this._hold(target, null);
},
_hold:function(target, hold) {
var inst = $.data(target, this.propertyName);
if (inst) {
if ("pause" == inst._hold && !hold) {
inst._periods = inst._savePeriods;
var sign = inst._since ? "-" :"+";
inst[inst._since ? "_since" :"_until"] = this._determineTime(sign + inst._periods[0] + "y" + sign + inst._periods[1] + "o" + sign + inst._periods[2] + "w" + sign + inst._periods[3] + "d" + sign + inst._periods[4] + "h" + sign + inst._periods[5] + "m" + sign + inst._periods[6] + "s"), 
this._addTarget(target);
}
inst._hold = hold, inst._savePeriods = "pause" == hold ? inst._periods :null, $.data(target, this.propertyName, inst), 
this._updateCountdown(target, inst);
}
},
_getTimesPlugin:function(target) {
var inst = $.data(target, this.propertyName);
return inst ? "pause" == inst._hold ? inst._savePeriods :inst._hold ? this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()) :inst._periods :null;
},
_determineTime:function(setting, defaultTime) {
var offsetNumeric = function(offset) {
var time = new Date();
return time.setTime(time.getTime() + 1e3 * offset), time;
}, offsetString = function(offset) {
offset = offset.toLowerCase();
for (var time = new Date(), year = time.getFullYear(), month = time.getMonth(), day = time.getDate(), hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds(), pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, matches = pattern.exec(offset); matches; ) {
switch (matches[2] || "s") {
case "s":
second += parseInt(matches[1], 10);
break;

case "m":
minute += parseInt(matches[1], 10);
break;

case "h":
hour += parseInt(matches[1], 10);
break;

case "d":
day += parseInt(matches[1], 10);
break;

case "w":
day += 7 * parseInt(matches[1], 10);
break;

case "o":
month += parseInt(matches[1], 10), day = Math.min(day, plugin._getDaysInMonth(year, month));
break;

case "y":
year += parseInt(matches[1], 10), day = Math.min(day, plugin._getDaysInMonth(year, month));
}
matches = pattern.exec(offset);
}
return new Date(year, month, day, hour, minute, second, 0);
}, time = null == setting ? defaultTime :"string" == typeof setting ? offsetString(setting) :"number" == typeof setting ? offsetNumeric(setting) :setting;
return time && time.setMilliseconds(0), time;
},
_getDaysInMonth:function(year, month) {
return 32 - new Date(year, month, 32).getDate();
},
_normalLabels:function(num) {
return num;
},
_generateHTML:function(inst) {
var self = this;
inst._periods = inst._hold ? inst._periods :this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
for (var shownNonZero = !1, showCount = 0, sigCount = inst.options.significant, show = $.extend({}, inst._show), period = Y; S >= period; period++) shownNonZero |= "?" == inst._show[period] && inst._periods[period] > 0, 
show[period] = "?" != inst._show[period] || shownNonZero ? inst._show[period] :null, 
showCount += show[period] ? 1 :0, sigCount -= inst._periods[period] > 0 ? 1 :0;
for (var showSignificant = [ !1, !1, !1, !1, !1, !1, !1 ], period = S; period >= Y; period--) inst._show[period] && (inst._periods[period] ? showSignificant[period] = !0 :(showSignificant[period] = sigCount > 0, 
sigCount--));
var labels = inst.options.compact ? inst.options.compactLabels :inst.options.labels, whichLabels = inst.options.whichLabels || this._normalLabels, showCompact = function(period) {
var labelsNum = inst.options["compactLabels" + whichLabels(inst._periods[period])];
return show[period] ? self._translateDigits(inst, inst._periods[period]) + (labelsNum ? labelsNum[period] :labels[period]) + " " :"";
}, showFull = function(period) {
var labelsNum = inst.options["labels" + whichLabels(inst._periods[period])];
return !inst.options.significant && show[period] || inst.options.significant && showSignificant[period] ? '<span class="' + plugin._sectionClass + '"><span class="' + plugin._amountClass + '">' + self._translateDigits(inst, inst._periods[period]) + "</span><br/>" + (labelsNum ? labelsNum[period] :labels[period]) + "</span>" :"";
};
return inst.options.layout ? this._buildLayout(inst, show, inst.options.layout, inst.options.compact, inst.options.significant, showSignificant) :(inst.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (inst._hold ? " " + this._holdingClass :"") + '">' + showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + (show[H] ? this._minDigits(inst, inst._periods[H], 2) :"") + (show[M] ? (show[H] ? inst.options.timeSeparator :"") + this._minDigits(inst, inst._periods[M], 2) :"") + (show[S] ? (show[H] || show[M] ? inst.options.timeSeparator :"") + this._minDigits(inst, inst._periods[S], 2) :"") :'<span class="' + this._rowClass + " " + this._showClass + (inst.options.significant || showCount) + (inst._hold ? " " + this._holdingClass :"") + '">' + showFull(Y) + showFull(O) + showFull(W) + showFull(D) + showFull(H) + showFull(M) + showFull(S)) + "</span>" + (inst.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + inst.options.description + "</span>" :"");
},
_buildLayout:function(inst, show, layout, compact, significant, showSignificant) {
for (var labels = inst.options[compact ? "compactLabels" :"labels"], whichLabels = inst.options.whichLabels || this._normalLabels, labelFor = function(index) {
return (inst.options[(compact ? "compactLabels" :"labels") + whichLabels(inst._periods[index])] || labels)[index];
}, digit = function(value, position) {
return inst.options.digits[Math.floor(value / position) % 10];
}, subs = {
desc:inst.options.description,
sep:inst.options.timeSeparator,
yl:labelFor(Y),
yn:this._minDigits(inst, inst._periods[Y], 1),
ynn:this._minDigits(inst, inst._periods[Y], 2),
ynnn:this._minDigits(inst, inst._periods[Y], 3),
y1:digit(inst._periods[Y], 1),
y10:digit(inst._periods[Y], 10),
y100:digit(inst._periods[Y], 100),
y1000:digit(inst._periods[Y], 1e3),
ol:labelFor(O),
on:this._minDigits(inst, inst._periods[O], 1),
onn:this._minDigits(inst, inst._periods[O], 2),
onnn:this._minDigits(inst, inst._periods[O], 3),
o1:digit(inst._periods[O], 1),
o10:digit(inst._periods[O], 10),
o100:digit(inst._periods[O], 100),
o1000:digit(inst._periods[O], 1e3),
wl:labelFor(W),
wn:this._minDigits(inst, inst._periods[W], 1),
wnn:this._minDigits(inst, inst._periods[W], 2),
wnnn:this._minDigits(inst, inst._periods[W], 3),
w1:digit(inst._periods[W], 1),
w10:digit(inst._periods[W], 10),
w100:digit(inst._periods[W], 100),
w1000:digit(inst._periods[W], 1e3),
dl:labelFor(D),
dn:this._minDigits(inst, inst._periods[D], 1),
dnn:this._minDigits(inst, inst._periods[D], 2),
dnnn:this._minDigits(inst, inst._periods[D], 3),
d1:digit(inst._periods[D], 1),
d10:digit(inst._periods[D], 10),
d100:digit(inst._periods[D], 100),
d1000:digit(inst._periods[D], 1e3),
hl:labelFor(H),
hn:this._minDigits(inst, inst._periods[H], 1),
hnn:this._minDigits(inst, inst._periods[H], 2),
hnnn:this._minDigits(inst, inst._periods[H], 3),
h1:digit(inst._periods[H], 1),
h10:digit(inst._periods[H], 10),
h100:digit(inst._periods[H], 100),
h1000:digit(inst._periods[H], 1e3),
ml:labelFor(M),
mn:this._minDigits(inst, inst._periods[M], 1),
mnn:this._minDigits(inst, inst._periods[M], 2),
mnnn:this._minDigits(inst, inst._periods[M], 3),
m1:digit(inst._periods[M], 1),
m10:digit(inst._periods[M], 10),
m100:digit(inst._periods[M], 100),
m1000:digit(inst._periods[M], 1e3),
sl:labelFor(S),
sn:this._minDigits(inst, inst._periods[S], 1),
snn:this._minDigits(inst, inst._periods[S], 2),
snnn:this._minDigits(inst, inst._periods[S], 3),
s1:digit(inst._periods[S], 1),
s10:digit(inst._periods[S], 10),
s100:digit(inst._periods[S], 100),
s1000:digit(inst._periods[S], 1e3)
}, html = layout, i = Y; S >= i; i++) {
var period = "yowdhms".charAt(i), re = new RegExp("\\{" + period + "<\\}([\\s\\S]*)\\{" + period + ">\\}", "g");
html = html.replace(re, !significant && show[i] || significant && showSignificant[i] ? "$1" :"");
}
return $.each(subs, function(n, v) {
var re = new RegExp("\\{" + n + "\\}", "g");
html = html.replace(re, v);
}), html;
},
_minDigits:function(inst, value, len) {
return value = "" + value, value.length >= len ? this._translateDigits(inst, value) :(value = "0000000000" + value, 
this._translateDigits(inst, value.substr(value.length - len)));
},
_translateDigits:function(inst, value) {
return ("" + value).replace(/[0-9]/g, function(digit) {
return inst.options.digits[digit];
});
},
_determineShow:function(inst) {
var format = inst.options.format, show = [];
return show[Y] = format.match("y") ? "?" :format.match("Y") ? "!" :null, show[O] = format.match("o") ? "?" :format.match("O") ? "!" :null, 
show[W] = format.match("w") ? "?" :format.match("W") ? "!" :null, show[D] = format.match("d") ? "?" :format.match("D") ? "!" :null, 
show[H] = format.match("h") ? "?" :format.match("H") ? "!" :null, show[M] = format.match("m") ? "?" :format.match("M") ? "!" :null, 
show[S] = format.match("s") ? "?" :format.match("S") ? "!" :null, show;
},
_calculatePeriods:function(inst, show, significant, now) {
inst._now = now, inst._now.setMilliseconds(0);
var until = new Date(inst._now.getTime());
inst._since ? now.getTime() < inst._since.getTime() ? inst._now = now = until :now = inst._since :(until.setTime(inst._until.getTime()), 
now.getTime() > inst._until.getTime() && (inst._now = now = until));
var periods = [ 0, 0, 0, 0, 0, 0, 0 ];
if (show[Y] || show[O]) {
var lastNow = plugin._getDaysInMonth(now.getFullYear(), now.getMonth()), lastUntil = plugin._getDaysInMonth(until.getFullYear(), until.getMonth()), sameDay = until.getDate() == now.getDate() || until.getDate() >= Math.min(lastNow, lastUntil) && now.getDate() >= Math.min(lastNow, lastUntil), getSecs = function(date) {
return 60 * (60 * date.getHours() + date.getMinutes()) + date.getSeconds();
}, months = Math.max(0, 12 * (until.getFullYear() - now.getFullYear()) + until.getMonth() - now.getMonth() + (until.getDate() < now.getDate() && !sameDay || sameDay && getSecs(until) < getSecs(now) ? -1 :0));
periods[Y] = show[Y] ? Math.floor(months / 12) :0, periods[O] = show[O] ? months - 12 * periods[Y] :0, 
now = new Date(now.getTime());
var wasLastDay = now.getDate() == lastNow, lastDay = plugin._getDaysInMonth(now.getFullYear() + periods[Y], now.getMonth() + periods[O]);
now.getDate() > lastDay && now.setDate(lastDay), now.setFullYear(now.getFullYear() + periods[Y]), 
now.setMonth(now.getMonth() + periods[O]), wasLastDay && now.setDate(lastDay);
}
var diff = Math.floor((until.getTime() - now.getTime()) / 1e3), extractPeriod = function(period, numSecs) {
periods[period] = show[period] ? Math.floor(diff / numSecs) :0, diff -= periods[period] * numSecs;
};
if (extractPeriod(W, 604800), extractPeriod(D, 86400), extractPeriod(H, 3600), extractPeriod(M, 60), 
extractPeriod(S, 1), diff > 0 && !inst._since) for (var multiplier = [ 1, 12, 4.3482, 7, 24, 60, 60 ], lastShown = S, max = 1, period = S; period >= Y; period--) show[period] && (periods[lastShown] >= max && (periods[lastShown] = 0, 
diff = 1), diff > 0 && (periods[period]++, diff = 0, lastShown = period, max = 1)), 
max *= multiplier[period];
if (significant) for (var period = Y; S >= period; period++) significant && periods[period] ? significant-- :significant || (periods[period] = 0);
return periods;
}
});
var getters = [ "getTimes" ];
$.fn.countdown = function(options) {
var otherArgs = Array.prototype.slice.call(arguments, 1);
return isNotChained(options, otherArgs) ? plugin["_" + options + "Plugin"].apply(plugin, [ this[0] ].concat(otherArgs)) :this.each(function() {
if ("string" == typeof options) {
if (!plugin["_" + options + "Plugin"]) throw "Unknown command: " + options;
plugin["_" + options + "Plugin"].apply(plugin, [ this ].concat(otherArgs));
} else plugin._attachPlugin(this, options || {});
});
};
var plugin = $.countdown = new Countdown();
}(jQuery), function($) {
function operate(input, direct, method) {
var node = input[0];
if (state = /er/.test(method) ? _indeterminate :/bl/.test(method) ? _disabled :_checked, 
active = method == _update ? {
checked:node[_checked],
disabled:node[_disabled],
indeterminate:"true" == input.attr(_indeterminate) || "false" == input.attr(_determinate)
} :node[state], /^(ch|di|in)/.test(method) && !active) on(input, state); else if (/^(un|en|de)/.test(method) && active) off(input, state); else if (method == _update) for (var state in active) active[state] ? on(input, state, !0) :off(input, state, !0); else direct && "toggle" != method || (direct || input[_callback]("ifClicked"), 
active ? node[_type] !== _radio && off(input, state) :on(input, state));
}
function on(input, state, keep) {
var node = input[0], parent = input.parent(), checked = state == _checked, indeterminate = state == _indeterminate, callback = indeterminate ? _determinate :checked ? _unchecked :"enabled", regular = option(node, callback + capitalize(node[_type])), specific = option(node, state + capitalize(node[_type]));
if (node[state] !== !0) {
if (!keep && state == _checked && node[_type] == _radio && node.name) {
var form = input.closest("form"), inputs = 'input[name="' + node.name + '"]';
inputs = form.length ? form.find(inputs) :$(inputs), inputs.each(function() {
this !== node && $.data(this, _iCheck) && off($(this), state);
});
}
indeterminate ? (node[state] = !0, node[_checked] && off(input, _checked, "force")) :(keep || (node[state] = !0), 
checked && node[_indeterminate] && off(input, _indeterminate, !1)), callbacks(input, checked, state, keep);
}
node[_disabled] && option(node, _cursor, !0) && parent.find("." + _iCheckHelper).css(_cursor, "default"), 
parent[_add](specific || option(node, state)), parent[_remove](regular || option(node, callback) || "");
}
function off(input, state, keep) {
var node = input[0], parent = input.parent(), checked = state == _checked, indeterminate = state == _indeterminate, callback = indeterminate ? _determinate :checked ? _unchecked :"enabled", regular = option(node, callback + capitalize(node[_type])), specific = option(node, state + capitalize(node[_type]));
node[state] !== !1 && ((indeterminate || !keep || "force" == keep) && (node[state] = !1), 
callbacks(input, checked, callback, keep)), !node[_disabled] && option(node, _cursor, !0) && parent.find("." + _iCheckHelper).css(_cursor, "pointer"), 
parent[_remove](specific || option(node, state) || ""), parent[_add](regular || option(node, callback));
}
function tidy(node, callback) {
if ($.data(node, _iCheck)) {
var input = $(node);
input.parent().html(input.attr("style", $.data(node, _iCheck).s || "")[_callback](callback || "")), 
input.off(".i").unwrap(), $(_label + '[for="' + node.id + '"]').add(input.closest(_label)).off(".i");
}
}
function option(node, state, regular) {
return $.data(node, _iCheck) ? $.data(node, _iCheck).o[state + (regular ? "" :"Class")] :void 0;
}
function capitalize(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
function callbacks(input, checked, callback, keep) {
keep || (checked && input[_callback]("ifToggled"), input[_callback]("ifChanged")[_callback]("if" + capitalize(callback)));
}
var _iCheck = "iCheck", _iCheckHelper = _iCheck + "-helper", _checkbox = "checkbox", _radio = "radio", _checked = "checked", _unchecked = "un" + _checked, _disabled = "disabled", _determinate = "determinate", _indeterminate = "in" + _determinate, _update = "update", _type = "type", _click = "click", _touch = "touchbegin.i touchend.i", _add = "addClass", _remove = "removeClass", _callback = "trigger", _label = "label", _cursor = "cursor", _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
$.fn[_iCheck] = function(options, fire) {
var handle = ":" + _checkbox + ", :" + _radio, stack = $(), walker = function(object) {
object.each(function() {
var self = $(this);
stack = self.is(handle) ? stack.add(self) :stack.add(self.find(handle));
});
};
if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) return options = options.toLowerCase(), 
walker(this), stack.each(function() {
"destroy" == options ? tidy(this, "ifDestroyed") :operate($(this), !0, options), 
$.isFunction(fire) && fire();
});
if ("object" != typeof options && options) return this;
var settings = $.extend({
checkedClass:_checked,
disabledClass:_disabled,
indeterminateClass:_indeterminate,
labelHover:!0
}, options), selector = settings.handle, hoverClass = settings.hoverClass || "hover", focusClass = settings.focusClass || "focus", activeClass = settings.activeClass || "active", labelHover = !!settings.labelHover, labelHoverClass = settings.labelHoverClass || "hover", area = 0 | ("" + settings.increaseArea).replace("%", "");
return (selector == _checkbox || selector == _radio) && (handle = ":" + selector), 
-50 > area && (area = -50), walker(this), stack.each(function() {
tidy(this);
var self = $(this), node = this, id = node.id, offset = -area + "%", size = 100 + 2 * area + "%", layer = {
position:"absolute",
top:offset,
left:offset,
display:"block",
width:size,
height:size,
margin:0,
padding:0,
background:"#fff",
border:0,
opacity:0
}, hide = _mobile ? {
position:"absolute",
visibility:"hidden"
} :area ? layer :{
position:"absolute",
opacity:0
}, className = node[_type] == _checkbox ? settings.checkboxClass || "i" + _checkbox :settings.radioClass || "i" + _radio, label = $(_label + '[for="' + id + '"]').add(self.closest(_label)), parent = self.wrap('<div class="' + className + '"/>')[_callback]("ifCreated").parent().append(settings.insert), helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent);
self.data(_iCheck, {
o:settings,
s:self.attr("style")
}).css(hide), !!settings.inheritClass && parent[_add](node.className), !!settings.inheritID && id && parent.attr("id", _iCheck + "-" + id), 
"static" == parent.css("position") && parent.css("position", "relative"), operate(self, !0, _update), 
label.length && label.on(_click + ".i mouseenter.i mouseleave.i " + _touch, function(event) {
var type = event[_type], item = $(this);
if (!node[_disabled]) {
if (type == _click ? operate(self, !1, !0) :labelHover && (/ve|nd/.test(type) ? (parent[_remove](hoverClass), 
item[_remove](labelHoverClass)) :(parent[_add](hoverClass), item[_add](labelHoverClass))), 
!_mobile) return !1;
event.stopPropagation();
}
}), self.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i", function(event) {
var type = event[_type], key = event.keyCode;
return type == _click ? !1 :"keydown" == type && 32 == key ? (node[_type] == _radio && node[_checked] || (node[_checked] ? off(self, _checked) :on(self, _checked)), 
!1) :("keyup" == type && node[_type] == _radio ? !node[_checked] && on(self, _checked) :/us|ur/.test(type) && parent["blur" == type ? _remove :_add](focusClass), 
void 0);
}), helper.on(_click + " mousedown mouseup mouseover mouseout " + _touch, function(event) {
var type = event[_type], toggle = /wn|up/.test(type) ? activeClass :hoverClass;
if (!node[_disabled]) {
if (type == _click ? operate(self, !1, !0) :(/wn|er|in/.test(type) ? parent[_add](toggle) :parent[_remove](toggle + " " + activeClass), 
label.length && labelHover && toggle == hoverClass && label[/ut|nd/.test(type) ? _remove :_add](labelHoverClass)), 
!_mobile) return !1;
event.stopPropagation();
}
});
});
};
}(jQuery), function() {
function $(expr, con) {
return [].slice.call((con || document).querySelectorAll(expr));
}
if (window.addEventListener) {
var self = window.StyleFix = {
link:function(link) {
try {
if ("stylesheet" !== link.rel || link.hasAttribute("data-noprefix")) return;
} catch (e) {
return;
}
var process, url = link.href || link.getAttribute("data-href"), base = url.replace(/[^\/]+$/, ""), base_scheme = (/^[a-z]{3,10}:/.exec(base) || [ "" ])[0], base_domain = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(base) || [ "" ])[0], base_query = /^([^?]*)\??/.exec(url)[1], parent = link.parentNode, xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
4 === xhr.readyState && process();
}, process = function() {
var css = xhr.responseText;
if (css && link.parentNode && (!xhr.status || xhr.status < 400 || xhr.status > 600)) {
if (css = self.fix(css, !0, link), base) {
css = css.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function($0, quote, url) {
return /^([a-z]{3,10}:|#)/i.test(url) ? $0 :/^\/\//.test(url) ? 'url("' + base_scheme + url + '")' :/^\//.test(url) ? 'url("' + base_domain + url + '")' :/^\?/.test(url) ? 'url("' + base_query + url + '")' :'url("' + base + url + '")';
});
var escaped_base = base.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1");
css = css.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + escaped_base, "gi"), "$1");
}
var style = document.createElement("style");
style.textContent = css, style.media = link.media, style.disabled = link.disabled, 
style.setAttribute("data-href", link.getAttribute("href")), parent.insertBefore(style, link), 
parent.removeChild(link), style.media = link.media;
}
};
try {
xhr.open("GET", url), xhr.send(null);
} catch (e) {
"undefined" != typeof XDomainRequest && (xhr = new XDomainRequest(), xhr.onerror = xhr.onprogress = function() {}, 
xhr.onload = process, xhr.open("GET", url), xhr.send(null));
}
link.setAttribute("data-inprogress", "");
},
styleElement:function(style) {
if (!style.hasAttribute("data-noprefix")) {
var disabled = style.disabled;
style.textContent = self.fix(style.textContent, !0, style), style.disabled = disabled;
}
},
styleAttribute:function(element) {
var css = element.getAttribute("style");
css = self.fix(css, !1, element), element.setAttribute("style", css);
},
process:function() {
$('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link), $("style").forEach(StyleFix.styleElement), 
$("[style]").forEach(StyleFix.styleAttribute);
},
register:function(fixer, index) {
(self.fixers = self.fixers || []).splice(void 0 === index ? self.fixers.length :index, 0, fixer);
},
fix:function(css, raw, element) {
for (var i = 0; i < self.fixers.length; i++) css = self.fixers[i](css, raw, element) || css;
return css;
},
camelCase:function(str) {
return str.replace(/-([a-z])/g, function($0, $1) {
return $1.toUpperCase();
}).replace("-", "");
},
deCamelCase:function(str) {
return str.replace(/[A-Z]/g, function($0) {
return "-" + $0.toLowerCase();
});
}
};
!function() {
setTimeout(function() {
$('link[rel="stylesheet"]').forEach(StyleFix.link);
}, 10), document.addEventListener("DOMContentLoaded", StyleFix.process, !1);
}();
}
}(), function(root) {
function fix(what, before, after, replacement, css) {
if (what = self[what], what.length) {
var regex = RegExp(before + "(" + what.join("|") + ")" + after, "gi");
css = css.replace(regex, replacement);
}
return css;
}
if (window.StyleFix && window.getComputedStyle) {
var self = window.PrefixFree = {
prefixCSS:function(css, raw) {
var prefix = self.prefix;
if (self.functions.indexOf("linear-gradient") > -1 && (css = css.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/gi, function($0, delim, repeating, deg) {
return delim + (repeating || "") + "linear-gradient(" + (90 - deg) + "deg";
})), css = fix("functions", "(\\s|:|,)", "\\s*\\(", "$1" + prefix + "$2(", css), 
css = fix("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + prefix + "$2$3", css), 
css = fix("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + prefix + "$2:", css), self.properties.length) {
var regex = RegExp("\\b(" + self.properties.join("|") + ")(?!:)", "gi");
css = fix("valueProperties", "\\b", ":(.+?);", function($0) {
return $0.replace(regex, prefix + "$1");
}, css);
}
return raw && (css = fix("selectors", "", "\\b", self.prefixSelector, css), css = fix("atrules", "@", "\\b", "@" + prefix + "$1", css)), 
css = css.replace(RegExp("-" + prefix, "g"), "-"), css = css.replace(/-\*-(?=[a-z]+)/gi, self.prefix);
},
property:function(property) {
return (self.properties.indexOf(property) >= 0 ? self.prefix :"") + property;
},
value:function(value, property) {
return value = fix("functions", "(^|\\s|,)", "\\s*\\(", "$1" + self.prefix + "$2(", value), 
value = fix("keywords", "(^|\\s)", "(\\s|$)", "$1" + self.prefix + "$2$3", value), 
self.valueProperties.indexOf(property) >= 0 && (value = fix("properties", "(^|\\s|,)", "($|\\s|,)", "$1" + self.prefix + "$2$3", value)), 
value;
},
prefixSelector:function(selector) {
return selector.replace(/^:{1,2}/, function($0) {
return $0 + self.prefix;
});
},
prefixProperty:function(property, camelCase) {
var prefixed = self.prefix + property;
return camelCase ? StyleFix.camelCase(prefixed) :prefixed;
}
};
!function() {
var prefixes = {}, properties = [], style = getComputedStyle(document.documentElement, null), dummy = document.createElement("div").style, iterate = function(property) {
if ("-" === property.charAt(0)) {
properties.push(property);
var parts = property.split("-"), prefix = parts[1];
for (prefixes[prefix] = ++prefixes[prefix] || 1; parts.length > 3; ) {
parts.pop();
var shorthand = parts.join("-");
supported(shorthand) && -1 === properties.indexOf(shorthand) && properties.push(shorthand);
}
}
}, supported = function(property) {
return StyleFix.camelCase(property) in dummy;
};
if (style.length > 0) for (var i = 0; i < style.length; i++) iterate(style[i]); else for (var property in style) iterate(StyleFix.deCamelCase(property));
var highest = {
uses:0
};
for (var prefix in prefixes) {
var uses = prefixes[prefix];
highest.uses < uses && (highest = {
prefix:prefix,
uses:uses
});
}
self.prefix = "-" + highest.prefix + "-", self.Prefix = StyleFix.camelCase(self.prefix), 
self.properties = [];
for (var i = 0; i < properties.length; i++) {
var property = properties[i];
if (0 === property.indexOf(self.prefix)) {
var unprefixed = property.slice(self.prefix.length);
supported(unprefixed) || self.properties.push(unprefixed);
}
}
"Ms" != self.Prefix || "transform" in dummy || "MsTransform" in dummy || !("msTransform" in dummy) || self.properties.push("transform", "transform-origin"), 
self.properties.sort();
}(), function() {
function supported(value, property) {
return style[property] = "", style[property] = value, !!style[property];
}
var functions = {
"linear-gradient":{
property:"backgroundImage",
params:"red, teal"
},
calc:{
property:"width",
params:"1px + 5%"
},
element:{
property:"backgroundImage",
params:"#foo"
},
"cross-fade":{
property:"backgroundImage",
params:"url(a.png), url(b.png), 50%"
}
};
functions["repeating-linear-gradient"] = functions["repeating-radial-gradient"] = functions["radial-gradient"] = functions["linear-gradient"];
var keywords = {
initial:"color",
"zoom-in":"cursor",
"zoom-out":"cursor",
box:"display",
flexbox:"display",
"inline-flexbox":"display",
flex:"display",
"inline-flex":"display",
grid:"display",
"inline-grid":"display",
"min-content":"width"
};
self.functions = [], self.keywords = [];
var style = document.createElement("div").style;
for (var func in functions) {
var test = functions[func], property = test.property, value = func + "(" + test.params + ")";
!supported(value, property) && supported(self.prefix + value, property) && self.functions.push(func);
}
for (var keyword in keywords) {
var property = keywords[keyword];
!supported(keyword, property) && supported(self.prefix + keyword, property) && self.keywords.push(keyword);
}
}(), function() {
function supported(selector) {
return style.textContent = selector + "{}", !!style.sheet.cssRules.length;
}
var selectors = {
":read-only":null,
":read-write":null,
":any-link":null,
"::selection":null
}, atrules = {
keyframes:"name",
viewport:null,
document:'regexp(".")'
};
self.selectors = [], self.atrules = [];
var style = root.appendChild(document.createElement("style"));
for (var selector in selectors) {
var test = selector + (selectors[selector] ? "(" + selectors[selector] + ")" :"");
!supported(test) && supported(self.prefixSelector(test)) && self.selectors.push(selector);
}
for (var atrule in atrules) {
var test = atrule + " " + (atrules[atrule] || "");
!supported("@" + test) && supported("@" + self.prefix + test) && self.atrules.push(atrule);
}
root.removeChild(style);
}(), self.valueProperties = [ "transition", "transition-property" ], root.className += " " + self.prefix, 
StyleFix.register(self.prefixCSS);
}
}(document.documentElement), window.Modernizr = function(a, b, c) {
function C(a) {
j.cssText = a;
}
function D(a, b) {
return C(n.join(a + ";") + (b || ""));
}
function E(a, b) {
return typeof a === b;
}
function F(a, b) {
return !!~("" + a).indexOf(b);
}
function G(a, b) {
for (var d in a) {
var e = a[d];
if (!F(e, "-") && j[e] !== c) return "pfx" == b ? e :!0;
}
return !1;
}
function H(a, b, d) {
for (var e in a) {
var f = b[a[e]];
if (f !== c) return d === !1 ? a[e] :E(f, "function") ? f.bind(d || b) :f;
}
return !1;
}
function I(a, b, c) {
var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + p.join(d + " ") + d).split(" ");
return E(b, "string") || E(b, "undefined") ? G(e, b) :(e = (a + " " + q.join(d + " ") + d).split(" "), 
H(e, b, c));
}
var k, x, B, d = "2.6.2", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, l = ":)", m = {}.toString, n = " -webkit- -moz- -o- -ms- ".split(" "), o = "Webkit Moz O ms", p = o.split(" "), q = o.toLowerCase().split(" "), r = {
svg:"http://www.w3.org/2000/svg"
}, s = {}, v = [], w = v.slice, y = function(a, c, d, e) {
var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body");
if (parseInt(d, 10)) for (;d--; ) j = b.createElement("div"), j.id = e ? e[d] :h + (d + 1), 
l.appendChild(j);
return f = [ "&#173;", '<style id="s', h, '">', a, "</style>" ].join(""), l.id = h, 
(m ? l :n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", 
k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), 
m ? l.parentNode.removeChild(l) :(n.parentNode.removeChild(n), g.style.overflow = k), 
!!i;
}, z = function() {
function d(d, e) {
e = e || b.createElement(a[d] || "div"), d = "on" + d;
var f = d in e;
return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), 
f = E(e[d], "function"), E(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), 
e = null, f;
}
var a = {
select:"input",
change:"input",
submit:"form",
reset:"form",
error:"img",
load:"img",
abort:"img"
};
return d;
}(), A = {}.hasOwnProperty;
B = E(A, "undefined") || E(A.call, "undefined") ? function(a, b) {
return b in a && E(a.constructor.prototype[b], "undefined");
} :function(a, b) {
return A.call(a, b);
}, Function.prototype.bind || (Function.prototype.bind = function(b) {
var c = this;
if ("function" != typeof c) throw new TypeError();
var d = w.call(arguments, 1), e = function() {
if (this instanceof e) {
var a = function() {};
a.prototype = c.prototype;
var f = new a(), g = c.apply(f, d.concat(w.call(arguments)));
return Object(g) === g ? g :f;
}
return c.apply(b, d.concat(w.call(arguments)));
};
return e;
}), s.flexbox = function() {
return I("flexWrap");
}, s.flexboxlegacy = function() {
return I("boxDirection");
}, s.canvas = function() {
var a = b.createElement("canvas");
return !!a.getContext && !!a.getContext("2d");
}, s.canvastext = function() {
return !!e.canvas && !!E(b.createElement("canvas").getContext("2d").fillText, "function");
}, s.webgl = function() {
return !!a.WebGLRenderingContext;
}, s.touch = function() {
var c;
return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 :y([ "@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}" ].join(""), function(a) {
c = 9 === a.offsetTop;
}), c;
}, s.geolocation = function() {
return "geolocation" in navigator;
}, s.history = function() {
return !!a.history && !!history.pushState;
}, s.draganddrop = function() {
var a = b.createElement("div");
return "draggable" in a || "ondragstart" in a && "ondrop" in a;
}, s.rgba = function() {
return C("background-color:rgba(150,255,150,.5)"), F(j.backgroundColor, "rgba");
}, s.hsla = function() {
return C("background-color:hsla(120,40%,100%,.5)"), F(j.backgroundColor, "rgba") || F(j.backgroundColor, "hsla");
}, s.multiplebgs = function() {
return C("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background);
}, s.backgroundsize = function() {
return I("backgroundSize");
}, s.borderimage = function() {
return I("borderImage");
}, s.borderradius = function() {
return I("borderRadius");
}, s.boxshadow = function() {
return I("boxShadow");
}, s.textshadow = function() {
return "" === b.createElement("div").style.textShadow;
}, s.opacity = function() {
return D("opacity:.55"), /^0.55$/.test(j.opacity);
}, s.cssanimations = function() {
return I("animationName");
}, s.csscolumns = function() {
return I("columnCount");
}, s.cssgradients = function() {
var a = "background-image:", b = "gradient(linear,left top,right bottom,from(#9f9),to(white));", c = "linear-gradient(left top,#9f9, white);";
return C((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), 
F(j.backgroundImage, "gradient");
}, s.cssreflections = function() {
return I("boxReflect");
}, s.csstransforms = function() {
return !!I("transform");
}, s.csstransforms3d = function() {
var a = !!I("perspective");
return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b) {
a = 9 === b.offsetLeft && 3 === b.offsetHeight;
}), a;
}, s.csstransitions = function() {
return I("transition");
}, s.fontface = function() {
var a;
return y('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
var e = b.getElementById("smodernizr"), f = e.sheet || e.styleSheet, g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText :f.cssText || "" :"";
a = /src/i.test(g) && 0 === g.indexOf(d.split(" ")[0]);
}), a;
}, s.generatedcontent = function() {
var a;
return y([ "#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}' ].join(""), function(b) {
a = b.offsetHeight >= 3;
}), a;
}, s.video = function() {
var a = b.createElement("video"), c = !1;
try {
(c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), 
c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
} catch (d) {}
return c;
}, s.audio = function() {
var a = b.createElement("audio"), c = !1;
try {
(c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), 
c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), 
c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""));
} catch (d) {}
return c;
}, s.applicationcache = function() {
return !!a.applicationCache;
}, s.svg = function() {
return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect;
}, s.inlinesvg = function() {
var a = b.createElement("div");
return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg;
}, s.smil = function() {
return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")));
}, s.svgclippaths = function() {
return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")));
};
for (var J in s) B(s, J) && (x = J.toLowerCase(), e[x] = s[J](), v.push((e[x] ? "" :"no-") + x));
return e.addTest = function(a, b) {
if ("object" == typeof a) for (var d in a) B(a, d) && e.addTest(d, a[d]); else {
if (a = a.toLowerCase(), e[a] !== c) return e;
b = "function" == typeof b ? b() :b, "undefined" != typeof f && f && (g.className += " mod_" + (b ? "" :"no-") + a), 
e[a] = b;
}
return e;
}, C(""), i = k = null, function(a, b) {
function k(a, b) {
var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild);
}
function l() {
var a = r.elements;
return "string" == typeof a ? a.split(" ") :a;
}
function m(a) {
var b = i[a[g]];
return b || (b = {}, h++, a[g] = h, i[h] = b), b;
}
function n(a, c, f) {
if (c || (c = b), j) return c.createElement(a);
f || (f = m(c));
var g;
return g = f.cache[a] ? f.cache[a].cloneNode() :e.test(a) ? (f.cache[a] = f.createElem(a)).cloneNode() :f.createElem(a), 
g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) :g;
}
function o(a, c) {
if (a || (a = b), j) return a.createDocumentFragment();
c = c || m(a);
for (var d = c.frag.cloneNode(), e = 0, f = l(), g = f.length; g > e; e++) d.createElement(f[e]);
return d;
}
function p(a, b) {
b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, 
b.frag = b.createFrag()), a.createElement = function(c) {
return r.shivMethods ? n(c, a, b) :b.createElem(c);
}, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function(a) {
return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
}) + ");return n}")(r, b.frag);
}
function q(a) {
a || (a = b);
var c = m(a);
return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), 
j || p(a, c), a;
}
var f, j, c = a.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, g = "_html5shiv", h = 0, i = {};
!function() {
try {
var a = b.createElement("a");
a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = 1 == a.childNodes.length || function() {
b.createElement("a");
var a = b.createDocumentFragment();
return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement;
}();
} catch (c) {
f = !0, j = !0;
}
}();
var r = {
elements:c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
shivCSS:c.shivCSS !== !1,
supportsUnknownElements:j,
shivMethods:c.shivMethods !== !1,
type:"default",
shivDocument:q,
createElement:n,
createDocumentFragment:o
};
a.html5 = r, q(b);
}(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, 
e.hasEvent = z, e.testProp = function(a) {
return G([ a ]);
}, e.testAllProps = I, e.testStyles = y, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " mod_js mod_" + v.join(" mod_") :""), 
e;
}(this, this.document), function(a, b, c) {
function d(a) {
return "[object Function]" == o.call(a);
}
function e(a) {
return "string" == typeof a;
}
function f() {}
function g(a) {
return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
}
function h() {
var a = p.shift();
q = 1, a ? a.t ? m(function() {
("c" == a.t ? B.injectCss :B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
}, 0) :(a(), h()) :q = 0;
}
function i(a, c, d, e, f, i, j) {
function k(b) {
if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, 
b)) {
"img" != a && m(function() {
t.removeChild(l);
}, 50);
for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
}
}
var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {
t:d,
s:c,
e:f,
a:i,
x:j
};
1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c :(l.src = c, l.type = a), 
l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
k.call(this, r);
}, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null :n), 
m(k, j)) :y[c].push(l));
}
function j(a, b, c, d, f) {
return q = 0, b = b || "j", e(a) ? i("c" == b ? v :u, a, b, this.i++, c, d, f) :(p.splice(this.i++, 0, a), 
1 == p.length && h()), this;
}
function k() {
var a = B;
return a.loader = {
load:j,
i:0
}, a;
}
var A, B, l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l :n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" :l ? "script" :"img", v = l ? "script" :u, w = Array.isArray || function(a) {
return "[object Array]" == o.call(a);
}, x = [], y = {}, z = {
timeout:function(a, b) {
return b.length && (a.timeout = b[0]), a;
}
};
B = function(a) {
function b(a) {
var e, f, g, a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {
url:c,
origUrl:c,
prefixes:a
};
for (f = 0; d > f; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
for (f = 0; b > f; f++) c = x[f](c);
return c;
}
function g(a, e, f, g, h) {
var i = b(a), j = i.autoCallback;
i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e :e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), 
i.instead ? i.instead(a, e, f, g, h) :(y[i.url] ? i.noexec = !0 :y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" :c, i.noexec, i.attrs, i.timeout), 
(d(e) || d(j)) && f.load(function() {
k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2;
})));
}
function h(a, b) {
function c(a, c) {
if (a) {
if (e(a)) c || (j = function() {
var a = [].slice.call(arguments);
k.apply(this, a), l();
}), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function() {
var c, b = 0;
for (c in a) a.hasOwnProperty(c) && b++;
return b;
}(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
var a = [].slice.call(arguments);
k.apply(this, a), l();
} :j[n] = function(a) {
return function() {
var b = [].slice.call(arguments);
a && a.apply(this, b), l();
};
}(k[n])), g(a[n], j, b, n, h));
} else !c && l();
}
var m, n, h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f;
c(h ? a.yep :a.nope, !!i), i && c(i);
}
var i, j, l = this.yepnope.loader;
if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], 
e(j) ? g(j, 0, l, 0) :w(j) ? B(j) :Object(j) === j && h(j, l); else Object(a) === a && h(a, l);
}, B.addPrefix = function(a, b) {
z[a] = b;
}, B.addFilter = function(a) {
x.push(a);
}, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", 
b.addEventListener("DOMContentLoaded", A = function() {
b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete";
}, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
var l, o, k = b.createElement("script"), e = e || B.errorTimeout;
k.src = a;
for (o in d) k.setAttribute(o, d[o]);
c = j ? h :c || f, k.onreadystatechange = k.onload = function() {
!l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null);
}, m(function() {
l || (l = 1, c(1));
}, e), i ? k.onload() :n.parentNode.insertBefore(k, n);
}, a.yepnope.injectCss = function(a, c, d, e, g, i) {
var j, e = b.createElement("link"), c = i ? h :c || f;
e.href = a, e.rel = "stylesheet", e.type = "text/css";
for (j in d) e.setAttribute(j, d[j]);
g || (n.parentNode.insertBefore(e, n), m(c, 0));
};
}(this, document), Modernizr.load = function() {
yepnope.apply(window, [].slice.call(arguments, 0));
}, Modernizr.addTest("csscalc", function() {
var a = "width:", b = "calc(10px);", c = document.createElement("div");
return c.style.cssText = a + Modernizr._prefixes.join(b + a), !!c.style.length;
}), Modernizr.addTest("fullscreen", function() {
for (var a = 0; a < Modernizr._domPrefixes.length; a++) if (document[Modernizr._domPrefixes[a].toLowerCase() + "CancelFullScreen"]) return !0;
return !!document.cancelFullScreen || !1;
}), Modernizr.addTest("cssresize", Modernizr.testAllProps("resize")), Modernizr.addTest("ie8compat", function() {
return !window.addEventListener && document.documentMode && 7 === document.documentMode;
}), function() {
var codeshellfn, __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
codeshellfn = function($, window) {
return $.widget("hr.codeshell", {
options:{},
_options:{
showSave:!1,
showCustomInput:!0,
showCompileTest:!0,
showSubmit:!1,
showUploadCode:!1,
showFullScreen:!1,
showTheme:!1,
languages:[ "c", "cpp", "java", "csharp", "haskell", "php", "python", "perl", "ruby", "bash", "oracle", "mysql", "sql", "clojure", "scala", "code", "text", "brainfuck", "javascript", "d", "go", "lua", "erlang", "sbcl", "ocaml", "pascal", "python3", "groovy", "text_pseudo", "objectivec", "fsharp", "visualbasic", "cobol" ],
language:"c",
showTemplate:!0,
autoSaveNamespace:null,
onSave:null,
autoSave:null,
firstLineNumber:1,
initialCode:"",
compile_button_text:"Compile &amp; Test",
submit_button_text:"Submit Code",
lang_line_nos:{},
lang_mime_mapping:{
c:"text/x-csrc",
cpp:"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
haskell:"text/x-haskell",
php:"text/x-php",
python:"text/x-python",
perl:"text/x-perl",
ruby:"text/x-ruby",
bash:"text/x-bash",
oracle:"text/x-plsql",
mysql:"text/x-plsql",
sql:"text/x-plsql",
clojure:"text/x-scheme",
scala:"text/x-scala",
code:"text/plain",
text:"text/plain",
brainfuck:"text/plain",
javascript:"text/javascript",
d:"text/x-d",
go:"text/x-go",
lua:"text/x-lua",
erlang:"text/x-erlang",
sbcl:"text/x-common-lisp",
ocaml:"text/x-ocaml",
pascal:"text/x-pascal",
python3:"text/x-python",
groovy:"text/x-groovy",
text_pseudo:"text/plain",
objectivec:"text/x-csrc",
fsharp:"text/x-fsharp",
visualbasic:"text/x-vb",
cobol:"text/x-cobol"
},
lang_display_mapping:{
c:"C",
cpp:"C++",
java:"Java",
csharp:"C#",
haskell:"Haskell",
php:"PHP",
python:"Python 2",
ruby:"Ruby",
perl:"Perl",
bash:"BASH",
oracle:"Oracle",
mysql:"MySQL",
sql:"SQL",
clojure:"Clojure",
scala:"Scala",
code:"Generic",
text:"Plain Text",
brainfuck:"Brainfuck",
javascript:"Javascript",
lua:"Lua",
sbcl:"Lisp",
erlang:"Erlang",
go:"Go",
d:"D",
ocaml:"OCaml",
pascal:"Pascal",
python3:"Python 3",
groovy:"Groovy",
objectivec:"Objective C",
text_pseudo:"Plain Text",
fsharp:"F#",
visualbasic:"VB.NET",
cobol:"COBOL"
},
default_head_end:{
c:"/* Head ends here */",
cpp:"/* Head ends here */",
java:"/* Head ends here */",
csharp:"/* Head ends here */",
haskell:"-- Head ends here",
php:"/* Head ends here */",
python:"# Head ends here",
perl:"# Head ends here",
ruby:"# Head ends here",
bash:"# Head ends here",
clojure:"; Head ends here",
scala:"/* Head ends here */",
sbcl:"; Head ends here",
lua:"-- Head ends here",
javascript:"/* Head ends here */",
pascal:"{ Head ends here }",
python3:"# Head ends here",
groovy:"// Head ends here",
objectivec:"// Head ends here",
fsharp:"// Head ends here",
visualbasic:"' Head ends here",
cobol:"* Head ends here"
},
lang_fold_mapping:{
c:"brace",
cpp:"brace",
java:"brace",
csharp:"brace",
haskell:"indent",
php:"brace",
python:"indent",
ruby:"indent",
perl:"brace",
bash:"brace",
oracle:"indent",
mysql:"indent",
sql:"indent",
clojure:"indent",
scala:"brace",
code:"brace",
text:"indent",
brainfuck:"indent",
javascript:"brace",
lua:"indent",
sbcl:"indent",
erlang:"indent",
go:"brace",
d:"brace",
ocaml:"indent",
pascal:"indent",
python3:"indent",
groovy:"brace",
objectivec:"brace",
text_pseudo:"indent",
fsharp:"indent",
visualbasic:"indent",
cobol:"indent"
},
default_tail_start:{
c:"/* Tail starts here */",
cpp:"/* Tail starts here */",
java:"/* Tail starts here */",
csharp:"/* Tail starts here */",
haskell:"-- Tail starts here",
php:"/* Tail starts here */",
python:"# Tail starts here",
perl:"# Tail starts here",
ruby:"# Tail starts here",
bash:"# Tail starts here",
clojure:"; Tail starts here",
scala:"/* Tail starts here */",
sbcl:"; Tail starts here",
lua:"-- Tail starts here",
javascript:"/* Tail starts here */",
pascal:"{ Tail starts here }",
python3:"# Tail starts here",
groovy:"// Tail starts here",
objectivec:"// Tail starts here",
fsharp:"// Tail starts here",
visualbasic:"' Tail starts here",
cobol:"* Tail starts here"
},
lang_default_text:{
c:"#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */    \n    return 0;\n}\n",
cpp:"#include <cmath>\n#include <cstdio>\n#include <vector>\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\n\nint main() {\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   \n    return 0;\n}\n",
java:"import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}",
csharp:"using System;\nusing System.Collections.Generic;\nusing System.IO;\nclass Solution {\n    static void Main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution */\n    }\n}",
php:'<?php\n$_fp = fopen("php://stdin", "r");\n/* Enter your code here. Read input from STDIN. Print output to STDOUT */\n\n?>',
ruby:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
python:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
perl:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
haskell:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
clojure:"; Enter your code here. Read input from STDIN. Print output to STDOUT\n;",
lua:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
sbcl:";; Enter your code here. Read input from STDIN. Print output to STDOUT",
erlang:"% Enter your code here. Read input from STDIN. Print output to STDOUT\n% Your class should be named solution\n\n-module(solution).\n-export([main/0]).\n\nmain() ->\n	.\n",
scala:"object Solution {\n\n    def main(args: Array[String]) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution\n*/\n    }\n}",
go:'package main\nimport "fmt"\n\nfunc main() {\n //Enter your code here. Read input from STDIN. Print output to STDOUT\n}',
javascript:'function processData(input) {\n    //Enter your code here\n} \n\nprocess.stdin.resume();\nprocess.stdin.setEncoding("ascii");\n_input = "";\nprocess.stdin.on("data", function (input) {\n    _input += input;\n});\n\nprocess.stdin.on("end", function () {\n   processData(_input);\n});\n',
d:"/* Enter your code here. Read input from STDIN. Print output to STDOUT */",
ocaml:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
pascal:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
groovy:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
text:"",
objectivec:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
fsharp:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
visualbasic:"'Enter your code here. Read input from STDIN. Print output to STDOUT",
cobol:"*Enter your code here. Read input from STDIN. Print output to STDOUT"
}
},
headerTemplate:'<div class="clearfix grey-header cap plL plR psT psB">\n  <div class="btn-group pull-left">\n    <a class="cursor emacs btn btn-white editor-mode-button" data-editor="emacs">Emacs</a>\n    <a class="cursor default btn btn-white editor-mode-button" data-editor="default">Normal</a>\n    <a class="cursor vim btn btn-white editor-mode-button" data-editor="vim">Vim</a>\n  </div>\n  <div class="pull-right">\n    <div class="inline large lines inverse pull-right msT msL">\n      <% if (showTheme) { %>\n      <a class="cursor toggle-theme"><i class="icon-adjust icon--grey"></i></a>\n      <% } %>\n      <% if (showSave) { %>\n      <a href="javascript:;" class="cursor save-code" id="save-code"><i class="icon-floppy icon--grey"></i></a>\n      <% } %>\n      <% if (showFullScreen) { %>\n      <a class="restorefullscreen force-hide active-link">\n          <i class="icon-resize-small-alt icon--grey"></i></a>\n      <a class="fullscreen active-link "\n         data-analytics="Switch to fullscreen"><i class="icon-resize-full-alt icon--grey"></i></a>\n      <% } %>\n    </div>\n    <div class="clearfix pull-right">\n      <select id="select-lang">\n       <% _.each(languages, function(l){ %>\n        <option value="<%=l%>"><%=lang_display_mapping[l]%></option>\n       <% }); %>\n      </select>\n    </div>\n  </div>\n</div>',
bodyTemplate:'<div class="hr_tour-code-solution">\n  <div class="code-checker">\n    <textarea id="codeview" style="width:100%"></textarea>\n    <div id="codeeditor-statusbar" class="clearfix psA codeeditor_statusbar">\n      <span id="statusbar-mode"></span>\n      <div class="pull-right">\n        <span id="statusbar-line"></span>\n        <span id="statusbar-col"></span>\n        <span id="statusbar-count"></span>\n      </div>\n    </div>\n  </div>\n</div>',
footerTemplate:'<div class="clearfix mlT">\n  <div class="pull-right">\n    <% if (showCompileTest) { %>\n    <button class="btn bb-compile msR" data-analytics="Compile and Test"><%= compile_button_text %></button>\n    <% } %>\n    <% if (showSubmit) { %>\n    <button class="btn btn-primary bb-submit ans-submit" data-analytics="Submit Code"><%= submit_button_text %></button>\n    <% } %>\n  </div>\n  <div class="pull-left inline">\n      <% if(showUploadCode) { %>\n      <button class="btn btn-text upload_file" data-analytics="Upload File"><i class="icon-upload"></i> Upload Code as File-</button>\n      <% } %>\n      <% if (showCustomInput) { %>\n      <div class="mlL mmT">\n          <label for="customtestcase"><input type="checkbox" id="customtestcase"><span class="lmT msL">Use a custom test case</span></label><br/>\n          <textarea rows="5" id="custominput" style="display:none"></textarea>\n      </div>\n      <% } %>\n  </div>\n</div>',
_create:function() {
var e, that;
return this.ele_name = this.element.context.id, e = $(this.element), this.options = $.extend(this._options, this.options), 
this.current_code = e.html(), e.empty(), e.append(_.template(this.headerTemplate, this.options)), 
e.append(_.template(this.bodyTemplate, this.options)), e.append(_.template(this.footerTemplate, this.options)), 
that = this, this.codeEditor = this._initCodeEditor(e.find("textarea#codeview")[0]), 
this.codeEditor.on("update", function() {
return that._updateStatusBar(that);
}), this.codeEditor.on("cursorActivity", function() {
return that._updateStatusPosition();
}), this.codeEditor.on("change", function() {
return that._saveLangCode(that);
}), e.find("#select-lang").change(function(e) {
return that._changeLanguage(e, that);
}), e.find("#save-code").click(function(e) {
return that._saveCode(e, that);
}), e.find("#select-lang").on("select2-close", function() {
return setTimeout(function() {
return that._focusEditor(that);
}, 100);
}), e.find(".editor-mode-button").click(function(e) {
return that._setEditorMode(e, that), that._updateStatusBar(that);
}), e.find("button.bb-compile").click(function() {
var data;
return data = {
code:that.codeEditor.getValue(),
language:that.options.language
}, that.options.showCustomInput && $(that.element).find("#customtestcase").attr("checked") && (data.custominput = $(that.element).find("#custominput").val()), 
that._trigger("compile", {}, data);
}), e.find("button.bb-submit").click(function() {
var data;
return data = {
code:that.codeEditor.getValue(),
language:that.options.language
}, that.options.showCustomInput && $(that.element).find("#customtestcase").attr("checked") && (data.custominput = $(that.element).find("#custominput").val()), 
that._trigger("submit", {}, data);
}), e.find("#customtestcase").click(function() {
return $(that.element).find("#custominput").toggle(this.checked);
}), e.find("#select-lang").trigger("change"), this._trigger("compile", {}, {}), 
window.codeEditor = this.codeEditor;
},
_updateStatusBar:function() {
var modeText;
return modeText = function() {
switch (this.codeEditor.options.keyMap) {
case "vim":
return "--VIM--";

case "vim-insert":
return "-- INSERT --";

case "emacs":
return "EMACS";

case "emacs-Ctrl-X":
return "C-x-";

default:
return "";
}
}.call(this), $(this.element).find("#statusbar-mode").text(modeText);
},
_updateStatusPosition:function() {
var e, pos;
return pos = this.codeEditor.doc.getCursor(), e = $(this.element), e.find("#statusbar-line").text("Line: " + (pos.line + 1)), 
e.find("#statusbar-col").text("Col: " + (pos.ch + 1));
},
_initCodeEditor:function(t) {
var e, opts, sel, _ref;
return opts = this._getUserOpts(), e = $(this.element), e.find(".editor-mode-button[data-editor=" + opts.keyMap + "]").addClass("disabled"), 
sel = e.find("#select-lang"), sel.select2(), this._initAutoSave(), opts.userPreferredLang && (_ref = opts.userPreferredLang, 
__indexOf.call(this.options.languages, _ref) >= 0) ? (sel.select2("val", opts.userPreferredLang), 
opts.mode = this.options.lang_mime_mapping[opts.userPreferredLang]) :(sel.select2("val", this.options.language), 
opts.mode = this.options.lang_mime_mapping[this.options.language]), CodeMirror.fromTextArea(t, opts);
},
_changeLanguage:function(e) {
var d, from, l;
return d = new Date(), l = $(e.currentTarget).select2("val"), from = this.options.language, 
this.options.language = l, this.codeEditor.setValue(this._getLangCode(l)), this._saveUserOpts({
userPreferredLang:l
}), this.codeEditor.setOption("mode", this.options.lang_mime_mapping[l]), this.options.lang_line_nos[l] ? this.codeEditor.setOption("firstLineNumber", this.options.lang_line_nos[l]) :this.codeEditor.setOption("firstLineNumber", 1), 
this._trigger("languagechange", {}, {
from:from,
to:l
});
},
_saveCode:function(e) {
return e.preventDefault(), this.options.onSave ? this.options.onSave() :void 0;
},
_initAutoSave:function() {
var callback, timeout;
return this.options.autoSave && this.options.onSave ? (timeout = parseInt(this.options.autoSave, 10), 
callback = this.options.onSave, this._autoSaveCode(timeout, callback)) :void 0;
},
_autoSaveCode:function(timeout, callback) {
return callback(), setInterval(this._autoSaveCode, timeout, timeout, callback);
},
_setEditorMode:function(e) {
var mode;
return mode = $(e.currentTarget).attr("data-editor"), $(e.currentTarget).parent().find(".editor-mode-button").removeClass("disabled"), 
$(e.currentTarget).addClass("disabled"), this.codeEditor.setOption("keyMap", mode), 
this._focusEditor(e), this._saveUserOpts({
keyMap:mode
});
},
_focusEditor:function() {
return this.codeEditor.focus();
},
_getLangCode:function(l) {
var val;
return this.options.autoSaveNamespace && (val = $.jStorage.get("" + this.options.autoSaveNamespace + "-" + l)) ? val :this.options.showTemplate && this.options.lang_default_text[l] ? this.options.lang_default_text[l] :"";
},
_saveLangCode:function() {
var code, d, key, opts, saveObject;
return opts = this.options, opts.autoSaveNamespace && opts.lang_mime_mapping[opts.language] === this.codeEditor.options.mode ? (d = new Date(), 
key = "" + opts.autoSaveNamespace + "-" + opts.language, saveObject = "" + this.options.language + d.getHours() + d.getMinutes(), 
window[saveObject] && clearTimeout(window[saveObject]), code = this.codeEditor.getValue(), 
window[saveObject] = setTimeout(function() {
var _t;
return _t = parseInt(d.getTime() / 1e3), $.jStorage.set(key, code);
}, 3e3)) :void 0;
},
_getUserOpts:function() {
var a;
return a = {
lineNumbers:!0,
lineWrapping:!0,
styleActiveLine:!0,
autoCloseBrackets:!0,
autoCloseTags:!0,
matchBrackets:!0,
keyMap:"default",
userPreferredLang:null
}, $.extend(a, $.parseJSON($.jStorage.get("codeshellUserOpts")));
},
_saveUserOpts:function(opts) {
var a;
return a = $.extend(this._getUserOpts(), opts), $.jStorage.set("codeshellUserOpts", JSON.stringify(a));
},
value:function() {
return {
code:this.codeEditor.getValue(),
language:this.options.language
};
},
setValue:function(opts) {
var sel;
return opts.language && (sel = $(this.element).find("#select-lang"), sel.select2("val", opts.language)), 
opts.code ? this.codeEditor.setValue(opts.code) :void 0;
},
refresh:function() {
var _this = this;
return setTimeout(function() {
return _this.codeEditor.refresh();
}, 25);
},
onChange:function(callback) {
return null !== callback ? this.codeEditor.on("change", callback) :void 0;
},
destroy:function() {
return this._saveLangCode(this), $.Widget.prototype.destroy.call(this);
}
});
}, $(document).ready(function() {
return codeshellfn(jQuery, window, document);
});
}.call(this), function() {
var __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var ALLOWED_EXTENDED_ATTRIBUTES, Base64, HR, ajaxmsg, bindFormEvents, closeSuccessStatus, countdownTimer, date_get12hour_hour, date_get12hour_offset, date_getMon, date_getMonth, error_html, formData, genFormHTML, genModContainer, getDateFromEpoch, getEpochTimeStampFromDateTime, getErrorList, getRemainingTime, htmlDecode, htmlEncode, initializeTimers, inlineLoadingEnd, inlineLoadingStart, mp_ping, numberSuffix, padZeros, pagination, removeAllInlineThrobbers, renderBreadCrumbs, scrollToBottom, scrollToTop, semiFix, setTab, showInlineSuccess, showLoginError, slugify, sortNumbers, splitDate, successStatus, timezone_abbr, trim, uploadDialog, validate_date, validate_time, _addExtendedAttributes, _encType, _ref;
return slugify = function(str, delim) {
return null == delim && (delim = "-"), str.replace(/[ \t\n_]+/g, delim).toLowerCase();
}, ALLOWED_EXTENDED_ATTRIBUTES = [ "type", "value", "placeholder", "disabled", "name" ], 
setTab = function(tabName) {
var tab, tabs, targetTab, _i, _len, _results;
for (HR.tab = tabName, tabs = $(".page-nav").find(".nav").find("li"), targetTab = "profile" !== tabName ? "tab-" + tabName :"profile-menu", 
_results = [], _i = 0, _len = tabs.length; _len > _i; _i++) tab = tabs[_i], $(tab).attr("id") !== targetTab ? _results.push($(tab).removeClass("active")) :_results.push($(tab).addClass("active"));
return _results;
}, pagination = function($obj, total, url_prefix, current_page, collection, count, pages, class_name, pagination_select) {
var eachpage, last, last_page, onBegining, onEnd, output, start, _fn, _i;
if (null == current_page && (current_page = 1), null == collection && (collection = null), 
null == count && (count = 10), null == pages && (pages = 10), null == class_name && (class_name = "backbone"), 
null == pagination_select && (pagination_select = !0), $obj) {
if (current_page = parseInt(current_page), output = '<div class="pagination"><ul>', 
start = Math.floor(pages / 2) >= current_page && current_page >= 1 ? 1 :current_page - Math.floor(pages / 2), 
last_page = Math.ceil(total / count), 0 === last_page && (last_page = 1), last = last_page >= start + (pages - 1) ? start + (pages - 1) :last_page, 
pages - 1 > last - start && (start = last - (pages - 1), 1 > start && (start = 1)), 
last === start || _.isNaN(last)) return "";
for (onBegining = 1 === current_page ? !0 :!1, onEnd = current_page === last_page ? !0 :!1, 
onBegining ? (output += '<li class="disabled"><a><span class="double-caret left"></span><span class="double-caret left"></span></a></li>', 
output += '<li class="disabled"><a><span class="caret left"></span></a></li>') :(output += '<li><a class="' + class_name + '" data-page="1" href="' + url_prefix + '1"><span class="double-caret left"></span><span class="double-caret left"></span></a></li>', 
output += '<li><a class="' + class_name + '" data-page="' + (current_page - 1) + '" href="' + url_prefix + (current_page - 1) + '"><span class="caret left"></span></a></li>'), 
_fn = function(eachpage) {
return output += eachpage !== current_page ? '<li><a class="' + class_name + '" data-page="' + eachpage + '" href="' + url_prefix + eachpage + '">' + eachpage + "</a></li>" :'<li class="active"><a class="' + class_name + '" data-page="' + eachpage + '" href="' + url_prefix + eachpage + '">' + eachpage + "</a></li>";
}, eachpage = _i = start; last >= start ? last >= _i :_i >= last; eachpage = last >= start ? ++_i :--_i) _fn(eachpage);
return onEnd ? (output += '<li class="disabled"><a><span class="caret right"></span></a></li>', 
output += '<li class="disabled"><a><span class="double-caret right"></span><span class="double-caret right"></span></a></li>') :(output += '<li><a class="' + class_name + '" data-page="' + (current_page + 1) + '" href="' + url_prefix + (current_page + 1) + '"><span class="caret right"></span></a></li>', 
output += '<li><a class="' + class_name + '" data-page="' + last_page + '" href="' + url_prefix + last_page + '"><span class="double-caret right"></span><span class="double-caret right"></span></a></li>'), 
output += "</ul></div>", pagination_select && (output += "<div class='pagination-sub block-center clearfix' style='width: 140px;'>", 
null !== collection && (output += "<div class='select-wrap' id='pagination-length'> <a href='' class='dropdown-toggle clearfix select-wrap' data-toggle='dropdown'> <span class='select'><span class='page-number'>" + count + "</span> per page</span><span class='indent'><b class='caret'></b></span> </a> <ul class='dropdown-menu unstyled' id='pagination-length-select'> <li><a href='#'>10</a></li> <li><a href='#'>20</a></li> <li><a href='#'>50</a></li> <li><a href='#'>100</a></li> </ul> </div>"), 
output += "</div>"), $obj.html(output), $obj.find("#pagination-length ul li a").bind("click", function(e) {
var new_limit;
return e.preventDefault(), null !== collection && (new_limit = parseInt($(e.currentTarget).html()), 
new_limit && !_.isNaN(new_limit)) ? ($obj.find(".page-number").html($(e.currentTarget).html()), 
$.cookie("pagination_per_page_limit", new_limit, {
expires:365
}), collection.setLimit(new_limit), collection.cached(), $("html body").animate({
scrollTop:0
}, 300)) :void 0;
}), $obj;
}
}, trim = function(text) {
return text.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}, ajaxmsg = function(msg, loader, autohide, timeout) {
var $ajaxmsg;
return null == loader && (loader = !0), null == autohide && (autohide = !1), null == timeout && (timeout = .5), 
$ajaxmsg = $("div#ajax-msg-wrap #ajax-msg"), 0 === $ajaxmsg.length ? ($("div#ajax-msg-wrap").append('<div id="ajax-msg"><span class="ajax-loader"></span><span class="ajax-msg"></span></div>'), 
$ajaxmsg = $("div#ajax-msg-wrap #ajax-msg")) :$ajaxmsg.show(), $(".track-nav-wrap").length > 0 ? $("div#ajax-msg-wrap #ajax-msg").css("margin-top", "102px") :$("div#ajax-msg-wrap #ajax-msg").css("margin-top", "0px"), 
loader ? $ajaxmsg.find(".ajax-loader").addClass("ajax-loading") :$ajaxmsg.find(".ajax-loader").removeClass("ajax-loading"), 
$ajaxmsg.find(".ajax-msg").html(msg), $ajaxmsg.css("margin-left", -1 * ($ajaxmsg.width() / 2)), 
autohide ? setTimeout(function() {
return $("#ajax-msg").hide();
}, 1e3 * timeout) :void 0;
}, initializeTimers = function() {
var timer, _i, _len, _ref, _ref1, _results;
for (_ref = $(".countdowntimer"), _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) timer = _ref[_i], 
(null != (_ref1 = $(timer).attr("data-start-time")) ? _ref1 :"0000-00-00 00:00:00") && " " !== $(timer).attr("data-start-time") && "0000-00-00 00:00:00" !== $(timer).attr("data-start-time") && _results.push(function(timer) {
var t;
return t = $(timer).attr("data-start-time").split(/[- :]/), $(timer).countdown({
until:new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]),
layout:$(timer).attr("data-text") + "{dn} {dl} {hnn}:{mnn}:{snn}",
timezone:0,
alwaysExpire:!0,
onExpiry:function() {
return $(this).html($(this).attr("data-done-text")), this;
}
});
}(timer));
return _results;
}, semiFix = function(selector, wrapselector) {
return $(window).scroll(function() {
var offset, scroller_object;
if ($(wrapselector).length > 0) {
if (offset = $(wrapselector).offset().top - 40, scroller_object = $(selector), document.documentElement.scrollTop >= offset || window.pageYOffset >= offset) return $.browser.msie && "6.0" === $.browser.version ? scroller_object.css("top", document.documentElement.scrollTop + 15 + "px") :scroller_object.css({
top:"40px"
});
if (document.documentElement.scrollTop < offset || window.pageYOffset < offset) return scroller_object.css({
position:"absolute",
top:"0"
});
}
});
}, uploadDialog = function(options) {
var body_message, disable_weburl, header_message, template, that;
if (options && options.upload_url) return this.options = options, this.$upload_dialog = $("#upload-dialog"), 
0 === this.$upload_dialog.length ? ($("body").append('<div id="upload-dialog"><div>'), 
this.$upload_dialog = $("#upload-dialog")) :this.$upload_dialog.empty(), template = _.template($("#upload-dialog-template").html()), 
header_message = options.header_message ? options.header_message :"File upload dialog", 
body_message = options.body_message ? options.body_message :"", disable_weburl = options.disable_weburl === !0 ? !0 :!1, 
this.$upload_dialog.html(template({
header_message:header_message,
body_message:body_message,
disable_weburl:disable_weburl
})), this.$upload_dialog.find("#fileupload-modal").modal(), that = this, this.$upload_dialog.find("a[data-toggle='tab']").bind("click", function(e) {
var tabSelector;
return tabSelector = $(e.currentTarget).parent().siblings().find("a").attr("href"), 
$(that.$upload_dialog).find(tabSelector).find("input").val("");
}), this.$upload_dialog.find("input.uploadurl").unbind(), this.$upload_dialog.find("input.uploadurl").bind("keypress", function(e) {
var code;
return code = e.keyCode ? e.keyCode :e.which, 13 === code ? (e.preventDefault(), 
that.$upload_dialog.find("a.upload").click()) :void 0;
}), this.$upload_dialog.find("a.upload").bind("click", function(e) {
var data;
if (!$(e.currentTarget).hasClass("disabled")) return that.$upload_dialog.find(".errorp").hide(), 
that.$upload_dialog.find(".successp").hide(), $(e.currentTarget).addClass("disabled"), 
$(e.currentTarget).button("loading"), data = that.options.data ? that.options.data :{}, 
$.ajax(that.options.upload_url, {
data:data,
files:$(":file", that.$upload_dialog),
iframe:!0,
processData:!0
}).complete(function(data) {
var resp;
return resp = $.parseJSON(data.responseText), $(e.currentTarget).removeClass("disabled"), 
$(e.currentTarget).button("reset"), resp.status ? (void 0 !== that.options.success_message ? (that.$upload_dialog.find(".successp").html(that.options.success_message), 
that.$upload_dialog.find(".successp").show(), that.$upload_dialog.find("form").hide(), 
$(e.currentTarget).hide()) :that.$upload_dialog.find("#fileupload-modal").modal("hide"), 
that.options.parent_model && that.options.parent_view ? (that.options.parent_model.render_once = !1, 
that.options.parent_model.fetch({
success:function() {
var activeTab;
return activeTab = that.options.parent_view.activeTab, activeTab ? (that.options.parent_view.activeTab = 3, 
that.options.parent_view.render(), that.options.parent_view.activeTab = activeTab, 
that.options.parent_view.renderResume(!0)) :void 0;
}
})) :void 0) :(that.$upload_dialog.find(".errorp").html(resp.message), that.$upload_dialog.find(".errorp").show());
});
});
}, padZeros = function(num, size) {
var s;
return s = "0000000000" + num, s.substr(s.length - size);
}, mp_ping = function() {
var data;
return void 0 !== HR.mp_ping_interval ? HR.mp_ping_interval += 2 :HR.mp_ping_interval = 0, 
HR.loggedin || (HR.loggedin = !1), data = {
interval:HR.mp_ping_interval,
loggedin:HR.loggedin
}, void 0 !== mpq && void 0 !== mpq.track && HR.mp_ping_interval % 10 === 0 ? mpq.track("Ping", data) :void 0;
}, Base64 = {
_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode:function(input) {
var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
for (output = "", chr1 = void 0, chr2 = void 0, chr3 = void 0, enc1 = void 0, enc2 = void 0, 
enc3 = void 0, enc4 = void 0, i = 0, input = Base64._utf8_encode(input); i < input.length; ) chr1 = input.charCodeAt(i++), 
chr2 = input.charCodeAt(i++), chr3 = input.charCodeAt(i++), enc1 = chr1 >> 2, enc2 = (3 & chr1) << 4 | chr2 >> 4, 
enc3 = (15 & chr2) << 2 | chr3 >> 6, enc4 = 63 & chr3, isNaN(chr2) ? enc3 = enc4 = 64 :isNaN(chr3) && (enc4 = 64), 
output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
return output;
},
decode:function(input) {
var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
for (output = "", chr1 = void 0, chr2 = void 0, chr3 = void 0, enc1 = void 0, enc2 = void 0, 
enc3 = void 0, enc4 = void 0, i = 0, input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < input.length; ) enc1 = this._keyStr.indexOf(input.charAt(i++)), 
enc2 = this._keyStr.indexOf(input.charAt(i++)), enc3 = this._keyStr.indexOf(input.charAt(i++)), 
enc4 = this._keyStr.indexOf(input.charAt(i++)), chr1 = enc1 << 2 | enc2 >> 4, chr2 = (15 & enc2) << 4 | enc3 >> 2, 
chr3 = (3 & enc3) << 6 | enc4, output += String.fromCharCode(chr1), 64 !== enc3 && (output += String.fromCharCode(chr2)), 
64 !== enc4 && (output += String.fromCharCode(chr3));
return output = Base64._utf8_decode(output);
},
_utf8_encode:function(string) {
var c, n, utftext;
for (string = string.replace(/\r\n/g, "\n"), utftext = "", n = 0; n < string.length; ) c = string.charCodeAt(n), 
128 > c ? utftext += String.fromCharCode(c) :c > 127 && 2048 > c ? (utftext += String.fromCharCode(c >> 6 | 192), 
utftext += String.fromCharCode(63 & c | 128)) :(utftext += String.fromCharCode(c >> 12 | 224), 
utftext += String.fromCharCode(c >> 6 & 63 | 128), utftext += String.fromCharCode(63 & c | 128)), 
n++;
return utftext;
},
_utf8_decode:function(utftext) {
var c, c1, c2, c3, i, string;
for (string = "", i = 0, c = c1 = c2 = 0; i < utftext.length; ) c = utftext.charCodeAt(i), 
128 > c ? (string += String.fromCharCode(c), i++) :c > 191 && 224 > c ? (c2 = utftext.charCodeAt(i + 1), 
string += String.fromCharCode((31 & c) << 6 | 63 & c2), i += 2) :(c2 = utftext.charCodeAt(i + 1), 
c3 = utftext.charCodeAt(i + 2), string += String.fromCharCode((15 & c) << 12 | (63 & c2) << 6 | 63 & c3), 
i += 3);
return string;
}
}, numberSuffix = function(number) {
var mod10;
return number > 0 ? (mod10 = number % 10, 1 === mod10 && 11 !== number ? number + "st" :2 === mod10 && 12 !== number ? number + "nd" :3 === mod10 && 13 !== number ? number + "rd" :number + "th") :number;
}, showLoginError = function(prefix) {
return "phackerprofile" !== _.clone(prefix) || "phackerboard" !== _.clone(prefix) ? $("body").append('<div style="position: absolute; top: 30%; left: 40%; background-color: #fff; border-radius: 15px; padding: 20px; border: 3px #ccc solid;"><p>You must <a href="user/login">login</a> before you can view this page</p></div>') :void 0;
}, successStatus = function() {
var height, styles, that;
return this.$success_status = $("#success-status-wrap"), 0 === this.$success_status.length ? ($("body").append('<div id="success-status-wrap"><div>'), 
this.$success_status = $("#success-status-wrap")) :this.$success_status.empty(), 
height = 50, styles = {
position:"fixed",
top:"0px",
left:"0px",
height:height + "px",
"text-align":"center",
width:"100%",
"z-index":"9999",
background:"#333 url('public/images/success-bar-bg.jpg')"
}, that = this, _.each(styles, function(v, k) {
return that.$success_status.css(k, v);
}), $("body").addClass("home-status-padding"), $("body div.navbar.navbar-fixed-top").addClass("navbar-status-padding"), 
this.$success_status.hide(), this.$success_status.html("<div style='width: 960px; margin: 0px auto; position: relative;'>\n  <p style='margin-top:10px; font-size: 20px; color: white; padding-top: 3px;'>Congratulations! You have solved this problem!</p>\n</div>"), 
this.$success_status.fadeIn(), this.$success_status.find("a.closeit").die(), this;
}, closeSuccessStatus = function() {
var $success_status;
return $success_status = $("#success-status-wrap"), 0 !== $success_status.length && ($success_status.fadeOut(), 
$("body").removeClass("home-status-padding"), $("body div.navbar.navbar-fixed-top").removeClass("navbar-status-padding"), 
$success_status.html("")), this;
}, getRemainingTime = function(destination) {
var current, date_time_string, days, days_string, hours, hours_string, minutes, minutes_string, offset_hours, offset_minutes, seconds, seconds_diff, seconds_string, target;
return target = new Date(0), target.setUTCSeconds(destination), current = new Date(), 
seconds_diff = Math.floor((target - current) / 1e3), seconds_diff > 0 && (days = Math.floor(seconds_diff / 86400), 
offset_hours = seconds_diff % 86400, hours = Math.floor(offset_hours / 3600), offset_minutes = offset_hours % 3600, 
minutes = Math.floor(offset_minutes / 60), seconds = offset_minutes % 60, date_time_string = "", 
days > 0 && (days_string = 1 === days ? "Day" :"Days", date_time_string += "" + days + " " + days_string + " "), 
(days > 0 || hours > 0) && (hours_string = 1 === hours ? "Hour" :"Hours", date_time_string += "" + hours + " " + hours_string + " "), 
(days > 0 || hours > 0 || minutes > 0) && (minutes_string = 1 === minutes ? "Minute" :"Minutes", 
date_time_string += "" + minutes + " " + minutes_string + " "), (days > 0 || hours > 0 || minutes > 0 || seconds > 0) && (seconds_string = 1 === seconds ? "Second" :"Seconds", 
date_time_string += "" + seconds + " " + seconds_string)), date_time_string;
}, countdownTimer = function($el, destination, callback, recursion) {
var clbk, date_time_string;
return null == callback && (callback = null), null == recursion && (recursion = !1), 
recursion || !$el.data("timer_running") ? (window.el = $el, destination ? (date_time_string = getRemainingTime(destination), 
$el.html(date_time_string), clbk = function() {
return countdownTimer($el, destination, callback, !0);
}, setTimeout(clbk, 1e3), $el.data("timer_running", !0)) :($el.html("0 Seconds (Loading...)"), 
callback ? callback() :void 0)) :void 0;
}, _addExtendedAttributes = function(attributes) {
var output;
return output = "", _.each(attributes, function(value, key) {
return __indexOf.call(ALLOWED_EXTENDED_ATTRIBUTES, key) >= 0 ? output += "" + key + "='" + value + "' " :void 0;
}, this), output;
}, _encType = function(metadata) {
var has_file;
return has_file = !1, _.each(metadata, function(value) {
return "file" === value.type ? has_file = !0 :void 0;
}), null != has_file ? has_file :{
"multipart/form-data":"application/x-www-form-urlencoded"
};
}, bindFormEvents = function($view, model, metadata, options) {
var _clbk;
return null == options && (options = {}), _.each(metadata, function(value, key) {
var event, selector, _ref, _ref1;
return "color" === (_ref = value.type) || "date" === _ref || "datetime" === _ref || "datetime-local" === _ref || "email" === _ref || "month" === _ref || "number" === _ref || "password" === _ref || "range" === _ref || "search" === _ref || "tel" === _ref || "text" === _ref || "time" === _ref || "url" === _ref || "week" === _ref || "file" === _ref || "image" === _ref ? (event = "input", 
selector = "input[name=" + key + "]") :"file" === value.type ? (event = "change", 
selector = "input[name=" + key + "]") :"checkbox" === value.type ? (event = "change", 
selector = "input[name=" + key + "]") :"image" === value.type ? (event = "click", 
selector = "input[name=" + key + "]") :"textarea" === value.type ? (event = "input", 
selector = "textarea[name=" + key + "]") :"radio" === (_ref1 = value.type) || "select" === _ref1, 
$view.find("form " + selector).bind(event, function(e) {
var data;
return data = {}, data[key] = "checkbox" === value.type ? $(e.currentTarget).is(":checked") :$(e.currentTarget).val(), 
model.set(data, {
silent:!0
}), model.trigger("modified");
});
}, this), model.bind("modified", function() {
return options.submit && options.submit.enable && options.submit.enable.that && options.submit.enable.callback && options.submit.enable.callback.call(options.submit.that), 
$view.find("form input[type=submit]").removeAttr("disabled"), $view.find("form input[type=reset]").removeAttr("disabled");
}), model.bind("reset", function() {
return $view.find("form input[type=submit]").attr("disabled", "disabled"), $view.find("form input[type=reset]").attr("disabled", "disabled");
}), $view.find("form input[type=reset]").click(function() {
return $view.find("form input[type=submit]").attr("disabled", "disabled"), $view.find("form input[type=reset]").attr("disabled", "disabled"), 
$view.find("form").get(0).reset();
}), _clbk = function(e) {
return null == e && (e = null), null !== e && e.preventDefault(), model.save(null, {
success:function() {
return $view.find("form input[type=submit]").attr("disabled", "disabled"), $view.find("form input[type=reset]").attr("disabled", "disabled");
}
});
}, $view.find("form input[type=submit]").click(_clbk), options.submit && options.submit.action && options.submit.action.that && options.submit.action.callback ? options.submit.action.that[options.submit.action.callback] = _clbk :void 0;
}, genFormHTML = function(metadata, model) {
var enctype, output;
return enctype = _encType(metadata), output = "<form enctype='" + enctype + "'>", 
_.each(metadata, function(value, key) {
var error, hint, input_span, label, label_span, name, _ref, _ref1, _ref2, _ref3, _ref4;
if (name = key, value.name = name, value.value = model.get(key), value.type || (value.type = "text"), 
"color" === (_ref = value.type) || "date" === _ref || "datetime" === _ref || "datetime-local" === _ref || "email" === _ref || "month" === _ref || "number" === _ref || "password" === _ref || "range" === _ref || "search" === _ref || "tel" === _ref || "text" === _ref || "time" === _ref || "url" === _ref || "week" === _ref || "file" === _ref || "image" === _ref || "radio" === _ref || "checkbox" === _ref || "textarea" === _ref || "select" === _ref) return "checkbox" === value.type ? (label_span = "5", 
input_span = "4") :(label_span = "3", input_span = "6"), output += "<div class='formgroup horizontal'>", 
label = value.label || name, output += "<label for='" + name + "' class='pull-left span" + label_span + "' style='text-align: left; padding-left: 10px;' >" + label + "</label>", 
output += "<div class='block span" + (input_span + 1) + "'>", "color" === (_ref1 = value.type) || "date" === _ref1 || "datetime" === _ref1 || "datetime-local" === _ref1 || "email" === _ref1 || "month" === _ref1 || "number" === _ref1 || "password" === _ref1 || "range" === _ref1 || "search" === _ref1 || "tel" === _ref1 || "text" === _ref1 || "time" === _ref1 || "url" === _ref1 || "week" === _ref1 || "file" === _ref1 || "image" === _ref1 ? (output += "<input class='span" + input_span + "' ", 
output += _addExtendedAttributes(value), output += "/>") :"radio" === (_ref2 = value.type) || "select" === _ref2 || ("textarea" === (_ref3 = value.type) ? (output += "<textarea", 
output += _addExtendedAttributes(value), output += ">", value.value && (output += value.value), 
output += "</textarea>") :"checkbox" === value.type && (output += "<div class='switch' data-on='success' data-off='info'><input name='" + name + "' type='" + value.type + "'", 
value.value && (output += "checked='checked'"), output += "></div>")), hint = value.hint || "", 
error = value.error || "", output += "<small class='sub-help'>" + hint + "</small><br>", 
output += "<small class='error'>" + error + "</small>", output += "</div>", output += "</div>";
if ("button" === (_ref4 = value.type) || "submit" === _ref4 || "reset" === _ref4) ; else if ("hidden" === value.type) return output += "<input ", 
output += _addExtendedAttributes(value), output += ">";
}, this), output += "</form>";
}, sortNumbers = function(a, b) {
return a - b;
}, renderBreadCrumbs = function(el, breadcrumbs) {
var breadCrumbsView;
return breadCrumbsView = new HR.BreadCrumbsView({
collection:breadcrumbs
}), $(el).html(breadCrumbsView.render().el), breadCrumbsView;
}, htmlEncode = function(value) {
return "" === value || void 0 === value ? "" :String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}, htmlDecode = function(value) {
return String(value).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}, formData = function($el, ids) {
var attr;
return attr = {}, _.each(ids, function() {
return function(id) {
var el;
return el = $el.find("#" + id), el.length > 0 ? attr[id] = "checkbox" === el.attr("type") ? el.is(":checked") :el.val() :console.warn("HR::Util::FormData:: Cannot Find field #" + id);
};
}(this)), attr;
}, scrollToTop = function(speed) {
return null == speed && (speed = 0), $("html body").animate({
scrollTop:0
}, speed);
}, scrollToBottom = function(speed) {
return null == speed && (speed = 0), $("html, body").animate({
scrollTop:$(document).height()
}, speed);
}, timezone_abbr = function(dateInput) {
var dateObject, dateString, tzAbbr;
return dateObject = dateInput || new Date(), dateString = dateObject + "", tzAbbr = dateString.match(/\(([^\)]+)\)$/) || dateString.match(/([A-Z]+) [\d]{4}$/), 
tzAbbr && (tzAbbr = tzAbbr[1].match(/[A-Z]/g).join("")), !tzAbbr && /(GMT\W*\d{4})/.test(dateString) ? RegExp.$1 :tzAbbr;
}, date_getMon = function(date) {
return [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ][date.getMonth()];
}, date_getMonth = function(date) {
return [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ][date.getMonth()];
}, date_get12hour_hour = function(date) {
return date.getHours() % 12;
}, date_get12hour_offset = function(date) {
return date.getHours() < 12 ? "AM" :"PM";
}, validate_time = function(time) {
var hh, mm, time_parts;
return time_parts = time.split(":"), 2 === time_parts.length ? (hh = parseInt(time_parts[0]), 
mm = parseInt(time_parts[1]), _.isNaN(hh) || _.isNaN(mm) ? !1 :24 > hh && hh >= 0 && 60 > mm && mm >= 0 ? !0 :!1) :!1;
}, validate_date = function(date) {
var date_parts, days_in_the_month, dd, mm, yyyy;
return date_parts = date.split("/"), 3 === date_parts.length ? (mm = parseInt(date_parts[0]), 
dd = parseInt(date_parts[1]), yyyy = parseInt(date_parts[2]), _.isNaN(mm) || _.isNaN(dd) || _.isNaN(yyyy) ? !1 :mm > 0 && 12 >= mm && dd > 0 && 31 >= dd && yyyy >= 1970 && 2038 > yyyy ? (days_in_the_month = 31, 
days_in_the_month = 1 === mm || 3 === mm || 5 === mm || 7 === mm || 8 === mm || 10 === mm || 12 === mm ? 31 :4 === mm || 6 === mm || 9 === mm || 11 === mm ? 30 :yyyy % 4 === 0 ? 29 :28, 
days_in_the_month >= mm ? !0 :!1) :!1) :!1;
}, getEpochTimeStampFromDateTime = function(date, time) {
var MM, date_parts, dd, hh, mm, time_parts, yyyy, _d;
return validate_date(date) && validate_time(time) ? (date_parts = date.split("/"), 
time_parts = time.split(":"), MM = date_parts[0], dd = date_parts[1], yyyy = date_parts[2], 
hh = time_parts[0], mm = time_parts[1], _d = new Date(yyyy, MM - 1, dd, hh, mm, 0), 
_d.getTime() / 1e3) :null;
}, getErrorList = function(errors) {
var error, _html, _i, _len;
for (null == errors && (errors = []), _html = "<ul>", _i = 0, _len = errors.length; _len > _i; _i++) error = errors[_i], 
_html += "<li>" + error + "</li>";
return _html += "</ul>";
}, getDateFromEpoch = function(epoch) {
var d;
return d = new Date(0), d.setUTCSeconds(epoch), d;
}, splitDate = function(date) {
var resp;
return resp = {}, resp.dd = date.getDate(), resp.MM = date.getMonth() + 1, resp.yyyy = date.getFullYear(), 
resp.hh = date.getHours(), resp.mm = date.getMinutes(), resp.dd = resp.dd < 10 ? "0" + resp.dd :"" + resp.dd, 
resp.MM = resp.MM < 10 ? "0" + resp.MM :"" + resp.MM, resp.hh = resp.hh < 10 ? "0" + resp.hh :"" + resp.hh, 
resp.mm = resp.mm < 10 ? "0" + resp.mm :"" + resp.mm, resp;
}, error_html = function(errors) {
return _.isString(errors) ? errors :_.isNaN(errors) || _.isNull(errors) ? "" :_.isObject(errors) ? "<ul>" + _.map(errors, function(error, key) {
return "<li><strong>" + _.capitalize(key) + ":</strong> " + error + "</li>";
}) + "<ul>" :_.isArray(errors) ? "<ul>" + _.map(errors, function(error) {
return "<li>" + error + "</li>";
}) + "<ul>" :void 0;
}, genModContainer = function(data) {
var hide;
return hide = data.close === !0 ? "" :"hide", "<div class='moderator-container' data-username='" + data.name + "'> <div class='moderator-close'> <a class='btn btn-text small msR cursor " + hide + " remove-moderator' data-username='" + data.name + "'><i class='icon-cancel-small'></i></a> </div> <div class='moderator-avatar'> <img height='50' width='50' class='pull-left msR avatar profile_avatar' src='" + data.avatar + "' > </div> <div class='moderator-details'> <p class='moderator-name'>" + data.name + "</p> <p class='moderator-role'>" + data.role + "</p> </div> </div>";
}, inlineLoadingStart = function(target) {
var html;
return html = '<span class="inline-throbber loading"> <i class="icon2-status_correct txt-green throbber-success"></i> </span>', 
HR.loadingButton = target, HR.util.removeAllInlineThrobbers(!1), $(html).insertAfter(target).fadeIn("normal");
}, inlineLoadingEnd = function(response) {
var successHTML;
if (HR.loadingButton) return "Success" === response.message ? (successHTML = '<span class="inline-throbber success"> <i class="icon2-status_correct txt-green throbber-success"></i> </span>', 
setTimeout(function() {
return function() {
return HR.util.removeAllInlineThrobbers(!1), $(successHTML).insertAfter(HR.loadingButton).fadeIn("normal");
};
}(this), 500), setTimeout(function() {
return function() {
return HR.util.removeAllInlineThrobbers(!0), HR.loadingButton = "";
};
}(this), 3e3)) :(HR.util.removeAllInlineThrobbers(!0), setTimeout(function() {
return function() {
return response.message ? HR.util.ajaxmsg(response.message, !1, !0, 5, 50) :void 0;
};
}(this)));
}, removeAllInlineThrobbers = function(fade) {
return fade ? $(HR.loadingButton).siblings(".inline-throbber").fadeOut("fast", function() {
return this.remove();
}) :$(HR.loadingButton).siblings(".inline-throbber").remove();
}, showInlineSuccess = function(view, element, time) {
var html;
return null == time && (time = 1e3), html = '<span class="inline-throbber success"> <i class="icon2-status_correct txt-green throbber-success"></i> </span>', 
setTimeout(function() {
return $(html).insertAfter(element).fadeIn("Normal"), HR.loadingButton = element;
}), setTimeout(function() {
return HR.util.removeAllInlineThrobbers(!0);
}, time);
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.util || (HR.util = {}), HR.util.log = Backbone.log, 
HR.util.pagination = pagination, HR.util.trim = trim, HR.util.ajaxmsg = ajaxmsg, 
HR.util.initializeTimers = initializeTimers, HR.util.semiFix = semiFix, HR.util.uploadDialog = uploadDialog, 
HR.util.padZeros = padZeros, HR.util.mp_ping = mp_ping, HR.util.Base64 = Base64, 
HR.util.numberSuffix = numberSuffix, HR.util.showLoginError = showLoginError, HR.util.successStatus = successStatus, 
HR.util.closeSuccessStatus = closeSuccessStatus, HR.util.htmlEncode = htmlEncode, 
HR.util.htmlDecode = htmlDecode, HR.util.setTab = setTab, HR.util.countdownTimer = countdownTimer, 
HR.util.genFormHTML = genFormHTML, HR.util.bindFormEvents = bindFormEvents, HR.util.sortNumbers = sortNumbers, 
HR.util.formData = formData, HR.util.scrollToTop = scrollToTop, HR.util.scrollToBottom = scrollToBottom, 
HR.util.renderBreadCrumbs = renderBreadCrumbs, HR.util.slugify = slugify, HR.util.getRemainingTime = getRemainingTime, 
HR.util.timezone_abbr = timezone_abbr, HR.util.date_getMon = date_getMon, HR.util.date_getMonth = date_getMonth, 
HR.util.date_get12hour_hour = date_get12hour_hour, HR.util.date_get12hour_offset = date_get12hour_offset, 
HR.util.validate_time = validate_time, HR.util.validate_date = validate_date, HR.util.getEpochTimeStampFromDateTime = getEpochTimeStampFromDateTime, 
HR.util.getErrorList = getErrorList, HR.util.getDateFromEpoch = getDateFromEpoch, 
HR.util.splitDate = splitDate, HR.util.genModContainer = genModContainer, HR.util.error_html = error_html, 
HR.util.inlineLoadingStart = inlineLoadingStart, HR.util.inlineLoadingEnd = inlineLoadingEnd, 
HR.util.removeAllInlineThrobbers = removeAllInlineThrobbers, HR.util.showInlineSuccess = showInlineSuccess, 
window.HR || (window.HR = HR);
}), String.prototype.endsWith = function(suffix) {
return -1 !== this.indexOf(suffix, this.length - suffix.length);
}, String.prototype.startsWith = function(prefix) {
return 0 === this.indexOf(prefix);
};
}.call(this), function() {
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
return $("meta[name=csrf-token]").attr("content", csrf_token), HR.appController ? HR.profile({
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
return $("meta[name=csrf-token]").attr("content", csrf_token), HR.appController ? HR.profile({
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
return $("meta[name=csrf-token]").attr("content", csrf_token), HR.appController ? HR.profile({
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
return $(e.currentTarget).removeAttr("disabled", "disabled"), data.status ? ($(e.currentTarget).html("Logging you in..."), 
HR.appController ? (HR.profile({
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
return $(e.currentTarget).removeAttr("disabled", "disabled"), data.status ? ($(e.currentTarget).html("Logging you in..."), 
HR.appController ? (HR.profile({
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
}();

var lang_mime_mapping = {
c:"text/x-csrc",
cpp:"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
haskell:"text/x-haskell",
php:"text/x-php",
python:"text/x-python",
perl:"text/x-perl",
ruby:"text/x-ruby",
bash:"text/x-bash",
oracle:"text/x-plsql",
mysql:"text/x-plsql",
sql:"text/x-plsql",
clojure:"text/x-scheme",
scala:"text/x-scala",
code:"text/plain",
text:"text/plain",
brainfuck:"text/plain",
javascript:"text/javascript",
d:"text/x-d",
go:"text/x-go",
lua:"text/x-lua",
erlang:"text/x-erlang",
sbcl:"text/x-common-lisp",
ocaml:"text/x-ocaml",
pascal:"text/x-pascal",
python3:"text/x-python",
groovy:"text/x-groovy",
text_pseudo:"text/plain",
objectivec:"text/x-csrc"
}, lang_display_mapping = {
c:"C",
cpp:"C++",
java:"Java",
csharp:"C#",
haskell:"Haskell",
php:"PHP",
python:"Python 2",
ruby:"Ruby",
perl:"Perl",
bash:"BASH",
oracle:"Oracle",
mysql:"MySQL",
sql:"SQL",
clojure:"Clojure",
scala:"Scala",
code:"Generic",
text:"Plain Text",
brainfuck:"Brainfuck",
javascript:"Javascript",
lua:"Lua",
sbcl:"Lisp",
erlang:"Erlang",
go:"Go",
d:"D",
ocaml:"OCaml",
pascal:"Pascal",
python3:"Python 3",
groovy:"Groovy",
objectivec:"Objective C",
text_pseudo:"Plain Text"
}, default_head_end = {
c:"/* Head ends here */",
cpp:"/* Head ends here */",
java:"/* Head ends here */",
csharp:"/* Head ends here */",
haskell:"-- Head ends here",
php:"/* Head ends here */",
python:"# Head ends here",
perl:"# Head ends here",
ruby:"# Head ends here",
bash:"# Head ends here",
clojure:"; Head ends here",
scala:"/* Head ends here */",
sbcl:"; Head ends here",
lua:"-- Head ends here",
javascript:"/* Head ends here */",
pascal:"{ Head ends here }",
python3:"# Head ends here",
groovy:"// Head ends here",
objectivec:"// Head ends here"
}, lang_fold_mapping = {
c:"brace",
cpp:"brace",
java:"brace",
csharp:"brace",
haskell:"indent",
php:"brace",
python:"indent",
ruby:"indent",
perl:"brace",
bash:"brace",
oracle:"indent",
mysql:"indent",
sql:"indent",
clojure:"indent",
scala:"brace",
code:"brace",
text:"indent",
brainfuck:"indent",
javascript:"brace",
lua:"indent",
sbcl:"indent",
erlang:"indent",
go:"brace",
d:"brace",
ocaml:"indent",
pascal:"indent",
python3:"indent",
groovy:"brace",
objectivec:"brace",
text_pseudo:"indent"
}, default_tail_start = {
c:"/* Tail starts here */",
cpp:"/* Tail starts here */",
java:"/* Tail starts here */",
csharp:"/* Tail starts here */",
haskell:"-- Tail starts here",
php:"/* Tail starts here */",
python:"# Tail starts here",
perl:"# Tail starts here",
ruby:"# Tail starts here",
bash:"# Tail starts here",
clojure:"; Tail starts here",
scala:"/* Tail starts here */",
sbcl:"; Tail starts here",
lua:"-- Tail starts here",
javascript:"/* Tail starts here */",
pascal:"{ Tail starts here }",
python3:"# Tail starts here",
groovy:"// Tail starts here",
objectivec:"// Tail starts here"
}, lang_default_text = {
c:"#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */    \n    return 0;\n}\n",
cpp:"#include <cmath>\n#include <cstdio>\n#include <vector>\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\n\nint main() {\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   \n    return 0;\n}\n",
java:"import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}",
csharp:"using System;\nusing System.Collections.Generic;\nusing System.IO;\nclass Solution {\n    static void Main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution */\n    }\n}",
php:'<?php\n$_fp = fopen("php://stdin", "r");\n/* Enter your code here. Read input from STDIN. Print output to STDOUT */\n\n?>',
ruby:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
python:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
perl:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
haskell:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
clojure:"; Enter your code here. Read input from STDIN. Print output to STDOUT\n;",
lua:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
sbcl:";; Enter your code here. Read input from STDIN. Print output to STDOUT",
erlang:"% Enter your code here. Read input from STDIN. Print output to STDOUT\n% Your class should be named solution\n\n-module(solution).\n-export([main/0]).\n\nmain() ->\n	.\n",
scala:"object Solution {\n\n    def main(args: Array[String]) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution\n*/\n    }\n}",
go:'package main\nimport "fmt"\n\nfunc main() {\n //Enter your code here. Read input from STDIN. Print output to STDOUT\n}',
javascript:'function processData(input) {\n    //Enter your code here\n} \n\nprocess.stdin.resume();\nprocess.stdin.setEncoding("ascii");\n_input = "";\nprocess.stdin.on("data", function (input) {\n    _input += input;\n});\n\nprocess.stdin.on("end", function () {\n   processData(_input);\n});\n',
d:"/* Enter your code here. Read input from STDIN. Print output to STDOUT */",
ocaml:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
pascal:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
groovy:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
text:"",
objectivec:"//Enter your code here. Read input from STDIN. Print output to STDOUT"
}, default_checker_limits = {
c:{
timelimit:3
},
clojure:{
timelimit:5
},
cpp:{
timelimit:3
},
csharp:{
timelimit:5
},
go:{
timelimit:6
},
haskell:{
timelimit:5
},
java:{
timelimit:5
},
javascript:{
timelimit:16
},
perl:{
timelimit:16
},
php:{
timelimit:16
},
python:{
timelimit:16
},
ruby:{
timelimit:16
},
scala:{
timelimit:5
}
}, codechecker_resource_limits = {
c:{
title:"C",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:6,
def_time:3
},
cpp:{
title:"C++",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:6,
def_time:3
},
java:{
title:"Java",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
csharp:{
title:"C#",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
php:{
title:"PHP",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:32,
def_time:16
},
ruby:{
title:"Ruby",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:32,
def_time:16
},
python:{
title:"Python 2",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:32,
def_time:16
},
perl:{
title:"Perl",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:32,
def_time:16
},
haskell:{
title:"Haskell",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
clojure:{
title:"Clojure",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:20,
def_time:10
},
scala:{
title:"Scala",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:20,
def_time:10
},
clisp:{
title:"CLISP",
min_mem:256,
max_mem:512,
def_mem:256,
min_time:2,
max_time:32,
def_time:16
},
lua:{
title:"Lua",
min_mem:256,
max_mem:512,
def_mem:256,
min_time:2,
max_time:32,
def_time:16
},
erlang:{
title:"Erlang",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:32,
def_time:16
},
brainfuck:{
title:"Brainfuck",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:4,
def_time:2
},
javascript:{
title:"Javascript",
min_mem:256,
max_mem:512,
def_mem:256,
min_time:2,
max_time:32,
def_time:16
},
go:{
title:"Go",
min_mem:256,
max_mem:1024,
def_mem:1024,
min_time:2,
max_time:12,
def_time:6
},
d:{
title:"D",
min_mem:256,
max_mem:512,
def_mem:256,
min_time:2,
max_time:40,
def_time:20
},
ocaml:{
title:"OCaml",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:6,
def_time:3
},
pascal:{
title:"Pascal",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:6,
def_time:3
},
sbcl:{
title:"Lisp",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:32,
def_time:16
},
python3:{
title:"Python 3",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:32,
def_time:16
},
groovy:{
title:"Groovy",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
objectivec:{
title:"Objective C",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:6,
def_time:3
}
}, countries_mapping = {
Afghanistan:"AF",
Albania:"AL",
Algeria:"DZ",
"American Samoa":"AS",
Andorra:"AD",
Angola:"AO",
Anguilla:"AI",
Antarctica:"AQ",
"Antigua and Barbuda":"AG",
Argentina:"AR",
Armenia:"AM",
Aruba:"AW",
Australia:"AU",
Austria:"AT",
Azerbaijan:"AZ",
Bahamas:"BS",
Bahrain:"BH",
Bangladesh:"BD",
Barbados:"BB",
Belarus:"BY",
Belgium:"BE",
Belize:"BZ",
Benin:"BJ",
Bermuda:"BM",
Bhutan:"BT",
"Bolivia, Plurinational State of":"BO",
"Bonaire, Sint Eustatius and Saba":"BQ",
"Bosnia and Herzegovina":"BA",
Botswana:"BW",
"Bouvet Island":"BV",
Brazil:"BR",
"British Indian Ocean Territory":"IO",
"Brunei Darussalam":"BN",
Bulgaria:"BG",
"Burkina Faso":"BF",
Burundi:"BI",
Cambodia:"KH",
Cameroon:"CM",
Canada:"CA",
"Cape Verde":"CV",
"Cayman Islands":"KY",
"Central African Republic":"CF",
Chad:"TD",
Chile:"CL",
China:"CN",
"Christmas Island":"CX",
"Cocos (Keeling) Islands":"CC",
Colombia:"CO",
Comoros:"KM",
Congo:"CG",
"Congo, the Democratic Republic of the":"CD",
"Cook Islands":"CK",
"Costa Rica":"CR",
Croatia:"HR",
Cuba:"CU",
Curaçao:"CW",
Cyprus:"CY",
"Czech Republic":"CZ",
"Côte d'Ivoire":"CI",
Denmark:"DK",
Djibouti:"DJ",
Dominica:"DM",
"Dominican Republic":"DO",
Ecuador:"EC",
Egypt:"EG",
"El Salvador":"SV",
"Equatorial Guinea":"GQ",
Eritrea:"ER",
Estonia:"EE",
Ethiopia:"ET",
"Falkland Islands (Malvinas)":"FK",
"Faroe Islands":"FO",
Fiji:"FJ",
Finland:"FI",
France:"FR",
"French Guiana":"GF",
"French Polynesia":"PF",
"French Southern Territories":"TF",
Gabon:"GA",
Gambia:"GM",
Georgia:"GE",
Germany:"DE",
Ghana:"GH",
Gibraltar:"GI",
Greece:"GR",
Greenland:"GL",
Grenada:"GD",
Guadeloupe:"GP",
Guam:"GU",
Guatemala:"GT",
Guernsey:"GG",
Guinea:"GN",
"Guinea-Bissau":"GW",
Guyana:"GY",
Haiti:"HT",
"Heard Island and McDonald Islands":"HM",
"Holy See (Vatican City State)":"VA",
Honduras:"HN",
"Hong Kong":"HK",
Hungary:"HU",
Iceland:"IS",
India:"IN",
Indonesia:"ID",
"Iran, Islamic Republic of":"IR",
Iraq:"IQ",
Ireland:"IE",
"Isle of Man":"IM",
Israel:"IL",
Italy:"IT",
Jamaica:"JM",
Japan:"JP",
Jersey:"JE",
Jordan:"JO",
Kazakhstan:"KZ",
Kenya:"KE",
Kiribati:"KI",
"Korea, Democratic People's Republic of":"KP",
"Korea, Republic of":"KR",
Kuwait:"KW",
Kyrgyzstan:"KG",
"Lao People's Democratic Republic":"LA",
Latvia:"LV",
Lebanon:"LB",
Lesotho:"LS",
Liberia:"LR",
Libya:"LY",
Liechtenstein:"LI",
Lithuania:"LT",
Luxembourg:"LU",
Macao:"MO",
"Macedonia, the former Yugoslav Republic of":"MK",
Madagascar:"MG",
Malawi:"MW",
Malaysia:"MY",
Maldives:"MV",
Mali:"ML",
Malta:"MT",
"Marshall Islands":"MH",
Martinique:"MQ",
Mauritania:"MR",
Mauritius:"MU",
Mayotte:"YT",
Mexico:"MX",
"Micronesia, Federated States of":"FM",
"Moldova, Republic of":"MD",
Monaco:"MC",
Mongolia:"MN",
Montenegro:"ME",
Montserrat:"MS",
Morocco:"MA",
Mozambique:"MZ",
Myanmar:"MM",
Namibia:"NA",
Nauru:"NR",
Nepal:"NP",
Netherlands:"NL",
"New Caledonia":"NC",
"New Zealand":"NZ",
Nicaragua:"NI",
Niger:"NE",
Nigeria:"NG",
Niue:"NU",
"Norfolk Island":"NF",
"Northern Mariana Islands":"MP",
Norway:"NO",
Oman:"OM",
Pakistan:"PK",
Palau:"PW",
"Palestinian Territory, Occupied":"PS",
Panama:"PA",
"Papua New Guinea":"PG",
Paraguay:"PY",
Peru:"PE",
Philippines:"PH",
Pitcairn:"PN",
Poland:"PL",
Portugal:"PT",
"Puerto Rico":"PR",
Qatar:"QA",
Romania:"RO",
"Russian Federation":"RU",
Rwanda:"RW",
Réunion:"RE",
"Saint Barthélemy":"BL",
"Saint Helena, Ascension and Tristan da Cunha":"SH",
"Saint Kitts and Nevis":"KN",
"Saint Lucia":"LC",
"Saint Martin (French part)":"MF",
"Saint Pierre and Miquelon":"PM",
"Saint Vincent and the Grenadines":"VC",
Samoa:"WS",
"San Marino":"SM",
"Sao Tome and Principe":"ST",
"Saudi Arabia":"SA",
Senegal:"SN",
Serbia:"RS",
Seychelles:"SC",
"Sierra Leone":"SL",
Singapore:"SG",
"Sint Maarten (Dutch part)":"SX",
Slovakia:"SK",
Slovenia:"SI",
"Solomon Islands":"SB",
Somalia:"SO",
"South Africa":"ZA",
"South Georgia and the South Sandwich Islands":"GS",
"South Sudan":"SS",
Spain:"ES",
"Sri Lanka":"LK",
Sudan:"SD",
Suriname:"SR",
"Svalbard and Jan Mayen":"SJ",
Swaziland:"SZ",
Sweden:"SE",
Switzerland:"CH",
"Syrian Arab Republic":"SY",
Taiwan:"TW",
Tajikistan:"TJ",
"Tanzania, United Republic of":"TZ",
Thailand:"TH",
"Timor-Leste":"TL",
Togo:"TG",
Tokelau:"TK",
Tonga:"TO",
"Trinidad and Tobago":"TT",
Tunisia:"TN",
Turkey:"TR",
Turkmenistan:"TM",
"Turks and Caicos Islands":"TC",
Tuvalu:"TV",
Uganda:"UG",
Ukraine:"UA",
"United Arab Emirates":"AE",
"United Kingdom":"GB",
"United States":"US",
"United States Minor Outlying Islands":"UM",
Uruguay:"UY",
Uzbekistan:"UZ",
Vanuatu:"VU",
"Venezuela, Bolivarian Republic of":"VE",
"Viet Nam":"VN",
"Virgin Islands, British":"VG",
"Virgin Islands, U.S.":"VI",
"Wallis and Futuna":"WF",
"Western Sahara":"EH",
Yemen:"YE",
Zambia:"ZM",
Zimbabwe:"ZW",
"Åland Islands":"AX"
};

(function() {
var Offline, checkXHR, defaultOptions, extendNative, grab, handlers, init;
extendNative = function(to, from) {
var e, key, val, _results;
_results = [];
for (key in from.prototype) try {
val = from.prototype[key], null == to[key] && "function" != typeof val ? _results.push(to[key] = val) :_results.push(void 0);
} catch (_error) {
e = _error;
}
return _results;
}, Offline = {}, null == Offline.options && (Offline.options = {}), defaultOptions = {
checks:{
xhr:{
url:function() {
return $.cookie("cdn_url") ? "https://" + $.cookie("cdn_url") + "/status.html?_=" + Math.floor(1e9 * Math.random()) :"https://hrcdn.net/status.html?_=" + Math.floor(1e9 * Math.random());
}
},
image:{
url:function() {
return "http://dqakt69vkj09v.cloudfront.net/are-we-online.gif?_=" + Math.floor(1e9 * Math.random());
}
},
active:"xhr"
},
checkOnLoad:!1,
interceptRequests:!0,
reconnect:!0
}, grab = function(obj, key) {
var cur, i, part, parts, _i, _len;
for (cur = obj, parts = key.split("."), i = _i = 0, _len = parts.length; _len > _i && (part = parts[i], 
cur = cur[part], "object" == typeof cur); i = ++_i) ;
return i === parts.length - 1 ? cur :void 0;
}, Offline.getOption = function(key) {
var val, _ref;
return val = null != (_ref = grab(Offline.options, key)) ? _ref :grab(defaultOptions, key), 
"function" == typeof val ? val() :val;
}, "function" == typeof window.addEventListener && window.addEventListener("online", function() {
return setTimeout(Offline.confirmUp, 100);
}, !1), "function" == typeof window.addEventListener && window.addEventListener("offline", function() {
return Offline.confirmDown();
}, !1), Offline.state = "up", Offline.markUp = function() {
return Offline.trigger("confirmed-up"), "up" !== Offline.state ? (Offline.state = "up", 
Offline.trigger("up")) :void 0;
}, Offline.markDown = function() {
return Offline.trigger("confirmed-down"), "down" !== Offline.state ? (Offline.state = "down", 
Offline.trigger("down")) :void 0;
}, handlers = {}, Offline.on = function(event, handler, ctx) {
var e, events, _i, _len, _results;
if (events = event.split(" "), events.length > 1) {
for (_results = [], _i = 0, _len = events.length; _len > _i; _i++) e = events[_i], 
_results.push(Offline.on(e, handler, ctx));
return _results;
}
return null == handlers[event] && (handlers[event] = []), handlers[event].push([ ctx, handler ]);
}, Offline.off = function(event, handler) {
var ctx, i, _handler, _ref, _results;
if (null != handlers[event]) {
if (handler) {
for (i = 0, _results = []; i < handlers[event].length; ) _ref = handlers[event][i], 
ctx = _ref[0], _handler = _ref[1], _handler === handler ? _results.push(handlers[event].splice(i, 1)) :_results.push(i++);
return _results;
}
return handlers[event] = [];
}
}, Offline.trigger = function(event) {
var ctx, handler, _i, _len, _ref, _ref1, _results;
if (null != handlers[event]) {
for (_ref = handlers[event], _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) _ref1 = _ref[_i], 
ctx = _ref1[0], handler = _ref1[1], _results.push(handler.call(ctx));
return _results;
}
}, checkXHR = function(xhr, onUp, onDown) {
var checkStatus, _onreadystatechange;
return checkStatus = function() {
return xhr.status && xhr.status < 12e3 ? onUp() :onDown();
}, null === xhr.onprogress ? (xhr.addEventListener("error", onDown, !1), xhr.addEventListener("timeout", onDown, !1), 
xhr.addEventListener("load", checkStatus, !1)) :(_onreadystatechange = xhr.onreadystatechange, 
xhr.onreadystatechange = function() {
return 4 === xhr.readyState ? checkStatus() :0 === xhr.readyState && onDown(), "function" == typeof _onreadystatechange ? _onreadystatechange.apply(null, arguments) :void 0;
});
}, Offline.checks = {}, Offline.checks.xhr = function() {
var e, xhr;
xhr = new XMLHttpRequest(), xhr.offline = !1, xhr.open("HEAD", Offline.getOption("checks.xhr.url"), !0), 
checkXHR(xhr, Offline.markUp, Offline.markDown);
try {
xhr.send();
} catch (_error) {
e = _error, Offline.markDown();
}
return xhr;
}, Offline.checks.image = function() {
var img;
return img = document.createElement("img"), img.onerror = Offline.markDown, img.onload = Offline.markUp, 
img.src = Offline.getOption("checks.image.url"), void 0;
}, Offline.check = function() {
return Offline.trigger("checking"), Offline.checks[Offline.getOption("checks.active")]();
}, Offline.confirmUp = Offline.confirmDown = Offline.check, Offline.onXHR = function(cb) {
var monitorXHR, _XDomainRequest, _XMLHttpRequest;
return monitorXHR = function(req, flags) {
var _open;
return _open = req.open, req.open = function(type, url, async, user, password) {
return cb({
type:type,
url:url,
async:async,
flags:flags,
user:user,
password:password,
xhr:req
}), _open.apply(req, arguments);
};
}, _XMLHttpRequest = window.XMLHttpRequest, window.XMLHttpRequest = function(flags) {
var req, _overrideMimeType, _setRequestHeader;
return req = new _XMLHttpRequest(flags), monitorXHR(req, flags), _setRequestHeader = req.setRequestHeader, 
req.headers = {}, req.setRequestHeader = function(name, value) {
return req.headers[name] = value, _setRequestHeader.call(req, name, value);
}, _overrideMimeType = req.overrideMimeType, req.overrideMimeType = function(type) {
return req.mimeType = type, _overrideMimeType.call(req, type);
}, req;
}, extendNative(window.XMLHttpRequest, _XMLHttpRequest), null != window.XDomainRequest ? (_XDomainRequest = window.XDomainRequest, 
window.XDomainRequest = function() {
var req;
return req = new _XDomainRequest(), monitorXHR(req), req;
}, extendNative(window.XDomainRequest, _XDomainRequest)) :void 0;
}, init = function() {
return Offline.getOption("interceptRequests") && Offline.onXHR(function(_arg) {
var xhr;
return xhr = _arg.xhr, xhr.offline !== !1 ? checkXHR(xhr, Offline.confirmUp, Offline.confirmDown) :void 0;
}), Offline.getOption("checkOnLoad") ? Offline.check() :void 0;
}, setTimeout(init, 0), window.Offline = Offline;
}).call(this), function() {
var down, next, nope, rc, reset, retryIntv, tick, tryNow, up;
if (!window.Offline) throw new Error("Offline Reconnect brought in without offline.js");
rc = Offline.reconnect = {}, retryIntv = null, reset = function() {
var _ref;
return null != rc.state && "inactive" !== rc.state && Offline.trigger("reconnect:stopped"), 
rc.state = "inactive", rc.remaining = rc.delay = null != (_ref = Offline.getOption("reconnect.initialDelay")) ? _ref :3;
}, next = function() {
var delay, _ref;
return delay = null != (_ref = Offline.getOption("reconnect.delay")) ? _ref :Math.min(Math.ceil(1.5 * rc.delay), 3600), 
rc.remaining = rc.delay = delay;
}, tick = function() {
return "connecting" !== rc.state ? (rc.remaining -= 1, Offline.trigger("reconnect:tick"), 
0 === rc.remaining ? tryNow() :void 0) :void 0;
}, tryNow = function() {
return "waiting" === rc.state ? (Offline.trigger("reconnect:connecting"), rc.state = "connecting", 
Offline.check()) :void 0;
}, down = function() {
return Offline.getOption("reconnect") ? (reset(), rc.state = "waiting", Offline.trigger("reconnect:started"), 
retryIntv = setInterval(tick, 1e3)) :void 0;
}, up = function() {
return null != retryIntv && clearInterval(retryIntv), reset();
}, nope = function() {
return Offline.getOption("reconnect") ? "connecting" === rc.state ? (Offline.trigger("reconnect:failure"), 
rc.state = "waiting", next()) :void 0 :void 0;
}, rc.tryNow = tryNow, reset(), Offline.on("down", down), Offline.on("confirmed-down", nope), 
Offline.on("up", up);
}.call(this), function() {
var clear, flush, held, holdRequest, makeRequest, waitingOnConfirm;
if (!window.Offline) throw new Error("Requests module brought in without offline.js");
held = [], waitingOnConfirm = !1, holdRequest = function(req) {
return Offline.trigger("requests:capture"), "down" !== Offline.state && (waitingOnConfirm = !0), 
held.push(req);
}, makeRequest = function(_arg) {
var body, name, password, type, url, user, val, xhr, _ref;
xhr = _arg.xhr, url = _arg.url, type = _arg.type, user = _arg.user, password = _arg.password, 
body = _arg.body, xhr.abort(), xhr.open(type, url, !0, user, password), _ref = xhr.headers;
for (name in _ref) val = _ref[name], xhr.setRequestHeader(name, val);
return xhr.mimeType && xhr.overrideMimeType(xhr.mimeType), xhr.send(body);
}, clear = function() {
return held = [];
}, flush = function() {
var key, request, requests, url, _i, _len;
for (Offline.trigger("requests:flush"), requests = {}, _i = 0, _len = held.length; _len > _i; _i++) request = held[_i], 
url = request.url.replace(/(\?|&)_=[0-9]+/, function(match, char) {
return "?" === char ? char :"";
}), requests["" + request.type.toUpperCase() + " - " + url] = request;
for (key in requests) request = requests[key], makeRequest(request);
return clear();
}, setTimeout(function() {
return Offline.getOption("requests") !== !1 ? (Offline.on("confirmed-up", function() {
return waitingOnConfirm ? (waitingOnConfirm = !1, clear()) :void 0;
}), Offline.on("up", flush), Offline.on("down", function() {
return waitingOnConfirm = !1;
}), Offline.onXHR(function(request) {
var async, hold, xhr, _onreadystatechange, _send;
return xhr = request.xhr, async = request.async, xhr.offline !== !1 && (hold = function() {
return holdRequest(request);
}, _send = xhr.send, xhr.send = function(body) {
return request.body = body, _send.apply(xhr, arguments);
}, async) ? null === xhr.onprogress ? (xhr.addEventListener("error", hold, !1), 
xhr.addEventListener("timeout", hold, !1)) :(_onreadystatechange = xhr.onreadystatechange, 
xhr.onreadystatechange = function() {
return 0 === xhr.readyState ? hold() :4 === xhr.readyState && (0 === xhr.status || xhr.status >= 12e3) && hold(), 
"function" == typeof _onreadystatechange ? _onreadystatechange.apply(null, arguments) :void 0;
}) :void 0;
}), Offline.requests = {
flush:flush,
clear:clear
}) :void 0;
}, 0);
}.call(this), function() {
var RETRY_TEMPLATE, TEMPLATE, addClass, content, createFromHTML, el, flashClass, flashTimeouts, formatTime, init, removeClass, render, _onreadystatechange;
if (!window.Offline) throw new Error("Offline UI brought in without offline.js");
TEMPLATE = '<div class="offline-ui"><div class="offline-ui-content"></div></div>', 
RETRY_TEMPLATE = '<a href class="offline-ui-retry"></a>', createFromHTML = function(html) {
var el;
return el = document.createElement("div"), el.innerHTML = html, el.children[0];
}, el = content = null, addClass = function(name) {
return removeClass(name), el.className += " " + name;
}, removeClass = function(name) {
return el.className = el.className.replace(new RegExp("(^| )" + name.split(" ").join("|") + "( |$)", "gi"), " ");
}, flashTimeouts = {}, flashClass = function(name, time) {
return addClass(name), null != flashTimeouts[name] && clearTimeout(flashTimeouts[name]), 
flashTimeouts[name] = setTimeout(function() {
return removeClass(name), delete flashTimeouts[name];
}, 1e3 * time);
}, formatTime = function(sec, long) {
var formatters, longUnits, mult, out, unit, val;
if (null == long && (long = !1), 0 === sec) return "now";
formatters = {
d:86400,
h:3600,
m:60,
s:1
}, longUnits = {
s:"second",
m:"minute",
h:"hour",
d:"day"
}, out = "";
for (unit in formatters) if (mult = formatters[unit], sec >= mult) return val = Math.floor(sec / mult), 
long && (unit = " " + longUnits[unit], 1 !== val && (unit += "s")), "" + val + unit;
}, render = function() {
var button, handler;
return el = createFromHTML(TEMPLATE), document.body.appendChild(el), null != Offline.reconnect && Offline.getOption("reconnect") && (el.appendChild(createFromHTML(RETRY_TEMPLATE)), 
button = el.querySelector(".offline-ui-retry"), handler = function(e) {
return e.preventDefault(), Offline.reconnect.tryNow();
}, null != button.addEventListener ? button.addEventListener("click", handler, !1) :button.attachEvent("click", handler)), 
addClass("offline-ui-" + Offline.state), content = el.querySelector(".offline-ui-content");
}, init = function() {
return render(), Offline.on("up", function() {
return removeClass("offline-ui-down"), addClass("offline-ui-up"), flashClass("offline-ui-up-2s", 2), 
flashClass("offline-ui-up-5s", 5);
}), Offline.on("down", function() {
return removeClass("offline-ui-up"), addClass("offline-ui-down"), flashClass("offline-ui-down-2s", 2), 
flashClass("offline-ui-down-5s", 5);
}), Offline.on("reconnect:connecting", function() {
return addClass("offline-ui-connecting"), removeClass("offline-ui-waiting");
}), Offline.on("reconnect:tick", function() {
return addClass("offline-ui-waiting"), removeClass("offline-ui-connecting"), content.setAttribute("data-retry-in-seconds", Offline.reconnect.remaining), 
content.setAttribute("data-retry-in-abbr", formatTime(Offline.reconnect.remaining)), 
content.setAttribute("data-retry-in", formatTime(Offline.reconnect.remaining, !0));
}), Offline.on("reconnect:stopped", function() {
return removeClass("offline-ui-connecting offline-ui-waiting"), content.setAttribute("data-retry-in-seconds", null), 
content.setAttribute("data-retry-in-abbr", null), content.setAttribute("data-retry-in", null);
}), Offline.on("reconnect:failure", function() {
return flashClass("offline-ui-reconnect-failed-2s", 2), flashClass("offline-ui-reconnect-failed-5s", 5);
}), Offline.on("reconnect:success", function() {
return flashClass("offline-ui-reconnect-succeeded-2s", 2), flashClass("offline-ui-reconnect-succeeded-5s", 5);
});
}, "complete" === document.readyState ? init() :null != document.addEventListener ? document.addEventListener("DOMContentLoaded", init, !1) :(_onreadystatechange = document.onreadystatechange, 
document.onreadystatechange = function() {
return "complete" === document.readyState && init(), "function" == typeof _onreadystatechange ? _onreadystatechange.apply(null, arguments) :void 0;
});
}.call(this), require__.modules = {}, require__.aliases = {}, require__.resolve = function(path) {
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
}, "function" != typeof Object.create && (Object.create = function(o) {
function F() {}
return F.prototype = o, new F();
}), "function" != typeof String.prototype.toTitleCase && (String.prototype.toTitleCase = function() {
return this.replace(/\w\S*/g, function(txt) {
return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
});
}), "function" != typeof String.prototype.toProperCase && (String.prototype.toProperCase = function() {
return this.replace(/\w\S*/g, function(txt) {
return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
});
}), "function" != typeof Number.prototype.round && (Number.prototype.round = function(decimalPlaces) {
"number" != typeof decimalPlaces && (decimalPlaces = 2);
var multiplier = Math.pow(10, decimalPlaces);
return Math.round(this * multiplier) / multiplier;
}), "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
});