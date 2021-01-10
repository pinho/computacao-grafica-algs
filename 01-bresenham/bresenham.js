/**
 * Trabalho e implementacao de algoritmo de computacao grafica.
 * 1. Algoritmo de Bresenham
 * Desenhar linhas
 * */

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
 * Object type Point
 * Representa um ponto em plano com as coordenadas numricas X e Y
 */
function Point(coordX, coordY) {
	this.x = coordX;
	this.y = coordY;
	this.color = 'black';
	this.quadrant = () => whichQuadrant(this.x, this.y);
	this.octant = () => whichOctant(this.x, this.y);
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
