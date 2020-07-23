import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Storage } from '@ionic/storage';
import { ToastController, Platform, NavController } from '@ionic/angular';

import { RepositorioService } from "../../services/repositorio.service";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { Kmap } from './kmaps';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

//import html2canvas from 'html2canvas';

import * as domtoimage from 'dom-to-image';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
  @ViewChild('solucion') solucionDom;
  constructor(
    private activeRoute: ActivatedRoute,
    private storage: Storage,
    public toastController: ToastController,
    private admobFree: AdMobFree,

    private navCtrl: NavController,
    private repositorio: RepositorioService,
    private sanitizer: DomSanitizer,
    private socialSharing: SocialSharing,

  ) { }

  expresion: any;
  guardarEnNube: boolean = false;
  descripcion: string = "";
  imgSolution: any;
  compartiendo: boolean = false;
  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.infija = params['infija'];
    });
    this.desc = this.activeRoute.snapshot.paramMap.get("desc");
    this.verExp(this.infija);
    this.toPostfix();

    this.storage.get('expresiones').then((val) => {
      if (val) {
        this.expresionesGuardadas = val;
      } else {
        this.storage.set('expresiones', this.expresionesGuardadas);
      }
    });

    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-4665787383933447/6762703339',
      isTesting: false,
      autoShow: true,
    };
    const videoConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-4665787383933447/1334937592',
      isTesting: false,
      autoShow: true,
    };
    this.admobFree.rewardVideo.config(videoConfig);
    this.admobFree.banner.config(bannerConfig);
    this.mostrarVideo();
    this.mostrarBanner();

  }

  ngAfterViewInit(): void {
    //console.log("Dom solution");
    //console.log(this.solucionDom);
    //this.capturarSolucion()
  }

  capturarSolucion() {
    if (this.compartiendo) return;
    if (!this.mostrarProceso) this.mostrarProceso = true;
    this.compartiendo = true;
    setTimeout(() => {
      domtoimage.toPng(this.solucionDom.nativeElement)
        .then((dataUrl) => {
          this.imgSolution = new Image();
          this.imgSolution.src = dataUrl;
          //console.log(dataUrl);
          this.socialSharing.share("Tabla de verdad de: " + this.infijaOrg, "Tabla de verdad", this.imgSolution.src);
          this.compartiendo = false;
        })
        .catch((error) => {
          this.compartiendo = false;
          console.error('oops, something went wrong!', error);
        })
    }, 1000);
  }

  mostrarVideo() {
    this.admobFree.rewardVideo.prepare()
      .then(() => {
        this.admobFree.rewardVideo.show();
      });
  }
  mostrarBanner() {

    this.admobFree.banner.prepare()
      .then(() => {
        this.admobFree.banner.show();
        //console.log("show banner");
      });
  }



  activarGuardarEnNube() {
    this.guardarEnNube = !this.guardarEnNube;
    this.descripcion = "";
  }


  guardarDB() {
    let registro = {
      expresion: this.infijaOrg,
      desc: this.descripcion,
      diagnostico: this.diagnostico,
      fecha: new Date()
    };
    this.repositorio.create(registro);
    this.descripcion = "";
    this.guardarEnNube = false;
    this.presentToast("Se ha guardado en la nube :D");

  }



  fecha: string = "";
  desc: string = "";
  postfija: string = "";
  infija: string = "";
  infijaOrg: string = "";
  infijaAux: string = "";
  diccionarioOperaciones = {};
  historialOperaciones = [];
  keysOperaciones = [];
  variables: string[] = [];
  operadores: string = "∨∧¬!&|()⇔⇒⊼⊻↓⊕￩⇏⇎⇍┹┲";
  simplificacion: string = "";
  suma: string = "";
  multiplicacion: string = "";
  miniterminos: number[] = [];
  maxiterminos: number[] = [];

  opr2var: string = "∨∧⇔⇒⊼⊻↓⊕|&￩⇏⇎⇍┹┲";
  varMays: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  varNames: string = this.varMays + this.varMays.toLowerCase();
  notOperator: string = "";
  andOperator: string = "";
  orOperator: string = "";
  tabla: any = [];

  diagnostico: string = "";

  proceso: any = [];

  // Modo 2 => Lógica proposicional, 1 => Electrónica
  modo: number = 2;
  conVsFs: boolean = false;

  opers: any = {
    "and": { 1: "&", 2: "∧" },
    "or": { 1: "|", 2: "∨" },
    "not": { 1: "!", 2: "¬" },
  }


  verGuardadas: boolean = false;
  mostrarProceso: boolean = false;
  ok: boolean = false;

  expresionesGuardadas: any = [];
  cambiar01() {
    this.conVsFs = !this.conVsFs;
  }

  checkChange01(x) {
    if (!this.conVsFs) {
      if (x == "0") return "F";
      return "V";
    }
    return x;
  }


  caseMm: number = 1;


  fMostrarProceso() {
    this.mostrarProceso = !this.mostrarProceso;
  }

  replaceAll(str: string, find: string, replace: string) {

    while (str.includes(find)) {
      str = str.replace(find, replace);
    }
    return str;
  }

  setOpr(option: number) {
    this.modo = option;
    if (this.modo == 1) {
      this.infija = this.replaceAll(this.infija, "∧", "&");
      this.infija = this.replaceAll(this.infija, "∨", "|");
      this.infija = this.replaceAll(this.infija, "¬", "!");
    }
    else {
      this.infija = this.replaceAll(this.infija, "&", "∧");
      this.infija = this.replaceAll(this.infija, "|", "∨");
      this.infija = this.replaceAll(this.infija, "!", "¬");
    }

  }

  fverGuardadas(val: boolean) {
    this.verGuardadas = val;
  }





  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  regresar() {
    this.navCtrl.pop();
  }

  guardarExp() {
    if (this.infijaOrg) {
      if (this.expresionesGuardadas.includes(this.infijaOrg)) {
        this.presentToast("Ya ha sido guardado previamente");
      } else {
        this.expresionesGuardadas.push(this.infijaOrg);
        this.storage.set("expresiones", this.expresionesGuardadas);
        this.presentToast("Guardado exitosamente :)");
      }
    }
  }


  setModo(cadena: string) {
    let aux: string = cadena;
    cadena = this.replaceAll(cadena, "∧", "&");
    cadena = this.replaceAll(cadena, "∨", "|");
    cadena = this.replaceAll(cadena, "¬", "!");

    if (cadena !== aux) {
      this.modo = 2;
    } else {
      if (cadena.includes("&") || cadena.includes("|") || cadena.includes("!")) {
        this.modo = 1;
      }
    }

  }

  verExp(e: string) {
    this.clearMem();
    this.infija = e + '';
    this.setModo(this.infija);
    // this.toPostfix();
    this.verGuardadas = false;
    this.ok = true;
  }


  clear() {
    this.infija = "";
  }

  clickVar(c: string) {
    if (this.infija.length > 0 && this.operadores.includes(c)) {
      let lasC = this.infija[this.infija.length - 1];

      if (!(this.opr2var.includes(lasC) && this.opr2var.includes(c))) {
        this.infija = this.infija + c;
      }

    } else {
      if (!(this.opr2var.includes(c))) {
        this.infija = this.infija + c;
      }
    }

  }

  delete() {
    if (this.infija.length > 0) {
      this.infija = this.infija.substr(0, this.infija.length - 1);
    }
  }


  clearMem() {
    this.tabla = [];
    this.variables = [];
    this.mostrarProceso = false;
  }




  //Cambiar de mayusculas a minusculas
  changeCase() {
    if (this.caseMm == 1) this.caseMm = 0;
    else this.caseMm = 1;
  }

  toPostfix() {
    this.ok = false;
    this.infijaOrg = this.infija;


    /*  if (this.modo == 2) {
       this.infija = this.replaceAll(this.infija, "∧", "&");
       this.infija = this.replaceAll(this.infija, "∨", "|");
       this.infija = this.replaceAll(this.infija, "¬", "!");
     } */

    this.infija = this.replaceAll(this.infija, '[', '(');
    this.infija = this.replaceAll(this.infija, ']', ')');

    this.clearMem();

    this.infija = this.check(this.infija);
    this.infijaAux = this.infija;
    let prec = {};
    // "∨∧¬!&|()⇔⇒⊼⊻↓⊕"
    prec["!"] = 15;
    prec["¬"] = 15;
    prec["⊼"] = 14;
    prec["⊻"] = 13;
    prec["⊕"] = 12;
    prec["↓"] = 11;
    prec["&"] = 10;
    prec["∧"] = 10;
    prec["|"] = 9;
    prec["∨"] = 9;
    prec['⇍'] = 8;

    prec['￩'] = 7;
    prec['⇏'] = 6;
    prec['⇎'] = 5;
    prec['⇎'] = 5;
    prec['┲'] = 4;
    prec['┹'] = 3;

    prec["⇒"] = 2;
    prec["⇔"] = 1;

    prec["("] = 0;

    let opStack = [];
    let postfixList = [];

    for (const caracter of this.infija) {
      if (!this.operadores.includes(caracter)) {
        postfixList.push(caracter);
      }
      else if (caracter === '(') {

        opStack.push(caracter);

      }
      else if (caracter === ')') {
        let topToken = opStack.pop();
        while (topToken != "(") {
          postfixList.push(topToken);
          topToken = opStack.pop();
        }
      } else {

        while (opStack.length != 0 && (prec[opStack[opStack.length - 1]] > prec[caracter])) {
          postfixList.push(opStack.pop())
        }
        opStack.push(caracter);
      }
    }
    while (opStack.length > 0) {
      postfixList.push(opStack.pop());
    }
    this.postfija = "";
    this.postfija = postfixList.join("");
    //this.router.navigate(["/evaluador/"+strPostfix+"/"+this.infija])
    this.generarTabla();
    this.ok = true;

    //return strPostfix;

  }

  normalize(oper) {
    if (this.modo == 2) {
      oper = this.replaceAll(oper, "&", "∧");
      oper = this.replaceAll(oper, "|", "∨");
      oper = this.replaceAll(oper, "!", "¬");
    }
    return oper;
  }

  checkParentesis(exp: string) {
    let iL = this.infija.indexOf(exp);
    if (iL < 0) return false;
    let iR = iL + exp.length;
    if (iL > 0 && iR <= this.infija.length - 1) {
      let cR = this.infija[iR];
      let cL = this.infija[iL - 1];
      if (cR === ")" && cL === "(") return true;
    }

    return false;

  }

  getProceso(postfija: string) {
    let pila = [];
    this.proceso = [];
    this.historialOperaciones = [];
    for (const c of postfija) {
      let cantidadOpers = 1;
      let oper = "";
      let htmlOper = "";
      let nombre = "";
      let b;
      if (this.operadores.includes(c)) {
        // Evaluar
        let a = pila.pop();
        if (this.opr2var.includes(c)) {
          cantidadOpers = 2;
          b = pila.pop();
          let operator = this.opr2var[this.opr2var.indexOf(c)];
          if (["|", "∨"].includes(c)) {
            nombre = `Disyunción`;
          }
          else if (["&", "∧"].includes(c)) {
            nombre = `Conjunción`;
          }
          else if (["⇒"].includes(c)) {
            nombre = `Condicional/Implicación`;
          }
          else if (["⇔"].includes(c)) {
            nombre = `Bicondicional/Doble implicación`;
          }
          else if (["↓"].includes(c)) {
            nombre = "NOR";
          }
          else if (["⊼"].includes(c)) {
            nombre = "NAND";
          } else if (['￩'].includes(c)) {
            nombre = "Condicional inverso/Replicador";
          }

          else if (["⊻", "⊕"].includes(c)) {
            nombre = "XOR/Disyunción exclusiva";
          }
          else if (['⇍'].includes(c)) {
            nombre = "Negación del condicional inverso";
          }
          else if (['⇏'].includes(c)) {
            nombre = "Negación del condicional";
          }
          else if (['⇎'].includes(c)) {
            nombre = "Negación del bicondicional/XOR";
          }
          else if (['┲'].includes(c)) {
            nombre = "Tautología";
          }
          else if (['┹'].includes(c)) {
            nombre = "Contradicción";
          }
          htmlOper = ` ${b}<span class="operador-chido"> ${operator} </span>${a}`;
          oper = b + operator + a;
        }

        if (["!", "¬"].includes(c)) {
          nombre = "Negación";
          htmlOper = `<span class="operador-chido"> ${c} </span>${a}`;
          oper = c + a;
        }
        let aux = oper;
        if (a) {
          this.historialOperaciones.push(a);
        }
        if (b) {
          this.historialOperaciones.push(b);
        }
        if (this.checkParentesis(aux)) {

          pila.push("(" + oper + ")");
          if ("(" + oper + ")" && !this.diccionarioOperaciones["(" + oper + ")"]) {
            this.diccionarioOperaciones["(" + oper + ")"] = [];
            this.keysOperaciones.push("(" + oper + ")");
          }
          this.historialOperaciones.push("(" + oper + ")");
        }
        else {
          pila.push(oper);
          if (oper && !this.diccionarioOperaciones[oper]) {
            this.diccionarioOperaciones[oper] = [];
            this.keysOperaciones.push(oper);
          }
          this.historialOperaciones.push(oper);
        }


        if (a && !this.diccionarioOperaciones[a]) {
          this.diccionarioOperaciones[a] = [];
          this.keysOperaciones.push(a);
        }

        if (b && !this.diccionarioOperaciones[b]) {
          this.diccionarioOperaciones[b] = [];
          this.keysOperaciones.push(b);
        }





        if (cantidadOpers === 2) {
          this.proceso.push({ nombre, operandos: [b, a], exp: oper, html: htmlOper, tabla: [] });
        } else {
          this.proceso.push({ nombre, operandos: [a], exp: oper, html: htmlOper, tabla: [] });
        }
      } else {
        pila.push(c);
      }
    }
    //console.log(this.proceso);
  }




  generarTabla() {
    this.tabla = [];
    this.getProceso(this.postfija);
    /*  console.log("historial de operaciones");
     console.log(this.historialOperaciones);
     console.log("Diccionario de operaciones");
     console.log(this.diccionarioOperaciones); */
    //console.log(this.keysOperaciones);
    for (const caracter of this.postfija) {
      if (!this.operadores.includes(caracter) && !this.variables.includes(caracter)) {
        this.variables.push(caracter);
      }
    }
    this.variables = this.variables.sort();
    let nCombinaciones = Math.pow(2, this.variables.length);

    let cant0 = 0;
    let cant1 = 0;
    for (let i = nCombinaciones - 1; i >= 0; i--) {
      let combinacion = this.nBits(i.toString(2), this.variables.length)
      let susChida = this.sustituir(combinacion, this.postfija);
      //console.log(susChida);
      let resultado = this.evaluar(susChida);
      if (resultado == 1) {
        cant1 += 1;
        this.miniterminos.push(i);
      }

      if (resultado == 0) {
        this.maxiterminos.push(i);
        cant0 += 1;
      }
      this.tabla.push((combinacion + resultado).split(""));
    }

    if (cant1 == nCombinaciones) {
      this.diagnostico = "Tautología";
    }

    else if (cant0 == nCombinaciones) {
      this.diagnostico = "Contradicción";
    }

    else {
      this.diagnostico = "Contingencia";
    }

    console.log("variables: ", this.variables);
    if (this.miniterminos.length >= 1) {

      let kmap = new Kmap(this.miniterminos, this.variables);
      this.suma = kmap.suma;
      // this.multiplicacion = `¬(${kmap.multiplicacion})`
    }
    if (this.maxiterminos.length >= 1) {
      let kmap2 = new Kmap(this.maxiterminos, this.variables);

      this.multiplicacion = `¬[${kmap2.suma}]`;
    }
    /*  if (this.modo == 2) {
       this.infija = this.replaceAll(this.infija, "&", "∧");
       this.infija = this.replaceAll(this.infija, "|", "∨");
       this.infija = this.replaceAll(this.infija, "!", "¬");
     } */
    this.infija = this.infijaOrg;


  }

  sustituir(combinacion, postfija) {
    let auxPost = postfija;
    for (const caracter of auxPost) {
      if (caracter == "1" || caracter == "0") {
        continue;
      }
      else if (this.variables.includes(caracter)) {
        auxPost = this.replaceAll(auxPost, caracter, combinacion[this.variables.indexOf(caracter)]);
      }
    }
    return auxPost;
  }

  nBits(bin, n) {
    while (bin.length < n) {
      bin = "0" + bin;
    }
    return bin;
  }

  evaluar(expresion: string) {
    let pila = [];
    //console.log("Expresion", expresion);
    let iAux = 0;
    let keyCounter = 0;
    let historialLocal = [];
    for (let i = 0; i < expresion.length; i++) {
      let c = expresion[i];

      if (this.operadores.includes(c)) {
        // Evaluar
        let a = parseInt(pila.pop());
        if (keyCounter < this.historialOperaciones.length && !historialLocal.includes(this.historialOperaciones[keyCounter])) {
          historialLocal.push(this.historialOperaciones[keyCounter]);
          // console.log("Poner un", a, "en", this.historialOperaciones[keyCounter], "index", keyCounter);
          this.diccionarioOperaciones[this.historialOperaciones[keyCounter]].push(a);
        }
        keyCounter++;


        let resultado;

        if (this.opr2var.includes(c)) {
          let b = parseInt(pila.pop());
          if (keyCounter < this.historialOperaciones.length && !historialLocal.includes(this.historialOperaciones[keyCounter])) {
            historialLocal.push(this.historialOperaciones[keyCounter]);
            // console.log("Poner un", b, "en", this.historialOperaciones[keyCounter], "index", keyCounter);
            this.diccionarioOperaciones[this.historialOperaciones[keyCounter]].push(b);

          }
          keyCounter++;

          if (["|", "∨"].includes(c)) {
            if (!this.orOperator) this.orOperator = c;
            resultado = this.or(b, a);
          }
          else if (["&", "∧"].includes(c)) {
            if (!this.andOperator) this.andOperator = c;
            resultado = this.and(b, a);
          }
          else if (["⇒"].includes(c)) {
            resultado = this.condicional(b, a);
          }
          else if (["⇔"].includes(c)) {
            resultado = this.bicondicional(b, a);
          }
          else if (["↓"].includes(c)) {
            resultado = this.nor(b, a);
          }
          else if (["⊼"].includes(c)) {
            resultado = this.nand(b, a);
          }
          else if (["⊻", "⊕"].includes(c)) {
            resultado = this.xor(b, a);
          }
          else if (['￩'].includes(c)) {
            resultado = this.replicador(b, a);
          }
          else if (['⇏'].includes(c)) {
            resultado = this.not(this.condicional(b, a));
          }
          else if (['⇍'].includes(c)) {
            resultado = this.not(this.replicador(b, a));
          }
          else if (['⇎'].includes(c)) {
            resultado = this.not(this.bicondicional(b, a));
          }
          else if (['⇎'].includes(c)) {
            resultado = this.not(this.bicondicional(b, a));
          }
          else if (['⇎'].includes(c)) {
            resultado = this.not(this.bicondicional(b, a));
          }
          else if (['┲'].includes(c)) {
            resultado = 1;
          }
          else if (['┹'].includes(c)) {
            resultado = 0;
          }


        }
        if (["!", "¬"].includes(c)) {
          if (!this.notOperator) this.notOperator = c;
          resultado = this.not(a);
        }

        pila.push(resultado);
        //console.log("Current index", keyCounter);
        //console.log("Mmmmm....", this.historialOperaciones[keyCounter]);
        if (keyCounter < this.historialOperaciones.length && !historialLocal.includes(this.historialOperaciones[keyCounter])) {
          historialLocal.push(this.historialOperaciones[keyCounter]);
          //console.log("Poner un", resultado, "en", this.historialOperaciones[keyCounter], "index", keyCounter);
          this.diccionarioOperaciones[this.historialOperaciones[keyCounter]].push(resultado);
          keyCounter++;
        }
        else {
          //console.log("no entra");
          keyCounter++;

        }

        this.proceso[iAux].tabla.push(resultado);

        iAux += 1;
      } else {
        pila.push(c);
      }
    }

    return pila.pop();
  }



  //Sustituir dos variables juntas por la operación AND
  check(infija: string) {
    let res = "";
    for (let i = 0; i < infija.length - 1; i++) {
      let c = infija[i];
      let cNext = infija[i + 1];
      if ((cNext === "!" && this.varNames.includes(c))) {

        res += c + "&";
      }
      else if (c === ")" && cNext === "!") {

        res += c + "&";
      }
      else if (c === ")" && cNext === "(") {

        res += c + "&";
      }
      else if (this.varNames.includes(c) && this.varNames.includes(cNext)) {

        res += c + "&";
      }
      else if (this.varNames.includes(c) && cNext === "(") {

        res += c + "&";
      }
      else {
        res += c
      }

    }
    let lastC = infija[infija.length - 1];
    return res + lastC;
  }

  replicador(a, b) {
    if (a == 0 && b == 1) return 0;
    return 1;
  }


  tautologia(a, b) {
    return 1;
  }

  contradiccion(a, b) {
    return 0;
  }

  or(a, b) {
    if (a == 1 || b == 1) return 1;
    return 0;
  }

  and(a, b) {
    if (a == 1 && b == 1) return 1;
    return 0;
  }

  not(a) {
    if (a == 1) return 0;
    return 1;
  }


  xor(a, b) {
    if (a == b) return 0;
    return 1;
  }

  nand(a, b) {
    return this.not(this.and(a, b));
  }

  xnor(a, b) {
    return this.not(this.xor(a, b))
  }

  nor(a, b) {
    return this.not(this.or(a, b));
  }


  condicional(a, b) {
    if (a == 1 && b == 0) return 0;
    return 1;
  }

  bicondicional(a, b) {
    if (a == b) return 1;
    return 0;
  }

  formatDate(date) {
    //date = date.toDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDay();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = day + '/' + month + "/" + year;
    return strTime;
  }


  safeHtml(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
