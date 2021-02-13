
function Circle(pointX, pointY, r) {
    // Algoritmo do Ponto Medio
    const ratio = r;
    const centerPoint = {x: pointX, y: pointY};

    console.log("No projeto: " + centerPoint.x + " - " + centerPoint.y)
    var listOfPoints = new Array(0);
    this.listOfPointsReflected = [];
   
    // Inicializacao
    var x = 0;
    var y = ratio;
    var e = -ratio;

    listOfPoints.push({x, y});

    while (x <= y) {
        e += 2*x + 1;
        x++;
        if (e >= 0) {
            e += 2 - 2*y;
            y--;
        }
        listOfPoints.push({ x, y });
    }
    
    this.listOfPointsReflected = reflection(listOfPoints, this.listOfPointsReflected, centerPoint.x, centerPoint.y);
}

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
