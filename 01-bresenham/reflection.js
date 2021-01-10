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
