// Funcao para multiplicar um valor escalar por um vetor, usada para
// multiplicar um escalar por um ponto (par de escalares)

/**
 * Multiplicação entre um escalar e um vetor. Retorn um novo vetor em que cada 
 * elemento é o resultado da multiplicação do escalar N por um elemento do vetor
 * original
 * @param {Number} scalar valor numérico escalar
 * @param {Array<Number>} vector vetor de valores numéricos
 * @return {Array<Number>} vetor com os valores multiplicados
 */
function prodScalarVector(scalar, vector) {
    var newVector = new Array(0);
    Object.assign(newVector, vector);
    for (let i=0; i < newVector.length; i++) {
        newVector[i] = scalar*vector[i];
    }
    return newVector;
}

/**
 * Soma dois pontos representados por arrays/pares
 * @param {*} a Ponto A 
 * @param {*} b Ponto B
 */
function sumPoints(a, b) {
    return Array( a[0]+b[0], a[1]+b[1] );
}

function bezier(ctrl) {
    const points = ctrl.map(cp => cp.toArray());
    console.log(points);
}

/**
 * Arredonda todos os valores numéricos em um Array para o inteiro mais próximo
 * @param {Array<Number>} arr array para arredondar
 * @return {Array<Number>} array com os valores arrendodados
 */
function roundAll(arr) {
    return arr.map(el => Math.round(el))
}

/**
 * Algoritmo de Casteljau.
 * @param {Array} points Pontos de controle
 * @param {Number} t Valor de T
 */
function casteljau(points, t) {
    const N = points.length-1;
    var pts = new Array(N);
    Object.assign(pts, points);
    
    for (let r=1; r <= N; r++) {
        for (let i=0; i <= N-r; i++) {
            pts[i] = sumPoints(
                prodScalarVector((1-t), pts[i]), 
                prodScalarVector(t, pts[i+1]) );
        }
    }

    return roundAll( pts[0] );
}

/** 
 * Desenhar um curva de bezier a partir das coordenadas dos pontos de controle e
 * a quantidade de amostras da linha da curva.
 * @param {Number} numberT número de amostras da curva para conectar com retas
 * @param {Array<Point>} controlPoints lista de coordenadas dos pontos de 
 * controle que definem a curva.
 */
function bezierCurve(numberT, controlPoints, matrix) {
    // Transformar a lista de pontos em lista de arrays
    var pointsAsArray = controlPoints.map(p => p.toArray());

    // Definir os valores de T para os quais serao calculados os pontos
    const intervalo = 1/(numberT+1);
    var tList = new Array(0);
    for (let i=intervalo; i < 1; i += intervalo) {
        tList.push(i);
    }

    // Para cada T, calcular um ponto da curva com o algoritmo de Casteljau
    var calculatedPoints = tList.map(t => {
        return casteljau(pointsAsArray, t);
    });
    calculatedPoints.unshift(pointsAsArray[0]); // Adiciona o ponto inicial
    calculatedPoints.push(pointsAsArray[pointsAsArray.length-1]); // Ponto final

    // Traçar as retas entre cada ponto calculado com Casteljau
    for (let i=0; i < calculatedPoints.length-1; i++) {
        const p0 = new Point(calculatedPoints[i][0], calculatedPoints[i][1]);
        const p1 = new Point(calculatedPoints[i+1][0], calculatedPoints[i+1][1]);
        // Cria a linha usando o Bresenham
        const line = new Bresenham(p0, p1).allPoints;
        line.forEach(p => {
            matrix.paint(p.x, p.y);
        });
    }
}
