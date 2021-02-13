



function FillPolygon(arrayPoints) {
    var points = {
        x: new Array,
        y: new Array
    };


    arrayPoints.forEach(e => {
        points.x.push(e.x);
        points.y.push(e.y);
    })

    this.pointList = [];
    var criticalPoints = new Array;
    // Encontra o bounding box para Y e os pontos críticos mínimos em Y
    var Y = {
        min: Number.MAX_VALUE,
        max: Number.MIN_VALUE
    };
    // loop de varredura
    var activeCriticalPoints = [];
    var comparator;

    points, Y, criticalPoints = readingDirection(points, Y, criticalPoints);
    criticalPoints, activeCriticalPoints, points, Y, this.pointList = intersectionAtHotspots(criticalPoints, activeCriticalPoints, points, Y, this.pointList);
}




function readingDirection(points, Y, criticalPoints) {
    // encontra sentido horario 1 e sentido anti horario -1
    for (let i = 0; i < points.x.length; i++) {
        
        // Encontra o valor minimo e maximo para Y
        if (points.y[i] < Y.min) {
            Y.min = points.y[i];
        } else if (points.y[i] > Y.max) {
            Y.max = points.y[i];
        }

        let pointAux = {
            x: points.x[(i+1) % points.x.length],
            y: points.y[(i+1) % points.y.length]
        }

        if (points.y[i] < pointAux.y) {

            criticalPoints.push({ index: i,
                                direction: 1, 
                                x_intersection: points.x[i],
                                inv_slope: (pointAux.x - points.x[i] * 1.0)/(pointAux.y - points.y[i] * 1.0)
                            });
        }

        pointAux.x = points.x[(i-1 + points.x.length) % points.x.length];
        pointAux.y = points.y[(i-1 + points.y.length) % points.y.length];

        if (points.y[i] < pointAux.y) {

            criticalPoints.push({ index: i,
                                direction: -1, 
                                x_intersection: points.x[i],
                                inv_slope: (pointAux.x - points.x[i] * 1.0)/(pointAux.y - points.y[i] * 1.0)
                            });

        }

    }
    return points, Y, criticalPoints;
}


function intersectionAtHotspots(criticalPoints, activeCriticalPoints, points, Y, pointList) {
    // Atualiza o valor de cada intersecao nos pontos ativos
    for (let y = Y.min; y <= Y.max; y++) {

        activeCriticalPoints.forEach( e => {
            e.x_intersection += e.inv_slope;
        });

        // Adiciona as arestas com pontos criticos para o Y corrente
        criticalPoints.forEach( e => {
            if (points.y[e.index] == y) {
                activeCriticalPoints.push(e);
            }
        });

        activeCriticalPoints = removeYMaxPointsEqualsY(activeCriticalPoints, points, y);

       
        // Ordena os pontos a partir do ponto x
        activeCriticalPoints.sort(function(a, b) {
            return a.x_intersection < b.x_intersection ? -1 : a.x_intersection > b.x_intersection ? 1 : 0;
        });

        pointList = orderPoint(activeCriticalPoints, pointList, y);
    }

    return criticalPoints, activeCriticalPoints, points, Y, pointList;
}

function removeYMaxPointsEqualsY(activeCriticalPoints, points, y) {
    // remove os pontos com Y max igual ao Y var
    for (let i = activeCriticalPoints.length-1; i >= 0; i--) {
        let e = activeCriticalPoints[i];

        let pointMax = {
            x: points.x[(e.index + e.direction + points.x.length)%points.x.length],
            y: points.y[(e.index + e.direction + points.y.length)%points.y.length]
        }

        if (pointMax.y == y) {
            activeCriticalPoints.splice(i, 1);
        }
    }
    return activeCriticalPoints;
}

function orderPoint(activeCriticalPoints, pointList, y) {
    // Organiza ponto
    for (let i = 0; i < activeCriticalPoints.length; i+=2) {
        let xStart = parseInt(Math.round(activeCriticalPoints[i].x_intersection).toFixed(1));
        let xEnd = parseInt(Math.round(activeCriticalPoints[i+1].x_intersection).toFixed(1));

        for (let x = xStart; x <= xEnd; x++) {
            // console.log("X: " + x + " | Y: " + y);

            pointList.push({ x, y });
            // mat.paint(x, y);

        }
    }

    return pointList
}
