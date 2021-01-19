document.body.style.width   = '100%';
document.body.style.height  = '100vh';
document.body.style.padding = '0';
document.body.style.margin  = '0';

// var NUM_MATRICES = 0;

/**
 * Cria os elementos HTML que definem a matriz de pixels e os pixels organizados 
 * em grade, e retorna o Array de Arrays (Matriz) com os elementos HTML.
 * 
 * @param {Number} numOfRows o número de linhas de pixels para a matriz
 * @param {Number} numOfColumns o número de colunas de pixels para a matrix
 * @param {HTMLElement} parentElement elemento HTML que irá conter a matriz de pixels
 * @param {Number} pixelSize tamanho dos pixels em "px" [default = 10px]
 * @return {Array<Array<HTMLElement>>}
 */
function Matrix(numOfRows, numOfColumns, parentElement, pixelSize = 20) {
    this.height = numOfRows;    // Altura da matrix de pixels (numero de linhas)
    this.width  = numOfColumns; // Largura da matrix de pixels (numero de colunas)
    this.pixelSize = pixelSize; // Tamanho das divs que representam os pixels

    let divRootElement = document.createElement("div");
    divRootElement.classList.add("pixels-grid-container", "bordered");
    divRootElement.setAttribute("id", "matrix-container");

    for (let i = 0; i < this.height; i++) {
        let rowElem = document.createElement("div");
        rowElem.classList.add("matrix-row");

        for (let k = 0; k < this.width; k++) {
            let pixElem = document.createElement("div");
            pixElem.classList.add("pixel");
            pixElem.style.width  = `${this.pixelSize}px`;
            pixElem.style.height = `${this.pixelSize}px`;
            rowElem.appendChild(pixElem);
        }
        divRootElement.appendChild(rowElem);
    }
    parentElement.appendChild(divRootElement);

    /**
     * Retorna o elemento HTML de um pixel em uma dada posicao no sistema de
     * coordenadas cartesiano.
     * @param {Number} x coordenada no eixo X
     * @param {Number} y coordenada no eixo Y
     */
    this.getPixel = function(x, y) {
        return document.querySelectorAll('#matrix-container > .matrix-row')[this.height-1 - x].childNodes[y];
    };

    /**
     * Pinta um pixel em uma dada posicao (x,y) no sistemas de coordenadas cartesiano.
     * @param {Number} x coordenada no eixo X
     * @param {Number} y coordenada no eixo Y
     * @param {String} color cor para pintar o pixel
     */
    this.paint = function(x, y, color='black') {
        let pixel = this.getPixel(x, y);
        pixel.style.backgroundColor = color;
        pixel.style.borderColor = color;
    };
}

// TODO: Documentar a matrix com quadrantes
const QuadMatrix = {
    width: 0,

    height: 0,

    xRange: {
        minor: 0,
        major: 0
    },

    yRange: {
        minor: 0,
        major: 0
    },

    originIndex: {
        x: 0, // function() { return Math.abs(this.yRange.minor) },
        y: 0, // function() { return Math.abs(this.xRange.minor) },
    },

    /** Lista de listas de elementos "div", onde cada elemento representa um pixel */
    pixels: new Array(0),

    /** Getter para um pixel. Calcula os indices de acordo com os ranges dos 
     * eixos X e Y, ou seja, aceita valores negativos nos indices desde que 
     * estejam dentro dos interbalos definidos. 
     * @param {Number} x coordenada no eixo x
     * @param {Number} y coordenada no eixo y
     */
    get: function(x, y) {
        newx = this.originIndex.y - y;
        newy = this.originIndex.x + x;
        console.log(`Mapeando as coordenadas (${x},{y}) para (${newx},${newy})`);
        return this.pixels[newx][newy];
    },

    /**
     * Criar uma matrix com a logica de indexacao dos quatro quadrantes de um
     * plano cartesiano.
     * 
     * @param {Number} minorX o limite inferior par a o eixo x 
     * @param {Number} majorX o limite superior par a o eixo x
     * @param {Number} minorY o limite inferior par a o eixo y
     * @param {Number} majorY o limite superior par a o eixo y
     * @param {HTMLElement} parentElement o elemento HTML que ira conter o elemento de 
     * matriz criada
     * @param {Number} pixelSize tamanho de cada elemento quadrado que representa um
     * pixel (em pixels)
     * @returns {QuadMatrix}
     */
    create: function(minorX, majorX, minorY, majorY, parentElement, pixelSize = 20) {
        let result = Object.create(QuadMatrix);
        if (minorX >= 0 || minorY >= 0 || majorX <= 0 || majorY <= 0) {
            throw "Ranges for X or Y axis is invalid!";
        }
        // Define informacoes largura e intervalos dos eixos do plano
        result.xRange.minor = minorX;
        result.xRange.major = majorX;
        result.yRange.minor = minorY;
        result.yRange.major = majorY;
        result.width  = Math.abs((majorX - minorX) + 1);
        result.height  = Math.abs((majorY - minorY) + 1);
        // Define o indice da origem no array
        result.originIndex.x = Math.abs(result.xRange.minor)
        result.originIndex.y = Math.abs(result.yRange.major)
        console.table(result.originIndex)

        // TODO: Criar elementos HTML ...
        var divRootElement = document.createElement("div");
        divRootElement.classList.add("pixels-grid");
        divRootElement.style.gridTemplateRows = `repeat(${result.height}, ${pixelSize}px)`;
        divRootElement.style.gridTemplateColumns = `repeat(${result.width}, ${pixelSize}px)`;

        for (let i=0; i < result.height; i++) {
            let matrixRow = [];
            for (let k=0; k < result.width; k++) {
                let newPixel = document.createElement("div");
                newPixel.classList.add("pixel");
                // newPixel.innerText = `(${result.xRange.minor+k}, ${result.yRange.major-i})`; // linha usada em debug
                newPixel.style.fontSize = ".5em";
                matrixRow.push(newPixel);
                divRootElement.appendChild(newPixel);
            }
            result.pixels.push(matrixRow);
        }
        parentElement.appendChild(divRootElement);

        return result;
    },

    paint: function(coordX, coordY, color = 'black') {
        let pixelElement = this.get(coordX, coordY);
        pixelElement.style.backgroundColor = String(color);
    },
};
