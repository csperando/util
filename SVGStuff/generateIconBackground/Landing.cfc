
component extends="controller" {

	function config() {
		usesLayout(name="layout", template="layout");
	}



	function home() {
		// check if file exists first
		// alternatively the json can be regenerated every time relatively quickly
		if(!FileExists(Expandpath("./images/bootstrap_icons/icons.json"))){
			writeIconsJson();
		}

		frontendYears = DateDiff( "yyyy", CreateDate(2017, 01, 01), Now() );
		backendYears = DateDiff( "yyyy", CreateDate(2015, 01, 01), Now() );
	}



	function writeIconsJson() {
		icons = [];
		iconsJSON = fileOpen(Expandpath("./images/bootstrap_icons/icons.json"), "write");
		fileWriteLine(iconsJSON, '{ "icons": [');

		iconsQuery = directoryList(
			Expandpath("./images/bootstrap_icons"),
			false,
			"query",
			"*.svg");

		for(row in iconsQuery) {
			icon = {};

			// store full html string to parse from
			icon.html = stripcr(fileRead(Expandpath("./images/bootstrap_icons/#row.name#")));

			// file name used for id
			icon.name = left(row.name, len(row.name)-4);
			if(iconsQuery.currentRow EQ 1) {
				fileWriteLine(iconsJSON, '  { "name": "#icon.name#",');
			} else {
				fileWriteLine(iconsJSON, '  ,{ "name": "#icon.name#",');
			}

			// viewbox
			viewboxIndex = icon.html.find("viewBox=")+9;
			viewboxIndexEnd = icon.html.find(">", viewboxIndex);
			icon.viewBox = replace( mid(icon.html, viewboxIndex, viewboxIndexEnd-viewboxIndex-1), '"', "'", "ALL" );
			fileWriteLine(iconsJSON, '    "viewBox": "#icon.viewBox#",');

			// store all path elements in an array
			pathIndex = icon.html.find("<path");
			icon.paths = listToArray( trim(replace(mid(icon.html, pathIndex, len(icon.html)-pathIndex-5), '"', "'", "ALL")), "<path", false, true );
			fileWriteLine(iconsJSON, '    "paths":[');

			// generate json paths
			for(p in icon.paths) {
				if(icon.paths.find(p) EQ 1) {
					fileWriteLine(iconsJSON, '      ' & '"#trim('<path #p#')#"' );
				} else {
					fileWriteLine(iconsJSON, '      ' & ',"#trim('<path #p#')#"' );
				}

			}
			fileWriteLine(iconsJSON, "    ]");
			fileWriteLine(iconsJSON, "  }");

			icons.append(icon);
		}

		fileWriteLine(iconsJSON, "]}");
		fileClose(iconsJSON);

	} // end writeIconsJson

}
