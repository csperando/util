// generate background on window load, and listen for resize
window.addEventListener("load", function() {
	generateIconBackground();

	window.addEventListener("resize", function() {
		document.getElementById("svg-here").innerHTML = "";
		generateIconBackground();
	});
});

function generateIconBackground() {
	target = document.getElementById("svg-here");
	w = window.innerWidth;
	h = window.innerHeight;
	cx = w/2;
	cy = h/2;
	svgString = '<svg style="position: absolute;top: 0;left: 0;width:100vw;height: 100vh;" width="100vw" height="100vh" class="background-svg" viewbox="0 0 ' + w + ' ' + h + '">';

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == XMLHttpRequest.DONE) {

			// Success
			if (xmlhttp.status == 200) {
				var data = JSON.parse(xmlhttp.response);
				// console.log(data);

				for(var i=1; i<data.icons.length; i++) {
					icon = data.icons[i];
					// console.log(icon.name);
					x = Math.random() * w;
					y = i * h / data.icons.length;
					dx = cx-x;
					dy = cy-y;
					theta = (180/Math.PI) * Math.atan(dy/dx);
					theta = dx >= 0 ? theta : theta + 180;
					color = `hsl(${theta}, 100%, 50%)`;
					svgString += '<svg class="bi" style="opacity: 0.7;" fill="' + color + '" id="bi-' + icon.name + '" x="' + x + '" y="' + y + '" width="16" height="16" viewbox="' + icon.viewBox + '">';

					for(var j=0; j<icon.paths.length; j++) {
						path = icon.paths[j];
						// console.log(path);
						svgString += path;
					}
					svgString += "</svg>";
				}

				svgString += "</svg>";
				if(target.innerHTML == "") {
					target.innerHTML = svgString;
				} else {
 					//console.log("occupied");
				}

			} else {
				console.error("xml error");
			}
		}
	};

	xmlhttp.open("GET", "/util/SVGStuff/images/icons/icons.json", true);
	xmlhttp.send();

} // end generate background
