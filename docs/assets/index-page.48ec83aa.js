import{o as s,c as o,r as d,a as u,b as p,d as h,e as $,u as g,f as C,F as k,g as b,h as c,i as N,w as _,R as A,j as m,t as l}from"./index.c047891d.js";import{u as f,b as x,g as B,a as T}from"./apartments.utils.6c0554ad.js";var v={name:"Card"};const w={class:"p-card p-component"},F={key:0,class:"p-card-header"},S={class:"p-card-body"},V={key:0,class:"p-card-title"},j={key:1,class:"p-card-subtitle"},E={class:"p-card-content"},R={key:2,class:"p-card-footer"};function I(e,r,i,a,t,y){return s(),o("div",w,[e.$slots.header?(s(),o("div",F,[d(e.$slots,"header")])):u("",!0),p("div",S,[e.$slots.title?(s(),o("div",V,[d(e.$slots,"title")])):u("",!0),e.$slots.subtitle?(s(),o("div",j,[d(e.$slots,"subtitle")])):u("",!0),p("div",E,[d(e.$slots,"content")]),e.$slots.footer?(s(),o("div",R,[d(e.$slots,"footer")])):u("",!0)])])}function P(e,r){r===void 0&&(r={});var i=r.insertAt;if(!(!e||typeof document=="undefined")){var a=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",i==="top"&&a.firstChild?a.insertBefore(t,a.firstChild):a.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}}var z=`
.p-card-header img {
    width: 100%;
}
`;P(z);v.render=I;const D={class:"apartments-filters"},L=h({name:"apartments-filters",setup(e){const{fetchApartments:r,apartments:i}=f();return $(()=>{r()}),(a,t)=>(s(),o("div",D))}});const M={class:"apartments-index-page p-1"},U={class:"cards-container w-full flex align-items-center justify-content-center"},q={class:"cards"},G=["src"],H={class:"mb-0"},Q=h({name:"index-page",setup(e){const{apartments:r}=f(),i=g();function a(t){i.push({name:A.apartment,params:{id:t}})}return(t,y)=>(s(),o("div",M,[C(L),p("div",U,[p("div",q,[(s(!0),o(k,null,b(c(r),n=>(s(),N(c(v),{key:n.id,style:{width:"20em"},class:"mb-2",onClick:J=>a(n.id)},{header:_(()=>[n.imageFileName?(s(),o("img",{key:0,class:"border-round-top",src:c(x)(n.imageFileName),style:{width:"20em"}},null,8,G)):u("",!0)]),title:_(()=>[m(l(n.title),1)]),subtitle:_(()=>[m(l(c(B)(n.type))+", "+l(c(T)(n.position))+", "+l(n.price)+"\xA0\u0440\u0443\u0431./\u043C\u0435\u0441. ",1)]),content:_(()=>[p("p",H,l(n.description),1)]),_:2},1032,["onClick"]))),128))])])]))}});export{Q as default};