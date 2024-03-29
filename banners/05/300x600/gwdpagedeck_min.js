- function() {
    "use strict";
    var g;
    var l = ["-ms-", "-moz-", "-webkit-", ""],
        m = function(a, b) {
            for (var c, d, e = 0; e < l.length; ++e) c = l[e] + "transition-duration", d = "" + b, a.style.setProperty(c, d)
        };

    function n(a, b, c, d, e, h, f) {
        this.j = a;
        this.f = b;
        this.w = c;
        a = d || "none";
        this.l = e = "none" === a ? 0 : e || 1E3;
        this.g = h || "linear";
        this.i = [];
        if (e) {
            h = f || "top";
            if (f = this.j) {
                f.classList.add("gwd-page");
                f.classList.add("center");
                f = "center";
                if ("push" == a) switch (h) {
                    case "top":
                        f = "top";
                        break;
                    case "bottom":
                        f = "bottom";
                        break;
                    case "left":
                        f = "left";
                        break;
                    case "right":
                        f = "right"
                }
                this.i.push(f);
                "fade" == a && this.i.push("transparent")
            }
            f = this.f;
            e = "center";
            if ("none" != a && "fade" != a) switch (h) {
                case "top":
                    e = "bottom";
                    break;
                case "bottom":
                    e = "top";
                    break;
                case "left":
                    e = "right";
                    break;
                case "right":
                    e = "left"
            }
            f.classList.add(e);
            f.classList.add("gwd-page");
            "fade" == a && f.classList.add("transparent")
        }
    }
    n.prototype.start = function() {
        if (this.l) {
            var a = this.j,
                b = this.f;
            p(b, this.J.bind(this));
            a && (m(a, this.l + "ms"), a.classList.add(this.g));
            m(b, this.l + "ms");
            b.classList.add(this.g);
            b.setAttribute("gwd-reflow", b.offsetWidth);
            if (a)
                for (var c = 0; c < this.i.length; ++c) a.classList.add(this.i[c]);
            q(b)
        } else this.w()
    };
    var r = function(a, b, c, d) {
            c = "transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + c + "," + d + ",0,1);";
            return a + "." + b + "{-webkit-" + c + "-moz-" + c + "-ms-" + c + c + "}"
        },
        t = "center top bottom left right transparent".split(" "),
        q = function(a) {
            t.forEach(function(b) {
                a.classList.remove(b)
            })
        },
        p = function(a, b) {
            var c = function() {
                a.removeEventListener("webkitTransitionEnd", c);
                a.removeEventListener("transitionend", c);
                b()
            };
            a.addEventListener("webkitTransitionEnd", c);
            a.addEventListener("transitionend", c)
        };
    n.prototype.J = function() {
        var a = this.j;
        a && (q(a), m(a, 0), a.classList.remove(this.g));
        m(this.f, 0);
        this.f.classList.remove(this.g);
        this.w()
    };
    var u = function(a, b, c) {
            var d;
            c ? (d = document.createEvent("CustomEvent"), d.initCustomEvent(a, !0, !0, c)) : (d = document.createEvent("Event"), d.initEvent(a, !0, !0));
            b.dispatchEvent(d)
        },
        w = function(a, b) {
            var c = function(d) {
                a.removeEventListener("attached", c);
                b(d)
            };
            a.addEventListener("attached", c)
        };
    var x = function() {};
    goog.inherits(x, HTMLDivElement);
    x.prototype.createdCallback = function() {
        window.addEventListener("WebComponentsReady", this.I.bind(this), !1);
        this.u = this.h.bind(this, "shake");
        this.v = this.h.bind(this, "tilt");
        this.s = this.h.bind(this, "rotatetoportrait");
        this.o = this.h.bind(this, "rotatetolandscape");
        this.a = [];
        this.A = this.H.bind(this);
        this.D = this.F.bind(this);
        this.c = this.B = null;
        this.b = -1;
        this.m = !1;
        this.classList.add("gwd-pagedeck");
        Object.defineProperty(this, "currentIndex", {
            enumerable: !0,
            get: this.G.bind(this)
        })
    };
    x.prototype.I = function() {
        this.a = Array.prototype.slice.call(this.querySelectorAll("div[is=gwd-page]"));
        this.a.forEach(function(a) {
            a.classList.add("gwd-page")
        });
        for (u("beforepagesdetached", this, {
                pages: this.a.slice()
            }); this.firstChild;) this.removeChild(this.firstChild); - 1 == this.b && void 0 !== this.C && this.goToPage(this.C)
    };
    x.prototype.attachedCallback = function() {
        if (!this.B) {
            var a, b = this.id;
            a = this.offsetWidth;
            var c = this.offsetHeight,
                b = (b && "#") + b + ".gwd-pagedeck > .gwd-page";
            a = r(b, "center", 0, 0) + r(b, "top", 0, c) + r(b, "bottom", 0, -c) + r(b, "left", a, 0) + r(b, "right", -a, 0);
            c = document.createElement("style");
            void 0 !== c.cssText ? c.cssText = a : c.innerHTML = a;
            document.head.appendChild(c);
            this.B = c
        }
        this.addEventListener("pageload", this.A, !1);
        document.body.addEventListener("shake", this.u, !0);
        document.body.addEventListener("tilt", this.v, !0);
        document.body.addEventListener("rotatetoportrait",
            this.s, !0);
        document.body.addEventListener("rotatetolandscape", this.o, !0)
    };
    x.prototype.detachedCallback = function() {
        this.removeEventListener("pageload", this.A, !1);
        document.body && (document.body.removeEventListener("shake", this.u, !0), document.body.removeEventListener("tilt", this.v, !0), document.body.removeEventListener("rotatetoportrait", this.s, !0), document.body.removeEventListener("rotatetolandscape", this.o, !0))
    };
    var z = function(a, b, c, d, e, h) {
        if (!(a.b == b || 0 > b || b > a.a.length - 1 || a.c)) {
            var f = a.a[a.b],
                k = a.a[b];
            a.b = b;
            a.c = new n(f, k, a.D, c, d, e, h);
            var v = k.gwdLoad && !k.gwdIsLoaded();
            a.m = v;
            w(k, function() {
                k.gwdActivate();
                v ? k.gwdLoad() : y(this)
            }.bind(a));
            a.appendChild(k)
        }
    };
    x.prototype.H = function(a) {
        this.m && a.target.parentNode == this && (y(this), this.m = !1)
    };
    var y = function(a) {
        u("pagetransitionstart", a);
        a.c.start()
    };
    g = x.prototype;
    g.F = function() {
        if (this.c) {
            var a = this.c.j,
                b = this.c.f;
            this.c = null;
            u("pagetransitionend", this, {
                outgoingPage: a ? a : null,
                incomingPage: b
            });
            a && a.gwdDeactivate();
            b.gwdPresent()
        }
    };
    g.findPageIndexByAttributeValue = function(a, b) {
        for (var c = this.a.length, d, e = 0; e < c; e++)
            if (d = this.a[e], "boolean" == typeof b) {
                if (d.hasAttribute(a)) return e
            } else if (d.getAttribute(a) == b) return e;
        return -1
    };
    g.goToNextPage = function(a, b, c, d, e) {
        var h = this.b,
            f = h + 1;
        f >= this.a.length && (f = a ? 0 : h);
        z(this, f, b, c, d, e)
    };
    g.goToPreviousPage = function(a, b, c, d, e) {
        var h = this.b,
            f = this.a.length,
            k = h - 1;
        0 > k && (k = a ? f - 1 : h);
        z(this, k, b, c, d, e)
    };
    g.goToPage = function(a, b, c, d, e) {
        this.a.length ? (a = "number" == typeof a ? a : this.findPageIndexByAttributeValue("id", a), 0 <= a && z(this, a, b, c, d, e)) : this.C = a
    };
    g.G = function() {
        return 0 <= this.b ? this.b : void 0
    };
    g.getPages = function() {
        return this.a
    };
    g.getPage = function(a) {
        if ("number" != typeof a) {
            if (!a) return null;
            a = this.findPageIndexByAttributeValue("id", a)
        }
        return 0 > a || a > this.a.length - 1 ? null : this.a[a]
    };
    g.getDefaultPage = function() {
        var a = this.getAttribute("default-page");
        return a ? this.getPage(this.findPageIndexByAttributeValue("id", a)) : this.getPage(0)
    };
    g.getOrientationSpecificPage = function(a, b) {
        b = this.getPage(b);
        var c = b.getAttribute("alt-orientation-page");
        if (!c) return b;
        var d = b.isPortrait();
        a = 1 == a;
        c = this.getPage(c);
        return a == d ? b : c
    };
    g.h = function(a, b) {
        if (b.target == document.body) {
            var c = this.getPage(this.b);
            u(a, c, b.detail)
        }
    };
    g.getElementById = function(a) {
        for (var b = this.a.length, c = 0; c < b; c++) {
            var d = this.a[c].querySelector("#" + a);
            if (d) return d
        }
        return null
    };
    g.getElementsBySelector = function(a) {
        for (var b = this.a.length, c = [], d = 0; d < b; d++) {
            var e = this.a[d].querySelectorAll(a);
            e && (c = c.concat(Array.prototype.slice.call(e)))
        }
        return c
    };
    g.attributeChangedCallback = null;
    document.registerElement("gwd-pagedeck", {
        prototype: x.prototype,
        "extends": "div"
    });
}()