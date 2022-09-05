// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jHH39":[function(require,module,exports) {
module.exports = require("./helpers/browser/js-loader")(require("./helpers/bundle-url").getBundleURL("fSZlJ") + "data.248fdce9.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("cn6Iz"));

},{"./helpers/browser/js-loader":"aUGG2","./helpers/bundle-url":"95GEp"}],"aUGG2":[function(require,module,exports) {
"use strict";
var cacheLoader = require("../cacheLoader");
module.exports = cacheLoader(function(bundle) {
    return new Promise(function(resolve, reject) {
        // Don't insert the same script twice (e.g. if it was already in the HTML)
        var existingScripts = document.getElementsByTagName("script");
        if ([].concat(existingScripts).some(function isCurrentBundle(script) {
            return script.src === bundle;
        })) {
            resolve();
            return;
        }
        var preloadLink = document.createElement("link");
        preloadLink.href = bundle;
        preloadLink.rel = "preload";
        preloadLink.as = "script";
        document.head.appendChild(preloadLink);
        var script = document.createElement("script");
        script.async = true;
        script.type = "text/javascript";
        script.src = bundle;
        script.onerror = function(e) {
            var error = new TypeError("Failed to fetch dynamically imported module: ".concat(bundle, ". Error: ").concat(e.message));
            script.onerror = script.onload = null;
            script.remove();
            reject(error);
        };
        script.onload = function() {
            script.onerror = script.onload = null;
            resolve();
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    });
});

},{"../cacheLoader":"izQFI"}],"izQFI":[function(require,module,exports) {
"use strict";
var cachedBundles = {};
var cachedPreloads = {};
var cachedPrefetches = {};
function getCache(type) {
    switch(type){
        case "preload":
            return cachedPreloads;
        case "prefetch":
            return cachedPrefetches;
        default:
            return cachedBundles;
    }
}
module.exports = function(loader, type) {
    return function(bundle) {
        var cache = getCache(type);
        if (cache[bundle]) return cache[bundle];
        return cache[bundle] = loader.apply(null, arguments).catch(function(e) {
            delete cache[bundle];
            throw e;
        });
    };
};

},{}],"95GEp":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}]},[], null, "parcelRequire94c2")
const currentDay = new Date().getDay();
const cardWrapper = document.getElementById("svgWrapper");
class BarChart {
    activeClass = "m-active";
    barWidth = 65;
    labelHeight = 20;
    constructor(el){
        this.initListeners(el);
        this.showData();
    }
    showData() {
        const data = parcelRequire94c2("jHH39");
        Promise.resolve(data).then((d)=>{
            const mainData = this.prepareData(d);
            this.drawData(mainData);
        });
    }
    setTotals(ammountsArray, sum) {
        helpers.setText("dayPercent", helpers.formatPercents(ammountsArray[currentDay - 1] / sum));
        helpers.setText("cardTotal", helpers.formatPrice(sum));
    }
    prepareData(data) {
        const maxHeight = svgWrapper.viewBox.baseVal.height;
        const labelSize = this.labelHeight / maxHeight;
        const ammounts = data.map(({ amount  })=>amount);
        const proportion = maxHeight / Math.max(...ammounts);
        const sum = ammounts.reduce((acc, el)=>acc + el, 0);
        data.forEach(({ day , amount  }, idx)=>{
            data[idx].perc = helpers.formatPercents(ammounts[idx] / sum);
            data[idx].rectHeight = helpers.formatPercents(amount / maxHeight * proportion - labelSize);
        });
        this.setTotals(ammounts, sum);
        return data;
    }
    drawData(data) {
        data.forEach(({ day , amount , perc , rectHeight  }, idx)=>{
            graphWrapper.insertAdjacentHTML("beforeend", `<g transform="translate(${idx * this.barWidth}, 0)">
                <rect 
                    class="card__rect ${currentDay == idx + 1 ? "m-active" : ""}" data-value="${amount}" 
                    data-perc="${perc}"
                >
                    <animate 
                            id="graph${idx + 1}" 
                            attributeName="height" 
                            repeatCount="1"
                            from="0"
                            dur="0.4s"
                            fill="freeze"
                            to="${rectHeight}"
                            begin="${idx == 0 ? "0s" : `graph${idx}.end - 0.2s`}"
                    />
                </rect>
                <text class="card__bar-text">${day}</text>
            </g>`);
        });
    }
    initListeners(el) {
        if (el) {
            el.addEventListener("mousemove", this.mouseMoveHandler);
            el.addEventListener("mousedown", this.mouseDownHandler.bind(this));
            el.addEventListener("mouseleave", this.mouseLeaveHandler);
        }
    }
    // HANDLERS
    mouseLeaveHandler() {
        helpers.setVar("--label-opacity", 0);
    }
    mouseDownHandler(e) {
        e.stopPropagation();
        if (e.target && e.target.nodeName == "rect") {
            const currentRect = e.target;
            this.removeActiveClass();
            currentRect.classList.add(this.activeClass);
            helpers.setText("dayPercent", currentRect.dataset.perc);
        }
    }
    mouseMoveHandler(e) {
        e.stopPropagation();
        if (e.target.nodeName == "rect") {
            const currentRect = e.target;
            const { height: rectHeight , left: rectLeft  } = currentRect.getBoundingClientRect();
            const left = rectLeft - svgWrapper.getBoundingClientRect().left + "px";
            helpers.setVar("--label-opacity", 1);
            helpers.setVar("--label-top", rectHeight + "px");
            helpers.setVar("--label-left", left);
            helpers.setText("cardValue", helpers.formatPrice(currentRect.dataset.value));
        } else helpers.setVar("--label-opacity", 0);
    }
    removeActiveClass() {
        const generatedGraphs = Array.from(svgWrapper.getElementsByTagName("rect"));
        generatedGraphs.forEach((r)=>r.classList.remove(this.activeClass));
    }
}
// HELPERS
class Helpers {
    setVar(key, value) {
        document.documentElement.style.setProperty(key, value);
    }
    setText(el, value) {
        document.getElementById(el).textContent = value;
    }
    formatPrice(number) {
        const options = {
            style: "currency",
            currency: "USD"
        };
        const formatter = new Intl.NumberFormat("en-US", options);
        const formattedCurrency = formatter.format(number);
        return formattedCurrency;
    }
    formatPercents(number) {
        const option = {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        const formatter = new Intl.NumberFormat("en-US", option);
        const discountFormat = formatter.format(number);
        return discountFormat;
    }
}
const helpers = new Helpers;
const bar = new BarChart(cardWrapper);

//# sourceMappingURL=index.672d4772.js.map
