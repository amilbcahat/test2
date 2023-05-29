var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("vb",function(e,n){function t(e){return new RegExp("^(("+e.join(")|(")+"))\\b","i")}function r(e,n){n.currentIndent++}function i(e,n){n.currentIndent--}function o(e,n){if(e.eatSpace())return null;var t=e.peek();if("'"===t)return e.skipToEnd(),"comment";if(e.match(/^((&H)|(&O))?[0-9\.a-f]/i,!1)){var o=!1;if(e.match(/^\d*\.\d+F?/i)?o=!0:e.match(/^\d+\.\d*F?/)?o=!0:e.match(/^\.\d+F?/)&&(o=!0),o)return e.eat(/J/i),"number";var c=!1;if(e.match(/^&H[0-9a-f]+/i)?c=!0:e.match(/^&O[0-7]+/i)?c=!0:e.match(/^[1-9]\d*F?/)?(e.eat(/J/i),c=!0):e.match(/^0(?![\dx])/i)&&(c=!0),c)return e.eat(/L/i),"number"}return e.match(I)?(n.tokenize=a(e.current()),n.tokenize(e,n)):e.match(h)||e.match(m)?null:e.match(l)||e.match(d)||e.match(x)?"operator":e.match(f)?null:e.match(R)?(r(e,n),n.doInCurrentLine=!0,"keyword"):e.match(E)?(n.doInCurrentLine?n.doInCurrentLine=!1:r(e,n),"keyword"):e.match(L)?"keyword":e.match(C)?(i(e,n),i(e,n),"keyword"):e.match(z)?(i(e,n),"keyword"):e.match(y)?"keyword":e.match(w)?"keyword":e.match(s)?"variable":(e.next(),u)}function a(e){var t=1==e.length,r="string";return function(i,a){for(;!i.eol();){if(i.eatWhile(/[^'"]/),i.match(e))return a.tokenize=o,r;i.eat(/['"]/)}if(t){if(n.singleLineStringErrors)return u;a.tokenize=o}return r}}function c(e,n){var t=n.tokenize(e,n),o=e.current();if("."===o)return t=n.tokenize(e,n),o=e.current(),"variable"===t?"variable":u;var a="[({".indexOf(o);return-1!==a&&r(e,n),"dedent"===F&&i(e,n)?u:(a="])}".indexOf(o),-1!==a&&i(e,n)?u:t)}var u="error",d=new RegExp("^[\\+\\-\\*/%&\\\\|\\^~<>!]"),f=new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"),l=new RegExp("^((==)|(<>)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"),m=new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"),h=new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"),s=new RegExp("^[_A-Za-z][_A-Za-z0-9]*"),p=["class","module","sub","enum","select","while","if","function","get","set","property","try"],b=["else","elseif","case","catch"],k=["next","loop"],x=t(["and","or","not","xor","in"]),g=["as","dim","break","continue","optional","then","until","goto","byval","byref","new","handles","property","return","const","private","protected","friend","public","shared","static","true","false"],v=["integer","string","double","decimal","boolean","short","char","float","single"],w=t(g),y=t(v),I='"',E=t(p),L=t(b),z=t(k),C=t(["end"]),R=t(["do"]),F=null,M={electricChars:"dDpPtTfFeE ",startState:function(){return{tokenize:o,lastToken:null,currentIndent:0,nextLineIndent:0,doInCurrentLine:!1}},token:function(e,n){e.sol()&&(n.currentIndent+=n.nextLineIndent,n.nextLineIndent=0,n.doInCurrentLine=0);var t=c(e,n);return n.lastToken={style:t,content:e.current()},t},indent:function(n,t){var r=t.replace(/^\s+|\s+$/g,"");return r.match(z)||r.match(C)||r.match(L)?e.indentUnit*(n.currentIndent-1):n.currentIndent<0?0:n.currentIndent*e.indentUnit}};return M}),e.defineMIME("text/x-vb","vb")});
//# sourceMappingURL=vb-d8e970ef48664f06474ae71ce36e7a9f.js.map
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 