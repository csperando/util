# Generate a Colorful Icon Background

A JSON file is used to generate a single svg element full of svg icons randomly positioned between 0 and 100vw spanning the entire height of the page (or whatever dimensions you define). 
If no such JSON file exists, then the controller will attempt to generate one using all .svg files within the requested directory before the page loads.
Every icon is then given a color value depending on where they fall radially from the center of the page.

[Preview Here](https://csperando.github.io/util/SVGStuff/)

## Required

* A meta viewport tag is required in the head
* A directory containing the JSON or the svg files themselves

## Icons.JSON

```JSON

{ "icons": [
  { "name": "example1",
    "viewBox": "0 0 XX YY",
    "paths":[
      "<path  d='...'/>"
      ,"<path  d='...'/>"
    ]
  }
  ,{ "name": "example2",
    "viewBox": "0 0 XX YY",
    "paths":[
      "<path  d='...'/>"
      ,"<path  d='...'/>"
    ]
  }

```
