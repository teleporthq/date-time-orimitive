import P from "react";
var K = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function X(m) {
  return m && m.__esModule && Object.prototype.hasOwnProperty.call(m, "default") ? m.default : m;
}
var q = { exports: {} };
(function(m, U) {
  (function(Y, D) {
    m.exports = D();
  })(K, function() {
    var Y = 1e3, D = 6e4, E = 36e5, k = "millisecond", w = "second", O = "minute", _ = "hour", M = "day", C = "week", $ = "month", J = "quarter", v = "year", T = "date", Z = "Invalid Date", B = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, G = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Q = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(r) {
      var e = ["th", "st", "nd", "rd"], t = r % 100;
      return "[" + r + (e[(t - 20) % 10] || e[t] || e[0]) + "]";
    } }, F = function(r, e, t) {
      var i = String(r);
      return !i || i.length >= e ? r : "" + Array(e + 1 - i.length).join(t) + r;
    }, R = { s: F, z: function(r) {
      var e = -r.utcOffset(), t = Math.abs(e), i = Math.floor(t / 60), n = t % 60;
      return (e <= 0 ? "+" : "-") + F(i, 2, "0") + ":" + F(n, 2, "0");
    }, m: function r(e, t) {
      if (e.date() < t.date())
        return -r(t, e);
      var i = 12 * (t.year() - e.year()) + (t.month() - e.month()), n = e.clone().add(i, $), u = t - n < 0, s = e.clone().add(i + (u ? -1 : 1), $);
      return +(-(i + (t - n) / (u ? n - s : s - n)) || 0);
    }, a: function(r) {
      return r < 0 ? Math.ceil(r) || 0 : Math.floor(r);
    }, p: function(r) {
      return { M: $, y: v, w: C, d: M, D: T, h: _, m: O, s: w, ms: k, Q: J }[r] || String(r || "").toLowerCase().replace(/s$/, "");
    }, u: function(r) {
      return r === void 0;
    } }, H = "en", S = {};
    S[H] = Q;
    var I = function(r) {
      return r instanceof W;
    }, L = function r(e, t, i) {
      var n;
      if (!e)
        return H;
      if (typeof e == "string") {
        var u = e.toLowerCase();
        S[u] && (n = u), t && (S[u] = t, n = u);
        var s = e.split("-");
        if (!n && s.length > 1)
          return r(s[0]);
      } else {
        var o = e.name;
        S[o] = e, n = o;
      }
      return !i && n && (H = n), n || !i && H;
    }, c = function(r, e) {
      if (I(r))
        return r.clone();
      var t = typeof e == "object" ? e : {};
      return t.date = r, t.args = arguments, new W(t);
    }, a = R;
    a.l = L, a.i = I, a.w = function(r, e) {
      return c(r, { locale: e.$L, utc: e.$u, x: e.$x, $offset: e.$offset });
    };
    var W = function() {
      function r(t) {
        this.$L = L(t.locale, null, !0), this.parse(t);
      }
      var e = r.prototype;
      return e.parse = function(t) {
        this.$d = function(i) {
          var n = i.date, u = i.utc;
          if (n === null)
            return /* @__PURE__ */ new Date(NaN);
          if (a.u(n))
            return /* @__PURE__ */ new Date();
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
        return this.$d.toString() !== Z;
      }, e.isSame = function(t, i) {
        var n = c(t);
        return this.startOf(i) <= n && n <= this.endOf(i);
      }, e.isAfter = function(t, i) {
        return c(t) < this.startOf(i);
      }, e.isBefore = function(t, i) {
        return this.endOf(i) < c(t);
      }, e.$g = function(t, i, n) {
        return a.u(t) ? this[i] : this.set(n, t);
      }, e.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, e.valueOf = function() {
        return this.$d.getTime();
      }, e.startOf = function(t, i) {
        var n = this, u = !!a.u(i) || i, s = a.p(t), o = function(b, l) {
          var p = a.w(n.$u ? Date.UTC(n.$y, l, b) : new Date(n.$y, l, b), n);
          return u ? p : p.endOf(M);
        }, h = function(b, l) {
          return a.w(n.toDate()[b].apply(n.toDate("s"), (u ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(l)), n);
        }, f = this.$W, d = this.$M, g = this.$D, y = "set" + (this.$u ? "UTC" : "");
        switch (s) {
          case v:
            return u ? o(1, 0) : o(31, 11);
          case $:
            return u ? o(1, d) : o(0, d + 1);
          case C:
            var x = this.$locale().weekStart || 0, j = (f < x ? f + 7 : f) - x;
            return o(u ? g - j : g + (6 - j), d);
          case M:
          case T:
            return h(y + "Hours", 0);
          case _:
            return h(y + "Minutes", 1);
          case O:
            return h(y + "Seconds", 2);
          case w:
            return h(y + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, e.endOf = function(t) {
        return this.startOf(t, !1);
      }, e.$set = function(t, i) {
        var n, u = a.p(t), s = "set" + (this.$u ? "UTC" : ""), o = (n = {}, n[M] = s + "Date", n[T] = s + "Date", n[$] = s + "Month", n[v] = s + "FullYear", n[_] = s + "Hours", n[O] = s + "Minutes", n[w] = s + "Seconds", n[k] = s + "Milliseconds", n)[u], h = u === M ? this.$D + (i - this.$W) : i;
        if (u === $ || u === v) {
          var f = this.clone().set(T, 1);
          f.$d[o](h), f.init(), this.$d = f.set(T, Math.min(this.$D, f.daysInMonth())).$d;
        } else
          o && this.$d[o](h);
        return this.init(), this;
      }, e.set = function(t, i) {
        return this.clone().$set(t, i);
      }, e.get = function(t) {
        return this[a.p(t)]();
      }, e.add = function(t, i) {
        var n, u = this;
        t = Number(t);
        var s = a.p(i), o = function(d) {
          var g = c(u);
          return a.w(g.date(g.date() + Math.round(d * t)), u);
        };
        if (s === $)
          return this.set($, this.$M + t);
        if (s === v)
          return this.set(v, this.$y + t);
        if (s === M)
          return o(1);
        if (s === C)
          return o(7);
        var h = (n = {}, n[O] = D, n[_] = E, n[w] = Y, n)[s] || 1, f = this.$d.getTime() + t * h;
        return a.w(f, this);
      }, e.subtract = function(t, i) {
        return this.add(-1 * t, i);
      }, e.format = function(t) {
        var i = this, n = this.$locale();
        if (!this.isValid())
          return n.invalidDate || Z;
        var u = t || "YYYY-MM-DDTHH:mm:ssZ", s = a.z(this), o = this.$H, h = this.$m, f = this.$M, d = n.weekdays, g = n.months, y = function(l, p, N, A) {
          return l && (l[p] || l(i, u)) || N[p].slice(0, A);
        }, x = function(l) {
          return a.s(o % 12 || 12, l, "0");
        }, j = n.meridiem || function(l, p, N) {
          var A = l < 12 ? "AM" : "PM";
          return N ? A.toLowerCase() : A;
        }, b = { YY: String(this.$y).slice(-2), YYYY: a.s(this.$y, 4, "0"), M: f + 1, MM: a.s(f + 1, 2, "0"), MMM: y(n.monthsShort, f, g, 3), MMMM: y(g, f), D: this.$D, DD: a.s(this.$D, 2, "0"), d: String(this.$W), dd: y(n.weekdaysMin, this.$W, d, 2), ddd: y(n.weekdaysShort, this.$W, d, 3), dddd: d[this.$W], H: String(o), HH: a.s(o, 2, "0"), h: x(1), hh: x(2), a: j(o, h, !0), A: j(o, h, !1), m: String(h), mm: a.s(h, 2, "0"), s: String(this.$s), ss: a.s(this.$s, 2, "0"), SSS: a.s(this.$ms, 3, "0"), Z: s };
        return u.replace(G, function(l, p) {
          return p || b[l] || s.replace(":", "");
        });
      }, e.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, e.diff = function(t, i, n) {
        var u, s = a.p(i), o = c(t), h = (o.utcOffset() - this.utcOffset()) * D, f = this - o, d = a.m(this, o);
        return d = (u = {}, u[v] = d / 12, u[$] = d, u[J] = d / 3, u[C] = (f - h) / 6048e5, u[M] = (f - h) / 864e5, u[_] = f / E, u[O] = f / D, u[w] = f / Y, u)[s] || f, n ? d : a.a(d);
      }, e.daysInMonth = function() {
        return this.endOf($).$D;
      }, e.$locale = function() {
        return S[this.$L];
      }, e.locale = function(t, i) {
        if (!t)
          return this.$L;
        var n = this.clone(), u = L(t, i, !0);
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
      }, r;
    }(), z = W.prototype;
    return c.prototype = z, [["$ms", k], ["$s", w], ["$m", O], ["$H", _], ["$W", M], ["$M", $], ["$y", v], ["$D", T]].forEach(function(r) {
      z[r[1]] = function(e) {
        return this.$g(e, r[0], r[1]);
      };
    }), c.extend = function(r, e) {
      return r.$i || (r(e, W, c), r.$i = !0), c;
    }, c.locale = L, c.isDayjs = I, c.unix = function(r) {
      return c(1e3 * r);
    }, c.en = S[H], c.Ls = S, c.p = {}, c;
  });
})(q);
var tt = q.exports;
const V = /* @__PURE__ */ X(tt), et = ({ date: m, format: U }) => {
  const Y = V.unix(new Date(m).getTime() / 1e3), D = V(Y).format(U);
  return /* @__PURE__ */ P.createElement(P.Fragment, null, D);
};
export {
  et as default
};
