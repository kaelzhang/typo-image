# Typo-image

The [typo](https://github.com/kaelzhang/typo) plugin to draw an image in command-line (CLI)!

## Installation

	npm install typo --save
	npm install typo-image --save

** By default, typo-image only supports 8-bit png(png-8) file **. 

If you wanna print other types of images, it requires [ImageMagick](http://www.imagemagick.org/script/index.php) CLI tools to be installed. There are numerous ways to install them. 

For instance, if you're on OS X you can use Homebrew: 

	brew install imagemagick

If your don't have [ImageMagick](http://www.imagemagick.org/script/index.php) installed, please make sure you have the png file with the right file format.

	
## Usage
	
	var typo = require('typo');
	typo.register( require('typo-image') );
	
	// pay attension, this.is an async method 
	typo.log('{{~image ./icon.png}}');
	
Be free to print an image for many times, typo-image will cache the result. You could also save your output by using `typo.template()`.

	
And there are also bunch of options to help you manage your image:

	typo.log('{{~image:options ./icon.png}}', {
		options: {
			indent: 4,
			width: 32,
			height: 32
		}
	});
	
### ~image 

`'~'` is one of the typo conventions used to idenfity an asynchronous helper. 

### Syntax
	
	typo.log(
		'{{~image[:<options>] <image_path>}}', 
		[<substitution>], 
		[<callback>]
	);

	
An available demo is located at `'demo/options.js'`:

	git clone git@github.com:kaelzhang/typo-image.git
	cd typo-image
	npm install
	node demo/options.js
	
## Available options

(what's coming...)

#### width
`Number`

#### height
`Number`

#### indent
`Number`

#### pixel_size
`Number`

#### cache
`Boolean`

#### cache_output
`Path`
