# V\_ - Validate your HTML forms on the client without writing a single line of Javascript.

## We get it.

Client-side form validation is a pain. Always has been. And while it's gotten a little easier with HTML5, built-in browser validations often just aren't enough. There are hundreds of Javascript libraries for exactly this reason—but most of them only lessen the problem, or introduce complexities of their own. *There's got to be a better way.*

## V\_

V\_ (pronounced vee-underscore, or Vunderscore if you're feeling frisky) leverages the power of the modern browser to quickly and cleanly catch mistakes before a form processes. Better yet, it can be implemented with minimal alterations to your HTML—and without writing a single line of Javascript.

No more JQuery. No more mess. No more writing individual functions for each and every form on your website. Just:

```HTML
	<head> 
		...
		<script src="path/to/v_.js" defer></script>
	</head>
```

```HTML
	<form data-v_form>
		<input type="text" data-v_is-url>
	</form>
```

*That's it.*

V\_ is also very lightweight. Minified, the script is 12kb. After gzip, [it's about 3](https://bundlephobia.com/result?p=v_underscore@latest).

*Important note: V_ is meant to be used in tandem with server-side validation. Client-side form validation is **not** a secure replacement for server-side processing. You should always validate any user input on the server before working with it.*

## Versions

### Webpage

The Node.JS program that builds V\_ produces several files:

| File Name | Description |
| ----------|------------ |
| v_.js | The main form of V\_; automatically applies page validations and gives global access to V\_ and v_ify (see "Exports" below). Use this if you don't need finer control over your form validations, or don't want to write any Javascript. |
| v_.min.js | v_.js but minified; better to use in production. |
| v_manual.js | Gives global access to V\_ and v_ify, but does not automatically apply validations on page load. Useful if using custom validations, or if you're okay writing a little extra Javascript. |
| v_manual.min.js | v_manual.js but minified; better to use in production. |
| v_ui.css | Optional. Some default UI styling to get you started (see "UI and Styling" below). |
| v_ui.min.css | Optional. v_ui.css but minified. |

To use these, simply put them in the head of your HTML:

```HTML
	<head>
		...
		<script src="path/to/v_.js" defer></script>
	</head>
```

You can build these yourself, or grab them from our [website](https://endahallahan.github.io/V_/).

### Node.JS

V\_ is also available as a Node.JS module, and can be installed from NPM:

```bash
$ npm install v_underscore
```

Or through Yarn:

```bash
$ yarn add v_underscore
```

## How does V\_ work?

V\_ uses HTML5 data attributes to specify individual validation rules on a per-input basis. When the page loads, the script scans the page for forms with the `data-v_form` attribute, then goes through their children, applying the specified validator functions to each input. V\_ only applies the validators specified in the HTML, making it quite performant—and because it works on a per-input level, it doesn't cause any delay when the user hits submit.

## What can V\_ do for me?

V\_ comes with an extensive set of built-in validations.

| Data Attribute | Description | Example | Passes | Fails |
| ---------------|-------------|---------|--------|------ |
| `data-v_form` | Used on a form to indicate to V_ that it should be automatically validated. | `<form data-v_form action="..."> ... </form>` | | |
| `data-v_is-number` | Passes validation if the value of the input is a numeric type or a numeric string. | `<input type="text" data-v_is-number>` | 100, 100.01, "100" | "Alphabet soup" |
| `data-v_is-integer` | Passes validation if the value of the input is an integer (whole number) or an integer string. | `<input type="text" data-v_is-integer>` | 100, "100" | 100.01, "100.01" |
| `data-v_is-alphanumeric` | Passes validation if the value of the input is alphanumeric, i.e. only includes letters and numbers. | `<input type="text" data-v_is-alphanumeric>` | "abc123" | "abc123!?" |
| `data-v_is-email` | Passes validation if the value of the input is a valid email address. Roughly equivilant to `type='email'`. *Note: this function only checks if the email's format is valid; it does not verify whether it exists or not.* | `<input type="text" data-v_is-email>` | "user\@domain.com" | "alphabet soup \@" |
| `data-v_is-email-with-domain` | Similar to `data-v_is-email`, but also checks whether the email address is for the domain specified in the argument. | `<input type="text" data-v_is-email-with-domain="domain.com">` | "user\@domain.com" | "alphabet soup @", "user\@wrongdomain.com" |
| `data-v_is-url` | Passes validation if the value of the input is a valid URL. *Note: this function only checks if the URL's format is valid; it does not verify whether it exists or not.* | `<input type="text" data-v_is-url>` | "https://www.github.com", "http://www.github.com" | "alphabet soup .org" |
| `data-v_is-secure-url` | Similar to `data-v_is-url` but only passes validation if the URL begins with "https". | `<input type="text" data-v_is-secure-url>` | "https://www.github.com" | "http://www.github.com", "alphabet soup .org" |
| `data-v_is-url-with-domain` | Similar to `data-v_is-url`, but also checks whether the URL is for the domain (and subdomain) specified in the argument. | `<input type="text" data-v_is-url-with-domain="github.com">` | "https://github.com/EndaHallahan/V_" "https://www.github.com/EndaHallahan/V_" | "https://www.github.org/EndaHallahan/V_", "https://www.facebook.com", "alphabet soup .org" |
| `data-v_is-image-url` | Similar to `data-v_is-url`, but also checks whether the URL points to an image file. *Note: this function only checks if the url ends in a valid image filetype; it does not check whether the file is actually an image. This can be a security concern.* Valid filetypes are: APNG, GIF, JPEG, PNG, SVG, and WebP. | `<input type="text" data-v_is-image-url>` | "https://www.github.com/someimage.jpg" | "https://www.github.com/someimage.txt", "https://www.github.com", "alphabet soup .org" |
| `data-v_value-less-than` | Passes validation if the value of the input is numeric (or a numeric string) and less than the number specified in the argument, inclusive. | `<input type="text" data-v_value-less-than="10">` | 8, "8" | 12, "12", "alphabet soup" |
| `data-v_value-greater-than` | Passes validation if the value of the input is numeric (or a numeric string) and greater than the number specified in the argument, inclusive. | `<input type="text" data-v_value-greater-than="10">` | 12, "12" | 8, "8", "alphabet soup" |
| `data-v_value-between` | Passes validation if the value of the input is numeric (or a numeric string) and between the two numbers specified in the argument, inclusive, separated by a comma. | `<input type="text" data-v_value-between="1, 10">` | 8, "8" | 0, "0", 12, "12", "alphabet soup" |
| `data-v_length-less-than` | Passes validation if the value of the input is a string with less characters than the number specified in the argument, inclusive. | `<input type="text" data-v_length-less-than="10">` | "alphabet" | "alphabet soup" |
| `data-v_length-greater-than` | Passes validation if the value of the input is a string with more characters than the number specified in the argument, inclusive. | `<input type="text" data-v_length-greater-than="10">` | "alphabet soup" | "alphabet" |
| `data-v_length-between` | Passes validation if the value of the input is a string with a number of characters between the two numbers specified in the argument, inclusive, separated by a comma. | `<input type="text" data-v_length-between="2, 10">` | "alphabet" | "a", alphabet soup" |
| `data-v_matches-regex` | Passes validation if the value of the input matches against the regular expression defined in the argument. Regular expressions can be enclosed in / or not, depending on your preference. | `<input type="text" data-v_matches-regex="/^alpha"/>` | "alphabet soup" | "soup alphabet" |
| `data-v_matches-field` | Passes validation if the value of the input matches the value of another input, specified by `name` in the argument. Both inputs must be children of the same form element. | `<input type="text" name="match-input"> ... <input type="text" data-v_matchesField="match-input">` | Field one = "test" & field two = "test" | Field one = "test" & field two = "testing" |
| `data-v_password-strength-requirement` | Tests the entropy of the value of the input and ranks it on a scale of 0-4, with 0 being the weakest and 4 being the strongest; passes validation if the strength ranking of the value of the input is equal to or greater than the rank specified in the argument. The current strength of the password can be read from the input's `data-v_password-strength` data attribute. *Note: this validation only checks character entropy. While this may be sufficient for some applications, it is generally reccommended to use `data-v_password-zxcvbn-requirement` (see below) as it is significantly more thorough.* | `<input type="text" data-v_password-strength-requirement="2">` | "Correct Horse Battery Staple" "password" | "pass" |
| `data-v_password-zxcvbn-requirement` | Tests the password strength of the value of the input using [zxcvbn](https://github.com/dropbox/zxcvbn) and ranks it on a scale of 0-4, with 0 being the weakest and four being the strongest; passes validation if the strength ranking of the value of the input is equal to or greater than the rank specified in the argument. The current strength of the password can be read from the input's `data-v_password-strength` data attribute. *Note: usage of this validator requires zxcvbn to be present; V\_ does not come with it already installed. See the zxcvbn [Github page](https://github.com/dropbox/zxcvbn) for information on how to include it in your projects.* | `<input type="text" data-v_password-strength-requirement="2">` | "Correct Horse Battery Staple" | "pass", "password" , "password123" | 

Additionally, you can also create your own validations using the built-in `addCustomValidation` function; see "The V_ Object" under "Exports" further down the page.

## UI and Styling

By default, V\_ displays validation errors in the same way the browser does: a small pop-up on the invalid input when the user hits submit. However, V\_ also comes with a few handy UI features. For starters, because V\_ uses the browser's built-in validation API, you can style your elements properly using the `:valid` and `:invalid`  CSS pseudo-classes. 

The following can be specified on `label` elements with child inputs:

| Data Attribute | Description | Example |
| ---------------|-------------|-------- |
|`data-v_error-output` | This data attribute can be used to access the error messages generated by V\_. When a validation error on a child input element is found, the `data-v_error-output` attribute will be updated to contain it. This makes it possible to access validation error messages not only with Javascript, but also with CSS via attribute selectors. You can even use the `::after` and `::before` pseudo-elements to automatically display errors onto the page. This feature also works with HTML5 validation properties like `type` and `pattern`, so feel free to use those as well if you'd like! | `<label data-v_error-output> <input type="text" data-v_is-url> </label>` |
| `data-v_char-counter` | This data attribute provides a built-in character counter that works with either `v_length-less-than` or the HTML `maxlength` attribute. The current character count is written to the `data-v_char-counter` attribute itself, in the format "(current length)/(max length)". This makes it possible to access validation error messages not only with Javascript, but also with CSS via attribute selectors. You can even use the `::after` and `::before` pseudo-elements to automatically display the current count onto the page. | `<label data-v_char_counter> <textarea data-v_length-less-than="255"></textarea> </label>` |
| `data-v_password-output` | This data attribute copies the `data_v-password-strength` attribute of an input with the `data-v_password-strength-requirement` or `data-v_password-zxcvbn-requirement` validations. This can be useful for CSS purposes, since input elements cannot have `::after` pseudo-elements. | `<label data-v_password-output> <input type="password" data-v_password-strength-requirement> <label>` |

Additionally, V\_ comes with some optional default CSS in v_ui.css, which sets up basic styling of these features for you. Use it as a starting point if you want, or as point of reference, or not at all.

## Exports

V_ exports, or makes available globally to the page, two items: the `V_` class and the `v_ify` function. This is where Javascript comes into play.

### The `V_` Object

#### Constructor

Under the hood, V\_ is really just the application of V\_ objects to forms. You can do this yourself using the V\_ constructor:

| Function | Description |
| ---------|------------ |
| `new V_([form][options])` | Creates a new V\_ object. `form` is an HTML form element; if specified, validations will be automatically applied to that form. `options` is an object containing properties that affect how the V_ object functions; see below for more information. |

```Javascript
	let validator = new V_();
```

The constructor can be called on a form, which will automatically set up validations for you:

```Javascript
	let validator = new V_(myFormElement);
```

You can also pass an options object to the constructor:

```Javascript
	let validator = new V_({
		messages: {
			// Can be used to specify custom validation faliure messages on a per-validation basis. Ex:
			v_isInteger: "Please enter a number.",
			v_isEmail: "Email address, if you please.",
		}
	});
```

#### Methods

In addition to passing a form to the constructor, validations can also be set using the `setValidations` method, which takes a form element as an argument:

| Function | Description |
| ---------|------------ |
| `V_.setValidations(form)` | Applies validations to `form`. |

```Javascript
	let validator = new V_();
	validator.setValidations(myFormElement);
```

This is useful for setting up custom validations of your own using the `addCustomValidation` function. The `addCustomValidation` function takes an object that describes a validation and attatches it to the object instance of V\_ you're calling it on. It can then be used the same way as any other V\_ validation, and can be attached to an input through a data attribute.

| Function | Description |
| ---------|------------ |
| `V_.addCustomValidation(descriptionObject)` | Creates a custom validation and attatches it to the V_ object. |

The description object has three fields:

| Field Name | Function |
| -----------|--------- |
| `name` | The name of the custom validation, and also the name of the data attribute to use when applying it. This should be in camel case here and omit the 'data-'; in HTML, it is converted to standard data attribute syntax, i.e "v_customValidation" in Javascript becomes "data-v_custom-validation" in HTML. |
| `validationFunction` | The validation you want to be performed. This should be a function, taking two arguments: `input` and `content`. `input` is the input element triggering the validation; `content` is the value that is being tested. The function must return a boolean: return true if the validation has passed, and false if it has failed. |
| `failMessage` (optional) | The error message to be displayed to the user if the validation fails. This field is optional; if omitted, the user will be shown the generic message "Input does not meet requirements". |

An implementation of a 'required' validation, as an example:

```javascript 
	let myForm = document.getElementById("myForm");
	let validator = new V_();
	validator.addCustomValidation({
		name: "v_required",
		validationFunction: (input, content) => {
			return (content == true);
		}
		failMessage: "This field is required."
	});
	validator.setValidations(myForm);
```

And in the HTML:

```HTML
	...
	<form id="myForm">
		<input type="text" data-v_required>
	</form>
```

It is important that the custom validation be set *before* validations are set on a form, otherwise it will not be available to be applied!

### The `v_ify` Method

The second item V_ makes available is the `v_ify` method. This is the method V_ uses internally to apply validations on the page.

| Function | Description |
| ---------|------------ |
| `v_ify([form_element])` | If [form_element] is present, initializes a V_ object on that form element, setting validations. If [form_element] is *omitted*, the function will set validations on *every form on the page* that has a `data-v_form` attribute. |

In the default v_.js and v_.min.js files, this function is called without an argument after the page loads. In v_manual.js, v_manual.min.js, and as a Node module, this does not occur.

## Contributing

Glad to have you! Feel free to open issues or make pull requests. We're particularly interested in making V_ multi-lingual, so if you know another language or languages, translations are very welcome. If adding a new validation, please include the name of your validation in the title of the pull request. To build the project, use `$ npm run-script build`, and to run the test suite, use `$ npm test`.

