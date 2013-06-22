# Typo-image

The [typo](https://github.com/kaelzhang/typo) plugin to draw an image in command-line (CLI)!

## Installation

```bash
npm install typo --save
npm install typo-image --save
```

** Typo-image only supports 8-bit png(png-8) file so far. ** 

Maybe someday typo-image will support any image format using [ImageMagick](http://www.imagemagick.org). But I really doesn't have much spare time.

## Demo
An available demo is located at `'demo/typo-image.js'`:

```bash
node demo/typo-image.js
```

![screenshot](https://raw.github.com/kaelzhang/typo-image/master/demo/screenshot.png)
	
## Usage
	
```js
var typo = require('typo');
typo.register( require('typo-image') );

// pay attension, this.is an async method 
typo.log('{{~image ./icon.png}}');
```	
	
Be free to print an image for many times, typo-image will cache the result. You could also save your output by using `typo.template()`.

	
And there are also bunch of options to help you manage your image:

```js
typo.log('{{~image:options ./icon.png}}', {
	options: {
		indent: 4
	}
});
```
	
### ~image 

`'~'` is one of the typo conventions used to idenfity an asynchronous helper. 

### Syntax
	
```js
typo.log(
	'{{~image[:<options>] <image_path>}}', 
	[<substitution>], 
	[<callback>]
);
```
	
## Available options

(what's coming...)

#### width
`Number`

no support so far

#### height
`Number`

no support so far

#### indent
`Number`

supported

#### pixel_size
`Number`

supported

#### cache
`Boolean`

supported

#### cache_output
`Path`

supported