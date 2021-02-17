// PRIMEIRO PASSO
// definir as sequencias de bits de limitacao

function Bounds({xMin, xMax, yMin, yMax}) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;

    this.sign = (point) => {
        let boolValues = new Array(false, false, false, false);
        boolValues[0] = !(this.yMax - point.y > 0);
        boolValues[1] = !(point.y - this.yMin > 0);
        boolValues[2] = !(this.xMax - point.x > 0);
        boolValues[3] = !(point.x - this.xMin > 0);
        return boolValues;
    }
}

// SEGUNDO PASSO
// Casos em que a linha esta totalmente fora ou totalmente dentro da janela

function triviallyAccepted(codeP1, codeP2) {
    let resultOR  = new Array(4);
    for (let i=0; i < 4; i++) {
        resultOR[i]  = codeP1[i] || codeP2[i];
    }
    return resultOR.every(value => value === false);
}

function triviallyRejected(codeP1, codeP2) {
    let resultAND  = new Array(4);
    for (let i=0; i < 4; i++) {
        resultAND[i]  = codeP1[i] && codeP2[i];
    }
    return resultAND.some(value => value === true);
}


function recorte(bounds, p1, p2) {
    let codeP1 = bounds.sign(p1);
    let codeP2 = bounds.sign(p2);

    let linha;
    if (triviallyAccepted(codeP1, codeP2)) {
        linha = Bresenham(p1, p2);
    } else if (triviallyRejected(codeP1, codeP2)) {
        console.warn("Trivialmente Rejeitado! Linha fora da janela de interesse.");
    } else {
        let newP1 = {};
        Object.assign(newP1, p1);
        let newP2 = {};
        Object.assign(newP2, p2);
        
        let xm = Math.round((newP1.x + newP2.x)/2);
        let ym = Math.round((newP1.y + newP2.y)/2);
        let pointM = new Point(xm, ym);
        console.log(pointM);

        let linha1 = recorte(bounds, p1, pointM);
        console.log(linha1);

        let linha2 = recorte(bounds, pointM, p2);
        console.log(linha2);

        linha.allPoints = linha1.allPoints.concat(linha2.allPoints);
    }

    return linha;
}
