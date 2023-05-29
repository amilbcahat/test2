/*
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
!function() {
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
}();