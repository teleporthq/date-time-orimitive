/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = window, gt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kt = Symbol(), wt = /* @__PURE__ */ new WeakMap();
let Jt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== kt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (gt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = wt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && wt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Zt = (n) => new Jt(typeof n == "string" ? n : n + "", void 0, kt), Ft = (n, t) => {
  gt ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = st.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, Et = gt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return Zt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var dt;
const nt = window, bt = nt.trustedTypes, qt = bt ? bt.emptyScript : "", Mt = nt.reactiveElementPolyfillSupport, _t = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? qt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Rt = (n, t) => t !== n && (t == t || n == n), ct = { attribute: !0, type: String, converter: _t, reflect: !1, hasChanged: Rt }, mt = "finalized";
let I = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const l = this[t];
      this[e] = s, this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || ct;
  }
  static finalize() {
    if (this.hasOwnProperty(mt))
      return !1;
    this[mt] = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(Et(s));
    } else
      t !== void 0 && e.push(Et(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Ft(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = ct) {
    var s;
    const l = this.constructor._$Ep(t, i);
    if (l !== void 0 && i.reflect === !0) {
      const r = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : _t).toAttribute(e, i.type);
      this._$El = t, r == null ? this.removeAttribute(l) : this.setAttribute(l, r), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, l = s._$Ev.get(t);
    if (l !== void 0 && this._$El !== l) {
      const r = s.getPropertyOptions(l), y = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((i = r.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? r.converter : _t;
      this._$El = l, this[l] = y.fromAttribute(e, r.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || Rt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, l) => this[l] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var l;
        return (l = s.hostUpdate) === null || l === void 0 ? void 0 : l.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
I[mt] = !0, I.elementProperties = /* @__PURE__ */ new Map(), I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, Mt == null || Mt({ ReactiveElement: I }), ((dt = nt.reactiveElementVersions) !== null && dt !== void 0 ? dt : nt.reactiveElementVersions = []).push("1.6.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $t;
const rt = window, z = rt.trustedTypes, Ct = z ? z.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, yt = "$lit$", T = `lit$${(Math.random() + "").slice(9)}$`, jt = "?" + T, Kt = `<${jt}>`, j = document, q = () => j.createComment(""), K = (n) => n === null || typeof n != "object" && typeof n != "function", Lt = Array.isArray, Gt = (n) => Lt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, Dt = />/g, k = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xt = /'/g, Ht = /"/g, It = /^(?:script|style|textarea|title)$/i, B = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), Pt = /* @__PURE__ */ new WeakMap(), R = j.createTreeWalker(j, 129, null, !1), Qt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, l = t === 2 ? "<svg>" : "", r = Z;
  for (let u = 0; u < e; u++) {
    const d = n[u];
    let C, f, g = -1, S = 0;
    for (; S < d.length && (r.lastIndex = S, f = r.exec(d), f !== null); )
      S = r.lastIndex, r === Z ? f[1] === "!--" ? r = Ot : f[1] !== void 0 ? r = Dt : f[2] !== void 0 ? (It.test(f[2]) && (s = RegExp("</" + f[2], "g")), r = k) : f[3] !== void 0 && (r = k) : r === k ? f[0] === ">" ? (r = s ?? Z, g = -1) : f[1] === void 0 ? g = -2 : (g = r.lastIndex - f[2].length, C = f[1], r = f[3] === void 0 ? k : f[3] === '"' ? Ht : xt) : r === Ht || r === xt ? r = k : r === Ot || r === Dt ? r = Z : (r = k, s = void 0);
    const D = r === k && n[u + 1].startsWith("/>") ? " " : "";
    l += r === Z ? d + Kt : g >= 0 ? (i.push(C), d.slice(0, g) + yt + d.slice(g) + T + D) : d + T + (g === -2 ? (i.push(void 0), u) : D);
  }
  const y = l + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Ct !== void 0 ? Ct.createHTML(y) : y, i];
};
class G {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let l = 0, r = 0;
    const y = t.length - 1, u = this.parts, [d, C] = Qt(t, e);
    if (this.el = G.createElement(d, i), R.currentNode = this.el.content, e === 2) {
      const f = this.el.content, g = f.firstChild;
      g.remove(), f.append(...g.childNodes);
    }
    for (; (s = R.nextNode()) !== null && u.length < y; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const f = [];
          for (const g of s.getAttributeNames())
            if (g.endsWith(yt) || g.startsWith(T)) {
              const S = C[r++];
              if (f.push(g), S !== void 0) {
                const D = s.getAttribute(S.toLowerCase() + yt).split(T), U = /([.?@])?(.*)/.exec(S);
                u.push({ type: 1, index: l, name: U[2], strings: D, ctor: U[1] === "." ? te : U[1] === "?" ? ie : U[1] === "@" ? se : ot });
              } else
                u.push({ type: 6, index: l });
            }
          for (const g of f)
            s.removeAttribute(g);
        }
        if (It.test(s.tagName)) {
          const f = s.textContent.split(T), g = f.length - 1;
          if (g > 0) {
            s.textContent = z ? z.emptyScript : "";
            for (let S = 0; S < g; S++)
              s.append(f[S], q()), R.nextNode(), u.push({ type: 2, index: ++l });
            s.append(f[g], q());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === jt)
          u.push({ type: 2, index: l });
        else {
          let f = -1;
          for (; (f = s.data.indexOf(T, f + 1)) !== -1; )
            u.push({ type: 7, index: l }), f += T.length - 1;
        }
      l++;
    }
  }
  static createElement(t, e) {
    const i = j.createElement("template");
    return i.innerHTML = t, i;
  }
}
function W(n, t, e = n, i) {
  var s, l, r, y;
  if (t === B)
    return t;
  let u = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const d = K(t) ? void 0 : t._$litDirective$;
  return (u == null ? void 0 : u.constructor) !== d && ((l = u == null ? void 0 : u._$AO) === null || l === void 0 || l.call(u, !1), d === void 0 ? u = void 0 : (u = new d(n), u._$AT(n, e, i)), i !== void 0 ? ((r = (y = e)._$Co) !== null && r !== void 0 ? r : y._$Co = [])[i] = u : e._$Cl = u), u !== void 0 && (t = W(n, u._$AS(n, t.values), u, i)), t;
}
class Xt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, l = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : j).importNode(i, !0);
    R.currentNode = l;
    let r = R.nextNode(), y = 0, u = 0, d = s[0];
    for (; d !== void 0; ) {
      if (y === d.index) {
        let C;
        d.type === 2 ? C = new X(r, r.nextSibling, this, t) : d.type === 1 ? C = new d.ctor(r, d.name, d.strings, this, t) : d.type === 6 && (C = new ne(r, this, t)), this._$AV.push(C), d = s[++u];
      }
      y !== (d == null ? void 0 : d.index) && (r = R.nextNode(), y++);
    }
    return R.currentNode = j, l;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class X {
  constructor(t, e, i, s) {
    var l;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cp = (l = s == null ? void 0 : s.isConnected) === null || l === void 0 || l;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = W(this, t, e), K(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== B && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Gt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== b && K(this._$AH) ? this._$AA.nextSibling.data = t : this.$(j.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: s } = t, l = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = G.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === l)
      this._$AH.v(i);
    else {
      const r = new Xt(l, this), y = r.u(this.options);
      r.v(i), this.$(y), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Pt.get(t.strings);
    return e === void 0 && Pt.set(t.strings, e = new G(t)), e;
  }
  T(t) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const l of t)
      s === e.length ? e.push(i = new X(this.k(q()), this.k(q()), this, this.options)) : i = e[s], i._$AI(l), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class ot {
  constructor(t, e, i, s, l) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = l, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const l = this.strings;
    let r = !1;
    if (l === void 0)
      t = W(this, t, e, 0), r = !K(t) || t !== this._$AH && t !== B, r && (this._$AH = t);
    else {
      const y = t;
      let u, d;
      for (t = l[0], u = 0; u < l.length - 1; u++)
        d = W(this, y[i + u], e, u), d === B && (d = this._$AH[u]), r || (r = !K(d) || d !== this._$AH[u]), d === b ? t = b : t !== b && (t += (d ?? "") + l[u + 1]), this._$AH[u] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class te extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
const ee = z ? z.emptyScript : "";
class ie extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== b ? this.element.setAttribute(this.name, ee) : this.element.removeAttribute(this.name);
  }
}
class se extends ot {
  constructor(t, e, i, s, l) {
    super(t, e, i, s, l), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = W(this, t, e, 0)) !== null && i !== void 0 ? i : b) === B)
      return;
    const s = this._$AH, l = t === b && s !== b || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== b && (s === b || l);
    l && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class ne {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    W(this, t);
  }
}
const Tt = rt.litHtmlPolyfillSupport;
Tt == null || Tt(G, X), (($t = rt.litHtmlVersions) !== null && $t !== void 0 ? $t : rt.litHtmlVersions = []).push("2.7.4");
const re = (n, t, e) => {
  var i, s;
  const l = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let r = l._$litPart$;
  if (r === void 0) {
    const y = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    l._$litPart$ = r = new X(t.insertBefore(q(), y), y, void 0, e ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ft, vt;
class F extends I {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = re(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return B;
  }
}
F.finalized = !0, F._$litElement$ = !0, (ft = globalThis.litElementHydrateSupport) === null || ft === void 0 || ft.call(globalThis, { LitElement: F });
const Ut = globalThis.litElementPolyfillSupport;
Ut == null || Ut({ LitElement: F });
((vt = globalThis.litElementVersions) !== null && vt !== void 0 ? vt : globalThis.litElementVersions = []).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oe = (n) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(n, t) : ((e, i) => {
  const { kind: s, elements: l } = i;
  return { kind: s, elements: l, finisher(r) {
    customElements.define(e, r);
  } };
})(n, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} }, he = (n, t, e) => {
  t.constructor.createProperty(e, n);
};
function At(n) {
  return (t, e) => e !== void 0 ? he(n, t, e) : le(n, t);
}
var ae = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ue(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var zt = { exports: {} };
(function(n, t) {
  (function(e, i) {
    n.exports = i();
  })(ae, function() {
    var e = 1e3, i = 6e4, s = 36e5, l = "millisecond", r = "second", y = "minute", u = "hour", d = "day", C = "week", f = "month", g = "quarter", S = "year", D = "date", U = "Invalid Date", Bt = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Wt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Yt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var a = ["th", "st", "nd", "rd"], o = c % 100;
      return "[" + c + (a[(o - 20) % 10] || a[o] || a[0]) + "]";
    } }, ht = function(c, a, o) {
      var $ = String(c);
      return !$ || $.length >= a ? c : "" + Array(a + 1 - $.length).join(o) + c;
    }, Vt = { s: ht, z: function(c) {
      var a = -c.utcOffset(), o = Math.abs(a), $ = Math.floor(o / 60), h = o % 60;
      return (a <= 0 ? "+" : "-") + ht($, 2, "0") + ":" + ht(h, 2, "0");
    }, m: function c(a, o) {
      if (a.date() < o.date())
        return -c(o, a);
      var $ = 12 * (o.year() - a.year()) + (o.month() - a.month()), h = a.clone().add($, f), v = o - h < 0, p = a.clone().add($ + (v ? -1 : 1), f);
      return +(-($ + (o - h) / (v ? h - p : p - h)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: f, y: S, w: C, d, D, h: u, m: y, s: r, ms: l, Q: g }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, Y = "en", N = {};
    N[Y] = Yt;
    var at = function(c) {
      return c instanceof et;
    }, tt = function c(a, o, $) {
      var h;
      if (!a)
        return Y;
      if (typeof a == "string") {
        var v = a.toLowerCase();
        N[v] && (h = v), o && (N[v] = o, h = v);
        var p = a.split("-");
        if (!h && p.length > 1)
          return c(p[0]);
      } else {
        var m = a.name;
        N[m] = a, h = m;
      }
      return !$ && h && (Y = h), h || !$ && Y;
    }, E = function(c, a) {
      if (at(c))
        return c.clone();
      var o = typeof a == "object" ? a : {};
      return o.date = c, o.args = arguments, new et(o);
    }, _ = Vt;
    _.l = tt, _.i = at, _.w = function(c, a) {
      return E(c, { locale: a.$L, utc: a.$u, x: a.$x, $offset: a.$offset });
    };
    var et = function() {
      function c(o) {
        this.$L = tt(o.locale, null, !0), this.parse(o);
      }
      var a = c.prototype;
      return a.parse = function(o) {
        this.$d = function($) {
          var h = $.date, v = $.utc;
          if (h === null)
            return /* @__PURE__ */ new Date(NaN);
          if (_.u(h))
            return /* @__PURE__ */ new Date();
          if (h instanceof Date)
            return new Date(h);
          if (typeof h == "string" && !/Z$/i.test(h)) {
            var p = h.match(Bt);
            if (p) {
              var m = p[2] - 1 || 0, w = (p[7] || "0").substring(0, 3);
              return v ? new Date(Date.UTC(p[1], m, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, w)) : new Date(p[1], m, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, w);
            }
          }
          return new Date(h);
        }(o), this.$x = o.x || {}, this.init();
      }, a.init = function() {
        var o = this.$d;
        this.$y = o.getFullYear(), this.$M = o.getMonth(), this.$D = o.getDate(), this.$W = o.getDay(), this.$H = o.getHours(), this.$m = o.getMinutes(), this.$s = o.getSeconds(), this.$ms = o.getMilliseconds();
      }, a.$utils = function() {
        return _;
      }, a.isValid = function() {
        return this.$d.toString() !== U;
      }, a.isSame = function(o, $) {
        var h = E(o);
        return this.startOf($) <= h && h <= this.endOf($);
      }, a.isAfter = function(o, $) {
        return E(o) < this.startOf($);
      }, a.isBefore = function(o, $) {
        return this.endOf($) < E(o);
      }, a.$g = function(o, $, h) {
        return _.u(o) ? this[$] : this.set(h, o);
      }, a.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, a.valueOf = function() {
        return this.$d.getTime();
      }, a.startOf = function(o, $) {
        var h = this, v = !!_.u($) || $, p = _.p(o), m = function(L, O) {
          var P = _.w(h.$u ? Date.UTC(h.$y, O, L) : new Date(h.$y, O, L), h);
          return v ? P : P.endOf(d);
        }, w = function(L, O) {
          return _.w(h.toDate()[L].apply(h.toDate("s"), (v ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), h);
        }, A = this.$W, M = this.$M, H = this.$D, x = "set" + (this.$u ? "UTC" : "");
        switch (p) {
          case S:
            return v ? m(1, 0) : m(31, 11);
          case f:
            return v ? m(1, M) : m(0, M + 1);
          case C:
            var V = this.$locale().weekStart || 0, J = (A < V ? A + 7 : A) - V;
            return m(v ? H - J : H + (6 - J), M);
          case d:
          case D:
            return w(x + "Hours", 0);
          case u:
            return w(x + "Minutes", 1);
          case y:
            return w(x + "Seconds", 2);
          case r:
            return w(x + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, a.endOf = function(o) {
        return this.startOf(o, !1);
      }, a.$set = function(o, $) {
        var h, v = _.p(o), p = "set" + (this.$u ? "UTC" : ""), m = (h = {}, h[d] = p + "Date", h[D] = p + "Date", h[f] = p + "Month", h[S] = p + "FullYear", h[u] = p + "Hours", h[y] = p + "Minutes", h[r] = p + "Seconds", h[l] = p + "Milliseconds", h)[v], w = v === d ? this.$D + ($ - this.$W) : $;
        if (v === f || v === S) {
          var A = this.clone().set(D, 1);
          A.$d[m](w), A.init(), this.$d = A.set(D, Math.min(this.$D, A.daysInMonth())).$d;
        } else
          m && this.$d[m](w);
        return this.init(), this;
      }, a.set = function(o, $) {
        return this.clone().$set(o, $);
      }, a.get = function(o) {
        return this[_.p(o)]();
      }, a.add = function(o, $) {
        var h, v = this;
        o = Number(o);
        var p = _.p($), m = function(M) {
          var H = E(v);
          return _.w(H.date(H.date() + Math.round(M * o)), v);
        };
        if (p === f)
          return this.set(f, this.$M + o);
        if (p === S)
          return this.set(S, this.$y + o);
        if (p === d)
          return m(1);
        if (p === C)
          return m(7);
        var w = (h = {}, h[y] = i, h[u] = s, h[r] = e, h)[p] || 1, A = this.$d.getTime() + o * w;
        return _.w(A, this);
      }, a.subtract = function(o, $) {
        return this.add(-1 * o, $);
      }, a.format = function(o) {
        var $ = this, h = this.$locale();
        if (!this.isValid())
          return h.invalidDate || U;
        var v = o || "YYYY-MM-DDTHH:mm:ssZ", p = _.z(this), m = this.$H, w = this.$m, A = this.$M, M = h.weekdays, H = h.months, x = function(O, P, ut, it) {
          return O && (O[P] || O($, v)) || ut[P].slice(0, it);
        }, V = function(O) {
          return _.s(m % 12 || 12, O, "0");
        }, J = h.meridiem || function(O, P, ut) {
          var it = O < 12 ? "AM" : "PM";
          return ut ? it.toLowerCase() : it;
        }, L = { YY: String(this.$y).slice(-2), YYYY: _.s(this.$y, 4, "0"), M: A + 1, MM: _.s(A + 1, 2, "0"), MMM: x(h.monthsShort, A, H, 3), MMMM: x(H, A), D: this.$D, DD: _.s(this.$D, 2, "0"), d: String(this.$W), dd: x(h.weekdaysMin, this.$W, M, 2), ddd: x(h.weekdaysShort, this.$W, M, 3), dddd: M[this.$W], H: String(m), HH: _.s(m, 2, "0"), h: V(1), hh: V(2), a: J(m, w, !0), A: J(m, w, !1), m: String(w), mm: _.s(w, 2, "0"), s: String(this.$s), ss: _.s(this.$s, 2, "0"), SSS: _.s(this.$ms, 3, "0"), Z: p };
        return v.replace(Wt, function(O, P) {
          return P || L[O] || p.replace(":", "");
        });
      }, a.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, a.diff = function(o, $, h) {
        var v, p = _.p($), m = E(o), w = (m.utcOffset() - this.utcOffset()) * i, A = this - m, M = _.m(this, m);
        return M = (v = {}, v[S] = M / 12, v[f] = M, v[g] = M / 3, v[C] = (A - w) / 6048e5, v[d] = (A - w) / 864e5, v[u] = A / s, v[y] = A / i, v[r] = A / e, v)[p] || A, h ? M : _.a(M);
      }, a.daysInMonth = function() {
        return this.endOf(f).$D;
      }, a.$locale = function() {
        return N[this.$L];
      }, a.locale = function(o, $) {
        if (!o)
          return this.$L;
        var h = this.clone(), v = tt(o, $, !0);
        return v && (h.$L = v), h;
      }, a.clone = function() {
        return _.w(this.$d, this);
      }, a.toDate = function() {
        return new Date(this.valueOf());
      }, a.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, a.toISOString = function() {
        return this.$d.toISOString();
      }, a.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), St = et.prototype;
    return E.prototype = St, [["$ms", l], ["$s", r], ["$m", y], ["$H", u], ["$W", d], ["$M", f], ["$y", S], ["$D", D]].forEach(function(c) {
      St[c[1]] = function(a) {
        return this.$g(a, c[0], c[1]);
      };
    }), E.extend = function(c, a) {
      return c.$i || (c(a, et, E), c.$i = !0), E;
    }, E.locale = tt, E.isDayjs = at, E.unix = function(c) {
      return E(1e3 * c);
    }, E.en = N[Y], E.Ls = N, E.p = {}, E;
  });
})(zt);
var de = zt.exports;
const Nt = /* @__PURE__ */ ue(de);
var ce = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, lt = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? $e(t, e) : t, l = n.length - 1, r; l >= 0; l--)
    (r = n[l]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && ce(t, e, s), s;
};
let Q = class extends F {
  createRenderRoot() {
    return this.shadow ? this.attachShadow({ mode: "open" }) : this;
  }
  render() {
    const n = Nt.unix(new Date(this.date).getTime() / 1e3);
    return Nt(n).format(this.format);
  }
};
lt([
  At()
], Q.prototype, "date", 2);
lt([
  At()
], Q.prototype, "format", 2);
lt([
  At()
], Q.prototype, "shadow", 2);
Q = lt([
  oe("date-time-primitive")
], Q);
export {
  Q as DangerouslySetInnerHtmlContent
};
