

function FillTriangle(p1, p2, p3, center) {
    
    this.pointList = [];
    
    var center = {
        x: center.x,
        y: center.y
    };
    
    var point = {
        p1: {
            x1: p1.x,
            y1: p1.y
        },
        p2: {
            x2: p2.x,
            y2: p2.y
        },
        p3: {
            x3: p3.x,
            y3: p3.y
        }
    };
    var a = {
        a1: -(point.p2.y2 - point.p1.y1),
        a2: -(point.p3.y3 - point.p2.y2),
        a3: -(point.p1.y1 - point.p3.y3)
    };
    
    var b = {
        b1: point.p2.x2 - point.p1.x1,
        b2: point.p3.x3 - point.p2.x2,
        b3: point.p1.x1 - point.p3.x3
    };
    var c = {
        c1: -a.a1 * point.p1.x1 - b.b1 * point.p1.y1,
        c2: -a.a2 * point.p2.x2 - b.b2 * point.p2.y2,
        c3: -a.a3 * point.p3.x3 - b.b3 * point.p3.y3
    };
    
    // encontra bouding box do triângulo
    var x = {
        min: Math.min(point.p1.x1, point.p2.x2, point.p3.x3),
        max: Math.max(point.p1.x1, point.p2.x2, point.p3.x3)
    };
    
    var y = {
        min: Math.min(point.p1.y1, point.p2.y2, point.p3.y3),
        max: Math.max(point.p1.y1, point.p2.y2, point.p3.y3)
    };

    // calcula o erro inicial p/ o inicio do bounding box
    var error1 = a.a1 * x.min + b.b1 * y.min + c.c1;
    var error2 = a.a2 * x.min + b.b2 * y.min + c.c2;
    var error3 = a.a3 * x.min + b.b3 * y.min + c.c3;
     
    for (let k = y.min; k <= y.max; k++) {
        let error1Aux = error1;
        let error2Aux = error2;
        let error3Aux = error3;
        for (let j = x.min; j <= x.max; j++) {
            if (error1 >= 0 && error2 >= 0 && error3 >= 0) {
                let x = j + center.x;
                let y = k + center.y;
                this.pointList.push({ x, y });
            }
            error1 += a.a1;
            error2 += a.a2;
            error3 += a.a3;
        }
        error1 = error1Aux + b.b1;
        error2 = error2Aux + b.b2;
        error3 = error3Aux + b.b3;
    }
}


