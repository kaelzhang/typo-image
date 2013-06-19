'use strict';


var node_fs = require('fs');
var node_path = require('path');
var ansi = require('./ansi');

// var stream = node_fs.createReadStream( node_path.join( __dirname, '..', 'sample-nc.gif' ) );
var stream = node_fs.createReadStream( node_path.join( __dirname, '..', '5.bmp' ) );

function generate_ansi(ansi, hex){
    
    if(hex.length === 1){
        hex = ' ' + hex;
    }

    return PREFIX_BACKGROUND + ansi + 'm' + hex + SUFFIX;
    // return PREFIX_FORGROUND + ansi + 'm' + hex + SUFFIX;
}


// [ref](http://en.wikipedia.org/wiki/BMP_file_format)
// Offset | Size(bytes) | Signed | Description
// ------ | ----------- | ------ | -----------------------------
// 0ah    |  4          |   1    | starting offset of bitmap image data
// 12h    |  4          |   1    | bmp width in pixels
// 16h    |  4          |   1    | bmp height in pixels
// 1ch    |  2          |   1    | number of bits
// 1eh    |  4          |   1    | compression method, 0 stands for BI_RGB(none)
// 22h    |  4          |   1    | image size of raw bmp
// 2eh    |  4          |   1    | numbers of colors in the palette
stream.on('data', function(data) {

    // `readInt32LE` returns a 10 hexadecimal number
    var width = data.readInt32LE( 18 );
    var height = data.readInt32LE( 22 );
    var start = data.readInt32LE( 10 );
    var square = height * width;
    // we will convert all images under 256 colors palette, so number of bits could be ignored
    // var bits = data.readInt32LE( 28 );

    // console.log( width, height, bits, start, data.readInt32LE(30), data[start], data[start + 1]); return;

    

    var i = 0;
    var counter = 0;
    var rgb;
    var r;

    while( i < square ){
        r = start + i * 3;

        rgb = {
            R: data[r],
            G: data[r + 1],
            B: data[r + 2]
        };

        // console.log(rgb);

        process.stdout.write( ansi.background(' ', rgb) );

        if( ++ counter === width ){
            counter = 0;
            process.stdout.write('\n');
        }

        i ++;
    }

});