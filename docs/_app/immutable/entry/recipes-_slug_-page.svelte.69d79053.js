import{S as ve,i as Ee,s as ke,y as Ie,a as L,k as p,q as B,z as ye,c as N,l as b,m as k,r as A,h as d,n as y,p as ae,A as Le,b as j,G as r,L as G,u as F,g as Ne,d as Se,B as Te,J as de,M as Oe,N as _e,H as be}from"../chunks/index.15f599cf.js";import{N as Be}from"../chunks/Nav.3849fd70.js";function he(n,e,s){const l=n.slice();return l[8]=e[s],l}function ge(n,e,s){const l=n.slice();return l[11]=e[s],l[13]=s,l}function Ae(n){let e,s,l,f;return{c(){e=p("button"),s=B("+ menu 📅")},l(o){e=b(o,"BUTTON",{});var c=k(e);s=A(c,"+ menu 📅"),c.forEach(d)},m(o,c){j(o,e,c),r(e,s),l||(f=G(e,"click",n[3]),l=!0)},p:be,d(o){o&&d(e),l=!1,f()}}}function De(n){let e,s,l,f;return{c(){e=p("button"),s=B("+ lista 🛒")},l(o){e=b(o,"BUTTON",{});var c=k(e);s=A(c,"+ lista 🛒"),c.forEach(d)},m(o,c){j(o,e,c),r(e,s),l||(f=G(e,"click",n[4]),l=!0)},p:be,d(o){o&&d(e),l=!1,f()}}}function me(n){let e,s=n[11]+"",l,f,o,c;function I(){return n[7](n[13])}return{c(){e=p("li"),l=B(s),f=L(),this.h()},l(h){e=b(h,"LI",{class:!0});var g=k(e);l=A(g,s),f=N(g),g.forEach(d),this.h()},h(){y(e,"class","svelte-1tjjtbv"),_e(e,"bolded",n[1]==n[13])},m(h,g){j(h,e,g),r(e,l),r(e,f),o||(c=G(e,"click",I),o=!0)},p(h,g){n=h,g&1&&s!==(s=n[11]+"")&&F(l,s),g&2&&_e(e,"bolded",n[1]==n[13])},d(h){h&&d(e),o=!1,c()}}}function pe(n){let e,s=n[8].name+"",l,f,o=n[8].quantity+"",c,I,h=n[8].unit+"",g,_;return{c(){e=p("li"),l=B(s),f=L(),c=B(o),I=L(),g=B(h),_=L()},l(i){e=b(i,"LI",{});var u=k(e);l=A(u,s),f=N(u),c=A(u,o),I=N(u),g=A(u,h),_=N(u),u.forEach(d)},m(i,u){j(i,e,u),r(e,l),r(e,f),r(e,c),r(e,I),r(e,g),r(e,_)},p(i,u){u&1&&s!==(s=i[8].name+"")&&F(l,s),u&1&&o!==(o=i[8].quantity+"")&&F(c,o),u&1&&h!==(h=i[8].unit+"")&&F(g,h)},d(i){i&&d(e)}}}function Je(n){let e,s,l,f,o,c=n[0].title+"",I,h,g,_,i,u,S,C,X,U,Y,q,Z,x,D,M,R,ee,$,V,te,K,z,le,ne;e=new Be({});function se(t,m){return t[2]?De:Ae}let Q=se(n),T=Q(n),H=n[0].instructions,v=[];for(let t=0;t<H.length;t+=1)v[t]=me(ge(n,H,t));let P=n[0].ingredients,E=[];for(let t=0;t<P.length;t+=1)E[t]=pe(he(n,P,t));return{c(){Ie(e.$$.fragment),s=L(),l=p("article"),f=p("header"),o=p("h3"),I=B(c),h=L(),T.c(),g=L(),_=p("div"),i=p("input"),u=L(),S=p("label"),C=B("Instruções"),X=L(),U=p("input"),Y=L(),q=p("label"),Z=B("Ingredientes"),x=L(),D=p("div"),M=p("div"),R=p("ol");for(let t=0;t<v.length;t+=1)v[t].c();ee=L(),$=p("div"),V=p("ul");for(let t=0;t<E.length;t+=1)E[t].c();te=L(),K=p("footer"),this.h()},l(t){ye(e.$$.fragment,t),s=N(t),l=b(t,"ARTICLE",{class:!0,style:!0});var m=k(l);f=b(m,"HEADER",{});var a=k(f);o=b(a,"H3",{});var J=k(o);I=A(J,c),J.forEach(d),h=N(a),T.l(a),a.forEach(d),g=N(m),_=b(m,"DIV",{class:!0,style:!0});var O=k(_);i=b(O,"INPUT",{id:!0,type:!0,name:!0}),u=N(O),S=b(O,"LABEL",{class:!0,for:!0});var re=k(S);C=A(re,"Instruções"),re.forEach(d),X=N(O),U=b(O,"INPUT",{id:!0,type:!0,name:!0}),Y=N(O),q=b(O,"LABEL",{class:!0,for:!0});var ie=k(q);Z=A(ie,"Ingredientes"),ie.forEach(d),x=N(O),D=b(O,"DIV",{class:!0});var W=k(D);M=b(W,"DIV",{});var oe=k(M);R=b(oe,"OL",{});var ce=k(R);for(let w=0;w<v.length;w+=1)v[w].l(ce);ce.forEach(d),oe.forEach(d),ee=N(W),$=b(W,"DIV",{});var ue=k($);V=b(ue,"UL",{});var fe=k(V);for(let w=0;w<E.length;w+=1)E[w].l(fe);fe.forEach(d),ue.forEach(d),W.forEach(d),O.forEach(d),te=N(m),K=b(m,"FOOTER",{}),k(K).forEach(d),m.forEach(d),this.h()},h(){y(i,"id","tab-1"),y(i,"type","radio"),y(i,"name","tabgroupB"),i.checked=!0,y(S,"class","pseudo button toggle tablabel"),y(S,"for","tab-1"),y(U,"id","tab-2"),y(U,"type","radio"),y(U,"name","tabgroupB"),y(q,"class","pseudo button toggle tablabel"),y(q,"for","tab-2"),y(D,"class","row"),y(_,"class","tabs two"),ae(_,"padding","4px"),y(l,"class","card"),ae(l,"margin-left","4px"),ae(l,"margin-right","4px")},m(t,m){Le(e,t,m),j(t,s,m),j(t,l,m),r(l,f),r(f,o),r(o,I),r(f,h),T.m(f,null),r(l,g),r(l,_),r(_,i),r(_,u),r(_,S),r(S,C),r(_,X),r(_,U),r(_,Y),r(_,q),r(q,Z),r(_,x),r(_,D),r(D,M),r(M,R);for(let a=0;a<v.length;a+=1)v[a]&&v[a].m(R,null);r(D,ee),r(D,$),r($,V);for(let a=0;a<E.length;a+=1)E[a]&&E[a].m(V,null);r(l,te),r(l,K),z=!0,le||(ne=[G(i,"click",n[5]),G(U,"click",n[6])],le=!0)},p(t,[m]){if((!z||m&1)&&c!==(c=t[0].title+"")&&F(I,c),Q===(Q=se(t))&&T?T.p(t,m):(T.d(1),T=Q(t),T&&(T.c(),T.m(f,null))),m&3){H=t[0].instructions;let a;for(a=0;a<H.length;a+=1){const J=ge(t,H,a);v[a]?v[a].p(J,m):(v[a]=me(J),v[a].c(),v[a].m(R,null))}for(;a<v.length;a+=1)v[a].d(1);v.length=H.length}if(m&1){P=t[0].ingredients;let a;for(a=0;a<P.length;a+=1){const J=he(t,P,a);E[a]?E[a].p(J,m):(E[a]=pe(J),E[a].c(),E[a].m(V,null))}for(;a<E.length;a+=1)E[a].d(1);E.length=P.length}},i(t){z||(Ne(e.$$.fragment,t),z=!0)},o(t){Se(e.$$.fragment,t),z=!1},d(t){Te(e,t),t&&d(s),t&&d(l),T.d(),de(v,t),de(E,t),le=!1,Oe(ne)}}}function Ue(n,e,s){let{data:l}=e;const f=()=>{let i=localStorage.getItem("menu")||"[]";i=JSON.parse(i);let u=i[i.length-1],S=u?u.day:0;const C={slug:l.slug,title:l.title,ingredients:l.ingredients,day:(S+1)%14};i.push(C),localStorage.setItem("menu",JSON.stringify(i))},o=()=>{const i=l.ingredients.map(S=>S.name);let u=localStorage.getItem("list")||"[]";u=JSON.parse(u),u.push(...i),localStorage.setItem("list",JSON.stringify(u))};let c=0,I=!1;const h=()=>s(2,I=!1),g=()=>s(2,I=!0),_=i=>s(1,c=i);return n.$$set=i=>{"data"in i&&s(0,l=i.data)},[l,c,I,f,o,h,g,_]}class Re extends ve{constructor(e){super(),Ee(this,e,Ue,Je,ke,{data:0})}}export{Re as default};