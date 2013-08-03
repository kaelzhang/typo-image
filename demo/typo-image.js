'use strict';

var typo = require('typo')({
    output: process.stdout
});

var node_path = require('path');
var fs = require('fs-sync');

typo.plugin( require('typo-image') );

typo.log('{{bold TYPO-IMAGE demo:}}');

var cache = node_path.join( __dirname, 'typo.cache' ) 

fs.delete(cache);

typo.log('removing cache file: "typo.cache"...\n');

typo.log('{{~image:options img}}', {
	options: {
		indent: 10,
		pixel_size: 2,
		// cache: true, // default to `true`
		cache_output: cache
	},

	img: node_path.join( __dirname, 'icon.png' )

}, function(err, result) {
    if(err){
    	console.log('typo image err:', err);
    }else{

    	typo.log('|________|  {{bold indent}}: 10');
    	typo.log('One pixel will be printed as two character wide: {{bg.white   }}  {{bold pixel_size}}: 2')
    	typo.log('');
    	typo.log('Successfully rendered!');
    }

});

