(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Mr={apiKey:"AIzaSyB1T_bGrmu7reGcsW3V70hAznbE3L_Uo8o",authDomain:"logexporter-42a5f.firebaseapp.com",databaseURL:"https://logexporter-42a5f-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"logexporter-42a5f",storageBucket:"logexporter-42a5f.firebasestorage.app",messagingSenderId:"334718041282",appId:"1:334718041282:web:857f398951dd2eddfd8f5b",measurementId:"G-6LGNFPT0BK"},Le="logs",ss="entries",In="indexes",B={BY_PROJECT_DATE:"byProjectDate",BY_USER_DATE:"byUserDate",BY_PROJ_SRV_PLAT_DATE:"byProjSrvPlatDate",BY_PROJECT_USER_DATE:"byProjectUserDate",BY_PROJECT_PLATFORM_DATE:"byProjectPlatformDate",BY_PROJECT_SERVER_DATE:"byProjectServerDate",BY_PROJECT:"byProject",BY_PROJECT_SERVER:"byProjectServer",BY_PROJECT_PLATFORM:"byProjectPlatform",BY_PROJECT_SERVER_PLATFORM:"byProjectServerPlatform",BY_USER:"byUser"},je="Mega",Fr=()=>{};var is={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Js={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw Ne(e)},Ne=function(n){return new Error("Firebase Database ("+Js.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xs=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Br=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},bn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,_=c&63;l||(_=64,o||(h=64)),s.push(t[d],t[u],t[h],t[_])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Xs(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Br(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const u=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new $r;const h=r<<2|a>>4;if(s.push(h),c!==64){const _=a<<4&240|c>>2;if(s.push(_),u!==64){const p=c<<6&192|u;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class $r extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Zs=function(n){const e=Xs(n);return bn.encodeByteArray(e,!0)},mt=function(n){return Zs(n).replace(/\./g,"")},an=function(n){try{return bn.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(n){return ei(void 0,n)}function ei(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Wr(t)||(n[t]=ei(n[t],e[t]));return n}function Wr(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=()=>Hr().__FIREBASE_DEFAULTS__,jr=()=>{if(typeof process>"u"||typeof is>"u")return;const n=is.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Gr=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&an(n[1]);return e&&JSON.parse(e)},ti=()=>{try{return Fr()||Vr()||jr()||Gr()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},qr=n=>ti()?.emulatorHosts?.[n],zr=n=>{const e=qr(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},ni=()=>ti()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Yr(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kr(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[mt(JSON.stringify(t)),mt(JSON.stringify(o)),""].join(".")}const Me={};function Qr(){const n={prod:[],emulator:[]};for(const e of Object.keys(Me))Me[e]?n.emulator.push(e):n.prod.push(e);return n}function Jr(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let rs=!1;function Xr(n,e){if(typeof window>"u"||typeof document>"u"||!Sn(window.location.host)||Me[n]===e||Me[n]||rs)return;Me[n]=e;function t(h){return`__firebase__banner__${h}`}const s="__firebase__banner",r=Qr().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function l(h,_){h.setAttribute("width","24"),h.setAttribute("id",_),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function c(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{rs=!0,o()},h}function d(h,_){h.setAttribute("id",_),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function u(){const h=Jr(s),_=t("text"),p=document.getElementById(_)||document.createElement("span"),C=t("learnmore"),N=document.getElementById(C)||document.createElement("a"),G=t("preprendIcon"),q=document.getElementById(G)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const le=h.element;a(le),d(N,C);const zt=c();l(q,G),le.append(q,p,N,zt),document.body.appendChild(le)}r?(p.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,p.innerText="Preview backend running in this workspace."),p.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zr(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function si(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Zr())}function eo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function to(){return Js.NODE_ADMIN===!0}function no(){try{return typeof indexedDB=="object"}catch{return!1}}function so(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io="FirebaseError";class st extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=io,Object.setPrototypeOf(this,st.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ii.prototype.create)}}class ii{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?ro(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new st(i,a,s)}}function ro(n,e){return n.replace(oo,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const oo=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(n){return JSON.parse(n)}function R(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=Ge(an(r[0])||""),t=Ge(an(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},ao=function(n){const e=ri(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},lo=function(n){const e=ri(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function be(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function os(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function gt(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function yt(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(as(r)&&as(o)){if(!yt(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function as(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function co(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)s[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(h<<1|h>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(i<<5|i>>>27)+c+l+d+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=h}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function Tn(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,f(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Mt=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n){return n&&n._delegate?n._delegate:n}class qe{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Lt;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(po(e))try{this.getOrInitializeService({instanceIdentifier:ce})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=ce){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ce){return this.instances.has(e)}getOptions(e=ce){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:_o(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=ce){return this.component?this.component.multipleInstances?e:ce:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _o(n){return n===ce?void 0:n}function po(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new fo(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var I;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(I||(I={}));const go={debug:I.DEBUG,verbose:I.VERBOSE,info:I.INFO,warn:I.WARN,error:I.ERROR,silent:I.SILENT},yo=I.INFO,vo={[I.DEBUG]:"log",[I.VERBOSE]:"log",[I.INFO]:"info",[I.WARN]:"warn",[I.ERROR]:"error"},Eo=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=vo[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class oi{constructor(e){this.name=e,this._logLevel=yo,this._logHandler=Eo,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in I))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?go[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,I.DEBUG,...e),this._logHandler(this,I.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,I.VERBOSE,...e),this._logHandler(this,I.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,I.INFO,...e),this._logHandler(this,I.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,I.WARN,...e),this._logHandler(this,I.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,I.ERROR,...e),this._logHandler(this,I.ERROR,...e)}}const Co=(n,e)=>e.some(t=>n instanceof t);let ls,cs;function wo(){return ls||(ls=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Io(){return cs||(cs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ai=new WeakMap,ln=new WeakMap,li=new WeakMap,Yt=new WeakMap,Nn=new WeakMap;function bo(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(X(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ai.set(t,n)}).catch(()=>{}),Nn.set(e,n),e}function So(n){if(ln.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});ln.set(n,e)}let cn={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ln.get(n);if(e==="objectStoreNames")return n.objectStoreNames||li.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return X(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function To(n){cn=n(cn)}function No(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Kt(this),e,...t);return li.set(s,e.sort?e.sort():[e]),X(s)}:Io().includes(n)?function(...e){return n.apply(Kt(this),e),X(ai.get(this))}:function(...e){return X(n.apply(Kt(this),e))}}function Ro(n){return typeof n=="function"?No(n):(n instanceof IDBTransaction&&So(n),Co(n,wo())?new Proxy(n,cn):n)}function X(n){if(n instanceof IDBRequest)return bo(n);if(Yt.has(n))return Yt.get(n);const e=Ro(n);return e!==n&&(Yt.set(n,e),Nn.set(e,n)),e}const Kt=n=>Nn.get(n);function Ao(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=X(o);return s&&o.addEventListener("upgradeneeded",l=>{s(X(o.result),l.oldVersion,l.newVersion,X(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const xo=["get","getKey","getAll","getAllKeys","count"],Po=["put","add","delete","clear"],Qt=new Map;function hs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qt.get(e))return Qt.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=Po.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||xo.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Qt.set(e,r),r}To(n=>({...n,get:(e,t,s)=>hs(e,t)||n.get(e,t,s),has:(e,t)=>!!hs(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Do(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Do(n){return n.getComponent()?.type==="VERSION"}const hn="@firebase/app",us="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K=new oi("@firebase/app"),Oo="@firebase/app-compat",Lo="@firebase/analytics-compat",Mo="@firebase/analytics",Fo="@firebase/app-check-compat",Bo="@firebase/app-check",$o="@firebase/auth",Uo="@firebase/auth-compat",Wo="@firebase/database",Ho="@firebase/data-connect",Vo="@firebase/database-compat",jo="@firebase/functions",Go="@firebase/functions-compat",qo="@firebase/installations",zo="@firebase/installations-compat",Yo="@firebase/messaging",Ko="@firebase/messaging-compat",Qo="@firebase/performance",Jo="@firebase/performance-compat",Xo="@firebase/remote-config",Zo="@firebase/remote-config-compat",ea="@firebase/storage",ta="@firebase/storage-compat",na="@firebase/firestore",sa="@firebase/ai",ia="@firebase/firestore-compat",ra="firebase",oa="12.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un="[DEFAULT]",aa={[hn]:"fire-core",[Oo]:"fire-core-compat",[Mo]:"fire-analytics",[Lo]:"fire-analytics-compat",[Bo]:"fire-app-check",[Fo]:"fire-app-check-compat",[$o]:"fire-auth",[Uo]:"fire-auth-compat",[Wo]:"fire-rtdb",[Ho]:"fire-data-connect",[Vo]:"fire-rtdb-compat",[jo]:"fire-fn",[Go]:"fire-fn-compat",[qo]:"fire-iid",[zo]:"fire-iid-compat",[Yo]:"fire-fcm",[Ko]:"fire-fcm-compat",[Qo]:"fire-perf",[Jo]:"fire-perf-compat",[Xo]:"fire-rc",[Zo]:"fire-rc-compat",[ea]:"fire-gcs",[ta]:"fire-gcs-compat",[na]:"fire-fst",[ia]:"fire-fst-compat",[sa]:"fire-vertex","fire-js":"fire-js",[ra]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt=new Map,la=new Map,dn=new Map;function ds(n,e){try{n.container.addComponent(e)}catch(t){K.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Et(n){const e=n.name;if(dn.has(e))return K.debug(`There were multiple attempts to register component ${e}.`),!1;dn.set(e,n);for(const t of vt.values())ds(t,n);for(const t of la.values())ds(t,n);return!0}function ca(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ha(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Z=new ii("app","Firebase",ua);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Z.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa=oa;function ci(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:un,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw Z.create("bad-app-name",{appName:String(i)});if(t||(t=ni()),!t)throw Z.create("no-options");const r=vt.get(i);if(r){if(yt(t,r.options)&&yt(s,r.config))return r;throw Z.create("duplicate-app",{appName:i})}const o=new mo(i);for(const l of dn.values())o.addComponent(l);const a=new da(t,s,o);return vt.set(i,a),a}function _a(n=un){const e=vt.get(n);if(!e&&n===un&&ni())return ci();if(!e)throw Z.create("no-app",{appName:n});return e}function Ce(n,e,t){let s=aa[n]??n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),K.warn(o.join(" "));return}Et(new qe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa="firebase-heartbeat-database",ma=1,ze="firebase-heartbeat-store";let Jt=null;function hi(){return Jt||(Jt=Ao(pa,ma,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ze)}catch(t){console.warn(t)}}}}).catch(n=>{throw Z.create("idb-open",{originalErrorMessage:n.message})})),Jt}async function ga(n){try{const t=(await hi()).transaction(ze),s=await t.objectStore(ze).get(ui(n));return await t.done,s}catch(e){if(e instanceof st)K.warn(e.message);else{const t=Z.create("idb-get",{originalErrorMessage:e?.message});K.warn(t.message)}}}async function fs(n,e){try{const s=(await hi()).transaction(ze,"readwrite");await s.objectStore(ze).put(e,ui(n)),await s.done}catch(t){if(t instanceof st)K.warn(t.message);else{const s=Z.create("idb-set",{originalErrorMessage:t?.message});K.warn(s.message)}}}function ui(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya=1024,va=30;class Ea{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new wa(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=_s();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:t}),this._heartbeatsCache.heartbeats.length>va){const i=Ia(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){K.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=_s(),{heartbeatsToSend:t,unsentEntries:s}=Ca(this._heartbeatsCache.heartbeats),i=mt(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return K.warn(e),""}}}function _s(){return new Date().toISOString().substring(0,10)}function Ca(n,e=ya){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),ps(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ps(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class wa{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return no()?so().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ga(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return fs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return fs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ps(n){return mt(JSON.stringify({version:2,heartbeats:n})).length}function Ia(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(n){Et(new qe("platform-logger",e=>new ko(e),"PRIVATE")),Et(new qe("heartbeat",e=>new Ea(e),"PRIVATE")),Ce(hn,us,n),Ce(hn,us,"esm2020"),Ce("fire-js","")}ba("");var Sa="firebase",Ta="12.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ce(Sa,Ta,"app");var ms={};const gs="@firebase/database",ys="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let di="";function Na(n){di=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),R(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Ge(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return j(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ra(e)}}catch{}return new Aa},ue=fi("localStorage"),xa=fi("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we=new oi("@firebase/database"),Pa=(function(){let n=1;return function(){return n++}})(),_i=function(n){const e=uo(n),t=new ho;t.update(e);const s=t.digest();return bn.encodeByteArray(s)},it=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=it.apply(null,s):typeof s=="object"?e+=R(s):e+=s,e+=" "}return e};let Fe=null,vs=!0;const ka=function(n,e){f(!0,"Can't turn on custom loggers persistently."),we.logLevel=I.VERBOSE,Fe=we.log.bind(we)},D=function(...n){if(vs===!0&&(vs=!1,Fe===null&&xa.get("logging_enabled")===!0&&ka()),Fe){const e=it.apply(null,n);Fe(e)}},rt=function(n){return function(...e){D(n,...e)}},fn=function(...n){const e="FIREBASE INTERNAL ERROR: "+it(...n);we.error(e)},Q=function(...n){const e=`FIREBASE FATAL ERROR: ${it(...n)}`;throw we.error(e),new Error(e)},M=function(...n){const e="FIREBASE WARNING: "+it(...n);we.warn(e)},Da=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&M("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Rn=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Oa=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},fe="[MIN_NAME]",ie="[MAX_NAME]",Re=function(n,e){if(n===e)return 0;if(n===fe||e===ie)return-1;if(e===fe||n===ie)return 1;{const t=Es(n),s=Es(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},La=function(n,e){return n===e?0:n<e?-1:1},Pe=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+R(e))},An=function(n){if(typeof n!="object"||n===null)return R(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=R(e[s]),t+=":",t+=An(n[e[s]]);return t+="}",t},pi=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function F(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const mi=function(n){f(!Rn(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},Ma=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Fa=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Ba(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const $a=new RegExp("^-?(0*)\\d{1,10}$"),Ua=-2147483648,Wa=2147483647,Es=function(n){if($a.test(n)){const e=Number(n);if(e>=Ua&&e<=Wa)return e}return null},Ae=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw M("Exception was thrown by user callback.",t),e},Math.floor(0))}},Ha=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Be=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,ha(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){M(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(D("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',M(e)}}class pt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}pt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn="5",gi="v",yi="s",vi="r",Ei="f",Ci=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,wi="ls",Ii="p",_n="ac",bi="websocket",Si="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ue.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ue.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Ga(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Ni(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let s;if(e===bi)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Si)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Ga(n)&&(t.ns=n.namespace);const i=[];return F(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(){this.counters_={}}incrementCounter(e,t=1){j(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Ur(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt={},Zt={};function Pn(n){const e=n.toString();return Xt[e]||(Xt[e]=new qa),Xt[e]}function za(n,e){const t=n.toString();return Zt[t]||(Zt[t]=e()),Zt[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Ae(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs="start",Ka="close",Qa="pLPCommand",Ja="pRTLPCB",Ri="id",Ai="pw",xi="ser",Xa="cb",Za="seg",el="ts",tl="d",nl="dframe",Pi=1870,ki=30,sl=Pi-ki,il=25e3,rl=3e4;class ve{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=rt(e),this.stats_=Pn(t),this.urlFn=l=>(this.appCheckToken&&(l[_n]=this.appCheckToken),Ni(t,Si,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Ya(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(rl)),Oa(()=>{if(this.isClosed_)return;this.scriptTagHolder=new kn((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Cs)this.id=a,this.password=l;else if(o===Ka)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Cs]="t",s[xi]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Xa]=this.scriptTagHolder.uniqueCallbackIdentifier),s[gi]=xn,this.transportSessionId&&(s[yi]=this.transportSessionId),this.lastSessionId&&(s[wi]=this.lastSessionId),this.applicationId&&(s[Ii]=this.applicationId),this.appCheckToken&&(s[_n]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ci.test(location.hostname)&&(s[vi]=Ei);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ve.forceAllow_=!0}static forceDisallow(){ve.forceDisallow_=!0}static isAvailable(){return ve.forceAllow_?!0:!ve.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Ma()&&!Fa()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=R(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Zs(t),i=pi(s,sl);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[nl]="t",s[Ri]=e,s[Ai]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=R(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class kn{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Pa(),window[Qa+this.uniqueCallbackIdentifier]=e,window[Ja+this.uniqueCallbackIdentifier]=t,this.myIFrame=kn.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){D("frame writing exception"),a.stack&&D(a.stack),D(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||D("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ri]=this.myID,e[Ai]=this.myPW,e[xi]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+ki+s.length<=Pi;){const o=this.pendingSegs.shift();s=s+"&"+Za+i+"="+o.seg+"&"+el+i+"="+o.ts+"&"+tl+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(il)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{D("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol=16384,al=45e3;let Ct=null;typeof MozWebSocket<"u"?Ct=MozWebSocket:typeof WebSocket<"u"&&(Ct=WebSocket);class ${constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=rt(this.connId),this.stats_=Pn(t),this.connURL=$.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[gi]=xn,typeof location<"u"&&location.hostname&&Ci.test(location.hostname)&&(o[vi]=Ei),t&&(o[yi]=t),s&&(o[wi]=s),i&&(o[_n]=i),r&&(o[Ii]=r),Ni(e,bi,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ue.set("previous_websocket_failure",!0);try{let s;to(),this.mySock=new Ct(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){$.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Ct!==null&&!$.forceDisallow_}static previouslyFailed(){return ue.isInMemoryStorage||ue.get("previous_websocket_failure")===!0}markConnectionHealthy(){ue.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=Ge(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=R(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=pi(t,ol);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(al))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}$.responsesRequiredToBeHealthy=2;$.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{static get ALL_TRANSPORTS(){return[ve,$]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=$&&$.isAvailable();let s=t&&!$.previouslyFailed();if(e.webSocketOnly&&(t||M("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[$];else{const i=this.transports_=[];for(const r of Ye.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Ye.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ye.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll=6e4,cl=5e3,hl=10*1024,ul=100*1024,en="t",ws="d",dl="s",Is="r",fl="e",bs="o",Ss="a",Ts="n",Ns="p",_l="h";class pl{constructor(e,t,s,i,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=rt("c:"+this.id+":"),this.transportManager_=new Ye(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Be(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ul?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>hl?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(en in e){const t=e[en];t===Ss?this.upgradeIfSecondaryHealthy_():t===Is?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===bs&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Pe("t",e),s=Pe("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ns,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ss,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ts,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Pe("t",e),s=Pe("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Pe(en,e);if(ws in e){const s=e[ws];if(t===_l){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Ts){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===dl?this.onConnectionShutdown_(s):t===Is?this.onReset_(s):t===fl?fn("Server Error: "+s):t===bs?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):fn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),xn!==s&&M("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Be(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ll))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Be(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(cl))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ns,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ue.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt extends Oi{static getInstance(){return new wt}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!si()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=32,As=768;class w{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new w("")}function v(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function re(n){return n.pieces_.length-n.pieceNum_}function b(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new w(n.pieces_,e)}function Li(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function ml(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Mi(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Fi(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new w(e,0)}function A(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof w)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new w(t,0)}function y(n){return n.pieceNum_>=n.pieces_.length}function O(n,e){const t=v(n),s=v(e);if(t===null)return e;if(t===s)return O(b(n),b(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Bi(n,e){if(re(n)!==re(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function U(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(re(n)>re(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class gl{constructor(e,t){this.errorPrefix_=t,this.parts_=Mi(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Mt(this.parts_[s]);$i(this)}}function yl(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Mt(e),$i(n)}function vl(n){const e=n.parts_.pop();n.byteLength_-=Mt(e),n.parts_.length>0&&(n.byteLength_-=1)}function $i(n){if(n.byteLength_>As)throw new Error(n.errorPrefix_+"has a key path longer than "+As+" bytes ("+n.byteLength_+").");if(n.parts_.length>Rs)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Rs+") or object contains a cycle "+he(n))}function he(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn extends Oi{static getInstance(){return new Dn}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke=1e3,El=300*1e3,xs=30*1e3,Cl=1.3,wl=3e4,Il="server_kill",Ps=3;class Y extends Di{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Y.nextPersistentConnectionId_++,this.log_=rt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ke,this.maxReconnectDelay_=El,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Dn.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&wt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(R(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Lt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Y.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&j(e,"w")){const s=be(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();M(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||lo(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=xs)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=ao(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+R(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):fn("Unrecognized action received from server: "+R(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ke,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ke,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>wl&&(this.reconnectDelay_=ke),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Cl)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Y.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?D("getToken() completed but was canceled"):(D("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new pl(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,_=>{M(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(Il)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&M(u),l())}}}interrupt(e){D("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){D("Resuming connection for reason: "+e),delete this.interruptReasons_[e],os(this.interruptReasons_)&&(this.reconnectDelay_=ke,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>An(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new w(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){D("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ps&&(this.reconnectDelay_=xs,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){D("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ps&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+di.replace(/\./g,"-")]=1,si()?e["framework.cordova"]=1:eo()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=wt.getInstance().currentlyOnline();return os(this.interruptReasons_)&&e}}Y.nextPersistentConnectionId_=0;Y.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new g(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new g(fe,e),i=new g(fe,t);return this.compare(s,i)!==0}minPost(){return g.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ut;class Ui extends Ft{static get __EMPTY_NODE(){return ut}static set __EMPTY_NODE(e){ut=e}compare(e,t){return Re(e.name,t.name)}isDefinedOn(e){throw Ne("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return g.MIN}maxPost(){return new g(ie,ut)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new g(e,ut)}toString(){return".key"}}const ee=new Ui;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class P{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??P.RED,this.left=i??L.EMPTY_NODE,this.right=r??L.EMPTY_NODE}copy(e,t,s,i,r){return new P(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return L.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return L.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,P.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,P.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}P.RED=!0;P.BLACK=!1;class bl{copy(e,t,s,i,r){return this}insert(e,t,s){return new P(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class L{constructor(e,t=L.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new L(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,P.BLACK,null,null))}remove(e){return new L(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,P.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new dt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new dt(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new dt(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new dt(this.root_,null,this.comparator_,!0,e)}}L.EMPTY_NODE=new bl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sl(n,e){return Re(n.name,e.name)}function On(n,e){return Re(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pn;function Tl(n){pn=n}const Wi=function(n){return typeof n=="number"?"number:"+mi(n):"string:"+n},Hi=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&j(e,".sv"),"Priority must be a string or number.")}else f(n===pn||n.isEmpty(),"priority of unexpected type.");f(n===pn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ks;class x{static set __childrenNodeConstructor(e){ks=e}static get __childrenNodeConstructor(){return ks}constructor(e,t=x.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Hi(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new x(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:x.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return y(e)?this:v(e)===".priority"?this.priorityNode_:x.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:x.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=v(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(f(s!==".priority"||re(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,x.__childrenNodeConstructor.EMPTY_NODE.updateChild(b(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Wi(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=mi(this.value_):e+=this.value_,this.lazyHash_=_i(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===x.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof x.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=x.VALUE_TYPE_ORDER.indexOf(t),r=x.VALUE_TYPE_ORDER.indexOf(s);return f(i>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}x.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vi,ji;function Nl(n){Vi=n}function Rl(n){ji=n}class Al extends Ft{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?Re(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return g.MIN}maxPost(){return new g(ie,new x("[PRIORITY-POST]",ji))}makePost(e,t){const s=Vi(e);return new g(t,new x("[PRIORITY-POST]",s))}toString(){return".priority"}}const T=new Al;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xl=Math.log(2);class Pl{constructor(e){const t=r=>parseInt(Math.log(r)/xl,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const It=function(n,e,t,s){n.sort(e);const i=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new P(h,u.node,P.BLACK,null,null);{const _=parseInt(d/2,10)+l,p=i(l,_),C=i(_+1,c);return u=n[_],h=t?t(u):u,new P(h,u.node,P.BLACK,p,C)}},r=function(l){let c=null,d=null,u=n.length;const h=function(p,C){const N=u-p,G=u;u-=p;const q=i(N+1,G),le=n[N],zt=t?t(le):le;_(new P(zt,le.node,C,null,q))},_=function(p){c?(c.left=p,c=p):(d=p,c=p)};for(let p=0;p<l.count;++p){const C=l.nextBitIsOne(),N=Math.pow(2,l.count-(p+1));C?h(N,P.BLACK):(h(N,P.BLACK),h(N,P.RED))}return d},o=new Pl(n.length),a=r(o);return new L(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tn;const ye={};class z{static get Default(){return f(ye&&T,"ChildrenNode.ts has not been loaded"),tn=tn||new z({".priority":ye},{".priority":T}),tn}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=be(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof L?t:null}hasIndex(e){return j(this.indexSet_,e.toString())}addIndex(e,t){f(e!==ee,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(g.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=It(s,e.getCompare()):a=ye;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new z(d,c)}addToIndexes(e,t){const s=gt(this.indexes_,(i,r)=>{const o=be(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),i===ye)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(g.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),It(a,o.getCompare())}else return ye;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new g(e.name,a))),l.insert(e,e.node)}});return new z(s,this.indexSet_)}removeFromIndexes(e,t){const s=gt(this.indexes_,i=>{if(i===ye)return i;{const r=t.get(e.name);return r?i.remove(new g(e.name,r)):i}});return new z(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let De;class m{static get EMPTY_NODE(){return De||(De=new m(new L(On),null,z.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Hi(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||De}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?De:t}}getChild(e){const t=v(e);return t===null?this:this.getImmediateChild(t).getChild(b(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new g(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?De:this.priorityNode_;return new m(i,o,r)}}updateChild(e,t){const s=v(e);if(s===null)return t;{f(v(e)!==".priority"||re(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(b(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(T,(o,a)=>{t[o]=a.val(e),s++,r&&m.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Wi(this.getPriority().val())+":"),this.forEachChild(T,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":_i(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new g(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new g(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new g(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,g.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,g.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ot?-1:0}withIndex(e){if(e===ee||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===ee||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(T),i=t.getIterator(T);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===ee?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class kl extends m{constructor(){super(new L(On),m.EMPTY_NODE,z.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const ot=new kl;Object.defineProperties(g,{MIN:{value:new g(fe,m.EMPTY_NODE)},MAX:{value:new g(ie,ot)}});Ui.__EMPTY_NODE=m.EMPTY_NODE;x.__childrenNodeConstructor=m;Tl(ot);Rl(ot);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl=!0;function k(n,e=null){if(n===null)return m.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new x(t,k(e))}if(!(n instanceof Array)&&Dl){const t=[];let s=!1;if(F(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=k(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new g(o,l)))}}),t.length===0)return m.EMPTY_NODE;const r=It(t,Sl,o=>o.name,On);if(s){const o=It(t,T.getCompare());return new m(r,k(e),new z({".priority":o},{".priority":T}))}else return new m(r,k(e),z.Default)}else{let t=m.EMPTY_NODE;return F(n,(s,i)=>{if(j(n,s)&&s.substring(0,1)!=="."){const r=k(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(k(e))}}Nl(k);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi extends Ft{constructor(e){super(),this.indexPath_=e,f(!y(e)&&v(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?Re(e.name,t.name):r}makePost(e,t){const s=k(e),i=m.EMPTY_NODE.updateChild(this.indexPath_,s);return new g(t,i)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,ot);return new g(ie,e)}toString(){return Mi(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol extends Ft{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Re(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return g.MIN}maxPost(){return g.MAX}makePost(e,t){const s=k(e);return new g(t,s)}toString(){return".value"}}const qi=new Ol;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(n){return{type:"value",snapshotNode:n}}function Se(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Ke(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Qe(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Ll(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(Ke(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Se(t,s)):o.trackChildChange(Qe(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(T,(i,r)=>{t.hasChild(i)||s.trackChildChange(Ke(i,r))}),t.isLeafNode()||t.forEachChild(T,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Qe(i,r,o))}else s.trackChildChange(Se(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.indexedFilter_=new Ln(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Je.getStartPost_(e),this.endPost_=Je.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new g(t,s))||(s=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=m.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(m.EMPTY_NODE);const r=this;return t.forEachChild(T,(o,a)=>{r.matches(new g(o,a))||(i=i.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Je(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new g(t,s))||(s=m.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,_)=>u(_,h)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new g(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=i.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=i.getChildAfterChild(this.index_,h,this.reverse_);const _=h==null?1:o(h,l);if(d&&!s.isEmpty()&&_>=0)return r?.trackChildChange(Qe(t,s,u)),a.updateImmediateChild(t,s);{r?.trackChildChange(Ke(t,u));const C=a.updateImmediateChild(t,m.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Se(h.name,h.node)),C.updateImmediateChild(h.name,h.node)):C}}else return s.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Ke(c.name,c.node)),r.trackChildChange(Se(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=T}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:fe}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ie}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===T}copy(){const e=new Mn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Fl(n){return n.loadsAllData()?new Ln(n.getIndex()):n.hasLimit()?new Ml(n):new Je(n)}function Bl(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function $l(n,e){const t=n.copy();return t.index_=e,t}function Ds(n){const e={};if(n.isDefault())return e;let t;if(n.index_===T?t="$priority":n.index_===qi?t="$value":n.index_===ee?t="$key":(f(n.index_ instanceof Gi,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=R(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=R(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+R(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=R(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+R(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Os(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==T&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends Di{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=rt("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=bt.getListenId_(e,s),a={};this.listens_[o]=a;const l=Ds(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),be(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",i(h,null)}})}unlisten(e,t){const s=bt.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Ds(e._queryParams),s=e._path.toString(),i=new Lt;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+co(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Ge(a.responseText)}catch{M("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&M("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(){return{value:null,children:new Map}}function Yi(n,e,t){if(y(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=v(e);n.children.has(s)||n.children.set(s,St());const i=n.children.get(s);e=b(e),Yi(i,e,t)}}function mn(n,e,t){n.value!==null?t(e,n.value):Wl(n,(s,i)=>{const r=new w(e.toString()+"/"+s);mn(i,r,t)})}function Wl(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&F(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls=10*1e3,Vl=30*1e3,jl=300*1e3;class Gl{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Hl(e);const s=Ls+(Vl-Ls)*Math.random();Be(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;F(e,(i,r)=>{r>0&&j(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),Be(this.reportStats_.bind(this),Math.floor(Math.random()*2*jl))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(W||(W={}));function Ki(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Fn(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Bn(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=W.ACK_USER_WRITE,this.source=Ki()}operationForChild(e){if(y(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new w(e));return new Tt(E(),t,this.revert)}}else return f(v(this.path)===e,"operationForChild called for unrelated child."),new Tt(b(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,t){this.source=e,this.path=t,this.type=W.LISTEN_COMPLETE}operationForChild(e){return y(this.path)?new Xe(this.source,E()):new Xe(this.source,b(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=W.OVERWRITE}operationForChild(e){return y(this.path)?new _e(this.source,E(),this.snap.getImmediateChild(e)):new _e(this.source,b(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=W.MERGE}operationForChild(e){if(y(this.path)){const t=this.children.subtree(new w(e));return t.isEmpty()?null:t.value?new _e(this.source,E(),t.value):new Ze(this.source,E(),t)}else return f(v(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ze(this.source,b(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(y(e))return this.isFullyInitialized()&&!this.filtered_;const t=v(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function zl(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Ll(o.childName,o.snapshotNode))}),Oe(n,i,"child_removed",e,s,t),Oe(n,i,"child_added",e,s,t),Oe(n,i,"child_moved",r,s,t),Oe(n,i,"child_changed",e,s,t),Oe(n,i,"value",e,s,t),i}function Oe(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>Kl(n,a,l)),o.forEach(a=>{const l=Yl(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Yl(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Kl(n,e,t){if(e.childName==null||t.childName==null)throw Ne("Should only compare child_ events.");const s=new g(e.childName,e.snapshotNode),i=new g(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(n,e){return{eventCache:n,serverCache:e}}function $e(n,e,t,s){return Bt(new oe(e,t,s),n.serverCache)}function Qi(n,e,t,s){return Bt(n.eventCache,new oe(e,t,s))}function Nt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function pe(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn;const Ql=()=>(nn||(nn=new L(La)),nn);class S{static fromObject(e){let t=new S(null);return F(e,(s,i)=>{t=t.set(new w(s),i)}),t}constructor(e,t=Ql()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(y(e))return null;{const s=v(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(b(e),t);return r!=null?{path:A(new w(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(y(e))return this;{const t=v(e),s=this.children.get(t);return s!==null?s.subtree(b(e)):new S(null)}}set(e,t){if(y(e))return new S(t,this.children);{const s=v(e),r=(this.children.get(s)||new S(null)).set(b(e),t),o=this.children.insert(s,r);return new S(this.value,o)}}remove(e){if(y(e))return this.children.isEmpty()?new S(null):new S(null,this.children);{const t=v(e),s=this.children.get(t);if(s){const i=s.remove(b(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new S(null):new S(this.value,r)}else return this}}get(e){if(y(e))return this.value;{const t=v(e),s=this.children.get(t);return s?s.get(b(e)):null}}setTree(e,t){if(y(e))return t;{const s=v(e),r=(this.children.get(s)||new S(null)).setTree(b(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new S(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(A(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(y(e))return null;{const r=v(e),o=this.children.get(r);return o?o.findOnPath_(b(e),A(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,s){if(y(e))return this;{this.value&&s(t,this.value);const i=v(e),r=this.children.get(i);return r?r.foreachOnPath_(b(e),A(t,i),s):new S(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(A(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e){this.writeTree_=e}static empty(){return new H(new S(null))}}function Ue(n,e,t){if(y(e))return new H(new S(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=O(i,e);return r=r.updateChild(o,t),new H(n.writeTree_.set(i,r))}else{const i=new S(t),r=n.writeTree_.setTree(e,i);return new H(r)}}}function Ms(n,e,t){let s=n;return F(t,(i,r)=>{s=Ue(s,A(e,i),r)}),s}function Fs(n,e){if(y(e))return H.empty();{const t=n.writeTree_.setTree(e,new S(null));return new H(t)}}function gn(n,e){return ge(n,e)!=null}function ge(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(O(t.path,e)):null}function Bs(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(T,(s,i)=>{e.push(new g(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new g(s,i.value))}),e}function te(n,e){if(y(e))return n;{const t=ge(n,e);return t!=null?new H(new S(t)):new H(n.writeTree_.subtree(e))}}function yn(n){return n.writeTree_.isEmpty()}function Te(n,e){return Ji(E(),n.writeTree_,e)}function Ji(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=Ji(A(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(A(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(n,e){return tr(e,n)}function Jl(n,e,t,s,i){f(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=Ue(n.visibleWrites,e,t)),n.lastWriteId=s}function Xl(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function Zl(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&ec(a,s.path)?i=!1:U(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return tc(n),!0;if(s.snap)n.visibleWrites=Fs(n.visibleWrites,s.path);else{const a=s.children;F(a,l=>{n.visibleWrites=Fs(n.visibleWrites,A(s.path,l))})}return!0}else return!1}function ec(n,e){if(n.snap)return U(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&U(A(n.path,t),e))return!0;return!1}function tc(n){n.visibleWrites=Xi(n.allWrites,nc,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function nc(n){return n.visible}function Xi(n,e,t){let s=H.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)U(t,o)?(a=O(t,o),s=Ue(s,a,r.snap)):U(o,t)&&(a=O(o,t),s=Ue(s,E(),r.snap.getChild(a)));else if(r.children){if(U(t,o))a=O(t,o),s=Ms(s,a,r.children);else if(U(o,t))if(a=O(o,t),y(a))s=Ms(s,E(),r.children);else{const l=be(r.children,v(a));if(l){const c=l.getChild(b(a));s=Ue(s,E(),c)}}}else throw Ne("WriteRecord should have .snap or .children")}}return s}function Zi(n,e,t,s,i){if(!s&&!i){const r=ge(n.visibleWrites,e);if(r!=null)return r;{const o=te(n.visibleWrites,e);if(yn(o))return t;if(t==null&&!gn(o,E()))return null;{const a=t||m.EMPTY_NODE;return Te(o,a)}}}else{const r=te(n.visibleWrites,e);if(!i&&yn(r))return t;if(!i&&t==null&&!gn(r,E()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(U(c.path,e)||U(e,c.path))},a=Xi(n.allWrites,o,e),l=t||m.EMPTY_NODE;return Te(a,l)}}}function sc(n,e,t){let s=m.EMPTY_NODE;const i=ge(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(T,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=te(n.visibleWrites,e);return t.forEachChild(T,(o,a)=>{const l=Te(te(r,new w(o)),a);s=s.updateImmediateChild(o,l)}),Bs(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=te(n.visibleWrites,e);return Bs(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function ic(n,e,t,s,i){f(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=A(e,t);if(gn(n.visibleWrites,r))return null;{const o=te(n.visibleWrites,r);return yn(o)?i.getChild(t):Te(o,i.getChild(t))}}function rc(n,e,t,s){const i=A(e,t),r=ge(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=te(n.visibleWrites,i);return Te(o,s.getNode().getImmediateChild(t))}else return null}function oc(n,e){return ge(n.visibleWrites,e)}function ac(n,e,t,s,i,r,o){let a;const l=te(n.visibleWrites,e),c=ge(l,E());if(c!=null)a=c;else if(t!=null)a=Te(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let _=h.getNext();for(;_&&d.length<i;)u(_,s)!==0&&d.push(_),_=h.getNext();return d}else return[]}function lc(){return{visibleWrites:H.empty(),allWrites:[],lastWriteId:-1}}function Rt(n,e,t,s){return Zi(n.writeTree,n.treePath,e,t,s)}function $n(n,e){return sc(n.writeTree,n.treePath,e)}function $s(n,e,t,s){return ic(n.writeTree,n.treePath,e,t,s)}function At(n,e){return oc(n.writeTree,A(n.treePath,e))}function cc(n,e,t,s,i,r){return ac(n.writeTree,n.treePath,e,t,s,i,r)}function Un(n,e,t){return rc(n.writeTree,n.treePath,e,t)}function er(n,e){return tr(A(n.treePath,e),n.writeTree)}function tr(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,Qe(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,Ke(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,Se(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,Qe(s,e.snapshotNode,i.oldSnap));else throw Ne("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const nr=new uc;class Wn{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new oe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Un(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:pe(this.viewCache_),r=cc(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dc(n){return{filter:n}}function fc(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function _c(n,e,t,s,i){const r=new hc;let o,a;if(t.type===W.OVERWRITE){const c=t;c.source.fromUser?o=vn(n,e,c.path,c.snap,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!y(c.path),o=xt(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===W.MERGE){const c=t;c.source.fromUser?o=mc(n,e,c.path,c.children,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=En(n,e,c.path,c.children,s,i,a,r))}else if(t.type===W.ACK_USER_WRITE){const c=t;c.revert?o=vc(n,e,c.path,s,i,r):o=gc(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===W.LISTEN_COMPLETE)o=yc(n,e,t.path,s,r);else throw Ne("Unknown operation type: "+t.type);const l=r.getChanges();return pc(e,o,l),{viewCache:o,changes:l}}function pc(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Nt(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(zi(Nt(e)))}}function sr(n,e,t,s,i,r){const o=e.eventCache;if(At(s,t)!=null)return e;{let a,l;if(y(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=pe(e),d=c instanceof m?c:m.EMPTY_NODE,u=$n(s,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Rt(s,pe(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=v(t);if(c===".priority"){f(re(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=$s(s,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=b(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=$s(s,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=Un(s,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,i,r):a=o.getNode()}}return $e(e,a,o.isFullyInitialized()||y(t),n.filter.filtersNodes())}}function xt(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(y(t))c=d.updateFullNode(l.getNode(),s,null);else if(d.filtersNodes()&&!l.isFiltered()){const _=l.getNode().updateChild(t,s);c=d.updateFullNode(l.getNode(),_,null)}else{const _=v(t);if(!l.isCompleteForPath(t)&&re(t)>1)return e;const p=b(t),N=l.getNode().getImmediateChild(_).updateChild(p,s);_===".priority"?c=d.updatePriority(l.getNode(),N):c=d.updateChild(l.getNode(),_,N,p,nr,null)}const u=Qi(e,c,l.isFullyInitialized()||y(t),d.filtersNodes()),h=new Wn(i,u,r);return sr(n,u,t,i,h,a)}function vn(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const d=new Wn(i,e,r);if(y(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=$e(e,c,!0,n.filter.filtersNodes());else{const u=v(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=$e(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=b(t),_=a.getNode().getImmediateChild(u);let p;if(y(h))p=s;else{const C=d.getCompleteChild(u);C!=null?Li(h)===".priority"&&C.getChild(Fi(h)).isEmpty()?p=C:p=C.updateChild(h,s):p=m.EMPTY_NODE}if(_.equals(p))l=e;else{const C=n.filter.updateChild(a.getNode(),u,p,h,d,o);l=$e(e,C,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Us(n,e){return n.eventCache.isCompleteForChild(e)}function mc(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const d=A(t,l);Us(e,v(d))&&(a=vn(n,a,d,c,i,r,o))}),s.foreach((l,c)=>{const d=A(t,l);Us(e,v(d))||(a=vn(n,a,d,c,i,r,o))}),a}function Ws(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function En(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;y(t)?c=s:c=new S(null).setTree(t,s);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const _=e.serverCache.getNode().getImmediateChild(u),p=Ws(n,_,h);l=xt(n,l,new w(u),p,i,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const _=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!_){const p=e.serverCache.getNode().getImmediateChild(u),C=Ws(n,p,h);l=xt(n,l,new w(u),C,i,r,o,a)}}),l}function gc(n,e,t,s,i,r,o){if(At(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(y(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return xt(n,e,t,l.getNode().getChild(t),i,r,a,o);if(y(t)){let c=new S(null);return l.getNode().forEachChild(ee,(d,u)=>{c=c.set(new w(d),u)}),En(n,e,t,c,i,r,a,o)}else return e}else{let c=new S(null);return s.foreach((d,u)=>{const h=A(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),En(n,e,t,c,i,r,a,o)}}function yc(n,e,t,s,i){const r=e.serverCache,o=Qi(e,r.getNode(),r.isFullyInitialized()||y(t),r.isFiltered());return sr(n,o,t,s,nr,i)}function vc(n,e,t,s,i,r){let o;if(At(s,t)!=null)return e;{const a=new Wn(s,e,i),l=e.eventCache.getNode();let c;if(y(t)||v(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=Rt(s,pe(e));else{const u=e.serverCache.getNode();f(u instanceof m,"serverChildren would be complete if leaf node"),d=$n(s,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=v(t);let u=Un(s,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,b(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,m.EMPTY_NODE,b(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Rt(s,pe(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||At(s,E())!=null,$e(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Ln(s.getIndex()),r=Fl(s);this.processor_=dc(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),d=new oe(l,o.isFullyInitialized(),i.filtersNodes()),u=new oe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Bt(u,d),this.eventGenerator_=new ql(this.query_)}get query(){return this.query_}}function Cc(n){return n.viewCache_.serverCache.getNode()}function wc(n){return Nt(n.viewCache_)}function Ic(n,e){const t=pe(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!y(e)&&!t.getImmediateChild(v(e)).isEmpty())?t.getChild(e):null}function Hs(n){return n.eventRegistrations_.length===0}function bc(n,e){n.eventRegistrations_.push(e)}function Vs(n,e,t){const s=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function js(n,e,t,s){e.type===W.MERGE&&e.source.queryId!==null&&(f(pe(n.viewCache_),"We should always have a full cache before handling merges"),f(Nt(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=_c(n.processor_,i,e,t,s);return fc(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,ir(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Sc(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(T,(r,o)=>{s.push(Se(r,o))}),t.isFullyInitialized()&&s.push(zi(t.getNode())),ir(n,s,t.getNode(),e)}function ir(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return zl(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pt;class rr{constructor(){this.views=new Map}}function Tc(n){f(!Pt,"__referenceConstructor has already been defined"),Pt=n}function Nc(){return f(Pt,"Reference.ts has not been loaded"),Pt}function Rc(n){return n.views.size===0}function Hn(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return f(r!=null,"SyncTree gave us an op for an invalid query."),js(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(js(o,e,t,s));return r}}function or(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Rt(t,i?s:null),l=!1;a?l=!0:s instanceof m?(a=$n(t,s),l=!1):(a=m.EMPTY_NODE,l=!1);const c=Bt(new oe(a,l,!1),new oe(s,i,!1));return new Ec(e,c)}return o}function Ac(n,e,t,s,i,r){const o=or(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),bc(o,t),Sc(o,t)}function xc(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=ae(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(Vs(c,t,s)),Hs(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(Vs(l,t,s)),Hs(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ae(n)&&r.push(new(Nc())(e._repo,e._path)),{removed:r,events:o}}function ar(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ne(n,e){let t=null;for(const s of n.views.values())t=t||Ic(s,e);return t}function lr(n,e){if(e._queryParams.loadsAllData())return Ut(n);{const s=e._queryIdentifier;return n.views.get(s)}}function cr(n,e){return lr(n,e)!=null}function ae(n){return Ut(n)!=null}function Ut(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kt;function Pc(n){f(!kt,"__referenceConstructor has already been defined"),kt=n}function kc(){return f(kt,"Reference.ts has not been loaded"),kt}let Dc=1;class Gs{constructor(e){this.listenProvider_=e,this.syncPointTree_=new S(null),this.pendingWriteTree_=lc(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function hr(n,e,t,s,i){return Jl(n.pendingWriteTree_,e,t,s,i),i?lt(n,new _e(Ki(),e,t)):[]}function de(n,e,t=!1){const s=Xl(n.pendingWriteTree_,e);if(Zl(n.pendingWriteTree_,e)){let r=new S(null);return s.snap!=null?r=r.set(E(),!0):F(s.children,o=>{r=r.set(new w(o),!0)}),lt(n,new Tt(s.path,r,t))}else return[]}function at(n,e,t){return lt(n,new _e(Fn(),e,t))}function Oc(n,e,t){const s=S.fromObject(t);return lt(n,new Ze(Fn(),e,s))}function Lc(n,e){return lt(n,new Xe(Fn(),e))}function Mc(n,e,t){const s=jn(n,t);if(s){const i=Gn(s),r=i.path,o=i.queryId,a=O(r,e),l=new Xe(Bn(o),a);return qn(n,r,l)}else return[]}function ur(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||cr(o,e))){const l=xc(o,e,t,s);Rc(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,_)=>ae(_));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const _=Uc(h);for(let p=0;p<_.length;++p){const C=_[p],N=C.query,G=pr(n,C);n.listenProvider_.startListening(We(N),et(n,N),G.hashFn,G.onComplete)}}}!u&&c.length>0&&!s&&(d?n.listenProvider_.stopListening(We(e),null):c.forEach(h=>{const _=n.queryToTagMap.get(Wt(h));n.listenProvider_.stopListening(We(h),_)}))}Wc(n,c)}return a}function dr(n,e,t,s){const i=jn(n,s);if(i!=null){const r=Gn(i),o=r.path,a=r.queryId,l=O(o,e),c=new _e(Bn(a),l,t);return qn(n,o,c)}else return[]}function Fc(n,e,t,s){const i=jn(n,s);if(i){const r=Gn(i),o=r.path,a=r.queryId,l=O(o,e),c=S.fromObject(t),d=new Ze(Bn(a),l,c);return qn(n,o,d)}else return[]}function Bc(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(h,_)=>{const p=O(h,i);r=r||ne(_,p),o=o||ae(_)});let a=n.syncPointTree_.get(i);a?(o=o||ae(a),r=r||ne(a,E())):(a=new rr,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((_,p)=>{const C=ne(p,E());C&&(r=r.updateImmediateChild(_,C))}));const c=cr(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=Wt(e);f(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const _=Hc();n.queryToTagMap.set(h,_),n.tagToQueryMap.set(_,h)}const d=$t(n.pendingWriteTree_,i);let u=Ac(a,e,t,d,r,l);if(!c&&!o&&!s){const h=lr(a,e);u=u.concat(Vc(n,e,h))}return u}function Vn(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=O(o,e),c=ne(a,l);if(c)return c});return Zi(i,e,r,t,!0)}function $c(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=O(c,t);s=s||ne(d,u)});let i=n.syncPointTree_.get(t);i?s=s||ne(i,E()):(i=new rr,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new oe(s,!0,!1):null,a=$t(n.pendingWriteTree_,e._path),l=or(i,e,a,r?o.getNode():m.EMPTY_NODE,r);return wc(l)}function lt(n,e){return fr(e,n.syncPointTree_,null,$t(n.pendingWriteTree_,E()))}function fr(n,e,t,s){if(y(n.path))return _r(n,e,t,s);{const i=e.get(E());t==null&&i!=null&&(t=ne(i,E()));let r=[];const o=v(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=er(s,o);r=r.concat(fr(a,l,c,d))}return i&&(r=r.concat(Hn(i,n,s,t))),r}}function _r(n,e,t,s){const i=e.get(E());t==null&&i!=null&&(t=ne(i,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=er(s,o),d=n.operationForChild(o);d&&(r=r.concat(_r(d,a,l,c)))}),i&&(r=r.concat(Hn(i,n,s,t))),r}function pr(n,e){const t=e.query,s=et(n,t);return{hashFn:()=>(Cc(e)||m.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Mc(n,t._path,s):Lc(n,t._path);{const r=Ba(i,t);return ur(n,t,null,r)}}}}function et(n,e){const t=Wt(e);return n.queryToTagMap.get(t)}function Wt(n){return n._path.toString()+"$"+n._queryIdentifier}function jn(n,e){return n.tagToQueryMap.get(e)}function Gn(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new w(n.substr(0,e))}}function qn(n,e,t){const s=n.syncPointTree_.get(e);f(s,"Missing sync point for query tag that we're tracking");const i=$t(n.pendingWriteTree_,e);return Hn(s,t,i,null)}function Uc(n){return n.fold((e,t,s)=>{if(t&&ae(t))return[Ut(t)];{let i=[];return t&&(i=ar(t)),F(s,(r,o)=>{i=i.concat(o)}),i}})}function We(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(kc())(n._repo,n._path):n}function Wc(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=Wt(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function Hc(){return Dc++}function Vc(n,e,t){const s=e._path,i=et(n,e),r=pr(n,t),o=n.listenProvider_.startListening(We(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)f(!ae(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!y(c)&&d&&ae(d))return[Ut(d).query];{let h=[];return d&&(h=h.concat(ar(d).map(_=>_.query))),F(u,(_,p)=>{h=h.concat(p)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(We(d),et(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new zn(t)}node(){return this.node_}}class Yn{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=A(this.path_,e);return new Yn(this.syncTree_,t)}node(){return Vn(this.syncTree_,this.path_)}}const jc=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},qs=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Gc(n[".sv"],e,t);if(typeof n[".sv"]=="object")return qc(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Gc=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},qc=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&f(!1,"Unexpected increment value: "+s);const i=e.node();if(f(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},zc=function(n,e,t,s){return Kn(e,new Yn(t,n),s)},mr=function(n,e,t){return Kn(n,new zn(e),t)};function Kn(n,e,t){const s=n.getPriority().val(),i=qs(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=qs(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new x(a,k(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new x(i))),o.forEachChild(T,(a,l)=>{const c=Kn(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function Jn(n,e){let t=e instanceof w?e:new w(e),s=n,i=v(t);for(;i!==null;){const r=be(s.node.children,i)||{children:{},childCount:0};s=new Qn(i,s,r),t=b(t),i=v(t)}return s}function xe(n){return n.node.value}function gr(n,e){n.node.value=e,Cn(n)}function yr(n){return n.node.childCount>0}function Yc(n){return xe(n)===void 0&&!yr(n)}function Ht(n,e){F(n.node.children,(t,s)=>{e(new Qn(t,n,s))})}function vr(n,e,t,s){t&&e(n),Ht(n,i=>{vr(i,e,!0)})}function Kc(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function ct(n){return new w(n.parent===null?n.name:ct(n.parent)+"/"+n.name)}function Cn(n){n.parent!==null&&Qc(n.parent,n.name,n)}function Qc(n,e,t){const s=Yc(t),i=j(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Cn(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Cn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc=/[\[\].#$\/\u0000-\u001F\u007F]/,Xc=/[\[\].#$\u0000-\u001F\u007F]/,sn=10*1024*1024,Er=function(n){return typeof n=="string"&&n.length!==0&&!Jc.test(n)},Cr=function(n){return typeof n=="string"&&n.length!==0&&!Xc.test(n)},Zc=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Cr(n)},zs=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Rn(n)||n&&typeof n=="object"&&j(n,".sv")},eh=function(n,e,t,s){Xn(Tn(n,"value"),e,t)},Xn=function(n,e,t){const s=t instanceof w?new gl(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+he(s));if(typeof e=="function")throw new Error(n+"contains a function "+he(s)+" with contents = "+e.toString());if(Rn(e))throw new Error(n+"contains "+e.toString()+" "+he(s));if(typeof e=="string"&&e.length>sn/3&&Mt(e)>sn)throw new Error(n+"contains a string greater than "+sn+" utf8 bytes "+he(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(F(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Er(o)))throw new Error(n+" contains an invalid key ("+o+") "+he(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);yl(s,o),Xn(n,a,s),vl(s)}),i&&r)throw new Error(n+' contains ".value" child '+he(s)+" in addition to actual children.")}},wr=function(n,e,t,s){if(!Cr(t))throw new Error(Tn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},th=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),wr(n,e,t)},Ir=function(n,e){if(v(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},nh=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Er(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Zc(t))throw new Error(Tn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function br(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!Bi(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function V(n,e,t){br(n,t),ih(n,s=>U(s,e)||U(e,s))}function ih(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(rh(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function rh(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();Fe&&D("event: "+t.toString()),Ae(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh="repo_interrupt",ah=25;class lh{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new sh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=St(),this.transactionQueueTree_=new Qn,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ch(n,e,t){if(n.stats_=Pn(n.repoInfo_),n.forceRestClient_||Ha())n.server_=new bt(n.repoInfo_,(s,i,r,o)=>{Ys(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ks(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{R(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new Y(n.repoInfo_,e,(s,i,r,o)=>{Ys(n,s,i,r,o)},s=>{Ks(n,s)},s=>{uh(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=za(n.repoInfo_,()=>new Gl(n.stats_,n.server_)),n.infoData_=new Ul,n.infoSyncTree_=new Gs({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=at(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),es(n,"connected",!1),n.serverSyncTree_=new Gs({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);V(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function hh(n){const t=n.infoData_.getNode(new w(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Zn(n){return jc({timestamp:hh(n)})}function Ys(n,e,t,s,i){n.dataUpdateCount++;const r=new w(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=gt(t,c=>k(c));o=Fc(n.serverSyncTree_,r,l,i)}else{const l=k(t);o=dr(n.serverSyncTree_,r,l,i)}else if(s){const l=gt(t,c=>k(c));o=Oc(n.serverSyncTree_,r,l)}else{const l=k(t);o=at(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=jt(n,r)),V(n.eventQueue_,a,o)}function Ks(n,e){es(n,"connected",e),e===!1&&_h(n)}function uh(n,e){F(e,(t,s)=>{es(n,t,s)})}function es(n,e,t){const s=new w("/.info/"+e),i=k(t);n.infoData_.updateSnapshot(s,i);const r=at(n.infoSyncTree_,s,i);V(n.eventQueue_,s,r)}function Sr(n){return n.nextWriteId_++}function dh(n,e,t){const s=$c(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=k(i).withIndex(e._queryParams.getIndex());Bc(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=at(n.serverSyncTree_,e._path,r);else{const a=et(n.serverSyncTree_,e);o=dr(n.serverSyncTree_,e._path,r,a)}return V(n.eventQueue_,e._path,o),ur(n.serverSyncTree_,e,t,null,!0),r},i=>(Vt(n,"get for query "+R(e)+" failed: "+i),Promise.reject(new Error(i))))}function fh(n,e,t,s,i){Vt(n,"set",{path:e.toString(),value:t,priority:s});const r=Zn(n),o=k(t,s),a=Vn(n.serverSyncTree_,e),l=mr(o,a,r),c=Sr(n),d=hr(n.serverSyncTree_,e,l,c,!0);br(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,_)=>{const p=h==="ok";p||M("set at "+e+" failed: "+h);const C=de(n.serverSyncTree_,c,!p);V(n.eventQueue_,e,C),mh(n,i,h,_)});const u=xr(n,e);jt(n,u),V(n.eventQueue_,u,[])}function _h(n){Vt(n,"onDisconnectEvents");const e=Zn(n),t=St();mn(n.onDisconnect_,E(),(i,r)=>{const o=zc(i,r,n.serverSyncTree_,e);Yi(t,i,o)});let s=[];mn(t,E(),(i,r)=>{s=s.concat(at(n.serverSyncTree_,i,r));const o=xr(n,i);jt(n,o)}),n.onDisconnect_=St(),V(n.eventQueue_,E(),s)}function ph(n){n.persistentConnection_&&n.persistentConnection_.interrupt(oh)}function Vt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),D(t,...e)}function mh(n,e,t,s){e&&Ae(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Tr(n,e,t){return Vn(n.serverSyncTree_,e,t)||m.EMPTY_NODE}function ts(n,e=n.transactionQueueTree_){if(e||Gt(n,e),xe(e)){const t=Rr(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&gh(n,ct(e),t)}else yr(e)&&Ht(e,t=>{ts(n,t)})}function gh(n,e,t){const s=t.map(c=>c.currentWriteId),i=Tr(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const d=t[c];f(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=O(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Vt(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(de(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();Gt(n,Jn(n.transactionQueueTree_,e)),ts(n,n.transactionQueueTree_),V(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)Ae(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{M("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}jt(n,e)}},o)}function jt(n,e){const t=Nr(n,e),s=ct(t),i=Rr(n,t);return yh(n,i,s),s}function yh(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=O(t,l.path);let d=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,i=i.concat(de(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=ah)d=!0,u="maxretry",i=i.concat(de(n.serverSyncTree_,l.currentWriteId,!0));else{const h=Tr(n,l.path,o);l.currentInputSnapshot=h;const _=e[a].update(h.val());if(_!==void 0){Xn("transaction failed: Data returned ",_,l.path);let p=k(_);typeof _=="object"&&_!=null&&j(_,".priority")||(p=p.updatePriority(h.getPriority()));const N=l.currentWriteId,G=Zn(n),q=mr(p,h,G);l.currentOutputSnapshotRaw=p,l.currentOutputSnapshotResolved=q,l.currentWriteId=Sr(n),o.splice(o.indexOf(N),1),i=i.concat(hr(n.serverSyncTree_,l.path,q,l.currentWriteId,l.applyLocally)),i=i.concat(de(n.serverSyncTree_,N,!0))}else d=!0,u="nodata",i=i.concat(de(n.serverSyncTree_,l.currentWriteId,!0))}V(n.eventQueue_,t,i),i=[],d&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}Gt(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)Ae(s[a]);ts(n,n.transactionQueueTree_)}function Nr(n,e){let t,s=n.transactionQueueTree_;for(t=v(e);t!==null&&xe(s)===void 0;)s=Jn(s,t),e=b(e),t=v(e);return s}function Rr(n,e){const t=[];return Ar(n,e,t),t.sort((s,i)=>s.order-i.order),t}function Ar(n,e,t){const s=xe(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);Ht(e,i=>{Ar(n,i,t)})}function Gt(n,e){const t=xe(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,gr(e,t.length>0?t:void 0)}Ht(e,s=>{Gt(n,s)})}function xr(n,e){const t=ct(Nr(n,e)),s=Jn(n.transactionQueueTree_,e);return Kc(s,i=>{rn(n,i)}),rn(n,s),vr(s,i=>{rn(n,i)}),t}function rn(n,e){const t=xe(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(de(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?gr(e,void 0):t.length=r+1,V(n.eventQueue_,ct(e),i);for(let o=0;o<s.length;o++)Ae(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function Eh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):M(`Invalid query segment '${t}' in query '${n}'`)}return e}const Qs=function(n,e){const t=Ch(n),s=t.namespace;t.domain==="firebase.com"&&Q(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&Q("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Da();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ti(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new w(t.pathString)}},Ch=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(i=vh(n.substring(d,u)));const h=Eh(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")t="localhost";else if(_.split(".").length<=2)t=_;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),t=e.substring(p+1),r=s}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+R(this.snapshot.exportVal())}}class Ih{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return y(this._path)?null:Li(this._path)}get ref(){return new J(this._repo,this._path)}get _queryIdentifier(){const e=Os(this._queryParams),t=An(e);return t==="{}"?"default":t}get _queryObject(){return Os(this._queryParams)}isEqual(e){if(e=me(e),!(e instanceof ht))return!1;const t=this._repo===e._repo,s=Bi(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+ml(this._path)}}function Sh(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function Th(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===ee){const s="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==fe)throw new Error(s);if(typeof e!="string")throw new Error(i)}if(n.hasEnd()){if(n.getIndexEndName()!==ie)throw new Error(s);if(typeof t!="string")throw new Error(i)}}else if(n.getIndex()===T){if(e!=null&&!zs(e)||t!=null&&!zs(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(f(n.getIndex()instanceof Gi||n.getIndex()===qi,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}class J extends ht{constructor(e,t){super(e,t,new Mn,!1)}get parent(){const e=Fi(this._path);return e===null?null:new J(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class tt{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new w(e),s=Dt(this.ref,e);return new tt(this._node.getChild(t),s,T)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new tt(i,Dt(this.ref,s),T)))}hasChild(e){const t=new w(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Ie(n,e){return n=me(n),n._checkNotDeleted("ref"),e!==void 0?Dt(n._root,e):n._root}function Dt(n,e){return n=me(n),v(n._path)===null?th("child","path",e):wr("child","path",e),new J(n._repo,A(n._path,e))}function Nh(n){return Ir("remove",n._path),Rh(n,null)}function Rh(n,e){n=me(n),Ir("set",n._path),eh("set",e,n._path);const t=new Lt;return fh(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Ot(n){n=me(n);const e=new bh(()=>{}),t=new ns(e);return dh(n._repo,n,t).then(s=>new tt(s,new J(n._repo,n._path),n._queryParams.getIndex()))}class ns{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new wh("value",this,new tt(e.snapshotNode,new J(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ih(this,e,t):null}matches(e){return e instanceof ns?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Pr{}class Ah extends Pr{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new ht(e._repo,e._path,Bl(e._queryParams,this._limit),e._orderByCalled)}}function xh(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new Ah(n)}class Ph extends Pr{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){Sh(e,"orderByKey");const t=$l(e._queryParams,ee);return Th(t),new ht(e._repo,e._path,t,!0)}}function kh(){return new Ph}function Dh(n,...e){let t=me(n);for(const s of e)t=s._apply(t);return t}Tc(J);Pc(J);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh="FIREBASE_DATABASE_EMULATOR_HOST",wn={};let Lh=!1;function Mh(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=Sn(r);n.repoInfo_=new Ti(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function Fh(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||Q("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),D("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Qs(r,i),a=o.repoInfo,l;typeof process<"u"&&ms&&(l=ms[Oh]),l?(r=`http://${l}?ns=${a.namespace}`,o=Qs(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new ja(n.name,n.options,e);nh("Invalid Firebase Database URL",o),y(o.path)||Q("Database URL must point to the root of a Firebase Database (not including a child path).");const d=$h(a,n,c,new Va(n,t));return new Uh(d,n)}function Bh(n,e){const t=wn[e];(!t||t[n.key]!==n)&&Q(`Database ${e}(${n.repoInfo_}) has already been deleted.`),ph(n),delete t[n.key]}function $h(n,e,t,s){let i=wn[e.name];i||(i={},wn[e.name]=i);let r=i[n.toURLString()];return r&&Q("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new lh(n,Lh,t,s),i[n.toURLString()]=r,r}class Uh{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ch(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new J(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Bh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Q("Cannot call "+e+" on a deleted database.")}}function Wh(n=_a(),e){const t=ca(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=zr("database");s&&Hh(t,...s)}return t}function Hh(n,e,t,s={}){n=me(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&yt(s,r.repoInfo_.emulatorOptions))return;Q("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&Q('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new pt(pt.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Kr(s.mockUserToken,n.app.options.projectId);o=new pt(a)}Sn(e)&&(Yr(e),Xr("Database",!0)),Mh(r,i,s,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vh(n){Na(fa),Et(new qe("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Fh(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),Ce(gs,ys,n),Ce(gs,ys,"esm2020")}Y.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Y.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Vh();let on=null,se=null;function qt(){return on||(on=ci(Mr,"viewerApp"),se=Wh(on),console.log("[FirebaseService] Initialized app and database")),se}function He(n){return n.filter(Boolean).join("/")}function jh(n){if(!n)return n;console.log("[FirebaseService] Processing index key:",n);const e=n.indexOf("_");if(e>0){const t=n.slice(0,e),s=n.slice(e+1);return console.log("[FirebaseService] Key has underscore, prefix:",t,"suffix:",s),/^\d+$/.test(t)?(console.log("[FirebaseService] Prefix is timestamp, returning suffix:",s),s):(console.log("[FirebaseService] Prefix is not timestamp, returning full key:",n),n)}return console.log("[FirebaseService] No underscore, returning key as-is:",n),n}async function kr(n,e=200){qt(),console.log("[FirebaseService] Query index:",n,"limit:",e);const t=Ie(se,He([Le,In,n])),s=Dh(t,kh(),xh(e)),i=await Ot(s),r=i.exists()?Object.keys(i.val()):[];if(console.log("[FirebaseService] Index IDs count:",r.length),console.log("[FirebaseService] First few index IDs:",r.slice(0,5)),r.length===0)return console.warn("[FirebaseService] No index entries found for path:",n),[];const o=r.map(jh);console.log("[FirebaseService] Extracted logIds (first 5):",o.slice(0,5));const a=Ie(se,He([Le,ss])),l=o.map(h=>Ot(Dt(a,h))),c=await Promise.allSettled(l),d=c.filter(h=>h.status==="rejected");d.length>0&&console.warn("[FirebaseService] Failed to read entries:",d.length,"out of",c.length);const u=c.filter(h=>h.status==="fulfilled"&&h.value.exists()).map(h=>({...h.value.val(),logId:h.value.key})).sort((h,_)=>h.ts-_.ts);if(console.log("[FirebaseService] Entries fetched:",u.length),console.log("[FirebaseService] Sample entry:",u[0]),u.length===0&&/\/\d{4}-\d{2}-\d{2}$/.test(n)){const h=n.split("/"),_=h[h.length-1];Ie(se,He([Le,ss])),console.warn("[FirebaseService] Index appears stale (no entries found). Verify entries/{logId} exist for",_)}return u}async function Gh(n={},e=200){const t=(n.project||je).trim();console.log("[FirebaseService] Project used as-is:",t);const s=(n.server||"").trim(),i=(n.platform||"").trim(),r=(n.date||"").trim(),o=(n.userId||"").trim();console.log("[FirebaseService] Input filters:",{project:t,server:s,platform:i,date:r,userId:o,originalFilters:n});let a="";if(t&&s&&i&&r)a=`${B.BY_PROJ_SRV_PLAT_DATE}/${t}/${s}/${i}/${r}`;else if(t&&s&&r)a=`${B.BY_PROJECT_SERVER_DATE}/${t}/${s}/${r}`;else if(t&&i&&r)a=`${B.BY_PROJECT_PLATFORM_DATE}/${t}/${i}/${r}`;else if(t&&o&&r)a=`${B.BY_PROJECT_USER_DATE}/${t}/${o}/${r}`;else if(t&&r)a=`${B.BY_PROJECT_DATE}/${t}/${r}`;else if(o&&r)a=`${B.BY_USER_DATE}/${o}/${r}`;else if(o&&!r)a=`${B.BY_USER}/${o}`;else if(t&&s&&i&&!r)a=`${B.BY_PROJECT_SERVER_PLATFORM}/${t}/${s}/${i}`;else if(t&&s&&!i)a=`${B.BY_PROJECT_SERVER}/${t}/${s}`;else if(t&&i&&!s)a=`${B.BY_PROJECT_PLATFORM}/${t}/${i}`;else if(t)a=`${B.BY_PROJECT}/${t}`;else return console.warn("[FirebaseService] No suitable index for filters",n),[];console.log("[FirebaseService] Using indexPath:",a);const l=await kr(a,e).catch(h=>{throw console.error("[FirebaseService] fetchByIndexPath error:",h),h}),c=(n.nickname||"").trim().toLowerCase(),d=(n.message||"").trim().toLowerCase();let u=l;return c&&(u=u.filter(h=>(h.nickname||"").toLowerCase().includes(c))),d&&(u=u.filter(h=>(h.message||"").toLowerCase().includes(d))),console.log("[FirebaseService] After client filters:",u.length),u}async function ft(n,e=je){const t=await kr(`${B.BY_PROJECT}/${e}`,500),s=new Set(t.map(i=>i[n]).filter(Boolean));return Array.from(s).sort()}async function qh(){qt();const n=Ie(se,He([Le,In,B.BY_PROJECT])),e=await Ot(n);return e.exists()?Object.keys(e.val()).sort():[]}async function _t(n=""){qt();const e=He([Le,In,n]);console.log("[FirebaseService] Debug: checking indexes at path:",e);try{const t=Ie(se,e),s=await Ot(t);if(s.exists()){const i=s.val();return console.log("[FirebaseService] Debug: found indexes:",Object.keys(i)),i}else return console.log("[FirebaseService] Debug: no indexes found at path:",e),null}catch(t){return console.error("[FirebaseService] Debug: error checking indexes:",t),null}}async function zh(n){if(!n||typeof n!="string")throw new Error("Path is required");const e=n.replace(/^\/+/,"").trim();if(!e)throw new Error("Path cannot be empty");qt();const t=Ie(se,e);await Nh(t)}class Yh{constructor(){this.el={project:document.getElementById("project"),projectSelect:document.getElementById("projectSelect"),server:document.getElementById("server"),serverText:document.getElementById("serverText"),platform:document.getElementById("platform"),platformText:document.getElementById("platformText"),date:document.getElementById("date"),userId:document.getElementById("userId"),nickname:document.getElementById("nickname"),message:document.getElementById("message"),limit:document.getElementById("limit"),apply:document.getElementById("btn-apply"),clear:document.getElementById("btn-clear")},this.el.project.value=je}async loadInitialOptions(){const e=this._getProject(),[t,s,i]=await Promise.all([qh().catch(()=>[]),ft("server",e),ft("platform",e)]);this._fillSelect(this.el.projectSelect,t),this._fillSelect(this.el.server,s),this._fillSelect(this.el.platform,i),this.el.projectSelect.addEventListener("change",()=>{this.el.projectSelect.value&&(this.el.project.value=this.el.projectSelect.value),this.refreshServerPlatform()})}async refreshServerPlatform(){const e=this._getProject(),[t,s]=await Promise.all([ft("server",e),ft("platform",e)]);this._fillSelect(this.el.server,t),this._fillSelect(this.el.platform,s)}_fillSelect(e,t){e.innerHTML='<option value="">Any</option>'+t.map(s=>`<option value="${s}">${s}</option>`).join("")}getFilters(){const e=this._getProject(),t=this.el.serverText.value.trim()||this.el.server.value.trim(),s=this.el.platformText.value.trim()||this.el.platform.value.trim();return{project:e,server:t,platform:s,date:this.el.date.value.trim(),userId:this.el.userId.value.trim(),nickname:this.el.nickname.value.trim(),message:this.el.message.value.trim(),limit:Number(this.el.limit.value)||200}}_getProject(){return(this.el.project.value||this.el.projectSelect.value||je).trim()}onApply(e){this.el.apply.addEventListener("click",e)}onClear(e){this.el.clear.addEventListener("click",()=>{this.el.server.value="",this.el.platform.value="",this.el.date.value="",this.el.userId.value="",this.el.nickname.value="",this.el.message.value="",e()})}}function Kh(n,e="logs.json"){const t=JSON.stringify(n,null,2),s=new Blob([t],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=e,i.click(),URL.revokeObjectURL(i.href)}function Qh(n,e="logs.csv"){if(n.length===0){alert("No logs to export");return}const s=[["Timestamp","Server","Platform","Date","User ID","Nickname","Message","Project","Sequence","Log ID"].join(","),...n.map(o=>[`"${Ve(o.ts||o.timestamp)||""}"`,`"${o.server||""}"`,`"${o.platform||""}"`,`"${o.date||""}"`,`"${o.userId||""}"`,`"${o.nickname||""}"`,`"${(o.message||"").replace(/"/g,'""')}"`,`"${o.project||""}"`,`"${o.seq||""}"`,`"${o.logId||""}"`].join(","))].join(`
`),i=new Blob([s],{type:"text/csv;charset=utf-8;"}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=e,r.click(),URL.revokeObjectURL(r.href)}function Jh(n,e="logs.txt"){if(n.length===0){alert("No logs to export");return}const t=n.map(r=>`[${Ve(r.ts||r.timestamp)||"N/A"}] ${r.nickname||"Unknown"}: ${r.message||""}
  Server: ${r.server||"N/A"} | Platform: ${r.platform||"N/A"} | Date: ${r.date||"N/A"} | User ID: ${r.userId||"N/A"}
  Project: ${r.project||"N/A"} | Sequence: ${r.seq||"N/A"} | Log ID: ${r.logId||"N/A"}
  ${"-".repeat(80)}`).join(`

`),s=new Blob([t],{type:"text/plain;charset=utf-8;"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=e,i.click(),URL.revokeObjectURL(i.href)}function Ve(n){if(!n)return"N/A";try{return(typeof n=="number"?new Date(n):new Date(n)).toLocaleString()}catch{return String(n)}}function Xh(n,e=100){return n?n.length<=e?n:n.substring(0,e)+"...":""}class Zh{constructor(e="logs-container"){this.container=document.getElementById(e),this.rows=[]}updateLogs(e=[],t=""){this.rows=e,document.getElementById("logs-count").textContent=String(e.length),this._render(t),e.length||(this.container.innerHTML='<div class="text-center text-gray-600 py-6">No logs found. Adjust filters and try again.</div>')}_render(e){if(!e){this.container.innerHTML=this._renderTable(this.rows),this._bindRowActions();return}const t={};for(const i of this.rows){const r=i[e]||"Unknown";t[r]||(t[r]=[]),t[r].push(i)}const s=[];Object.keys(t).sort().forEach(i=>{s.push(`<div class="mb-4">
        <div class="text-sm text-gray-700 font-semibold mb-2">${i} · ${t[i].length} logs</div>
        ${this._renderTable(t[i])}
      </div>`)}),this.container.innerHTML=s.join(""),this._bindRowActions()}_renderTable(e){return`<table class="w-full text-sm">
      <thead class="text-left border-b">
        <tr>
          <th class="py-3 pr-8">Time</th>
          <th class="py-3 pr-8">Server</th>
          <th class="py-3 pr-8">Platform</th>
          <th class="py-3 pr-8">Date</th>
          <th class="py-3 pr-8">User</th>
          <th class="py-3 pr-8">Nick</th>
          <th class="py-3 pr-8">Message</th>
          <th class="py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${e.map(t=>this._renderRow(t)).join("")}
      </tbody>
    </table>`}_renderRow(e){const t=(e.message||"").replace(/\n/g," "),s=Xh(t,120);return`<tr class="border-b hover:bg-gray-50">
      <td class="py-3 pr-8 whitespace-pre">${Ve(e.ts)}</td>
      <td class="py-3 pr-8">${e.server||""}</td>
      <td class="py-3 pr-8">${e.platform||""}</td>
      <td class="py-3 pr-8">${e.date||""}</td>
      <td class="py-3 pr-8 font-mono text-xs">${e.userId||""}</td>
      <td class="py-3 pr-8">${e.nickname||""}</td>
      <td class="py-3 pr-8">
        <span class="truncate">${s}</span>
        ${t.length>s.length?`<button class="ml-1 text-blue-600 hover:text-blue-800 text-xs" data-action="details" data-id="${e.logId}">more</button>`:""}
      </td>
      <td class="py-3">
        <button class="text-sm text-gray-700 hover:text-gray-600" data-action="copy" data-id="${e.logId}">Copy</button>
      </td>
    </tr>`}_bindRowActions(){this.container.querySelectorAll('[data-action="details"]').forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-id"),s=this.rows.find(i=>i.logId===t);s&&this._openDetails(s)})}),this.container.querySelectorAll('[data-action="copy"]').forEach(e=>{e.addEventListener("click",async()=>{const t=e.getAttribute("data-id"),s=this.rows.find(r=>r.logId===t);if(!s)return;const i=`[${Ve(s.ts)}] ${s.nickname||""} (${s.userId||""})
${s.message||""}`;try{await navigator.clipboard.writeText(i)}catch{}})})}_openDetails(e){const t=document.getElementById("details-modal"),s=document.getElementById("backdrop");t.innerHTML=`
      <div class="p-6">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold">Log Details</h3>
          <button id="modal-close" class="text-gray-600">✕</button>
        </div>
        <div class="space-y-2 text-sm">
          <div><span class="text-gray-500">Time:</span> ${Ve(e.ts)}</div>
          <div><span class="text-gray-500">Server:</span> ${e.server||""}</div>
          <div><span class="text-gray-500">Platform:</span> ${e.platform||""}</div>
          <div><span class="text-gray-500">Date:</span> ${e.date||""}</div>
          <div><span class="text-gray-500">User:</span> <span class="font-mono text-xs">${e.userId||""}</span></div>
          <div><span class="text-gray-500">Nick:</span> ${e.nickname||""}</div>
          <div class="border-t pt-3 whitespace-pre-wrap">${e.message||""}</div>
        </div>
      </div>`,s.classList.remove("hidden"),t.showModal();const i=()=>{t.close(),s.classList.add("hidden")};t.querySelector("#modal-close").addEventListener("click",i),s.addEventListener("click",i,{once:!0})}}class eu{constructor(){this.btn=document.getElementById("btn-export"),this.logs=[],this.btn.addEventListener("click",()=>this._openModal())}updateLogs(e){this.logs=e||[]}_openModal(){if(!this.logs.length)return;const e=document.getElementById("export-modal"),t=document.getElementById("backdrop"),s=`logs_${new Date().toISOString().slice(0,10)}`,i=document.getElementById("export-filename");i.value=s;const r=()=>{e.close(),t.classList.add("hidden")};document.getElementById("export-close").onclick=r,document.getElementById("export-json").onclick=()=>{Kh(this.logs,`${i.value||s}.json`),r()},document.getElementById("export-csv").onclick=()=>{Qh(this.logs,`${i.value||s}.csv`),r()},document.getElementById("export-txt").onclick=()=>{Jh(this.logs,`${i.value||s}.txt`),r()},t.classList.remove("hidden"),e.showModal()}}class tu{constructor(){this.trigger=document.getElementById("btn-delete"),this.deleteModal=document.getElementById("delete-modal"),this.confirmModal=document.getElementById("confirm-delete-modal"),this.backdrop=document.getElementById("backdrop"),this.input=document.getElementById("delete-path-input"),this.pathPreview=document.getElementById("confirm-delete-path"),this._bind()}_bind(){this.trigger&&this.trigger.addEventListener("click",()=>this._openInput());const e=()=>{this.deleteModal.close(),this.backdrop.classList.add("hidden")},t=()=>{this.confirmModal.close(),this.backdrop.classList.add("hidden")},s=document.getElementById("delete-cancel");s&&s.addEventListener("click",e);const i=document.getElementById("delete-next");i&&i.addEventListener("click",()=>{const a=(this.input?.value||"").trim();a&&(this.pathPreview.textContent=a,this.deleteModal.close(),this._openConfirm())});const r=document.getElementById("confirm-delete-cancel");r&&r.addEventListener("click",t);const o=document.getElementById("confirm-delete-do");o&&o.addEventListener("click",async()=>{const a=this.pathPreview?.textContent||"";if(a)try{await zh(a),t(),this._notify(`Deleted: ${a}`),this.onAfterDelete&&this.onAfterDelete()}catch(l){this._notify(`Delete failed: ${l?.message||l}`,!0)}})}_openInput(){this.deleteModal&&(this.input.value="",this.backdrop.classList.remove("hidden"),this.deleteModal.showModal())}_openConfirm(){this.confirmModal&&(this.backdrop.classList.remove("hidden"),this.confirmModal.showModal())}onDone(e){this.onAfterDelete=e}_notify(e,t=!1){const s=document.getElementById("error-banner");s&&(s.textContent=(t?"Error: ":"")+e,t?s.classList.remove("hidden"):(s.classList.remove("hidden"),setTimeout(()=>{s.classList.add("hidden"),s.textContent=""},2500)))}}const nt=new Yh,Dr=new Zh("logs-container"),nu=new eu,su=new tu;async function iu(){try{await nt.loadInitialOptions(),ru(),su.onDone(()=>Ee()),await Ee()}catch(n){Lr(n)}}function ru(){document.getElementById("btn-refresh").addEventListener("click",Ee),nt.onApply(Ee),nt.onClear(Ee);const n=document.getElementById("groupBy"),e=document.getElementById("uniqueness");n.addEventListener("change",()=>{Dr.updateLogs(Or,n.value)}),e.addEventListener("change",Ee)}let Or=[];async function Ee(){ou();try{const n=nt.getFilters(),e=n.limit||200;let t=await Gh(n,e);const s=document.getElementById("uniqueness").value;if(s==="message"){const r=new Set;t=t.filter(o=>{const a=(o.message||"").trim();return a?r.has(a)?!1:(r.add(a),!0):!0})}else if(s==="perUserMessage"){const r=new Set;t=t.filter(o=>{const a=`${o.userId||""}|${(o.message||"").trim()}`;return r.has(a)?!1:(r.add(a),!0)})}Or=t;const i=document.getElementById("groupBy").value;Dr.updateLogs(t,i),nu.updateLogs(t)}catch(n){Lr(n)}}function Lr(n){const e=document.getElementById("error-banner");e&&(e.textContent=`Error: ${n?.message||n}`,e.classList.remove("hidden"))}function ou(){const n=document.getElementById("error-banner");n&&(n.textContent="",n.classList.add("hidden"))}window.debugLogs=async function(){console.log("=== DEBUG LOGS ==="),console.log("1. Checking available indexes..."),await _t();const n=nt.getFilters().project||je;console.log("2. Checking project indexes for:",n),await _t(`byProject/${n}`),console.log("3. Checking date indexes for 2024-09-25..."),await _t(`byProjectDate/${n}/2024-09-25`),console.log("4. Checking user indexes..."),await _t("byUser"),console.log("=== END DEBUG ===")};iu().catch(console.error);
