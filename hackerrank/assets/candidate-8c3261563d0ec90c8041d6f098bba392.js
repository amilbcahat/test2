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
jQuery(function() {
var HR, arrayToString, beautifyDates, capitalize, changeTimeZoneDialog, compareArrays, convertToSlug, fixedInfo, formatDate, formatDateRange, formatDateTime, formatTimeInUserTz, getCandidateDetailsMapping, linkify, prettyPrintSeconds, readableQuestionType, track, trackTotango, _ref;
return readableQuestionType = function(key) {
var h;
return h = {}, h.mcq = "Multiple choice", h.code = "Programming", h.textAns = "Subjective", 
h.approx = "Approximate", h.multiple_mcq = "Multiple answers", h.unscramble = "Unscramble Sentence", 
h.rewrite = "Rewrite Sentence", h.complete = "Complete Sentence", h.correct_errors = "Correct Errors", 
h.file_upload = "File upload", h.multiple_blanks = "Multiple blanks", h.info = "Info", 
h.task = "Task", h["Subjective Answer"] = "Subjective answer", h.uml = "UML", h.electrical = "Electrical", 
h.design = "Design", h[key] ? h[key] :key;
}, getCandidateDetailsMapping = function() {
var mapping;
return mapping = {
full_name:"Full Name",
city:"City",
roll_number:"Roll Number",
email_address:"Personal Email Address",
year_of_graduation:"Graduation Year",
cgpa:"CGPA",
univ:"Univ/College Name",
phone_number:"Contact Number",
contact_recruiter:"Contact Recruiter",
branch:"Stream/Branch",
gender:"Gender",
degree:"Degree",
gender:"Gender",
role:"Job Role",
resume:"Resume",
pgdegree:"Post Graduation Degree"
};
}, changeTimeZoneDialog = function(options) {
var that;
if (options && options.currentTimeZone && !$.cookie("timezone-conflict")) return this.options = options, 
this.$timezone_dialog = $("#timezone-dialog"), 0 === this.$timezone_dialog.length ? ($("body").append('<div id="timezone-dialog"><div>'), 
this.$timezone_dialog = $("#timezone-dialog")) :this.$timezone_dialog.empty(), that = this, 
$.ajax({
url:HR.appController.templatePath("x/timezone-dialog.html"),
success:function(data) {
var content;
return content = _.template(data)({
userTimeZone:options.userTimeZone,
currentTimeZone:options.currentTimeZone
}), that.$timezone_dialog.html(content), that.$timezone_dialog.find("#timezone-modal").modal(), 
that.$timezone_dialog.find(".save-button").bind("click", function(e) {
var user;
return e.preventDefault(), user = HR.currentUser, user.set("timezone", that.options.currentTimeZone), 
user.save({
timezone:that.options.currentTimeZone,
action:"basic"
}, {
success:function() {
return function() {
return user.fetch(), user.trigger("change");
};
}(this)
}), that.$timezone_dialog.find("#timezone-modal").modal("hide");
}), that.$timezone_dialog.find(".cancel-button").bind("click", function() {
return that.$timezone_dialog.find(".close").click();
}), that.$timezone_dialog.find(".close").bind("click", function() {
return $.cookie("timezone-conflict", "disabled", {
expires:2,
path:"/"
});
});
}
}), this;
}, convertToSlug = function(Text) {
return Text.toLowerCase().replace(RegExp(" ", "g"), "_").replace(/[^\w-]+/g, "");
}, compareArrays = function(array1, array2) {
var i;
if (array1.length !== array2.length) return !1;
for (i = 0; i < array1.length; ) {
if (array1[i] instanceof Array && array2[i] instanceof Array) {
if (!array1[i].compare(array2[i])) return !1;
} else if (array1[i] !== array2[i]) return !1;
i++;
}
return !0;
}, prettyPrintSeconds = function(sec) {
var ret, units;
return ret = [], units = [ {
val:"day",
unit:86400
}, {
val:"hour",
unit:3600
}, {
val:"min",
unit:60
}, {
val:"sec",
unit:1
} ], sec ? (_.each(units, function(o) {
var q;
return q = Math.floor(sec / o.unit), q ? (ret.push(q + " " + o.val + (q > 1 ? "" :"")), 
sec -= q * o.unit) :void 0;
}), ret.join(" ")) :"0 seconds";
}, formatDate = function(date) {
var d;
return d = moment(date), d.format("MMM D, YYYY");
}, formatDateTime = function(timestamp) {
var d;
return d = moment(timestamp), d.format("MMM D, YYYY h:mm:ss a");
}, formatDateRange = function(dateString, separator) {
var dates, resultDates;
return null == separator && (separator = "to"), dates = dateString.split("to"), 
resultDates = [], _.each(dates, function(date) {
return resultDates.push(formatDate($.trim(date)));
}), resultDates.join(" to ");
}, formatTimeInUserTz = function(time, format) {
var timezone;
return null == format && (format = null), timezone = HR.currentUser.get("timezone"), 
HR.util.formatTimeInTz(time, timezone, format);
}, capitalize = function(s) {
return "" === s ? s :s.charAt(0).toUpperCase() + s.slice(1);
}, beautifyDates = function(from, to) {
var ret;
return ret = "NAV", from && to && (_.isString(from) && (from = new Date(from)), 
_.isString(to) && (to = new Date(to)), from.getDate() === to.getDate() ? (ret = moment(from).format("h"), 
from.getMinutes() && (ret += moment(from).format(":m")), ret += moment(from).format("a") === moment(to).format("a") ? " - " :moment(from).format("a - "), 
ret += moment(to).format("h"), to.getMinutes() && (ret += moment(to).format(":m")), 
ret += moment(to).format("a, Do MMMM"), from.getYear() !== new Date().getYear() && (ret += moment(to).format(", YY"))) :from.getMonth() === to.getMonth() ? (ret = moment(from).format("h:ma Do - ") + moment(to).format("h:ma Do, MMMM"), 
from.getYear() !== new Date().getYear() && (ret += moment(to).format(" YY"))) :ret = moment(from).format("h:ma D MMM YY - ") + moment(to).format("h:ma D MMM YY")), 
ret;
}, linkify = function(str) {
var base, filename;
return str.startsWith("http://") || str.startsWith("https://") ? (base = str.split("/"), 
filename = base[base.length - 1], "" === filename && (filename = str), "<a href='" + str + "'>" + filename + "</a>") :str;
}, track = function(event, data, callback) {
return null == data && (data = {}), null == callback && (callback = ""), "undefined" != typeof mixpanel ? _.isEmpty(callback) ? mixpanel.push([ "track", event, data ]) :mixpanel.push([ "track", event, data, callback ]) :void 0;
}, "function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function(needle) {
return 0 === this.indexOf(needle);
}), "function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function(suffix) {
return -1 !== this.indexOf(suffix, this.length - suffix.length);
}), trackTotango = function(event, module) {
return null !== totango ? totango.track(event, module) :void 0;
}, fixedInfo = function(navFragment, itemSelector, top_offset, inherit_width, scroller) {
return null == top_offset && (top_offset = 10), null == inherit_width && (inherit_width = !1), 
null == scroller && (scroller = ".overflow-content"), $(scroller).unbind("scroll").scroll(function() {
return function(e) {
var a, cutoff, i, left, lefth, main_left, main_top, right, righth, topmargin, _i, _len, _ref, _results;
if (-1 === Backbone.history.fragment.indexOf(navFragment)) return $(scroller).unbind("scroll"), 
void 0;
for (topmargin = 20, main_top = $(e.currentTarget).offset().top + top_offset, main_left = $(e.currentTarget).offset().left, 
a = [], _ref = $.find(itemSelector), _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) i = _ref[_i], 
right = $(i).find(".movable-hand "), left = $(i).find(".fixed-hand "), righth = right.innerHeight(), 
lefth = left.innerHeight(), cutoff = main_top - right.offset().top, cutoff > righth - lefth - topmargin ? _results.push(left.css({
top:righth - lefth - topmargin,
position:"relative"
})) :0 > cutoff ? (a.push("nothing happened"), _results.push(left.css({
top:0,
position:"relative"
}))) :(left.css({
position:"fixed",
top:main_top
}), inherit_width ? _results.push(left.css({
width:$(i).width()
})) :_results.push(void 0));
return _results;
};
}(this));
}, arrayToString = function(array) {
var reducedArray, string;
return array.length <= 1 ? array.join(", ") :(reducedArray = array.slice(0, +(array.length - 2) + 1 || 9e9), 
string = reducedArray.join(", "), string += " and " + array[array.length - 1]);
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.util || (HR.util = {}), window.HR || (window.HR = HR), 
HR.util.readableQuestionType = readableQuestionType, HR.util.compareArrays = compareArrays, 
HR.util.convertToSlug = convertToSlug, HR.util.prettyPrintSeconds = prettyPrintSeconds, 
HR.util.formatDateRange = formatDateRange, HR.util.getCandidateDetailsMapping = getCandidateDetailsMapping, 
HR.util.formatDate = formatDate, HR.util.formatDateTime = formatDateTime, HR.util.capitalize = capitalize, 
HR.util.changeTimeZoneDialog = changeTimeZoneDialog, HR.util.beautifyDates = beautifyDates, 
HR.util.linkify = linkify, HR.util.fixedInfo = fixedInfo, HR.util.track = track, 
HR.util.trackTotango = trackTotango, HR.util.formatTimeInUserTz = formatTimeInUserTz, 
HR.util.arrayToString = arrayToString;
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
var GenericModel, HR, _ref;
return GenericModel = function(_super) {
function GenericModel() {
return GenericModel.__super__.constructor.apply(this, arguments);
}
return __extends(GenericModel, _super), GenericModel.prototype.initialize = function(options) {
return this.on("error", function(_this) {
return function(model, xhr) {
var response;
return response = xhr && xhr.responseText ? JSON.parse(xhr.responseText) :{
message:""
}, void 0 !== _this.disableThrobber && _this.disableThrobber === !0 || (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg(response.message, !1, !0, 1e4), 
!HR.loadingButton) ? void 0 :HR.util.inlineLoadingEnd(response);
};
}(this)), GenericModel.__super__.initialize.call(this, options);
}, GenericModel.prototype.save = function(key, val, options) {
return void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
GenericModel.__super__.save.call(this, key, val, options);
}, GenericModel.prototype.destroy = function(options) {
return void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
GenericModel.__super__.destroy.call(this, options);
}, GenericModel.prototype.parse = function(resp, xhr) {
var model;
return this.sync_status = !0, void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
HR.loadingButton && HR.util.inlineLoadingEnd(resp)) :this.disableThrobber = !1, 
model = resp && resp.model ? resp.model :resp, GenericModel.__super__.parse.call(this, model, xhr);
}, GenericModel.prototype.fetch = function() {
return this.trigger("initreset"), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Model.prototype.fetch.apply(this, arguments);
}, GenericModel.prototype.setCaching = function(caching) {
this.caching = caching;
}, GenericModel;
}(Backbone.Model), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericModel = GenericModel;
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
var GenericCollection, HR, _ref;
return GenericCollection = function(_super) {
function GenericCollection() {
return GenericCollection.__super__.constructor.apply(this, arguments);
}
return __extends(GenericCollection, _super), GenericCollection.prototype.initialize = function(options) {
return this.sync_status = !1, this.render_once = !1, this.on("error", function(_this) {
return function(model, xhr) {
var response;
return response = JSON.parse(xhr.responseText), void 0 !== _this.disableThrobber && _this.disableThrobber === !0 || (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
!HR.loadingButton) ? void 0 :HR.util.inlineLoadingEnd(response);
};
}(this)), GenericCollection.__super__.initialize.call(this, options);
}, GenericCollection.prototype.fetch = function(options) {
return null == options && (options = {}), this.trigger("initreset"), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Collection.prototype.fetch.apply(this, arguments);
}, GenericCollection.prototype.parse = function(resp) {
return this.sync_status = !0, this.render_once = !1, resp.metamodel && (this.metamodel = resp.metamodel), 
"number" == typeof resp.total && (this.total = resp.total), "number" == typeof resp.page && (this.page = resp.page), 
void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
HR.loadingButton && HR.util.inlineLoadingEnd(resp)) :this.disableThrobber = !1, 
resp.models;
}, GenericCollection.prototype.setCurrentPage = function(page) {
this.page = page;
}, GenericCollection.prototype.getCurrentPage = function() {
return this.page;
}, GenericCollection.prototype.getTotal = function() {
return this.total;
}, GenericCollection;
}(Backbone.Collection), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericCollection = GenericCollection;
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
var CandidateActivityModel, CandidateAttemptModel, CandidateCompileTestModel, CandidateDesignTestModel, CandidateQuestionModel, CandidateSolveModel, CandidateTestModel, HR, _ref;
return CandidateTestModel = function(_super) {
function CandidateTestModel() {
return CandidateTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateTestModel, _super), CandidateTestModel.prototype.idAttribute = "unique_id", 
CandidateTestModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateTestModel.__super__.initialize.call(this, attributes, options);
}, CandidateTestModel.prototype.setTidAuth = function(tid, auth) {
this.tid = tid, this.auth = auth;
}, CandidateTestModel.prototype.setAction = function(action) {
this.action = null != action ? action :"show";
}, CandidateTestModel.prototype.url = function() {
switch (this.action) {
case "login":
return "/recruit/tests/" + this.tid + "/login?tauth_key=" + this.auth;

case "show":
return "/recruit/tests/" + this.tid + "?tauth_key=" + this.auth;

case "logout":
return "/recruit/tests/logout";
}
}, CandidateTestModel;
}(window.HR.GenericModel), CandidateAttemptModel = function(_super) {
function CandidateAttemptModel() {
return CandidateAttemptModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateAttemptModel, _super), CandidateAttemptModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateAttemptModel.__super__.initialize.call(this, attributes, options);
}, CandidateAttemptModel.prototype.setAid = function(aid) {
return this.aid = aid;
}, CandidateAttemptModel.prototype.url = function() {
return "/recruit/attempts/" + this.aid;
}, CandidateAttemptModel;
}(window.HR.GenericModel), CandidateQuestionModel = function(_super) {
function CandidateQuestionModel() {
return CandidateQuestionModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateQuestionModel, _super), CandidateQuestionModel.prototype.idAttribute = "unique_id", 
CandidateQuestionModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateQuestionModel.__super__.initialize.call(this, attributes, options);
}, CandidateQuestionModel.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateQuestionModel.prototype.setQid = function(qid) {
this.qid = qid;
}, CandidateQuestionModel.prototype.url = function() {
return "/recruit/attempts/" + this.aid + "/questions/" + this.qid;
}, CandidateQuestionModel;
}(window.HR.GenericModel), CandidateSolveModel = function(_super) {
function CandidateSolveModel() {
return CandidateSolveModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateSolveModel, _super), CandidateSolveModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateSolveModel.__super__.initialize.call(this, attributes, options);
}, CandidateSolveModel.prototype.setAttempt = function(aid) {
this.aid = aid;
}, CandidateSolveModel.prototype.url = function() {
return "/recruit/attempts/" + this.aid + "/solves/";
}, CandidateSolveModel;
}(window.HR.GenericModel), CandidateCompileTestModel = function(_super) {
function CandidateCompileTestModel() {
return CandidateCompileTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateCompileTestModel, _super), CandidateCompileTestModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateCompileTestModel.__super__.initialize.call(this, attributes, options);
}, CandidateCompileTestModel.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateCompileTestModel.prototype.setQid = function(qid) {
this.qid = qid;
}, CandidateCompileTestModel.prototype.setAllCases = function(allcases) {
this.allcases = allcases;
}, CandidateCompileTestModel.prototype.url = function() {
return this.id ? "/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/compile_tests/" + this.id :this.allcases ? "/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/compile_tests?allcases=" + this.allcases :"/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/compile_tests";
}, CandidateCompileTestModel;
}(window.HR.GenericModel), CandidateDesignTestModel = function(_super) {
function CandidateDesignTestModel() {
return CandidateDesignTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateDesignTestModel, _super), CandidateDesignTestModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateDesignTestModel.__super__.initialize.call(this, attributes, options);
}, CandidateDesignTestModel.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateDesignTestModel.prototype.setQid = function(qid) {
this.qid = qid;
}, CandidateDesignTestModel.prototype.url = function() {
return this.id ? "/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/render/" + this.id :"/recruit/attempts/" + this.aid + "/questions/" + this.qid + "/render";
}, CandidateDesignTestModel;
}(window.HR.GenericModel), CandidateActivityModel = function(_super) {
function CandidateActivityModel() {
return CandidateActivityModel.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateActivityModel, _super), CandidateActivityModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
this.setCaching(!1), CandidateActivityModel.__super__.initialize.call(this, attributes, options);
}, CandidateActivityModel.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateActivityModel.prototype.url = function() {
return "/recruit/attempts/" + this.aid + "/logActivity";
}, CandidateActivityModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateTestModel = CandidateTestModel, 
HR.CandidateAttemptModel = CandidateAttemptModel, HR.CandidateSolveModel = CandidateSolveModel, 
HR.CandidateQuestionModel = CandidateQuestionModel, HR.CandidateCompileTestModel = CandidateCompileTestModel, 
HR.CandidateDesignTestModel = CandidateDesignTestModel, HR.CandidateActivityModel = CandidateActivityModel;
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
var CandidateActivityCollection, HR, _ref;
return CandidateActivityCollection = function(_super) {
function CandidateActivityCollection() {
return CandidateActivityCollection.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateActivityCollection, _super), CandidateActivityCollection.prototype.model = window.HR.CandidateActivityModel, 
CandidateActivityCollection.prototype.initialize = function() {
return this.limit || (this.limit = 10), this.page = 1, this.total = 0, this.on("add", this.pushEvent, this);
}, CandidateActivityCollection.prototype.setAid = function(aid) {
this.aid = aid;
}, CandidateActivityCollection.prototype.pushEvent = function(model) {
return model.setAid(this.aid), model.save();
}, CandidateActivityCollection.prototype.baseURL = function() {
return "";
}, CandidateActivityCollection.prototype.restURL = function() {
return "" + this.baseURL();
}, CandidateActivityCollection.prototype.getCurrentPage = function() {
return this.page;
}, CandidateActivityCollection.prototype.setPage = function(page) {
this.page = page;
}, CandidateActivityCollection.prototype.getTotal = function() {
return this.total;
}, CandidateActivityCollection.prototype.parse = function(resp, xhr) {
return this.total = resp.total, CandidateActivityCollection.__super__.parse.call(this, resp, xhr);
}, CandidateActivityCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateActivityCollection = CandidateActivityCollection;
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
}, CandidateController.prototype.addTemplate = function(logical_path, template) {
return HR.templates[logical_path] = template;
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
}, CandidateController.prototype.logicalTemplatePath = function(template) {
return "backbone/templates/" + template;
}, CandidateController.prototype.template = function(template_name, template_callback, view_loader) {
var each_inline_template, logical_template_path, that, _i, _len, _ref;
if (null == template_name && (template_name = null), null == template_callback && (template_callback = null), 
null == view_loader && (view_loader = !0), HR.templates = HR.templates || {}, logical_template_path = this.logicalTemplatePath(template_name), 
void 0 === this.template_callbacks && (this.template_callbacks = {}, $('script[type="text/template"]').length > 0)) for (_ref = $('script[type="text/template"]'), 
_i = 0, _len = _ref.length; _len > _i; _i++) each_inline_template = _ref[_i], HR.templates[this.logicalTemplatePath($(each_inline_template).attr("id"))] = _.template($(each_inline_template).html());
return null !== template_name && void 0 !== HR.templates[logical_template_path] && "--insync--" !== HR.templates[logical_template_path] ? (template_callback = null, 
HR.templates[logical_template_path]) :(void 0 === this.template_callbacks[template_name] && (this.template_callbacks[template_name] = []), 
null !== template_callback && (this.template_callbacks[template_name].push(template_callback), 
template_callback = null), "--insync--" !== HR.templates[logical_template_path] && (HR.templates[logical_template_path] = "--insync--", 
that = this, $.ajax({
url:this.templatePath("" + template_name + ".js"),
dataType:"script",
success:function() {
return that.template_callbacks[template_name] && (_.each(that.template_callbacks[template_name], function(callback) {
return callback.render();
}), that.template_callbacks[template_name] = []), template_callback = null;
},
error:function() {
throw HR.connectionAlert && HR.connectionAlert(), "Template `" + that.templatePath("" + template_name + ".js") + "` Not Found";
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
var data, each_inline_template, logical_template_path, that, _i, _len, _ltp, _ref;
if (null == callback && (callback = function() {}), null == obj && (obj = null), 
HR.templates = HR.templates || {}, logical_template_path = this.logicalTemplatePath(template_name), 
null === obj && (obj = this), obj && obj.cid) {
if (this.TEMPLATE_VIEWDATA || (this.TEMPLATE_VIEWDATA = {}), this.TEMPLATE_VIEWDATA["" + obj.cid + "-" + template_name]) return;
this.TEMPLATE_VIEWDATA["" + obj.cid + "-" + template_name] = !0;
}
if (void 0 === this.TEMPLATE_CALLBACKS && (this.TEMPLATE_CALLBACKS = {}, $('script[type="text/template"]').length > 0)) for (_ref = $('script[type="text/template"]'), 
_i = 0, _len = _ref.length; _len > _i; _i++) each_inline_template = _ref[_i], _ltp = this.logicalTemplatePath($(each_inline_template).attr("id")), 
HR.templates[_ltp] || (HR.templates[_ltp] = _.template($(each_inline_template).html()));
return void 0 !== HR.templates[logical_template_path] ? (data = HR.templates[logical_template_path], 
callback.call(obj, data), data) :(this.TEMPLATE_CALLBACKS[template_name] || (this.TEMPLATE_CALLBACKS[template_name] = [], 
that = this, $.ajax({
url:this.templatePath("" + template_name + ".js"),
dataType:"script",
success:function() {
var _clbk, _results;
for (_results = []; that.TEMPLATE_CALLBACKS[template_name].length > 0; ) _clbk = that.TEMPLATE_CALLBACKS[template_name].shift(), 
_results.push(_clbk.callback.call(_clbk.obj, HR.templates[logical_template_path]));
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
}, CandidateController.prototype.loadCodeMirror = function(callback, errcallback) {
return null == errcallback && (errcallback = null), HR.requires("codemirror_basic", function() {
return function() {
return callback();
};
}(this), function() {
return function() {
return errcallback();
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
}, CandidateController.prototype.loadGraphLibraries = function(callback, errcallback) {
return null == errcallback && (errcallback = null), HR.requires("candidate_graph", function() {
return function() {
return callback();
};
}(this), function() {
return function() {
return errcallback();
};
}(this));
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
return $(".js-tooltip").tooltip().click(function(e) {
return $(".js-tooltip").tooltip("hide"), $(e.currentTarget).hasClass("disabled") ? !1 :!0;
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
return this.contentView || this.setLoadingView(), this.topbarview = null, that = this, 
_.each(this.liveEvents, function(callback, index) {
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
return null == tbview && (tbview = null), this.topbarview !== tbview ? (this.topbarview = tbview, 
_.isEmpty(this.topbarview) ? this.$("#navigation").empty() :this.$("#navigation").html(this.topbarview.render().el), 
tbview) :void 0;
}, CandidateView.prototype.setFooterView = function(fview) {
var html;
return null == fview && (fview = null), this.footerview = fview, fview ? (html = this.footerview.render().el, 
$("#footer").html(html)) :$("#footer").empty(), fview;
}, CandidateView.prototype.setSidebarView = function(sbview) {
return null == sbview && (sbview = null), sbview ? (this.sidebarview = sbview, this.$("#side-navigation").html(this.sidebarview.render().el)) :this.$("#side-navigation").empty();
}, CandidateView.prototype.unsetTopbarView = function() {
return this.$("#navigation").empty();
}, CandidateView.prototype.liveEvents = {
"click .backbone":"navigateAnchor"
}, CandidateView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
HR.candidate.redirectBackTo = href, href ? (HR.candidate.attemptRefreshNeeded = !0, 
HR.router.navigate("" + href, {
trigger:!0,
replace:!0
})) :void 0);
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
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
}, __bind = function(fn, me) {
return function() {
return fn.apply(me, arguments);
};
}, __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var HR, RecruitCandidateCodingView, RecruitCandidateCompileTestView, RecruitCandidateCompleteView, RecruitCandidateDesignView, RecruitCandidateFileUploadView, RecruitCandidateFooterView, RecruitCandidateInstructionsView, RecruitCandidateListView, RecruitCandidateMcqView, RecruitCandidateQuestionView, RecruitCandidateSideBarView, RecruitCandidateSubjectiveView, RecruitCandidateTestCaseView, RecruitCandidateTopBarView, RecruitCandidateUMLView, _ref;
return RecruitCandidateInstructionsView = function(_super) {
function RecruitCandidateInstructionsView() {
return RecruitCandidateInstructionsView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateInstructionsView, _super), RecruitCandidateInstructionsView.prototype.template = "recruit/instructions", 
RecruitCandidateInstructionsView.prototype.className = "candidate-instructions", 
RecruitCandidateInstructionsView.prototype.initialize = function(options) {
return this.model = options.model;
}, RecruitCandidateInstructionsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
instructions:this.model.get("instructions")
})), this;
}, RecruitCandidateInstructionsView;
}(window.HR.GenericView), RecruitCandidateListView = function(_super) {
function RecruitCandidateListView() {
return RecruitCandidateListView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateListView, _super), RecruitCandidateListView.prototype.template = "recruit/question-list", 
RecruitCandidateListView.prototype.className = "candidate-qlist", RecruitCandidateListView.prototype.events = {
"click .test-done":"testDone",
"click .next-section":"sectionNext",
"click .js-solvelink":"handleNav"
}, RecruitCandidateListView.prototype.initialize = function() {
return this.model = HR.candidate.candidateAttemptModel, this.tid = HR.candidate.candidateTestModel.get("unique_id"), 
this.aid = this.model.get("id");
}, RecruitCandidateListView.prototype.render = function() {
var current_section, qi, questions, sections_mapping, solves, v;
return questions = this.model.get("questions"), solves = this.model.get("solve_mapping"), 
sections_mapping = this.model.get("sections_mapping"), current_section = this.model.get("section"), 
$(this.el).html(HR.appController.template(this.template, this)({
section_count:sections_mapping ? sections_mapping.length :1,
current_section:current_section ? current_section :1,
footer_copyright:!!HR.candidate.candidateTestModel.get("footer_copyright")
})), sections_mapping ? (qi = 0, _.each(sections_mapping, function(_this) {
return function(sec, i) {
var v;
return v = _this.getTable(questions.slice(qi, qi + parseInt(sec.questions)), qi + 1, solves, i + 1 !== current_section), 
_this.$("table.section" + (i + 1)).html(v), qi += parseInt(sec.questions);
};
}(this)), sections_mapping.length > 1 && current_section < sections_mapping.length && this.$("button.section-finish-" + current_section).removeClass("hidden")) :(v = this.getTable(questions, 1, solves), 
this.$("table.section1").html(v)), HR.candidate.lastQuestionViewed && setTimeout(function(_this) {
return function() {
return _this.$(".qlist-" + HR.candidate.lastQuestionViewed)[0] && _this.$(".qlist-" + HR.candidate.lastQuestionViewed)[0].scrollIntoView();
};
}(this)), this;
}, RecruitCandidateListView.prototype.getTable = function(questions, start, solves, disabled) {
var el, i, tid;
return null == disabled && (disabled = !1), tid = this.tid, i = start, el = "", 
_.each(questions, function(q) {
var ahref, s;
return s = "", s += 1 === i ? "<tr class='border qlist-" + i + "''>" :"<tr class='qlist-" + i + "'>", 
s += "<td width='5%' class='grey right'><span class='mdR'>Q" + i + "</span></td>", 
s += '<td width="46%"><a class="js-solvelink question-name" ', s += disabled ? ">" :"href='" + tid + "/questions/" + q.unique_id + "'>", 
s += q.name ? q.name :"Question <em class='fnt-sz-small grey' style='font-weight: 500;'> &nbsp;&nbsp; " + _.escape(q.preview) + "..</em>", 
s += "</a></td>", s += "<td width='12%' class='fnt-sz-mid'>" + window.istreet.cfg.hrqn[q.type] + "</td>", 
ahref = disabled ? "" :"href='" + tid + "/questions/" + q.unique_id + "'", s += _.has(solves, q.unique_id) ? "<td width='12%' class='fnt-sz-mid'><span class='green'>submitted</span></td><td width='19%' class='right'><a " + ahref + " class='normal-underline display-inline-block margin-right-15 fnt-sz-mid js-solvelink' style='margin: 9px 11px 9px 0;''>Modify Submission</a></td>" :"<td width='12%' class='fnt-sz-mid'>not answered</td><td width='19%' class='right'><a " + ahref + " class='btn btn-line margin-right-15 fnt-sz-mid js-solvelink'>Solve Question</a></td>", 
s += "</tr>", i++, el += s;
}), el;
}, RecruitCandidateListView.prototype.handleNav = function(e) {
var me;
return e.preventDefault(), me = this.$(e.currentTarget), HR.candidate.ongoingQuestionNavigation ? void 0 :(HR.candidate.ongoingQuestionNavigation = !0, 
setTimeout(function() {
return HR.candidate.ongoingQuestionNavigation = !1;
}, 1e4), HR.candidate.attemptRefreshNeeded = !0, HR.router.navigate(me.attr("href"), {
trigger:!0,
replace:!0
}));
}, RecruitCandidateListView.prototype.testDone = function() {
return HR.util.confirm({
title:"Confirm test close",
message:"Once closed, you can no longer view or modify this test.\n\nAre you sure you are done, and want to close the test?",
okButtonText:"Yes, close this test.",
cancelButtonText:"No, go back.",
okCallback:function() {
return function() {
return HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
HR.candidate.candidateTestModel.save(null, {
success:function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
}
});
};
}(this)
});
}, RecruitCandidateListView.prototype.sectionNext = function(e) {
return HR.util.confirm({
title:"Confirm section close",
message:"You will not be able access this section again.<br><br>Are you sure?",
okButtonText:"Yes, move to next section.",
cancelButtonText:"No, stay.",
okCallback:function(_this) {
return function() {
return HR.candidate.candidateAttemptModel.set("section_close", _this.$(e.currentTarget).attr("data-section")), 
HR.candidate.candidateAttemptModel.save(null, {
success:function() {
return HR.router.navigate("" + HR.candidate.candidateTestModel.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
},
error:function() {
return HR.router.navigate("" + HR.candidate.candidateTestModel.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
}
});
};
}(this)
});
}, RecruitCandidateListView;
}(window.HR.GenericView), RecruitCandidateQuestionView = function(_super) {
function RecruitCandidateQuestionView() {
return this.getAnswerToSave = __bind(this.getAnswerToSave, this), RecruitCandidateQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateQuestionView, _super), RecruitCandidateQuestionView.prototype.template = "recruit/question-base", 
RecruitCandidateQuestionView.prototype.className = "question-base", RecruitCandidateQuestionView.prototype.initialize = function(options) {
return this.model = options.model, this.tid = HR.candidate.candidateTestModel.get("unique_id");
}, RecruitCandidateQuestionView.prototype.events = {
"click .ans-submit":"submitAnswer"
}, RecruitCandidateQuestionView.prototype.getAnswerToSave = function() {
var a, qtype;
return qtype = this.model.get("type"), _.contains([ "code", "approx", "textAns", "design" ], qtype) ? this.view ? (a = {
type:qtype,
answer:this.view.answer()
}, a.answer ? a :null) :null :null;
}, RecruitCandidateQuestionView.prototype.submitAnswer = function(e) {
var a, data, request_params;
return e.preventDefault(), a = {
type:this.model.attributes.type,
answer:this.view.answer()
}, a.answer ? (this.$(e.currentTarget).html("Submitting.."), this.$(e.currentTarget).attr("disabled", "disabled"), 
data = {
qid:this.model.get("unique_id"),
answer:a
}, request_params = {
url:"/recruit/attempts/" + HR.candidate.candidateAttemptModel.get("id") + "/solves",
data:data,
dataType:"json",
type:"POST",
success:function(_this) {
return function(xhr) {
var nextpath;
return _this.$(e.currentTarget).html("Done, redirecting.."), xhr.error ? _this.showError(xhr.error) :(nextpath = _this.model.get("nextqid") ? "" + _this.tid + "/questions/" + _this.model.get("nextqid") :"" + _this.tid + "/questions", 
HR.candidate.attemptRefreshNeeded = !0, HR.router.navigate("" + nextpath, {
trigger:!0,
replace:!0
}));
};
}(this),
error:function(_this) {
return function(xhr) {
_this.$(e.currentTarget).html("Submit answer & continue"), _this.$(e.currentTarget).removeAttr("disabled");
try {
return data = JSON.parse(xhr.responseText), data.error ? _this.showError(data.error) :_this.showError();
} catch (_error) {
return _this.showError();
}
};
}(this)
}, "file_upload" !== this.model.get("type") || _.isString(this.view.answer()) || (data = {
qid:this.model.get("unique_id")
}, request_params.iframe = !0, request_params.processData = !1, request_params.data = data, 
request_params.files = this.view.answer()), $.ajax(request_params)) :HR.util.alert({
title:"Submit error",
message:"Please answer the question before submitting."
});
}, RecruitCandidateQuestionView.prototype.showError = function(err) {
return null == err && (err = "Unable to save your answer."), HR.util.candidatemsg("" + err + "<br><br>Click continue to refresh question listing.<br><br><a href='" + this.tid + "/questions' class='backbone btn'>Continue</a>", !1);
}, RecruitCandidateQuestionView.prototype._render = function() {
var cnt, problem_statement, q, viewfound;
switch (this.question = this.model.attributes, $(this.el).html(HR.appController.template(this.template, this)({
tid:this.tid,
question:this.question
})), viewfound = !0, this.question.type) {
case "code":
case "approx":
this.view = new HR.RecruitCandidateCodingView({
question:this.question
});
break;

case "design":
this.view = new HR.RecruitCandidateDesignView({
question:this.question
});
break;

case "mcq":
case "multiple_mcq":
this.view = new HR.RecruitCandidateMcqView({
question:this.question
});
break;

case "textAns":
this.view = new HR.RecruitCandidateSubjectiveView({
question:this.question
});
break;

case "complete":
for (q = this.question.complete_string, cnt = 0, problem_statement = "<h4>Complete the blanks in the following question with the appropriate answer.</h4><br/>", 
problem_statement += _.isEmpty(this.question.question) ? "" :this.question.question; -1 !== q.search("{blank}"); ) q = q.replace("{blank}", "<input type='text' class='complete-question' name='blank" + cnt + "'/>"), 
cnt += 1;
problem_statement += q, this.view = new HR.RecruitCandidateCompleteView({
question:this.question
});
break;

case "file_upload":
this.view = new HR.RecruitCandidateFileUploadView({
question:this.question
});
break;

case "uml":
case "electrical":
this.view = new HR.RecruitCandidateUMLView({
question:this.question
});
break;

default:
viewfound = !1;
}
return this.question.name ? this.$(".qtitle").html("" + this.question.name + " (" + window.istreet.cfg.hrqn[this.question.type] + ")") :this.$(".qtitle").html(window.istreet.cfg.hrqn[this.question.type]), 
"complete" === this.question.type ? this.$(".challenge-text").html(problem_statement) :this.$(".challenge-text").html(this.question.question), 
viewfound ? this.$(".qcontent").html(this.view.render().el) :(this.$(".qcontent").html("<center>This question type is not available.</center>"), 
this.$(".ans-submit").addClass("disabled")), HR.candidate.lastQuestionViewed = this.model.get("qno"), 
setTimeout(function() {
return HR.util.scrollToTop();
}, 200), this;
}, RecruitCandidateQuestionView;
}(window.HR.GenericView), RecruitCandidateCodingView = function(_super) {
function RecruitCandidateCodingView() {
return RecruitCandidateCodingView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCodingView, _super), RecruitCandidateCodingView.prototype.template = "recruit/question-coding", 
RecruitCandidateCodingView.prototype.className = "question-coding", RecruitCandidateCodingView.prototype.initialize = function(options) {
return this.question = options.question, this.test = HR.candidate.candidateTestModel || options.test, 
this.codeshell = null, window.error_marker_widgets = [], HR.candidate && HR.candidate.candidateAttemptModel ? (this.aid = HR.candidate.candidateAttemptModel.get("id"), 
HR.appView.saveCodeOnNavigate = !0) :this.aid = "testing", this.autoSaveNamespace = options.disableLocalStorage && options.disableLocalStorage === !0 ? null :"" + this.aid + "-" + this.question.unique_id, 
this.compilingLock = !1, this;
}, RecruitCandidateCodingView.prototype.events = {
"codeshellcompile #editor":"compileAnswer",
"click #testcase-dl":"testcaseDownload"
}, RecruitCandidateCodingView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.show_template = !1, this.question.show_template && "true" === this.question.show_template.toLowerCase() && (this.show_template = !0), 
this.test.get("show_template") && "true" === this.test.get("show_template").toLowerCase() && (this.show_template = !0), 
HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell();
};
}(this), function() {
return function() {
return HR.util.candidatemsg("Unable to load code editor.<br><br> Check your internet connection, and refresh the page to fix this.", !1);
};
}(this)), this;
}, RecruitCandidateCodingView.prototype.testcaseDownload = function() {
var url;
return url = "/recruit/attempts/" + HR.candidate.candidateAttemptModel.id + "/questions/" + this.question.unique_id + "/testcases", 
HR.util.downloadURL(url);
}, RecruitCandidateCodingView.prototype.applyCodeshell = function() {
var opts;
return opts = {
languages:this.question.languages,
language:"c",
autoSaveNamespace:this.autoSaveNamespace,
lang_template:this.getLangDefaults(),
showNonEditableHeadTail:this.show_template,
lang_head_template:this.getLangHeads(),
lang_tail_template:this.getLangTails(),
compile_button_text:"Run Code",
submit_button_text:"Submit code & Continue",
showSubmit:!0,
showCustomInput:this.showCustomInput(),
dynamicMode:!0,
lang_line_nos:this.question.line_nos,
loadmode:function() {
return function(e, data) {
return HR.appController.loadCodeMirrorMode(data.lang, function() {
return data.callback();
});
};
}(this)
}, ("True" === this.test.get("hide_compile_test") || "True" === this.question.hide_compile_test) && (opts.showCompileTest = !1), 
"testing" === this.aid && (opts.showSubmit = !1, opts.showCompileTest = !1), opts.showCompileTest !== !1 && (opts.showCompileTest = !0), 
this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh"), this.$("#editor").codeshell("onChange", function(_this) {
return function(e, change) {
return _this.deleteMarkersOnSource(e, change);
};
}(this)), this.set_answer(), setTimeout(function(_this) {
return function() {
return _this.setDefaultText = !0;
};
}(this), 3e3);
}, RecruitCandidateCodingView.prototype.getLangDefaults = function() {
var l, m, _i, _len, _ref;
for (m = {}, _ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template"] && (m[l] = this.question[l + "_template"]);
return m;
}, RecruitCandidateCodingView.prototype.getLangHeads = function() {
var l, m, _i, _len, _ref;
if (m = {}, this.show_template) for (_ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template_head"] && (m[l] = this.question[l + "_template_head"]);
return m;
}, RecruitCandidateCodingView.prototype.getLangTails = function() {
var l, m, _i, _len, _ref;
if (m = {}, this.show_template) for (_ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template_tail"] && (m[l] = this.question[l + "_template_tail"]);
return m;
}, RecruitCandidateCodingView.prototype.showCustomInput = function() {
return this.question.show_custom_testcase && "True" === this.question.show_custom_testcase ? !0 :!1;
}, RecruitCandidateCodingView.prototype.compileAnswer = function(e, data) {
return data.code && !$(".bb-compile").hasClass("disabled") ? (data.custominput && (data.customtestcase = !0), 
$(".bb-compile").addClass("disabled"), this.deleteMarkersOnSource(), HR.candidate.ctmodel = new HR.CandidateCompileTestModel(), 
HR.candidate.ctmodel.setAid(this.aid), HR.candidate.ctmodel.setQid(this.question.unique_id), 
"runalltestcases" === e && HR.candidate.ctmodel.setAllCases(!0), HR.candidate.ctview = new HR.RecruitCandidateCompileTestView(), 
this.$("#runstatus").html(HR.candidate.ctview.render().el), HR.util.scrollToBottom(1e3), 
HR.candidate.ctmodel.save(data, {
success:function(_this) {
return function() {
return HR.candidate.ctview.setStatus("Uploaded. Waiting for results.."), HR.candidate.ctloop = setTimeout(function() {
return _this.checkForResult(_this, data, e);
}, 2e3);
};
}(this),
error:function() {
return function() {
return $(".bb-compile").removeClass("disabled"), HR.candidate.ctmodel = null, HR.candidate.ctview.setStatus("Could not compile as server is unreachable.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.checkForResult = function(that, data, e) {
return HR.candidate.ctloop ? (HR.candidate.ctview.setStatus("Processing.."), HR.candidate.ctmodel.fetch({
success:function(_this) {
return function(m) {
var expected_output, i, input, msg, output, output_debug, pass, score, st_class, _i, _len, _ref;
if (0 === m.get("status")) return HR.candidate.ctloop = setTimeout(function() {
return that.checkForResult(that, data, e);
}, 2e3), void 0;
if (0 !== m.get("status")) if ($(".bb-compile").removeClass("disabled"), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctloop = null, m.get("result") > 0) HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Compilation failed.", m.get("compilemessage")), 
that.addMarkersOnSource(m); else if (pass = 0, m.get("customtestcase")) HR.candidate.ctview.setStatus("Compiled successfully.", "orange"), 
input = m.get("stdin")[0], output = m.get("stdout")[0], output_debug = m.get("stdout_debug") ? m.get("stdout_debug")[0] :null, 
st_class = "txt-green", HR.candidate.ctview.addTestCase(1, input, output, output_debug, null, "", st_class, score); else {
for (_ref = m.get("testcase_status"), i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) input = _ref[i], 
output = m.get("stdout")[i], expected_output = m.get("expected_output")[i], output_debug = m.get("stdout_debug") ? m.get("stdout_debug")[i] :null, 
msg = m.get("testcase_message")[i], 1 === m.get("testcase_status")[i] ? (st_class = "txt-green", 
pass++) :st_class = "txt-orange", m.get("score") && _.isNumber(m.get("score")[i]) && (score = m.get("score")[i]), 
HR.candidate.ctview.addTestCase(i + 1, input, output, output_debug, expected_output, msg, st_class, score);
0 === m.get("testcase_status").length ? HR.candidate.ctview.setStatus("Compiled successfully.", "orange") :0 === pass ? HR.candidate.ctview.setStatus("No test cases passed.", "red") :i > pass ? "runalltestcases" === e ? HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " test cases passed.", "orange") :HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " sample test cases passed.", "orange") :"runalltestcases" !== e ? (HR.candidate.ctview.setStatus("Compiled successfully. All sample test cases passed!", "green"), 
_this.$(".bb-runall").show(), that.compileAnswer("runalltestcases", data)) :HR.candidate.ctview.setStatus("Compiled successfully. All test cases passed!", "green");
}
return HR.util.scrollToBottom(1e3);
};
}(this),
error:function() {
return function() {
return HR.candidate.ctmodel = null, $(".bb-compile").removeClass("disabled"), HR.candidate.ctview.setStatus("Unable to fetch compile information from server.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.answer = function() {
return this.$("#editor").codeshell("value");
}, RecruitCandidateCodingView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", this.question.solve.answer) :void 0;
}, RecruitCandidateCodingView.prototype.checkCopyPaste = function(change) {
var added_text;
if (this.setDefaultText && (added_text = change.text.join(""), added_text !== this.lastAddedText)) return this.lastAddedText = added_text, 
"paste" === change.origin && added_text.length > 100 ? HR.candidate.secureActivity.add({
action:"paste",
eid:9,
qid:this.question.unique_id,
insertTime:new Date()
}) :void 0;
}, RecruitCandidateCodingView.prototype.addMarkersOnSource = function(data) {
var editor, error_markers, error_message, i, line_number, line_offset, marker_node, markers, total_lines;
if (data.get("error_markers")) {
editor = window.codeEditor, error_markers = data.get("error_markers"), total_lines = editor.lineCount(), 
line_offset = error_markers.head_code_lines, markers = error_markers.markers;
for (i in markers) error_message = markers[i].message, line_number = markers[i].line_number, 
line_number -= line_offset, total_lines >= line_number && (marker_node = $("<div class='error-marker'><span class='error-marker-icon'>X</span>" + error_message + "</div>"), 
window.error_marker_widgets.push(editor.addLineWidget(line_number - 1, marker_node[0], {
above:!0
})));
return this.$("#editor").codeshell("refresh");
}
}, RecruitCandidateCodingView.prototype.deleteMarkersOnSource = function(e, change) {
var editor, i;
if (e && change && HR.candidate && HR.candidate.candidateAttemptModel && "True" === HR.candidate.candidateAttemptModel.get("secure") && this.checkCopyPaste(change), 
0 !== window.error_marker_widgets.length) {
editor = window.codeEditor;
for (i in window.error_marker_widgets) editor.removeLineWidget(window.error_marker_widgets[i]);
return this.$("#editor").codeshell("refresh"), window.error_marker_widgets = [];
}
}, RecruitCandidateCodingView;
}(window.HR.GenericView), RecruitCandidateDesignView = function(_super) {
function RecruitCandidateDesignView() {
return this.hideLoading = __bind(this.hideLoading, this), RecruitCandidateDesignView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateDesignView, _super), RecruitCandidateDesignView.prototype.template = "recruit/question-design", 
RecruitCandidateDesignView.prototype.className = "question-design", RecruitCandidateDesignView.prototype.initialize = function(options) {
return this.question = options.question, this.test = HR.candidate.candidateTestModel || options.test, 
this.codeshell = null, this.aid = HR.candidate && HR.candidate.candidateAttemptModel ? HR.candidate.candidateAttemptModel.get("id") :"testing", 
this.autoSaveNamespace = "testing" === this.aid ? "" + this.aid + "-" + this.test.id + "-" + this.question.id :"" + this.aid + "-" + this.question.unique_id, 
this;
}, RecruitCandidateDesignView.prototype.events = {
"click .bb-compile":"renderAnswer"
}, RecruitCandidateDesignView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.$("#runstatus").load(this.hideLoading), this.show_template = !1, HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell();
};
}(this), function() {
return function() {
return HR.util.alert({
message:"There was an error loading the code editor. Please refresh the page."
});
};
}(this)), this;
}, RecruitCandidateDesignView.prototype.applyCodeshell = function() {
var opts, tabs, tabs_tooltip;
return opts = {
languages:this.question.languages,
language:"html",
autoSaveNamespace:this.autoSaveNamespace,
lang_template:this.getLangDefaults(),
showNonEditableHeadTail:this.show_template,
compile_button_text:"Render",
submit_button_text:"Submit code & Continue",
showSubmit:!0,
languageChangeStyle:"tabs",
showCustomInput:!1,
dynamicMode:!0,
loadmode:function() {
return function(e, data) {
return HR.appController.loadCodeMirrorMode(data.lang, function() {
return data.callback();
});
};
}(this)
}, "testing" === this.aid && (opts.showSubmit = !1, opts.showCompileTest = !0), 
opts.showCompileTest !== !1 && (opts.showCompileTest = !0), this.$("#editor").codeshell(opts), 
this.$("#select-lang").addClass("hidden"), this.$("#select-lang-tabs").remove(), 
tabs = "<div id='select-lang-tabs'> <div class='pull-left btn-group'>", this.question.languages.forEach(function(v) {
return tabs += "<a class='cursor btn btn-white " + (v === opts.language ? "active" :void 0) + "' data-lang='" + v + "'>" + lang_display_mapping[v] + "</a>";
}), tabs += "</div> </div>", tabs_tooltip = $("<span class=' pull-left icon-help-circled txt-blue psT psB psL' data-toggle='tooltip' data-placement='right' title='The tabs on the left help you view the corresponding code segment.'></span>").tooltip(), 
tabs = $(tabs), tabs.find("a").on({
click:function(_this) {
return function(e) {
return e.preventDefault(), tabs.find("a").removeClass("active"), _this.$("#editor").codeshell("saveLangCode"), 
_this.$("#editor").codeshell("changeLanguage", _this.$(e.currentTarget).addClass("active").data("lang"));
};
}(this)
}), this.$("#editor > div.grey-header").prepend(tabs.append(tabs_tooltip)), $("#render-help").remove(), 
this.$("#editor .bb-compile").parent().prepend($("<span id='render-help' class='pull-left icon-help-circled txt-blue psT psB psR' data-toggle='tooltip' data-placement='left' title='Press \"Render\" Button to view the visual output of your code. Press \"Submit code & Continue\" to submit your answer. '></span>").tooltip()), 
this.$("#editor").codeshell("refresh"), this.set_answer(), setTimeout(function(_this) {
return function() {
return _this.setDefaultText = !0;
};
}(this), 3e3);
}, RecruitCandidateDesignView.prototype.getLangDefaults = function() {
var l, m, _i, _len, _ref;
for (m = {}, _ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template"] && (m[l] = this.question[l + "_template"]);
return m;
}, RecruitCandidateDesignView.prototype.hideLoading = function() {
return this.$(".bb-compile").length ? (this.setStatus("Document prepared successfully.", "green"), 
this.$(".bb-compile").removeClass("disabled"), this.$("#runstatus-load").addClass("hidden"), 
this.$("#runstatus").removeClass("hidden")) :void 0;
}, RecruitCandidateDesignView.prototype.renderAnswer = function(e, data) {
var form_elem;
if (!$(".bb-compile").hasClass("disabled")) return this.$(".bb-compile").addClass("disabled").data("status", "sending"), 
"testing" !== this.aid ? (HR.candidate.dtmodel = new HR.CandidateDesignTestModel(), 
HR.candidate.dtmodel.setAid(this.aid), HR.candidate.dtmodel.setQid(this.question.unique_id)) :(HR.candidate.dtmodel = new HR.RecruitDesignTestModel(), 
HR.candidate.dtmodel.setQid(this.question.id), HR.candidate.dtmodel.setTid(this.test.id)), 
this.$("#runstatus").addClass("hidden"), this.$("#runstatus-load").removeClass("hidden"), 
data = this.answer(), this.setStatus("Preparing the document...", "black"), "testing" !== this.aid ? HR.candidate.dtmodel.save(data, {
success:function(_this) {
return function(m) {
return _this.setStatus("Loading document.."), _this.$("#runstatus").attr("src", m.url()), 
HR.util.scrollToBottom(1e3);
};
}(this),
error:function(_this) {
return function() {
return HR.candidate.dtmodel = null, _this.setStatus("There was an issue with rendering this code.", "red");
};
}(this)
}) :(form_elem = $('<form target="runstatus" action="' + HR.candidate.dtmodel.url() + '" method="post">\n<input type="hidden" name="testing_design" />\n</form>'), 
form_elem.find('input[name="testing_design"]').val(JSON.stringify(data)), form_elem.submit());
}, RecruitCandidateDesignView.prototype.answer = function() {
return this.$("#editor").codeshell("value", !0);
}, RecruitCandidateDesignView.prototype.setStatus = function(s, additional_class) {
return null == additional_class && (additional_class = ""), this.$(".output-area-wrap").removeClass("hidden"), 
this.$(".status-msg").html(s), "" !== additional_class ? this.$(".status-msg").addClass(additional_class) :void 0;
}, RecruitCandidateDesignView.prototype.set_answer = function() {
var m;
return this.question.solve ? (m = {}, _.each(this.question.solve.answer, function(data) {
return m[data.language] = data.code;
}), this.$("#editor").codeshell("setOption", "lang_template", m), this.$("#editor").codeshell("setValue", {
language:"html",
code:m.html
})) :void 0;
}, RecruitCandidateDesignView.prototype.checkCopyPaste = function(change) {
var added_text;
if (this.setDefaultText && (added_text = change.text.join(""), added_text !== this.lastAddedText)) return this.lastAddedText = added_text, 
"paste" === change.origin && added_text.length > 100 ? HR.candidate.secureActivity.add({
action:"paste",
eid:9,
qid:this.question.unique_id,
insertTime:new Date()
}) :void 0;
}, RecruitCandidateDesignView;
}(window.HR.GenericView), RecruitCandidateMcqView = function(_super) {
function RecruitCandidateMcqView() {
return RecruitCandidateMcqView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateMcqView, _super), RecruitCandidateMcqView.prototype.template = "recruit/question-mcq", 
RecruitCandidateMcqView.prototype.className = "question-mcq", RecruitCandidateMcqView.prototype.events = {
"click .clearall":"clearAll"
}, RecruitCandidateMcqView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateMcqView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), this;
}, RecruitCandidateMcqView.prototype.clearAll = function(e) {
return e.preventDefault(), this.$('input[name="mcqopts"]').attr("checked", !1);
}, RecruitCandidateMcqView.prototype.answer = function() {
var answer, o;
return "mcq" === this.question.type ? (o = this.$("input[name=mcqopts]:checked").val(), 
answer = o ? o :this.question.solve ? -1 :null, this.question.explanation_box && "true" === this.question.explanation_box ? {
explanation:this.$("textarea[name=explanation]").val(),
answer:answer
} :answer) :(o = [], _.each(this.$("input[name=mcqopts]:checked"), function(_this) {
return function(e) {
return o.push(_this.$(e).val());
};
}(this)), o.length ? o :this.question.solve ? -1 :null);
}, RecruitCandidateMcqView.prototype.set_answer = function() {
var ans, metadata, _i, _len, _ref, _results;
if (this.question.solve) {
if ("mcq" !== this.question.type) {
for (_ref = this.question.solve.answer.answer, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) ans = _ref[_i], 
_results.push(this.$("input#mcqopts" + ans).prop("checked", !0));
return _results;
}
return this.$("input#mcqopts" + this.question.solve.answer.answer).prop("checked", !0), 
this.question.explanation_box && "true" === this.question.explanation_box && this.question.solve.metadata ? (metadata = JSON.parse(this.question.solve.metadata), 
this.$("textarea[name=explanation]").val(metadata.explanation)) :void 0;
}
}, RecruitCandidateMcqView;
}(window.HR.GenericView), RecruitCandidateSubjectiveView = function(_super) {
function RecruitCandidateSubjectiveView() {
return RecruitCandidateSubjectiveView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateSubjectiveView, _super), RecruitCandidateSubjectiveView.prototype.template = "recruit/question-subjective", 
RecruitCandidateSubjectiveView.prototype.className = "question-subjective", RecruitCandidateSubjectiveView.prototype.initialize = function(options) {
return this.question = options.question, HR.candidate && HR.candidate.candidateAttemptModel ? (this.aid = HR.candidate.candidateAttemptModel.get("id"), 
this.autoSaveNamespace = "" + this.aid + "-" + this.question.unique_id, HR.appView.saveCodeOnNavigate = !0) :(this.aid = "testing", 
this.autoSaveNamespace = null);
}, RecruitCandidateSubjectiveView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell(), _this.set_answer();
};
}(this)), this;
}, RecruitCandidateSubjectiveView.prototype.applyCodeshell = function() {
var opts;
return opts = {
languages:[ "text" ],
language:"text",
autoSaveNamespace:this.autoSaveNamespace,
showSubmit:!1,
showCompileTest:!1,
dynamicMode:!0,
showCustomInput:!1,
lang_line_nos:this.question.line_nos,
loadmode:function() {
return function(e, data) {
return data.callback();
};
}(this)
}, this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh");
}, RecruitCandidateSubjectiveView.prototype.answer = function() {
return this.$("#editor").codeshell("value");
}, RecruitCandidateSubjectiveView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", {
code:this.question.solve.answer.answer,
language:"text"
}) :void 0;
}, RecruitCandidateSubjectiveView;
}(window.HR.GenericView), RecruitCandidateFileUploadView = function(_super) {
function RecruitCandidateFileUploadView() {
return RecruitCandidateFileUploadView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateFileUploadView, _super), RecruitCandidateFileUploadView.prototype.template = "recruit/question-fileupload", 
RecruitCandidateFileUploadView.prototype.className = "question-fileupload", RecruitCandidateFileUploadView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateFileUploadView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), window.view = this, this;
}, RecruitCandidateFileUploadView.prototype.answer = function() {
return $(":file").val() ? $(":file") :this.question.solve && this.question.solve.answer ? this.question.solve.answer :!1;
}, RecruitCandidateFileUploadView.prototype.set_answer = function() {
return this.question.solve ? this.show_answer(this.question.solve.answer) :void 0;
}, RecruitCandidateFileUploadView.prototype.show_answer = function(answer) {
var html;
return html = HR.util.getFileAnchor(answer), this.$("#current_answer").html(html), 
this.$(".current-answer-section").removeClass("hidden");
}, RecruitCandidateFileUploadView;
}(window.HR.GenericView), RecruitCandidateCompleteView = function(_super) {
function RecruitCandidateCompleteView() {
return RecruitCandidateCompleteView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCompleteView, _super), RecruitCandidateCompleteView.prototype.template = "recruit/question-completesentence", 
RecruitCandidateCompleteView.prototype.className = "question-complete", RecruitCandidateCompleteView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateCompleteView.prototype._render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this;
}, RecruitCandidateCompleteView.prototype.postrender = function() {
return setTimeout(function(_this) {
return function() {
return _this.set_answer();
};
}(this));
}, RecruitCandidateCompleteView.prototype.answer = function() {
return _.map($('input[name^="blank"]'), function(e) {
return $(e).val();
});
}, RecruitCandidateCompleteView.prototype.set_answer = function() {
var cnt;
return this.question.solve ? (cnt = 0, _.each(this.question.solve.answer, function(v) {
return $('input[name="blank' + cnt + '"]').val(v), cnt += 1;
})) :void 0;
}, RecruitCandidateCompleteView;
}(window.HR.GenericView), RecruitCandidateUMLView = function(_super) {
function RecruitCandidateUMLView() {
return this.saveUml = __bind(this.saveUml, this), RecruitCandidateUMLView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateUMLView, _super), RecruitCandidateUMLView.prototype.template = "recruit/question-uml", 
RecruitCandidateUMLView.prototype.className = "question-uml", RecruitCandidateUMLView.prototype.initialize = function(options) {
return this.question = options.question, HR.candidate && HR.candidate.candidateAttemptModel ? (this.aid = HR.candidate.candidateAttemptModel.get("id"), 
this.autoSaveNamespace = "" + this.aid + "-" + this.question.unique_id, HR.appView.saveCodeOnNavigate = !0) :(this.aid = "testing", 
this.autoSaveNamespace = null), this.umlStorageKey = this.autoSaveNamespace + "-" + this.question.hash, 
HR.appController.loadGraphLibraries(function(_this) {
return function() {
return _this.editor = new Editor();
};
}(this), function() {
return console.log("error");
});
}, RecruitCandidateUMLView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell(), _this.set_answer();
};
}(this)), HR.appController.loadGraphLibraries(function(_this) {
return function() {
return _this.initializeUMLView();
};
}(this), function() {
return console.log("error");
}), this;
}, RecruitCandidateUMLView.prototype.initializeUMLView = function() {
var choices;
if (this.localSubmissionData = $.jStorage.get(this.umlStorageKey), this.xml = "", 
this.xml = this.localSubmissionData ? this.localSubmissionData.xml :null, this.question.custom_draw_menus) choices = this.question.custom_draw_menus; else switch (this.question.type) {
case "uml":
choices = [ "uml" ];
break;

case "electrical":
choices = [ "electrical" ];
break;

default:
choices = [];
}
return this.ui = new EditorUi(this.editor, choices, this.$("#geEditor")[0]), this.xml && this.ui && mxGraphFiles.load_xml(this.ui, this.xml), 
this.ui ? setTimeout(this.saveUml, 3e3) :void 0;
}, RecruitCandidateUMLView.prototype.saveUml = function() {
return this.saveUmlTimeout && ($.jStorage.set(this.umlStorageKey, mxGraphFiles.save(this.ui)), 
clearTimeout(this.saveUmlTimeout)), this.saveUmlTimeout = setTimeout(function(_this) {
return function() {
return _this.saveUml();
};
}(this), 3e3);
}, RecruitCandidateUMLView.prototype.applyCodeshell = function() {
var opts;
return opts = {
languages:[ "text" ],
language:"text",
autoSaveNamespace:this.autoSaveNamespace,
showSubmit:!1,
showCompileTest:!1,
dynamicMode:!0,
showCustomInput:!1,
lang_line_nos:this.question.line_nos,
loadmode:function() {
return function(e, data) {
return data.callback();
};
}(this)
}, this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh");
}, RecruitCandidateUMLView.prototype.answer = function() {
var umlDiag;
return umlDiag = mxGraphFiles.save(this.ui), {
description:this.$("#editor").codeshell("value").code,
svg:umlDiag.svg,
xml:umlDiag.xml
};
}, RecruitCandidateUMLView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", {
code:this.question.solve.answer.answer,
language:"text"
}) :void 0;
}, RecruitCandidateUMLView;
}(window.HR.GenericView), RecruitCandidateFooterView = function(_super) {
function RecruitCandidateFooterView() {
return RecruitCandidateFooterView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateFooterView, _super), RecruitCandidateFooterView.prototype.template = "recruit/footer", 
RecruitCandidateFooterView.prototype.className = "footer", RecruitCandidateFooterView.prototype.initialize = function() {}, 
RecruitCandidateFooterView.prototype.render = function() {
var footer_copyright;
return $("footer").show(), footer_copyright = HR.candidate.candidateTestModel.get("footer_copyright"), 
$(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel.toJSON()
})), footer_copyright && "" !== footer_copyright || $("footer").hide(), this;
}, RecruitCandidateFooterView;
}(window.HR.GenericView), RecruitCandidateTopBarView = function(_super) {
function RecruitCandidateTopBarView() {
return RecruitCandidateTopBarView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateTopBarView, _super), RecruitCandidateTopBarView.prototype.template = "recruit/topbar", 
RecruitCandidateTopBarView.prototype.className = "topbar", RecruitCandidateTopBarView.prototype.fullScreeenMode = function() {
return screenfull && !(HR.candidate.candidateAttemptModel.get("attempt_done") && HR.candidate.candidateAttemptModel.get("attempt_done") === !0 || (clearTimeout(this.fullscreenTimer), 
this.fullscreenTimer = setTimeout(function(_this) {
return function() {
return screenfull.isFullscreen || 0 !== $(".hr-dialog").length || (_this.renderedDialog = !1), 
_this.fullScreeenMode();
};
}(this), 2e3), this.renderedDialog)) ? ("undefined" == typeof this.renderedDialog && document.addEventListener(screenfull.raw.fullscreenchange, function(_this) {
return function() {
return screenfull.isFullscreen || "logout" === HR.candidate.candidateTestModel.action ? void 0 :(_this.renderedDialog = !1, 
_this.fullScreeenMode());
};
}(this)), this.renderedDialog = !0, HR.util.alert({
title:"Switch to full screen mode",
message:"Please switch to full screen mode to proceed to test",
callback:function() {
return screenfull.enabled ? (Backbone.History.started && Backbone.history.stop(), 
Backbone.history.start({
pushState:!1,
root:"/tests"
}), Backbone.history.navigate("" + HR.candidate.candidateTestModel.get("unique_id") + "/questions", !0), 
screenfull.request()) :void 0;
}
})) :void 0;
}, RecruitCandidateTopBarView.prototype.secureMonitoring = function() {
var logEvent;
if (!this.secureMonitoringActive && HR.candidate.candidateAttemptModel) return this.secureMonitoringActive = !0, 
logEvent = function(data) {
return data.insertTime = new Date(), HR.candidate.secureActivity.add(data);
}, window.onblur = function() {
return logEvent({
action:"blur",
eid:7
});
}, window.onfocus = function() {
return logEvent({
action:"focus",
eid:8
});
};
}, RecruitCandidateTopBarView.prototype.initialize = function() {
return Offline.options = {
reconnect:{
initialDelay:3
},
requests:!1,
game:!1
};
}, RecruitCandidateTopBarView.prototype.getTimeLeft = function() {
var tl;
return tl = HR.candidate.candidateTestModel.get("sectional") ? HR.candidate.candidateAttemptModel.get("section_time_left") :HR.candidate.candidateAttemptModel.get("time_left");
}, RecruitCandidateTopBarView.prototype.timerForSection = function() {
return HR.candidate.candidateTestModel.get("sectional") && HR.candidate.candidateAttemptModel.get("section_time_left") !== HR.candidate.candidateAttemptModel.get("time_left");
}, RecruitCandidateTopBarView.prototype.updateTimer = function() {
var timeLeft;
return timeLeft = this.getTimeLeft(), setTimeout(function(_this) {
return function() {
return $("#countdown-timer").countdown("destroy").countdown({
until:timeLeft,
layout:"{d<}{dn}{dl} {d>} {hnn}:{mnn}:{snn}",
compact:!0
}), $("#countdown-timer").countdown("option", "onExpiry", _this.testTimeUp), 300 > timeLeft ? $(".timerspan").addClass("alerttimer") :$(".timerspan").removeClass("alerttimer"), 
_this.timerForSection() ? $("#timertag").html("to section end") :$("#timertag").html("to test end");
};
}(this));
}, RecruitCandidateTopBarView.prototype.render = function() {
var LONG_PING_TIME, QUICK_PING_TIME, interval, qcount, qdone;
return $(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel,
attempt:HR.candidate.candidateAttemptModel,
showalert:this.getTimeLeft < 300
})), HR.candidate.candidateAttemptModel.get("secure") && "True" === HR.candidate.candidateAttemptModel.get("secure") ? (this.secureMonitoring(), 
HR.requires("screenfull/dist/screenfull", function(_this) {
return function() {
return _this.fullScreeenMode();
};
}(this))) :HR.candidate.windowFocushookPresent || (HR.candidate.windowFocushookPresent = !0, 
window.onfocus = function() {
return function() {
return HR.candidate.windowBlurred = !1, HR.candidate.showFocusMessage ? (HR.candidate.showFocusMessage = !1, 
HR.util.alert({
title:"Refresh needed",
message:"The test state changed while you were away, and will be refreshed shortly.",
timeout:15,
callback:function() {
var uid;
if (HR.candidate && HR.candidate.candidateTestModel) return uid = HR.candidate.candidateTestModel.get("unique_id"), 
HR.router.navigate("" + uid + "/redirect", {
trigger:!0,
replace:!0
});
}
})) :void 0;
};
}(this), window.onblur = function() {
return function() {
return HR.candidate.windowBlurred = !0;
};
}(this)), this.updateTimer(), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
HR.candidate.candidateAttemptModel.get("attempt_done") ? HR.appView.setTopbarView() :(qdone = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping") || {}).length, 
qcount = HR.candidate.candidateAttemptModel.get("questions").length, this.$(".qdone").html(qdone), 
this.$(".qcount").html(qcount), this.$(".progress-done").css({
width:Math.floor(100 * qdone / qcount)
}), LONG_PING_TIME = 6e4, QUICK_PING_TIME = 1e4, interval = this.getTimeLeft() < 100 ? QUICK_PING_TIME :LONG_PING_TIME, 
HR.candidate.pingTimer = setInterval(function(_this) {
return function() {
var ans, dat, outerSection, saving, sectional;
return dat = {
pong:!0
}, HR.candidate.currentQuestion && (ans = HR.candidate.questionView.getAnswerToSave(), 
saving = !1, ans && (saving = !0, dat.to_save_code = ans, dat.qid = HR.candidate.questionView.model.get("unique_id"))), 
saving && HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Saving draft.."), 
HR.candidate.candidateTestModel ? (sectional = HR.candidate.candidateTestModel.get("sectional"), 
sectional && (outerSection = HR.candidate.candidateAttemptModel.get("section")), 
HR.candidate.candidateAttemptModel.save({
data:dat
}, {
success:function(model) {
return saving && HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Draft saved " + moment().format("hh:mm a")), 
HR.candidate.windowBlurred && (sectional && model.get("section") !== outerSection || model.get("attempt_done")) ? HR.candidate.showFocusMessage = !0 :HR.candidate.showFocusMessage ? void 0 :_this.updateTimer();
},
error:function() {
return saving ? HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Unable to save draft.") :void 0;
}
})) :void 0;
};
}(this), interval)), this;
}, RecruitCandidateTopBarView.prototype.testTimeUp = function() {
return HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), HR.candidate.candidateTestModel.get("sectional") && HR.candidate.candidateAttemptModel.get("time_left") > 30 ? ($("#countdown-timer").countdown("destroy").html("Section done."), 
$(".timerspan").removeClass("alerttimer"), $("#timertag").empty(), HR.candidate.showFocusMessage = !1, 
HR.util.alert({
title:"Section closed",
message:"You have exceeded the time limit set for this section.<br><br>All answers you submitted before the time limit have been saved. You will automatically be moved to the next section shortly.",
timeout:15,
callback:function() {
var uid;
return uid = HR.candidate.candidateTestModel.get("unique_id"), HR.candidate.attemptRefreshNeeded = !0, 
HR.router.navigate("" + uid + "/redirect", {
trigger:!0,
replace:!0
});
}
})) :($("#countdown-timer").countdown("destroy").html("Test done."), $(".timerspan").removeClass("alerttimer"), 
$("#timertag").empty(), HR.candidate.showFocusMessage = !1, HR.util.alert({
title:"Test finished",
message:"Thank you for taking this test. You have exceeded the time limit set for this test.<br><br>All answers you submitted before the time limit have been saved.<br><br>You will shortly be redirected to the feedback page.",
timeout:60,
callback:function() {
return HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.candidateTestModel.save(null, {
success:function() {
return function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
};
}(this)
});
}
}));
}, RecruitCandidateTopBarView;
}(window.HR.GenericView), RecruitCandidateSideBarView = function(_super) {
function RecruitCandidateSideBarView() {
return RecruitCandidateSideBarView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateSideBarView, _super), RecruitCandidateSideBarView.prototype.template = "recruit/sidebar", 
RecruitCandidateSideBarView.prototype.className = "sbar", RecruitCandidateSideBarView.prototype.icon_types = {
QUESTION_ANSWERED:"nav",
QUESTION_UNANSWERED:1,
QUESTION_LIST:2
}, RecruitCandidateSideBarView.prototype.events = {
"click .js-navlink":"handleNav"
}, RecruitCandidateSideBarView.prototype.render = function() {
var url;
return HR.candidate.ongoingQuestionNavigation = !1, url = Backbone.history.fragment, 
$(this.el).html(HR.appController.template(this.template, this)), this.$(".fixed-nav").html(this.getTopIcons()), 
url.endsWith("questions") || url.endsWith("questions/") || (this.$(".questions-nav").html(this.getQuestionIcons()), 
HR.candidate.lastQuestionViewed && setTimeout(function(_this) {
return function() {
return _this.$(".qnav-" + HR.candidate.lastQuestionViewed)[0] && _this.$(".qnav-" + HR.candidate.lastQuestionViewed)[0].scrollIntoView(), 
_this.delegateEvents();
};
}(this))), this;
}, RecruitCandidateSideBarView.prototype.handleNav = function(e) {
var me, myhref;
return e.preventDefault(), me = this.$(e.currentTarget), me.hasClass("disabled") || HR.candidate.ongoingQuestionNavigation ? void 0 :(myhref = me.attr("href"), 
this.$(".js-navlink").removeAttr("href"), this.$(".js-navlink").addClass("disabled"), 
me.removeClass("disabled"), HR.candidate.attemptRefreshNeeded = !0, HR.candidate.ongoingQuestionNavigation = !0, 
setTimeout(function() {
return HR.candidate.ongoingQuestionNavigation = !1;
}, 1e4), HR.router.navigate(myhref, {
trigger:!0,
replace:!0
}));
}, RecruitCandidateSideBarView.prototype.getTopIcons = function() {
var cls, html, url;
return html = "", url = Backbone.history.fragment, cls = "", (url.endsWith("questions") || url.endsWith("questions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/questions" class="backbone js-navlink"><i class="nav-icon icon-list-bullet-large"></i></a></li>', 
cls = "", (url.endsWith("instructions") || url.endsWith("instructions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/instructions" class="backbone js-navlink"><i class="nav-icon icon-help-circled"></i></a></li>';
}, RecruitCandidateSideBarView.prototype.getQuestionIcons = function() {
var active, answered, answered_qs, elhtml, label, li_gen, q, qs, _i, _len, _ref;
for (elhtml = "", li_gen = function(answered, disabled, active, link, label) {
var act, ans, btnclass, dis, href;
return ans = answered ? "answered" :"not-answered", dis = disabled ? "disabled" :"", 
act = active ? "active" :"", btnclass = disabled || active ? "" :"js-navlink", href = disabled || active ? "" :"href='" + link + "'", 
'<li class="qnav-' + label + " " + ans + " " + dis + " " + act + '">\n  <a ' + href + ' class="' + btnclass + '">\n      <span class="quest-number">' + label + "</span>\n  </a>\n</li>";
}, qs = HR.candidate.candidateAttemptModel.get("questions"), answered_qs = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping")), 
label = 1, _i = 0, _len = qs.length; _len > _i; _i++) q = qs[_i], _ref = q.unique_id.toString(), 
answered = __indexOf.call(answered_qs, _ref) >= 0, active = q.unique_id === HR.candidate.currentQuestion, 
elhtml += q.disabled ? li_gen(answered, !0, active, "", label) :li_gen(answered, !1, active, "" + HR.candidate.candidateTestModel.get("unique_id") + "/questions/" + q.unique_id, label), 
label += 1;
return elhtml;
}, RecruitCandidateSideBarView;
}(window.HR.GenericView), RecruitCandidateCompileTestView = function(_super) {
function RecruitCandidateCompileTestView() {
return RecruitCandidateCompileTestView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCompileTestView, _super), RecruitCandidateCompileTestView.prototype.template = "recruit/compiletest-base", 
RecruitCandidateCompileTestView.prototype.className = "ct-base", RecruitCandidateCompileTestView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this;
}, RecruitCandidateCompileTestView.prototype.setStatus = function(s, additional_class) {
return null == additional_class && (additional_class = ""), this.$(".status-msg").html(s), 
"" !== additional_class ? this.$(".status-msg").addClass(additional_class) :void 0;
}, RecruitCandidateCompileTestView.prototype.setCompileStatus = function(title, message) {
return this.$(".compile-header").html(title), this.$(".compile-message").html(message), 
this.$("#error-message").removeClass("hide");
}, RecruitCandidateCompileTestView.prototype.addTestCase = function(tno, input, output, output_debug, exp_output, compiler_msg, st_class, score) {
var tc;
return tc = new HR.RecruitCandidateTestCaseView({
tno:tno,
input:input,
output:output,
exp_output:exp_output,
st_class:st_class,
compiler_msg:compiler_msg,
output_debug:output_debug,
score:score
}), this.$(".testcases").append(tc.render().el);
}, RecruitCandidateCompileTestView;
}(window.HR.GenericView), RecruitCandidateTestCaseView = function(_super) {
function RecruitCandidateTestCaseView() {
return RecruitCandidateTestCaseView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateTestCaseView, _super), RecruitCandidateTestCaseView.prototype.template = "recruit/compiletest-testcase", 
RecruitCandidateTestCaseView.prototype.classname = "test-case-wrap", RecruitCandidateTestCaseView.prototype.initialize = function(o) {
return this.tno = o.tno, this.input = o.input, this.output = o.output, this.exp_output = o.exp_output, 
this.compiler_msg = o.compiler_msg, this.st_class = o.st_class, this.output_debug = o.output_debug, 
this.score = o.score;
}, RecruitCandidateTestCaseView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
tno:this.tno,
input:this.input,
output:this.output,
exp_output:this.exp_output,
compiler_msg:this.compiler_msg,
st_class:this.st_class,
output_debug:this.output_debug,
score:this.score
})), this;
}, RecruitCandidateTestCaseView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateListView = RecruitCandidateListView, 
HR.RecruitCandidateQuestionView = RecruitCandidateQuestionView, HR.RecruitCandidateCodingView = RecruitCandidateCodingView, 
HR.RecruitCandidateDesignView = RecruitCandidateDesignView, HR.RecruitCandidateMcqView = RecruitCandidateMcqView, 
HR.RecruitCandidateSubjectiveView = RecruitCandidateSubjectiveView, HR.RecruitCandidateCompleteView = RecruitCandidateCompleteView, 
HR.RecruitCandidateFileUploadView = RecruitCandidateFileUploadView, HR.RecruitCandidateUMLView = RecruitCandidateUMLView, 
HR.RecruitCandidateTopBarView = new RecruitCandidateTopBarView(), HR.RecruitCandidateFooterView = new RecruitCandidateFooterView(), 
HR.RecruitCandidateSideBarView = new RecruitCandidateSideBarView(), HR.RecruitCandidateCompileTestView = RecruitCandidateCompileTestView, 
HR.RecruitCandidateTestCaseView = RecruitCandidateTestCaseView, HR.RecruitCandidateInstructionsView = RecruitCandidateInstructionsView;
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
var HR, RecruitCandidateLoginView, RecruitFacebookResumeView, RecruitMessageView, RecruitMismatchView, _ref;
return RecruitCandidateLoginView = function(_super) {
function RecruitCandidateLoginView() {
return RecruitCandidateLoginView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateLoginView, _super), RecruitCandidateLoginView.prototype.template = "recruit/login", 
RecruitCandidateLoginView.prototype.className = "candidate-login", RecruitCandidateLoginView.prototype.events = {
"click .test-submit":"loginAction",
"click .test-submit-feedback":"submitFeedback",
"click .test-logout":"logoutTest",
"click .fblogin":"loginToFB",
"blur input.error":"removeError"
}, RecruitCandidateLoginView.prototype.initialize = function() {}, RecruitCandidateLoginView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model.attributes
})), this.model.get("facebook_login") && !window.fbAdded && (window.fbAdded = !0, 
$.getScript("/assets/fb.js")), this;
}, RecruitCandidateLoginView.prototype.removeError = function(e) {
return $(e.target).removeClass("error").closest(".error").removeClass("error");
}, RecruitCandidateLoginView.prototype.resetError = function() {
var $err;
return $err = this.$("#error-message"), $err.find("header").html(""), $err.find("p").html(""), 
this.$(".formgroup").removeClass("error").find("[name]").removeClass("error"), $err.hide();
}, RecruitCandidateLoginView.prototype.setError = function(title, message, alertclass, field_name) {
var $err, duration, top;
return null == alertclass && (alertclass = null), null == field_name && (field_name = null), 
$err = this.$("#error-message"), $err.find("header").html(title), $err.find("p").html(message), 
alertclass && this.$("#error-message").addClass(alertclass), field_name && this.$("[name=" + field_name + "]").addClass("error").closest(".formgroup").addClass("error"), 
$err.show(), top = $err.position().top, duration = parseInt(top, 10) / 2, setTimeout(function() {
return $("html,body").animate({
scrollTop:top
}, duration);
}, 0);
}, RecruitCandidateLoginView.prototype.loginAction = function(e) {
var email, form_data, pass, put_data, request_params, that, uniqid;
return this.disableButton("test-submit"), that = this, e.preventDefault(), this.resetError(), 
email = this.$("input[name=username]").val(), pass = this.$("input[name=password]").val(), 
this.$("#acknowledge").is(":checked") ? (this.$("#acknowledge-alert").remove(), 
form_data = $("#test-login-form").serializeArray(), put_data = {}, _.each(form_data, function(item) {
return "gender" !== item.name ? put_data[item.name] = item.value :("on" === $("input#gender-m:checked").val() && (put_data.gender = "m"), 
"on" === $("input#gender-f:checked").val() ? put_data.gender = "f" :void 0);
}), put_data.tauth_key = this.model.auth, $("#acknowledge").is(":checked") && (put_data.acknowledge = "on"), 
uniqid = this.model.get("unique_id"), request_params = {
url:"/recruit/tests/" + uniqid + "/login",
data:put_data,
type:"POST",
success:function(_this) {
return function(xhr) {
var r;
return r = "string" == typeof xhr ? $.parseJSON($(xhr).text()) :xhr, HR.candidate.candidateTestModel.set(r.model), 
r.status ? (HR.util.trackTotango("Candidate Login", "Tests"), r.model.attempt_done ? HR.router.navigate("" + uniqid) :HR.router.navigate("" + uniqid + "/questions", {
trigger:!0,
replace:!0
}), void 0) :(_this.enableButton("test-submit"), that.setError(r.message.title, r.message.body, null, r.message.field_name));
};
}(this),
error:function(_this) {
return function(xhr) {
var r;
return _this.enableButton("test-submit"), r = "string" == typeof xhr.responseText ? $.parseJSON($(xhr.responseText).text()) :xhr.responseText, 
r && r.message ? that.setError(r.message.title, r.message.body, r.message.alertclass, r.message.field_name) :that.setError("Login error", "There was an issue logging into the test");
};
}(this)
}, $(":file").length > 0 && (request_params.iframe = !0, request_params.processData = !1, 
request_params.data = put_data, request_params.files = $(":file")), $.ajax(request_params), 
this) :(this.enableButton("test-submit"), !this.$("#acknowledge-alert").length > 0 && this.$("#login-form").before('<div class="text-center alert error error-message" id="acknowledge-alert"> You cannot take this test without agreeing to the specified conditions. </div>'), 
void 0);
}, RecruitCandidateLoginView.prototype.submitFeedback = function() {
return this.disableButton("test-submit-feedback"), HR.candidate.candidateAttemptModel.set("feedback_text", this.$(".feedback-text").val()), 
HR.candidate.candidateAttemptModel.save(null, {
success:function(_this) {
return function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), _this.enableButton("test-submit-feedback"), _this.logoutTest();
};
}(this),
error:function() {
return this.enableButton("test-submit-feedback"), console.log("Could not submit feedback.");
}
});
}, RecruitCandidateLoginView.prototype.logoutTest = function() {
return HR.clearCookies(), window.candidate = {}, this.$(".main-content").html("<h3>Thank you!</h3><br/><br/><p>The test is done. You may close this window, or head on to  <a href='//www.hackerrank.com'>hackerrank.com</a> and solve challenges.</p>");
}, RecruitCandidateLoginView.prototype.disableButton = function(cssClass) {
return this.$("button." + cssClass).attr("disabled", !0).addClass("disabled");
}, RecruitCandidateLoginView.prototype.enableButton = function(cssClass) {
return this.$("button." + cssClass).attr("disabled", !1).removeClass("disabled");
}, RecruitCandidateLoginView.prototype.loginToFB = function() {
return window.location = this.model.get("facebook_login_url");
}, RecruitCandidateLoginView;
}(window.HR.GenericView), RecruitFacebookResumeView = function(_super) {
function RecruitFacebookResumeView() {
return RecruitFacebookResumeView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitFacebookResumeView, _super), RecruitFacebookResumeView.prototype.template = "recruit/fbresume", 
RecruitFacebookResumeView.prototype.className = "candidate-fb", RecruitFacebookResumeView.prototype.events = {
"click .starttest":"startTest"
}, RecruitFacebookResumeView.prototype.initialize = function(options) {
return this.model = options.model, this.data = options.data;
}, RecruitFacebookResumeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model.attributes,
data:this.data
})), this;
}, RecruitFacebookResumeView.prototype.startTest = function() {
var p, req_params;
return p = this.$(".userprofile").val(), p ? (req_params = {
type:"put",
url:"/recruit/tests/" + this.model.get("unique_id") + "/fb_login",
data:{
profile:p
},
success:function(_this) {
return function() {
return HR.router.navigate("" + _this.model.get("unique_id") + "/questions", {
trigger:!0,
replace:!0
});
};
}(this),
error:function(_this) {
return function(e) {
return window.candidatemessage = JSON.parse(e.responseText).message, HR.router.navigate("" + _this.model.get("unique_id") + "/message", {
trigger:!0,
replace:!0
});
};
}(this)
}, $.ajax(req_params)) :new HR.util.ShowConfirmationDialog({
body:"Please enter a short profile about yourself.",
title:"Empty profile.",
buttons:[ {
name:"OK",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, RecruitFacebookResumeView;
}(window.HR.GenericView), RecruitMessageView = function(_super) {
function RecruitMessageView() {
return RecruitMessageView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitMessageView, _super), RecruitMessageView.prototype.template = "recruit/candidatemessage", 
RecruitMessageView.prototype.className = "candidate-message", RecruitMessageView.prototype.initialize = function(options) {
return this.model = options.model, this.message = options.message;
}, RecruitMessageView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model && this.model.attributes || {},
message:this.message
})), this;
}, RecruitMessageView;
}(window.HR.GenericView), RecruitMismatchView = function(_super) {
function RecruitMismatchView() {
return RecruitMismatchView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitMismatchView, _super), RecruitMismatchView.prototype.template = "recruit/candidatemismatch", 
RecruitMismatchView.prototype.className = "candidate-mismatch", RecruitMismatchView.prototype.events = {
"click .js-gotoother":"logoutGotoOther"
}, RecruitMismatchView.prototype.logoutGotoOther = function(e) {
return e.preventDefault(), HR.clearCookies(), HR.candidate.candidateTestModel = null, 
HR.candidate.candidateAttemptModel = null, HR.candidate.attemptRefreshNeeded = !1, 
HR.router.navigate(this.$(e.currentTarget).attr("href"), {
trigger:!0,
replace:!0
});
}, RecruitMismatchView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel.toJSON()
})), this;
}, RecruitMismatchView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateLoginView = RecruitCandidateLoginView, 
HR.RecruitFacebookResumeView = RecruitFacebookResumeView, HR.RecruitMessageView = RecruitMessageView, 
HR.RecruitMismatchView = RecruitMismatchView;
});
}.call(this), $(function() {
$.fn.bootstrapFileInput = function() {
this.each(function(i, elem) {
var $elem = $(elem);
if ("undefined" == typeof $elem.attr("data-bfi-disabled")) {
var buttonWord = "Browse";
"undefined" != typeof $elem.attr("title") && (buttonWord = $elem.attr("title"));
var input = $("<div>").append($elem.eq(0).clone()).html(), className = "";
$elem.attr("class") && (className = " " + $elem.attr("class")), $elem.replaceWith('<a class="file-input-wrapper btn' + className + '">' + buttonWord + input + "</a>");
}
}).promise().done(function() {
$(".file-input-wrapper").mousemove(function(cursor) {
var input, wrapper, wrapperX, wrapperY, inputWidth, inputHeight, cursorX, cursorY;
wrapper = $(this), input = wrapper.find("input"), wrapperX = wrapper.offset().left, 
wrapperY = wrapper.offset().top, inputWidth = input.width(), inputHeight = input.height(), 
cursorX = cursor.pageX, cursorY = cursor.pageY, moveInputX = cursorX - wrapperX - inputWidth + 20, 
moveInputY = cursorY - wrapperY - inputHeight / 2, input.css({
left:moveInputX,
top:moveInputY
});
}), $(".file-input-wrapper input[type=file]").change(function() {
var fileName;
fileName = $(this).val(), $(this).parent().next(".file-input-name").remove(), fileName = $(this).prop("files") && $(this).prop("files").length > 1 ? $(this)[0].files.length + " files" :fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.length), 
$(this).parent().after('<span class="file-input-name">' + fileName + "</span>");
});
});
};
var cssHtml = "<style>.file-input-wrapper { overflow: hidden; position: relative; cursor: pointer; z-index: 1; }.file-input-wrapper input[type=file], .file-input-wrapper input[type=file]:focus, .file-input-wrapper input[type=file]:hover { position: absolute; top: 0; left: 0; cursor: pointer; opacity: 0; filter: alpha(opacity=0); z-index: 99; outline: 0; }.file-input-name { margin-left: 8px; }</style>";
$("link[rel=stylesheet]").eq(0).before(cssHtml);
}), function() {
var __bind = function(fn, me) {
return function() {
return fn.apply(me, arguments);
};
}, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
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
return this.navigate = __bind(this.navigate, this), CandidateRouter.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateRouter, _super), CandidateRouter.prototype.routes = {
"":"default_route",
"_=_":"default_route",
":unique_id/redirect":"candidate_redirect",
":unique_id/mismatch":"candidate_mismatch",
":unique_id/feedback":"candidate_feedback",
":unique_id/feedback/":"candidate_feedback",
":unique_id/questions":"candidate_questionlist",
":unique_id/questions/":"candidate_questionlist",
":unique_id/instructions":"candidate_instructions",
":unique_id/instructions/":"candidate_instructions",
":unique_id/questions/:question_unique_id":"candidate_question",
":unique_id/questions/:question_unique_id/":"candidate_question",
":unique_id/fblogin":"fblogin",
":unique_id/message":"message",
":unique_id":"candidate_login",
":unique_id/":"candidate_login",
":unique_id/:authkey":"candidate_login",
":unique_id/:authkey/":"candidate_login",
":unique_id/login/:username/:password":"candidate_login_prefil"
}, CandidateRouter.prototype.initialize = function() {
return HR.requires("compound/recruit-candidate", function(_this) {
return function() {
return HR.appView = new HR.CandidateView(), HR.candidate = {}, HR.candidate.candidateTestModel = null, 
HR.candidate.candidateAttemptModel = null, HR.candidate.attemptRefreshNeeded = !1, 
HR.candidate.currentQuestion = null, HR.candidate.secureActivity = new HR.CandidateActivityCollection(), 
HR.candidate.attemptData = null, HR.candidate.windowFocushookPresent = !1, HR.candidate.windowBlurred = !1, 
HR.candidate.showFocusMessage = !1, HR.candidate.lastQuestionViewed = null, HR.candidate.ongoingQuestionNavigation = !1, 
HR.authkey = null, HR.candidate.questionView = null, HR.candidate.questions = {}, 
HR.candidate.redirectBackTo = null, window._errs || (window._errs = {}), HR.routehistory = [], 
HR.redirectNeeded = function() {
return !HR.candidate.candidateTestModel || !HR.candidate.candidateAttemptModel || HR.candidate.attemptRefreshNeeded;
}, HR.clearCookies = function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), $.removeCookie("fb_data", {
path:"/"
}), $.removeCookie("sfb_data", {
path:"/"
});
}, HR.setErrorceptionContext = function() {
return window._errs.meta || (window._errs.meta = {}), window._errs.meta.candidateEmail = HR.candidate.candidateAttemptModel.get("email");
}, _this.on("route", function() {
return HR.routehistory.push(moment(Date.now()).format() + " " + Backbone.history.fragment), 
HR.routehistory.length > 20 && HR.routehistory.shift(), window._errs.meta || (window._errs.meta = {}), 
window._errs.meta.history = HR.routehistory.join("\n");
}), HR.redirect = function(testmodel, attemptmodel) {
var path, tuid;
return HR.RecruitCandidateTopBarView && HR.RecruitCandidateTopBarView.updateTimer(), 
tuid = testmodel.get("unique_id"), testmodel.get("attempt_done") ? attemptmodel.get("feedback_given") ? (window.candidatemessage = "You've completed the test.", 
HR.router.navigate("" + tuid + "/message", {
trigger:!0,
replace:!0
}), HR.clearCookies(), void 0) :HR.router.navigate("" + tuid + "/feedback", {
trigger:!0,
replace:!0
}) :HR.candidate.redirectBackTo ? (path = HR.candidate.redirectBackTo, HR.candidate.redirectBackTo = null, 
HR.router.navigate(path, {
trigger:!0,
replace:!0
}), void 0) :HR.router.navigate("" + tuid + "/questions", {
trigger:!0,
replace:!0
});
}, HR.showThrobber = function() {
return HR.util.candidatemsg("Loading..");
}, HR.hideThrobber = function(delay) {
return null == delay && (delay = 0), HR.util.candidatemsg("Loading..", !1, !0, delay);
};
};
}(this));
}, CandidateRouter.prototype.default_route = function() {
return HR.requires("compound/recruit-candidate", function() {
var msgview;
return HR.appView.setTopbarView(null), HR.appView.setSidebarView(null), msgview = new HR.RecruitMessageView({
model:null,
message:"No test id provided in the URL.<br><br>You can take Hackerrank's sample test at this URL: <a href='http://www.hackerrank.com/tests/sample'>www.hackerrank.com/tests/sample</a>"
}), HR.appView.setContentView(msgview);
});
}, CandidateRouter.prototype.navigate = function(fragment, options) {
return HR.appView && HR.appView.saveCodeOnNavigate && ($("#editor").codeshell("saveLangCode"), 
HR.appView.saveCodeOnNavigate = !1), CandidateRouter.__super__.navigate.call(this, fragment, options);
}, CandidateRouter.prototype.candidate_redirect = function(unique_id) {
return HR.requires("compound/recruit-candidate", function() {
var dat, test;
return Offline && Offline.check(), HR.showThrobber(), test = new HR.CandidateTestModel(), 
test.setTidAuth(unique_id, HR.authkey), test.setAction("show"), dat = HR.candidate.attemptData ? HR.candidate.attemptData :{}, 
test.fetch({
data:dat,
processData:!0,
success:function() {
return function(m) {
var aid, attempt;
return document.title = m.get("name") + " :: powered by HackerRank", HR.candidate.candidateTestModel = m, 
aid = HR.candidate.candidateTestModel.get("attempt"), m.get("unique_id") !== unique_id ? (HR.hideThrobber(1), 
HR.router.navigate("" + unique_id + "/mismatch", {
trigger:!0,
replace:!0
}), void 0) :aid ? HR.candidate.candidateTestModel.get("attempt_object") ? (attempt = new HR.CandidateAttemptModel(), 
attempt.set(HR.candidate.candidateTestModel.get("attempt_object")), HR.hideThrobber(1), 
HR.candidate.attemptRefreshNeeded = !1, HR.candidate.candidateAttemptModel = attempt, 
HR.candidate.attemptData = null, HR.setErrorceptionContext(), HR.redirect(test, attempt)) :(attempt = new HR.CandidateAttemptModel(), 
attempt.setAid(aid), attempt.fetch({
data:dat,
processData:!0,
success:function(m) {
return HR.hideThrobber(1), HR.candidate.attemptRefreshNeeded = !1, HR.candidate.candidateAttemptModel = m, 
HR.candidate.attemptData = null, HR.setErrorceptionContext(), HR.redirect(test, attempt);
},
error:function() {
return HR.hideThrobber(1), Offline && Offline.check(), setTimeout(function() {
return HR.util.candidatemsg("Unable to receive test data from this URL.<br><br> Check your internet connection, and continue when you're back online.<br><br><a href='" + unique_id + "/questions' class='backbone btn'>Continue</a>", !1);
}, 200);
}
})) :(HR.hideThrobber(1), $.cookie("fb_data") ? HR.router.navigate("" + unique_id + "/fblogin", {
trigger:!0,
replace:!0
}) :HR.authkey ? HR.router.navigate("" + unique_id + "/" + HR.authkey, {
trigger:!0,
replace:!0
}) :HR.router.navigate("" + unique_id, {
trigger:!0,
replace:!0
}), void 0);
};
}(this),
error:function() {
return function() {
return HR.hideThrobber(), HR.candidate.candidateTestModel = null, Offline && Offline.check(), 
setTimeout(function() {
return HR.util.candidatemsg("Unable to receive test data from this URL.<br><br> Check your internet connection, and continue when you're back online.<br><br><a href='" + unique_id + "/questions' class='backbone btn'>Continue</a>", !1);
}, 200);
};
}(this)
});
});
}, CandidateRouter.prototype.message = function(unique_id) {
return null == unique_id && (unique_id = ""), HR.requires("compound/recruit-candidate", function() {
var msg, msgview;
return HR.appView.setTopbarView(null), HR.appView.setSidebarView(null), msg = window.candidatemessage || $.cookie("candidatemessage") || null, 
msg ? (msgview = new HR.RecruitMessageView({
model:HR.candidate.candidateTestModel,
message:msg
}), HR.appView.setContentView(msgview)) :HR.router.navigate("" + unique_id + "/redirect", {
trigger:!0,
replace:!0
});
});
}, CandidateRouter.prototype.candidate_mismatch = function() {
return HR.requires("compound/recruit-candidate", function() {
var mmview;
return HR.appView.setTopbarView(null), HR.appView.setSidebarView(null), mmview = new HR.RecruitMismatchView(), 
HR.appView.setContentView(mmview);
});
}, CandidateRouter.prototype.candidate_login = function(unique_id, authkey) {
return null == unique_id && (unique_id = null), null == authkey && (authkey = null), 
HR.requires("compound/recruit-candidate", function() {
var candidate_view, m, tid;
return HR.candidate.candidateTestModel ? (m = HR.candidate.candidateTestModel, tid = m.get("unique_id"), 
candidate_view = new HR.RecruitCandidateLoginView({
model:m
}), HR.appView.setContentView(candidate_view), HR.appView.setTopbarView(null), HR.appView.setFooterView(HR.RecruitCandidateFooterView), 
HR.appView.setSidebarView(null)) :(authkey && (HR.authkey = authkey), HR.router.navigate("" + unique_id + "/redirect", {
trigger:!0,
replace:!0
}), void 0);
});
}, CandidateRouter.prototype.candidate_login_prefil = function(unique_id, username, password) {
return null == unique_id && (unique_id = null), null == username && (username = null), 
null == password && (password = null), HR.requires("compound/recruit-candidate", function() {
HR.candidate.candidateTestModel || (username && password && (HR.username = username, 
HR.password = password), HR.router.navigate("" + unique_id + "/redirect", {
trigger:!0,
replace:!0
}));
});
}, CandidateRouter.prototype.fblogin = function(unique_id) {
return null == unique_id && (unique_id = ""), HR.requires("compound/recruit-candidate", function() {
var fb_view;
return HR.candidate.candidateTestModel ? (fb_view = new HR.RecruitFacebookResumeView({
data:JSON.parse($.cookie("fb_data")),
model:HR.candidate.candidateTestModel
}), HR.appView.setContentView(fb_view), HR.appView.setTopbarView(null), HR.appView.setSidebarView(null)) :(HR.router.navigate("" + unique_id + "/redirect", {
trigger:!0,
replace:!0
}), void 0);
});
}, CandidateRouter.prototype.candidate_questionlist = function(unique_id) {
return HR.requires("compound/recruit-candidate", function() {
var content_view, m;
return HR.redirectNeeded() ? (HR.candidate.redirectBackTo = Backbone.history.fragment, 
HR.candidate.attemptData = {
qlist:!0
}, HR.router.navigate("" + unique_id + "/redirect", {
trigger:!0,
replace:!0
}), void 0) :(m = HR.candidate.candidateAttemptModel, HR.candidate.secureActivity.setAid(m.aid), 
content_view = new HR.RecruitCandidateListView(), HR.candidate.currentQuestion = null, 
HR.appView.setContentView(content_view), HR.appView.setTopbarView(HR.RecruitCandidateTopBarView), 
HR.appView.setSidebarView(HR.RecruitCandidateSideBarView), HR.appView.setFooterView(HR.RecruitCandidateFooterView));
});
}, CandidateRouter.prototype.candidate_question = function(unique_id, question_unique_id) {
return HR.requires("compound/recruit-candidate", function() {
var m, q;
return HR.redirectNeeded() ? (HR.candidate.redirectBackTo = Backbone.history.fragment, 
HR.candidate.attemptData = {
qview:!0,
qid:question_unique_id
}, HR.router.navigate("" + unique_id + "/redirect", {
trigger:!0,
replace:!0
}), void 0) :(m = HR.candidate.candidateAttemptModel, q = new HR.CandidateQuestionModel(), 
q.setAid(m.get("id")), q.setQid(question_unique_id), q.fetch({
success:function() {
return function(m) {
var content_view;
return content_view = new HR.RecruitCandidateQuestionView({
model:m
}), HR.candidate.currentQuestion = m.get("unique_id"), HR.candidate.secureActivity.setAid(m.aid), 
HR.appView.setContentView(content_view), HR.appView.setTopbarView(HR.RecruitCandidateTopBarView), 
HR.appView.setFooterView(HR.RecruitCandidateFooterView), HR.appView.setSidebarView(HR.RecruitCandidateSideBarView), 
HR.candidate.questionView = content_view;
};
}(this),
error:function() {
return function(m, xhr) {
var msg, o;
return o = JSON.parse(xhr.responseText), msg = "", o.error && (msg = o.error), HR.util.alert({
message:"There was a problem with loading this question page.<br><br>" + msg + "<br><br>Click continue to goto test listing page.",
title:"Question load error",
okButtonTest:"Continue",
callback:function() {
return HR.router.navigate("" + unique_id + "/redirect", {
trigger:!0,
replace:!0
});
}
});
};
}(this)
}));
});
}, CandidateRouter.prototype.candidate_feedback = function(unique_id) {
return HR.requires("compound/recruit-candidate", function() {
var candidate_view, m, mixpanel_data, mixpanel_event;
return clearInterval(HR.candidate.timerInterval), HR.redirectNeeded() ? (HR.candidate.redirectBackTo = Backbone.history.fragment, 
HR.router.navigate("" + unique_id + "/redirect", {
trigger:!0,
replace:!0
}), void 0) :(m = HR.candidate.candidateAttemptModel, HR.candidate.secureActivity.setAid(m.aid), 
HR.appView.setTopbarView(null), HR.appView.setFooterView(HR.RecruitCandidateFooterView), 
HR.appView.setSidebarView(null), candidate_view = new HR.RecruitCandidateLoginView({
model:HR.candidate.candidateTestModel
}), HR.appView.setContentView(candidate_view), window.btoa && window.location.host.toLowerCase().indexOf("hackerrank.com") >= 0 ? (mixpanel_data = {
event:"Viewed Feedback Page",
properties:{
token:"bcb75af88bccc92724ac5fd79271e1ff",
unique_id:unique_id,
attempt_id:HR.candidate.candidateAttemptModel.get("id")
}
}, mixpanel_event = window.btoa(JSON.stringify(mixpanel_data)), $.post("http://api.mixpanel.com/track/?data=" + mixpanel_event, {}, function() {
return function() {};
}(this))) :void 0);
});
}, CandidateRouter.prototype.candidate_instructions = function(unique_id) {
return HR.requires("compound/recruit-candidate", function() {
var candidate_view;
return HR.redirectNeeded() ? (HR.candidate.redirectBackTo = Backbone.history.fragment, 
HR.router.navigate("" + unique_id + "/redirect", {
trigger:!0,
replace:!0
}), void 0) :(candidate_view = new HR.RecruitCandidateInstructionsView({
model:HR.candidate.candidateTestModel
}), HR.appView.setContentView(candidate_view), HR.candidate.currentQuestion = null, 
HR.appView.setTopbarView(HR.RecruitCandidateTopBarView), HR.appView.setFooterView(HR.RecruitCandidateFooterView), 
HR.appView.setSidebarView(HR.RecruitCandidateSideBarView));
});
}, CandidateRouter;
}(Backbone.Router), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateRouter = CandidateRouter, 
window.istreet = new Object(), window.istreet.cfg = new Object(), window.istreet.cfg.hrqn = new Object(), 
h = window.istreet.cfg.hrqn, h.mcq = "Multiple choice", h.code = "Programming", 
h.textAns = "Subjective", h.approx = "Approximate", h.multiple_mcq = "Multiple answers", 
h.unscramble = "Unscramble Sentence", h.rewrite = "Rewrite Sentence", h.complete = "Complete Sentence", 
h.correct_errors = "Correct Errors", h.file_upload = "File upload", h.multiple_blanks = "Multiple blanks", 
h.info = "Info", h.task = "Task", h["Subjective Answer"] = "Subjective answer", 
h.uml = "UML", h.electrical = "Electrical", h.design = "Design";
});
}.call(this), window.bootbox = window.bootbox || function init($, undefined) {
"use strict";
function _t(key) {
var locale = locales[defaults.locale];
return locale ? locale[key] :locales.en[key];
}
function processCallback(e, dialog, callback) {
e.preventDefault();
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
closeButton:"<button type='button' class='bootbox-close-button close'>&times;</button>",
form:"<form class='bootbox-form'></form>",
inputs:{
text:"<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
email:"<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
select:"<select class='bootbox-input bootbox-input-select form-control'></select>",
checkbox:"<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>"
}
}, appendTo = $("body"), defaults = {
locale:"en",
backdrop:!0,
animate:!0,
className:null,
closeButton:!0,
show:!0
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
if (form = $(templates.form), defaults = {
className:"bootbox-prompt",
buttons:createLabels("cancel", "confirm"),
value:"",
inputType:"text"
}, options = validateButtons(mergeArguments(defaults, arguments, [ "title", "callback" ]), [ "cancel", "confirm" ]), 
shouldShow = options.show === undefined ? !0 :options.show, options.message = form, 
options.buttons.cancel.callback = options.onEscape = function() {
return options.callback(null);
}, options.buttons.confirm.callback = function() {
var value;
switch (options.inputType) {
case "text":
case "email":
case "select":
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
case "email":
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
return options.placeholder && input.attr("placeholder", options.placeholder), form.append(input), 
form.on("submit", function(e) {
e.preventDefault(), dialog.find(".btn-primary").click();
}), dialog = exports.dialog(options), dialog.off("shown.bs.modal"), dialog.on("shown.bs.modal", function() {
input.focus();
}), shouldShow === !0 && dialog.modal("show"), dialog;
}, exports.dialog = function(options) {
options = sanitize(options);
var dialog = $(templates.dialog), body = dialog.find(".modal-body"), buttons = options.buttons, buttonStr = "", callbacks = {
onEscape:options.onEscape
};
if (each(buttons, function(key, button) {
buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>", 
callbacks[key] = button.callback;
}), body.find(".bootbox-body").html(options.message), options.animate === !0 && dialog.addClass("fade"), 
options.className && dialog.addClass(options.className), options.title && body.before(templates.header), 
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
}), appendTo.append(dialog), dialog.modal({
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
it:{
OK:"OK",
CANCEL:"Annulla",
CONFIRM:"Conferma"
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
window.bootbox = init(_$ || $);
}, exports;
}(window.jQuery), function() {
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
HR.connectionAlert = function() {
var unique_id;
if (HR.candidate.candidateTestModel) return unique_id = HR.candidate.candidateTestModel.get("unique_id"), 
HR.util.candidatemsg("Unable to receive test data from this URL.<br><br> Check your internet connection, and continue when you're back online.<br><br><a href='" + unique_id + "/questions' class='backbone btn'>Continue</a>", !1);
throw "connectionAlert called when no testmodel available.";
}, requirejs.onError = function() {
return Offline && Offline.check(), HR.connectionAlert();
}, HR.router = new HR.CandidateRouter(), Backbone.history.start({
pushState:!0,
root:"/tests/"
});
});
}.call(this);