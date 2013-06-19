'use strict';

var color = require('color-diff');


var PREFIX_BACKGROUND = '\x1b[38;5;';
var SUFFIX = '\x1B[0m';

var white  	= {'R':255 , 'G':255 ,'B':255};
var black 	= {'R':0   , 'G':0   ,'B':0};
var navy 	= {'R':0   , 'G':0   ,'B':128};
var blue 	= {'R':0   , 'G':0   ,'B':255};
var yellow 	= {'R':255 , 'G':255 ,'B':0};
var gold 	= {'R':255 , 'G':215 ,'B':0};
var colors1 = [white, black, navy, blue, yellow, gold];
var colors2 = [white, black, blue, gold];


console.log( color.closest( {
	R: 245,
	G: 245,
	B: 245
}, colors2 ) );