// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// Known Issues:
//
// * Patterns are not implemented.
// * Radial gradient are not implemented. The VML version of these look very
//   different from the canvas one.
// * Clipping paths are not implemented.
// * Coordsize. The width and height attribute have higher priority than the
//   width and height style values which isn't correct.
// * Painting mode isn't implemented.
// * Canvas width/height should is using content-box by default. IE in
//   Quirks mode will draw the canvas using border-box. Either change your
//   doctype to HTML5
//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
//   or use Box Sizing Behavior from WebFX
//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
// * Non uniform scaling does not correctly scale strokes.
// * Optimize. There is always room for speed improvements.
// Only add this code if we do not already have a canvas implementation
document.createElement("canvas").getContext||function(){function i(){return this.context_||(this.context_=new w(this))}function k(a,b,c){var d=j.call(arguments,2);return function(){return a.apply(b,d.concat(j.call(arguments)))}}function m(a){var b=a.srcElement;switch(a.propertyName){case"width":b.style.width=b.attributes.width.nodeValue+"px",b.getContext().clearRect();break;case"height":b.style.height=b.attributes.height.nodeValue+"px",b.getContext().clearRect()}}function n(a){var b=a.srcElement;b.firstChild&&(b.firstChild.style.width=b.clientWidth+"px",b.firstChild.style.height=b.clientHeight+"px")}function r(){return[[1,0,0],[0,1,0],[0,0,1]]}function s(a,b){var c=r();for(var d=0;d<3;d++)for(var e=0;e<3;e++){var f=0;for(var g=0;g<3;g++)f+=a[d][g]*b[g][e];c[d][e]=f}return c}function t(a,b){b.fillStyle=a.fillStyle,b.lineCap=a.lineCap,b.lineJoin=a.lineJoin,b.lineWidth=a.lineWidth,b.miterLimit=a.miterLimit,b.shadowBlur=a.shadowBlur,b.shadowColor=a.shadowColor,b.shadowOffsetX=a.shadowOffsetX,b.shadowOffsetY=a.shadowOffsetY,b.strokeStyle=a.strokeStyle,b.globalAlpha=a.globalAlpha,b.arcScaleX_=a.arcScaleX_,b.arcScaleY_=a.arcScaleY_,b.lineScale_=a.lineScale_}function u(a){var b,c=1;a=String(a);if(a.substring(0,3)=="rgb"){var d=a.indexOf("(",3),e=a.indexOf(")",d+1),f=a.substring(d+1,e).split(",");b="#";for(var g=0;g<3;g++)b+=o[Number(f[g])];f.length==4&&a.substr(3,1)=="a"&&(c=f[3])}else b=a;return{color:b,alpha:c}}function v(a){switch(a){case"butt":return"flat";case"round":return"round";case"square":default:return"square"}}function w(a){this.m_=r(),this.mStack_=[],this.aStack_=[],this.currentPath_=[],this.strokeStyle="#000",this.fillStyle="#000",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this.miterLimit=g*1,this.globalAlpha=1,this.canvas=a;var b=a.ownerDocument.createElement("div");b.style.width=a.clientWidth+"px",b.style.height=a.clientHeight+"px",b.style.overflow="hidden",b.style.position="absolute",a.appendChild(b),this.element_=b,this.arcScaleX_=1,this.arcScaleY_=1,this.lineScale_=1}function y(a,b,c,d){a.currentPath_.push({type:"bezierCurveTo",cp1x:b.x,cp1y:b.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y}),a.currentX_=d.x,a.currentY_=d.y}function z(a){for(var b=0;b<3;b++)for(var c=0;c<2;c++)if(!isFinite(a[b][c])||isNaN(a[b][c]))return!1;return!0}function A(a,b,c){if(!z(b))return;a.m_=b;if(c){var d=b[0][0]*b[1][1]-b[0][1]*b[1][0];a.lineScale_=f(e(d))}}function B(a){this.type_=a,this.x0_=0,this.y0_=0,this.r0_=0,this.x1_=0,this.y1_=0,this.r1_=0,this.colors_=[]}function C(){}var a=Math,b=a.round,c=a.sin,d=a.cos,e=a.abs,f=a.sqrt,g=10,h=g/2,j=Array.prototype.slice,l={init:function(a){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var b=a||document;b.createElement("canvas"),b.attachEvent("onreadystatechange",k(this.init_,this,b))}},init_:function(a){a.namespaces.g_vml_||a.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML"),a.namespaces.g_o_||a.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!a.styleSheets.ex_canvas_){var b=a.createStyleSheet();b.owningElement.id="ex_canvas_",b.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}var c=a.getElementsByTagName("canvas");for(var d=0;d<c.length;d++)this.initElement(c[d])},initElement:function(a){if(!a.getContext){a.getContext=i,a.innerHTML="",a.attachEvent("onpropertychange",m),a.attachEvent("onresize",n);var b=a.attributes;b.width&&b.width.specified?a.style.width=b.width.nodeValue+"px":a.width=a.clientWidth,b.height&&b.height.specified?a.style.height=b.height.nodeValue+"px":a.height=a.clientHeight}return a}};l.init();var o=[];for(var p=0;p<16;p++)for(var q=0;q<16;q++)o[p*16+q]=p.toString(16)+q.toString(16);var x=w.prototype;x.clearRect=function(){this.element_.innerHTML=""},x.beginPath=function(){this.currentPath_=[]},x.moveTo=function(a,b){var c=this.getCoords_(a,b);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y}),this.currentX_=c.x,this.currentY_=c.y},x.lineTo=function(a,b){var c=this.getCoords_(a,b);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y}),this.currentX_=c.x,this.currentY_=c.y},x.bezierCurveTo=function(a,b,c,d,e,f){var g=this.getCoords_(e,f),h=this.getCoords_(a,b),i=this.getCoords_(c,d);y(this,h,i,g)},x.quadraticCurveTo=function(a,b,c,d){var e=this.getCoords_(a,b),f=this.getCoords_(c,d),g={x:this.currentX_+2/3*(e.x-this.currentX_),y:this.currentY_+2/3*(e.y-this.currentY_)},h={x:g.x+(f.x-this.currentX_)/3,y:g.y+(f.y-this.currentY_)/3};y(this,g,h,f)},x.arc=function(a,b,e,f,i,j){e*=g;var k=j?"at":"wa",l=a+d(f)*e-h,m=b+c(f)*e-h,n=a+d(i)*e-h,o=b+c(i)*e-h;l==n&&!j&&(l+=.125);var p=this.getCoords_(a,b),q=this.getCoords_(l,m),r=this.getCoords_(n,o);this.currentPath_.push({type:k,x:p.x,y:p.y,radius:e,xStart:q.x,yStart:q.y,xEnd:r.x,yEnd:r.y})},x.rect=function(a,b,c,d){this.moveTo(a,b),this.lineTo(a+c,b),this.lineTo(a+c,b+d),this.lineTo(a,b+d),this.closePath()},x.strokeRect=function(a,b,c,d){var e=this.currentPath_;this.beginPath(),this.moveTo(a,b),this.lineTo(a+c,b),this.lineTo(a+c,b+d),this.lineTo(a,b+d),this.closePath(),this.stroke(),this.currentPath_=e},x.fillRect=function(a,b,c,d){var e=this.currentPath_;this.beginPath(),this.moveTo(a,b),this.lineTo(a+c,b),this.lineTo(a+c,b+d),this.lineTo(a,b+d),this.closePath(),this.fill(),this.currentPath_=e},x.createLinearGradient=function(a,b,c,d){var e=new B("gradient");return e.x0_=a,e.y0_=b,e.x1_=c,e.y1_=d,e},x.createRadialGradient=function(a,b,c,d,e,f){var g=new B("gradientradial");return g.x0_=a,g.y0_=b,g.r0_=c,g.x1_=d,g.y1_=e,g.r1_=f,g},x.drawImage=function(c,d){var e,f,h,i,j,k,l,m,n=c.runtimeStyle.width,o=c.runtimeStyle.height;c.runtimeStyle.width="auto",c.runtimeStyle.height="auto";var p=c.width,q=c.height;c.runtimeStyle.width=n,c.runtimeStyle.height=o;if(arguments.length==3)e=arguments[1],f=arguments[2],j=k=0,l=h=p,m=i=q;else if(arguments.length==5)e=arguments[1],f=arguments[2],h=arguments[3],i=arguments[4],j=k=0,l=p,m=q;else if(arguments.length==9)j=arguments[1],k=arguments[2],l=arguments[3],m=arguments[4],e=arguments[5],f=arguments[6],h=arguments[7],i=arguments[8];else throw Error("Invalid number of arguments");var r=this.getCoords_(e,f),s=l/2,t=m/2,u=[],v=10,w=10;u.push(" <g_vml_:group",' coordsize="',g*v,",",g*w,'"',' coordorigin="0,0"',' style="width:',v,"px;height:",w,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var x=[];x.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",b(r.x/g),",","Dy=",b(r.y/g),"");var y=r,z=this.getCoords_(e+h,f),A=this.getCoords_(e,f+i),B=this.getCoords_(e+h,f+i);y.x=a.max(y.x,z.x,A.x,B.x),y.y=a.max(y.y,z.y,A.y,B.y),u.push("padding:0 ",b(y.x/g),"px ",b(y.y/g),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",x.join(""),", sizingmethod='clip');")}else u.push("top:",b(r.y/g),"px;left:",b(r.x/g),"px;");u.push(' ">','<g_vml_:image src="',c.src,'"',' style="width:',g*h,"px;"," height:",g*i,'px;"',' cropleft="',j/p,'"',' croptop="',k/q,'"',' cropright="',(p-j-l)/p,'"',' cropbottom="',(q-k-m)/q,'"'," />","</g_vml_:group>"),this.element_.insertAdjacentHTML("BeforeEnd",u.join(""))},x.stroke=function(c){var d=[],e=!1,f=u(c?this.fillStyle:this.strokeStyle),h=f.color,i=f.alpha*this.globalAlpha,j=10,k=10;d.push("<g_vml_:shape",' filled="',!!c,'"',' style="position:absolute;width:',j,"px;height:",k,'px;"',' coordorigin="0 0" coordsize="',g*j," ",g*k,'"',' stroked="',!c,'"',' path="');var l=!1,m={x:null,y:null},n={x:null,y:null};for(var o=0;o<this.currentPath_.length;o++){var p=this.currentPath_[o],q;switch(p.type){case"moveTo":q=p,d.push(" m ",b(p.x),",",b(p.y));break;case"lineTo":d.push(" l ",b(p.x),",",b(p.y));break;case"close":d.push(" x "),p=null;break;case"bezierCurveTo":d.push(" c ",b(p.cp1x),",",b(p.cp1y),",",b(p.cp2x),",",b(p.cp2y),",",b(p.x),",",b(p.y));break;case"at":case"wa":d.push(" ",p.type," ",b(p.x-this.arcScaleX_*p.radius),",",b(p.y-this.arcScaleY_*p.radius)," ",b(p.x+this.arcScaleX_*p.radius),",",b(p.y+this.arcScaleY_*p.radius)," ",b(p.xStart),",",b(p.yStart)," ",b(p.xEnd),",",b(p.yEnd))}if(p){if(m.x==null||p.x<m.x)m.x=p.x;if(n.x==null||p.x>n.x)n.x=p.x;if(m.y==null||p.y<m.y)m.y=p.y;if(n.y==null||p.y>n.y)n.y=p.y}}d.push(' ">');if(!c){var r=this.lineScale_*this.lineWidth;r<1&&(i*=r),d.push("<g_vml_:stroke",' opacity="',i,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',v(this.lineCap),'"',' weight="',r,'px"',' color="',h,'" />')}else if(typeof this.fillStyle=="object"){var s=this.fillStyle,t=0,w={x:0,y:0},x=0,y=1;if(s.type_=="gradient"){var z=s.x0_/this.arcScaleX_,A=s.y0_/this.arcScaleY_,B=s.x1_/this.arcScaleX_,C=s.y1_/this.arcScaleY_,D=this.getCoords_(z,A),E=this.getCoords_(B,C),F=E.x-D.x,G=E.y-D.y;t=Math.atan2(F,G)*180/Math.PI,t<0&&(t+=360),t<1e-6&&(t=0)}else{var D=this.getCoords_(s.x0_,s.y0_),H=n.x-m.x,I=n.y-m.y;w={x:(D.x-m.x)/H,y:(D.y-m.y)/I},H/=this.arcScaleX_*g,I/=this.arcScaleY_*g;var J=a.max(H,I);x=2*s.r0_/J,y=2*s.r1_/J-x}var K=s.colors_;K.sort(function(a,b){return a.offset-b.offset});var L=K.length,M=K[0].color,N=K[L-1].color,O=K[0].alpha*this.globalAlpha,P=K[L-1].alpha*this.globalAlpha,Q=[];for(var o=0;o<L;o++){var R=K[o];Q.push(R.offset*y+x+" "+R.color)}d.push('<g_vml_:fill type="',s.type_,'"',' method="none" focus="100%"',' color="',M,'"',' color2="',N,'"',' colors="',Q.join(","),'"',' opacity="',P,'"',' g_o_:opacity2="',O,'"',' angle="',t,'"',' focusposition="',w.x,",",w.y,'" />')}else d.push('<g_vml_:fill color="',h,'" opacity="',i,'" />');d.push("</g_vml_:shape>"),this.element_.insertAdjacentHTML("beforeEnd",d.join(""))},x.fill=function(){this.stroke(!0)},x.closePath=function(){this.currentPath_.push({type:"close"})},x.getCoords_=function(a,b){var c=this.m_;return{x:g*(a*c[0][0]+b*c[1][0]+c[2][0])-h,y:g*(a*c[0][1]+b*c[1][1]+c[2][1])-h}},x.save=function(){var a={};t(this,a),this.aStack_.push(a),this.mStack_.push(this.m_),this.m_=s(r(),this.m_)},x.restore=function(){t(this.aStack_.pop(),this),this.m_=this.mStack_.pop()},x.translate=function(a,b){var c=[[1,0,0],[0,1,0],[a,b,1]];A(this,s(c,this.m_),!1)},x.rotate=function(a){var b=d(a),e=c(a),f=[[b,e,0],[-e,b,0],[0,0,1]];A(this,s(f,this.m_),!1)},x.scale=function(a,b){this.arcScaleX_*=a,this.arcScaleY_*=b;var c=[[a,0,0],[0,b,0],[0,0,1]];A(this,s(c,this.m_),!0)},x.transform=function(a,b,c,d,e,f){var g=[[a,b,0],[c,d,0],[e,f,1]];A(this,s(g,this.m_),!0)},x.setTransform=function(a,b,c,d,e,f){var g=[[a,b,0],[c,d,0],[e,f,1]];A(this,g,!0)},x.clip=function(){},x.arcTo=function(){},x.createPattern=function(){return new C},B.prototype.addColorStop=function(a,b){b=u(b),this.colors_.push({offset:a,color:b.color,alpha:b.alpha})},G_vmlCanvasManager=l,CanvasRenderingContext2D=w,CanvasGradient=B,CanvasPattern=C}()