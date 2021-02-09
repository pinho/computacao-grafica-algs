/**
 * Trabalho e implementacao de algoritmo de computacao grafica.
 * 1. Algoritmo de Bresenham
 * Desenhar linhas
 * */

/**
 * Reflexao de pontos iniciais
 */
function Reflection(point1, point2) {
	this.point1 = point1;
	this.point2 = point2;
	this.m = (point2.y - point1.y)/(point2.x - point1.x);
	this.swapX = false;
	this.swapY = false;
	this.swapXY = false;

	// funcao para trocar o x por y de um ponto
	this.swapXByY = function(p) {
		let aux = p.x;
		p.x = p.y;
		p.y = aux;
	};
	
	// metodo de reflexao
	this.reflect = function() {
		if (this.m > 1 || this.m < -1) {
			this.swapXByY(this.point1);
			this.swapXByY(this.point2);
			this.swapXY = true;
		}
		if (this.point1.x > this.point2.x) {
			this.point1.x = this.point1.x * -1;
			this.point2.x = this.point2.x * -1;
			this.swapX = true;
		}
		if (this.point1.y > this.point2.y) {
			this.point1.y = this.point1.y * -1;
			this.point2.y = this.point2.y * -1;
			this.swapY = true;
		}
	};
	
	// metodo de de-reflexao
	this.reverseReflection = function(listOfPoints) {
		if (this.swapY === true) {
			listOfPoints.forEach(point => {
				point.y = point.y * (-1);
			});
		}
		if (this.swapX === true) {
			listOfPoints.forEach(point => {
				point.x = point.x * (-1);
			});
		}
		if (this.swapXY === true) {
			for (var i=0; i < listOfPoints.length; i++) {
				this.swapXByY(listOfPoints[i]);
			}
		}
	};
};


/**
 * Bresenham.
 * Cria um linha (lista de pontos) usando o algoritmo de Bresenham 
 * @param {Point} p1 Ponto inicial
 * @param {Point} p2 Ponto final
 */
function Bresenham(p1, p2) {
	this.point1 = p1;	
	this.point2 = p2;
	this.allPoints = new Array(0);

	var auxPointsList = new Array(0);
	var currentPoint = new Point(this.point1.x, this.point1.y);
	var finalPoint = new Point(this.point2.x, this.point2.y);

	// Calcula as variaveis e constantes auxiliares como os deltas, M e E
	var deltaX = currentPoint.x - finalPoint.x;
	var deltaY = currentPoint.y - finalPoint.y;
	var m = deltaY/deltaX;
	var e = m - 0.5;

	// true se os pontos nao estao no primeiro octante
	const octantProblem = !(deltaX >= deltaY && deltaX >= 0 && deltaY >= 0);

	// Aplica reflexao nos dois pontos
	var refl;
	if (octantProblem === true) {
		refl = new Reflection(currentPoint, finalPoint);
		refl.reflect();
		deltaX = currentPoint.x - finalPoint.x;
		deltaY = currentPoint.y - finalPoint.y;
		m = deltaY/deltaX;
		e = m - 0.5;
	}

	// ---
	while (currentPoint.x < finalPoint.x) { //&& currentPoint.y < finalPoint.y) {
		// Adiciona o ponto atual na lista de pontos
		let p = {};
		Object.assign(p, currentPoint);
		auxPointsList.push(p);

		// Incrementa o X
		currentPoint.x++;
		// Decide se incrementa o Y
		if (e > 0) {
			e--;
			currentPoint.y++;
		}

		// Incrementa o E com M
		e += m;
	}
	// ---
	// Adiciona o ultimo ponto na lista
	auxPointsList.push(finalPoint);

	// Reverte a reflexao na lista de pontos
	if (octantProblem === true) {
		refl.reverseReflection(auxPointsList);
	}
	
	// Atribui a lista contruida para a propriedade da instancia
	this.allPoints = auxPointsList;
	this.size = () => this.allPoints.length;
}
