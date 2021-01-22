/**
 * Trabalho e implementacao de algoritmo de computacao grafica.
 * 1. Algoritmo de Bresenham
 * Desenhar linhas
 * */

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
