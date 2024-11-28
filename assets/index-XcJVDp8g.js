import{r as v,a as _,g as q,i as H,j as x}from"./index-xTxA-yvC.js";const S={step:0},U=v.createContext([S,()=>{}]);var E={};(function(f){var p=H;Object.defineProperty(f,"__esModule",{value:!0}),f.default=void 0;var r=p(_());function b(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);e&&(u=u.filter(function(P){return Object.getOwnPropertyDescriptor(t,P).enumerable})),a.push.apply(a,u)}return a}function m(t){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?arguments[e]:{};e%2?b(Object(a),!0).forEach(function(u){(0,r.default)(t,u,a[u])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach(function(u){Object.defineProperty(t,u,Object.getOwnPropertyDescriptor(a,u))})}return t}var c=window,l=c.requestAnimationFrame,o=function(){return new Date().getTime()},s="There is nothing to undo.",y=o(),g={enable:!1,timestamp:y,stopTime:y,lastTime:y,fps:0},n=m({},g),i={do:function(){},list:[]},F=function(e){i.list.push(i.do),i.do=function(a){return function(){return e(arguments[0]),a.apply(this,arguments)}}(i.do)},k=function t(){if(n.enable){var e=o(),a=n.fps?1e3/n.fps:0,u=e-n.lastTime;if(u<a){l(function(){return t()});return}n.lastTime=e;var P=e-n.timestamp;i.do({delta:P}),l(function(){return t()})}},D=function(){if(!n.enable){n.enable=!0;var e=o()-n.stopTime;n.timestamp+=e,k()}},R=function(){n.enable=!1,n.stopTime=o()},N=function(){n.enable=g.enable,i.do=function(){},i.list=[]},C=function(){var e=i.list;if(e.length===0){console.warn(s);return}i.do=e[e.length-1],e.pop()},A=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:30;n.fps=e},L=function(){n.timestamp=o(),n.stopTime=o(),n.lastTime=o()},M={add:F,todo:i,play:D,stop:R,destroy:N,undo:C,setFPS:A,reset:L};f.default=M})(E);const j=q(E),O=[{x:100,y:50},{x:150,y:50},{x:200,y:50},{x:250,y:50},{x:300,y:50},{x:350,y:50},{x:400,y:50},{x:400,y:100},{x:400,y:150},{x:400,y:200},{x:400,y:250},{x:400,y:300},{x:400,y:350},{x:350,y:350},{x:300,y:350},{x:250,y:350},{x:200,y:350},{x:150,y:350},{x:100,y:350},{x:100,y:300},{x:100,y:250},{x:100,y:200},{x:100,y:150},{x:100,y:100}],w=20,T=[{blur:15,color:"#fff"},{blur:35,color:"#008cff"},{blur:35,color:"#0ff"}],d=new URLSearchParams(window.location.search).get("fps"),h=Math.max(2,Math.min(Number(new URLSearchParams(window.location.search).get("max")||O.length),O.length)),W=v.memo(()=>{const f=v.useRef(O),p=v.useRef(null);return v.useEffect(()=>{if(p.current){const r=p.current.getContext("2d");if(r){const b=()=>{r.clearRect(0,0,500,500),r.strokeStyle="#fff",r.lineWidth=w,r.lineCap="round";let m=null,c=null;const l=f.current.slice(0,h);l.forEach((s,y)=>{[...new Array(T.length).keys()].forEach(g=>{if(m){const{blur:n,color:i}=T[g%T.length];r.shadowBlur=n,r.shadowColor=i,r.beginPath(),r.lineWidth=w-y*(w/h),r.moveTo(m.x,m.y),r.lineTo(s.x,s.y),r.stroke()}}),m=s}),l.forEach((s,y)=>{c&&(r.beginPath(),r.lineWidth=w-y*(w/h),r.moveTo(c.x,c.y),r.lineTo(s.x,s.y),r.stroke()),c=s}),(()=>{const s=f.current.pop();s&&f.current.unshift(s)})()};d&&j.setFPS(Number(d)),j.add(b),j.play()}window.addEventListener("keydown",b=>{const{key:m}=b;let c=h,l=Number(d);switch(m){case"ArrowUp":c=h+1;break;case"ArrowDown":c=h-1;break;case"ArrowLeft":l=Number(d)-1;break;case"ArrowRight":l=Number(d)+1;break}if(h!==c||d&&l!==Number(d)){const o=new URL(window.location.href);o.searchParams.set("max",Math.max(Math.min(c,20),2).toString()),d&&o.searchParams.set("fps",l.toString()),window.location.href=o.toString()}})}},[]),x.jsx("canvas",{ref:p,width:500,height:500,className:"Canvas"})}),B=v.memo(()=>{const[f,p]=v.useState(S);return x.jsx("div",{className:"Home",children:x.jsx("div",{children:x.jsx("div",{children:x.jsx("div",{className:"canvas",children:x.jsx(U.Provider,{value:[f,p],children:x.jsx(W,{})})})})})})});export{B as default};
