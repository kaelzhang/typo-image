'use strict';

var img = module.exports = {};

var node_path = require('path');
var node_fs = require('fs');

var fs = require('fs-sync');

var typo = require('typo');
var PNG = require('pngjs').PNG;

var RGB = typo.util.RGB;
var USER_HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

Object.defineProperties(img, {
    DEFAULT_OPTIONS: {
        value: {
            width: 32,
            height: 32,
            indent: 4,
            cache: true,
            pixel_size: 2,
            // cache_output: 
        }
    },

    CACHE_ROOT: {
        value: node_path.join(USER_HOME, '.typo', 'cache')
    },

    parse_options: {
        value: function(options, image) {
            if( Object(options) !== options ){
                options = {};
            }

            mix(options, img.DEFAULT_OPTIONS);

            if ( options.cache && !options.cache_output ){
                options.cache_output = 
                    img.CACHE_ROOT + 
                    node_path.sep +

                    'width height indent pixel_size'.split(' ').map(function(key) {
                        return options[key];
                    }).join('_') +

                    '_' + 
                    encodeURIComponent(image) +
                    '.typo';
            }

            return options;
        }
    },

    convert: {
        value: function(image, options, callback) {
            
        }
    }
});


// no override
function mix(receiver, supplier){
    var key;
    for( key in supplier ){
        if( !( key in receiver ) ){
            receiver[key] = supplier[key];
        }
    }
}

// 3 -> '   '
function generate_spaces(n){
    n = parseInt(n);
    var str = '';
    var space = ' ';

    while( n -- ){
        str += space;
    }

    return str;
};


// `'~'` is a symbol to mark an async helper
img['~image'] = function(image, callback) {
    image = node_path.resolve( image.trim() );

    if( !fs.exists(image) ){
        return callback( typo.template('Image "{{img}}" not found', {
            img: image
        }) );
    }

    var options = img.parse_options(this.data, image);

    if( options.cache && fs.exists(options.cache_output) ){
        return callback(null, fs.read(options.cache_output));
    }

    var result = '';

    var indent = generate_spaces(options.indent);
    var pixel = generate_spaces(options.pixel_size);

    try{
        node_fs.createReadStream(image)
        .pipe(
            new PNG({
                filterType: 4
            })
        ).on('parsed', function() {
            for (var y = 0; y < this.height; y ++) {
                result += indent;

                for (var x = 0; x < this.width; x ++) {
                    var index = (this.width * y + x) << 2;

                    result += RGB.background(pixel, {
                        R: this.data[index],
                        G: this.data[index + 1],
                        B: this.data[index + 2]
                    });
                }
                result += '\n';
            }

            callback(null, result);

            options.cache && fs.write( options.cache_output, result );
        });

    }catch(e){
        callback(e);
    }
};

