import { toDisplayString as K } from "vue";
var R = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function X($) {
  return $ && $.__esModule && Object.prototype.hasOwnProperty.call($, "default") ? $.default : $;
}
var V = { exports: {} };
(function($, N) {
  (function(S, y) {
    $.exports = y();
  })(R, function() {
    var S = 1e3, y = 6e4, _ = 36e5, L = "millisecond", O = "second", T = "minute", b = "hour", D = "day", W = "week", m = "month", Z = "quarter", M = "year", Y = "date", z = "Invalid Date", q = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, B = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, G = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(r) {
      var n = ["th", "st", "nd", "rd"], t = r % 100;
      return "[" + r + (n[(t - 20) % 10] || n[t] || n[0]) + "]";
    } }, F = function(r, n, t) {
      var i = String(r);
      return !i || i.length >= n ? r : "" + Array(n + 1 - i.length).join(t) + r;
    }, Q = { s: F, z: function(r) {
      var n = -r.utcOffset(), t = Math.abs(n), i = Math.floor(t / 60), e = t % 60;
      return (n <= 0 ? "+" : "-") + F(i, 2, "0") + ":" + F(e, 2, "0");
    }, m: function r(n, t) {
      if (n.date() < t.date())
        return -r(t, n);
      var i = 12 * (t.year() - n.year()) + (t.month() - n.month()), e = n.clone().add(i, m), a = t - e < 0, s = n.clone().add(i + (a ? -1 : 1), m);
      return +(-(i + (t - e) / (a ? e - s : s - e)) || 0);
    }, a: function(r) {
      return r < 0 ? Math.ceil(r) || 0 : Math.floor(r);
    }, p: function(r) {
      return { M: m, y: M, w: W, d: D, D: Y, h: b, m: T, s: O, ms: L, Q: Z }[r] || String(r || "").toLowerCase().replace(/s$/, "");
    }, u: function(r) {
      return r === void 0;
    } }, H = "en", w = {};
    w[H] = G;
    var U = function(r) {
      return r instanceof A;
    }, k = function r(n, t, i) {
      var e;
      if (!n)
        return H;
      if (typeof n == "string") {
        var a = n.toLowerCase();
        w[a] && (e = a), t && (w[a] = t, e = a);
        var s = n.split("-");
        if (!e && s.length > 1)
          return r(s[0]);
      } else {
        var u = n.name;
        w[u] = n, e = u;
      }
      return !i && e && (H = e), e || !i && H;
    }, h = function(r, n) {
      if (U(r))
        return r.clone();
      var t = typeof n == "object" ? n : {};
      return t.date = r, t.args = arguments, new A(t);
    }, o = Q;
    o.l = k, o.i = U, o.w = function(r, n) {
      return h(r, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var A = function() {
      function r(t) {
        this.$L = k(t.locale, null, !0), this.parse(t);
      }
      var n = r.prototype;
      return n.parse = function(t) {
        this.$d = function(i) {
          var e = i.date, a = i.utc;
          if (e === null)
            return /* @__PURE__ */ new Date(NaN);
          if (o.u(e))
            return /* @__PURE__ */ new Date();
          if (e instanceof Date)
            return new Date(e);
          if (typeof e == "string" && !/Z$/i.test(e)) {
            var s = e.match(q);
            if (s) {
              var u = s[2] - 1 || 0, c = (s[7] || "0").substring(0, 3);
              return a ? new Date(Date.UTC(s[1], u, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, c)) : new Date(s[1], u, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, c);
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
        var e = h(t);
        return this.startOf(i) <= e && e <= this.endOf(i);
      }, n.isAfter = function(t, i) {
        return h(t) < this.startOf(i);
      }, n.isBefore = function(t, i) {
        return this.endOf(i) < h(t);
      }, n.$g = function(t, i, e) {
        return o.u(t) ? this[i] : this.set(e, t);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(t, i) {
        var e = this, a = !!o.u(i) || i, s = o.p(t), u = function(x, l) {
          var v = o.w(e.$u ? Date.UTC(e.$y, l, x) : new Date(e.$y, l, x), e);
          return a ? v : v.endOf(D);
        }, c = function(x, l) {
          return o.w(e.toDate()[x].apply(e.toDate("s"), (a ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(l)), e);
        }, f = this.$W, d = this.$M, g = this.$D, p = "set" + (this.$u ? "UTC" : "");
        switch (s) {
          case M:
            return a ? u(1, 0) : u(31, 11);
          case m:
            return a ? u(1, d) : u(0, d + 1);
          case W:
            var j = this.$locale().weekStart || 0, C = (f < j ? f + 7 : f) - j;
            return u(a ? g - C : g + (6 - C), d);
          case D:
          case Y:
            return c(p + "Hours", 0);
          case b:
            return c(p + "Minutes", 1);
          case T:
            return c(p + "Seconds", 2);
          case O:
            return c(p + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(t) {
        return this.startOf(t, !1);
      }, n.$set = function(t, i) {
        var e, a = o.p(t), s = "set" + (this.$u ? "UTC" : ""), u = (e = {}, e[D] = s + "Date", e[Y] = s + "Date", e[m] = s + "Month", e[M] = s + "FullYear", e[b] = s + "Hours", e[T] = s + "Minutes", e[O] = s + "Seconds", e[L] = s + "Milliseconds", e)[a], c = a === D ? this.$D + (i - this.$W) : i;
        if (a === m || a === M) {
          var f = this.clone().set(Y, 1);
          f.$d[u](c), f.init(), this.$d = f.set(Y, Math.min(this.$D, f.daysInMonth())).$d;
        } else
          u && this.$d[u](c);
        return this.init(), this;
      }, n.set = function(t, i) {
        return this.clone().$set(t, i);
      }, n.get = function(t) {
        return this[o.p(t)]();
      }, n.add = function(t, i) {
        var e, a = this;
        t = Number(t);
        var s = o.p(i), u = function(d) {
          var g = h(a);
          return o.w(g.date(g.date() + Math.round(d * t)), a);
        };
        if (s === m)
          return this.set(m, this.$M + t);
        if (s === M)
          return this.set(M, this.$y + t);
        if (s === D)
          return u(1);
        if (s === W)
          return u(7);
        var c = (e = {}, e[T] = y, e[b] = _, e[O] = S, e)[s] || 1, f = this.$d.getTime() + t * c;
        return o.w(f, this);
      }, n.subtract = function(t, i) {
        return this.add(-1 * t, i);
      }, n.format = function(t) {
        var i = this, e = this.$locale();
        if (!this.isValid())
          return e.invalidDate || z;
        var a = t || "YYYY-MM-DDTHH:mm:ssZ", s = o.z(this), u = this.$H, c = this.$m, f = this.$M, d = e.weekdays, g = e.months, p = function(l, v, J, I) {
          return l && (l[v] || l(i, a)) || J[v].slice(0, I);
        }, j = function(l) {
          return o.s(u % 12 || 12, l, "0");
        }, C = e.meridiem || function(l, v, J) {
          var I = l < 12 ? "AM" : "PM";
          return J ? I.toLowerCase() : I;
        }, x = { YY: String(this.$y).slice(-2), YYYY: o.s(this.$y, 4, "0"), M: f + 1, MM: o.s(f + 1, 2, "0"), MMM: p(e.monthsShort, f, g, 3), MMMM: p(g, f), D: this.$D, DD: o.s(this.$D, 2, "0"), d: String(this.$W), dd: p(e.weekdaysMin, this.$W, d, 2), ddd: p(e.weekdaysShort, this.$W, d, 3), dddd: d[this.$W], H: String(u), HH: o.s(u, 2, "0"), h: j(1), hh: j(2), a: C(u, c, !0), A: C(u, c, !1), m: String(c), mm: o.s(c, 2, "0"), s: String(this.$s), ss: o.s(this.$s, 2, "0"), SSS: o.s(this.$ms, 3, "0"), Z: s };
        return a.replace(B, function(l, v) {
          return v || x[l] || s.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(t, i, e) {
        var a, s = o.p(i), u = h(t), c = (u.utcOffset() - this.utcOffset()) * y, f = this - u, d = o.m(this, u);
        return d = (a = {}, a[M] = d / 12, a[m] = d, a[Z] = d / 3, a[W] = (f - c) / 6048e5, a[D] = (f - c) / 864e5, a[b] = f / _, a[T] = f / y, a[O] = f / S, a)[s] || f, e ? d : o.a(d);
      }, n.daysInMonth = function() {
        return this.endOf(m).$D;
      }, n.$locale = function() {
        return w[this.$L];
      }, n.locale = function(t, i) {
        if (!t)
          return this.$L;
        var e = this.clone(), a = k(t, i, !0);
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
    }(), E = A.prototype;
    return h.prototype = E, [["$ms", L], ["$s", O], ["$m", T], ["$H", b], ["$W", D], ["$M", m], ["$y", M], ["$D", Y]].forEach(function(r) {
      E[r[1]] = function(n) {
        return this.$g(n, r[0], r[1]);
      };
    }), h.extend = function(r, n) {
      return r.$i || (r(n, A, h), r.$i = !0), h;
    }, h.locale = k, h.isDayjs = U, h.unix = function(r) {
      return h(1e3 * r);
    }, h.en = w[H], h.Ls = w, h.p = {}, h;
  });
})(V);
var tt = V.exports;
const P = /* @__PURE__ */ X(tt), et = ($, N) => {
  const S = $.__vccOpts || $;
  for (const [y, _] of N)
    S[y] = _;
  return S;
}, nt = {
  name: "DateTimePrimitive",
  props: {
    date: { type: [String, Date, Number], required: !0 },
    format: { type: String, default: "DD/MM/YYYY" }
  },
  data() {
    return {
      formattedDate: ""
    };
  },
  created() {
    this.formatDate();
  },
  methods: {
    formatDate() {
      const $ = P.unix(new Date(date).getTime() / 1e3);
      this.formattedDate = P($).format(format);
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
function rt($, N, S, y, _, L) {
  return K(_.formattedDate);
}
const st = /* @__PURE__ */ et(nt, [["render", rt]]);
export {
  st as default
};
