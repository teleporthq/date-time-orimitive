var G = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, q = { exports: {} };
(function(M, N) {
  (function(b, C) {
    M.exports = C();
  })(G, function() {
    var b = 1e3, C = 6e4, S = 36e5, H = "millisecond", y = "second", w = "minute", h = "hour", l = "day", W = "week", m = "month", p = "quarter", _ = "year", g = "date", z = "Invalid Date", E = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, P = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, X = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(r) {
      var n = ["th", "st", "nd", "rd"], t = r % 100;
      return "[" + r + (n[(t - 20) % 10] || n[t] || n[0]) + "]";
    } }, x = function(r, n, t) {
      var i = String(r);
      return !i || i.length >= n ? r : "" + Array(n + 1 - i.length).join(t) + r;
    }, B = { s: x, z: function(r) {
      var n = -r.utcOffset(), t = Math.abs(n), i = Math.floor(t / 60), e = t % 60;
      return (n <= 0 ? "+" : "-") + x(i, 2, "0") + ":" + x(e, 2, "0");
    }, m: function r(n, t) {
      if (n.date() < t.date())
        return -r(t, n);
      var i = 12 * (t.year() - n.year()) + (t.month() - n.month()), e = n.clone().add(i, m), a = t - e < 0, s = n.clone().add(i + (a ? -1 : 1), m);
      return +(-(i + (t - e) / (a ? e - s : s - e)) || 0);
    }, a: function(r) {
      return r < 0 ? Math.ceil(r) || 0 : Math.floor(r);
    }, p: function(r) {
      return { M: m, y: _, w: W, d: l, D: g, h, m: w, s: y, ms: H, Q: p }[r] || String(r || "").toLowerCase().replace(/s$/, "");
    }, u: function(r) {
      return r === void 0;
    } }, k = "en", Y = {};
    Y[k] = X;
    var V = function(r) {
      return r instanceof I;
    }, F = function r(n, t, i) {
      var e;
      if (!n)
        return k;
      if (typeof n == "string") {
        var a = n.toLowerCase();
        Y[a] && (e = a), t && (Y[a] = t, e = a);
        var s = n.split("-");
        if (!e && s.length > 1)
          return r(s[0]);
      } else {
        var u = n.name;
        Y[u] = n, e = u;
      }
      return !i && e && (k = e), e || !i && k;
    }, c = function(r, n) {
      if (V(r))
        return r.clone();
      var t = typeof n == "object" ? n : {};
      return t.date = r, t.args = arguments, new I(t);
    }, o = B;
    o.l = F, o.i = V, o.w = function(r, n) {
      return c(r, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var I = function() {
      function r(t) {
        this.$L = F(t.locale, null, !0), this.parse(t);
      }
      var n = r.prototype;
      return n.parse = function(t) {
        this.$d = function(i) {
          var e = i.date, a = i.utc;
          if (e === null)
            return new Date(NaN);
          if (o.u(e))
            return new Date();
          if (e instanceof Date)
            return new Date(e);
          if (typeof e == "string" && !/Z$/i.test(e)) {
            var s = e.match(E);
            if (s) {
              var u = s[2] - 1 || 0, d = (s[7] || "0").substring(0, 3);
              return a ? new Date(Date.UTC(s[1], u, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, d)) : new Date(s[1], u, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, d);
            }
          }
          return new Date(e);
        }(t), this.$x = t.x || {}, this.init();
      }, n.init = function() {
        var t = this.$d;
        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
      }, n.$utils = function() {
        return o;
      }, n.isValid = function() {
        return this.$d.toString() !== z;
      }, n.isSame = function(t, i) {
        var e = c(t);
        return this.startOf(i) <= e && e <= this.endOf(i);
      }, n.isAfter = function(t, i) {
        return c(t) < this.startOf(i);
      }, n.isBefore = function(t, i) {
        return this.endOf(i) < c(t);
      }, n.$g = function(t, i, e) {
        return o.u(t) ? this[i] : this.set(e, t);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(t, i) {
        var e = this, a = !!o.u(i) || i, s = o.p(t), u = function(L, v) {
          var T = o.w(e.$u ? Date.UTC(e.$y, v, L) : new Date(e.$y, v, L), e);
          return a ? T : T.endOf(l);
        }, d = function(L, v) {
          return o.w(e.toDate()[L].apply(e.toDate("s"), (a ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(v)), e);
        }, f = this.$W, $ = this.$M, O = this.$D, D = "set" + (this.$u ? "UTC" : "");
        switch (s) {
          case _:
            return a ? u(1, 0) : u(31, 11);
          case m:
            return a ? u(1, $) : u(0, $ + 1);
          case W:
            var A = this.$locale().weekStart || 0, U = (f < A ? f + 7 : f) - A;
            return u(a ? O - U : O + (6 - U), $);
          case l:
          case g:
            return d(D + "Hours", 0);
          case h:
            return d(D + "Minutes", 1);
          case w:
            return d(D + "Seconds", 2);
          case y:
            return d(D + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(t) {
        return this.startOf(t, !1);
      }, n.$set = function(t, i) {
        var e, a = o.p(t), s = "set" + (this.$u ? "UTC" : ""), u = (e = {}, e[l] = s + "Date", e[g] = s + "Date", e[m] = s + "Month", e[_] = s + "FullYear", e[h] = s + "Hours", e[w] = s + "Minutes", e[y] = s + "Seconds", e[H] = s + "Milliseconds", e)[a], d = a === l ? this.$D + (i - this.$W) : i;
        if (a === m || a === _) {
          var f = this.clone().set(g, 1);
          f.$d[u](d), f.init(), this.$d = f.set(g, Math.min(this.$D, f.daysInMonth())).$d;
        } else
          u && this.$d[u](d);
        return this.init(), this;
      }, n.set = function(t, i) {
        return this.clone().$set(t, i);
      }, n.get = function(t) {
        return this[o.p(t)]();
      }, n.add = function(t, i) {
        var e, a = this;
        t = Number(t);
        var s = o.p(i), u = function($) {
          var O = c(a);
          return o.w(O.date(O.date() + Math.round($ * t)), a);
        };
        if (s === m)
          return this.set(m, this.$M + t);
        if (s === _)
          return this.set(_, this.$y + t);
        if (s === l)
          return u(1);
        if (s === W)
          return u(7);
        var d = (e = {}, e[w] = C, e[h] = S, e[y] = b, e)[s] || 1, f = this.$d.getTime() + t * d;
        return o.w(f, this);
      }, n.subtract = function(t, i) {
        return this.add(-1 * t, i);
      }, n.format = function(t) {
        var i = this, e = this.$locale();
        if (!this.isValid())
          return e.invalidDate || z;
        var a = t || "YYYY-MM-DDTHH:mm:ssZ", s = o.z(this), u = this.$H, d = this.$m, f = this.$M, $ = e.weekdays, O = e.months, D = function(v, T, j, R) {
          return v && (v[T] || v(i, a)) || j[T].slice(0, R);
        }, A = function(v) {
          return o.s(u % 12 || 12, v, "0");
        }, U = e.meridiem || function(v, T, j) {
          var R = v < 12 ? "AM" : "PM";
          return j ? R.toLowerCase() : R;
        }, L = { YY: String(this.$y).slice(-2), YYYY: o.s(this.$y, 4, "0"), M: f + 1, MM: o.s(f + 1, 2, "0"), MMM: D(e.monthsShort, f, O, 3), MMMM: D(O, f), D: this.$D, DD: o.s(this.$D, 2, "0"), d: String(this.$W), dd: D(e.weekdaysMin, this.$W, $, 2), ddd: D(e.weekdaysShort, this.$W, $, 3), dddd: $[this.$W], H: String(u), HH: o.s(u, 2, "0"), h: A(1), hh: A(2), a: U(u, d, !0), A: U(u, d, !1), m: String(d), mm: o.s(d, 2, "0"), s: String(this.$s), ss: o.s(this.$s, 2, "0"), SSS: o.s(this.$ms, 3, "0"), Z: s };
        return a.replace(P, function(v, T) {
          return T || L[v] || s.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(t, i, e) {
        var a, s = o.p(i), u = c(t), d = (u.utcOffset() - this.utcOffset()) * C, f = this - u, $ = o.m(this, u);
        return $ = (a = {}, a[_] = $ / 12, a[m] = $, a[p] = $ / 3, a[W] = (f - d) / 6048e5, a[l] = (f - d) / 864e5, a[h] = f / S, a[w] = f / C, a[y] = f / b, a)[s] || f, e ? $ : o.a($);
      }, n.daysInMonth = function() {
        return this.endOf(m).$D;
      }, n.$locale = function() {
        return Y[this.$L];
      }, n.locale = function(t, i) {
        if (!t)
          return this.$L;
        var e = this.clone(), a = F(t, i, !0);
        return a && (e.$L = a), e;
      }, n.clone = function() {
        return o.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, r;
    }(), J = I.prototype;
    return c.prototype = J, [["$ms", H], ["$s", y], ["$m", w], ["$H", h], ["$W", l], ["$M", m], ["$y", _], ["$D", g]].forEach(function(r) {
      J[r[1]] = function(n) {
        return this.$g(n, r[0], r[1]);
      };
    }), c.extend = function(r, n) {
      return r.$i || (r(n, I, c), r.$i = !0), c;
    }, c.locale = F, c.isDayjs = V, c.unix = function(r) {
      return c(1e3 * r);
    }, c.en = Y[k], c.Ls = Y, c.p = {}, c;
  });
})(q);
const Z = q.exports;
function Q(M, N, b, C, S, H, y, w) {
  var h = typeof M == "function" ? M.options : M;
  N && (h.render = N, h.staticRenderFns = b, h._compiled = !0), C && (h.functional = !0), H && (h._scopeId = "data-v-" + H);
  var l;
  if (y ? (l = function(p) {
    p = p || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !p && typeof __VUE_SSR_CONTEXT__ < "u" && (p = __VUE_SSR_CONTEXT__), S && S.call(this, p), p && p._registeredComponents && p._registeredComponents.add(y);
  }, h._ssrRegister = l) : S && (l = w ? function() {
    S.call(
      this,
      (h.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : S), l)
    if (h.functional) {
      h._injectStyles = l;
      var W = h.render;
      h.render = function(_, g) {
        return l.call(g), W(_, g);
      };
    } else {
      var m = h.beforeCreate;
      h.beforeCreate = m ? [].concat(m, l) : [l];
    }
  return {
    exports: M,
    options: h
  };
}
const K = {
  name: "DateTimePrimitive",
  props: {
    date: { type: [String, Date, Number], required: !0 },
    format: { type: String, default: "DD/MM/YYYY" }
  },
  created() {
    this.formatDate();
  },
  methods: {
    formatDate() {
      const M = Z.unix(new Date(date).getTime() / 1e3);
      this.formattedDate = Z(M).format(format);
    }
  },
  watch: {
    date() {
      this.formatDate();
    },
    format() {
      this.formatDate();
    }
  }
};
var tt = function() {
  var N = this, b = N._self._c;
  return b("div");
}, et = [], nt = /* @__PURE__ */ Q(
  K,
  tt,
  et,
  !1,
  null,
  null,
  null,
  null
);
const rt = nt.exports;
export {
  rt as default
};
