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
(function(){function r(){var a=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),a=!0,window.localStorage.removeItem("_tmptest")}catch(b){}if(a)try{window.localStorage&&(e=window.localStorage,h="localStorage",k=e.jStorage_update)}catch(c){}else if("globalStorage"in window)try{window.globalStorage&&(e=window.globalStorage[window.location.hostname],h="globalStorage",k=e.jStorage_update)}catch(d){}else{f=document.createElement("link");if(!f.addBehavior){f=null;return}f.style.behavior="url(#default#userData)",document.getElementsByTagName("head")[0].appendChild(f);try{f.load("jStorage")}catch(g){f.setAttribute("jStorage","{}"),f.save("jStorage"),f.load("jStorage")}var i="{}";try{i=f.getAttribute("jStorage")}catch(j){}try{k=f.getAttribute("jStorage_update")}catch(l){}e.jStorage=i,h="userDataBehavior"}z(),C(),s("local"),s("session"),u(),D(),"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&v()},!1)}function s(a,e){function m(){if(a!="session")return;try{k=c.parse(window.name||"{}")}catch(b){k={}}}function n(){if(a!="session")return;window.name=c.stringify(k)}var f=!1,g=0,i,j,k={},l=Math.random();if(!e&&typeof window[a+"Storage"]!="undefined")return;if(a=="local"&&window.globalStorage){localStorage=window.globalStorage[window.location.hostname];return}if(h!="userDataBehavior")return;e&&window[a+"Storage"]&&window[a+"Storage"].parentNode&&window[a+"Storage"].parentNode.removeChild(window[a+"Storage"]),j=document.createElement("button"),document.getElementsByTagName("head")[0].appendChild(j),a=="local"?k=d:a=="session"&&m();for(i in k)k.hasOwnProperty(i)&&i!="__jstorage_meta"&&i!="length"&&typeof k[i]!="undefined"&&(i in j||g++,j[i]=k[i]);j.length=g,j.key=function(a){var b=0,c;m();for(c in k)if(k.hasOwnProperty(c)&&c!="__jstorage_meta"&&c!="length"&&typeof k[c]!="undefined"){if(b==a)return c;b++}},j.getItem=function(c){return m(),a=="session"?k[c]:b.jStorage.get(c)},j.setItem=function(a,b){if(typeof b=="undefined")return;j[a]=(b||"").toString()},j.removeItem=function(c){if(a=="local")return b.jStorage.deleteKey(c);j[c]=undefined,f=!0,c in j&&j.removeAttribute(c),f=!1},j.clear=function(){if(a=="session"){window.name="",s("session",!0);return}b.jStorage.flush()},a=="local"&&(q=function(a,b){if(a=="length")return;f=!0,typeof b=="undefined"?a in j&&(g--,j.removeAttribute(a)):(a in j||g++,j[a]=(b||"").toString()),j.length=g,f=!1}),j.attachEvent("onpropertychange",function(c){if(c.propertyName=="length")return;if(f||c.propertyName=="length")return;if(a=="local")!(c.propertyName in k)&&typeof j[c.propertyName]!="undefined"&&g++;else if(a=="session"){m(),typeof j[c.propertyName]=="undefined"||c.propertyName in k?typeof j[c.propertyName]=="undefined"&&c.propertyName in k?(delete k[c.propertyName],g--):k[c.propertyName]=j[c.propertyName]:(k[c.propertyName]=j[c.propertyName],g++),n(),j.length=g;return}b.jStorage.set(c.propertyName,j[c.propertyName]),j.length=g}),window[a+"Storage"]=j}function t(){var a="{}";if(h=="userDataBehavior"){f.load("jStorage");try{a=f.getAttribute("jStorage")}catch(b){}try{k=f.getAttribute("jStorage_update")}catch(c){}e.jStorage=a}z(),C(),D()}function u(){h=="localStorage"||h=="globalStorage"?"addEventListener"in window?window.addEventListener("storage",v,!1):document.attachEvent("onstorage",v):h=="userDataBehavior"&&setInterval(v,1e3)}function v(){var a;clearTimeout(j),j=setTimeout(function(){if(h=="localStorage"||h=="globalStorage")a=e.jStorage_update;else if(h=="userDataBehavior"){f.load("jStorage");try{a=f.getAttribute("jStorage_update")}catch(b){}}a&&a!=k&&(k=a,w())},25)}function w(){var a=c.parse(c.stringify(d.__jstorage_meta.CRC32)),b;t(),b=c.parse(c.stringify(d.__jstorage_meta.CRC32));var e,f=[],g=[];for(e in a)if(a.hasOwnProperty(e)){if(!b[e]){g.push(e);continue}a[e]!=b[e]&&f.push(e)}for(e in b)b.hasOwnProperty(e)&&(a[e]||f.push(e));x(f,"updated"),x(g,"deleted")}function x(a,b){a=[].concat(a||[]);if(b=="flushed"){a=[];for(var c in i)i.hasOwnProperty(c)&&a.push(c);b="deleted"}for(var d=0,e=a.length;d<e;d++)if(i[a[d]])for(var f=0,g=i[a[d]].length;f<g;f++)i[a[d]][f](a[d],b)}function y(){var a=(+(new Date)).toString();h=="localStorage"||h=="globalStorage"?e.jStorage_update=a:h=="userDataBehavior"&&(f.setAttribute("jStorage_update",a),f.save("jStorage")),v()}function z(){if(e.jStorage)try{d=c.parse(String(e.jStorage))}catch(a){e.jStorage="{}"}else e.jStorage="{}";g=e.jStorage?String(e.jStorage).length:0,d.__jstorage_meta||(d.__jstorage_meta={}),d.__jstorage_meta.CRC32||(d.__jstorage_meta.CRC32={})}function A(){F();try{e.jStorage=c.stringify(d),f&&(f.setAttribute("jStorage",e.jStorage),f.save("jStorage")),g=e.jStorage?String(e.jStorage).length:0}catch(a){}}function B(a){if(!a||typeof a!="string"&&typeof a!="number")throw new TypeError("Key name must be string or numeric");if(a=="__jstorage_meta")throw new TypeError("Reserved key name");return!0}function C(){var a,b,c,e,f=Infinity,g=!1,h=[];clearTimeout(n);if(!d.__jstorage_meta||typeof d.__jstorage_meta.TTL!="object")return;a=+(new Date),c=d.__jstorage_meta.TTL,e=d.__jstorage_meta.CRC32;for(b in c)c.hasOwnProperty(b)&&(c[b]<=a?(delete c[b],delete e[b],delete d[b],g=!0,h.push(b)):c[b]<f&&(f=c[b]));f!=Infinity&&(n=setTimeout(C,f-a)),g&&(A(),y(),x(h,"deleted"))}function D(){if(!d.__jstorage_meta.PubSub)return;var a,b=m;for(var c=len=d.__jstorage_meta.PubSub.length-1;c>=0;c--)a=d.__jstorage_meta.PubSub[c],a[0]>m&&(b=a[0],E(a[1],a[2]));m=b}function E(a,b){if(l[a])for(var d=0,e=l[a].length;d<e;d++)l[a][d](a,c.parse(c.stringify(b)))}function F(){if(!d.__jstorage_meta.PubSub)return;var a=+(new Date)-2e3;for(var b=0,c=d.__jstorage_meta.PubSub.length;b<c;b++)if(d.__jstorage_meta.PubSub[b][0]<=a){d.__jstorage_meta.PubSub.splice(b,d.__jstorage_meta.PubSub.length-b);break}d.__jstorage_meta.PubSub.length||delete d.__jstorage_meta.PubSub}function G(a,b){d.__jstorage_meta||(d.__jstorage_meta={}),d.__jstorage_meta.PubSub||(d.__jstorage_meta.PubSub=[]),d.__jstorage_meta.PubSub.unshift([+(new Date),a,b]),A(),y()}function H(a,b){b=b||0;var c=0,d=0;b=b^-1;for(var e=0,f=a.length;e<f;e++)c=(b^a.charCodeAt(e))&255,d="0x"+o.substr(c*9,8),b=b>>>8^d;return b^-1}var a="0.3.0",b=window.jQuery||window.$||(window.$={}),c={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(a){return String(a).evalJSON()}||b.parseJSON||b.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||b.toJSON};if(!c.parse||!c.stringify)throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");var d={},e={jStorage:"{}"},f=null,g=0,h=!1,i={},j=!1,k=0,l={},m=+(new Date),n,o="00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D",p={isXML:function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");return b.async="false",b.loadXML(a),b},c;return b?(c=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml"),this.isXML(c)?c:!1):!1}},q=function(){};b.jStorage={version:a,set:function(a,b,e){B(a),e=e||{};if(typeof b=="undefined")return this.deleteKey(a),b;if(p.isXML(b))b={_is_xml:!0,xml:p.encode(b)};else{if(typeof b=="function")return undefined;b&&typeof b=="object"&&(b=c.parse(c.stringify(b)))}return d[a]=b,d.__jstorage_meta.CRC32[a]=H(c.stringify(b)),this.setTTL(a,e.TTL||0),q(a,b),x(a,"updated"),b},get:function(a,b){return B(a),a in d?d[a]&&typeof d[a]=="object"&&d[a]._is_xml&&d[a]._is_xml?p.decode(d[a].xml):d[a]:typeof b=="undefined"?null:b},deleteKey:function(a){return B(a),a in d?(delete d[a],typeof d.__jstorage_meta.TTL=="object"&&a in d.__jstorage_meta.TTL&&delete d.__jstorage_meta.TTL[a],delete d.__jstorage_meta.CRC32[a],q(a,undefined),A(),y(),x(a,"deleted"),!0):!1},setTTL:function(a,b){var c=+(new Date);return B(a),b=Number(b)||0,a in d?(d.__jstorage_meta.TTL||(d.__jstorage_meta.TTL={}),b>0?d.__jstorage_meta.TTL[a]=c+b:delete d.__jstorage_meta.TTL[a],A(),C(),y(),!0):!1},getTTL:function(a){var b=+(new Date),c;return B(a),a in d&&d.__jstorage_meta.TTL&&d.__jstorage_meta.TTL[a]?(c=d.__jstorage_meta.TTL[a]-b,c||0):0},flush:function(){return d={__jstorage_meta:{CRC32:{}}},s("local",!0),A(),y(),x(null,"flushed"),!0},storageObj:function(){function a(){}return a.prototype=d,new a},index:function(){var a=[],b;for(b in d)d.hasOwnProperty(b)&&b!="__jstorage_meta"&&a.push(b);return a},storageSize:function(){return g},currentBackend:function(){return h},storageAvailable:function(){return!!h},listenKeyChange:function(a,b){B(a),i[a]||(i[a]=[]),i[a].push(b)},stopListening:function(a,b){B(a);if(!i[a])return;if(!b){delete i[a];return}for(var c=i[a].length-1;c>=0;c--)i[a][c]==b&&i[a].splice(c,1)},subscribe:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");l[a]||(l[a]=[]),l[a].push(b)},publish:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");G(a,b)},reInit:function(){t()}},r()})()