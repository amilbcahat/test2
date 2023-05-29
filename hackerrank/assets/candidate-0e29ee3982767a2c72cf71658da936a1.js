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
}(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CandidateController, HR, _ref;
return CandidateController = function(_super) {
function CandidateController() {
return CandidateController.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateController, _super), CandidateController.prototype.initialize = function(options) {
null == options && (options = {});
}, CandidateController.prototype.namespace = function(contest_slug, rest) {
return null == rest && (rest = !1), contest_slug || (contest_slug = "master"), "master" !== contest_slug || rest ? "/contests/" + contest_slug + "/" :"/";
}, CandidateController.prototype.get_challenge_pageURL = function(contest_slug, challenge_slug) {
var challenge_bit;
return challenge_bit = "challenges/" + challenge_slug, "master" === contest_slug ? "/" + challenge_bit :"/contests/" + contest_slug + "/" + challenge_bit;
}, CandidateController.prototype.contest = function(options) {
return null == options && (options = {}), options.slug && options.slug !== HR.appController.get_current_contest_slug() ? HR.model("contest", {
slug:HR.appController.get_current_contest_slug()
}).cached(options) :(this.current_contest ? this.current_contest.get("slug") !== HR.appController.get_current_contest_slug() && (this.current_contest = HR.model("contest")) :this.current_contest = HR.model("contest"), 
HR.appController.get_current_contest_slug() && this.current_contest.set("slug", HR.appController.get_current_contest_slug()), 
this.current_contest.cached());
}, CandidateController.prototype.get_current_contest_slug = function() {
return this.landing_contest_slug = void 0 === this.landing_contest_slug ? HR.PREFETCH_DATA.metadata.landing_contest_slug :this.landing_contest_slug, 
this.landing_contest_slug;
}, CandidateController.prototype.get_current_contest_namespace = function() {
return this.current_contest_namespace = void 0 === this.current_contest_namespace ? HR.PREFETCH_DATA.metadata.current_contest_namespace :this.current_contest_namespace, 
this.current_contest_namespace;
}, CandidateController.prototype.is_using_contest_namespace = function() {
return this.using_contest_namespace = void 0 === this.using_contest_namespace ? HR.PREFETCH_DATA.metadata.using_contest_namespace :this.using_contest_namespace, 
this.using_contest_namespace;
}, CandidateController.prototype.get_current_contest_home_url = function() {
return "" + HR.appController.get_current_contest_namespace() + "/challenges";
}, CandidateController.prototype.get_current_contest_slug_url = function() {
var slug;
return slug = HR.appController.get_current_contest_slug(), "master" === slug ? "" :"/" + slug;
}, CandidateController.prototype.set_contest_namespace = function(contest_slug) {
return HR.appController.get_current_contest_slug() !== contest_slug && ("master" !== contest_slug ? HR.appView.contestNavigationView.setContestSlug(contest_slug) :HR.appView.contestNavigationView.hide(), 
this.landing_contest_slug = contest_slug, this.current_contest_namespace = "master" === contest_slug ? "" :"/contests/" + contest_slug, 
this.using_contest_namespace = "master" !== contest_slug, this.current_contest = HR.model("contest"), 
HR.appView.navigationView.nav_buttons && HR.appView.navigationView.nav_buttons.updateLinks(), 
HR.appView.countdownTimerView) ? HR.appView.countdownTimerView.setContest(HR.contest().cached()) :void 0;
}, CandidateController.prototype.object = function(suffix, name, attributes, options) {
var Obj, clsName, obj, stringName;
if (stringName = name.toTitleCase() + "-" + suffix, clsName = $.camelCase(stringName), 
Obj = HR[clsName], !Obj && ("model" === suffix ? Obj = this.MODELS_DEF[name] :"collection" === suffix && (Obj = this.COLLECTIONS_DEF[name]), 
!Obj)) throw "HR." + clsName + " is not defined";
return obj = new Obj(attributes, options), obj.contest_slug = (attributes || {}).contest_slug || (options || {}).contest_slug, 
obj;
}, CandidateController.prototype.model = function(name, attributes, options) {
var model;
return model = HR.appController.object("model", name, attributes, options);
}, CandidateController.prototype.collection = function(name, attributes, options) {
return HR.appController.object("collection", name, attributes, options);
}, CandidateController.prototype.profile = function(options) {
return null == options && (options = {}), this._profile && _.size(options) > 0 ? this._profile.cached(options) :this._profile || (this._profile = this.model("profile").cached(options), 
this._profile.listenTo(this._profile, "reset", function(_this) {
return function() {
return HR.key_prefix = _this._profile.get("key_prefix");
};
}(this))), this._profile;
}, CandidateController.prototype.restURL = function(path, restPrefix) {
return restPrefix && (path = "/rest" + path), path;
}, CandidateController.prototype.log = Backbone.log, CandidateController.prototype.staticPath = function(path, base_path) {
return null == base_path && (base_path = null), path = HR.MANIFEST && HR.MANIFEST[path] ? HR.MANIFEST[path] :path, 
HR.PREFETCH_DATA && HR.PREFETCH_DATA.metadata && (base_path || (base_path = HR.PREFETCH_DATA.metadata.asset_path)), 
"" + base_path + "/" + path;
}, CandidateController.prototype.requires = function() {
var callback, errorCallback, number_paths, staticFiles;
return number_paths = arguments.length - 1, callback = _.last(arguments), errorCallback = null, 
"function" == typeof arguments[arguments.length - 2] && (number_paths = arguments.length - 2, 
callback = arguments[arguments.length - 2], errorCallback = _.last(arguments)), 
staticFiles = _.map(_.toArray(arguments).slice(0, number_paths), function() {
return function(path) {
return HR.appController.staticPath("" + path + ".js");
};
}(this)), require(staticFiles, callback, errorCallback);
}, CandidateController.prototype.templatePath = function(template) {
var base_path;
return base_path = null, window.IE_BROWSER && (base_path = "/assets"), this.staticPath("backbone/templates/" + template, base_path);
}, CandidateController.prototype.template = function(template_name, template_callback, view_loader) {
var each_inline_template, that, _i, _len, _ref;
if (null == template_name && (template_name = null), null == template_callback && (template_callback = null), 
null == view_loader && (view_loader = !0), void 0 === this.template_data && (this.template_data = {}, 
this.template_callbacks = {}, $('script[type="text/template"]').length > 0)) for (_ref = $('script[type="text/template"]'), 
_i = 0, _len = _ref.length; _len > _i; _i++) each_inline_template = _ref[_i], this.template_data[$(each_inline_template).attr("id")] = $(each_inline_template).html();
return null !== template_name && void 0 !== this.template_data[template_name] && "--insync--" !== this.template_data[template_name] ? (template_callback = null, 
_.template(this.template_data[template_name])) :(void 0 === this.template_callbacks[template_name] && (this.template_callbacks[template_name] = []), 
null !== template_callback && (this.template_callbacks[template_name].push(template_callback), 
template_callback = null), "--insync--" !== this.template_data[template_name] && (this.template_data[template_name] = "--insync--", 
that = this, HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading ...", !0, !1), 
$.ajax({
url:this.templatePath("" + template_name + ".html"),
success:function(data) {
return that.template_data[template_name] = data, that.template_callbacks[template_name] && (_.each(that.template_callbacks[template_name], function(callback) {
return callback.render();
}), that.template_callbacks[template_name] = []), HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, .001), 
template_callback = null;
},
error:function() {
throw HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Error Occured", !1, !0, 1), 
"Template `" + that.templatePath("" + template_name + ".html") + "` Not Found";
},
cache:!HR.development
})), view_loader = view_loader ? this.viewLoader() :"<div></div>", _.template(view_loader));
}, CandidateController.prototype.setData = function(key, value) {
return void 0 === this.persistant_data && (this.persistant_data = {}), void 0 === this.persistant_data[key] && this.trigger("persistant:set:" + key), 
this.trigger("persistant:change:" + key), this.persistant_data[key] = value;
}, CandidateController.prototype.getData = function(key) {
return this.persistant_data && this.persistant_data[key] ? this.persistant_data[key] :void 0;
}, CandidateController.prototype.viewLoader = function(size) {
return null == size && (size = 32), "<div class='gray'> <div style='background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_" + size + "x" + size + ".gif); height: " + size + "px; width: " + size + "px; display: inline-block;'></div> </div>";
}, CandidateController.prototype.setModel = function(data, key, uid, casual) {
var def_key;
if (null == uid && (uid = null), null == casual && (casual = !0), def_key = key, 
uid && (key = "" + key + "-" + uid), !this.MODELS_DEF[def_key]) throw "HR Error: Model with key `" + key + "` doesn't exist";
return this.MODELS || (this.MODELS = {}), this.MODELS[key] ? this.MODELS[key].set(data) :this.MODELS[key] = new this.MODELS_DEF[def_key](data, {
casual:casual
});
}, CandidateController.prototype.getModel = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
var model;
return null == uid && (uid = null), null == callback && (callback = null), null == fetch && (fetch = !0), 
null == force_fetch && (force_fetch = !1), null == disableThrobber && (disableThrobber = !1), 
model = new this.MODELS_DEF[key](null, {
casual:!1
}), callback && callback(model), fetch && model.cached({
fetch:force_fetch,
disableThrobber:disableThrobber
}), model;
}, CandidateController.prototype.cleanModelCache = function(keyPrefix) {
var that;
return that = this, _.each(this.MODELS, function(o, key) {
return 0 === key.indexOf(keyPrefix) ? delete that.MODELS[key] :void 0;
});
}, CandidateController.prototype.setCollection = function(data, key, uid) {
var def_key;
if (null == uid && (uid = null), def_key = key, uid && (key = "" + key + "-" + uid), 
!this.COLLECTIONS_DEF[def_key]) throw "HR Error: Collection with key `" + key + "` doesn't exist";
return this.COLLECTIONS || (this.COLLECTIONS = {}), this.COLLECTIONS[key] || (this.COLLECTIONS[key] = new this.COLLECTIONS_DEF[def_key]()), 
this.COLLECTIONS[key].reset(data, {
silent:!1
});
}, CandidateController.prototype.getCollection = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
var cache, collection;
return null == uid && (uid = null), null == callback && (callback = null), null == fetch && (fetch = !0), 
null == force_fetch && (force_fetch = !1), null == disableThrobber && (disableThrobber = !1), 
collection = new this.COLLECTIONS_DEF[key](null, {
casual:!force_fetch
}), callback && callback(collection), fetch && (cache = !force_fetch, collection.cached({
fetch:force_fetch,
disableThrobber:disableThrobber
})), collection;
}, CandidateController.prototype.cleanCollectionCache = function(keyPrefix) {
var that;
return that = this, _.each(this.COLLECTIONS, function(o, key) {
return 0 === key.indexOf(keyPrefix) ? delete that.COLLECTIONS[key] :void 0;
});
}, CandidateController.prototype.setTitle = function(title, long) {
return null == long && (long = !0), document.title = long ? "" + title + " | Programming problems and challenges | HackerRank" :"" + title + " | HackerRank";
}, CandidateController.prototype.getTemplate = function(template_name, callback, obj) {
var data, each_inline_template, that, _i, _len, _ref;
if (null == callback && (callback = function() {}), null == obj && (obj = null), 
null === obj && (obj = this), obj && obj.cid) {
if (this.TEMPLATE_VIEWDATA || (this.TEMPLATE_VIEWDATA = {}), this.TEMPLATE_VIEWDATA["" + obj.cid + "-" + template_name]) return;
this.TEMPLATE_VIEWDATA["" + obj.cid + "-" + template_name] = !0;
}
if (void 0 === this.TEMPLATE_DATA && (this.TEMPLATE_DATA = {}, this.TEMPLATE_CALLBACKS = {}, 
$('script[type="text/template"]').length > 0)) for (_ref = $('script[type="text/template"]'), 
_i = 0, _len = _ref.length; _len > _i; _i++) each_inline_template = _ref[_i], this.TEMPLATE_DATA[$(each_inline_template).attr("id")] = _.template($(each_inline_template).html());
return void 0 !== this.TEMPLATE_DATA[template_name] ? (data = this.TEMPLATE_DATA[template_name], 
callback.call(obj, data), data) :(this.TEMPLATE_CALLBACKS[template_name] || (this.TEMPLATE_CALLBACKS[template_name] = [], 
that = this, $.ajax({
url:this.templatePath("" + template_name + ".html"),
success:function(resp) {
var template, _clbk, _results;
for (template = _.template(resp), that.TEMPLATE_DATA[template_name] = template, 
_results = []; that.TEMPLATE_CALLBACKS[template_name].length > 0; ) _clbk = that.TEMPLATE_CALLBACKS[template_name].shift(), 
_results.push(_clbk.callback.call(_clbk.obj, template));
return _results;
},
cache:!HR.development
})), this.TEMPLATE_CALLBACKS[template_name].push({
callback:callback,
obj:obj
}), null);
}, CandidateController.prototype.clearTemplate = function(template_name) {
return void 0 === this.TEMPLATE_DATA && (this.TEMPLATE_DATA = {}, this.TEMPLATE_CALLBACKS = {}), 
delete this.TEMPLATE_DATA[template_name], delete (this.TEMPLATE_VIEWDATA = !1), 
delete this.TEMPLATE_CALLBACKS[template_name];
}, CandidateController.prototype.facebook_login = function(e, callback) {
var data, h, left, top, w;
if (null == e && (e = null), null == callback && (callback = function() {}), e) {
if (e.preventDefault(), data = e.data, "disabled" === $(e.currentTarget).attr("disabled")) return;
} else data = {};
return w = 600, h = 350, left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2, 
window.login_callback = function() {
return HR.profile({
fetch:!0
}), data && data.that && data.destroy && data.that.destroy(), callback();
}, window.open("/hackers/auth/facebook?display=popup", "facebook_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
}, CandidateController.prototype.github_login = function(e, callback) {
var data, h, left, top, w;
if (null == e && (e = null), null == callback && (callback = function() {}), e) {
if (e.preventDefault(), data = e.data, "disabled" === $(e.currentTarget).attr("disabled")) return;
} else data = {};
return w = 960, h = 500, left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2, 
window.login_callback = function() {
return HR.profile({
fetch:!0
}), data && data.that && data.destroy && data.that.destroy(), callback();
}, window.open("/hackers/auth/github?display=popup", "facebook_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
}, CandidateController.prototype.facebook_share = function(url, content) {
var h, left, top, w;
return null == content && (content = ""), w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, url = "https://www.facebook.com/sharer.php?s=100&p" + encodeURIComponent("[url]") + "=" + encodeURIComponent(url) + "&p" + encodeURIComponent("[title]") + "=" + window.document.title + "&p" + encodeURIComponent("[summary]") + "=" + content, 
window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, CandidateController.prototype.facebook_graph_activity = function(action, object_type, object_url) {
var params;
return params = {}, params[object_type] = object_url, window.FB.api("/me/hackerrank:" + action, "post", params, function(_this) {
return function(response) {
return _this.log(response);
};
}(this));
}, CandidateController.prototype.twitter_share = function(text) {
var h, left, top, url, w;
return w = 600, h = 350, left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2, 
url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, CandidateController.prototype.querySlug = function(options) {
var cached_response, prefetch_response;
return null == options && (options = {}), HR.QUERY_SLUGS || (HR.QUERY_SLUGS = {}), 
(cached_response = HR.QUERY_SLUGS[options.slug]) ? (options.callback(cached_response), 
void 0) :(prefetch_response = HR.PREFETCH_DATA.slugs[options.slug], prefetch_response ? (options.callback(HR.PREFETCH_DATA.slugs[options.slug]), 
HR.QUERY_SLUGS[options.slug] = HR.PREFETCH_DATA.slugs[options.slug], void 0) :$.ajax({
url:"/rest/query_slug",
data:{
slug:options.slug
},
success:function(data) {
return HR.QUERY_SLUGS[options.slug] = data, options.callback(data);
}
}));
}, CandidateController.prototype.slugDetector = function(slug, callback, obj) {
var data, that;
return null == callback && (callback = function() {}), null == obj && (obj = null), 
null === obj && (obj = this), this.SLUG_DETECTOR_DATA || (this.SLUG_DETECTOR_DATA = {}, 
this.SLUG_DETECTOR_CALLBACKS = {}, HR.PREFETCH_DATA.slugs && (this.SLUG_DETECTOR_DATA = $.extend(HR.PREFETCH_DATA.slugs, this.SLUG_DETECTOR_DATA), 
_.each(HR.PREFETCH_DATA.slugs, function(data, slug) {
return this.SLUG_DETECTOR_DATA[slug].created_at = 1e3 * HR.PREFETCH_DATA.timestamp;
}, this))), void 0 !== this.SLUG_DETECTOR_DATA[slug] ? (data = this.SLUG_DETECTOR_DATA[slug], 
callback.call(obj, data), data) :(this.SLUG_DETECTOR_CALLBACKS[slug] || (this.SLUG_DETECTOR_CALLBACKS[slug] = [], 
that = this, $.ajax({
url:"/rest/query_slug",
type:"POST",
data:{
slug:slug
},
success:function(resp) {
var _clbk, _results;
for (that.SLUG_DETECTOR_DATA[slug] = resp, that.SLUG_DETECTOR_DATA[slug].created_at = new Date().getTime(), 
_results = []; that.SLUG_DETECTOR_CALLBACKS[slug].length > 0; ) _clbk = that.SLUG_DETECTOR_CALLBACKS[slug].shift(), 
_results.push(_clbk.callback.call(_clbk.obj, resp));
return _results;
}
})), this.SLUG_DETECTOR_CALLBACKS[slug].push({
callback:callback,
obj:obj
}), null);
}, CandidateController.prototype.loadCodeMirror = function(callback) {
return HR.requires("codemirror_basic", function() {
return function() {
return callback();
};
}(this));
}, CandidateController.prototype.loadCodeMirrorMode = function(lang, callback) {
return HR.appController.loadCodeMirror(function() {
var args;
return args = [], lang_mode_location_unconventional_mapping[lang] ? args = _.union(args, lang_mode_location_unconventional_mapping[lang]) :args.push("codemirror/mode/" + lang + "/" + lang), 
args.push(function() {
return function() {
return callback();
};
}(this)), args.push(function() {
return function() {
return callback();
};
}(this)), HR.requires.apply(this, args);
});
}, CandidateController;
}(Backbone.Model), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateController = CandidateController;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CandidateRouter, HR, h, _ref;
return CandidateRouter = function(_super) {
function CandidateRouter() {
return CandidateRouter.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateRouter, _super), CandidateRouter.prototype.routes = {
"":"default_route",
"_=_":"default_route",
":unique_id/feedback":"candidate_feedback",
":unique_id/feedback/":"candidate_feedback",
":test_unique_id/questions":"candidate_questionlist",
":test_unique_id/questions/":"candidate_questionlist",
":test_unique_id/instructions":"candidate_instructions",
":test_unique_id/instructions/":"candidate_instructions",
":test_unique_id/questions/:question_unique_id":"candidate_question",
":test_unique_id/questions/:question_unique_id/":"candidate_question",
":unique_id/fblogin":"fblogin",
":unique_id/message":"message",
":unique_id":"candidate_outer",
":unique_id/":"candidate_outer",
":unique_id/:authkey":"candidate_outer",
":unique_id/:authkey/":"candidate_outer"
}, CandidateRouter.prototype.initialize = function() {
return HR.appView = new HR.CandidateView(), HR.candidate = {}, HR.candidate.candidateTestModel = null, 
HR.candidate.candidateAttemptModel = null, HR.candidate.currentQuestion = null, 
HR.candidate.questionView = null, HR.candidate.questions = {}, HR.candidate.redirectBackTo = null;
}, CandidateRouter.prototype.fblogin = function(unique_id) {
return null == unique_id && (unique_id = ""), HR.requires("compound/recruit-candidate", function() {
var test;
return $.cookie("fb_data") ? (test = new HR.CandidateTestModel(), test.setTidAuth(unique_id, null), 
test.setAction("show"), test.fetch({
success:function() {
return function(m) {
var fb_view, tid;
return tid = m.get("unique_id"), m.get("logged_in") ? (m.get("logged_in") && !m.get("attempt_done") ? HR.router.navigate("" + tid + "/questions", {
trigger:!0,
replace:!0
}) :HR.router.navigate("" + tid + "/feedback", {
trigger:!0,
replace:!0
}), void 0) :(document.title = m.get("name") + " :: powered by HackerRank", HR.candidate.candidateTestModel = m, 
fb_view = new HR.RecruitFacebookResumeView({
data:JSON.parse($.cookie("fb_data")),
model:m
}), HR.appView.setContentView(fb_view), HR.appView.setTopbarView(null), HR.appView.setSidebarView(null));
};
}(this),
error:function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), $.removeCookie("fb_data", {
path:"/"
}), $.removeCookie("sfb_data", {
path:"/"
}), HR.router.navigate("" + unique_id, {
trigger:!0
});
}
})) :(HR.router.navigate("" + unique_id, {
trigger:!0,
replace:!0
}), void 0);
});
}, CandidateRouter.prototype.message = function(unique_id) {
return null == unique_id && (unique_id = ""), HR.requires("compound/recruit-candidate", function() {
var test;
return test = new HR.CandidateTestModel(), test.setTidAuth(unique_id, null), test.setAction("show"), 
test.fetch({
success:function() {
return function(m) {
var msgview;
return HR.appView.setTopbarView(null), HR.appView.setSidebarView(null), msgview = new HR.RecruitMessageView({
model:m,
message:window.candidatemessage || $.cookie("candidatemessage") || "404 - no message"
}), HR.appView.setContentView(msgview);
};
}(this),
error:function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), $.removeCookie("fb_data", {
path:"/"
}), $.removeCookie("sfb_data", {
path:"/"
}), HR.router.navigate("" + unique_id, {
trigger:!0
});
}
});
});
}, CandidateRouter.prototype.candidate_outer = function(unique_id, authkey) {
return null == unique_id && (unique_id = null), null == authkey && (authkey = ""), 
HR.requires("compound/recruit-candidate", function() {
var test;
return HR.appView.setTopbarView(null), HR.appView.setSidebarView(null), test = new HR.CandidateTestModel(), 
test.setTidAuth(unique_id, authkey), test.setAction("show"), test.fetch({
success:function() {
return function(m) {
var candidate_view, path, tid;
return document.title = m.get("name") + " :: powered by HackerRank", HR.candidate.candidateTestModel = m, 
tid = m.get("unique_id"), m.get("logged_in") ? (m.get("logged_in") && !m.get("attempt_done") ? HR.candidate.redirectBackTo ? (path = HR.candidate.redirectBackTo, 
HR.candidate.redirectBackTo = null, HR.router.navigate(path, {
trigger:!0,
replace:!0
})) :HR.router.navigate("" + tid + "/questions", {
trigger:!0,
replace:!0
}) :HR.router.navigate("" + tid + "/feedback", {
trigger:!0,
replace:!0
}), void 0) :(candidate_view = new HR.RecruitCandidateLoginView({
model:m
}), HR.appView.setContentView(candidate_view), HR.appView.setTopbarView(null), HR.appView.setSidebarView(null));
};
}(this),
error:function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), HR.router.navigate("" + unique_id, {
trigger:!0
});
}
});
});
}, CandidateRouter.prototype.candidate_questionlist = function(test_unique_id) {
return HR.requires("compound/recruit-candidate", function() {
var attempt, dat;
return HR.candidate.candidateTestModel ? (document.title = HR.candidate.candidateTestModel.get("name") + " :: powered by HackerRank", 
attempt = new HR.CandidateAttemptModel(), attempt.setAid(HR.candidate.candidateTestModel.get("attempt")), 
dat = {
qlist:!0
}, attempt.fetch({
data:dat,
processData:!0,
success:function(m) {
var content_view;
return HR.candidate.candidateAttemptModel = m, content_view = new HR.RecruitCandidateListView(), 
HR.candidate.currentQuestion = null, HR.appView.setContentView(content_view), HR.appView.setTopbarView(HR.RecruitCandidateTopBarView), 
HR.appView.setSidebarView(HR.RecruitCandidateSideBarView);
},
error:function() {
return HR.router.navigate("" + test_unique_id, {
trigger:!0,
replace:!0
});
}
})) :(HR.router.navigate("" + test_unique_id, {
trigger:!0,
replace:!0
}), void 0);
});
}, CandidateRouter.prototype.candidate_question = function(test_unique_id, question_unique_id) {
return HR.requires("compound/recruit-candidate", function() {
var attempt, dat;
return HR.candidate.candidateTestModel ? (document.title = HR.candidate.candidateTestModel.get("name") + " :: powered by HackerRank", 
attempt = new HR.CandidateAttemptModel(), attempt.setAid(HR.candidate.candidateTestModel.get("attempt")), 
dat = {
qview:!0,
qid:question_unique_id
}, attempt.fetch({
data:dat,
processData:!0,
success:function() {
return function(m) {
var q;
return HR.candidate.candidateAttemptModel = m, q = new HR.CandidateQuestionModel(), 
q.setAid(m.get("id")), q.setQid(question_unique_id), q.fetch({
success:function(m) {
var content_view;
return content_view = new HR.RecruitCandidateQuestionView({
model:m
}), HR.candidate.currentQuestion = m.get("unique_id"), HR.appView.setContentView(content_view), 
HR.appView.setTopbarView(HR.RecruitCandidateTopBarView), HR.appView.setSidebarView(HR.RecruitCandidateSideBarView), 
HR.candidate.questionView = content_view;
},
error:function() {
return bootbox.alert("Unable to get the question.");
}
});
};
}(this),
error:function() {
return function() {
return HR.router.navigate("" + test_unique_id, {
trigger:!0,
replace:!0
});
};
}(this)
})) :(HR.candidate.redirectBackTo = Backbone.history.fragment, HR.router.navigate("" + test_unique_id, {
trigger:!0,
replace:!0
}), void 0);
});
}, CandidateRouter.prototype.candidate_feedback = function(test_unique_id) {
return clearInterval(HR.candidate.timerInterval), HR.requires("compound/recruit-candidate", function() {
var attempt;
return HR.candidate.candidateTestModel ? (document.title = HR.candidate.candidateTestModel.get("name") + " :: powered by HackerRank", 
attempt = new HR.CandidateAttemptModel(), attempt.setAid(HR.candidate.candidateTestModel.get("attempt")), 
attempt.fetch({
success:function() {
return function(m) {
var candidate_view;
return HR.candidate.candidateAttemptModel = m, m.get("attempt_done") ? (HR.appView.setTopbarView(null), 
HR.appView.setSidebarView(null), candidate_view = new HR.RecruitCandidateLoginView({
model:HR.candidate.candidateTestModel
}), HR.appView.setContentView(candidate_view)) :(HR.router.navigate("" + test_unique_id + "/questions", {
trigger:!0,
replace:!0
}), void 0);
};
}(this)
})) :(HR.router.navigate("" + test_unique_id, {
trigger:!0,
replace:!0
}), void 0);
});
}, CandidateRouter.prototype.candidate_instructions = function(test_unique_id) {
return HR.requires("compound/recruit-candidate", function() {
var candidate_view;
return HR.candidate.candidateTestModel ? (document.title = HR.candidate.candidateTestModel.get("name") + " :: powered by HackerRank", 
candidate_view = new HR.RecruitCandidateInstructionsView({
model:HR.candidate.candidateTestModel
}), HR.appView.setContentView(candidate_view), HR.candidate.currentQuestion = null, 
HR.appView.setTopbarView(HR.RecruitCandidateTopBarView), HR.appView.setSidebarView(HR.RecruitCandidateSideBarView)) :(HR.router.navigate("" + test_unique_id, {
trigger:!0,
replace:!0
}), void 0);
});
}, CandidateRouter;
}(Backbone.Router), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateRouter = CandidateRouter, 
window.istreet = new Object(), window.istreet.cfg = new Object(), window.istreet.cfg.hrqn = new Object(), 
h = window.istreet.cfg.hrqn, h.mcq = "Multiple choice", h.code = "Programming", 
h.textAns = "Subjective", h.approx = "Approximate", h.multiple_mcq = "Multiple answers", 
h.unscramble = "Unscramble Sentence", h.rewrite = "Rewrite Sentence", h.complete = "Complete Sentence", 
h.correct_errors = "Correct Errors", h.file_upload = "File upload", h.multiple_blanks = "Multiple blanks", 
h.info = "Info", h.task = "Task", h["Subjective Answer"] = "Subjective answer", 
h.uml = "UML", h.electrical = "Electrical";
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GenericView, HR, _ref;
return GenericView = function(_super) {
function GenericView() {
return GenericView.__super__.constructor.apply(this, arguments);
}
return __extends(GenericView, _super), GenericView.prototype.initialize = function(options) {
return null == options && (options = {}), this.has_template = !1, this.parent = options.parent;
}, GenericView.prototype.assign = function(selector, view) {
var selectors;
return _.isObject(selector) ? selectors = selector :(selectors = [], selectors[selector] = view), 
selectors ? (_.each(selectors, function(view, selector) {
return view.setElement(this.$(selector)).render();
}, this), this) :void 0;
}, GenericView.prototype.render = function() {
return this._render && "function" == typeof this._render ? ("function" == typeof this.prerender && this.prerender, 
"function" == typeof this.teardown && this.teardown(), "function" == typeof this._render && this._render(), 
"function" == typeof this.postrender && this.postrender()) :!this.has_template && this.template ? HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.applyTemplate();
}, this) :this.applyTemplate(), this;
}, GenericView.prototype.postrender = function() {
return this.delegateEvents(), setTimeout(function() {
return $(".js-tooltip").tooltip().click(function() {
return $(".js-tooltip").tooltip("hide");
});
}, 300);
}, GenericView.prototype.applyTemplate = function() {}, GenericView.prototype.loading = function(size, from) {
return null == size && (size = 32), null == from && (from = 0), this.rendered ? void 0 :$(this.el).html(HR.appController.viewLoader(size));
}, GenericView.prototype.teardown = function() {
var view, _i, _len, _ref;
if (void 0 !== this._subviews) for (_ref = this._subviews, _i = 0, _len = _ref.length; _len > _i; _i++) view = _ref[_i], 
view.remove();
return this._subviews = [], this.undelegateEvents(), this;
}, GenericView.prototype.destroy = function() {
return this._subviews && _.isArray(this._subviews) && _.each(this._subviews, function(subview) {
return subview && subview.destroy ? subview.destroy() :void 0;
}), this.undelegateEvents(), this.$el.removeData().unbind(), this.remove(), Backbone.View.prototype.remove.call(this);
}, GenericView.prototype.add_subview = function(view) {
return this._subviews || (this._subviews = []), this._subviews.push(view), this;
}, GenericView;
}(Backbone.View), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericView = GenericView, 
Backbone.View.prototype.log = Backbone.log;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, LoadingView, _ref;
return LoadingView = function(_super) {
function LoadingView() {
return LoadingView.__super__.constructor.apply(this, arguments);
}
return __extends(LoadingView, _super), LoadingView.prototype.template = "loading", 
LoadingView.prototype.className = "loading-view", LoadingView.prototype.viewLoader = function(size) {
return null == size && (size = 32), "<div class='gray'> <div style='background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_" + size + "x" + size + ".gif); height: " + size + "px; width: " + size + "px; display: inline-block;'></div> </div>";
}, LoadingView.prototype.render = function() {
return $(this.el).html(this.viewLoader(64)), this;
}, LoadingView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.LoadingView = LoadingView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CandidateView, HR, _ref;
return CandidateView = function(_super) {
function CandidateView() {
return CandidateView.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateView, _super), CandidateView.prototype.el = "#wrapper", 
CandidateView.prototype.initialize = function() {
var that;
return this.contentView || this.setLoadingView(), that = this, _.each(this.liveEvents, function(callback, index) {
var ev, sl, sp;
return sp = index.indexOf(" "), ev = index.substr(0, sp), sl = index.substr(sp + 1), 
$(sl).die(ev).unbind(ev).live(ev, that[callback]);
});
}, CandidateView.prototype.setLoadingView = function() {
var loadingView;
return loadingView = new HR.LoadingView(), this.setContentView(loadingView);
}, CandidateView.prototype.setContentView = function(contentView) {
return this.contentView && (this.contentView.unbind && this.contentView.unbind(), 
this.contentView.$ && this.contentView.$("*").unbind(), this.contentView.destroy ? this.contentView.destroy() :this.contentView.remove && this.contentView.remove()), 
this.contentView = contentView, this.render();
}, CandidateView.prototype.setTopbarView = function(tbview) {
return null == tbview && (tbview = null), this.topbarview = tbview, _.isEmpty(this.topbarview) ? this.$("#navigation").empty() :(this.$("#navigation").html(this.topbarview.render().el), 
this.topbarview && this.topbarview.getTimeLeft && this.$("#countdown-timer").countdown("destroy").countdown({
until:this.topbarview.getTimeLeft(),
layout:"{d<}{dn}{dl} {d>} {hnn}:{mnn}:{snn}",
compact:!0
})), tbview;
}, CandidateView.prototype.setSidebarView = function(sbview) {
return null == sbview && (sbview = null), sbview ? (this.sidebarview = sbview, this.$("#side-navigation").html(this.sidebarview.render().el)) :this.$("#side-navigation").empty();
}, CandidateView.prototype.unsetTopbarView = function() {
return this.$("#navigation").empty();
}, CandidateView.prototype.liveEvents = {
"click .backbone":"navigateAnchor"
}, CandidateView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href ? HR.router.navigate(href, !0) :void 0);
}, CandidateView.prototype.getSubViews = function() {
var subviews;
return null === this.contentView && this.setContentView(HR.E404View), subviews = {
content:this.contentView
};
}, CandidateView.prototype.render = function() {
var curent_module_name, that;
return that = this, _.each(this.getSubViews(), function(subview, name) {
var _view;
return _view = _.isFunction(subview) ? new subview() :subview, $(that.el).find("#" + name).html(_view.render().el), 
_view.trigger("render");
}), $(".module-select-prompt").length > 0 && $("body").find("[data-module=" + HR.appController.get_current_module() + "]").length > 0 && (curent_module_name = $.trim($("body").find("[data-module=" + HR.appController.get_current_module() + "]").html()), 
HR.CURRENT_MODULE_NAME = curent_module_name, $(".module-select-prompt").html("Category: " + curent_module_name + " <i class='icon-down-open-mini'></i>")), 
this.topbarview ? (this.$("#navigation").html(this.topbarview.render().el), $("#countdown-timer").countdown("resume")) :void 0;
}, CandidateView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateView = CandidateView;
});
}.call(this), function(root, factory) {
"use strict";
"function" == typeof define && define.amd ? define([ "jquery" ], factory) :"object" == typeof exports ? module.exports = factory(require("jquery")) :root.bootbox = factory(root.jQuery);
}(this, function init($, undefined) {
"use strict";
function _t(key) {
var locale = locales[defaults.locale];
return locale ? locale[key] :locales.en[key];
}
function processCallback(e, dialog, callback) {
e.stopPropagation(), e.preventDefault();
var preserveDialog = $.isFunction(callback) && callback(e) === !1;
preserveDialog || dialog.modal("hide");
}
function getKeyLength(obj) {
var k, t = 0;
for (k in obj) t++;
return t;
}
function each(collection, iterator) {
var index = 0;
$.each(collection, function(key, value) {
iterator(key, value, index++);
});
}
function sanitize(options) {
var buttons, total;
if ("object" != typeof options) throw new Error("Please supply an object of options");
if (!options.message) throw new Error("Please specify a message");
return options = $.extend({}, defaults, options), options.buttons || (options.buttons = {}), 
options.backdrop = options.backdrop ? "static" :!1, buttons = options.buttons, total = getKeyLength(buttons), 
each(buttons, function(key, button, index) {
if ($.isFunction(button) && (button = buttons[key] = {
callback:button
}), "object" !== $.type(button)) throw new Error("button with key " + key + " must be an object");
button.label || (button.label = key), button.className || (button.className = 2 >= total && index === total - 1 ? "btn-primary" :"btn-default");
}), options;
}
function mapArguments(args, properties) {
var argn = args.length, options = {};
if (1 > argn || argn > 2) throw new Error("Invalid argument length");
return 2 === argn || "string" == typeof args[0] ? (options[properties[0]] = args[0], 
options[properties[1]] = args[1]) :options = args[0], options;
}
function mergeArguments(defaults, args, properties) {
return $.extend(!0, {}, defaults, mapArguments(args, properties));
}
function mergeDialogOptions(className, labels, properties, args) {
var baseOptions = {
className:"bootbox-" + className,
buttons:createLabels.apply(null, labels)
};
return validateButtons(mergeArguments(baseOptions, args, properties), labels);
}
function createLabels() {
for (var buttons = {}, i = 0, j = arguments.length; j > i; i++) {
var argument = arguments[i], key = argument.toLowerCase(), value = argument.toUpperCase();
buttons[key] = {
label:_t(value)
};
}
return buttons;
}
function validateButtons(options, buttons) {
var allowedButtons = {};
return each(buttons, function(key, value) {
allowedButtons[value] = !0;
}), each(options.buttons, function(key) {
if (allowedButtons[key] === undefined) throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
}), options;
}
var templates = {
dialog:"<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",
header:"<div class='modal-header'><h4 class='modal-title'></h4></div>",
footer:"<div class='modal-footer'></div>",
closeButton:"<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
form:"<form class='bootbox-form'></form>",
inputs:{
text:"<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
textarea:"<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
email:"<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
select:"<select class='bootbox-input bootbox-input-select form-control'></select>",
checkbox:"<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
date:"<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
time:"<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
number:"<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
password:"<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
}
}, defaults = {
locale:"en",
backdrop:!0,
animate:!0,
className:null,
closeButton:!0,
show:!0,
container:"body"
}, exports = {};
exports.alert = function() {
var options;
if (options = mergeDialogOptions("alert", [ "ok" ], [ "message", "callback" ], arguments), 
options.callback && !$.isFunction(options.callback)) throw new Error("alert requires callback property to be a function when provided");
return options.buttons.ok.callback = options.onEscape = function() {
return $.isFunction(options.callback) ? options.callback() :!0;
}, exports.dialog(options);
}, exports.confirm = function() {
var options;
if (options = mergeDialogOptions("confirm", [ "cancel", "confirm" ], [ "message", "callback" ], arguments), 
options.buttons.cancel.callback = options.onEscape = function() {
return options.callback(!1);
}, options.buttons.confirm.callback = function() {
return options.callback(!0);
}, !$.isFunction(options.callback)) throw new Error("confirm requires a callback");
return exports.dialog(options);
}, exports.prompt = function() {
var options, defaults, dialog, form, input, shouldShow, inputOptions;
form = $(templates.form), defaults = {
className:"bootbox-prompt",
buttons:createLabels("cancel", "confirm"),
value:"",
inputType:"text"
}, options = validateButtons(mergeArguments(defaults, arguments, [ "title", "callback" ]), [ "cancel", "confirm" ]), 
shouldShow = options.show === undefined ? !0 :options.show;
var html5inputs = [ "date", "time", "number" ], i = document.createElement("input");
if (i.setAttribute("type", options.inputType), html5inputs[options.inputType] && (options.inputType = i.type), 
options.message = form, options.buttons.cancel.callback = options.onEscape = function() {
return options.callback(null);
}, options.buttons.confirm.callback = function() {
var value;
switch (options.inputType) {
case "text":
case "textarea":
case "email":
case "select":
case "date":
case "time":
case "number":
case "password":
value = input.val();
break;

case "checkbox":
var checkedItems = input.find("input:checked");
value = [], each(checkedItems, function(_, item) {
value.push($(item).val());
});
}
return options.callback(value);
}, options.show = !1, !options.title) throw new Error("prompt requires a title");
if (!$.isFunction(options.callback)) throw new Error("prompt requires a callback");
if (!templates.inputs[options.inputType]) throw new Error("invalid prompt type");
switch (input = $(templates.inputs[options.inputType]), options.inputType) {
case "text":
case "textarea":
case "email":
case "date":
case "time":
case "number":
case "password":
input.val(options.value);
break;

case "select":
var groups = {};
if (inputOptions = options.inputOptions || [], !inputOptions.length) throw new Error("prompt with select requires options");
each(inputOptions, function(_, option) {
var elem = input;
if (option.value === undefined || option.text === undefined) throw new Error("given options in wrong format");
option.group && (groups[option.group] || (groups[option.group] = $("<optgroup/>").attr("label", option.group)), 
elem = groups[option.group]), elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
}), each(groups, function(_, group) {
input.append(group);
}), input.val(options.value);
break;

case "checkbox":
var values = $.isArray(options.value) ? options.value :[ options.value ];
if (inputOptions = options.inputOptions || [], !inputOptions.length) throw new Error("prompt with checkbox requires options");
if (!inputOptions[0].value || !inputOptions[0].text) throw new Error("given options in wrong format");
input = $("<div/>"), each(inputOptions, function(_, option) {
var checkbox = $(templates.inputs[options.inputType]);
checkbox.find("input").attr("value", option.value), checkbox.find("label").append(option.text), 
each(values, function(_, value) {
value === option.value && checkbox.find("input").prop("checked", !0);
}), input.append(checkbox);
});
}
return options.placeholder && input.attr("placeholder", options.placeholder), options.pattern && input.attr("pattern", options.pattern), 
form.append(input), form.on("submit", function(e) {
e.preventDefault(), e.stopPropagation(), dialog.find(".btn-primary").click();
}), dialog = exports.dialog(options), dialog.off("shown.bs.modal"), dialog.on("shown.bs.modal", function() {
input.focus();
}), shouldShow === !0 && dialog.modal("show"), dialog;
}, exports.dialog = function(options) {
options = sanitize(options);
var dialog = $(templates.dialog), innerDialog = dialog.find(".modal-dialog"), body = dialog.find(".modal-body"), buttons = options.buttons, buttonStr = "", callbacks = {
onEscape:options.onEscape
};
if (each(buttons, function(key, button) {
buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>", 
callbacks[key] = button.callback;
}), body.find(".bootbox-body").html(options.message), options.animate === !0 && dialog.addClass("fade"), 
options.className && dialog.addClass(options.className), "large" === options.size && innerDialog.addClass("modal-lg"), 
"small" === options.size && innerDialog.addClass("modal-sm"), options.title && body.before(templates.header), 
options.closeButton) {
var closeButton = $(templates.closeButton);
options.title ? dialog.find(".modal-header").prepend(closeButton) :closeButton.css("margin-top", "-10px").prependTo(body);
}
return options.title && dialog.find(".modal-title").html(options.title), buttonStr.length && (body.after(templates.footer), 
dialog.find(".modal-footer").html(buttonStr)), dialog.on("hidden.bs.modal", function(e) {
e.target === this && dialog.remove();
}), dialog.on("shown.bs.modal", function() {
dialog.find(".btn-primary:first").focus();
}), dialog.on("escape.close.bb", function(e) {
callbacks.onEscape && processCallback(e, dialog, callbacks.onEscape);
}), dialog.on("click", ".modal-footer button", function(e) {
var callbackKey = $(this).data("bb-handler");
processCallback(e, dialog, callbacks[callbackKey]);
}), dialog.on("click", ".bootbox-close-button", function(e) {
processCallback(e, dialog, callbacks.onEscape);
}), dialog.on("keyup", function(e) {
27 === e.which && dialog.trigger("escape.close.bb");
}), $(options.container).append(dialog), dialog.modal({
backdrop:options.backdrop,
keyboard:!1,
show:!1
}), options.show && dialog.modal("show"), dialog;
}, exports.setDefaults = function() {
var values = {};
2 === arguments.length ? values[arguments[0]] = arguments[1] :values = arguments[0], 
$.extend(defaults, values);
}, exports.hideAll = function() {
$(".bootbox").modal("hide");
};
var locales = {
br:{
OK:"OK",
CANCEL:"Cancelar",
CONFIRM:"Sim"
},
da:{
OK:"OK",
CANCEL:"Annuller",
CONFIRM:"Accepter"
},
de:{
OK:"OK",
CANCEL:"Abbrechen",
CONFIRM:"Akzeptieren"
},
el:{
OK:"\u0395\u03bd\u03c4\u03ac\u03be\u03b5\u03b9",
CANCEL:"\u0391\u03ba\u03cd\u03c1\u03c9\u03c3\u03b7",
CONFIRM:"\u0395\u03c0\u03b9\u03b2\u03b5\u03b2\u03b1\u03af\u03c9\u03c3\u03b7"
},
en:{
OK:"OK",
CANCEL:"Cancel",
CONFIRM:"OK"
},
es:{
OK:"OK",
CANCEL:"Cancelar",
CONFIRM:"Aceptar"
},
fi:{
OK:"OK",
CANCEL:"Peruuta",
CONFIRM:"OK"
},
fr:{
OK:"OK",
CANCEL:"Annuler",
CONFIRM:"D'accord"
},
he:{
OK:"\u05d0\u05d9\u05e9\u05d5\u05e8",
CANCEL:"\u05d1\u05d9\u05d8\u05d5\u05dc",
CONFIRM:"\u05d0\u05d9\u05e9\u05d5\u05e8"
},
it:{
OK:"OK",
CANCEL:"Annulla",
CONFIRM:"Conferma"
},
lt:{
OK:"Gerai",
CANCEL:"At\u0161aukti",
CONFIRM:"Patvirtinti"
},
lv:{
OK:"Labi",
CANCEL:"Atcelt",
CONFIRM:"Apstiprin\u0101t"
},
nl:{
OK:"OK",
CANCEL:"Annuleren",
CONFIRM:"Accepteren"
},
no:{
OK:"OK",
CANCEL:"Avbryt",
CONFIRM:"OK"
},
pl:{
OK:"OK",
CANCEL:"Anuluj",
CONFIRM:"Potwierd\u017a"
},
ru:{
OK:"OK",
CANCEL:"\u041e\u0442\u043c\u0435\u043d\u0430",
CONFIRM:"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"
},
sv:{
OK:"OK",
CANCEL:"Avbryt",
CONFIRM:"OK"
},
tr:{
OK:"Tamam",
CANCEL:"\u0130ptal",
CONFIRM:"Onayla"
},
zh_CN:{
OK:"OK",
CANCEL:"\u53d6\u6d88",
CONFIRM:"\u786e\u8ba4"
},
zh_TW:{
OK:"OK",
CANCEL:"\u53d6\u6d88",
CONFIRM:"\u78ba\u8a8d"
}
};
return exports.init = function(_$) {
return init(_$ || $);
}, exports;
}), function() {
$.ajaxSetup({
cache:!1
}), $(document).ready(function() {
var HR, _makeTopLevel;
return HR = window.HR, HR.appController = new HR.CandidateController(), require.config({
waitSeconds:60
}), _makeTopLevel = function(source, attributes) {
return _.each(attributes, function(attribute) {
return source && "undefined" !== source[attribute] ? HR[attribute] = source[attribute] :void 0;
});
}, _makeTopLevel(HR.appController, [ "namespace", "requires", "routeNamespace", "restURL", "model", "collection" ]), 
HR.router = new HR.CandidateRouter(), Backbone.history.start({
pushState:!0,
root:"/tests/"
});
});
}.call(this);