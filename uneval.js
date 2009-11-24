if (typeof uneval != "function") {
	uneval = function (o) {
		switch (typeof o) {
			case "undefined" : return "(void 0)";
			case "boolean"   : return String(o);
			case "number"    : return String(o);
			case "string"    : return '"' + o.replace(/[^a-z]/gi, function (_) { return '\\u' + (0x10000 + _.charCodeAt(0)).toString(16).slice(1) }) + '"';
			case "function"  : return "(" + o.toString() + ")";
			case "object"    :
				if (o == null) return "null";
				var type = Object.prototype.toString.call(o).match(/\[object (.+)\]/);
				if (!type) throw TypeError("unknown type:"+o);
				switch (type[1]) {
					case "Array":
						var ret = [];
						for (var i = 0, l = o.length; i < l; ret.push(arguments.callee(o[i++])));
						return "[" + ret.join(", ") + "]";
					case "Object":
						var ret = [];
						for (var i in o) if (o.hasOwnProperty(i)) {
							ret.push(arguments.callee(i) + ":" + arguments.callee(o[i]));
						}
						return "({" + ret.join(", ") + "})";
					case "Number":
						return "(new Number(" + o + "))";
					case "String":
						return "(new String(" + arguments.callee(o) + "))";
					case "Date":
						return "(new Date(" + o.getTime() + "))";
					default:
						if (o.toSource) return o.toSource();
						throw TypeError("unknown type:"+o);
				}
		}
		return "";
	}
}
