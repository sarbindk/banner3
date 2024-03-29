- function() {
    "use strict";
    var c = function(a) {
            return "gwd-page" == a.tagName.toLowerCase() || "gwd-page" == a.getAttribute("is")
        },
        e = function(a) {
            if (c(a)) return a;
            for (; a && 9 != a.nodeType;)
                if ((a = a.parentElement) && c(a)) return a;
            return null
        };
    var f = function(a, b) {
        var d;
        d = document.createEvent("Event");
        d.initEvent(a, !0, !0);
        b.dispatchEvent(d)
    };
    var g = function() {};
    goog.inherits(g, HTMLImageElement);
    g.prototype.createdCallback = function() {
        this.f = this.g.bind(this);
        this.a = 0;
        this.b = this.c = -1;
        Object.defineProperty(this, "assetWidth", {
            enumerable: !0,
            get: function() {
                return this.c
            }
        });
        Object.defineProperty(this, "assetHeight", {
            enumerable: !0,
            get: function() {
                return this.b
            }
        });
        var a = this.getAttribute("src");
        a && (this.setAttribute("source", a), this.removeAttribute("src"));
        this.addEventListener("load", this.f, !1);
        this.addEventListener("error", this.f, !1)
    };
    g.prototype.attachedCallback = function() {
        if ("function" == typeof this.gwdLoad && "function" == typeof this.gwdIsLoaded && !this.gwdIsLoaded()) {
            var a = e(this),
                b = a && "function" == typeof a.gwdIsLoaded;
            (!a || b && a.gwdIsLoaded()) && this.gwdLoad()
        }
    };
    g.prototype.gwdIsLoaded = function() {
        return 2 == this.a || 3 == this.a
    };
    g.prototype.gwdLoad = function() {
        var a = this.getAttribute("source");
        a ? (this.a = 1, this.setAttribute("src", a)) : f("load", this)
    };
    g.prototype.g = function(a) {
        a && "error" == a.type ? (this.a = 3, this.b = this.c = -1) : (-1 != this.c && -1 != this.b || !this.getAttribute("source") || (this.c = this.naturalWidth, this.b = this.naturalHeight), this.a = 2);
        h(this);
        f("ready", this)
    };
    var h = function(a) {
        if (2 == a.a) {
            var b = a.getAttribute("source"),
                d = a.getAttribute("scaling") || "stretch";
            b && ("stretch" != d ? (a.classList.add("scaled-proportionally"), a.style.backgroundImage = "url(" + JSON.stringify(b) + ")", a.style.backgroundSize = "none" != d ? d : "auto", "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" != a.getAttribute("src") && a.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")) : (a.classList.remove("scaled-proportionally"),
                a.style.backgroundImage = "", b != a.getAttribute("src") && a.setAttribute("src", b)))
        }
    };
    g.prototype.attributeChangedCallback = function(a) {
        "source" == a && 0 !== this.a && this.gwdLoad();
        "scaling" == a && h(this)
    };
    document.registerElement("gwd-image", {
        prototype: g.prototype,
        "extends": "img"
    });
}()