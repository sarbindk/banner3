- function() {
    "use strict";
    var b;
    var c = function(a, g) {
        var e;
        e = document.createEvent("Event");
        e.initEvent(a, !0, !0);
        g.dispatchEvent(e)
    };
    var d = function() {};
    goog.inherits(d, HTMLDivElement);
    b = d.prototype;
    b.createdCallback = function() {
        this.h = this.i.bind(this);
        this.a = [];
        this.g = this.b = this.f = !1;
        var a = parseInt(this.getAttribute("data-gwd-width"), 10) || this.clientWidth;
        this.j = (parseInt(this.getAttribute("data-gwd-height"), 10) || this.clientHeight) >= a;
        this.c = !1
    };
    b.attachedCallback = function() {
        this.addEventListener("ready", this.h, !1);
        setTimeout(function() {
            this.a = Array.prototype.slice.call(this.querySelectorAll("*")).filter(function(a) {
                return "function" != typeof a.gwdLoad || "function" != typeof a.gwdIsLoaded || a.gwdIsLoaded() ? !1 : !0
            }, this);
            this.g = !0;
            0 < this.a.length ? (this.style.visibility = "hidden", this.f = !1) : f(this);
            this.b = !0;
            c("attached", this)
        }.bind(this), 0)
    };
    b.detachedCallback = function() {
        this.removeEventListener("ready", this.h, !1);
        this.classList.remove("gwd-play-animation");
        c("detached", this)
    };
    b.gwdActivate = function() {
        this.classList.remove("gwd-inactive");
        Array.prototype.slice.call(this.querySelectorAll("*")).forEach(function(a) {
            "function" == typeof a.gwdActivate && "function" == typeof a.gwdIsActive && 0 == a.gwdIsActive() && a.gwdActivate()
        });
        this.c = !0;
        this.b ? this.b = !1 : c("attached", this);
        c("pageactivated", this)
    };
    b.gwdDeactivate = function() {
        this.classList.add("gwd-inactive");
        this.classList.remove("gwd-play-animation");
        Array.prototype.slice.call(this.querySelectorAll("*")).forEach(function(a) {
            "function" == typeof a.gwdDeactivate && "function" == typeof a.gwdIsActive && 1 == a.gwdIsActive() && a.gwdDeactivate()
        });
        this.c = !1;
        c("pagedeactivated", this);
        c("detached", this)
    };
    b.gwdIsActive = function() {
        return this.c
    };
    b.gwdIsLoaded = function() {
        return this.g && 0 == this.a.length
    };
    b.gwdLoad = function() {
        if (this.gwdIsLoaded()) f(this);
        else
            for (var a = this.a.length - 1; 0 <= a; a--) this.a[a].gwdLoad()
    };
    b.i = function(a) {
        a = this.a.indexOf(a.target);
        0 <= a && (this.a.splice(a, 1), 0 == this.a.length && f(this))
    };
    var f = function(a) {
        a.style.visibility = "";
        a.f || (c("ready", a), c("pageload", a));
        a.f = !0
    };
    d.prototype.gwdPresent = function() {
        c("pagepresenting", this);
        this.classList.add("gwd-play-animation")
    };
    d.prototype.isPortrait = function() {
        return this.j
    };
    d.prototype.attributeChangedCallback = null;
    document.registerElement("gwd-page", {
        prototype: d.prototype,
        "extends": "div"
    });
}()