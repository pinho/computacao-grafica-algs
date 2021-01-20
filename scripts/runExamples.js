//-----------------TESTE----------------
// Exemplo com os pontos usados na aula de Primitivas Graficas 2D
function example1() {
	// Criacao dos pontos
	var pA = new Point(0,0);
	var pB = new Point(5,3);
	console.log(`Pontos: P1=(${pA.x}, ${pA.y}) e P2=(${pB.x}, ${pB.y})`);

	// Criacao da linha com o algoritmo de Bresenham
	console.log('Executando o algoritmo de Bresenham');
	var line = new Bresenham(pA, pB);
	console.log('Pontos da linha:')
	line.allPoints.forEach(point => console.log(`(${point.x}, ${point.y})`));

	// Cria a matrix e pinta os pontos da linha criada com o Bresenham
	var mat = Matrix.create(8, 8, document.getElementById('root'), pixelSize=32);
	line.allPoints.forEach(point => {
		mat.paint(point.x, point.y, color=point.color);
	});
}


function example2() {
	const P1 = new Point(1, 2);
	const P2 = new Point(4, 11);
	console.log(`Pontos: P1=(${P1.x}, ${P1.y}) e P2=(${P2.x}, ${P2.y})`);

	var mat  = new Matrix(20, 20, document.getElementById('root'), pixelSize=16);
	var line = new Bresenham(P1, P2);

	line.allPoints.forEach(p => {
		mat.paint(p.x, p.y, color='red');
	});
}


function drawLine(mat, x1, y1, x2, y2, cor) {
	const P1 = new Point(x1, y1);
	const P2 = new Point(x2, y2);
	console.log(`Pontos: P1=(${P1.x}, ${P1.y}) e P2=(${P2.x}, ${P2.y})`);
	
	var line = new Bresenham(P1, P2);
	
	line.allPoints.forEach(p => {
		mat.paint(p.x, p.y, color=cor);
	});
}

var mat = Matrix.create(20, 20, document.getElementById('root'), pixelSize=16);
drawLine(mat, 1, 3, 4, 11, 'red');
drawLine(mat, 2, 4, 13, 17, 'forestgreen');
drawLine(mat, 2, 0, 15, 6, 'steelblue');
