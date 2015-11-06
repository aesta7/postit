/*
 * PostIt v0.4.0
 * Copyright 2015 coopersemantics
 * Available under MIT license <https://github.com/outbrain/postit/blob/master/LICENSE>
 * @Date Thu Nov 05 2015 19:46:03 GMT-0500 (EST)
 */
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.PostIt=e()}}(function(){return function e(t,n,r){function o(s,u){if(!n[s]){if(!t[s]){var f="function"==typeof require&&require;if(!u&&f)return f(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return o(n?n:e)},c,c.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,n){"use strict";var r=e("./postit"),o={},i=t.exports={};i.create=function(e){var t=o[e];return t?t:o[e]=new r(e)},i.destroy=function(e){delete o[e]},i.get=function(e){return o[e]},i.getAll=function(){return o}},{"./postit":4}],2:[function(e,t,n){"use strict";var r=e("./factory"),o=e("./helpers"),i=t.exports={};i.add=function(e){var t=this;return"string"!=typeof e?(console.error(e+" should be a `String`."),t):(r.create(e),t)},i.remove=function(e){var t=this,n=t.get(e);if(!n)return t;for(var o in n.listeners)n.off(o);return r.destroy(e),t},i.removeAll=function(){var e=this,t=e.getAll();for(var n in t)e.remove(n);return e},i.size=function(){var e=0,t=this.getAll();for(var n in t)e++;return e},i.get=function(e){return r.get(e)||console.error(e+" does not match any `PostIt` instances.")},i.getAll=function(){return r.getAll()},i.on=function(e,t,n){var r=this,o=r.get(e);return o?(o.on(t,n),r):r},i.off=function(e,t,n){var r=this,o=r.get(e);return o?(o.off(t,n),r):r},i.emit=function(e,t,n,r,o){var i=this,s=i.get(e);return s?(s.emit(t,n,r,o),i):i},i.openWindow=function(e){return o.openWindow(e||{})}},{"./factory":1,"./helpers":3}],3:[function(e,t,n){"use strict";var r=t.exports={};r.serialize=function(e){var t=[];for(var n in e)t.push(n+"="+e[n]);return t.join(", ")},r.shallowMerge=function(e,t){for(var n in t)null!=t[n]&&(e[n]=t[n]);return e},r.openWindow=function(e){var t=this,n=screen||{},r=window,o=document,i=o.documentElement||{},s=r.screenLeft||n.left||0,u=r.screenTop||n.top||0,f=r.innerWidth||i.clientWidth||n.width||0,c=r.innerHeight||i.clientHeight||n.height||0,a=f/2-e.width/2+s,l=c/2-e.height/2+u,d=t.serialize(t.shallowMerge({top:l,left:a},e)),h=r.open(e.url,e.title,d);return r.focus&&h.focus(),h}},{}],4:[function(e,t,n){"use strict";var r=t.exports=function(e){this.id=e,this.token=0,this.listeners={}};r.prototype.on=function(e,t){var n=this;n.listeners[e]=n.listeners[e]||[];var r=function(r){var o=null;if(/__event\s?"/.test(r.data)){try{o=JSON.parse(r.data)}catch(i){console.error(i),o={}}r.dataParsed=o}return"*"===e?t.call(this,r):void(!o||e!==o.__event||n.id!==o.__id||"null"!==r.origin&&-1===o.__origin.indexOf(r.origin)||t.call(this,r))};return t.__token=r.__token=n.token++,window.addEventListener("message",r,!1),n.listeners[e].push(r),n},r.prototype.off=function(e,t){for(var n=this,r=n.listeners[e]||[],o=0;o<r.length;++o)t&&t.__token!==r[o].__token||(window.removeEventListener("message",r[o],!1),r.splice(o,1),--o);return n},r.prototype.emit=function(e,t,n,r){var o=this,i=window.location.href;switch(Object.prototype.toString.call(n)){case"[object Function]":return console.error(n+" should either be an `Object`, `Array` or `String`."),o;case"[object Object]":n.__id=o.id,n.__event=e,n.__origin=i,n=JSON.stringify(n);break;default:n=JSON.stringify({__value:n,__id:o.id,__event:e,__origin:i})}return t.postMessage(n,r),o}},{}]},{},[2])(2)});
//# sourceMappingURL=postit.js.map
