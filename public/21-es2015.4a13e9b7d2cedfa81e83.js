(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"06o/":function(n,e,t){"use strict";t.r(e),t.d(e,"MemoriaPageModule",(function(){return d}));var i=t("ofXK"),o=t("3Pt+"),r=t("TEn/"),s=t("tyNb"),a=t("fXoL"),c=t("e8h1");const b=function(n){return{"background-color: red;":n}};function l(n,e){if(1&n){const n=a.Ob();a.Nb(0,"ion-item",5),a.Vb("click",(function(){a.ec(n);const t=e.$implicit;return a.Xb().verResultado(t)})),a.Nb(1,"ion-label"),a.jc(2),a.Mb(),a.Nb(3,"ion-icon",6),a.Vb("click",(function(){a.ec(n);const t=e.index;return a.Xb().eliminarExp(t)})),a.Mb(),a.Mb()}if(2&n){const n=e.$implicit;a.ac("ngStyle",a.bc(2,b,e.index%2==0)),a.Ab(2),a.kc(n)}}const u=[{path:"",component:(()=>{class n{constructor(n,e,t){this.storage=n,this.navCtrl=e,this.router=t,this.expresionesGuardadas=[]}ngOnInit(){this.storage.get("expresiones").then(n=>{n?this.expresionesGuardadas=n:this.storage.set("expresiones",this.expresionesGuardadas)})}verResultado(n){this.router.navigate(["resultado/"],{queryParams:{infija:n}})}atras(){this.navCtrl.pop()}eliminarExp(n){this.expresionesGuardadas.splice(n,1),this.storage.set("expresiones",this.expresionesGuardadas)}}return n.\u0275fac=function(e){return new(e||n)(a.Kb(c.b),a.Kb(r.F),a.Kb(s.g))},n.\u0275cmp=a.Eb({type:n,selectors:[["app-memoria"]],decls:16,vars:1,consts:[[1,"ion-padding"],["color","vibrant",2,"font-size","2rem",3,"click"],["name","arrow-back-outline",2,"zoom","1.5"],[3,"ngStyle","click",4,"ngFor","ngForOf"],["routerLink","/about","color","vibrant",2,"font-size","12px"],[3,"ngStyle","click"],["slot","end","name","trash",2,"zoom","1.5",3,"click"]],template:function(n,e){1&n&&(a.Nb(0,"ion-content",0),a.Nb(1,"ion-chip",1),a.Vb("click",(function(){return e.atras()})),a.Lb(2,"ion-icon",2),a.Mb(),a.Lb(3,"br"),a.Lb(4,"br"),a.Nb(5,"i"),a.jc(6,"Click para ver la tabla"),a.Mb(),a.Nb(7,"ion-list"),a.ic(8,l,4,4,"ion-item",3),a.Mb(),a.Lb(9,"br"),a.Lb(10,"br"),a.Nb(11,"ion-footer"),a.Nb(12,"ion-toolbar"),a.Nb(13,"ion-title"),a.Nb(14,"ion-chip",4),a.jc(15," Acerca de ... "),a.Mb(),a.Mb(),a.Mb(),a.Mb(),a.Mb()),2&n&&(a.Ab(8),a.ac("ngForOf",e.expresionesGuardadas))},directives:[r.l,r.j,r.s,r.w,i.h,r.p,r.C,r.B,r.H,s.h,r.u,i.j,r.v],styles:[""]}),n})()}];let p=(()=>{class n{}return n.\u0275mod=a.Ib({type:n}),n.\u0275inj=a.Hb({factory:function(e){return new(e||n)},imports:[[s.i.forChild(u)],s.i]}),n})(),d=(()=>{class n{}return n.\u0275mod=a.Ib({type:n}),n.\u0275inj=a.Hb({factory:function(e){return new(e||n)},imports:[[i.b,o.a,r.D,p]]}),n})()}}]);