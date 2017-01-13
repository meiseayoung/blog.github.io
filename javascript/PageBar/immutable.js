/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.Immutable = {})
}(this, function(t) {
	"use strict";

	function e(t, e) {
		e && (t.prototype = Object.create(e.prototype)), t.prototype.constructor = t
	}

	function r(t) {
		return u(t) ? t : x(t)
	}

	function n(t) {
		return s(t) ? t : k(t)
	}

	function i(t) {
		return a(t) ? t : A(t)
	}

	function o(t) {
		return u(t) && !h(t) ? t : j(t)
	}

	function u(t) {
		return !(!t || !t[hr])
	}

	function s(t) {
		return !(!t || !t[fr])
	}

	function a(t) {
		return !(!t || !t[cr])
	}

	function h(t) {
		return s(t) || a(t)
	}

	function f(t) {
		return !(!t || !t[_r])
	}

	function c(t) {
		return t.value = !1, t
	}

	function _(t) {
		t && (t.value = !0)
	}

	function p() {}

	function v(t, e) {
		e = e || 0;
		for (var r = Math.max(0, t.length - e), n = Array(r), i = 0; r > i; i++) n[i] = t[i + e];
		return n
	}

	function l(t) {
		return void 0 === t.size && (t.size = t.__iterate(d)), t.size
	}

	function y(t, e) {
		if ("number" != typeof e) {
			var r = e >>> 0;
			if ("" + r !== e || 4294967295 === r) return NaN;
			e = r
		}
		return 0 > e ? l(t) + e : e
	}

	function d() {
		return !0
	}

	function m(t, e, r) {
		return (0 === t || void 0 !== r && -r >= t) && (void 0 === e || void 0 !== r && e >= r)
	}

	function g(t, e) {
		return S(t, e, 0)
	}

	function w(t, e) {
		return S(t, e, e)
	}

	function S(t, e, r) {
		return void 0 === t ? r : 0 > t ? Math.max(0, e + t) : void 0 === e ? t : Math.min(e, t)
	}

	function z(t) {
		this.next = t
	}

	function I(t, e, r, n) {
		var i = 0 === t ? e : 1 === t ? r : [e, r];
		return n ? n.value = i : n = {
			value: i,
			done: !1
		}, n
	}

	function b() {
		return {
			value: void 0,
			done: !0
		}
	}

	function q(t) {
		return !!E(t)
	}

	function D(t) {
		return t && "function" == typeof t.next
	}

	function M(t) {
		var e = E(t);
		return e && e.call(t)
	}

	function E(t) {
		var e = t && (Ir && t[Ir] || t[br]);
		return "function" == typeof e ? e : void 0
	}

	function O(t) {
		return t && "number" == typeof t.length
	}

	function x(t) {
		return null === t || void 0 === t ? B() : u(t) ? t.toSeq() : J(t)
	}

	function k(t) {
		return null === t || void 0 === t ? B().toKeyedSeq() : u(t) ? s(t) ? t.toSeq() : t.fromEntrySeq() : W(t)
	}

	function A(t) {
		return null === t || void 0 === t ? B() : u(t) ? s(t) ? t.entrySeq() : t.toIndexedSeq() : C(t)
	}

	function j(t) {
		return (null === t || void 0 === t ? B() : u(t) ? s(t) ? t.entrySeq() : t : C(t)).toSetSeq()
	}

	function R(t) {
		this._array = t, this.size = t.length
	}

	function U(t) {
		var e = Object.keys(t);
		this._object = t, this._keys = e,
			this.size = e.length
	}

	function K(t) {
		this._iterable = t, this.size = t.length || t.size
	}

	function L(t) {
		this._iterator = t, this._iteratorCache = []
	}

	function T(t) {
		return !(!t || !t[Dr])
	}

	function B() {
		return Mr || (Mr = new R([]))
	}

	function W(t) {
		var e = Array.isArray(t) ? new R(t).fromEntrySeq() : D(t) ? new L(t).fromEntrySeq() : q(t) ? new K(t).fromEntrySeq() : "object" == typeof t ? new U(t) : void 0;
		if (!e) throw new TypeError("Expected Array or iterable object of [k, v] entries, or keyed object: " + t);
		return e
	}

	function C(t) {
		var e = N(t);
		if (!e) throw new TypeError("Expected Array or iterable object of values: " + t);
		return e
	}

	function J(t) {
		var e = N(t) || "object" == typeof t && new U(t);
		if (!e) throw new TypeError("Expected Array or iterable object of values, or keyed object: " + t);
		return e
	}

	function N(t) {
		return O(t) ? new R(t) : D(t) ? new L(t) : q(t) ? new K(t) : void 0
	}

	function P(t, e, r, n) {
		var i = t._cache;
		if (i) {
			for (var o = i.length - 1, u = 0; o >= u; u++) {
				var s = i[r ? o - u : u];
				if (e(s[1], n ? s[0] : u, t) === !1) return u + 1
			}
			return u
		}
		return t.__iterateUncached(e, r)
	}

	function H(t, e, r, n) {
		var i = t._cache;
		if (i) {
			var o = i.length - 1,
				u = 0;
			return new z(function() {
				var t = i[r ? o - u : u];
				return u++ > o ? b() : I(e, n ? t[0] : u - 1, t[1])
			})
		}
		return t.__iteratorUncached(e, r)
	}

	function V(t, e) {
		return e ? Y(e, t, "", {
			"": t
		}) : Q(t)
	}

	function Y(t, e, r, n) {
		return Array.isArray(e) ? t.call(n, r, A(e).map(function(r, n) {
			return Y(t, r, n, e)
		})) : X(e) ? t.call(n, r, k(e).map(function(r, n) {
			return Y(t, r, n, e)
		})) : e
	}

	function Q(t) {
		return Array.isArray(t) ? A(t).map(Q).toList() : X(t) ? k(t).map(Q).toMap() : t
	}

	function X(t) {
		return t && (t.constructor === Object || void 0 === t.constructor)
	}

	function F(t, e) {
		if (t === e || t !== t && e !== e) return !0;
		if (!t || !e) return !1;
		if ("function" == typeof t.valueOf && "function" == typeof e.valueOf) {
			if (t = t.valueOf(), e = e.valueOf(), t === e || t !== t && e !== e) return !0;
			if (!t || !e) return !1
		}
		return "function" == typeof t.equals && "function" == typeof e.equals && t.equals(e) ? !0 : !1
	}

	function G(t, e) {
		if (t === e) return !0;
		if (!u(e) || void 0 !== t.size && void 0 !== e.size && t.size !== e.size || void 0 !== t.__hash && void 0 !== e.__hash && t.__hash !== e.__hash || s(t) !== s(e) || a(t) !== a(e) || f(t) !== f(e)) return !1;
		if (0 === t.size && 0 === e.size) return !0;
		var r = !h(t);
		if (f(t)) {
			var n = t.entries();
			return e.every(function(t, e) {
				var i = n.next().value;
				return i && F(i[1], t) && (r || F(i[0], e))
			}) && n.next().done
		}
		var i = !1;
		if (void 0 === t.size)
			if (void 0 === e.size) "function" == typeof t.cacheResult && t.cacheResult();
			else {
				i = !0;
				var o = t;
				t = e, e = o
			}
		var c = !0,
			_ = e.__iterate(function(e, n) {
				return (r ? t.has(e) : i ? F(e, t.get(n, dr)) : F(t.get(n, dr), e)) ? void 0 : (c = !1, !1)
			});
		return c && t.size === _
	}

	function Z(t, e) {
		if (!(this instanceof Z)) return new Z(t, e);
		if (this._value = t, this.size = void 0 === e ? 1 / 0 : Math.max(0, e), 0 === this.size) {
			if (Er) return Er;
			Er = this
		}
	}

	function $(t, e) {
		if (!t) throw Error(e)
	}

	function tt(t, e, r) {
		if (!(this instanceof tt)) return new tt(t, e, r);
		if ($(0 !== r, "Cannot step a Range by 0"), t = t || 0, void 0 === e && (e = 1 / 0), r = void 0 === r ? 1 : Math.abs(r), t > e && (r = -r), this._start = t, this._end = e, this._step = r, this.size = Math.max(0, Math.ceil((e - t) / r - 1) + 1), 0 === this.size) {
			if (Or) return Or;
			Or = this
		}
	}

	function et() {
		throw TypeError("Abstract")
	}

	function rt() {}

	function nt() {}

	function it() {}

	function ot(t) {
		return t >>> 1 & 1073741824 | 3221225471 & t
	}

	function ut(t) {
		if (t === !1 || null === t || void 0 === t) return 0;
		if ("function" == typeof t.valueOf && (t = t.valueOf(), t === !1 || null === t || void 0 === t)) return 0;
		if (t === !0) return 1;
		var e = typeof t;
		if ("number" === e) {
			if (t !== t || t === 1 / 0) return 0;
			var r = 0 | t;
			for (r !== t && (r ^= 4294967295 * t); t > 4294967295;) t /= 4294967295, r ^= t;
			return ot(r)
		}
		if ("string" === e) return t.length > Lr ? st(t) : at(t);
		if ("function" == typeof t.hashCode) return t.hashCode();
		if ("object" === e) return ht(t);
		if ("function" == typeof t.toString) return at("" + t);
		throw Error("Value type " + e + " cannot be hashed.")
	}

	function st(t) {
		var e = Wr[t];
		return void 0 === e && (e = at(t), Br === Tr && (Br = 0, Wr = {}), Br++, Wr[t] = e), e
	}

	function at(t) {
		for (var e = 0, r = 0; t.length > r; r++) e = 31 * e + t.charCodeAt(r) | 0;
		return ot(e)
	}

	function ht(t) {
		var e;
		if (Rr && (e = xr.get(t), void 0 !== e)) return e;
		if (e = t[Kr], void 0 !== e) return e;
		if (!jr) {
			if (e = t.propertyIsEnumerable && t.propertyIsEnumerable[Kr], void 0 !== e) return e;
			if (e = ft(t), void 0 !== e) return e
		}
		if (e = ++Ur, 1073741824 & Ur && (Ur = 0), Rr) xr.set(t, e);
		else {
			if (void 0 !== Ar && Ar(t) === !1) throw Error("Non-extensible objects are not allowed as keys.");
			if (jr) Object.defineProperty(t, Kr, {
				enumerable: !1,
				configurable: !1,
				writable: !1,
				value: e
			});
			else if (void 0 !== t.propertyIsEnumerable && t.propertyIsEnumerable === t.constructor.prototype.propertyIsEnumerable) t.propertyIsEnumerable = function() {
				return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments)
			}, t.propertyIsEnumerable[Kr] = e;
			else {
				if (void 0 === t.nodeType) throw Error("Unable to set a non-enumerable property on object.");
				t[Kr] = e
			}
		}
		return e
	}

	function ft(t) {
		if (t && t.nodeType > 0) switch (t.nodeType) {
			case 1:
				return t.uniqueID;
			case 9:
				return t.documentElement && t.documentElement.uniqueID
		}
	}

	function ct(t) {
		$(t !== 1 / 0, "Cannot perform this action with an infinite size.")
	}

	function _t(t) {
		return null === t || void 0 === t ? It() : pt(t) && !f(t) ? t : It().withMutations(function(e) {
			var r = n(t);
			ct(r.size), r.forEach(function(t, r) {
				return e.set(r, t)
			})
		})
	}

	function pt(t) {
		return !(!t || !t[Cr])
	}

	function vt(t, e) {
		this.ownerID = t, this.entries = e
	}

	function lt(t, e, r) {
		this.ownerID = t, this.bitmap = e, this.nodes = r
	}

	function yt(t, e, r) {
		this.ownerID = t, this.count = e, this.nodes = r
	}

	function dt(t, e, r) {
		this.ownerID = t, this.keyHash = e, this.entries = r
	}

	function mt(t, e, r) {
		this.ownerID = t, this.keyHash = e, this.entry = r
	}

	function gt(t, e, r) {
		this._type = e, this._reverse = r, this._stack = t._root && St(t._root)
	}

	function wt(t, e) {
		return I(t, e[0], e[1])
	}

	function St(t, e) {
		return {
			node: t,
			index: 0,
			__prev: e
		}
	}

	function zt(t, e, r, n) {
		var i = Object.create(Jr);
		return i.size = t, i._root = e, i.__ownerID = r, i.__hash = n, i.__altered = !1, i
	}

	function It() {
		return Nr || (Nr = zt(0))
	}

	function bt(t, e, r) {
		var n, i;
		if (t._root) {
			var o = c(mr),
				u = c(gr);
			if (n = qt(t._root, t.__ownerID, 0, void 0, e, r, o, u), !u.value) return t;
			i = t.size + (o.value ? r === dr ? -1 : 1 : 0)
		} else {
			if (r === dr) return t;
			i = 1, n = new vt(t.__ownerID, [
				[e, r]
			])
		}
		return t.__ownerID ? (t.size = i, t._root = n, t.__hash = void 0, t.__altered = !0, t) : n ? zt(i, n) : It()
	}

	function qt(t, e, r, n, i, o, u, s) {
		return t ? t.update(e, r, n, i, o, u, s) : o === dr ? t : (_(s), _(u), new mt(e, n, [i, o]))
	}

	function Dt(t) {
		return t.constructor === mt || t.constructor === dt
	}

	function Mt(t, e, r, n, i) {
		if (t.keyHash === n) return new dt(e, n, [t.entry, i]);
		var o, u = (0 === r ? t.keyHash : t.keyHash >>> r) & yr,
			s = (0 === r ? n : n >>> r) & yr,
			a = u === s ? [Mt(t, e, r + vr, n, i)] : (o = new mt(e, n, i),
				s > u ? [t, o] : [o, t]);
		return new lt(e, 1 << u | 1 << s, a)
	}

	function Et(t, e, r, n) {
		t || (t = new p);
		for (var i = new mt(t, ut(r), [r, n]), o = 0; e.length > o; o++) {
			var u = e[o];
			i = i.update(t, 0, void 0, u[0], u[1])
		}
		return i
	}

	function Ot(t, e, r, n) {
		for (var i = 0, o = 0, u = Array(r), s = 0, a = 1, h = e.length; h > s; s++, a <<= 1) {
			var f = e[s];
			void 0 !== f && s !== n && (i |= a, u[o++] = f)
		}
		return new lt(t, i, u)
	}

	function xt(t, e, r, n, i) {
		for (var o = 0, u = Array(lr), s = 0; 0 !== r; s++, r >>>= 1) u[s] = 1 & r ? e[o++] : void 0;
		return u[n] = i, new yt(t, o + 1, u)
	}

	function kt(t, e, r) {
		for (var i = [], o = 0; r.length > o; o++) {
			var s = r[o],
				a = n(s);
			u(s) || (a = a.map(function(t) {
				return V(t)
			})), i.push(a)
		}
		return Rt(t, e, i)
	}

	function At(t, e, r) {
		return t && t.mergeDeep && u(e) ? t.mergeDeep(e) : F(t, e) ? t : e
	}

	function jt(t) {
		return function(e, r, n) {
			if (e && e.mergeDeepWith && u(r)) return e.mergeDeepWith(t, r);
			var i = t(e, r, n);
			return F(e, i) ? e : i
		}
	}

	function Rt(t, e, r) {
		return r = r.filter(function(t) {
			return 0 !== t.size
		}), 0 === r.length ? t : 0 !== t.size || t.__ownerID || 1 !== r.length ? t.withMutations(function(t) {
			for (var n = e ? function(r, n) {
					t.update(n, dr, function(t) {
						return t === dr ? r : e(t, r, n)
					})
				} : function(e, r) {
					t.set(r, e)
				}, i = 0; r.length > i; i++) r[i].forEach(n)
		}) : t.constructor(r[0])
	}

	function Ut(t, e, r, n) {
		var i = t === dr,
			o = e.next();
		if (o.done) {
			var u = i ? r : t,
				s = n(u);
			return s === u ? t : s
		}
		$(i || t && t.set, "invalid keyPath");
		var a = o.value,
			h = i ? dr : t.get(a, dr),
			f = Ut(h, e, r, n);
		return f === h ? t : f === dr ? t.remove(a) : (i ? It() : t).set(a, f)
	}

	function Kt(t) {
		return t -= t >> 1 & 1431655765, t = (858993459 & t) + (t >> 2 & 858993459), t = t + (t >> 4) & 252645135, t += t >> 8, t += t >> 16, 127 & t
	}

	function Lt(t, e, r, n) {
		var i = n ? t : v(t);
		return i[e] = r, i
	}

	function Tt(t, e, r, n) {
		var i = t.length + 1;
		if (n && e + 1 === i) return t[e] = r, t;
		for (var o = Array(i), u = 0, s = 0; i > s; s++) s === e ? (o[s] = r, u = -1) : o[s] = t[s + u];
		return o
	}

	function Bt(t, e, r) {
		var n = t.length - 1;
		if (r && e === n) return t.pop(), t;
		for (var i = Array(n), o = 0, u = 0; n > u; u++) u === e && (o = 1), i[u] = t[u + o];
		return i
	}

	function Wt(t) {
		var e = Ht();
		if (null === t || void 0 === t) return e;
		if (Ct(t)) return t;
		var r = i(t),
			n = r.size;
		return 0 === n ? e : (ct(n), n > 0 && lr > n ? Pt(0, n, vr, null, new Jt(r.toArray())) : e.withMutations(function(t) {
			t.setSize(n), r.forEach(function(e, r) {
				return t.set(r, e)
			})
		}))
	}

	function Ct(t) {
		return !(!t || !t[Yr])
	}

	function Jt(t, e) {
		this.array = t, this.ownerID = e
	}

	function Nt(t, e) {
		function r(t, e, r) {
			return 0 === e ? n(t, r) : i(t, e, r)
		}

		function n(t, r) {
			var n = r === s ? a && a.array : t && t.array,
				i = r > o ? 0 : o - r,
				h = u - r;
			return h > lr && (h = lr),
				function() {
					if (i === h) return Fr;
					var t = e ? --h : i++;
					return n && n[t]
				}
		}

		function i(t, n, i) {
			var s, a = t && t.array,
				h = i > o ? 0 : o - i >> n,
				f = (u - i >> n) + 1;
			return f > lr && (f = lr),
				function() {
					for (;;) {
						if (s) {
							var t = s();
							if (t !== Fr) return t;
							s = null
						}
						if (h === f) return Fr;
						var o = e ? --f : h++;
						s = r(a && a[o], n - vr, i + (o << n))
					}
				}
		}
		var o = t._origin,
			u = t._capacity,
			s = Zt(u),
			a = t._tail;
		return r(t._root, t._level, 0)
	}

	function Pt(t, e, r, n, i, o, u) {
		var s = Object.create(Qr);
		return s.size = e - t, s._origin = t, s._capacity = e, s._level = r, s._root = n, s._tail = i, s.__ownerID = o, s.__hash = u, s.__altered = !1, s
	}

	function Ht() {
		return Xr || (Xr = Pt(0, 0, vr))
	}

	function Vt(t, e, r) {
		if (e = y(t, e), e !== e) return t;
		if (e >= t.size || 0 > e) return t.withMutations(function(t) {
			0 > e ? Ft(t, e).set(0, r) : Ft(t, 0, e + 1).set(e, r)
		});
		e += t._origin;
		var n = t._tail,
			i = t._root,
			o = c(gr);
		return e >= Zt(t._capacity) ? n = Yt(n, t.__ownerID, 0, e, r, o) : i = Yt(i, t.__ownerID, t._level, e, r, o), o.value ? t.__ownerID ? (t._root = i, t._tail = n, t.__hash = void 0, t.__altered = !0, t) : Pt(t._origin, t._capacity, t._level, i, n) : t
	}

	function Yt(t, e, r, n, i, o) {
		var u = n >>> r & yr,
			s = t && t.array.length > u;
		if (!s && void 0 === i) return t;
		var a;
		if (r > 0) {
			var h = t && t.array[u],
				f = Yt(h, e, r - vr, n, i, o);
			return f === h ? t : (a = Qt(t, e), a.array[u] = f, a)
		}
		return s && t.array[u] === i ? t : (_(o), a = Qt(t, e), void 0 === i && u === a.array.length - 1 ? a.array.pop() : a.array[u] = i, a)
	}

	function Qt(t, e) {
		return e && t && e === t.ownerID ? t : new Jt(t ? t.array.slice() : [], e)
	}

	function Xt(t, e) {
		if (e >= Zt(t._capacity)) return t._tail;
		if (1 << t._level + vr > e) {
			for (var r = t._root, n = t._level; r && n > 0;) r = r.array[e >>> n & yr], n -= vr;
			return r
		}
	}

	function Ft(t, e, r) {
		void 0 !== e && (e = 0 | e), void 0 !== r && (r = 0 | r);
		var n = t.__ownerID || new p,
			i = t._origin,
			o = t._capacity,
			u = i + e,
			s = void 0 === r ? o : 0 > r ? o + r : i + r;
		if (u === i && s === o) return t;
		if (u >= s) return t.clear();
		for (var a = t._level, h = t._root, f = 0; 0 > u + f;) h = new Jt(h && h.array.length ? [void 0, h] : [], n), a += vr, f += 1 << a;
		f && (u += f, i += f, s += f, o += f);
		for (var c = Zt(o), _ = Zt(s); _ >= 1 << a + vr;) h = new Jt(h && h.array.length ? [h] : [], n),
			a += vr;
		var v = t._tail,
			l = c > _ ? Xt(t, s - 1) : _ > c ? new Jt([], n) : v;
		if (v && _ > c && o > u && v.array.length) {
			h = Qt(h, n);
			for (var y = h, d = a; d > vr; d -= vr) {
				var m = c >>> d & yr;
				y = y.array[m] = Qt(y.array[m], n)
			}
			y.array[c >>> vr & yr] = v
		}
		if (o > s && (l = l && l.removeAfter(n, 0, s)), u >= _) u -= _, s -= _, a = vr, h = null, l = l && l.removeBefore(n, 0, u);
		else if (u > i || c > _) {
			for (f = 0; h;) {
				var g = u >>> a & yr;
				if (g !== _ >>> a & yr) break;
				g && (f += (1 << a) * g), a -= vr, h = h.array[g]
			}
			h && u > i && (h = h.removeBefore(n, a, u - f)), h && c > _ && (h = h.removeAfter(n, a, _ - f)), f && (u -= f, s -= f)
		}
		return t.__ownerID ? (t.size = s - u, t._origin = u, t._capacity = s, t._level = a, t._root = h, t._tail = l, t.__hash = void 0, t.__altered = !0, t) : Pt(u, s, a, h, l)
	}

	function Gt(t, e, r) {
		for (var n = [], o = 0, s = 0; r.length > s; s++) {
			var a = r[s],
				h = i(a);
			h.size > o && (o = h.size), u(a) || (h = h.map(function(t) {
				return V(t)
			})), n.push(h)
		}
		return o > t.size && (t = t.setSize(o)), Rt(t, e, n)
	}

	function Zt(t) {
		return lr > t ? 0 : t - 1 >>> vr << vr
	}

	function $t(t) {
		return null === t || void 0 === t ? re() : te(t) ? t : re().withMutations(function(e) {
			var r = n(t);
			ct(r.size), r.forEach(function(t, r) {
				return e.set(r, t)
			})
		})
	}

	function te(t) {
		return pt(t) && f(t)
	}

	function ee(t, e, r, n) {
		var i = Object.create($t.prototype);
		return i.size = t ? t.size : 0, i._map = t, i._list = e, i.__ownerID = r, i.__hash = n, i
	}

	function re() {
		return Gr || (Gr = ee(It(), Ht()))
	}

	function ne(t, e, r) {
		var n, i, o = t._map,
			u = t._list,
			s = o.get(e),
			a = void 0 !== s;
		if (r === dr) {
			if (!a) return t;
			u.size >= lr && u.size >= 2 * o.size ? (i = u.filter(function(t, e) {
				return void 0 !== t && s !== e
			}), n = i.toKeyedSeq().map(function(t) {
				return t[0]
			}).flip().toMap(), t.__ownerID && (n.__ownerID = i.__ownerID = t.__ownerID)) : (n = o.remove(e), i = s === u.size - 1 ? u.pop() : u.set(s, void 0))
		} else if (a) {
			if (r === u.get(s)[1]) return t;
			n = o, i = u.set(s, [e, r])
		} else n = o.set(e, u.size), i = u.set(u.size, [e, r]);
		return t.__ownerID ? (t.size = n.size, t._map = n, t._list = i, t.__hash = void 0, t) : ee(n, i)
	}

	function ie(t, e) {
		this._iter = t, this._useKeys = e, this.size = t.size
	}

	function oe(t) {
		this._iter = t, this.size = t.size
	}

	function ue(t) {
		this._iter = t, this.size = t.size
	}

	function se(t) {
		this._iter = t, this.size = t.size
	}

	function ae(t) {
		var e = Oe(t);
		return e._iter = t, e.size = t.size, e.flip = function() {
			return t
		}, e.reverse = function() {
			var e = t.reverse.apply(this);
			return e.flip = function() {
				return t.reverse()
			}, e
		}, e.has = function(e) {
			return t.includes(e)
		}, e.includes = function(e) {
			return t.has(e)
		}, e.cacheResult = xe, e.__iterateUncached = function(e, r) {
			var n = this;
			return t.__iterate(function(t, r) {
				return e(r, t, n) !== !1
			}, r)
		}, e.__iteratorUncached = function(e, r) {
			if (e === zr) {
				var n = t.__iterator(e, r);
				return new z(function() {
					var t = n.next();
					if (!t.done) {
						var e = t.value[0];
						t.value[0] = t.value[1], t.value[1] = e
					}
					return t
				})
			}
			return t.__iterator(e === Sr ? wr : Sr, r)
		}, e
	}

	function he(t, e, r) {
		var n = Oe(t);
		return n.size = t.size, n.has = function(e) {
			return t.has(e)
		}, n.get = function(n, i) {
			var o = t.get(n, dr);
			return o === dr ? i : e.call(r, o, n, t)
		}, n.__iterateUncached = function(n, i) {
			var o = this;
			return t.__iterate(function(t, i, u) {
				return n(e.call(r, t, i, u), i, o) !== !1
			}, i)
		}, n.__iteratorUncached = function(n, i) {
			var o = t.__iterator(zr, i);
			return new z(function() {
				var i = o.next();
				if (i.done) return i;
				var u = i.value,
					s = u[0];
				return I(n, s, e.call(r, u[1], s, t), i)
			})
		}, n
	}

	function fe(t, e) {
		var r = Oe(t);
		return r._iter = t, r.size = t.size, r.reverse = function() {
			return t
		}, t.flip && (r.flip = function() {
			var e = ae(t);
			return e.reverse = function() {
				return t.flip()
			}, e
		}), r.get = function(r, n) {
			return t.get(e ? r : -1 - r, n)
		}, r.has = function(r) {
			return t.has(e ? r : -1 - r)
		}, r.includes = function(e) {
			return t.includes(e)
		}, r.cacheResult = xe, r.__iterate = function(e, r) {
			var n = this;
			return t.__iterate(function(t, r) {
				return e(t, r, n)
			}, !r)
		}, r.__iterator = function(e, r) {
			return t.__iterator(e, !r)
		}, r
	}

	function ce(t, e, r, n) {
		var i = Oe(t);
		return n && (i.has = function(n) {
			var i = t.get(n, dr);
			return i !== dr && !!e.call(r, i, n, t)
		}, i.get = function(n, i) {
			var o = t.get(n, dr);
			return o !== dr && e.call(r, o, n, t) ? o : i
		}), i.__iterateUncached = function(i, o) {
			var u = this,
				s = 0;
			return t.__iterate(function(t, o, a) {
				return e.call(r, t, o, a) ? (s++, i(t, n ? o : s - 1, u)) : void 0
			}, o), s
		}, i.__iteratorUncached = function(i, o) {
			var u = t.__iterator(zr, o),
				s = 0;
			return new z(function() {
				for (;;) {
					var o = u.next();
					if (o.done) return o;
					var a = o.value,
						h = a[0],
						f = a[1];
					if (e.call(r, f, h, t)) return I(i, n ? h : s++, f, o)
				}
			})
		}, i
	}

	function _e(t, e, r) {
		var n = _t().asMutable();
		return t.__iterate(function(i, o) {
			n.update(e.call(r, i, o, t), 0, function(t) {
				return t + 1
			})
		}), n.asImmutable()
	}

	function pe(t, e, r) {
		var n = s(t),
			i = (f(t) ? $t() : _t()).asMutable();
		t.__iterate(function(o, u) {
			i.update(e.call(r, o, u, t), function(t) {
				return t = t || [], t.push(n ? [u, o] : o), t
			})
		});
		var o = Ee(t);
		return i.map(function(e) {
			return qe(t, o(e))
		})
	}

	function ve(t, e, r, n) {
		var i = t.size;
		if (void 0 !== e && (e = 0 | e), void 0 !== r && (r = r === 1 / 0 ? i : 0 | r), m(e, r, i)) return t;
		var o = g(e, i),
			u = w(r, i);
		if (o !== o || u !== u) return ve(t.toSeq().cacheResult(), e, r, n);
		var s, a = u - o;
		a === a && (s = 0 > a ? 0 : a);
		var h = Oe(t);
		return h.size = 0 === s ? s : t.size && s || void 0, !n && T(t) && s >= 0 && (h.get = function(e, r) {
			return e = y(this, e), e >= 0 && s > e ? t.get(e + o, r) : r
		}), h.__iterateUncached = function(e, r) {
			var i = this;
			if (0 === s) return 0;
			if (r) return this.cacheResult().__iterate(e, r);
			var u = 0,
				a = !0,
				h = 0;
			return t.__iterate(function(t, r) {
				return a && (a = u++ < o) ? void 0 : (h++, e(t, n ? r : h - 1, i) !== !1 && h !== s)
			}), h
		}, h.__iteratorUncached = function(e, r) {
			if (0 !== s && r) return this.cacheResult().__iterator(e, r);
			var i = 0 !== s && t.__iterator(e, r),
				u = 0,
				a = 0;
			return new z(function() {
				for (; u++ < o;) i.next();
				if (++a > s) return b();
				var t = i.next();
				return n || e === Sr ? t : e === wr ? I(e, a - 1, void 0, t) : I(e, a - 1, t.value[1], t)
			})
		}, h
	}

	function le(t, e, r) {
		var n = Oe(t);
		return n.__iterateUncached = function(n, i) {
			var o = this;
			if (i) return this.cacheResult().__iterate(n, i);
			var u = 0;
			return t.__iterate(function(t, i, s) {
				return e.call(r, t, i, s) && ++u && n(t, i, o)
			}), u
		}, n.__iteratorUncached = function(n, i) {
			var o = this;
			if (i) return this.cacheResult().__iterator(n, i);
			var u = t.__iterator(zr, i),
				s = !0;
			return new z(function() {
				if (!s) return b();
				var t = u.next();
				if (t.done) return t;
				var i = t.value,
					a = i[0],
					h = i[1];
				return e.call(r, h, a, o) ? n === zr ? t : I(n, a, h, t) : (s = !1, b())
			})
		}, n
	}

	function ye(t, e, r, n) {
		var i = Oe(t);
		return i.__iterateUncached = function(i, o) {
			var u = this;
			if (o) return this.cacheResult().__iterate(i, o);
			var s = !0,
				a = 0;
			return t.__iterate(function(t, o, h) {
				return s && (s = e.call(r, t, o, h)) ? void 0 : (a++, i(t, n ? o : a - 1, u))
			}), a
		}, i.__iteratorUncached = function(i, o) {
			var u = this;
			if (o) return this.cacheResult().__iterator(i, o);
			var s = t.__iterator(zr, o),
				a = !0,
				h = 0;
			return new z(function() {
				var t, o, f;
				do {
					if (t = s.next(), t.done) return n || i === Sr ? t : i === wr ? I(i, h++, void 0, t) : I(i, h++, t.value[1], t);
					var c = t.value;
					o = c[0], f = c[1], a && (a = e.call(r, f, o, u))
				} while (a);
				return i === zr ? t : I(i, o, f, t)
			})
		}, i
	}

	function de(t, e) {
		var r = s(t),
			i = [t].concat(e).map(function(t) {
				return u(t) ? r && (t = n(t)) : t = r ? W(t) : C(Array.isArray(t) ? t : [t]), t
			}).filter(function(t) {
				return 0 !== t.size
			});
		if (0 === i.length) return t;
		if (1 === i.length) {
			var o = i[0];
			if (o === t || r && s(o) || a(t) && a(o)) return o
		}
		var h = new R(i);
		return r ? h = h.toKeyedSeq() : a(t) || (h = h.toSetSeq()), h = h.flatten(!0), h.size = i.reduce(function(t, e) {
			if (void 0 !== t) {
				var r = e.size;
				if (void 0 !== r) return t + r
			}
		}, 0), h
	}

	function me(t, e, r) {
		var n = Oe(t);
		return n.__iterateUncached = function(n, i) {
			function o(t, h) {
				var f = this;
				t.__iterate(function(t, i) {
					return (!e || e > h) && u(t) ? o(t, h + 1) : n(t, r ? i : s++, f) === !1 && (a = !0), !a
				}, i)
			}
			var s = 0,
				a = !1;
			return o(t, 0), s
		}, n.__iteratorUncached = function(n, i) {
			var o = t.__iterator(n, i),
				s = [],
				a = 0;
			return new z(function() {
				for (; o;) {
					var t = o.next();
					if (t.done === !1) {
						var h = t.value;
						if (n === zr && (h = h[1]), e && !(e > s.length) || !u(h)) return r ? t : I(n, a++, h, t);
						s.push(o), o = h.__iterator(n, i)
					} else o = s.pop()
				}
				return b()
			})
		}, n
	}

	function ge(t, e, r) {
		var n = Ee(t);
		return t.toSeq().map(function(i, o) {
			return n(e.call(r, i, o, t))
		}).flatten(!0)
	}

	function we(t, e) {
		var r = Oe(t);
		return r.size = t.size && 2 * t.size - 1, r.__iterateUncached = function(r, n) {
			var i = this,
				o = 0;
			return t.__iterate(function(t, n) {
				return (!o || r(e, o++, i) !== !1) && r(t, o++, i) !== !1
			}, n), o
		}, r.__iteratorUncached = function(r, n) {
			var i, o = t.__iterator(Sr, n),
				u = 0;
			return new z(function() {
				return (!i || u % 2) && (i = o.next(), i.done) ? i : u % 2 ? I(r, u++, e) : I(r, u++, i.value, i)
			})
		}, r
	}

	function Se(t, e, r) {
		e || (e = ke);
		var n = s(t),
			i = 0,
			o = t.toSeq().map(function(e, n) {
				return [n, e, i++, r ? r(e, n, t) : e]
			}).toArray();
		return o.sort(function(t, r) {
			return e(t[3], r[3]) || t[2] - r[2]
		}).forEach(n ? function(t, e) {
			o[e].length = 2
		} : function(t, e) {
			o[e] = t[1]
		}), n ? k(o) : a(t) ? A(o) : j(o)
	}

	function ze(t, e, r) {
		if (e || (e = ke), r) {
			var n = t.toSeq().map(function(e, n) {
				return [e, r(e, n, t)]
			}).reduce(function(t, r) {
				return Ie(e, t[1], r[1]) ? r : t
			});
			return n && n[0]
		}
		return t.reduce(function(t, r) {
			return Ie(e, t, r) ? r : t
		})
	}

	function Ie(t, e, r) {
		var n = t(r, e);
		return 0 === n && r !== e && (void 0 === r || null === r || r !== r) || n > 0
	}

	function be(t, e, n) {
		var i = Oe(t);
		return i.size = new R(n).map(function(t) {
			return t.size
		}).min(), i.__iterate = function(t, e) {
			for (var r, n = this.__iterator(Sr, e), i = 0; !(r = n.next()).done && t(r.value, i++, this) !== !1;);
			return i
		}, i.__iteratorUncached = function(t, i) {
			var o = n.map(function(t) {
					return t = r(t), M(i ? t.reverse() : t)
				}),
				u = 0,
				s = !1;
			return new z(function() {
				var r;
				return s || (r = o.map(function(t) {
					return t.next()
				}), s = r.some(function(t) {
					return t.done
				})), s ? b() : I(t, u++, e.apply(null, r.map(function(t) {
					return t.value
				})))
			})
		}, i
	}

	function qe(t, e) {
		return T(t) ? e : t.constructor(e)
	}

	function De(t) {
		if (t !== Object(t)) throw new TypeError("Expected [K, V] tuple: " + t)
	}

	function Me(t) {
		return ct(t.size), l(t)
	}

	function Ee(t) {
		return s(t) ? n : a(t) ? i : o
	}

	function Oe(t) {
		return Object.create((s(t) ? k : a(t) ? A : j).prototype)
	}

	function xe() {
		return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : x.prototype.cacheResult.call(this)
	}

	function ke(t, e) {
		return void 0 === t && void 0 === e ? 0 : void 0 === t ? 1 : void 0 === e ? -1 : t > e ? 1 : e > t ? -1 : 0
	}

	function Ae(t) {
		var e = M(t);
		if (!e) {
			if (!O(t)) throw new TypeError("Expected iterable or array-like: " + t);
			e = M(r(t))
		}
		return e
	}

	function je(t, e) {
		var r, n = function(o) {
				if (o instanceof n) return o;
				if (!(this instanceof n)) return new n(o);
				if (!r) {
					r = !0;
					var u = Object.keys(t);
					Ke(i, u), i.size = u.length, i._name = e, i._keys = u, i._defaultValues = t
				}
				this._map = _t(o)
			},
			i = n.prototype = Object.create(Zr);
		return i.constructor = n, n
	}

	function Re(t, e, r) {
		var n = Object.create(Object.getPrototypeOf(t));
		return n._map = e, n.__ownerID = r, n
	}

	function Ue(t) {
		return t._name || t.constructor.name || "Record"
	}

	function Ke(t, e) {
		try {
			e.forEach(Le.bind(void 0, t))
		} catch (r) {}
	}

	function Le(t, e) {
		Object.defineProperty(t, e, {
			get: function() {
				return this.get(e)
			},
			set: function(t) {
				$(this.__ownerID, "Cannot set on an immutable record."), this.set(e, t)
			}
		})
	}

	function Te(t) {
		return null === t || void 0 === t ? Je() : Be(t) && !f(t) ? t : Je().withMutations(function(e) {
			var r = o(t);
			ct(r.size), r.forEach(function(t) {
				return e.add(t)
			})
		})
	}

	function Be(t) {
		return !(!t || !t[$r])
	}

	function We(t, e) {
		return t.__ownerID ? (t.size = e.size, t._map = e, t) : e === t._map ? t : 0 === e.size ? t.__empty() : t.__make(e);
	}

	function Ce(t, e) {
		var r = Object.create(tn);
		return r.size = t ? t.size : 0, r._map = t, r.__ownerID = e, r
	}

	function Je() {
		return en || (en = Ce(It()))
	}

	function Ne(t) {
		return null === t || void 0 === t ? Ve() : Pe(t) ? t : Ve().withMutations(function(e) {
			var r = o(t);
			ct(r.size), r.forEach(function(t) {
				return e.add(t)
			})
		})
	}

	function Pe(t) {
		return Be(t) && f(t)
	}

	function He(t, e) {
		var r = Object.create(rn);
		return r.size = t ? t.size : 0, r._map = t, r.__ownerID = e, r
	}

	function Ve() {
		return nn || (nn = He(re()))
	}

	function Ye(t) {
		return null === t || void 0 === t ? Fe() : Qe(t) ? t : Fe().unshiftAll(t)
	}

	function Qe(t) {
		return !(!t || !t[on])
	}

	function Xe(t, e, r, n) {
		var i = Object.create(un);
		return i.size = t, i._head = e, i.__ownerID = r, i.__hash = n, i.__altered = !1, i
	}

	function Fe() {
		return sn || (sn = Xe(0))
	}

	function Ge(t, e) {
		var r = function(r) {
			t.prototype[r] = e[r]
		};
		return Object.keys(e).forEach(r), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(e).forEach(r), t
	}

	function Ze(t, e) {
		return e
	}

	function $e(t, e) {
		return [e, t]
	}

	function tr(t) {
		return function() {
			return !t.apply(this, arguments)
		}
	}

	function er(t) {
		return function() {
			return -t.apply(this, arguments)
		}
	}

	function rr(t) {
		return "string" == typeof t ? JSON.stringify(t) : t + ""
	}

	function nr() {
		return v(arguments)
	}

	function ir(t, e) {
		return e > t ? 1 : t > e ? -1 : 0
	}

	function or(t) {
		if (t.size === 1 / 0) return 0;
		var e = f(t),
			r = s(t),
			n = e ? 1 : 0,
			i = t.__iterate(r ? e ? function(t, e) {
				n = 31 * n + sr(ut(t), ut(e)) | 0
			} : function(t, e) {
				n = n + sr(ut(t), ut(e)) | 0
			} : e ? function(t) {
				n = 31 * n + ut(t) | 0
			} : function(t) {
				n = n + ut(t) | 0
			});
		return ur(i, n)
	}

	function ur(t, e) {
		return e = kr(e, 3432918353), e = kr(e << 15 | e >>> -15, 461845907), e = kr(e << 13 | e >>> -13, 5), e = (e + 3864292196 | 0) ^ t, e = kr(e ^ e >>> 16, 2246822507), e = kr(e ^ e >>> 13, 3266489909), e = ot(e ^ e >>> 16)
	}

	function sr(t, e) {
		return t ^ e + 2654435769 + (t << 6) + (t >> 2) | 0
	}
	var ar = Array.prototype.slice;
	e(n, r), e(i, r), e(o, r), r.isIterable = u, r.isKeyed = s, r.isIndexed = a, r.isAssociative = h, r.isOrdered = f, r.Keyed = n, r.Indexed = i, r.Set = o;
	var hr = "@@__IMMUTABLE_ITERABLE__@@",
		fr = "@@__IMMUTABLE_KEYED__@@",
		cr = "@@__IMMUTABLE_INDEXED__@@",
		_r = "@@__IMMUTABLE_ORDERED__@@",
		pr = "delete",
		vr = 5,
		lr = 1 << vr,
		yr = lr - 1,
		dr = {},
		mr = {
			value: !1
		},
		gr = {
			value: !1
		},
		wr = 0,
		Sr = 1,
		zr = 2,
		Ir = "function" == typeof Symbol && Symbol.iterator,
		br = "@@iterator",
		qr = Ir || br;
	z.prototype.toString = function() {
		return "[Iterator]"
	}, z.KEYS = wr, z.VALUES = Sr, z.ENTRIES = zr, z.prototype.inspect = z.prototype.toSource = function() {
		return "" + this
	}, z.prototype[qr] = function() {
		return this
	}, e(x, r), x.of = function() {
		return x(arguments)
	}, x.prototype.toSeq = function() {
		return this
	}, x.prototype.toString = function() {
		return this.__toString("Seq {", "}")
	}, x.prototype.cacheResult = function() {
		return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this
	}, x.prototype.__iterate = function(t, e) {
		return P(this, t, e, !0)
	}, x.prototype.__iterator = function(t, e) {
		return H(this, t, e, !0)
	}, e(k, x), k.prototype.toKeyedSeq = function() {
		return this
	}, e(A, x), A.of = function() {
		return A(arguments)
	}, A.prototype.toIndexedSeq = function() {
		return this
	}, A.prototype.toString = function() {
		return this.__toString("Seq [", "]")
	}, A.prototype.__iterate = function(t, e) {
		return P(this, t, e, !1)
	}, A.prototype.__iterator = function(t, e) {
		return H(this, t, e, !1)
	}, e(j, x), j.of = function() {
		return j(arguments)
	}, j.prototype.toSetSeq = function() {
		return this
	}, x.isSeq = T, x.Keyed = k, x.Set = j, x.Indexed = A;
	var Dr = "@@__IMMUTABLE_SEQ__@@";
	x.prototype[Dr] = !0, e(R, A), R.prototype.get = function(t, e) {
		return this.has(t) ? this._array[y(this, t)] : e
	}, R.prototype.__iterate = function(t, e) {
		for (var r = this._array, n = r.length - 1, i = 0; n >= i; i++)
			if (t(r[e ? n - i : i], i, this) === !1) return i + 1;
		return i
	}, R.prototype.__iterator = function(t, e) {
		var r = this._array,
			n = r.length - 1,
			i = 0;
		return new z(function() {
			return i > n ? b() : I(t, i, r[e ? n - i++ : i++])
		})
	}, e(U, k), U.prototype.get = function(t, e) {
		return void 0 === e || this.has(t) ? this._object[t] : e
	}, U.prototype.has = function(t) {
		return this._object.hasOwnProperty(t)
	}, U.prototype.__iterate = function(t, e) {
		for (var r = this._object, n = this._keys, i = n.length - 1, o = 0; i >= o; o++) {
			var u = n[e ? i - o : o];
			if (t(r[u], u, this) === !1) return o + 1
		}
		return o
	}, U.prototype.__iterator = function(t, e) {
		var r = this._object,
			n = this._keys,
			i = n.length - 1,
			o = 0;
		return new z(function() {
			var u = n[e ? i - o : o];
			return o++ > i ? b() : I(t, u, r[u])
		})
	}, U.prototype[_r] = !0, e(K, A), K.prototype.__iterateUncached = function(t, e) {
		if (e) return this.cacheResult().__iterate(t, e);
		var r = this._iterable,
			n = M(r),
			i = 0;
		if (D(n))
			for (var o; !(o = n.next()).done && t(o.value, i++, this) !== !1;);
		return i
	}, K.prototype.__iteratorUncached = function(t, e) {
		if (e) return this.cacheResult().__iterator(t, e);
		var r = this._iterable,
			n = M(r);
		if (!D(n)) return new z(b);
		var i = 0;
		return new z(function() {
			var e = n.next();
			return e.done ? e : I(t, i++, e.value)
		})
	}, e(L, A), L.prototype.__iterateUncached = function(t, e) {
		if (e) return this.cacheResult().__iterate(t, e);
		for (var r = this._iterator, n = this._iteratorCache, i = 0; n.length > i;)
			if (t(n[i], i++, this) === !1) return i;
		for (var o; !(o = r.next()).done;) {
			var u = o.value;
			if (n[i] = u, t(u, i++, this) === !1) break
		}
		return i
	}, L.prototype.__iteratorUncached = function(t, e) {
		if (e) return this.cacheResult().__iterator(t, e);
		var r = this._iterator,
			n = this._iteratorCache,
			i = 0;
		return new z(function() {
			if (i >= n.length) {
				var e = r.next();
				if (e.done) return e;
				n[i] = e.value
			}
			return I(t, i, n[i++])
		})
	};
	var Mr;
	e(Z, A), Z.prototype.toString = function() {
		return 0 === this.size ? "Repeat []" : "Repeat [ " + this._value + " " + this.size + " times ]"
	}, Z.prototype.get = function(t, e) {
		return this.has(t) ? this._value : e
	}, Z.prototype.includes = function(t) {
		return F(this._value, t)
	}, Z.prototype.slice = function(t, e) {
		var r = this.size;
		return m(t, e, r) ? this : new Z(this._value, w(e, r) - g(t, r))
	}, Z.prototype.reverse = function() {
		return this
	}, Z.prototype.indexOf = function(t) {
		return F(this._value, t) ? 0 : -1
	}, Z.prototype.lastIndexOf = function(t) {
		return F(this._value, t) ? this.size : -1
	}, Z.prototype.__iterate = function(t, e) {
		for (var r = 0; this.size > r; r++)
			if (t(this._value, r, this) === !1) return r + 1;
		return r
	}, Z.prototype.__iterator = function(t, e) {
		var r = this,
			n = 0;
		return new z(function() {
			return r.size > n ? I(t, n++, r._value) : b()
		})
	}, Z.prototype.equals = function(t) {
		return t instanceof Z ? F(this._value, t._value) : G(t)
	};
	var Er;
	e(tt, A), tt.prototype.toString = function() {
		return 0 === this.size ? "Range []" : "Range [ " + this._start + "..." + this._end + (1 !== this._step ? " by " + this._step : "") + " ]"
	}, tt.prototype.get = function(t, e) {
		return this.has(t) ? this._start + y(this, t) * this._step : e
	}, tt.prototype.includes = function(t) {
		var e = (t - this._start) / this._step;
		return e >= 0 && this.size > e && e === Math.floor(e);
	}, tt.prototype.slice = function(t, e) {
		return m(t, e, this.size) ? this : (t = g(t, this.size), e = w(e, this.size), t >= e ? new tt(0, 0) : new tt(this.get(t, this._end), this.get(e, this._end), this._step))
	}, tt.prototype.indexOf = function(t) {
		var e = t - this._start;
		if (e % this._step === 0) {
			var r = e / this._step;
			if (r >= 0 && this.size > r) return r
		}
		return -1
	}, tt.prototype.lastIndexOf = function(t) {
		return this.indexOf(t)
	}, tt.prototype.__iterate = function(t, e) {
		for (var r = this.size - 1, n = this._step, i = e ? this._start + r * n : this._start, o = 0; r >= o; o++) {
			if (t(i, o, this) === !1) return o + 1;
			i += e ? -n : n
		}
		return o
	}, tt.prototype.__iterator = function(t, e) {
		var r = this.size - 1,
			n = this._step,
			i = e ? this._start + r * n : this._start,
			o = 0;
		return new z(function() {
			var u = i;
			return i += e ? -n : n, o > r ? b() : I(t, o++, u)
		})
	}, tt.prototype.equals = function(t) {
		return t instanceof tt ? this._start === t._start && this._end === t._end && this._step === t._step : G(this, t)
	};
	var Or;
	e(et, r), e(rt, et), e(nt, et), e(it, et), et.Keyed = rt, et.Indexed = nt, et.Set = it;
	var xr, kr = "function" == typeof Math.imul && -2 === Math.imul(4294967295, 2) ? Math.imul : function(t, e) {
			t = 0 | t, e = 0 | e;
			var r = 65535 & t,
				n = 65535 & e;
			return r * n + ((t >>> 16) * n + r * (e >>> 16) << 16 >>> 0) | 0
		},
		Ar = Object.isExtensible,
		jr = function() {
			try {
				return Object.defineProperty({}, "@", {}), !0
			} catch (t) {
				return !1
			}
		}(),
		Rr = "function" == typeof WeakMap;
	Rr && (xr = new WeakMap);
	var Ur = 0,
		Kr = "__immutablehash__";
	"function" == typeof Symbol && (Kr = Symbol(Kr));
	var Lr = 16,
		Tr = 255,
		Br = 0,
		Wr = {};
	e(_t, rt), _t.of = function() {
		var t = ar.call(arguments, 0);
		return It().withMutations(function(e) {
			for (var r = 0; t.length > r; r += 2) {
				if (r + 1 >= t.length) throw Error("Missing value for key: " + t[r]);
				e.set(t[r], t[r + 1])
			}
		})
	}, _t.prototype.toString = function() {
		return this.__toString("Map {", "}")
	}, _t.prototype.get = function(t, e) {
		return this._root ? this._root.get(0, void 0, t, e) : e
	}, _t.prototype.set = function(t, e) {
		return bt(this, t, e)
	}, _t.prototype.setIn = function(t, e) {
		return this.updateIn(t, dr, function() {
			return e
		})
	}, _t.prototype.remove = function(t) {
		return bt(this, t, dr)
	}, _t.prototype.deleteIn = function(t) {
		return this.updateIn(t, function() {
			return dr
		})
	}, _t.prototype.update = function(t, e, r) {
		return 1 === arguments.length ? t(this) : this.updateIn([t], e, r);
	}, _t.prototype.updateIn = function(t, e, r) {
		r || (r = e, e = void 0);
		var n = Ut(this, Ae(t), e, r);
		return n === dr ? void 0 : n
	}, _t.prototype.clear = function() {
		return 0 === this.size ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = !0, this) : It()
	}, _t.prototype.merge = function() {
		return kt(this, void 0, arguments)
	}, _t.prototype.mergeWith = function(t) {
		var e = ar.call(arguments, 1);
		return kt(this, t, e)
	}, _t.prototype.mergeIn = function(t) {
		var e = ar.call(arguments, 1);
		return this.updateIn(t, It(), function(t) {
			return "function" == typeof t.merge ? t.merge.apply(t, e) : e[e.length - 1]
		})
	}, _t.prototype.mergeDeep = function() {
		return kt(this, At, arguments)
	}, _t.prototype.mergeDeepWith = function(t) {
		var e = ar.call(arguments, 1);
		return kt(this, jt(t), e)
	}, _t.prototype.mergeDeepIn = function(t) {
		var e = ar.call(arguments, 1);
		return this.updateIn(t, It(), function(t) {
			return "function" == typeof t.mergeDeep ? t.mergeDeep.apply(t, e) : e[e.length - 1]
		})
	}, _t.prototype.sort = function(t) {
		return $t(Se(this, t))
	}, _t.prototype.sortBy = function(t, e) {
		return $t(Se(this, e, t))
	}, _t.prototype.withMutations = function(t) {
		var e = this.asMutable();
		return t(e), e.wasAltered() ? e.__ensureOwner(this.__ownerID) : this
	}, _t.prototype.asMutable = function() {
		return this.__ownerID ? this : this.__ensureOwner(new p)
	}, _t.prototype.asImmutable = function() {
		return this.__ensureOwner()
	}, _t.prototype.wasAltered = function() {
		return this.__altered
	}, _t.prototype.__iterator = function(t, e) {
		return new gt(this, t, e)
	}, _t.prototype.__iterate = function(t, e) {
		var r = this,
			n = 0;
		return this._root && this._root.iterate(function(e) {
			return n++, t(e[1], e[0], r)
		}, e), n
	}, _t.prototype.__ensureOwner = function(t) {
		return t === this.__ownerID ? this : t ? zt(this.size, this._root, t, this.__hash) : (this.__ownerID = t, this.__altered = !1, this)
	}, _t.isMap = pt;
	var Cr = "@@__IMMUTABLE_MAP__@@",
		Jr = _t.prototype;
	Jr[Cr] = !0, Jr[pr] = Jr.remove, Jr.removeIn = Jr.deleteIn, vt.prototype.get = function(t, e, r, n) {
		for (var i = this.entries, o = 0, u = i.length; u > o; o++)
			if (F(r, i[o][0])) return i[o][1];
		return n
	}, vt.prototype.update = function(t, e, r, n, i, o, u) {
		for (var s = i === dr, a = this.entries, h = 0, f = a.length; f > h && !F(n, a[h][0]); h++);
		var c = f > h;
		if (c ? a[h][1] === i : s) return this;
		if (_(u), (s || !c) && _(o), !s || 1 !== a.length) {
			if (!c && !s && a.length >= Pr) return Et(t, a, n, i);
			var p = t && t === this.ownerID,
				l = p ? a : v(a);
			return c ? s ? h === f - 1 ? l.pop() : l[h] = l.pop() : l[h] = [n, i] : l.push([n, i]), p ? (this.entries = l, this) : new vt(t, l)
		}
	}, lt.prototype.get = function(t, e, r, n) {
		void 0 === e && (e = ut(r));
		var i = 1 << ((0 === t ? e : e >>> t) & yr),
			o = this.bitmap;
		return 0 === (o & i) ? n : this.nodes[Kt(o & i - 1)].get(t + vr, e, r, n)
	}, lt.prototype.update = function(t, e, r, n, i, o, u) {
		void 0 === r && (r = ut(n));
		var s = (0 === e ? r : r >>> e) & yr,
			a = 1 << s,
			h = this.bitmap,
			f = 0 !== (h & a);
		if (!f && i === dr) return this;
		var c = Kt(h & a - 1),
			_ = this.nodes,
			p = f ? _[c] : void 0,
			v = qt(p, t, e + vr, r, n, i, o, u);
		if (v === p) return this;
		if (!f && v && _.length >= Hr) return xt(t, _, h, s, v);
		if (f && !v && 2 === _.length && Dt(_[1 ^ c])) return _[1 ^ c];
		if (f && v && 1 === _.length && Dt(v)) return v;
		var l = t && t === this.ownerID,
			y = f ? v ? h : h ^ a : h | a,
			d = f ? v ? Lt(_, c, v, l) : Bt(_, c, l) : Tt(_, c, v, l);
		return l ? (this.bitmap = y, this.nodes = d, this) : new lt(t, y, d)
	}, yt.prototype.get = function(t, e, r, n) {
		void 0 === e && (e = ut(r));
		var i = (0 === t ? e : e >>> t) & yr,
			o = this.nodes[i];
		return o ? o.get(t + vr, e, r, n) : n
	}, yt.prototype.update = function(t, e, r, n, i, o, u) {
		void 0 === r && (r = ut(n));
		var s = (0 === e ? r : r >>> e) & yr,
			a = i === dr,
			h = this.nodes,
			f = h[s];
		if (a && !f) return this;
		var c = qt(f, t, e + vr, r, n, i, o, u);
		if (c === f) return this;
		var _ = this.count;
		if (f) {
			if (!c && (_--, Vr > _)) return Ot(t, h, _, s)
		} else _++;
		var p = t && t === this.ownerID,
			v = Lt(h, s, c, p);
		return p ? (this.count = _, this.nodes = v, this) : new yt(t, _, v)
	}, dt.prototype.get = function(t, e, r, n) {
		for (var i = this.entries, o = 0, u = i.length; u > o; o++)
			if (F(r, i[o][0])) return i[o][1];
		return n
	}, dt.prototype.update = function(t, e, r, n, i, o, u) {
		void 0 === r && (r = ut(n));
		var s = i === dr;
		if (r !== this.keyHash) return s ? this : (_(u), _(o), Mt(this, t, e, r, [n, i]));
		for (var a = this.entries, h = 0, f = a.length; f > h && !F(n, a[h][0]); h++);
		var c = f > h;
		if (c ? a[h][1] === i : s) return this;
		if (_(u), (s || !c) && _(o), s && 2 === f) return new mt(t, this.keyHash, a[1 ^ h]);
		var p = t && t === this.ownerID,
			l = p ? a : v(a);
		return c ? s ? h === f - 1 ? l.pop() : l[h] = l.pop() : l[h] = [n, i] : l.push([n, i]), p ? (this.entries = l, this) : new dt(t, this.keyHash, l)
	}, mt.prototype.get = function(t, e, r, n) {
		return F(r, this.entry[0]) ? this.entry[1] : n;
	}, mt.prototype.update = function(t, e, r, n, i, o, u) {
		var s = i === dr,
			a = F(n, this.entry[0]);
		return (a ? i === this.entry[1] : s) ? this : (_(u), s ? void _(o) : a ? t && t === this.ownerID ? (this.entry[1] = i, this) : new mt(t, this.keyHash, [n, i]) : (_(o), Mt(this, t, e, ut(n), [n, i])))
	}, vt.prototype.iterate = dt.prototype.iterate = function(t, e) {
		for (var r = this.entries, n = 0, i = r.length - 1; i >= n; n++)
			if (t(r[e ? i - n : n]) === !1) return !1
	}, lt.prototype.iterate = yt.prototype.iterate = function(t, e) {
		for (var r = this.nodes, n = 0, i = r.length - 1; i >= n; n++) {
			var o = r[e ? i - n : n];
			if (o && o.iterate(t, e) === !1) return !1
		}
	}, mt.prototype.iterate = function(t, e) {
		return t(this.entry)
	}, e(gt, z), gt.prototype.next = function() {
		for (var t = this._type, e = this._stack; e;) {
			var r, n = e.node,
				i = e.index++;
			if (n.entry) {
				if (0 === i) return wt(t, n.entry)
			} else if (n.entries) {
				if (r = n.entries.length - 1, r >= i) return wt(t, n.entries[this._reverse ? r - i : i])
			} else if (r = n.nodes.length - 1, r >= i) {
				var o = n.nodes[this._reverse ? r - i : i];
				if (o) {
					if (o.entry) return wt(t, o.entry);
					e = this._stack = St(o, e)
				}
				continue
			}
			e = this._stack = this._stack.__prev
		}
		return b()
	};
	var Nr, Pr = lr / 4,
		Hr = lr / 2,
		Vr = lr / 4;
	e(Wt, nt), Wt.of = function() {
		return this(arguments)
	}, Wt.prototype.toString = function() {
		return this.__toString("List [", "]")
	}, Wt.prototype.get = function(t, e) {
		if (t = y(this, t), t >= 0 && this.size > t) {
			t += this._origin;
			var r = Xt(this, t);
			return r && r.array[t & yr]
		}
		return e
	}, Wt.prototype.set = function(t, e) {
		return Vt(this, t, e)
	}, Wt.prototype.remove = function(t) {
		return this.has(t) ? 0 === t ? this.shift() : t === this.size - 1 ? this.pop() : this.splice(t, 1) : this
	}, Wt.prototype.insert = function(t, e) {
		return this.splice(t, 0, e)
	}, Wt.prototype.clear = function() {
		return 0 === this.size ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = vr, this._root = this._tail = null, this.__hash = void 0, this.__altered = !0, this) : Ht()
	}, Wt.prototype.push = function() {
		var t = arguments,
			e = this.size;
		return this.withMutations(function(r) {
			Ft(r, 0, e + t.length);
			for (var n = 0; t.length > n; n++) r.set(e + n, t[n])
		})
	}, Wt.prototype.pop = function() {
		return Ft(this, 0, -1)
	}, Wt.prototype.unshift = function() {
		var t = arguments;
		return this.withMutations(function(e) {
			Ft(e, -t.length);
			for (var r = 0; t.length > r; r++) e.set(r, t[r]);
		})
	}, Wt.prototype.shift = function() {
		return Ft(this, 1)
	}, Wt.prototype.merge = function() {
		return Gt(this, void 0, arguments)
	}, Wt.prototype.mergeWith = function(t) {
		var e = ar.call(arguments, 1);
		return Gt(this, t, e)
	}, Wt.prototype.mergeDeep = function() {
		return Gt(this, At, arguments)
	}, Wt.prototype.mergeDeepWith = function(t) {
		var e = ar.call(arguments, 1);
		return Gt(this, jt(t), e)
	}, Wt.prototype.setSize = function(t) {
		return Ft(this, 0, t)
	}, Wt.prototype.slice = function(t, e) {
		var r = this.size;
		return m(t, e, r) ? this : Ft(this, g(t, r), w(e, r))
	}, Wt.prototype.__iterator = function(t, e) {
		var r = 0,
			n = Nt(this, e);
		return new z(function() {
			var e = n();
			return e === Fr ? b() : I(t, r++, e)
		})
	}, Wt.prototype.__iterate = function(t, e) {
		for (var r, n = 0, i = Nt(this, e);
			(r = i()) !== Fr && t(r, n++, this) !== !1;);
		return n
	}, Wt.prototype.__ensureOwner = function(t) {
		return t === this.__ownerID ? this : t ? Pt(this._origin, this._capacity, this._level, this._root, this._tail, t, this.__hash) : (this.__ownerID = t, this)
	}, Wt.isList = Ct;
	var Yr = "@@__IMMUTABLE_LIST__@@",
		Qr = Wt.prototype;
	Qr[Yr] = !0, Qr[pr] = Qr.remove, Qr.setIn = Jr.setIn, Qr.deleteIn = Qr.removeIn = Jr.removeIn, Qr.update = Jr.update, Qr.updateIn = Jr.updateIn, Qr.mergeIn = Jr.mergeIn, Qr.mergeDeepIn = Jr.mergeDeepIn, Qr.withMutations = Jr.withMutations, Qr.asMutable = Jr.asMutable, Qr.asImmutable = Jr.asImmutable, Qr.wasAltered = Jr.wasAltered, Jt.prototype.removeBefore = function(t, e, r) {
		if (r === e ? 1 << e : 0 === this.array.length) return this;
		var n = r >>> e & yr;
		if (n >= this.array.length) return new Jt([], t);
		var i, o = 0 === n;
		if (e > 0) {
			var u = this.array[n];
			if (i = u && u.removeBefore(t, e - vr, r), i === u && o) return this
		}
		if (o && !i) return this;
		var s = Qt(this, t);
		if (!o)
			for (var a = 0; n > a; a++) s.array[a] = void 0;
		return i && (s.array[n] = i), s
	}, Jt.prototype.removeAfter = function(t, e, r) {
		if (r === (e ? 1 << e : 0) || 0 === this.array.length) return this;
		var n = r - 1 >>> e & yr;
		if (n >= this.array.length) return this;
		var i;
		if (e > 0) {
			var o = this.array[n];
			if (i = o && o.removeAfter(t, e - vr, r), i === o && n === this.array.length - 1) return this
		}
		var u = Qt(this, t);
		return u.array.splice(n + 1), i && (u.array[n] = i), u
	};
	var Xr, Fr = {};
	e($t, _t), $t.of = function() {
		return this(arguments)
	}, $t.prototype.toString = function() {
		return this.__toString("OrderedMap {", "}");
	}, $t.prototype.get = function(t, e) {
		var r = this._map.get(t);
		return void 0 !== r ? this._list.get(r)[1] : e
	}, $t.prototype.clear = function() {
		return 0 === this.size ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this) : re()
	}, $t.prototype.set = function(t, e) {
		return ne(this, t, e)
	}, $t.prototype.remove = function(t) {
		return ne(this, t, dr)
	}, $t.prototype.wasAltered = function() {
		return this._map.wasAltered() || this._list.wasAltered()
	}, $t.prototype.__iterate = function(t, e) {
		var r = this;
		return this._list.__iterate(function(e) {
			return e && t(e[1], e[0], r)
		}, e)
	}, $t.prototype.__iterator = function(t, e) {
		return this._list.fromEntrySeq().__iterator(t, e)
	}, $t.prototype.__ensureOwner = function(t) {
		if (t === this.__ownerID) return this;
		var e = this._map.__ensureOwner(t),
			r = this._list.__ensureOwner(t);
		return t ? ee(e, r, t, this.__hash) : (this.__ownerID = t, this._map = e, this._list = r, this)
	}, $t.isOrderedMap = te, $t.prototype[_r] = !0, $t.prototype[pr] = $t.prototype.remove;
	var Gr;
	e(ie, k), ie.prototype.get = function(t, e) {
		return this._iter.get(t, e)
	}, ie.prototype.has = function(t) {
		return this._iter.has(t)
	}, ie.prototype.valueSeq = function() {
		return this._iter.valueSeq()
	}, ie.prototype.reverse = function() {
		var t = this,
			e = fe(this, !0);
		return this._useKeys || (e.valueSeq = function() {
			return t._iter.toSeq().reverse()
		}), e
	}, ie.prototype.map = function(t, e) {
		var r = this,
			n = he(this, t, e);
		return this._useKeys || (n.valueSeq = function() {
			return r._iter.toSeq().map(t, e)
		}), n
	}, ie.prototype.__iterate = function(t, e) {
		var r, n = this;
		return this._iter.__iterate(this._useKeys ? function(e, r) {
			return t(e, r, n)
		} : (r = e ? Me(this) : 0, function(i) {
			return t(i, e ? --r : r++, n)
		}), e)
	}, ie.prototype.__iterator = function(t, e) {
		if (this._useKeys) return this._iter.__iterator(t, e);
		var r = this._iter.__iterator(Sr, e),
			n = e ? Me(this) : 0;
		return new z(function() {
			var i = r.next();
			return i.done ? i : I(t, e ? --n : n++, i.value, i)
		})
	}, ie.prototype[_r] = !0, e(oe, A), oe.prototype.includes = function(t) {
		return this._iter.includes(t)
	}, oe.prototype.__iterate = function(t, e) {
		var r = this,
			n = 0;
		return this._iter.__iterate(function(e) {
			return t(e, n++, r)
		}, e)
	}, oe.prototype.__iterator = function(t, e) {
		var r = this._iter.__iterator(Sr, e),
			n = 0;
		return new z(function() {
			var e = r.next();
			return e.done ? e : I(t, n++, e.value, e)
		})
	}, e(ue, j), ue.prototype.has = function(t) {
		return this._iter.includes(t)
	}, ue.prototype.__iterate = function(t, e) {
		var r = this;
		return this._iter.__iterate(function(e) {
			return t(e, e, r)
		}, e)
	}, ue.prototype.__iterator = function(t, e) {
		var r = this._iter.__iterator(Sr, e);
		return new z(function() {
			var e = r.next();
			return e.done ? e : I(t, e.value, e.value, e)
		})
	}, e(se, k), se.prototype.entrySeq = function() {
		return this._iter.toSeq()
	}, se.prototype.__iterate = function(t, e) {
		var r = this;
		return this._iter.__iterate(function(e) {
			if (e) {
				De(e);
				var n = u(e);
				return t(n ? e.get(1) : e[1], n ? e.get(0) : e[0], r)
			}
		}, e)
	}, se.prototype.__iterator = function(t, e) {
		var r = this._iter.__iterator(Sr, e);
		return new z(function() {
			for (;;) {
				var e = r.next();
				if (e.done) return e;
				var n = e.value;
				if (n) {
					De(n);
					var i = u(n);
					return I(t, i ? n.get(0) : n[0], i ? n.get(1) : n[1], e)
				}
			}
		})
	}, oe.prototype.cacheResult = ie.prototype.cacheResult = ue.prototype.cacheResult = se.prototype.cacheResult = xe, e(je, rt), je.prototype.toString = function() {
		return this.__toString(Ue(this) + " {", "}")
	}, je.prototype.has = function(t) {
		return this._defaultValues.hasOwnProperty(t)
	}, je.prototype.get = function(t, e) {
		if (!this.has(t)) return e;
		var r = this._defaultValues[t];
		return this._map ? this._map.get(t, r) : r
	}, je.prototype.clear = function() {
		if (this.__ownerID) return this._map && this._map.clear(), this;
		var t = this.constructor;
		return t._empty || (t._empty = Re(this, It()))
	}, je.prototype.set = function(t, e) {
		if (!this.has(t)) throw Error('Cannot set unknown key "' + t + '" on ' + Ue(this));
		if (this._map && !this._map.has(t)) {
			var r = this._defaultValues[t];
			if (e === r) return this
		}
		var n = this._map && this._map.set(t, e);
		return this.__ownerID || n === this._map ? this : Re(this, n)
	}, je.prototype.remove = function(t) {
		if (!this.has(t)) return this;
		var e = this._map && this._map.remove(t);
		return this.__ownerID || e === this._map ? this : Re(this, e)
	}, je.prototype.wasAltered = function() {
		return this._map.wasAltered()
	}, je.prototype.__iterator = function(t, e) {
		var r = this;
		return n(this._defaultValues).map(function(t, e) {
			return r.get(e)
		}).__iterator(t, e)
	}, je.prototype.__iterate = function(t, e) {
		var r = this;
		return n(this._defaultValues).map(function(t, e) {
			return r.get(e)
		}).__iterate(t, e)
	}, je.prototype.__ensureOwner = function(t) {
		if (t === this.__ownerID) return this;
		var e = this._map && this._map.__ensureOwner(t);
		return t ? Re(this, e, t) : (this.__ownerID = t, this._map = e, this)
	};
	var Zr = je.prototype;
	Zr[pr] = Zr.remove, Zr.deleteIn = Zr.removeIn = Jr.removeIn, Zr.merge = Jr.merge, Zr.mergeWith = Jr.mergeWith, Zr.mergeIn = Jr.mergeIn, Zr.mergeDeep = Jr.mergeDeep, Zr.mergeDeepWith = Jr.mergeDeepWith, Zr.mergeDeepIn = Jr.mergeDeepIn, Zr.setIn = Jr.setIn, Zr.update = Jr.update, Zr.updateIn = Jr.updateIn, Zr.withMutations = Jr.withMutations, Zr.asMutable = Jr.asMutable, Zr.asImmutable = Jr.asImmutable, e(Te, it), Te.of = function() {
			return this(arguments)
		}, Te.fromKeys = function(t) {
			return this(n(t).keySeq())
		}, Te.prototype.toString = function() {
			return this.__toString("Set {", "}")
		}, Te.prototype.has = function(t) {
			return this._map.has(t)
		}, Te.prototype.add = function(t) {
			return We(this, this._map.set(t, !0))
		}, Te.prototype.remove = function(t) {
			return We(this, this._map.remove(t))
		}, Te.prototype.clear = function() {
			return We(this, this._map.clear())
		}, Te.prototype.union = function() {
			var t = ar.call(arguments, 0);
			return t = t.filter(function(t) {
				return 0 !== t.size
			}), 0 === t.length ? this : 0 !== this.size || this.__ownerID || 1 !== t.length ? this.withMutations(function(e) {
				for (var r = 0; t.length > r; r++) o(t[r]).forEach(function(t) {
					return e.add(t)
				})
			}) : this.constructor(t[0])
		}, Te.prototype.intersect = function() {
			var t = ar.call(arguments, 0);
			if (0 === t.length) return this;
			t = t.map(function(t) {
				return o(t)
			});
			var e = this;
			return this.withMutations(function(r) {
				e.forEach(function(e) {
					t.every(function(t) {
						return t.includes(e)
					}) || r.remove(e)
				})
			})
		}, Te.prototype.subtract = function() {
			var t = ar.call(arguments, 0);
			if (0 === t.length) return this;
			t = t.map(function(t) {
				return o(t)
			});
			var e = this;
			return this.withMutations(function(r) {
				e.forEach(function(e) {
					t.some(function(t) {
						return t.includes(e)
					}) && r.remove(e)
				})
			})
		}, Te.prototype.merge = function() {
			return this.union.apply(this, arguments)
		}, Te.prototype.mergeWith = function(t) {
			var e = ar.call(arguments, 1);
			return this.union.apply(this, e)
		},
		Te.prototype.sort = function(t) {
			return Ne(Se(this, t))
		}, Te.prototype.sortBy = function(t, e) {
			return Ne(Se(this, e, t))
		}, Te.prototype.wasAltered = function() {
			return this._map.wasAltered()
		}, Te.prototype.__iterate = function(t, e) {
			var r = this;
			return this._map.__iterate(function(e, n) {
				return t(n, n, r)
			}, e)
		}, Te.prototype.__iterator = function(t, e) {
			return this._map.map(function(t, e) {
				return e
			}).__iterator(t, e)
		}, Te.prototype.__ensureOwner = function(t) {
			if (t === this.__ownerID) return this;
			var e = this._map.__ensureOwner(t);
			return t ? this.__make(e, t) : (this.__ownerID = t, this._map = e, this)
		}, Te.isSet = Be;
	var $r = "@@__IMMUTABLE_SET__@@",
		tn = Te.prototype;
	tn[$r] = !0, tn[pr] = tn.remove, tn.mergeDeep = tn.merge, tn.mergeDeepWith = tn.mergeWith, tn.withMutations = Jr.withMutations, tn.asMutable = Jr.asMutable, tn.asImmutable = Jr.asImmutable, tn.__empty = Je, tn.__make = Ce;
	var en;
	e(Ne, Te), Ne.of = function() {
		return this(arguments)
	}, Ne.fromKeys = function(t) {
		return this(n(t).keySeq())
	}, Ne.prototype.toString = function() {
		return this.__toString("OrderedSet {", "}")
	}, Ne.isOrderedSet = Pe;
	var rn = Ne.prototype;
	rn[_r] = !0, rn.__empty = Ve, rn.__make = He;
	var nn;
	e(Ye, nt), Ye.of = function() {
		return this(arguments)
	}, Ye.prototype.toString = function() {
		return this.__toString("Stack [", "]")
	}, Ye.prototype.get = function(t, e) {
		var r = this._head;
		for (t = y(this, t); r && t--;) r = r.next;
		return r ? r.value : e
	}, Ye.prototype.peek = function() {
		return this._head && this._head.value
	}, Ye.prototype.push = function() {
		if (0 === arguments.length) return this;
		for (var t = this.size + arguments.length, e = this._head, r = arguments.length - 1; r >= 0; r--) e = {
			value: arguments[r],
			next: e
		};
		return this.__ownerID ? (this.size = t, this._head = e, this.__hash = void 0, this.__altered = !0, this) : Xe(t, e)
	}, Ye.prototype.pushAll = function(t) {
		if (t = i(t), 0 === t.size) return this;
		ct(t.size);
		var e = this.size,
			r = this._head;
		return t.reverse().forEach(function(t) {
			e++, r = {
				value: t,
				next: r
			}
		}), this.__ownerID ? (this.size = e, this._head = r, this.__hash = void 0, this.__altered = !0, this) : Xe(e, r)
	}, Ye.prototype.pop = function() {
		return this.slice(1)
	}, Ye.prototype.unshift = function() {
		return this.push.apply(this, arguments)
	}, Ye.prototype.unshiftAll = function(t) {
		return this.pushAll(t)
	}, Ye.prototype.shift = function() {
		return this.pop.apply(this, arguments)
	}, Ye.prototype.clear = function() {
		return 0 === this.size ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = !0, this) : Fe()
	}, Ye.prototype.slice = function(t, e) {
		if (m(t, e, this.size)) return this;
		var r = g(t, this.size),
			n = w(e, this.size);
		if (n !== this.size) return nt.prototype.slice.call(this, t, e);
		for (var i = this.size - r, o = this._head; r--;) o = o.next;
		return this.__ownerID ? (this.size = i, this._head = o, this.__hash = void 0, this.__altered = !0, this) : Xe(i, o)
	}, Ye.prototype.__ensureOwner = function(t) {
		return t === this.__ownerID ? this : t ? Xe(this.size, this._head, t, this.__hash) : (this.__ownerID = t, this.__altered = !1, this)
	}, Ye.prototype.__iterate = function(t, e) {
		if (e) return this.reverse().__iterate(t);
		for (var r = 0, n = this._head; n && t(n.value, r++, this) !== !1;) n = n.next;
		return r
	}, Ye.prototype.__iterator = function(t, e) {
		if (e) return this.reverse().__iterator(t);
		var r = 0,
			n = this._head;
		return new z(function() {
			if (n) {
				var e = n.value;
				return n = n.next, I(t, r++, e)
			}
			return b()
		})
	}, Ye.isStack = Qe;
	var on = "@@__IMMUTABLE_STACK__@@",
		un = Ye.prototype;
	un[on] = !0, un.withMutations = Jr.withMutations, un.asMutable = Jr.asMutable, un.asImmutable = Jr.asImmutable, un.wasAltered = Jr.wasAltered;
	var sn;
	r.Iterator = z, Ge(r, {
		toArray: function() {
			ct(this.size);
			var t = Array(this.size || 0);
			return this.valueSeq().__iterate(function(e, r) {
				t[r] = e
			}), t
		},
		toIndexedSeq: function() {
			return new oe(this)
		},
		toJS: function() {
			return this.toSeq().map(function(t) {
				return t && "function" == typeof t.toJS ? t.toJS() : t
			}).__toJS()
		},
		toJSON: function() {
			return this.toSeq().map(function(t) {
				return t && "function" == typeof t.toJSON ? t.toJSON() : t
			}).__toJS()
		},
		toKeyedSeq: function() {
			return new ie(this, !0)
		},
		toMap: function() {
			return _t(this.toKeyedSeq())
		},
		toObject: function() {
			ct(this.size);
			var t = {};
			return this.__iterate(function(e, r) {
				t[r] = e
			}), t
		},
		toOrderedMap: function() {
			return $t(this.toKeyedSeq())
		},
		toOrderedSet: function() {
			return Ne(s(this) ? this.valueSeq() : this)
		},
		toSet: function() {
			return Te(s(this) ? this.valueSeq() : this)
		},
		toSetSeq: function() {
			return new ue(this);
		},
		toSeq: function() {
			return a(this) ? this.toIndexedSeq() : s(this) ? this.toKeyedSeq() : this.toSetSeq()
		},
		toStack: function() {
			return Ye(s(this) ? this.valueSeq() : this)
		},
		toList: function() {
			return Wt(s(this) ? this.valueSeq() : this)
		},
		toString: function() {
			return "[Iterable]"
		},
		__toString: function(t, e) {
			return 0 === this.size ? t + e : t + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + e
		},
		concat: function() {
			var t = ar.call(arguments, 0);
			return qe(this, de(this, t))
		},
		includes: function(t) {
			return this.some(function(e) {
				return F(e, t)
			})
		},
		entries: function() {
			return this.__iterator(zr)
		},
		every: function(t, e) {
			ct(this.size);
			var r = !0;
			return this.__iterate(function(n, i, o) {
				return t.call(e, n, i, o) ? void 0 : (r = !1, !1)
			}), r
		},
		filter: function(t, e) {
			return qe(this, ce(this, t, e, !0))
		},
		find: function(t, e, r) {
			var n = this.findEntry(t, e);
			return n ? n[1] : r
		},
		forEach: function(t, e) {
			return ct(this.size), this.__iterate(e ? t.bind(e) : t)
		},
		join: function(t) {
			ct(this.size), t = void 0 !== t ? "" + t : ",";
			var e = "",
				r = !0;
			return this.__iterate(function(n) {
				r ? r = !1 : e += t, e += null !== n && void 0 !== n ? "" + n : ""
			}), e
		},
		keys: function() {
			return this.__iterator(wr)
		},
		map: function(t, e) {
			return qe(this, he(this, t, e))
		},
		reduce: function(t, e, r) {
			ct(this.size);
			var n, i;
			return arguments.length < 2 ? i = !0 : n = e, this.__iterate(function(e, o, u) {
				i ? (i = !1, n = e) : n = t.call(r, n, e, o, u)
			}), n
		},
		reduceRight: function(t, e, r) {
			var n = this.toKeyedSeq().reverse();
			return n.reduce.apply(n, arguments)
		},
		reverse: function() {
			return qe(this, fe(this, !0))
		},
		slice: function(t, e) {
			return qe(this, ve(this, t, e, !0))
		},
		some: function(t, e) {
			return !this.every(tr(t), e)
		},
		sort: function(t) {
			return qe(this, Se(this, t))
		},
		values: function() {
			return this.__iterator(Sr)
		},
		butLast: function() {
			return this.slice(0, -1)
		},
		isEmpty: function() {
			return void 0 !== this.size ? 0 === this.size : !this.some(function() {
				return !0
			})
		},
		count: function(t, e) {
			return l(t ? this.toSeq().filter(t, e) : this)
		},
		countBy: function(t, e) {
			return _e(this, t, e)
		},
		equals: function(t) {
			return G(this, t)
		},
		entrySeq: function() {
			var t = this;
			if (t._cache) return new R(t._cache);
			var e = t.toSeq().map($e).toIndexedSeq();
			return e.fromEntrySeq = function() {
				return t.toSeq()
			}, e
		},
		filterNot: function(t, e) {
			return this.filter(tr(t), e)
		},
		findEntry: function(t, e, r) {
			var n = r;
			return this.__iterate(function(r, i, o) {
				return t.call(e, r, i, o) ? (n = [i, r], !1) : void 0
			}), n
		},
		findKey: function(t, e) {
			var r = this.findEntry(t, e);
			return r && r[0]
		},
		findLast: function(t, e, r) {
			return this.toKeyedSeq().reverse().find(t, e, r)
		},
		findLastEntry: function(t, e, r) {
			return this.toKeyedSeq().reverse().findEntry(t, e, r)
		},
		findLastKey: function(t, e) {
			return this.toKeyedSeq().reverse().findKey(t, e)
		},
		first: function() {
			return this.find(d)
		},
		flatMap: function(t, e) {
			return qe(this, ge(this, t, e))
		},
		flatten: function(t) {
			return qe(this, me(this, t, !0))
		},
		fromEntrySeq: function() {
			return new se(this)
		},
		get: function(t, e) {
			return this.find(function(e, r) {
				return F(r, t)
			}, void 0, e)
		},
		getIn: function(t, e) {
			for (var r, n = this, i = Ae(t); !(r = i.next()).done;) {
				var o = r.value;
				if (n = n && n.get ? n.get(o, dr) : dr, n === dr) return e
			}
			return n
		},
		groupBy: function(t, e) {
			return pe(this, t, e)
		},
		has: function(t) {
			return this.get(t, dr) !== dr
		},
		hasIn: function(t) {
			return this.getIn(t, dr) !== dr
		},
		isSubset: function(t) {
			return t = "function" == typeof t.includes ? t : r(t), this.every(function(e) {
				return t.includes(e)
			})
		},
		isSuperset: function(t) {
			return t = "function" == typeof t.isSubset ? t : r(t), t.isSubset(this)
		},
		keyOf: function(t) {
			return this.findKey(function(e) {
				return F(e, t)
			})
		},
		keySeq: function() {
			return this.toSeq().map(Ze).toIndexedSeq()
		},
		last: function() {
			return this.toSeq().reverse().first()
		},
		lastKeyOf: function(t) {
			return this.toKeyedSeq().reverse().keyOf(t)
		},
		max: function(t) {
			return ze(this, t)
		},
		maxBy: function(t, e) {
			return ze(this, e, t)
		},
		min: function(t) {
			return ze(this, t ? er(t) : ir)
		},
		minBy: function(t, e) {
			return ze(this, e ? er(e) : ir, t)
		},
		rest: function() {
			return this.slice(1)
		},
		skip: function(t) {
			return this.slice(Math.max(0, t))
		},
		skipLast: function(t) {
			return qe(this, this.toSeq().reverse().skip(t).reverse())
		},
		skipWhile: function(t, e) {
			return qe(this, ye(this, t, e, !0))
		},
		skipUntil: function(t, e) {
			return this.skipWhile(tr(t), e)
		},
		sortBy: function(t, e) {
			return qe(this, Se(this, e, t))
		},
		take: function(t) {
			return this.slice(0, Math.max(0, t))
		},
		takeLast: function(t) {
			return qe(this, this.toSeq().reverse().take(t).reverse());
		},
		takeWhile: function(t, e) {
			return qe(this, le(this, t, e))
		},
		takeUntil: function(t, e) {
			return this.takeWhile(tr(t), e)
		},
		valueSeq: function() {
			return this.toIndexedSeq()
		},
		hashCode: function() {
			return this.__hash || (this.__hash = or(this))
		}
	});
	var an = r.prototype;
	an[hr] = !0, an[qr] = an.values, an.__toJS = an.toArray, an.__toStringMapper = rr, an.inspect = an.toSource = function() {
		return "" + this
	}, an.chain = an.flatMap, an.contains = an.includes, Ge(n, {
		flip: function() {
			return qe(this, ae(this))
		},
		mapEntries: function(t, e) {
			var r = this,
				n = 0;
			return qe(this, this.toSeq().map(function(i, o) {
				return t.call(e, [o, i], n++, r)
			}).fromEntrySeq())
		},
		mapKeys: function(t, e) {
			var r = this;
			return qe(this, this.toSeq().flip().map(function(n, i) {
				return t.call(e, n, i, r)
			}).flip())
		}
	});
	var hn = n.prototype;
	hn[fr] = !0, hn[qr] = an.entries, hn.__toJS = an.toObject, hn.__toStringMapper = function(t, e) {
		return JSON.stringify(e) + ": " + rr(t)
	}, Ge(i, {
		toKeyedSeq: function() {
			return new ie(this, !1)
		},
		filter: function(t, e) {
			return qe(this, ce(this, t, e, !1))
		},
		findIndex: function(t, e) {
			var r = this.findEntry(t, e);
			return r ? r[0] : -1
		},
		indexOf: function(t) {
			var e = this.keyOf(t);
			return void 0 === e ? -1 : e
		},
		lastIndexOf: function(t) {
			var e = this.lastKeyOf(t);
			return void 0 === e ? -1 : e
		},
		reverse: function() {
			return qe(this, fe(this, !1))
		},
		slice: function(t, e) {
			return qe(this, ve(this, t, e, !1))
		},
		splice: function(t, e) {
			var r = arguments.length;
			if (e = Math.max(0 | e, 0), 0 === r || 2 === r && !e) return this;
			t = g(t, 0 > t ? this.count() : this.size);
			var n = this.slice(0, t);
			return qe(this, 1 === r ? n : n.concat(v(arguments, 2), this.slice(t + e)))
		},
		findLastIndex: function(t, e) {
			var r = this.findLastEntry(t, e);
			return r ? r[0] : -1
		},
		first: function() {
			return this.get(0)
		},
		flatten: function(t) {
			return qe(this, me(this, t, !1))
		},
		get: function(t, e) {
			return t = y(this, t), 0 > t || this.size === 1 / 0 || void 0 !== this.size && t > this.size ? e : this.find(function(e, r) {
				return r === t
			}, void 0, e)
		},
		has: function(t) {
			return t = y(this, t), t >= 0 && (void 0 !== this.size ? this.size === 1 / 0 || this.size > t : -1 !== this.indexOf(t))
		},
		interpose: function(t) {
			return qe(this, we(this, t))
		},
		interleave: function() {
			var t = [this].concat(v(arguments)),
				e = be(this.toSeq(), A.of, t),
				r = e.flatten(!0);
			return e.size && (r.size = e.size * t.length),
				qe(this, r)
		},
		keySeq: function() {
			return tt(0, this.size)
		},
		last: function() {
			return this.get(-1)
		},
		skipWhile: function(t, e) {
			return qe(this, ye(this, t, e, !1))
		},
		zip: function() {
			var t = [this].concat(v(arguments));
			return qe(this, be(this, nr, t))
		},
		zipWith: function(t) {
			var e = v(arguments);
			return e[0] = this, qe(this, be(this, t, e))
		}
	}), i.prototype[cr] = !0, i.prototype[_r] = !0, Ge(o, {
		get: function(t, e) {
			return this.has(t) ? t : e
		},
		includes: function(t) {
			return this.has(t)
		},
		keySeq: function() {
			return this.valueSeq()
		}
	}), o.prototype.has = an.includes, o.prototype.contains = o.prototype.includes, Ge(k, n.prototype), Ge(A, i.prototype), Ge(j, o.prototype), Ge(rt, n.prototype), Ge(nt, i.prototype), Ge(it, o.prototype);
	var fn = {
		Iterable: r,
		Seq: x,
		Collection: et,
		Map: _t,
		OrderedMap: $t,
		List: Wt,
		Stack: Ye,
		Set: Te,
		OrderedSet: Ne,
		Record: je,
		Range: tt,
		Repeat: Z,
		is: F,
		fromJS: V
	};
	t["default"] = fn, t.Iterable = r, t.Seq = x, t.Collection = et, t.Map = _t, t.OrderedMap = $t, t.List = Wt, t.Stack = Ye, t.Set = Te, t.OrderedSet = Ne, t.Record = je, t.Range = tt, t.Repeat = Z, t.is = F, t.fromJS = V
});