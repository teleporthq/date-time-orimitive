(function(D,x){typeof exports=="object"&&typeof module<"u"?module.exports=x(require("react")):typeof define=="function"&&define.amd?define(["react"],x):(D=typeof globalThis<"u"?globalThis:D||self,D.DateTimePrimitive=x(D.React))})(this,function(D){"use strict";var x=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function G(m){return m&&m.__esModule&&Object.prototype.hasOwnProperty.call(m,"default")?m.default:m}var E={exports:{}};(function(m,Z){(function(H,S){m.exports=S()})(x,function(){var H=1e3,S=6e4,z=36e5,I="millisecond",O="second",_="minute",T="hour",M="day",W="week",$="month",V="quarter",p="year",b="date",q="Invalid Date",K=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,R=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,X={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(i){var n=["th","st","nd","rd"],t=i%100;return"["+i+(n[(t-20)%10]||n[t]||n[0])+"]"}},N=function(i,n,t){var r=String(i);return!r||r.length>=n?i:""+Array(n+1-r.length).join(t)+i},tt={s:N,z:function(i){var n=-i.utcOffset(),t=Math.abs(n),r=Math.floor(t/60),e=t%60;return(n<=0?"+":"-")+N(r,2,"0")+":"+N(e,2,"0")},m:function i(n,t){if(n.date()<t.date())return-i(t,n);var r=12*(t.year()-n.year())+(t.month()-n.month()),e=n.clone().add(r,$),u=t-e<0,s=n.clone().add(r+(u?-1:1),$);return+(-(r+(t-e)/(u?e-s:s-e))||0)},a:function(i){return i<0?Math.ceil(i)||0:Math.floor(i)},p:function(i){return{M:$,y:p,w:W,d:M,D:b,h:T,m:_,s:O,ms:I,Q:V}[i]||String(i||"").toLowerCase().replace(/s$/,"")},u:function(i){return i===void 0}},j="en",w={};w[j]=X;var P=function(i){return i instanceof k},A=function i(n,t,r){var e;if(!n)return j;if(typeof n=="string"){var u=n.toLowerCase();w[u]&&(e=u),t&&(w[u]=t,e=u);var s=n.split("-");if(!e&&s.length>1)return i(s[0])}else{var a=n.name;w[a]=n,e=a}return!r&&e&&(j=e),e||!r&&j},c=function(i,n){if(P(i))return i.clone();var t=typeof n=="object"?n:{};return t.date=i,t.args=arguments,new k(t)},o=tt;o.l=A,o.i=P,o.w=function(i,n){return c(i,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var k=function(){function i(t){this.$L=A(t.locale,null,!0),this.parse(t)}var n=i.prototype;return n.parse=function(t){this.$d=function(r){var e=r.date,u=r.utc;if(e===null)return new Date(NaN);if(o.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var s=e.match(K);if(s){var a=s[2]-1||0,h=(s[7]||"0").substring(0,3);return u?new Date(Date.UTC(s[1],a,s[3]||1,s[4]||0,s[5]||0,s[6]||0,h)):new Date(s[1],a,s[3]||1,s[4]||0,s[5]||0,s[6]||0,h)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},n.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},n.$utils=function(){return o},n.isValid=function(){return this.$d.toString()!==q},n.isSame=function(t,r){var e=c(t);return this.startOf(r)<=e&&e<=this.endOf(r)},n.isAfter=function(t,r){return c(t)<this.startOf(r)},n.isBefore=function(t,r){return this.endOf(r)<c(t)},n.$g=function(t,r,e){return o.u(t)?this[r]:this.set(e,t)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(t,r){var e=this,u=!!o.u(r)||r,s=o.p(t),a=function(Y,l){var g=o.w(e.$u?Date.UTC(e.$y,l,Y):new Date(e.$y,l,Y),e);return u?g:g.endOf(M)},h=function(Y,l){return o.w(e.toDate()[Y].apply(e.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(l)),e)},f=this.$W,d=this.$M,v=this.$D,y="set"+(this.$u?"UTC":"");switch(s){case p:return u?a(1,0):a(31,11);case $:return u?a(1,d):a(0,d+1);case W:var C=this.$locale().weekStart||0,L=(f<C?f+7:f)-C;return a(u?v-L:v+(6-L),d);case M:case b:return h(y+"Hours",0);case T:return h(y+"Minutes",1);case _:return h(y+"Seconds",2);case O:return h(y+"Milliseconds",3);default:return this.clone()}},n.endOf=function(t){return this.startOf(t,!1)},n.$set=function(t,r){var e,u=o.p(t),s="set"+(this.$u?"UTC":""),a=(e={},e[M]=s+"Date",e[b]=s+"Date",e[$]=s+"Month",e[p]=s+"FullYear",e[T]=s+"Hours",e[_]=s+"Minutes",e[O]=s+"Seconds",e[I]=s+"Milliseconds",e)[u],h=u===M?this.$D+(r-this.$W):r;if(u===$||u===p){var f=this.clone().set(b,1);f.$d[a](h),f.init(),this.$d=f.set(b,Math.min(this.$D,f.daysInMonth())).$d}else a&&this.$d[a](h);return this.init(),this},n.set=function(t,r){return this.clone().$set(t,r)},n.get=function(t){return this[o.p(t)]()},n.add=function(t,r){var e,u=this;t=Number(t);var s=o.p(r),a=function(d){var v=c(u);return o.w(v.date(v.date()+Math.round(d*t)),u)};if(s===$)return this.set($,this.$M+t);if(s===p)return this.set(p,this.$y+t);if(s===M)return a(1);if(s===W)return a(7);var h=(e={},e[_]=S,e[T]=z,e[O]=H,e)[s]||1,f=this.$d.getTime()+t*h;return o.w(f,this)},n.subtract=function(t,r){return this.add(-1*t,r)},n.format=function(t){var r=this,e=this.$locale();if(!this.isValid())return e.invalidDate||q;var u=t||"YYYY-MM-DDTHH:mm:ssZ",s=o.z(this),a=this.$H,h=this.$m,f=this.$M,d=e.weekdays,v=e.months,y=function(l,g,U,F){return l&&(l[g]||l(r,u))||U[g].slice(0,F)},C=function(l){return o.s(a%12||12,l,"0")},L=e.meridiem||function(l,g,U){var F=l<12?"AM":"PM";return U?F.toLowerCase():F},Y={YY:String(this.$y).slice(-2),YYYY:o.s(this.$y,4,"0"),M:f+1,MM:o.s(f+1,2,"0"),MMM:y(e.monthsShort,f,v,3),MMMM:y(v,f),D:this.$D,DD:o.s(this.$D,2,"0"),d:String(this.$W),dd:y(e.weekdaysMin,this.$W,d,2),ddd:y(e.weekdaysShort,this.$W,d,3),dddd:d[this.$W],H:String(a),HH:o.s(a,2,"0"),h:C(1),hh:C(2),a:L(a,h,!0),A:L(a,h,!1),m:String(h),mm:o.s(h,2,"0"),s:String(this.$s),ss:o.s(this.$s,2,"0"),SSS:o.s(this.$ms,3,"0"),Z:s};return u.replace(R,function(l,g){return g||Y[l]||s.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(t,r,e){var u,s=o.p(r),a=c(t),h=(a.utcOffset()-this.utcOffset())*S,f=this-a,d=o.m(this,a);return d=(u={},u[p]=d/12,u[$]=d,u[V]=d/3,u[W]=(f-h)/6048e5,u[M]=(f-h)/864e5,u[T]=f/z,u[_]=f/S,u[O]=f/H,u)[s]||f,e?d:o.a(d)},n.daysInMonth=function(){return this.endOf($).$D},n.$locale=function(){return w[this.$L]},n.locale=function(t,r){if(!t)return this.$L;var e=this.clone(),u=A(t,r,!0);return u&&(e.$L=u),e},n.clone=function(){return o.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},i}(),B=k.prototype;return c.prototype=B,[["$ms",I],["$s",O],["$m",_],["$H",T],["$W",M],["$M",$],["$y",p],["$D",b]].forEach(function(i){B[i[1]]=function(n){return this.$g(n,i[0],i[1])}}),c.extend=function(i,n){return i.$i||(i(n,k,c),i.$i=!0),c},c.locale=A,c.isDayjs=P,c.unix=function(i){return c(1e3*i)},c.en=w[j],c.Ls=w,c.p={},c})})(E);var Q=E.exports;const J=G(Q);return({date:m,format:Z})=>{const H=J.unix(new Date(m).getTime()/1e3),S=J(H).format(Z);return D.createElement(D.Fragment,null,S)}});