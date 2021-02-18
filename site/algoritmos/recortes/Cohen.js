
function code (x, y, xMin, xMax, yMin, yMax) {
    var code = 0;

    if (y > yMax) code += 8; // cima
    if (y < yMin) code += 4; // baixo
    if (x > xMax) code += 2; // direita
    if (x < xMin) code += 1; // esquerda

    return code;
}


function CohenSutherlandLineClip(x0, y0, x1, y1, xMin, xMax, yMin, yMax) {
    // console.log(x0, y0, x1, y1);
    var outcode0, outcode1, outcodeOut;
    var x, y;
    var accept = false;
    var done = false;


    outcode0 = code(x0, y0, xMin, xMax, yMin, yMax);
    outcode1 = code(x1, y1, xMin, xMax, yMin, yMax);


    while (!done) {

        if (outcode0 == 0 && outcode1 == 0) { // esta dentro da area de recorte
            accept = true;
            done = true;
        } else if ((outcode0 & outcode1) != 0) { // esta fora da area
            done = true;
        } else {
            outcodeOut = (outcode0 != 0) ? outcode0 : outcode1;
            
            if (outcodeOut & 8) {
                x = x0 + (x1 - x0) * (yMax - y0) / (y1 - y0); // calcula a interseccao
                y = yMax;
            } else if (outcodeOut & 4) {
                x = x0 + (x1 - x0) * (yMin - y0) / (y1 - y0);
                y = yMin;
            } else if (outcodeOut & 2) {
                y = y0 + (y1 - y0) * (xMax - x0) / (x1 - x0);
                x = xMax;
            } else if (outcodeOut & 1) {
                y = y0 + (y1 - y0) * (xMin - x0) / (x1 - x0);
                x = xMin
            }


            if (outcodeOut == outcode0) {
                x0 = x;
                y0 = y;
                outcode0 = code(x0, y0, xMin, xMax, yMin, yMax);
            } else {
                x1 = x;
                y1 = y;
                outcode1 = code(x1, y1, xMin, xMax, yMin, yMax);
            }
        }
    }

    if (accept) {
        
        return {            
            "p1": {
                "x":Math.round(x0),
                "y":Math.round(y0)
            },
            "p2": {
                "x":Math.round(x1),
                "y":Math.round(y1)
            }
        };
    }
}