
function reflection(listOfPoints, listOfPointsReflected, x, y) {
    for (let i=0; i < listOfPoints.length; i++) {
        listOfPointsReflected.push({ x: listOfPoints[i].x + x, y: listOfPoints[i].y + y });
        listOfPointsReflected.push({ x:-listOfPoints[i].x + x, y: listOfPoints[i].y + y });
        listOfPointsReflected.push({ x: listOfPoints[i].x + x, y:-listOfPoints[i].y + y });
        listOfPointsReflected.push({ x:-listOfPoints[i].x + x, y:-listOfPoints[i].y + y });
        listOfPointsReflected.push({ x: listOfPoints[i].y + x, y: listOfPoints[i].x + y });
        listOfPointsReflected.push({ x:-listOfPoints[i].y + x, y: listOfPoints[i].x + y });
        listOfPointsReflected.push({ x: listOfPoints[i].y + x, y:-listOfPoints[i].x + y });
        listOfPointsReflected.push({ x:-listOfPoints[i].y + x, y:-listOfPoints[i].x + y });
    }
    return listOfPointsReflected;
}

// Algoritmo do Ponto Medio
function Circle(pointX, pointY, r) {
    
    const ratio = r;
    const centerPoint = {x: pointX, y: pointY};
    var listOfPoints = new Array(0);
    this.listOfPointsReflected = [];
   
    // Inicializacao
    var x = 0;
    var y = ratio;
    var e = -ratio;

    // pixel inicial
    listOfPoints.push({x, y});

    while (x <= y) { //enquanto no segundo octante
        e += 2*x+1;
        x++;
        
        if (e >= 0) { // curva passando acima do ponto medio
            e += 2-2*y;// erro em y
            y--;
        }
        listOfPoints.push({ x, y });
    }
    
    this.listOfPointsReflected = reflection(listOfPoints, this.listOfPointsReflected, centerPoint.x, centerPoint.y);
}
