;(function(g, m, p) {
	p(g);
	g.M = m();
})(this, function() {
/*!
 * MMMMMMMM               MMMMMMMM
 * M:::::::M             M:::::::M
 * M::::::::M           M::::::::M
 * M:::::::::M         M:::::::::M
 * M::::::::::M       M::::::::::M
 * M:::::::::::M     M:::::::::::M
 * M:::::::M::::M   M::::M:::::::M
 * M::::::M M::::M M::::M M::::::M
 * M::::::M  M::::M::::M  M::::::M
 * M::::::M   M:::::::M   M::::::M
 * M::::::M    M:::::M    M::::::M
 * M::::::M     MMMMM     M::::::M
 * M::::::M               M::::::M
 * M::::::M               M::::::M
 * M::::::M               M::::::M
 * MMMMMMMM               MMMMMMMM
 *
 * m.js
 * The M Library v0.4.2
 * Licensed under MIT (https://github.com/jamesliu96/m.js/blob/master/LICENSE)
 * Including Phenix.js (https://github.com/jamesliu96/phenix.js) released under the MIT License.
 *
 * Copyright (C) 2014-2015 James Liu
 * =J=
 */

"use strict";

if (typeof window.jQuery !== "function") {
	throw new Error("M requires jQuery");
}

/**
 * Constructor
 */
function M(p) {
	this.model = p;
	this.box = {};
}

/**
 * Prototype
 */
M.prototype = {
	is: function(p) {
		var _ = false;
		if (typeof p === "string") {
			p = p.split(",");
		}
		for (var i in p) {
			if (this.model === p[i].trim()) {
				_ = true;
				break;
			}
		}
		return _;
	},
	not: function(p) {
		return !this.is(p);
	},
	open: function(n, x) {
		if (typeof x !== "undefined") {
			this.box[n] = x;
		}
		return this.box[n];
	},
	close: function(n) {
		this.box[n] = undefined;
		return false;
	}
};

/**
 * Utilities
 */
M.ua = window.navigator.userAgent;
M.mobile = /Mobile/.test(M.ua);
M.ie = /MSIE/.test(M.ua);
M.chrome = /Chrome/.test(M.ua) || /Chromium/.test(M.ua);
M.safari = !M.chrome && /Safari/.test(M.ua);
M.firefox = /Firefox/.test(M.ua);
M.opera = /Opera/.test(M.ua);
M.ajax = function(u, d, cs, ce) {
	return window.jQuery.ajax({
		url: u,
		type: "POST",
		data: d,
		dataType: "json",
		timeout: 10000,
		success: cs,
		error: ce
	});
};
M.storage = {
	stack: window.localStorage || {},
	set: function(k, v) {
		if (window.localStorage) {
			M.storage.stack.setItem(k, v);
		} else {
			M.storage.stack[k] = v;
		}
	},
	get: function(k) {
		if (window.localStorage) {
			return M.storage.stack.getItem(k);
		} else {
			return M.storage.stack[k];
		}
	},
	del: function(k) {
		if (window.localStorage) {
			M.storage.stack.removeItem(k);
		} else {
			M.storage.stack[k] = undefined;
		}
	}
};
M.each = function(a, c) {
	for (var i in a) {
		if (typeof c === "function") {
			a[i] = c(a[i]);
		} else {
			throw new Error("Callback should be a function");
		}
	}
	return a;
};
M.crypto = {
	md5: function(e) {
		function h(a, b) {
			var c, d, e, f, g;
			e = a & 2147483648;
			f = b & 2147483648;
			c = a & 1073741824;
			d = b & 1073741824;
			g = (a & 1073741823) + (b & 1073741823);
			return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f;
		}

		function k(a, b, c, d, e, f, g) {
			a = h(a, h(h(b & c | ~b & d, e), g));
			return h(a << f | a >>> 32 - f, b);
		}

		function l(a, b, c, d, e, f, g) {
			a = h(a, h(h(b & d | c & ~d, e), g));
			return h(a << f | a >>> 32 - f, b);
		}

		function m(a, b, d, c, e, f, g) {
			a = h(a, h(h(b ^ d ^ c, e), g));
			return h(a << f | a >>> 32 - f, b);
		}

		function n(a, b, d, c, e, f, g) {
			a = h(a, h(h(d ^ (b | ~c), e), g));
			return h(a << f | a >>> 32 - f, b);
		}

		function p(a) {
			var b = "",
				d = "",
				c;
			for (c = 0; 3 >= c; c++) {
				d = a >>> 8 * c & 255, d = "0" + d.toString(16), b += d.substr(d.length - 2, 2);
			}
			return b;
		}
		var f = [],
			q, r, s, t, a, b, c, d;
		e = function(a) {
			a = a.replace(/\r\n/g, "\n");
			for (var b = "", d = 0; d < a.length; d++) {
				var c = a.charCodeAt(d);
				128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128));
			}
			return b;
		}(e);
		f = function(b) {
			var a, c = b.length;
			a = c + 8;
			for (var d = 16 * ((a - a % 64) / 64 + 1), e = Array(d - 1), f = 0, g = 0; g < c;) {
				a = (g - g % 4) / 4, f = g % 4 * 8, e[a] |= b.charCodeAt(g) << f, g++;
			}
			a = (g - g % 4) / 4;
			e[a] |= 128 << g % 4 * 8;
			e[d - 2] = c << 3;
			e[d - 1] = c >>> 29;
			return e;
		}(e);
		a = 1732584193;
		b = 4023233417;
		c = 2562383102;
		d = 271733878;
		for (e = 0; e < f.length; e += 16) {
			q = a, r = b, s = c, t = d, a = k(a, b, c, d, f[e + 0], 7, 3614090360), d = k(d, a, b, c, f[e + 1], 12, 3905402710), c = k(c, d, a, b, f[e + 2], 17, 606105819), b = k(b, c, d, a, f[e + 3], 22, 3250441966), a = k(a, b, c, d, f[e + 4], 7, 4118548399), d = k(d, a, b, c, f[e + 5], 12, 1200080426), c = k(c, d, a, b, f[e + 6], 17, 2821735955), b = k(b, c, d, a, f[e + 7], 22, 4249261313), a = k(a, b, c, d, f[e + 8], 7, 1770035416), d = k(d, a, b, c, f[e + 9], 12, 2336552879), c = k(c, d, a, b, f[e +
				10], 17, 4294925233), b = k(b, c, d, a, f[e + 11], 22, 2304563134), a = k(a, b, c, d, f[e + 12], 7, 1804603682), d = k(d, a, b, c, f[e + 13], 12, 4254626195), c = k(c, d, a, b, f[e + 14], 17, 2792965006), b = k(b, c, d, a, f[e + 15], 22, 1236535329), a = l(a, b, c, d, f[e + 1], 5, 4129170786), d = l(d, a, b, c, f[e + 6], 9, 3225465664), c = l(c, d, a, b, f[e + 11], 14, 643717713), b = l(b, c, d, a, f[e + 0], 20, 3921069994), a = l(a, b, c, d, f[e + 5], 5, 3593408605), d = l(d, a, b, c, f[e +
				10], 9, 38016083), c = l(c, d, a, b, f[e + 15], 14, 3634488961), b = l(b, c, d, a, f[e + 4], 20, 3889429448), a = l(a, b, c, d, f[e + 9], 5, 568446438), d = l(d, a, b, c, f[e + 14], 9, 3275163606), c = l(c, d, a, b, f[e + 3], 14, 4107603335), b = l(b, c, d, a, f[e + 8], 20, 1163531501), a = l(a, b, c, d, f[e + 13], 5, 2850285829), d = l(d, a, b, c, f[e + 2], 9, 4243563512), c = l(c, d, a, b, f[e + 7], 14, 1735328473), b = l(b, c, d, a, f[e + 12], 20, 2368359562), a = m(a, b, c, d, f[e + 5], 4,
				4294588738), d = m(d, a, b, c, f[e + 8], 11, 2272392833), c = m(c, d, a, b, f[e + 11], 16, 1839030562), b = m(b, c, d, a, f[e + 14], 23, 4259657740), a = m(a, b, c, d, f[e + 1], 4, 2763975236), d = m(d, a, b, c, f[e + 4], 11, 1272893353), c = m(c, d, a, b, f[e + 7], 16, 4139469664), b = m(b, c, d, a, f[e + 10], 23, 3200236656), a = m(a, b, c, d, f[e + 13], 4, 681279174), d = m(d, a, b, c, f[e + 0], 11, 3936430074), c = m(c, d, a, b, f[e + 3], 16, 3572445317), b = m(b, c, d, a, f[e + 6], 23, 76029189),
			a = m(a, b, c, d, f[e + 9], 4, 3654602809), d = m(d, a, b, c, f[e + 12], 11, 3873151461), c = m(c, d, a, b, f[e + 15], 16, 530742520), b = m(b, c, d, a, f[e + 2], 23, 3299628645), a = n(a, b, c, d, f[e + 0], 6, 4096336452), d = n(d, a, b, c, f[e + 7], 10, 1126891415), c = n(c, d, a, b, f[e + 14], 15, 2878612391), b = n(b, c, d, a, f[e + 5], 21, 4237533241), a = n(a, b, c, d, f[e + 12], 6, 1700485571), d = n(d, a, b, c, f[e + 3], 10, 2399980690), c = n(c, d, a, b, f[e + 10], 15, 4293915773), b =
				n(b, c, d, a, f[e + 1], 21, 2240044497), a = n(a, b, c, d, f[e + 8], 6, 1873313359), d = n(d, a, b, c, f[e + 15], 10, 4264355552), c = n(c, d, a, b, f[e + 6], 15, 2734768916), b = n(b, c, d, a, f[e + 13], 21, 1309151649), a = n(a, b, c, d, f[e + 4], 6, 4149444226), d = n(d, a, b, c, f[e + 11], 10, 3174756917), c = n(c, d, a, b, f[e + 2], 15, 718787259), b = n(b, c, d, a, f[e + 9], 21, 3951481745), a = h(a, q), b = h(b, r), c = h(c, s), d = h(d, t);
		}
		return (p(a) + p(b) + p(c) + p(d)).toLowerCase();
	},
	sha256: function(m) {
		function e(c, b) {
			var d = (c & 65535) + (b & 65535);
			return (c >> 16) + (b >> 16) + (d >> 16) << 16 | d & 65535;
		}

		function h(c, b) {
			return c >>> b | c << 32 - b;
		}
		m = function(c) {
			c = c.replace(/\r\n/g, "\n");
			for (var b = "", d = 0; d < c.length; d++) {
				var a = c.charCodeAt(d);
				128 > a ? b += String.fromCharCode(a) : (127 < a && 2048 > a ? b += String.fromCharCode(a >> 6 | 192) : (b += String.fromCharCode(a >> 12 | 224), b += String.fromCharCode(a >> 6 & 63 | 128)), b += String.fromCharCode(a & 63 | 128));
			}
			return b;
		}(m);
		return function(c) {
			for (var b = "", d = 0; d < 4 * c.length; d++) {
				b += "0123456789abcdef".charAt(c[d >> 2] >> 8 * (3 - d % 4) + 4 & 15) + "0123456789abcdef".charAt(c[d >> 2] >> 8 * (3 - d % 4) & 15);
			}
			return b;
		}(function(c, b) {
			var d = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
					3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298
				],
				a = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
				n = Array(64),
				p, r, s, m, q, u, v, k, w, f, g, l;
			c[b >> 5] |= 128 << 24 - b % 32;
			c[(b + 64 >> 9 << 4) + 15] = b;
			for (w = 0; w < c.length; w += 16) {
				p = a[0];
				r = a[1];
				s = a[2];
				m = a[3];
				q = a[4];
				u = a[5];
				v = a[6];
				k = a[7];
				for (f = 0; 64 > f; f++) {
					if (16 > f) {
						n[f] = c[f + w];
					} else {
						g = f;
						l = n[f - 2];
						l = h(l, 17) ^ h(l, 19) ^ l >>> 10;
						l = e(l, n[f - 7]);
						var t = n[f - 15];
						t = h(t, 7) ^ h(t, 18) ^ t >>> 3;
						n[g] = e(e(l, t), n[f - 16]);
					}
					g = q;
					g = h(g, 6) ^ h(g, 11) ^ h(g, 25);
					g = e(e(e(e(k, g), q & u ^ ~q & v), d[f]), n[f]);
					k = p;
					k = h(k, 2) ^ h(k, 13) ^ h(k, 22);
					l = e(k, p & r ^ p & s ^ r & s);
					k = v;
					v = u;
					u = q;
					q = e(m, g);
					m = s;
					s = r;
					r = p;
					p = e(g, l);
				}
				a[0] = e(p, a[0]);
				a[1] = e(r, a[1]);
				a[2] = e(s, a[2]);
				a[3] = e(m, a[3]);
				a[4] = e(q, a[4]);
				a[5] = e(u, a[5]);
				a[6] = e(v, a[6]);
				a[7] = e(k, a[7]);
			}
			return a;
		}(function(c) {
			for (var b = [], d = 0; d < 8 * c.length; d += 8) {
				b[d >> 5] |= (c.charCodeAt(d / 8) & 255) << 24 - d % 32;
			}
			return b;
		}(m), 8 * m.length));
	},
	base64: {
		encode: function(data) {
			var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
				ac = 0,
				enc = "",
				tmp_arr = [];
			if (!data) {
				return data;
			}
			do {
				o1 = data.charCodeAt(i++);
				o2 = data.charCodeAt(i++);
				o3 = data.charCodeAt(i++);
				bits = o1 << 16 | o2 << 8 | o3;
				h1 = bits >> 18 & 0x3f;
				h2 = bits >> 12 & 0x3f;
				h3 = bits >> 6 & 0x3f;
				h4 = bits & 0x3f;
				tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
			} while (i < data.length);
			enc = tmp_arr.join("");
			var r = data.length % 3;
			return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
		},
		decode: function(data) {
			var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
				ac = 0,
				dec = "",
				tmp_arr = [];
			if (!data) {
				return data;
			}
			data += "";
			do {
				h1 = b64.indexOf(data.charAt(i++));
				h2 = b64.indexOf(data.charAt(i++));
				h3 = b64.indexOf(data.charAt(i++));
				h4 = b64.indexOf(data.charAt(i++));
				bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
				o1 = bits >> 16 & 0xff;
				o2 = bits >> 8 & 0xff;
				o3 = bits & 0xff;
				if (h3 == 64) {
					tmp_arr[ac++] = String.fromCharCode(o1);
				} else if (h4 == 64) {
					tmp_arr[ac++] = String.fromCharCode(o1, o2);
				} else {
					tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
				}
			} while (i < data.length);
			dec = tmp_arr.join("");
			return dec;
		}
	}
};
M.htmlspecialchars = function(s) {
	s = s.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/"/g, "&quot;");
	s = s.replace(/'/g, "&#039;");
	return s;
};
M.url = {
	search: (function() {
		var _ = {};
		M.each(window.location.search.slice(1).split("&"), function(s) {
			if (s) {
				_[s.split("=")[0]] = s.split("=")[1];
			}
		});
		return _;
	})(),
	location: function(s) {
		if (typeof window.location.hash === "string") {
			if (typeof s === "string") {
				window.location.hash = s;
			} else {
				return window.location.hash.slice(1)
			}
		} else {
			return window.location.href.split("#")[1];
		}
	}
};
M.cookie = {
	set: function(c, e, d, f, a, b) {
		document.cookie = c + "=" + (b ? e : escape(e)) + (a ? "; expires=" + a.toGMTString() : "") + (f ? "; path=" + f : "; path=/") + (d ? "; domain=" + d : "");
	},
	get: function(c, b) {
		var a = document.cookie.match(new RegExp("(^| )" + c + "=([^;]*)(;|$)"));
		if (a != null) {
			return unescape(a[2]);
		}
		return b;
	},
	clear: function(a, c, b) {
		if (this.get(a)) {
			document.cookie = a + "=" + (c ? "; path=" + c : "; path=/") + (b ? "; domain=" + b : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
		}
	}
};
M.status = {
	list: {
		"100": ["邮箱验证成功", ""],
		"101": ["邮箱验证失败", "已验证"],
		"102": ["邮箱验证失败", "邮箱地址为空"],
		"103": ["邮箱验证失败", "邮箱校验码失效"],
		"104": ["信息获取失败", "当前会话失效"],
		"105": ["信息获取失败", "用户信息获取错误"],
		"106": ["注册失败", "邮箱不符合规则"],
		"107": ["注册失败", "验证码不正确"],
		"108": ["注册失败", "请求方式错误"],
		"109": ["注册失败", "邮箱已被注册"],
		"110": ["注册成功", ""],
		"111": ["注册失败", "网络出现问题"],
		"112": ["注册失败", "请求方式错误"],
		"113": ["登陆失败", "请求方式错误"],
		"114": ["登录失败", "邮箱未注册"],
		"115": ["登录失败", "密码错误"],
		"116": ["登陆成功", ""],
		"117": ["信息获取失败", "用户不存在"],
		"118": ["登陆失败", "账号未验证"],
		"119": ["邮箱验证失败", "不需要验证"],
		"120": ["邮箱验证失败", "邮箱不存在"],
		"121": ["登陆失败", "账号异常"]
	},
	getTitle: function(c) {
		return M.status.list[c][0];
	},
	getReason: function(c) {
		return M.status.list[c][1];
	}
};
M.alert = function(c) {
	return Phenix.init(c);
};
M.form = function(c) {
	c = c ? c : {};
	var id = c.id || "form";
	jQuery(id).attr("novalidate", "");
	var whiteList = [
		"这个邮箱还没有注册哦",
		"密码错误",
		"验证码输入错误",
		"Email输入错误",
		"Email地址已被使用"
	];
	var bind = {
		maxLength: function(o, l) {
			l = parseInt(l);
			return function() {
				o.val().length > l && o.val(o.val().substring(0, l));
			};
		},
		minLength: function(o, l) {
			l = parseInt(l);
			return function() {
				o.val().length < l ? showAlert(o, "长度不能小于" + l + "位") : destroyAlert(o, "长度不能小于" + l + "位");
			};
		},
		equalTo: function(o, to) {
			jQuery(to).on("blur", function() {
				o.trigger("input");
			});
			return function() {
				o.val() !== jQuery(to).val() ? showAlert(o, "两次输入的密码不相同") : destroyAlert(o, "两次输入的密码不相同");
			};
		},
		email: function(o) {
			return function() {
				!/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(o.val()) ? showAlert(o, "邮箱格式错误") : destroyAlert(o, "邮件格式错误");
			};
		},
		require: function(o) {
			return function() {
				o.val() == "" ? showAlert(o, "这里不能为空哦") : destroyAlert(o, "这里不能为空哦");
			};
		},
		clear: function(o) {
			return function() {
				destroyAlert(o);
			};
		}
	};
	var showAlert = function(o, content) {
		if (jQuery(".popover-content:visible").length !== 0 && !jQuery(".popover-content:visible").closest(".popover").prev().is(o)) {
			return;
		}
		if (o.data("content") !== content) {
			o.popover("destroy");
			o.focus().data("content", content).popover("show");
		}
	};
	var destroyAlert = function(o, content) {
		if (o.data("content") === content || !content || jQuery.inArray(o.data("content"), whiteList) !== -1) {
			o.popover("destroy");
			o.data("content", "");
		}
	};
	var helper = function(next) {
		return function() {
			next && next();
		};
	};
	var cbMap = {};
	jQuery(id).find("input,textarea").each(function() {
		jQuery(this).data({
			"trigger": "manual",
			"placement": c.placement || "left",
			"content": ""
		});
		var listenToCode = jQuery(this).attr("listen-to-code") ? jQuery(this).attr("listen-to-code").split(",") : [];
		for (var i = 0; i < listenToCode.length; i++) {
			cbMap[listenToCode[i]] = jQuery(this);
		}
		jQuery(this).attr("required") && jQuery(this).on("input", helper(bind.require(jQuery(this))));
		jQuery(this).attr("max-length") && jQuery(this).on("input", helper(bind.maxLength(jQuery(this), jQuery(this).attr("max-length"))));
		jQuery(this).attr("min-length") && jQuery(this).on("input", helper(bind.minLength(jQuery(this), jQuery(this).attr("min-length"))));
		jQuery(this).attr("equal-to") && jQuery(this).on("input", helper(bind.equalTo(jQuery(this), jQuery(this).attr("equal-to"))));
		jQuery(this).attr("type") === "email" && jQuery(this).on("blur", helper(bind.email(jQuery(this)))).on("keyup", helper(bind.clear(jQuery(this))));
	});
	jQuery(id).submit(function(e) {
		e.preventDefault();
		jQuery(this).find("input,textarea").trigger("input");
		if (jQuery(".popover-content:visible").length !== 0) {
			jQuery(".popover-content:visible").closest(".popover").prev().focus();
			return;
		}
		var no_empty = true;
		var sendData = {};
		jQuery(this).find("input,textarea").each(function() {
			if (jQuery(this).attr("required") && no_empty && !jQuery(this).val()) {
				no_empty = false;
				showAlert(jQuery(this), "这里不能为空哦");
			}
			if (jQuery(this).attr) {
				sendData[jQuery(this).attr("name")] = jQuery(this).attr("type") === "password" ? M.crypto.md5(jQuery(this).val()) : jQuery(this).val();
			}
		});
		if (!no_empty) return;
		M.ajax(jQuery(this).attr("action"), sendData, function(data) {
			data = c.cb ? c.cb(data) ? data : {
				"code": "0"
			} : data;
			if (data["code"] === "118") {
				M.alert("请登陆邮箱进行验证");
			} else if (data["code"] === "121") {
				M.alert("用户信息异常，请1小时后再试");
			} else if (data["code"] === "207") {
				window.location.href = "/guide/";
			} else if (data["code"] === "116") {
				window.location.href = c_url;
			} else if (data["code"] === "114") {
				showAlert(cbMap[data["code"]], "这个邮箱还没有注册哦");
			} else if (data["code"] === "115") {
				showAlert(cbMap[data["code"]], "密码错误");
			} else if (data["code"] === "107") {
				showAlert(cbMap[data["code"]], "验证码输入错误");
			} else if (data["code"] === "106") {
				showAlert(cbMap[data["code"]], "Email输入错误");
			} else if (data["code"] === "109") {
				showAlert(cbMap[data["code"]], "Email地址已被使用");
			} else if (data["code"] === "110") {
				jQuery("#login-success-modal").modal("show");
			}
		}, function() {
			M.alert("网络有问题！无法登录！可能木有吃药，感觉自己萌萌哒！");
		});
	});
};

	return M;
}, function(root) {
	var Phenix = {};

	Phenix.init = function(config) {
		var element = Phenix.element;
		for (var key in Phenix.defaults.style) {
			element.style[key] = Phenix.defaults.style[key];
		}
		if (typeof config === "object") {
			config = {
				width: parseInt(config.width) || Phenix.defaults.width,
				height: parseInt(config.height) || Phenix.defaults.height,
				template: config.template || "info",
				data: (typeof config.data === "object") ? config.data : Phenix.defaults.config.data
			};
		} else {
			config = Phenix.defaults.config;
		}
		var w = config.width;
			h = config.height;
		element.style.width = w + 'px';
		element.style.height = (h - 100) + 'px';
		element.style['margin-top'] = '-' + (h / 2) + 'px';
		element.style['margin-left'] = '-' + (w / 2) + 'px';
		element.innerHTML = _substitute(Phenix.templates[config.template] || config.template, config.data);
		return Phenix;
	};

	Phenix.dom = root.document;

	var _DOMcreate = function(element) {
		Phenix.dom.body.appendChild(element);
	};

	var _DOMdestroy = function(element) {
		Phenix.dom.body.removeChild(element);
	};

	Phenix.element = Phenix.dom.createElement('div');
	Phenix.element.setAttribute('id', 'phenix');

	Phenix.defaults = {};
	Phenix.defaults.config = {
		width: 500,
		height: 300,
		template: "info",
		data: {
			color: "#36b14a",
			face: ":)",
			title: "Welcome to Phenix",
			description: "Copyright (C) 2015 James Liu"
		}
	};
	Phenix.defaults.style = {
		'display': 'block',
		'color': '#221e1f',
		'background-color': '#f1f2f2',
		'width': Phenix.defaults.config.width + 'px',
		'height': (Phenix.defaults.config.height - 50) + 'px',
		'border': 'none',
		'position': 'fixed',
		'top': '50%',
		'left': '50%',
		'text-align': 'center',
		'padding': '25px 0',
		'margin': '-' + (Phenix.defaults.config.height / 2) + 'px 0 0 ' + '-' + (Phenix.defaults.config.width / 2) + 'px',
		'opacity': '0',
		'filter': 'alpha(opacity=0)',
		'z-index': '99999'
	};

	Phenix.templates = {};
	Phenix.templates.info = '<div style="font-size:60px;font-family:\'Microsoft YaHei\',\'Helvetica Neue\',Helvetica,Arial,sans-serif;padding:10px 0;color:{{color}};">{{face}}</div><div style="font-size:18px;font-family:\'Microsoft YaHei\',\'Helvetica Neue\',Helvetica,Arial,sans-serif;padding:10px 0;">{{title}}</div><div style="font-size:12px;font-family:\'Microsoft YaHei\',\'Helvetica Neue\',Helvetica,Arial,sans-serif;padding:10px 0;color:#b9b9bd;">{{description}}</div>';

	var _substitute = function(template, data) {
		for (var i in data) {
			var regexp = new RegExp("\{\{" + i + "\}\}", 'g');
			template = template.replace(regexp, data[i] || "Phenix", 'g');
		}
		return template;
	};

	var _opacity = function(opacity) {
		var element = Phenix.element;
		element.filter ? element.style.filter = 'alpha(opacity=' + opacity + ')' : element.style.opacity = opacity / 100;
	}

	Phenix.show = function(callback) {
		var element = Phenix.element;
		_DOMcreate(element);
		var opacity = 0;
		(function(){
			_opacity(opacity);
			opacity += 5;
			if (opacity <= 100) {
				setTimeout(arguments.callee, 20);
			}
		})();
		(typeof callback === "function") && callback();
		return Phenix;
	};

	Phenix.hide = function(callback) {
		var element = Phenix.element;
		_DOMdestroy(element);
		(typeof callback === "function") && callback();
		return Phenix;
	};

	root.Phenix = Phenix;
});