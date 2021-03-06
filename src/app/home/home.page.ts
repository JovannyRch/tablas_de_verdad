import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';

import { ToastController, Platform, NavController, AlertController } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router, NavigationExtras } from "@angular/router";
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
//importamos nuestro plugin
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  constructor(platform: Platform,
    private admobFree: AdMobFree,
    public toastController: ToastController,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public navCtrl: NavController,
    private router: Router,
    public alertController: AlertController

  ) {
    platform.ready().then(() => {
      //statusBar.styleDefault();
      //splashScreen.hide();
      //this.pushAdmob();

      // this.mostrarVideo();
    });
    this.backButtonEvent();
  }

  isApp: boolean = (document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
  isPremium: boolean = false;


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.varNames.includes(event.key) || this.operadores.includes(event.key)) {
      this.infija = this.infija + event.key;
    } else {
      console.log(event.keyCode);
      if (event.keyCode == 8) {
        this.infija = this.infija.substring(0, this.infija.length - 1);
      }
      else if (event.keyCode == 13) {
        this.verResultado();
      }
      else if (event.keyCode == 46) {
        this.infija = "";
      }
    }
  }

  clickCorchetes(val) {
    if (val == 0) {
      this.clickVar("{");
    }
    else {
      this.clickVar("}");
    }
  }

  backButtonEvent() {
    document.addEventListener("backbutton", () => {
      console.log(this.router.url);
      if (this.router.url.toString().includes('/home')) {
        navigator['app'].exitApp();
      }
    });
  }

  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  ngAfterViewInit() {

  }
  expresionesGuardadas: any = [];
  ngOnInit() {
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
    if (this.isApp && !this.isPremium) {
      this.admobFree.banner.config(bannerConfig);
      this.admobFree.rewardVideo.config(videoConfig);
      this.mostrarBanner();
    }

  }

  mostrarBanner() {

    this.admobFree.banner.prepare()
      .then(() => {
        this.admobFree.banner.show();
        //console.log("show banner");
      });
  }

  mostrarVideo() {
    this.admobFree.rewardVideo.prepare()
      .then(() => {
        this.admobFree.rewardVideo.show();
      });
  }


  postfija: string = "";
  infija: string = "";
  infijaOrg: string = "";
  infijaAux: string = "";
  indexPuntero = 0;

  variables: string[] = [];
  operadores: string = "∨∧¬!&|()⇔⇒⊼⊻↓⊕￩⇏⇎⇍┹┲~";
  opr2var: string = "∨∧⇔⇒⊼⊻↓⊕|&￩⇏⇎⇍┹┲";
  varMays: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  varNames: string = this.varMays + this.varMays.toLowerCase();
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
  guardarEnNube: boolean = false;

  descripcion: string = "";

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
  letras: any = [
    { 1: "A", 0: "a" },
    { 1: "B", 0: "b" },
    { 1: "C", 0: "c" },
    { 1: "D", 0: "d" },
    { 1: "E", 0: "e" },
    { 1: "F", 0: "f" },

    { 1: "G", 0: "g" },
    { 1: "H", 0: "h" },
    { 1: "I", 0: "i" },
    { 1: "J", 0: "j" },
    { 1: "K", 0: "k" },

    { 1: "L", 0: "l" },
    { 1: "M", 0: "m" },
    { 1: "N", 0: "n" },
    { 1: "O", 0: "o" },

    { 1: "P", 0: "p" },
    { 1: "Q", 0: "q" },
    { 1: "R", 0: "r" },
    { 1: "S", 0: "s" },
    { 1: "T", 0: "t" },
    { 1: "U", 0: "u" },
    { 1: "V", 0: "v" },
    { 1: "W", 0: "w" },
    { 1: "X", 0: "x" },
    { 1: "Y", 0: "y" },
    { 1: "Z", 0: "z" },
    /* { 1: "1", 0: "1" },
    { 1: "0", 0: "0" }, */
  ];

  //bandera para saber si una expresion es correcta
  ok: boolean = false;
  saveImg() {
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

  clear() {
    this.infija = "";
  }

  clickVar(c: string) {
    this.infija = this.infija + c;
    /* let lasC = this.infija[this.infija.length - 1];
      if (this.infija.length > 0 && this.operadores.includes(c)) {

      if (!(this.opr2var.includes(lasC) && this.opr2var.includes(c))) {
        this.infija = this.infija + c;
      }
    } else {
      if (!(this.opr2var.includes(c))) {
        this.infija = this.infija + c;
      }
    } */
  }


  delete() {
    if (this.infija.length > 0) {
      this.infija = this.infija.substr(0, this.infija.length - 1);
    }
  }

  back() {
    this.ok = false;
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

  verResultado() {
    this.toPostfix();
  }

  validar() {
    if (this.infija === "") return false;
    return true;
  }

  check(infija: string) {
    let res = "";
    for (let i = 0; i < infija.length - 1; i++) {
      let c = infija[i];
      let cNext = infija[i + 1];
      if ((cNext === "¬" && this.varNames.includes(c))) {

        res += c + "∧";
      }
      else if (c === ")" && cNext === "!") {

        res += c + "∧";
      }
      else if (c === ")" && cNext === "(") {

        res += c + "∧";
      }
      else if (this.varNames.includes(c) && this.varNames.includes(cNext)) {

        res += c + "∧";
      }
      else if (this.varNames.includes(c) && cNext === "(") {

        res += c + "∧";
      }
      else {
        res += c
      }

    }
    let lastC = infija[infija.length - 1];
    return res + lastC;
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({

      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  toPostfix() {
    this.ok = false;

    this.infijaOrg = this.infija;

    this.infijaOrg = this.replaceAll(this.infijaOrg, '[', '(');
    this.infijaOrg = this.replaceAll(this.infijaOrg, ']', ')');
    this.infijaOrg = this.replaceAll(this.infijaOrg, '{', '(');
    this.infijaOrg = this.replaceAll(this.infijaOrg, '}', ')');

    this.clearMem();

    /* this.infijaOrg = this.check(this.infijaOrg); */
    this.infijaAux = this.infijaOrg;
    let prec = {};
    // "∨∧¬!&|()⇔⇒⊼⊻↓⊕"
    prec['~'] = 16
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

    for (let i = 0; i < this.infijaOrg.length; i++) {
      const caracter = this.infijaOrg[i];
      if (!this.operadores.includes(caracter)) {
        postfixList.push(caracter);
      }
      else if (caracter === '(') {

        opStack.push(caracter);
        if (!this.infijaOrg.substr(i + 1).includes(')')) {
          this.presentAlert("Error de sintaxis", "Parentesis incompleto, falta un ')'");
          return;
        }

      }
      else if (caracter === ')') {
        let topToken = opStack.pop();
        if (!opStack.includes("(")) {
          this.presentAlert("Error de sintaxis", "Parentesis incompleto, falta un '('");
          return;
        }
        while (topToken != "(") {
          postfixList.push(topToken);
          if (opStack.length != 0) {
            topToken = opStack.pop();
          }
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
    if (this.evaluar(this.postfija)) {
      let navigationExtras: NavigationExtras = {
        queryParams: { infija: this.infija, postfija: this.postfija }
      };
      this.router.navigate(["resultado"], navigationExtras);
    }

    //return strPostfix;

  }

  evaluar(expresion: string): boolean {
    let pila = [];
    for (let i = 0; i < expresion.length; i++) {
      let c = expresion[i];
      if (this.operadores.includes(c)) {
        // Evaluar
        if (pila.length == 0) {
          if (this.opr2var.includes(c)) {
            this.presentAlert("Error de sintaxis", `El operador ${c} necesita dos operandos`);
          } else {
            this.presentAlert("Error de sintaxis", `El operador ${c} necesita 1 operando`);
          }
          return false;
        }
        let a = parseInt(pila.pop());
        let resultado;
        if (this.opr2var.includes(c)) {

          if (pila.length == 0) {
            this.presentAlert("Error de sintaxis", `El operador ${c} necesita 2 operandos`);
            return false;
          }
          let b = parseInt(pila.pop());
          resultado = "9";
        }
        if (["!", "¬", "~"].includes(c)) {
          resultado = "9";
        }
        pila.push(resultado);
      } else {
        pila.push(c);
      }
    }

    if (pila.length == 1) {
      return true;
    }
    else {
      this.presentAlert("Error de sintaxis", `La proposición lógica no está bien formada`);
      return false;
    }
  }


}


