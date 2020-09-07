

export class TablaVerdad {


    constructor(proposicion, total, nombresVariables) {
        proposicion = proposicion.split(' ').join('');
        this.infija = proposicion;
        this.tabla = [];
        this.variables = [...nombresVariables];
        this.postfix = "";
        this.operators = "'.+()'";
        this.opr2var = ".+";
        this.isTautologia = false;
        this.isContradiccion = false;
        this.total = total;

        this.toPostfix();
        this.calcularTabla();

    }

    toPostfix() {
        let prec = {};
        prec["'"] = 3;
        prec["."] = 2;
        prec["+"] = 1;
        prec["("] = 0;

        let opStack = [];
        let postfixList = [];

        for (const caracter of this.infija) {
            if (!this.operators.includes(caracter)) {
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
        this.postfix = "";
        this.postfix = postfixList.join("");
    }

    nBits(bin, n) {
        while (bin.length < n) {
            bin = "0" + bin;
        }
        return bin;
    }

    calcularTabla() {
        for (const caracter of this.postfix) {
            if (!this.operators.includes(caracter) && !this.variables.includes(caracter)) {
                this.variables.push(caracter);
            }
        }
        this.variables = this.variables.sort();

        let nCombinaciones = Math.pow(2, parseInt(this.total));

        let cant0 = 0;
        let cant1 = 0;

        for (let i = 0; i < nCombinaciones; i++) {
            let combinacion = this.nBits(i.toString(2), this.total)
            let susChida = this.sustituir(combinacion, this.postfix);
            let resultado = this.evaluar(susChida);
            if (resultado == 0) cant0++;
            else if (resultado == 1) cant1++;
            else {
                resultado = "0";
                cant0++;
            }
            this.tabla.push([i, combinacion, resultado]);
        }
        if (cant1 == nCombinaciones) this.isTautologia = true;
        else if (cant0 == nCombinaciones) this.isContradiccion = true;
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

    replaceAll(str, find, replace) {

        while (str.includes(find)) {
            str = str.replace(find, replace);
        }
        return str;
    }

    evaluar(expresion) {
        let pila = [];
        let iAux = 0;
        for (let i = 0; i < expresion.length; i++) {
            let c = expresion[i];

            if (this.operators.includes(c)) {
                // Evaluar
                let a = parseInt(pila.pop());
                let resultado;

                if (this.opr2var.includes(c)) {
                    let b = parseInt(pila.pop());
                    if (["+"].includes(c)) {
                        resultado = this.or(b, a);
                    }
                    else if (["."].includes(c)) {
                        resultado = this.and(b, a);
                    }
                }
                if (["'"].includes(c)) {
                    resultado = this.not(a);
                }
                pila.push(resultado);

            } else {
                pila.push(c);
            }
        }

        return pila.pop();
    }

    and(a, b) {
        return (a == 1 && b == 1) ? 1 : 0;
    }

    not(a) {
        return a == 0 ? 1 : 0;
    }

    or(a, b) {
        return (a == 1 || b == 1) ? 1 : 0;
    }

}