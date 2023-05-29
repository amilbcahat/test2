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
var HR, defaultSelect2Options, formatResults, formatSelection, highChartOptions, initDataTablePercentSort, _base, _ref;
return initDataTablePercentSort = function() {
return jQuery.fn.dataTableExt.oSort["x-percent-asc"] = function(a, b) {
return a - b;
}, jQuery.fn.dataTableExt.oSort["x-percent-pre"] = function(a) {
var x;
return x = "-" === a ? -1e5 :a.replace(/%/, ""), parseInt(x, 10);
}, jQuery.fn.dataTableExt.oSort["x-percent-desc"] = function(a, b) {
return b - a;
};
}, defaultSelect2Options = function() {
var options;
return options = {
minimumInputLength:1,
width:"off",
placeholder:"Enter a term",
formatResult:formatResults,
formatSelection:formatSelection
};
}, highChartOptions = function(params) {
var options, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
return null == params && (params = {}), options = {
chart:{
type:null != (_ref = params.type) ? _ref :"line",
spacingTop:40,
zoomType:"x"
},
title:{
text:null != (_ref1 = params.text) ? _ref1 :"Analytics Graph",
margin:20,
floating:!1
},
backgroundColor:null,
height:250,
xAxis:{
categories:params.categories,
tickInterval:params.tickInterval,
offset:0,
showFirstLabel:!0,
showLastLabel:!0,
title:{
text:null != (_ref2 = params.xTitle) ? _ref2 :"Time"
}
},
yAxis:{
min:-1,
allowDecimals:!1,
title:{
text:null != (_ref3 = params.yTitle) ? _ref3 :"No. of Entities"
}
},
series:[ {
name:null != (_ref4 = params.seriesName) ? _ref4 :"Signups",
data:params.results,
type:null != (_ref5 = params.type) ? _ref5 :"line"
} ],
legend:{
enabled:!1
},
credits:{
enabled:!1
},
plotOptions:{
series:{
cursor:"pointer",
point:{
events:{
click:params.plotClick
}
}
}
}
};
}, formatResults = function(result) {
var id, markup, primary, secondary;
return id = result.id, primary = result.primary, secondary = result.secondary, markup = "<table class='result-result'><tr>", 
markup += primary ? "<td class='result-info'><div class='result-title'>" + id + " : " + primary + "</div>" :"<td class='result-info'><div class='result-title'>" + id + "</div>", 
secondary && (markup += "<div class='result-data'>" + secondary + "</div>"), markup += "</td></tr></table>";
}, formatSelection = function(result) {
var primary;
return primary = result.primary, primary ? "" + result.id + " : " + primary :void 0;
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.util || (HR.util = {}), (_base = HR.util).admin || (_base.admin = {}), 
window.HR || (window.HR = HR), HR.util.admin.defaultSelect2Options = defaultSelect2Options, 
HR.util.admin.initDataTablePercentSort = initDataTablePercentSort, HR.util.admin.highChartOptions = highChartOptions;
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
}, UserModel.prototype.canCreateInterviews = function() {
return "developer" !== this.get("role") ? !0 :this.get("company") && this.get("company").developers_create_interviews && "False" === this.get("company").developers_create_interviews ? !1 :!0;
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
var HR, XAdminController, _ref;
return XAdminController = function(_super) {
function XAdminController() {
return XAdminController.__super__.constructor.apply(this, arguments);
}
return __extends(XAdminController, _super), XAdminController.prototype.object = function(suffix, name, attributes, options) {
var Obj, clsName, obj, stringName;
if (stringName = name.toTitleCase() + "-" + suffix, clsName = $.camelCase(stringName), 
Obj = HR[clsName], !Obj && ("model" === suffix ? Obj = this.MODELS_DEF[name] :"collection" === suffix && (Obj = this.COLLECTIONS_DEF[name]), 
!Obj)) throw "HR." + clsName + " is not defined";
return obj = new Obj(attributes, options), obj.contest_slug = (attributes || {}).contest_slug || (options || {}).contest_slug, 
obj;
}, XAdminController.prototype.model = function(name, attributes, options) {
var model;
return model = HR.appController.object("model", name, attributes, options);
}, XAdminController.prototype.collection = function(name, attributes, options) {
return HR.appController.object("collection", name, attributes, options);
}, XAdminController.prototype.profile = function(options) {
return null == options && (options = {}), this._profile && _.size(options) > 0 ? this._profile.cached(options) :this._profile || (this._profile = this.model("profile").cached(options), 
this._profile.listenTo(this._profile, "reset", function(_this) {
return function() {
return HR.key_prefix = _this._profile.get("key_prefix");
};
}(this))), this._profile;
}, XAdminController.prototype.log = Backbone.log, XAdminController.prototype.staticPath = function(path, base_path) {
return null == base_path && (base_path = null), path = HR.MANIFEST && HR.MANIFEST[path] ? HR.MANIFEST[path] :path, 
HR.PREFETCH_DATA && HR.PREFETCH_DATA.metadata && (base_path || (base_path = HR.PREFETCH_DATA.metadata.asset_path)), 
"" + base_path + "/" + path;
}, XAdminController.prototype.requires = function() {
var callback, errorCallback, number_paths, staticFiles;
return number_paths = arguments.length - 1, callback = _.last(arguments), errorCallback = null, 
"function" == typeof arguments[arguments.length - 2] && (number_paths = arguments.length - 2, 
callback = arguments[arguments.length - 2], errorCallback = _.last(arguments)), 
staticFiles = _.map(_.toArray(arguments).slice(0, number_paths), function() {
return function(path) {
return HR.appController.staticPath("" + path + ".js");
};
}(this)), require(staticFiles, callback, errorCallback);
}, XAdminController.prototype.templatePath = function(template) {
var base_path;
return base_path = null, window.IE_BROWSER && (base_path = "/assets"), this.staticPath("backbone/templates/" + template, base_path);
}, XAdminController.prototype.template = function(template_name, template_callback, view_loader) {
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
}, XAdminController.prototype.setData = function(key, value) {
return void 0 === this.persistant_data && (this.persistant_data = {}), void 0 === this.persistant_data[key] && this.trigger("persistant:set:" + key), 
this.trigger("persistant:change:" + key), this.persistant_data[key] = value;
}, XAdminController.prototype.getData = function(key) {
return this.persistant_data && this.persistant_data[key] ? this.persistant_data[key] :void 0;
}, XAdminController.prototype.viewLoader = function(size) {
return null == size && (size = 32), "<div class='gray'> <div style='background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_" + size + "x" + size + ".gif); height: " + size + "px; width: " + size + "px; display: inline-block;'></div> </div>";
}, XAdminController.prototype.setModel = function(data, key, uid, casual) {
var def_key;
if (null == uid && (uid = null), null == casual && (casual = !0), def_key = key, 
uid && (key = "" + key + "-" + uid), !this.MODELS_DEF[def_key]) throw "HR Error: Model with key `" + key + "` doesn't exist";
return this.MODELS || (this.MODELS = {}), this.MODELS[key] ? this.MODELS[key].set(data) :this.MODELS[key] = new this.MODELS_DEF[def_key](data, {
casual:casual
});
}, XAdminController.prototype.getModel = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
var model;
return null == uid && (uid = null), null == callback && (callback = null), null == fetch && (fetch = !0), 
null == force_fetch && (force_fetch = !1), null == disableThrobber && (disableThrobber = !1), 
model = new this.MODELS_DEF[key](null, {
casual:!1
}), callback && callback(model), fetch && model.cached({
fetch:force_fetch,
disableThrobber:disableThrobber
}), model;
}, XAdminController.prototype.cleanModelCache = function(keyPrefix) {
var that;
return that = this, _.each(this.MODELS, function(o, key) {
return 0 === key.indexOf(keyPrefix) ? delete that.MODELS[key] :void 0;
});
}, XAdminController.prototype.setCollection = function(data, key, uid) {
var def_key;
if (null == uid && (uid = null), def_key = key, uid && (key = "" + key + "-" + uid), 
!this.COLLECTIONS_DEF[def_key]) throw "HR Error: Collection with key `" + key + "` doesn't exist";
return this.COLLECTIONS || (this.COLLECTIONS = {}), this.COLLECTIONS[key] || (this.COLLECTIONS[key] = new this.COLLECTIONS_DEF[def_key]()), 
this.COLLECTIONS[key].reset(data, {
silent:!1
});
}, XAdminController.prototype.getCollection = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
var cache, collection;
return null == uid && (uid = null), null == callback && (callback = null), null == fetch && (fetch = !0), 
null == force_fetch && (force_fetch = !1), null == disableThrobber && (disableThrobber = !1), 
collection = new this.COLLECTIONS_DEF[key](null, {
casual:!force_fetch
}), callback && callback(collection), fetch && (cache = !force_fetch, collection.cached({
fetch:force_fetch,
disableThrobber:disableThrobber
})), collection;
}, XAdminController.prototype.cleanCollectionCache = function(keyPrefix) {
var that;
return that = this, _.each(this.COLLECTIONS, function(o, key) {
return 0 === key.indexOf(keyPrefix) ? delete that.COLLECTIONS[key] :void 0;
});
}, XAdminController.prototype.getTemplate = function(template_name, callback, obj) {
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
}, XAdminController.prototype.clearTemplate = function(template_name) {
return void 0 === this.TEMPLATE_DATA && (this.TEMPLATE_DATA = {}, this.TEMPLATE_CALLBACKS = {}), 
delete this.TEMPLATE_DATA[template_name], delete (this.TEMPLATE_VIEWDATA = !1), 
delete this.TEMPLATE_CALLBACKS[template_name];
}, XAdminController;
}(Backbone.Model), HR = null != (_ref = window.HR) ? _ref :{}, HR.XAdminController = XAdminController;
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
var AnalyticsLocalStorage, HR, _ref;
return AnalyticsLocalStorage = function(_super) {
function AnalyticsLocalStorage() {
return this.get = __bind(this.get, this), AnalyticsLocalStorage.__super__.constructor.apply(this, arguments);
}
return __extends(AnalyticsLocalStorage, _super), AnalyticsLocalStorage.prototype.path = "analytics.local.storage", 
AnalyticsLocalStorage.prototype.timer = 1e4, AnalyticsLocalStorage.prototype.disableThrobber = !0, 
AnalyticsLocalStorage.prototype.initialize = function(options) {
return null == options && (options = {}), _.bindAll(this), this.path = this.path;
}, AnalyticsLocalStorage.prototype.setId = function(id) {
var val;
return this.set("id", id), val = $.jStorage.get(this.getKey()), val ? this.save(val) :void 0;
}, AnalyticsLocalStorage.prototype.get = function(key, deflt) {
var r;
return null == deflt && (deflt = null), r = AnalyticsLocalStorage.__super__.get.call(this, key), 
r ? r :deflt;
}, AnalyticsLocalStorage.prototype.getKey = function() {
return this.path + "." + this.get("id");
}, AnalyticsLocalStorage.prototype.onChangeFuckedup = function() {
return setTimeout(function(_this) {
return function() {
return _this.get("id") ? $.jStorage.set(_this.getKey(), _this.toJSON()) :void 0;
};
}(this));
}, AnalyticsLocalStorage.prototype.set = function(key, val, options) {
var r;
return _.isArray(val) && (val = _.clone(val)), r = AnalyticsLocalStorage.__super__.set.call(this, key, val, options), 
this.onChangeFuckedup(), val;
}, AnalyticsLocalStorage;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.AnalyticsLocalStorage = new AnalyticsLocalStorage();
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
var HR, XAdminRouter, _ref;
return XAdminRouter = function(_super) {
function XAdminRouter() {
return XAdminRouter.__super__.constructor.apply(this, arguments);
}
return __extends(XAdminRouter, _super), XAdminRouter.prototype.routes = {
admin:"defaultAdminRoute",
"admin/su":"su",
"admin/test/duplicate":"test_duplicate",
"admin/test/add_sections":"test_add_sections",
"admin/test/invite_candidates":"test_invite_candidates",
"admin/test/change_owner":"test_change_owner",
"admin/user/change_email":"user_change_email",
"admin/company/extend_trial":"companyExtendTrial",
"admin/question/duplicate":"question_duplicate",
analytics:"defaultAnalyticsRoute",
"analytics/companies/dashboard":"analytics_companies",
"analytics/companies/trial_signups":"analytics_companies_trial_signups",
"analytics/companies":"analytics_company",
"analytics/users/watchlist":"analytics_users_watchlist",
"analytics/companies/watchlist":"analytics_companies_watchlist",
"analytics/revenue/health":"analytics_revenue_health",
"analytics/revenue/health/:month":"analytics_revenue_health",
"analytics/companies/:id":"analytics_company",
"404":"not_found",
"*notFound":"catchall"
}, XAdminRouter.prototype.initialize = function() {
return HR.appView = new HR.XAdminView(), HR.loadingButton = "", HR.currentUser = new HR.UserModel(HR.PREFETCH_DATA.user), 
HR.PREFETCH_DATA.user && HR.PREFETCH_DATA.user.id ? (HR.AnalyticsLocalStorage.setId(HR.currentUser.get("id")), 
HR.PREFETCH_DATA.user = {}) :HR.currentUser.fetch({
async:!1,
xhrFields:{
withAttributes:!1
},
dataType:"json",
url:"/xrest/users",
success:function(m) {
return m.get("id") ? HR.AnalyticsLocalStorage.setId(m.get("id")) :void 0;
},
error:function(m, response) {
return 401 === response.status ? (HR.util.ajaxmsg("No Logged In User", !1, !0, 1), 
window.location.href = "/x/login") :console.log("Error Fetching User");
}
}), HR.appView.setTopNavigationView(HR.currentUser);
}, XAdminRouter.prototype.su = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.SwitchUserView(), HR.appView.setSplitContentView("admin", null, "switch_user", view);
});
}, XAdminRouter.prototype.user_change_email = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.UserChangeEmailView(), HR.appView.setSplitContentView("admin", null, "user_change_email", view);
});
}, XAdminRouter.prototype.test_duplicate = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.DuplicateTestView(), HR.appView.setSplitContentView("admin", null, "duplicate_test", view);
});
}, XAdminRouter.prototype.test_add_sections = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.TestAddSectionsView(), HR.appView.setSplitContentView("admin", null, "add_sections", view);
});
}, XAdminRouter.prototype.question_duplicate = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.DuplicateQuestionView(), HR.appView.setSplitContentView("admin", null, "duplicate_question", view);
});
}, XAdminRouter.prototype.test_change_owner = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.TestChangeOwnerView(), HR.appView.setSplitContentView("admin", null, "change_test_owner", view);
});
}, XAdminRouter.prototype.test_invite_candidates = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.TestInviteCandidatesView(), HR.appView.setSplitContentView("admin", null, "invite_candidates", view);
});
}, XAdminRouter.prototype.companyExtendTrial = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.CompanyExtendTrialView(), HR.appView.setSplitContentView("admin", null, "extend_trial", view);
});
}, XAdminRouter.prototype.defaultAnalyticsRoute = function() {
return HR.requires("compound/x-analytics/basic", function() {
var view;
return view = new HR.DefaultAnalyticsView(), HR.appView.setSplitContentView("analytics", null, null, view);
});
}, XAdminRouter.prototype.analytics_companies = function() {
return HR.requires("compound/x-analytics/basic", function() {
var collection;
return collection = new HR.DashboardCompaniesCollection(), collection.fetch({
success:function(collection) {
var view;
return view = new HR.CompaniesListview({
collection:collection
}), HR.appView.setSplitContentView("analytics", null, "companies_dash", view);
}
});
});
}, XAdminRouter.prototype.analytics_company = function(id) {
return null == id && (id = null), HR.requires("compound/x-analytics/basic", function() {
var model, view;
return model = new HR.DashboardCompanyModel(), id ? (model.set("id", id), model.fetch({
success:function(model) {
var view;
return view = new HR.CompanyDashboardView({
model:model
}), HR.appView.setSplitContentView("analytics", null, "company_dash", view);
},
error:function() {
var view;
return view = new HR.CompanyDashboardView(), HR.appView.setSplitContentView("analytics", null, "company_dash", view);
}
})) :(view = new HR.CompanyDashboardView(), HR.appView.setSplitContentView("analytics", null, "company_dash", view));
});
}, XAdminRouter.prototype.analytics_companies_trial_signups = function() {
return HR.requires("compound/x-analytics/basic", function() {
var view;
return view = new HR.TrialSignupsView(), HR.appView.setSplitContentView("analytics", null, "trial_signups", view);
});
}, XAdminRouter.prototype.analytics_users_watchlist = function() {
return HR.requires("compound/x-analytics/basic", function() {
var collection;
return collection = new HR.UserWatchlistCollection(), collection.fetch({
success:function(collection) {
var view;
return view = new HR.UserWatchlistView({
collection:collection
}), HR.appView.setSplitContentView("analytics", null, "user_watchlist", view);
}
});
});
}, XAdminRouter.prototype.analytics_companies_watchlist = function() {
return HR.requires("compound/x-analytics/basic", function() {
var collection;
return collection = new HR.CompanyWatchlistCollection(), collection.fetch({
success:function(collection) {
var view;
return view = new HR.CompanyWatchlistView({
collection:collection
}), HR.appView.setSplitContentView("analytics", null, "company_watchlist", view);
}
});
});
}, XAdminRouter.prototype.analytics_revenue_health = function(month) {
return null == month && (month = "current"), HR.requires("compound/x-analytics/basic", function() {
var model;
return model = new HR.RevenueHealthModel(), model.fetch({
data:{
month:month
},
success:function(model) {
var view;
return view = new HR.RevenueHealthView({
model:model,
month:month
}), HR.appView.setSplitContentView("analytics", null, "revenue_health", view);
}
});
});
}, XAdminRouter.prototype.catchall = function() {
return Backbone.history.fragment.endsWith("/") ? HR.router.navigate(Backbone.history.fragment.replace(/\/$/, ""), !0) :this.not_found();
}, XAdminRouter.prototype.not_found = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.X404View(), HR.appView.setFullContentView(view);
});
}, XAdminRouter.prototype.defaultAdminRoute = function() {
return HR.requires("compound/x-admin/basic", function() {
var view;
return view = new HR.HomeView(), HR.appView.setSplitContentView("admin", null, null, view);
});
}, XAdminRouter;
}(Backbone.Router), HR = null != (_ref = window.HR) ? _ref :{}, HR.XAdminRouter = XAdminRouter;
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
var HR, XAdminView, _ref;
return XAdminView = function(_super) {
function XAdminView() {
return XAdminView.__super__.constructor.apply(this, arguments);
}
return __extends(XAdminView, _super), XAdminView.prototype.el = "#HackerRank-X-admin", 
XAdminView.prototype.sidebarComponents = {
analytics:"AnalyticsNavigationView",
admin:"AdminNavigationView"
}, XAdminView.prototype.initialize = function() {
var that;
return this.contentView && this.fullContentView || this.setLoadingView(), that = this, 
_.each(this.liveEvents, function(callback, index) {
var ev, sl, sp;
return sp = index.indexOf(" "), ev = index.substr(0, sp), sl = index.substr(sp + 1), 
$(sl).die(ev).unbind(ev).live(ev, that[callback]);
});
}, XAdminView.prototype.destroyView = function(view) {
if (view) {
if (view.unbind && view.unbind(), view.$ && view.$("*").unbind(), view.destroy) return view.destroy();
if (view.remove) return view.remove();
}
}, XAdminView.prototype.setLoadingView = function() {
var loadingView;
return loadingView = new HR.LoadingView(), this.setContentView(loadingView);
}, XAdminView.prototype.setFullContentView = function(view) {
return this.sidebarView && (this.destroyView(this.sidebarView), this.sidebarView = null, 
this.$("#hrx-admin-sidebar-full-container").html(""), this.$("#hrx-admin-sidebar-full-container").addClass("hidden")), 
this.contentView && (this.destroyView(this.contentView), this.contentView = null, 
this.$("#hrx-admin-content").html(""), this.$("#hrx-admin-content").addClass("hidden")), 
this.fullContentView && this.destroyView(this.fullContentView), this.fullContentView = view, 
this.$("#hrx-admin-full-content").html(view.render().el), this.$("#hrx-admin-full-content").removeClass("hidden");
}, XAdminView.prototype.hideFullContentView = function() {
return this.$("#hrx-admin-full-content").addClass("hidden"), this.$("#hrx-admin-full-content").html(""), 
this.fullContentView && this.destroyView(this.fullContentView), this.fullContentView = null;
}, XAdminView.prototype.setSplitContentView = function(sidebarComponent, model, active_nav_link, contentView) {
return this.hideFullContentView(), this.setSidebarView(sidebarComponent, model, active_nav_link), 
this.setContentView(contentView);
}, XAdminView.prototype.updateSidebarView = function() {
return this.renderNavigation(this.sidebarView.render().el);
}, XAdminView.prototype.setSidebarView = function(component, model, active_nav_link) {
var sideBarClass;
return this.sidebarView && this.sidebarComponent === component ? (this.sidebarView.updateData(model, active_nav_link), 
this.renderNavigation(this.sidebarView.render().el)) :this.sidebarView ? (sideBarClass = this.sidebarView.collapseClass(), 
this.destroyView(this.sidebarview), this.$("#hrx-admin-sidebar-full-container").html(""), 
this.sidebarView = new HR[this.sidebarComponents[component]]({
model:model,
active_nav_link:active_nav_link,
sideBarClass:sideBarClass
}), this.sidebarComponent = component, this.renderNavigation(this.sidebarView.render().el)) :(this.sidebarView = new HR[this.sidebarComponents[component]]({
model:model,
active_nav_link:active_nav_link
}), this.sidebarComponent = component, this.renderNavigation(this.sidebarView.render().el));
}, XAdminView.prototype.setContentView = function(contentView) {
var content;
return this.contentView && (this.destroyView(this.contentView), this.$("#hrx-admin-content").html("")), 
this.contentView = contentView, content = this.contentView.render().el, this.renderContent(content);
}, XAdminView.prototype.shouldCollapse = function() {
var width;
return width = $(window).width(), 1184 > width ? !0 :60 === $(".hre-sidebar").width() ? !1 :void 0;
}, XAdminView.prototype.renderContent = function(content) {
return $(".tooltip").remove(), this.$("#hrx-admin-content").html(content), this.$("#hrx-admin-content").removeClass("hidden");
}, XAdminView.prototype.renderNavigation = function(content) {
return this.$("#hrx-admin-sidebar-full-container").html(content), this.$("#hrx-admin-sidebar-full-container").removeClass("hidden");
}, XAdminView.prototype.liveEvents = {
"click .js-backbone":"navigateAnchor",
"click button[data-throbber=show]":"showInlineThrobber",
"click a[data-throbber=show]":"showInlineThrobber",
"click #sidebar-menu-icon":"toggleSidebar"
}, XAdminView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href && "#" !== href ? HR.router.navigate(href, !0) :void 0);
}, XAdminView.prototype.showInlineThrobber = function(e) {
return HR.util.inlineLoadingStart(e.currentTarget);
}, XAdminView.prototype.getSubViews = function() {
var subviews;
return null === this.contentView && this.setContentView(HR.E404View), subviews = {
content:this.contentView
};
}, XAdminView.prototype.setTopNavigationView = function(model) {
return this.navBarView = new HR.TopNavigationBarView({
model:model
}), this.$("#hrx-admin-nav").html(this.navBarView.render().el);
}, XAdminView.prototype.toggleSidebar = function(e) {
var content, sidebar;
return e && e.preventDefault(), sidebar = $("#hre-sidebar"), content = $("#hrx-admin-content"), 
content.toggleClass("open"), sidebar.hasClass("open") ? sidebar.removeClass("open").addClass("closed") :sidebar.addClass("open").removeClass("closed");
}, XAdminView.prototype.closeSidebar = function() {
var content, sidebar;
return sidebar = $("#hre-sidebar"), content = $("#hrx-admin-content"), content.removeClass("open"), 
sidebar.removeClass("open").addClass("closed");
}, XAdminView.prototype.collapseLeftNav = function() {
return $(".hre-sidebar-bottom").addClass("collapsed");
}, XAdminView.prototype.expandLeftNav = function() {
return $(".hre-sidebar-bottom").removeClass("collapsed");
}, XAdminView.prototype.render = function() {
return this;
}, XAdminView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.XAdminView = XAdminView;
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
return __extends(TopNavigationBarView, _super), TopNavigationBarView.prototype.template = "x-admin/top-nav-bar", 
TopNavigationBarView.prototype.class_name = "hr-nav", TopNavigationBarView.prototype.activeSection = "", 
TopNavigationBarView.prototype.initialize = function(options) {
return this.model = options.model, this.listenTo(this.model, "change", this.render);
}, TopNavigationBarView.prototype.events = function() {
return {
"click a.js-nav-link":"navigateAnchor"
};
}, TopNavigationBarView.prototype.render = function() {
var content;
return this.activeSection = this.getActiveSection(), content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
_model:this.model,
activeSection:this.activeSection
}), $(this.el).html(content), this;
}, TopNavigationBarView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href && "#" !== href ? (HR.router.navigate(href, !0), this.render()) :void 0);
}, TopNavigationBarView.prototype.getActiveSection = function() {
return Backbone.history.fragment ? Backbone.history.fragment.split("/")[0] :void 0;
}, TopNavigationBarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TopNavigationBarView = TopNavigationBarView;
});
}.call(this), function() {
function q(a, b) {
var c;
a || (a = {});
for (c in b) a[c] = b[c];
return a;
}
function w() {
var a, c, b = arguments, d = {}, e = function(a, b) {
var c, d;
"object" != typeof a && (a = {});
for (d in b) b.hasOwnProperty(d) && (c = b[d], a[d] = c && "object" == typeof c && "[object Array]" !== Object.prototype.toString.call(c) && "renderTo" !== d && "number" != typeof c.nodeType ? e(a[d] || {}, c) :b[d]);
return a;
};
for (b[0] === !0 && (d = b[1], b = Array.prototype.slice.call(b, 2)), c = b.length, 
a = 0; c > a; a++) d = e(d, b[a]);
return d;
}
function z(a, b) {
return parseInt(a, b || 10);
}
function Fa(a) {
return "string" == typeof a;
}
function ca(a) {
return "object" == typeof a;
}
function La(a) {
return "[object Array]" === Object.prototype.toString.call(a);
}
function ha(a) {
return "number" == typeof a;
}
function za(a) {
return U.log(a) / U.LN10;
}
function ia(a) {
return U.pow(10, a);
}
function ja(a, b) {
for (var c = a.length; c--; ) if (a[c] === b) {
a.splice(c, 1);
break;
}
}
function r(a) {
return a !== t && null !== a;
}
function H(a, b, c) {
var d, e;
if (Fa(b)) r(c) ? a.setAttribute(b, c) :a && a.getAttribute && (e = a.getAttribute(b)); else if (r(b) && ca(b)) for (d in b) a.setAttribute(d, b[d]);
return e;
}
function qa(a) {
return La(a) ? a :[ a ];
}
function m() {
var b, c, a = arguments, d = a.length;
for (b = 0; d > b; b++) if (c = a[b], "undefined" != typeof c && null !== c) return c;
}
function G(a, b) {
Aa && !aa && b && b.opacity !== t && (b.filter = "alpha(opacity=" + 100 * b.opacity + ")"), 
q(a.style, b);
}
function Y(a, b, c, d, e) {
return a = y.createElement(a), b && q(a, b), e && G(a, {
padding:0,
border:Q,
margin:0
}), c && G(a, c), d && d.appendChild(a), a;
}
function ka(a, b) {
var c = function() {};
return c.prototype = new a(), q(c.prototype, b), c;
}
function Ga(a, b, c, d) {
var e = E.lang, a = +a || 0, f = -1 === b ? (a.toString().split(".")[1] || "").length :isNaN(b = M(b)) ? 2 :b, b = void 0 === c ? e.decimalPoint :c, d = void 0 === d ? e.thousandsSep :d, e = 0 > a ? "-" :"", c = String(z(a = M(a).toFixed(f))), g = c.length > 3 ? c.length % 3 :0;
return e + (g ? c.substr(0, g) + d :"") + c.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d) + (f ? b + M(a - c).toFixed(f).slice(2) :"");
}
function Ha(a, b) {
return Array((b || 2) + 1 - String(a).length).join(0) + a;
}
function Ma(a, b, c) {
var d = a[b];
a[b] = function() {
var a = Array.prototype.slice.call(arguments);
return a.unshift(d), c.apply(this, a);
};
}
function Ia(a, b) {
for (var e, f, g, h, i, c = "{", d = !1, j = []; -1 !== (c = a.indexOf(c)); ) {
if (e = a.slice(0, c), d) {
for (f = e.split(":"), g = f.shift().split("."), i = g.length, e = b, h = 0; i > h; h++) e = e[g[h]];
f.length && (f = f.join(":"), g = /\.([0-9])/, h = E.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] :-1, 
null !== e && (e = Ga(e, i, h.decimalPoint, f.indexOf(",") > -1 ? h.thousandsSep :""))) :e = cb(f, e));
}
j.push(e), a = a.slice(c + 1), c = (d = !d) ? "}" :"{";
}
return j.push(a), j.join("");
}
function mb(a) {
return U.pow(10, T(U.log(a) / U.LN10));
}
function nb(a, b, c, d) {
var e, c = m(c, 1);
for (e = a / c, b || (b = [ 1, 2, 2.5, 5, 10 ], d && d.allowDecimals === !1 && (1 === c ? b = [ 1, 2, 5, 10 ] :.1 >= c && (b = [ 1 / c ]))), 
d = 0; d < b.length && (a = b[d], !(e <= (b[d] + (b[d + 1] || b[d])) / 2)); d++) ;
return a *= c;
}
function Bb() {
this.symbol = this.color = 0;
}
function ob(a, b) {
var d, e, c = a.length;
for (e = 0; c > e; e++) a[e].ss_i = e;
for (a.sort(function(a, c) {
return d = b(a, c), 0 === d ? a.ss_i - c.ss_i :d;
}), e = 0; c > e; e++) delete a[e].ss_i;
}
function Na(a) {
for (var b = a.length, c = a[0]; b--; ) a[b] < c && (c = a[b]);
return c;
}
function Ba(a) {
for (var b = a.length, c = a[0]; b--; ) a[b] > c && (c = a[b]);
return c;
}
function Oa(a, b) {
for (var c in a) a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c];
}
function Pa(a) {
db || (db = Y(Ja)), a && db.appendChild(a), db.innerHTML = "";
}
function ra(a, b) {
var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
if (b) throw c;
I.console && console.log(c);
}
function da(a) {
return parseFloat(a.toPrecision(14));
}
function Qa(a, b) {
va = m(a, b.animation);
}
function Cb() {
var a = E.global.useUTC, b = a ? "getUTC" :"get", c = a ? "setUTC" :"set";
Ra = 6e4 * (a && E.global.timezoneOffset || 0), eb = a ? Date.UTC :function(a, b, c, g, h, i) {
return new Date(a, b, m(c, 1), m(g, 0), m(h, 0), m(i, 0)).getTime();
}, pb = b + "Minutes", qb = b + "Hours", rb = b + "Day", Xa = b + "Date", fb = b + "Month", 
gb = b + "FullYear", Db = c + "Minutes", Eb = c + "Hours", sb = c + "Date", Fb = c + "Month", 
Gb = c + "FullYear";
}
function P() {}
function Sa(a, b, c, d) {
this.axis = a, this.pos = b, this.type = c || "", this.isNew = !0, !c && !d && this.addLabel();
}
function la() {
this.init.apply(this, arguments);
}
function Ya() {
this.init.apply(this, arguments);
}
function Hb(a, b, c, d, e) {
var f = a.chart.inverted;
this.axis = a, this.isNegative = c, this.options = b, this.x = d, this.total = null, 
this.points = {}, this.stack = e, this.alignOptions = {
align:b.align || (f ? c ? "left" :"right" :"center"),
verticalAlign:b.verticalAlign || (f ? "middle" :c ? "bottom" :"top"),
y:m(b.y, f ? 4 :c ? 14 :-6),
x:m(b.x, f ? c ? -6 :6 :0)
}, this.textAlign = b.textAlign || (f ? c ? "right" :"left" :"center");
}
var t, Za, $a, db, E, cb, va, ub, A, eb, Ra, pb, qb, rb, Xa, fb, gb, Db, Eb, sb, Fb, Gb, y = document, I = window, U = Math, u = U.round, T = U.floor, Ka = U.ceil, v = U.max, C = U.min, M = U.abs, Z = U.cos, ea = U.sin, ma = U.PI, Ca = 2 * ma / 360, wa = navigator.userAgent, Ib = I.opera, Aa = /msie/i.test(wa) && !Ib, hb = 8 === y.documentMode, ib = /AppleWebKit/.test(wa), Ta = /Firefox/.test(wa), Jb = /(Mobile|Android|Windows Phone)/.test(wa), xa = "http://www.w3.org/2000/svg", aa = !!y.createElementNS && !!y.createElementNS(xa, "svg").createSVGRect, Nb = Ta && parseInt(wa.split("Firefox/")[1], 10) < 4, fa = !aa && !Aa && !!y.createElement("canvas").getContext, Kb = {}, tb = 0, sa = function() {}, V = [], ab = 0, Ja = "div", Q = "none", Ob = /^[0-9]+$/, Pb = "stroke-width", F = {}, R = I.Highcharts = I.Highcharts ? ra(16, !0) :{};
cb = function(a, b, c) {
if (!r(b) || isNaN(b)) return "Invalid date";
var e, a = m(a, "%Y-%m-%d %H:%M:%S"), d = new Date(b - Ra), f = d[qb](), g = d[rb](), h = d[Xa](), i = d[fb](), j = d[gb](), k = E.lang, l = k.weekdays, d = q({
a:l[g].substr(0, 3),
A:l[g],
d:Ha(h),
e:h,
b:k.shortMonths[i],
B:k.months[i],
m:Ha(i + 1),
y:j.toString().substr(2, 2),
Y:j,
H:Ha(f),
I:Ha(f % 12 || 12),
l:f % 12 || 12,
M:Ha(d[pb]()),
p:12 > f ? "AM" :"PM",
P:12 > f ? "am" :"pm",
S:Ha(d.getSeconds()),
L:Ha(u(b % 1e3), 3)
}, R.dateFormats);
for (e in d) for (;-1 !== a.indexOf("%" + e); ) a = a.replace("%" + e, "function" == typeof d[e] ? d[e](b) :d[e]);
return c ? a.substr(0, 1).toUpperCase() + a.substr(1) :a;
}, Bb.prototype = {
wrapColor:function(a) {
this.color >= a && (this.color = 0);
},
wrapSymbol:function(a) {
this.symbol >= a && (this.symbol = 0);
}
}, A = function() {
for (var a = 0, b = arguments, c = b.length, d = {}; c > a; a++) d[b[a++]] = b[a];
return d;
}("millisecond", 1, "second", 1e3, "minute", 6e4, "hour", 36e5, "day", 864e5, "week", 6048e5, "month", 26784e5, "year", 31556952e3), 
ub = {
init:function(a, b, c) {
var g, h, i, b = b || "", d = a.shift, e = b.indexOf("C") > -1, f = e ? 7 :3, b = b.split(" "), c = [].concat(c), j = function(a) {
for (g = a.length; g--; ) "M" === a[g] && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2]);
};
if (e && (j(b), j(c)), a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6)), 
d <= c.length / f && b.length === c.length) for (;d--; ) c = [].concat(c).splice(0, f).concat(c);
if (a.shift = 0, b.length) for (a = c.length; b.length < a; ) d = [].concat(b).splice(b.length - f, f), 
e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
return h && (b = b.concat(h), c = c.concat(i)), [ b, c ];
},
step:function(a, b, c, d) {
var e = [], f = a.length;
if (1 === c) e = d; else if (f === b.length && 1 > c) for (;f--; ) d = parseFloat(a[f]), 
e[f] = isNaN(d) ? a[f] :c * parseFloat(b[f] - d) + d; else e = b;
return e;
}
}, function(a) {
I.HighchartsAdapter = I.HighchartsAdapter || a && {
init:function(b) {
var e, c = a.fx, d = c.step, f = a.Tween, g = f && f.propHooks;
e = a.cssHooks.opacity, a.extend(a.easing, {
easeOutQuad:function(a, b, c, d, e) {
return -d * (b /= e) * (b - 2) + c;
}
}), a.each([ "cur", "_default", "width", "height", "opacity" ], function(a, b) {
var k, e = d;
"cur" === b ? e = c.prototype :"_default" === b && f && (e = g[b], b = "set"), (k = e[b]) && (e[b] = function(c) {
var d, c = a ? c :this;
return "align" !== c.prop ? (d = c.elem, d.attr ? d.attr(c.prop, "cur" === b ? t :c.now) :k.apply(this, arguments)) :void 0;
});
}), Ma(e, "get", function(a, b, c) {
return b.attr ? b.opacity || 0 :a.call(this, b, c);
}), e = function(a) {
var d, c = a.elem;
a.started || (d = b.init(c, c.d, c.toD), a.start = d[0], a.end = d[1], a.started = !0), 
c.attr("d", b.step(a.start, a.end, a.pos, c.toD));
}, f ? g.d = {
set:e
} :d.d = e, this.each = Array.prototype.forEach ? function(a, b) {
return Array.prototype.forEach.call(a, b);
} :function(a, b) {
for (var c = 0, d = a.length; d > c; c++) if (b.call(a[c], a[c], c, a) === !1) return c;
}, a.fn.highcharts = function() {
var c, d, a = "Chart", b = arguments;
return this[0] && (Fa(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1)), 
c = b[0], c !== t && (c.chart = c.chart || {}, c.chart.renderTo = this[0], new R[a](c, b[1]), 
d = this), c === t && (d = V[H(this[0], "data-highcharts-chart")])), d;
};
},
getScript:a.getScript,
inArray:a.inArray,
adapterRun:function(b, c) {
return a(b)[c]();
},
grep:a.grep,
map:function(a, c) {
for (var d = [], e = 0, f = a.length; f > e; e++) d[e] = c.call(a[e], a[e], e, a);
return d;
},
offset:function(b) {
return a(b).offset();
},
addEvent:function(b, c, d) {
a(b).bind(c, d);
},
removeEvent:function(b, c, d) {
var e = y.removeEventListener ? "removeEventListener" :"detachEvent";
y[e] && b && !b[e] && (b[e] = function() {}), a(b).unbind(c, d);
},
fireEvent:function(b, c, d, e) {
var h, f = a.Event(c), g = "detached" + c;
!Aa && d && (delete d.layerX, delete d.layerY, delete d.returnValue), q(f, d), b[c] && (b[g] = b[c], 
b[c] = null), a.each([ "preventDefault", "stopPropagation" ], function(a, b) {
var c = f[b];
f[b] = function() {
try {
c.call(f);
} catch (a) {
"preventDefault" === b && (h = !0);
}
};
}), a(b).trigger(f), b[g] && (b[c] = b[g], b[g] = null), e && !f.isDefaultPrevented() && !h && e(f);
},
washMouseEvent:function(a) {
var c = a.originalEvent || a;
return c.pageX === t && (c.pageX = a.pageX, c.pageY = a.pageY), c;
},
animate:function(b, c, d) {
var e = a(b);
b.style || (b.style = {}), c.d && (b.toD = c.d, c.d = 1), e.stop(), c.opacity !== t && b.attr && (c.opacity += "px"), 
e.animate(c, d);
},
stop:function(b) {
a(b).stop();
}
};
}(I.jQuery);
var S = I.HighchartsAdapter, N = S || {};
S && S.init.call(S, ub);
var jb = N.adapterRun, Qb = N.getScript, Da = N.inArray, p = N.each, vb = N.grep, Rb = N.offset, Ua = N.map, K = N.addEvent, W = N.removeEvent, D = N.fireEvent, Sb = N.washMouseEvent, kb = N.animate, bb = N.stop, N = {
enabled:!0,
x:0,
y:15,
style:{
color:"#606060",
cursor:"default",
fontSize:"11px"
}
};
E = {
colors:"#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),
symbols:[ "circle", "diamond", "square", "triangle", "triangle-down" ],
lang:{
loading:"Loading...",
months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),
shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
decimalPoint:".",
numericSymbols:"k,M,G,T,P,E".split(","),
resetZoom:"Reset zoom",
resetZoomTitle:"Reset zoom level 1:1",
thousandsSep:","
},
global:{
useUTC:!0,
canvasToolsURL:"http://code.highcharts.com/4.0.1/modules/canvas-tools.js",
VMLRadialGradientURL:"http://code.highcharts.com/4.0.1/gfx/vml-radial-gradient.png"
},
chart:{
borderColor:"#4572A7",
borderRadius:0,
defaultSeriesType:"line",
ignoreHiddenSeries:!0,
spacing:[ 10, 10, 15, 10 ],
backgroundColor:"#FFFFFF",
plotBorderColor:"#C0C0C0",
resetZoomButton:{
theme:{
zIndex:20
},
position:{
align:"right",
x:-10,
y:10
}
}
},
title:{
text:"Chart title",
align:"center",
margin:15,
style:{
color:"#333333",
fontSize:"18px"
}
},
subtitle:{
text:"",
align:"center",
style:{
color:"#555555"
}
},
plotOptions:{
line:{
allowPointSelect:!1,
showCheckbox:!1,
animation:{
duration:1e3
},
events:{},
lineWidth:2,
marker:{
lineWidth:0,
radius:4,
lineColor:"#FFFFFF",
states:{
hover:{
enabled:!0
},
select:{
fillColor:"#FFFFFF",
lineColor:"#000000",
lineWidth:2
}
}
},
point:{
events:{}
},
dataLabels:w(N, {
align:"center",
enabled:!1,
formatter:function() {
return null === this.y ? "" :Ga(this.y, -1);
},
verticalAlign:"bottom",
y:0
}),
cropThreshold:300,
pointRange:0,
states:{
hover:{
marker:{},
halo:{
size:10,
opacity:.25
}
},
select:{
marker:{}
}
},
stickyTracking:!0,
turboThreshold:1e3
}
},
labels:{
style:{
position:"absolute",
color:"#3E576F"
}
},
legend:{
enabled:!0,
align:"center",
layout:"horizontal",
labelFormatter:function() {
return this.name;
},
borderColor:"#909090",
borderRadius:0,
navigation:{
activeColor:"#274b6d",
inactiveColor:"#CCC"
},
shadow:!1,
itemStyle:{
color:"#333333",
fontSize:"12px",
fontWeight:"bold"
},
itemHoverStyle:{
color:"#000"
},
itemHiddenStyle:{
color:"#CCC"
},
itemCheckboxStyle:{
position:"absolute",
width:"13px",
height:"13px"
},
symbolPadding:5,
verticalAlign:"bottom",
x:0,
y:0,
title:{
style:{
fontWeight:"bold"
}
}
},
loading:{
labelStyle:{
fontWeight:"bold",
position:"relative",
top:"1em"
},
style:{
position:"absolute",
backgroundColor:"white",
opacity:.5,
textAlign:"center"
}
},
tooltip:{
enabled:!0,
animation:aa,
backgroundColor:"rgba(249, 249, 249, .85)",
borderWidth:1,
borderRadius:3,
dateTimeLabelFormats:{
millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",
minute:"%A, %b %e, %H:%M",
hour:"%A, %b %e, %H:%M",
day:"%A, %b %e, %Y",
week:"Week from %A, %b %e, %Y",
month:"%B %Y",
year:"%Y"
},
headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',
pointFormat:'<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
shadow:!0,
snap:Jb ? 25 :10,
style:{
color:"#333333",
cursor:"default",
fontSize:"12px",
padding:"8px",
whiteSpace:"nowrap"
}
},
credits:{
enabled:!0,
text:"Highcharts.com",
href:"http://www.highcharts.com",
position:{
align:"right",
x:-10,
verticalAlign:"bottom",
y:-5
},
style:{
cursor:"pointer",
color:"#909090",
fontSize:"9px"
}
}
};
var ba = E.plotOptions, S = ba.line;
Cb();
var Tb = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, Ub = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, Vb = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, ya = function(a) {
var c, d, b = [];
return function(a) {
a && a.stops ? d = Ua(a.stops, function(a) {
return ya(a[1]);
}) :(c = Tb.exec(a)) ? b = [ z(c[1]), z(c[2]), z(c[3]), parseFloat(c[4], 10) ] :(c = Ub.exec(a)) ? b = [ z(c[1], 16), z(c[2], 16), z(c[3], 16), 1 ] :(c = Vb.exec(a)) && (b = [ z(c[1]), z(c[2]), z(c[3]), 1 ]);
}(a), {
get:function(c) {
var f;
return d ? (f = w(a), f.stops = [].concat(f.stops), p(d, function(a, b) {
f.stops[b] = [ f.stops[b][0], a.get(c) ];
})) :f = b && !isNaN(b[0]) ? "rgb" === c ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" :"a" === c ? b[3] :"rgba(" + b.join(",") + ")" :a, 
f;
},
brighten:function(a) {
if (d) p(d, function(b) {
b.brighten(a);
}); else if (ha(a) && 0 !== a) {
var c;
for (c = 0; 3 > c; c++) b[c] += z(255 * a), b[c] < 0 && (b[c] = 0), b[c] > 255 && (b[c] = 255);
}
return this;
},
rgba:b,
setOpacity:function(a) {
return b[3] = a, this;
}
};
};
P.prototype = {
init:function(a, b) {
this.element = "span" === b ? Y(b) :y.createElementNS(xa, b), this.renderer = a;
},
opacity:1,
animate:function(a, b, c) {
b = m(b, va, !0), bb(this), b ? (b = w(b, {}), c && (b.complete = c), kb(this, a, b)) :(this.attr(a), 
c && c());
},
colorGradient:function(a, b, c) {
var e, f, g, h, i, j, k, l, o, n, d = this.renderer, s = [];
if (a.linearGradient ? f = "linearGradient" :a.radialGradient && (f = "radialGradient"), 
f) {
g = a[f], h = d.gradients, j = a.stops, o = c.radialReference, La(g) && (a[f] = g = {
x1:g[0],
y1:g[1],
x2:g[2],
y2:g[3],
gradientUnits:"userSpaceOnUse"
}), "radialGradient" === f && o && !r(g.gradientUnits) && (g = w(g, {
cx:o[0] - o[2] / 2 + g.cx * o[2],
cy:o[1] - o[2] / 2 + g.cy * o[2],
r:g.r * o[2],
gradientUnits:"userSpaceOnUse"
}));
for (n in g) "id" !== n && s.push(n, g[n]);
for (n in j) s.push(j[n]);
s = s.join(","), h[s] ? a = h[s].attr("id") :(g.id = a = "highcharts-" + tb++, h[s] = i = d.createElement(f).attr(g).add(d.defs), 
i.stops = [], p(j, function(a) {
0 === a[1].indexOf("rgba") ? (e = ya(a[1]), k = e.get("rgb"), l = e.get("a")) :(k = a[1], 
l = 1), a = d.createElement("stop").attr({
offset:a[0],
"stop-color":k,
"stop-opacity":l
}).add(i), i.stops.push(a);
})), c.setAttribute(b, "url(" + d.url + "#" + a + ")");
}
},
attr:function(a, b) {
var c, d, f, h, e = this.element, g = this;
if ("string" == typeof a && b !== t && (c = a, a = {}, a[c] = b), "string" == typeof a) g = (this[a + "Getter"] || this._defaultGetter).call(this, a, e); else {
for (c in a) d = a[c], h = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (f || (this.symbolAttr(a), 
f = !0), h = !0), !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0), 
h || (this[c + "Setter"] || this._defaultSetter).call(this, d, c, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, d);
this.doTransform && (this.updateTransform(), this.doTransform = !1);
}
return g;
},
updateShadows:function(a, b) {
for (var c = this.shadows, d = c.length; d--; ) c[d].setAttribute(a, "height" === a ? v(b - (c[d].cutHeight || 0), 0) :"d" === a ? this.d :b);
},
addClass:function(a) {
var b = this.element, c = H(b, "class") || "";
return -1 === c.indexOf(a) && H(b, "class", c + " " + a), this;
},
symbolAttr:function(a) {
var b = this;
p("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(c) {
b[c] = m(a[c], b[c]);
}), b.attr({
d:b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
});
},
clip:function(a) {
return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" :Q);
},
crisp:function(a) {
var b, d, c = {}, e = a.strokeWidth || this.strokeWidth || this.attr && this.attr("stroke-width") || 0;
d = u(e) % 2 / 2, a.x = T(a.x || this.x || 0) + d, a.y = T(a.y || this.y || 0) + d, 
a.width = T((a.width || this.width || 0) - 2 * d), a.height = T((a.height || this.height || 0) - 2 * d), 
a.strokeWidth = e;
for (b in a) this[b] !== a[b] && (this[b] = c[b] = a[b]);
return c;
},
css:function(a) {
var e, f, b = this.styles, c = {}, d = this.element, g = "";
if (e = !b, a && a.color && (a.fill = a.color), b) for (f in a) a[f] !== b[f] && (c[f] = a[f], 
e = !0);
if (e) {
if (e = this.textWidth = a && a.width && "text" === d.nodeName.toLowerCase() && z(a.width), 
b && (a = q(b, c)), this.styles = a, e && (fa || !aa && this.renderer.forExport) && delete a.width, 
Aa && !aa) G(this.element, a); else {
b = function(a, b) {
return "-" + b.toLowerCase();
};
for (f in a) g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
H(d, "style", g);
}
e && this.added && this.renderer.buildText(this);
}
return this;
},
on:function(a, b) {
var c = this, d = c.element;
return $a && "click" === a ? (d.ontouchstart = function(a) {
c.touchEventFired = Date.now(), a.preventDefault(), b.call(d, a);
}, d.onclick = function(a) {
(-1 === wa.indexOf("Android") || Date.now() - (c.touchEventFired || 0) > 1100) && b.call(d, a);
}) :d["on" + a] = b, this;
},
setRadialReference:function(a) {
return this.element.radialReference = a, this;
},
translate:function(a, b) {
return this.attr({
translateX:a,
translateY:b
});
},
invert:function() {
return this.inverted = !0, this.updateTransform(), this;
},
updateTransform:function() {
var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, d = this.scaleY, e = this.inverted, f = this.rotation, g = this.element;
e && (a += this.attr("width"), b += this.attr("height")), a = [ "translate(" + a + "," + b + ")" ], 
e ? a.push("rotate(90) scale(-1,1)") :f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")"), 
(r(c) || r(d)) && a.push("scale(" + m(c, 1) + " " + m(d, 1) + ")"), a.length && g.setAttribute("transform", a.join(" "));
},
toFront:function() {
var a = this.element;
return a.parentNode.appendChild(a), this;
},
align:function(a, b, c) {
var d, e, f, g, h = {};
return e = this.renderer, f = e.alignedObjects, a ? (this.alignOptions = a, this.alignByTranslate = b, 
(!c || Fa(c)) && (this.alignTo = d = c || "renderer", ja(f, this), f.push(this), 
c = null)) :(a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo), 
c = m(c, e[d], e), d = a.align, e = a.verticalAlign, f = (c.x || 0) + (a.x || 0), 
g = (c.y || 0) + (a.y || 0), ("right" === d || "center" === d) && (f += (c.width - (a.width || 0)) / {
right:1,
center:2
}[d]), h[b ? "translateX" :"x"] = u(f), ("bottom" === e || "middle" === e) && (g += (c.height - (a.height || 0)) / ({
bottom:1,
middle:2
}[e] || 1)), h[b ? "translateY" :"y"] = u(g), this[this.placed ? "animate" :"attr"](h), 
this.placed = !0, this.alignAttr = h, this;
},
getBBox:function() {
var c, d, a = this.bBox, b = this.renderer, e = this.rotation;
c = this.element;
var f = this.styles, g = e * Ca;
d = this.textStr;
var h;
if (("" === d || Ob.test(d)) && (h = "num." + d.toString().length + (f ? "|" + f.fontSize + "|" + f.fontFamily :"")), 
h && (a = b.cache[h]), !a) {
if (c.namespaceURI === xa || b.forExport) {
try {
a = c.getBBox ? q({}, c.getBBox()) :{
width:c.offsetWidth,
height:c.offsetHeight
};
} catch (i) {}
(!a || a.width < 0) && (a = {
width:0,
height:0
});
} else a = this.htmlGetBBox();
b.isSVG && (c = a.width, d = a.height, Aa && f && "11px" === f.fontSize && "16.9" === d.toPrecision(3) && (a.height = d = 14), 
e && (a.width = M(d * ea(g)) + M(c * Z(g)), a.height = M(d * Z(g)) + M(c * ea(g)))), 
this.bBox = a, h && (b.cache[h] = a);
}
return a;
},
show:function(a) {
return a && this.element.namespaceURI === xa ? (this.element.removeAttribute("visibility"), 
this) :this.attr({
visibility:a ? "inherit" :"visible"
});
},
hide:function() {
return this.attr({
visibility:"hidden"
});
},
fadeOut:function(a) {
var b = this;
b.animate({
opacity:0
}, {
duration:a || 150,
complete:function() {
b.hide();
}
});
},
add:function(a) {
var g, h, b = this.renderer, c = a || b, d = c.element || b.box, e = this.element, f = this.zIndex;
if (a && (this.parentGroup = a), this.parentInverted = a && a.inverted, void 0 !== this.textStr && b.buildText(this), 
f && (c.handleZ = !0, f = z(f)), c.handleZ) for (a = d.childNodes, g = 0; g < a.length; g++) if (b = a[g], 
c = H(b, "zIndex"), b !== e && (z(c) > f || !r(f) && r(c))) {
d.insertBefore(e, b), h = !0;
break;
}
return h || d.appendChild(e), this.added = !0, this.onAdd && this.onAdd(), this;
},
safeRemoveChild:function(a) {
var b = a.parentNode;
b && b.removeChild(a);
},
destroy:function() {
var e, f, a = this, b = a.element || {}, c = a.shadows, d = a.renderer.isSVG && "SPAN" === b.nodeName && a.parentGroup;
if (b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null, bb(a), 
a.clipPath && (a.clipPath = a.clipPath.destroy()), a.stops) {
for (f = 0; f < a.stops.length; f++) a.stops[f] = a.stops[f].destroy();
a.stops = null;
}
for (a.safeRemoveChild(b), c && p(c, function(b) {
a.safeRemoveChild(b);
}); d && 0 === d.div.childNodes.length; ) b = d.parentGroup, a.safeRemoveChild(d.div), 
delete d.div, d = b;
a.alignTo && ja(a.renderer.alignedObjects, a);
for (e in a) delete a[e];
return null;
},
shadow:function(a, b, c) {
var e, f, h, i, j, k, d = [], g = this.element;
if (a) {
for (i = m(a.width, 3), j = (a.opacity || .15) / i, k = this.parentInverted ? "(-1,-1)" :"(" + m(a.offsetX, 1) + ", " + m(a.offsetY, 1) + ")", 
e = 1; i >= e; e++) f = g.cloneNode(0), h = 2 * i + 1 - 2 * e, H(f, {
isShadow:"true",
stroke:a.color || "black",
"stroke-opacity":j * e,
"stroke-width":h,
transform:"translate" + k,
fill:Q
}), c && (H(f, "height", v(H(f, "height") - h, 0)), f.cutHeight = h), b ? b.element.appendChild(f) :g.parentNode.insertBefore(f, g), 
d.push(f);
this.shadows = d;
}
return this;
},
xGetter:function(a) {
return "circle" === this.element.nodeName && (a = {
x:"cx",
y:"cy"
}[a] || a), this._defaultGetter(a);
},
_defaultGetter:function(a) {
return a = m(this[a], this.element ? this.element.getAttribute(a) :null, 0), /^[0-9\.]+$/.test(a) && (a = parseFloat(a)), 
a;
},
dSetter:function(a, b, c) {
a && a.join && (a = a.join(" ")), /(NaN| {2}|^$)/.test(a) && (a = "M 0 0"), c.setAttribute(b, a), 
this[b] = a;
},
dashstyleSetter:function(a) {
var b;
if (a = a && a.toLowerCase()) {
for (a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), 
b = a.length; b--; ) a[b] = z(a[b]) * this.element.getAttribute("stroke-width");
a = a.join(","), this.element.setAttribute("stroke-dasharray", a);
}
},
alignSetter:function(a) {
this.element.setAttribute("text-anchor", {
left:"start",
center:"middle",
right:"end"
}[a]);
},
opacitySetter:function(a, b, c) {
this[b] = a, c.setAttribute(b, a);
},
"stroke-widthSetter":function(a, b, c) {
0 === a && (a = 1e-5), this.strokeWidth = a, c.setAttribute(b, a);
},
titleSetter:function(a) {
var b = this.element.getElementsByTagName("title")[0];
b || (b = y.createElementNS(xa, "title"), this.element.appendChild(b)), b.textContent = a;
},
textSetter:function(a) {
a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this));
},
fillSetter:function(a, b, c) {
"string" == typeof a ? c.setAttribute(b, a) :a && this.colorGradient(a, b, c);
},
zIndexSetter:function(a, b, c) {
c.setAttribute(b, a), this[b] = a;
},
_defaultSetter:function(a, b, c) {
c.setAttribute(b, a);
}
}, P.prototype.yGetter = P.prototype.xGetter, P.prototype.translateXSetter = P.prototype.translateYSetter = P.prototype.rotationSetter = P.prototype.verticalAlignSetter = P.prototype.scaleXSetter = P.prototype.scaleYSetter = function(a, b) {
this[b] = a, this.doTransform = !0;
}, P.prototype.strokeSetter = P.prototype.fillSetter;
var ta = function() {
this.init.apply(this, arguments);
};
ta.prototype = {
Element:P,
init:function(a, b, c, d, e) {
var g, f = location, d = this.createElement("svg").attr({
version:"1.1"
}).css(this.getStyle(d));
g = d.element, a.appendChild(g), -1 === a.innerHTML.indexOf("xmlns") && H(g, "xmlns", xa), 
this.isSVG = !0, this.box = g, this.boxWrapper = d, this.alignedObjects = [], this.url = (Ta || ib) && y.getElementsByTagName("base").length ? f.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") :"", 
this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highcharts 4.0.1")), 
this.defs = this.createElement("defs").add(), this.forExport = e, this.gradients = {}, 
this.cache = {}, this.setSize(b, c, !1);
var h;
Ta && a.getBoundingClientRect && (this.subPixelFix = b = function() {
G(a, {
left:0,
top:0
}), h = a.getBoundingClientRect(), G(a, {
left:Ka(h.left) - h.left + "px",
top:Ka(h.top) - h.top + "px"
});
}, b(), K(I, "resize", b));
},
getStyle:function(a) {
return this.style = q({
fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
fontSize:"12px"
}, a);
},
isHidden:function() {
return !this.boxWrapper.getBBox().width;
},
destroy:function() {
var a = this.defs;
return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), Oa(this.gradients || {}), 
this.gradients = null, a && (this.defs = a.destroy()), this.subPixelFix && W(I, "resize", this.subPixelFix), 
this.alignedObjects = null;
},
createElement:function(a) {
var b = new this.Element();
return b.init(this, a), b;
},
draw:function() {},
buildText:function(a) {
for (var h, i, b = a.element, c = this, d = c.forExport, e = m(a.textStr, "").toString(), f = -1 !== e.indexOf("<"), g = b.childNodes, j = H(b, "x"), k = a.styles, l = a.textWidth, o = k && k.lineHeight, n = g.length, s = function(a) {
return o ? z(o) :c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize :k && k.fontSize || c.style.fontSize || 12).h;
}; n--; ) b.removeChild(g[n]);
f || -1 !== e.indexOf(" ") ? (h = /<.*style="([^"]+)".*>/, i = /<.*href="(http[^"]+)".*>/, 
l && !a.added && this.box.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) :[ e ], 
"" === e[e.length - 1] && e.pop(), p(e, function(e, f) {
var g, n = 0, e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
g = e.split("|||"), p(g, function(e) {
if ("" !== e || 1 === g.length) {
var p, o = {}, m = y.createElementNS(xa, "tspan");
if (h.test(e) && (p = e.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), H(m, "style", p)), 
i.test(e) && !d && (H(m, "onclick", 'location.href="' + e.match(i)[1] + '"'), G(m, {
cursor:"pointer"
})), e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), 
" " !== e && (m.appendChild(y.createTextNode(e)), n ? o.dx = 0 :f && null !== j && (o.x = j), 
H(m, o), !n && f && (!aa && d && G(m, {
display:"block"
}), H(m, "dy", s(m), ib && m.offsetHeight)), b.appendChild(m), n++, l)) for (var $, r, e = e.replace(/([^\^])-/g, "$1- ").split(" "), o = e.length > 1 && "nowrap" !== k.whiteSpace, B = a._clipHeight, q = [], v = s(), t = 1; o && (e.length || q.length); ) delete a.bBox, 
$ = a.getBBox(), r = $.width, !aa && c.forExport && (r = c.measureSpanWidth(m.firstChild.data, a.styles)), 
$ = r > l, $ && 1 !== e.length ? (m.removeChild(m.firstChild), q.unshift(e.pop())) :(e = q, 
q = [], e.length && (t++, B && t * v > B ? (e = [ "..." ], a.attr("title", a.textStr)) :(m = y.createElementNS(xa, "tspan"), 
H(m, {
dy:v,
x:j
}), p && H(m, "style", p), b.appendChild(m), r > l && (l = r)))), e.length && m.appendChild(y.createTextNode(e.join(" ").replace(/- /g, "-")));
}
});
})) :b.appendChild(y.createTextNode(e));
},
button:function(a, b, c, d, e, f, g, h, i) {
var l, o, n, s, m, p, j = this.label(a, b, c, i, null, null, null, null, "button"), k = 0, a = {
x1:0,
y1:0,
x2:0,
y2:1
}, e = w({
"stroke-width":1,
stroke:"#CCCCCC",
fill:{
linearGradient:a,
stops:[ [ 0, "#FEFEFE" ], [ 1, "#F6F6F6" ] ]
},
r:2,
padding:5,
style:{
color:"black"
}
}, e);
return n = e.style, delete e.style, f = w(e, {
stroke:"#68A",
fill:{
linearGradient:a,
stops:[ [ 0, "#FFF" ], [ 1, "#ACF" ] ]
}
}, f), s = f.style, delete f.style, g = w(e, {
stroke:"#68A",
fill:{
linearGradient:a,
stops:[ [ 0, "#9BD" ], [ 1, "#CDF" ] ]
}
}, g), m = g.style, delete g.style, h = w(e, {
style:{
color:"#CCC"
}
}, h), p = h.style, delete h.style, K(j.element, Aa ? "mouseover" :"mouseenter", function() {
3 !== k && j.attr(f).css(s);
}), K(j.element, Aa ? "mouseout" :"mouseleave", function() {
3 !== k && (l = [ e, f, g ][k], o = [ n, s, m ][k], j.attr(l).css(o));
}), j.setState = function(a) {
(j.state = k = a) ? 2 === a ? j.attr(g).css(m) :3 === a && j.attr(h).css(p) :j.attr(e).css(n);
}, j.on("click", function() {
3 !== k && d.call(j);
}).attr(e).css(q({
cursor:"default"
}, n));
},
crispLine:function(a, b) {
return a[1] === a[4] && (a[1] = a[4] = u(a[1]) - b % 2 / 2), a[2] === a[5] && (a[2] = a[5] = u(a[2]) + b % 2 / 2), 
a;
},
path:function(a) {
var b = {
fill:Q
};
return La(a) ? b.d = a :ca(a) && q(b, a), this.createElement("path").attr(b);
},
circle:function(a, b, c) {
return a = ca(a) ? a :{
x:a,
y:b,
r:c
}, b = this.createElement("circle"), b.xSetter = function(a) {
this.element.setAttribute("cx", a);
}, b.ySetter = function(a) {
this.element.setAttribute("cy", a);
}, b.attr(a);
},
arc:function(a, b, c, d, e, f) {
return ca(a) && (b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x), 
a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {
innerR:d || 0,
start:e || 0,
end:f || 0
}), a.r = c, a;
},
rect:function(a, b, c, d, e, f) {
var e = ca(a) ? a.r :e, g = this.createElement("rect"), a = ca(a) ? a :a === t ? {} :{
x:a,
y:b,
width:v(c, 0),
height:v(d, 0)
};
return f !== t && (a.strokeWidth = f, a = g.crisp(a)), e && (a.r = e), g.rSetter = function(a) {
H(this.element, {
rx:a,
ry:a
});
}, g.attr(a);
},
setSize:function(a, b, c) {
var d = this.alignedObjects, e = d.length;
for (this.width = a, this.height = b, this.boxWrapper[m(c, !0) ? "animate" :"attr"]({
width:a,
height:b
}); e--; ) d[e].align();
},
g:function(a) {
var b = this.createElement("g");
return r(a) ? b.attr({
"class":"highcharts-" + a
}) :b;
},
image:function(a, b, c, d, e) {
var f = {
preserveAspectRatio:Q
};
return arguments.length > 1 && q(f, {
x:b,
y:c,
width:d,
height:e
}), f = this.createElement("image").attr(f), f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) :f.element.setAttribute("hc-svg-href", a), 
f;
},
symbol:function(a, b, c, d, e, f) {
var g, j, k, h = this.symbols[a], h = h && h(u(b), u(c), d, e, f), i = /^url\((.*?)\)$/;
return h ? (g = this.path(h), q(g, {
symbolName:a,
x:b,
y:c,
width:d,
height:e
}), f && q(g, f)) :i.test(a) && (k = function(a, b) {
a.element && (a.attr({
width:b[0],
height:b[1]
}), a.alignByTranslate || a.translate(u((d - b[0]) / 2), u((e - b[1]) / 2)));
}, j = a.match(i)[1], a = Kb[j], g = this.image(j).attr({
x:b,
y:c
}), g.isImg = !0, a ? k(g, a) :(g.attr({
width:0,
height:0
}), Y("img", {
onload:function() {
k(g, Kb[j] = [ this.width, this.height ]);
},
src:j
}))), g;
},
symbols:{
circle:function(a, b, c, d) {
var e = .166 * c;
return [ "M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z" ];
},
square:function(a, b, c, d) {
return [ "M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z" ];
},
triangle:function(a, b, c, d) {
return [ "M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z" ];
},
"triangle-down":function(a, b, c, d) {
return [ "M", a, b, "L", a + c, b, a + c / 2, b + d, "Z" ];
},
diamond:function(a, b, c, d) {
return [ "M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z" ];
},
arc:function(a, b, c, d, e) {
var f = e.start, c = e.r || c || d, g = e.end - .001, d = e.innerR, h = e.open, i = Z(f), j = ea(f), k = Z(g), g = ea(g), e = e.end - f < ma ? 0 :1;
return [ "M", a + c * i, b + c * j, "A", c, c, 0, e, 1, a + c * k, b + c * g, h ? "M" :"L", a + d * k, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * j, h ? "" :"Z" ];
},
callout:function(a, b, c, d, e) {
var f = C(e && e.r || 0, c, d), g = f + 6, h = e && e.anchorX, i = e && e.anchorY, e = u(e.strokeWidth || 0) % 2 / 2;
return a += e, b += e, e = [ "M", a + f, b, "L", a + c - f, b, "C", a + c, b, a + c, b, a + c, b + f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b ], 
h && h > c && i > b + g && b + d - g > i ? e.splice(13, 3, "L", a + c, i - 6, a + c + 6, i, a + c, i + 6, a + c, b + d - f) :h && 0 > h && i > b + g && b + d - g > i ? e.splice(33, 3, "L", a, i + 6, a - 6, i, a, i - 6, a, b + f) :i && i > d && h > a + g && a + c - g > h ? e.splice(23, 3, "L", h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) :i && 0 > i && h > a + g && a + c - g > h && e.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, c - f, b), 
e;
}
},
clipRect:function(a, b, c, d) {
var e = "highcharts-" + tb++, f = this.createElement("clipPath").attr({
id:e
}).add(this.defs), a = this.rect(a, b, c, d, 0).add(f);
return a.id = e, a.clipPath = f, a;
},
text:function(a, b, c, d) {
var e = fa || !aa && this.forExport, f = {};
return d && !this.forExport ? this.html(a, b, c) :(f.x = Math.round(b || 0), c && (f.y = Math.round(c)), 
(a || 0 === a) && (f.text = a), a = this.createElement("text").attr(f), e && a.css({
position:"absolute"
}), d || (a.xSetter = function(a, b, c) {
var e, f, d = c.childNodes;
for (f = 1; f < d.length; f++) e = d[f], e.getAttribute("x") === c.getAttribute("x") && e.setAttribute("x", a);
c.setAttribute(b, a);
}), a);
},
fontMetrics:function(a) {
var a = a || this.style.fontSize, a = /px/.test(a) ? z(a) :/em/.test(a) ? 12 * parseFloat(a) :12, a = 24 > a ? a + 4 :u(1.2 * a), b = u(.8 * a);
return {
h:a,
b:b
};
},
label:function(a, b, c, d, e, f, g, h, i) {
function j() {
var a, b;
a = s.element.style, J = (void 0 === Va || void 0 === wb || n.styles.textAlign) && s.textStr && s.getBBox(), 
n.width = (Va || J.width || 0) + 2 * x + v, n.height = (wb || J.height || 0) + 2 * x, 
na = x + o.fontMetrics(a && a.fontSize).b, z && (m || (a = u(-L * x), b = h ? -na :0, 
n.box = m = d ? o.symbol(d, a, b, n.width, n.height, B) :o.rect(a, b, n.width, n.height, 0, B[Pb]), 
m.attr("fill", Q).add(n)), m.isImg || m.attr(q({
width:u(n.width),
height:u(n.height)
}, B)), B = null);
}
function k() {
var c, a = n.styles, a = a && a.textAlign, b = v + x * (1 - L);
c = h ? 0 :na, r(Va) && J && ("center" === a || "right" === a) && (b += {
center:.5,
right:1
}[a] * (Va - J.width)), (b !== s.x || c !== s.y) && (s.attr("x", b), c !== t && s.attr("y", c)), 
s.x = b, s.y = c;
}
function l(a, b) {
m ? m.attr(a, b) :B[a] = b;
}
var m, J, Va, wb, xb, yb, na, z, o = this, n = o.g(i), s = o.text("", 0, 0, g).attr({
zIndex:1
}), L = 0, x = 3, v = 0, y = 0, B = {};
n.onAdd = function() {
s.add(n), n.attr({
text:a || "",
x:b,
y:c
}), m && r(e) && n.attr({
anchorX:e,
anchorY:f
});
}, n.widthSetter = function(a) {
Va = a;
}, n.heightSetter = function(a) {
wb = a;
}, n.paddingSetter = function(a) {
r(a) && a !== x && (x = a, k());
}, n.paddingLeftSetter = function(a) {
r(a) && a !== v && (v = a, k());
}, n.alignSetter = function(a) {
L = {
left:0,
center:.5,
right:1
}[a];
}, n.textSetter = function(a) {
a !== t && s.textSetter(a), j(), k();
}, n["stroke-widthSetter"] = function(a, b) {
a && (z = !0), y = a % 2 / 2, l(b, a);
}, n.strokeSetter = n.fillSetter = n.rSetter = function(a, b) {
"fill" === b && a && (z = !0), l(b, a);
}, n.anchorXSetter = function(a, b) {
e = a, l(b, a + y - xb);
}, n.anchorYSetter = function(a, b) {
f = a, l(b, a - yb);
}, n.xSetter = function(a) {
n.x = a, L && (a -= L * ((Va || J.width) + x)), xb = u(a), n.attr("translateX", xb);
}, n.ySetter = function(a) {
yb = n.y = u(a), n.attr("translateY", yb);
};
var A = n.css;
return q(n, {
css:function(a) {
if (a) {
var b = {}, a = w(a);
p("fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow".split(","), function(c) {
a[c] !== t && (b[c] = a[c], delete a[c]);
}), s.css(b);
}
return A.call(n, a);
},
getBBox:function() {
return {
width:J.width + 2 * x,
height:J.height + 2 * x,
x:J.x - x,
y:J.y - x
};
},
shadow:function(a) {
return m && m.shadow(a), n;
},
destroy:function() {
W(n.element, "mouseenter"), W(n.element, "mouseleave"), s && (s = s.destroy()), 
m && (m = m.destroy()), P.prototype.destroy.call(n), n = o = j = k = l = null;
}
});
}
}, Za = ta, q(P.prototype, {
htmlCss:function(a) {
var b = this.element;
return (b = a && "SPAN" === b.tagName && a.width) && (delete a.width, this.textWidth = b, 
this.updateTransform()), this.styles = q(this.styles, a), G(this.element, a), this;
},
htmlGetBBox:function() {
var a = this.element, b = this.bBox;
return b || ("text" === a.nodeName && (a.style.position = "absolute"), b = this.bBox = {
x:a.offsetLeft,
y:a.offsetTop,
width:a.offsetWidth,
height:a.offsetHeight
}), b;
},
htmlUpdateTransform:function() {
if (this.added) {
var a = this.renderer, b = this.element, c = this.translateX || 0, d = this.translateY || 0, e = this.x || 0, f = this.y || 0, g = this.textAlign || "left", h = {
left:0,
center:.5,
right:1
}[g], i = this.shadows;
if (G(b, {
marginLeft:c,
marginTop:d
}), i && p(i, function(a) {
G(a, {
marginLeft:c + 1,
marginTop:d + 1
});
}), this.inverted && p(b.childNodes, function(c) {
a.invertChild(c, b);
}), "SPAN" === b.tagName) {
var k, j = this.rotation, l = z(this.textWidth), o = [ j, g, b.innerHTML, this.textWidth ].join(",");
o !== this.cTT && (k = a.fontMetrics(b.style.fontSize).b, r(j) && this.setSpanRotation(j, h, k), 
i = m(this.elemWidth, b.offsetWidth), i > l && /[ \-]/.test(b.textContent || b.innerText) && (G(b, {
width:l + "px",
display:"block",
whiteSpace:"normal"
}), i = l), this.getSpanCorrection(i, k, h, j, g)), G(b, {
left:e + (this.xCorr || 0) + "px",
top:f + (this.yCorr || 0) + "px"
}), ib && (k = b.offsetHeight), this.cTT = o;
}
} else this.alignOnAdd = !0;
},
setSpanRotation:function(a, b, c) {
var d = {}, e = Aa ? "-ms-transform" :ib ? "-webkit-transform" :Ta ? "MozTransform" :Ib ? "-o-transform" :"";
d[e] = d.transform = "rotate(" + a + "deg)", d[e + (Ta ? "Origin" :"-origin")] = d.transformOrigin = 100 * b + "% " + c + "px", 
G(this.element, d);
},
getSpanCorrection:function(a, b, c) {
this.xCorr = -a * c, this.yCorr = -b;
}
}), q(ta.prototype, {
html:function(a, b, c) {
var d = this.createElement("span"), e = d.element, f = d.renderer;
return d.textSetter = function(a) {
a !== e.innerHTML && delete this.bBox, e.innerHTML = this.textStr = a;
}, d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function(a, b) {
"align" === b && (b = "textAlign"), d[b] = a, d.htmlUpdateTransform();
}, d.attr({
text:a,
x:u(b),
y:u(c)
}).css({
position:"absolute",
whiteSpace:"nowrap",
fontFamily:this.style.fontFamily,
fontSize:this.style.fontSize
}), d.css = d.htmlCss, f.isSVG && (d.add = function(a) {
var b, c = f.box.parentNode, j = [];
if (this.parentGroup = a) {
if (b = a.div, !b) {
for (;a; ) j.push(a), a = a.parentGroup;
p(j.reverse(), function(a) {
var d;
b = a.div = a.div || Y(Ja, {
className:H(a.element, "class")
}, {
position:"absolute",
left:(a.translateX || 0) + "px",
top:(a.translateY || 0) + "px"
}, b || c), d = b.style, q(a, {
translateXSetter:function(b, c) {
d.left = b + "px", a[c] = b, a.doTransform = !0;
},
translateYSetter:function(b, c) {
d.top = b + "px", a[c] = b, a.doTransform = !0;
},
visibilitySetter:function(a, b) {
d[b] = a;
}
});
});
}
} else b = c;
return b.appendChild(e), d.added = !0, d.alignOnAdd && d.htmlUpdateTransform(), 
d;
}), d;
}
});
var X;
if (!aa && !fa) {
R.VMLElement = X = {
init:function(a, b) {
var c = [ "<", b, ' filled="f" stroked="f"' ], d = [ "position: ", "absolute", ";" ], e = b === Ja;
("shape" === b || e) && d.push("left:0;top:0;width:1px;height:1px;"), d.push("visibility: ", e ? "hidden" :"visible"), 
c.push(' style="', d.join(""), '"/>'), b && (c = e || "span" === b || "img" === b ? c.join("") :a.prepVML(c), 
this.element = Y(c)), this.renderer = a;
},
add:function(a) {
var b = this.renderer, c = this.element, d = b.box, d = a ? a.element || a :d;
return a && a.inverted && b.invertChild(c, d), d.appendChild(c), this.added = !0, 
this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), 
this;
},
updateTransform:P.prototype.htmlUpdateTransform,
setSpanRotation:function() {
var a = this.rotation, b = Z(a * Ca), c = ea(a * Ca);
G(this.element, {
filter:a ? [ "progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')" ].join("") :Q
});
},
getSpanCorrection:function(a, b, c, d, e) {
var i, f = d ? Z(d * Ca) :1, g = d ? ea(d * Ca) :0, h = m(this.elemHeight, this.element.offsetHeight);
this.xCorr = 0 > f && -a, this.yCorr = 0 > g && -h, i = 0 > f * g, this.xCorr += g * b * (i ? 1 - c :c), 
this.yCorr -= f * b * (d ? i ? c :1 - c :1), e && "left" !== e && (this.xCorr -= a * c * (0 > f ? -1 :1), 
d && (this.yCorr -= h * c * (0 > g ? -1 :1)), G(this.element, {
textAlign:e
}));
},
pathToVML:function(a) {
for (var b = a.length, c = []; b--; ) ha(a[b]) ? c[b] = u(10 * a[b]) - 5 :"Z" === a[b] ? c[b] = "x" :(c[b] = a[b], 
!a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 :-1), 
c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 :-1)));
return c.join(" ") || "x";
},
clip:function(a) {
var c, b = this;
return a ? (c = a.members, ja(c, b), c.push(b), b.destroyClip = function() {
ja(c, b);
}, a = a.getCSS(b)) :(b.destroyClip && b.destroyClip(), a = {
clip:hb ? "inherit" :"rect(auto)"
}), b.css(a);
},
css:P.prototype.htmlCss,
safeRemoveChild:function(a) {
a.parentNode && Pa(a);
},
destroy:function() {
return this.destroyClip && this.destroyClip(), P.prototype.destroy.apply(this);
},
on:function(a, b) {
return this.element["on" + a] = function() {
var a = I.event;
a.target = a.srcElement, b(a);
}, this;
},
cutOffPath:function(a, b) {
var c, a = a.split(/[ ,]/);
return c = a.length, (9 === c || 11 === c) && (a[c - 4] = a[c - 2] = z(a[c - 2]) - 10 * b), 
a.join(" ");
},
shadow:function(a, b, c) {
var e, h, j, l, o, n, s, d = [], f = this.element, g = this.renderer, i = f.style, k = f.path;
if (k && "string" != typeof k.value && (k = "x"), o = k, a) {
for (n = m(a.width, 3), s = (a.opacity || .15) / n, e = 1; 3 >= e; e++) l = 2 * n + 1 - 2 * e, 
c && (o = this.cutOffPath(k.value, l + .5)), j = [ '<shape isShadow="true" strokeweight="', l, '" filled="false" path="', o, '" coordsize="10 10" style="', f.style.cssText, '" />' ], 
h = Y(g.prepVML(j), null, {
left:z(i.left) + m(a.offsetX, 1),
top:z(i.top) + m(a.offsetY, 1)
}), c && (h.cutOff = l + 1), j = [ '<stroke color="', a.color || "black", '" opacity="', s * e, '"/>' ], 
Y(g.prepVML(j), null, null, h), b ? b.element.appendChild(h) :f.parentNode.insertBefore(h, f), 
d.push(h);
this.shadows = d;
}
return this;
},
updateShadows:sa,
setAttr:function(a, b) {
hb ? this.element[a] = b :this.element.setAttribute(a, b);
},
classSetter:function(a) {
this.element.className = a;
},
dashstyleSetter:function(a, b, c) {
(c.getElementsByTagName("stroke")[0] || Y(this.renderer.prepVML([ "<stroke/>" ]), null, null, c))[b] = a || "solid", 
this[b] = a;
},
dSetter:function(a, b, c) {
var d = this.shadows, a = a || [];
if (this.d = a.join(" "), c.path = a = this.pathToVML(a), d) for (c = d.length; c--; ) d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) :a;
this.setAttr(b, a);
},
fillSetter:function(a, b, c) {
var d = c.nodeName;
"SPAN" === d ? c.style.color = a :"IMG" !== d && (c.filled = a !== Q, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)));
},
opacitySetter:sa,
rotationSetter:function(a, b, c) {
c = c.style, this[b] = c[b] = a, c.left = -u(ea(a * Ca) + 1) + "px", c.top = u(Z(a * Ca)) + "px";
},
strokeSetter:function(a, b, c) {
this.setAttr("strokecolor", this.renderer.color(a, c, b));
},
"stroke-widthSetter":function(a, b, c) {
c.stroked = !!a, this[b] = a, ha(a) && (a += "px"), this.setAttr("strokeweight", a);
},
titleSetter:function(a, b) {
this.setAttr(b, a);
},
visibilitySetter:function(a, b, c) {
"inherit" === a && (a = "visible"), this.shadows && p(this.shadows, function(c) {
c.style[b] = a;
}), "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" :0, hb || (c.style[b] = a ? "visible" :"hidden"), 
b = "top"), c.style[b] = a;
},
xSetter:function(a, b, c) {
this[b] = a, "x" === b ? b = "left" :"y" === b && (b = "top"), this.updateClipping ? (this[b] = a, 
this.updateClipping()) :c.style[b] = a;
},
zIndexSetter:function(a, b, c) {
c.style[b] = a;
}
}, X = ka(P, X), X.prototype.ySetter = X.prototype.widthSetter = X.prototype.heightSetter = X.prototype.xSetter;
var ga = {
Element:X,
isIE8:wa.indexOf("MSIE 8.0") > -1,
init:function(a, b, c, d) {
var e;
if (this.alignedObjects = [], d = this.createElement(Ja).css(q(this.getStyle(d), {
position:"relative"
})), e = d.element, a.appendChild(d.element), this.isVML = !0, this.box = e, this.boxWrapper = d, 
this.cache = {}, this.setSize(b, c, !1), !y.namespaces.hcv) {
y.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
try {
y.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
} catch (f) {
y.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
}
}
},
isHidden:function() {
return !this.box.offsetWidth;
},
clipRect:function(a, b, c, d) {
var e = this.createElement(), f = ca(a);
return q(e, {
members:[],
left:(f ? a.x :a) + 1,
top:(f ? a.y :b) + 1,
width:(f ? a.width :c) - 1,
height:(f ? a.height :d) - 1,
getCSS:function(a) {
var b = a.element, c = b.nodeName, a = a.inverted, d = this.top - ("shape" === c ? b.offsetTop :0), e = this.left, b = e + this.width, f = d + this.height, d = {
clip:"rect(" + u(a ? e :d) + "px," + u(a ? f :b) + "px," + u(a ? b :f) + "px," + u(a ? d :e) + "px)"
};
return !a && hb && "DIV" === c && q(d, {
width:b + "px",
height:f + "px"
}), d;
},
updateClipping:function() {
p(e.members, function(a) {
a.element && a.css(e.getCSS(a));
});
}
});
},
color:function(a, b, c, d) {
var f, h, i, e = this, g = /^rgba/, j = Q;
if (a && a.linearGradient ? i = "gradient" :a && a.radialGradient && (i = "pattern"), 
i) {
var k, l, n, s, m, J, L, r, o = a.linearGradient || a.radialGradient, x = "", a = a.stops, v = [], q = function() {
h = [ '<fill colors="' + v.join(",") + '" opacity="', m, '" o:opacity2="', s, '" type="', i, '" ', x, 'focus="100%" method="any" />' ], 
Y(e.prepVML(h), null, null, b);
};
if (n = a[0], r = a[a.length - 1], n[0] > 0 && a.unshift([ 0, n[1] ]), r[0] < 1 && a.push([ 1, r[1] ]), 
p(a, function(a, b) {
g.test(a[1]) ? (f = ya(a[1]), k = f.get("rgb"), l = f.get("a")) :(k = a[1], l = 1), 
v.push(100 * a[0] + "% " + k), b ? (m = l, J = k) :(s = l, L = k);
}), "fill" === c) if ("gradient" === i) c = o.x1 || o[0] || 0, a = o.y1 || o[1] || 0, 
n = o.x2 || o[2] || 0, o = o.y2 || o[3] || 0, x = 'angle="' + (90 - 180 * U.atan((o - a) / (n - c)) / ma) + '"', 
q(); else {
var w, j = o.r, t = 2 * j, u = 2 * j, y = o.cx, B = o.cy, na = b.radialReference, j = function() {
na && (w = d.getBBox(), y += (na[0] - w.x) / w.width - .5, B += (na[1] - w.y) / w.height - .5, 
t *= na[2] / w.width, u *= na[2] / w.height), x = 'src="' + E.global.VMLRadialGradientURL + '" size="' + t + "," + u + '" origin="0.5,0.5" position="' + y + "," + B + '" color2="' + L + '" ', 
q();
};
d.added ? j() :d.onAdd = j, j = J;
} else j = k;
} else g.test(a) && "IMG" !== b.tagName ? (f = ya(a), h = [ "<", c, ' opacity="', f.get("a"), '"/>' ], 
Y(this.prepVML(h), null, null, b), j = f.get("rgb")) :(j = b.getElementsByTagName(c), 
j.length && (j[0].opacity = 1, j[0].type = "solid"), j = a);
return j;
},
prepVML:function(a) {
var b = this.isIE8, a = a.join("");
return b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') :a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) :a = a.replace("<", "<hcv:"), 
a;
},
text:ta.prototype.html,
path:function(a) {
var b = {
coordsize:"10 10"
};
return La(a) ? b.d = a :ca(a) && q(b, a), this.createElement("shape").attr(b);
},
circle:function(a, b, c) {
var d = this.symbol("circle");
return ca(a) && (c = a.r, b = a.y, a = a.x), d.isCircle = !0, d.r = c, d.attr({
x:a,
y:b
});
},
g:function(a) {
var b;
return a && (b = {
className:"highcharts-" + a,
"class":"highcharts-" + a
}), this.createElement(Ja).attr(b);
},
image:function(a, b, c, d, e) {
var f = this.createElement("img").attr({
src:a
});
return arguments.length > 1 && f.attr({
x:b,
y:c,
width:d,
height:e
}), f;
},
createElement:function(a) {
return "rect" === a ? this.symbol(a) :ta.prototype.createElement.call(this, a);
},
invertChild:function(a, b) {
var c = this, d = b.style, e = "IMG" === a.tagName && a.style;
G(a, {
flip:"x",
left:z(d.width) - (e ? z(e.top) :1),
top:z(d.height) - (e ? z(e.left) :1),
rotation:-90
}), p(a.childNodes, function(b) {
c.invertChild(b, a);
});
},
symbols:{
arc:function(a, b, c, d, e) {
var f = e.start, g = e.end, h = e.r || c || d, c = e.innerR, d = Z(f), i = ea(f), j = Z(g), k = ea(g);
return g - f === 0 ? [ "x" ] :(f = [ "wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k ], 
e.open && !c && f.push("e", "M", a, b), f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e"), 
f.isArc = !0, f);
},
circle:function(a, b, c, d, e) {
return e && (c = d = 2 * e.r), e && e.isCircle && (a -= c / 2, b -= d / 2), [ "wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e" ];
},
rect:function(a, b, c, d, e) {
return ta.prototype.symbols[r(e) && e.r ? "callout" :"square"].call(0, a, b, c, d, e);
}
}
};
R.VMLRenderer = X = function() {
this.init.apply(this, arguments);
}, X.prototype = w(ta.prototype, ga), Za = X;
}
ta.prototype.measureSpanWidth = function(a, b) {
var d, c = y.createElement("span");
return d = y.createTextNode(a), c.appendChild(d), G(c, b), this.box.appendChild(c), 
d = c.offsetWidth, Pa(c), d;
};
var Lb;
fa && (R.CanVGRenderer = X = function() {
xa = "http://www.w3.org/1999/xhtml";
}, X.prototype.symbols = {}, Lb = function() {
function a() {
var d, a = b.length;
for (d = 0; a > d; d++) b[d]();
b = [];
}
var b = [];
return {
push:function(c, d) {
0 === b.length && Qb(d, a), b.push(c);
}
};
}(), Za = X), Sa.prototype = {
addLabel:function() {
var l, a = this.axis, b = a.options, c = a.chart, d = a.horiz, e = a.categories, f = a.names, g = this.pos, h = b.labels, i = a.tickPositions, d = d && e && !h.step && !h.staggerLines && !h.rotation && c.plotWidth / i.length || !d && (c.margin[3] || .33 * c.chartWidth), j = g === i[0], k = g === i[i.length - 1], f = e ? m(e[g], f[g], g) :g, e = this.label, o = i.info;
a.isDatetimeAxis && o && (l = b.dateTimeLabelFormats[o.higherRanks[g] || o.unitName]), 
this.isFirst = j, this.isLast = k, b = a.labelFormatter.call({
axis:a,
chart:c,
isFirst:j,
isLast:k,
dateTimeLabelFormat:l,
value:a.isLog ? da(ia(f)) :f
}), g = d && {
width:v(1, u(d - 2 * (h.padding || 10))) + "px"
}, g = q(g, h.style), r(e) ? e && e.attr({
text:b
}).css(g) :(l = {
align:a.labelAlign
}, ha(h.rotation) && (l.rotation = h.rotation), d && h.ellipsis && (l._clipHeight = a.len / i.length), 
this.label = r(b) && h.enabled ? c.renderer.text(b, 0, 0, h.useHTML).attr(l).css(g).add(a.labelGroup) :null);
},
getLabelSize:function() {
var a = this.label, b = this.axis;
return a ? a.getBBox()[b.horiz ? "height" :"width"] :0;
},
getLabelSides:function() {
var a = this.label.getBBox(), b = this.axis, c = b.horiz, d = b.options.labels, a = c ? a.width :a.height, b = c ? d.x - a * {
left:0,
center:.5,
right:1
}[b.labelAlign] :0;
return [ b, c ? a + b :a ];
},
handleOverflow:function(a, b) {
var l, o, n, c = !0, d = this.axis, e = this.isFirst, f = this.isLast, g = d.horiz ? b.x :b.y, h = d.reversed, i = d.tickPositions, j = this.getLabelSides(), k = j[0], j = j[1], s = this.label.line || 0;
if (l = d.labelEdge, o = d.justifyLabels && (e || f), l[s] === t || g + k > l[s] ? l[s] = g + j :o || (c = !1), 
o) {
l = (o = d.justifyToPlot) ? d.pos :0, o = o ? l + d.len :d.chart.chartWidth;
do a += e ? 1 :-1, n = d.ticks[i[a]]; while (i[a] && (!n || n.label.line !== s));
d = n && n.label.xy && n.label.xy.x + n.getLabelSides()[e ? 0 :1], e && !h || f && h ? l > g + k && (g = l - k, 
n && g + j > d && (c = !1)) :g + j > o && (g = o - j, n && d > g + k && (c = !1)), 
b.x = g;
}
return c;
},
getPosition:function(a, b, c, d) {
var e = this.axis, f = e.chart, g = d && f.oldChartHeight || f.chartHeight;
return {
x:a ? e.translate(b + c, null, null, d) + e.transB :e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left :0),
y:a ? g - e.bottom + e.offset - (e.opposite ? e.height :0) :g - e.translate(b + c, null, null, d) - e.transB
};
},
getLabelPosition:function(a, b, c, d, e, f, g, h) {
var i = this.axis, j = i.transA, k = i.reversed, l = i.staggerLines, o = i.chart.renderer.fontMetrics(e.style.fontSize).b, n = e.rotation, a = a + e.x - (f && d ? f * j * (k ? -1 :1) :0), b = b + e.y - (f && !d ? f * j * (k ? 1 :-1) :0);
return n && 2 === i.side && (b -= o - o * Z(n * Ca)), !r(e.y) && !n && (b += o - c.getBBox().height / 2), 
l && (c.line = g / (h || 1) % l, b += c.line * (i.labelOffset / l)), {
x:a,
y:b
};
},
getMarkPath:function(a, b, c, d, e, f) {
return f.crispLine([ "M", a, b, "L", a + (e ? 0 :-c), b + (e ? c :0) ], d);
},
render:function(a, b, c) {
var d = this.axis, e = d.options, f = d.chart.renderer, g = d.horiz, h = this.type, i = this.label, j = this.pos, k = e.labels, l = this.gridLine, o = h ? h + "Grid" :"grid", n = h ? h + "Tick" :"tick", s = e[o + "LineWidth"], p = e[o + "LineColor"], J = e[o + "LineDashStyle"], L = e[n + "Length"], o = e[n + "Width"] || 0, x = e[n + "Color"], r = e[n + "Position"], n = this.mark, v = k.step, q = !0, u = d.tickmarkOffset, w = this.getPosition(g, j, u, b), y = w.x, w = w.y, B = g && y === d.pos + d.len || !g && w === d.pos ? -1 :1;
this.isActive = !0, s && (j = d.getPlotLinePath(j + u, s * B, b, !0), l === t && (l = {
stroke:p,
"stroke-width":s
}, J && (l.dashstyle = J), h || (l.zIndex = 1), b && (l.opacity = 0), this.gridLine = l = s ? f.path(j).attr(l).add(d.gridGroup) :null), 
!b && l && j && l[this.isNew ? "attr" :"animate"]({
d:j,
opacity:c
})), o && L && ("inside" === r && (L = -L), d.opposite && (L = -L), h = this.getMarkPath(y, w, L, o * B, g, f), 
n ? n.animate({
d:h,
opacity:c
}) :this.mark = f.path(h).attr({
stroke:x,
"stroke-width":o,
opacity:c
}).add(d.axisGroup)), i && !isNaN(y) && (i.xy = w = this.getLabelPosition(y, w, i, g, k, u, a, v), 
this.isFirst && !this.isLast && !m(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !m(e.showLastLabel, 1) ? q = !1 :!d.isRadial && !k.step && !k.rotation && !b && 0 !== c && (q = this.handleOverflow(a, w)), 
v && a % v && (q = !1), q && !isNaN(w.y) ? (w.opacity = c, i[this.isNew ? "attr" :"animate"](w), 
this.isNew = !1) :i.attr("y", -9999));
},
destroy:function() {
Oa(this, this.axis);
}
}, R.PlotLineOrBand = function(a, b) {
this.axis = a, b && (this.options = b, this.id = b.id);
}, R.PlotLineOrBand.prototype = {
render:function() {
var p, a = this, b = a.axis, c = b.horiz, d = (b.pointRange || 0) / 2, e = a.options, f = e.label, g = a.label, h = e.width, i = e.to, j = e.from, k = r(j) && r(i), l = e.value, o = e.dashStyle, n = a.svgElem, s = [], J = e.color, L = e.zIndex, x = e.events, q = {}, t = b.chart.renderer;
if (b.isLog && (j = za(j), i = za(i), l = za(l)), h) s = b.getPlotLinePath(l, h), 
q = {
stroke:J,
"stroke-width":h
}, o && (q.dashstyle = o); else {
if (!k) return;
j = v(j, b.min - d), i = C(i, b.max + d), s = b.getPlotBandPath(j, i, e), J && (q.fill = J), 
e.borderWidth && (q.stroke = e.borderColor, q["stroke-width"] = e.borderWidth);
}
if (r(L) && (q.zIndex = L), n) s ? n.animate({
d:s
}, null, n.onGetPath) :(n.hide(), n.onGetPath = function() {
n.show();
}, g && (a.label = g = g.destroy())); else if (s && s.length && (a.svgElem = n = t.path(s).attr(q).add(), 
x)) for (p in d = function(b) {
n.on(b, function(c) {
x[b].apply(a, [ c ]);
});
}, x) d(p);
return f && r(f.text) && s && s.length && b.width > 0 && b.height > 0 ? (f = w({
align:c && k && "center",
x:c ? !k && 4 :10,
verticalAlign:!c && k && "middle",
y:c ? k ? 16 :10 :k ? 6 :-4,
rotation:c && !k && 90
}, f), g || (q = {
align:f.textAlign || f.align,
rotation:f.rotation
}, r(L) && (q.zIndex = L), a.label = g = t.text(f.text, 0, 0, f.useHTML).attr(q).css(f.style).add()), 
b = [ s[1], s[4], m(s[6], s[1]) ], s = [ s[2], s[5], m(s[7], s[2]) ], c = Na(b), 
k = Na(s), g.align(f, !1, {
x:c,
y:k,
width:Ba(b) - c,
height:Ba(s) - k
}), g.show()) :g && g.hide(), a;
},
destroy:function() {
ja(this.axis.plotLinesAndBands, this), delete this.axis, Oa(this);
}
}, la.prototype = {
defaultOptions:{
dateTimeLabelFormats:{
millisecond:"%H:%M:%S.%L",
second:"%H:%M:%S",
minute:"%H:%M",
hour:"%H:%M",
day:"%e. %b",
week:"%e. %b",
month:"%b '%y",
year:"%Y"
},
endOnTick:!1,
gridLineColor:"#C0C0C0",
labels:N,
lineColor:"#C0D0E0",
lineWidth:1,
minPadding:.01,
maxPadding:.01,
minorGridLineColor:"#E0E0E0",
minorGridLineWidth:1,
minorTickColor:"#A0A0A0",
minorTickLength:2,
minorTickPosition:"outside",
startOfWeek:1,
startOnTick:!1,
tickColor:"#C0D0E0",
tickLength:10,
tickmarkPlacement:"between",
tickPixelInterval:100,
tickPosition:"outside",
tickWidth:1,
title:{
align:"middle",
style:{
color:"#707070"
}
},
type:"linear"
},
defaultYAxisOptions:{
endOnTick:!0,
gridLineWidth:1,
tickPixelInterval:72,
showLastLabel:!0,
labels:{
x:-8,
y:3
},
lineWidth:0,
maxPadding:.05,
minPadding:.05,
startOnTick:!0,
tickWidth:0,
title:{
rotation:270,
text:"Values"
},
stackLabels:{
enabled:!1,
formatter:function() {
return Ga(this.total, -1);
},
style:N.style
}
},
defaultLeftAxisOptions:{
labels:{
x:-15,
y:null
},
title:{
rotation:270
}
},
defaultRightAxisOptions:{
labels:{
x:15,
y:null
},
title:{
rotation:90
}
},
defaultBottomAxisOptions:{
labels:{
x:0,
y:20
},
title:{
rotation:0
}
},
defaultTopAxisOptions:{
labels:{
x:0,
y:-15
},
title:{
rotation:0
}
},
init:function(a, b) {
var c = b.isX;
this.horiz = a.inverted ? !c :c, this.coll = (this.isXAxis = c) ? "xAxis" :"yAxis", 
this.opposite = b.opposite, this.side = b.side || (this.horiz ? this.opposite ? 0 :2 :this.opposite ? 1 :3), 
this.setOptions(b);
var d = this.options, e = d.type;
this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter, this.userOptions = b, 
this.minPixelPadding = 0, this.chart = a, this.reversed = d.reversed, this.zoomEnabled = d.zoomEnabled !== !1, 
this.categories = d.categories || "category" === e, this.names = [], this.isLog = "logarithmic" === e, 
this.isDatetimeAxis = "datetime" === e, this.isLinked = r(d.linkedTo), this.tickmarkOffset = this.categories && "between" === d.tickmarkPlacement ? .5 :0, 
this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], 
this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = d.minRange || d.maxZoom, 
this.range = d.range, this.offset = d.offset || 0, this.stacks = {}, this.oldStacks = {}, 
this.min = this.max = null, this.crosshair = m(d.crosshair, qa(a.options.tooltip.crosshairs)[c ? 0 :1], !1);
var f, d = this.options.events;
-1 === Da(this, a.axes) && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) :a.axes.push(this), 
a[this.coll].push(this)), this.series = this.series || [], a.inverted && c && this.reversed === t && (this.reversed = !0), 
this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
for (f in d) K(this, f, d[f]);
this.isLog && (this.val2lin = za, this.lin2val = ia);
},
setOptions:function(a) {
this.options = w(this.defaultOptions, this.isXAxis ? {} :this.defaultYAxisOptions, [ this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions ][this.side], w(E[this.coll], a));
},
defaultLabelFormatter:function() {
var g, a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat, e = E.lang.numericSymbols, f = e && e.length, h = a.options.labels.format, a = a.isLog ? b :a.tickInterval;
if (h) g = Ia(h, this); else if (c) g = b; else if (d) g = cb(d, b); else if (f && a >= 1e3) for (;f-- && g === t; ) c = Math.pow(1e3, f + 1), 
a >= c && null !== e[f] && (g = Ga(b / c, -1) + e[f]);
return g === t && (g = M(b) >= 1e4 ? Ga(b, 0) :Ga(b, -1, t, "")), g;
},
getSeriesExtremes:function() {
var a = this, b = a.chart;
a.hasVisibleSeries = !1, a.dataMin = a.dataMax = null, a.buildStacks && a.buildStacks(), 
p(a.series, function(c) {
if (c.visible || !b.options.chart.ignoreHiddenSeries) {
var d;
d = c.options.threshold;
var e;
a.hasVisibleSeries = !0, a.isLog && 0 >= d && (d = null), a.isXAxis ? (d = c.xData, 
d.length && (a.dataMin = C(m(a.dataMin, d[0]), Na(d)), a.dataMax = v(m(a.dataMax, d[0]), Ba(d)))) :(c.getExtremes(), 
e = c.dataMax, c = c.dataMin, r(c) && r(e) && (a.dataMin = C(m(a.dataMin, c), c), 
a.dataMax = v(m(a.dataMax, e), e)), r(d) && (a.dataMin >= d ? (a.dataMin = d, a.ignoreMinPadding = !0) :a.dataMax < d && (a.dataMax = d, 
a.ignoreMaxPadding = !0)));
}
});
},
translate:function(a, b, c, d, e, f) {
var g = 1, h = 0, i = d ? this.oldTransA :this.transA, d = d ? this.oldMin :this.min, j = this.minPixelPadding, e = (this.options.ordinal || this.isLog && e) && this.lin2val;
return i || (i = this.transA), c && (g *= -1, h = this.len), this.reversed && (g *= -1, 
h -= g * (this.sector || this.len)), b ? (a = a * g + h, a -= j, a = a / i + d, 
e && (a = this.lin2val(a))) :(e && (a = this.val2lin(a)), "between" === f && (f = .5), 
a = g * (a - d) * i + h + g * j + (ha(f) ? i * f * this.pointRange :0)), a;
},
toPixels:function(a, b) {
return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 :this.pos);
},
toValue:function(a, b) {
return this.translate(a - (b ? 0 :this.pos), !0, !this.horiz, null, !0);
},
getPlotLinePath:function(a, b, c, d, e) {
var i, j, o, f = this.chart, g = this.left, h = this.top, k = c && f.oldChartHeight || f.chartHeight, l = c && f.oldChartWidth || f.chartWidth;
return i = this.transB, e = m(e, this.translate(a, null, null, c)), a = c = u(e + i), 
i = j = u(k - e - i), isNaN(e) ? o = !0 :this.horiz ? (i = h, j = k - this.bottom, 
(g > a || a > g + this.width) && (o = !0)) :(a = g, c = l - this.right, (h > i || i > h + this.height) && (o = !0)), 
o && !d ? null :f.renderer.crispLine([ "M", a, i, "L", c, j ], b || 1);
},
getLinearTickPositions:function(a, b, c) {
var d, e = da(T(b / a) * a), f = da(Ka(c / a) * a), g = [];
if (b === c && ha(b)) return [ b ];
for (b = e; f >= b && (g.push(b), b = da(b + a), b !== d); ) d = b;
return g;
},
getMinorTickPositions:function() {
var e, a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [];
if (this.isLog) for (e = b.length, a = 1; e > a; a++) d = d.concat(this.getLogTickPositions(c, b[a - 1], b[a], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), this.min, this.max, a.startOfWeek)), 
d[0] < this.min && d.shift(); else for (b = this.min + (b[0] - this.min) % c; b <= this.max; b += c) d.push(b);
return d;
},
adjustForMinRange:function() {
var d, f, g, h, i, j, a = this.options, b = this.min, c = this.max, e = this.dataMax - this.dataMin >= this.minRange;
if (this.isXAxis && this.minRange === t && !this.isLog && (r(a.min) || r(a.max) ? this.minRange = null :(p(this.series, function(a) {
for (i = a.xData, g = j = a.xIncrement ? 1 :i.length - 1; g > 0; g--) h = i[g] - i[g - 1], 
(f === t || f > h) && (f = h);
}), this.minRange = C(5 * f, this.dataMax - this.dataMin))), c - b < this.minRange) {
var k = this.minRange;
d = (k - c + b) / 2, d = [ b - d, m(a.min, b - d) ], e && (d[2] = this.dataMin), 
b = Ba(d), c = [ b + k, m(a.max, b + k) ], e && (c[2] = this.dataMax), c = Na(c), 
k > c - b && (d[0] = c - k, d[1] = m(a.min, c - k), b = Ba(d));
}
this.min = b, this.max = c;
},
setAxisTranslation:function(a) {
var e, b = this, c = b.max - b.min, d = b.axisPointRange || 0, f = 0, g = 0, h = b.linkedParent, i = !!b.categories, j = b.transA;
(b.isXAxis || i || d) && (h ? (f = h.minPointOffset, g = h.pointRangePadding) :p(b.series, function(a) {
var h = i ? 1 :b.isXAxis ? a.pointRange :b.axisPointRange || 0, j = a.options.pointPlacement, n = a.closestPointRange;
h > c && (h = 0), d = v(d, h), f = v(f, Fa(j) ? 0 :h / 2), g = v(g, "on" === j ? 0 :h), 
!a.noSharedTooltip && r(n) && (e = r(e) ? C(e, n) :n);
}), h = b.ordinalSlope && e ? b.ordinalSlope / e :1, b.minPointOffset = f *= h, 
b.pointRangePadding = g *= h, b.pointRange = C(d, c), b.closestPointRange = e), 
a && (b.oldTransA = j), b.translationSlope = b.transA = j = b.len / (c + g || 1), 
b.transB = b.horiz ? b.left :b.bottom, b.minPixelPadding = j * f;
},
setTickPositions:function(a) {
var s, b = this, c = b.chart, d = b.options, e = b.isLog, f = b.isDatetimeAxis, g = b.isXAxis, h = b.isLinked, i = b.options.tickPositioner, j = d.maxPadding, k = d.minPadding, l = d.tickInterval, o = d.minTickInterval, n = d.tickPixelInterval, $ = b.categories;
h ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = m(c.min, c.dataMin), 
b.max = m(c.max, c.dataMax), d.type !== b.linkedParent.options.type && ra(11, 1)) :(b.min = m(b.userMin, d.min, b.dataMin), 
b.max = m(b.userMax, d.max, b.dataMax)), e && (!a && C(b.min, m(b.dataMin, b.min)) <= 0 && ra(10, 1), 
b.min = da(za(b.min)), b.max = da(za(b.max))), b.range && r(b.max) && (b.userMin = b.min = v(b.min, b.max - b.range), 
b.userMax = b.max, b.range = null), b.beforePadding && b.beforePadding(), b.adjustForMinRange(), 
$ || b.axisPointRange || b.usePercentage || h || !r(b.min) || !r(b.max) || !(c = b.max - b.min) || (r(d.min) || r(b.userMin) || !k || !(b.dataMin < 0) && b.ignoreMinPadding || (b.min -= c * k), 
r(d.max) || r(b.userMax) || !j || !(b.dataMax > 0) && b.ignoreMaxPadding || (b.max += c * j)), 
ha(d.floor) && (b.min = v(b.min, d.floor)), ha(d.ceiling) && (b.max = C(b.max, d.ceiling)), 
b.min === b.max || void 0 === b.min || void 0 === b.max ? b.tickInterval = 1 :h && !l && n === b.linkedParent.options.tickPixelInterval ? b.tickInterval = b.linkedParent.tickInterval :(b.tickInterval = m(l, $ ? 1 :(b.max - b.min) * n / v(b.len, n)), 
!r(l) && b.len < n && !this.isRadial && !this.isLog && !$ && d.startOnTick && d.endOnTick && (s = !0, 
b.tickInterval /= 4)), g && !a && p(b.series, function(a) {
a.processData(b.min !== b.oldMin || b.max !== b.oldMax);
}), b.setAxisTranslation(!0), b.beforeSetTickPositions && b.beforeSetTickPositions(), 
b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval)), 
b.pointRange && (b.tickInterval = v(b.pointRange, b.tickInterval)), !l && b.tickInterval < o && (b.tickInterval = o), 
f || e || l || (b.tickInterval = nb(b.tickInterval, null, mb(b.tickInterval), d)), 
b.minorTickInterval = "auto" === d.minorTickInterval && b.tickInterval ? b.tickInterval / 5 :d.minorTickInterval, 
b.tickPositions = a = d.tickPositions ? [].concat(d.tickPositions) :i && i.apply(b, [ b.min, b.max ]), 
a || (!b.ordinalPositions && (b.max - b.min) / b.tickInterval > v(2 * b.len, 200) && ra(19, !0), 
a = f ? b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval, d.units), b.min, b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) :e ? b.getLogTickPositions(b.tickInterval, b.min, b.max) :b.getLinearTickPositions(b.tickInterval, b.min, b.max), 
s && a.splice(1, a.length - 2), b.tickPositions = a), h || (e = a[0], f = a[a.length - 1], 
h = b.minPointOffset || 0, d.startOnTick ? b.min = e :b.min - h > e && a.shift(), 
d.endOnTick ? b.max = f :b.max + h < f && a.pop(), 1 === a.length && (d = M(b.max) > 1e13 ? 1 :.001, 
b.min -= d, b.max += d));
},
setMaxTicks:function() {
var a = this.chart, b = a.maxTicks || {}, c = this.tickPositions, d = this._maxTicksKey = [ this.coll, this.pos, this.len ].join("-");
!this.isLinked && !this.isDatetimeAxis && c && c.length > (b[d] || 0) && this.options.alignTicks !== !1 && (b[d] = c.length), 
a.maxTicks = b;
},
adjustTickAmount:function() {
var a = this._maxTicksKey, b = this.tickPositions, c = this.chart.maxTicks;
if (c && c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1 && this.min !== t) {
var d = this.tickAmount, e = b.length;
if (this.tickAmount = a = c[a], a > e) {
for (;b.length < a; ) b.push(da(b[b.length - 1] + this.tickInterval));
this.transA *= (e - 1) / (a - 1), this.max = b[b.length - 1];
}
r(d) && a !== d && (this.isDirty = !0);
}
},
setScale:function() {
var b, c, d, e, a = this.stacks;
if (this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, 
this.setAxisSize(), e = this.len !== this.oldAxisLength, p(this.series, function(a) {
(a.isDirtyData || a.isDirty || a.xAxis.isDirty) && (d = !0);
}), e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
if (!this.isXAxis) for (b in a) for (c in a[b]) a[b][c].total = null, a[b][c].cum = 0;
this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickPositions(), this.oldUserMin = this.userMin, 
this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax);
} else if (!this.isXAxis) {
this.oldStacks && (a = this.stacks = this.oldStacks);
for (b in a) for (c in a[b]) a[b][c].cum = a[b][c].total;
}
this.setMaxTicks();
},
setExtremes:function(a, b, c, d, e) {
var f = this, g = f.chart, c = m(c, !0), e = q(e, {
min:a,
max:b
});
D(f, "setExtremes", e, function() {
f.userMin = a, f.userMax = b, f.eventArgs = e, f.isDirtyExtremes = !0, c && g.redraw(d);
});
},
zoom:function(a, b) {
var c = this.dataMin, d = this.dataMax, e = this.options;
return this.allowZoomOutside || (r(c) && a <= C(c, m(e.min, c)) && (a = t), r(d) && b >= v(d, m(e.max, d)) && (b = t)), 
this.displayBtn = a !== t || b !== t, this.setExtremes(a, b, !1, t, {
trigger:"zoom"
}), !0;
},
setAxisSize:function() {
var a = this.chart, b = this.options, c = b.offsetLeft || 0, d = this.horiz, e = m(b.width, a.plotWidth - c + (b.offsetRight || 0)), f = m(b.height, a.plotHeight), g = m(b.top, a.plotTop), b = m(b.left, a.plotLeft + c), c = /%$/;
c.test(f) && (f = parseInt(f, 10) / 100 * a.plotHeight), c.test(g) && (g = parseInt(g, 10) / 100 * a.plotHeight + a.plotTop), 
this.left = b, this.top = g, this.width = e, this.height = f, this.bottom = a.chartHeight - f - g, 
this.right = a.chartWidth - e - b, this.len = v(d ? e :f, 0), this.pos = d ? b :g;
},
getExtremes:function() {
var a = this.isLog;
return {
min:a ? da(ia(this.min)) :this.min,
max:a ? da(ia(this.max)) :this.max,
dataMin:this.dataMin,
dataMax:this.dataMax,
userMin:this.userMin,
userMax:this.userMax
};
},
getThreshold:function(a) {
var b = this.isLog, c = b ? ia(this.min) :this.min, b = b ? ia(this.max) :this.max;
return c > a || null === a ? a = c :a > b && (a = b), this.translate(a, 0, 1, 0, 1);
},
autoLabelAlign:function(a) {
return a = (m(a, 0) - 90 * this.side + 720) % 360, a > 15 && 165 > a ? "right" :a > 195 && 345 > a ? "left" :"center";
},
getOffset:function() {
var j, l, q, y, z, A, B, a = this, b = a.chart, c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, h = a.side, i = b.inverted ? [ 1, 0, 3, 2 ][h] :h, k = 0, o = 0, n = d.title, s = d.labels, $ = 0, J = b.axisOffset, L = b.clipOffset, x = [ -1, 1, 1, -1 ][h], u = 1, w = m(s.maxStaggerLines, 5), na = 2 === h ? c.fontMetrics(s.style.fontSize).b :0;
if (a.hasData = j = a.hasVisibleSeries || r(a.min) && r(a.max) && !!e, a.showAxis = b = j || m(d.showEmpty, !0), 
a.staggerLines = a.horiz && s.staggerLines, a.axisGroup || (a.gridGroup = c.g("grid").attr({
zIndex:d.gridZIndex || 1
}).add(), a.axisGroup = c.g("axis").attr({
zIndex:d.zIndex || 2
}).add(), a.labelGroup = c.g("axis-labels").attr({
zIndex:s.zIndex || 7
}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels").add()), j || a.isLinked) {
if (a.labelAlign = m(s.align || a.autoLabelAlign(s.rotation)), p(e, function(b) {
f[b] ? f[b].addLabel() :f[b] = new Sa(a, b);
}), a.horiz && !a.staggerLines && w && !s.rotation) {
for (q = a.reversed ? [].concat(e).reverse() :e; w > u; ) {
for (j = [], y = !1, s = 0; s < q.length; s++) z = q[s], A = (A = f[z].label && f[z].label.getBBox()) ? A.width :0, 
B = s % u, A && (z = a.translate(z), j[B] !== t && z < j[B] && (y = !0), j[B] = z + A);
if (!y) break;
u++;
}
u > 1 && (a.staggerLines = u);
}
p(e, function(b) {
(0 === h || 2 === h || {
1:"left",
3:"right"
}[h] === a.labelAlign) && ($ = v(f[b].getLabelSize(), $));
}), a.staggerLines && ($ *= a.staggerLines, a.labelOffset = $);
} else for (q in f) f[q].destroy(), delete f[q];
n && n.text && n.enabled !== !1 && (a.axisTitle || (a.axisTitle = c.text(n.text, 0, 0, n.useHTML).attr({
zIndex:7,
rotation:n.rotation || 0,
align:n.textAlign || {
low:"left",
middle:"center",
high:"right"
}[n.align]
}).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(n.style).add(a.axisGroup), 
a.axisTitle.isNew = !0), b && (k = a.axisTitle.getBBox()[g ? "height" :"width"], 
o = m(n.margin, g ? 5 :10), l = n.offset), a.axisTitle[b ? "show" :"hide"]()), a.offset = x * m(d.offset, J[h]), 
a.axisTitleMargin = m(l, $ + o + ($ && x * d.labels[g ? "y" :"x"] - na)), J[h] = v(J[h], a.axisTitleMargin + k + x * a.offset), 
L[i] = v(L[i], 2 * T(d.lineWidth / 2));
},
getLinePath:function(a) {
var b = this.chart, c = this.opposite, d = this.offset, e = this.horiz, f = this.left + (c ? this.width :0) + d, d = b.chartHeight - this.bottom - (c ? this.height :0) + d;
return c && (a *= -1), b.renderer.crispLine([ "M", e ? this.left :f, e ? d :this.top, "L", e ? b.chartWidth - this.right :f, e ? d :b.chartHeight - this.bottom ], a);
},
getTitlePosition:function() {
var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b :c, g = this.opposite, h = this.offset, i = z(e.style.fontSize || 12), d = {
low:f + (a ? 0 :d),
middle:f + d / 2,
high:f + (a ? d :0)
}[e.align], b = (a ? c + this.height :b) + (a ? 1 :-1) * (g ? -1 :1) * this.axisTitleMargin + (2 === this.side ? i :0);
return {
x:a ? d :b + (g ? this.width :0) + h + (e.x || 0),
y:a ? b - (g ? this.height :0) + h :d + (e.y || 0)
};
},
render:function() {
var j, u, z, a = this, b = a.horiz, c = a.reversed, d = a.chart, e = d.renderer, f = a.options, g = a.isLog, h = a.isLinked, i = a.tickPositions, k = a.axisTitle, l = a.ticks, o = a.minorTicks, n = a.alternateBands, s = f.stackLabels, m = f.alternateGridColor, J = a.tickmarkOffset, L = f.lineWidth, x = d.hasRendered && r(a.oldMin) && !isNaN(a.oldMin), q = a.hasData, v = a.showAxis, w = f.labels.overflow, y = a.justifyLabels = b && w !== !1;
a.labelEdge.length = 0, a.justifyToPlot = "justify" === w, p([ l, o, n ], function(a) {
for (var b in a) a[b].isActive = !1;
}), (q || h) && (a.minorTickInterval && !a.categories && p(a.getMinorTickPositions(), function(b) {
o[b] || (o[b] = new Sa(a, b, "minor")), x && o[b].isNew && o[b].render(null, !0), 
o[b].render(null, !1, 1);
}), i.length && (j = i.slice(), (b && c || !b && !c) && j.reverse(), y && (j = j.slice(1).concat([ j[0] ])), 
p(j, function(b, c) {
y && (c = c === j.length - 1 ? 0 :c + 1), (!h || b >= a.min && b <= a.max) && (l[b] || (l[b] = new Sa(a, b)), 
x && l[b].isNew && l[b].render(c, !0, .1), l[b].render(c, !1, 1));
}), J && 0 === a.min && (l[-1] || (l[-1] = new Sa(a, -1, null, !0)), l[-1].render(-1))), 
m && p(i, function(b, c) {
c % 2 === 0 && b < a.max && (n[b] || (n[b] = new R.PlotLineOrBand(a)), u = b + J, 
z = i[c + 1] !== t ? i[c + 1] + J :a.max, n[b].options = {
from:g ? ia(u) :u,
to:g ? ia(z) :z,
color:m
}, n[b].render(), n[b].isActive = !0);
}), a._addedPlotLB || (p((f.plotLines || []).concat(f.plotBands || []), function(b) {
a.addPlotBandOrLine(b);
}), a._addedPlotLB = !0)), p([ l, o, n ], function(a) {
var b, c, e = [], f = va ? va.duration || 500 :0, g = function() {
for (c = e.length; c--; ) a[e[c]] && !a[e[c]].isActive && (a[e[c]].destroy(), delete a[e[c]]);
};
for (b in a) a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, e.push(b));
a !== n && d.hasRendered && f ? f && setTimeout(g, f) :g();
}), L && (b = a.getLinePath(L), a.axisLine ? a.axisLine.animate({
d:b
}) :a.axisLine = e.path(b).attr({
stroke:f.lineColor,
"stroke-width":L,
zIndex:7
}).add(a.axisGroup), a.axisLine[v ? "show" :"hide"]()), k && v && (k[k.isNew ? "attr" :"animate"](a.getTitlePosition()), 
k.isNew = !1), s && s.enabled && a.renderStackTotals(), a.isDirty = !1;
},
redraw:function() {
var a = this.chart.pointer;
a && a.reset(!0), this.render(), p(this.plotLinesAndBands, function(a) {
a.render();
}), p(this.series, function(a) {
a.isDirty = !0;
});
},
destroy:function(a) {
var d, b = this, c = b.stacks, e = b.plotLinesAndBands;
a || W(b);
for (d in c) Oa(c[d]), c[d] = null;
for (p([ b.ticks, b.minorTicks, b.alternateBands ], function(a) {
Oa(a);
}), a = e.length; a--; ) e[a].destroy();
p("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(a) {
b[a] && (b[a] = b[a].destroy());
}), this.cross && this.cross.destroy();
},
drawCrosshair:function(a, b) {
if (this.crosshair) if ((r(b) || !m(this.crosshair.snap, !0)) === !1) this.hideCrosshair(); else {
var c, d = this.crosshair, e = d.animation;
m(d.snap, !0) ? r(b) && (c = this.chart.inverted != this.horiz ? b.plotX :this.len - b.plotY) :c = this.horiz ? a.chartX - this.pos :this.len - a.chartY + this.pos, 
c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x :m(b.stackY, b.y)) :this.getPlotLinePath(null, null, null, null, c), 
null === c ? this.hideCrosshair() :this.cross ? this.cross.attr({
visibility:"visible"
})[e ? "animate" :"attr"]({
d:c
}, e) :(e = {
"stroke-width":d.width || 1,
stroke:d.color || "#C0C0C0",
zIndex:d.zIndex || 2
}, d.dashStyle && (e.dashstyle = d.dashStyle), this.cross = this.chart.renderer.path(c).attr(e).add());
}
},
hideCrosshair:function() {
this.cross && this.cross.hide();
}
}, q(la.prototype, {
getPlotBandPath:function(a, b) {
var c = this.getPlotLinePath(b), d = this.getPlotLinePath(a);
return d && c ? d.push(c[4], c[5], c[1], c[2]) :d = null, d;
},
addPlotBand:function(a) {
this.addPlotBandOrLine(a, "plotBands");
},
addPlotLine:function(a) {
this.addPlotBandOrLine(a, "plotLines");
},
addPlotBandOrLine:function(a, b) {
var c = new R.PlotLineOrBand(this, a).render(), d = this.userOptions;
return c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c)), 
c;
},
removePlotBandOrLine:function(a) {
for (var b = this.plotLinesAndBands, c = this.options, d = this.userOptions, e = b.length; e--; ) b[e].id === a && b[e].destroy();
p([ c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || [] ], function(b) {
for (e = b.length; e--; ) b[e].id === a && ja(b, b[e]);
});
}
}), la.prototype.getTimeTicks = function(a, b, c, d) {
var h, e = [], f = {}, g = E.global.useUTC, i = new Date(b - Ra), j = a.unitRange, k = a.count;
if (r(b)) {
j >= A.second && (i.setMilliseconds(0), i.setSeconds(j >= A.minute ? 0 :k * T(i.getSeconds() / k))), 
j >= A.minute && i[Db](j >= A.hour ? 0 :k * T(i[pb]() / k)), j >= A.hour && i[Eb](j >= A.day ? 0 :k * T(i[qb]() / k)), 
j >= A.day && i[sb](j >= A.month ? 1 :k * T(i[Xa]() / k)), j >= A.month && (i[Fb](j >= A.year ? 0 :k * T(i[fb]() / k)), 
h = i[gb]()), j >= A.year && (h -= h % k, i[Gb](h)), j === A.week && i[sb](i[Xa]() - i[rb]() + m(d, 1)), 
b = 1, Ra && (i = new Date(i.getTime() + Ra)), h = i[gb]();
for (var d = i.getTime(), l = i[fb](), o = i[Xa](), n = g ? Ra :(864e5 + 6e4 * i.getTimezoneOffset()) % 864e5; c > d; ) e.push(d), 
j === A.year ? d = eb(h + b * k, 0) :j === A.month ? d = eb(h, l + b * k) :g || j !== A.day && j !== A.week ? d += j * k :d = eb(h, l, o + b * k * (j === A.day ? 1 :7)), 
b++;
e.push(d), p(vb(e, function(a) {
return j <= A.hour && a % A.day === n;
}), function(a) {
f[a] = "day";
});
}
return e.info = q(a, {
higherRanks:f,
totalRange:j * k
}), e;
}, la.prototype.normalizeTimeTickInterval = function(a, b) {
var g, c = b || [ [ "millisecond", [ 1, 2, 5, 10, 20, 25, 50, 100, 200, 500 ] ], [ "second", [ 1, 2, 5, 10, 15, 30 ] ], [ "minute", [ 1, 2, 5, 10, 15, 30 ] ], [ "hour", [ 1, 2, 3, 4, 6, 8, 12 ] ], [ "day", [ 1, 2 ] ], [ "week", [ 1, 2 ] ], [ "month", [ 1, 2, 3, 4, 6 ] ], [ "year", null ] ], d = c[c.length - 1], e = A[d[0]], f = d[1];
for (g = 0; g < c.length && (d = c[g], e = A[d[0]], f = d[1], !(c[g + 1] && a <= (e * f[f.length - 1] + A[c[g + 1][0]]) / 2)); g++) ;
return e === A.year && 5 * e > a && (f = [ 1, 2, 5 ]), c = nb(a / e, f, "year" === d[0] ? v(mb(a / e), 1) :1), 
{
unitRange:e,
count:c,
unitName:d[0]
};
}, la.prototype.getLogTickPositions = function(a, b, c, d) {
var e = this.options, f = this.len, g = [];
if (d || (this._minorAutoInterval = null), a >= .5) a = u(a), g = this.getLinearTickPositions(a, b, c); else if (a >= .08) for (var h, i, j, k, l, f = T(b), e = a > .3 ? [ 1, 2, 4 ] :a > .15 ? [ 1, 2, 4, 6, 8 ] :[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]; c + 1 > f && !l; f++) for (i = e.length, 
h = 0; i > h && !l; h++) j = za(ia(f) * e[h]), j > b && (!d || c >= k) && g.push(k), 
k > c && (l = !0), k = j; else b = ia(b), c = ia(c), a = e[d ? "minorTickInterval" :"tickInterval"], 
a = m("auto" === a ? null :a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 :1)) / ((d ? f / this.tickPositions.length :f) || 1)), 
a = nb(a, null, mb(a)), g = Ua(this.getLinearTickPositions(a, b, c), za), d || (this._minorAutoInterval = a / 5);
return d || (this.tickInterval = a), g;
};
var Mb = R.Tooltip = function() {
this.init.apply(this, arguments);
};
Mb.prototype = {
init:function(a, b) {
var c = b.borderWidth, d = b.style, e = z(d.padding);
this.chart = a, this.options = b, this.crosshairs = [], this.now = {
x:0,
y:0
}, this.isHidden = !0, this.label = a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
padding:e,
fill:b.backgroundColor,
"stroke-width":c,
r:b.borderRadius,
zIndex:8
}).css(d).css({
padding:0
}).add().attr({
y:-9999
}), fa || this.label.shadow(b.shadow), this.shared = b.shared;
},
destroy:function() {
this.label && (this.label = this.label.destroy()), clearTimeout(this.hideTimer), 
clearTimeout(this.tooltipTimeout);
},
move:function(a, b, c, d) {
var e = this, f = e.now, g = e.options.animation !== !1 && !e.isHidden, h = e.followPointer || e.len > 1;
q(f, {
x:g ? (2 * f.x + a) / 3 :a,
y:g ? (f.y + b) / 2 :b,
anchorX:h ? t :g ? (2 * f.anchorX + c) / 3 :c,
anchorY:h ? t :g ? (f.anchorY + d) / 2 :d
}), e.label.attr(f), g && (M(a - f.x) > 1 || M(b - f.y) > 1) && (clearTimeout(this.tooltipTimeout), 
this.tooltipTimeout = setTimeout(function() {
e && e.move(a, b, c, d);
}, 32));
},
hide:function() {
var b, a = this;
clearTimeout(this.hideTimer), this.isHidden || (b = this.chart.hoverPoints, this.hideTimer = setTimeout(function() {
a.label.fadeOut(), a.isHidden = !0;
}, m(this.options.hideDelay, 500)), b && p(b, function(a) {
a.setState();
}), this.chart.hoverPoints = null);
},
getAnchor:function(a, b) {
var c, i, d = this.chart, e = d.inverted, f = d.plotTop, g = 0, h = 0, a = qa(a);
return c = a[0].tooltipPos, this.followPointer && b && (b.chartX === t && (b = d.pointer.normalize(b)), 
c = [ b.chartX - d.plotLeft, b.chartY - f ]), c || (p(a, function(a) {
i = a.series.yAxis, g += a.plotX, h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 :a.plotY) + (!e && i ? i.top - f :0);
}), g /= a.length, h /= a.length, c = [ e ? d.plotWidth - h :g, this.shared && !e && a.length > 1 && b ? b.chartY - f :e ? d.plotHeight - g :h ]), 
Ua(c, u);
},
getPosition:function(a, b, c) {
var g, d = this.chart, e = this.distance, f = {}, h = [ "y", d.chartHeight, b, c.plotY + d.plotTop ], i = [ "x", d.chartWidth, a, c.plotX + d.plotLeft ], j = c.ttBelow || d.inverted && !c.negative || !d.inverted && c.negative, k = function(a, b, c, d) {
var g = d - e > c, b = b > d + e + c, c = d - e - c;
if (d += e, j && b) f[a] = d; else if (!j && g) f[a] = c; else if (g) f[a] = c; else {
if (!b) return !1;
f[a] = d;
}
}, l = function(a, b, c, d) {
return e > d || d > b - e ? !1 :(f[a] = c / 2 > d ? 1 :d > b - c / 2 ? b - c - 2 :d - c / 2, 
void 0);
}, o = function(a) {
var b = h;
h = i, i = b, g = a;
}, n = function() {
k.apply(0, h) !== !1 ? l.apply(0, i) === !1 && !g && (o(!0), n()) :g ? f.x = f.y = 0 :(o(!0), 
n());
};
return (d.inverted || this.len > 1) && o(), n(), f;
},
defaultFormatter:function(a) {
var d, b = this.points || qa(this), c = b[0].series;
return d = [ a.tooltipHeaderFormatter(b[0]) ], p(b, function(a) {
c = a.series, d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat));
}), d.push(a.options.footerFormat || ""), d.join("");
},
refresh:function(a, b) {
var f, g, i, c = this.chart, d = this.label, e = this.options, h = {}, j = [];
i = e.formatter || this.defaultFormatter;
var k, h = c.hoverPoints, l = this.shared;
clearTimeout(this.hideTimer), this.followPointer = qa(a)[0].series.tooltipOptions.followPointer, 
g = this.getAnchor(a, b), f = g[0], g = g[1], !l || a.series && a.series.noSharedTooltip ? h = a.getLabelConfig() :(c.hoverPoints = a, 
h && p(h, function(a) {
a.setState();
}), p(a, function(a) {
a.setState("hover"), j.push(a.getLabelConfig());
}), h = {
x:a[0].category,
y:a[0].y
}, h.points = j, this.len = j.length, a = a[0]), i = i.call(h, this), h = a.series, 
this.distance = m(h.tooltipOptions.distance, 16), i === !1 ? this.hide() :(this.isHidden && (bb(d), 
d.attr("opacity", 1).show()), d.attr({
text:i
}), k = e.borderColor || a.color || h.color || "#606060", d.attr({
stroke:k
}), this.updatePosition({
plotX:f,
plotY:g,
negative:a.negative,
ttBelow:a.ttBelow
}), this.isHidden = !1), D(c, "tooltipRefresh", {
text:i,
x:f + c.plotLeft,
y:g + c.plotTop,
borderColor:k
});
},
updatePosition:function(a) {
var b = this.chart, c = this.label, c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
this.move(u(c.x), u(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop);
},
tooltipHeaderFormatter:function(a) {
var h, b = a.series, c = b.tooltipOptions, d = c.dateTimeLabelFormats, e = c.xDateFormat, f = b.xAxis, g = f && "datetime" === f.options.type && ha(a.key), c = c.headerFormat, f = f && f.closestPointRange;
if (g && !e) {
if (f) {
for (h in A) if (A[h] >= f || A[h] <= A.day && a.key % A[h] > 0) {
e = d[h];
break;
}
} else e = d.day;
e = e || d.year;
}
return g && e && (c = c.replace("{point.key}", "{point.key:" + e + "}")), Ia(c, {
point:a,
series:b
});
}
};
var oa;
$a = y.documentElement.ontouchstart !== t;
var Wa = R.Pointer = function(a, b) {
this.init(a, b);
};
if (Wa.prototype = {
init:function(a, b) {
var f, c = b.chart, d = c.events, e = fa ? "" :c.zoomType, c = a.inverted;
this.options = b, this.chart = a, this.zoomX = f = /x/.test(e), this.zoomY = e = /y/.test(e), 
this.zoomHor = f && !c || e && c, this.zoomVert = e && !c || f && c, this.hasZoom = f || e, 
this.runChartClick = d && !!d.click, this.pinchDown = [], this.lastValidTouch = {}, 
R.Tooltip && b.tooltip.enabled && (a.tooltip = new Mb(a, b.tooltip), this.followTouchMove = b.tooltip.followTouchMove), 
this.setDOMEvents();
},
normalize:function(a, b) {
var c, d, a = a || window.event, a = Sb(a);
return a.target || (a.target = a.srcElement), d = a.touches ? a.touches.length ? a.touches.item(0) :a.changedTouches[0] :a, 
b || (this.chartPosition = b = Rb(this.chart.container)), d.pageX === t ? (c = v(a.x, a.clientX - b.left), 
d = a.y) :(c = d.pageX - b.left, d = d.pageY - b.top), q(a, {
chartX:u(c),
chartY:u(d)
});
},
getCoordinates:function(a) {
var b = {
xAxis:[],
yAxis:[]
};
return p(this.chart.axes, function(c) {
b[c.isXAxis ? "xAxis" :"yAxis"].push({
axis:c,
value:c.toValue(a[c.horiz ? "chartX" :"chartY"])
});
}), b;
},
getIndex:function(a) {
var b = this.chart;
return b.inverted ? b.plotHeight + b.plotTop - a.chartY :a.chartX - b.plotLeft;
},
runPointActions:function(a) {
var e, f, i, j, b = this.chart, c = b.series, d = b.tooltip, g = b.hoverPoint, h = b.hoverSeries, k = b.chartWidth, l = this.getIndex(a);
if (d && this.options.tooltip.shared && (!h || !h.noSharedTooltip)) {
for (f = [], i = c.length, j = 0; i > j; j++) c[j].visible && c[j].options.enableMouseTracking !== !1 && !c[j].noSharedTooltip && c[j].singularTooltips !== !0 && c[j].tooltipPoints.length && (e = c[j].tooltipPoints[l]) && e.series && (e._dist = M(l - e.clientX), 
k = C(k, e._dist), f.push(e));
for (i = f.length; i--; ) f[i]._dist > k && f.splice(i, 1);
f.length && f[0].clientX !== this.hoverX && (d.refresh(f, a), this.hoverX = f[0].clientX);
}
c = h && h.tooltipOptions.followPointer, h && h.tracker && !c ? (e = h.tooltipPoints[l]) && e !== g && e.onMouseOver(a) :d && c && !d.isHidden && (h = d.getAnchor([ {} ], a), 
d.updatePosition({
plotX:h[0],
plotY:h[1]
})), d && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function(a) {
V[oa] && V[oa].pointer.onDocumentMouseMove(a);
}, K(y, "mousemove", this._onDocumentMouseMove)), p(b.axes, function(b) {
b.drawCrosshair(a, m(e, g));
});
},
reset:function(a) {
var b = this.chart, c = b.hoverSeries, d = b.hoverPoint, e = b.tooltip, f = e && e.shared ? b.hoverPoints :d;
(a = a && e && f) && qa(f)[0].plotX === t && (a = !1), a ? (e.refresh(f), d && d.setState(d.state, !0)) :(d && d.onMouseOut(), 
c && c.onMouseOut(), e && e.hide(), this._onDocumentMouseMove && (W(y, "mousemove", this._onDocumentMouseMove), 
this._onDocumentMouseMove = null), p(b.axes, function(a) {
a.hideCrosshair();
}), this.hoverX = null);
},
scaleGroups:function(a, b) {
var d, c = this.chart;
p(c.series, function(e) {
d = a || e.getPlotBox(), e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), 
e.markerGroup.clip(b ? c.clipRect :null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d));
}), c.clipRect.attr(b || c.clipBox);
},
dragStart:function(a) {
var b = this.chart;
b.mouseIsDown = a.type, b.cancelClick = !1, b.mouseDownX = this.mouseDownX = a.chartX, 
b.mouseDownY = this.mouseDownY = a.chartY;
},
drag:function(a) {
var l, b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, f = this.zoomHor, g = this.zoomVert, h = b.plotLeft, i = b.plotTop, j = b.plotWidth, k = b.plotHeight, o = this.mouseDownX, n = this.mouseDownY;
h > d ? d = h :d > h + j && (d = h + j), i > e ? e = i :e > i + k && (e = i + k), 
this.hasDragged = Math.sqrt(Math.pow(o - d, 2) + Math.pow(n - e, 2)), this.hasDragged > 10 && (l = b.isInsidePlot(o - h, n - i), 
b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !this.selectionMarker && (this.selectionMarker = b.renderer.rect(h, i, f ? 1 :j, g ? 1 :k, 0).attr({
fill:c.selectionMarkerFill || "rgba(69,114,167,0.25)",
zIndex:7
}).add()), this.selectionMarker && f && (d -= o, this.selectionMarker.attr({
width:M(d),
x:(d > 0 ? 0 :d) + o
})), this.selectionMarker && g && (d = e - n, this.selectionMarker.attr({
height:M(d),
y:(d > 0 ? 0 :d) + n
})), l && !this.selectionMarker && c.panning && b.pan(a, c.panning));
},
drop:function(a) {
var b = this.chart, c = this.hasPinched;
if (this.selectionMarker) {
var i, d = {
xAxis:[],
yAxis:[],
originalEvent:a.originalEvent || a
}, a = this.selectionMarker, e = a.attr ? a.attr("x") :a.x, f = a.attr ? a.attr("y") :a.y, g = a.attr ? a.attr("width") :a.width, h = a.attr ? a.attr("height") :a.height;
(this.hasDragged || c) && (p(b.axes, function(a) {
if (a.zoomEnabled) {
var b = a.horiz, c = a.toValue(b ? e :f), b = a.toValue(b ? e + g :f + h);
!isNaN(c) && !isNaN(b) && (d[a.coll].push({
axis:a,
min:C(c, b),
max:v(c, b)
}), i = !0);
}
}), i && D(b, "selection", d, function(a) {
b.zoom(q(a, c ? {
animation:!1
} :null));
})), this.selectionMarker = this.selectionMarker.destroy(), c && this.scaleGroups();
}
b && (G(b.container, {
cursor:b._cursor
}), b.cancelClick = this.hasDragged > 10, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, 
this.pinchDown = []);
},
onContainerMouseDown:function(a) {
a = this.normalize(a), a.preventDefault && a.preventDefault(), this.dragStart(a);
},
onDocumentMouseUp:function(a) {
V[oa] && V[oa].pointer.drop(a);
},
onDocumentMouseMove:function(a) {
var b = this.chart, c = this.chartPosition, d = b.hoverSeries, a = this.normalize(a, c);
c && d && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset();
},
onContainerMouseLeave:function() {
var a = V[oa];
a && (a.pointer.reset(), a.pointer.chartPosition = null);
},
onContainerMouseMove:function(a) {
var b = this.chart;
oa = b.index, a = this.normalize(a), "mousedown" === b.mouseIsDown && this.drag(a), 
(this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a);
},
inClass:function(a, b) {
for (var c; a; ) {
if (c = H(a, "class")) {
if (-1 !== c.indexOf(b)) return !0;
if (-1 !== c.indexOf("highcharts-container")) return !1;
}
a = a.parentNode;
}
},
onTrackerMouseOut:function(a) {
var b = this.chart.hoverSeries, c = (a = a.relatedTarget || a.toElement) && a.point && a.point.series;
!b || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || c === b || b.onMouseOut();
},
onContainerClick:function(a) {
var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop, a = this.normalize(a);
a.cancelBubble = !0, b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (D(c.series, "click", q(a, {
point:c
})), b.hoverPoint && c.firePointEvent("click", a)) :(q(a, this.getCoordinates(a)), 
b.isInsidePlot(a.chartX - d, a.chartY - e) && D(b, "click", a)));
},
setDOMEvents:function() {
var a = this, b = a.chart.container;
b.onmousedown = function(b) {
a.onContainerMouseDown(b);
}, b.onmousemove = function(b) {
a.onContainerMouseMove(b);
}, b.onclick = function(b) {
a.onContainerClick(b);
}, K(b, "mouseleave", a.onContainerMouseLeave), 1 === ab && K(y, "mouseup", a.onDocumentMouseUp), 
$a && (b.ontouchstart = function(b) {
a.onContainerTouchStart(b);
}, b.ontouchmove = function(b) {
a.onContainerTouchMove(b);
}, 1 === ab && K(y, "touchend", a.onDocumentTouchEnd));
},
destroy:function() {
var a;
W(this.chart.container, "mouseleave", this.onContainerMouseLeave), ab || (W(y, "mouseup", this.onDocumentMouseUp), 
W(y, "touchend", this.onDocumentTouchEnd)), clearInterval(this.tooltipTimeout);
for (a in this) this[a] = null;
}
}, q(R.Pointer.prototype, {
pinchTranslate:function(a, b, c, d, e, f) {
(this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f), 
(this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, b, c, d, e, f);
},
pinchTranslateDirection:function(a, b, c, d, e, f, g, h) {
var s, m, y, i = this.chart, j = a ? "x" :"y", k = a ? "X" :"Y", l = "chart" + k, o = a ? "width" :"height", n = i["plot" + (a ? "Left" :"Top")], p = h || 1, q = i.inverted, x = i.bounds[a ? "h" :"v"], r = 1 === b.length, v = b[0][l], u = c[0][l], t = !r && b[1][l], w = !r && c[1][l], c = function() {
!r && M(v - t) > 20 && (p = h || M(u - w) / M(v - t)), m = (n - u) / p + v, s = i["plot" + (a ? "Width" :"Height")] / p;
};
c(), b = m, b < x.min ? (b = x.min, y = !0) :b + s > x.max && (b = x.max - s, y = !0), 
y ? (u -= .8 * (u - g[j][0]), r || (w -= .8 * (w - g[j][1])), c()) :g[j] = [ u, w ], 
q || (f[j] = m - n, f[o] = s), f = q ? 1 / p :p, e[o] = s, e[j] = b, d[q ? a ? "scaleY" :"scaleX" :"scale" + k] = p, 
d["translate" + k] = f * n + (u - f * v);
},
pinch:function(a) {
var b = this, c = b.chart, d = b.pinchDown, e = b.followTouchMove, f = a.touches, g = f.length, h = b.lastValidTouch, i = b.hasZoom, j = b.selectionMarker, k = {}, l = 1 === g && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || c.runChartClick), o = {};
(i || e) && !l && a.preventDefault(), Ua(f, function(a) {
return b.normalize(a);
}), "touchstart" === a.type ? (p(f, function(a, b) {
d[b] = {
chartX:a.chartX,
chartY:a.chartY
};
}), h.x = [ d[0].chartX, d[1] && d[1].chartX ], h.y = [ d[0].chartY, d[1] && d[1].chartY ], 
p(c.axes, function(a) {
if (a.zoomEnabled) {
var b = c.bounds[a.horiz ? "h" :"v"], d = a.minPixelPadding, e = a.toPixels(a.dataMin), f = a.toPixels(a.dataMax), g = C(e, f), e = v(e, f);
b.min = C(a.pos, g - d), b.max = v(a.pos + a.len, e + d);
}
})) :d.length && (j || (b.selectionMarker = j = q({
destroy:sa
}, c.plotBox)), b.pinchTranslate(d, f, k, j, o, h), b.hasPinched = i, b.scaleGroups(k, o), 
!i && e && 1 === g && this.runPointActions(b.normalize(a)));
},
onContainerTouchStart:function(a) {
var b = this.chart;
oa = b.index, 1 === a.touches.length ? (a = this.normalize(a), b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) ? (this.runPointActions(a), 
this.pinch(a)) :this.reset()) :2 === a.touches.length && this.pinch(a);
},
onContainerTouchMove:function(a) {
(1 === a.touches.length || 2 === a.touches.length) && this.pinch(a);
},
onDocumentTouchEnd:function(a) {
V[oa] && V[oa].pointer.drop(a);
}
}), I.PointerEvent || I.MSPointerEvent) {
var ua = {}, zb = !!I.PointerEvent, Wb = function() {
var a, b = [];
b.item = function(a) {
return this[a];
};
for (a in ua) ua.hasOwnProperty(a) && b.push({
pageX:ua[a].pageX,
pageY:ua[a].pageY,
target:ua[a].target
});
return b;
}, Ab = function(a, b, c, d) {
a = a.originalEvent || a, "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH || !V[oa] || (d(a), 
d = V[oa].pointer, d[b]({
type:c,
target:a.currentTarget,
preventDefault:sa,
touches:Wb()
}));
};
q(Wa.prototype, {
onContainerPointerDown:function(a) {
Ab(a, "onContainerTouchStart", "touchstart", function(a) {
ua[a.pointerId] = {
pageX:a.pageX,
pageY:a.pageY,
target:a.currentTarget
};
});
},
onContainerPointerMove:function(a) {
Ab(a, "onContainerTouchMove", "touchmove", function(a) {
ua[a.pointerId] = {
pageX:a.pageX,
pageY:a.pageY
}, ua[a.pointerId].target || (ua[a.pointerId].target = a.currentTarget);
});
},
onDocumentPointerUp:function(a) {
Ab(a, "onContainerTouchEnd", "touchend", function(a) {
delete ua[a.pointerId];
});
},
batchMSEvents:function(a) {
a(this.chart.container, zb ? "pointerdown" :"MSPointerDown", this.onContainerPointerDown), 
a(this.chart.container, zb ? "pointermove" :"MSPointerMove", this.onContainerPointerMove), 
a(y, zb ? "pointerup" :"MSPointerUp", this.onDocumentPointerUp);
}
}), Ma(Wa.prototype, "init", function(a, b, c) {
a.call(this, b, c), (this.hasZoom || this.followTouchMove) && G(b.container, {
"-ms-touch-action":Q,
"touch-action":Q
});
}), Ma(Wa.prototype, "setDOMEvents", function(a) {
a.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(K);
}), Ma(Wa.prototype, "destroy", function(a) {
this.batchMSEvents(W), a.call(this);
});
}
var lb = R.Legend = function(a, b) {
this.init(a, b);
};
lb.prototype = {
init:function(a, b) {
var c = this, d = b.itemStyle, e = m(b.padding, 8), f = b.itemMarginTop || 0;
this.options = b, b.enabled && (c.baseline = z(d.fontSize) + 3 + f, c.itemStyle = d, 
c.itemHiddenStyle = w(d, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e, 
c.initialItemX = e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, 
c.lastLineHeight = 0, c.symbolWidth = m(b.symbolWidth, 16), c.pages = [], c.render(), 
K(c.chart, "endResize", function() {
c.positionCheckboxes();
}));
},
colorizeItem:function(a, b) {
var j, c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color :g, h = b ? a.legendColor || a.color || "#CCC" :g, g = a.options && a.options.marker, i = {
fill:h
};
if (d && d.css({
fill:c,
color:c
}), e && e.attr({
stroke:h
}), f) {
if (g && f.isMarker) for (j in i.stroke = h, g = a.convertAttribs(g)) d = g[j], 
d !== t && (i[j] = d);
f.attr(i);
}
},
positionItem:function(a) {
var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], f = a.checkbox;
a.legendGroup && a.legendGroup.translate(b ? e :this.legendWidth - e - 2 * c - 4, d), 
f && (f.x = e, f.y = d);
},
destroyItem:function(a) {
var b = a.checkbox;
p([ "legendItem", "legendLine", "legendSymbol", "legendGroup" ], function(b) {
a[b] && (a[b] = a[b].destroy());
}), b && Pa(a.checkbox);
},
destroy:function() {
var a = this.group, b = this.box;
b && (this.box = b.destroy()), a && (this.group = a.destroy());
},
positionCheckboxes:function(a) {
var c, b = this.group.alignAttr, d = this.clipHeight || this.legendHeight;
b && (c = b.translateY, p(this.allItems, function(e) {
var g, f = e.checkbox;
f && (g = c + f.y + (a || 0) + 3, G(f, {
left:b.translateX + e.checkboxOffset + f.x - 20 + "px",
top:g + "px",
display:g > c - 6 && c + d - 6 > g ? "" :Q
}));
}));
},
renderTitle:function() {
var a = this.padding, b = this.options.title, c = 0;
b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
zIndex:1
}).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, 
this.contentGroup.attr({
translateY:c
})), this.titleHeight = c;
},
renderItem:function(a) {
var b = this.chart, c = b.renderer, d = this.options, e = "horizontal" === d.layout, f = this.symbolWidth, g = d.symbolPadding, h = this.itemStyle, i = this.itemHiddenStyle, j = this.padding, k = e ? m(d.itemDistance, 20) :0, l = !d.rtl, o = d.width, n = d.itemMarginBottom || 0, s = this.itemMarginTop, p = this.initialItemX, q = a.legendItem, r = a.series && a.series.drawLegendSymbol ? a.series :a, x = r.options, x = this.createCheckboxForItem && x && x.showCheckbox, t = d.useHTML;
q || (a.legendGroup = c.g("legend-item").attr({
zIndex:1
}).add(this.scrollGroup), r.drawLegendSymbol(this, a), a.legendItem = q = c.text(d.labelFormat ? Ia(d.labelFormat, a) :d.labelFormatter.call(a), l ? f + g :-g, this.baseline, t).css(w(a.visible ? h :i)).attr({
align:l ? "left" :"right",
zIndex:2
}).add(a.legendGroup), this.setItemEvents && this.setItemEvents(a, q, t, h, i), 
this.colorizeItem(a, a.visible), x && this.createCheckboxForItem(a)), c = q.getBBox(), 
f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + k + (x ? 20 :0), 
this.itemHeight = g = u(a.legendItemHeight || c.height), e && this.itemX - p + f > (o || b.chartWidth - 2 * j - p - d.x) && (this.itemX = p, 
this.itemY += s + this.lastLineHeight + n, this.lastLineHeight = 0), this.maxItemWidth = v(this.maxItemWidth, f), 
this.lastItemY = s + this.itemY + n, this.lastLineHeight = v(g, this.lastLineHeight), 
a._legendItemPos = [ this.itemX, this.itemY ], e ? this.itemX += f :(this.itemY += s + g + n, 
this.lastLineHeight = g), this.offsetWidth = o || v((e ? this.itemX - p - k :f) + j, this.offsetWidth);
},
getAllItems:function() {
var a = [];
return p(this.chart.series, function(b) {
var c = b.options;
m(c.showInLegend, r(c.linkedTo) ? !1 :t, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data :b)));
}), a;
},
render:function() {
var e, f, g, h, a = this, b = a.chart, c = b.renderer, d = a.group, i = a.box, j = a.options, k = a.padding, l = j.borderWidth, o = j.backgroundColor;
a.itemX = a.initialItemX, a.itemY = a.initialItemY, a.offsetWidth = 0, a.lastItemY = 0, 
d || (a.group = d = c.g("legend").attr({
zIndex:7
}).add(), a.contentGroup = c.g().attr({
zIndex:1
}).add(d), a.scrollGroup = c.g().add(a.contentGroup)), a.renderTitle(), e = a.getAllItems(), 
ob(e, function(a, b) {
return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
}), j.reversed && e.reverse(), a.allItems = e, a.display = f = !!e.length, p(e, function(b) {
a.renderItem(b);
}), g = j.width || a.offsetWidth, h = a.lastItemY + a.lastLineHeight + a.titleHeight, 
h = a.handleOverflow(h), (l || o) && (g += k, h += k, i ? g > 0 && h > 0 && (i[i.isNew ? "attr" :"animate"](i.crisp({
width:g,
height:h
})), i.isNew = !1) :(a.box = i = c.rect(0, 0, g, h, j.borderRadius, l || 0).attr({
stroke:j.borderColor,
"stroke-width":l || 0,
fill:o || Q
}).add(d).shadow(j.shadow), i.isNew = !0), i[f ? "show" :"hide"]()), a.legendWidth = g, 
a.legendHeight = h, p(e, function(b) {
a.positionItem(b);
}), f && d.align(q({
width:g,
height:h
}, j), !0, "spacingBox"), b.isResizing || this.positionCheckboxes();
},
handleOverflow:function(a) {
var h, s, b = this, c = this.chart, d = c.renderer, e = this.options, f = e.y, f = c.spacingBox.height + ("top" === e.verticalAlign ? -f :f) - this.padding, g = e.maxHeight, i = this.clipRect, j = e.navigation, k = m(j.animation, !0), l = j.arrowSize || 12, o = this.nav, n = this.pages, q = this.allItems;
return "horizontal" === e.layout && (f /= 2), g && (f = C(f, g)), n.length = 0, 
a > f && !e.useHTML ? (this.clipHeight = h = f - 20 - this.titleHeight - this.padding, 
this.currentPage = m(this.currentPage, 1), this.fullHeight = a, p(q, function(a, b) {
var c = a._legendItemPos[1], d = u(a.legendItem.getBBox().height), e = n.length;
(!e || c - n[e - 1] > h && (s || c) !== n[e - 1]) && (n.push(s || c), e++), b === q.length - 1 && c + d - n[e - 1] > h && n.push(c), 
c !== s && (s = c);
}), i || (i = b.clipRect = d.clipRect(0, this.padding, 9999, 0), b.contentGroup.clip(i)), 
i.attr({
height:h
}), o || (this.nav = o = d.g().attr({
zIndex:1
}).add(this.group), this.up = d.symbol("triangle", 0, 0, l, l).on("click", function() {
b.scroll(-1, k);
}).add(o), this.pager = d.text("", 15, 10).css(j.style).add(o), this.down = d.symbol("triangle-down", 0, 0, l, l).on("click", function() {
b.scroll(1, k);
}).add(o)), b.scroll(0), a = f) :o && (i.attr({
height:c.chartHeight
}), o.hide(), this.scrollGroup.attr({
translateY:1
}), this.clipHeight = 0), a;
},
scroll:function(a, b) {
var c = this.pages, d = c.length, e = this.currentPage + a, f = this.clipHeight, g = this.options.navigation, h = g.activeColor, g = g.inactiveColor, i = this.pager, j = this.padding;
e > d && (e = d), e > 0 && (b !== t && Qa(b, this.chart), this.nav.attr({
translateX:j,
translateY:f + this.padding + 7 + this.titleHeight,
visibility:"visible"
}), this.up.attr({
fill:1 === e ? g :h
}).css({
cursor:1 === e ? "default" :"pointer"
}), i.attr({
text:e + "/" + d
}), this.down.attr({
x:18 + this.pager.getBBox().width,
fill:e === d ? g :h
}).css({
cursor:e === d ? "default" :"pointer"
}), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({
translateY:c
}), this.currentPage = e, this.positionCheckboxes(c));
}
}, N = R.LegendSymbolMixin = {
drawRectangle:function(a, b) {
var c = a.options.symbolHeight || 12;
b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 5 - c / 2, a.symbolWidth, c, a.options.symbolRadius || 0).attr({
zIndex:3
}).add(b.legendGroup);
},
drawLineMarker:function(a) {
var d, b = this.options, c = b.marker;
d = a.symbolWidth;
var g, e = this.chart.renderer, f = this.legendGroup, a = a.baseline - u(.3 * e.fontMetrics(a.options.itemStyle.fontSize).b);
b.lineWidth && (g = {
"stroke-width":b.lineWidth
}, b.dashStyle && (g.dashstyle = b.dashStyle), this.legendLine = e.path([ "M", 0, a, "L", d, a ]).attr(g).add(f)), 
c && c.enabled !== !1 && (b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), 
d.isMarker = !0);
}
}, (/Trident\/7\.0/.test(wa) || Ta) && Ma(lb.prototype, "positionItem", function(a, b) {
var c = this, d = function() {
b._legendItemPos && a.call(c, b);
};
d(), setTimeout(d);
}), Ya.prototype = {
init:function(a, b) {
var c, d = a.series;
a.series = null, c = w(E, a), c.series = a.series = d, this.userOptions = a, d = c.chart, 
this.margin = this.splashArray("margin", d), this.spacing = this.splashArray("spacing", d);
var e = d.events;
this.bounds = {
h:{},
v:{}
}, this.callback = b, this.isResizing = 0, this.options = c, this.axes = [], this.series = [], 
this.hasCartesianSeries = d.showAxes;
var g, f = this;
if (f.index = V.length, V.push(f), ab++, d.reflow !== !1 && K(f, "load", function() {
f.initReflow();
}), e) for (g in e) K(f, g, e[g]);
f.xAxis = [], f.yAxis = [], f.animation = fa ? !1 :m(d.animation, !0), f.pointCount = 0, 
f.counters = new Bb(), f.firstRender();
},
initSeries:function(a) {
var b = this.options.chart;
return (b = F[a.type || b.type || b.defaultSeriesType]) || ra(17, !0), b = new b(), 
b.init(this, a), b;
},
isInsidePlot:function(a, b, c) {
var d = c ? b :a, a = c ? a :b;
return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight;
},
adjustTickAmounts:function() {
this.options.chart.alignTicks !== !1 && p(this.axes, function(a) {
a.adjustTickAmount();
}), this.maxTicks = null;
},
redraw:function(a) {
var g, h, b = this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, i = this.isDirtyBox, j = c.length, k = j, l = this.renderer, o = l.isHidden(), n = [];
for (Qa(a, this), o && this.cloneRenderTo(), this.layOutTitles(); k--; ) if (a = c[k], 
a.options.stacking && (g = !0, a.isDirty)) {
h = !0;
break;
}
if (h) for (k = j; k--; ) a = c[k], a.options.stacking && (a.isDirty = !0);
p(c, function(a) {
a.isDirty && "point" === a.options.legendType && (f = !0);
}), f && e.options.enabled && (e.render(), this.isDirtyLegend = !1), g && this.getStacks(), 
this.hasCartesianSeries && (this.isResizing || (this.maxTicks = null, p(b, function(a) {
a.setScale();
})), this.adjustTickAmounts(), this.getMargins(), p(b, function(a) {
a.isDirty && (i = !0);
}), p(b, function(a) {
a.isDirtyExtremes && (a.isDirtyExtremes = !1, n.push(function() {
D(a, "afterSetExtremes", q(a.eventArgs, a.getExtremes())), delete a.eventArgs;
})), (i || g) && a.redraw();
})), i && this.drawChartBox(), p(c, function(a) {
a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw();
}), d && d.reset(!0), l.draw(), D(this, "redraw"), o && this.cloneRenderTo(!0), 
p(n, function(a) {
a.call();
});
},
get:function(a) {
var d, e, b = this.axes, c = this.series;
for (d = 0; d < b.length; d++) if (b[d].options.id === a) return b[d];
for (d = 0; d < c.length; d++) if (c[d].options.id === a) return c[d];
for (d = 0; d < c.length; d++) for (e = c[d].points || [], b = 0; b < e.length; b++) if (e[b].id === a) return e[b];
return null;
},
getAxes:function() {
var a = this, b = this.options, c = b.xAxis = qa(b.xAxis || {}), b = b.yAxis = qa(b.yAxis || {});
p(c, function(a, b) {
a.index = b, a.isX = !0;
}), p(b, function(a, b) {
a.index = b;
}), c = c.concat(b), p(c, function(b) {
new la(a, b);
}), a.adjustTickAmounts();
},
getSelectedPoints:function() {
var a = [];
return p(this.series, function(b) {
a = a.concat(vb(b.points || [], function(a) {
return a.selected;
}));
}), a;
},
getSelectedSeries:function() {
return vb(this.series, function(a) {
return a.selected;
});
},
getStacks:function() {
var a = this;
p(a.yAxis, function(a) {
a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks);
}), p(a.series, function(b) {
!b.options.stacking || b.visible !== !0 && a.options.chart.ignoreHiddenSeries !== !1 || (b.stackKey = b.type + m(b.options.stack, ""));
});
},
setTitle:function(a, b, c) {
var g, f, d = this, e = d.options;
f = e.title = w(e.title, a), g = e.subtitle = w(e.subtitle, b), e = g, p([ [ "title", a, f ], [ "subtitle", b, e ] ], function(a) {
var b = a[0], c = d[b], e = a[1], a = a[2];
c && e && (d[b] = c = c.destroy()), a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
align:a.align,
"class":"highcharts-" + b,
zIndex:a.zIndex || 4
}).css(a.style).add());
}), d.layOutTitles(c);
},
layOutTitles:function(a) {
var b = 0, c = this.title, d = this.subtitle, e = this.options, f = e.title, e = e.subtitle, g = this.spacingBox.width - 44;
!c || (c.css({
width:(f.width || g) + "px"
}).align(q({
y:15
}, f), !1, "spacingBox"), f.floating || f.verticalAlign) || (b = c.getBBox().height), 
d && (d.css({
width:(e.width || g) + "px"
}).align(q({
y:b + f.margin
}, e), !1, "spacingBox"), !e.floating && !e.verticalAlign && (b = Ka(b + d.getBBox().height))), 
c = this.titleOffset !== b, this.titleOffset = b, !this.isDirtyBox && c && (this.isDirtyBox = c, 
this.hasRendered && m(a, !0) && this.isDirtyBox && this.redraw());
},
getChartSize:function() {
var a = this.options.chart, b = a.width, a = a.height, c = this.renderToClone || this.renderTo;
r(b) || (this.containerWidth = jb(c, "width")), r(a) || (this.containerHeight = jb(c, "height")), 
this.chartWidth = v(0, b || this.containerWidth || 600), this.chartHeight = v(0, m(a, this.containerHeight > 19 ? this.containerHeight :400));
},
cloneRenderTo:function(a) {
var b = this.renderToClone, c = this.container;
a ? b && (this.renderTo.appendChild(c), Pa(b), delete this.renderToClone) :(c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), 
this.renderToClone = b = this.renderTo.cloneNode(0), G(b, {
position:"absolute",
top:"-9999px",
display:"block"
}), b.style.setProperty && b.style.setProperty("display", "block", "important"), 
y.body.appendChild(b), c && b.appendChild(c));
},
getContainer:function() {
var a, c, d, e, b = this.options.chart;
this.renderTo = a = b.renderTo, e = "highcharts-" + tb++, Fa(a) && (this.renderTo = a = y.getElementById(a)), 
a || ra(13, !0), c = z(H(a, "data-highcharts-chart")), !isNaN(c) && V[c] && V[c].hasRendered && V[c].destroy(), 
H(a, "data-highcharts-chart", this.index), a.innerHTML = "", !b.skipClone && !a.offsetWidth && this.cloneRenderTo(), 
this.getChartSize(), c = this.chartWidth, d = this.chartHeight, this.container = a = Y(Ja, {
className:"highcharts-container" + (b.className ? " " + b.className :""),
id:e
}, q({
position:"relative",
overflow:"hidden",
width:c + "px",
height:d + "px",
textAlign:"left",
lineHeight:"normal",
zIndex:0,
"-webkit-tap-highlight-color":"rgba(0,0,0,0)"
}, b.style), this.renderToClone || a), this._cursor = a.style.cursor, this.renderer = b.forExport ? new ta(a, c, d, b.style, !0) :new Za(a, c, d, b.style), 
fa && this.renderer.create(this, a, c, d);
},
getMargins:function() {
var b, a = this.spacing, c = this.legend, d = this.margin, e = this.options.legend, f = m(e.margin, 20), g = e.x, h = e.y, i = e.align, j = e.verticalAlign, k = this.titleOffset;
this.resetMargins(), b = this.axisOffset, k && !r(d[0]) && (this.plotTop = v(this.plotTop, k + this.options.title.margin + a[0])), 
c.display && !e.floating && ("right" === i ? r(d[1]) || (this.marginRight = v(this.marginRight, c.legendWidth - g + f + a[1])) :"left" === i ? r(d[3]) || (this.plotLeft = v(this.plotLeft, c.legendWidth + g + f + a[3])) :"top" === j ? r(d[0]) || (this.plotTop = v(this.plotTop, c.legendHeight + h + f + a[0])) :"bottom" !== j || r(d[2]) || (this.marginBottom = v(this.marginBottom, c.legendHeight - h + f + a[2]))), 
this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), 
this.hasCartesianSeries && p(this.axes, function(a) {
a.getOffset();
}), r(d[3]) || (this.plotLeft += b[3]), r(d[0]) || (this.plotTop += b[0]), r(d[2]) || (this.marginBottom += b[2]), 
r(d[1]) || (this.marginRight += b[1]), this.setChartSize();
},
reflow:function(a) {
var b = this, c = b.options.chart, d = b.renderTo, e = c.width || jb(d, "width"), f = c.height || jb(d, "height"), c = a ? a.target :I, d = function() {
b.container && (b.setSize(e, f, !1), b.hasUserSize = null);
};
b.hasUserSize || !e || !f || c !== I && c !== y || ((e !== b.containerWidth || f !== b.containerHeight) && (clearTimeout(b.reflowTimeout), 
a ? b.reflowTimeout = setTimeout(d, 100) :d()), b.containerWidth = e, b.containerHeight = f);
},
initReflow:function() {
var a = this, b = function(b) {
a.reflow(b);
};
K(I, "resize", b), K(a, "destroy", function() {
W(I, "resize", b);
});
},
setSize:function(a, b, c) {
var e, f, g, d = this;
d.isResizing += 1, g = function() {
d && D(d, "endResize", null, function() {
d.isResizing -= 1;
});
}, Qa(c, d), d.oldChartHeight = d.chartHeight, d.oldChartWidth = d.chartWidth, r(a) && (d.chartWidth = e = v(0, u(a)), 
d.hasUserSize = !!e), r(b) && (d.chartHeight = f = v(0, u(b))), (va ? kb :G)(d.container, {
width:e + "px",
height:f + "px"
}, va), d.setChartSize(!0), d.renderer.setSize(e, f, c), d.maxTicks = null, p(d.axes, function(a) {
a.isDirty = !0, a.setScale();
}), p(d.series, function(a) {
a.isDirty = !0;
}), d.isDirtyLegend = !0, d.isDirtyBox = !0, d.layOutTitles(), d.getMargins(), d.redraw(c), 
d.oldChartHeight = null, D(d, "resize"), va === !1 ? g() :setTimeout(g, va && va.duration || 500);
},
setChartSize:function(a) {
var i, j, k, l, b = this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = this.spacing, h = this.clipOffset;
this.plotLeft = i = u(this.plotLeft), this.plotTop = j = u(this.plotTop), this.plotWidth = k = v(0, u(d - i - this.marginRight)), 
this.plotHeight = l = v(0, u(e - j - this.marginBottom)), this.plotSizeX = b ? l :k, 
this.plotSizeY = b ? k :l, this.plotBorderWidth = f.plotBorderWidth || 0, this.spacingBox = c.spacingBox = {
x:g[3],
y:g[0],
width:d - g[3] - g[1],
height:e - g[0] - g[2]
}, this.plotBox = c.plotBox = {
x:i,
y:j,
width:k,
height:l
}, d = 2 * T(this.plotBorderWidth / 2), b = Ka(v(d, h[3]) / 2), c = Ka(v(d, h[0]) / 2), 
this.clipBox = {
x:b,
y:c,
width:T(this.plotSizeX - v(d, h[1]) / 2 - b),
height:T(this.plotSizeY - v(d, h[2]) / 2 - c)
}, a || p(this.axes, function(a) {
a.setAxisSize(), a.setAxisTranslation();
});
},
resetMargins:function() {
var a = this.spacing, b = this.margin;
this.plotTop = m(b[0], a[0]), this.marginRight = m(b[1], a[1]), this.marginBottom = m(b[2], a[2]), 
this.plotLeft = m(b[3], a[3]), this.axisOffset = [ 0, 0, 0, 0 ], this.clipOffset = [ 0, 0, 0, 0 ];
},
drawChartBox:function() {
var n, a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, h = this.plotBGImage, i = a.borderWidth || 0, j = a.backgroundColor, k = a.plotBackgroundColor, l = a.plotBackgroundImage, o = a.plotBorderWidth || 0, s = this.plotLeft, m = this.plotTop, p = this.plotWidth, q = this.plotHeight, r = this.plotBox, v = this.clipRect, u = this.clipBox;
n = i + (a.shadow ? 8 :0), (i || j) && (e ? e.animate(e.crisp({
width:c - n,
height:d - n
})) :(e = {
fill:j || Q
}, i && (e.stroke = a.borderColor, e["stroke-width"] = i), this.chartBackground = b.rect(n / 2, n / 2, c - n, d - n, a.borderRadius, i).attr(e).addClass("highcharts-background").add().shadow(a.shadow))), 
k && (f ? f.animate(r) :this.plotBackground = b.rect(s, m, p, q, 0).attr({
fill:k
}).add().shadow(a.plotShadow)), l && (h ? h.animate(r) :this.plotBGImage = b.image(l, s, m, p, q).add()), 
v ? v.animate({
width:u.width,
height:u.height
}) :this.clipRect = b.clipRect(u), o && (g ? g.animate(g.crisp({
x:s,
y:m,
width:p,
height:q
})) :this.plotBorder = b.rect(s, m, p, q, 0, -o).attr({
stroke:a.plotBorderColor,
"stroke-width":o,
fill:Q,
zIndex:1
}).add()), this.isDirtyBox = !1;
},
propFromSeries:function() {
var c, e, f, a = this, b = a.options.chart, d = a.options.series;
p([ "inverted", "angular", "polar" ], function(g) {
for (c = F[b.type || b.defaultSeriesType], f = a[g] || b[g] || c && c.prototype[g], 
e = d && d.length; !f && e--; ) (c = F[d[e].type]) && c.prototype[g] && (f = !0);
a[g] = f;
});
},
linkSeries:function() {
var a = this, b = a.series;
p(b, function(a) {
a.linkedSeries.length = 0;
}), p(b, function(b) {
var d = b.options.linkedTo;
Fa(d) && (d = ":previous" === d ? a.series[b.index - 1] :a.get(d)) && (d.linkedSeries.push(b), 
b.linkedParent = d);
});
},
renderSeries:function() {
p(this.series, function(a) {
a.translate(), a.setTooltipPoints && a.setTooltipPoints(), a.render();
});
},
render:function() {
var g, a = this, b = a.axes, c = a.renderer, d = a.options, e = d.labels, f = d.credits;
a.setTitle(), a.legend = new lb(a, d.legend), a.getStacks(), p(b, function(a) {
a.setScale();
}), a.getMargins(), a.maxTicks = null, p(b, function(a) {
a.setTickPositions(!0), a.setMaxTicks();
}), a.adjustTickAmounts(), a.getMargins(), a.drawChartBox(), a.hasCartesianSeries && p(b, function(a) {
a.render();
}), a.seriesGroup || (a.seriesGroup = c.g("series-group").attr({
zIndex:3
}).add()), a.renderSeries(), e.items && p(e.items, function(b) {
var d = q(e.style, b.style), f = z(d.left) + a.plotLeft, g = z(d.top) + a.plotTop + 12;
delete d.left, delete d.top, c.text(b.html, f, g).attr({
zIndex:2
}).css(d).add();
}), f.enabled && !a.credits && (g = f.href, a.credits = c.text(f.text, 0, 0).on("click", function() {
g && (location.href = g);
}).attr({
align:f.position.align,
zIndex:8
}).css(f.style).add().align(f.position)), a.hasRendered = !0;
},
destroy:function() {
var e, a = this, b = a.axes, c = a.series, d = a.container, f = d && d.parentNode;
for (D(a, "destroy"), V[a.index] = t, ab--, a.renderTo.removeAttribute("data-highcharts-chart"), 
W(a), e = b.length; e--; ) b[e] = b[e].destroy();
for (e = c.length; e--; ) c[e] = c[e].destroy();
p("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(b) {
var c = a[b];
c && c.destroy && (a[b] = c.destroy());
}), d && (d.innerHTML = "", W(d), f && Pa(d));
for (e in a) delete a[e];
},
isReadyToRender:function() {
var a = this;
return !aa && I == I.top && "complete" !== y.readyState || fa && !I.canvg ? (fa ? Lb.push(function() {
a.firstRender();
}, a.options.global.canvasToolsURL) :y.attachEvent("onreadystatechange", function() {
y.detachEvent("onreadystatechange", a.firstRender), "complete" === y.readyState && a.firstRender();
}), !1) :!0;
},
firstRender:function() {
var a = this, b = a.options, c = a.callback;
a.isReadyToRender() && (a.getContainer(), D(a, "init"), a.resetMargins(), a.setChartSize(), 
a.propFromSeries(), a.getAxes(), p(b.series || [], function(b) {
a.initSeries(b);
}), a.linkSeries(), D(a, "beforeRender"), R.Pointer && (a.pointer = new Wa(a, b)), 
a.render(), a.renderer.draw(), c && c.apply(a, [ a ]), p(a.callbacks, function(b) {
b.apply(a, [ a ]);
}), a.cloneRenderTo(!0), D(a, "load"));
},
splashArray:function(a, b) {
var c = b[a], c = ca(c) ? c :[ c, c, c, c ];
return [ m(b[a + "Top"], c[0]), m(b[a + "Right"], c[1]), m(b[a + "Bottom"], c[2]), m(b[a + "Left"], c[3]) ];
}
}, Ya.prototype.callbacks = [], X = R.CenteredSeriesMixin = {
getCenter:function() {
var d, h, a = this.options, b = this.chart, c = 2 * (a.slicedOffset || 0), e = b.plotWidth - 2 * c, f = b.plotHeight - 2 * c, b = a.center, a = [ m(b[0], "50%"), m(b[1], "50%"), a.size || "100%", a.innerSize || 0 ], g = C(e, f);
return Ua(a, function(a, b) {
return h = /%$/.test(a), d = 2 > b || 2 === b && h, (h ? [ e, f, g, g ][b] * z(a) / 100 :a) + (d ? c :0);
});
}
};
var Ea = function() {};
Ea.prototype = {
init:function(a, b, c) {
return this.series = a, this.applyOptions(b, c), this.pointAttr = {}, a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, 
this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length) && (a.colorCounter = 0), 
a.chart.pointCount++, this;
},
applyOptions:function(a, b) {
var c = this.series, d = c.pointValKey, a = Ea.prototype.optionsToObject.call(this, a);
return q(this, a), this.options = this.options ? q(this.options, a) :a, d && (this.y = this[d]), 
this.x === t && c && (this.x = b === t ? c.autoIncrement() :b), this;
},
optionsToObject:function(a) {
var b = {}, c = this.series, d = c.pointArrayMap || [ "y" ], e = d.length, f = 0, g = 0;
if ("number" == typeof a || null === a) b[d[0]] = a; else if (La(a)) for (a.length > e && (c = typeof a[0], 
"string" === c ? b.name = a[0] :"number" === c && (b.x = a[0]), f++); e > g; ) b[d[g++]] = a[f++]; else "object" == typeof a && (b = a, 
a.dataLabels && (c._hasPointLabels = !0), a.marker && (c._hasPointMarkers = !0));
return b;
},
destroy:function() {
var c, a = this.series.chart, b = a.hoverPoints;
a.pointCount--, b && (this.setState(), ja(b, this), !b.length) && (a.hoverPoints = null), 
this === a.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (W(this), 
this.destroyElements()), this.legendItem && a.legend.destroyItem(this);
for (c in this) this[c] = null;
},
destroyElements:function() {
for (var b, a = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), c = 6; c--; ) b = a[c], 
this[b] && (this[b] = this[b].destroy());
},
getLabelConfig:function() {
return {
x:this.category,
y:this.y,
key:this.name || this.category,
series:this.series,
point:this,
percentage:this.percentage,
total:this.total || this.stackTotal
};
},
tooltipFormatter:function(a) {
var b = this.series, c = b.tooltipOptions, d = m(c.valueDecimals, ""), e = c.valuePrefix || "", f = c.valueSuffix || "";
return p(b.pointArrayMap || [ "y" ], function(b) {
b = "{point." + b, (e || f) && (a = a.replace(b + "}", e + b + "}" + f)), a = a.replace(b + "}", b + ":,." + d + "f}");
}), Ia(a, {
point:this,
series:this.series
});
},
firePointEvent:function(a, b, c) {
var d = this, e = this.series.options;
(e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents(), 
"click" === a && e.allowPointSelect && (c = function(a) {
d.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
}), D(this, a, b, c);
}
};
var O = function() {};
O.prototype = {
isCartesian:!0,
type:"line",
pointClass:Ea,
sorted:!0,
requireSorting:!0,
pointAttrToOptions:{
stroke:"lineColor",
"stroke-width":"lineWidth",
fill:"fillColor",
r:"radius"
},
axisTypes:[ "xAxis", "yAxis" ],
colorCounter:0,
parallelArrays:[ "x", "y" ],
init:function(a, b) {
var d, e, c = this, f = a.series, g = function(a, b) {
return m(a.options.index, a._i) - m(b.options.index, b._i);
};
c.chart = a, c.options = b = c.setOptions(b), c.linkedSeries = [], c.bindAxes(), 
q(c, {
name:b.name,
state:"",
pointAttr:{},
visible:b.visible !== !1,
selected:b.selected === !0
}), fa && (b.animation = !1), e = b.events;
for (d in e) K(c, d, e[d]);
(e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) && (a.runTrackerClick = !0), 
c.getColor(), c.getSymbol(), p(c.parallelArrays, function(a) {
c[a + "Data"] = [];
}), c.setData(b.data, !1), c.isCartesian && (a.hasCartesianSeries = !0), f.push(c), 
c._i = f.length - 1, ob(f, g), this.yAxis && ob(this.yAxis.series, g), p(f, function(a, b) {
a.index = b, a.name = a.name || "Series " + (b + 1);
});
},
bindAxes:function() {
var d, a = this, b = a.options, c = a.chart;
p(a.axisTypes || [], function(e) {
p(c[e], function(c) {
d = c.options, (b[e] === d.index || b[e] !== t && b[e] === d.id || b[e] === t && 0 === d.index) && (c.series.push(a), 
a[e] = c, c.isDirty = !0);
}), !a[e] && a.optionalAxis !== e && ra(18, !0);
});
},
updateParallelArrays:function(a, b) {
var c = a.series, d = arguments;
p(c.parallelArrays, "number" == typeof b ? function(d) {
var f = "y" === d && c.toYData ? c.toYData(a) :a[d];
c[d + "Data"][b] = f;
} :function(a) {
Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2));
});
},
autoIncrement:function() {
var a = this.options, b = this.xIncrement, b = m(b, a.pointStart, 0);
return this.pointInterval = m(this.pointInterval, a.pointInterval, 1), this.xIncrement = b + this.pointInterval, 
b;
},
getSegments:function() {
var c, a = -1, b = [], d = this.points, e = d.length;
if (e) if (this.options.connectNulls) {
for (c = e; c--; ) null === d[c].y && d.splice(c, 1);
d.length && (b = [ d ]);
} else p(d, function(c, g) {
null === c.y ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) :g === e - 1 && b.push(d.slice(a + 1, g + 1));
});
this.segments = b;
},
setOptions:function(a) {
var b = this.chart, c = b.options.plotOptions, b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type];
return this.userOptions = a, c = w(e, c.series, a), this.tooltipOptions = w(E.tooltip, E.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip), 
null === e.marker && delete c.marker, c;
},
getColor:function() {
var e, a = this.options, b = this.userOptions, c = this.chart.options.colors, d = this.chart.counters;
e = a.color || ba[this.type].color, e || a.colorByPoint || (r(b._colorIndex) ? a = b._colorIndex :(b._colorIndex = d.color, 
a = d.color++), e = c[a]), this.color = e, d.wrapColor(c.length);
},
getSymbol:function() {
var a = this.userOptions, b = this.options.marker, c = this.chart, d = c.options.symbols, c = c.counters;
this.symbol = b.symbol, this.symbol || (r(a._symbolIndex) ? a = a._symbolIndex :(a._symbolIndex = c.symbol, 
a = c.symbol++), this.symbol = d[a]), /^url/.test(this.symbol) && (b.radius = 0), 
c.wrapSymbol(d.length);
},
drawLegendSymbol:N.drawLineMarker,
setData:function(a, b, c, d) {
var h, e = this, f = e.points, g = f && f.length || 0, i = e.options, j = e.chart, k = null, l = e.xAxis, o = l && !!l.categories, n = e.tooltipPoints, s = i.turboThreshold, q = this.xData, r = this.yData, v = (h = e.pointArrayMap) && h.length, a = a || [];
if (h = a.length, b = m(b, !0), d === !1 || !h || g !== h || e.cropped || e.hasGroupedData) {
if (e.xIncrement = null, e.pointRange = o ? 1 :i.pointRange, e.colorCounter = 0, 
p(this.parallelArrays, function(a) {
e[a + "Data"].length = 0;
}), s && h > s) {
for (c = 0; null === k && h > c; ) k = a[c], c++;
if (ha(k)) {
for (o = m(i.pointStart, 0), i = m(i.pointInterval, 1), c = 0; h > c; c++) q[c] = o, 
r[c] = a[c], o += i;
e.xIncrement = o;
} else if (La(k)) if (v) for (c = 0; h > c; c++) i = a[c], q[c] = i[0], r[c] = i.slice(1, v + 1); else for (c = 0; h > c; c++) i = a[c], 
q[c] = i[0], r[c] = i[1]; else ra(12);
} else for (c = 0; h > c; c++) a[c] !== t && (i = {
series:e
}, e.pointClass.prototype.applyOptions.apply(i, [ a[c] ]), e.updateParallelArrays(i, c), 
o && i.name) && (l.names[i.x] = i.name);
for (Fa(r[0]) && ra(14, !0), e.data = [], e.options.data = a, c = g; c--; ) f[c] && f[c].destroy && f[c].destroy();
n && (n.length = 0), l && (l.minRange = l.userMinRange), e.isDirty = e.isDirtyData = j.isDirtyBox = !0, 
c = !1;
} else p(a, function(a, b) {
f[b].update(a, !1);
});
b && j.redraw(c);
},
processData:function(a) {
var e, b = this.xData, c = this.yData, d = b.length;
e = 0;
var f, g, o, n, h = this.xAxis, i = this.options, j = i.cropThreshold, k = 0, l = this.isCartesian;
if (l && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a) return !1;
for (l && this.sorted && (!j || d > j || this.forceCrop) && (o = h.min, n = h.max, 
b[d - 1] < o || b[0] > n ? (b = [], c = []) :(b[0] < o || b[d - 1] > n) && (e = this.cropData(this.xData, this.yData, o, n), 
b = e.xData, c = e.yData, e = e.start, f = !0, k = b.length)), d = b.length - 1; d >= 0; d--) a = b[d] - b[d - 1], 
!f && b[d] > o && b[d] < n && k++, a > 0 && (g === t || g > a) ? g = a :0 > a && this.requireSorting && ra(15);
this.cropped = f, this.cropStart = e, this.processedXData = b, this.processedYData = c, 
this.activePointCount = k, null === i.pointRange && (this.pointRange = g || 1), 
this.closestPointRange = g;
},
cropData:function(a, b, c, d) {
var i, e = a.length, f = 0, g = e, h = m(this.cropShoulder, 1);
for (i = 0; e > i; i++) if (a[i] >= c) {
f = v(0, i - h);
break;
}
for (;e > i; i++) if (a[i] > d) {
g = i + h;
break;
}
return {
xData:a.slice(f, g),
yData:b.slice(f, g),
start:f,
end:g
};
},
generatePoints:function() {
var c, i, k, o, a = this.options.data, b = this.data, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, j = this.hasGroupedData, l = [];
for (b || j || (b = [], b.length = a.length, b = this.data = b), o = 0; g > o; o++) i = h + o, 
j ? l[o] = new f().init(this, [ d[o] ].concat(qa(e[o]))) :(b[i] ? k = b[i] :a[i] !== t && (b[i] = k = new f().init(this, a[i], d[o])), 
l[o] = k);
if (b && (g !== (c = b.length) || j)) for (o = 0; c > o; o++) o === h && !j && (o += g), 
b[o] && (b[o].destroyElements(), b[o].plotX = t);
this.data = b, this.points = l;
},
getExtremes:function(a) {
var d, b = this.yAxis, c = this.processedXData, e = [], f = 0;
d = this.xAxis.getExtremes();
var i, j, k, l, g = d.min, h = d.max, a = a || this.stackedYData || this.processedYData;
for (d = a.length, l = 0; d > l; l++) if (j = c[l], k = a[l], i = null !== k && k !== t && (!b.isLog || k.length || k > 0), 
j = this.getExtremesFromAll || this.cropped || (c[l + 1] || j) >= g && (c[l - 1] || j) <= h, 
i && j) if (i = k.length) for (;i--; ) null !== k[i] && (e[f++] = k[i]); else e[f++] = k;
this.dataMin = m(void 0, Na(e)), this.dataMax = m(void 0, Ba(e));
},
translate:function() {
this.processedXData || this.processData(), this.generatePoints();
for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, i = a.pointPlacement, j = "between" === i || ha(i), k = a.threshold, a = 0; g > a; a++) {
var l = f[a], o = l.x, n = l.y, s = l.low, p = b && e.stacks[(this.negStacks && k > n ? "-" :"") + this.stackKey];
e.isLog && 0 >= n && (l.y = n = null), l.plotX = c.translate(o, 0, 0, 0, 1, i, "flags" === this.type), 
b && this.visible && p && p[o] && (p = p[o], n = p.points[this.index + "," + a], 
s = n[0], n = n[1], 0 === s && (s = m(k, e.min)), e.isLog && 0 >= s && (s = null), 
l.total = l.stackTotal = p.total, l.percentage = p.total && l.y / p.total * 100, 
l.stackY = n, p.setOffset(this.pointXOffset || 0, this.barW || 0)), l.yBottom = r(s) ? e.translate(s, 0, 1, 0, 1) :null, 
h && (n = this.modifyValue(n, l)), l.plotY = "number" == typeof n && 1/0 !== n ? e.translate(n, 0, 1, 0, 1) :t, 
l.clientX = j ? c.translate(o, 0, 0, 0, 1) :l.plotX, l.negative = l.y < (k || 0), 
l.category = d && d[l.x] !== t ? d[l.x] :l.x;
}
this.getSegments();
},
animate:function(a) {
var d, b = this.chart, c = b.renderer;
d = this.options.animation;
var g, e = this.clipBox || b.clipBox, f = b.inverted;
d && !ca(d) && (d = ba[this.type].animation), g = [ "_sharedClip", d.duration, d.easing, e.height ].join(","), 
a ? (a = b[g], d = b[g + "m"], a || (b[g] = a = c.clipRect(q(e, {
width:0
})), b[g + "m"] = d = c.clipRect(-99, f ? -b.plotLeft :-b.plotTop, 99, f ? b.chartWidth :b.chartHeight)), 
this.group.clip(a), this.markerGroup.clip(d), this.sharedClipKey = g) :((a = b[g]) && a.animate({
width:b.plotSizeX
}, d), b[g + "m"] && b[g + "m"].animate({
width:b.plotSizeX + 99
}, d), this.animate = null);
},
afterAnimate:function() {
var a = this.chart, b = this.sharedClipKey, c = this.group, d = this.clipBox;
c && this.options.clip !== !1 && (b && d || c.clip(d ? a.renderer.clipRect(d) :a.clipRect), 
this.markerGroup.clip()), D(this, "afterAnimate"), setTimeout(function() {
b && a[b] && (d || (a[b] = a[b].destroy()), a[b + "m"] && (a[b + "m"] = a[b + "m"].destroy()));
}, 100);
},
drawPoints:function() {
var a, d, e, f, g, h, i, j, k, b = this.points, c = this.chart;
d = this.options.marker;
var o, l = this.pointAttr[""], n = this.markerGroup, s = m(d.enabled, this.activePointCount < .5 * this.xAxis.len / d.radius);
if (d.enabled !== !1 || this._hasPointMarkers) for (f = b.length; f--; ) g = b[f], 
d = T(g.plotX), e = g.plotY, k = g.graphic, i = g.marker || {}, a = s && i.enabled === t || i.enabled, 
o = c.isInsidePlot(u(d), e, c.inverted), a && e !== t && !isNaN(e) && null !== g.y ? (a = g.pointAttr[g.selected ? "select" :""] || l, 
h = a.r, i = m(i.symbol, this.symbol), j = 0 === i.indexOf("url"), k ? k[o ? "show" :"hide"](!0).animate(q({
x:d - h,
y:e - h
}, k.symbolName ? {
width:2 * h,
height:2 * h
} :{})) :o && (h > 0 || j) && (g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h).attr(a).add(n))) :k && (g.graphic = k.destroy());
},
convertAttribs:function(a, b, c, d) {
var f, g, e = this.pointAttrToOptions, h = {}, a = a || {}, b = b || {}, c = c || {}, d = d || {};
for (f in e) g = e[f], h[f] = m(a[g], b[f], c[f], d[f]);
return h;
},
getAttribs:function() {
var f, a = this, b = a.options, c = ba[a.type].marker ? b.marker :b, d = c.states, e = d.hover, g = a.color;
f = {
stroke:g,
fill:g
};
var i, k, h = a.points || [], j = [], l = a.pointAttrToOptions;
k = a.hasPointSpecificOptions;
var o = b.negativeColor, n = c.lineColor, s = c.fillColor;
i = b.turboThreshold;
var m;
if (b.marker ? (e.radius = e.radius || c.radius + 2, e.lineWidth = e.lineWidth || c.lineWidth + 1) :e.color = e.color || ya(e.color || g).brighten(e.brightness).get(), 
j[""] = a.convertAttribs(c, f), p([ "hover", "select" ], function(b) {
j[b] = a.convertAttribs(d[b], j[""]);
}), a.pointAttr = j, g = h.length, !i || i > g || k) for (;g--; ) {
if (i = h[g], (c = i.options && i.options.marker || i.options) && c.enabled === !1 && (c.radius = 0), 
i.negative && o && (i.color = i.fillColor = o), k = b.colorByPoint || i.color, i.options) for (m in l) r(c[l[m]]) && (k = !0);
k ? (c = c || {}, k = [], d = c.states || {}, f = d.hover = d.hover || {}, b.marker || (f.color = f.color || !i.options.color && e.color || ya(i.color).brighten(f.brightness || e.brightness).get()), 
f = {
color:i.color
}, s || (f.fillColor = i.color), n || (f.lineColor = i.color), k[""] = a.convertAttribs(q(f, c), j[""]), 
k.hover = a.convertAttribs(d.hover, j.hover, k[""]), k.select = a.convertAttribs(d.select, j.select, k[""])) :k = j, 
i.pointAttr = k;
}
},
destroy:function() {
var d, e, g, h, i, a = this, b = a.chart, c = /AppleWebKit\/533/.test(wa), f = a.data || [];
for (D(a, "destroy"), W(a), p(a.axisTypes || [], function(b) {
(i = a[b]) && (ja(i.series, a), i.isDirty = i.forceRedraw = !0);
}), a.legendItem && a.chart.legend.destroyItem(a), e = f.length; e--; ) (g = f[e]) && g.destroy && g.destroy();
a.points = null, clearTimeout(a.animationTimeout), p("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function(b) {
a[b] && (d = c && "group" === b ? "hide" :"destroy", a[b][d]());
}), b.hoverSeries === a && (b.hoverSeries = null), ja(b.series, a);
for (h in a) delete a[h];
},
getSegmentPath:function(a) {
var b = this, c = [], d = b.options.step;
return p(a, function(e, f) {
var i, g = e.plotX, h = e.plotY;
b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) :(c.push(f ? "L" :"M"), 
d && f && (i = a[f - 1], "right" === d ? c.push(i.plotX, h) :"center" === d ? c.push((i.plotX + g) / 2, i.plotY, (i.plotX + g) / 2, h) :c.push(g, i.plotY)), 
c.push(e.plotX, e.plotY));
}), c;
},
getGraphPath:function() {
var c, a = this, b = [], d = [];
return p(a.segments, function(e) {
c = a.getSegmentPath(e), e.length > 1 ? b = b.concat(c) :d.push(e[0]);
}), a.singlePoints = d, a.graphPath = b;
},
drawGraph:function() {
var a = this, b = this.options, c = [ [ "graph", b.lineColor || this.color ] ], d = b.lineWidth, e = b.dashStyle, f = "square" !== b.linecap, g = this.getGraphPath(), h = b.negativeColor;
h && c.push([ "graphNeg", h ]), p(c, function(c, h) {
var k = c[0], l = a[k];
l ? (bb(l), l.animate({
d:g
})) :d && g.length && (l = {
stroke:c[1],
"stroke-width":d,
fill:Q,
zIndex:1
}, e ? l.dashstyle = e :f && (l["stroke-linecap"] = l["stroke-linejoin"] = "round"), 
a[k] = a.chart.renderer.path(g).attr(l).add(a.group).shadow(!h && b.shadow));
});
},
clipNeg:function() {
var e, a = this.options, b = this.chart, c = b.renderer, d = a.negativeColor || a.negativeFillColor, f = this.graph, g = this.area, h = this.posClip, i = this.negClip;
e = b.chartWidth;
var j = b.chartHeight, k = v(e, j), l = this.yAxis;
d && (f || g) && (d = u(l.toPixels(a.threshold || 0, !0)), 0 > d && (k -= d), a = {
x:0,
y:0,
width:k,
height:d
}, k = {
x:0,
y:d,
width:k,
height:k
}, b.inverted && (a.height = k.y = b.plotWidth - d, c.isVML && (a = {
x:b.plotWidth - d - b.plotLeft,
y:0,
width:e,
height:j
}, k = {
x:d + b.plotLeft - e,
y:0,
width:b.plotLeft + d,
height:e
})), l.reversed ? (b = k, e = a) :(b = a, e = k), h ? (h.animate(b), i.animate(e)) :(this.posClip = h = c.clipRect(b), 
this.negClip = i = c.clipRect(e), f && this.graphNeg && (f.clip(h), this.graphNeg.clip(i)), 
g && (g.clip(h), this.areaNeg.clip(i))));
},
invertGroups:function() {
function a() {
var a = {
width:b.yAxis.len,
height:b.xAxis.len
};
p([ "group", "markerGroup" ], function(c) {
b[c] && b[c].attr(a).invert();
});
}
var b = this, c = b.chart;
b.xAxis && (K(c, "resize", a), K(b, "destroy", function() {
W(c, "resize", a);
}), a(), b.invertGroups = a);
},
plotGroup:function(a, b, c, d, e) {
var f = this[a], g = !f;
return g && (this[a] = f = this.chart.renderer.g(b).attr({
visibility:c,
zIndex:d || .1
}).add(e)), f[g ? "attr" :"animate"](this.getPlotBox()), f;
},
getPlotBox:function() {
var a = this.chart, b = this.xAxis, c = this.yAxis;
return a.inverted && (b = c, c = this.xAxis), {
translateX:b ? b.left :a.plotLeft,
translateY:c ? c.top :a.plotTop,
scaleX:1,
scaleY:1
};
},
render:function() {
var c, a = this, b = a.chart, d = a.options, e = (c = d.animation) && !!a.animate && b.renderer.isSVG && m(c.duration, 500) || 0, f = a.visible ? "visible" :"hidden", g = d.zIndex, h = a.hasRendered, i = b.seriesGroup;
c = a.plotGroup("group", "series", f, g, i), a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, i), 
e && a.animate(!0), a.getAttribs(), c.inverted = a.isCartesian ? b.inverted :!1, 
a.drawGraph && (a.drawGraph(), a.clipNeg()), a.drawDataLabels && a.drawDataLabels(), 
a.visible && a.drawPoints(), a.drawTracker && a.options.enableMouseTracking !== !1 && a.drawTracker(), 
b.inverted && a.invertGroups(), d.clip !== !1 && !a.sharedClipKey && !h && c.clip(b.clipRect), 
e && a.animate(), h || (e ? a.animationTimeout = setTimeout(function() {
a.afterAnimate();
}, e) :a.afterAnimate()), a.isDirty = a.isDirtyData = !1, a.hasRendered = !0;
},
redraw:function() {
var a = this.chart, b = this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
c && (a.inverted && c.attr({
width:a.plotWidth,
height:a.plotHeight
}), c.animate({
translateX:m(d && d.left, a.plotLeft),
translateY:m(e && e.top, a.plotTop)
})), this.translate(), this.setTooltipPoints && this.setTooltipPoints(!0), this.render(), 
b && D(this, "updatedData");
}
}, Hb.prototype = {
destroy:function() {
Oa(this, this.axis);
},
render:function(a) {
var b = this.options, c = b.format, c = c ? Ia(c, this) :b.formatter.call(this);
this.label ? this.label.attr({
text:c,
visibility:"hidden"
}) :this.label = this.axis.chart.renderer.text(c, null, null, b.useHTML).css(b.style).attr({
align:this.textAlign,
rotation:b.rotation,
visibility:"hidden"
}).add(a);
},
setOffset:function(a, b) {
var c = this.axis, d = c.chart, e = d.inverted, f = this.isNegative, g = c.translate(c.usePercentage ? 100 :this.total, 0, 0, 0, 1), c = c.translate(0), c = M(g - c), h = d.xAxis[0].translate(this.x) + a, i = d.plotHeight, f = {
x:e ? f ? g :g - c :h,
y:e ? i - h - b :f ? i - g - c :i - g,
width:e ? c :b,
height:e ? b :c
};
(e = this.label) && (e.align(this.alignOptions, null, f), f = e.alignAttr, e[this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? "show" :"hide"](!0));
}
}, la.prototype.buildStacks = function() {
var a = this.series, b = m(this.options.reversedStacks, !0), c = a.length;
if (!this.isXAxis) {
for (this.usePercentage = !1; c--; ) a[b ? c :a.length - c - 1].setStackedPoints();
if (this.usePercentage) for (c = 0; c < a.length; c++) a[c].setPercentStacks();
}
}, la.prototype.renderStackTotals = function() {
var d, e, a = this.chart, b = a.renderer, c = this.stacks, f = this.stackTotalGroup;
f || (this.stackTotalGroup = f = b.g("stack-labels").attr({
visibility:"visible",
zIndex:6
}).add()), f.translate(a.plotLeft, a.plotTop);
for (d in c) for (e in a = c[d]) a[e].render(f);
}, O.prototype.setStackedPoints = function() {
if (this.options.stacking && (this.visible === !0 || this.chart.options.chart.ignoreHiddenSeries === !1)) {
var n, m, p, q, r, u, a = this.processedXData, b = this.processedYData, c = [], d = b.length, e = this.options, f = e.threshold, g = e.stack, e = e.stacking, h = this.stackKey, i = "-" + h, j = this.negStacks, k = this.yAxis, l = k.stacks, o = k.oldStacks;
for (q = 0; d > q; q++) r = a[q], u = b[q], p = this.index + "," + q, m = (n = j && f > u) ? i :h, 
l[m] || (l[m] = {}), l[m][r] || (o[m] && o[m][r] ? (l[m][r] = o[m][r], l[m][r].total = null) :l[m][r] = new Hb(k, k.options.stackLabels, n, r, g)), 
m = l[m][r], m.points[p] = [ m.cum || 0 ], "percent" === e ? (n = n ? h :i, j && l[n] && l[n][r] ? (n = l[n][r], 
m.total = n.total = v(n.total, m.total) + M(u) || 0) :m.total = da(m.total + (M(u) || 0))) :m.total = da(m.total + (u || 0)), 
m.cum = (m.cum || 0) + (u || 0), m.points[p].push(m.cum), c[q] = m.cum;
"percent" === e && (k.usePercentage = !0), this.stackedYData = c, k.oldStacks = {};
}
}, O.prototype.setPercentStacks = function() {
var a = this, b = a.stackKey, c = a.yAxis.stacks, d = a.processedXData;
p([ b, "-" + b ], function(b) {
for (var e, g, h, f = d.length; f--; ) g = d[f], e = (h = c[b] && c[b][g]) && h.points[a.index + "," + f], 
(g = e) && (h = h.total ? 100 / h.total :0, g[0] = da(g[0] * h), g[1] = da(g[1] * h), 
a.stackedYData[f] = g[1]);
});
}, q(Ya.prototype, {
addSeries:function(a, b, c) {
var d, e = this;
return a && (b = m(b, !0), D(e, "addSeries", {
options:a
}, function() {
d = e.initSeries(a), e.isDirtyLegend = !0, e.linkSeries(), b && e.redraw(c);
})), d;
},
addAxis:function(a, b, c, d) {
var e = b ? "xAxis" :"yAxis", f = this.options;
new la(this, w(a, {
index:this[e].length,
isX:b
})), f[e] = qa(f[e] || {}), f[e].push(a), m(c, !0) && this.redraw(d);
},
showLoading:function(a) {
var b = this.options, c = this.loadingDiv, d = b.loading;
c || (this.loadingDiv = c = Y(Ja, {
className:"highcharts-loading"
}, q(d.style, {
zIndex:10,
display:Q
}), this.container), this.loadingSpan = Y("span", null, d.labelStyle, c)), this.loadingSpan.innerHTML = a || b.lang.loading, 
this.loadingShown || (G(c, {
opacity:0,
display:"",
left:this.plotLeft + "px",
top:this.plotTop + "px",
width:this.plotWidth + "px",
height:this.plotHeight + "px"
}), kb(c, {
opacity:d.style.opacity
}, {
duration:d.showDuration || 0
}), this.loadingShown = !0);
},
hideLoading:function() {
var a = this.options, b = this.loadingDiv;
b && kb(b, {
opacity:0
}, {
duration:a.loading.hideDuration || 100,
complete:function() {
G(b, {
display:Q
});
}
}), this.loadingShown = !1;
}
}), q(Ea.prototype, {
update:function(a, b, c) {
var g, d = this, e = d.series, f = d.graphic, h = e.data, i = e.chart, j = e.options, b = m(b, !0);
d.firePointEvent("update", {
options:a
}, function() {
d.applyOptions(a), ca(a) && (e.getAttribs(), f && (a && a.marker && a.marker.symbol ? d.graphic = f.destroy() :f.attr(d.pointAttr[d.state || ""])), 
a && a.dataLabels && d.dataLabel && (d.dataLabel = d.dataLabel.destroy())), g = Da(d, h), 
e.updateParallelArrays(d, g), j.data[g] = d.options, e.isDirty = e.isDirtyData = !0, 
!e.fixedBox && e.hasCartesianSeries && (i.isDirtyBox = !0), "point" === j.legendType && i.legend.destroyItem(d), 
b && i.redraw(c);
});
},
remove:function(a, b) {
var g, c = this, d = c.series, e = d.points, f = d.chart, h = d.data;
Qa(b, f), a = m(a, !0), c.firePointEvent("remove", null, function() {
g = Da(c, h), h.length === e.length && e.splice(g, 1), h.splice(g, 1), d.options.data.splice(g, 1), 
d.updateParallelArrays(c, "splice", g, 1), c.destroy(), d.isDirty = !0, d.isDirtyData = !0, 
a && f.redraw();
});
}
}), q(O.prototype, {
addPoint:function(a, b, c, d) {
var o, e = this.options, f = this.data, g = this.graph, h = this.area, i = this.chart, j = this.xAxis && this.xAxis.names, k = g && g.shift || 0, l = e.data, n = this.xData;
if (Qa(d, i), c && p([ g, h, this.graphNeg, this.areaNeg ], function(a) {
a && (a.shift = k + 1);
}), h && (h.isArea = !0), b = m(b, !0), d = {
series:this
}, this.pointClass.prototype.applyOptions.apply(d, [ a ]), g = d.x, h = n.length, 
this.requireSorting && g < n[h - 1]) for (o = !0; h && n[h - 1] > g; ) h--;
this.updateParallelArrays(d, "splice", h, 0, 0), this.updateParallelArrays(d, h), 
j && (j[g] = d.name), l.splice(h, 0, a), o && (this.data.splice(h, 0, null), this.processData()), 
"point" === e.legendType && this.generatePoints(), c && (f[0] && f[0].remove ? f[0].remove(!1) :(f.shift(), 
this.updateParallelArrays(d, "shift"), l.shift())), this.isDirtyData = this.isDirty = !0, 
b && (this.getAttribs(), i.redraw());
},
remove:function(a, b) {
var c = this, d = c.chart, a = m(a, !0);
c.isRemoving || (c.isRemoving = !0, D(c, "remove", null, function() {
c.destroy(), d.isDirtyLegend = d.isDirtyBox = !0, d.linkSeries(), a && d.redraw(b);
})), c.isRemoving = !1;
},
update:function(a, b) {
var f, c = this.chart, d = this.type, e = F[d].prototype, a = w(this.userOptions, {
animation:!1,
index:this.index,
pointStart:this.xData[0]
}, {
data:this.options.data
}, a);
this.remove(!1);
for (f in e) e.hasOwnProperty(f) && (this[f] = t);
q(this, F[a.type || d].prototype), this.init(c, a), m(b, !0) && c.redraw(!1);
}
}), q(la.prototype, {
update:function(a, b) {
var c = this.chart, a = c.options[this.coll][this.options.index] = w(this.userOptions, a);
this.destroy(!0), this._addedPlotLB = t, this.init(c, q(a, {
events:t
})), c.isDirtyBox = !0, m(b, !0) && c.redraw();
},
remove:function(a) {
for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--; ) d[e] && d[e].remove(!1);
ja(b.axes, this), ja(b[c], this), b.options[c].splice(this.options.index, 1), p(b[c], function(a, b) {
a.options.index = b;
}), this.destroy(), b.isDirtyBox = !0, m(a, !0) && b.redraw();
},
setTitle:function(a, b) {
this.update({
title:a
}, b);
},
setCategories:function(a, b) {
this.update({
categories:a
}, b);
}
}), ga = ka(O), F.line = ga, ba.area = w(S, {
threshold:0
});
var pa = ka(O, {
type:"area",
getSegments:function() {
var h, i, l, o, n, a = [], b = [], c = [], d = this.xAxis, e = this.yAxis, f = e.stacks[this.stackKey], g = {}, j = this.points, k = this.options.connectNulls;
if (this.options.stacking && !this.cropped) {
for (o = 0; o < j.length; o++) g[j[o].x] = j[o];
for (n in f) null !== f[n].total && c.push(+n);
c.sort(function(a, b) {
return a - b;
}), p(c, function(a) {
(!k || g[a] && null !== g[a].y) && (g[a] ? b.push(g[a]) :(h = d.translate(a), l = f[a].percent ? f[a].total ? 100 * f[a].cum / f[a].total :0 :f[a].cum, 
i = e.toPixels(l, !0), b.push({
y:null,
plotX:h,
clientX:h,
plotY:i,
yBottom:i,
onMouseOver:sa
})));
}), b.length && a.push(b);
} else O.prototype.getSegments.call(this), a = this.segments;
this.segments = a;
},
getSegmentPath:function(a) {
var d, b = O.prototype.getSegmentPath.call(this, a), c = [].concat(b), e = this.options;
d = b.length;
var g, f = this.yAxis.getThreshold(e.threshold);
if (3 === d && c.push("L", b[1], b[2]), e.stacking && !this.closedStacks) for (d = a.length - 1; d >= 0; d--) g = m(a[d].yBottom, f), 
d < a.length - 1 && e.step && c.push(a[d + 1].plotX, g), c.push(a[d].plotX, g); else this.closeSegment(c, a, f);
return this.areaPath = this.areaPath.concat(c), b;
},
closeSegment:function(a, b, c) {
a.push("L", b[b.length - 1].plotX, c, "L", b[0].plotX, c);
},
drawGraph:function() {
this.areaPath = [], O.prototype.drawGraph.apply(this);
var a = this, b = this.areaPath, c = this.options, d = c.negativeColor, e = c.negativeFillColor, f = [ [ "area", this.color, c.fillColor ] ];
(d || e) && f.push([ "areaNeg", d, e ]), p(f, function(d) {
var e = d[0], f = a[e];
f ? f.animate({
d:b
}) :a[e] = a.chart.renderer.path(b).attr({
fill:m(d[2], ya(d[1]).setOpacity(m(c.fillOpacity, .75)).get()),
zIndex:0
}).add(a.group);
});
},
drawLegendSymbol:N.drawRectangle
});
F.area = pa, ba.spline = w(S), ga = ka(O, {
type:"spline",
getPointSpline:function(a, b, c) {
var h, i, j, k, d = b.plotX, e = b.plotY, f = a[c - 1], g = a[c + 1];
if (f && g) {
a = f.plotY, j = g.plotX;
var l, g = g.plotY;
h = (1.5 * d + f.plotX) / 2.5, i = (1.5 * e + a) / 2.5, j = (1.5 * d + j) / 2.5, 
k = (1.5 * e + g) / 2.5, l = (k - i) * (j - d) / (j - h) + e - k, i += l, k += l, 
i > a && i > e ? (i = v(a, e), k = 2 * e - i) :a > i && e > i && (i = C(a, e), k = 2 * e - i), 
k > g && k > e ? (k = v(g, e), i = 2 * e - k) :g > k && e > k && (k = C(g, e), i = 2 * e - k), 
b.rightContX = j, b.rightContY = k;
}
return c ? (b = [ "C", f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, i || e, d, e ], 
f.rightContX = f.rightContY = null) :b = [ "M", d, e ], b;
}
}), F.spline = ga, ba.areaspline = w(ba.area), pa = pa.prototype, ga = ka(ga, {
type:"areaspline",
closedStacks:!0,
getSegmentPath:pa.getSegmentPath,
closeSegment:pa.closeSegment,
drawGraph:pa.drawGraph,
drawLegendSymbol:N.drawRectangle
}), F.areaspline = ga, ba.column = w(S, {
borderColor:"#FFFFFF",
borderRadius:0,
groupPadding:.2,
marker:null,
pointPadding:.1,
minPointLength:0,
cropThreshold:50,
pointRange:null,
states:{
hover:{
brightness:.1,
shadow:!1,
halo:!1
},
select:{
color:"#C0C0C0",
borderColor:"#000000",
shadow:!1
}
},
dataLabels:{
align:null,
verticalAlign:null,
y:null
},
stickyTracking:!1,
tooltip:{
distance:6
},
threshold:0
}), ga = ka(O, {
type:"column",
pointAttrToOptions:{
stroke:"borderColor",
fill:"color",
r:"borderRadius"
},
cropShoulder:0,
trackerGroups:[ "group", "dataLabelsGroup" ],
negStacks:!0,
init:function() {
O.prototype.init.apply(this, arguments);
var a = this, b = a.chart;
b.hasRendered && p(b.series, function(b) {
b.type === a.type && (b.isDirty = !0);
});
},
getColumnMetrics:function() {
var f, h, a = this, b = a.options, c = a.xAxis, d = a.yAxis, e = c.reversed, g = {}, i = 0;
b.grouping === !1 ? i = 1 :p(a.chart.series, function(b) {
var c = b.options, e = b.yAxis;
b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos && (c.stacking ? (f = b.stackKey, 
g[f] === t && (g[f] = i++), h = g[f]) :c.grouping !== !1 && (h = i++), b.columnIndex = h);
});
var c = C(M(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len), j = c * b.groupPadding, k = (c - 2 * j) / i, l = b.pointWidth, b = r(l) ? (k - l) / 2 :k * b.pointPadding, l = m(l, k - 2 * b);
return a.columnMetrics = {
width:l,
offset:b + (j + ((e ? i - (a.columnIndex || 0) :a.columnIndex) || 0) * k - c / 2) * (e ? -1 :1)
};
},
translate:function() {
var a = this, b = a.chart, c = a.options, d = a.borderWidth = m(c.borderWidth, a.activePointCount > .5 * a.xAxis.len ? 0 :1), e = a.yAxis, f = a.translatedThreshold = e.getThreshold(c.threshold), g = m(c.minPointLength, 5), c = a.getColumnMetrics(), h = c.width, i = a.barW = Ka(v(h, 1 + 2 * d)), j = a.pointXOffset = c.offset, k = -(d % 2 ? .5 :0), l = d % 2 ? .5 :1;
b.renderer.isVML && b.inverted && (l += 1), O.prototype.translate.apply(a), p(a.points, function(c) {
var x, d = m(c.yBottom, f), p = C(v(-999 - d, c.plotY), e.len + 999 + d), q = c.plotX + j, r = i, t = C(p, d);
x = v(p, d) - t, M(x) < g && g && (x = g, t = u(M(t - f) > g ? d - g :f - (e.translate(c.y, 0, 1, 0, 1) <= f ? g :0))), 
c.barX = q, c.pointWidth = h, c.tooltipPos = b.inverted ? [ e.len - p, a.xAxis.len - q - r / 2 ] :[ q + r / 2, p ], 
d = M(q) < .5, r = u(q + r) + k, q = u(q) + k, r -= q, p = M(t) < .5, x = u(t + x) + l, 
t = u(t) + l, x -= t, d && (q += 1, r -= 1), p && (t -= 1, x += 1), c.shapeType = "rect", 
c.shapeArgs = {
x:q,
y:t,
width:r,
height:x
};
});
},
getSymbol:sa,
drawLegendSymbol:N.drawRectangle,
drawGraph:sa,
drawPoints:function() {
var f, g, h, a = this, b = this.chart, c = a.options, d = b.renderer, e = c.animationLimit || 250;
p(a.points, function(i) {
var j = i.plotY, k = i.graphic;
j === t || isNaN(j) || null === i.y ? k && (i.graphic = k.destroy()) :(f = i.shapeArgs, 
h = r(a.borderWidth) ? {
"stroke-width":a.borderWidth
} :{}, g = i.pointAttr[i.selected ? "select" :""] || a.pointAttr[""], k ? (bb(k), 
k.attr(h)[b.pointCount < e ? "animate" :"attr"](w(f))) :i.graphic = d[i.shapeType](f).attr(g).attr(h).add(a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius));
});
},
animate:function(a) {
var b = this.yAxis, c = this.options, d = this.chart.inverted, e = {};
aa && (a ? (e.scaleY = .001, a = C(b.pos + b.len, v(b.pos, b.toPixels(c.threshold))), 
d ? e.translateX = a - b.len :e.translateY = a, this.group.attr(e)) :(e.scaleY = 1, 
e[d ? "translateX" :"translateY"] = b.pos, this.group.animate(e, this.options.animation), 
this.animate = null));
},
remove:function() {
var a = this, b = a.chart;
b.hasRendered && p(b.series, function(b) {
b.type === a.type && (b.isDirty = !0);
}), O.prototype.remove.apply(a, arguments);
}
}), F.column = ga, ba.bar = w(ba.column), pa = ka(ga, {
type:"bar",
inverted:!0
}), F.bar = pa, ba.scatter = w(S, {
lineWidth:0,
tooltip:{
headerFormat:'<span style="color:{series.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
},
stickyTracking:!1
}), pa = ka(O, {
type:"scatter",
sorted:!1,
requireSorting:!1,
noSharedTooltip:!0,
trackerGroups:[ "markerGroup" ],
takeOrdinalPosition:!1,
singularTooltips:!0,
drawGraph:function() {
this.options.lineWidth && O.prototype.drawGraph.call(this);
}
}), F.scatter = pa, ba.pie = w(S, {
borderColor:"#FFFFFF",
borderWidth:1,
center:[ null, null ],
clip:!1,
colorByPoint:!0,
dataLabels:{
distance:30,
enabled:!0,
formatter:function() {
return this.point.name;
}
},
ignoreHiddenPoint:!0,
legendType:"point",
marker:null,
size:null,
showInLegend:!1,
slicedOffset:10,
states:{
hover:{
brightness:.1,
shadow:!1
}
},
stickyTracking:!1,
tooltip:{
followPointer:!0
}
}), S = {
type:"pie",
isCartesian:!1,
pointClass:ka(Ea, {
init:function() {
Ea.prototype.init.apply(this, arguments);
var b, a = this;
return a.y < 0 && (a.y = null), q(a, {
visible:a.visible !== !1,
name:m(a.name, "Slice")
}), b = function(b) {
a.slice("select" === b.type);
}, K(a, "select", b), K(a, "unselect", b), a;
},
setVisible:function(a) {
var b = this, c = b.series, d = c.chart;
b.visible = b.options.visible = a = a === t ? !b.visible :a, c.options.data[Da(b, c.data)] = b.options, 
p([ "graphic", "dataLabel", "connector", "shadowGroup" ], function(c) {
b[c] && b[c][a ? "show" :"hide"](!0);
}), b.legendItem && d.legend.colorizeItem(b, a), !c.isDirty && c.options.ignoreHiddenPoint && (c.isDirty = !0, 
d.redraw());
},
slice:function(a, b, c) {
var d = this.series;
Qa(c, d.chart), m(b, !0), this.sliced = this.options.sliced = a = r(a) ? a :!this.sliced, 
d.options.data[Da(this, d.data)] = this.options, a = a ? this.slicedTranslation :{
translateX:0,
translateY:0
}, this.graphic.animate(a), this.shadowGroup && this.shadowGroup.animate(a);
},
haloPath:function(a) {
var b = this.shapeArgs, c = this.series.chart;
return this.series.chart.renderer.symbols.arc(c.plotLeft + b.x, c.plotTop + b.y, b.r + a, b.r + a, {
innerR:this.shapeArgs.r,
start:b.start,
end:b.end
});
}
}),
requireSorting:!1,
noSharedTooltip:!0,
trackerGroups:[ "group", "dataLabelsGroup" ],
axisTypes:[],
pointAttrToOptions:{
stroke:"borderColor",
"stroke-width":"borderWidth",
fill:"color"
},
singularTooltips:!0,
getColor:sa,
animate:function(a) {
var b = this, c = b.points, d = b.startAngleRad;
a || (p(c, function(a) {
var c = a.graphic, a = a.shapeArgs;
c && (c.attr({
r:b.center[3] / 2,
start:d,
end:d
}), c.animate({
r:a.r,
start:a.start,
end:a.end
}, b.options.animation));
}), b.animate = null);
},
setData:function(a, b, c, d) {
O.prototype.setData.call(this, a, !1, c, d), this.processData(), this.generatePoints(), 
m(b, !0) && this.chart.redraw(c);
},
generatePoints:function() {
var a, c, d, e, b = 0, f = this.options.ignoreHiddenPoint;
for (O.prototype.generatePoints.call(this), c = this.points, d = c.length, a = 0; d > a; a++) e = c[a], 
b += f && !e.visible ? 0 :e.y;
for (this.total = b, a = 0; d > a; a++) e = c[a], e.percentage = b > 0 ? e.y / b * 100 :0, 
e.total = b;
},
translate:function(a) {
this.generatePoints();
var f, g, h, o, p, b = 0, c = this.options, d = c.slicedOffset, e = d + c.borderWidth, i = c.startAngle || 0, j = this.startAngleRad = ma / 180 * (i - 90), i = (this.endAngleRad = ma / 180 * (m(c.endAngle, i + 360) - 90)) - j, k = this.points, l = c.dataLabels.distance, c = c.ignoreHiddenPoint, n = k.length;
for (a || (this.center = a = this.getCenter()), this.getX = function(b, c) {
return h = U.asin(C((b - a[1]) / (a[2] / 2 + l), 1)), a[0] + (c ? -1 :1) * Z(h) * (a[2] / 2 + l);
}, o = 0; n > o; o++) p = k[o], f = j + b * i, (!c || p.visible) && (b += p.percentage / 100), 
g = j + b * i, p.shapeType = "arc", p.shapeArgs = {
x:a[0],
y:a[1],
r:a[2] / 2,
innerR:a[3] / 2,
start:u(1e3 * f) / 1e3,
end:u(1e3 * g) / 1e3
}, h = (g + f) / 2, h > 1.5 * ma ? h -= 2 * ma :-ma / 2 > h && (h += 2 * ma), p.slicedTranslation = {
translateX:u(Z(h) * d),
translateY:u(ea(h) * d)
}, f = Z(h) * a[2] / 2, g = ea(h) * a[2] / 2, p.tooltipPos = [ a[0] + .7 * f, a[1] + .7 * g ], 
p.half = -ma / 2 > h || h > ma / 2 ? 1 :0, p.angle = h, e = C(e, l / 2), p.labelPos = [ a[0] + f + Z(h) * l, a[1] + g + ea(h) * l, a[0] + f + Z(h) * e, a[1] + g + ea(h) * e, a[0] + f, a[1] + g, 0 > l ? "center" :p.half ? "right" :"left", h ];
},
drawGraph:null,
drawPoints:function() {
var c, d, f, g, a = this, b = a.chart.renderer, e = a.options.shadow;
e && !a.shadowGroup && (a.shadowGroup = b.g("shadow").add(a.group)), p(a.points, function(h) {
d = h.graphic, g = h.shapeArgs, f = h.shadowGroup, e && !f && (f = h.shadowGroup = b.g("shadow").add(a.shadowGroup)), 
c = h.sliced ? h.slicedTranslation :{
translateX:0,
translateY:0
}, f && f.attr(c), d ? d.animate(q(g, c)) :h.graphic = d = b[h.shapeType](g).setRadialReference(a.center).attr(h.pointAttr[h.selected ? "select" :""]).attr({
"stroke-linejoin":"round"
}).attr(c).add(a.group).shadow(e, f), void 0 !== h.visible && h.setVisible(h.visible);
});
},
sortByAngle:function(a, b) {
a.sort(function(a, d) {
return void 0 !== a.angle && (d.angle - a.angle) * b;
});
},
drawLegendSymbol:N.drawRectangle,
getCenter:X.getCenter,
getSymbol:sa
}, S = ka(O, S), F.pie = S, O.prototype.drawDataLabels = function() {
var f, g, h, i, a = this, b = a.options, c = b.cursor, d = b.dataLabels, e = a.points;
(d.enabled || a._hasPointLabels) && (a.dlProcessOptions && a.dlProcessOptions(d), 
i = a.plotGroup("dataLabelsGroup", "data-labels", "hidden", d.zIndex || 6), !a.hasRendered && m(d.defer, !0) && (i.attr({
opacity:0
}), K(a, "afterAnimate", function() {
a.dataLabelsGroup.show()[b.animation ? "animate" :"attr"]({
opacity:1
}, {
duration:200
});
})), g = d, p(e, function(b) {
var e, o, n, l = b.dataLabel, p = b.connector, u = !0;
if (f = b.options && b.options.dataLabels, e = m(f && f.enabled, g.enabled), l && !e) b.dataLabel = l.destroy(); else if (e) {
if (d = w(g, f), e = d.rotation, o = b.getLabelConfig(), h = d.format ? Ia(d.format, o) :d.formatter.call(o, d), 
d.style.color = m(d.color, d.style.color, a.color, "black"), l) r(h) ? (l.attr({
text:h
}), u = !1) :(b.dataLabel = l = l.destroy(), p && (b.connector = p.destroy())); else if (r(h)) {
l = {
fill:d.backgroundColor,
stroke:d.borderColor,
"stroke-width":d.borderWidth,
r:d.borderRadius || 0,
rotation:e,
padding:d.padding,
zIndex:1
};
for (n in l) l[n] === t && delete l[n];
l = b.dataLabel = a.chart.renderer[e ? "text" :"label"](h, 0, -999, null, null, null, d.useHTML).attr(l).css(q(d.style, c && {
cursor:c
})).add(i).shadow(d.shadow);
}
l && a.alignDataLabel(b, l, d, null, u);
}
}));
}, O.prototype.alignDataLabel = function(a, b, c, d, e) {
var f = this.chart, g = f.inverted, h = m(a.plotX, -999), i = m(a.plotY, -999), j = b.getBBox();
(a = this.visible && (a.series.forceDL || f.isInsidePlot(h, u(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 :d.y + d.height - 1, g))) && (d = q({
x:g ? f.plotWidth - i :h,
y:u(g ? f.plotHeight - h :i),
width:0,
height:0
}, d), q(c, {
width:j.width,
height:j.height
}), c.rotation ? (g = {
align:c.align,
x:d.x + c.x + d.width / 2,
y:d.y + c.y + d.height / 2
}, b[e ? "attr" :"animate"](g)) :(b.align(c, null, d), g = b.alignAttr, "justify" === m(c.overflow, "justify") ? this.justifyDataLabel(b, c, g, j, d, e) :m(c.crop, !0) && (a = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + j.width, g.y + j.height)))), 
a || (b.attr({
y:-999
}), b.placed = !1);
}, O.prototype.justifyDataLabel = function(a, b, c, d, e, f) {
var j, k, g = this.chart, h = b.align, i = b.verticalAlign;
j = c.x, 0 > j && ("right" === h ? b.align = "left" :b.x = -j, k = !0), j = c.x + d.width, 
j > g.plotWidth && ("left" === h ? b.align = "right" :b.x = g.plotWidth - j, k = !0), 
j = c.y, 0 > j && ("bottom" === i ? b.verticalAlign = "top" :b.y = -j, k = !0), 
j = c.y + d.height, j > g.plotHeight && ("top" === i ? b.verticalAlign = "bottom" :b.y = g.plotHeight - j, 
k = !0), k && (a.placed = !f, a.align(b, null, e));
}, F.pie && (F.pie.prototype.drawDataLabels = function() {
var c, i, j, t, w, x, y, A, C, G, D, B, a = this, b = a.data, d = a.chart, e = a.options.dataLabels, f = m(e.connectorPadding, 10), g = m(e.connectorWidth, 1), h = d.plotWidth, d = d.plotHeight, k = m(e.softConnector, !0), l = e.distance, o = a.center, n = o[2] / 2, q = o[1], r = l > 0, z = [ [], [] ], F = [ 0, 0, 0, 0 ], N = function(a, b) {
return b.y - a.y;
};
if (a.visible && (e.enabled || a._hasPointLabels)) {
for (O.prototype.drawDataLabels.apply(a), p(b, function(a) {
a.dataLabel && a.visible && z[a.half].push(a);
}), D = 0; !y && b[D]; ) y = b[D] && b[D].dataLabel && (b[D].dataLabel.getBBox().height || 21), 
D++;
for (D = 2; D--; ) {
var E, b = [], K = [], H = z[D], I = H.length;
if (a.sortByAngle(H, D - .5), l > 0) {
for (B = q - n - l; q + n + l >= B; B += y) b.push(B);
if (w = b.length, I > w) {
for (c = [].concat(H), c.sort(N), B = I; B--; ) c[B].rank = B;
for (B = I; B--; ) H[B].rank >= w && H.splice(B, 1);
I = H.length;
}
for (B = 0; I > B; B++) {
c = H[B], x = c.labelPos, c = 9999;
var Q, P;
for (P = 0; w > P; P++) Q = M(b[P] - x[1]), c > Q && (c = Q, E = P);
if (B > E && null !== b[B]) E = B; else for (I - B + E > w && null !== b[B] && (E = w - I + B); null === b[E]; ) E++;
K.push({
i:E,
y:b[E]
}), b[E] = null;
}
K.sort(N);
}
for (B = 0; I > B; B++) c = H[B], x = c.labelPos, t = c.dataLabel, G = c.visible === !1 ? "hidden" :"visible", 
c = x[1], l > 0 ? (w = K.pop(), E = w.i, C = w.y, (c > C && null !== b[E + 1] || C > c && null !== b[E - 1]) && (C = c)) :C = c, 
A = e.justify ? o[0] + (D ? -1 :1) * (n + l) :a.getX(0 === E || E === b.length - 1 ? c :C, D), 
t._attr = {
visibility:G,
align:x[6]
}, t._pos = {
x:A + e.x + ({
left:f,
right:-f
}[x[6]] || 0),
y:C + e.y - 10
}, t.connX = A, t.connY = C, null === this.options.size && (w = t.width, f > A - w ? F[3] = v(u(w - A + f), F[3]) :A + w > h - f && (F[1] = v(u(A + w - h + f), F[1])), 
0 > C - y / 2 ? F[0] = v(u(-C + y / 2), F[0]) :C + y / 2 > d && (F[2] = v(u(C + y / 2 - d), F[2])));
}
(0 === Ba(F) || this.verifyDataLabelOverflow(F)) && (this.placeDataLabels(), r && g && p(this.points, function(b) {
i = b.connector, x = b.labelPos, (t = b.dataLabel) && t._pos ? (G = t._attr.visibility, 
A = t.connX, C = t.connY, j = k ? [ "M", A + ("left" === x[6] ? 5 :-5), C, "C", A, C, 2 * x[2] - x[4], 2 * x[3] - x[5], x[2], x[3], "L", x[4], x[5] ] :[ "M", A + ("left" === x[6] ? 5 :-5), C, "L", x[2], x[3], "L", x[4], x[5] ], 
i ? (i.animate({
d:j
}), i.attr("visibility", G)) :b.connector = i = a.chart.renderer.path(j).attr({
"stroke-width":g,
stroke:e.connectorColor || b.color || "#606060",
visibility:G
}).add(a.dataLabelsGroup)) :i && (b.connector = i.destroy());
}));
}
}, F.pie.prototype.placeDataLabels = function() {
p(this.points, function(a) {
var b, a = a.dataLabel;
a && ((b = a._pos) ? (a.attr(a._attr), a[a.moved ? "animate" :"attr"](b), a.moved = !0) :a && a.attr({
y:-999
}));
});
}, F.pie.prototype.alignDataLabel = sa, F.pie.prototype.verifyDataLabelOverflow = function(a) {
var f, b = this.center, c = this.options, d = c.center, e = c = c.minSize || 80;
return null !== d[0] ? e = v(b[2] - v(a[1], a[3]), c) :(e = v(b[2] - a[1] - a[3], c), 
b[0] += (a[3] - a[1]) / 2), null !== d[1] ? e = v(C(e, b[2] - v(a[0], a[2])), c) :(e = v(C(e, b[2] - a[0] - a[2]), c), 
b[1] += (a[0] - a[2]) / 2), e < b[2] ? (b[2] = e, this.translate(b), p(this.points, function(a) {
a.dataLabel && (a.dataLabel._pos = null);
}), this.drawDataLabels && this.drawDataLabels()) :f = !0, f;
}), F.column && (F.column.prototype.alignDataLabel = function(a, b, c, d, e) {
var f = this.chart, g = f.inverted, h = a.dlBox || a.shapeArgs, i = a.below || a.plotY > m(this.translatedThreshold, f.plotSizeY), j = m(c.inside, !!this.options.stacking);
h && (d = w(h), g && (d = {
x:f.plotWidth - d.y - d.height,
y:f.plotHeight - d.x - d.width,
width:d.height,
height:d.width
}), !j) && (g ? (d.x += i ? 0 :d.width, d.width = 0) :(d.y += i ? d.height :0, d.height = 0)), 
c.align = m(c.align, !g || j ? "center" :i ? "right" :"left"), c.verticalAlign = m(c.verticalAlign, g || j ? "middle" :i ? "top" :"bottom"), 
O.prototype.alignDataLabel.call(this, a, b, c, d, e);
}), S = R.TrackerMixin = {
drawTrackerPoint:function() {
var a = this, b = a.chart, c = b.pointer, d = a.options.cursor, e = d && {
cursor:d
}, f = function(c) {
var e, d = c.target;
for (b.hoverSeries !== a && a.onMouseOver(); d && !e; ) e = d.point, d = d.parentNode;
e !== t && e !== b.hoverPoint && e.onMouseOver(c);
};
p(a.points, function(a) {
a.graphic && (a.graphic.element.point = a), a.dataLabel && (a.dataLabel.element.point = a);
}), a._hasTracking || (p(a.trackerGroups, function(b) {
a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(a) {
c.onTrackerMouseOut(a);
}).css(e), $a) && a[b].on("touchstart", f);
}), a._hasTracking = !0);
},
drawTrackerGraph:function() {
var m, a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath :a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, i = f.options.tooltip.snap, j = a.tracker, k = b.cursor, l = k && {
cursor:k
}, k = a.singlePoints, n = function() {
f.hoverSeries !== a && a.onMouseOver();
}, q = "rgba(192,192,192," + (aa ? 1e-4 :.002) + ")";
if (e && !c) for (m = e + 1; m--; ) "M" === d[m] && d.splice(m + 1, 0, d[m + 1] - i, d[m + 2], "L"), 
(m && "M" === d[m] || m === e) && d.splice(m, 0, "L", d[m - 2] + i, d[m - 1]);
for (m = 0; m < k.length; m++) e = k[m], d.push("M", e.plotX - i, e.plotY, "L", e.plotX + i, e.plotY);
j ? j.attr({
d:d
}) :(a.tracker = h.path(d).attr({
"stroke-linejoin":"round",
visibility:a.visible ? "visible" :"hidden",
stroke:q,
fill:c ? q :Q,
"stroke-width":b.lineWidth + (c ? 0 :2 * i),
zIndex:2
}).add(a.group), p([ a.tracker, a.markerGroup ], function(a) {
a.addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(a) {
g.onTrackerMouseOut(a);
}).css(l), $a && a.on("touchstart", n);
}));
}
}, F.column && (ga.prototype.drawTracker = S.drawTrackerPoint), F.pie && (F.pie.prototype.drawTracker = S.drawTrackerPoint), 
F.scatter && (pa.prototype.drawTracker = S.drawTrackerPoint), q(lb.prototype, {
setItemEvents:function(a, b, c, d, e) {
var f = this;
(c ? b :a.legendGroup).on("mouseover", function() {
a.setState("hover"), b.css(f.options.itemHoverStyle);
}).on("mouseout", function() {
b.css(a.visible ? d :e), a.setState();
}).on("click", function(b) {
var c = function() {
a.setVisible();
}, b = {
browserEvent:b
};
a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) :D(a, "legendItemClick", b, c);
});
},
createCheckboxForItem:function(a) {
a.checkbox = Y("input", {
type:"checkbox",
checked:a.selected,
defaultChecked:a.selected
}, this.options.itemCheckboxStyle, this.chart.container), K(a.checkbox, "click", function(b) {
D(a, "checkboxClick", {
checked:b.target.checked
}, function() {
a.select();
});
});
}
}), E.legend.itemStyle.cursor = "pointer", q(Ya.prototype, {
showResetZoom:function() {
var a = this, b = E.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null :"plotBox";
this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
a.zoomOut();
}, d, e && e.hover).attr({
align:c.position.align,
title:b.resetZoomTitle
}).add().align(c.position, !1, f);
},
zoomOut:function() {
var a = this;
D(a, "selection", {
resetSelection:!0
}, function() {
a.zoom();
});
},
zoom:function(a) {
var b, e, c = this.pointer, d = !1;
!a || a.resetSelection ? p(this.axes, function(a) {
b = a.zoom();
}) :p(a.xAxis.concat(a.yAxis), function(a) {
var e = a.axis, h = e.isXAxis;
(c[h ? "zoomX" :"zoomY"] || c[h ? "pinchX" :"pinchY"]) && (b = e.zoom(a.min, a.max), 
e.displayBtn && (d = !0));
}), e = this.resetZoomButton, d && !e ? this.showResetZoom() :!d && ca(e) && (this.resetZoomButton = e.destroy()), 
b && this.redraw(m(this.options.chart.animation, a && a.animation, this.pointCount < 100));
},
pan:function(a, b) {
var e, c = this, d = c.hoverPoints;
d && p(d, function(a) {
a.setState();
}), p("xy" === b ? [ 1, 0 ] :[ 1 ], function(b) {
var d = a[b ? "chartX" :"chartY"], h = c[b ? "xAxis" :"yAxis"][0], i = c[b ? "mouseDownX" :"mouseDownY"], j = (h.pointRange || 0) / 2, k = h.getExtremes(), l = h.toValue(i - d, !0) + j, i = h.toValue(i + c[b ? "plotWidth" :"plotHeight"] - d, !0) - j;
h.series.length && l > C(k.dataMin, k.min) && i < v(k.dataMax, k.max) && (h.setExtremes(l, i, !1, !1, {
trigger:"pan"
}), e = !0), c[b ? "mouseDownX" :"mouseDownY"] = d;
}), e && c.redraw(!1), G(c.container, {
cursor:"move"
});
}
}), q(Ea.prototype, {
select:function(a, b) {
var c = this, d = c.series, e = d.chart, a = m(a, !c.selected);
c.firePointEvent(a ? "select" :"unselect", {
accumulate:b
}, function() {
c.selected = c.options.selected = a, d.options.data[Da(c, d.data)] = c.options, 
c.setState(a && "select"), b || p(e.getSelectedPoints(), function(a) {
a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[Da(a, d.data)] = a.options, 
a.setState(""), a.firePointEvent("unselect"));
});
});
},
onMouseOver:function(a) {
var b = this.series, c = b.chart, d = c.tooltip, e = c.hoverPoint;
e && e !== this && e.onMouseOut(), this.firePointEvent("mouseOver"), d && (!d.shared || b.noSharedTooltip) && d.refresh(this, a), 
this.setState("hover"), c.hoverPoint = this;
},
onMouseOut:function() {
var a = this.series.chart, b = a.hoverPoints;
b && -1 !== Da(this, b) || (this.firePointEvent("mouseOut"), this.setState(), a.hoverPoint = null);
},
importEvents:function() {
if (!this.hasImportedEvents) {
var b, a = w(this.series.options.point, this.options).events;
this.events = a;
for (b in a) K(this, b, a[b]);
this.hasImportedEvents = !0;
}
},
setState:function(a, b) {
var p, c = this.plotX, d = this.plotY, e = this.series, f = e.options.states, g = ba[e.type].marker && e.options.marker, h = g && !g.enabled, i = g && g.states[a], j = i && i.enabled === !1, k = e.stateMarkerGraphic, l = this.marker || {}, m = e.chart, n = e.halo, a = a || "";
p = this.pointAttr[a] || e.pointAttr[a], a === this.state && !b || this.selected && "select" !== a || f[a] && f[a].enabled === !1 || a && (j || h && i.enabled === !1) || a && l.states && l.states[a] && l.states[a].enabled === !1 || (this.graphic ? (g = g && this.graphic.symbolName && p.r, 
this.graphic.attr(w(p, g ? {
x:c - g,
y:d - g,
width:2 * g,
height:2 * g
} :{})), k && k.hide()) :(a && i && (g = i.radius, l = l.symbol || e.symbol, k && k.currentSymbol !== l && (k = k.destroy()), 
k ? k[b ? "animate" :"attr"]({
x:c - g,
y:d - g
}) :l && (e.stateMarkerGraphic = k = m.renderer.symbol(l, c - g, d - g, 2 * g, 2 * g).attr(p).add(e.markerGroup), 
k.currentSymbol = l)), k && k[a && m.isInsidePlot(c, d, m.inverted) ? "show" :"hide"]()), 
(c = f[a] && f[a].halo) && c.size ? (n || (e.halo = n = m.renderer.path().add(e.seriesGroup)), 
n.attr(q({
fill:ya(this.color || e.color).setOpacity(c.opacity).get()
}, c.attributes))[b ? "animate" :"attr"]({
d:this.haloPath(c.size)
})) :n && n.attr({
d:[]
}), this.state = a);
},
haloPath:function(a) {
var b = this.series, c = b.chart, d = b.getPlotBox(), e = c.inverted;
return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY :this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX :this.plotY) - a, 2 * a, 2 * a);
}
}), q(O.prototype, {
onMouseOver:function() {
var a = this.chart, b = a.hoverSeries;
b && b !== this && b.onMouseOut(), this.options.events.mouseOver && D(this, "mouseOver"), 
this.setState("hover"), a.hoverSeries = this;
},
onMouseOut:function() {
var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
d && d.onMouseOut(), this && a.events.mouseOut && D(this, "mouseOut"), c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide(), 
this.setState(), b.hoverSeries = null;
},
setState:function(a) {
var b = this.options, c = this.graph, d = this.graphNeg, e = b.states, b = b.lineWidth, a = a || "";
this.state !== a && (this.state = a, e[a] && e[a].enabled === !1 || (a && (b = e[a].lineWidth || b + 1), 
c && !c.dashstyle && (a = {
"stroke-width":b
}, c.attr(a), d && d.attr(a))));
},
setVisible:function(a, b) {
var f, c = this, d = c.chart, e = c.legendItem, g = d.options.chart.ignoreHiddenSeries, h = c.visible;
f = (c.visible = a = c.userOptions.visible = a === t ? !h :a) ? "show" :"hide", 
p([ "group", "dataLabelsGroup", "markerGroup", "tracker" ], function(a) {
c[a] && c[a][f]();
}), d.hoverSeries === c && c.onMouseOut(), e && d.legend.colorizeItem(c, a), c.isDirty = !0, 
c.options.stacking && p(d.series, function(a) {
a.options.stacking && a.visible && (a.isDirty = !0);
}), p(c.linkedSeries, function(b) {
b.setVisible(a, !1);
}), g && (d.isDirtyBox = !0), b !== !1 && d.redraw(), D(c, f);
},
setTooltipPoints:function(a) {
var c, d, h, i, b = [], e = this.xAxis, f = e && e.getExtremes(), g = e ? e.tooltipLen || e.len :this.chart.plotSizeX, j = [];
if (this.options.enableMouseTracking !== !1 && !this.singularTooltips) {
for (a && (this.tooltipPoints = null), p(this.segments || this.points, function(a) {
b = b.concat(a);
}), e && e.reversed && (b = b.reverse()), this.orderTooltipPoints && this.orderTooltipPoints(b), 
a = b.length, i = 0; a > i; i++) if (e = b[i], c = e.x, c >= f.min && c <= f.max) for (h = b[i + 1], 
c = d === t ? 0 :d + 1, d = b[i + 1] ? C(v(0, T((e.clientX + (h ? h.wrappedClientX || h.clientX :g)) / 2)), g) :g; c >= 0 && d >= c; ) j[c++] = e;
this.tooltipPoints = j;
}
},
show:function() {
this.setVisible(!0);
},
hide:function() {
this.setVisible(!1);
},
select:function(a) {
this.selected = a = a === t ? !this.selected :a, this.checkbox && (this.checkbox.checked = a), 
D(this, a ? "select" :"unselect");
},
drawTracker:S.drawTrackerGraph
}), q(R, {
Axis:la,
Chart:Ya,
Color:ya,
Point:Ea,
Tick:Sa,
Renderer:Za,
Series:O,
SVGElement:P,
SVGRenderer:ta,
arrayMin:Na,
arrayMax:Ba,
charts:V,
dateFormat:cb,
format:Ia,
pathAnim:ub,
getOptions:function() {
return E;
},
hasBidiBug:Nb,
isTouchDevice:Jb,
numberFormat:Ga,
seriesTypes:F,
setOptions:function(a) {
return E = w(!0, E, a), Cb(), E;
},
addEvent:K,
removeEvent:W,
createElement:Y,
discardElement:Pa,
css:G,
each:p,
extend:q,
map:Ua,
merge:w,
pick:m,
splat:qa,
extendClass:ka,
pInt:z,
wrap:Ma,
svg:aa,
canvas:fa,
vml:!aa && !fa,
product:"Highcharts",
version:"4.0.1"
});
}(), HR = window.HR || {}, HR.countryNames = [ "Asia/Pacific Region", "Europe", "Andorra", "United Arab Emirates", "Afghanistan", "Antigua and Barbuda", "Anguilla", "Albania", "Armenia", "Netherlands Antilles", "Angola", "Antarctica", "Argentina", "American Samoa", "Austria", "Australia", "Aruba", "Azerbaijan", "Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Bermuda", "Brunei Darussalam", "Bolivia", "Brazil", "Bahamas", "Bhutan", "Bouvet Island", "Botswana", "Belarus", "Belize", "Canada", "Cocos (Keeling) Islands", "Congo, The Democratic Republic of the", "Central African Republic", "Congo", "Switzerland", "Cote D'Ivoire", "Cook Islands", "Chile", "Cameroon", "China", "Colombia", "Costa Rica", "Cuba", "Cape Verde", "Christmas Island", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria", "Ecuador", "Estonia", "Egypt", "Western Sahara", "Eritrea", "Spain", "Ethiopia", "Finland", "Fiji", "Falkland Islands (Malvinas)", "Micronesia, Federated States of", "Faroe Islands", "France", "France, Metropolitan", "Gabon", "United Kingdom", "Grenada", "Georgia", "French Guiana", "Ghana", "Gibraltar", "Greenland", "Gambia", "Guinea", "Guadeloupe", "Equatorial Guinea", "Greece", "South Georgia and the South Sandwich Islands", "Guatemala", "Guam", "Guinea-Bissau", "Guyana", "Hong Kong", "Heard Island and McDonald Islands", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland", "Israel", "India", "British Indian Ocean Territory", "Iraq", "Iran, Islamic Republic of", "Iceland", "Italy", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Comoros", "Saint Kitts and Nevis", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Cayman Islands", "Kazakhstan", "Lao People's Democratic Republic", "Lebanon", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libyan Arab Jamahiriya", "Morocco", "Monaco", "Moldova, Republic of", "Madagascar", "Marshall Islands", "Macedonia", "Mali", "Myanmar", "Mongolia", "Macau", "Northern Mariana Islands", "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius", "Maldives", "Malawi", "Mexico", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "Nauru", "Niue", "New Zealand", "Oman", "Panama", "Peru", "French Polynesia", "Papua New Guinea", "Philippines", "Pakistan", "Poland", "Saint Pierre and Miquelon", "Pitcairn Islands", "Puerto Rico", "Palestinian Territory", "Portugal", "Palau", "Paraguay", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena", "Slovenia", "Svalbard and Jan Mayen", "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "Sao Tome and Principe", "El Salvador", "Syrian Arab Republic", "Swaziland", "Turks and Caicos Islands", "Chad", "French Southern Territories", "Togo", "Thailand", "Tajikistan", "Tokelau", "Turkmenistan", "Tunisia", "Tonga", "Timor-Leste", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Tanzania, United Republic of", "Ukraine", "Uganda", "United States Minor Outlying Islands", "United States", "Uruguay", "Uzbekistan", "Holy See (Vatican City State)", "Saint Vincent and the Grenadines", "Venezuela", "Virgin Islands, British", "Virgin Islands, U.S.", "Vietnam", "Vanuatu", "Wallis and Futuna", "Samoa", "Yemen", "Mayotte", "Serbia", "South Africa", "Zambia", "Montenegro", "Zimbabwe", "Anonymous Proxy", "Satellite Provider", "Other", "Aland Islands", "Guernsey", "Isle of Man", "Jersey", "Saint Barthelemy", "Saint Martin" ];

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
return HR = window.HR, HR.appController = new HR.XAdminController(), require.config({
waitSeconds:60
}), _makeTopLevel = function(source, attributes) {
return _.each(attributes, function(attribute) {
return "undefined" !== source[attribute] ? HR[attribute] = source[attribute] :void 0;
});
}, _makeTopLevel(HR.appController, [ "namespace", "requires", "routeNamespace", "restURL", "model", "collection" ]), 
HR.router = new HR.XAdminRouter(), Backbone.history.start({
pushState:!0,
root:"/x/"
});
});
}.call(this);