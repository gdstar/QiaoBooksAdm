var hljs = new function() {
	function m(p) {
		return p.replace(/&/gm, "&amp;").replace(/</gm, "&lt;")
	}

	function f(r, q, p) {
		return RegExp(q, "m" + (r.cI ? "i" : "") + (p ? "g" : ""))
	}

	function b(r) {
		for(var p = 0; p < r.childNodes.length; p++) {
			var q = r.childNodes[p];
			if(q.nodeName == "CODE") {
				return q
			}
			if(!(q.nodeType == 3 && q.nodeValue.match(/\s+/))) {
				break
			}
		}
	}

	function h(t, s) {
		var p = "";
		for(var r = 0; r < t.childNodes.length; r++) {
			if(t.childNodes[r].nodeType == 3) {
				var q = t.childNodes[r].nodeValue;
				if(s) {
					q = q.replace(/\n/g, "")
				}
				p += q
			} else {
				if(t.childNodes[r].nodeName == "BR") {
					p += "\n"
				} else {
					p += h(t.childNodes[r])
				}
			}
		}
		if(/MSIE [678]/.test(navigator.userAgent)) {
			p = p.replace(/\r/g, "\n")
		}
		return p
	}

	function a(s) {
		var r = s.className.split(/\s+/);
		r = r.concat(s.parentNode.className.split(/\s+/));
		for(var q = 0; q < r.length; q++) {
			var p = r[q].replace(/^language-/, "");
			if(e[p] || p == "no-highlight") {
				return p
			}
		}
	}

	function c(q) {
		var p = [];
		(function(s, t) {
			for(var r = 0; r < s.childNodes.length; r++) {
				if(s.childNodes[r].nodeType == 3) {
					t += s.childNodes[r].nodeValue.length
				} else {
					if(s.childNodes[r].nodeName == "BR") {
						t += 1
					} else {
						if(s.childNodes[r].nodeType == 1) {
							p.push({
								event: "start",
								offset: t,
								node: s.childNodes[r]
							});
							t = arguments.callee(s.childNodes[r], t);
							p.push({
								event: "stop",
								offset: t,
								node: s.childNodes[r]
							})
						}
					}
				}
			}
			return t
		})(q, 0);
		return p
	}

	function k(y, w, x) {
		var q = 0;
		var z = "";
		var s = [];

		function u() {
			if(y.length && w.length) {
				if(y[0].offset != w[0].offset) {
					return(y[0].offset < w[0].offset) ? y : w
				} else {
					return w[0].event == "start" ? y : w
				}
			} else {
				return y.length ? y : w
			}
		}

		function t(D) {
			var A = "<" + D.nodeName.toLowerCase();
			for(var B = 0; B < D.attributes.length; B++) {
				var C = D.attributes[B];
				A += " " + C.nodeName.toLowerCase();
				if(C.value != undefined && C.value != false && C.value != null) {
					A += '="' + m(C.value) + '"'
				}
			}
			return A + ">"
		}
		while(y.length || w.length) {
			var v = u().splice(0, 1)[0];
			z += m(x.substr(q, v.offset - q));
			q = v.offset;
			if(v.event == "start") {
				z += t(v.node);
				s.push(v.node)
			} else {
				if(v.event == "stop") {
					var r = s.length;
					do {
						r--;
						var p = s[r];
						z += ("</" + p.nodeName.toLowerCase() + ">")
					} while (p != v.node);
					s.splice(r, 1);
					while(r < s.length) {
						z += t(s[r]);
						r++
					}
				}
			}
		}
		z += x.substr(q);
		return z
	}

	function j() {
		function q(u, v, t) {
			if(u.compiled) {
				return
			}
			if(!t) {
				u.bR = f(v, u.b ? u.b : "\\B|\\b");
				if(!u.e && !u.eW) {
					u.e = "\\B|\\b"
				}
				if(u.e) {
					u.eR = f(v, u.e)
				}
			}
			if(u.i) {
				u.iR = f(v, u.i)
			}
			if(u.r == undefined) {
				u.r = 1
			}
			if(u.k) {
				u.lR = f(v, u.l || hljs.IR, true)
			}
			for(var s in u.k) {
				if(!u.k.hasOwnProperty(s)) {
					continue
				}
				if(u.k[s] instanceof Object) {
					u.kG = u.k
				} else {
					u.kG = {
						keyword: u.k
					}
				}
				break
			}
			if(!u.c) {
				u.c = []
			}
			u.compiled = true;
			for(var r = 0; r < u.c.length; r++) {
				q(u.c[r], v, false)
			}
			if(u.starts) {
				q(u.starts, v, false)
			}
		}
		for(var p in e) {
			if(!e.hasOwnProperty(p)) {
				continue
			}
			q(e[p].dM, e[p], true)
		}
	}

	function d(B, C) {
		if(!j.called) {
			j();
			j.called = true
		}

		function q(r, M) {
			for(var L = 0; L < M.c.length; L++) {
				if(M.c[L].bR.test(r)) {
					return M.c[L]
				}
			}
		}

		function v(L, r) {
			if(D[L].e && D[L].eR.test(r)) {
				return 1
			}
			if(D[L].eW) {
				var M = v(L - 1, r);
				return M ? M + 1 : 0
			}
			return 0
		}

		function w(r, L) {
			return L.iR && L.iR.test(r)
		}

		function K(N, O) {
			var M = [];
			for(var L = 0; L < N.c.length; L++) {
				M.push(N.c[L].b)
			}
			var r = D.length - 1;
			do {
				if(D[r].e) {
					M.push(D[r].e)
				}
				r--
			} while (D[r + 1].eW);
			if(N.i) {
				M.push(N.i)
			}
			return f(O, "(" + M.join("|") + ")", true)
		}

		function p(M, L) {
			var N = D[D.length - 1];
			if(!N.t) {
				N.t = K(N, E)
			}
			N.t.lastIndex = L;
			var r = N.t.exec(M);
			if(r) {
				return [M.substr(L, r.index - L), r[0], false]
			} else {
				return [M.substr(L), "", true]
			}
		}

		function z(O, r) {
			var L = E.cI ? r[0].toLowerCase() : r[0];
			for(var N in O.kG) {
				if(!O.kG.hasOwnProperty(N)) {
					continue
				}
				var M = O.kG[N].hasOwnProperty(L);
				if(M) {
					return [N, M]
				}
			}
			return false
		}

		function F(L, P) {
			if(!P.k) {
				return m(L)
			}
			var r = "";
			var O = 0;
			P.lR.lastIndex = 0;
			var M = P.lR.exec(L);
			while(M) {
				r += m(L.substr(O, M.index - O));
				var N = z(P, M);
				if(N) {
					x += N[1];
					r += '<span class="' + N[0] + '">' + m(M[0]) + "</span>"
				} else {
					r += m(M[0])
				}
				O = P.lR.lastIndex;
				M = P.lR.exec(L)
			}
			r += m(L.substr(O, L.length - O));
			return r
		}

		function J(L, M) {
			if(M.sL && e[M.sL]) {
				var r = d(M.sL, L);
				x += r.keyword_count;
				return r.value
			} else {
				return F(L, M)
			}
		}

		function I(M, r) {
			var L = M.cN ? '<span class="' + M.cN + '">' : "";
			if(M.rB) {
				y += L;
				M.buffer = ""
			} else {
				if(M.eB) {
					y += m(r) + L;
					M.buffer = ""
				} else {
					y += L;
					M.buffer = r
				}
			}
			D.push(M);
			A += M.r
		}

		function G(N, M, Q) {
			var R = D[D.length - 1];
			if(Q) {
				y += J(R.buffer + N, R);
				return false
			}
			var P = q(M, R);
			if(P) {
				y += J(R.buffer + N, R);
				I(P, M);
				return P.rB
			}
			var L = v(D.length - 1, M);
			if(L) {
				var O = R.cN ? "</span>" : "";
				if(R.rE) {
					y += J(R.buffer + N, R) + O
				} else {
					if(R.eE) {
						y += J(R.buffer + N, R) + O + m(M)
					} else {
						y += J(R.buffer + N + M, R) + O
					}
				}
				while(L > 1) {
					O = D[D.length - 2].cN ? "</span>" : "";
					y += O;
					L--;
					D.length--
				}
				var r = D[D.length - 1];
				D.length--;
				D[D.length - 1].buffer = "";
				if(r.starts) {
					I(r.starts, "")
				}
				return R.rE
			}
			if(w(M, R)) {
				throw "Illegal"
			}
		}
		var E = e[B];
		var D = [E.dM];
		var A = 0;
		var x = 0;
		var y = "";
		try {
			var u = 0;
			E.dM.buffer = "";
			do {
				var s = p(C, u);
				var t = G(s[0], s[1], s[2]);
				u += s[0].length;
				if(!t) {
					u += s[1].length
				}
			} while (!s[2]);
			if(D.length > 1) {
				throw "Illegal"
			}
			return {
				r: A,
				keyword_count: x,
				value: y
			}
		} catch(H) {
			if(H == "Illegal") {
				return {
					r: 0,
					keyword_count: 0,
					value: m(C)
				}
			} else {
				throw H
			}
		}
	}

	function g(t) {
		var p = {
			keyword_count: 0,
			r: 0,
			value: m(t)
		};
		var r = p;
		for(var q in e) {
			if(!e.hasOwnProperty(q)) {
				continue
			}
			var s = d(q, t);
			s.language = q;
			if(s.keyword_count + s.r > r.keyword_count + r.r) {
				r = s
			}
			if(s.keyword_count + s.r > p.keyword_count + p.r) {
				r = p;
				p = s
			}
		}
		if(r.language) {
			p.second_best = r
		}
		return p
	}

	function i(r, q, p) {
		if(q) {
			r = r.replace(/^((<[^>]+>|\t)+)/gm, function(t, w, v, u) {
				return w.replace(/\t/g, q)
			})
		}
		if(p) {
			r = r.replace(/\n/g, "<br>")
		}
		return r
	}

	function n(t, w, r) {
		var x = h(t, r);
		var v = a(t);
		if(v == "no-highlight") {
			return
		}
		if(v) {
			var y = d(v, x)
		} else {
			var y = g(x);
			v = y.language
		}
		var q = c(t);
		if(q.length) {
			var s = document.createElement("pre");
			s.innerHTML = y.value;
			y.value = k(q, c(s), x)
		}
		y.value = i(y.value, w, r);
		var u = t.className;
		if(!u.match("(\\s|^)(language-)?" + v + "(\\s|$)")) {
			u = u ? (u + " " + v) : v
		}
		if(/MSIE [678]/.test(navigator.userAgent) && t.tagName == "CODE" && t.parentNode.tagName == "PRE") {
			var s = t.parentNode;
			var p = document.createElement("div");
			p.innerHTML = "<pre><code>" + y.value + "</code></pre>";
			t = p.firstChild.firstChild;
			p.firstChild.cN = s.cN;
			s.parentNode.replaceChild(p.firstChild, s)
		} else {
			t.innerHTML = y.value
		}
		t.className = u;
		t.result = {
			language: v,
			kw: y.keyword_count,
			re: y.r
		};
		if(y.second_best) {
			t.second_best = {
				language: y.second_best.language,
				kw: y.second_best.keyword_count,
				re: y.second_best.r
			}
		}
	}

	function o() {
		if(o.called) {
			return
		}
		o.called = true;
		var r = document.getElementsByTagName("pre");
		for(var p = 0; p < r.length; p++) {
			var q = b(r[p]);
			if(q) {
				n(q, hljs.tabReplace)
			}
		}
	}

	function l() {
		if(window.addEventListener) {
			window.addEventListener("DOMContentLoaded", o, false);
			window.addEventListener("load", o, false)
		} else {
			if(window.attachEvent) {
				window.attachEvent("onload", o)
			} else {
				window.onload = o
			}
		}
	}
	var e = {};
	this.LANGUAGES = e;
	this.highlight = d;
	this.highlightAuto = g;
	this.fixMarkup = i;
	this.highlightBlock = n;
	this.initHighlighting = o;
	this.initHighlightingOnLoad = l;
	this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
	this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
	this.NR = "\\b\\d+(\\.\\d+)?";
	this.CNR = "\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";
	this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
	this.BE = {
		b: "\\\\.",
		r: 0
	};
	this.ASM = {
		cN: "string",
		b: "'",
		e: "'",
		i: "\\n",
		c: [this.BE],
		r: 0
	};
	this.QSM = {
		cN: "string",
		b: '"',
		e: '"',
		i: "\\n",
		c: [this.BE],
		r: 0
	};
	this.CLCM = {
		cN: "comment",
		b: "//",
		e: "$"
	};
	this.CBLCLM = {
		cN: "comment",
		b: "/\\*",
		e: "\\*/"
	};
	this.HCM = {
		cN: "comment",
		b: "#",
		e: "$"
	};
	this.NM = {
		cN: "number",
		b: this.NR,
		r: 0
	};
	this.CNM = {
		cN: "number",
		b: this.CNR,
		r: 0
	};
	this.inherit = function(r, s) {
		var p = {};
		for(var q in r) {
			p[q] = r[q]
		}
		if(s) {
			for(var q in s) {
				p[q] = s[q]
			}
		}
		return p
	}
}();
hljs.LANGUAGES.javascript = {
	dM: {
		k: {
			keyword: {
				"in": 1,
				"if": 1,
				"for": 1,
				"while": 1,
				"finally": 1,
				"var": 1,
				"new": 1,
				"function": 1,
				"do": 1,
				"return": 1,
				"void": 1,
				"else": 1,
				"break": 1,
				"catch": 1,
				"instanceof": 1,
				"with": 1,
				"throw": 1,
				"case": 1,
				"default": 1,
				"try": 1,
				"this": 1,
				"switch": 1,
				"continue": 1,
				"typeof": 1,
				"delete": 1
			},
			literal: {
				"true": 1,
				"false": 1,
				"null": 1
			}
		},
		c: [hljs.ASM, hljs.QSM, hljs.CLCM, hljs.CBLCLM, hljs.CNM, {
			b: "(" + hljs.RSR + "|case|return|throw)\\s*",
			k: {
				"return": 1,
				"throw": 1,
				"case": 1
			},
			c: [hljs.CLCM, hljs.CBLCLM, {
				cN: "regexp",
				b: "/",
				e: "/[gim]*",
				c: [{
					b: "\\\\/"
				}]
			}],
			r: 0
		}, {
			cN: "function",
			b: "\\bfunction\\b",
			e: "{",
			k: {
				"function": 1
			},
			c: [{
				cN: "title",
				b: "[A-Za-z$_][0-9A-Za-z$_]*"
			}, {
				cN: "params",
				b: "\\(",
				e: "\\)",
				c: [hljs.ASM, hljs.QSM, hljs.CLCM, hljs.CBLCLM]
			}]
		}]
	}
};
hljs.LANGUAGES.bash = function() {
	var e = {
		"true": 1,
		"false": 1
	};
	var b = {
		cN: "variable",
		b: "\\$([a-zA-Z0-9_]+)\\b"
	};
	var a = {
		cN: "variable",
		b: "\\$\\{(([^}])|(\\\\}))+\\}",
		c: [hljs.CNM]
	};
	var f = {
		cN: "string",
		b: '"',
		e: '"',
		i: "\\n",
		c: [hljs.BE, b, a],
		r: 0
	};
	var c = {
		cN: "string",
		b: "'",
		e: "'",
		r: 0
	};
	var d = {
		cN: "test_condition",
		b: "",
		e: "",
		c: [f, c, b, a, hljs.CNM],
		k: {
			literal: e
		},
		r: 0
	};
	return {
		dM: {
			k: {
				keyword: {
					"if": 1,
					then: 1,
					"else": 1,
					fi: 1,
					"for": 1,
					"break": 1,
					"continue": 1,
					"while": 1,
					"in": 1,
					"do": 1,
					done: 1,
					echo: 1,
					exit: 1,
					"return": 1,
					set: 1,
					declare: 1
				},
				literal: e
			},
			c: [{
				cN: "shebang",
				b: "(#!\\/bin\\/bash)|(#!\\/bin\\/sh)",
				r: 10
			}, b, a, hljs.HCM, hljs.CNM, f, c, hljs.inherit(d, {
				b: "\\[ ",
				e: " \\]",
				r: 0
			}), hljs.inherit(d, {
				b: "\\[\\[ ",
				e: " \\]\\]"
			})]
		}
	}
}();
hljs.LANGUAGES.php = {
	cI: true,
	dM: {
		k: {
			and: 1,
			include_once: 1,
			list: 1,
			"abstract": 1,
			global: 1,
			"private": 1,
			echo: 1,
			"interface": 1,
			as: 1,
			"static": 1,
			endswitch: 1,
			array: 1,
			"null": 1,
			"if": 1,
			endwhile: 1,
			or: 1,
			"const": 1,
			"for": 1,
			endforeach: 1,
			self: 1,
			"var": 1,
			"while": 1,
			isset: 1,
			"public": 1,
			"protected": 1,
			exit: 1,
			foreach: 1,
			"throw": 1,
			elseif: 1,
			"extends": 1,
			include: 1,
			__FILE__: 1,
			empty: 1,
			require_once: 1,
			"function": 1,
			"do": 1,
			xor: 1,
			"return": 1,
			"implements": 1,
			parent: 1,
			clone: 1,
			use: 1,
			__CLASS__: 1,
			__LINE__: 1,
			"else": 1,
			"break": 1,
			print: 1,
			"eval": 1,
			"new": 1,
			"catch": 1,
			__METHOD__: 1,
			"class": 1,
			"case": 1,
			exception: 1,
			php_user_filter: 1,
			"default": 1,
			die: 1,
			require: 1,
			__FUNCTION__: 1,
			enddeclare: 1,
			"final": 1,
			"try": 1,
			"this": 1,
			"switch": 1,
			"continue": 1,
			endfor: 1,
			endif: 1,
			declare: 1,
			unset: 1,
			"true": 1,
			"false": 1,
			namespace: 1
		},
		c: [hljs.CLCM, hljs.HCM, {
			cN: "comment",
			b: "/\\*",
			e: "\\*/",
			c: [{
				cN: "phpdoc",
				b: "\\s@[A-Za-z]+",
				r: 10
			}]
		}, hljs.CNM, hljs.inherit(hljs.ASM, {
			i: null
		}), hljs.inherit(hljs.QSM, {
			i: null
		}), {
			cN: "variable",
			b: "\\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*"
		}, {
			cN: "preprocessor",
			b: "<\\?php",
			r: 10
		}, {
			cN: "preprocessor",
			b: "\\?>"
		}]
	}
};
hljs.LANGUAGES.xml = function() {
	var b = "[A-Za-z0-9\\._:-]+";
	var a = {
		eW: true,
		c: [{
			cN: "attribute",
			b: b,
			r: 0
		}, {
			b: '="',
			rB: true,
			e: '"',
			c: [{
				cN: "value",
				b: '"',
				eW: true
			}]
		}, {
			b: "='",
			rB: true,
			e: "'",
			c: [{
				cN: "value",
				b: "'",
				eW: true
			}]
		}, {
			b: "=",
			c: [{
				cN: "value",
				b: "[^\\s/>]+"
			}]
		}]
	};
	return {
		cI: true,
		dM: {
			c: [{
				cN: "pi",
				b: "<\\?",
				e: "\\?>",
				r: 10
			}, {
				cN: "doctype",
				b: "<!DOCTYPE",
				e: ">",
				r: 10,
				c: [{
					b: "\\[",
					e: "\\]"
				}]
			}, {
				cN: "comment",
				b: "<!--",
				e: "-->",
				r: 10
			}, {
				cN: "cdata",
				b: "<\\!\\[CDATA\\[",
				e: "\\]\\]>",
				r: 10
			}, {
				cN: "tag",
				b: "<style(?=\\s|>|$)",
				e: ">",
				k: {
					title: {
						style: 1
					}
				},
				c: [a],
				starts: {
					cN: "css",
					e: "</style>",
					rE: true,
					sL: "css"
				}
			}, {
				cN: "tag",
				b: "<script(?=\\s|>|$)",
				e: ">",
				k: {
					title: {
						script: 1
					}
				},
				c: [a],
				starts: {
					cN: "javascript",
					e: "<\/script>",
					rE: true,
					sL: "javascript"
				}
			}, {
				cN: "vbscript",
				b: "<%",
				e: "%>",
				sL: "vbscript"
			}, {
				cN: "tag",
				b: "</?",
				e: "/?>",
				c: [{
					cN: "title",
					b: "[^ />]+"
				}, a]
			}]
		}
	}
}();
hljs.LANGUAGES.ini = {
	cI: true,
	dM: {
		i: "[^\\s]",
		c: [{
			cN: "comment",
			b: ";",
			e: "$"
		}, {
			cN: "title",
			b: "^\\[",
			e: "\\]"
		}, {
			cN: "setting",
			b: "^[a-z0-9_\\[\\]]+[ \\t]*=[ \\t]*",
			e: "$",
			c: [{
				cN: "value",
				eW: true,
				k: {
					on: 1,
					off: 1,
					"true": 1,
					"false": 1,
					yes: 1,
					no: 1
				},
				c: [hljs.QSM, hljs.NM]
			}]
		}]
	}
};
hljs.LANGUAGES.python = function() {
	var c = {
		cN: "string",
		b: "(u|b)?r?'''",
		e: "'''",
		r: 10
	};
	var b = {
		cN: "string",
		b: '(u|b)?r?"""',
		e: '"""',
		r: 10
	};
	var a = {
		cN: "string",
		b: "(u|r|ur|b|br)'",
		e: "'",
		c: [hljs.BE],
		r: 10
	};
	var f = {
		cN: "string",
		b: '(u|r|ur|b|br)"',
		e: '"',
		c: [hljs.BE],
		r: 10
	};
	var e = {
		cN: "title",
		b: hljs.UIR
	};
	var d = {
		cN: "params",
		b: "\\(",
		e: "\\)",
		c: [c, b, a, f, hljs.ASM, hljs.QSM]
	};
	return {
		dM: {
			k: {
				keyword: {
					and: 1,
					elif: 1,
					is: 1,
					global: 1,
					as: 1,
					"in": 1,
					"if": 1,
					from: 1,
					raise: 1,
					"for": 1,
					except: 1,
					"finally": 1,
					print: 1,
					"import": 1,
					pass: 1,
					"return": 1,
					exec: 1,
					"else": 1,
					"break": 1,
					not: 1,
					"with": 1,
					"class": 1,
					assert: 1,
					yield: 1,
					"try": 1,
					"while": 1,
					"continue": 1,
					del: 1,
					or: 1,
					def: 1,
					lambda: 1,
					nonlocal: 10
				},
				built_in: {
					None: 1,
					True: 1,
					False: 1,
					Ellipsis: 1,
					NotImplemented: 1
				}
			},
			i: "(</|->|\\?)",
			c: [hljs.HCM, c, b, a, f, hljs.ASM, hljs.QSM, {
				cN: "function",
				b: "\\bdef ",
				e: ":",
				i: "$",
				k: {
					def: 1
				},
				c: [e, d],
				r: 10
			}, {
				cN: "class",
				b: "\\bclass ",
				e: ":",
				i: "[${]",
				k: {
					"class": 1
				},
				c: [e, d],
				r: 10
			}, hljs.CNM, {
				cN: "decorator",
				b: "@",
				e: "$"
			}]
		}
	}
}();
hljs.LANGUAGES.sql = {
	cI: true,
	dM: {
		i: "[^\\s]",
		c: [{
			cN: "operator",
			b: "(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant)\\b",
			e: ";|$",
			k: {
				keyword: {
					all: 1,
					partial: 1,
					global: 1,
					month: 1,
					current_timestamp: 1,
					using: 1,
					go: 1,
					revoke: 1,
					smallint: 1,
					indicator: 1,
					"end-exec": 1,
					disconnect: 1,
					zone: 1,
					"with": 1,
					character: 1,
					assertion: 1,
					to: 1,
					add: 1,
					current_user: 1,
					usage: 1,
					input: 1,
					local: 1,
					alter: 1,
					match: 1,
					collate: 1,
					real: 1,
					then: 1,
					rollback: 1,
					get: 1,
					read: 1,
					timestamp: 1,
					session_user: 1,
					not: 1,
					integer: 1,
					bit: 1,
					unique: 1,
					day: 1,
					minute: 1,
					desc: 1,
					insert: 1,
					execute: 1,
					like: 1,
					ilike: 2,
					level: 1,
					decimal: 1,
					drop: 1,
					"continue": 1,
					isolation: 1,
					found: 1,
					where: 1,
					constraints: 1,
					domain: 1,
					right: 1,
					national: 1,
					some: 1,
					module: 1,
					transaction: 1,
					relative: 1,
					second: 1,
					connect: 1,
					escape: 1,
					close: 1,
					system_user: 1,
					"for": 1,
					deferred: 1,
					section: 1,
					cast: 1,
					current: 1,
					sqlstate: 1,
					allocate: 1,
					intersect: 1,
					deallocate: 1,
					numeric: 1,
					"public": 1,
					preserve: 1,
					full: 1,
					"goto": 1,
					initially: 1,
					asc: 1,
					no: 1,
					key: 1,
					output: 1,
					collation: 1,
					group: 1,
					by: 1,
					union: 1,
					session: 1,
					both: 1,
					last: 1,
					language: 1,
					constraint: 1,
					column: 1,
					of: 1,
					space: 1,
					foreign: 1,
					deferrable: 1,
					prior: 1,
					connection: 1,
					unknown: 1,
					action: 1,
					commit: 1,
					view: 1,
					or: 1,
					first: 1,
					into: 1,
					"float": 1,
					year: 1,
					primary: 1,
					cascaded: 1,
					except: 1,
					restrict: 1,
					set: 1,
					references: 1,
					names: 1,
					table: 1,
					outer: 1,
					open: 1,
					select: 1,
					size: 1,
					are: 1,
					rows: 1,
					from: 1,
					prepare: 1,
					distinct: 1,
					leading: 1,
					create: 1,
					only: 1,
					next: 1,
					inner: 1,
					authorization: 1,
					schema: 1,
					corresponding: 1,
					option: 1,
					declare: 1,
					precision: 1,
					immediate: 1,
					"else": 1,
					timezone_minute: 1,
					external: 1,
					varying: 1,
					translation: 1,
					"true": 1,
					"case": 1,
					exception: 1,
					join: 1,
					hour: 1,
					"default": 1,
					"double": 1,
					scroll: 1,
					value: 1,
					cursor: 1,
					descriptor: 1,
					values: 1,
					dec: 1,
					fetch: 1,
					procedure: 1,
					"delete": 1,
					and: 1,
					"false": 1,
					"int": 1,
					is: 1,
					describe: 1,
					"char": 1,
					as: 1,
					at: 1,
					"in": 1,
					varchar: 1,
					"null": 1,
					trailing: 1,
					any: 1,
					absolute: 1,
					current_time: 1,
					end: 1,
					grant: 1,
					privileges: 1,
					when: 1,
					cross: 1,
					check: 1,
					write: 1,
					current_date: 1,
					pad: 1,
					begin: 1,
					temporary: 1,
					exec: 1,
					time: 1,
					update: 1,
					catalog: 1,
					user: 1,
					sql: 1,
					date: 1,
					on: 1,
					identity: 1,
					timezone_hour: 1,
					natural: 1,
					whenever: 1,
					interval: 1,
					work: 1,
					order: 1,
					cascade: 1,
					diagnostics: 1,
					nchar: 1,
					having: 1,
					left: 1,
					call: 1,
					"do": 1,
					handler: 1,
					load: 1,
					replace: 1,
					truncate: 1,
					start: 1,
					lock: 1,
					show: 1,
					pragma: 1
				},
				aggregate: {
					count: 1,
					sum: 1,
					min: 1,
					max: 1,
					avg: 1
				}
			},
			c: [{
				cN: "string",
				b: "'",
				e: "'",
				c: [hljs.BE, {
					b: "''"
				}],
				r: 0
			}, {
				cN: "string",
				b: '"',
				e: '"',
				c: [hljs.BE, {
					b: '""'
				}],
				r: 0
			}, {
				cN: "string",
				b: "`",
				e: "`",
				c: [hljs.BE]
			}, hljs.CNM, {
				b: "\\n"
			}]
		}, hljs.CBLCLM, {
			cN: "comment",
			b: "--",
			e: "$"
		}]
	}
};