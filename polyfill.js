/**	RegExp.escape(STRING)
 *	Inspired by personal need and a polyfill found @
 *		https://github.com/benjamingr/RegExp.escape
 *	Only real difference is implementation and accounting for forward slashes.
 *
 *	@param {STRING|ARRAY} Can be multiple strings. If just one, then a string is returned.
 *			However, if multiple Strings, or an Array of Strings, are passed through, then an array is returned.
 **/
(function() {
	function regExpEscape() {
		var a = Array.prototype.slice.call(arguments, 0);
		if (1 == a.length && "string" == typeof a[0]) return doEscape(a[0]);
		if (a.length) {
			var b = [], c;
			for (c in a)
				if ("string" == typeof a[c] && b.push(doEscape(a[c])), "object" == typeof a[c])
					for (var d in a[c]) "string" == typeof a[c][d] && b.push(doEscape(a[c][d]));
			return 1 == b.length ? b[0] : b;
		}
		return void 0;
	}
	function doEscape(a) { return a.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&"); }
	var name = "escape";
	function method() {
		var a = Array.prototype.slice.call(arguments, 0);
		return regExpEscape.apply(this, a)
	}
	Object.defineProperty && !RegExp.__proto__.hasOwnProperty(name)
		? Object.defineProperty(RegExp.__proto__, name, { value: method }) : RegExp.__proto__[name] = method;
	/** Example Use:
	 *	var a  = ")(*",
	 *		r = new RegExp(RegExp.escape(a), 'g');
	 *	console.log({ 'string': a, 'regex': r, 'test': r.test(a), 'matach': a.match(r) });
	 **/
})();
