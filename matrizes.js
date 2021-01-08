
const Matrix = {
    /** Largura da matrix de pixels (numero de colunas) */
    width: 0,

    /** Altura da matrix de pixels (numero de linhas) */
    height: 0,

    /** Lista de listas de elementos "div", onde cada elemento representa um pixel */
    pixels: new Array(0),

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
    create: function(numOfRows, numOfColumns, parentElement, pixelSize = 20) {
        resultantObject = Object.create(Matrix);
        resultantObject.height = numOfRows;
        resultantObject.width = numOfColumns;

        let divRootElement = document.createElement("div");
        divRootElement.classList.add("pixels-grid");
        divRootElement.style.gridTemplateRows = `repeat(${numOfRows}, ${pixelSize}px)`;
        divRootElement.style.gridTemplateColumns = `repeat(${numOfColumns}, ${pixelSize}px)`;

        for (let i=0; i < numOfRows; i++) {
            let matrixRow = [];
            for (let k=0; k < numOfColumns; k++) {
                let newPixel = document.createElement("div");
                newPixel.classList.add("pixel");
                matrixRow.push(newPixel);
                divRootElement.appendChild(newPixel);
            }
            resultantObject.pixels.unshift(matrixRow);
        }
        parentElement.appendChild(divRootElement);
        return resultantObject;
    },

    /**
     * Pinta um pixel da matriz com a cor preta, desde que os valores passados
     * sejam menores do que os respectivos tamanhos de cada dimensao.
     * Imprime um erro no console caso alguma das coordenadas passadas seja
     * invalida.
     * 
     * @param {Number} coordX coordenada no eixo X
     * @param {Number} coordY coordenada no eixo Y
     * @param {String} color cor para aplicar no pixel
     */
    paint: function(coordX, coordY, color = 'black') {
        if ((coordX >= 0) && (coordX < this.pixels[0].length) &&
            (coordY >= 0) && (coordY < this.pixels.length))
        {
            let pixel = this.pixels[coordY][coordX];
            pixel.style.backgroundColor = color;
            pixel.style.borderColor = color;
        } else {
            console.error("Impossible to access index ["+ coordX +":"+ coordY +"]");
        }
    },
};

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
