function reflectPoint(p) {
    return {
        q1: { x:  p.x, y:  p.y },
        q2: { x: -p.x, y:  p.y },
        q3: { x: -p.x, y: -p.y },
        q4: { x:  p.x, y: -p.y },
    }
}

function reflect(listOfPoints, xc, yc) {
    let result = [];
    listOfPoints.forEach(p => {
        let ref = reflectPoint(p);
        result.push(ref.q1, ref.q2, ref.q3, ref.q4);
    });
    
    return result.map( p => ({ x: p.x+xc, y: p.y+yc }) );
}

// Algoritmo do Ponto Medio
function Elipse(centerPoint, a, b) {
    let listOfPoints = [];
    this.centerPoint = centerPoint;
    this.ratioA = a;
    this.ratioB = b;
    this.borderPoints = [];

    let a2 = a*a;
    let b2 = b*b;

    let x = 0;
    let y = b;
    listOfPoints.push({ x, y });

    let dx = 2 * b2 * x;
    let dy = 2 * a2 * y;

    // Erro inicial da regiao 1
    let err = -a2*b + a2*0.25;

    // Regiao 1
    while (dx < dy) {
        listOfPoints.push({ x, y });

        x++;
        err += dx + b2;
        dx += 2*b2;

        if (err > 0) {
            y--;
            err += a2 - dy;
            dy -= 2*a2;
        }
    }

    // Erro inicial da regiao 2
    err = b2 * ((x+0.5)*(x+0.5)) + a2*y*y - a2*b2

    // Regiao 2
    while (y >= 0) {
        listOfPoints.push({ x, y })

        y--;
        err += a2 - dy;
        dy -= 2*a2

        if (err < 0) {
            x++;
            err += dx + b2;
            dx += 2 * b2;
        }
    }

    this.borderPoints = reflect( listOfPoints, this.centerPoint.x, this.centerPoint.y );
}
