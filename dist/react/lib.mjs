import E from "react";
var K = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, q = { exports: {} };
(function(j, U) {
  (function(b, D) {
    j.exports = D();
  })(K, function() {
    var b = 1e3, D = 6e4, J = 36e5, k = "millisecond", S = "second", w = "minute", O = "hour", M = "day", L = "week", $ = "month", Z = "quarter", y = "year", _ = "date", z = "Invalid Date", B = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, G = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Q = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(i) {
      var e = ["th", "st", "nd", "rd"], t = i % 100;
      return "[" + i + (e[(t - 20) % 10] || e[t] || e[0]) + "]";
    } }, I = function(i, e, t) {
      var r = String(i);
      return !r || r.length >= e ? i : "" + Array(e + 1 - r.length).join(t) + i;
    }, R = { s: I, z: function(i) {
      var e = -i.utcOffset(), t = Math.abs(e), r = Math.floor(t / 60), n = t % 60;
      return (e <= 0 ? "+" : "-") + I(r, 2, "0") + ":" + I(n, 2, "0");
    }, m: function i(e, t) {
      if (e.date() < t.date())
        return -i(t, e);
      var r = 12 * (t.year() - e.year()) + (t.month() - e.month()), n = e.clone().add(r, $), u = t - n < 0, s = e.clone().add(r + (u ? -1 : 1), $);
      return +(-(r + (t - n) / (u ? n - s : s - n)) || 0);
    }, a: function(i) {
      return i < 0 ? Math.ceil(i) || 0 : Math.floor(i);
    }, p: function(i) {
      return { M: $, y, w: L, d: M, D: _, h: O, m: w, s: S, ms: k, Q: Z }[i] || String(i || "").toLowerCase().replace(/s$/, "");
    }, u: function(i) {
      return i === void 0;
    } }, x = "en", p = {};
    p[x] = Q;
    var F = function(i) {
      return i instanceof C;
    }, W = function i(e, t, r) {
      var n;
      if (!e)
        return x;
      if (typeof e == "string") {
        var u = e.toLowerCase();
        p[u] && (n = u), t && (p[u] = t, n = u);
        var s = e.split("-");
        if (!n && s.length > 1)
          return i(s[0]);
      } else {
        var o = e.name;
        p[o] = e, n = o;
      }
      return !r && n && (x = n), n || !r && x;
    }, c = function(i, e) {
      if (F(i))
        return i.clone();
      var t = typeof e == "object" ? e : {};
      return t.date = i, t.args = arguments, new C(t);
    }, a = R;
    a.l = W, a.i = F, a.w = function(i, e) {
      return c(i, { locale: e.$L, utc: e.$u, x: e.$x, $offset: e.$offset });
    };
    var C = function() {
      function i(t) {
        this.$L = W(t.locale, null, !0), this.parse(t);
      }
      var e = i.prototype;
      return e.parse = function(t) {
        this.$d = function(r) {
          var n = r.date, u = r.utc;
          if (n === null)
            return new Date(NaN);
          if (a.u(n))
            return new Date();
          if (n instanceof Date)
            return new Date(n);
          if (typeof n == "string" && !/Z$/i.test(n)) {
            var s = n.match(B);
            if (s) {
              var o = s[2] - 1 || 0, h = (s[7] || "0").substring(0, 3);
              return u ? new Date(Date.UTC(s[1], o, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, h)) : new Date(s[1], o, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, h);
            }
          }
          return new Date(n);
        }(t), this.$x = t.x || {}, this.init();
      }, e.init = function() {
        var t = this.$d;
        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
      }, e.$utils = function() {
        return a;
      }, e.isValid = function() {
        return this.$d.toString() !== z;
      }, e.isSame = function(t, r) {
        var n = c(t);
        return this.startOf(r) <= n && n <= this.endOf(r);
      }, e.isAfter = function(t, r) {
        return c(t) < this.startOf(r);
      }, e.isBefore = function(t, r) {
        return this.endOf(r) < c(t);
      }, e.$g = function(t, r, n) {
        return a.u(t) ? this[r] : this.set(n, t);
      }, e.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, e.valueOf = function() {
        return this.$d.getTime();
      }, e.startOf = function(t, r) {
        var n = this, u = !!a.u(r) || r, s = a.p(t), o = function(T, l) {
          var g = a.w(n.$u ? Date.UTC(n.$y, l, T) : new Date(n.$y, l, T), n);
          return u ? g : g.endOf(M);
        }, h = function(T, l) {
          return a.w(n.toDate()[T].apply(n.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(l)), n);
        }, f = this.$W, d = this.$M, v = this.$D, m = "set" + (this.$u ? "UTC" : "");
        switch (s) {
          case y:
            return u ? o(1, 0) : o(31, 11);
          case $:
            return u ? o(1, d) : o(0, d + 1);
          case L:
            var Y = this.$locale().weekStart || 0, H = (f < Y ? f + 7 : f) - Y;
            return o(u ? v - H : v + (6 - H), d);
          case M:
          case _:
            return h(m + "Hours", 0);
          case O:
            return h(m + "Minutes", 1);
          case w:
            return h(m + "Seconds", 2);
          case S:
            return h(m + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, e.endOf = function(t) {
        return this.startOf(t, !1);
      }, e.$set = function(t, r) {
        var n, u = a.p(t), s = "set" + (this.$u ? "UTC" : ""), o = (n = {}, n[M] = s + "Date", n[_] = s + "Date", n[$] = s + "Month", n[y] = s + "FullYear", n[O] = s + "Hours", n[w] = s + "Minutes", n[S] = s + "Seconds", n[k] = s + "Milliseconds", n)[u], h = u === M ? this.$D + (r - this.$W) : r;
        if (u === $ || u === y) {
          var f = this.clone().set(_, 1);
          f.$d[o](h), f.init(), this.$d = f.set(_, Math.min(this.$D, f.daysInMonth())).$d;
        } else
          o && this.$d[o](h);
        return this.init(), this;
      }, e.set = function(t, r) {
        return this.clone().$set(t, r);
      }, e.get = function(t) {
        return this[a.p(t)]();
      }, e.add = function(t, r) {
        var n, u = this;
        t = Number(t);
        var s = a.p(r), o = function(d) {
          var v = c(u);
          return a.w(v.date(v.date() + Math.round(d * t)), u);
        };
        if (s === $)
          return this.set($, this.$M + t);
        if (s === y)
          return this.set(y, this.$y + t);
        if (s === M)
          return o(1);
        if (s === L)
          return o(7);
        var h = (n = {}, n[w] = D, n[O] = J, n[S] = b, n)[s] || 1, f = this.$d.getTime() + t * h;
        return a.w(f, this);
      }, e.subtract = function(t, r) {
        return this.add(-1 * t, r);
      }, e.format = function(t) {
        var r = this, n = this.$locale();
        if (!this.isValid())
          return n.invalidDate || z;
        var u = t || "YYYY-MM-DDTHH:mm:ssZ", s = a.z(this), o = this.$H, h = this.$m, f = this.$M, d = n.weekdays, v = n.months, m = function(l, g, N, A) {
          return l && (l[g] || l(r, u)) || N[g].slice(0, A);
        }, Y = function(l) {
          return a.s(o % 12 || 12, l, "0");
        }, H = n.meridiem || function(l, g, N) {
          var A = l < 12 ? "AM" : "PM";
          return N ? A.toLowerCase() : A;
        }, T = { YY: String(this.$y).slice(-2), YYYY: a.s(this.$y, 4, "0"), M: f + 1, MM: a.s(f + 1, 2, "0"), MMM: m(n.monthsShort, f, v, 3), MMMM: m(v, f), D: this.$D, DD: a.s(this.$D, 2, "0"), d: String(this.$W), dd: m(n.weekdaysMin, this.$W, d, 2), ddd: m(n.weekdaysShort, this.$W, d, 3), dddd: d[this.$W], H: String(o), HH: a.s(o, 2, "0"), h: Y(1), hh: Y(2), a: H(o, h, !0), A: H(o, h, !1), m: String(h), mm: a.s(h, 2, "0"), s: String(this.$s), ss: a.s(this.$s, 2, "0"), SSS: a.s(this.$ms, 3, "0"), Z: s };
        return u.replace(G, function(l, g) {
          return g || T[l] || s.replace(":", "");
        });
      }, e.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, e.diff = function(t, r, n) {
        var u, s = a.p(r), o = c(t), h = (o.utcOffset() - this.utcOffset()) * D, f = this - o, d = a.m(this, o);
        return d = (u = {}, u[y] = d / 12, u[$] = d, u[Z] = d / 3, u[L] = (f - h) / 6048e5, u[M] = (f - h) / 864e5, u[O] = f / J, u[w] = f / D, u[S] = f / b, u)[s] || f, n ? d : a.a(d);
      }, e.daysInMonth = function() {
        return this.endOf($).$D;
      }, e.$locale = function() {
        return p[this.$L];
      }, e.locale = function(t, r) {
        if (!t)
          return this.$L;
        var n = this.clone(), u = W(t, r, !0);
        return u && (n.$L = u), n;
      }, e.clone = function() {
        return a.w(this.$d, this);
      }, e.toDate = function() {
        return new Date(this.valueOf());
      }, e.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, e.toISOString = function() {
        return this.$d.toISOString();
      }, e.toString = function() {
        return this.$d.toUTCString();
      }, i;
    }(), V = C.prototype;
    return c.prototype = V, [["$ms", k], ["$s", S], ["$m", w], ["$H", O], ["$W", M], ["$M", $], ["$y", y], ["$D", _]].forEach(function(i) {
      V[i[1]] = function(e) {
        return this.$g(e, i[0], i[1]);
      };
    }), c.extend = function(i, e) {
      return i.$i || (i(e, C, c), i.$i = !0), c;
    }, c.locale = W, c.isDayjs = F, c.unix = function(i) {
      return c(1e3 * i);
    }, c.en = p[x], c.Ls = p, c.p = {}, c;
  });
})(q);
const P = q.exports, tt = ({ date: j, format: U }) => {
  const b = P.unix(new Date(j).getTime() / 1e3), D = P(b).format(U);
  return /* @__PURE__ */ E.createElement(E.Fragment, null, D);
};
export {
  tt as default
};
