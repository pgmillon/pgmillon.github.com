/**
 * phantomjs script for printing presentations to PDF.
 *
 * Example:
 * phantomjs print-pdf.js "http://lab.hakim.se/reveal-js?print-pdf" reveal-demo.pdf
 *
 * By Manuel Bieh (https://github.com/manuelbieh)
 */

// html2pdf.js
var page = new WebPage();
var system = require( 'system' );

var slideWidth = system.args[3] ? system.args[3].split( 'x' )[0] : 2480;
var slideHeight = system.args[3] ? system.args[3].split( 'x' )[1] : 3508;

page.viewportSize = {
  width: slideWidth,
  height: slideHeight
};

// TODO
// Something is wrong with these config values. An input
// paper width of 1920px actually results in a 756px wide
// PDF.
page.paperSize = {
  width: slideWidth,
  height: slideHeight,
  border: {
    top: '1cm',
    right: '0',
    bottom: '1cm',
    left: '0'
  }
};

var inputFile = system.args[1] || 'http://localhost:8000/resume/index.html';
var outputFile = system.args[2] || '_site/resume/pgmillon.pdf';

if( outputFile.match( /\.pdf$/gi ) === null ) {
  outputFile += '.pdf';
}

console.log( 'Printing PDF (Paper size: '+ page.paperSize.width + 'x' + page.paperSize.height +')' );

page.open( inputFile, function( status ) {
  window.setTimeout( function() {
    console.log( 'Printed succesfully' );
    page.render( outputFile );
    phantom.exit();
  }, 1000 );
} );

