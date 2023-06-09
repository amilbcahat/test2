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
"admin/user/change_email":"user_change_email",
analytics:"defaultAnalyticsRoute",
"analytics/companies":"analytics_companies",
"analytics/companies/trial_signups":"analytics_companies_trial_signups",
"404":"not_found",
"*notFound":"catchall"
}, XAdminRouter.prototype.initialize = function() {
return HR.appView = new HR.XAdminView(), HR.loadingButton = "", HR.currentUser = new HR.UserModel(HR.PREFETCH_DATA.user), 
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
}, XAdminRouter.prototype.analytics_companies_trial_signups = function() {
return HR.requires("compound/x-analytics/basic", function() {
var view;
return view = new HR.TrialSignupsView(), HR.appView.setSplitContentView("analytics", null, "trial_signups", view);
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
return e.preventDefault(), sidebar = $("#hre-sidebar"), content = $("#hrx-admin-content"), 
$(content).toggleClass("open"), sidebar.hasClass("open") ? $(sidebar).removeClass("open").addClass("closed") :$(sidebar).addClass("open").removeClass("closed");
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
function v(a, b) {
var c;
a || (a = {});
for (c in b) a[c] = b[c];
return a;
}
function y() {
var a, b = arguments.length, c = {}, d = function(a, b) {
var c, h;
for (h in b) b.hasOwnProperty(h) && (c = b[h], "object" != typeof a && (a = {}), 
a[h] = c && "object" == typeof c && "[object Array]" !== Object.prototype.toString.call(c) && "number" != typeof c.nodeType ? d(a[h] || {}, c) :b[h]);
return a;
};
for (a = 0; b > a; a++) c = d(c, arguments[a]);
return c;
}
function u(a, b) {
return parseInt(a, b || 10);
}
function fa(a) {
return "string" == typeof a;
}
function V(a) {
return "object" == typeof a;
}
function Ba(a) {
return "[object Array]" === Object.prototype.toString.call(a);
}
function Ca(a) {
return "number" == typeof a;
}
function ka(a) {
return I.log(a) / I.LN10;
}
function da(a) {
return I.pow(10, a);
}
function ga(a, b) {
for (var c = a.length; c--; ) if (a[c] === b) {
a.splice(c, 1);
break;
}
}
function r(a) {
return a !== x && null !== a;
}
function A(a, b, c) {
var d, e;
if (fa(b)) r(c) ? a.setAttribute(b, c) :a && a.getAttribute && (e = a.getAttribute(b)); else if (r(b) && V(b)) for (d in b) a.setAttribute(d, b[d]);
return e;
}
function ha(a) {
return Ba(a) ? a :[ a ];
}
function o() {
var b, c, a = arguments, d = a.length;
for (b = 0; d > b; b++) if (c = a[b], "undefined" != typeof c && null !== c) return c;
}
function L(a, b) {
Da && b && b.opacity !== x && (b.filter = "alpha(opacity=" + 100 * b.opacity + ")"), 
v(a.style, b);
}
function U(a, b, c, d, e) {
return a = z.createElement(a), b && v(a, b), e && L(a, {
padding:0,
border:S,
margin:0
}), c && L(a, c), d && d.appendChild(a), a;
}
function ea(a, b) {
var c = function() {};
return c.prototype = new a(), v(c.prototype, b), c;
}
function Na(a, b, c, d) {
var e = N.lang, f = -1 === b ? ((a || 0).toString().split(".")[1] || "").length :isNaN(b = Q(b)) ? 2 :b, b = void 0 === c ? e.decimalPoint :c, d = void 0 === d ? e.thousandsSep :d, e = 0 > a ? "-" :"", c = String(u(a = Q(+a || 0).toFixed(f))), g = c.length > 3 ? c.length % 3 :0;
return e + (g ? c.substr(0, g) + d :"") + c.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d) + (f ? b + Q(a - c).toFixed(f).slice(2) :"");
}
function ua(a, b) {
return Array((b || 2) + 1 - String(a).length).join(0) + a;
}
function Ea(a, b) {
for (var e, f, g, h, i, c = "{", d = !1, j = []; -1 !== (c = a.indexOf(c)); ) {
if (e = a.slice(0, c), d) {
for (f = e.split(":"), g = f.shift().split("."), i = g.length, e = b, h = 0; i > h; h++) e = e[g[h]];
f.length && (f = f.join(":"), g = /\.([0-9])/, h = N.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] :-1, 
e = Na(e, i, h.decimalPoint, f.indexOf(",") > -1 ? h.thousandsSep :"")) :e = Ua(f, e));
}
j.push(e), a = a.slice(c + 1), c = (d = !d) ? "}" :"{";
}
return j.push(a), j.join("");
}
function ib(a, b, c, d) {
var e, c = o(c, 1);
for (e = a / c, b || (b = [ 1, 2, 2.5, 5, 10 ], d && d.allowDecimals === !1 && (1 === c ? b = [ 1, 2, 5, 10 ] :.1 >= c && (b = [ 1 / c ]))), 
d = 0; d < b.length && (a = b[d], !(e <= (b[d] + (b[d + 1] || b[d])) / 2)); d++) ;
return a *= c;
}
function yb(a, b) {
var g, c = b || [ [ zb, [ 1, 2, 5, 10, 20, 25, 50, 100, 200, 500 ] ], [ jb, [ 1, 2, 5, 10, 15, 30 ] ], [ Va, [ 1, 2, 5, 10, 15, 30 ] ], [ Oa, [ 1, 2, 3, 4, 6, 8, 12 ] ], [ oa, [ 1, 2 ] ], [ Wa, [ 1, 2 ] ], [ Pa, [ 1, 2, 3, 4, 6 ] ], [ va, null ] ], d = c[c.length - 1], e = E[d[0]], f = d[1];
for (g = 0; g < c.length && (d = c[g], e = E[d[0]], f = d[1], !(c[g + 1] && a <= (e * f[f.length - 1] + E[c[g + 1][0]]) / 2)); g++) ;
return e === E[va] && 5 * e > a && (f = [ 1, 2, 5 ]), e === E[va] && 5 * e > a && (f = [ 1, 2, 5 ]), 
c = ib(a / e, f), {
unitRange:e,
count:c,
unitName:d[0]
};
}
function Ab(a, b, c, d) {
var h, e = [], f = {}, g = N.global.useUTC, i = new Date(b), j = a.unitRange, k = a.count;
if (r(b)) {
j >= E[jb] && (i.setMilliseconds(0), i.setSeconds(j >= E[Va] ? 0 :k * T(i.getSeconds() / k))), 
j >= E[Va] && i[Bb](j >= E[Oa] ? 0 :k * T(i[kb]() / k)), j >= E[Oa] && i[Cb](j >= E[oa] ? 0 :k * T(i[lb]() / k)), 
j >= E[oa] && i[mb](j >= E[Pa] ? 1 :k * T(i[Qa]() / k)), j >= E[Pa] && (i[Db](j >= E[va] ? 0 :k * T(i[Xa]() / k)), 
h = i[Ya]()), j >= E[va] && (h -= h % k, i[Eb](h)), j === E[Wa] && i[mb](i[Qa]() - i[nb]() + o(d, 1)), 
b = 1, h = i[Ya]();
for (var d = i.getTime(), m = i[Xa](), l = i[Qa](), i = g ? 0 :(864e5 + 6e4 * i.getTimezoneOffset()) % 864e5; c > d; ) e.push(d), 
j === E[va] ? d = Za(h + b * k, 0) :j === E[Pa] ? d = Za(h, m + b * k) :g || j !== E[oa] && j !== E[Wa] ? (j <= E[Oa] && d % E[oa] === i && (f[d] = oa), 
d += j * k) :d = Za(h, m, l + b * k * (j === E[oa] ? 1 :7)), b++;
e.push(d);
}
return e.info = v(a, {
higherRanks:f,
totalRange:j * k
}), e;
}
function Fb() {
this.symbol = this.color = 0;
}
function Gb(a, b) {
var d, e, c = a.length;
for (e = 0; c > e; e++) a[e].ss_i = e;
for (a.sort(function(a, c) {
return d = b(a, c), 0 === d ? a.ss_i - c.ss_i :d;
}), e = 0; c > e; e++) delete a[e].ss_i;
}
function Fa(a) {
for (var b = a.length, c = a[0]; b--; ) a[b] < c && (c = a[b]);
return c;
}
function pa(a) {
for (var b = a.length, c = a[0]; b--; ) a[b] > c && (c = a[b]);
return c;
}
function Ga(a, b) {
for (var c in a) a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c];
}
function Ra(a) {
$a || ($a = U(wa)), a && $a.appendChild(a), $a.innerHTML = "";
}
function qa(a, b) {
var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
if (b) throw c;
O.console && console.log(c);
}
function ia(a) {
return parseFloat(a.toPrecision(14));
}
function Ha(a, b) {
xa = o(a, b.animation);
}
function Hb() {
var a = N.global.useUTC, b = a ? "getUTC" :"get", c = a ? "setUTC" :"set";
Za = a ? Date.UTC :function(a, b, c, g, h, i) {
return new Date(a, b, o(c, 1), o(g, 0), o(h, 0), o(i, 0)).getTime();
}, kb = b + "Minutes", lb = b + "Hours", nb = b + "Day", Qa = b + "Date", Xa = b + "Month", 
Ya = b + "FullYear", Bb = c + "Minutes", Cb = c + "Hours", mb = c + "Date", Db = c + "Month", 
Eb = c + "FullYear";
}
function ra() {}
function Ia(a, b, c, d) {
this.axis = a, this.pos = b, this.type = c || "", this.isNew = !0, !c && !d && this.addLabel();
}
function ob(a, b) {
this.axis = a, b && (this.options = b, this.id = b.id);
}
function Ib(a, b, c, d, e, f) {
var g = a.chart.inverted;
this.axis = a, this.isNegative = c, this.options = b, this.x = d, this.stack = e, 
this.percent = "percent" === f, this.alignOptions = {
align:b.align || (g ? c ? "left" :"right" :"center"),
verticalAlign:b.verticalAlign || (g ? "middle" :c ? "bottom" :"top"),
y:o(b.y, g ? 4 :c ? 14 :-6),
x:o(b.x, g ? c ? -6 :6 :0)
}, this.textAlign = b.textAlign || (g ? c ? "right" :"left" :"center");
}
function ab() {
this.init.apply(this, arguments);
}
function pb() {
this.init.apply(this, arguments);
}
function qb(a, b) {
this.init(a, b);
}
function rb(a, b) {
this.init(a, b);
}
function sb() {
this.init.apply(this, arguments);
}
var x, Sa, $a, N, Ua, xa, ub, E, Za, kb, lb, nb, Qa, Xa, Ya, Bb, Cb, mb, Db, Eb, z = document, O = window, I = Math, t = I.round, T = I.floor, ja = I.ceil, q = I.max, K = I.min, Q = I.abs, Y = I.cos, ca = I.sin, Ja = I.PI, bb = 2 * Ja / 360, ya = navigator.userAgent, Jb = O.opera, Da = /msie/i.test(ya) && !Jb, cb = 8 === z.documentMode, db = /AppleWebKit/.test(ya), eb = /Firefox/.test(ya), Kb = /(Mobile|Android|Windows Phone)/.test(ya), sa = "http://www.w3.org/2000/svg", Z = !!z.createElementNS && !!z.createElementNS(sa, "svg").createSVGRect, Rb = eb && parseInt(ya.split("Firefox/")[1], 10) < 4, $ = !Z && !Da && !!z.createElement("canvas").getContext, fb = z.documentElement.ontouchstart !== x, Lb = {}, tb = 0, ta = function() {}, za = [], wa = "div", S = "none", Mb = "rgba(192,192,192," + (Z ? 1e-4 :.002) + ")", zb = "millisecond", jb = "second", Va = "minute", Oa = "hour", oa = "day", Wa = "week", Pa = "month", va = "year", Nb = "stroke-width", aa = {};
O.Highcharts = O.Highcharts ? qa(16, !0) :{}, Ua = function(a, b, c) {
if (!r(b) || isNaN(b)) return "Invalid date";
var e, a = o(a, "%Y-%m-%d %H:%M:%S"), d = new Date(b), f = d[lb](), g = d[nb](), h = d[Qa](), i = d[Xa](), j = d[Ya](), k = N.lang, m = k.weekdays, d = v({
a:m[g].substr(0, 3),
A:m[g],
d:ua(h),
e:h,
b:k.shortMonths[i],
B:k.months[i],
m:ua(i + 1),
y:j.toString().substr(2, 2),
Y:j,
H:ua(f),
I:ua(f % 12 || 12),
l:f % 12 || 12,
M:ua(d[kb]()),
p:12 > f ? "AM" :"PM",
P:12 > f ? "am" :"pm",
S:ua(d.getSeconds()),
L:ua(t(b % 1e3), 3)
}, Highcharts.dateFormats);
for (e in d) for (;-1 !== a.indexOf("%" + e); ) a = a.replace("%" + e, "function" == typeof d[e] ? d[e](b) :d[e]);
return c ? a.substr(0, 1).toUpperCase() + a.substr(1) :a;
}, Fb.prototype = {
wrapColor:function(a) {
this.color >= a && (this.color = 0);
},
wrapSymbol:function(a) {
this.symbol >= a && (this.symbol = 0);
}
}, E = function() {
for (var a = 0, b = arguments, c = b.length, d = {}; c > a; a++) d[b[a++]] = b[a];
return d;
}(zb, 1, jb, 1e3, Va, 6e4, Oa, 36e5, oa, 864e5, Wa, 6048e5, Pa, 26784e5, va, 31556952e3), 
ub = {
init:function(a, b, c) {
var g, h, i, b = b || "", d = a.shift, e = b.indexOf("C") > -1, f = e ? 7 :3, b = b.split(" "), c = [].concat(c), j = function(a) {
for (g = a.length; g--; ) "M" === a[g] && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2]);
};
if (e && (j(b), j(c)), a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6)), 
d <= c.length / f) for (;d--; ) c = [].concat(c).splice(0, f).concat(c);
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
O.HighchartsAdapter = O.HighchartsAdapter || a && {
init:function(b) {
var e, c = a.fx, d = c.step, f = a.Tween, g = f && f.propHooks;
a.extend(a.easing, {
easeOutQuad:function(a, b, c, d, e) {
return -d * (b /= e) * (b - 2) + c;
}
}), a.each([ "cur", "_default", "width", "height", "opacity" ], function(a, b) {
var k, m, e = d;
"cur" === b ? e = c.prototype :"_default" === b && f && (e = g[b], b = "set"), (k = e[b]) && (e[b] = function(c) {
return c = a ? c :this, m = c.elem, m.attr ? m.attr(c.prop, "cur" === b ? x :c.now) :k.apply(this, arguments);
});
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
return fa(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1)), c = b[0], c !== x && (c.chart = c.chart || {}, 
c.chart.renderTo = this[0], new Highcharts[a](c, b[1]), d = this), c === x && (d = za[A(this[0], "data-highcharts-chart")]), 
d;
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
var e = z.removeEventListener ? "removeEventListener" :"detachEvent";
z[e] && b && !b[e] && (b[e] = function() {}), a(b).unbind(c, d);
},
fireEvent:function(b, c, d, e) {
var h, f = a.Event(c), g = "detached" + c;
!Da && d && (delete d.layerX, delete d.layerY), v(f, d), b[c] && (b[g] = b[c], b[c] = null), 
a.each([ "preventDefault", "stopPropagation" ], function(a, b) {
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
return c.pageX === x && (c.pageX = a.pageX, c.pageY = a.pageY), c;
},
animate:function(b, c, d) {
var e = a(b);
c.d && (b.toD = c.d, c.d = 1), e.stop(), c.opacity !== x && b.attr && (c.opacity += "px"), 
e.animate(c, d);
},
stop:function(b) {
a(b).stop();
}
};
}(O.jQuery);
var W = O.HighchartsAdapter, M = W || {};
W && W.init.call(W, ub);
var gb = M.adapterRun, Sb = M.getScript, la = M.inArray, n = M.each, Ob = M.grep, Tb = M.offset, Ka = M.map, J = M.addEvent, ba = M.removeEvent, D = M.fireEvent, Pb = M.washMouseEvent, vb = M.animate, Ta = M.stop, M = {
enabled:!0,
align:"center",
x:0,
y:15,
style:{
color:"#666",
cursor:"default",
fontSize:"11px",
lineHeight:"14px"
}
};
N = {
colors:"#2f7ed8,#0d233a,#8bbc21,#910000,#1aadce,#492970,#f28f43,#77a1e5,#c42525,#a6c96a".split(","),
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
canvasToolsURL:"http://code.highcharts.com/3.0.1/modules/canvas-tools.js",
VMLRadialGradientURL:"http://code.highcharts.com/3.0.1/gfx/vml-radial-gradient.png"
},
chart:{
borderColor:"#4572A7",
borderRadius:5,
defaultSeriesType:"line",
ignoreHiddenSeries:!0,
spacingTop:10,
spacingRight:10,
spacingBottom:15,
spacingLeft:10,
style:{
fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
fontSize:"12px"
},
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
y:15,
style:{
color:"#274b6d",
fontSize:"16px"
}
},
subtitle:{
text:"",
align:"center",
y:30,
style:{
color:"#4d759e"
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
enabled:!0,
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
dataLabels:y(M, {
enabled:!1,
formatter:function() {
return this.y;
},
verticalAlign:"bottom",
y:0
}),
cropThreshold:300,
pointRange:0,
showInLegend:!0,
states:{
hover:{
marker:{}
},
select:{
marker:{}
}
},
stickyTracking:!0
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
borderWidth:1,
borderColor:"#909090",
borderRadius:5,
navigation:{
activeColor:"#274b6d",
inactiveColor:"#CCC"
},
shadow:!1,
itemStyle:{
cursor:"pointer",
color:"#274b6d",
fontSize:"12px"
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
symbolWidth:16,
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
animation:Z,
backgroundColor:"rgba(255, 255, 255, .85)",
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
pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
shadow:!0,
snap:Kb ? 25 :10,
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
var X = N.plotOptions, W = X.line;
Hb();
var ma = function(a) {
var c, d, b = [];
return function(a) {
a && a.stops ? d = Ka(a.stops, function(a) {
return ma(a[1]);
}) :(c = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a)) ? b = [ u(c[1]), u(c[2]), u(c[3]), parseFloat(c[4], 10) ] :(c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a)) ? b = [ u(c[1], 16), u(c[2], 16), u(c[3], 16), 1 ] :(c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a)) && (b = [ u(c[1]), u(c[2]), u(c[3]), 1 ]);
}(a), {
get:function(c) {
var f;
return d ? (f = y(a), f.stops = [].concat(f.stops), n(d, function(a, b) {
f.stops[b] = [ f.stops[b][0], a.get(c) ];
})) :f = b && !isNaN(b[0]) ? "rgb" === c ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" :"a" === c ? b[3] :"rgba(" + b.join(",") + ")" :a, 
f;
},
brighten:function(a) {
if (d) n(d, function(b) {
b.brighten(a);
}); else if (Ca(a) && 0 !== a) {
var c;
for (c = 0; 3 > c; c++) b[c] += u(255 * a), b[c] < 0 && (b[c] = 0), b[c] > 255 && (b[c] = 255);
}
return this;
},
rgba:b,
setOpacity:function(a) {
return b[3] = a, this;
}
};
};
ra.prototype = {
init:function(a, b) {
this.element = "span" === b ? U(b) :z.createElementNS(sa, b), this.renderer = a, 
this.attrSetters = {};
},
opacity:1,
animate:function(a, b, c) {
b = o(b, xa, !0), Ta(this), b ? (b = y(b), c && (b.complete = c), vb(this, a, b)) :(this.attr(a), 
c && c());
},
attr:function(a, b) {
var c, d, e, f, j, l, p, g = this.element, h = g.nodeName.toLowerCase(), i = this.renderer, k = this.attrSetters, m = this.shadows, s = this;
if (fa(a) && r(b) && (c = a, a = {}, a[c] = b), fa(a)) c = a, "circle" === h ? c = {
x:"cx",
y:"cy"
}[c] || c :"strokeWidth" === c && (c = "stroke-width"), s = A(g, c) || this[c] || 0, 
"d" !== c && "visibility" !== c && (s = parseFloat(s)); else {
for (c in a) if (j = !1, d = a[c], e = k[c] && k[c].call(this, d, c), e !== !1) {
if (e !== x && (d = e), "d" === c) d && d.join && (d = d.join(" ")), /(NaN| {2}|^$)/.test(d) && (d = "M 0 0"); else if ("x" === c && "text" === h) for (e = 0; e < g.childNodes.length; e++) f = g.childNodes[e], 
A(f, "x") === A(g, "x") && A(f, "x", d); else if (!this.rotation || "x" !== c && "y" !== c) if ("fill" === c) d = i.color(d, g, c); else if ("circle" !== h || "x" !== c && "y" !== c) if ("rect" === h && "r" === c) A(g, {
rx:d,
ry:d
}), j = !0; else if ("translateX" === c || "translateY" === c || "rotation" === c || "verticalAlign" === c || "scaleX" === c || "scaleY" === c) j = p = !0; else if ("stroke" === c) d = i.color(d, g, c); else if ("dashstyle" === c) {
if (c = "stroke-dasharray", d = d && d.toLowerCase(), "solid" === d) d = S; else if (d) {
for (d = d.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), 
e = d.length; e--; ) d[e] = u(d[e]) * a["stroke-width"];
d = d.join(",");
}
} else "width" === c ? d = u(d) :"align" === c ? (c = "text-anchor", d = {
left:"start",
center:"middle",
right:"end"
}[d]) :"title" === c && (e = g.getElementsByTagName("title")[0], e || (e = z.createElementNS(sa, "title"), 
g.appendChild(e)), e.textContent = d); else c = {
x:"cx",
y:"cy"
}[c] || c; else p = !0;
if ("strokeWidth" === c && (c = "stroke-width"), ("stroke-width" === c || "stroke" === c) && (this[c] = d, 
this.stroke && this["stroke-width"] ? (A(g, "stroke", this.stroke), A(g, "stroke-width", this["stroke-width"]), 
this.hasStroke = !0) :"stroke-width" === c && 0 === d && this.hasStroke && (g.removeAttribute("stroke"), 
this.hasStroke = !1), j = !0), this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (l || (this.symbolAttr(a), 
l = !0), j = !0), m && /^(width|height|visibility|x|y|d|transform)$/.test(c)) for (e = m.length; e--; ) A(m[e], c, "height" === c ? q(d - (m[e].cutHeight || 0), 0) :d);
("width" === c || "height" === c) && "rect" === h && 0 > d && (d = 0), this[c] = d, 
"text" === c ? (d !== this.textStr && delete this.bBox, this.textStr = d, this.added && i.buildText(this)) :j || A(g, c, d);
}
p && this.updateTransform();
}
return s;
},
addClass:function(a) {
return A(this.element, "class", A(this.element, "class") + " " + a), this;
},
symbolAttr:function(a) {
var b = this;
n("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(c) {
b[c] = o(a[c], b[c]);
}), b.attr({
d:b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
});
},
clip:function(a) {
return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" :S);
},
crisp:function(a, b, c, d, e) {
var f, i, g = {}, h = {}, a = a || this.strokeWidth || this.attr && this.attr("stroke-width") || 0;
i = t(a) % 2 / 2, h.x = T(b || this.x || 0) + i, h.y = T(c || this.y || 0) + i, 
h.width = T((d || this.width || 0) - 2 * i), h.height = T((e || this.height || 0) - 2 * i), 
h.strokeWidth = a;
for (f in h) this[f] !== h[f] && (this[f] = g[f] = h[f]);
return g;
},
css:function(a) {
var c, b = this.element, b = a && a.width && "text" === b.nodeName.toLowerCase(), d = "", e = function(a, b) {
return "-" + b.toLowerCase();
};
if (a && a.color && (a.fill = a.color), this.styles = a = v(this.styles, a), $ && b && delete a.width, 
Da && !Z) b && delete a.width, L(this.element, a); else {
for (c in a) d += c.replace(/([A-Z])/g, e) + ":" + a[c] + ";";
this.attr({
style:d
});
}
return b && this.added && this.renderer.buildText(this), this;
},
on:function(a, b) {
return fb && "click" === a && (this.element.ontouchstart = function(a) {
a.preventDefault(), b();
}), this.element["on" + a] = b, this;
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
htmlCss:function(a) {
var b = this.element;
return (b = a && "SPAN" === b.tagName && a.width) && (delete a.width, this.textWidth = b, 
this.updateTransform()), this.styles = v(this.styles, a), L(this.element, a), this;
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
}[g], i = g && "left" !== g, j = this.shadows;
if ((c || d) && (L(b, {
marginLeft:c,
marginTop:d
}), j && n(j, function(a) {
L(a, {
marginLeft:c + 1,
marginTop:d + 1
});
})), this.inverted && n(b.childNodes, function(c) {
a.invertChild(c, b);
}), "SPAN" === b.tagName) {
var k, m, l, wb, j = this.rotation, p = 0, s = 1, p = 0;
l = u(this.textWidth);
var B = this.xCorr || 0, w = this.yCorr || 0, G = [ j, g, b.innerHTML, this.textWidth ].join(",");
k = {}, G !== this.cTT && (r(j) && (a.isSVG ? (B = Da ? "-ms-transform" :db ? "-webkit-transform" :eb ? "MozTransform" :Jb ? "-o-transform" :"", 
k[B] = k.transform = "rotate(" + j + "deg)") :(p = j * bb, s = Y(p), p = ca(p), 
k.filter = j ? [ "progid:DXImageTransform.Microsoft.Matrix(M11=", s, ", M12=", -p, ", M21=", p, ", M22=", s, ", sizingMethod='auto expand')" ].join("") :S), 
L(b, k)), k = o(this.elemWidth, b.offsetWidth), m = o(this.elemHeight, b.offsetHeight), 
k > l && /[ \-]/.test(b.textContent || b.innerText) && (L(b, {
width:l + "px",
display:"block",
whiteSpace:"normal"
}), k = l), l = a.fontMetrics(b.style.fontSize).b, B = 0 > s && -k, w = 0 > p && -m, 
wb = 0 > s * p, B += p * l * (wb ? 1 - h :h), w -= s * l * (j ? wb ? h :1 - h :1), 
i && (B -= k * h * (0 > s ? -1 :1), j && (w -= m * h * (0 > p ? -1 :1)), L(b, {
textAlign:g
})), this.xCorr = B, this.yCorr = w), L(b, {
left:e + B + "px",
top:f + w + "px"
}), db && (m = b.offsetHeight), this.cTT = G;
}
} else this.alignOnAdd = !0;
},
updateTransform:function() {
var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, d = this.scaleY, e = this.inverted, f = this.rotation, g = [];
e && (a += this.attr("width"), b += this.attr("height")), (a || b) && g.push("translate(" + a + "," + b + ")"), 
e ? g.push("rotate(90) scale(-1,1)") :f && g.push("rotate(" + f + " " + (this.x || 0) + " " + (this.y || 0) + ")"), 
(r(c) || r(d)) && g.push("scale(" + o(c, 1) + " " + o(d, 1) + ")"), g.length && A(this.element, "transform", g.join(" "));
},
toFront:function() {
var a = this.element;
return a.parentNode.appendChild(a), this;
},
align:function(a, b, c) {
var d, e, f, g, h = {};
return e = this.renderer, f = e.alignedObjects, a ? (this.alignOptions = a, this.alignByTranslate = b, 
(!c || fa(c)) && (this.alignTo = d = c || "renderer", ga(f, this), f.push(this), 
c = null)) :(a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo), 
c = o(c, e[d], e), d = a.align, e = a.verticalAlign, f = (c.x || 0) + (a.x || 0), 
g = (c.y || 0) + (a.y || 0), ("right" === d || "center" === d) && (f += (c.width - (a.width || 0)) / {
right:1,
center:2
}[d]), h[b ? "translateX" :"x"] = t(f), ("bottom" === e || "middle" === e) && (g += (c.height - (a.height || 0)) / ({
bottom:1,
middle:2
}[e] || 1)), h[b ? "translateY" :"y"] = t(g), this[this.placed ? "animate" :"attr"](h), 
this.placed = !0, this.alignAttr = h, this;
},
getBBox:function() {
var c, a = this.bBox, b = this.renderer, d = this.rotation;
c = this.element;
var e = this.styles, f = d * bb;
if (!a) {
if (c.namespaceURI === sa || b.forExport) {
try {
a = c.getBBox ? v({}, c.getBBox()) :{
width:c.offsetWidth,
height:c.offsetHeight
};
} catch (g) {}
(!a || a.width < 0) && (a = {
width:0,
height:0
});
} else a = this.htmlGetBBox();
b.isSVG && (b = a.width, c = a.height, Da && e && "11px" === e.fontSize && "22.7" === c.toPrecision(3) && (a.height = c = 14), 
d && (a.width = Q(c * ca(f)) + Q(b * Y(f)), a.height = Q(c * Y(f)) + Q(b * ca(f)))), 
this.bBox = a;
}
return a;
},
show:function() {
return this.attr({
visibility:"visible"
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
var h, b = this.renderer, c = a || b, d = c.element || b.box, e = d.childNodes, f = this.element, g = A(f, "zIndex");
if (a && (this.parentGroup = a), this.parentInverted = a && a.inverted, void 0 !== this.textStr && b.buildText(this), 
g && (c.handleZ = !0, g = u(g)), c.handleZ) for (c = 0; c < e.length; c++) if (a = e[c], 
b = A(a, "zIndex"), a !== f && (u(b) > g || !r(g) && r(b))) {
d.insertBefore(f, a), h = !0;
break;
}
return h || d.appendChild(f), this.added = !0, D(this, "add"), this;
},
safeRemoveChild:function(a) {
var b = a.parentNode;
b && b.removeChild(a);
},
destroy:function() {
var d, e, a = this, b = a.element || {}, c = a.shadows;
if (b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null, Ta(a), 
a.clipPath && (a.clipPath = a.clipPath.destroy()), a.stops) {
for (e = 0; e < a.stops.length; e++) a.stops[e] = a.stops[e].destroy();
a.stops = null;
}
a.safeRemoveChild(b), c && n(c, function(b) {
a.safeRemoveChild(b);
}), a.alignTo && ga(a.renderer.alignedObjects, a);
for (d in a) delete a[d];
return null;
},
shadow:function(a, b, c) {
var e, f, h, i, j, k, d = [], g = this.element;
if (a) {
for (i = o(a.width, 3), j = (a.opacity || .15) / i, k = this.parentInverted ? "(-1,-1)" :"(" + o(a.offsetX, 1) + ", " + o(a.offsetY, 1) + ")", 
e = 1; i >= e; e++) f = g.cloneNode(0), h = 2 * i + 1 - 2 * e, A(f, {
isShadow:"true",
stroke:a.color || "black",
"stroke-opacity":j * e,
"stroke-width":h,
transform:"translate" + k,
fill:S
}), c && (A(f, "height", q(A(f, "height") - h, 0)), f.cutHeight = h), b ? b.element.appendChild(f) :g.parentNode.insertBefore(f, g), 
d.push(f);
this.shadows = d;
}
return this;
}
};
var Aa = function() {
this.init.apply(this, arguments);
};
Aa.prototype = {
Element:ra,
init:function(a, b, c, d) {
var f, e = location;
f = this.createElement("svg").attr({
xmlns:sa,
version:"1.1"
}), a.appendChild(f.element), this.isSVG = !0, this.box = f.element, this.boxWrapper = f, 
this.alignedObjects = [], this.url = (eb || db) && z.getElementsByTagName("base").length ? e.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") :"", 
this.createElement("desc").add().element.appendChild(z.createTextNode("Created with Highcharts 3.0.1")), 
this.defs = this.createElement("defs").add(), this.forExport = d, this.gradients = {}, 
this.setSize(b, c, !1);
var g;
eb && a.getBoundingClientRect && (this.subPixelFix = b = function() {
L(a, {
left:0,
top:0
}), g = a.getBoundingClientRect(), L(a, {
left:ja(g.left) - g.left + "px",
top:ja(g.top) - g.top + "px"
});
}, b(), J(O, "resize", b));
},
isHidden:function() {
return !this.boxWrapper.getBBox().width;
},
destroy:function() {
var a = this.defs;
return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), Ga(this.gradients || {}), 
this.gradients = null, a && (this.defs = a.destroy()), this.subPixelFix && ba(O, "resize", this.subPixelFix), 
this.alignedObjects = null;
},
createElement:function(a) {
var b = new this.Element();
return b.init(this, a), b;
},
draw:function() {},
buildText:function(a) {
for (var b = a.element, c = this, d = c.forExport, e = o(a.textStr, "").toString().replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g), f = b.childNodes, g = /style="([^"]+)"/, h = /href="([^"]+)"/, i = A(b, "x"), j = a.styles, k = j && j.width && u(j.width), m = j && j.lineHeight, l = f.length; l--; ) b.removeChild(f[l]);
k && !a.added && this.box.appendChild(b), "" === e[e.length - 1] && e.pop(), n(e, function(e, f) {
var l, o = 0, e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
l = e.split("|||"), n(l, function(e) {
if ("" !== e || 1 === l.length) {
var q, p = {}, n = z.createElementNS(sa, "tspan");
if (g.test(e) && (q = e.match(g)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), A(n, "style", q)), 
h.test(e) && !d && (A(n, "onclick", 'location.href="' + e.match(h)[1] + '"'), L(n, {
cursor:"pointer"
})), e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), 
n.appendChild(z.createTextNode(e)), o ? p.dx = 0 :p.x = i, A(n, p), !o && f && (!Z && d && L(n, {
display:"block"
}), A(n, "dy", m || c.fontMetrics(/px$/.test(n.style.fontSize) ? n.style.fontSize :j.fontSize).h, db && n.offsetHeight)), 
b.appendChild(n), o++, k) for (var r, e = e.replace(/([^\^])-/g, "$1- ").split(" "), t = []; e.length || t.length; ) delete a.bBox, 
r = a.getBBox().width, p = r > k, p && 1 !== e.length ? (n.removeChild(n.firstChild), 
t.unshift(e.pop())) :(e = t, t = [], e.length && (n = z.createElementNS(sa, "tspan"), 
A(n, {
dy:m || 16,
x:i
}), q && A(n, "style", q), b.appendChild(n), r > k && (k = r))), e.length && n.appendChild(z.createTextNode(e.join(" ").replace(/- /g, "-")));
}
});
});
},
button:function(a, b, c, d, e, f, g) {
var j, k, m, l, p, h = this.label(a, b, c, null, null, null, null, null, "button"), i = 0, a = {
x1:0,
y1:0,
x2:0,
y2:1
}, e = y({
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
return m = e.style, delete e.style, f = y(e, {
stroke:"#68A",
fill:{
linearGradient:a,
stops:[ [ 0, "#FFF" ], [ 1, "#ACF" ] ]
}
}, f), l = f.style, delete f.style, g = y(e, {
stroke:"#68A",
fill:{
linearGradient:a,
stops:[ [ 0, "#9BD" ], [ 1, "#CDF" ] ]
}
}, g), p = g.style, delete g.style, J(h.element, "mouseenter", function() {
h.attr(f).css(l);
}), J(h.element, "mouseleave", function() {
j = [ e, f, g ][i], k = [ m, l, p ][i], h.attr(j).css(k);
}), h.setState = function(a) {
(i = a) ? 2 === a && h.attr(g).css(p) :h.attr(e).css(m);
}, h.on("click", function() {
d.call(h);
}).attr(e).css(v({
cursor:"default"
}, m));
},
crispLine:function(a, b) {
return a[1] === a[4] && (a[1] = a[4] = t(a[1]) - b % 2 / 2), a[2] === a[5] && (a[2] = a[5] = t(a[2]) + b % 2 / 2), 
a;
},
path:function(a) {
var b = {
fill:S
};
return Ba(a) ? b.d = a :V(a) && v(b, a), this.createElement("path").attr(b);
},
circle:function(a, b, c) {
return a = V(a) ? a :{
x:a,
y:b,
r:c
}, this.createElement("circle").attr(a);
},
arc:function(a, b, c, d, e, f) {
return V(a) && (b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x), 
this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {
innerR:d || 0,
start:e || 0,
end:f || 0
});
},
rect:function(a, b, c, d, e, f) {
return e = V(a) ? a.r :e, e = this.createElement("rect").attr({
rx:e,
ry:e,
fill:S
}), e.attr(V(a) ? a :e.crisp(f, a, b, q(c, 0), q(d, 0)));
},
setSize:function(a, b, c) {
var d = this.alignedObjects, e = d.length;
for (this.width = a, this.height = b, this.boxWrapper[o(c, !0) ? "animate" :"attr"]({
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
preserveAspectRatio:S
};
return arguments.length > 1 && v(f, {
x:b,
y:c,
width:d,
height:e
}), f = this.createElement("image").attr(f), f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) :f.element.setAttribute("hc-svg-href", a), 
f;
},
symbol:function(a, b, c, d, e, f) {
var g, j, k, h = this.symbols[a], h = h && h(t(b), t(c), d, e, f), i = /^url\((.*?)\)$/;
return h ? (g = this.path(h), v(g, {
symbolName:a,
x:b,
y:c,
width:d,
height:e
}), f && v(g, f)) :i.test(a) && (k = function(a, b) {
a.element && (a.attr({
width:b[0],
height:b[1]
}), a.alignByTranslate || a.translate(t((d - b[0]) / 2), t((e - b[1]) / 2)));
}, j = a.match(i)[1], a = Lb[j], g = this.image(j).attr({
x:b,
y:c
}), g.isImg = !0, a ? k(g, a) :(g.attr({
width:0,
height:0
}), U("img", {
onload:function() {
k(g, Lb[j] = [ this.width, this.height ]);
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
var f = e.start, c = e.r || c || d, g = e.end - .001, d = e.innerR, h = e.open, i = Y(f), j = ca(f), k = Y(g), g = ca(g), e = e.end - f < Ja ? 0 :1;
return [ "M", a + c * i, b + c * j, "A", c, c, 0, e, 1, a + c * k, b + c * g, h ? "M" :"L", a + d * k, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * j, h ? "" :"Z" ];
}
},
clipRect:function(a, b, c, d) {
var e = "highcharts-" + tb++, f = this.createElement("clipPath").attr({
id:e
}).add(this.defs), a = this.rect(a, b, c, d, 0).add(f);
return a.id = e, a.clipPath = f, a;
},
color:function(a, b, c) {
var e, g, h, i, j, k, m, l, d = this, f = /^rgba/, p = [];
if (a && a.linearGradient ? g = "linearGradient" :a && a.radialGradient && (g = "radialGradient"), 
g) {
c = a[g], h = d.gradients, j = a.stops, b = b.radialReference, Ba(c) && (a[g] = c = {
x1:c[0],
y1:c[1],
x2:c[2],
y2:c[3],
gradientUnits:"userSpaceOnUse"
}), "radialGradient" === g && b && !r(c.gradientUnits) && (c = y(c, {
cx:b[0] - b[2] / 2 + c.cx * b[2],
cy:b[1] - b[2] / 2 + c.cy * b[2],
r:c.r * b[2],
gradientUnits:"userSpaceOnUse"
}));
for (l in c) "id" !== l && p.push(l, c[l]);
for (l in j) p.push(j[l]);
return p = p.join(","), h[p] ? a = h[p].id :(c.id = a = "highcharts-" + tb++, h[p] = i = d.createElement(g).attr(c).add(d.defs), 
i.stops = [], n(j, function(a) {
f.test(a[1]) ? (e = ma(a[1]), k = e.get("rgb"), m = e.get("a")) :(k = a[1], m = 1), 
a = d.createElement("stop").attr({
offset:a[0],
"stop-color":k,
"stop-opacity":m
}).add(i), i.stops.push(a);
})), "url(" + d.url + "#" + a + ")";
}
return f.test(a) ? (e = ma(a), A(b, c + "-opacity", e.get("a")), e.get("rgb")) :(b.removeAttribute(c + "-opacity"), 
a);
},
text:function(a, b, c, d) {
var e = N.chart.style, f = $ || !Z && this.forExport;
return d && !this.forExport ? this.html(a, b, c) :(b = t(o(b, 0)), c = t(o(c, 0)), 
a = this.createElement("text").attr({
x:b,
y:c,
text:a
}).css({
fontFamily:e.fontFamily,
fontSize:e.fontSize
}), f && a.css({
position:"absolute"
}), a.x = b, a.y = c, a);
},
html:function(a, b, c) {
var d = N.chart.style, e = this.createElement("span"), f = e.attrSetters, g = e.element, h = e.renderer;
return f.text = function(a) {
return a !== g.innerHTML && delete this.bBox, g.innerHTML = a, !1;
}, f.x = f.y = f.align = function(a, b) {
return "align" === b && (b = "textAlign"), e[b] = a, e.htmlUpdateTransform(), !1;
}, e.attr({
text:a,
x:t(b),
y:t(c)
}).css({
position:"absolute",
whiteSpace:"nowrap",
fontFamily:d.fontFamily,
fontSize:d.fontSize
}), e.css = e.htmlCss, h.isSVG && (e.add = function(a) {
var b, c = h.box.parentNode, d = [];
if (a) {
if (b = a.div, !b) {
for (;a; ) d.push(a), a = a.parentGroup;
n(d.reverse(), function(a) {
var d;
b = a.div = a.div || U(wa, {
className:A(a.element, "class")
}, {
position:"absolute",
left:(a.translateX || 0) + "px",
top:(a.translateY || 0) + "px"
}, b || c), d = b.style, v(a.attrSetters, {
translateX:function(a) {
d.left = a + "px";
},
translateY:function(a) {
d.top = a + "px";
},
visibility:function(a, b) {
d[b] = a;
}
});
});
}
} else b = c;
return b.appendChild(g), e.added = !0, e.alignOnAdd && e.htmlUpdateTransform(), 
e;
}), e;
},
fontMetrics:function(a) {
var a = u(a || 11), a = 24 > a ? a + 4 :t(1.2 * a), b = t(.8 * a);
return {
h:a,
b:b
};
},
label:function(a, b, c, d, e, f, g, h, i) {
function j() {
var a, b;
a = o.element.style, w = (void 0 === La || void 0 === xb || s.styles.textAlign) && o.getBBox(), 
s.width = (La || w.width || 0) + 2 * q + hb, s.height = (xb || w.height || 0) + 2 * q, 
A = q + p.fontMetrics(a && a.fontSize).b, z && (B || (a = t(-G * q), b = h ? -A :0, 
s.box = B = d ? p.symbol(d, a, b, s.width, s.height) :p.rect(a, b, s.width, s.height, 0, u[Nb]), 
B.add(s)), B.isImg || B.attr(y({
width:s.width,
height:s.height
}, u)), u = null);
}
function k() {
var c, a = s.styles, a = a && a.textAlign, b = hb + q * (1 - G);
c = h ? 0 :A, !r(La) || "center" !== a && "right" !== a || (b += {
center:.5,
right:1
}[a] * (La - w.width)), (b !== o.x || c !== o.y) && o.attr({
x:b,
y:c
}), o.x = b, o.y = c;
}
function m(a, b) {
B ? B.attr(a, b) :u[a] = b;
}
function l() {
o.add(s), s.attr({
text:a,
x:b,
y:c
}), B && r(e) && s.attr({
anchorX:e,
anchorY:f
});
}
var B, w, La, xb, P, H, A, z, p = this, s = p.g(i), o = p.text("", 0, 0, g).attr({
zIndex:1
}), G = 0, q = 3, hb = 0, C = 0, u = {}, g = s.attrSetters;
J(s, "add", l), g.width = function(a) {
return La = a, !1;
}, g.height = function(a) {
return xb = a, !1;
}, g.padding = function(a) {
return r(a) && a !== q && (q = a, k()), !1;
}, g.paddingLeft = function(a) {
return r(a) && a !== hb && (hb = a, k()), !1;
}, g.align = function(a) {
return G = {
left:0,
center:.5,
right:1
}[a], !1;
}, g.text = function(a, b) {
return o.attr(b, a), j(), k(), !1;
}, g[Nb] = function(a, b) {
return z = !0, C = a % 2 / 2, m(b, a), !1;
}, g.stroke = g.fill = g.r = function(a, b) {
return "fill" === b && (z = !0), m(b, a), !1;
}, g.anchorX = function(a, b) {
return e = a, m(b, a + C - P), !1;
}, g.anchorY = function(a, b) {
return f = a, m(b, a - H), !1;
}, g.x = function(a) {
return s.x = a, a -= G * ((La || w.width) + q), P = t(a), s.attr("translateX", P), 
!1;
}, g.y = function(a) {
return H = s.y = t(a), s.attr("translateY", H), !1;
};
var E = s.css;
return v(s, {
css:function(a) {
if (a) {
var b = {}, a = y(a);
n("fontSize,fontWeight,fontFamily,color,lineHeight,width".split(","), function(c) {
a[c] !== x && (b[c] = a[c], delete a[c]);
}), o.css(b);
}
return E.call(s, a);
},
getBBox:function() {
return {
width:w.width + 2 * q,
height:w.height + 2 * q,
x:w.x - q,
y:w.y - q
};
},
shadow:function(a) {
return B && B.shadow(a), s;
},
destroy:function() {
ba(s, "add", l), ba(s.element, "mouseenter"), ba(s.element, "mouseleave"), o && (o = o.destroy()), 
B && (B = B.destroy()), ra.prototype.destroy.call(s), s = p = j = k = m = l = null;
}
});
}
}, Sa = Aa;
var F;
if (!Z && !$) {
Highcharts.VMLElement = F = {
init:function(a, b) {
var c = [ "<", b, ' filled="f" stroked="f"' ], d = [ "position: ", "absolute", ";" ], e = b === wa;
("shape" === b || e) && d.push("left:0;top:0;width:1px;height:1px;"), d.push("visibility: ", e ? "hidden" :"visible"), 
c.push(' style="', d.join(""), '"/>'), b && (c = e || "span" === b || "img" === b ? c.join("") :a.prepVML(c), 
this.element = U(c)), this.renderer = a, this.attrSetters = {};
},
add:function(a) {
var b = this.renderer, c = this.element, d = b.box, d = a ? a.element || a :d;
return a && a.inverted && b.invertChild(c, d), d.appendChild(c), this.added = !0, 
this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), D(this, "add"), 
this;
},
updateTransform:ra.prototype.htmlUpdateTransform,
attr:function(a, b) {
var c, d, e, k, l, f = this.element || {}, g = f.style, h = f.nodeName, i = this.renderer, j = this.symbolName, m = this.shadows, p = this.attrSetters, s = this;
if (fa(a) && r(b) && (c = a, a = {}, a[c] = b), fa(a)) c = a, s = "strokeWidth" === c || "stroke-width" === c ? this.strokeweight :this[c]; else for (c in a) if (d = a[c], 
l = !1, e = p[c] && p[c].call(this, d, c), e !== !1 && null !== d) {
if (e !== x && (d = e), j && /^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c)) k || (this.symbolAttr(a), 
k = !0), l = !0; else if ("d" === c) {
d = d || [], this.d = d.join(" "), e = d.length, l = [];
for (var o; e--; ) Ca(d[e]) ? l[e] = t(10 * d[e]) - 5 :"Z" === d[e] ? l[e] = "x" :(l[e] = d[e], 
!d.isArc || "wa" !== d[e] && "at" !== d[e] || (o = "wa" === d[e] ? 1 :-1, l[e + 5] === l[e + 7] && (l[e + 7] -= o), 
l[e + 6] === l[e + 8] && (l[e + 8] -= o)));
if (d = l.join(" ") || "x", f.path = d, m) for (e = m.length; e--; ) m[e].path = m[e].cutOff ? this.cutOffPath(d, m[e].cutOff) :d;
l = !0;
} else if ("visibility" === c) {
if (m) for (e = m.length; e--; ) m[e].style[c] = d;
"DIV" === h && (d = "hidden" === d ? "-999em" :0, cb || (g[c] = d ? "visible" :"hidden"), 
c = "top"), g[c] = d, l = !0;
} else "zIndex" === c ? (d && (g[c] = d), l = !0) :-1 !== la(c, [ "x", "y", "width", "height" ]) ? (this[c] = d, 
"x" === c || "y" === c ? c = {
x:"left",
y:"top"
}[c] :d = q(0, d), this.updateClipping ? (this[c] = d, this.updateClipping()) :g[c] = d, 
l = !0) :"class" === c && "DIV" === h ? f.className = d :"stroke" === c ? (d = i.color(d, f, c), 
c = "strokecolor") :"stroke-width" === c || "strokeWidth" === c ? (f.stroked = d ? !0 :!1, 
c = "strokeweight", this[c] = d, Ca(d) && (d += "px")) :"dashstyle" === c ? ((f.getElementsByTagName("stroke")[0] || U(i.prepVML([ "<stroke/>" ]), null, null, f))[c] = d || "solid", 
this.dashstyle = d, l = !0) :"fill" === c ? "SPAN" === h ? g.color = d :"IMG" !== h && (f.filled = d !== S ? !0 :!1, 
d = i.color(d, f, c, this), c = "fillcolor") :"opacity" === c ? l = !0 :"shape" === h && "rotation" === c ? (this[c] = d, 
f.style.left = -t(ca(d * bb) + 1) + "px", f.style.top = t(Y(d * bb)) + "px") :"translateX" === c || "translateY" === c || "rotation" === c ? (this[c] = d, 
this.updateTransform(), l = !0) :"text" === c && (this.bBox = null, f.innerHTML = d, 
l = !0);
l || (cb ? f[c] = d :A(f, c, d));
}
return s;
},
clip:function(a) {
var c, b = this;
return a ? (c = a.members, ga(c, b), c.push(b), b.destroyClip = function() {
ga(c, b);
}, a = a.getCSS(b)) :(b.destroyClip && b.destroyClip(), a = {
clip:cb ? "inherit" :"rect(auto)"
}), b.css(a);
},
css:ra.prototype.htmlCss,
safeRemoveChild:function(a) {
a.parentNode && Ra(a);
},
destroy:function() {
return this.destroyClip && this.destroyClip(), ra.prototype.destroy.apply(this);
},
on:function(a, b) {
return this.element["on" + a] = function() {
var a = O.event;
a.target = a.srcElement, b(a);
}, this;
},
cutOffPath:function(a, b) {
var c, a = a.split(/[ ,]/);
return c = a.length, (9 === c || 11 === c) && (a[c - 4] = a[c - 2] = u(a[c - 2]) - 10 * b), 
a.join(" ");
},
shadow:function(a, b, c) {
var e, h, j, m, l, p, s, d = [], f = this.element, g = this.renderer, i = f.style, k = f.path;
if (k && "string" != typeof k.value && (k = "x"), l = k, a) {
for (p = o(a.width, 3), s = (a.opacity || .15) / p, e = 1; 3 >= e; e++) m = 2 * p + 1 - 2 * e, 
c && (l = this.cutOffPath(k.value, m + .5)), j = [ '<shape isShadow="true" strokeweight="', m, '" filled="false" path="', l, '" coordsize="10 10" style="', f.style.cssText, '" />' ], 
h = U(g.prepVML(j), null, {
left:u(i.left) + o(a.offsetX, 1),
top:u(i.top) + o(a.offsetY, 1)
}), c && (h.cutOff = m + 1), j = [ '<stroke color="', a.color || "black", '" opacity="', s * e, '"/>' ], 
U(g.prepVML(j), null, null, h), b ? b.element.appendChild(h) :f.parentNode.insertBefore(h, f), 
d.push(h);
this.shadows = d;
}
return this;
}
}, F = ea(ra, F);
var na = {
Element:F,
isIE8:ya.indexOf("MSIE 8.0") > -1,
init:function(a, b, c) {
var d, e;
this.alignedObjects = [], d = this.createElement(wa), e = d.element, e.style.position = "relative", 
a.appendChild(d.element), this.isVML = !0, this.box = e, this.boxWrapper = d, this.setSize(b, c, !1), 
z.namespaces.hcv || (z.namespaces.add("hcv", "urn:schemas-microsoft-com:vml"), z.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ");
},
isHidden:function() {
return !this.box.offsetWidth;
},
clipRect:function(a, b, c, d) {
var e = this.createElement(), f = V(a);
return v(e, {
members:[],
left:f ? a.x :a,
top:f ? a.y :b,
width:f ? a.width :c,
height:f ? a.height :d,
getCSS:function(a) {
var b = a.element, c = b.nodeName, a = a.inverted, d = this.top - ("shape" === c ? b.offsetTop :0), e = this.left, b = e + this.width, f = d + this.height, d = {
clip:"rect(" + t(a ? e :d) + "px," + t(a ? f :b) + "px," + t(a ? b :f) + "px," + t(a ? d :e) + "px)"
};
return !a && cb && "DIV" === c && v(d, {
width:b + "px",
height:f + "px"
}), d;
},
updateClipping:function() {
n(e.members, function(a) {
a.css(e.getCSS(a));
});
}
});
},
color:function(a, b, c, d) {
var f, h, i, e = this, g = /^rgba/, j = S;
if (a && a.linearGradient ? i = "gradient" :a && a.radialGradient && (i = "pattern"), 
i) {
var k, m, p, s, o, B, w, r, l = a.linearGradient || a.radialGradient, q = "", a = a.stops, t = [], x = function() {
h = [ '<fill colors="' + t.join(",") + '" opacity="', o, '" o:opacity2="', s, '" type="', i, '" ', q, 'focus="100%" method="any" />' ], 
U(e.prepVML(h), null, null, b);
};
if (p = a[0], r = a[a.length - 1], p[0] > 0 && a.unshift([ 0, p[1] ]), r[0] < 1 && a.push([ 1, r[1] ]), 
n(a, function(a, b) {
g.test(a[1]) ? (f = ma(a[1]), k = f.get("rgb"), m = f.get("a")) :(k = a[1], m = 1), 
t.push(100 * a[0] + "% " + k), b ? (o = m, B = k) :(s = m, w = k);
}), "fill" === c) if ("gradient" === i) c = l.x1 || l[0] || 0, a = l.y1 || l[1] || 0, 
p = l.x2 || l[2] || 0, l = l.y2 || l[3] || 0, q = 'angle="' + (90 - 180 * I.atan((l - a) / (p - c)) / Ja) + '"', 
x(); else {
var u, j = l.r, v = 2 * j, P = 2 * j, H = l.cx, C = l.cy, y = b.radialReference, j = function() {
y && (u = d.getBBox(), H += (y[0] - u.x) / u.width - .5, C += (y[1] - u.y) / u.height - .5, 
v *= y[2] / u.width, P *= y[2] / u.height), q = 'src="' + N.global.VMLRadialGradientURL + '" size="' + v + "," + P + '" origin="0.5,0.5" position="' + H + "," + C + '" color2="' + w + '" ', 
x();
};
d.added ? j() :J(d, "add", j), j = B;
} else j = k;
} else g.test(a) && "IMG" !== b.tagName ? (f = ma(a), h = [ "<", c, ' opacity="', f.get("a"), '"/>' ], 
U(this.prepVML(h), null, null, b), j = f.get("rgb")) :(j = b.getElementsByTagName(c), 
j.length && (j[0].opacity = 1, j[0].type = "solid"), j = a);
return j;
},
prepVML:function(a) {
var b = this.isIE8, a = a.join("");
return b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') :a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) :a = a.replace("<", "<hcv:"), 
a;
},
text:Aa.prototype.html,
path:function(a) {
var b = {
coordsize:"10 10"
};
return Ba(a) ? b.d = a :V(a) && v(b, a), this.createElement("shape").attr(b);
},
circle:function(a, b, c) {
return V(a) && (c = a.r, b = a.y, a = a.x), this.symbol("circle").attr({
x:a - c,
y:b - c,
width:2 * c,
height:2 * c
});
},
g:function(a) {
var b;
return a && (b = {
className:"highcharts-" + a,
"class":"highcharts-" + a
}), this.createElement(wa).attr(b);
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
rect:function(a, b, c, d, e, f) {
V(a) && (b = a.y, c = a.width, d = a.height, f = a.strokeWidth, a = a.x);
var g = this.symbol("rect");
return g.r = e, g.attr(g.crisp(f, a, b, q(c, 0), q(d, 0)));
},
invertChild:function(a, b) {
var c = b.style;
L(a, {
flip:"x",
left:u(c.width) - 1,
top:u(c.height) - 1,
rotation:-90
});
},
symbols:{
arc:function(a, b, c, d, e) {
var f = e.start, g = e.end, h = e.r || c || d, c = e.innerR, d = Y(f), i = ca(f), j = Y(g), k = ca(g);
return g - f === 0 ? [ "x" ] :(f = [ "wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k ], 
e.open && !c && f.push("e", "M", a, b), f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e"), 
f.isArc = !0, f);
},
circle:function(a, b, c, d) {
return [ "wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e" ];
},
rect:function(a, b, c, d, e) {
var h, f = a + c, g = b + d;
return r(e) && e.r ? (h = K(e.r, c, d), f = [ "M", a + h, b, "L", f - h, b, "wa", f - 2 * h, b, f, b + 2 * h, f - h, b, f, b + h, "L", f, g - h, "wa", f - 2 * h, g - 2 * h, f, g, f, g - h, f - h, g, "L", a + h, g, "wa", a, g - 2 * h, a + 2 * h, g, a + h, g, a, g - h, "L", a, b + h, "wa", a, b, a + 2 * h, b + 2 * h, a, b + h, a + h, b, "x", "e" ]) :f = Aa.prototype.symbols.square.apply(0, arguments), 
f;
}
}
};
Highcharts.VMLRenderer = F = function() {
this.init.apply(this, arguments);
}, F.prototype = y(Aa.prototype, na), Sa = F;
}
var Qb;
$ && (Highcharts.CanVGRenderer = F = function() {
sa = "http://www.w3.org/1999/xhtml";
}, F.prototype.symbols = {}, Qb = function() {
function a() {
var d, a = b.length;
for (d = 0; a > d; d++) b[d]();
b = [];
}
var b = [];
return {
push:function(c, d) {
0 === b.length && Sb(d, a), b.push(c);
}
};
}(), Sa = F), Ia.prototype = {
addLabel:function() {
var m, a = this.axis, b = a.options, c = a.chart, d = a.horiz, e = a.categories, f = a.series[0] && a.series[0].names, g = this.pos, h = b.labels, i = a.tickPositions, d = d && e && !h.step && !h.staggerLines && !h.rotation && c.plotWidth / i.length || !d && (c.optionsMarginLeft || c.plotWidth / 2), j = g === i[0], k = g === i[i.length - 1], f = e ? o(e[g], f && f[g], g) :g, e = this.label, i = i.info;
a.isDatetimeAxis && i && (m = b.dateTimeLabelFormats[i.higherRanks[g] || i.unitName]), 
this.isFirst = j, this.isLast = k, b = a.labelFormatter.call({
axis:a,
chart:c,
isFirst:j,
isLast:k,
dateTimeLabelFormat:m,
value:a.isLog ? ia(da(f)) :f
}), g = d && {
width:q(1, t(d - 2 * (h.padding || 10))) + "px"
}, g = v(g, h.style), r(e) ? e && e.attr({
text:b
}).css(g) :(d = {
align:h.align
}, Ca(h.rotation) && (d.rotation = h.rotation), this.label = r(b) && h.enabled ? c.renderer.text(b, 0, 0, h.useHTML).attr(d).css(g).add(a.labelGroup) :null);
},
getLabelSize:function() {
var a = this.label, b = this.axis;
return a ? (this.labelBBox = a.getBBox())[b.horiz ? "height" :"width"] :0;
},
getLabelSides:function() {
var a = this.axis.options.labels, b = this.labelBBox.width, a = b * {
left:0,
center:.5,
right:1
}[a.align] - a.x;
return [ -a, b - a ];
},
handleOverflow:function(a, b) {
var c = !0, d = this.axis, e = d.chart, f = this.isFirst, g = this.isLast, h = b.x, i = d.reversed, j = d.tickPositions;
if (f || g) {
var k = this.getLabelSides(), m = k[0], k = k[1], e = e.plotLeft, l = e + d.len, j = (d = d.ticks[j[a + (f ? 1 :-1)]]) && d.label.xy && d.label.xy.x + d.getLabelSides()[f ? 0 :1];
f && !i || g && i ? e > h + m && (h = e - m, d && h + k > j && (c = !1)) :h + k > l && (h = l - k, 
d && j > h + m && (c = !1)), b.x = h;
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
var i = this.axis, j = i.transA, k = i.reversed, i = i.staggerLines, a = a + e.x - (f && d ? f * j * (k ? -1 :1) :0), b = b + e.y - (f && !d ? f * j * (k ? 1 :-1) :0);
return r(e.y) || (b += .9 * u(c.styles.lineHeight) - c.getBBox().height / 2), i && (b += g / (h || 1) % i * 16), 
{
x:a,
y:b
};
},
getMarkPath:function(a, b, c, d, e, f) {
return f.crispLine([ "M", a, b, "L", a + (e ? 0 :-c), b + (e ? c :0) ], d);
},
render:function(a, b, c) {
var d = this.axis, e = d.options, f = d.chart.renderer, g = d.horiz, h = this.type, i = this.label, j = this.pos, k = e.labels, m = this.gridLine, l = h ? h + "Grid" :"grid", p = h ? h + "Tick" :"tick", s = e[l + "LineWidth"], n = e[l + "LineColor"], B = e[l + "LineDashStyle"], w = e[p + "Length"], l = e[p + "Width"] || 0, q = e[p + "Color"], r = e[p + "Position"], p = this.mark, t = k.step, v = !0, u = d.tickmarkOffset, P = this.getPosition(g, j, u, b), H = P.x, P = P.y, C = g && H === d.pos || !g && P === d.pos + d.len ? -1 :1, y = d.staggerLines;
this.isActive = !0, s && (j = d.getPlotLinePath(j + u, s * C, b, !0), m === x && (m = {
stroke:n,
"stroke-width":s
}, B && (m.dashstyle = B), h || (m.zIndex = 1), b && (m.opacity = 0), this.gridLine = m = s ? f.path(j).attr(m).add(d.gridGroup) :null), 
!b && m && j && m[this.isNew ? "attr" :"animate"]({
d:j,
opacity:c
})), l && w && ("inside" === r && (w = -w), d.opposite && (w = -w), b = this.getMarkPath(H, P, w, l * C, g, f), 
p ? p.animate({
d:b,
opacity:c
}) :this.mark = f.path(b).attr({
stroke:q,
"stroke-width":l,
opacity:c
}).add(d.axisGroup)), i && !isNaN(H) && (i.xy = P = this.getLabelPosition(H, P, i, g, k, u, a, t), 
this.isFirst && !o(e.showFirstLabel, 1) || this.isLast && !o(e.showLastLabel, 1) ? v = !1 :!y && g && "justify" === k.overflow && !this.handleOverflow(a, P) && (v = !1), 
t && a % t && (v = !1), v && !isNaN(P.y) ? (P.opacity = c, i[this.isNew ? "attr" :"animate"](P), 
this.isNew = !1) :i.attr("y", -9999));
},
destroy:function() {
Ga(this, this.axis);
}
}, ob.prototype = {
render:function() {
var n, a = this, b = a.axis, c = b.horiz, d = (b.pointRange || 0) / 2, e = a.options, f = e.label, g = a.label, h = e.width, i = e.to, j = e.from, k = r(j) && r(i), m = e.value, l = e.dashStyle, p = a.svgElem, s = [], B = e.color, w = e.zIndex, G = e.events, t = b.chart.renderer;
if (b.isLog && (j = ka(j), i = ka(i), m = ka(m)), h) s = b.getPlotLinePath(m, h), 
d = {
stroke:B,
"stroke-width":h
}, l && (d.dashstyle = l); else {
if (!k) return;
j = q(j, b.min - d), i = K(i, b.max + d), s = b.getPlotBandPath(j, i, e), d = {
fill:B
}, e.borderWidth && (d.stroke = e.borderColor, d["stroke-width"] = e.borderWidth);
}
if (r(w) && (d.zIndex = w), p) s ? p.animate({
d:s
}, null, p.onGetPath) :(p.hide(), p.onGetPath = function() {
p.show();
}); else if (s && s.length && (a.svgElem = p = t.path(s).attr(d).add(), G)) for (n in e = function(b) {
p.on(b, function(c) {
G[b].apply(a, [ c ]);
});
}, G) e(n);
return f && r(f.text) && s && s.length && b.width > 0 && b.height > 0 ? (f = y({
align:c && k && "center",
x:c ? !k && 4 :10,
verticalAlign:!c && k && "middle",
y:c ? k ? 16 :10 :k ? 6 :-4,
rotation:c && !k && 90
}, f), g || (a.label = g = t.text(f.text, 0, 0).attr({
align:f.textAlign || f.align,
rotation:f.rotation,
zIndex:w
}).css(f.style).add()), b = [ s[1], s[4], o(s[6], s[1]) ], s = [ s[2], s[5], o(s[7], s[2]) ], 
c = Fa(b), k = Fa(s), g.align(f, !1, {
x:c,
y:k,
width:pa(b) - c,
height:pa(s) - k
}), g.show()) :g && g.hide(), a;
},
destroy:function() {
ga(this.axis.plotLinesAndBands, this), Ga(this, this.axis);
}
}, Ib.prototype = {
destroy:function() {
Ga(this, this.axis);
},
setTotal:function(a) {
this.cum = this.total = a;
},
render:function(a) {
var b = this.options, c = b.formatter.call(this);
this.label ? this.label.attr({
text:c,
visibility:"hidden"
}) :this.label = this.axis.chart.renderer.text(c, 0, 0, b.useHTML).css(b.style).attr({
align:this.textAlign,
rotation:b.rotation,
visibility:"hidden"
}).add(a);
},
setOffset:function(a, b) {
var c = this.axis, d = c.chart, e = d.inverted, f = this.isNegative, g = c.translate(this.percent ? 100 :this.total, 0, 0, 0, 1), c = c.translate(0), c = Q(g - c), h = d.xAxis[0].translate(this.x) + a, i = d.plotHeight, f = {
x:e ? f ? g :g - c :h,
y:e ? i - h - b :f ? i - g - c :i - g,
width:e ? c :b,
height:e ? b :c
};
(e = this.label) && (e.align(this.alignOptions, null, f), f = e.alignAttr, e.attr({
visibility:this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? Z ? "inherit" :"visible" :"hidden"
}));
}
}, ab.prototype = {
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
labels:M,
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
tickLength:5,
tickmarkPlacement:"between",
tickPixelInterval:100,
tickPosition:"outside",
tickWidth:1,
title:{
align:"middle",
style:{
color:"#4d759e",
fontWeight:"bold"
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
align:"right",
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
return this.total;
},
style:M.style
}
},
defaultLeftAxisOptions:{
labels:{
align:"right",
x:-8,
y:null
},
title:{
rotation:270
}
},
defaultRightAxisOptions:{
labels:{
align:"left",
x:8,
y:null
},
title:{
rotation:90
}
},
defaultBottomAxisOptions:{
labels:{
align:"center",
x:0,
y:14
},
title:{
rotation:0
}
},
defaultTopAxisOptions:{
labels:{
align:"center",
x:0,
y:-5
},
title:{
rotation:0
}
},
init:function(a, b) {
var c = b.isX;
this.horiz = a.inverted ? !c :c, this.xOrY = (this.isXAxis = c) ? "x" :"y", this.opposite = b.opposite, 
this.side = this.horiz ? this.opposite ? 0 :2 :this.opposite ? 1 :3, this.setOptions(b);
var d = this.options, e = d.type;
this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter, this.staggerLines = this.horiz && d.labels.staggerLines, 
this.userOptions = b, this.minPixelPadding = 0, this.chart = a, this.reversed = d.reversed, 
this.zoomEnabled = d.zoomEnabled !== !1, this.categories = d.categories || "category" === e, 
this.isLog = "logarithmic" === e, this.isDatetimeAxis = "datetime" === e, this.isLinked = r(d.linkedTo), 
this.tickmarkOffset = this.categories && "between" === d.tickmarkPlacement ? .5 :0, 
this.ticks = {}, this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, 
this.len = 0, this.minRange = this.userMinRange = d.minRange || d.maxZoom, this.range = d.range, 
this.offset = d.offset || 0, this.stacks = {}, this._stacksTouched = 0, this.min = this.max = null;
var f, d = this.options.events;
-1 === la(this, a.axes) && (a.axes.push(this), a[c ? "xAxis" :"yAxis"].push(this)), 
this.series = this.series || [], a.inverted && c && this.reversed === x && (this.reversed = !0), 
this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
for (f in d) J(this, f, d[f]);
this.isLog && (this.val2lin = ka, this.lin2val = da);
},
setOptions:function(a) {
this.options = y(this.defaultOptions, this.isXAxis ? {} :this.defaultYAxisOptions, [ this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions ][this.side], y(N[this.isXAxis ? "xAxis" :"yAxis"], a));
},
update:function(a, b) {
var c = this.chart, a = c.options[this.xOrY + "Axis"][this.options.index] = y(this.userOptions, a);
this.destroy(), this._addedPlotLB = !1, this.init(c, a), c.isDirtyBox = !0, o(b, !0) && c.redraw();
},
remove:function(a) {
var b = this.chart, c = this.xOrY + "Axis";
n(this.series, function(a) {
a.remove(!1);
}), ga(b.axes, this), ga(b[c], this), b.options[c].splice(this.options.index, 1), 
this.destroy(), b.isDirtyBox = !0, o(a, !0) && b.redraw();
},
defaultLabelFormatter:function() {
var g, a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat, e = N.lang.numericSymbols, f = e && e.length, h = a.options.labels.format, a = a.isLog ? b :a.tickInterval;
if (h) g = Ea(h, this); else if (c) g = b; else if (d) g = Ua(d, b); else if (f && a >= 1e3) for (;f-- && g === x; ) c = Math.pow(1e3, f + 1), 
a >= c && null !== e[f] && (g = Na(b / c, -1) + e[f]);
return g === x && (g = b >= 1e3 ? Na(b, 0) :Na(b, -1)), g;
},
getSeriesExtremes:function() {
var g, h, a = this, b = a.chart, c = a.stacks, d = [], e = [], f = a._stacksTouched += 1;
a.hasVisibleSeries = !1, a.dataMin = a.dataMax = null, n(a.series, function(g) {
if (g.visible || !b.options.chart.ignoreHiddenSeries) {
var k, m, l, p, s, n, B, w, G, v, j = g.options, t = j.threshold, u = [], y = 0;
if (a.hasVisibleSeries = !0, a.isLog && 0 >= t && (t = j.threshold = null), a.isXAxis) j = g.xData, 
j.length && (a.dataMin = K(o(a.dataMin, j[0]), Fa(j)), a.dataMax = q(o(a.dataMax, j[0]), pa(j))); else {
var P, H, C, A = g.cropped, z = g.xAxis.getExtremes(), E = !!g.modifyValue;
for (k = j.stacking, a.usePercentage = "percent" === k, k && (s = j.stack, p = g.type + o(s, ""), 
n = "-" + p, g.stackKey = p, m = d[p] || [], d[p] = m, l = e[n] || [], e[n] = l), 
a.usePercentage && (a.dataMin = 0, a.dataMax = 99), j = g.processedXData, B = g.processedYData, 
v = B.length, h = 0; v > h; h++) if (w = j[h], G = B[h], k && (H = (P = t > G) ? l :m, 
C = P ? n :p, r(H[w]) ? (H[w] = ia(H[w] + G), G = [ G, H[w] ]) :H[w] = G, c[C] || (c[C] = {}), 
c[C][w] || (c[C][w] = new Ib(a, a.options.stackLabels, P, w, s, k)), c[C][w].setTotal(H[w]), 
c[C][w].touched = f), null !== G && G !== x && (!a.isLog || G.length || G > 0) && (E && (G = g.modifyValue(G)), 
g.getExtremesFromAll || A || (j[h + 1] || w) >= z.min && (j[h - 1] || w) <= z.max)) if (w = G.length) for (;w--; ) null !== G[w] && (u[y++] = G[w]); else u[y++] = G;
!a.usePercentage && u.length && (g.dataMin = k = Fa(u), g.dataMax = g = pa(u), a.dataMin = K(o(a.dataMin, k), k), 
a.dataMax = q(o(a.dataMax, g), g)), r(t) && (a.dataMin >= t ? (a.dataMin = t, a.ignoreMinPadding = !0) :a.dataMax < t && (a.dataMax = t, 
a.ignoreMaxPadding = !0));
}
}
});
for (g in c) for (h in c[g]) c[g][h].touched < f && (c[g][h].destroy(), delete c[g][h]);
},
translate:function(a, b, c, d, e, f) {
var g = this.len, h = 1, i = 0, j = d ? this.oldTransA :this.transA, d = d ? this.oldMin :this.min, k = this.minPixelPadding, e = (this.options.ordinal || this.isLog && e) && this.lin2val;
return j || (j = this.transA), c && (h *= -1, i = g), this.reversed && (h *= -1, 
i -= h * g), b ? (a = a * h + i, a -= k, a = a / j + d, e && (a = this.lin2val(a))) :(e && (a = this.val2lin(a)), 
a = h * (a - d) * j + i + h * k + (f ? j * this.pointRange / 2 :0)), a;
},
toPixels:function(a, b) {
return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 :this.pos);
},
toValue:function(a, b) {
return this.translate(a - (b ? 0 :this.pos), !0, !this.horiz, null, !0);
},
getPlotLinePath:function(a, b, c, d) {
var h, i, j, l, e = this.chart, f = this.left, g = this.top, a = this.translate(a, null, null, c), k = c && e.oldChartHeight || e.chartHeight, m = c && e.oldChartWidth || e.chartWidth;
return h = this.transB, c = i = t(a + h), h = j = t(k - a - h), isNaN(a) ? l = !0 :this.horiz ? (h = g, 
j = k - this.bottom, (f > c || c > f + this.width) && (l = !0)) :(c = f, i = m - this.right, 
(g > h || h > g + this.height) && (l = !0)), l && !d ? null :e.renderer.crispLine([ "M", c, h, "L", i, j ], b || 0);
},
getPlotBandPath:function(a, b) {
var c = this.getPlotLinePath(b), d = this.getPlotLinePath(a);
return d && c ? d.push(c[4], c[5], c[1], c[2]) :d = null, d;
},
getLinearTickPositions:function(a, b, c) {
for (var d, b = ia(T(b / a) * a), c = ia(ja(c / a) * a), e = []; c >= b && (e.push(b), 
b = ia(b + a), b !== d); ) d = b;
return e;
},
getLogTickPositions:function(a, b, c, d) {
var e = this.options, f = this.len, g = [];
if (d || (this._minorAutoInterval = null), a >= .5) a = t(a), g = this.getLinearTickPositions(a, b, c); else if (a >= .08) for (var h, i, j, k, m, f = T(b), e = a > .3 ? [ 1, 2, 4 ] :a > .15 ? [ 1, 2, 4, 6, 8 ] :[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]; c + 1 > f && !m; f++) for (i = e.length, 
h = 0; i > h && !m; h++) j = ka(da(f) * e[h]), j > b && (!d || c >= k) && g.push(k), 
k > c && (m = !0), k = j; else b = da(b), c = da(c), a = e[d ? "minorTickInterval" :"tickInterval"], 
a = o("auto" === a ? null :a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 :1)) / ((d ? f / this.tickPositions.length :f) || 1)), 
a = ib(a, null, I.pow(10, T(I.log(a) / I.LN10))), g = Ka(this.getLinearTickPositions(a, b, c), ka), 
d || (this._minorAutoInterval = a / 5);
return d || (this.tickInterval = a), g;
},
getMinorTickPositions:function() {
var e, a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [];
if (this.isLog) for (e = b.length, a = 1; e > a; a++) d = d.concat(this.getLogTickPositions(c, b[a - 1], b[a], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) d = d.concat(Ab(yb(c), this.min, this.max, a.startOfWeek)), 
d[0] < this.min && d.shift(); else for (b = this.min + (b[0] - this.min) % c; b <= this.max; b += c) d.push(b);
return d;
},
adjustForMinRange:function() {
var d, f, g, h, i, j, a = this.options, b = this.min, c = this.max, e = this.dataMax - this.dataMin >= this.minRange;
if (this.isXAxis && this.minRange === x && !this.isLog && (r(a.min) || r(a.max) ? this.minRange = null :(n(this.series, function(a) {
for (i = a.xData, g = j = a.xIncrement ? 1 :i.length - 1; g > 0; g--) h = i[g] - i[g - 1], 
(f === x || f > h) && (f = h);
}), this.minRange = K(5 * f, this.dataMax - this.dataMin))), c - b < this.minRange) {
var k = this.minRange;
d = (k - c + b) / 2, d = [ b - d, o(a.min, b - d) ], e && (d[2] = this.dataMin), 
b = pa(d), c = [ b + k, o(a.max, b + k) ], e && (c[2] = this.dataMax), c = Fa(c), 
k > c - b && (d[0] = c - k, d[1] = o(a.min, c - k), b = pa(d));
}
this.min = b, this.max = c;
},
setAxisTranslation:function(a) {
var d, b = this.max - this.min, c = 0, e = 0, f = 0, g = this.linkedParent, h = this.transA;
this.isXAxis && (g ? (e = g.minPointOffset, f = g.pointRangePadding) :n(this.series, function(a) {
var g = a.pointRange, h = a.options.pointPlacement, m = a.closestPointRange;
g > b && (g = 0), c = q(c, g), e = q(e, h ? 0 :g / 2), f = q(f, "on" === h ? 0 :g), 
!a.noSharedTooltip && r(m) && (d = r(d) ? K(d, m) :m);
}), g = this.ordinalSlope ? this.ordinalSlope / d :1, this.minPointOffset = e *= g, 
this.pointRangePadding = f *= g, this.pointRange = K(c, b), this.closestPointRange = d), 
a && (this.oldTransA = h), this.translationSlope = this.transA = h = this.len / (b + f || 1), 
this.transB = this.horiz ? this.left :this.bottom, this.minPixelPadding = h * e;
},
setTickPositions:function(a) {
var b = this, c = b.chart, d = b.options, e = b.isLog, f = b.isDatetimeAxis, g = b.isXAxis, h = b.isLinked, i = b.options.tickPositioner, j = d.maxPadding, k = d.minPadding, m = d.tickInterval, l = d.minTickInterval, p = d.tickPixelInterval, s = b.categories;
h ? (b.linkedParent = c[g ? "xAxis" :"yAxis"][d.linkedTo], c = b.linkedParent.getExtremes(), 
b.min = o(c.min, c.dataMin), b.max = o(c.max, c.dataMax), d.type !== b.linkedParent.options.type && qa(11, 1)) :(b.min = o(b.userMin, d.min, b.dataMin), 
b.max = o(b.userMax, d.max, b.dataMax)), e && (!a && K(b.min, o(b.dataMin, b.min)) <= 0 && qa(10, 1), 
b.min = ia(ka(b.min)), b.max = ia(ka(b.max))), b.range && (b.userMin = b.min = q(b.min, b.max - b.range), 
b.userMax = b.max, a) && (b.range = null), b.beforePadding && b.beforePadding(), 
b.adjustForMinRange(), !s && !b.usePercentage && !h && r(b.min) && r(b.max) && (c = b.max - b.min) && (r(d.min) || r(b.userMin) || !k || !(b.dataMin < 0) && b.ignoreMinPadding || (b.min -= c * k), 
r(d.max) || r(b.userMax) || !j || !(b.dataMax > 0) && b.ignoreMaxPadding || (b.max += c * j)), 
b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 :h && !m && p === b.linkedParent.options.tickPixelInterval ? b.linkedParent.tickInterval :o(m, s ? 1 :(b.max - b.min) * p / (b.len || 1)), 
g && !a && n(b.series, function(a) {
a.processData(b.min !== b.oldMin || b.max !== b.oldMax);
}), b.setAxisTranslation(!0), b.beforeSetTickPositions && b.beforeSetTickPositions(), 
b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval)), 
!m && b.tickInterval < l && (b.tickInterval = l), f || e || (a = I.pow(10, T(I.log(b.tickInterval) / I.LN10)), 
m) || (b.tickInterval = ib(b.tickInterval, null, a, d)), b.minorTickInterval = "auto" === d.minorTickInterval && b.tickInterval ? b.tickInterval / 5 :d.minorTickInterval, 
b.tickPositions = i = d.tickPositions ? [].concat(d.tickPositions) :i && i.apply(b, [ b.min, b.max ]), 
i || (i = f ? (b.getNonLinearTimeTicks || Ab)(yb(b.tickInterval, d.units), b.min, b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) :e ? b.getLogTickPositions(b.tickInterval, b.min, b.max) :b.getLinearTickPositions(b.tickInterval, b.min, b.max), 
b.tickPositions = i), h || (e = i[0], f = i[i.length - 1], h = b.minPointOffset || 0, 
d.startOnTick ? b.min = e :b.min - h > e && i.shift(), d.endOnTick ? b.max = f :b.max + h < f && i.pop(), 
1 === i.length && (b.min -= .001, b.max += .001));
},
setMaxTicks:function() {
var a = this.chart, b = a.maxTicks || {}, c = this.tickPositions, d = this._maxTicksKey = [ this.xOrY, this.pos, this.len ].join("-");
!this.isLinked && !this.isDatetimeAxis && c && c.length > (b[d] || 0) && this.options.alignTicks !== !1 && (b[d] = c.length), 
a.maxTicks = b;
},
adjustTickAmount:function() {
var a = this._maxTicksKey, b = this.tickPositions, c = this.chart.maxTicks;
if (c && c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1) {
var d = this.tickAmount, e = b.length;
if (this.tickAmount = a = c[a], a > e) {
for (;b.length < a; ) b.push(ia(b[b.length - 1] + this.tickInterval));
this.transA *= (e - 1) / (a - 1), this.max = b[b.length - 1];
}
r(d) && a !== d && (this.isDirty = !0);
}
},
setScale:function() {
var b, c, d, e, a = this.stacks;
if (this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, 
this.setAxisSize(), e = this.len !== this.oldAxisLength, n(this.series, function(a) {
(a.isDirtyData || a.isDirty || a.xAxis.isDirty) && (d = !0);
}), (e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) && (this.forceRedraw = !1, 
this.getSeriesExtremes(), this.setTickPositions(), this.oldUserMin = this.userMin, 
this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax)), 
!this.isXAxis) for (b in a) for (c in a[b]) a[b][c].cum = a[b][c].total;
this.setMaxTicks();
},
setExtremes:function(a, b, c, d, e) {
var f = this, g = f.chart, c = o(c, !0), e = v(e, {
min:a,
max:b
});
D(f, "setExtremes", e, function() {
f.userMin = a, f.userMax = b, f.isDirtyExtremes = !0, c && g.redraw(d);
});
},
zoom:function(a, b) {
return this.allowZoomOutside || (a <= this.dataMin && (a = x), b >= this.dataMax && (b = x)), 
this.displayBtn = a !== x || b !== x, this.setExtremes(a, b, !1, x, {
trigger:"zoom"
}), !0;
},
setAxisSize:function() {
var f, g, a = this.chart, b = this.options, c = b.offsetLeft || 0, d = b.offsetRight || 0, e = this.horiz;
this.left = g = o(b.left, a.plotLeft + c), this.top = f = o(b.top, a.plotTop), this.width = c = o(b.width, a.plotWidth - c + d), 
this.height = b = o(b.height, a.plotHeight), this.bottom = a.chartHeight - b - f, 
this.right = a.chartWidth - c - g, this.len = q(e ? c :b, 0), this.pos = e ? g :f;
},
getExtremes:function() {
var a = this.isLog;
return {
min:a ? ia(da(this.min)) :this.min,
max:a ? ia(da(this.max)) :this.max,
dataMin:this.dataMin,
dataMax:this.dataMax,
userMin:this.userMin,
userMax:this.userMax
};
},
getThreshold:function(a) {
var b = this.isLog, c = b ? da(this.min) :this.min, b = b ? da(this.max) :this.max;
return c > a || null === a ? a = c :a > b && (a = b), this.translate(a, 0, 1, 0, 1);
},
addPlotBand:function(a) {
this.addPlotBandOrLine(a, "plotBands");
},
addPlotLine:function(a) {
this.addPlotBandOrLine(a, "plotLines");
},
addPlotBandOrLine:function(a, b) {
var c = new ob(this, a).render(), d = this.userOptions;
return b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c), c;
},
getOffset:function() {
var j, m, v, a = this, b = a.chart, c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, h = a.side, i = b.inverted ? [ 1, 0, 3, 2 ][h] :h, k = 0, l = 0, p = d.title, s = d.labels, t = 0, B = b.axisOffset, w = b.clipOffset, G = [ -1, 1, 1, -1 ][h];
if (a.hasData = b = a.hasVisibleSeries || r(a.min) && r(a.max) && !!e, a.showAxis = j = b || o(d.showEmpty, !0), 
a.axisGroup || (a.gridGroup = c.g("grid").attr({
zIndex:d.gridZIndex || 1
}).add(), a.axisGroup = c.g("axis").attr({
zIndex:d.zIndex || 2
}).add(), a.labelGroup = c.g("axis-labels").attr({
zIndex:s.zIndex || 7
}).add()), b || a.isLinked) n(e, function(b) {
f[b] ? f[b].addLabel() :f[b] = new Ia(a, b);
}), n(e, function(a) {
(0 === h || 2 === h || {
1:"left",
3:"right"
}[h] === s.align) && (t = q(f[a].getLabelSize(), t));
}), a.staggerLines && (t += 16 * (a.staggerLines - 1)); else for (v in f) f[v].destroy(), 
delete f[v];
p && p.text && p.enabled !== !1 && (a.axisTitle || (a.axisTitle = c.text(p.text, 0, 0, p.useHTML).attr({
zIndex:7,
rotation:p.rotation || 0,
align:p.textAlign || {
low:"left",
middle:"center",
high:"right"
}[p.align]
}).css(p.style).add(a.axisGroup), a.axisTitle.isNew = !0), j && (k = a.axisTitle.getBBox()[g ? "height" :"width"], 
l = o(p.margin, g ? 5 :10), m = p.offset), a.axisTitle[j ? "show" :"hide"]()), a.offset = G * o(d.offset, B[h]), 
a.axisTitleMargin = o(m, t + l + (2 !== h && t && G * d.labels[g ? "y" :"x"])), 
B[h] = q(B[h], a.axisTitleMargin + k + G * a.offset), w[i] = q(w[i], d.lineWidth);
},
getLinePath:function(a) {
var b = this.chart, c = this.opposite, d = this.offset, e = this.horiz, f = this.left + (c ? this.width :0) + d;
return this.lineTop = d = b.chartHeight - this.bottom - (c ? this.height :0) + d, 
c || (a *= -1), b.renderer.crispLine([ "M", e ? this.left :f, e ? d :this.top, "L", e ? b.chartWidth - this.right :f, e ? d :b.chartHeight - this.bottom ], a);
},
getTitlePosition:function() {
var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b :c, g = this.opposite, h = this.offset, i = u(e.style.fontSize || 12), d = {
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
var B, a = this, b = a.chart, c = b.renderer, d = a.options, e = a.isLog, f = a.isLinked, g = a.tickPositions, h = a.axisTitle, i = a.stacks, j = a.ticks, k = a.minorTicks, m = a.alternateBands, l = d.stackLabels, p = d.alternateGridColor, s = a.tickmarkOffset, o = d.lineWidth, w = b.hasRendered && r(a.oldMin) && !isNaN(a.oldMin);
B = a.hasData;
var t, v, q = a.showAxis;
if (n([ j, k, m ], function(a) {
for (var b in a) a[b].isActive = !1;
}), (B || f) && (a.minorTickInterval && !a.categories && n(a.getMinorTickPositions(), function(b) {
k[b] || (k[b] = new Ia(a, b, "minor")), w && k[b].isNew && k[b].render(null, !0), 
k[b].render(null, !1, 1);
}), g.length && (n(g.slice(1).concat([ g[0] ]), function(b, c) {
c = c === g.length - 1 ? 0 :c + 1, (!f || b >= a.min && b <= a.max) && (j[b] || (j[b] = new Ia(a, b)), 
w && j[b].isNew && j[b].render(c, !0), j[b].render(c, !1, 1));
}), s && 0 === a.min && (j[-1] || (j[-1] = new Ia(a, -1, null, !0)), j[-1].render(-1))), 
p && n(g, function(b, c) {
c % 2 === 0 && b < a.max && (m[b] || (m[b] = new ob(a)), t = b + s, v = g[c + 1] !== x ? g[c + 1] + s :a.max, 
m[b].options = {
from:e ? da(t) :t,
to:e ? da(v) :v,
color:p
}, m[b].render(), m[b].isActive = !0);
}), a._addedPlotLB || (n((d.plotLines || []).concat(d.plotBands || []), function(b) {
a.addPlotBandOrLine(b);
}), a._addedPlotLB = !0)), n([ j, k, m ], function(a) {
var c, d, e = [], f = xa ? xa.duration || 500 :0, g = function() {
for (d = e.length; d--; ) a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]]);
};
for (c in a) a[c].isActive || (a[c].render(c, !1, 0), a[c].isActive = !1, e.push(c));
a !== m && b.hasRendered && f ? f && setTimeout(g, f) :g();
}), o && (B = a.getLinePath(o), a.axisLine ? a.axisLine.animate({
d:B
}) :a.axisLine = c.path(B).attr({
stroke:d.lineColor,
"stroke-width":o,
zIndex:7
}).add(a.axisGroup), a.axisLine[q ? "show" :"hide"]()), h && q && (h[h.isNew ? "attr" :"animate"](a.getTitlePosition()), 
h.isNew = !1), l && l.enabled) {
var u, y, d = a.stackTotalGroup;
d || (a.stackTotalGroup = d = c.g("stack-labels").attr({
visibility:"visible",
zIndex:6
}).add()), d.translate(b.plotLeft, b.plotTop);
for (u in i) for (y in c = i[u]) c[y].render(d);
}
a.isDirty = !1;
},
removePlotBandOrLine:function(a) {
for (var b = this.plotLinesAndBands, c = b.length; c--; ) b[c].id === a && b[c].destroy();
},
setTitle:function(a, b) {
this.update({
title:a
}, b);
},
redraw:function() {
var a = this.chart.pointer;
a.reset && a.reset(!0), this.render(), n(this.plotLinesAndBands, function(a) {
a.render();
}), n(this.series, function(a) {
a.isDirty = !0;
});
},
setCategories:function(a, b) {
this.update({
categories:a
}, b);
},
destroy:function() {
var c, a = this, b = a.stacks;
ba(a);
for (c in b) Ga(b[c]), b[c] = null;
n([ a.ticks, a.minorTicks, a.alternateBands, a.plotLinesAndBands ], function(a) {
Ga(a);
}), n("stackTotalGroup,axisLine,axisGroup,gridGroup,labelGroup,axisTitle".split(","), function(b) {
a[b] && (a[b] = a[b].destroy());
});
}
}, pb.prototype = {
init:function(a, b) {
var c = b.borderWidth, d = b.style, e = u(d.padding);
this.chart = a, this.options = b, this.crosshairs = [], this.now = {
x:0,
y:0
}, this.isHidden = !0, this.label = a.renderer.label("", 0, 0, b.shape, null, null, b.useHTML, null, "tooltip").attr({
padding:e,
fill:b.backgroundColor,
"stroke-width":c,
r:b.borderRadius,
zIndex:8
}).css(d).css({
padding:0
}).hide().add(), $ || this.label.shadow(b.shadow), this.shared = b.shared;
},
destroy:function() {
n(this.crosshairs, function(a) {
a && a.destroy();
}), this.label && (this.label = this.label.destroy());
},
move:function(a, b, c, d) {
var e = this, f = e.now, g = e.options.animation !== !1 && !e.isHidden;
v(f, {
x:g ? (2 * f.x + a) / 3 :a,
y:g ? (f.y + b) / 2 :b,
anchorX:g ? (2 * f.anchorX + c) / 3 :c,
anchorY:g ? (f.anchorY + d) / 2 :d
}), e.label.attr(f), g && (Q(a - f.x) > 1 || Q(b - f.y) > 1) && (clearTimeout(this.tooltipTimeout), 
this.tooltipTimeout = setTimeout(function() {
e && e.move(a, b, c, d);
}, 32));
},
hide:function() {
var b, a = this;
this.isHidden || (b = this.chart.hoverPoints, this.hideTimer = setTimeout(function() {
a.label.fadeOut(), a.isHidden = !0;
}, o(this.options.hideDelay, 500)), b && n(b, function(a) {
a.setState();
}), this.chart.hoverPoints = null);
},
hideCrosshairs:function() {
n(this.crosshairs, function(a) {
a && a.hide();
});
},
getAnchor:function(a, b) {
var c, i, d = this.chart, e = d.inverted, f = d.plotTop, g = 0, h = 0, a = ha(a);
return c = a[0].tooltipPos, this.followPointer && b && (b.chartX === x && (b = d.pointer.normalize(b)), 
c = [ b.chartX - d.plotLeft, b.chartY - f ]), c || (n(a, function(a) {
i = a.series.yAxis, g += a.plotX, h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 :a.plotY) + (!e && i ? i.top - f :0);
}), g /= a.length, h /= a.length, c = [ e ? d.plotWidth - h :g, this.shared && !e && a.length > 1 && b ? b.chartY - f :e ? d.plotHeight - g :h ]), 
Ka(c, t);
},
getPosition:function(a, b, c) {
var m, d = this.chart, e = d.plotLeft, f = d.plotTop, g = d.plotWidth, h = d.plotHeight, i = o(this.options.distance, 12), j = c.plotX, c = c.plotY, d = j + e + (d.inverted ? i :-a - i), k = c - b + f + 15;
return 7 > d && (d = e + q(j, 0) + i), d + a > e + g && (d -= d + a - (e + g), k = c - b + f - i, 
m = !0), f + 5 > k && (k = f + 5, m && c >= k && k + b >= c && (k = c + f + i)), 
k + b > f + h && (k = q(f, f + h - b - i)), {
x:d,
y:k
};
},
defaultFormatter:function(a) {
var d, b = this.points || ha(this), c = b[0].series;
return d = [ c.tooltipHeaderFormatter(b[0]) ], n(b, function(a) {
c = a.series, d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat));
}), d.push(a.options.footerFormat || ""), d.join("");
},
refresh:function(a, b) {
var f, g, h, j, c = this.chart, d = this.label, e = this.options, i = {}, k = [];
j = e.formatter || this.defaultFormatter;
var m, i = c.hoverPoints, l = e.crosshairs;
if (h = this.shared, clearTimeout(this.hideTimer), this.followPointer = ha(a)[0].series.tooltipOptions.followPointer, 
g = this.getAnchor(a, b), f = g[0], g = g[1], !h || a.series && a.series.noSharedTooltip ? i = a.getLabelConfig() :(c.hoverPoints = a, 
i && n(i, function(a) {
a.setState();
}), n(a, function(a) {
a.setState("hover"), k.push(a.getLabelConfig());
}), i = {
x:a[0].category,
y:a[0].y
}, i.points = k, a = a[0]), j = j.call(i, this), i = a.series, h = h || !i.isCartesian || i.tooltipOutsidePlot || c.isInsidePlot(f, g), 
j !== !1 && h ? (this.isHidden && (Ta(d), d.attr("opacity", 1).show()), d.attr({
text:j
}), m = e.borderColor || a.color || i.color || "#606060", d.attr({
stroke:m
}), this.updatePosition({
plotX:f,
plotY:g
}), this.isHidden = !1) :this.hide(), l) for (l = ha(l), d = l.length; d--; ) e = a.series[d ? "yAxis" :"xAxis"], 
l[d] && e && (h = d ? o(a.stackY, a.y) :a.x, e.isLog && (h = ka(h)), e = e.getPlotLinePath(h, 1), 
this.crosshairs[d] ? this.crosshairs[d].attr({
d:e,
visibility:"visible"
}) :(h = {
"stroke-width":l[d].width || 1,
stroke:l[d].color || "#C0C0C0",
zIndex:l[d].zIndex || 2
}, l[d].dashStyle && (h.dashstyle = l[d].dashStyle), this.crosshairs[d] = c.renderer.path(e).attr(h).add()));
D(c, "tooltipRefresh", {
text:j,
x:f + c.plotLeft,
y:g + c.plotTop,
borderColor:m
});
},
updatePosition:function(a) {
var b = this.chart, c = this.label, c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
this.move(t(c.x), t(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop);
}
}, qb.prototype = {
init:function(a, b) {
var e, c = $ ? "" :b.chart.zoomType, d = a.inverted;
this.options = b, this.chart = a, this.zoomX = e = /x/.test(c), this.zoomY = c = /y/.test(c), 
this.zoomHor = e && !d || c && d, this.zoomVert = c && !d || e && d, this.pinchDown = [], 
this.lastValidTouch = {}, b.tooltip.enabled && (a.tooltip = new pb(a, b.tooltip)), 
this.setDOMEvents();
},
normalize:function(a) {
var b, c, d, a = a || O.event;
return a.target || (a.target = a.srcElement), a = Pb(a), d = a.touches ? a.touches.item(0) :a, 
this.chartPosition = b = Tb(this.chart.container), d.pageX === x ? (c = a.x, b = a.y) :(c = d.pageX - b.left, 
b = d.pageY - b.top), v(a, {
chartX:t(c),
chartY:t(b)
});
},
getCoordinates:function(a) {
var b = {
xAxis:[],
yAxis:[]
};
return n(this.chart.axes, function(c) {
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
var e, h, i, b = this.chart, c = b.series, d = b.tooltip, f = b.hoverPoint, g = b.hoverSeries, j = b.chartWidth, k = this.getIndex(a);
if (d && this.options.tooltip.shared && (!g || !g.noSharedTooltip)) {
for (e = [], h = c.length, i = 0; h > i; i++) c[i].visible && c[i].options.enableMouseTracking !== !1 && !c[i].noSharedTooltip && c[i].tooltipPoints.length && (b = c[i].tooltipPoints[k], 
b.series) && (b._dist = Q(k - b.clientX), j = K(j, b._dist), e.push(b));
for (h = e.length; h--; ) e[h]._dist > j && e.splice(h, 1);
e.length && e[0].clientX !== this.hoverX && (d.refresh(e, a), this.hoverX = e[0].clientX);
}
g && g.tracker ? (b = g.tooltipPoints[k]) && b !== f && b.onMouseOver(a) :d && d.followPointer && !d.isHidden && (a = d.getAnchor([ {} ], a), 
d.updatePosition({
plotX:a[0],
plotY:a[1]
}));
},
reset:function(a) {
var b = this.chart, c = b.hoverSeries, d = b.hoverPoint, e = b.tooltip, b = e && e.shared ? b.hoverPoints :d;
(a = a && e && b) && ha(b)[0].plotX === x && (a = !1), a ? e.refresh(b) :(d && d.onMouseOut(), 
c && c.onMouseOut(), e && (e.hide(), e.hideCrosshairs()), this.hoverX = null);
},
scaleGroups:function(a, b) {
var c = this.chart;
n(c.series, function(d) {
d.xAxis.zoomEnabled && (d.group.attr(a), d.markerGroup && (d.markerGroup.attr(a), 
d.markerGroup.clip(b ? c.clipRect :null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(a));
}), c.clipRect.attr(b || c.clipBox);
},
pinchTranslateDirection:function(a, b, c, d, e, f, g) {
var p, s, x, h = this.chart, i = a ? "x" :"y", j = a ? "X" :"Y", k = "chart" + j, m = a ? "width" :"height", l = h["plot" + (a ? "Left" :"Top")], o = 1, n = h.inverted, w = h.bounds[a ? "h" :"v"], q = 1 === b.length, t = b[0][k], r = c[0][k], v = !q && b[1][k], u = !q && c[1][k], c = function() {
!q && Q(t - v) > 20 && (o = Q(r - u) / Q(t - v)), s = (l - r) / o + t, p = h["plot" + (a ? "Width" :"Height")] / o;
};
c(), b = s, b < w.min ? (b = w.min, x = !0) :b + p > w.max && (b = w.max - p, x = !0), 
x ? (r -= .8 * (r - g[i][0]), q || (u -= .8 * (u - g[i][1])), c()) :g[i] = [ r, u ], 
n || (f[i] = s - l, f[m] = p), f = n ? 1 / o :o, e[m] = p, e[i] = b, d[n ? a ? "scaleY" :"scaleX" :"scale" + j] = o, 
d["translate" + j] = f * l + (r - f * t);
},
pinch:function(a) {
var b = this, c = b.chart, d = b.pinchDown, e = c.tooltip.options.followTouchMove, f = a.touches, g = f.length, h = b.lastValidTouch, i = b.zoomHor || b.pinchHor, j = b.zoomVert || b.pinchVert, k = i || j, m = b.selectionMarker, l = {}, p = {};
"touchstart" === a.type && e && (b.inClass(a.target, "highcharts-tracker") ? (!c.runTrackerClick || g > 1) && a.preventDefault() :(!c.runChartClick || g > 1) && a.preventDefault()), 
Ka(f, function(a) {
return b.normalize(a);
}), "touchstart" === a.type ? (n(f, function(a, b) {
d[b] = {
chartX:a.chartX,
chartY:a.chartY
};
}), h.x = [ d[0].chartX, d[1] && d[1].chartX ], h.y = [ d[0].chartY, d[1] && d[1].chartY ], 
n(c.axes, function(a) {
if (a.zoomEnabled) {
var b = c.bounds[a.horiz ? "h" :"v"], d = a.minPixelPadding, e = a.toPixels(a.dataMin), f = a.toPixels(a.dataMax), g = K(e, f), e = q(e, f);
b.min = K(a.pos, g - d), b.max = q(a.pos + a.len, e + d);
}
})) :d.length && (m || (b.selectionMarker = m = v({
destroy:ta
}, c.plotBox)), i && b.pinchTranslateDirection(!0, d, f, l, m, p, h), j && b.pinchTranslateDirection(!1, d, f, l, m, p, h), 
b.hasPinched = k, b.scaleGroups(l, p), !k && e && 1 === g && this.runPointActions(b.normalize(a)));
},
dragStart:function(a) {
var b = this.chart;
b.mouseIsDown = a.type, b.cancelClick = !1, b.mouseDownX = this.mouseDownX = a.chartX, 
this.mouseDownY = a.chartY;
},
drag:function(a) {
var k, b = this.chart, c = b.options.chart, d = a.chartX, a = a.chartY, e = this.zoomHor, f = this.zoomVert, g = b.plotLeft, h = b.plotTop, i = b.plotWidth, j = b.plotHeight, m = this.mouseDownX, l = this.mouseDownY;
g > d ? d = g :d > g + i && (d = g + i), h > a ? a = h :a > h + j && (a = h + j), 
this.hasDragged = Math.sqrt(Math.pow(m - d, 2) + Math.pow(l - a, 2)), this.hasDragged > 10 && (k = b.isInsidePlot(m - g, l - h), 
b.hasCartesianSeries && (this.zoomX || this.zoomY) && k && !this.selectionMarker && (this.selectionMarker = b.renderer.rect(g, h, e ? 1 :i, f ? 1 :j, 0).attr({
fill:c.selectionMarkerFill || "rgba(69,114,167,0.25)",
zIndex:7
}).add()), this.selectionMarker && e && (e = d - m, this.selectionMarker.attr({
width:Q(e),
x:(e > 0 ? 0 :e) + m
})), this.selectionMarker && f && (e = a - l, this.selectionMarker.attr({
height:Q(e),
y:(e > 0 ? 0 :e) + l
})), k && !this.selectionMarker && c.panning && b.pan(d));
},
drop:function(a) {
var b = this.chart, c = this.hasPinched;
if (this.selectionMarker) {
var h, d = {
xAxis:[],
yAxis:[],
originalEvent:a.originalEvent || a
}, e = this.selectionMarker, f = e.x, g = e.y;
(this.hasDragged || c) && (n(b.axes, function(a) {
if (a.zoomEnabled) {
var b = a.horiz, c = a.minPixelPadding, m = a.toValue((b ? f :g) + c), b = a.toValue((b ? f + e.width :g + e.height) - c);
!isNaN(m) && !isNaN(b) && (d[a.xOrY + "Axis"].push({
axis:a,
min:K(m, b),
max:q(m, b)
}), h = !0);
}
}), h && D(b, "selection", d, function(a) {
b.zoom(v(a, c ? {
animation:!1
} :null));
})), this.selectionMarker = this.selectionMarker.destroy(), c && this.scaleGroups({
translateX:b.plotLeft,
translateY:b.plotTop,
scaleX:1,
scaleY:1
});
}
b && (L(b.container, {
cursor:b._cursor
}), b.cancelClick = this.hasDragged, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, 
this.pinchDown = []);
},
onContainerMouseDown:function(a) {
a = this.normalize(a), a.preventDefault && a.preventDefault(), this.dragStart(a);
},
onDocumentMouseUp:function(a) {
this.drop(a);
},
onDocumentMouseMove:function(a) {
var b = this.chart, c = this.chartPosition, d = b.hoverSeries, a = Pb(a);
c && d && d.isCartesian && !b.isInsidePlot(a.pageX - c.left - b.plotLeft, a.pageY - c.top - b.plotTop) && this.reset();
},
onContainerMouseLeave:function() {
this.reset(), this.chartPosition = null;
},
onContainerMouseMove:function(a) {
var b = this.chart, a = this.normalize(a);
a.returnValue = !1, "mousedown" === b.mouseIsDown && this.drag(a), b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.runPointActions(a);
},
inClass:function(a, b) {
for (var c; a; ) {
if (c = A(a, "class")) {
if (-1 !== c.indexOf(b)) return !0;
if (-1 !== c.indexOf("highcharts-container")) return !1;
}
a = a.parentNode;
}
},
onTrackerMouseOut:function(a) {
var b = this.chart.hoverSeries;
!b || b.options.stickyTracking || this.inClass(a.toElement || a.relatedTarget, "highcharts-tooltip") || b.onMouseOut();
},
onContainerClick:function(a) {
var g, h, i, b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop, f = b.inverted, a = this.normalize(a);
a.cancelBubble = !0, b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (g = this.chartPosition, 
h = c.plotX, i = c.plotY, v(c, {
pageX:g.left + d + (f ? b.plotWidth - i :h),
pageY:g.top + e + (f ? b.plotHeight - h :i)
}), D(c.series, "click", v(a, {
point:c
})), c.firePointEvent("click", a)) :(v(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && D(b, "click", a)));
},
onContainerTouchStart:function(a) {
var b = this.chart;
1 === a.touches.length ? (a = this.normalize(a), b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && (this.runPointActions(a), 
this.pinch(a))) :2 === a.touches.length && this.pinch(a);
},
onContainerTouchMove:function(a) {
(1 === a.touches.length || 2 === a.touches.length) && this.pinch(a);
},
onDocumentTouchEnd:function(a) {
this.drop(a);
},
setDOMEvents:function() {
var c, a = this, b = a.chart.container;
this._events = c = [ [ b, "onmousedown", "onContainerMouseDown" ], [ b, "onmousemove", "onContainerMouseMove" ], [ b, "onclick", "onContainerClick" ], [ b, "mouseleave", "onContainerMouseLeave" ], [ z, "mousemove", "onDocumentMouseMove" ], [ z, "mouseup", "onDocumentMouseUp" ] ], 
fb && c.push([ b, "ontouchstart", "onContainerTouchStart" ], [ b, "ontouchmove", "onContainerTouchMove" ], [ z, "touchend", "onDocumentTouchEnd" ]), 
n(c, function(b) {
a["_" + b[2]] = function(c) {
a[b[2]](c);
}, 0 === b[1].indexOf("on") ? b[0][b[1]] = a["_" + b[2]] :J(b[0], b[1], a["_" + b[2]]);
});
},
destroy:function() {
var a = this;
n(a._events, function(b) {
0 === b[1].indexOf("on") ? b[0][b[1]] = null :ba(b[0], b[1], a["_" + b[2]]);
}), delete a._events, clearInterval(a.tooltipTimeout);
}
}, rb.prototype = {
init:function(a, b) {
var c = this, d = b.itemStyle, e = o(b.padding, 8), f = b.itemMarginTop || 0;
this.options = b, b.enabled && (c.baseline = u(d.fontSize) + 3 + f, c.itemStyle = d, 
c.itemHiddenStyle = y(d, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e, 
c.initialItemX = e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, 
c.lastLineHeight = 0, c.render(), J(c.chart, "endResize", function() {
c.positionCheckboxes();
}));
},
colorizeItem:function(a, b) {
var j, c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color :g, h = b ? a.color :g, g = a.options && a.options.marker, i = {
stroke:h,
fill:h
};
if (d && d.css({
fill:c,
color:c
}), e && e.attr({
stroke:h
}), f) {
if (g) for (j in g = a.convertAttribs(g)) d = g[j], d !== x && (i[j] = d);
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
n([ "legendItem", "legendLine", "legendSymbol", "legendGroup" ], function(b) {
a[b] && a[b].destroy();
}), b && Ra(a.checkbox);
},
destroy:function() {
var a = this.group, b = this.box;
b && (this.box = b.destroy()), a && (this.group = a.destroy());
},
positionCheckboxes:function(a) {
var c, b = this.group.alignAttr, d = this.clipHeight || this.legendHeight;
b && (c = b.translateY, n(this.allItems, function(e) {
var g, f = e.checkbox;
f && (g = c + f.y + (a || 0) + 3, L(f, {
left:b.translateX + e.legendItemWidth + f.x - 20 + "px",
top:g + "px",
display:g > c - 6 && c + d - 6 > g ? "" :S
}));
}));
},
renderTitle:function() {
var a = this.padding, b = this.options.title, c = 0;
b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
zIndex:1
}).css(b.style).add(this.group)), c = this.title.getBBox().height, this.contentGroup.attr({
translateY:c
})), this.titleHeight = c;
},
renderItem:function(a) {
var w, b = this, c = b.chart, d = c.renderer, e = b.options, f = "horizontal" === e.layout, g = e.symbolWidth, h = e.symbolPadding, i = b.itemStyle, j = b.itemHiddenStyle, k = b.padding, m = !e.rtl, l = e.width, p = e.itemMarginBottom || 0, s = b.itemMarginTop, o = b.initialItemX, n = a.legendItem, t = a.series || a, r = t.options, v = r.showCheckbox, u = e.useHTML;
!n && (a.legendGroup = d.g("legend-item").attr({
zIndex:1
}).add(b.scrollGroup), t.drawLegendSymbol(b, a), a.legendItem = n = d.text(e.labelFormat ? Ea(e.labelFormat, a) :e.labelFormatter.call(a), m ? g + h :-h, b.baseline, u).css(y(a.visible ? i :j)).attr({
align:m ? "left" :"right",
zIndex:2
}).add(a.legendGroup), (u ? n :a.legendGroup).on("mouseover", function() {
a.setState("hover"), n.css(b.options.itemHoverStyle);
}).on("mouseout", function() {
n.css(a.visible ? i :j), a.setState();
}).on("click", function(b) {
var c = function() {
a.setVisible();
}, b = {
browserEvent:b
};
a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) :D(a, "legendItemClick", b, c);
}), b.colorizeItem(a, a.visible), r && v) && (a.checkbox = U("input", {
type:"checkbox",
checked:a.selected,
defaultChecked:a.selected
}, e.itemCheckboxStyle, c.container), J(a.checkbox, "click", function(b) {
D(a, "checkboxClick", {
checked:b.target.checked
}, function() {
a.select();
});
})), d = n.getBBox(), w = a.legendItemWidth = e.itemWidth || g + h + d.width + k + (v ? 20 :0), 
e = w, b.itemHeight = g = d.height, f && b.itemX - o + e > (l || c.chartWidth - 2 * k - o) && (b.itemX = o, 
b.itemY += s + b.lastLineHeight + p, b.lastLineHeight = 0), b.maxItemWidth = q(b.maxItemWidth, e), 
b.lastItemY = s + b.itemY + p, b.lastLineHeight = q(g, b.lastLineHeight), a._legendItemPos = [ b.itemX, b.itemY ], 
f ? b.itemX += e :(b.itemY += s + g + p, b.lastLineHeight = g), b.offsetWidth = l || q(f ? b.itemX - o :e, b.offsetWidth);
},
render:function() {
var e, f, g, h, a = this, b = a.chart, c = b.renderer, d = a.group, i = a.box, j = a.options, k = a.padding, m = j.borderWidth, l = j.backgroundColor;
a.itemX = a.initialItemX, a.itemY = a.initialItemY, a.offsetWidth = 0, a.lastItemY = 0, 
d || (a.group = d = c.g("legend").attr({
zIndex:7
}).add(), a.contentGroup = c.g().attr({
zIndex:1
}).add(d), a.scrollGroup = c.g().add(a.contentGroup), a.clipRect = c.clipRect(0, 0, 9999, b.chartHeight), 
a.contentGroup.clip(a.clipRect)), a.renderTitle(), e = [], n(b.series, function(a) {
var b = a.options;
b.showInLegend && !r(b.linkedTo) && (e = e.concat(a.legendItems || ("point" === b.legendType ? a.data :a)));
}), Gb(e, function(a, b) {
return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
}), j.reversed && e.reverse(), a.allItems = e, a.display = f = !!e.length, n(e, function(b) {
a.renderItem(b);
}), g = j.width || a.offsetWidth, h = a.lastItemY + a.lastLineHeight + a.titleHeight, 
h = a.handleOverflow(h), (m || l) && (g += k, h += k, i ? g > 0 && h > 0 && (i[i.isNew ? "attr" :"animate"](i.crisp(null, null, null, g, h)), 
i.isNew = !1) :(a.box = i = c.rect(0, 0, g, h, j.borderRadius, m || 0).attr({
stroke:j.borderColor,
"stroke-width":m || 0,
fill:l || S
}).add(d).shadow(j.shadow), i.isNew = !0), i[f ? "show" :"hide"]()), a.legendWidth = g, 
a.legendHeight = h, n(e, function(b) {
a.positionItem(b);
}), f && d.align(v({
width:g,
height:h
}, j), !0, "spacingBox"), b.isResizing || this.positionCheckboxes();
},
handleOverflow:function(a) {
var b = this, c = this.chart, d = c.renderer, e = this.options, f = e.y, f = c.spacingBox.height + ("top" === e.verticalAlign ? -f :f) - this.padding, g = e.maxHeight, h = this.clipRect, i = e.navigation, j = o(i.animation, !0), k = i.arrowSize || 12, m = this.nav;
return "horizontal" === e.layout && (f /= 2), g && (f = K(f, g)), a > f && !e.useHTML ? (this.clipHeight = c = f - 20 - this.titleHeight, 
this.pageCount = ja(a / c), this.currentPage = o(this.currentPage, 1), this.fullHeight = a, 
h.attr({
height:c
}), m || (this.nav = m = d.g().attr({
zIndex:1
}).add(this.group), this.up = d.symbol("triangle", 0, 0, k, k).on("click", function() {
b.scroll(-1, j);
}).add(m), this.pager = d.text("", 15, 10).css(i.style).add(m), this.down = d.symbol("triangle-down", 0, 0, k, k).on("click", function() {
b.scroll(1, j);
}).add(m)), b.scroll(0), a = f) :m && (h.attr({
height:c.chartHeight
}), m.hide(), this.scrollGroup.attr({
translateY:1
}), this.clipHeight = 0), a;
},
scroll:function(a, b) {
var c = this.pageCount, d = this.currentPage + a, e = this.clipHeight, f = this.options.navigation, g = f.activeColor, h = f.inactiveColor, f = this.pager, i = this.padding;
d > c && (d = c), d > 0 && (b !== x && Ha(b, this.chart), this.nav.attr({
translateX:i,
translateY:e + 7 + this.titleHeight,
visibility:"visible"
}), this.up.attr({
fill:1 === d ? h :g
}).css({
cursor:1 === d ? "default" :"pointer"
}), f.attr({
text:d + "/" + this.pageCount
}), this.down.attr({
x:18 + this.pager.getBBox().width,
fill:d === c ? h :g
}).css({
cursor:d === c ? "default" :"pointer"
}), e = -K(e * (d - 1), this.fullHeight - e + i) + 1, this.scrollGroup.animate({
translateY:e
}), f.attr({
text:d + "/" + c
}), this.currentPage = d, this.positionCheckboxes(e));
}
}, sb.prototype = {
init:function(a, b) {
var c, d = a.series;
a.series = null, c = y(N, a), c.series = a.series = d;
var d = c.chart, e = d.margin, e = V(e) ? e :[ e, e, e, e ];
this.optionsMarginTop = o(d.marginTop, e[0]), this.optionsMarginRight = o(d.marginRight, e[1]), 
this.optionsMarginBottom = o(d.marginBottom, e[2]), this.optionsMarginLeft = o(d.marginLeft, e[3]), 
this.runChartClick = (e = d.events) && !!e.click, this.bounds = {
h:{},
v:{}
}, this.callback = b, this.isResizing = 0, this.options = c, this.axes = [], this.series = [], 
this.hasCartesianSeries = d.showAxes;
var g, f = this;
if (f.index = za.length, za.push(f), d.reflow !== !1 && J(f, "load", function() {
f.initReflow();
}), e) for (g in e) J(f, g, e[g]);
f.xAxis = [], f.yAxis = [], f.animation = $ ? !1 :o(d.animation, !0), f.pointCount = 0, 
f.counters = new Fb(), f.firstRender();
},
initSeries:function(a) {
var b = this.options.chart;
return (b = aa[a.type || b.type || b.defaultSeriesType]) || qa(17, !0), b = new b(), 
b.init(this, a), b;
},
addSeries:function(a, b, c) {
var d, e = this;
return a && (b = o(b, !0), D(e, "addSeries", {
options:a
}, function() {
d = e.initSeries(a), e.isDirtyLegend = !0, b && e.redraw(c);
})), d;
},
addAxis:function(a, b, c, d) {
var b = b ? "xAxis" :"yAxis", e = this.options;
new ab(this, y(a, {
index:this[b].length
})), e[b] = ha(e[b] || {}), e[b].push(a), o(c, !0) && this.redraw(d);
},
isInsidePlot:function(a, b, c) {
var d = c ? b :a, a = c ? a :b;
return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight;
},
adjustTickAmounts:function() {
this.options.chart.alignTicks !== !1 && n(this.axes, function(a) {
a.adjustTickAmount();
}), this.maxTicks = null;
},
redraw:function(a) {
var g, b = this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, h = this.isDirtyBox, i = c.length, j = i, k = this.renderer, m = k.isHidden(), l = [];
for (Ha(a, this), m && this.cloneRenderTo(); j--; ) if (a = c[j], a.isDirty && a.options.stacking) {
g = !0;
break;
}
if (g) for (j = i; j--; ) a = c[j], a.options.stacking && (a.isDirty = !0);
n(c, function(a) {
a.isDirty && "point" === a.options.legendType && (f = !0);
}), f && e.options.enabled && (e.render(), this.isDirtyLegend = !1), this.hasCartesianSeries && (this.isResizing || (this.maxTicks = null, 
n(b, function(a) {
a.setScale();
})), this.adjustTickAmounts(), this.getMargins(), n(b, function(a) {
a.isDirtyExtremes && (a.isDirtyExtremes = !1, l.push(function() {
D(a, "afterSetExtremes", a.getExtremes());
})), (a.isDirty || h || g) && (a.redraw(), h = !0);
})), h && this.drawChartBox(), n(c, function(a) {
a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw();
}), d && d.reset && d.reset(!0), k.draw(), D(this, "redraw"), m && this.cloneRenderTo(!0), 
n(l, function(a) {
a.call();
});
},
showLoading:function(a) {
var b = this.options, c = this.loadingDiv, d = b.loading;
c || (this.loadingDiv = c = U(wa, {
className:"highcharts-loading"
}, v(d.style, {
zIndex:10,
display:S
}), this.container), this.loadingSpan = U("span", null, d.labelStyle, c)), this.loadingSpan.innerHTML = a || b.lang.loading, 
this.loadingShown || (L(c, {
opacity:0,
display:"",
left:this.plotLeft + "px",
top:this.plotTop + "px",
width:this.plotWidth + "px",
height:this.plotHeight + "px"
}), vb(c, {
opacity:d.style.opacity
}, {
duration:d.showDuration || 0
}), this.loadingShown = !0);
},
hideLoading:function() {
var a = this.options, b = this.loadingDiv;
b && vb(b, {
opacity:0
}, {
duration:a.loading.hideDuration || 100,
complete:function() {
L(b, {
display:S
});
}
}), this.loadingShown = !1;
},
get:function(a) {
var d, e, b = this.axes, c = this.series;
for (d = 0; d < b.length; d++) if (b[d].options.id === a) return b[d];
for (d = 0; d < c.length; d++) if (c[d].options.id === a) return c[d];
for (d = 0; d < c.length; d++) for (e = c[d].points || [], b = 0; b < e.length; b++) if (e[b].id === a) return e[b];
return null;
},
getAxes:function() {
var a = this, b = this.options, c = b.xAxis = ha(b.xAxis || {}), b = b.yAxis = ha(b.yAxis || {});
n(c, function(a, b) {
a.index = b, a.isX = !0;
}), n(b, function(a, b) {
a.index = b;
}), c = c.concat(b), n(c, function(b) {
new ab(a, b);
}), a.adjustTickAmounts();
},
getSelectedPoints:function() {
var a = [];
return n(this.series, function(b) {
a = a.concat(Ob(b.points || [], function(a) {
return a.selected;
}));
}), a;
},
getSelectedSeries:function() {
return Ob(this.series, function(a) {
return a.selected;
});
},
showResetZoom:function() {
var a = this, b = N.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null :"plotBox";
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
!a || a.resetSelection ? n(this.axes, function(a) {
b = a.zoom();
}) :n(a.xAxis.concat(a.yAxis), function(a) {
var e = a.axis, h = e.isXAxis;
(c[h ? "zoomX" :"zoomY"] || c[h ? "pinchX" :"pinchY"]) && (b = e.zoom(a.min, a.max), 
e.displayBtn && (d = !0));
}), e = this.resetZoomButton, d && !e ? this.showResetZoom() :!d && V(e) && (this.resetZoomButton = e.destroy()), 
b && this.redraw(o(this.options.chart.animation, a && a.animation, this.pointCount < 100));
},
pan:function(a) {
var b = this.xAxis[0], c = this.mouseDownX, d = b.pointRange / 2, e = b.getExtremes(), f = b.translate(c - a, !0) + d, c = b.translate(c + this.plotWidth - a, !0) - d;
(d = this.hoverPoints) && n(d, function(a) {
a.setState();
}), b.series.length && f > K(e.dataMin, e.min) && c < q(e.dataMax, e.max) && b.setExtremes(f, c, !0, !1, {
trigger:"pan"
}), this.mouseDownX = a, L(this.container, {
cursor:"move"
});
},
setTitle:function(a, b) {
var f, e, c = this, d = c.options;
e = d.title = y(d.title, a), f = d.subtitle = y(d.subtitle, b), d = f, n([ [ "title", a, e ], [ "subtitle", b, d ] ], function(a) {
var b = a[0], d = c[b], e = a[1], a = a[2];
d && e && (c[b] = d = d.destroy()), a && a.text && !d && (c[b] = c.renderer.text(a.text, 0, 0, a.useHTML).attr({
align:a.align,
"class":"highcharts-" + b,
zIndex:a.zIndex || 4
}).css(a.style).add().align(a, !1, "spacingBox"));
});
},
getChartSize:function() {
var a = this.options.chart, b = this.renderToClone || this.renderTo;
this.containerWidth = gb(b, "width"), this.containerHeight = gb(b, "height"), this.chartWidth = q(0, a.width || this.containerWidth || 600), 
this.chartHeight = q(0, o(a.height, this.containerHeight > 19 ? this.containerHeight :400));
},
cloneRenderTo:function(a) {
var b = this.renderToClone, c = this.container;
a ? b && (this.renderTo.appendChild(c), Ra(b), delete this.renderToClone) :(c && this.renderTo.removeChild(c), 
this.renderToClone = b = this.renderTo.cloneNode(0), L(b, {
position:"absolute",
top:"-9999px",
display:"block"
}), z.body.appendChild(b), c && b.appendChild(c));
},
getContainer:function() {
var a, c, d, e, b = this.options.chart;
this.renderTo = a = b.renderTo, e = "highcharts-" + tb++, fa(a) && (this.renderTo = a = z.getElementById(a)), 
a || qa(13, !0), c = u(A(a, "data-highcharts-chart")), !isNaN(c) && za[c] && za[c].destroy(), 
A(a, "data-highcharts-chart", this.index), a.innerHTML = "", a.offsetWidth || this.cloneRenderTo(), 
this.getChartSize(), c = this.chartWidth, d = this.chartHeight, this.container = a = U(wa, {
className:"highcharts-container" + (b.className ? " " + b.className :""),
id:e
}, v({
position:"relative",
overflow:"hidden",
width:c + "px",
height:d + "px",
textAlign:"left",
lineHeight:"normal",
zIndex:0
}, b.style), this.renderToClone || a), this._cursor = a.style.cursor, this.renderer = b.forExport ? new Aa(a, c, d, !0) :new Sa(a, c, d), 
$ && this.renderer.create(this, a, c, d);
},
getMargins:function() {
var e, a = this.options.chart, b = a.spacingTop, c = a.spacingRight, d = a.spacingBottom, a = a.spacingLeft, f = this.legend, g = this.optionsMarginTop, h = this.optionsMarginLeft, i = this.optionsMarginRight, j = this.optionsMarginBottom, k = this.options.title, m = this.options.subtitle, l = this.options.legend, p = o(l.margin, 10), s = l.x, t = l.y, B = l.align, w = l.verticalAlign;
this.resetMargins(), e = this.axisOffset, !this.title && !this.subtitle || r(this.optionsMarginTop) || (m = q(this.title && !k.floating && !k.verticalAlign && k.y || 0, this.subtitle && !m.floating && !m.verticalAlign && m.y || 0)) && (this.plotTop = q(this.plotTop, m + o(k.margin, 15) + b)), 
f.display && !l.floating && ("right" === B ? r(i) || (this.marginRight = q(this.marginRight, f.legendWidth - s + p + c)) :"left" === B ? r(h) || (this.plotLeft = q(this.plotLeft, f.legendWidth + s + p + a)) :"top" === w ? r(g) || (this.plotTop = q(this.plotTop, f.legendHeight + t + p + b)) :"bottom" !== w || r(j) || (this.marginBottom = q(this.marginBottom, f.legendHeight - t + p + d))), 
this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), 
this.hasCartesianSeries && n(this.axes, function(a) {
a.getOffset();
}), r(h) || (this.plotLeft += e[3]), r(g) || (this.plotTop += e[0]), r(j) || (this.marginBottom += e[2]), 
r(i) || (this.marginRight += e[1]), this.setChartSize();
},
initReflow:function() {
function a(a) {
var g = c.width || gb(d, "width"), h = c.height || gb(d, "height"), a = a ? a.target :O;
b.hasUserSize || !g || !h || a !== O && a !== z || ((g !== b.containerWidth || h !== b.containerHeight) && (clearTimeout(e), 
b.reflowTimeout = e = setTimeout(function() {
b.container && (b.setSize(g, h, !1), b.hasUserSize = null);
}, 100)), b.containerWidth = g, b.containerHeight = h);
}
var e, b = this, c = b.options.chart, d = b.renderTo;
J(O, "resize", a), J(b, "destroy", function() {
ba(O, "resize", a);
});
},
setSize:function(a, b, c) {
var e, f, g, d = this;
d.isResizing += 1, g = function() {
d && D(d, "endResize", null, function() {
d.isResizing -= 1;
});
}, Ha(c, d), d.oldChartHeight = d.chartHeight, d.oldChartWidth = d.chartWidth, r(a) && (d.chartWidth = e = q(0, t(a)), 
d.hasUserSize = !!e), r(b) && (d.chartHeight = f = q(0, t(b))), L(d.container, {
width:e + "px",
height:f + "px"
}), d.setChartSize(!0), d.renderer.setSize(e, f, c), d.maxTicks = null, n(d.axes, function(a) {
a.isDirty = !0, a.setScale();
}), n(d.series, function(a) {
a.isDirty = !0;
}), d.isDirtyLegend = !0, d.isDirtyBox = !0, d.getMargins(), d.redraw(c), d.oldChartHeight = null, 
D(d, "resize"), xa === !1 ? g() :setTimeout(g, xa && xa.duration || 500);
},
setChartSize:function(a) {
var m, l, p, o, b = this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = f.spacingTop, h = f.spacingRight, i = f.spacingBottom, j = f.spacingLeft, k = this.clipOffset;
this.plotLeft = m = t(this.plotLeft), this.plotTop = l = t(this.plotTop), this.plotWidth = p = q(0, t(d - m - this.marginRight)), 
this.plotHeight = o = q(0, t(e - l - this.marginBottom)), this.plotSizeX = b ? o :p, 
this.plotSizeY = b ? p :o, this.plotBorderWidth = b = f.plotBorderWidth || 0, this.spacingBox = c.spacingBox = {
x:j,
y:g,
width:d - j - h,
height:e - g - i
}, this.plotBox = c.plotBox = {
x:m,
y:l,
width:p,
height:o
}, c = ja(q(b, k[3]) / 2), d = ja(q(b, k[0]) / 2), this.clipBox = {
x:c,
y:d,
width:T(this.plotSizeX - q(b, k[1]) / 2 - c),
height:T(this.plotSizeY - q(b, k[2]) / 2 - d)
}, a || n(this.axes, function(a) {
a.setAxisSize(), a.setAxisTranslation();
});
},
resetMargins:function() {
var a = this.options.chart, b = a.spacingRight, c = a.spacingBottom, d = a.spacingLeft;
this.plotTop = o(this.optionsMarginTop, a.spacingTop), this.marginRight = o(this.optionsMarginRight, b), 
this.marginBottom = o(this.optionsMarginBottom, c), this.plotLeft = o(this.optionsMarginLeft, d), 
this.axisOffset = [ 0, 0, 0, 0 ], this.clipOffset = [ 0, 0, 0, 0 ];
},
drawChartBox:function() {
var p, a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, h = this.plotBGImage, i = a.borderWidth || 0, j = a.backgroundColor, k = a.plotBackgroundColor, m = a.plotBackgroundImage, l = a.plotBorderWidth || 0, o = this.plotLeft, n = this.plotTop, t = this.plotWidth, q = this.plotHeight, r = this.plotBox, v = this.clipRect, u = this.clipBox;
p = i + (a.shadow ? 8 :0), (i || j) && (e ? e.animate(e.crisp(null, null, null, c - p, d - p)) :(e = {
fill:j || S
}, i && (e.stroke = a.borderColor, e["stroke-width"] = i), this.chartBackground = b.rect(p / 2, p / 2, c - p, d - p, a.borderRadius, i).attr(e).add().shadow(a.shadow))), 
k && (f ? f.animate(r) :this.plotBackground = b.rect(o, n, t, q, 0).attr({
fill:k
}).add().shadow(a.plotShadow)), m && (h ? h.animate(r) :this.plotBGImage = b.image(m, o, n, t, q).add()), 
v ? v.animate({
width:u.width,
height:u.height
}) :this.clipRect = b.clipRect(u), l && (g ? g.animate(g.crisp(null, o, n, t, q)) :this.plotBorder = b.rect(o, n, t, q, 0, l).attr({
stroke:a.plotBorderColor,
"stroke-width":l,
zIndex:1
}).add()), this.isDirtyBox = !1;
},
propFromSeries:function() {
var c, e, f, a = this, b = a.options.chart, d = a.options.series;
n([ "inverted", "angular", "polar" ], function(g) {
for (c = aa[b.type || b.defaultSeriesType], f = a[g] || b[g] || c && c.prototype[g], 
e = d && d.length; !f && e--; ) (c = aa[d[e].type]) && c.prototype[g] && (f = !0);
a[g] = f;
});
},
render:function() {
var g, a = this, b = a.axes, c = a.renderer, d = a.options, e = d.labels, f = d.credits;
a.setTitle(), a.legend = new rb(a, d.legend), n(b, function(a) {
a.setScale();
}), a.getMargins(), a.maxTicks = null, n(b, function(a) {
a.setTickPositions(!0), a.setMaxTicks();
}), a.adjustTickAmounts(), a.getMargins(), a.drawChartBox(), a.hasCartesianSeries && n(b, function(a) {
a.render();
}), a.seriesGroup || (a.seriesGroup = c.g("series-group").attr({
zIndex:3
}).add()), n(a.series, function(a) {
a.translate(), a.setTooltipPoints(), a.render();
}), e.items && n(e.items, function(b) {
var d = v(e.style, b.style), f = u(d.left) + a.plotLeft, g = u(d.top) + a.plotTop + 12;
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
for (D(a, "destroy"), za[a.index] = x, a.renderTo.removeAttribute("data-highcharts-chart"), 
ba(a), e = b.length; e--; ) b[e] = b[e].destroy();
for (e = c.length; e--; ) c[e] = c[e].destroy();
n("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(b) {
var c = a[b];
c && c.destroy && (a[b] = c.destroy());
}), d && (d.innerHTML = "", ba(d), f && Ra(d));
for (e in a) delete a[e];
},
isReadyToRender:function() {
var a = this;
return !Z && O == O.top && "complete" !== z.readyState || $ && !O.canvg ? ($ ? Qb.push(function() {
a.firstRender();
}, a.options.global.canvasToolsURL) :z.attachEvent("onreadystatechange", function() {
z.detachEvent("onreadystatechange", a.firstRender), "complete" === z.readyState && a.firstRender();
}), !1) :!0;
},
firstRender:function() {
var a = this, b = a.options, c = a.callback;
a.isReadyToRender() && (a.getContainer(), D(a, "init"), a.resetMargins(), a.setChartSize(), 
a.propFromSeries(), a.getAxes(), n(b.series || [], function(b) {
a.initSeries(b);
}), D(a, "beforeRender"), a.pointer = new qb(a, b), a.render(), a.renderer.draw(), 
c && c.apply(a, [ a ]), n(a.callbacks, function(b) {
b.apply(a, [ a ]);
}), a.cloneRenderTo(!0), D(a, "load"));
}
}, sb.prototype.callbacks = [];
var Ma = function() {};
Ma.prototype = {
init:function(a, b, c) {
return this.series = a, this.applyOptions(b, c), this.pointAttr = {}, a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, 
this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length) && (a.colorCounter = 0), 
a.chart.pointCount++, this;
},
applyOptions:function(a, b) {
var c = this.series, d = c.pointValKey, a = Ma.prototype.optionsToObject.call(this, a);
return v(this, a), this.options = this.options ? v(this.options, a) :a, d && (this.y = this[d]), 
this.x === x && c && (this.x = b === x ? c.autoIncrement() :b), this;
},
optionsToObject:function(a) {
var b, c = this.series, d = c.pointArrayMap || [ "y" ], e = d.length, f = 0, g = 0;
if ("number" == typeof a || null === a) b = {
y:a
}; else if (Ba(a)) for (b = {}, a.length > e && (c = typeof a[0], "string" === c ? b.name = a[0] :"number" === c && (b.x = a[0]), 
f++); e > g; ) b[d[g++]] = a[f++]; else "object" == typeof a && (b = a, a.dataLabels && (c._hasPointLabels = !0), 
a.marker && (c._hasPointMarkers = !0));
return b;
},
destroy:function() {
var c, a = this.series.chart, b = a.hoverPoints;
a.pointCount--, b && (this.setState(), ga(b, this), !b.length) && (a.hoverPoints = null), 
this === a.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (ba(this), 
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
select:function(a, b) {
var c = this, d = c.series, e = d.chart, a = o(a, !c.selected);
c.firePointEvent(a ? "select" :"unselect", {
accumulate:b
}, function() {
c.selected = c.options.selected = a, d.options.data[la(c, d.data)] = c.options, 
c.setState(a && "select"), b || n(e.getSelectedPoints(), function(a) {
a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[la(a, d.data)] = a.options, 
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
b && -1 !== la(this, b) || (this.firePointEvent("mouseOut"), this.setState(), a.hoverPoint = null);
},
tooltipFormatter:function(a) {
var b = this.series, c = b.tooltipOptions, d = o(c.valueDecimals, ""), e = c.valuePrefix || "", f = c.valueSuffix || "";
return n(b.pointArrayMap || [ "y" ], function(b) {
b = "{point." + b, (e || f) && (a = a.replace(b + "}", e + b + "}" + f)), a = a.replace(b + "}", b + ":,." + d + "f}");
}), Ea(a, {
point:this,
series:this.series
});
},
update:function(a, b, c) {
var g, d = this, e = d.series, f = d.graphic, h = e.data, i = e.chart, b = o(b, !0);
d.firePointEvent("update", {
options:a
}, function() {
d.applyOptions(a), V(a) && (e.getAttribs(), f && f.attr(d.pointAttr[e.state])), 
g = la(d, h), e.xData[g] = d.x, e.yData[g] = e.toYData ? e.toYData(d) :d.y, e.zData[g] = d.z, 
e.options.data[g] = d.options, e.isDirty = !0, e.isDirtyData = !0, b && i.redraw(c);
});
},
remove:function(a, b) {
var f, c = this, d = c.series, e = d.chart, g = d.data;
Ha(b, e), a = o(a, !0), c.firePointEvent("remove", null, function() {
f = la(c, g), g.splice(f, 1), d.options.data.splice(f, 1), d.xData.splice(f, 1), 
d.yData.splice(f, 1), d.zData.splice(f, 1), c.destroy(), d.isDirty = !0, d.isDirtyData = !0, 
a && e.redraw();
});
},
firePointEvent:function(a, b, c) {
var d = this, e = this.series.options;
(e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents(), 
"click" === a && e.allowPointSelect && (c = function(a) {
d.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
}), D(this, a, b, c);
},
importEvents:function() {
if (!this.hasImportedEvents) {
var b, a = y(this.series.options.point, this.options).events;
this.events = a;
for (b in a) J(this, b, a[b]);
this.hasImportedEvents = !0;
}
},
setState:function(a) {
var b = this.plotX, c = this.plotY, d = this.series, e = d.options.states, f = X[d.type].marker && d.options.marker, g = f && !f.enabled, h = f && f.states[a], i = h && h.enabled === !1, j = d.stateMarkerGraphic, k = this.marker || {}, m = d.chart, l = this.pointAttr, a = a || "";
a === this.state || this.selected && "select" !== a || e[a] && e[a].enabled === !1 || a && (i || g && !h.enabled) || (this.graphic ? (e = f && this.graphic.symbolName && l[a].r, 
this.graphic.attr(y(l[a], e ? {
x:b - e,
y:c - e,
width:2 * e,
height:2 * e
} :{}))) :(a && h && (e = h.radius, k = k.symbol || d.symbol, j && j.currentSymbol !== k && (j = j.destroy()), 
j ? j.attr({
x:b - e,
y:c - e
}) :(d.stateMarkerGraphic = j = m.renderer.symbol(k, b - e, c - e, 2 * e, 2 * e).attr(l[a]).add(d.markerGroup), 
j.currentSymbol = k)), j && j[a && m.isInsidePlot(b, c) ? "show" :"hide"]()), this.state = a);
}
};
var R = function() {};
R.prototype = {
isCartesian:!0,
type:"line",
pointClass:Ma,
sorted:!0,
requireSorting:!0,
pointAttrToOptions:{
stroke:"lineColor",
"stroke-width":"lineWidth",
fill:"fillColor",
r:"radius"
},
colorCounter:0,
init:function(a, b) {
var c, d, e = a.series;
this.chart = a, this.options = b = this.setOptions(b), this.bindAxes(), v(this, {
name:b.name,
state:"",
pointAttr:{},
visible:b.visible !== !1,
selected:b.selected === !0
}), $ && (b.animation = !1), d = b.events;
for (c in d) J(this, c, d[c]);
(d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) && (a.runTrackerClick = !0), 
this.getColor(), this.getSymbol(), this.setData(b.data, !1), this.isCartesian && (a.hasCartesianSeries = !0), 
e.push(this), this._i = e.length - 1, Gb(e, function(a, b) {
return o(a.options.index, a._i) - o(b.options.index, a._i);
}), n(e, function(a, b) {
a.index = b, a.name = a.name || "Series " + (b + 1);
}), c = b.linkedTo, this.linkedSeries = [], fa(c) && (c = ":previous" === c ? e[this.index - 1] :a.get(c)) && (c.linkedSeries.push(this), 
this.linkedParent = c);
},
bindAxes:function() {
var d, a = this, b = a.options, c = a.chart;
a.isCartesian && n([ "xAxis", "yAxis" ], function(e) {
n(c[e], function(c) {
d = c.options, (b[e] === d.index || b[e] !== x && b[e] === d.id || b[e] === x && 0 === d.index) && (c.series.push(a), 
a[e] = c, c.isDirty = !0);
}), a[e] || qa(17, !0);
});
},
autoIncrement:function() {
var a = this.options, b = this.xIncrement, b = o(b, a.pointStart, 0);
return this.pointInterval = o(this.pointInterval, a.pointInterval, 1), this.xIncrement = b + this.pointInterval, 
b;
},
getSegments:function() {
var c, a = -1, b = [], d = this.points, e = d.length;
if (e) if (this.options.connectNulls) {
for (c = e; c--; ) null === d[c].y && d.splice(c, 1);
d.length && (b = [ d ]);
} else n(d, function(c, g) {
null === c.y ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) :g === e - 1 && b.push(d.slice(a + 1, g + 1));
});
this.segments = b;
},
setOptions:function(a) {
var b = this.chart.options, c = b.plotOptions, d = c[this.type];
return this.userOptions = a, a = y(d, c.series, a), this.tooltipOptions = y(b.tooltip, a.tooltip), 
null === d.marker && delete a.marker, a;
},
getColor:function() {
var e, a = this.options, b = this.userOptions, c = this.chart.options.colors, d = this.chart.counters;
e = a.color || X[this.type].color, e || a.colorByPoint || (r(b._colorIndex) ? a = b._colorIndex :(b._colorIndex = d.color, 
a = d.color++), e = c[a]), this.color = e, d.wrapColor(c.length);
},
getSymbol:function() {
var a = this.userOptions, b = this.options.marker, c = this.chart, d = c.options.symbols, c = c.counters;
this.symbol = b.symbol, this.symbol || (r(a._symbolIndex) ? a = a._symbolIndex :(a._symbolIndex = c.symbol, 
a = c.symbol++), this.symbol = d[a]), /^url/.test(this.symbol) && (b.radius = 0), 
c.wrapSymbol(d.length);
},
drawLegendSymbol:function(a) {
var g, b = this.options, c = b.marker, d = a.options.symbolWidth, e = this.chart.renderer, f = this.legendGroup, a = a.baseline;
b.lineWidth && (g = {
"stroke-width":b.lineWidth
}, b.dashStyle && (g.dashstyle = b.dashStyle), this.legendLine = e.path([ "M", 0, a - 4, "L", d, a - 4 ]).attr(g).add(f)), 
c && c.enabled && (b = c.radius, this.legendSymbol = e.symbol(this.symbol, d / 2 - b, a - 4 - b, 2 * b, 2 * b).add(f));
},
addPoint:function(a, b, c, d) {
var e = this.options, f = this.data, g = this.graph, h = this.area, i = this.chart, j = this.xData, k = this.yData, m = this.zData, l = this.names, p = g && g.shift || 0, n = e.data;
Ha(d, i), g && c && (g.shift = p + 1), h && (c && (h.shift = p + 1), h.isArea = !0), 
b = o(b, !0), d = {
series:this
}, this.pointClass.prototype.applyOptions.apply(d, [ a ]), j.push(d.x), k.push(this.toYData ? this.toYData(d) :d.y), 
m.push(d.z), l && (l[d.x] = d.name), n.push(a), "point" === e.legendType && this.generatePoints(), 
c && (f[0] && f[0].remove ? f[0].remove(!1) :(f.shift(), j.shift(), k.shift(), m.shift(), 
n.shift())), this.getAttribs(), this.isDirtyData = this.isDirty = !0, b && i.redraw();
},
setData:function(a, b) {
var i, c = this.points, d = this.options, e = this.chart, f = null, g = this.xAxis, h = g && g.categories && !g.categories.length ? [] :null;
this.xIncrement = null, this.pointRange = g && g.categories ? 1 :d.pointRange, this.colorCounter = 0;
var j = [], k = [], m = [], l = a ? a.length :[], p = (i = this.pointArrayMap) && i.length, n = !!this.toYData;
if (l > (d.turboThreshold || 1e3)) {
for (i = 0; null === f && l > i; ) f = a[i], i++;
if (Ca(f)) {
for (f = o(d.pointStart, 0), d = o(d.pointInterval, 1), i = 0; l > i; i++) j[i] = f, 
k[i] = a[i], f += d;
this.xIncrement = f;
} else if (Ba(f)) if (p) for (i = 0; l > i; i++) d = a[i], j[i] = d[0], k[i] = d.slice(1, p + 1); else for (i = 0; l > i; i++) d = a[i], 
j[i] = d[0], k[i] = d[1];
} else for (i = 0; l > i; i++) a[i] !== x && (d = {
series:this
}, this.pointClass.prototype.applyOptions.apply(d, [ a[i] ]), j[i] = d.x, k[i] = n ? this.toYData(d) :d.y, 
m[i] = d.z, h && d.name) && (h[i] = d.name);
for (this.requireSorting && j.length > 1 && j[1] < j[0] && qa(15), fa(k[0]) && qa(14, !0), 
this.data = [], this.options.data = a, this.xData = j, this.yData = k, this.zData = m, 
this.names = h, i = c && c.length || 0; i--; ) c[i] && c[i].destroy && c[i].destroy();
g && (g.minRange = g.userMinRange), this.isDirty = this.isDirtyData = e.isDirtyBox = !0, 
o(b, !0) && e.redraw(!1);
},
remove:function(a, b) {
var c = this, d = c.chart, a = o(a, !0);
c.isRemoving || (c.isRemoving = !0, D(c, "remove", null, function() {
c.destroy(), d.isDirtyLegend = d.isDirtyBox = !0, a && d.redraw(b);
})), c.isRemoving = !1;
},
processData:function(a) {
var g, h, b = this.xData, c = this.yData, d = b.length, e = 0, f = d, i = this.xAxis, j = this.options, k = j.cropThreshold, m = this.isCartesian;
if (m && !this.isDirty && !i.isDirty && !this.yAxis.isDirty && !a) return !1;
if (m && this.sorted && (!k || d > k || this.forceCrop)) if (a = i.getExtremes(), 
i = a.min, k = a.max, b[d - 1] < i || b[0] > k) b = [], c = []; else if (b[0] < i || b[d - 1] > k) {
for (a = 0; d > a; a++) if (b[a] >= i) {
e = q(0, a - 1);
break;
}
for (;d > a; a++) if (b[a] > k) {
f = a + 1;
break;
}
b = b.slice(e, f), c = c.slice(e, f), g = !0;
}
for (a = b.length - 1; a > 0; a--) d = b[a] - b[a - 1], d > 0 && (h === x || h > d) && (h = d);
this.cropped = g, this.cropStart = e, this.processedXData = b, this.processedYData = c, 
null === j.pointRange && (this.pointRange = h || 1), this.closestPointRange = h;
},
generatePoints:function() {
var c, i, k, l, a = this.options.data, b = this.data, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, j = this.hasGroupedData, m = [];
for (b || j || (b = [], b.length = a.length, b = this.data = b), l = 0; g > l; l++) i = h + l, 
j ? m[l] = new f().init(this, [ d[l] ].concat(ha(e[l]))) :(b[i] ? k = b[i] :a[i] !== x && (b[i] = k = new f().init(this, a[i], d[l])), 
m[l] = k);
if (b && (g !== (c = b.length) || j)) for (l = 0; c > l; l++) l === h && !j && (l += g), 
b[l] && (b[l].destroyElements(), b[l].plotX = x);
this.data = b, this.points = m;
},
translate:function() {
this.processedXData || this.processData(), this.generatePoints();
for (var i, a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, j = e.series, k = j.length, m = "between" === a.pointPlacement, a = a.threshold; k--; ) if (j[k].visible) {
j[k] === this && (i = !0);
break;
}
for (k = 0; g > k; k++) {
var j = f[k], l = j.x, p = j.y, n = j.low, q = e.stacks[(a > p ? "-" :"") + this.stackKey];
e.isLog && 0 >= p && (j.y = p = null), j.plotX = c.translate(l, 0, 0, 0, 1, m), 
b && this.visible && q && q[l] && (n = q[l], q = n.total, n.cum = n = n.cum - p, 
p = n + p, i && (n = o(a, e.min)), e.isLog && 0 >= n && (n = null), "percent" === b && (n = q ? 100 * n / q :0, 
p = q ? 100 * p / q :0), j.percentage = q ? 100 * j.y / q :0, j.total = j.stackTotal = q, 
j.stackY = p), j.yBottom = r(n) ? e.translate(n, 0, 1, 0, 1) :null, h && (p = this.modifyValue(p, j)), 
j.plotY = "number" == typeof p && 1/0 !== p ? t(10 * e.translate(p, 0, 1, 0, 1)) / 10 :x, 
j.clientX = m ? c.translate(l, 0, 0, 0, 1) :j.plotX, j.negative = j.y < (a || 0), 
j.category = d && d[j.x] !== x ? d[j.x] :j.x;
}
this.getSegments();
},
setTooltipPoints:function(a) {
var c, d, f, g, b = [], e = (c = this.xAxis) ? c.tooltipLen || c.len :this.chart.plotSizeX, h = [];
if (this.options.enableMouseTracking !== !1) {
for (a && (this.tooltipPoints = null), n(this.segments || this.points, function(a) {
b = b.concat(a);
}), c && c.reversed && (b = b.reverse()), a = b.length, g = 0; a > g; g++) for (f = b[g], 
c = b[g - 1] ? d + 1 :0, d = b[g + 1] ? q(0, T((f.clientX + (b[g + 1] ? b[g + 1].clientX :e)) / 2)) :e; c >= 0 && d >= c; ) h[c++] = f;
this.tooltipPoints = h;
}
},
tooltipHeaderFormatter:function(a) {
var g, b = this.tooltipOptions, c = b.xDateFormat, d = this.xAxis, e = d && "datetime" === d.options.type, f = b.headerFormat;
if (e && !c) for (g in E) if (E[g] >= d.closestPointRange) {
c = b.dateTimeLabelFormats[g];
break;
}
return e && c && Ca(a.key) && (f = f.replace("{point.key}", "{point.key:" + c + "}")), 
Ea(f, {
point:a,
series:this
});
},
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
animate:function(a) {
var e, b = this, c = b.chart, d = c.renderer;
e = b.options.animation;
var h, f = c.clipBox, g = c.inverted;
e && !V(e) && (e = X[b.type].animation), h = "_sharedClip" + e.duration + e.easing, 
a ? (a = c[h], e = c[h + "m"], a || (c[h] = a = d.clipRect(v(f, {
width:0
})), c[h + "m"] = e = d.clipRect(-99, g ? -c.plotLeft :-c.plotTop, 99, g ? c.chartWidth :c.chartHeight)), 
b.group.clip(a), b.markerGroup.clip(e), b.sharedClipKey = h) :((a = c[h]) && (a.animate({
width:c.plotSizeX
}, e), c[h + "m"].animate({
width:c.plotSizeX + 99
}, e)), b.animate = null, b.animationTimeout = setTimeout(function() {
b.afterAnimate();
}, e.duration));
},
afterAnimate:function() {
var a = this.chart, b = this.sharedClipKey, c = this.group;
c && this.options.clip !== !1 && (c.clip(a.clipRect), this.markerGroup.clip()), 
setTimeout(function() {
b && a[b] && (a[b] = a[b].destroy(), a[b + "m"] = a[b + "m"].destroy());
}, 100);
},
drawPoints:function() {
var a, d, e, f, g, h, i, j, k, l, b = this.points, c = this.chart, m = this.options.marker, n = this.markerGroup;
if (m.enabled || this._hasPointMarkers) for (f = b.length; f--; ) g = b[f], d = g.plotX, 
e = g.plotY, k = g.graphic, i = g.marker || {}, a = m.enabled && i.enabled === x || i.enabled, 
l = c.isInsidePlot(d, e, c.inverted), a && e !== x && !isNaN(e) && null !== g.y ? (a = g.pointAttr[g.selected ? "select" :""], 
h = a.r, i = o(i.symbol, this.symbol), j = 0 === i.indexOf("url"), k ? k.attr({
visibility:l ? Z ? "inherit" :"visible" :"hidden"
}).animate(v({
x:d - h,
y:e - h
}, k.symbolName ? {
width:2 * h,
height:2 * h
} :{})) :l && (h > 0 || j) && (g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h).attr(a).add(n))) :k && (g.graphic = k.destroy());
},
convertAttribs:function(a, b, c, d) {
var f, g, e = this.pointAttrToOptions, h = {}, a = a || {}, b = b || {}, c = c || {}, d = d || {};
for (f in e) g = e[f], h[f] = o(a[g], b[f], c[f], d[f]);
return h;
},
getAttribs:function() {
var f, k, p, a = this, b = a.options, c = X[a.type].marker ? b.marker :b, d = c.states, e = d.hover, g = a.color, h = {
stroke:g,
fill:g
}, i = a.points || [], j = [], m = a.pointAttrToOptions, l = b.negativeColor;
for (b.marker ? (e.radius = e.radius || c.radius + 2, e.lineWidth = e.lineWidth || c.lineWidth + 1) :e.color = e.color || ma(e.color || g).brighten(e.brightness).get(), 
j[""] = a.convertAttribs(c, h), n([ "hover", "select" ], function(b) {
j[b] = a.convertAttribs(d[b], j[""]);
}), a.pointAttr = j, g = i.length; g--; ) {
if (h = i[g], (c = h.options && h.options.marker || h.options) && c.enabled === !1 && (c.radius = 0), 
h.negative && l && (h.color = h.fillColor = l), f = b.colorByPoint || h.color, h.options) for (p in m) r(c[m[p]]) && (f = !0);
f ? (c = c || {}, k = [], d = c.states || {}, f = d.hover = d.hover || {}, b.marker || (f.color = ma(f.color || h.color).brighten(f.brightness || e.brightness).get()), 
k[""] = a.convertAttribs(v({
color:h.color
}, c), j[""]), k.hover = a.convertAttribs(d.hover, j.hover, k[""]), k.select = a.convertAttribs(d.select, j.select, k[""]), 
h.negative && b.marker && (k[""].fill = k.hover.fill = k.select.fill = a.convertAttribs({
fillColor:l
}).fill)) :k = j, h.pointAttr = k;
}
},
update:function(a, b) {
var c = this.chart, d = this.type, a = y(this.userOptions, {
animation:!1,
index:this.index,
pointStart:this.xData[0]
}, a);
this.remove(!1), v(this, aa[a.type || d].prototype), this.init(c, a), o(b, !0) && c.redraw(!1);
},
destroy:function() {
var d, e, g, h, i, a = this, b = a.chart, c = /AppleWebKit\/533/.test(ya), f = a.data || [];
for (D(a, "destroy"), ba(a), n([ "xAxis", "yAxis" ], function(b) {
(i = a[b]) && (ga(i.series, a), i.isDirty = i.forceRedraw = !0);
}), a.legendItem && a.chart.legend.destroyItem(a), e = f.length; e--; ) (g = f[e]) && g.destroy && g.destroy();
a.points = null, clearTimeout(a.animationTimeout), n("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function(b) {
a[b] && (d = c && "group" === b ? "hide" :"destroy", a[b][d]());
}), b.hoverSeries === a && (b.hoverSeries = null), ga(b.series, a);
for (h in a) delete a[h];
},
drawDataLabels:function() {
var d, e, f, g, a = this, b = a.options.dataLabels, c = a.points;
(b.enabled || a._hasPointLabels) && (a.dlProcessOptions && a.dlProcessOptions(b), 
g = a.plotGroup("dataLabelsGroup", "data-labels", a.visible ? "visible" :"hidden", b.zIndex || 6), 
e = b, n(c, function(c) {
var i, k, m, j = c.dataLabel, l = c.connector, n = !0;
if (d = c.options && c.options.dataLabels, i = e.enabled || d && d.enabled, j && !i) c.dataLabel = j.destroy(); else if (i) {
if (i = b.rotation, b = y(e, d), k = c.getLabelConfig(), f = b.format ? Ea(b.format, k) :b.formatter.call(k, b), 
b.style.color = o(b.color, b.style.color, a.color, "black"), j) r(f) ? (j.attr({
text:f
}), n = !1) :(c.dataLabel = j = j.destroy(), l && (c.connector = l.destroy())); else if (r(f)) {
j = {
fill:b.backgroundColor,
stroke:b.borderColor,
"stroke-width":b.borderWidth,
r:b.borderRadius || 0,
rotation:i,
padding:b.padding,
zIndex:1
};
for (m in j) j[m] === x && delete j[m];
j = c.dataLabel = a.chart.renderer[i ? "text" :"label"](f, 0, -999, null, null, null, b.useHTML).attr(j).css(b.style).add(g).shadow(b.shadow);
}
j && a.alignDataLabel(c, j, b, null, n);
}
}));
},
alignDataLabel:function(a, b, c, d, e) {
var f = this.chart, g = f.inverted, h = o(a.plotX, -999), a = o(a.plotY, -999), i = b.getBBox(), d = v({
x:g ? f.plotWidth - a :h,
y:t(g ? f.plotHeight - h :a),
width:0,
height:0
}, d);
v(c, {
width:i.width,
height:i.height
}), c.rotation ? (d = {
align:c.align,
x:d.x + c.x + d.width / 2,
y:d.y + c.y + d.height / 2
}, b[e ? "attr" :"animate"](d)) :b.align(c, null, d), b.attr({
visibility:c.crop === !1 || f.isInsidePlot(h, a, g) ? f.renderer.isSVG ? "inherit" :"visible" :"hidden"
});
},
getSegmentPath:function(a) {
var b = this, c = [], d = b.options.step;
return n(a, function(e, f) {
var i, g = e.plotX, h = e.plotY;
b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) :(c.push(f ? "L" :"M"), 
d && f && (i = a[f - 1], "right" === d ? c.push(i.plotX, h) :"center" === d ? c.push((i.plotX + g) / 2, i.plotY, (i.plotX + g) / 2, h) :c.push(g, i.plotY)), 
c.push(e.plotX, e.plotY));
}), c;
},
getGraphPath:function() {
var c, a = this, b = [], d = [];
return n(a.segments, function(e) {
c = a.getSegmentPath(e), e.length > 1 ? b = b.concat(c) :d.push(e[0]);
}), a.singlePoints = d, a.graphPath = b;
},
drawGraph:function() {
var a = this, b = this.options, c = [ [ "graph", b.lineColor || this.color ] ], d = b.lineWidth, e = b.dashStyle, f = this.getGraphPath(), g = b.negativeColor;
g && c.push([ "graphNeg", g ]), n(c, function(c, g) {
var j = c[0], k = a[j];
k ? (Ta(k), k.animate({
d:f
})) :d && f.length && (k = {
stroke:c[1],
"stroke-width":d,
zIndex:1
}, e && (k.dashstyle = e), a[j] = a.chart.renderer.path(f).attr(k).add(a.group).shadow(!g && b.shadow));
});
},
clipNeg:function() {
var e, a = this.options, b = this.chart, c = b.renderer, d = a.negativeColor, f = this.posClip, g = this.negClip;
e = b.chartWidth;
var h = b.chartHeight, i = q(e, h);
d && this.graph && (d = ja(this.yAxis.len - this.yAxis.translate(a.threshold || 0)), 
a = {
x:0,
y:0,
width:i,
height:d
}, i = {
x:0,
y:d,
width:i,
height:i - d
}, b.inverted && c.isVML && (a = {
x:b.plotWidth - d - b.plotLeft,
y:0,
width:e,
height:h
}, i = {
x:d + b.plotLeft - e,
y:0,
width:b.plotLeft + d,
height:e
}), this.yAxis.reversed ? (b = i, e = a) :(b = a, e = i), f ? (f.animate(b), g.animate(e)) :(this.posClip = f = c.clipRect(b), 
this.graph.clip(f), this.negClip = g = c.clipRect(e), this.graphNeg.clip(g), this.area && (this.area.clip(f), 
this.areaNeg.clip(g))));
},
invertGroups:function() {
function a() {
var a = {
width:b.yAxis.len,
height:b.xAxis.len
};
n([ "group", "markerGroup" ], function(c) {
b[c] && b[c].attr(a).invert();
});
}
var b = this, c = b.chart;
J(c, "resize", a), J(b, "destroy", function() {
ba(c, "resize", a);
}), a(), b.invertGroups = a;
},
plotGroup:function(a, b, c, d, e) {
var f = this[a], g = !f, h = this.chart, i = this.xAxis, j = this.yAxis;
return g && (this[a] = f = h.renderer.g(b).attr({
visibility:c,
zIndex:d || .1
}).add(e)), f[g ? "attr" :"animate"]({
translateX:i ? i.left :h.plotLeft,
translateY:j ? j.top :h.plotTop,
scaleX:1,
scaleY:1
}), f;
},
render:function() {
var b, a = this.chart, c = this.options, d = c.animation && !!this.animate && a.renderer.isSVG, e = this.visible ? "visible" :"hidden", f = c.zIndex, g = this.hasRendered, h = a.seriesGroup;
b = this.plotGroup("group", "series", e, f, h), this.markerGroup = this.plotGroup("markerGroup", "markers", e, f, h), 
d && this.animate(!0), this.getAttribs(), b.inverted = a.inverted, this.drawGraph && (this.drawGraph(), 
this.clipNeg()), this.drawDataLabels(), this.drawPoints(), this.options.enableMouseTracking !== !1 && this.drawTracker(), 
a.inverted && this.invertGroups(), c.clip !== !1 && !this.sharedClipKey && !g && b.clip(a.clipRect), 
d ? this.animate() :g || this.afterAnimate(), this.isDirty = this.isDirtyData = !1, 
this.hasRendered = !0;
},
redraw:function() {
var a = this.chart, b = this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
c && (a.inverted && c.attr({
width:a.plotWidth,
height:a.plotHeight
}), c.animate({
translateX:o(d && d.left, a.plotLeft),
translateY:o(e && e.top, a.plotTop)
})), this.translate(), this.setTooltipPoints(!0), this.render(), b && D(this, "updatedData");
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
f = (c.visible = a = c.userOptions.visible = a === x ? !h :a) ? "show" :"hide", 
n([ "group", "dataLabelsGroup", "markerGroup", "tracker" ], function(a) {
c[a] && c[a][f]();
}), d.hoverSeries === c && c.onMouseOut(), e && d.legend.colorizeItem(c, a), c.isDirty = !0, 
c.options.stacking && n(d.series, function(a) {
a.options.stacking && a.visible && (a.isDirty = !0);
}), n(c.linkedSeries, function(b) {
b.setVisible(a, !1);
}), g && (d.isDirtyBox = !0), b !== !1 && d.redraw(), D(c, f);
},
show:function() {
this.setVisible(!0);
},
hide:function() {
this.setVisible(!1);
},
select:function(a) {
this.selected = a = a === x ? !this.selected :a, this.checkbox && (this.checkbox.checked = a), 
D(this, a ? "select" :"unselect");
},
drawTracker:function() {
var l, a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath :a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, i = f.options.tooltip.snap, j = a.tracker, k = b.cursor, k = k && {
cursor:k
}, m = a.singlePoints, n = function() {
f.hoverSeries !== a && a.onMouseOver();
};
if (e && !c) for (l = e + 1; l--; ) "M" === d[l] && d.splice(l + 1, 0, d[l + 1] - i, d[l + 2], "L"), 
(l && "M" === d[l] || l === e) && d.splice(l, 0, "L", d[l - 2] + i, d[l - 1]);
for (l = 0; l < m.length; l++) e = m[l], d.push("M", e.plotX - i, e.plotY, "L", e.plotX + i, e.plotY);
j ? j.attr({
d:d
}) :(a.tracker = j = h.path(d).attr({
"class":"highcharts-tracker",
"stroke-linejoin":"round",
visibility:a.visible ? "visible" :"hidden",
stroke:Mb,
fill:c ? Mb :S,
"stroke-width":b.lineWidth + (c ? 0 :2 * i),
zIndex:2
}).addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(a) {
g.onTrackerMouseOut(a);
}).css(k).add(a.markerGroup), fb && j.on("touchstart", n));
}
}, M = ea(R), aa.line = M, X.area = y(W, {
threshold:0
}), M = ea(R, {
type:"area",
getSegments:function() {
var h, i, k, m, a = [], b = [], c = [], d = this.xAxis, e = this.yAxis, f = e.stacks[this.stackKey], g = {}, j = this.points;
if (this.options.stacking && !this.cropped) {
for (k = 0; k < j.length; k++) g[j[k].x] = j[k];
for (m in f) c.push(+m);
c.sort(function(a, b) {
return a - b;
}), n(c, function(a) {
g[a] ? b.push(g[a]) :(h = d.translate(a), i = e.toPixels(f[a].cum, !0), b.push({
y:null,
plotX:h,
clientX:h,
plotY:i,
yBottom:i,
onMouseOver:ta
}));
}), b.length && a.push(b);
} else R.prototype.getSegments.call(this), a = this.segments;
this.segments = a;
},
getSegmentPath:function(a) {
var d, b = R.prototype.getSegmentPath.call(this, a), c = [].concat(b), e = this.options;
if (3 === b.length && c.push("L", b[1], b[2]), e.stacking && !this.closedStacks) for (d = a.length - 1; d >= 0; d--) d < a.length - 1 && e.step && c.push(a[d + 1].plotX, a[d].yBottom), 
c.push(a[d].plotX, a[d].yBottom); else this.closeSegment(c, a);
return this.areaPath = this.areaPath.concat(c), b;
},
closeSegment:function(a, b) {
var c = this.yAxis.getThreshold(this.options.threshold);
a.push("L", b[b.length - 1].plotX, c, "L", b[0].plotX, c);
},
drawGraph:function() {
this.areaPath = [], R.prototype.drawGraph.apply(this);
var a = this, b = this.areaPath, c = this.options, d = [ [ "area", this.color, c.fillColor ] ];
c.negativeColor && d.push([ "areaNeg", c.negativeColor, c.negativeFillColor ]), 
n(d, function(d) {
var f = d[0], g = a[f];
g ? g.animate({
d:b
}) :a[f] = a.chart.renderer.path(b).attr({
fill:o(d[2], ma(d[1]).setOpacity(c.fillOpacity || .75).get()),
zIndex:0
}).add(a.group);
});
},
drawLegendSymbol:function(a, b) {
b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, a.options.symbolWidth, 12, 2).attr({
zIndex:3
}).add(b.legendGroup);
}
}), aa.area = M, X.spline = y(W), F = ea(R, {
type:"spline",
getPointSpline:function(a, b, c) {
var h, i, j, k, d = b.plotX, e = b.plotY, f = a[c - 1], g = a[c + 1];
if (f && g) {
a = f.plotY, j = g.plotX;
var m, g = g.plotY;
h = (1.5 * d + f.plotX) / 2.5, i = (1.5 * e + a) / 2.5, j = (1.5 * d + j) / 2.5, 
k = (1.5 * e + g) / 2.5, m = (k - i) * (j - d) / (j - h) + e - k, i += m, k += m, 
i > a && i > e ? (i = q(a, e), k = 2 * e - i) :a > i && e > i && (i = K(a, e), k = 2 * e - i), 
k > g && k > e ? (k = q(g, e), i = 2 * e - k) :g > k && e > k && (k = K(g, e), i = 2 * e - k), 
b.rightContX = j, b.rightContY = k;
}
return c ? (b = [ "C", f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, i || e, d, e ], 
f.rightContX = f.rightContY = null) :b = [ "M", d, e ], b;
}
}), aa.spline = F, X.areaspline = y(X.area), na = M.prototype, F = ea(F, {
type:"areaspline",
closedStacks:!0,
getSegmentPath:na.getSegmentPath,
closeSegment:na.closeSegment,
drawGraph:na.drawGraph
}), aa.areaspline = F, X.column = y(W, {
borderColor:"#FFFFFF",
borderWidth:1,
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
shadow:!1
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
threshold:0
}), F = ea(R, {
type:"column",
tooltipOutsidePlot:!0,
requireSorting:!1,
pointAttrToOptions:{
stroke:"borderColor",
"stroke-width":"borderWidth",
fill:"color",
r:"borderRadius"
},
trackerGroups:[ "group", "dataLabelsGroup" ],
init:function() {
R.prototype.init.apply(this, arguments);
var a = this, b = a.chart;
b.hasRendered && n(b.series, function(b) {
b.type === a.type && (b.isDirty = !0);
});
},
getColumnMetrics:function() {
var f, h, a = this, b = a.chart, c = a.options, d = this.xAxis, e = d.reversed, g = {}, i = 0;
c.grouping === !1 ? i = 1 :n(b.series, function(b) {
var c = b.options;
b.type === a.type && b.visible && a.options.group === c.group && (c.stacking ? (f = b.stackKey, 
g[f] === x && (g[f] = i++), h = g[f]) :c.grouping !== !1 && (h = i++), b.columnIndex = h);
});
var b = K(Q(d.transA) * (d.ordinalSlope || c.pointRange || d.closestPointRange || 1), d.len), d = b * c.groupPadding, j = (b - 2 * d) / i, k = c.pointWidth, c = r(k) ? (j - k) / 2 :j * c.pointPadding, k = o(k, j - 2 * c);
return a.columnMetrics = {
width:k,
offset:c + (d + ((e ? i - (a.columnIndex || 0) :a.columnIndex) || 0) * j - b / 2) * (e ? -1 :1)
};
},
translate:function() {
var a = this, b = a.chart, c = a.options, d = c.stacking, e = c.borderWidth, f = a.yAxis, g = a.translatedThreshold = f.getThreshold(c.threshold), h = o(c.minPointLength, 5), c = a.getColumnMetrics(), i = c.width, j = ja(q(i, 1 + 2 * e)), k = c.offset;
R.prototype.translate.apply(a), n(a.points, function(c) {
var l = K(q(-999, c.plotY), f.len + 999), n = o(c.yBottom, g), s = c.plotX + k, t = ja(K(l, n)), l = ja(q(l, n) - t), r = f.stacks[(c.y < 0 ? "-" :"") + a.stackKey];
d && a.visible && r && r[c.x] && r[c.x].setOffset(k, j), Q(l) < h && h && (l = h, 
t = Q(t - g) > h ? n - h :g - (f.translate(c.y, 0, 1, 0, 1) <= g ? h :0)), c.barX = s, 
c.pointWidth = i, c.shapeType = "rect", c.shapeArgs = c = b.renderer.Element.prototype.crisp.call(0, e, s, t, j, l), 
e % 2 && (c.y -= 1, c.height += 1);
});
},
getSymbol:ta,
drawLegendSymbol:M.prototype.drawLegendSymbol,
drawGraph:ta,
drawPoints:function() {
var d, a = this, b = a.options, c = a.chart.renderer;
n(a.points, function(e) {
var f = e.plotY, g = e.graphic;
f === x || isNaN(f) || null === e.y ? g && (e.graphic = g.destroy()) :(d = e.shapeArgs, 
g ? (Ta(g), g.animate(y(d))) :e.graphic = c[e.shapeType](d).attr(e.pointAttr[e.selected ? "select" :""]).add(a.group).shadow(b.shadow, null, b.stacking && !b.borderRadius));
});
},
drawTracker:function() {
var a = this, b = a.chart.pointer, c = a.options.cursor, d = c && {
cursor:c
}, e = function(b) {
var d, c = b.target;
for (a.onMouseOver(); c && !d; ) d = c.point, c = c.parentNode;
d !== x && d.onMouseOver(b);
};
n(a.points, function(a) {
a.graphic && (a.graphic.element.point = a), a.dataLabel && (a.dataLabel.element.point = a);
}), a._hasTracking ? a._hasTracking = !0 :n(a.trackerGroups, function(c) {
a[c] && (a[c].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function(a) {
b.onTrackerMouseOut(a);
}).css(d), fb) && a[c].on("touchstart", e);
});
},
alignDataLabel:function(a, b, c, d, e) {
var f = this.chart, g = f.inverted, h = a.dlBox || a.shapeArgs, i = a.below || a.plotY > o(this.translatedThreshold, f.plotSizeY), j = o(c.inside, !!this.options.stacking);
h && (d = y(h), g && (d = {
x:f.plotWidth - d.y - d.height,
y:f.plotHeight - d.x - d.width,
width:d.height,
height:d.width
}), !j) && (g ? (d.x += i ? 0 :d.width, d.width = 0) :(d.y += i ? d.height :0, d.height = 0)), 
c.align = o(c.align, !g || j ? "center" :i ? "right" :"left"), c.verticalAlign = o(c.verticalAlign, g || j ? "middle" :i ? "top" :"bottom"), 
R.prototype.alignDataLabel.call(this, a, b, c, d, e);
},
animate:function(a) {
var b = this.yAxis, c = this.options, d = this.chart.inverted, e = {};
Z && (a ? (e.scaleY = .001, a = K(b.pos + b.len, q(b.pos, b.toPixels(c.threshold))), 
d ? e.translateX = a - b.len :e.translateY = a, this.group.attr(e)) :(e.scaleY = 1, 
e[d ? "translateX" :"translateY"] = b.pos, this.group.animate(e, this.options.animation), 
this.animate = null));
},
remove:function() {
var a = this, b = a.chart;
b.hasRendered && n(b.series, function(b) {
b.type === a.type && (b.isDirty = !0);
}), R.prototype.remove.apply(a, arguments);
}
}), aa.column = F, X.bar = y(X.column), na = ea(F, {
type:"bar",
inverted:!0
}), aa.bar = na, X.scatter = y(W, {
lineWidth:0,
tooltip:{
headerFormat:'<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',
pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
followPointer:!0
},
stickyTracking:!1
}), na = ea(R, {
type:"scatter",
sorted:!1,
requireSorting:!1,
noSharedTooltip:!0,
trackerGroups:[ "markerGroup" ],
drawTracker:F.prototype.drawTracker,
setTooltipPoints:ta
}), aa.scatter = na, X.pie = y(W, {
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
}), W = {
type:"pie",
isCartesian:!1,
pointClass:ea(Ma, {
init:function() {
Ma.prototype.init.apply(this, arguments);
var b, a = this;
return a.y < 0 && (a.y = null), v(a, {
visible:a.visible !== !1,
name:o(a.name, "Slice")
}), b = function() {
a.slice();
}, J(a, "select", b), J(a, "unselect", b), a;
},
setVisible:function(a) {
var e, b = this, c = b.series, d = c.chart;
b.visible = b.options.visible = a = a === x ? !b.visible :a, c.options.data[la(b, c.data)] = b.options, 
e = a ? "show" :"hide", n([ "graphic", "dataLabel", "connector", "shadowGroup" ], function(a) {
b[a] && b[a][e]();
}), b.legendItem && d.legend.colorizeItem(b, a), !c.isDirty && c.options.ignoreHiddenPoint && (c.isDirty = !0, 
d.redraw());
},
slice:function(a, b, c) {
var d = this.series;
Ha(c, d.chart), o(b, !0), this.sliced = this.options.sliced = a = r(a) ? a :!this.sliced, 
d.options.data[la(this, d.data)] = this.options, a = a ? this.slicedTranslation :{
translateX:0,
translateY:0
}, this.graphic.animate(a), this.shadowGroup && this.shadowGroup.animate(a);
}
}),
requireSorting:!1,
noSharedTooltip:!0,
trackerGroups:[ "group", "dataLabelsGroup" ],
pointAttrToOptions:{
stroke:"borderColor",
"stroke-width":"borderWidth",
fill:"color"
},
getColor:ta,
animate:function(a) {
var b = this, c = b.points, d = b.startAngleRad;
a || (n(c, function(a) {
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
setData:function(a, b) {
R.prototype.setData.call(this, a, !1), this.processData(), this.generatePoints(), 
o(b, !0) && this.chart.redraw();
},
getCenter:function() {
var d, h, a = this.options, b = this.chart, c = 2 * (a.slicedOffset || 0), e = b.plotWidth - 2 * c, f = b.plotHeight - 2 * c, b = a.center, a = [ o(b[0], "50%"), o(b[1], "50%"), a.size || "100%", a.innerSize || 0 ], g = K(e, f);
return Ka(a, function(a, b) {
return h = /%$/.test(a), d = 2 > b || 2 === b && h, (h ? [ e, f, g, g ][b] * u(a) / 100 :a) + (d ? c :0);
});
},
translate:function(a) {
this.generatePoints();
var g, h, i, o, r, b = 0, c = 0, d = this.options, e = d.slicedOffset, f = e + d.borderWidth, j = this.startAngleRad = Ja / 180 * ((d.startAngle || 0) % 360 - 90), k = this.points, m = 2 * Ja, l = d.dataLabels.distance, n = d.ignoreHiddenPoint, q = k.length;
for (a || (this.center = a = this.getCenter()), this.getX = function(b, c) {
return i = I.asin((b - a[1]) / (a[2] / 2 + l)), a[0] + (c ? -1 :1) * Y(i) * (a[2] / 2 + l);
}, o = 0; q > o; o++) r = k[o], b += n && !r.visible ? 0 :r.y;
for (o = 0; q > o; o++) r = k[o], d = b ? r.y / b :0, g = t(1e3 * (j + c * m)) / 1e3, 
(!n || r.visible) && (c += d), h = t(1e3 * (j + c * m)) / 1e3, r.shapeType = "arc", 
r.shapeArgs = {
x:a[0],
y:a[1],
r:a[2] / 2,
innerR:a[3] / 2,
start:g,
end:h
}, i = (h + g) / 2, i > .75 * m && (i -= 2 * Ja), r.slicedTranslation = {
translateX:t(Y(i) * e),
translateY:t(ca(i) * e)
}, g = Y(i) * a[2] / 2, h = ca(i) * a[2] / 2, r.tooltipPos = [ a[0] + .7 * g, a[1] + .7 * h ], 
r.half = m / 4 > i ? 0 :1, r.angle = i, f = K(f, l / 2), r.labelPos = [ a[0] + g + Y(i) * l, a[1] + h + ca(i) * l, a[0] + g + Y(i) * f, a[1] + h + ca(i) * f, a[0] + g, a[1] + h, 0 > l ? "center" :r.half ? "right" :"left", i ], 
r.percentage = 100 * d, r.total = b;
this.setTooltipPoints();
},
drawGraph:null,
drawPoints:function() {
var c, d, f, g, a = this, b = a.chart.renderer, e = a.options.shadow;
e && !a.shadowGroup && (a.shadowGroup = b.g("shadow").add(a.group)), n(a.points, function(h) {
d = h.graphic, g = h.shapeArgs, f = h.shadowGroup, e && !f && (f = h.shadowGroup = b.g("shadow").add(a.shadowGroup)), 
c = h.sliced ? h.slicedTranslation :{
translateX:0,
translateY:0
}, f && f.attr(c), d ? d.animate(v(g, c)) :h.graphic = d = b.arc(g).setRadialReference(a.center).attr(h.pointAttr[h.selected ? "select" :""]).attr({
"stroke-linejoin":"round"
}).attr(c).add(a.group).shadow(e, f), h.visible === !1 && h.setVisible(!1);
});
},
drawDataLabels:function() {
var c, i, j, v, w, u, x, A, z, E, H, C, a = this, b = a.data, d = a.chart, e = a.options.dataLabels, f = o(e.connectorPadding, 10), g = o(e.connectorWidth, 1), h = d.plotWidth, d = d.plotHeight, k = o(e.softConnector, !0), m = e.distance, l = a.center, p = l[2] / 2, s = l[1], r = m > 0, y = [ [], [] ], D = [ 0, 0, 0, 0 ], K = function(a, b) {
return b.y - a.y;
}, M = function(a, b) {
a.sort(function(a, c) {
return void 0 !== a.angle && (c.angle - a.angle) * b;
});
};
if (e.enabled || a._hasPointLabels) {
for (R.prototype.drawDataLabels.apply(a), n(b, function(a) {
a.dataLabel && y[a.half].push(a);
}), H = 0; !x && b[H]; ) x = b[H] && b[H].dataLabel && (b[H].dataLabel.getBBox().height || 21), 
H++;
for (H = 2; H--; ) {
var F, b = [], L = [], I = y[H], J = I.length;
if (M(I, H - .5), m > 0) {
for (C = s - p - m; s + p + m >= C; C += x) b.push(C);
if (w = b.length, J > w) {
for (c = [].concat(I), c.sort(K), C = J; C--; ) c[C].rank = C;
for (C = J; C--; ) I[C].rank >= w && I.splice(C, 1);
J = I.length;
}
for (C = 0; J > C; C++) {
c = I[C], u = c.labelPos, c = 9999;
var O, N;
for (N = 0; w > N; N++) O = Q(b[N] - u[1]), c > O && (c = O, F = N);
if (C > F && null !== b[C]) F = C; else for (J - C + F > w && null !== b[C] && (F = w - J + C); null === b[F]; ) F++;
L.push({
i:F,
y:b[F]
}), b[F] = null;
}
L.sort(K);
}
for (C = 0; J > C; C++) c = I[C], u = c.labelPos, v = c.dataLabel, E = c.visible === !1 ? "hidden" :"visible", 
c = u[1], m > 0 ? (w = L.pop(), F = w.i, z = w.y, (c > z && null !== b[F + 1] || z > c && null !== b[F - 1]) && (z = c)) :z = c, 
A = e.justify ? l[0] + (H ? -1 :1) * (p + m) :a.getX(0 === F || F === b.length - 1 ? c :z, H), 
v._attr = {
visibility:E,
align:u[6]
}, v._pos = {
x:A + e.x + ({
left:f,
right:-f
}[u[6]] || 0),
y:z + e.y - 10
}, v.connX = A, v.connY = z, null === this.options.size && (w = v.width, f > A - w ? D[3] = q(t(w - A + f), D[3]) :A + w > h - f && (D[1] = q(t(A + w - h + f), D[1])), 
0 > z - x / 2 ? D[0] = q(t(-z + x / 2), D[0]) :z + x / 2 > d && (D[2] = q(t(z + x / 2 - d), D[2])));
}
(0 === pa(D) || this.verifyDataLabelOverflow(D)) && (this.placeDataLabels(), r && g && n(this.points, function(b) {
i = b.connector, u = b.labelPos, (v = b.dataLabel) && v._pos ? (A = v.connX, z = v.connY, 
j = k ? [ "M", A + ("left" === u[6] ? 5 :-5), z, "C", A, z, 2 * u[2] - u[4], 2 * u[3] - u[5], u[2], u[3], "L", u[4], u[5] ] :[ "M", A + ("left" === u[6] ? 5 :-5), z, "L", u[2], u[3], "L", u[4], u[5] ], 
i ? (i.animate({
d:j
}), i.attr("visibility", E)) :b.connector = i = a.chart.renderer.path(j).attr({
"stroke-width":g,
stroke:e.connectorColor || b.color || "#606060",
visibility:E
}).add(a.group)) :i && (b.connector = i.destroy());
}));
}
},
verifyDataLabelOverflow:function(a) {
var f, b = this.center, c = this.options, d = c.center, e = c = c.minSize || 80;
return null !== d[0] ? e = q(b[2] - q(a[1], a[3]), c) :(e = q(b[2] - a[1] - a[3], c), 
b[0] += (a[3] - a[1]) / 2), null !== d[1] ? e = q(K(e, b[2] - q(a[0], a[2])), c) :(e = q(K(e, b[2] - a[0] - a[2]), c), 
b[1] += (a[0] - a[2]) / 2), e < b[2] ? (b[2] = e, this.translate(b), n(this.points, function(a) {
a.dataLabel && (a.dataLabel._pos = null);
}), this.drawDataLabels()) :f = !0, f;
},
placeDataLabels:function() {
n(this.points, function(a) {
var b, a = a.dataLabel;
a && ((b = a._pos) ? (a.attr(a._attr), a[a.moved ? "animate" :"attr"](b), a.moved = !0) :a && a.attr({
y:-999
}));
});
},
alignDataLabel:ta,
drawTracker:F.prototype.drawTracker,
drawLegendSymbol:M.prototype.drawLegendSymbol,
getSymbol:ta
}, W = ea(R, W), aa.pie = W, v(Highcharts, {
Axis:ab,
Chart:sb,
Color:ma,
Legend:rb,
Pointer:qb,
Point:Ma,
Tick:Ia,
Tooltip:pb,
Renderer:Sa,
Series:R,
SVGElement:ra,
SVGRenderer:Aa,
arrayMin:Fa,
arrayMax:pa,
charts:za,
dateFormat:Ua,
format:Ea,
pathAnim:ub,
getOptions:function() {
return N;
},
hasBidiBug:Rb,
isTouchDevice:Kb,
numberFormat:Na,
seriesTypes:aa,
setOptions:function(a) {
return N = y(N, a), Hb(), N;
},
addEvent:J,
removeEvent:ba,
createElement:U,
discardElement:Ra,
css:L,
each:n,
extend:v,
map:Ka,
merge:y,
pick:o,
splat:ha,
extendClass:ea,
pInt:u,
wrap:function(a, b, c) {
var d = a[b];
a[b] = function() {
var a = Array.prototype.slice.call(arguments);
return a.unshift(d), c.apply(this, a);
};
},
svg:Z,
canvas:$,
vml:!Z && !$,
product:"Highcharts",
version:"3.0.1"
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
jQuery(function() {
var HR, initDataTablePercentSort, _base, _ref;
return initDataTablePercentSort = function() {
return jQuery.fn.dataTableExt.oSort["x-percent-asc"] = function(a, b) {
return a - b;
}, jQuery.fn.dataTableExt.oSort["x-percent-pre"] = function(a) {
var x;
return x = "N/A" === a ? -1e5 :a.replace(/%/, ""), parseInt(x, 10);
}, jQuery.fn.dataTableExt.oSort["x-percent-desc"] = function(a, b) {
return b - a;
};
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.util || (HR.util = {}), (_base = HR.util).admin || (_base.admin = {}), 
window.HR || (window.HR = HR), HR.util.admin.initDataTablePercentSort = initDataTablePercentSort;
});
}.call(this), function() {
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