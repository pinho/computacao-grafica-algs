

function Rotation(arrayPoints, degrees) {
    var points = {
        "x": new Array,
        "y": new Array
    };
    this.pointList = new Array;
    
    arrayPoints.forEach(e => {
        points.x.push(e.x);
        points.y.push(e.y);
    })

    // this.pointList.push({"x": points.x[0],"y": points.x[0]});

    // faz rotacao pula o primeiro ponto pois eh utilizado como pivo
    for(let i = 0; i < points.x.length; i++) {
        // formula para usar radianos
        this.pointList.push(calculateRotation(points.x[i], points.y[i], degrees));
    }
}


function calculateRotation(pointX, pointY, degrees) {
    let x = Math.round(pointX * Math.cos(toRadian(degrees)) - pointY * Math.sin(toRadian(degrees)));
    let y = Math.round(pointX * Math.sin(toRadian(degrees)) + pointY * Math.cos(toRadian(degrees)));

    if (x < 0) {
        x = x * -1;
    } if (y < 0) {
        y = y * -1;
    }
    return {"x": x, "y": y };
}
function toRadian(value) {
    return value*Math.PI/180;
}
function toDegrees(value) {
    return value*180/Math.PI;
}