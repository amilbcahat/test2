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
var HR, beautifyDates, capitalize, changeTimeZoneDialog, compareArrays, convertToSlug, fixedInfo, formatDate, formatDateRange, formatDateTime, getCandidateDetailsMapping, linkify, prettyPrintSeconds, readableQuestionType, track, _ref;
return readableQuestionType = function(key) {
var h;
return h = {}, h.mcq = "Multiple choice", h.code = "Programming", h.textAns = "Subjective", 
h.approx = "Approximate", h.multiple_mcq = "Multiple answers", h.unscramble = "Unscramble Sentence", 
h.rewrite = "Rewrite Sentence", h.complete = "Complete Sentence", h.correct_errors = "Correct Errors", 
h.file_upload = "File upload", h.multiple_blanks = "Multiple blanks", h.info = "Info", 
h.task = "Task", h["Subjective Answer"] = "Subjective answer", h.uml = "UML", h.electrical = "Electrical", 
h[key] ? h[key] :key;
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
return null == data && (data = {}), null == callback && (callback = ""), void 0 !== typeof mixpanel ? _.isEmpty(callback) ? mixpanel.push([ "track", event, data ]) :mixpanel.push([ "track", event, data, callback ]) :void 0;
}, "function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function(needle) {
return 0 === this.indexOf(needle);
}), "function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function(suffix) {
return -1 !== this.indexOf(suffix, this.length - suffix.length);
}), fixedInfo = function(navFragment, itemSelector, top_offset, inherit_width, scroller) {
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
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.util || (HR.util = {}), window.HR || (window.HR = HR), 
HR.util.readableQuestionType = readableQuestionType, HR.util.compareArrays = compareArrays, 
HR.util.convertToSlug = convertToSlug, HR.util.prettyPrintSeconds = prettyPrintSeconds, 
HR.util.formatDateRange = formatDateRange, HR.util.getCandidateDetailsMapping = getCandidateDetailsMapping, 
HR.util.formatDate = formatDate, HR.util.formatDateTime = formatDateTime, HR.util.capitalize = capitalize, 
HR.util.changeTimeZoneDialog = changeTimeZoneDialog, HR.util.beautifyDates = beautifyDates, 
HR.util.linkify = linkify, HR.util.fixedInfo = fixedInfo, HR.util.track = track;
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
}, GenericModel.prototype.parse = function(resp, xhr) {
var model;
return this.sync_status = !0, void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
HR.loadingButton && HR.util.inlineLoadingEnd(resp)) :this.disableThrobber = !1, 
model = resp && resp.model ? resp.model :resp, GenericModel.__super__.parse.call(this, model, xhr);
}, GenericModel.prototype.fetch = function() {
return this.trigger("initreset"), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Model.prototype.fetch.apply(this, arguments);
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
resp.total && (this.total = resp.total), resp.page && (this.page = resp.page), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
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
var HR, UserModel, _ref;
return UserModel = function(_super) {
function UserModel() {
return UserModel.__super__.constructor.apply(this, arguments);
}
return __extends(UserModel, _super), UserModel.prototype.urlRoot = "/xrest/users", 
UserModel.prototype.parse = function(resp, options) {
var changeTimeZoneDialog, currentTimeZone;
return resp.model && (resp.model.timezone || "" === resp.model.timezone) && (currentTimeZone = jstz.determine_timezone().timezone.olson_tz, 
resp.model.timezone !== currentTimeZone && (changeTimeZoneDialog = new HR.util.changeTimeZoneDialog({
model:this,
userTimeZone:resp.model.timezone,
currentTimeZone:currentTimeZone
})), "" === resp.model.timezone && (resp.model.timezone = currentTimeZone, resp.model.timezone_local = !0)), 
UserModel.__super__.parse.call(this, resp, options);
}, UserModel.prototype.updatePassword = function(data) {
var promise;
return promise = $.ajax({
url:"/xrest/users/change_password",
type:"PUT",
data:data
});
}, UserModel.prototype.invites_count = function() {
var company, count;
return company = this.get("company"), "unlimited" === company.type ? count = "unlimited" :(count = 0, 
company.invites && (count += company.invites), company.subscription_invites && (count += company.subscription_invites)), 
count;
}, UserModel.prototype.isLocked = function() {
return "locked" === this.get("type") || this.get("company") && "locked" === this.get("company").type ? !0 :!1;
}, UserModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserModel = UserModel;
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
var HR, TeamModel, _ref;
return TeamModel = function(_super) {
function TeamModel() {
return TeamModel.__super__.constructor.apply(this, arguments);
}
return __extends(TeamModel, _super), TeamModel.prototype.urlRoot = "/xrest/teams", 
TeamModel.prototype.parse = function(response) {
var users;
return response.users && (users = [], _.each(response.users, function(user) {
var new_user;
return new_user = new window.HR.UserTeamModel(user), users.push(new_user);
}), response.users = users), response;
}, TeamModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TeamModel = TeamModel;
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
var HR, SearchCandidateModel, _ref;
return SearchCandidateModel = function(_super) {
function SearchCandidateModel() {
return SearchCandidateModel.__super__.constructor.apply(this, arguments);
}
return __extends(SearchCandidateModel, _super), SearchCandidateModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.SearchCandidateModel = SearchCandidateModel;
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
var HR, PaymentModel, _ref;
return PaymentModel = function(_super) {
function PaymentModel() {
return PaymentModel.__super__.constructor.apply(this, arguments);
}
return __extends(PaymentModel, _super), PaymentModel.prototype.initialize = function(options) {
return null == options && (options = {}), this.plan = options.plan, this.hr_uid = options.uid;
}, PaymentModel.prototype.url = function() {
var url;
return this.plan ? (url = "" + HR.RECRUIT2_DOMAIN + "/recruit2/billing/?plan=" + this.plan, 
this.hr_uid && (url += "&hr_uid=" + this.hr_uid)) :(url = "" + HR.RECRUIT2_DOMAIN + "/recruit2/billing", 
this.hr_uid && (url += "?hr_uid=" + this.hr_uid)), url;
}, PaymentModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.PaymentModel = PaymentModel;
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
var HR, TeamsCollection, _ref;
return TeamsCollection = function(_super) {
function TeamsCollection() {
return TeamsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TeamsCollection, _super), TeamsCollection.prototype.url = "/xrest/teams", 
TeamsCollection.prototype.model = window.HR.TeamModel, TeamsCollection.prototype.parse = function(response) {
return this.permission = response.permission, TeamsCollection.__super__.parse.call(this, response);
}, TeamsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.TeamsCollection = TeamsCollection;
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
var HR, SearchCandidatesCollection, _ref;
return SearchCandidatesCollection = function(_super) {
function SearchCandidatesCollection() {
return SearchCandidatesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(SearchCandidatesCollection, _super), SearchCandidatesCollection.prototype.url = function() {
var url;
return url = "/xrest/candidates";
}, SearchCandidatesCollection.prototype.model = window.HR.SearchCandidateModel, 
SearchCandidatesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.SearchCandidatesCollection = SearchCandidatesCollection;
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
var HR, RecruitController, _ref;
return RecruitController = function(_super) {
function RecruitController() {
return RecruitController.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitController, _super), RecruitController.prototype.initialize = function(options) {
null == options && (options = {});
}, RecruitController.prototype.namespace = function(contest_slug, rest) {
return null == rest && (rest = !1), contest_slug || (contest_slug = "master"), "master" !== contest_slug || rest ? "/contests/" + contest_slug + "/" :"/";
}, RecruitController.prototype.get_challenge_pageURL = function(contest_slug, challenge_slug) {
var challenge_bit;
return challenge_bit = "challenges/" + challenge_slug, "master" === contest_slug ? "/" + challenge_bit :"/contests/" + contest_slug + "/" + challenge_bit;
}, RecruitController.prototype.contest = function(options) {
return null == options && (options = {}), options.slug && options.slug !== HR.appController.get_current_contest_slug() ? HR.model("contest", {
slug:HR.appController.get_current_contest_slug()
}).cached(options) :(this.current_contest ? this.current_contest.get("slug") !== HR.appController.get_current_contest_slug() && (this.current_contest = HR.model("contest")) :this.current_contest = HR.model("contest"), 
HR.appController.get_current_contest_slug() && this.current_contest.set("slug", HR.appController.get_current_contest_slug()), 
this.current_contest.cached());
}, RecruitController.prototype.get_current_contest_slug = function() {
return this.landing_contest_slug = void 0 === this.landing_contest_slug ? HR.PREFETCH_DATA.metadata.landing_contest_slug :this.landing_contest_slug, 
this.landing_contest_slug;
}, RecruitController.prototype.get_current_contest_namespace = function() {
return this.current_contest_namespace = void 0 === this.current_contest_namespace ? HR.PREFETCH_DATA.metadata.current_contest_namespace :this.current_contest_namespace, 
this.current_contest_namespace;
}, RecruitController.prototype.is_using_contest_namespace = function() {
return this.using_contest_namespace = void 0 === this.using_contest_namespace ? HR.PREFETCH_DATA.metadata.using_contest_namespace :this.using_contest_namespace, 
this.using_contest_namespace;
}, RecruitController.prototype.get_current_contest_home_url = function() {
return "" + HR.appController.get_current_contest_namespace() + "/challenges";
}, RecruitController.prototype.get_current_contest_slug_url = function() {
var slug;
return slug = HR.appController.get_current_contest_slug(), "master" === slug ? "" :"/" + slug;
}, RecruitController.prototype.set_contest_namespace = function(contest_slug) {
return HR.appController.get_current_contest_slug() !== contest_slug && ("master" !== contest_slug ? HR.appView.contestNavigationView.setContestSlug(contest_slug) :HR.appView.contestNavigationView.hide(), 
this.landing_contest_slug = contest_slug, this.current_contest_namespace = "master" === contest_slug ? "" :"/contests/" + contest_slug, 
this.using_contest_namespace = "master" !== contest_slug, this.current_contest = HR.model("contest"), 
HR.appView.navigationView.nav_buttons && HR.appView.navigationView.nav_buttons.updateLinks(), 
HR.appView.countdownTimerView) ? HR.appView.countdownTimerView.setContest(HR.contest().cached()) :void 0;
}, RecruitController.prototype.object = function(suffix, name, attributes, options) {
var Obj, clsName, obj, stringName;
if (stringName = name.toTitleCase() + "-" + suffix, clsName = $.camelCase(stringName), 
Obj = HR[clsName], !Obj && ("model" === suffix ? Obj = this.MODELS_DEF[name] :"collection" === suffix && (Obj = this.COLLECTIONS_DEF[name]), 
!Obj)) throw "HR." + clsName + " is not defined";
return obj = new Obj(attributes, options), obj.contest_slug = (attributes || {}).contest_slug || (options || {}).contest_slug, 
obj;
}, RecruitController.prototype.model = function(name, attributes, options) {
var model;
return model = HR.appController.object("model", name, attributes, options);
}, RecruitController.prototype.collection = function(name, attributes, options) {
return HR.appController.object("collection", name, attributes, options);
}, RecruitController.prototype.profile = function(options) {
return null == options && (options = {}), this._profile && _.size(options) > 0 ? this._profile.cached(options) :this._profile || (this._profile = this.model("profile").cached(options), 
this._profile.listenTo(this._profile, "reset", function(_this) {
return function() {
return HR.key_prefix = _this._profile.get("key_prefix");
};
}(this))), this._profile;
}, RecruitController.prototype.restURL = function(path, restPrefix) {
return restPrefix && (path = "/rest" + path), path;
}, RecruitController.prototype.log = Backbone.log, RecruitController.prototype.staticPath = function(path, base_path) {
return null == base_path && (base_path = null), path = HR.MANIFEST && HR.MANIFEST[path] ? HR.MANIFEST[path] :path, 
HR.PREFETCH_DATA && HR.PREFETCH_DATA.metadata && (base_path || (base_path = HR.PREFETCH_DATA.metadata.asset_path)), 
"" + base_path + "/" + path;
}, RecruitController.prototype.requires = function() {
var callback, errorCallback, number_paths, staticFiles;
return number_paths = arguments.length - 1, callback = _.last(arguments), errorCallback = null, 
"function" == typeof arguments[arguments.length - 2] && (number_paths = arguments.length - 2, 
callback = arguments[arguments.length - 2], errorCallback = _.last(arguments)), 
staticFiles = _.map(_.toArray(arguments).slice(0, number_paths), function() {
return function(path) {
return HR.appController.staticPath("" + path + ".js");
};
}(this)), require(staticFiles, callback, errorCallback);
}, RecruitController.prototype.templatePath = function(template) {
var base_path;
return base_path = null, window.IE_BROWSER && (base_path = "/assets"), this.staticPath("backbone/templates/" + template, base_path);
}, RecruitController.prototype.template = function(template_name, template_callback, view_loader) {
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
}, RecruitController.prototype.setData = function(key, value) {
return void 0 === this.persistant_data && (this.persistant_data = {}), void 0 === this.persistant_data[key] && this.trigger("persistant:set:" + key), 
this.trigger("persistant:change:" + key), this.persistant_data[key] = value;
}, RecruitController.prototype.getData = function(key) {
return this.persistant_data && this.persistant_data[key] ? this.persistant_data[key] :void 0;
}, RecruitController.prototype.viewLoader = function(size) {
return null == size && (size = 32), "<div class='gray'> <div style='background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_" + size + "x" + size + ".gif); height: " + size + "px; width: " + size + "px; display: inline-block;'></div> </div>";
}, RecruitController.prototype.setModel = function(data, key, uid, casual) {
var def_key;
if (null == uid && (uid = null), null == casual && (casual = !0), def_key = key, 
uid && (key = "" + key + "-" + uid), !this.MODELS_DEF[def_key]) throw "HR Error: Model with key `" + key + "` doesn't exist";
return this.MODELS || (this.MODELS = {}), this.MODELS[key] ? this.MODELS[key].set(data) :this.MODELS[key] = new this.MODELS_DEF[def_key](data, {
casual:casual
});
}, RecruitController.prototype.getModel = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
var model;
return null == uid && (uid = null), null == callback && (callback = null), null == fetch && (fetch = !0), 
null == force_fetch && (force_fetch = !1), null == disableThrobber && (disableThrobber = !1), 
model = new this.MODELS_DEF[key](null, {
casual:!1
}), callback && callback(model), fetch && model.cached({
fetch:force_fetch,
disableThrobber:disableThrobber
}), model;
}, RecruitController.prototype.cleanModelCache = function(keyPrefix) {
var that;
return that = this, _.each(this.MODELS, function(o, key) {
return 0 === key.indexOf(keyPrefix) ? delete that.MODELS[key] :void 0;
});
}, RecruitController.prototype.setCollection = function(data, key, uid) {
var def_key;
if (null == uid && (uid = null), def_key = key, uid && (key = "" + key + "-" + uid), 
!this.COLLECTIONS_DEF[def_key]) throw "HR Error: Collection with key `" + key + "` doesn't exist";
return this.COLLECTIONS || (this.COLLECTIONS = {}), this.COLLECTIONS[key] || (this.COLLECTIONS[key] = new this.COLLECTIONS_DEF[def_key]()), 
this.COLLECTIONS[key].reset(data, {
silent:!1
});
}, RecruitController.prototype.getCollection = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
var cache, collection;
return null == uid && (uid = null), null == callback && (callback = null), null == fetch && (fetch = !0), 
null == force_fetch && (force_fetch = !1), null == disableThrobber && (disableThrobber = !1), 
collection = new this.COLLECTIONS_DEF[key](null, {
casual:!force_fetch
}), callback && callback(collection), fetch && (cache = !force_fetch, collection.cached({
fetch:force_fetch,
disableThrobber:disableThrobber
})), collection;
}, RecruitController.prototype.cleanCollectionCache = function(keyPrefix) {
var that;
return that = this, _.each(this.COLLECTIONS, function(o, key) {
return 0 === key.indexOf(keyPrefix) ? delete that.COLLECTIONS[key] :void 0;
});
}, RecruitController.prototype.setTitle = function(title, long) {
return null == long && (long = !0), document.title = long ? "" + title + " | Programming problems and challenges | HackerRank" :"" + title + " | HackerRank";
}, RecruitController.prototype.getTemplate = function(template_name, callback, obj) {
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
}, RecruitController.prototype.clearTemplate = function(template_name) {
return void 0 === this.TEMPLATE_DATA && (this.TEMPLATE_DATA = {}, this.TEMPLATE_CALLBACKS = {}), 
delete this.TEMPLATE_DATA[template_name], delete (this.TEMPLATE_VIEWDATA = !1), 
delete this.TEMPLATE_CALLBACKS[template_name];
}, RecruitController.prototype.facebook_login = function(e, callback) {
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
}, RecruitController.prototype.github_login = function(e, callback) {
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
}, RecruitController.prototype.facebook_share = function(url, content) {
var h, left, top, w;
return null == content && (content = ""), w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, url = "https://www.facebook.com/sharer.php?s=100&p" + encodeURIComponent("[url]") + "=" + encodeURIComponent(url) + "&p" + encodeURIComponent("[title]") + "=" + window.document.title + "&p" + encodeURIComponent("[summary]") + "=" + content, 
window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, RecruitController.prototype.facebook_graph_activity = function(action, object_type, object_url) {
var params;
return params = {}, params[object_type] = object_url, window.FB.api("/me/hackerrank:" + action, "post", params, function(_this) {
return function(response) {
return _this.log(response);
};
}(this));
}, RecruitController.prototype.twitter_share = function(text) {
var h, left, top, url, w;
return w = 600, h = 350, left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2, 
url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, RecruitController.prototype.querySlug = function(options) {
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
}, RecruitController.prototype.slugDetector = function(slug, callback, obj) {
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
}, RecruitController.prototype.loadCodeMirror = function(callback) {
return HR.requires("codemirror_basic", function() {
return function() {
return callback();
};
}(this));
}, RecruitController.prototype.loadCodeMirrorMode = function(lang, callback) {
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
}, RecruitController;
}(Backbone.Model), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitController = RecruitController;
});
}.call(this), function() {
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
var HR, UserSettings, _ref;
return UserSettings = function(_super) {
function UserSettings() {
return this.get = __bind(this.get, this), UserSettings.__super__.constructor.apply(this, arguments);
}
return __extends(UserSettings, _super), UserSettings.prototype.def = {
path:"user.settings",
timer:1e4
}, UserSettings.prototype.initialize = function(options) {
return null == options && (options = {}), _.bindAll(this), this.path = options.path || this.def.path;
}, UserSettings.prototype.setId = function(id) {
var val;
return this.set("id", id), val = $.jStorage.get(this.getKey()), val ? this.save(val) :void 0;
}, UserSettings.prototype.get = function(key, deflt) {
var r;
return null == deflt && (deflt = null), r = UserSettings.__super__.get.call(this, key), 
r ? r :deflt;
}, UserSettings.prototype.getKey = function(model) {
return null == model && (model = this), model.get("id") + model.path;
}, UserSettings.prototype.onChangeFuckedup = function() {
return setTimeout(function(_this) {
return function() {
return _this.get("id") ? $.jStorage.set(_this.getKey(), _this.toJSON()) :void 0;
};
}(this));
}, UserSettings.prototype.set = function(key, val, options) {
var r;
return _.isArray(val) && (val = _.clone(val)), r = UserSettings.__super__.set.call(this, key, val, options), 
this.onChangeFuckedup(), val;
}, UserSettings;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserSettings = new UserSettings();
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
var HR, RecruitRouter, h, _ref;
return RecruitRouter = function(_super) {
function RecruitRouter() {
return RecruitRouter.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitRouter, _super), RecruitRouter.prototype.routes = {
"":"redirect_to_tests",
x:"defaultRoute",
tests:"tests",
"tests/page/:page":"tests",
"tests/:id":"redirect_to_questions",
"tests/:id/questions":"questions",
"tests/:id/questions/:action":"questions",
"tests/:id/general-settings":"testGeneralSettings",
"tests/:id/share":"shareTest",
"tests/:id/candidate-settings":"testCandidateSettings",
"tests/:id/advanced-settings":"testAdvancedSettings",
"tests/:id/invite":"inviteCandidates",
"tests/:id/library":"testLibrary",
"tests/:id/library/:library":"testLibrary",
"tests/:id/library/:library/:filter":"testLibrary",
"tests/:id/candidates/:aid/report":"testReport",
"tests/:id/candidates/:aid/report/:tab":"testReport",
"tests/:id/candidates/:aid/report/:tab/:qid":"testReport",
"tests/:id/questions/:qid/edit":"editQuestion",
"tests/:id/questions/:qid/edit/:step":"editQuestion",
"tests/:id/questions/new/:type":"createQuestion",
"tests/:id/questions/:qid/try":"tryQuestion",
"tests/:id/candidates/:type":"reports",
"tests/:id/candidates/:type/:subtype":"reports",
"interviews/new":"newInterview",
"interviews/upcoming":"interviewsUpcoming",
"interviews/quickpads":"interviewsQuickPad",
"interviews/done":"interviewsDone",
"interviews/thumbsup":"interviewsThumbsUp",
"interviews/thumbsdown":"interviewsThumbsDown",
"interviews/upcoming/:opt":"interviewsUpcoming",
"interviews/done/:opt":"interviewsDone",
"interviews/thumbsup/:opt":"interviewsThumbsUp",
"interviews/thumbsdown/:opt":"interviewsThumbsDown",
"interviews/candidates":"interviewCandidates",
"interviews/candidates/:email":"interviewCandidate",
"interviews/:id":"interview",
"interviews/:id/report":"interviewReport",
interviews:"interviews",
settings:"basicSettings",
"settings/basic":"basicSettings",
"settings/reports":"reportSettings",
"settings/email":"emailSettings",
"settings/password":"passwordSettings",
"settings/team":"teamSettings",
payments:"payments",
"payments/plans":"payments",
"payments/card_details":"ccDetails",
"payments/checkout":"paymentCheckout",
search:"candidateSearch",
"search/:term":"candidateSearch",
"404":"not_found",
port:"port",
"*notFound":"catchall"
}, RecruitRouter.prototype.initialize = function() {
return HR.appView = new HR.RecruitView(), HR.loadingButton = "", HR.currentUser = new HR.UserModel(HR.PREFETCH_DATA.user), 
HR.PREFETCH_DATA.user && HR.PREFETCH_DATA.user.id ? (HR.UserSettings.setId(HR.currentUser.get("id")), 
HR.PREFETCH_DATA.user = {}) :HR.currentUser.fetch({
async:!1,
xhrFields:{
withAttributes:!1
},
dataType:"json",
url:"/xrest/users",
success:function(m) {
return m.get("id") ? HR.UserSettings.setId(m.get("id")) :void 0;
},
error:function(m, response) {
return 401 === response.status ? (HR.util.ajaxmsg("No Logged In User", !1, !0, 1), 
window.location.href = "/x/login") :console.log("error fetching user");
}
}), HR.appView.setTopNavigationView(HR.currentUser);
}, RecruitRouter.prototype.catchall = function() {
return Backbone.history.fragment.endsWith("/") ? HR.router.navigate(Backbone.history.fragment.replace(/\/$/, ""), !0) :this.not_found();
}, RecruitRouter.prototype.not_found = function() {
return HR.requires("compound/x/recruit-basic", function() {
var view;
return view = new HR.X404View(), HR.appView.setFullContentView(view);
});
}, RecruitRouter.prototype.port = function() {
var queryDict, re_match, target_url, urlhash;
return "" === window.location.hash ? this.not_found() :(urlhash = window.location.hash.slice(1), 
queryDict = {}, location.search.substr(1).split("&").forEach(function(item) {
return queryDict[item.split("=")[0]] = item.split("=")[1];
}), re_match = urlhash.match(/tests\/(\d*)\/candidates\/(\d*).*/), re_match && 3 === re_match.length ? (target_url = "/" + urlhash, 
queryDict.authkey && "" !== queryDict.authkey && (target_url += "?authkey=" + queryDict.authkey), 
target_url = target_url.replace("detail", ""), window.location.href = "/x" + target_url, 
void 0) :(re_match = urlhash.match(/report\/(\d*)\/(\d*).*/), re_match && 3 === re_match.length ? (target_url = "/tests/" + re_match[1] + "/candidates/" + re_match[2] + "/report", 
queryDict.authkey && "" !== queryDict.authkey && (target_url += "?authkey=" + queryDict.authkey), 
window.location.href = "/x" + target_url, void 0) :(re_match = urlhash.match(/interviews\/(\d*)\/report.*/), 
re_match && 2 === re_match.length ? (HR.router.navigate("/interviews/" + re_match[1] + "/report", !0), 
void 0) :this.not_found())));
}, RecruitRouter.prototype.tests = function(page) {
return null == page && (page = 1), HR.requires("compound/x/recruit-basic", function() {
var render_view, tests;
return tests = new HR.TestsCollection(), tests.setPage(page), render_view = function() {
return function(collection) {
var tests_view;
return tests_view = new HR.TestsView({
collection:collection
}), HR.appView.setFullContentView(tests_view);
};
}(this), HR.PREFETCH_DATA.tests && HR.PREFETCH_DATA.tests.models ? (tests.reset(HR.PREFETCH_DATA.tests.models), 
tests.total = HR.PREFETCH_DATA.tests.total, HR.PREFETCH_DATA.tests = null, render_view(tests)) :tests.fetch({
success:render_view,
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.redirect_to_questions = function(id) {
return HR.router.navigate("/tests/" + id + "/questions", !0, !0);
}, RecruitRouter.prototype.redirect_to_tests = function() {
return HR.router.navigate("/tests", !0, !0);
}, RecruitRouter.prototype.questions = function(id, action) {
return null == action && (action = null), HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:id
}), test.fetch({
success:function() {
return function(model) {
var test_questions_view, track_data;
return track_data = {
Page:"Questions"
}, HR.util.track("Viewed Test Settings", track_data), test_questions_view = new HR.TestQuestionsView({
model:model,
action:action
}), HR.appView.setSplitContentView("test", model, "questions", test_questions_view);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.testGeneralSettings = function(id) {
return HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:id
}), test.fetch({
success:function() {
return function(model) {
var test_general_settings_view, track_data;
return track_data = {
Page:"General Settings"
}, HR.util.track("Viewed Test Settings", track_data), test_general_settings_view = new HR.TestGeneralSettingsView({
model:model
}), HR.appView.setSplitContentView("test", model, "general-settings", test_general_settings_view);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.shareTest = function(id) {
return HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:id
}), test.fetch({
success:function() {
return function(model) {
var share_test_model, track_data;
return track_data = {
Page:"Share test"
}, HR.util.track("Viewed Test Settings", track_data), share_test_model = new HR.TestShareModel({
id:model.get("id")
}), share_test_model.fetch({
success:function() {
var test_share_view;
return test_share_view = new HR.TestShareView({
model:share_test_model,
testmodel:test
}), HR.appView.setSplitContentView("test", test, "share", test_share_view);
}
});
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.testCandidateSettings = function(id) {
return HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:id
}), test.fetch({
success:function() {
return function(model) {
var test_candidate_settings_view, track_data;
return track_data = {
Page:"Candidate Settings"
}, HR.util.track("Viewed Test Settings", track_data), test_candidate_settings_view = new HR.TestCandidateSettingsView({
model:model
}), HR.appView.setSplitContentView("test", model, "candidate-settings", test_candidate_settings_view);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.testAdvancedSettings = function(id) {
return HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:id
}), test.fetch({
success:function() {
return function(model) {
var test_advanced_settings_view, track_data;
return track_data = {
Page:"Advanced Settings"
}, HR.util.track("Viewed Test Settings", track_data), test_advanced_settings_view = new HR.TestAdvancedSettingsView({
model:model
}), HR.appView.setSplitContentView("test", model, "advanced-settings", test_advanced_settings_view);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.inviteCandidates = function(id) {
return HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:id
}), test.fetch({
success:function() {
return function(model) {
var ems, test_invite_view;
return HR.emailqueue ? (ems = HR.emailqueue, HR.emailqueue = null) :ems = [], test_invite_view = new HR.TestInviteView({
model:model,
emails:ems
}), HR.appView.setSplitContentView("test", model, "abcd", test_invite_view);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.testLibrary = function(tid, lib, filter) {
return null == lib && (lib = null), null == filter && (filter = null), null === lib && (lib = window.lastLib ? window.lastLib :"hackerrank"), 
null === filter && (filter = window.lastFilter ? window.lastFilter :"coding"), HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:tid
}), test.fetch({
success:function() {
return function(model) {
var lib_view, track_data;
return window.lastLib = lib, window.lastFilter = filter, lib_view = new HR.TestLibraryView({
library:lib,
filter:filter,
tid:tid,
testmodel:model
}), HR.appView.setSplitContentView("test", model, "questions", lib_view), track_data = {
library:lib,
step:"Start",
type:filter,
test_id:model.get("id")
}, HR.util.track("Added question from library", track_data);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.testReport = function(tid, aid, tab, qid) {
return null == tab && (tab = "summary"), null == qid && (qid = null), HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:tid
}), test.fetch({
success:function() {
return function(model) {
var auth_password, test_report_view, track_data, _showReportView;
return track_data = {
attempt_id:aid,
test_id:tid
}, HR.util.track("Viewed Test Report", track_data), _showReportView = function(tmodel, trview, tab) {
return "pdf" === tab || tmodel.get("authkey_used") ? HR.appView.setFullContentView(trview) :HR.appView.setSplitContentView("test", tmodel, "reports", trview);
}, auth_password = null, model.get("auth_pass_needed") === !0 ? bootbox.prompt("Please enter test authentication password", function(pass) {
var test_report_view;
return test_report_view = new HR.TestReportView({
testmodel:model,
aid:aid,
tab:tab,
tid:tid,
qid:qid,
auth_pass:pass
}), _showReportView(model, test_report_view, tab);
}) :(test_report_view = new HR.TestReportView({
testmodel:model,
aid:aid,
tab:tab,
tid:tid,
qid:qid
}), _showReportView(model, test_report_view, tab));
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.editQuestion = function(tid, qid, step) {
return null == step && (step = "step1"), HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:tid
}), test.fetch({
success:function() {
return function(model) {
var question_edit_view, track_data;
return question_edit_view = new HR.TestQuestionEditView({
testmodel:model,
qid:qid,
step:step
}), HR.appView.setSplitContentView("test", model, "questions", question_edit_view), 
track_data = {
test_id:model.get("id"),
question_id:qid
}, HR.util.track("Edited question", track_data);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.createQuestion = function(tid, type) {
return HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:tid
}), test.fetch({
success:function() {
return function(model) {
var question_create_view, track_data;
return question_create_view = new HR.TestQuestionEditView({
testmodel:model,
qid:null,
step:"step1",
type:type
}), HR.appView.setSplitContentView("test", model, "questions", question_create_view), 
track_data = {
step:"Start",
type:type,
test_id:model.get("id")
}, "code" === type || "approx" === type ? HR.util.track("Added new coding question", track_data) :HR.util.track("Added new other question", track_data);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.tryQuestion = function(tid, qid) {
return HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:tid
}), test.fetch({
success:function() {
return function(model) {
var question_try_view;
return question_try_view = new HR.TestTryQuestionView({
test:model,
qid:qid
}), HR.appView.setSplitContentView("test", model, "questions", question_try_view);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.reports = function(tid, type, subtype) {
return null == type && (type = "all"), null == subtype && (subtype = ""), HR.requires("compound/x/recruit-basic", function() {
var test;
return test = new HR.TestModel({
id:tid
}), test.fetch({
success:function() {
return function(model) {
var reports_view, track_data;
return track_data = {
Page:type,
test_id:tid
}, subtype && (track_data.sub_type = subtype), HR.util.track("Viewed Test Reports List", track_data), 
reports_view = new HR.TestReportsView({
testmodel:model,
type:type,
subtype:subtype
}), HR.appView.setSplitContentView("test", model, type + subtype, reports_view);
};
}(this),
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.newInterview = function() {
return HR.requires("compound/x/recruit-basic", function() {
var interview_view, track_data;
return interview_view = new HR.NewInterviewView(), HR.appView.setSplitContentView("interviews", null, "abcd", interview_view), 
track_data = {
step:"Start"
}, HR.util.track("Created Interview", track_data);
});
}, RecruitRouter.prototype.interview = function(id) {
return HR.requires("compound/x/recruit-basic", function() {
var interview;
return interview = new HR.InterviewModel({
id:id
}), interview.fetch({
success:function() {
return function(model) {
var interview_view;
return interview_view = new HR.EditInterviewView({
model:model
}), HR.appView.setSplitContentView("interviews", null, "abcd", interview_view);
};
}(this)
});
});
}, RecruitRouter.prototype.interviewReport = function(id) {
return HR.requires("compound/x/recruit-basic", function() {
var interview, recordings;
return interview = new HR.InterviewModel({
id:id
}), recordings = new HR.InterviewRecordingsCollection({
id:parseInt(id, 10)
}), interview.fetch({
success:function() {
return function(model) {
return recordings.fetch({
success:function(collection) {
var interview_view, track_data;
return interview_view = new HR.InterviewReportView({
model:model,
recordings:collection
}), HR.currentUser.get("authkey_used") && HR.currentUser.get("authkey_used") === !0 ? HR.appView.setFullContentView(interview_view) :HR.appView.setSplitContentView("interviews", null, "abcd", interview_view), 
track_data = {
interview_id:id
}, HR.util.track("Viewed Interview Report", track_data);
}
});
};
}(this)
});
});
}, RecruitRouter.prototype.interviewsDone = function() {
return HR.requires("compound/x/recruit-basic", function() {
var interviews_done_view, track_data;
return interviews_done_view = new HR.InterviewsDoneView(), HR.appView.setSplitContentView("interviews", null, "done", interviews_done_view), 
track_data = {
page:"Completed"
}, HR.util.track("Viewed Interviews", track_data);
});
}, RecruitRouter.prototype.interviewsUpcoming = function() {
return HR.requires("compound/x/recruit-basic", function() {
var interviews_upcoming_view, track_data;
return interviews_upcoming_view = new HR.InterviewsUpcomingView(), HR.appView.setSplitContentView("interviews", null, "upcoming", interviews_upcoming_view), 
track_data = {
page:"Upcoming"
}, HR.util.track("Viewed Interviews", track_data);
});
}, RecruitRouter.prototype.interviewsQuickPad = function() {
return HR.requires("compound/x/recruit-basic", function() {
var interviews_quickpad_view, track_data;
return interviews_quickpad_view = new HR.InterviewsQuickPadView(), HR.appView.setSplitContentView("interviews", null, "quickpads", interviews_quickpad_view), 
track_data = {
page:"QuickPads"
}, HR.util.track("Viewed Interviews", track_data);
});
}, RecruitRouter.prototype.interviewsThumbsUp = function() {
return HR.requires("compound/x/recruit-basic", function() {
var interviews_thumbsup_view, track_data;
return interviews_thumbsup_view = new HR.InterviewsThumbsUpView(), HR.appView.setSplitContentView("interviews", null, "thumbsup", interviews_thumbsup_view), 
track_data = {
page:"Thumbs Up"
}, HR.util.track("Viewed Interviews", track_data);
});
}, RecruitRouter.prototype.interviewsThumbsDown = function() {
return HR.requires("compound/x/recruit-basic", function() {
var interviews_thumbsdown_view, track_data;
return interviews_thumbsdown_view = new HR.InterviewsThumbsDownView(), HR.appView.setSplitContentView("interviews", null, "thumbsdown", interviews_thumbsdown_view), 
track_data = {
page:"Thumbs Down"
}, HR.util.track("Viewed Interviews", track_data);
});
}, RecruitRouter.prototype.interviews = function() {
return HR.requires("compound/x/recruit-basic", function() {
var interviews;
return interviews = new HR.InterviewsCollection(), interviews.fetch({
success:function() {
return function() {
var interviews_dashboard_view, track_data;
return interviews_dashboard_view = new HR.InterviewsDashboardView({
collection:interviews
}), HR.appView.setSplitContentView("interviews", null, "dashboard", interviews_dashboard_view), 
track_data = {
page:"Dashboard"
}, HR.util.track("Viewed Interviews", track_data);
};
}(this)
});
});
}, RecruitRouter.prototype.interviewsScheduler = function() {
return HR.requires("compound/x/recruit-basic", function() {
var interviews_done_view;
return interviews_done_view = new HR.InterviewsDoneView(), HR.appView.setSplitContentView("interviews", null, "done", interviews_done_view);
});
}, RecruitRouter.prototype.basicSettings = function() {
return HR.requires("compound/x/recruit-basic", function() {
var settings_view, track_data;
return track_data = {
Page:"Basic Settings"
}, HR.util.track("Viewed Account Settings", track_data), settings_view = new HR.SettingsBasicInfoView(), 
HR.appView.setSplitContentView("settings", null, "basic", settings_view);
});
}, RecruitRouter.prototype.reportSettings = function() {
return HR.requires("compound/x/recruit-basic", function() {
var settings_view, track_data;
return track_data = {
Page:"Report Settings"
}, HR.util.track("Viewed Account Settings", track_data), settings_view = new HR.SettingsReportView(), 
HR.appView.setSplitContentView("settings", null, "report", settings_view);
});
}, RecruitRouter.prototype.emailSettings = function() {
return HR.requires("compound/x/recruit-basic", function() {
var settings_view, track_data;
return track_data = {
Page:"Email Settings"
}, HR.util.track("Viewed Account Settings", track_data), settings_view = new HR.SettingsEmailView(), 
HR.appView.setSplitContentView("settings", null, "email", settings_view);
});
}, RecruitRouter.prototype.passwordSettings = function() {
return HR.requires("compound/x/recruit-basic", function() {
var settings_view, track_data;
return track_data = {
Page:"Change Password"
}, HR.util.track("Viewed Account Settings", track_data), settings_view = new HR.SettingsPasswordView(), 
HR.appView.setSplitContentView("settings", null, "password", settings_view);
});
}, RecruitRouter.prototype.payments = function() {
return HR.requires("compound/x/recruit-basic", function() {
var paymentModel, uid;
return uid = HR.currentUser.id, paymentModel = new HR.PaymentModel({
uid:uid
}), paymentModel.fetch({
success:function(model) {
var paymentsView, track_data;
return track_data = {
Page:"Payment"
}, HR.util.track("Viewed Account Settings", track_data), paymentsView = new HR.PricingPlansView({
model:model
}), HR.appView.setSplitContentView("settings", null, "pricing", paymentsView);
},
error:function() {
return console.log("error");
}
});
});
}, RecruitRouter.prototype.paymentCheckout = function() {
return HR.requires("compound/x/recruit-basic", function() {
var paymentModel, plan_data, uid, userData;
return plan_data = HR.UserSettings.get("checkout"), uid = HR.currentUser.id, plan_data ? "user" === plan_data.payment_type && plan_data.user_data ? (userData = plan_data.user_data, 
paymentModel = new HR.PaymentModel({
plan:"user",
uid:uid
}), paymentModel.fetch({
success:function(model) {
var checkoutView;
return checkoutView = new HR.UserPaymentCheckoutView({
model:model,
user_data:userData
}), HR.appView.setSplitContentView("settings", null, "pricing", checkoutView);
},
error:function() {
return alert("Please contact interviewstreet for adding more users."), HR.UserSettings.set("checkout", null), 
HR.router.navigate("/payments", !0);
}
})) :"plan" === plan_data.payment_type && plan_data.plan ? (paymentModel = new HR.PaymentModel({
plan:plan_data.plan,
uid:uid
}), paymentModel.fetch({
success:function(model) {
var checkoutView;
return checkoutView = new HR.PlanPaymentCheckoutView({
model:model,
plan:plan_data.plan
}), HR.appView.setSplitContentView("settings", null, "pricing", checkoutView);
}
})) :void 0 :HR.router.navigate("/payments", !0);
});
}, RecruitRouter.prototype.ccDetails = function() {
return HR.requires("compound/x/recruit-basic", function() {
var paymentModel, uid;
return uid = HR.currentUser.id, paymentModel = new HR.PaymentModel({
uid:uid
}), paymentModel.fetch({
success:function(model) {
var cardDetailsView, track_data;
return track_data = {
Page:"Credit card details"
}, HR.util.track("Viewed Account Settings", track_data), cardDetailsView = new HR.PaymentCardDetailsView({
model:model
}), HR.appView.setSplitContentView("settings", null, "cc_details", cardDetailsView);
}
});
});
}, RecruitRouter.prototype.candidateSearch = function(term) {
return null == term && (term = ""), HR.requires("compound/x/recruit-basic", function() {
var collection;
return collection = new HR.SearchCandidatesCollection(), collection.fetch({
data:{
term:term
},
success:function(collection) {
var searchView;
return HR.appView.setCandidateSearchTerm(term), searchView = new HR.CandidateSearchView({
term:term,
collection:collection
}), HR.appView.setFullContentView(searchView);
}
});
});
}, RecruitRouter.prototype.teamSettings = function() {
return HR.requires("compound/x/recruit-basic", function() {
var teams;
return teams = new HR.TeamsCollection(), teams.fetch({
success:function(collection) {
var settings_view, track_data;
return track_data = {
Page:"Teams"
}, HR.util.track("Viewed Account Settings", track_data), settings_view = new HR.SettingsTeamView({
collection:collection
}), HR.appView.setSplitContentView("settings", null, "team", settings_view);
}
});
});
}, RecruitRouter.prototype.defaultRoute = function() {
return console.log("default"), console.log("do Something else here later"), HR.router.navigate("tests", !0);
}, RecruitRouter;
}(Backbone.Router), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitRouter = RecruitRouter, 
window.istreet = new Object(), window.istreet.cfg = new Object(), window.istreet.cfg.hrqn = new Object(), 
h = window.istreet.cfg.hrqn, h.mcq = "Multiple choice", h.code = "Programming", 
h.textAns = "Subjective", h.approx = "Approximate", h.multiple_mcq = "Multiple answers", 
h.unscramble = "Unscramble Sentence", h.rewrite = "Rewrite Sentence", h.complete = "Complete Sentence", 
h.correct_errors = "Correct Errors", h.file_upload = "File upload", h.multiple_blanks = "Multiple blanks", 
h.info = "Info", h.task = "Task", h["Subjective Answer"] = "Subjective answer", 
h.uml = "UML", h.electrical = "Electrical", window.istreet.cfg.ats = new Object(), 
h = window.istreet.cfg.ats, h["1"] = "Test Completed - Evaluation Reqd.", h["2"] = "Test Completed - Qualified", 
h["3"] = "Test Completed - Failed", h["4"] = "Phone Interview - I", h["5"] = "Phone Interview - II", 
h["6"] = "Phone Interview - III", h["7"] = "Offer Sent", h["8"] = "Offer Negotitation", 
h["9"] = "Offer Accepted", h["10"] = "Offer Declined", h["12"] = "Phone Interview - Cleared", 
h["13"] = "Phone Interview - Failed", h["14"] = "Technical Interview - Cleared", 
h["15"] = "Technical Interview - Failed", h["16"] = "HR Interview - Cleared", h["17"] = "HR Interview - Failed", 
h["11"] = "On Hold", window.istreet.cfg.permissions = new Object(), h = window.istreet.cfg.permissions, 
h.test_permissions = {
TEST_NONE_PERMISSION:0,
TEST_READ_PERMISSION:1,
TEST_WRITE_PERMISSION:2,
TEST_DELETE_PERMISSION:3
}, h.question_permissions = {
QUESTION_NONE_PERMISSION:0,
QUESTION_READ_PERMISSION:1,
QUESTION_WRITE_PERMISSION:2,
QUESTION_DELETE_PERMISSION:3
}, h.candidates_permissions = {
CANDIDATES_NONE_PERMISSION:0,
CANDIDATES_PERSONAL_PERMISSION:1,
CANDIDATES_ALL_PERMISSION:2,
CANDIDATES_ADMIN_PERMISSION:3
};
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
var HR, RecruitView, _ref;
return RecruitView = function(_super) {
function RecruitView() {
return RecruitView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitView, _super), RecruitView.prototype.el = "#HackerRank-X-main", 
RecruitView.prototype.sidebarComponents = {
test:"TestNavigationView",
interviews:"InterviewsNavigationView",
settings:"SettingsNavigationView"
}, RecruitView.prototype.initialize = function() {
var that;
return this.contentView && this.fullContentView || this.setLoadingView(), that = this, 
_.each(this.liveEvents, function(callback, index) {
var ev, sl, sp;
return sp = index.indexOf(" "), ev = index.substr(0, sp), sl = index.substr(sp + 1), 
$(sl).die(ev).unbind(ev).live(ev, that[callback]);
});
}, RecruitView.prototype.destroyView = function(view) {
if (view) {
if (view.unbind && view.unbind(), view.$ && view.$("*").unbind(), view.destroy) return view.destroy();
if (view.remove) return view.remove();
}
}, RecruitView.prototype.setLoadingView = function() {
var loadingView;
return loadingView = new HR.LoadingView(), this.setContentView(loadingView);
}, RecruitView.prototype.setFullContentView = function(view) {
return this.sidebarView && (this.destroyView(this.sidebarView), this.sidebarView = null, 
this.$("#hre-sidebar-full-container").html(""), this.$("#hre-sidebar-full-container").addClass("hidden")), 
this.contentView && (this.destroyView(this.contentView), this.contentView = null, 
this.$("#hre-content").html(""), this.$("#hre-content").addClass("hidden")), this.fullContentView && this.destroyView(this.fullContentView), 
this.fullContentView = view, this.$("#hre-full-content").html(view.render().el), 
this.$("#hre-full-content").removeClass("hidden");
}, RecruitView.prototype.hideFullContentView = function() {
return this.$("#hre-full-content").addClass("hidden"), this.$("#hre-full-content").html(""), 
this.fullContentView && this.destroyView(this.fullContentView), this.fullContentView = null;
}, RecruitView.prototype.setSplitContentView = function(sidebarComponent, model, active_nav_link, contentView) {
return this.hideFullContentView(), this.setSidebarView(sidebarComponent, model, active_nav_link), 
this.setContentView(contentView);
}, RecruitView.prototype.updateSidebarView = function() {
return this.renderNavigation(this.sidebarView.render().el);
}, RecruitView.prototype.setSidebarView = function(component, model, active_nav_link) {
return this.sidebarView && this.sidebarComponent === component ? (this.sidebarView.updateData(model, active_nav_link), 
this.renderNavigation(this.sidebarView.render().el)) :this.sidebarView ? (this.destroyView(this.sidebarview), 
this.$("#hre-sidebar-full-container").html(""), this.sidebarView = new HR[this.sidebarComponents[component]]({
model:model,
active_nav_link:active_nav_link
}), this.sidebarComponent = component, this.renderNavigation(this.sidebarView.render().el)) :(this.sidebarView = new HR[this.sidebarComponents[component]]({
model:model,
active_nav_link:active_nav_link
}), this.sidebarComponent = component, this.renderNavigation(this.sidebarView.render().el));
}, RecruitView.prototype.setContentView = function(contentView) {
var content;
return this.contentView && (this.destroyView(this.contentView), this.$("#hre-content").html("")), 
this.contentView = contentView, content = this.contentView.render().el, this.renderContent(content);
}, RecruitView.prototype.shouldCollapse = function() {
var width;
return width = $(window).width(), 1184 > width ? !0 :60 === $(".hre-sidebar").width() ? !1 :void 0;
}, RecruitView.prototype.renderContent = function(content) {
return $(".tooltip").remove(), this.$("#hre-content").html(content), this.$("#hre-content").removeClass("hidden");
}, RecruitView.prototype.renderNavigation = function(content) {
return this.$("#hre-sidebar-full-container").html(content), this.$("#hre-sidebar-full-container").removeClass("hidden");
}, RecruitView.prototype.liveEvents = {
"click .js-backbone":"navigateAnchor",
"click button[data-throbber=show]":"showInlineThrobber",
"click a[data-throbber=show]":"showInlineThrobber",
"click #sidebar-menu-icon":"toggleSidebar"
}, RecruitView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href && "#" !== href ? HR.router.navigate(href, !0) :void 0);
}, RecruitView.prototype.showInlineThrobber = function(e) {
return HR.util.inlineLoadingStart(e.currentTarget);
}, RecruitView.prototype.getSubViews = function() {
var subviews;
return null === this.contentView && this.setContentView(HR.E404View), subviews = {
content:this.contentView
};
}, RecruitView.prototype.setTopNavigationView = function(model) {
return this.navBarView = new HR.TopNavigationBarView({
model:model
}), this.$("#hre-nav").html(this.navBarView.render().el);
}, RecruitView.prototype.setCandidateSearchTerm = function(term) {
return this.navBarView.setTerm(term);
}, RecruitView.prototype.toggleSidebar = function(e) {
var content, sidebar;
return e.preventDefault(), sidebar = $("#hre-sidebar"), content = $("#hre-content"), 
$(content).toggleClass("open"), sidebar.hasClass("open") ? $(sidebar).removeClass("open").addClass("closed") :$(sidebar).addClass("open").removeClass("closed");
}, RecruitView.prototype.collapseLeftNav = function() {
return $(".hre-sidebar-bottom").addClass("collapsed");
}, RecruitView.prototype.expandLeftNav = function() {
return $(".hre-sidebar-bottom").removeClass("collapsed");
}, RecruitView.prototype.render = function() {
return this;
}, RecruitView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitView = RecruitView;
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
var HR, TopNavigationBarView, _ref;
return TopNavigationBarView = function(_super) {
function TopNavigationBarView() {
return TopNavigationBarView.__super__.constructor.apply(this, arguments);
}
return __extends(TopNavigationBarView, _super), TopNavigationBarView.prototype.template = "x/top-nav-bar", 
TopNavigationBarView.prototype.class_name = "hr-nav", TopNavigationBarView.prototype.activeSection = "", 
TopNavigationBarView.prototype.initialize = function(options) {
return this.model = options.model, this.listenTo(this.model, "change", this.render);
}, TopNavigationBarView.prototype.events = function() {
return {
"click a.js-nav-link":"navigateAnchor",
"keydown input#candidate-search-box-gl":"goToCandidateSearch"
};
}, TopNavigationBarView.prototype.render = function() {
var content;
return this.activeSection = this.getActiveSection(), content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
_model:this.model,
term:this.term,
activeSection:this.activeSection
}), $(this.el).html(content), this;
}, TopNavigationBarView.prototype.setTerm = function(term) {
return this.term = term, this.render();
}, TopNavigationBarView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href && "#" !== href ? (HR.router.navigate(href, !0), this.render()) :void 0);
}, TopNavigationBarView.prototype.getActiveSection = function() {
return Backbone.history.fragment ? Backbone.history.fragment.split("/")[0] :void 0;
}, TopNavigationBarView.prototype.goToCandidateSearch = function(e) {
var val;
return val = $(e.currentTarget).val(), 13 === e.keyCode && val ? HR.router.navigate("search/" + val, !0) :void 0;
}, TopNavigationBarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TopNavigationBarView = TopNavigationBarView;
});
}.call(this), HR = window.HR || {}, HR.countryNames = [ "Asia/Pacific Region", "Europe", "Andorra", "United Arab Emirates", "Afghanistan", "Antigua and Barbuda", "Anguilla", "Albania", "Armenia", "Netherlands Antilles", "Angola", "Antarctica", "Argentina", "American Samoa", "Austria", "Australia", "Aruba", "Azerbaijan", "Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Bermuda", "Brunei Darussalam", "Bolivia", "Brazil", "Bahamas", "Bhutan", "Bouvet Island", "Botswana", "Belarus", "Belize", "Canada", "Cocos (Keeling) Islands", "Congo, The Democratic Republic of the", "Central African Republic", "Congo", "Switzerland", "Cote D'Ivoire", "Cook Islands", "Chile", "Cameroon", "China", "Colombia", "Costa Rica", "Cuba", "Cape Verde", "Christmas Island", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria", "Ecuador", "Estonia", "Egypt", "Western Sahara", "Eritrea", "Spain", "Ethiopia", "Finland", "Fiji", "Falkland Islands (Malvinas)", "Micronesia, Federated States of", "Faroe Islands", "France", "France, Metropolitan", "Gabon", "United Kingdom", "Grenada", "Georgia", "French Guiana", "Ghana", "Gibraltar", "Greenland", "Gambia", "Guinea", "Guadeloupe", "Equatorial Guinea", "Greece", "South Georgia and the South Sandwich Islands", "Guatemala", "Guam", "Guinea-Bissau", "Guyana", "Hong Kong", "Heard Island and McDonald Islands", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland", "Israel", "India", "British Indian Ocean Territory", "Iraq", "Iran, Islamic Republic of", "Iceland", "Italy", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Comoros", "Saint Kitts and Nevis", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Cayman Islands", "Kazakhstan", "Lao People's Democratic Republic", "Lebanon", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libyan Arab Jamahiriya", "Morocco", "Monaco", "Moldova, Republic of", "Madagascar", "Marshall Islands", "Macedonia", "Mali", "Myanmar", "Mongolia", "Macau", "Northern Mariana Islands", "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius", "Maldives", "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "Nauru", "Niue", "New Zealand", "Oman", "Panama", "Peru", "French Polynesia", "Papua New Guinea", "Philippines", "Pakistan", "Poland", "Saint Pierre and Miquelon", "Pitcairn Islands", "Puerto Rico", "Palestinian Territory", "Portugal", "Palau", "Paraguay", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena", "Slovenia", "Svalbard and Jan Mayen", "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "Sao Tome and Principe", "El Salvador", "Syrian Arab Republic", "Swaziland", "Turks and Caicos Islands", "Chad", "French Southern Territories", "Togo", "Thailand", "Tajikistan", "Tokelau", "Turkmenistan", "Tunisia", "Tonga", "Timor-Leste", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Tanzania, United Republic of", "Ukraine", "Uganda", "United States Minor Outlying Islands", "United States", "Uruguay", "Uzbekistan", "Holy See (Vatican City State)", "Saint Vincent and the Grenadines", "Venezuela", "Virgin Islands, British", "Virgin Islands, U.S.", "Vietnam", "Vanuatu", "Wallis and Futuna", "Samoa", "Yemen", "Mayotte", "Serbia", "South Africa", "Zambia", "Montenegro", "Zimbabwe", "Anonymous Proxy", "Satellite Provider", "Other", "Aland Islands", "Guernsey", "Isle of Man", "Jersey", "Saint Barthelemy", "Saint Martin" ];

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
}, window.bootbox = window.bootbox || function init($, undefined) {
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
!function() {
var proxiedSync;
return proxiedSync = Backbone.sync, Backbone.sync = function(method, model, options) {
return options || (options = {}), options.crossDomain || (options.crossDomain = !1), 
options.xhrFields || (options.xhrFields = {
withCredentials:!0
}), proxiedSync(method, model, options);
};
}(), $.ajaxSetup({
cache:!1
}), $(document).ready(function() {
var HR, _makeTopLevel;
return HR = window.HR, HR.appController = new HR.RecruitController(), require.config({
waitSeconds:60
}), _makeTopLevel = function(source, attributes) {
return _.each(attributes, function(attribute) {
return "undefined" !== source[attribute] ? HR[attribute] = source[attribute] :void 0;
});
}, _makeTopLevel(HR.appController, [ "namespace", "requires", "routeNamespace", "restURL", "model", "collection" ]), 
HR.router = new HR.RecruitRouter(), Backbone.history.start({
pushState:!0,
root:"/x/"
});
});
}.call(this);