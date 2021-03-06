function drawNoise() {
    // parameters
    const points = [];
    const nPoints = 200;
    const dx = 50;
    const periods = 5;
    const maxY = 100;
    var svgString = "";


    // get random y-values for one period
    for(var i=0; i<nPoints; i++) {
        points.push( Math.random()*maxY );
    }
    points.push(points[0]);


    // cosine smoothing function
    for(var j=0; j<periods; j++) {

        var xOffset = (points.length-1)*dx*j;

        // add points every dx for one period
        // don't include last point: each iteration uses i, i+1
        for(var i=0; i<points.length-1; i++) {

            // cosine vars
            let a = Math.abs(points[i] - points[i+1])/2; // amplitude
            let y = (points[i] + points[i+1]) / 2;       // center y-val
            let T = 2*dx;                                // Period
            let x1 = dx*i+xOffset;
            let x2 = dx*(i+1)+xOffset;

            let phase = (points[i] > points[i+1]) ? i*Math.PI : (i+1) * Math.PI;

            if(j == 0 && i == 0) {
                svgString += `M ${x1},${points[i]} `;
            } else {
                svgString += `L ${x1},${points[i]} `;
            }


            // cosine
            for(var x=x1+1; x<x2; x++) {
                let cosine = y + a*Math.cos( (x*(2*Math.PI/T)) - phase );
                svgString += `L ${x},${cosine} `;
            } // end cosine for

        } // end one period

    } // end all periods

    // loop 10,000 is an arbitrarily large value meant to be larger than the dom elements height
    svgString += `L ${x}, 10000 L 0, 10000 L 0, ${points[0]} `;

    // end path
    svgString += `Z`;

    var path = document.getElementById("svg-path");
    path.setAttribute("d", svgString);

};

drawNoise();
