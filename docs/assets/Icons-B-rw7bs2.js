import{IpLoadingOne as m}from"./index-C4hXBfgO.js";import{I as v}from"./IconList-BJQGW8bo.js";import{g as f}from"./useGetIcons-50nFBAiH.js";import{d as g,r as I,s as j,w as k,c as n,b as e,v as d,t as c,x as M,e as r,u as x,k as y,l as i,p as w,m as L,j as N,_ as S}from"./index-2Aax1eD8.js";import"./useGenIcon-C6EKeIdN.js";const _=o=>(w("data-v-06a480fa"),o=o(),L(),o),V={class:"main"},B={class:"main-title"},C={key:0},b=_(()=>e("span",null,"total: ",-1)),E={class:"icon-main"},O={class:"icon-main-header"},T={class:"icon-main-info"},U=_(()=>e("span",null,"License: ",-1)),z=["href"],D=_(()=>e("span",null,"Project: ",-1)),P=["href"],$={class:"icon-main-example"},q={key:0},A={key:1,class:"loading"},F=g({__name:"Icons",props:{id:String},setup(o){const l=o,t=I(new Map),h=a=>N.find(p=>p.id===a),s=j(()=>h(l.id||""));return k(async()=>{const a=await f(l.id||"");t.set(l.id,a)}),(a,p)=>{const u=y("highlightjs");return i(),n("div",V,[e("h1",B,[d(c(s.value.name)+" ",1),t.has(s.value.id)?(i(),n("span",C,[d(" ("),b,d(" "+c(Object.keys(t.get(s.value.id)).length)+") ",1)])):M("",!0)]),e("div",E,[e("div",O,[e("div",T,[e("div",null,[U,e("a",{href:s.value.license,target:"__target"},c(s.value.license||"MIT"),9,z)]),e("div",null,[D,e("a",{href:s.value.projectUrl,target:"__target"},c(s.value.projectUrl||"http://localhost:5173/icons/"),9,P)])])]),e("div",$,[r(u,{language:"js",code:`import { IconName } from 'vue-icons-plus/${s.value.id}'`},null,8,["code"])]),t.has(s.value.id)?(i(),n("div",q,[r(v,{iconList:t.get(s.value.id)},null,8,["iconList"])])):(i(),n("div",A,[r(x(m),{class:"icon-loading",size:"18",color:"#c0c0c0"})]))])])}}}),R=S(F,[["__scopeId","data-v-06a480fa"]]);export{R as default};
