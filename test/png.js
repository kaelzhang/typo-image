'use strict';

var typo = require('typo');

var plugin_image = require('../lib/index');

typo.register( plugin_image );

typo.log('{{~image:options img}}', {
	options: {
		indent: 10,
		pixel_size: 1
	},

	img: 'icon.png'

}, function(err, result) {
    if(err){
    	console.log('typo image err:', err);
    }else{
    	typo.log('success')
    }
});