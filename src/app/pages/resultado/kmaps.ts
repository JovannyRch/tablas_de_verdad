export class Kmap {
    f: number[];
    simplificacion: string;

    d = [];
    indexRow = [];
    finalTable = [];
    ans = [];
    table2 = [];
    res = "";
    variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    varsUsed = [];
    suma = "";
    multiplicacion: string = "";
    circuito = '';
    notOperator: string = "";
    andOperator: string = "";
    orOperator: string = "";
    variables2: string[] = [];

    constructor(tablaverdad: number[], variables: string[], or: string = "∨", and: string = "∧", not: string = "¬") {
        this.f = tablaverdad.reverse();
        this.notOperator = not;
        this.orOperator = or;
        this.andOperator = and;
        this.variables2 = variables;
        // console.log("F=", this.f);
        //console.log("Variables 2", this.variables2);
        //console.log(this.f);
        if (this.f.length >= 1) {
            //console.log("Reducir");
            this.reduce();
        }

    }
    reduce() {


        this.f.sort((a, b) => a - b);


        let max;
        max = this.f[this.f.length - 1];

        let l = max.toString(2).length;
        if (l == 1) l = 2;

        //console.log("Cantidad de 1", l);
        let table = [];
        let tMap = {};
        let map = {};

        for (let i = 0; i <= l + 1; i++) map[i] = [];

        let ones = 0;
        let union = [...this.f];
        for (let n of union) {
            let bin = this.formatBin(n.toString(2), l);
            let row = this.Row(n, bin);
            table.push(row);
            tMap[n] = bin;
            ones = this.countOnes(bin);
            map[ones].push(row);
        }


        let indices = [];

        for (let k in map) {
            if (map[k].length) {
                //Agrupación por cantidad de 0's
                //console.log(k, map[k]);
                indices.push(k);
            }
        }



        //Empezar a comparar 
        let checkChanges = function (bin1, bin2) {
            let changes = [];
            for (let i = 0; i < bin1.length; i++) {
                if (bin1[i] != bin2[i]) {
                    changes.push(i);
                    if (changes.length > 1) return changes;
                }
            }
            return changes;
        }


        let changeBit = function (bin, i, newChar) {
            let ans = "";
            for (let j = 0; j < bin.length; j++) {
                if (j == i) ans += newChar;
                else ans += bin[j];
            }
            return ans;
        }


        //Tabla de implicantes primos
        let tableImp = [];
        let used = [];
        for (let i = 0; i <= indices.length - 1; i++) {

            let g1 = map[i];
            let g2 = map[i + 1];

            if (g2 != null) {
                for (let n1 of g1)
                    for (let n2 of g2) {
                        let bitChanges = checkChanges(n1.bin, n2.bin);
                        if (bitChanges.length == 1) {
                            let binImp = changeBit(n1.bin, bitChanges[0], "-");
                            tableImp.push(this.Row([n1.m, n2.m], binImp));
                            used.push(n1.m);
                            used.push(n2.m);
                        }
                    }
            }
        }

        //for (let row of tableImp) console.log(row);
        let checkMarks = [];
        let mCheckeds = [];

        let map2 = {};
        for (let i = 0; i < tableImp.length - 1; i++) {
            let b1 = tableImp[i];
            for (let j = i + 1; j < tableImp.length; j++) {
                let b2 = tableImp[j];
                let newM = b1.m.concat(b2.m);
                let newMSort = newM.sort();
                if (map2[newMSort] == null) {
                    let index = this.checkGuion(b1.bin, b2.bin);
                    if (index != -1) {
                        let bitChanges = checkChanges(b1.bin, b2.bin);
                        if (bitChanges.length == 1) {
                            let binImp = changeBit(b1.bin, bitChanges[0], "-");
                            this.table2.push(this.Row(b1.m.concat(b2.m), binImp));
                            checkMarks.push(b1.m);
                            checkMarks.push(b2.m);
                            mCheckeds = mCheckeds.concat(b1.m);
                            mCheckeds = mCheckeds.concat(b2.m);
                            map2[newMSort] = 1;

                            for (let n of newMSort) {
                                if (tMap["" + n] != null) {
                                    tMap["" + n] = null;
                                }
                            }
                        }
                    }
                }
            }
        }
        mCheckeds = mCheckeds.sort();
        for (let r of tableImp) {
            let counter = 0;
            for (let n of r.m) {
                if (mCheckeds.indexOf(n) >= 0) counter++;
            }
            if (counter != 2) {
                this.table2.push(this.Row(r.m, r.bin));
            }
        }


        for (let k in tMap) {
            if (used.indexOf(parseInt(k)) < 0 && this.d.indexOf(parseInt(k)) < 0) {
                this.table2.push(this.Row([parseInt(k)], tMap[k]));
            }
        }


        //console.log("Final table: ");

        for (let r of this.table2) {

            let row = [];
            for (let n of this.f) {
                if (r.m.indexOf(n) >= 0) row.push(1);
                else row.push(0);
            }
            r.bin = this.buildExpression(r.bin)
            //console.log(row, r);
            this.finalTable.push(row);
        }

        //console.log(this.table2);



        //Columnas con un solo miembro
        for (let col = 0; col < this.f.length; col++) {
            let cont = 0;
            let valRow = -1;
            for (let row = 0; row < this.finalTable.length; row++) {
                if (this.finalTable[row][col] == 1) {
                    cont++;
                    if (cont == 1) valRow = row;
                    if (cont > 1) break;
                }
            }

            if (cont == 1 && this.indexRow.indexOf(valRow) < 0) {
                //console.log("valor unico en el renglon", valRow)
                this.indexRow.push(valRow);
            }
        }



        this.indexRow.sort((a, b) => a - b);
        this.clearColumns();
        this.indexRow = [];

        //Cross columns
        for (let row = 0; row < this.finalTable.length; row++) {
            var sumRow = this.sum(this.finalTable[row]);
            if (sumRow > 1) {
                for (let col = 0; col < this.finalTable[row].length; col++) {
                    if (this.finalTable[row][col]) {
                        //Revisar si cruza
                        let sumCol = 0;
                        for (let row2 = 0; row2 < this.finalTable.length; row2++) {
                            if (this.finalTable[row2][col]) sumCol++;
                        }
                        if (sumCol > 1) {
                            //Cruce de columnas
                            this.indexRow.push(row);
                            break;
                        }
                    }
                }
                this.clearColumns();
                this.indexRow = [];
            }
        }

        //Columnas solitarias
        for (let col = this.f.length - 1; col >= 0; col--) {
            for (let row = this.finalTable.length - 1; row >= 0; row--) {
                if (this.finalTable[row][col] == 1) {
                    this.indexRow.push(row);
                    break;
                }
            }
        }

        this.clearColumns();
        //console.log(this.ans);
        this.suma = this.buildSuma(this.ans);
        this.multiplicacion = this.buildMultiplicacion(this.ans);

        /*  console.log("suma", this.suma);
         //this.suma = this.eraseChar(this.suma, ',');
         this.varsUsed.sort();
         let aux = [];
         for (let v of this.varsUsed) {
             aux.push(v);
             aux.push(this.notOperator + v);
         } */


    }

    buildSuma(functions: any) {
        let aux = [];
        for (let f of functions) {
            console.log("f", f);
            if (f.length > 1) {
                aux.push(`(${f.join(this.andOperator)})`)
            }
            else {

                aux.push(f.join(this.andOperator));
            }
        }

        return aux.join(" " + this.orOperator + " ");
    }

    buildMultiplicacion(functions: any) {
        console.log(functions);
        let aux = [];
        for (let f of functions) {
            console.log("f", f);
            if (f.length > 1) {
                aux.push(`(${f.join(this.orOperator)})`)
            }
            else {

                aux.push(f.join(this.orOperator));
            }
        }

        return aux.join(" " + this.andOperator + " ");
    }





    formatBin(bin, n) {
        while (bin.length < n) {
            bin = "0" + bin;
        }
        return bin;
    }

    countOnes(bin) {
        let res = 0;
        for (let c of bin) if (c == '1') res++;
        return res;
    }


    Row(m, bin) {
        return { m, bin };
    }

    checkGuion(b1, b2) {
        for (let i = 0; i < b1.length; i++) {
            if (b1[i] == "-" && b1[i] == b2[i]) return i;
        }
        return -1;
    }

    buildExpression(bin) {
        let res = [];
        //console.log("bin", bin);
        for (let i = 0; i < bin.length; i++) {
            if (this.varsUsed.indexOf(this.variables[i]) < 0) {

                this.varsUsed.push(this.variables[i]);
            }
            if (bin[i] == "1") res.push(this.variables[i]);
            else if (bin[i] == "0") res.push(this.notOperator + this.variables[i]);
        }
        return res;
    }

    clearColumns() {
        for (let index of this.indexRow) {
            for (let i = 0; i < this.finalTable[index].length; i++) {
                let bit = this.finalTable[index][i];
                if (bit) {
                    //Limpiar columna i
                    for (let j = 0; j < this.finalTable.length; j++) {
                        if (this.finalTable[j][i]) this.finalTable[j][i] = 0;
                    }
                }
            }
            //console.log(this.finalTable);
            let ex = this.table2[index].bin;

            this.ans.push(ex);
        }
        this.indexRow = [];

    }

    sum(arr) {
        var ans = arr.reduce(function (a, b) {
            return a + b;
        }, 0);
        return ans;
    }


    eraseChar(s, c) {
        while (s.indexOf(c) >= 0) {
            s = s.replace(c, '');
        }
        return s;
    }

}