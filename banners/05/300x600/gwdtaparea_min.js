- function() {
    "use strict";
    var c;
    var d = function(a, b, g) {
        var e;
        g ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, !0, !0, g)) : (e = document.createEvent("Event"), e.initEvent(a, !0, !0));
        b.dispatchEvent(e);
        return e
    };
    var f = [],
        h = function(a) {
            a = f.indexOf(a);
            0 <= a && f.splice(a, 1)
        };
    document.addEventListener("click", function(a) {
        for (var b = 0; b < f.length; b++)
            if (25 > Math.abs(a.clientX - f[b].m) && 25 > Math.abs(a.clientY - f[b].o) || 25 > Math.abs(a.screenX - f[b].A) && 25 > Math.abs(a.screenY - f[b].B)) f.splice(b, 1), a.stopPropagation(), a.preventDefault()
    }, !0);
    var k = function() {};
    goog.inherits(k, HTMLElement);
    c = k.prototype;
    c.createdCallback = function() {
        this.l = this.j = 0;
        this.f = this.b = this.g = this.c = null;
        this.a = !0;
        this.h = this.s.bind(this)
    };
    c.attachedCallback = function() {
        this.b || (this.c = this.i.bind(this), this.g = this.w.bind(this), this.b = this.v.bind(this), this.f = this.u.bind(this));
        this.addEventListener("click", this.c, !1);
        this.addEventListener("touchstart", this.g, !1);
        this.addEventListener("action", this.h, !1)
    };
    c.detachedCallback = function() {
        this.removeEventListener("click", this.c, !1);
        this.removeEventListener("touchstart", this.g, !1);
        this.removeEventListener("action", this.h, !1)
    };
    c.i = function() {
        this.a && d("action", this);
        this.a = !0
    };
    c.w = function(a) {
        this.addEventListener("touchmove", this.b, !1);
        this.addEventListener("touchend", this.f, !1);
        a = a.touches[0];
        this.j = a.clientX;
        this.l = a.clientY
    };
    c.u = function(a) {
        this.i();
        this.removeEventListener("touchmove", this.b, !1);
        this.removeEventListener("touchend", this.f, !1);
        a = a.changedTouches[0];
        a = {
            m: a.clientX,
            o: a.clientY,
            A: a.screenX,
            B: a.screenY
        };
        f.push(a);
        setTimeout(h.bind(null, a), 2500)
    };
    c.v = function(a) {
        a = a.touches[0];
        this.a = this.a && 10 >= Math.abs(this.j - a.clientX) && 10 >= Math.abs(this.l - a.clientY)
    };
    c.s = function() {
        var a = this.getAttribute("exit-id"),
            b = this.getAttribute("exit-override-url");
        b && !d("tapareaexit", this, {
            "exit-id": a,
            url: b
        }).detail.handled && window.open(b)
    };
    c.attributeChangedCallback = null;
    document.registerElement("gwd-taparea", {
        prototype: k.prototype
    });
}()