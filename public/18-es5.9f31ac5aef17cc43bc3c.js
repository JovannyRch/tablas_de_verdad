function _classCallCheck(n,i){if(!(n instanceof i))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,i){for(var o=0;o<i.length;o++){var t=i[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function _createClass(n,i,o){return i&&_defineProperties(n.prototype,i),o&&_defineProperties(n,o),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"ct+p":function(n,i,o){"use strict";o.r(i),o.d(i,"HomePageModule",(function(){return N}));var t=o("ofXK"),e=o("TEn/"),c=o("3Pt+"),r=o("tyNb"),a=o("mrSG"),s=o("fXoL"),b=o("ZL19"),l=o("VYYF"),u=o("54vc"),d=["canvas"];function f(n,i){if(1&n){var o=s.Ob();s.Nb(0,"ion-col",28),s.Vb("click",(function(){s.ec(o);var n=i.$implicit,t=s.Xb();return t.clickVar(n[t.caseMm])})),s.jc(1),s.Mb()}if(2&n){var t=i.$implicit,e=s.Xb();s.Ab(1),s.lc(" ",t[e.caseMm]," ")}}function h(n,i){1&n&&(s.Nb(0,"span"),s.jc(1,"abc"),s.Mb())}function p(n,i){1&n&&(s.Nb(0,"span"),s.jc(1,"ABC"),s.Mb())}function k(n,i){if(1&n){var o=s.Ob();s.Nb(0,"ion-col",40),s.Vb("click",(function(){return s.ec(o),s.Xb().setOpr(2)})),s.jc(1,"\u2228\u2227\xac "),s.Mb()}}function g(n,i){if(1&n){var o=s.Ob();s.Nb(0,"ion-col",34),s.Vb("click",(function(){return s.ec(o),s.Xb().setOpr(1)})),s.jc(1,"|&!"),s.Mb()}}var m,M,v,j=[{path:"",component:(m=function(){function n(i,o,t,e,c,r,a){_classCallCheck(this,n),this.admobFree=o,this.toastController=t,this.navCtrl=r,this.router=a,this.isApp=!document.URL.startsWith("http")||document.URL.startsWith("http://localhost:8080"),this.expresionesGuardadas=[],this.postfija="",this.infija="",this.infijaOrg="",this.infijaAux="",this.indexPuntero=0,this.variables=[],this.operadores="!&|()\u21d4\uffe9\u21d2\u22bc\u22bb\u2193\u2295\u21cd\u21cf\u21ce~",this.opr2var="|&\u21d4\u21d2\u22bc\u22bb\u2193\u2295\u21cd\u21cf\u21ce",this.varMays="ABCDEFGHIJKLMNOPQRSTUVWXYZ",this.varNames=this.varMays+this.varMays.toLowerCase(),this.tabla=[],this.diagnostico="",this.proceso=[],this.modo=2,this.conVsFs=!1,this.opers={and:{1:"&",2:"\u2227"},or:{1:"|",2:"\u2228"},not:{1:"!",2:"\xac"}},this.verGuardadas=!1,this.mostrarProceso=!1,this.guardarEnNube=!1,this.descripcion="",this.caseMm=1,this.letras=[{1:"A",0:"a"},{1:"B",0:"b"},{1:"C",0:"c"},{1:"D",0:"d"},{1:"E",0:"e"},{1:"F",0:"f"},{1:"G",0:"g"},{1:"H",0:"h"},{1:"I",0:"i"},{1:"J",0:"j"},{1:"K",0:"k"},{1:"L",0:"l"},{1:"M",0:"m"},{1:"N",0:"n"},{1:"O",0:"o"},{1:"P",0:"p"},{1:"Q",0:"q"},{1:"R",0:"r"},{1:"S",0:"s"},{1:"T",0:"t"},{1:"U",0:"u"},{1:"V",0:"v"},{1:"W",0:"w"},{1:"X",0:"x"},{1:"Y",0:"y"},{1:"Z",0:"z"}],this.ok=!1,i.ready().then((function(){})),this.backButtonEvent()}return _createClass(n,[{key:"keyEvent",value:function(n){this.varNames.includes(n.key)||this.operadores.includes(n.key)?this.infija=this.infija+n.key:(console.log(n.keyCode),8==n.keyCode?this.infija=this.infija.substring(0,this.infija.length-1):13==n.keyCode?this.verResultado():46==n.keyCode&&(this.infija=""))}},{key:"backButtonEvent",value:function(){var n=this;document.addEventListener("backbutton",(function(){console.log(n.router.url),n.router.url.toString().includes("/home")&&navigator.app.exitApp()}))}},{key:"ngAfterViewInit",value:function(){}},{key:"ngOnInit",value:function(){this.isApp&&(this.admobFree.banner.config({id:"ca-app-pub-4665787383933447/6762703339",isTesting:!1,autoShow:!0}),this.admobFree.rewardVideo.config({id:"ca-app-pub-4665787383933447/1334937592",isTesting:!1,autoShow:!0}),this.mostrarBanner())}},{key:"mostrarBanner",value:function(){var n=this;this.admobFree.banner.prepare().then((function(){n.admobFree.banner.show()}))}},{key:"mostrarVideo",value:function(){var n=this;this.admobFree.rewardVideo.prepare().then((function(){n.admobFree.rewardVideo.show()}))}},{key:"cambiar01",value:function(){this.conVsFs=!this.conVsFs}},{key:"checkChange01",value:function(n){return this.conVsFs?n:"0"==n?"F":"V"}},{key:"saveImg",value:function(){}},{key:"replaceAll",value:function(n,i,o){for(;n.includes(i);)n=n.replace(i,o);return n}},{key:"setOpr",value:function(n){this.modo=n,1==this.modo?(this.infija=this.replaceAll(this.infija,"\u2227","&"),this.infija=this.replaceAll(this.infija,"\u2228","|"),this.infija=this.replaceAll(this.infija,"\xac","!")):(this.infija=this.replaceAll(this.infija,"&","\u2227"),this.infija=this.replaceAll(this.infija,"|","\u2228"),this.infija=this.replaceAll(this.infija,"!","\xac"))}},{key:"fverGuardadas",value:function(n){this.verGuardadas=n}},{key:"presentToast",value:function(n){return Object(a.__awaiter)(this,void 0,void 0,regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,this.toastController.create({message:n,duration:2e3});case 2:i.sent.present();case 3:case"end":return i.stop()}}),i,this)})))}},{key:"setModo",value:function(n){var i=n;n=this.replaceAll(n,"\u2227","&"),n=this.replaceAll(n,"\u2228","|"),(n=this.replaceAll(n,"\xac","!"))!==i?this.modo=2:(n.includes("&")||n.includes("|")||n.includes("!"))&&(this.modo=1)}},{key:"clear",value:function(){this.infija=""}},{key:"clickVar",value:function(n){this.infija=this.infija+n}},{key:"delete",value:function(){this.infija.length>0&&(this.infija=this.infija.substr(0,this.infija.length-1))}},{key:"back",value:function(){this.ok=!1}},{key:"clearMem",value:function(){this.tabla=[],this.variables=[],this.mostrarProceso=!1}},{key:"changeCase",value:function(){this.caseMm=1==this.caseMm?0:1}},{key:"verResultado",value:function(){console.log(this.infija),this.validar()&&this.router.navigate(["resultado"],{queryParams:{infija:this.infija}})}},{key:"validar",value:function(){return""!==this.infija}}]),n}(),m.\u0275fac=function(n){return new(n||m)(s.Kb(e.G),s.Kb(b.a),s.Kb(e.J),s.Kb(l.a),s.Kb(u.a),s.Kb(e.F),s.Kb(r.g))},m.\u0275cmp=s.Eb({type:m,selectors:[["app-home"]],viewQuery:function(n,i){var o;1&n&&s.mc(d,!0),2&n&&s.cc(o=s.Wb())&&(i.canvas=o.first)},hostBindings:function(n,i){1&n&&s.Vb("keyup",(function(n){return i.keyEvent(n)}),!1,s.dc)},decls:92,vars:9,consts:[["id","main-container",1,"ion-justify-content-center","ion-align-items-center","no-scroll"],["vertical","top","horizontal","end"],["color","vibrant"],["name","help"],["side","boottom"],[3,"click"],[1,"ion-text-center"],["no-padding","",2,"height","100vh","background-color","rgb(255, 253, 249)"],[2,"height","5vh"],["size","12",1,"ion-text-left"],["routerLink","/memoria","color","vibrant",2,"font-size","12px"],["name","folder-open",2,"zoom","1.5"],["routerLink","/repositorio","color","vibrant",2,"font-size","12px"],["name","cloud",2,"zoom","1.5"],["routerLink","/temas","color","vibrant",2,"font-size","12px"],["name","book",2,"zoom","1.5"],["routerLink","/about","color","vibrant",2,"font-size","12px"],["name","information",2,"zoom","1.5"],[2,"height","15vh"],["size","12",2,"text-align","right","padding-top","15%","padding-left","4%","padding-right","4%","font-size","180%"],[2,"padding-top","8%"],["size","9",2,"background-color","rgb(255, 255, 255)"],["no-padding",""],[1,"barra-top"],["size","3",1,"borde","btn","orange",3,"click"],["name","trash",2,"padding-top","10%"],["size","3",1,"borde","btn-img","ion-text-center","ion-justify-content-center",3,"click"],["src","assets/img/delete.png",2,"width","60%","margin-left","10%"],["size","3",1,"borde","btn",3,"click"],["size","3","class","borde btn",3,"click",4,"ngFor","ngForOf"],["size","3",1,"btn","borde","operador",3,"click"],[1,"operadores"],["size","3",1,"btn","borde",2,"font-size","130%",3,"click"],["size","3"],["size","12",1,"borde","btn-fm",3,"click"],[4,"ngIf"],["size","12","style","font-size:small","class","borde btn-fm",3,"click",4,"ngIf"],["size","12","class","borde btn-fm",3,"click",4,"ngIf"],["size","12",1,"btn","borde",3,"click"],["size","12",1,"btn-doble","borde",3,"click"],["size","12",1,"borde","btn-fm",2,"font-size","small",3,"click"]],template:function(n,i){1&n&&(s.Nb(0,"ion-content",0),s.Nb(1,"ion-fab",1),s.Nb(2,"ion-fab-button",2),s.Lb(3,"ion-icon",3),s.Mb(),s.Nb(4,"ion-fab-list",4),s.Nb(5,"ion-fab-button",5),s.Vb("click",(function(){return i.clickVar(i.opers.and[i.modo])})),s.jc(6,"AND"),s.Mb(),s.Nb(7,"ion-fab-button",5),s.Vb("click",(function(){return i.clickVar(i.opers.or[i.modo])})),s.jc(8,"OR"),s.Mb(),s.Nb(9,"ion-fab-button",5),s.Vb("click",(function(){return i.clickVar(i.opers.not[i.modo])})),s.jc(10,"NOT"),s.Mb(),s.Nb(11,"ion-fab-button",5),s.Vb("click",(function(){return i.clickVar("\u2193")})),s.jc(12,"NOR"),s.Mb(),s.Nb(13,"ion-fab-button",5),s.Vb("click",(function(){return i.clickVar("\u22bc")})),s.jc(14,"NAND"),s.Mb(),s.Nb(15,"ion-fab-button",5),s.Vb("click",(function(){return i.clickVar("\u2295")})),s.jc(16,"XOR"),s.Mb(),s.Mb(),s.Mb(),s.Nb(17,"div",6),s.Nb(18,"ion-grid",7),s.Nb(19,"ion-row",8),s.Nb(20,"ion-col",9),s.Nb(21,"ion-chip",10),s.Lb(22,"ion-icon",11),s.Mb(),s.Nb(23,"ion-chip",12),s.Lb(24,"ion-icon",13),s.Mb(),s.Nb(25,"ion-chip",14),s.Lb(26,"ion-icon",15),s.Mb(),s.Nb(27,"ion-chip",16),s.Lb(28,"ion-icon",17),s.Mb(),s.Mb(),s.Mb(),s.Nb(29,"ion-row",18),s.Nb(30,"ion-col",19),s.jc(31),s.Mb(),s.Mb(),s.Nb(32,"ion-row",20),s.Nb(33,"ion-col",21),s.Nb(34,"ion-grid",22),s.Nb(35,"ion-row",23),s.Nb(36,"ion-col",24),s.Vb("click",(function(){return i.clear()})),s.Lb(37,"ion-icon",25),s.Mb(),s.Nb(38,"ion-col",26),s.Vb("click",(function(){return i.delete()})),s.Lb(39,"ion-img",27),s.Mb(),s.Nb(40,"ion-col",28),s.Vb("click",(function(){return i.clickVar("(")})),s.jc(41,"("),s.Mb(),s.Nb(42,"ion-col",28),s.Vb("click",(function(){return i.clickVar(")")})),s.jc(43,")"),s.Mb(),s.Mb(),s.Nb(44,"ion-row"),s.ic(45,f,2,1,"ion-col",29),s.Nb(46,"ion-col",30),s.Vb("click",(function(){return i.clickVar("[")})),s.jc(47," [ "),s.Mb(),s.Nb(48,"ion-col",30),s.Vb("click",(function(){return i.clickVar("]")})),s.jc(49," ] "),s.Mb(),s.Mb(),s.Nb(50,"ion-row",31),s.Nb(51,"ion-col",32),s.Vb("click",(function(){return i.clickVar("\u2295")})),s.jc(52,"\u2295"),s.Mb(),s.Nb(53,"ion-col",32),s.Vb("click",(function(){return i.clickVar("\u22bb")})),s.jc(54,"\u22bb"),s.Mb(),s.Nb(55,"ion-col",32),s.Vb("click",(function(){return i.clickVar("\u22bc")})),s.jc(56,"\u22bc"),s.Mb(),s.Nb(57,"ion-col",32),s.Vb("click",(function(){return i.clickVar("\u2193")})),s.jc(58,"\u2193"),s.Mb(),s.Mb(),s.Nb(59,"ion-row",31),s.Nb(60,"ion-col",32),s.Vb("click",(function(){return i.clickVar("\u21cf")})),s.jc(61,"\u21cf"),s.Mb(),s.Nb(62,"ion-col",32),s.Vb("click",(function(){return i.clickVar("\u21cd")})),s.jc(63,"\u21cd"),s.Mb(),s.Nb(64,"ion-col",32),s.Vb("click",(function(){return i.clickVar("\u2532")})),s.jc(65,"\u2532"),s.Mb(),s.Nb(66,"ion-col",32),s.Vb("click",(function(){return i.clickVar("\u2539")})),s.jc(67,"\u2539"),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Nb(68,"ion-col",33),s.Nb(69,"ion-row"),s.Nb(70,"ion-col",34),s.Vb("click",(function(){return i.changeCase()})),s.ic(71,h,2,0,"span",35),s.ic(72,p,2,0,"span",35),s.Mb(),s.ic(73,k,2,0,"ion-col",36),s.ic(74,g,2,0,"ion-col",37),s.Mb(),s.Nb(75,"ion-row",31),s.Nb(76,"ion-col",38),s.Vb("click",(function(){return i.clickVar("~")})),s.jc(77,"~"),s.Mb(),s.Nb(78,"ion-col",38),s.Vb("click",(function(){return i.clickVar(i.opers.not[i.modo])})),s.jc(79),s.Mb(),s.Nb(80,"ion-col",38),s.Vb("click",(function(){return i.clickVar(i.opers.or[i.modo])})),s.jc(81),s.Mb(),s.Nb(82,"ion-col",38),s.Vb("click",(function(){return i.clickVar(i.opers.and[i.modo])})),s.jc(83),s.Mb(),s.Nb(84,"ion-col",38),s.Vb("click",(function(){return i.clickVar("\u21d4")})),s.jc(85," \u21d4 "),s.Mb(),s.Nb(86,"ion-col",38),s.Vb("click",(function(){return i.clickVar("\u21d2")})),s.jc(87,"\u21d2"),s.Mb(),s.Nb(88,"ion-col",38),s.Vb("click",(function(){return i.clickVar("\uffe9")})),s.jc(89,"\uffe9"),s.Mb(),s.Nb(90,"ion-col",39),s.Vb("click",(function(){return i.verResultado()})),s.jc(91,"="),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb()),2&n&&(s.Ab(31),s.lc(" ",i.infija," "),s.Ab(14),s.ac("ngForOf",i.letras),s.Ab(26),s.ac("ngIf",1==i.caseMm),s.Ab(1),s.ac("ngIf",0==i.caseMm),s.Ab(1),s.ac("ngIf",1==i.modo),s.Ab(1),s.ac("ngIf",2==i.modo),s.Ab(5),s.kc(i.opers.not[i.modo]),s.Ab(2),s.kc(i.opers.or[i.modo]),s.Ab(2),s.kc(i.opers.and[i.modo]))},directives:[e.l,e.m,e.n,e.s,e.o,e.q,e.y,e.k,e.j,e.H,r.h,e.t,t.h,t.i],styles:[".btn[_ngcontent-%COMP%]{padding-top:5%;font-size:1.5em;padding-left:4%;border-radius:5px;vertical-align:middle;text-align:center}.btn[_ngcontent-%COMP%]:hover{background-color:rgba(226,218,209,.78)}.btn-fm[_ngcontent-%COMP%]{padding-top:10%;padding-left:4%;border-radius:5px;vertical-align:middle;background-color:#fdf6e4}.vertical-center[_ngcontent-%COMP%]{margin:0;position:absolute;top:50%;transform:translateY(-50%)}.btn-doble[_ngcontent-%COMP%]{padding-top:4vh;height:13vh;font-size:1.5em;padding-left:4%;border-radius:5px;background-color:#f49338;color:#fff}.orange[_ngcontent-%COMP%]{color:#f59337}.btn-img[_ngcontent-%COMP%]{padding-left:4%;border-radius:5px;vertical-align:middle;top:4}.borde[_ngcontent-%COMP%]{border:1px solid #e2dccd}.barra-top[_ngcontent-%COMP%]{background-color:rgba(250,245,239,.78)}.barra-top[_ngcontent-%COMP%]   .btn.btn-img[_ngcontent-%COMP%]{margin-top:0}.operadores[_ngcontent-%COMP%]{background-color:rgba(250,245,239,.78)}.operador[_ngcontent-%COMP%], .operadores[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{font-size:170%}.operador[_ngcontent-%COMP%]{line-height:20px;background-color:rgba(250,245,239,.78)}ion-chip[_ngcontent-%COMP%]{border:1px solid #dd6d2c}.my-custom-class[_ngcontent-%COMP%]{--background:red;color:green}#main-container[_ngcontent-%COMP%]{width:100%;height:100%;min-width:320px;max-width:567px;margin:0 auto}.no-scroll[_ngcontent-%COMP%]{--overflow:hidden}@media only screen and (max-device-width:667px) and (min-device-width:320px) and (orientation:landscape){.btn[_ngcontent-%COMP%]{height:2vh}}@media only screen and (min-device-width:667px){#main-container[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}}"]}),m)}],V=((v=function n(){_classCallCheck(this,n)}).\u0275mod=s.Ib({type:v}),v.\u0275inj=s.Hb({factory:function(n){return new(n||v)},imports:[[r.i.forChild(j)],r.i]}),v),N=((M=function n(){_classCallCheck(this,n)}).\u0275mod=s.Ib({type:M}),M.\u0275inj=s.Hb({factory:function(n){return new(n||M)},imports:[[t.b,c.a,e.D,V]]}),M)}}]);