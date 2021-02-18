
function Sutherland(arrayPoint, xMin, xMax, yMin, yMax) {

    
    var l = left(arrayPoint, xMin);

    console.log("Esquerda: \n", l);

    var r = right(l, xMax);

    console.log("Direita: \n", r);

    var u = up(r, yMax);
    
    console.log("Cima: \n", u);

    var b = bottom(u, yMin);

    console.log("Baixo: \n", b);
   

   return b;
}



function left(arrayPoint, xMin) {
    console.log("1");
    var newPolygon = new Array;

     // linha da esquerda
     for (let i=0; i < arrayPoint.length; i++) {
        var p1 = {
            "x": arrayPoint[i].x,
            "y": arrayPoint[i].y
        }
    
        var p2 = {
            "x": arrayPoint[(i+1)%arrayPoint.length].x,
            "y": arrayPoint[(i+1)%arrayPoint.length].y
        }

        if (p1.x > xMin) {
            if (p2.x > xMin) {
                // De dentro para dentro
                newPolygon.push(p2);
            } else {
                // De dentro para fora
                newPolygon.push({"x": xMin, "y": Math.round(p1.y + (p2.y - p1.y) * (xMin - p1.x) / (p2.x - p1.x)) });
            }
        } else {
            if (p2.x > xMin) {
                // de fora para dentro
                newPolygon.push({"x": xMin, "y": Math.round(p1.y + (p2.y - p1.y) * (xMin - p1.x) / (p2.x - p1.x)) });
                newPolygon.push(p2);
            }
        }
    }

    return newPolygon;
}


function right(arrayPoint, xMax) {
    console.log("2");
    var newPolygon = new Array;

    // linha da direita
    for (let i=0; i < arrayPoint.length; i++) {
        var p1 = {
            "x": arrayPoint[i].x,
            "y": arrayPoint[i].y
        }
    
        var p2 = {
            "x": arrayPoint[(i+1)%arrayPoint.length].x,
            "y": arrayPoint[(i+1)%arrayPoint.length].y
        }

        if (p1.x < xMax) {
            if (p2.x < xMax) {
                // De dentro para dentro
                newPolygon.push(p2);
            } else {
                // De dentro para fora
                newPolygon.push({"x": xMax, "y": Math.round(p1.y + (p2.y - p1.y) * (xMax - p1.x) / (p2.x - p1.x)) });
            }
        } else {
            if (p2.x < xMax) {
                // de fora para dentro
                newPolygon.push({"x": xMax, "y": Math.round(p1.y + (p2.y - p1.y) * (xMax - p1.x) / (p2.x - p1.x)) });
                newPolygon.push(p2);
            }
        }
    }

    return newPolygon;
}

function bottom(arrayPoint, yMin) {
    console.log("3");

    var newPolygon = new Array;
    // // linha de baixo
    for (let i=0; i < arrayPoint.length; i++) {
        var p1 = {
            "x": arrayPoint[i].x,
            "y": arrayPoint[i].y
        }
    
        var p2 = {
            "x": arrayPoint[(i+1)%arrayPoint.length].x,
            "y": arrayPoint[(i+1)%arrayPoint.length].y
        }

        if (p1.y > yMin) {
            if (p2.y > yMin) {
                // De dentro para dentro
                console.log("-- p2: ", p2)
                newPolygon.push(p2);
            } else {
                // De dentro para fora
                console.log("=> ", {"x": yMin, "y": Math.round( p1.x + (p2.x - p1.x) * (yMin - p1.y) / (p2.y - p1.y)) })
                newPolygon.push({"x": yMin, "y": Math.round( p1.x + (p2.x - p1.x) * (yMin - p1.y) / (p2.y - p1.y)) });
            }
        } else {
            if (p2.y > yMin) {
                // de fora para dentro
                console.log("p2: ", p2)
                console.log("=> ", {"x": yMin, "y": Math.round( p1.x + (p2.x - p1.x) * (yMin - p1.y) / (p2.y - p1.y)) })
                newPolygon.push({"x": yMin, "y": Math.round( p1.x + (p2.x - p1.x) * (yMin - p1.y) / (p2.y - p1.y)) });
                newPolygon.push(p2);
            }
        }
    }

    return newPolygon;
}


function up(arrayPoint, yMax) {
    console.log("4");
    var newPolygon = new Array;

    // // linha de cima
    for (let i=0; i < arrayPoint.length; i++) {
        var p1 = {
            "x": arrayPoint[i].x,
            "y": arrayPoint[i].y
        }
    
        var p2 = {
            "x": arrayPoint[(i+1)%arrayPoint.length].x,
            "y": arrayPoint[(i+1)%arrayPoint.length].y
        }

        if (p1.y < yMax) {
            
            if (p2.y < yMax) {
                
                // De dentro para dentro
                console.log("--p2: ", p2)
                newPolygon.push(p2);
            } else {
                // De dentro para fora
                console.log("=> ", {"x": yMax, "y": Math.round(p1.x + (p2.x - p1.x) * (yMax - p1.y) / (p2.y - p1.y)) })
                newPolygon.push({"x": yMax, "y": Math.round(p1.x + (p2.x - p1.x) * (yMax - p1.y) / (p2.y - p1.y)) });
            }
        } else {
            if (p2.y < yMax) {
                
                // de fora para dentro
                console.log("p2: ", p2)
                console.log("=> ", {"x": yMax, "y": Math.round(p1.x + (p2.x - p1.x) * (yMax - p1.y) / (p2.y - p1.y)) })
                newPolygon.push({"x": yMax, "y": Math.round(p1.x + (p2.x - p1.x) * (yMax - p1.y) / (p2.y - p1.y)) });
                newPolygon.push(p2);
            }
        }
    }

    return newPolygon;
}




// x = [];

// x.push({ "x":10, "y":10 });
// x.push({ "x":10, "y":16 });
// x.push({ "x":16, "y":20 });
// x.push({ "x":28, "y":10 });
// x.push({ "x":28, "y":16 });
// x.push({ "x":22, "y":10 });


// var t = new Sutherland(x, 5, 25, 5, 25);