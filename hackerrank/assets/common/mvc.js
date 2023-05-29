(function() {
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
}).call(this), function() {
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
}(jQuery);

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.4 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
var requirejs, require, define;

!function(global) {
function isFunction(it) {
return "[object Function]" === ostring.call(it);
}
function isArray(it) {
return "[object Array]" === ostring.call(it);
}
function each(ary, func) {
if (ary) {
var i;
for (i = 0; i < ary.length && (!ary[i] || !func(ary[i], i, ary)); i += 1) ;
}
}
function eachReverse(ary, func) {
if (ary) {
var i;
for (i = ary.length - 1; i > -1 && (!ary[i] || !func(ary[i], i, ary)); i -= 1) ;
}
}
function hasProp(obj, prop) {
return hasOwn.call(obj, prop);
}
function getOwn(obj, prop) {
return hasProp(obj, prop) && obj[prop];
}
function eachProp(obj, func) {
var prop;
for (prop in obj) if (hasProp(obj, prop) && func(obj[prop], prop)) break;
}
function mixin(target, source, force, deepStringMixin) {
return source && eachProp(source, function(value, prop) {
(force || !hasProp(target, prop)) && (deepStringMixin && "string" != typeof value ? (target[prop] || (target[prop] = {}), 
mixin(target[prop], value, force, deepStringMixin)) :target[prop] = value);
}), target;
}
function bind(obj, fn) {
return function() {
return fn.apply(obj, arguments);
};
}
function scripts() {
return document.getElementsByTagName("script");
}
function getGlobal(value) {
if (!value) return value;
var g = global;
return each(value.split("."), function(part) {
g = g[part];
}), g;
}
function makeError(id, msg, err, requireModules) {
var e = new Error(msg + "\nhttp://requirejs.org/docs/errors.html#" + id);
return e.requireType = id, e.requireModules = requireModules, err && (e.originalError = err), 
e;
}
function newContext(contextName) {
function trimDots(ary) {
var i, part;
for (i = 0; ary[i]; i += 1) if (part = ary[i], "." === part) ary.splice(i, 1), i -= 1; else if (".." === part) {
if (1 === i && (".." === ary[2] || ".." === ary[0])) break;
i > 0 && (ary.splice(i - 1, 2), i -= 2);
}
}
function normalize(name, baseName, applyMap) {
var pkgName, pkgConfig, mapValue, nameParts, i, j, nameSegment, foundMap, foundI, foundStarMap, starI, baseParts = baseName && baseName.split("/"), normalizedBaseParts = baseParts, map = config.map, starMap = map && map["*"];
if (name && "." === name.charAt(0) && (baseName ? (normalizedBaseParts = getOwn(config.pkgs, baseName) ? baseParts = [ baseName ] :baseParts.slice(0, baseParts.length - 1), 
name = normalizedBaseParts.concat(name.split("/")), trimDots(name), pkgConfig = getOwn(config.pkgs, pkgName = name[0]), 
name = name.join("/"), pkgConfig && name === pkgName + "/" + pkgConfig.main && (name = pkgName)) :0 === name.indexOf("./") && (name = name.substring(2))), 
applyMap && (baseParts || starMap) && map) {
for (nameParts = name.split("/"), i = nameParts.length; i > 0; i -= 1) {
if (nameSegment = nameParts.slice(0, i).join("/"), baseParts) for (j = baseParts.length; j > 0; j -= 1) if (mapValue = getOwn(map, baseParts.slice(0, j).join("/")), 
mapValue && (mapValue = getOwn(mapValue, nameSegment))) {
foundMap = mapValue, foundI = i;
break;
}
if (foundMap) break;
!foundStarMap && starMap && getOwn(starMap, nameSegment) && (foundStarMap = getOwn(starMap, nameSegment), 
starI = i);
}
!foundMap && foundStarMap && (foundMap = foundStarMap, foundI = starI), foundMap && (nameParts.splice(0, foundI, foundMap), 
name = nameParts.join("/"));
}
return name;
}
function removeScript(name) {
isBrowser && each(scripts(), function(scriptNode) {
return scriptNode.getAttribute("data-requiremodule") === name && scriptNode.getAttribute("data-requirecontext") === context.contextName ? (scriptNode.parentNode.removeChild(scriptNode), 
!0) :void 0;
});
}
function hasPathFallback(id) {
var pathConfig = getOwn(config.paths, id);
return pathConfig && isArray(pathConfig) && pathConfig.length > 1 ? (removeScript(id), 
pathConfig.shift(), context.require.undef(id), context.require([ id ]), !0) :void 0;
}
function splitPrefix(name) {
var prefix, index = name ? name.indexOf("!") :-1;
return index > -1 && (prefix = name.substring(0, index), name = name.substring(index + 1, name.length)), 
[ prefix, name ];
}
function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
var url, pluginModule, suffix, nameParts, prefix = null, parentName = parentModuleMap ? parentModuleMap.name :null, originalName = name, isDefine = !0, normalizedName = "";
return name || (isDefine = !1, name = "_@r" + (requireCounter += 1)), nameParts = splitPrefix(name), 
prefix = nameParts[0], name = nameParts[1], prefix && (prefix = normalize(prefix, parentName, applyMap), 
pluginModule = getOwn(defined, prefix)), name && (prefix ? normalizedName = pluginModule && pluginModule.normalize ? pluginModule.normalize(name, function(name) {
return normalize(name, parentName, applyMap);
}) :normalize(name, parentName, applyMap) :(normalizedName = normalize(name, parentName, applyMap), 
nameParts = splitPrefix(normalizedName), prefix = nameParts[0], normalizedName = nameParts[1], 
isNormalized = !0, url = context.nameToUrl(normalizedName))), suffix = !prefix || pluginModule || isNormalized ? "" :"_unnormalized" + (unnormalizedCounter += 1), 
{
prefix:prefix,
name:normalizedName,
parentMap:parentModuleMap,
unnormalized:!!suffix,
url:url,
originalName:originalName,
isDefine:isDefine,
id:(prefix ? prefix + "!" + normalizedName :normalizedName) + suffix
};
}
function getModule(depMap) {
var id = depMap.id, mod = getOwn(registry, id);
return mod || (mod = registry[id] = new context.Module(depMap)), mod;
}
function on(depMap, name, fn) {
var id = depMap.id, mod = getOwn(registry, id);
!hasProp(defined, id) || mod && !mod.defineEmitComplete ? getModule(depMap).on(name, fn) :"defined" === name && fn(defined[id]);
}
function onError(err, errback) {
var ids = err.requireModules, notified = !1;
errback ? errback(err) :(each(ids, function(id) {
var mod = getOwn(registry, id);
mod && (mod.error = err, mod.events.error && (notified = !0, mod.emit("error", err)));
}), notified || req.onError(err));
}
function takeGlobalQueue() {
globalDefQueue.length && (apsp.apply(defQueue, [ defQueue.length - 1, 0 ].concat(globalDefQueue)), 
globalDefQueue = []);
}
function cleanRegistry(id) {
delete registry[id];
}
function breakCycle(mod, traced, processed) {
var id = mod.map.id;
mod.error ? mod.emit("error", mod.error) :(traced[id] = !0, each(mod.depMaps, function(depMap, i) {
var depId = depMap.id, dep = getOwn(registry, depId);
!dep || mod.depMatched[i] || processed[depId] || (getOwn(traced, depId) ? (mod.defineDep(i, defined[depId]), 
mod.check()) :breakCycle(dep, traced, processed));
}), processed[id] = !0);
}
function checkLoaded() {
var map, modId, err, usingPathFallback, waitInterval = 1e3 * config.waitSeconds, expired = waitInterval && context.startTime + waitInterval < new Date().getTime(), noLoads = [], reqCalls = [], stillLoading = !1, needCycleCheck = !0;
if (!inCheckLoaded) {
if (inCheckLoaded = !0, eachProp(registry, function(mod) {
if (map = mod.map, modId = map.id, mod.enabled && (map.isDefine || reqCalls.push(mod), 
!mod.error)) if (!mod.inited && expired) hasPathFallback(modId) ? (usingPathFallback = !0, 
stillLoading = !0) :(noLoads.push(modId), removeScript(modId)); else if (!mod.inited && mod.fetched && map.isDefine && (stillLoading = !0, 
!map.prefix)) return needCycleCheck = !1;
}), expired && noLoads.length) return err = makeError("timeout", "Load timeout for modules: " + noLoads, null, noLoads), 
err.contextName = context.contextName, onError(err);
needCycleCheck && each(reqCalls, function(mod) {
breakCycle(mod, {}, {});
}), expired && !usingPathFallback || !stillLoading || !isBrowser && !isWebWorker || checkLoadedTimeoutId || (checkLoadedTimeoutId = setTimeout(function() {
checkLoadedTimeoutId = 0, checkLoaded();
}, 50)), inCheckLoaded = !1;
}
}
function callGetModule(args) {
hasProp(defined, args[0]) || getModule(makeModuleMap(args[0], null, !0)).init(args[1], args[2]);
}
function removeListener(node, func, name, ieName) {
node.detachEvent && !isOpera ? ieName && node.detachEvent(ieName, func) :node.removeEventListener(name, func, !1);
}
function getScriptData(evt) {
var node = evt.currentTarget || evt.srcElement;
return removeListener(node, context.onScriptLoad, "load", "onreadystatechange"), 
removeListener(node, context.onScriptError, "error"), {
node:node,
id:node && node.getAttribute("data-requiremodule")
};
}
function intakeDefines() {
var args;
for (takeGlobalQueue(); defQueue.length; ) {
if (args = defQueue.shift(), null === args[0]) return onError(makeError("mismatch", "Mismatched anonymous define() module: " + args[args.length - 1]));
callGetModule(args);
}
}
var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = {
waitSeconds:7,
baseUrl:"./",
paths:{},
pkgs:{},
shim:{},
map:{},
config:{}
}, registry = {}, undefEvents = {}, defQueue = [], defined = {}, urlFetched = {}, requireCounter = 1, unnormalizedCounter = 1;
return handlers = {
require:function(mod) {
return mod.require ? mod.require :mod.require = context.makeRequire(mod.map);
},
exports:function(mod) {
return mod.usingExports = !0, mod.map.isDefine ? mod.exports ? mod.exports :mod.exports = defined[mod.map.id] = {} :void 0;
},
module:function(mod) {
return mod.module ? mod.module :mod.module = {
id:mod.map.id,
uri:mod.map.url,
config:function() {
return config.config && getOwn(config.config, mod.map.id) || {};
},
exports:defined[mod.map.id]
};
}
}, Module = function(map) {
this.events = getOwn(undefEvents, map.id) || {}, this.map = map, this.shim = getOwn(config.shim, map.id), 
this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, 
this.depCount = 0;
}, Module.prototype = {
init:function(depMaps, factory, errback, options) {
options = options || {}, this.inited || (this.factory = factory, errback ? this.on("error", errback) :this.events.error && (errback = bind(this, function(err) {
this.emit("error", err);
})), this.depMaps = depMaps && depMaps.slice(0), this.errback = errback, this.inited = !0, 
this.ignore = options.ignore, options.enabled || this.enabled ? this.enable() :this.check());
},
defineDep:function(i, depExports) {
this.depMatched[i] || (this.depMatched[i] = !0, this.depCount -= 1, this.depExports[i] = depExports);
},
fetch:function() {
if (!this.fetched) {
this.fetched = !0, context.startTime = new Date().getTime();
var map = this.map;
return this.shim ? (context.makeRequire(this.map, {
enableBuildCallback:!0
})(this.shim.deps || [], bind(this, function() {
return map.prefix ? this.callPlugin() :this.load();
})), void 0) :map.prefix ? this.callPlugin() :this.load();
}
},
load:function() {
var url = this.map.url;
urlFetched[url] || (urlFetched[url] = !0, context.load(this.map.id, url));
},
check:function() {
if (this.enabled && !this.enabling) {
var err, cjsModule, id = this.map.id, depExports = this.depExports, exports = this.exports, factory = this.factory;
if (this.inited) {
if (this.error) this.emit("error", this.error); else if (!this.defining) {
if (this.defining = !0, this.depCount < 1 && !this.defined) {
if (isFunction(factory)) {
if (this.events.error) try {
exports = context.execCb(id, factory, depExports, exports);
} catch (e) {
err = e;
} else exports = context.execCb(id, factory, depExports, exports);
if (this.map.isDefine && (cjsModule = this.module, cjsModule && void 0 !== cjsModule.exports && cjsModule.exports !== this.exports ? exports = cjsModule.exports :void 0 === exports && this.usingExports && (exports = this.exports)), 
err) return err.requireMap = this.map, err.requireModules = [ this.map.id ], err.requireType = "define", 
onError(this.error = err);
} else exports = factory;
this.exports = exports, this.map.isDefine && !this.ignore && (defined[id] = exports, 
req.onResourceLoad && req.onResourceLoad(context, this.map, this.depMaps)), delete registry[id], 
this.defined = !0;
}
this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, 
this.emit("defined", this.exports), this.defineEmitComplete = !0);
}
} else this.fetch();
}
},
callPlugin:function() {
var map = this.map, id = map.id, pluginMap = makeModuleMap(map.prefix);
this.depMaps.push(pluginMap), on(pluginMap, "defined", bind(this, function(plugin) {
var load, normalizedMap, normalizedMod, name = this.map.name, parentName = this.map.parentMap ? this.map.parentMap.name :null, localRequire = context.makeRequire(map.parentMap, {
enableBuildCallback:!0
});
return this.map.unnormalized ? (plugin.normalize && (name = plugin.normalize(name, function(name) {
return normalize(name, parentName, !0);
}) || ""), normalizedMap = makeModuleMap(map.prefix + "!" + name, this.map.parentMap), 
on(normalizedMap, "defined", bind(this, function(value) {
this.init([], function() {
return value;
}, null, {
enabled:!0,
ignore:!0
});
})), normalizedMod = getOwn(registry, normalizedMap.id), normalizedMod && (this.depMaps.push(normalizedMap), 
this.events.error && normalizedMod.on("error", bind(this, function(err) {
this.emit("error", err);
})), normalizedMod.enable()), void 0) :(load = bind(this, function(value) {
this.init([], function() {
return value;
}, null, {
enabled:!0
});
}), load.error = bind(this, function(err) {
this.inited = !0, this.error = err, err.requireModules = [ id ], eachProp(registry, function(mod) {
0 === mod.map.id.indexOf(id + "_unnormalized") && cleanRegistry(mod.map.id);
}), onError(err);
}), load.fromText = bind(this, function(text, textAlt) {
var moduleName = map.name, moduleMap = makeModuleMap(moduleName), hasInteractive = useInteractive;
textAlt && (text = textAlt), hasInteractive && (useInteractive = !1), getModule(moduleMap), 
hasProp(config.config, id) && (config.config[moduleName] = config.config[id]);
try {
req.exec(text);
} catch (e) {
return onError(makeError("fromtexteval", "fromText eval for " + id + " failed: " + e, e, [ id ]));
}
hasInteractive && (useInteractive = !0), this.depMaps.push(moduleMap), context.completeLoad(moduleName), 
localRequire([ moduleName ], load);
}), plugin.load(map.name, localRequire, load, config), void 0);
})), context.enable(pluginMap, this), this.pluginMaps[pluginMap.id] = pluginMap;
},
enable:function() {
this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(depMap, i) {
var id, mod, handler;
if ("string" == typeof depMap) {
if (depMap = makeModuleMap(depMap, this.map.isDefine ? this.map :this.map.parentMap, !1, !this.skipMap), 
this.depMaps[i] = depMap, handler = getOwn(handlers, depMap.id)) return this.depExports[i] = handler(this), 
void 0;
this.depCount += 1, on(depMap, "defined", bind(this, function(depExports) {
this.defineDep(i, depExports), this.check();
})), this.errback && on(depMap, "error", this.errback);
}
id = depMap.id, mod = registry[id], hasProp(handlers, id) || !mod || mod.enabled || context.enable(depMap, this);
})), eachProp(this.pluginMaps, bind(this, function(pluginMap) {
var mod = getOwn(registry, pluginMap.id);
mod && !mod.enabled && context.enable(pluginMap, this);
})), this.enabling = !1, this.check();
},
on:function(name, cb) {
var cbs = this.events[name];
cbs || (cbs = this.events[name] = []), cbs.push(cb);
},
emit:function(name, evt) {
each(this.events[name], function(cb) {
cb(evt);
}), "error" === name && delete this.events[name];
}
}, context = {
config:config,
contextName:contextName,
registry:registry,
defined:defined,
urlFetched:urlFetched,
defQueue:defQueue,
Module:Module,
makeModuleMap:makeModuleMap,
nextTick:req.nextTick,
configure:function(cfg) {
cfg.baseUrl && "/" !== cfg.baseUrl.charAt(cfg.baseUrl.length - 1) && (cfg.baseUrl += "/");
var pkgs = config.pkgs, shim = config.shim, objs = {
paths:!0,
config:!0,
map:!0
};
eachProp(cfg, function(value, prop) {
objs[prop] ? "map" === prop ? mixin(config[prop], value, !0, !0) :mixin(config[prop], value, !0) :config[prop] = value;
}), cfg.shim && (eachProp(cfg.shim, function(value, id) {
isArray(value) && (value = {
deps:value
}), !value.exports && !value.init || value.exportsFn || (value.exportsFn = context.makeShimExports(value)), 
shim[id] = value;
}), config.shim = shim), cfg.packages && (each(cfg.packages, function(pkgObj) {
var location;
pkgObj = "string" == typeof pkgObj ? {
name:pkgObj
} :pkgObj, location = pkgObj.location, pkgs[pkgObj.name] = {
name:pkgObj.name,
location:location || pkgObj.name,
main:(pkgObj.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
};
}), config.pkgs = pkgs), eachProp(registry, function(mod, id) {
mod.inited || mod.map.unnormalized || (mod.map = makeModuleMap(id));
}), (cfg.deps || cfg.callback) && context.require(cfg.deps || [], cfg.callback);
},
makeShimExports:function(value) {
function fn() {
var ret;
return value.init && (ret = value.init.apply(global, arguments)), ret || value.exports && getGlobal(value.exports);
}
return fn;
},
makeRequire:function(relMap, options) {
function localRequire(deps, callback, errback) {
var id, map, requireMod;
return options.enableBuildCallback && callback && isFunction(callback) && (callback.__requireJsBuild = !0), 
"string" == typeof deps ? isFunction(callback) ? onError(makeError("requireargs", "Invalid require call"), errback) :relMap && hasProp(handlers, deps) ? handlers[deps](registry[relMap.id]) :req.get ? req.get(context, deps, relMap) :(map = makeModuleMap(deps, relMap, !1, !0), 
id = map.id, hasProp(defined, id) ? defined[id] :onError(makeError("notloaded", 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? "" :". Use require([])")))) :(intakeDefines(), 
context.nextTick(function() {
intakeDefines(), requireMod = getModule(makeModuleMap(null, relMap)), requireMod.skipMap = options.skipMap, 
requireMod.init(deps, callback, errback, {
enabled:!0
}), checkLoaded();
}), localRequire);
}
return options = options || {}, mixin(localRequire, {
isBrowser:isBrowser,
toUrl:function(moduleNamePlusExt) {
var ext, url, index = moduleNamePlusExt.lastIndexOf("."), segment = moduleNamePlusExt.split("/")[0], isRelative = "." === segment || ".." === segment;
return -1 !== index && (!isRelative || index > 1) && (ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length), 
moduleNamePlusExt = moduleNamePlusExt.substring(0, index)), url = context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, !0), ext || ".fake"), 
ext ? url :url.substring(0, url.length - 5);
},
defined:function(id) {
return hasProp(defined, makeModuleMap(id, relMap, !1, !0).id);
},
specified:function(id) {
return id = makeModuleMap(id, relMap, !1, !0).id, hasProp(defined, id) || hasProp(registry, id);
}
}), relMap || (localRequire.undef = function(id) {
takeGlobalQueue();
var map = makeModuleMap(id, relMap, !0), mod = getOwn(registry, id);
delete defined[id], delete urlFetched[map.url], delete undefEvents[id], mod && (mod.events.defined && (undefEvents[id] = mod.events), 
cleanRegistry(id));
}), localRequire;
},
enable:function(depMap) {
var mod = getOwn(registry, depMap.id);
mod && getModule(depMap).enable();
},
completeLoad:function(moduleName) {
var found, args, mod, shim = getOwn(config.shim, moduleName) || {}, shExports = shim.exports;
for (takeGlobalQueue(); defQueue.length; ) {
if (args = defQueue.shift(), null === args[0]) {
if (args[0] = moduleName, found) break;
found = !0;
} else args[0] === moduleName && (found = !0);
callGetModule(args);
}
if (mod = getOwn(registry, moduleName), !found && !hasProp(defined, moduleName) && mod && !mod.inited) {
if (!(!config.enforceDefine || shExports && getGlobal(shExports))) return hasPathFallback(moduleName) ? void 0 :onError(makeError("nodefine", "No define call for " + moduleName, null, [ moduleName ]));
callGetModule([ moduleName, shim.deps || [], shim.exportsFn ]);
}
checkLoaded();
},
nameToUrl:function(moduleName, ext) {
var paths, pkgs, pkg, pkgPath, syms, i, parentModule, url, parentPath;
if (req.jsExtRegExp.test(moduleName)) url = moduleName + (ext || ""); else {
for (paths = config.paths, pkgs = config.pkgs, syms = moduleName.split("/"), i = syms.length; i > 0; i -= 1) {
if (parentModule = syms.slice(0, i).join("/"), pkg = getOwn(pkgs, parentModule), 
parentPath = getOwn(paths, parentModule)) {
isArray(parentPath) && (parentPath = parentPath[0]), syms.splice(0, i, parentPath);
break;
}
if (pkg) {
pkgPath = moduleName === pkg.name ? pkg.location + "/" + pkg.main :pkg.location, 
syms.splice(0, i, pkgPath);
break;
}
}
url = syms.join("/"), url += ext || (/\?/.test(url) ? "" :".js"), url = ("/" === url.charAt(0) || url.match(/^[\w\+\.\-]+:/) ? "" :config.baseUrl) + url;
}
return config.urlArgs ? url + ((-1 === url.indexOf("?") ? "?" :"&") + config.urlArgs) :url;
},
load:function(id, url) {
req.load(context, id, url);
},
execCb:function(name, callback, args, exports) {
return callback.apply(exports, args);
},
onScriptLoad:function(evt) {
if ("load" === evt.type || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
interactiveScript = null;
var data = getScriptData(evt);
context.completeLoad(data.id);
}
},
onScriptError:function(evt) {
var data = getScriptData(evt);
return hasPathFallback(data.id) ? void 0 :onError(makeError("scripterror", "Script error", evt, [ data.id ]));
}
}, context.require = context.makeRequire(), context;
}
function getInteractiveScript() {
return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript :(eachReverse(scripts(), function(script) {
return "interactive" === script.readyState ? interactiveScript = script :void 0;
}), interactiveScript);
}
var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.4", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !("undefined" == typeof window || !navigator || !document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ :/^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
if ("undefined" == typeof define) {
if ("undefined" != typeof requirejs) {
if (isFunction(requirejs)) return;
cfg = requirejs, requirejs = void 0;
}
"undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), 
req = requirejs = function(deps, callback, errback, optional) {
var context, config, contextName = defContextName;
return isArray(deps) || "string" == typeof deps || (config = deps, isArray(callback) ? (deps = callback, 
callback = errback, errback = optional) :deps = []), config && config.context && (contextName = config.context), 
context = getOwn(contexts, contextName), context || (context = contexts[contextName] = req.s.newContext(contextName)), 
config && context.configure(config), context.require(deps, callback, errback);
}, req.config = function(config) {
return req(config);
}, req.nextTick = "undefined" != typeof setTimeout ? function(fn) {
setTimeout(fn, 4);
} :function(fn) {
fn();
}, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, 
req.isBrowser = isBrowser, s = req.s = {
contexts:contexts,
newContext:newContext
}, req({}), each([ "toUrl", "undef", "defined", "specified" ], function(prop) {
req[prop] = function() {
var ctx = contexts[defContextName];
return ctx.require[prop].apply(ctx, arguments);
};
}), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], 
baseElement && (head = s.head = baseElement.parentNode)), req.onError = function(err) {
throw err;
}, req.load = function(context, moduleName, url) {
var node, config = context && context.config || {};
return isBrowser ? (node = config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") :document.createElement("script"), 
node.type = config.scriptType || "text/javascript", node.charset = "utf-8", node.async = !0, 
node.setAttribute("data-requirecontext", context.contextName), node.setAttribute("data-requiremodule", moduleName), 
!node.attachEvent || node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (node.addEventListener("load", context.onScriptLoad, !1), 
node.addEventListener("error", context.onScriptError, !1)) :(useInteractive = !0, 
node.attachEvent("onreadystatechange", context.onScriptLoad)), node.src = url, currentlyAddingScript = node, 
baseElement ? head.insertBefore(node, baseElement) :head.appendChild(node), currentlyAddingScript = null, 
node) :(isWebWorker && (importScripts(url), context.completeLoad(moduleName)), void 0);
}, isBrowser && eachReverse(scripts(), function(script) {
return head || (head = script.parentNode), dataMain = script.getAttribute("data-main"), 
dataMain ? (cfg.baseUrl || (src = dataMain.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" :"./", 
cfg.baseUrl = subPath, dataMain = mainScript), dataMain = dataMain.replace(jsSuffixRegExp, ""), 
cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) :[ dataMain ], !0) :void 0;
}), define = function(name, deps, callback) {
var node, context;
"string" != typeof name && (callback = deps, deps = name, name = null), isArray(deps) || (callback = deps, 
deps = []), !deps.length && isFunction(callback) && callback.length && (callback.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(match, dep) {
deps.push(dep);
}), deps = (1 === callback.length ? [ "require" ] :[ "require", "exports", "module" ]).concat(deps)), 
useInteractive && (node = currentlyAddingScript || getInteractiveScript(), node && (name || (name = node.getAttribute("data-requiremodule")), 
context = contexts[node.getAttribute("data-requirecontext")])), (context ? context.defQueue :globalDefQueue).push([ name, deps, callback ]);
}, define.amd = {
jQuery:!0
}, req.exec = function(text) {
return eval(text);
}, req(cfg);
}
}(this);