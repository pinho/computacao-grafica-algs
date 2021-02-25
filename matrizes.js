document.body.style.width   = '100%';
document.body.style.height  = '100vh';
document.body.style.padding = '0';
document.body.style.margin  = '0';

/**
 * Dadas as coordenadas x e y, define qual o quadrante em que o ponto est'a. */
function whichQuadrant(x, y) {
    if (x >= 0) {
	if (y >= 0) return 1;
        else return 4;
    } else {
	if (y >= 0) return 2;
	else return 3;
    }
}
/**
 * Dadas as coordenadas x e y, define em qual octante o ponto est'a. */
function whichOctant(x, y) {
    if (whichQuadrant(x, y) === 1) {
	if (Math.abs(x) >= Math.abs(y)) return 1;
	else return 2;
    } else if (whichQuadrant(x, y) === 2) {
	if (Math.abs(x) >= Math.abs(y)) return 4;
	else return 3;
    } else if (whichQuadrant(x, y) === 3) {
	if (Math.abs(x) >= Math.abs(y)) return 5;
	else return 6;
    } else if (whichQuadrant(x, y) === 4) {
	if (Math.abs(x) >= Math.abs(y)) return 8;
	else return 7;
    }
}

/**
 * Representa um ponto em plano com as coordenadas numericas X e Y
 * @param {Number} coordX coordenada do eixo X
 * @param {Number} coordY coordenada do eixo Y
 */
function Point(coordX, coordY) {
    this.x = coordX;
    this.y = coordY;
    this.color = 'black';
    this.quadrant = () => whichQuadrant(this.x, this.y);
    this.octant = () => whichOctant(this.x, this.y);
    this.toArray = () => new Array(this.x, this.y);
};

/**
 * Cria os elementos HTML que definem a matriz de pixels e os pixels organizados 
 * em grade, e retorna o Array de Arrays (Matriz) com os elementos HTML.
 * 
 * @param {Number} numOfRows o número de linhas de pixels para a matriz
 * @param {Number} numOfColumns o número de colunas de pixels para a matrix
 * @param {HTMLElement} parentElement elemento HTML que irá conter a matriz de 
 * pixels
 * @param {Number} pixelSize tamanho dos pixels em "px" [default = 10px]
 * @return {Array<Array<HTMLElement>>}
 */
function Matrix(numOfRows, numOfColumns, parentElement, pixelSize = 20) {
    this.height = numOfRows;    // Altura da matrix de pixels (numero de linhas)
    this.width  = numOfColumns; // Largura da matrix de pixels (numero de colunas)
    this.pixelSize = pixelSize; // Tamanho das divs que representam os pixels

    let divRootElement = document.createElement("div");
    //divRootElement.classList.add("pixels-grid-container", "bordered");
    divRootElement.style.margin = '0 auto';
    divRootElement.style.width = '-moz-fit-content';
    //divRootElement.setAttribute("id", "matrix-container");
    divRootElement.style.border = '1px solid black';
    divRootElement.style.display = 'flex';
    divRootElement.style.flexDirection = 'column';

    for (let i = 0; i < this.height; i++) {
        let rowElem = document.createElement("div");
        rowElem.classList.add("matrix-row");
        rowElem.style.display = 'flex';
        rowElem.style.alignItems = 'flex-start';
        rowElem.style.padding = '0';
        rowElem.style.margin = '0';
        rowElem.style.height = '-moz-fit-content';
        rowElem.style.width = '-moz-fit-content';

        for (let k = 0; k < this.width; k++) {
            let pixElem = document.createElement("div");
            pixElem.classList.add("pixel");
            pixElem.style.display = 'inline-block';
            pixElem.style.backgroundColor = 'white';
            pixElem.style.boxSizing = 'content-box';
            pixElem.style.border = '1px solid #eee';
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
        return document.getElementsByClassName('matrix-row')[this.height-1 - y].childNodes[x];
    };

    /**
     * Pinta um pixel em uma dada posicao (x,y) no sistemas de coordenadas 
     * cartesiano.
     * @param {Number} x coordenada no eixo X
     * @param {Number} y coordenada no eixo Y
     * @param {String} color cor para pintar o pixel
     */
    this.paint = function(x, y, color='black') {
    	if (x >= 0 && y >= 0) {
            var p = document.getElementsByClassName('matrix-row')[this.height-1 - y].childNodes[x];
            p.style.backgroundColor = color;
            p.style.borderColor = color;
        }
    };

    /**
     * Limpa tudo que foi desenhado nos elementos da matriz, pintando todos os
     * pixels de branco.
     */
    this.clean = function() {
        for (let i=0; i < this.width; i++) {
            for (let k=0; k < this.height; k++) {
                let p = this.getPixel(i, k);
                p.style.backgroundColor = 'white';
                p.style.borderColor = '#eee';
            }
        }
    };
}

function QuadMatrix(minorX, majorX, minorY, majorY, parentElement, pixelSize = 20) {   
    if (minorX >= 0 || minorY >= 0 || majorX <= 0 || majorY <= 0) {
        throw "Ranges for X or Y axis is invalid!";
    }
    this.originIndex = { x: 0, y: 0 };
    
    // Define informacoes largura e intervalos dos eixos do plano
    this.xRange.minor = minorX;
    this.xRange.major = majorX;
    this.yRange.minor = minorY;
    this.yRange.major = majorY;
    this.width  = Math.abs((majorX - minorX) + 1);
    this.height = Math.abs((majorY - minorY) + 1);
    this.pixels = new Array(0);

    // Define o indice da origem no array
    this.originIndex.x = Math.abs(result.xRange.minor)
    this.originIndex.y = Math.abs(result.yRange.major)

    // TODO: Criar elementos HTML ...
    var divRootElement = document.createElement("div");
    divRootElement.classList.add("pixels-grid");
    divRootElement.style.gridTemplateRows = `repeat(${this.height}, ${pixelSize}px)`;
    divRootElement.style.gridTemplateColumns = `repeat(${this.width}, ${pixelSize}px)`;

    for (let i=0; i < result.height; i++) {
        let matrixRow = [];
        for (let k=0; k < result.width; k++) {
            let newPixel = document.createElement("div");
            newPixel.classList.add("pixel");
            newPixel.style.fontSize = ".5em";
            matrixRow.push(newPixel);
            divRootElement.appendChild(newPixel);
        }
        this.pixels.push(matrixRow);
    }
    parentElement.appendChild(divRootElement);

    this.get = function(x, y) {
        newx = this.originIndex.y - y;
        newy = this.originIndex.x + x;
        console.log(`Mapeando as coordenadas (${x},{y}) para (${newx},${newy})`);
        return this.pixels[newx][newy];
    };
    
    this.paint = function(coordX, coordY, color = 'black') {
        let pixelElement = this.get(coordX, coordY);
        pixelElement.style.backgroundColor = String(color);
    };
}

