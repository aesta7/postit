/*
 * PostIt v0.2.0
 * Copyright 2015 coopersemantics
 * Available under MIT license <https://github.com/outbrain/postit/LICENSE>
 * @Date Fri Jul 10 2015 19:09:50 GMT-0400 (EDT)
 */
!function t(e,r,n){function i(s,u){if(!r[s]){if(!e[s]){var c="function"==typeof require&&require;if(!u&&c)return c(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var a=r[s]={exports:{}};e[s][0].call(a.exports,function(t){var r=e[s][1][t];return i(r?r:t)},a,a.exports,t,e,r,n)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(t,e,r){"use strict";var n=t("./postit"),i={},o=e.exports={};o.create=function(t){var e=i[t];return e?e:i[t]=new n(t)},o.destroy=function(t){delete i[t]},o.get=function(t){return i[t]},o.getAll=function(){return i}},{"./postit":5}],2:[function(t,e,r){"use strict";window.PostIt=t("./manager")},{"./manager":4}],3:[function(t,e,r){"use strict";var n=e.exports={};n.serialize=function(t){var e=[];for(var r in t)e.push(r+"="+t[r]);return e.join(", ")},n.shallowMerge=function(t,e){for(var r in e)null!=e[r]&&(t[r]=e[r]);return t},n.openWindow=function(t){var e=this,r=screen||{},n=window,i=document,o=i.documentElement||{},s=n.screenLeft||r.left||0,u=n.screenTop||r.top||0,c=n.innerWidth||o.clientWidth||r.width||0,a=n.innerHeight||o.clientHeight||r.height||0,f=c/2-t.width/2+s,l=a/2-t.height/2+u,h=e.serialize(e.shallowMerge({top:l,left:f},t)),v=n.open(t.url,t.title,h);return n.focus&&v.focus(),v}},{}],4:[function(t,e,r){"use strict";var n=t("./factory"),i=t("./helpers"),o=e.exports={};o.add=function(t){var e=this;return"string"!=typeof t?(console.error(t+" should be a `String`."),e):(n.create(t),e)},o.remove=function(t){var e=this,r=e.get(t);if(!r)return e;for(var i in r.listeners)r.off(i);return n.destroy(t),e},o.removeAll=function(){var t=this,e=t.getAll();for(var r in e)t.remove(r);return t},o.size=function(){var t=0,e=this.getAll();for(var r in e)t++;return t},o.get=function(t){return n.get(t)||console.error(t+" does not match any `PostIt` instances.")},o.getAll=function(){return n.getAll()},o.on=function(t,e,r){var n=this,i=n.get(t);return i?(i.on(e,r),n):n},o.off=function(t,e,r){var n=this,i=n.get(t);return i?(i.off(e,r),n):n},o.emit=function(t,e,r,n,i){var o=this,s=o.get(t);return s?(s.emit(e,r,n,i),o):o},o.openWindow=function(t){return i.openWindow(t||{})}},{"./factory":1,"./helpers":3}],5:[function(t,e,r){"use strict";var n=e.exports=function(t){this.id=t,this.token=0,this.listeners={}};n.prototype.on=function(t,e){var r=this;r.listeners[t]=r.listeners[t]||[];var n=function(n){if("*"===t)return e.call(this,n);if(/__event\s?"/.test(n.data)){var i;try{i=JSON.parse(n.data)}catch(o){return}n.dataParsed=i,t===i.__event&&r.id===i.__id&&e.call(this,n)}};return e.__token=n.__token=r.token++,window.addEventListener("message",n,!1),r.listeners[t].push(n),r},n.prototype.off=function(){var t=function(t,e){window.removeEventListener("message",t[e],!1),t.splice(e,1)};return function(e,r){for(var n=this,i=n.listeners[e]||[],o=0;o<i.length;++o)r?r.__token===i[o].__token&&t(i,o):(t(i,o),--o);return n}}(),n.prototype.emit=function(t,e,r,n){var i=this;switch(Object.prototype.toString.call(r)){case"[object Function]":return console.error(r+" should either be an `Object`, `Array` or a `String`."),i;case"[object Object]":r.__event=t,r.__id=i.id,r=JSON.stringify(r);break;default:r=JSON.stringify({__value:r,__id:i.id,__event:t})}return e.postMessage(r,n),i}},{}]},{},[2]);