- function() {
    "use strict";
    var e;
    var h = function(a, b) {
            if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
            if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
            for (; b && a != b;) b = b.parentNode;
            return b == a
        },
        k = function(a) {
            return "gwd-page" == a.tagName.toLowerCase() || "gwd-page" == a.getAttribute("is")
        },
        l = function(a) {
            if (k(a)) return a;
            for (; a && 9 != a.nodeType;)
                if ((a = a.parentElement) && k(a)) return a;
            return null
        };
    var m = function(a, b, d) {
        var c;
        d ? (c = document.createEvent("CustomEvent"), c.initCustomEvent(a, !0, !0, d)) : (c = document.createEvent("Event"), c.initEvent(a, !0, !0));
        b.dispatchEvent(c);
        return c
    };

    function n() {
        this.m = {}
    }
    n.prototype.add = function(a, b) {
        a = "string" == typeof a ? a : a.getString();
        this.m[a] || (this.m[a] = []);
        this.m[a].push(b)
    };
    var p = function(a) {
            var b = [],
                d = "object" == typeof gwd && "GwdId" in gwd,
                c;
            for (c in a.m) b.push(d ? new gwd.GwdId(c) : c);
            return b
        },
        q = function(a, b) {
            return b ? a.m["string" == typeof b ? b : b.getString()] || [] : []
        };

    function r(a, b) {
        this.f = a;
        this.R = b;
        this.B = this.G.bind(this)
    }
    r.prototype.observe = function(a) {
        if (a.nodeType == Node.ELEMENT_NODE)
            for (var b = p(this.f), d = 0; d < b.length; d++) {
                var c = t(b[d]);
                if (c && h(a, c)) {
                    var f = q(this.f, b[d]);
                    f && f.forEach(function(a) {
                        c.addEventListener(a.event, this.B, !1)
                    }.bind(this))
                }
            }
    };
    var u = function(a, b) {
        if (b.nodeType == Node.ELEMENT_NODE)
            for (var d = p(a.f), c = 0; c < d.length; c++) {
                var f = t(d[c]);
                if (f && h(b, f)) {
                    var g = q(a.f, d[c]);
                    g && g.forEach(function(a) {
                        f.removeEventListener(a.event, this.B, !1)
                    }.bind(a))
                }
            }
    };
    r.prototype.G = function(a) {
        this.R(a)
    };
    var t = function(a) {
        return "string" == typeof a ? document.getElementById(a) : a.getElement(document)
    };
    document.registerElement("gwd-metric-event");
    document.registerElement("gwd-metric-configuration");
    document.registerElement("gwd-exit");
    document.registerElement("gwd-timer");
    var w = function() {};
    goog.inherits(w, HTMLElement);
    e = w.prototype;
    e.createdCallback = function() {
        document.body.style.opacity = "0";
        this.L = this.Y.bind(this);
        this.D = this.$.bind(this);
        this.M = this.Z.bind(this);
        this.u = this.X.bind(this);
        this.s = this.V.bind(this);
        this.v = m.bind(null, "expandfinish", this);
        this.o = m.bind(null, "collapsefinish", this);
        this.K = this.W.bind(this);
        this.B = this.G.bind(this);
        this.O = this.aa.bind(this);
        this.P = this.ba.bind(this);
        this.j = this.l = !1;
        this.H = [];
        this.w = !1;
        this.I = this.hasAttribute("fullscreen");
        this.i = null;
        this.A = this.g = !1;
        this.C = window.innerHeight >=
            window.innerWidth ? 1 : 2;
        this.c = null
    };
    e.attachedCallback = function() {
        Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, this.u);
        Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, this.s);
        Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, this.u);
        Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, this.s);
        Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, this.v);
        Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, this.o);
        Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH,
            this.v);
        Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, this.o);
        Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_DIMENSIONS, this.K);
        this.a = this.querySelector("[is=gwd-pagedeck]");
        this.a.addEventListener("pagetransitionend", this.O, !1);
        this.c = document.getElementById(this.getAttribute("data-provider"));
        var a = this.querySelector("gwd-metric-configuration"),
            b = new n;
        if (a)
            for (var a = Array.prototype.slice.call(a.getElementsByTagName("gwd-metric-event")), d = 0; d < a.length; d++) {
                var c =
                    a[d],
                    f = c.getAttribute("source");
                if (f) {
                    var g = c.getAttribute("exit"),
                        c = {
                            event: c.getAttribute("event"),
                            ca: c.getAttribute("metric") || g,
                            S: c.hasAttribute("cumulative"),
                            exit: g
                        };
                    b.add(x(f), c)
                }
            }
        this.f = b;
        this.N = new r(this.f, this.B);
        window.addEventListener("resize", this.P, !1)
    };
    e.detachedCallback = function() {
        Enabler.removeEventListener(studio.events.StudioEvent.INIT, this.L);
        Enabler.removeEventListener(studio.events.StudioEvent.VISIBLE, this.D);
        Enabler.removeEventListener(studio.events.StudioEvent.PAGE_LOADED, this.M);
        Enabler.removeEventListener(studio.events.StudioEvent.EXPAND_START, this.u);
        Enabler.removeEventListener(studio.events.StudioEvent.COLLAPSE_START, this.s);
        Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, this.u);
        Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START,
            this.s);
        Enabler.removeEventListener(studio.events.StudioEvent.EXPAND_FINISH, this.v);
        Enabler.removeEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, this.o);
        Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, this.v);
        Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, this.o);
        Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_DIMENSIONS, this.K);
        this.a.removeEventListener("pagetransitionend", this.O, !1);
        window.removeEventListener("resize",
            this.P, !1)
    };
    e.initAd = function() {
        this.w = !1;
        var a = this.L;
        Enabler.removeEventListener(studio.events.StudioEvent.INIT, a);
        Enabler.addEventListener(studio.events.StudioEvent.INIT, a);
        Enabler.isInitialized() && a()
    };
    e.exit = function(a, b, d, c) {
        Enabler.exit(a, b);
        ("undefined" == typeof c || c) && y(this);
        d && this.goToPage()
    };
    e.exitOverride = function(a, b, d, c) {
        Enabler.exitOverride(a, b);
        ("undefined" == typeof c || c) && y(this);
        d && this.goToPage()
    };
    e.incrementCounter = function(a, b) {
        Enabler.counter(a, b)
    };
    e.startTimer = function(a) {
        Enabler.startTimer(a)
    };
    e.stopTimer = function(a) {
        Enabler.stopTimer(a)
    };
    e.reportManualClose = function() {
        Enabler.reportManualClose()
    };
    e.G = function(a) {
        var b = a.target,
            d = x(b),
            c = d + ": " + a.type,
            f;
        a: {
            f = q(this.f, d);
            for (var g = 0; g < f.length; g++)
                if (f[g].event == a.type) {
                    f = f[g];
                    break a
                }
            f = void 0
        }
        f.exit && a.detail && a.detail.url ? (c = d + ": " + f.exit, a.detail["exit-id"] && (c = a.detail["exit-id"]), Enabler.exitOverride(c, a.detail.url), a.detail.handled = !0, a.detail.collapse && this.goToPage()) : (a = l(b)) && a.gwdIsActive() && this.incrementCounter(f.ca || c, f.S)
    };
    e.Y = function() {
        var a = function() {
            if (this.hasAttribute("polite-load")) {
                var a = this.M;
                Enabler.isPageLoaded() ? a() : Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, a)
            } else z(this.D)
        }.bind(this);
        if (this.I) {
            var b = function(d) {
                (this.i = !!d.supported) && m("fullscreensupport", this);
                Enabler.removeEventListener(studio.events.StudioEvent.FULLSCREEN_SUPPORT, b);
                a()
            }.bind(this);
            Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_SUPPORT, b);
            Enabler.queryFullscreenSupport()
        } else a()
    };
    var z = function(a) {
        Enabler.isVisible() ? a() : Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, a)
    };
    w.prototype.$ = function(a) {
        if (this.w) this.c && A(this);
        else {
            var b;
            a && (b = a.detail);
            var d = this.fa.bind(this, b);
            this.c && (d = this.U.bind(this, d));
            if (this.I) {
                Enabler.setResponsiveExpanding(!0);
                var c = function(a) {
                    this.A = a;
                    d()
                }.bind(this);
                Enabler.loadModule(studio.module.ModuleId.GDN, function() {
                    var a = studio.sdk.gdn.getConfig();
                    a.isInCreativeToolsetContext() ? a.isInterstitial(c) : d()
                })
            } else d()
        }
    };
    w.prototype.Z = function() {
        z(this.D)
    };
    w.prototype.U = function(a) {
        this.c ? (a = this.da.bind(this, a), this.c.isDataLoaded() && a(), this.c.addEventListener("ready", a)) : a()
    };
    w.prototype.da = function(a) {
        A(this);
        a()
    };
    var A = function(a) {
        var b = document.getElementsByTagName("gwd-data-binder");
        if (0 < b.length) {
            var b = b[0],
                d = a.c.getData();
            if (d) {
                var c = a.a.getElementsBySelector("*"),
                    c = c.concat(a.a.getPages());
                b.bindData(d, c)
            }
        }
    };
    e = w.prototype;
    e.fa = function(a) {
        this.w || (this.w = !0, document.body.style.opacity = "", m("adinitialized", this, a), this.A ? (a = this.a.getPage(this.a.findPageIndexByAttributeValue("expanded", !0)), this.goToPage(a.id)) : this.goToPage())
    };
    e.goToPage = function(a, b, d, c, f) {
        var g = this.a.getPage(this.a.currentIndex);
        if (a = a ? this.a.getPage(a) : this.a.getDefaultPage()) {
            var v = !!g && !!a && !this.l && !this.A && !g.hasAttribute("expanded") && a.hasAttribute("expanded"),
                g = !!g && !!a && !this.j && !this.A && g.hasAttribute("expanded") && !a.hasAttribute("expanded");
            v && this.j || g && this.l || ((this.b = a.id, b && (this.h = {
                    transition: b,
                    duration: d,
                    T: c,
                    direction: f
                }), v) ? this.I && !1 !== this.i ? this.i && (this.g = !0, Enabler.requestFullscreenExpand()) : Enabler.requestExpand() : g ? this.g ? Enabler.requestFullscreenCollapse() :
                Enabler.requestCollapse() : (this.j = this.l = !1, this.F()))
        }
    };
    e.X = function() {
        m("expandstart", this);
        this.i ? (this.g = !0, Enabler.finishFullscreenExpand()) : Enabler.finishExpand();
        if (!this.b) {
            var a = this.a.getPage(this.a.findPageIndexByAttributeValue("expanded", !0));
            a && (this.b = a.id)
        }
        a = this.a.getPage(this.a.currentIndex);
        this.l = !!a && this.b != a.id;
        setTimeout(this.F.bind(this), 30)
    };
    e.V = function() {
        m("collapsestart", this);
        this.g ? (Enabler.finishFullscreenCollapse(), this.g = !1) : Enabler.finishCollapse();
        this.b || (this.reportManualClose(), this.b = this.a.getDefaultPage().id);
        var a = this.a.getPage(this.a.currentIndex);
        this.j = !!a && this.b != a.id;
        setTimeout(this.F.bind(this), 30)
    };
    e.ba = function() {
        if (!this.b) {
            var a = window.innerHeight >= window.innerWidth ? 1 : 2;
            this.C != a && (this.C = a, (a = this.a.getPage(this.a.currentIndex)) && setTimeout(this.goToPage.bind(this, a.id), 0))
        }
    };
    e.W = function(a) {
        a && Enabler.setResponsiveSize(a.width, a.height)
    };
    e.F = function() {
        if (this.b) {
            this.C = window.innerHeight >= window.innerWidth ? 1 : 2;
            var a = this.a.getOrientationSpecificPage(this.C, this.b);
            this.h ? this.a.goToPage(a.id, this.h.transition, this.h.duration, this.h.T, this.h.direction) : this.a.goToPage(a.id);
            this.g && a.classList.add("fs")
        }
        this.h = this.b = void 0
    };
    e.aa = function(a) {
        this.j = this.l = !1;
        if (a.target == this.a) {
            var b = a.detail;
            a = b.outgoingPage;
            b = b.incomingPage;
            if (a && (u(this.N, a), (a = a.querySelectorAll("video")) && 0 < a.length))
                for (this.J = []; this.H.length;) studio.video.Reporter.detach(this.H.shift());
            this.N.observe(b);
            if ((a = b.querySelectorAll("video")) && 0 < a.length) {
                var b = studio.video && studio.video.Reporter,
                    d = this.ea.bind(this);
                this.J = Array.prototype.slice.call(a);
                b ? d() : Enabler.loadModule(studio.module.ModuleId.VIDEO, d)
            }
        }
    };
    e.ea = function() {
        for (var a, b; this.J.length;)
            if (b = this.J.shift(), a = x(b)) studio.video.Reporter.attach(a, b, b.autoplay), this.H.push(a)
    };
    var x = function(a) {
            return "object" == typeof gwd && "GwdId" in gwd ? (new gwd.GwdId(a)).getString() : "string" == typeof a ? a : a.id
        },
        y = function(a) {
            Array.prototype.slice.call(a.a.querySelectorAll("video, gwd-youtube, audio")).forEach(function(a) {
                a.pause()
            })
        };
    w.prototype.attributeChangedCallback = null;
    document.registerElement("gwd-doubleclick", {
        prototype: w.prototype
    });
}()