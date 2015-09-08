## Seemly.js - Ajaxify your forms ASAP

Everyone hates forms that reload the entire page on submission, they really screw up the UX. And converting these forms into dynamic ajax based forms is usually a headache as well. Seemly.js takes care of that seamlessly.

### So what does it do?

It automagically converts simple web forms (PHP, ASP.NET, Node, Rails, etc...) into dynamic ajax based forms **without** changing a single line of your JS code.

### Installation

Simply add these two libraries to your page (besides jQuery).

	<script type="text/javascript" src="/path/to/diffDOM.min.js"></script>
	<script type="text/javascript" src="/path/to/seemly.min.js"></script>

#### Express setup

Just add the attribute `data-seemly-express` to your script tag. Like this:

	<script type="text/javascript" src="/path/to/seemly.min.js" data-seemly-express></script>

It would automatically upgrade all your forms.

#### Customized setup

Add `data-seemly` attribute to the forms you want to ajaxify. Then add `data-seemly-preloader-text` attribute to the elements that will show the preloading status.

	<form data-seemly>
		<input type='textbox' />
		<input type='button' value='Submit' data-seemly-preloader-text='Loading...' />
	</form>

You can also add `data-seemly-preloader-class` to an element to show a preloading animation (check out the [example](demo/with-seemly.php)).

#### Note

Only the elements within the `form` tag would be updated. This is a feature to prevent unwanted changes effecting the page.

### Why Seemly.js is awesome

- Incredibly simple way to upgrade forms.
- No need to customize your client or server side code.
- Works with any type of server (PHP, ASP.NET, Node, Java, Rails). You name it!
- Allows [file uploads](demo/upload-with-seemly.php) as well.
- Natural fallback. If JavaScript is disabled, it won't hurt a bit.
- Tiny, 3KB when minified (optional diffDOM, 12KB when minified).

### Examples

- [Without seemly](demo/without-seemly.php)
- [With seemly (Express setup)](demo/express.php)
- [With seemly (Customized setup + preloader)](demo/with-seemly.php)
- [File upload without seemly](demo/upload-without-seemly.php)
- [File upload with seemly](demo/upload-with-seemly.php)

### Attributes

- `data-seemly` [values: `undefined`|`diff`|`replace`]

	`diff` option would use the diff algo [diffDOM.js](dist/diffDOM.js) to do the replacements. `replace` would trigger simple HTML replacement (not a good idea for JavaScript hooked elements).
	
- `data-seemly-preloader-text` [values: `undefined`|`string`]

	Used to mark the elements (divs, inputs, etc...) for showing the ajax status.
	
- `data-seemly-preloader-class` [values: `undefined`|`string`]

	This class would be activated to the element when the ajax is being carried out. Good for showing preloader animations (check out the [example](demo/with-seemly.php)).
	
### Limitations

- Not thoroughly tested at this moment (status: beta).
- May cause issues with JavaScript heavy forms.

### Contribution

Please submit bug reports, suggestions and pull requests to the [GitHub issue tracker](https://github.com/AliFlux/seemly.js/issues).

### Changelog

Details changes for each release will be documented in the [release notes](https://github.com/AliFlux/seemly.js/releases).

### Stay In Touch

For latest releases and announcements, check out my site: [aliashraf.net](http://aliashraf.net)

### License

This software is released under the [MIT License](LICENSE). Please read LICENSE for information on the
software availability and distribution.

Copyright (c) 2015 [Ali Ashraf](http://aliashraf.net)