
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
