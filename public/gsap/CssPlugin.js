/*!
 * VERSION: 2.1.0
 * DATE: 2019-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope =
	"undefined" != typeof module &&
	module.exports &&
	"undefined" != typeof global
		? global
		: this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
	"use strict";
	_gsScope._gsDefine(
		"plugins.CSSPlugin",
		["plugins.TweenPlugin", "TweenLite"],
		function(a, b) {
			var c,
				d,
				e,
				f,
				g = function() {
					a.call(this, "css"),
						(this._overwriteProps.length = 0),
						(this.setRatio = g.prototype.setRatio);
				},
				h = _gsScope._gsDefine.globals,
				i = {},
				j = (g.prototype = new a("css"));
			(j.constructor = g),
				(g.version = "2.1.0"),
				(g.API = 2),
				(g.defaultTransformPerspective = 0),
				(g.defaultSkewType = "compensated"),
				(g.defaultSmoothOrigin = !0),
				(j = "px"),
				(g.suffixMap = {
					top: j,
					right: j,
					bottom: j,
					left: j,
					width: j,
					height: j,
					fontSize: j,
					padding: j,
					margin: j,
					perspective: j,
					lineHeight: "",
				});
			var k,
				l,
				m,
				n,
				o,
				p,
				q,
				r,
				s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
				t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
				u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
				v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
				w = /(?:\d|\-|\+|=|#|\.)*/g,
				x = /opacity *= *([^)]*)/i,
				y = /opacity:([^;]*)/i,
				z = /alpha\(opacity *=.+?\)/i,
				A = /^(rgb|hsl)/,
				B = /([A-Z])/g,
				C = /-([a-z])/gi,
				D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
				E = function(a, b) {
					return b.toUpperCase();
				},
				F = /(?:Left|Right|Width)/i,
				G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
				H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
				I = /,(?=[^\)]*(?:\(|$))/gi,
				J = /[\s,\(]/i,
				K = Math.PI / 180,
				L = 180 / Math.PI,
				M = {},
				N = { style: {} },
				O = _gsScope.document || {
					createElement: function() {
						return N;
					},
				},
				P = function(a, b) {
					return b && O.createElementNS
						? O.createElementNS(b, a)
						: O.createElement(a);
				},
				Q = P("div"),
				R = P("img"),
				S = (g._internals = { _specialProps: i }),
				T = (_gsScope.navigator || {}).userAgent || "",
				U = (function() {
					var a = T.indexOf("Android"),
						b = P("a");
					return (
						(m =
							-1 !== T.indexOf("Safari") &&
							-1 === T.indexOf("Chrome") &&
							(-1 === a || parseFloat(T.substr(a + 8, 2)) > 3)),
						(o =
							m &&
							parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) <
								6),
						(n = -1 !== T.indexOf("Firefox")),
						(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) ||
							/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) &&
							(p = parseFloat(RegExp.$1)),
						b
							? ((b.style.cssText = "top:1px;opacity:.55;"),
							  /^0.55/.test(b.style.opacity))
							: !1
					);
				})(),
				V = function(a) {
					return x.test(
						"string" == typeof a
							? a
							: (a.currentStyle
									? a.currentStyle.filter
									: a.style.filter) || ""
					)
						? parseFloat(RegExp.$1) / 100
						: 1;
				},
				W = function(a) {
					_gsScope.console && console.log(a);
				},
				X = "",
				Y = "",
				Z = function(a, b) {
					b = b || Q;
					var c,
						d,
						e = b.style;
					if (void 0 !== e[a]) return a;
					for (
						a = a.charAt(0).toUpperCase() + a.substr(1),
							c = ["O", "Moz", "ms", "Ms", "Webkit"],
							d = 5;
						--d > -1 && void 0 === e[c[d] + a];

					);
					return d >= 0
						? ((Y = 3 === d ? "ms" : c[d]),
						  (X = "-" + Y.toLowerCase() + "-"),
						  Y + a)
						: null;
				},
				$ =
					"undefined" != typeof window
						? window
						: O.defaultView || { getComputedStyle: function() {} },
				_ = function(a) {
					return $.getComputedStyle(a);
				},
				aa = (g.getStyle = function(a, b, c, d, e) {
					var f;
					return U || "opacity" !== b
						? (!d && a.style[b]
								? (f = a.style[b])
								: (c = c || _(a))
								? (f =
										c[b] ||
										c.getPropertyValue(b) ||
										c.getPropertyValue(
											b.replace(B, "-$1").toLowerCase()
										))
								: a.currentStyle && (f = a.currentStyle[b]),
						  null == e ||
						  (f &&
								"none" !== f &&
								"auto" !== f &&
								"auto auto" !== f)
								? f
								: e)
						: V(a);
				}),
				ba = (S.convertToPixels = function(a, c, d, e, f) {
					if ("px" === e || (!e && "lineHeight" !== c)) return d;
					if ("auto" === e || !d) return 0;
					var h,
						i,
						j,
						k = F.test(c),
						l = a,
						m = Q.style,
						n = 0 > d,
						o = 1 === d;
					if (
						(n && (d = -d),
						o && (d *= 100),
						"lineHeight" !== c || e)
					)
						if ("%" === e && -1 !== c.indexOf("border"))
							h =
								(d / 100) *
								(k ? a.clientWidth : a.clientHeight);
						else {
							if (
								((m.cssText =
									"border:0 solid red;position:" +
									aa(a, "position") +
									";line-height:0;"),
								"%" !== e &&
									l.appendChild &&
									"v" !== e.charAt(0) &&
									"rem" !== e)
							)
								m[k ? "borderLeftWidth" : "borderTopWidth"] =
									d + e;
							else {
								if (
									((l = a.parentNode || O.body),
									-1 !== aa(l, "display").indexOf("flex") &&
										(m.position = "absolute"),
									(i = l._gsCache),
									(j = b.ticker.frame),
									i && k && i.time === j)
								)
									return (i.width * d) / 100;
								m[k ? "width" : "height"] = d + e;
							}
							l.appendChild(Q),
								(h = parseFloat(
									Q[k ? "offsetWidth" : "offsetHeight"]
								)),
								l.removeChild(Q),
								k &&
									"%" === e &&
									g.cacheWidths !== !1 &&
									((i = l._gsCache = l._gsCache || {}),
									(i.time = j),
									(i.width = (h / d) * 100)),
								0 !== h || f || (h = ba(a, c, d, e, !0));
						}
					else
						(i = _(a).lineHeight),
							(a.style.lineHeight = d),
							(h = parseFloat(_(a).lineHeight)),
							(a.style.lineHeight = i);
					return o && (h /= 100), n ? -h : h;
				}),
				ca = (S.calculateOffset = function(a, b, c) {
					if ("absolute" !== aa(a, "position", c)) return 0;
					var d = "left" === b ? "Left" : "Top",
						e = aa(a, "margin" + d, c);
					return (
						a["offset" + d] -
						(ba(a, b, parseFloat(e), e.replace(w, "")) || 0)
					);
				}),
				da = function(a, b) {
					var c,
						d,
						e,
						f = {};
					if ((b = b || _(a, null)))
						if ((c = b.length))
							for (; --c > -1; )
								(e = b[c]),
									(-1 === e.indexOf("-transform") ||
										Ea === e) &&
										(f[
											e.replace(C, E)
										] = b.getPropertyValue(e));
						else
							for (c in b)
								(-1 === c.indexOf("Transform") || Da === c) &&
									(f[c] = b[c]);
					else if ((b = a.currentStyle || a.style))
						for (c in b)
							"string" == typeof c &&
								void 0 === f[c] &&
								(f[c.replace(C, E)] = b[c]);
					return (
						U || (f.opacity = V(a)),
						(d = Sa(a, b, !1)),
						(f.rotation = d.rotation),
						(f.skewX = d.skewX),
						(f.scaleX = d.scaleX),
						(f.scaleY = d.scaleY),
						(f.x = d.x),
						(f.y = d.y),
						Ga &&
							((f.z = d.z),
							(f.rotationX = d.rotationX),
							(f.rotationY = d.rotationY),
							(f.scaleZ = d.scaleZ)),
						f.filters && delete f.filters,
						f
					);
				},
				ea = function(a, b, c, d, e) {
					var f,
						g,
						h,
						i = {},
						j = a.style;
					for (g in c)
						"cssText" !== g &&
							"length" !== g &&
							isNaN(g) &&
							(b[g] !== (f = c[g]) || (e && e[g])) &&
							-1 === g.indexOf("Origin") &&
							("number" == typeof f || "string" == typeof f) &&
							((i[g] =
								"auto" !== f || ("left" !== g && "top" !== g)
									? ("" !== f &&
											"auto" !== f &&
											"none" !== f) ||
									  "string" != typeof b[g] ||
									  "" === b[g].replace(v, "")
										? f
										: 0
									: ca(a, g)),
							void 0 !== j[g] && (h = new ta(j, g, j[g], h)));
					if (d) for (g in d) "className" !== g && (i[g] = d[g]);
					return { difs: i, firstMPT: h };
				},
				fa = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
				ga = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
				ha = function(a, b, c) {
					if ("svg" === (a.nodeName + "").toLowerCase())
						return (c || _(a))[b] || 0;
					if (a.getCTM && Pa(a)) return a.getBBox()[b] || 0;
					var d = parseFloat(
							"width" === b ? a.offsetWidth : a.offsetHeight
						),
						e = fa[b],
						f = e.length;
					for (c = c || _(a, null); --f > -1; )
						(d -= parseFloat(aa(a, "padding" + e[f], c, !0)) || 0),
							(d -=
								parseFloat(
									aa(a, "border" + e[f] + "Width", c, !0)
								) || 0);
					return d;
				},
				ia = function(a, b) {
					if ("contain" === a || "auto" === a || "auto auto" === a)
						return a + " ";
					(null == a || "" === a) && (a = "0 0");
					var c,
						d = a.split(" "),
						e =
							-1 !== a.indexOf("left")
								? "0%"
								: -1 !== a.indexOf("right")
								? "100%"
								: d[0],
						f =
							-1 !== a.indexOf("top")
								? "0%"
								: -1 !== a.indexOf("bottom")
								? "100%"
								: d[1];
					if (d.length > 3 && !b) {
						for (
							d = a
								.split(", ")
								.join(",")
								.split(","),
								a = [],
								c = 0;
							c < d.length;
							c++
						)
							a.push(ia(d[c]));
						return a.join(",");
					}
					return (
						null == f
							? (f = "center" === e ? "50%" : "0")
							: "center" === f && (f = "50%"),
						("center" === e ||
							(isNaN(parseFloat(e)) &&
								-1 === (e + "").indexOf("="))) &&
							(e = "50%"),
						(a = e + " " + f + (d.length > 2 ? " " + d[2] : "")),
						b &&
							((b.oxp = -1 !== e.indexOf("%")),
							(b.oyp = -1 !== f.indexOf("%")),
							(b.oxr = "=" === e.charAt(1)),
							(b.oyr = "=" === f.charAt(1)),
							(b.ox = parseFloat(e.replace(v, ""))),
							(b.oy = parseFloat(f.replace(v, ""))),
							(b.v = a)),
						b || a
					);
				},
				ja = function(a, b) {
					return (
						"function" == typeof a && (a = a(r, q)),
						"string" == typeof a && "=" === a.charAt(1)
							? parseInt(a.charAt(0) + "1", 10) *
							  parseFloat(a.substr(2))
							: parseFloat(a) - parseFloat(b) || 0
					);
				},
				ka = function(a, b) {
					"function" == typeof a && (a = a(r, q));
					var c = "string" == typeof a && "=" === a.charAt(1);
					return (
						"string" == typeof a &&
							"v" === a.charAt(a.length - 2) &&
							(a =
								(c ? a.substr(0, 2) : 0) +
								window[
									"inner" +
										("vh" === a.substr(-2)
											? "Height"
											: "Width")
								] *
									(parseFloat(c ? a.substr(2) : a) / 100)),
						null == a
							? b
							: c
							? parseInt(a.charAt(0) + "1", 10) *
									parseFloat(a.substr(2)) +
							  b
							: parseFloat(a) || 0
					);
				},
				la = function(a, b, c, d) {
					var e,
						f,
						g,
						h,
						i,
						j = 1e-6;
					return (
						"function" == typeof a && (a = a(r, q)),
						null == a
							? (h = b)
							: "number" == typeof a
							? (h = a)
							: ((e = 360),
							  (f = a.split("_")),
							  (i = "=" === a.charAt(1)),
							  (g =
									(i
										? parseInt(a.charAt(0) + "1", 10) *
										  parseFloat(f[0].substr(2))
										: parseFloat(f[0])) *
										(-1 === a.indexOf("rad") ? 1 : L) -
									(i ? 0 : b)),
							  f.length &&
									(d && (d[c] = b + g),
									-1 !== a.indexOf("short") &&
										((g %= e),
										g !== g % (e / 2) &&
											(g = 0 > g ? g + e : g - e)),
									-1 !== a.indexOf("_cw") && 0 > g
										? (g =
												((g + 9999999999 * e) % e) -
												((g / e) | 0) * e)
										: -1 !== a.indexOf("ccw") &&
										  g > 0 &&
										  (g =
												((g - 9999999999 * e) % e) -
												((g / e) | 0) * e)),
							  (h = b + g)),
						j > h && h > -j && (h = 0),
						h
					);
				},
				ma = {
					aqua: [0, 255, 255],
					lime: [0, 255, 0],
					silver: [192, 192, 192],
					black: [0, 0, 0],
					maroon: [128, 0, 0],
					teal: [0, 128, 128],
					blue: [0, 0, 255],
					navy: [0, 0, 128],
					white: [255, 255, 255],
					fuchsia: [255, 0, 255],
					olive: [128, 128, 0],
					yellow: [255, 255, 0],
					orange: [255, 165, 0],
					gray: [128, 128, 128],
					purple: [128, 0, 128],
					green: [0, 128, 0],
					red: [255, 0, 0],
					pink: [255, 192, 203],
					cyan: [0, 255, 255],
					transparent: [255, 255, 255, 0],
				},
				na = function(a, b, c) {
					return (
						(a = 0 > a ? a + 1 : a > 1 ? a - 1 : a),
						(255 *
							(1 > 6 * a
								? b + (c - b) * a * 6
								: 0.5 > a
								? c
								: 2 > 3 * a
								? b + (c - b) * (2 / 3 - a) * 6
								: b) +
							0.5) |
							0
					);
				},
				oa = (g.parseColor = function(a, b) {
					var c, d, e, f, g, h, i, j, k, l, m;
					if (a)
						if ("number" == typeof a)
							c = [a >> 16, (a >> 8) & 255, 255 & a];
						else {
							if (
								("," === a.charAt(a.length - 1) &&
									(a = a.substr(0, a.length - 1)),
								ma[a])
							)
								c = ma[a];
							else if ("#" === a.charAt(0))
								4 === a.length &&
									((d = a.charAt(1)),
									(e = a.charAt(2)),
									(f = a.charAt(3)),
									(a = "#" + d + d + e + e + f + f)),
									(a = parseInt(a.substr(1), 16)),
									(c = [a >> 16, (a >> 8) & 255, 255 & a]);
							else if ("hsl" === a.substr(0, 3))
								if (((c = m = a.match(s)), b)) {
									if (-1 !== a.indexOf("="))
										return a.match(t);
								} else
									(g = (Number(c[0]) % 360) / 360),
										(h = Number(c[1]) / 100),
										(i = Number(c[2]) / 100),
										(e =
											0.5 >= i
												? i * (h + 1)
												: i + h - i * h),
										(d = 2 * i - e),
										c.length > 3 && (c[3] = Number(c[3])),
										(c[0] = na(g + 1 / 3, d, e)),
										(c[1] = na(g, d, e)),
										(c[2] = na(g - 1 / 3, d, e));
							else c = a.match(s) || ma.transparent;
							(c[0] = Number(c[0])),
								(c[1] = Number(c[1])),
								(c[2] = Number(c[2])),
								c.length > 3 && (c[3] = Number(c[3]));
						}
					else c = ma.black;
					return (
						b &&
							!m &&
							((d = c[0] / 255),
							(e = c[1] / 255),
							(f = c[2] / 255),
							(j = Math.max(d, e, f)),
							(k = Math.min(d, e, f)),
							(i = (j + k) / 2),
							j === k
								? (g = h = 0)
								: ((l = j - k),
								  (h = i > 0.5 ? l / (2 - j - k) : l / (j + k)),
								  (g =
										j === d
											? (e - f) / l + (f > e ? 6 : 0)
											: j === e
											? (f - d) / l + 2
											: (d - e) / l + 4),
								  (g *= 60)),
							(c[0] = (g + 0.5) | 0),
							(c[1] = (100 * h + 0.5) | 0),
							(c[2] = (100 * i + 0.5) | 0)),
						c
					);
				}),
				pa = function(a, b) {
					var c,
						d,
						e,
						f = a.match(qa) || [],
						g = 0,
						h = "";
					if (!f.length) return a;
					for (c = 0; c < f.length; c++)
						(d = f[c]),
							(e = a.substr(g, a.indexOf(d, g) - g)),
							(g += e.length + d.length),
							(d = oa(d, b)),
							3 === d.length && d.push(1),
							(h +=
								e +
								(b
									? "hsla(" +
									  d[0] +
									  "," +
									  d[1] +
									  "%," +
									  d[2] +
									  "%," +
									  d[3]
									: "rgba(" + d.join(",")) +
								")");
					return h + a.substr(g);
				},
				qa =
					"(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
			for (j in ma) qa += "|" + j + "\\b";
			(qa = new RegExp(qa + ")", "gi")),
				(g.colorStringFilter = function(a) {
					var b,
						c = a[0] + " " + a[1];
					qa.test(c) &&
						((b =
							-1 !== c.indexOf("hsl(") ||
							-1 !== c.indexOf("hsla(")),
						(a[0] = pa(a[0], b)),
						(a[1] = pa(a[1], b))),
						(qa.lastIndex = 0);
				}),
				b.defaultStringFilter ||
					(b.defaultStringFilter = g.colorStringFilter);
			var ra = function(a, b, c, d) {
					if (null == a)
						return function(a) {
							return a;
						};
					var e,
						f = b ? (a.match(qa) || [""])[0] : "",
						g =
							a
								.split(f)
								.join("")
								.match(u) || [],
						h = a.substr(0, a.indexOf(g[0])),
						i = ")" === a.charAt(a.length - 1) ? ")" : "",
						j = -1 !== a.indexOf(" ") ? " " : ",",
						k = g.length,
						l = k > 0 ? g[0].replace(s, "") : "";
					return k
						? (e = b
								? function(a) {
										var b, m, n, o;
										if ("number" == typeof a) a += l;
										else if (d && I.test(a)) {
											for (
												o = a
													.replace(I, "|")
													.split("|"),
													n = 0;
												n < o.length;
												n++
											)
												o[n] = e(o[n]);
											return o.join(",");
										}
										if (
											((b = (a.match(qa) || [f])[0]),
											(m =
												a
													.split(b)
													.join("")
													.match(u) || []),
											(n = m.length),
											k > n--)
										)
											for (; ++n < k; )
												m[n] = c
													? m[((n - 1) / 2) | 0]
													: g[n];
										return (
											h +
											m.join(j) +
											j +
											b +
											i +
											(-1 !== a.indexOf("inset")
												? " inset"
												: "")
										);
								  }
								: function(a) {
										var b, f, m;
										if ("number" == typeof a) a += l;
										else if (d && I.test(a)) {
											for (
												f = a
													.replace(I, "|")
													.split("|"),
													m = 0;
												m < f.length;
												m++
											)
												f[m] = e(f[m]);
											return f.join(",");
										}
										if (
											((b = a.match(u) || []),
											(m = b.length),
											k > m--)
										)
											for (; ++m < k; )
												b[m] = c
													? b[((m - 1) / 2) | 0]
													: g[m];
										return h + b.join(j) + i;
								  })
						: function(a) {
								return a;
						  };
				},
				sa = function(a) {
					return (
						(a = a.split(",")),
						function(b, c, d, e, f, g, h) {
							var i,
								j = (c + "").split(" ");
							for (h = {}, i = 0; 4 > i; i++)
								h[a[i]] = j[i] = j[i] || j[((i - 1) / 2) >> 0];
							return e.parse(b, h, f, g);
						}
					);
				},
				ta =
					((S._setPluginRatio = function(a) {
						this.plugin.setRatio(a);
						for (
							var b,
								c,
								d,
								e,
								f,
								g = this.data,
								h = g.proxy,
								i = g.firstMPT,
								j = 1e-6;
							i;

						)
							(b = h[i.v]),
								i.r ? (b = i.r(b)) : j > b && b > -j && (b = 0),
								(i.t[i.p] = b),
								(i = i._next);
						if (
							(g.autoRotate &&
								(g.autoRotate.rotation = g.mod
									? g.mod.call(
											this._tween,
											h.rotation,
											this.t,
											this._tween
									  )
									: h.rotation),
							1 === a || 0 === a)
						)
							for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i; ) {
								if (((c = i.t), c.type)) {
									if (1 === c.type) {
										for (
											e = c.xs0 + c.s + c.xs1, d = 1;
											d < c.l;
											d++
										)
											e +=
												c["xn" + d] + c["xs" + (d + 1)];
										c[f] = e;
									}
								} else c[f] = c.s + c.xs0;
								i = i._next;
							}
					}),
					function(a, b, c, d, e) {
						(this.t = a),
							(this.p = b),
							(this.v = c),
							(this.r = e),
							d && ((d._prev = this), (this._next = d));
					}),
				ua =
					((S._parseToProxy = function(a, b, c, d, e, f) {
						var g,
							h,
							i,
							j,
							k,
							l = d,
							m = {},
							n = {},
							o = c._transform,
							p = M;
						for (
							c._transform = null,
								M = b,
								d = k = c.parse(a, b, d, e),
								M = p,
								f &&
									((c._transform = o),
									l &&
										((l._prev = null),
										l._prev && (l._prev._next = null)));
							d && d !== l;

						) {
							if (
								d.type <= 1 &&
								((h = d.p),
								(n[h] = d.s + d.c),
								(m[h] = d.s),
								f ||
									((j = new ta(d, "s", h, j, d.r)),
									(d.c = 0)),
								1 === d.type)
							)
								for (g = d.l; --g > 0; )
									(i = "xn" + g),
										(h = d.p + "_" + i),
										(n[h] = d.data[i]),
										(m[h] = d[i]),
										f || (j = new ta(d, i, h, j, d.rxp[i]));
							d = d._next;
						}
						return { proxy: m, end: n, firstMPT: j, pt: k };
					}),
					(S.CSSPropTween = function(
						a,
						b,
						d,
						e,
						g,
						h,
						i,
						j,
						k,
						l,
						m
					) {
						(this.t = a),
							(this.p = b),
							(this.s = d),
							(this.c = e),
							(this.n = i || b),
							a instanceof ua || f.push(this.n),
							(this.r = j
								? "function" == typeof j
									? j
									: Math.round
								: j),
							(this.type = h || 0),
							k && ((this.pr = k), (c = !0)),
							(this.b = void 0 === l ? d : l),
							(this.e = void 0 === m ? d + e : m),
							g && ((this._next = g), (g._prev = this));
					})),
				va = function(a, b, c, d, e, f) {
					var g = new ua(a, b, c, d - c, e, -1, f);
					return (g.b = c), (g.e = g.xs0 = d), g;
				},
				wa = (g.parseComplex = function(a, b, c, d, e, f, h, i, j, l) {
					(c = c || f || ""),
						"function" == typeof d && (d = d(r, q)),
						(h = new ua(
							a,
							b,
							0,
							0,
							h,
							l ? 2 : 1,
							null,
							!1,
							i,
							c,
							d
						)),
						(d += ""),
						e &&
							qa.test(d + c) &&
							((d = [c, d]),
							g.colorStringFilter(d),
							(c = d[0]),
							(d = d[1]));
					var m,
						n,
						o,
						p,
						u,
						v,
						w,
						x,
						y,
						z,
						A,
						B,
						C,
						D = c
							.split(", ")
							.join(",")
							.split(" "),
						E = d
							.split(", ")
							.join(",")
							.split(" "),
						F = D.length,
						G = k !== !1;
					for (
						(-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) &&
							(-1 !== (d + c).indexOf("rgb") ||
							-1 !== (d + c).indexOf("hsl")
								? ((D = D.join(" ")
										.replace(I, ", ")
										.split(" ")),
								  (E = E.join(" ")
										.replace(I, ", ")
										.split(" ")))
								: ((D = D.join(" ")
										.split(",")
										.join(", ")
										.split(" ")),
								  (E = E.join(" ")
										.split(",")
										.join(", ")
										.split(" "))),
							(F = D.length)),
							F !== E.length &&
								((D = (f || "").split(" ")), (F = D.length)),
							h.plugin = j,
							h.setRatio = l,
							qa.lastIndex = 0,
							m = 0;
						F > m;
						m++
					)
						if (
							((p = D[m]),
							(u = E[m] + ""),
							(x = parseFloat(p)),
							x || 0 === x)
						)
							h.appendXtra(
								"",
								x,
								ja(u, x),
								u.replace(t, ""),
								G && -1 !== u.indexOf("px") ? Math.round : !1,
								!0
							);
						else if (e && qa.test(p))
							(B = u.indexOf(")") + 1),
								(B = ")" + (B ? u.substr(B) : "")),
								(C = -1 !== u.indexOf("hsl") && U),
								(z = u),
								(p = oa(p, C)),
								(u = oa(u, C)),
								(y = p.length + u.length > 6),
								y && !U && 0 === u[3]
									? ((h["xs" + h.l] += h.l
											? " transparent"
											: "transparent"),
									  (h.e = h.e
											.split(E[m])
											.join("transparent")))
									: (U || (y = !1),
									  C
											? h
													.appendXtra(
														z.substr(
															0,
															z.indexOf("hsl")
														) +
															(y
																? "hsla("
																: "hsl("),
														p[0],
														ja(u[0], p[0]),
														",",
														!1,
														!0
													)
													.appendXtra(
														"",
														p[1],
														ja(u[1], p[1]),
														"%,",
														!1
													)
													.appendXtra(
														"",
														p[2],
														ja(u[2], p[2]),
														y ? "%," : "%" + B,
														!1
													)
											: h
													.appendXtra(
														z.substr(
															0,
															z.indexOf("rgb")
														) +
															(y
																? "rgba("
																: "rgb("),
														p[0],
														u[0] - p[0],
														",",
														Math.round,
														!0
													)
													.appendXtra(
														"",
														p[1],
														u[1] - p[1],
														",",
														Math.round
													)
													.appendXtra(
														"",
														p[2],
														u[2] - p[2],
														y ? "," : B,
														Math.round
													),
									  y &&
											((p = p.length < 4 ? 1 : p[3]),
											h.appendXtra(
												"",
												p,
												(u.length < 4 ? 1 : u[3]) - p,
												B,
												!1
											))),
								(qa.lastIndex = 0);
						else if ((v = p.match(s))) {
							if (((w = u.match(t)), !w || w.length !== v.length))
								return h;
							for (o = 0, n = 0; n < v.length; n++)
								(A = v[n]),
									(z = p.indexOf(A, o)),
									h.appendXtra(
										p.substr(o, z - o),
										Number(A),
										ja(w[n], A),
										"",
										G && "px" === p.substr(z + A.length, 2)
											? Math.round
											: !1,
										0 === n
									),
									(o = z + A.length);
							h["xs" + h.l] += p.substr(o);
						} else
							h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
					if (-1 !== d.indexOf("=") && h.data) {
						for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++)
							B += h["xs" + m] + h.data["xn" + m];
						h.e = B + h["xs" + m];
					}
					return h.l || ((h.type = -1), (h.xs0 = h.e)), h.xfirst || h;
				}),
				xa = 9;
			for (j = ua.prototype, j.l = j.pr = 0; --xa > 0; )
				(j["xn" + xa] = 0), (j["xs" + xa] = "");
			(j.xs0 = ""),
				(j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null),
				(j.appendXtra = function(a, b, c, d, e, f) {
					var g = this,
						h = g.l;
					return (
						(g["xs" + h] +=
							f && (h || g["xs" + h]) ? " " + a : a || ""),
						c || 0 === h || g.plugin
							? (g.l++,
							  (g.type = g.setRatio ? 2 : 1),
							  (g["xs" + g.l] = d || ""),
							  h > 0
									? ((g.data["xn" + h] = b + c),
									  (g.rxp["xn" + h] = e),
									  (g["xn" + h] = b),
									  g.plugin ||
											((g.xfirst = new ua(
												g,
												"xn" + h,
												b,
												c,
												g.xfirst || g,
												0,
												g.n,
												e,
												g.pr
											)),
											(g.xfirst.xs0 = 0)),
									  g)
									: ((g.data = { s: b + c }),
									  (g.rxp = {}),
									  (g.s = b),
									  (g.c = c),
									  (g.r = e),
									  g))
							: ((g["xs" + h] += b + (d || "")), g)
					);
				});
			var ya = function(a, b) {
					(b = b || {}),
						(this.p = b.prefix ? Z(a) || a : a),
						(i[a] = i[this.p] = this),
						(this.format =
							b.formatter ||
							ra(
								b.defaultValue,
								b.color,
								b.collapsible,
								b.multi
							)),
						b.parser && (this.parse = b.parser),
						(this.clrs = b.color),
						(this.multi = b.multi),
						(this.keyword = b.keyword),
						(this.dflt = b.defaultValue),
						(this.allowFunc = b.allowFunc),
						(this.pr = b.priority || 0);
				},
				za = (S._registerComplexSpecialProp = function(a, b, c) {
					"object" != typeof b && (b = { parser: c });
					var d,
						e,
						f = a.split(","),
						g = b.defaultValue;
					for (c = c || [g], d = 0; d < f.length; d++)
						(b.prefix = 0 === d && b.prefix),
							(b.defaultValue = c[d] || g),
							(e = new ya(f[d], b));
				}),
				Aa = (S._registerPluginProp = function(a) {
					if (!i[a]) {
						var b =
							a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
						za(a, {
							parser: function(a, c, d, e, f, g, j) {
								var k = h.com.greensock.plugins[b];
								return k
									? (k._cssRegister(),
									  i[d].parse(a, c, d, e, f, g, j))
									: (W(
											"Error: " +
												b +
												" js file not loaded."
									  ),
									  f);
							},
						});
					}
				});
			(j = ya.prototype),
				(j.parseComplex = function(a, b, c, d, e, f) {
					var g,
						h,
						i,
						j,
						k,
						l,
						m = this.keyword;
					if (
						(this.multi &&
							(I.test(c) || I.test(b)
								? ((h = b.replace(I, "|").split("|")),
								  (i = c.replace(I, "|").split("|")))
								: m && ((h = [b]), (i = [c]))),
						i)
					) {
						for (
							j = i.length > h.length ? i.length : h.length,
								g = 0;
							j > g;
							g++
						)
							(b = h[g] = h[g] || this.dflt),
								(c = i[g] = i[g] || this.dflt),
								m &&
									((k = b.indexOf(m)),
									(l = c.indexOf(m)),
									k !== l &&
										(-1 === l
											? (h[g] = h[g].split(m).join(""))
											: -1 === k && (h[g] += " " + m)));
						(b = h.join(", ")), (c = i.join(", "));
					}
					return wa(
						a,
						this.p,
						b,
						c,
						this.clrs,
						this.dflt,
						d,
						this.pr,
						e,
						f
					);
				}),
				(j.parse = function(a, b, c, d, f, g, h) {
					return this.parseComplex(
						a.style,
						this.format(aa(a, this.p, e, !1, this.dflt)),
						this.format(b),
						f,
						g
					);
				}),
				(g.registerSpecialProp = function(a, b, c) {
					za(a, {
						parser: function(a, d, e, f, g, h, i) {
							var j = new ua(a, e, 0, 0, g, 2, e, !1, c);
							return (
								(j.plugin = h),
								(j.setRatio = b(a, d, f._tween, e)),
								j
							);
						},
						priority: c,
					});
				}),
				(g.useSVGTransformAttr = !0);
			var Ba,
				Ca = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(
					","
				),
				Da = Z("transform"),
				Ea = X + "transform",
				Fa = Z("transformOrigin"),
				Ga = null !== Z("perspective"),
				Ha = (S.Transform = function() {
					(this.perspective =
						parseFloat(g.defaultTransformPerspective) || 0),
						(this.force3D =
							g.defaultForce3D !== !1 && Ga
								? g.defaultForce3D || "auto"
								: !1);
				}),
				Ia = _gsScope.SVGElement,
				Ja = function(a, b, c) {
					var d,
						e = O.createElementNS("http://www.w3.org/2000/svg", a),
						f = /([a-z])([A-Z])/g;
					for (d in c)
						e.setAttributeNS(
							null,
							d.replace(f, "$1-$2").toLowerCase(),
							c[d]
						);
					return b.appendChild(e), e;
				},
				Ka = O.documentElement || {},
				La = (function() {
					var a,
						b,
						c,
						d = p || (/Android/i.test(T) && !_gsScope.chrome);
					return (
						O.createElementNS &&
							!d &&
							((a = Ja("svg", Ka)),
							(b = Ja("rect", a, {
								width: 100,
								height: 50,
								x: 100,
							})),
							(c = b.getBoundingClientRect().width),
							(b.style[Fa] = "50% 50%"),
							(b.style[Da] = "scaleX(0.5)"),
							(d =
								c === b.getBoundingClientRect().width &&
								!(n && Ga)),
							Ka.removeChild(a)),
						d
					);
				})(),
				Ma = function(a, b, c, d, e, f) {
					var h,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p,
						q,
						r,
						s,
						t,
						u,
						v = a._gsTransform,
						w = Ra(a, !0);
					v && ((t = v.xOrigin), (u = v.yOrigin)),
						(!d || (h = d.split(" ")).length < 2) &&
							((n = a.getBBox()),
							0 === n.x &&
								0 === n.y &&
								n.width + n.height === 0 &&
								(n = {
									x:
										parseFloat(
											a.hasAttribute("x")
												? a.getAttribute("x")
												: a.hasAttribute("cx")
												? a.getAttribute("cx")
												: 0
										) || 0,
									y:
										parseFloat(
											a.hasAttribute("y")
												? a.getAttribute("y")
												: a.hasAttribute("cy")
												? a.getAttribute("cy")
												: 0
										) || 0,
									width: 0,
									height: 0,
								}),
							(b = ia(b).split(" ")),
							(h = [
								(-1 !== b[0].indexOf("%")
									? (parseFloat(b[0]) / 100) * n.width
									: parseFloat(b[0])) + n.x,
								(-1 !== b[1].indexOf("%")
									? (parseFloat(b[1]) / 100) * n.height
									: parseFloat(b[1])) + n.y,
							])),
						(c.xOrigin = k = parseFloat(h[0])),
						(c.yOrigin = l = parseFloat(h[1])),
						d &&
							w !== Qa &&
							((m = w[0]),
							(n = w[1]),
							(o = w[2]),
							(p = w[3]),
							(q = w[4]),
							(r = w[5]),
							(s = m * p - n * o),
							s &&
								((i =
									k * (p / s) +
									l * (-o / s) +
									(o * r - p * q) / s),
								(j =
									k * (-n / s) +
									l * (m / s) -
									(m * r - n * q) / s),
								(k = c.xOrigin = h[0] = i),
								(l = c.yOrigin = h[1] = j))),
						v &&
							(f &&
								((c.xOffset = v.xOffset),
								(c.yOffset = v.yOffset),
								(v = c)),
							e || (e !== !1 && g.defaultSmoothOrigin !== !1)
								? ((i = k - t),
								  (j = l - u),
								  (v.xOffset += i * w[0] + j * w[2] - i),
								  (v.yOffset += i * w[1] + j * w[3] - j))
								: (v.xOffset = v.yOffset = 0)),
						f || a.setAttribute("data-svg-origin", h.join(" "));
				},
				Na = function(a) {
					var b,
						c = P(
							"svg",
							(this.ownerSVGElement &&
								this.ownerSVGElement.getAttribute("xmlns")) ||
								"http://www.w3.org/2000/svg"
						),
						d = this.parentNode,
						e = this.nextSibling,
						f = this.style.cssText;
					if (
						(Ka.appendChild(c),
						c.appendChild(this),
						(this.style.display = "block"),
						a)
					)
						try {
							(b = this.getBBox()),
								(this._originalGetBBox = this.getBBox),
								(this.getBBox = Na);
						} catch (g) {}
					else this._originalGetBBox && (b = this._originalGetBBox());
					return (
						e ? d.insertBefore(this, e) : d.appendChild(this),
						Ka.removeChild(c),
						(this.style.cssText = f),
						b
					);
				},
				Oa = function(a) {
					try {
						return a.getBBox();
					} catch (b) {
						return Na.call(a, !0);
					}
				},
				Pa = function(a) {
					return !(
						!Ia ||
						!a.getCTM ||
						(a.parentNode && !a.ownerSVGElement) ||
						!Oa(a)
					);
				},
				Qa = [1, 0, 0, 1, 0, 0],
				Ra = function(a, b) {
					var c,
						d,
						e,
						f,
						g,
						h,
						i,
						j = a._gsTransform || new Ha(),
						k = 1e5,
						l = a.style;
					if (
						(Da
							? (d = aa(a, Ea, null, !0))
							: a.currentStyle &&
							  ((d = a.currentStyle.filter.match(G)),
							  (d =
									d && 4 === d.length
										? [
												d[0].substr(4),
												Number(d[2].substr(4)),
												Number(d[1].substr(4)),
												d[3].substr(4),
												j.x || 0,
												j.y || 0,
										  ].join(",")
										: "")),
						(c =
							!d ||
							"none" === d ||
							"matrix(1, 0, 0, 1, 0, 0)" === d),
						Da &&
							c &&
							!a.offsetParent &&
							((f = l.display),
							(l.display = "block"),
							(i = a.parentNode),
							(i && a.offsetParent) ||
								((g = 1),
								(h = a.nextSibling),
								Ka.appendChild(a)),
							(d = aa(a, Ea, null, !0)),
							(c =
								!d ||
								"none" === d ||
								"matrix(1, 0, 0, 1, 0, 0)" === d),
							f ? (l.display = f) : Wa(l, "display"),
							g &&
								(h
									? i.insertBefore(a, h)
									: i
									? i.appendChild(a)
									: Ka.removeChild(a))),
						(j.svg || (a.getCTM && Pa(a))) &&
							(c &&
								-1 !== (l[Da] + "").indexOf("matrix") &&
								((d = l[Da]), (c = 0)),
							(e = a.getAttribute("transform")),
							c &&
								e &&
								((e = a.transform.baseVal.consolidate().matrix),
								(d =
									"matrix(" +
									e.a +
									"," +
									e.b +
									"," +
									e.c +
									"," +
									e.d +
									"," +
									e.e +
									"," +
									e.f +
									")"),
								(c = 0))),
						c)
					)
						return Qa;
					for (
						e = (d || "").match(s) || [], xa = e.length;
						--xa > -1;

					)
						(f = Number(e[xa])),
							(e[xa] = (g = f - (f |= 0))
								? ((g * k + (0 > g ? -0.5 : 0.5)) | 0) / k + f
								: f);
					return b && e.length > 6
						? [e[0], e[1], e[4], e[5], e[12], e[13]]
						: e;
				},
				Sa = (S.getTransform = function(a, c, d, e) {
					if (a._gsTransform && d && !e) return a._gsTransform;
					var f,
						h,
						i,
						j,
						k,
						l,
						m = d ? a._gsTransform || new Ha() : new Ha(),
						n = m.scaleX < 0,
						o = 2e-5,
						p = 1e5,
						q = Ga
							? parseFloat(
									aa(a, Fa, c, !1, "0 0 0").split(" ")[2]
							  ) ||
							  m.zOrigin ||
							  0
							: 0,
						r = parseFloat(g.defaultTransformPerspective) || 0;
					if (
						((m.svg = !(!a.getCTM || !Pa(a))),
						m.svg &&
							(Ma(
								a,
								aa(a, Fa, c, !1, "50% 50%") + "",
								m,
								a.getAttribute("data-svg-origin")
							),
							(Ba = g.useSVGTransformAttr || La)),
						(f = Ra(a)),
						f !== Qa)
					) {
						if (16 === f.length) {
							var s,
								t,
								u,
								v,
								w,
								x = f[0],
								y = f[1],
								z = f[2],
								A = f[3],
								B = f[4],
								C = f[5],
								D = f[6],
								E = f[7],
								F = f[8],
								G = f[9],
								H = f[10],
								I = f[12],
								J = f[13],
								K = f[14],
								M = f[11],
								N = Math.atan2(D, H);
							m.zOrigin &&
								((K = -m.zOrigin),
								(I = F * K - f[12]),
								(J = G * K - f[13]),
								(K = H * K + m.zOrigin - f[14])),
								(m.rotationX = N * L),
								N &&
									((v = Math.cos(-N)),
									(w = Math.sin(-N)),
									(s = B * v + F * w),
									(t = C * v + G * w),
									(u = D * v + H * w),
									(F = B * -w + F * v),
									(G = C * -w + G * v),
									(H = D * -w + H * v),
									(M = E * -w + M * v),
									(B = s),
									(C = t),
									(D = u)),
								(N = Math.atan2(-z, H)),
								(m.rotationY = N * L),
								N &&
									((v = Math.cos(-N)),
									(w = Math.sin(-N)),
									(s = x * v - F * w),
									(t = y * v - G * w),
									(u = z * v - H * w),
									(G = y * w + G * v),
									(H = z * w + H * v),
									(M = A * w + M * v),
									(x = s),
									(y = t),
									(z = u)),
								(N = Math.atan2(y, x)),
								(m.rotation = N * L),
								N &&
									((v = Math.cos(N)),
									(w = Math.sin(N)),
									(s = x * v + y * w),
									(t = B * v + C * w),
									(u = F * v + G * w),
									(y = y * v - x * w),
									(C = C * v - B * w),
									(G = G * v - F * w),
									(x = s),
									(B = t),
									(F = u)),
								m.rotationX &&
									Math.abs(m.rotationX) +
										Math.abs(m.rotation) >
										359.9 &&
									((m.rotationX = m.rotation = 0),
									(m.rotationY = 180 - m.rotationY)),
								(N = Math.atan2(B, C)),
								(m.scaleX =
									((Math.sqrt(x * x + y * y + z * z) * p +
										0.5) |
										0) /
									p),
								(m.scaleY =
									((Math.sqrt(C * C + D * D) * p + 0.5) | 0) /
									p),
								(m.scaleZ =
									((Math.sqrt(F * F + G * G + H * H) * p +
										0.5) |
										0) /
									p),
								(x /= m.scaleX),
								(B /= m.scaleY),
								(y /= m.scaleX),
								(C /= m.scaleY),
								Math.abs(N) > o
									? ((m.skewX = N * L),
									  (B = 0),
									  "simple" !== m.skewType &&
											(m.scaleY *= 1 / Math.cos(N)))
									: (m.skewX = 0),
								(m.perspective = M ? 1 / (0 > M ? -M : M) : 0),
								(m.x = I),
								(m.y = J),
								(m.z = K),
								m.svg &&
									((m.x -=
										m.xOrigin -
										(m.xOrigin * x - m.yOrigin * B)),
									(m.y -=
										m.yOrigin -
										(m.yOrigin * y - m.xOrigin * C)));
						} else if (
							!Ga ||
							e ||
							!f.length ||
							m.x !== f[4] ||
							m.y !== f[5] ||
							(!m.rotationX && !m.rotationY)
						) {
							var O = f.length >= 6,
								P = O ? f[0] : 1,
								Q = f[1] || 0,
								R = f[2] || 0,
								S = O ? f[3] : 1;
							(m.x = f[4] || 0),
								(m.y = f[5] || 0),
								(i = Math.sqrt(P * P + Q * Q)),
								(j = Math.sqrt(S * S + R * R)),
								(k =
									P || Q
										? Math.atan2(Q, P) * L
										: m.rotation || 0),
								(l =
									R || S
										? Math.atan2(R, S) * L + k
										: m.skewX || 0),
								(m.scaleX = i),
								(m.scaleY = j),
								(m.rotation = k),
								(m.skewX = l),
								Ga &&
									((m.rotationX = m.rotationY = m.z = 0),
									(m.perspective = r),
									(m.scaleZ = 1)),
								m.svg &&
									((m.x -=
										m.xOrigin -
										(m.xOrigin * P + m.yOrigin * R)),
									(m.y -=
										m.yOrigin -
										(m.xOrigin * Q + m.yOrigin * S)));
						}
						Math.abs(m.skewX) > 90 &&
							Math.abs(m.skewX) < 270 &&
							(n
								? ((m.scaleX *= -1),
								  (m.skewX += m.rotation <= 0 ? 180 : -180),
								  (m.rotation += m.rotation <= 0 ? 180 : -180))
								: ((m.scaleY *= -1),
								  (m.skewX += m.skewX <= 0 ? 180 : -180))),
							(m.zOrigin = q);
						for (h in m) m[h] < o && m[h] > -o && (m[h] = 0);
					}
					return (
						d &&
							((a._gsTransform = m),
							m.svg &&
								(Ba && a.style[Da]
									? b.delayedCall(0.001, function() {
											Wa(a.style, Da);
									  })
									: !Ba &&
									  a.getAttribute("transform") &&
									  b.delayedCall(0.001, function() {
											a.removeAttribute("transform");
									  }))),
						m
					);
				}),
				Ta = function(a) {
					var b,
						c,
						d = this.data,
						e = -d.rotation * K,
						f = e + d.skewX * K,
						g = 1e5,
						h = ((Math.cos(e) * d.scaleX * g) | 0) / g,
						i = ((Math.sin(e) * d.scaleX * g) | 0) / g,
						j = ((Math.sin(f) * -d.scaleY * g) | 0) / g,
						k = ((Math.cos(f) * d.scaleY * g) | 0) / g,
						l = this.t.style,
						m = this.t.currentStyle;
					if (m) {
						(c = i),
							(i = -j),
							(j = -c),
							(b = m.filter),
							(l.filter = "");
						var n,
							o,
							q = this.t.offsetWidth,
							r = this.t.offsetHeight,
							s = "absolute" !== m.position,
							t =
								"progid:DXImageTransform.Microsoft.Matrix(M11=" +
								h +
								", M12=" +
								i +
								", M21=" +
								j +
								", M22=" +
								k,
							u = d.x + (q * d.xPercent) / 100,
							v = d.y + (r * d.yPercent) / 100;
						if (
							(null != d.ox &&
								((n = (d.oxp ? q * d.ox * 0.01 : d.ox) - q / 2),
								(o = (d.oyp ? r * d.oy * 0.01 : d.oy) - r / 2),
								(u += n - (n * h + o * i)),
								(v += o - (n * j + o * k))),
							s
								? ((n = q / 2),
								  (o = r / 2),
								  (t +=
										", Dx=" +
										(n - (n * h + o * i) + u) +
										", Dy=" +
										(o - (n * j + o * k) + v) +
										")"))
								: (t += ", sizingMethod='auto expand')"),
							-1 !==
							b.indexOf("DXImageTransform.Microsoft.Matrix(")
								? (l.filter = b.replace(H, t))
								: (l.filter = t + " " + b),
							(0 === a || 1 === a) &&
								1 === h &&
								0 === i &&
								0 === j &&
								1 === k &&
								((s && -1 === t.indexOf("Dx=0, Dy=0")) ||
									(x.test(b) &&
										100 !== parseFloat(RegExp.$1)) ||
									(-1 === b.indexOf(b.indexOf("Alpha")) &&
										l.removeAttribute("filter"))),
							!s)
						) {
							var y,
								z,
								A,
								B = 8 > p ? 1 : -1;
							for (
								n = d.ieOffsetX || 0,
									o = d.ieOffsetY || 0,
									d.ieOffsetX = Math.round(
										(q -
											((0 > h ? -h : h) * q +
												(0 > i ? -i : i) * r)) /
											2 +
											u
									),
									d.ieOffsetY = Math.round(
										(r -
											((0 > k ? -k : k) * r +
												(0 > j ? -j : j) * q)) /
											2 +
											v
									),
									xa = 0;
								4 > xa;
								xa++
							)
								(z = ga[xa]),
									(y = m[z]),
									(c =
										-1 !== y.indexOf("px")
											? parseFloat(y)
											: ba(
													this.t,
													z,
													parseFloat(y),
													y.replace(w, "")
											  ) || 0),
									(A =
										c !== d[z]
											? 2 > xa
												? -d.ieOffsetX
												: -d.ieOffsetY
											: 2 > xa
											? n - d.ieOffsetX
											: o - d.ieOffsetY),
									(l[z] =
										(d[z] = Math.round(
											c -
												A *
													(0 === xa || 2 === xa
														? 1
														: B)
										)) + "px");
						}
					}
				},
				Ua = (S.set3DTransformRatio = S.setTransformRatio = function(
					a
				) {
					var b,
						c,
						d,
						e,
						f,
						g,
						h,
						i,
						j,
						k,
						l,
						m,
						o,
						p,
						q,
						r,
						s,
						t,
						u,
						v,
						w,
						x,
						y,
						z = this.data,
						A = this.t.style,
						B = z.rotation,
						C = z.rotationX,
						D = z.rotationY,
						E = z.scaleX,
						F = z.scaleY,
						G = z.scaleZ,
						H = z.x,
						I = z.y,
						J = z.z,
						L = z.svg,
						M = z.perspective,
						N = z.force3D,
						O = z.skewY,
						P = z.skewX;
					if (
						(O && ((P += O), (B += O)),
						((((1 === a || 0 === a) &&
							"auto" === N &&
							(this.tween._totalTime ===
								this.tween._totalDuration ||
								!this.tween._totalTime)) ||
							!N) &&
							!J &&
							!M &&
							!D &&
							!C &&
							1 === G) ||
							(Ba && L) ||
							!Ga)
					)
						return void (B || P || L
							? ((B *= K),
							  (x = P * K),
							  (y = 1e5),
							  (c = Math.cos(B) * E),
							  (f = Math.sin(B) * E),
							  (d = Math.sin(B - x) * -F),
							  (g = Math.cos(B - x) * F),
							  x &&
									"simple" === z.skewType &&
									((b = Math.tan(x - O * K)),
									(b = Math.sqrt(1 + b * b)),
									(d *= b),
									(g *= b),
									O &&
										((b = Math.tan(O * K)),
										(b = Math.sqrt(1 + b * b)),
										(c *= b),
										(f *= b))),
							  L &&
									((H +=
										z.xOrigin -
										(z.xOrigin * c + z.yOrigin * d) +
										z.xOffset),
									(I +=
										z.yOrigin -
										(z.xOrigin * f + z.yOrigin * g) +
										z.yOffset),
									Ba &&
										(z.xPercent || z.yPercent) &&
										((q = this.t.getBBox()),
										(H += 0.01 * z.xPercent * q.width),
										(I += 0.01 * z.yPercent * q.height)),
									(q = 1e-6),
									q > H && H > -q && (H = 0),
									q > I && I > -q && (I = 0)),
							  (u =
									((c * y) | 0) / y +
									"," +
									((f * y) | 0) / y +
									"," +
									((d * y) | 0) / y +
									"," +
									((g * y) | 0) / y +
									"," +
									H +
									"," +
									I +
									")"),
							  L && Ba
									? this.t.setAttribute(
											"transform",
											"matrix(" + u
									  )
									: (A[Da] =
											(z.xPercent || z.yPercent
												? "translate(" +
												  z.xPercent +
												  "%," +
												  z.yPercent +
												  "%) matrix("
												: "matrix(") + u))
							: (A[Da] =
									(z.xPercent || z.yPercent
										? "translate(" +
										  z.xPercent +
										  "%," +
										  z.yPercent +
										  "%) matrix("
										: "matrix(") +
									E +
									",0,0," +
									F +
									"," +
									H +
									"," +
									I +
									")"));
					if (
						(n &&
							((q = 1e-4),
							q > E && E > -q && (E = G = 2e-5),
							q > F && F > -q && (F = G = 2e-5),
							!M || z.z || z.rotationX || z.rotationY || (M = 0)),
						B || P)
					)
						(B *= K),
							(r = c = Math.cos(B)),
							(s = f = Math.sin(B)),
							P &&
								((B -= P * K),
								(r = Math.cos(B)),
								(s = Math.sin(B)),
								"simple" === z.skewType &&
									((b = Math.tan((P - O) * K)),
									(b = Math.sqrt(1 + b * b)),
									(r *= b),
									(s *= b),
									z.skewY &&
										((b = Math.tan(O * K)),
										(b = Math.sqrt(1 + b * b)),
										(c *= b),
										(f *= b)))),
							(d = -s),
							(g = r);
					else {
						if (!(D || C || 1 !== G || M || L))
							return void (A[Da] =
								(z.xPercent || z.yPercent
									? "translate(" +
									  z.xPercent +
									  "%," +
									  z.yPercent +
									  "%) translate3d("
									: "translate3d(") +
								H +
								"px," +
								I +
								"px," +
								J +
								"px)" +
								(1 !== E || 1 !== F
									? " scale(" + E + "," + F + ")"
									: ""));
						(c = g = 1), (d = f = 0);
					}
					(k = 1),
						(e = h = i = j = l = m = 0),
						(o = M ? -1 / M : 0),
						(p = z.zOrigin),
						(q = 1e-6),
						(v = ","),
						(w = "0"),
						(B = D * K),
						B &&
							((r = Math.cos(B)),
							(s = Math.sin(B)),
							(i = -s),
							(l = o * -s),
							(e = c * s),
							(h = f * s),
							(k = r),
							(o *= r),
							(c *= r),
							(f *= r)),
						(B = C * K),
						B &&
							((r = Math.cos(B)),
							(s = Math.sin(B)),
							(b = d * r + e * s),
							(t = g * r + h * s),
							(j = k * s),
							(m = o * s),
							(e = d * -s + e * r),
							(h = g * -s + h * r),
							(k *= r),
							(o *= r),
							(d = b),
							(g = t)),
						1 !== G && ((e *= G), (h *= G), (k *= G), (o *= G)),
						1 !== F && ((d *= F), (g *= F), (j *= F), (m *= F)),
						1 !== E && ((c *= E), (f *= E), (i *= E), (l *= E)),
						(p || L) &&
							(p &&
								((H += e * -p),
								(I += h * -p),
								(J += k * -p + p)),
							L &&
								((H +=
									z.xOrigin -
									(z.xOrigin * c + z.yOrigin * d) +
									z.xOffset),
								(I +=
									z.yOrigin -
									(z.xOrigin * f + z.yOrigin * g) +
									z.yOffset)),
							q > H && H > -q && (H = w),
							q > I && I > -q && (I = w),
							q > J && J > -q && (J = 0)),
						(u =
							z.xPercent || z.yPercent
								? "translate(" +
								  z.xPercent +
								  "%," +
								  z.yPercent +
								  "%) matrix3d("
								: "matrix3d("),
						(u +=
							(q > c && c > -q ? w : c) +
							v +
							(q > f && f > -q ? w : f) +
							v +
							(q > i && i > -q ? w : i)),
						(u +=
							v +
							(q > l && l > -q ? w : l) +
							v +
							(q > d && d > -q ? w : d) +
							v +
							(q > g && g > -q ? w : g)),
						C || D || 1 !== G
							? ((u +=
									v +
									(q > j && j > -q ? w : j) +
									v +
									(q > m && m > -q ? w : m) +
									v +
									(q > e && e > -q ? w : e)),
							  (u +=
									v +
									(q > h && h > -q ? w : h) +
									v +
									(q > k && k > -q ? w : k) +
									v +
									(q > o && o > -q ? w : o) +
									v))
							: (u += ",0,0,0,0,1,0,"),
						(u +=
							H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")"),
						(A[Da] = u);
				});
			(j = Ha.prototype),
				(j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0),
				(j.scaleX = j.scaleY = j.scaleZ = 1),
				za(
					"transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",
					{
						parser: function(a, b, c, d, f, h, i) {
							if (d._lastParsedTransform === i) return f;
							d._lastParsedTransform = i;
							var j =
								i.scale && "function" == typeof i.scale
									? i.scale
									: 0;
							j && (i.scale = j(r, a));
							var k,
								l,
								m,
								n,
								o,
								p,
								s,
								t,
								u,
								v = a._gsTransform,
								w = a.style,
								x = 1e-6,
								y = Ca.length,
								z = i,
								A = {},
								B = "transformOrigin",
								C = Sa(a, e, !0, z.parseTransform),
								D =
									z.transform &&
									("function" == typeof z.transform
										? z.transform(r, q)
										: z.transform);
							if (
								((C.skewType =
									z.skewType ||
									C.skewType ||
									g.defaultSkewType),
								(d._transform = C),
								"rotationZ" in z && (z.rotation = z.rotationZ),
								D && "string" == typeof D && Da)
							)
								(l = Q.style),
									(l[Da] = D),
									(l.display = "block"),
									(l.position = "absolute"),
									-1 !== D.indexOf("%") &&
										((l.width = aa(a, "width")),
										(l.height = aa(a, "height"))),
									O.body.appendChild(Q),
									(k = Sa(Q, null, !1)),
									"simple" === C.skewType &&
										(k.scaleY *= Math.cos(k.skewX * K)),
									C.svg &&
										((p = C.xOrigin),
										(s = C.yOrigin),
										(k.x -= C.xOffset),
										(k.y -= C.yOffset),
										(z.transformOrigin || z.svgOrigin) &&
											((D = {}),
											Ma(
												a,
												ia(z.transformOrigin),
												D,
												z.svgOrigin,
												z.smoothOrigin,
												!0
											),
											(p = D.xOrigin),
											(s = D.yOrigin),
											(k.x -= D.xOffset - C.xOffset),
											(k.y -= D.yOffset - C.yOffset)),
										(p || s) &&
											((t = Ra(Q, !0)),
											(k.x -= p - (p * t[0] + s * t[2])),
											(k.y -=
												s - (p * t[1] + s * t[3])))),
									O.body.removeChild(Q),
									k.perspective ||
										(k.perspective = C.perspective),
									null != z.xPercent &&
										(k.xPercent = ka(
											z.xPercent,
											C.xPercent
										)),
									null != z.yPercent &&
										(k.yPercent = ka(
											z.yPercent,
											C.yPercent
										));
							else if ("object" == typeof z) {
								if (
									((k = {
										scaleX: ka(
											null != z.scaleX
												? z.scaleX
												: z.scale,
											C.scaleX
										),
										scaleY: ka(
											null != z.scaleY
												? z.scaleY
												: z.scale,
											C.scaleY
										),
										scaleZ: ka(z.scaleZ, C.scaleZ),
										x: ka(z.x, C.x),
										y: ka(z.y, C.y),
										z: ka(z.z, C.z),
										xPercent: ka(z.xPercent, C.xPercent),
										yPercent: ka(z.yPercent, C.yPercent),
										perspective: ka(
											z.transformPerspective,
											C.perspective
										),
									}),
									(o = z.directionalRotation),
									null != o)
								)
									if ("object" == typeof o)
										for (l in o) z[l] = o[l];
									else z.rotation = o;
								"string" == typeof z.x &&
									-1 !== z.x.indexOf("%") &&
									((k.x = 0),
									(k.xPercent = ka(z.x, C.xPercent))),
									"string" == typeof z.y &&
										-1 !== z.y.indexOf("%") &&
										((k.y = 0),
										(k.yPercent = ka(z.y, C.yPercent))),
									(k.rotation = la(
										"rotation" in z
											? z.rotation
											: "shortRotation" in z
											? z.shortRotation + "_short"
											: C.rotation,
										C.rotation,
										"rotation",
										A
									)),
									Ga &&
										((k.rotationX = la(
											"rotationX" in z
												? z.rotationX
												: "shortRotationX" in z
												? z.shortRotationX + "_short"
												: C.rotationX || 0,
											C.rotationX,
											"rotationX",
											A
										)),
										(k.rotationY = la(
											"rotationY" in z
												? z.rotationY
												: "shortRotationY" in z
												? z.shortRotationY + "_short"
												: C.rotationY || 0,
											C.rotationY,
											"rotationY",
											A
										))),
									(k.skewX = la(z.skewX, C.skewX)),
									(k.skewY = la(z.skewY, C.skewY));
							}
							for (
								Ga &&
									null != z.force3D &&
									((C.force3D = z.force3D), (n = !0)),
									m =
										C.force3D ||
										C.z ||
										C.rotationX ||
										C.rotationY ||
										k.z ||
										k.rotationX ||
										k.rotationY ||
										k.perspective,
									m || null == z.scale || (k.scaleZ = 1);
								--y > -1;

							)
								(u = Ca[y]),
									(D = k[u] - C[u]),
									(D > x ||
										-x > D ||
										null != z[u] ||
										null != M[u]) &&
										((n = !0),
										(f = new ua(C, u, C[u], D, f)),
										u in A && (f.e = A[u]),
										(f.xs0 = 0),
										(f.plugin = h),
										d._overwriteProps.push(f.n));
							return (
								(D =
									"function" == typeof z.transformOrigin
										? z.transformOrigin(r, q)
										: z.transformOrigin),
								C.svg &&
									(D || z.svgOrigin) &&
									((p = C.xOffset),
									(s = C.yOffset),
									Ma(
										a,
										ia(D),
										k,
										z.svgOrigin,
										z.smoothOrigin
									),
									(f = va(
										C,
										"xOrigin",
										(v ? C : k).xOrigin,
										k.xOrigin,
										f,
										B
									)),
									(f = va(
										C,
										"yOrigin",
										(v ? C : k).yOrigin,
										k.yOrigin,
										f,
										B
									)),
									(p !== C.xOffset || s !== C.yOffset) &&
										((f = va(
											C,
											"xOffset",
											v ? p : C.xOffset,
											C.xOffset,
											f,
											B
										)),
										(f = va(
											C,
											"yOffset",
											v ? s : C.yOffset,
											C.yOffset,
											f,
											B
										))),
									(D = "0px 0px")),
								(D || (Ga && m && C.zOrigin)) &&
									(Da
										? ((n = !0),
										  (u = Fa),
										  D ||
												((D = (
													aa(a, u, e, !1, "50% 50%") +
													""
												).split(" ")),
												(D =
													D[0] +
													" " +
													D[1] +
													" " +
													C.zOrigin +
													"px")),
										  (D += ""),
										  (f = new ua(w, u, 0, 0, f, -1, B)),
										  (f.b = w[u]),
										  (f.plugin = h),
										  Ga
												? ((l = C.zOrigin),
												  (D = D.split(" ")),
												  (C.zOrigin =
														(D.length > 2
															? parseFloat(D[2])
															: l) || 0),
												  (f.xs0 = f.e =
														D[0] +
														" " +
														(D[1] || "50%") +
														" 0px"),
												  (f = new ua(
														C,
														"zOrigin",
														0,
														0,
														f,
														-1,
														f.n
												  )),
												  (f.b = l),
												  (f.xs0 = f.e = C.zOrigin))
												: (f.xs0 = f.e = D))
										: ia(D + "", C)),
								n &&
									(d._transformType =
										(C.svg && Ba) ||
										(!m && 3 !== this._transformType)
											? 2
											: 3),
								j && (i.scale = j),
								f
							);
						},
						allowFunc: !0,
						prefix: !0,
					}
				),
				za("boxShadow", {
					defaultValue: "0px 0px 0px 0px #999",
					prefix: !0,
					color: !0,
					multi: !0,
					keyword: "inset",
				}),
				za("clipPath", {
					defaultValue: "inset(0px)",
					prefix: !0,
					multi: !0,
					formatter: ra("inset(0px 0px 0px 0px)", !1, !0),
				}),
				za("borderRadius", {
					defaultValue: "0px",
					parser: function(a, b, c, f, g, h) {
						b = this.format(b);
						var i,
							j,
							k,
							l,
							m,
							n,
							o,
							p,
							q,
							r,
							s,
							t,
							u,
							v,
							w,
							x,
							y = [
								"borderTopLeftRadius",
								"borderTopRightRadius",
								"borderBottomRightRadius",
								"borderBottomLeftRadius",
							],
							z = a.style;
						for (
							q = parseFloat(a.offsetWidth),
								r = parseFloat(a.offsetHeight),
								i = b.split(" "),
								j = 0;
							j < y.length;
							j++
						)
							this.p.indexOf("border") && (y[j] = Z(y[j])),
								(m = l = aa(a, y[j], e, !1, "0px")),
								-1 !== m.indexOf(" ") &&
									((l = m.split(" ")),
									(m = l[0]),
									(l = l[1])),
								(n = k = i[j]),
								(o = parseFloat(m)),
								(t = m.substr((o + "").length)),
								(u = "=" === n.charAt(1)),
								u
									? ((p = parseInt(n.charAt(0) + "1", 10)),
									  (n = n.substr(2)),
									  (p *= parseFloat(n)),
									  (s =
											n.substr(
												(p + "").length -
													(0 > p ? 1 : 0)
											) || ""))
									: ((p = parseFloat(n)),
									  (s = n.substr((p + "").length))),
								"" === s && (s = d[c] || t),
								s !== t &&
									((v = ba(a, "borderLeft", o, t)),
									(w = ba(a, "borderTop", o, t)),
									"%" === s
										? ((m = (v / q) * 100 + "%"),
										  (l = (w / r) * 100 + "%"))
										: "em" === s
										? ((x = ba(a, "borderLeft", 1, "em")),
										  (m = v / x + "em"),
										  (l = w / x + "em"))
										: ((m = v + "px"), (l = w + "px")),
									u &&
										((n = parseFloat(m) + p + s),
										(k = parseFloat(l) + p + s))),
								(g = wa(
									z,
									y[j],
									m + " " + l,
									n + " " + k,
									!1,
									"0px",
									g
								));
						return g;
					},
					prefix: !0,
					formatter: ra("0px 0px 0px 0px", !1, !0),
				}),
				za(
					"borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius",
					{
						defaultValue: "0px",
						parser: function(a, b, c, d, f, g) {
							return wa(
								a.style,
								c,
								this.format(aa(a, c, e, !1, "0px 0px")),
								this.format(b),
								!1,
								"0px",
								f
							);
						},
						prefix: !0,
						formatter: ra("0px 0px", !1, !0),
					}
				),
				za("backgroundPosition", {
					defaultValue: "0 0",
					parser: function(a, b, c, d, f, g) {
						var h,
							i,
							j,
							k,
							l,
							m,
							n = "background-position",
							o = e || _(a, null),
							q = this.format(
								(o
									? p
										? o.getPropertyValue(n + "-x") +
										  " " +
										  o.getPropertyValue(n + "-y")
										: o.getPropertyValue(n)
									: a.currentStyle.backgroundPositionX +
									  " " +
									  a.currentStyle.backgroundPositionY) ||
									"0 0"
							),
							r = this.format(b);
						if (
							(-1 !== q.indexOf("%")) !=
								(-1 !== r.indexOf("%")) &&
							r.split(",").length < 2 &&
							((m = aa(a, "backgroundImage").replace(D, "")),
							m && "none" !== m)
						) {
							for (
								h = q.split(" "),
									i = r.split(" "),
									R.setAttribute("src", m),
									j = 2;
								--j > -1;

							)
								(q = h[j]),
									(k = -1 !== q.indexOf("%")),
									k !== (-1 !== i[j].indexOf("%")) &&
										((l =
											0 === j
												? a.offsetWidth - R.width
												: a.offsetHeight - R.height),
										(h[j] = k
											? (parseFloat(q) / 100) * l + "px"
											: (parseFloat(q) / l) * 100 + "%"));
							q = h.join(" ");
						}
						return this.parseComplex(a.style, q, r, f, g);
					},
					formatter: ia,
				}),
				za("backgroundSize", {
					defaultValue: "0 0",
					formatter: function(a) {
						return (
							(a += ""),
							"co" === a.substr(0, 2)
								? a
								: ia(-1 === a.indexOf(" ") ? a + " " + a : a)
						);
					},
				}),
				za("perspective", { defaultValue: "0px", prefix: !0 }),
				za("perspectiveOrigin", {
					defaultValue: "50% 50%",
					prefix: !0,
				}),
				za("transformStyle", { prefix: !0 }),
				za("backfaceVisibility", { prefix: !0 }),
				za("userSelect", { prefix: !0 }),
				za("margin", {
					parser: sa("marginTop,marginRight,marginBottom,marginLeft"),
				}),
				za("padding", {
					parser: sa(
						"paddingTop,paddingRight,paddingBottom,paddingLeft"
					),
				}),
				za("clip", {
					defaultValue: "rect(0px,0px,0px,0px)",
					parser: function(a, b, c, d, f, g) {
						var h, i, j;
						return (
							9 > p
								? ((i = a.currentStyle),
								  (j = 8 > p ? " " : ","),
								  (h =
										"rect(" +
										i.clipTop +
										j +
										i.clipRight +
										j +
										i.clipBottom +
										j +
										i.clipLeft +
										")"),
								  (b = this.format(b)
										.split(",")
										.join(j)))
								: ((h = this.format(
										aa(a, this.p, e, !1, this.dflt)
								  )),
								  (b = this.format(b))),
							this.parseComplex(a.style, h, b, f, g)
						);
					},
				}),
				za("textShadow", {
					defaultValue: "0px 0px 0px #999",
					color: !0,
					multi: !0,
				}),
				za("autoRound,strictUnits", {
					parser: function(a, b, c, d, e) {
						return e;
					},
				}),
				za("border", {
					defaultValue: "0px solid #000",
					parser: function(a, b, c, d, f, g) {
						var h = aa(a, "borderTopWidth", e, !1, "0px"),
							i = this.format(b).split(" "),
							j = i[0].replace(w, "");
						return (
							"px" !== j &&
								(h =
									parseFloat(h) /
										ba(a, "borderTopWidth", 1, j) +
									j),
							this.parseComplex(
								a.style,
								this.format(
									h +
										" " +
										aa(
											a,
											"borderTopStyle",
											e,
											!1,
											"solid"
										) +
										" " +
										aa(a, "borderTopColor", e, !1, "#000")
								),
								i.join(" "),
								f,
								g
							)
						);
					},
					color: !0,
					formatter: function(a) {
						var b = a.split(" ");
						return (
							b[0] +
							" " +
							(b[1] || "solid") +
							" " +
							(a.match(qa) || ["#000"])[0]
						);
					},
				}),
				za("borderWidth", {
					parser: sa(
						"borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth"
					),
				}),
				za("float,cssFloat,styleFloat", {
					parser: function(a, b, c, d, e, f) {
						var g = a.style,
							h = "cssFloat" in g ? "cssFloat" : "styleFloat";
						return new ua(g, h, 0, 0, e, -1, c, !1, 0, g[h], b);
					},
				});
			var Va = function(a) {
				var b,
					c = this.t,
					d = c.filter || aa(this.data, "filter") || "",
					e = (this.s + this.c * a) | 0;
				100 === e &&
					(-1 === d.indexOf("atrix(") &&
					-1 === d.indexOf("radient(") &&
					-1 === d.indexOf("oader(")
						? (c.removeAttribute("filter"),
						  (b = !aa(this.data, "filter")))
						: ((c.filter = d.replace(z, "")), (b = !0))),
					b ||
						(this.xn1 &&
							(c.filter = d = d || "alpha(opacity=" + e + ")"),
						-1 === d.indexOf("pacity")
							? (0 === e && this.xn1) ||
							  (c.filter = d + " alpha(opacity=" + e + ")")
							: (c.filter = d.replace(x, "opacity=" + e)));
			};
			za("opacity,alpha,autoAlpha", {
				defaultValue: "1",
				parser: function(a, b, c, d, f, g) {
					var h = parseFloat(aa(a, "opacity", e, !1, "1")),
						i = a.style,
						j = "autoAlpha" === c;
					return (
						"string" == typeof b &&
							"=" === b.charAt(1) &&
							(b =
								("-" === b.charAt(0) ? -1 : 1) *
									parseFloat(b.substr(2)) +
								h),
						j &&
							1 === h &&
							"hidden" === aa(a, "visibility", e) &&
							0 !== b &&
							(h = 0),
						U
							? (f = new ua(i, "opacity", h, b - h, f))
							: ((f = new ua(
									i,
									"opacity",
									100 * h,
									100 * (b - h),
									f
							  )),
							  (f.xn1 = j ? 1 : 0),
							  (i.zoom = 1),
							  (f.type = 2),
							  (f.b = "alpha(opacity=" + f.s + ")"),
							  (f.e = "alpha(opacity=" + (f.s + f.c) + ")"),
							  (f.data = a),
							  (f.plugin = g),
							  (f.setRatio = Va)),
						j &&
							((f = new ua(
								i,
								"visibility",
								0,
								0,
								f,
								-1,
								null,
								!1,
								0,
								0 !== h ? "inherit" : "hidden",
								0 === b ? "hidden" : "inherit"
							)),
							(f.xs0 = "inherit"),
							d._overwriteProps.push(f.n),
							d._overwriteProps.push(c)),
						f
					);
				},
			});
			var Wa = function(a, b) {
					b &&
						(a.removeProperty
							? (("ms" === b.substr(0, 2) ||
									"webkit" === b.substr(0, 6)) &&
									(b = "-" + b),
							  a.removeProperty(
									b.replace(B, "-$1").toLowerCase()
							  ))
							: a.removeAttribute(b));
				},
				Xa = function(a) {
					if (((this.t._gsClassPT = this), 1 === a || 0 === a)) {
						this.t.setAttribute("class", 0 === a ? this.b : this.e);
						for (var b = this.data, c = this.t.style; b; )
							b.v ? (c[b.p] = b.v) : Wa(c, b.p), (b = b._next);
						1 === a &&
							this.t._gsClassPT === this &&
							(this.t._gsClassPT = null);
					} else
						this.t.getAttribute("class") !== this.e &&
							this.t.setAttribute("class", this.e);
				};
			za("className", {
				parser: function(a, b, d, f, g, h, i) {
					var j,
						k,
						l,
						m,
						n,
						o = a.getAttribute("class") || "",
						p = a.style.cssText;
					if (
						((g = f._classNamePT = new ua(a, d, 0, 0, g, 2)),
						(g.setRatio = Xa),
						(g.pr = -11),
						(c = !0),
						(g.b = o),
						(k = da(a, e)),
						(l = a._gsClassPT))
					) {
						for (m = {}, n = l.data; n; )
							(m[n.p] = 1), (n = n._next);
						l.setRatio(1);
					}
					return (
						(a._gsClassPT = g),
						(g.e =
							"=" !== b.charAt(1)
								? b
								: o.replace(
										new RegExp(
											"(?:\\s|^)" +
												b.substr(2) +
												"(?![\\w-])"
										),
										""
								  ) +
								  ("+" === b.charAt(0)
										? " " + b.substr(2)
										: "")),
						a.setAttribute("class", g.e),
						(j = ea(a, k, da(a), i, m)),
						a.setAttribute("class", o),
						(g.data = j.firstMPT),
						(a.style.cssText = p),
						(g = g.xfirst = f.parse(a, j.difs, g, h))
					);
				},
			});
			var Ya = function(a) {
				if (
					(1 === a || 0 === a) &&
					this.data._totalTime === this.data._totalDuration &&
					"isFromStart" !== this.data.data
				) {
					var b,
						c,
						d,
						e,
						f,
						g = this.t.style,
						h = i.transform.parse;
					if ("all" === this.e) (g.cssText = ""), (e = !0);
					else
						for (
							b = this.e
								.split(" ")
								.join("")
								.split(","),
								d = b.length;
							--d > -1;

						)
							(c = b[d]),
								i[c] &&
									(i[c].parse === h
										? (e = !0)
										: (c =
												"transformOrigin" === c
													? Fa
													: i[c].p)),
								Wa(g, c);
					e &&
						(Wa(g, Da),
						(f = this.t._gsTransform),
						f &&
							(f.svg &&
								(this.t.removeAttribute("data-svg-origin"),
								this.t.removeAttribute("transform")),
							delete this.t._gsTransform));
				}
			};
			for (
				za("clearProps", {
					parser: function(a, b, d, e, f) {
						return (
							(f = new ua(a, d, 0, 0, f, 2)),
							(f.setRatio = Ya),
							(f.e = b),
							(f.pr = -10),
							(f.data = e._tween),
							(c = !0),
							f
						);
					},
				}),
					j = "bezier,throwProps,physicsProps,physics2D".split(","),
					xa = j.length;
				xa--;

			)
				Aa(j[xa]);
			(j = g.prototype),
				(j._firstPT = j._lastParsedTransform = j._transform = null),
				(j._onInitTween = function(a, b, h, j) {
					if (!a.nodeType) return !1;
					(this._target = q = a),
						(this._tween = h),
						(this._vars = b),
						(r = j),
						(k = b.autoRound),
						(c = !1),
						(d = b.suffixMap || g.suffixMap),
						(e = _(a, "")),
						(f = this._overwriteProps);
					var n,
						p,
						s,
						t,
						u,
						v,
						w,
						x,
						z,
						A = a.style;
					if (
						(l &&
							"" === A.zIndex &&
							((n = aa(a, "zIndex", e)),
							("auto" === n || "" === n) &&
								this._addLazySet(A, "zIndex", 0)),
						"string" == typeof b &&
							((t = A.cssText),
							(n = da(a, e)),
							(A.cssText = t + ";" + b),
							(n = ea(a, n, da(a)).difs),
							!U &&
								y.test(b) &&
								(n.opacity = parseFloat(RegExp.$1)),
							(b = n),
							(A.cssText = t)),
						b.className
							? (this._firstPT = p = i.className.parse(
									a,
									b.className,
									"className",
									this,
									null,
									null,
									b
							  ))
							: (this._firstPT = p = this.parse(a, b, null)),
						this._transformType)
					) {
						for (
							z = 3 === this._transformType,
								Da
									? m &&
									  ((l = !0),
									  "" === A.zIndex &&
											((w = aa(a, "zIndex", e)),
											("auto" === w || "" === w) &&
												this._addLazySet(
													A,
													"zIndex",
													0
												)),
									  o &&
											this._addLazySet(
												A,
												"WebkitBackfaceVisibility",
												this._vars
													.WebkitBackfaceVisibility ||
													(z ? "visible" : "hidden")
											))
									: (A.zoom = 1),
								s = p;
							s && s._next;

						)
							s = s._next;
						(x = new ua(a, "transform", 0, 0, null, 2)),
							this._linkCSSP(x, null, s),
							(x.setRatio = Da ? Ua : Ta),
							(x.data = this._transform || Sa(a, e, !0)),
							(x.tween = h),
							(x.pr = -1),
							f.pop();
					}
					if (c) {
						for (; p; ) {
							for (v = p._next, s = t; s && s.pr > p.pr; )
								s = s._next;
							(p._prev = s ? s._prev : u)
								? (p._prev._next = p)
								: (t = p),
								(p._next = s) ? (s._prev = p) : (u = p),
								(p = v);
						}
						this._firstPT = t;
					}
					return !0;
				}),
				(j.parse = function(a, b, c, f) {
					var g,
						h,
						j,
						l,
						m,
						n,
						o,
						p,
						s,
						t,
						u = a.style;
					for (g in b) {
						if (
							((n = b[g]),
							(h = i[g]),
							"function" != typeof n ||
								(h && h.allowFunc) ||
								(n = n(r, q)),
							h)
						)
							c = h.parse(a, n, g, this, c, f, b);
						else {
							if ("--" === g.substr(0, 2)) {
								this._tween._propLookup[
									g
								] = this._addTween.call(
									this._tween,
									a.style,
									"setProperty",
									_(a).getPropertyValue(g) + "",
									n + "",
									g,
									!1,
									g
								);
								continue;
							}
							(m = aa(a, g, e) + ""),
								(s = "string" == typeof n),
								"color" === g ||
								"fill" === g ||
								"stroke" === g ||
								-1 !== g.indexOf("Color") ||
								(s && A.test(n))
									? (s ||
											((n = oa(n)),
											(n =
												(n.length > 3
													? "rgba("
													: "rgb(") +
												n.join(",") +
												")")),
									  (c = wa(
											u,
											g,
											m,
											n,
											!0,
											"transparent",
											c,
											0,
											f
									  )))
									: s && J.test(n)
									? (c = wa(u, g, m, n, !0, null, c, 0, f))
									: ((j = parseFloat(m)),
									  (o =
											j || 0 === j
												? m.substr((j + "").length)
												: ""),
									  ("" === m || "auto" === m) &&
											("width" === g || "height" === g
												? ((j = ha(a, g, e)),
												  (o = "px"))
												: "left" === g || "top" === g
												? ((j = ca(a, g, e)),
												  (o = "px"))
												: ((j =
														"opacity" !== g
															? 0
															: 1),
												  (o = ""))),
									  (t = s && "=" === n.charAt(1)),
									  t
											? ((l = parseInt(
													n.charAt(0) + "1",
													10
											  )),
											  (n = n.substr(2)),
											  (l *= parseFloat(n)),
											  (p = n.replace(w, "")))
											: ((l = parseFloat(n)),
											  (p = s ? n.replace(w, "") : "")),
									  "" === p && (p = g in d ? d[g] : o),
									  (n =
											l || 0 === l
												? (t ? l + j : l) + p
												: b[g]),
									  o !== p &&
											("" !== p || "lineHeight" === g) &&
											(l || 0 === l) &&
											j &&
											((j = ba(a, g, j, o)),
											"%" === p
												? ((j /=
														ba(a, g, 100, "%") /
														100),
												  b.strictUnits !== !0 &&
														(m = j + "%"))
												: "em" === p ||
												  "rem" === p ||
												  "vw" === p ||
												  "vh" === p
												? (j /= ba(a, g, 1, p))
												: "px" !== p &&
												  ((l = ba(a, g, l, p)),
												  (p = "px")),
											t &&
												(l || 0 === l) &&
												(n = l + j + p)),
									  t && (l += j),
									  (!j && 0 !== j) || (!l && 0 !== l)
											? void 0 !== u[g] &&
											  (n ||
													(n + "" != "NaN" &&
														null != n))
												? ((c = new ua(
														u,
														g,
														l || j || 0,
														0,
														c,
														-1,
														g,
														!1,
														0,
														m,
														n
												  )),
												  (c.xs0 =
														"none" !== n ||
														("display" !== g &&
															-1 ===
																g.indexOf(
																	"Style"
																))
															? n
															: m))
												: W(
														"invalid " +
															g +
															" tween value: " +
															b[g]
												  )
											: ((c = new ua(
													u,
													g,
													j,
													l - j,
													c,
													0,
													g,
													k !== !1 &&
														("px" === p ||
															"zIndex" === g),
													0,
													m,
													n
											  )),
											  (c.xs0 = p)));
						}
						f && c && !c.plugin && (c.plugin = f);
					}
					return c;
				}),
				(j.setRatio = function(a) {
					var b,
						c,
						d,
						e = this._firstPT,
						f = 1e-6;
					if (
						1 !== a ||
						(this._tween._time !== this._tween._duration &&
							0 !== this._tween._time)
					)
						if (
							a ||
							(this._tween._time !== this._tween._duration &&
								0 !== this._tween._time) ||
							this._tween._rawPrevTime === -1e-6
						)
							for (; e; ) {
								if (
									((b = e.c * a + e.s),
									e.r
										? (b = e.r(b))
										: f > b && b > -f && (b = 0),
									e.type)
								)
									if (1 === e.type)
										if (((d = e.l), 2 === d))
											e.t[e.p] =
												e.xs0 +
												b +
												e.xs1 +
												e.xn1 +
												e.xs2;
										else if (3 === d)
											e.t[e.p] =
												e.xs0 +
												b +
												e.xs1 +
												e.xn1 +
												e.xs2 +
												e.xn2 +
												e.xs3;
										else if (4 === d)
											e.t[e.p] =
												e.xs0 +
												b +
												e.xs1 +
												e.xn1 +
												e.xs2 +
												e.xn2 +
												e.xs3 +
												e.xn3 +
												e.xs4;
										else if (5 === d)
											e.t[e.p] =
												e.xs0 +
												b +
												e.xs1 +
												e.xn1 +
												e.xs2 +
												e.xn2 +
												e.xs3 +
												e.xn3 +
												e.xs4 +
												e.xn4 +
												e.xs5;
										else {
											for (
												c = e.xs0 + b + e.xs1, d = 1;
												d < e.l;
												d++
											)
												c +=
													e["xn" + d] +
													e["xs" + (d + 1)];
											e.t[e.p] = c;
										}
									else
										-1 === e.type
											? (e.t[e.p] = e.xs0)
											: e.setRatio && e.setRatio(a);
								else e.t[e.p] = b + e.xs0;
								e = e._next;
							}
						else
							for (; e; )
								2 !== e.type ? (e.t[e.p] = e.b) : e.setRatio(a),
									(e = e._next);
					else
						for (; e; ) {
							if (2 !== e.type)
								if (e.r && -1 !== e.type)
									if (((b = e.r(e.s + e.c)), e.type)) {
										if (1 === e.type) {
											for (
												d = e.l,
													c = e.xs0 + b + e.xs1,
													d = 1;
												d < e.l;
												d++
											)
												c +=
													e["xn" + d] +
													e["xs" + (d + 1)];
											e.t[e.p] = c;
										}
									} else e.t[e.p] = b + e.xs0;
								else e.t[e.p] = e.e;
							else e.setRatio(a);
							e = e._next;
						}
				}),
				(j._enableTransforms = function(a) {
					(this._transform =
						this._transform || Sa(this._target, e, !0)),
						(this._transformType =
							(this._transform.svg && Ba) ||
							(!a && 3 !== this._transformType)
								? 2
								: 3);
				});
			var Za = function(a) {
				(this.t[this.p] = this.e),
					this.data._linkCSSP(this, this._next, null, !0);
			};
			(j._addLazySet = function(a, b, c) {
				var d = (this._firstPT = new ua(a, b, 0, 0, this._firstPT, 2));
				(d.e = c), (d.setRatio = Za), (d.data = this);
			}),
				(j._linkCSSP = function(a, b, c, d) {
					return (
						a &&
							(b && (b._prev = a),
							a._next && (a._next._prev = a._prev),
							a._prev
								? (a._prev._next = a._next)
								: this._firstPT === a &&
								  ((this._firstPT = a._next), (d = !0)),
							c
								? (c._next = a)
								: d ||
								  null !== this._firstPT ||
								  (this._firstPT = a),
							(a._next = b),
							(a._prev = c)),
						a
					);
				}),
				(j._mod = function(a) {
					for (var b = this._firstPT; b; )
						"function" == typeof a[b.p] && (b.r = a[b.p]),
							(b = b._next);
				}),
				(j._kill = function(b) {
					var c,
						d,
						e,
						f = b;
					if (b.autoAlpha || b.alpha) {
						f = {};
						for (d in b) f[d] = b[d];
						(f.opacity = 1), f.autoAlpha && (f.visibility = 1);
					}
					for (
						b.className &&
							(c = this._classNamePT) &&
							((e = c.xfirst),
							e && e._prev
								? this._linkCSSP(
										e._prev,
										c._next,
										e._prev._prev
								  )
								: e === this._firstPT &&
								  (this._firstPT = c._next),
							c._next &&
								this._linkCSSP(c._next, c._next._next, e._prev),
							(this._classNamePT = null)),
							c = this._firstPT;
						c;

					)
						c.plugin &&
							c.plugin !== d &&
							c.plugin._kill &&
							(c.plugin._kill(b), (d = c.plugin)),
							(c = c._next);
					return a.prototype._kill.call(this, f);
				});
			var $a = function(a, b, c) {
				var d, e, f, g;
				if (a.slice) for (e = a.length; --e > -1; ) $a(a[e], b, c);
				else
					for (d = a.childNodes, e = d.length; --e > -1; )
						(f = d[e]),
							(g = f.type),
							f.style && (b.push(da(f)), c && c.push(f)),
							(1 !== g && 9 !== g && 11 !== g) ||
								!f.childNodes.length ||
								$a(f, b, c);
			};
			return (
				(g.cascadeTo = function(a, c, d) {
					var e,
						f,
						g,
						h,
						i = b.to(a, c, d),
						j = [i],
						k = [],
						l = [],
						m = [],
						n = b._internals.reservedProps;
					for (
						a = i._targets || i.target,
							$a(a, k, m),
							i.render(c, !0, !0),
							$a(a, l),
							i.render(0, !0, !0),
							i._enabled(!0),
							e = m.length;
						--e > -1;

					)
						if (((f = ea(m[e], k[e], l[e])), f.firstMPT)) {
							f = f.difs;
							for (g in d) n[g] && (f[g] = d[g]);
							h = {};
							for (g in f) h[g] = k[e][g];
							j.push(b.fromTo(m[e], c, h, f));
						}
					return j;
				}),
				a.activate([g]),
				g
			);
		},
		!0
	);
}),
	_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	(function(a) {
		"use strict";
		var b = function() {
			return (_gsScope.GreenSockGlobals || _gsScope)[a];
		};
		"undefined" != typeof module && module.exports
			? (require("../TweenLite.min.js"), (module.exports = b()))
			: "function" == typeof define &&
			  define.amd &&
			  define(["TweenLite"], b);
	})("CSSPlugin");
