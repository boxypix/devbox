;(function () {
  var DEBOUNCE_DELAY_MS = 400;
  var MAX_GTAG_READY_RETRIES = 10;
  var GTAG_RETRY_DELAY_MS = 500;

  var lastSentHashId = null;
  var pendingTimeoutId = null;

  function safeLog() {
    if (typeof console !== "undefined" && console && typeof console.warn === "function") {
      try {
        console.warn.apply(console, arguments);
      } catch (_) {
        // ignore
      }
    }
  }

  function getCurrentHashId() {
    var raw = (window.location && window.location.hash) ? window.location.hash : "";
    raw = raw.replace(/^#/, "").trim();
    if (!raw) return null;
    return raw;
  }

  function getMeasurementIdFromScript() {
    try {
      var scripts = document.getElementsByTagName("script");
      for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].getAttribute("src") || "";
        if (!src) continue;
        // Ищем id=G-XXXX в src gtag.js
        var match = src.match(/[?&]id=([^&]+)/);
        if (match && match[1]) {
          return decodeURIComponent(match[1]);
        }
      }
    } catch (e) {
      safeLog("GA hash tracking: cannot detect measurement id", e);
    }
    return null;
  }

  function whenGtagReady(callback, attempt) {
    attempt = typeof attempt === "number" ? attempt : 0;
    if (typeof window.gtag === "function" && Array.isArray(window.dataLayer)) {
      callback();
      return;
    }
    if (attempt >= MAX_GTAG_READY_RETRIES) {
      safeLog("GA hash tracking: gtag not ready after retries");
      return;
    }
    setTimeout(function () {
      whenGtagReady(callback, attempt + 1);
    }, GTAG_RETRY_DELAY_MS);
  }

  function sendHashViewEvent(hashId) {
    if (!hashId) return;
    try {
      if (typeof window.gtag === "function") {
        // Mode A: custom event for hash views
        window.gtag("event", "view_hash", {
          hash_id: hashId
        });

        // Mode B (alternative, commented out):
        // Virtual page_view with page_path=/treem/<hash>
        // using the existing measurement ID from gtag.js snippet.
        //
        // var measurementId = getMeasurementIdFromScript();
        // if (measurementId) {
        //   window.gtag("config", measurementId, {
        //     send_page_view: false,
        //     page_path: "/treem/" + String(hashId)
        //   });
        //
        //   window.gtag("event", "page_view", {
        //     page_path: "/treem/" + String(hashId)
        //   });
        // }
      }
    } catch (e) {
      safeLog("GA hash tracking: failed to send event", e);
    }
  }

  function scheduleHashSend(hashId) {
    if (!hashId) return;
    if (hashId === lastSentHashId) {
      return; // anti-duplicate
    }

    if (pendingTimeoutId != null) {
      clearTimeout(pendingTimeoutId);
      pendingTimeoutId = null;
    }

    pendingTimeoutId = window.setTimeout(function () {
      pendingTimeoutId = null;
      if (hashId === lastSentHashId) {
        return;
      }
      lastSentHashId = hashId;
      whenGtagReady(function () {
        sendHashViewEvent(hashId);
      });
    }, DEBOUNCE_DELAY_MS);
  }

  function handleHashUpdate() {
    var hashId = getCurrentHashId();
    if (!hashId) {
      return;
    }
    scheduleHashSend(hashId);
  }

  function sendClickEvent(elementId) {
    if (!elementId) return;
    whenGtagReady(function () {
      try {
        if (typeof window.gtag === "function") {
          window.gtag("event", "ui_click", {
            element_id: elementId
          });
        }
      } catch (e) {
        safeLog("GA click tracking: failed to send event", e);
      }
    });
  }

  function bindClick(selector, elementId) {
    try {
      var nodes = document.querySelectorAll(selector);
      if (!nodes || !nodes.length) return;
      nodes.forEach
        ? nodes.forEach(function (node) {
            node.addEventListener("click", function () {
              sendClickEvent(elementId);
            });
          })
        : Array.prototype.forEach.call(nodes, function (node) {
            node.addEventListener("click", function () {
              sendClickEvent(elementId);
            });
          });
    } catch (e) {
      safeLog("GA click tracking: failed to bind for", selector, e);
    }
  }

  window.addEventListener("hashchange", handleHashUpdate);
  window.addEventListener("load", function () {
    // Initial hash tracking on load
    handleHashUpdate();

    // tabbarRight buttons (4)
    bindClick(".tabbarRight .crumbsAuthor:not(.crumbsAuthor2)", "tabbarRight_linkedin");
    bindClick(".tabbarRight .crumbsAuthor.crumbsAuthor2", "tabbarRight_site");
    bindClick(".tabbarRight .crumbsReportBtn", "tabbarRight_report");
    bindClick(".tabbarRight .crumbsFormBtn", "tabbarRight_form");

    // authorBlockBtn (footer CTA)
    bindClick(".authorBlockBtn", "authorBlockBtn");

    // treeSearchRow: search input focus + expand/collapse buttons
    try {
      var searchInput = document.querySelector(".treeSearchRow input[type='search']");
      if (searchInput) {
        searchInput.addEventListener("focus", function () {
          sendClickEvent("treeSearchRow_search");
        });
      }
    } catch (e) {
      safeLog("GA click tracking: failed to bind search input", e);
    }

    bindClick("#expandAll", "treeSearchRow_expandAll");
    bindClick("#collapseAll", "treeSearchRow_collapseAll");

    // homeTiles: card click and button click with the same IDs
    try {
      var tiles = document.querySelectorAll(".homeTile[data-href]");
      if (tiles && tiles.length) {
        var toArray = tiles.forEach
          ? function (fn) { tiles.forEach(fn); }
          : function (fn) { Array.prototype.forEach.call(tiles, fn); };

        toArray(function (tile) {
          var href = tile.getAttribute("data-href") || "";
          var tileKey = href.replace(/^#/, "").replace(/^https?:\/\//i, "");

          // Special case: feedback Google Form card → stable, short ID
          if (href === "https://docs.google.com/forms/d/e/1FAIpQLSdyiKgXUVWH0LsK-QLraWpql0xE8fP4UrMbvnwq3EScBVDbPw/viewform?fbzx=8599497846464062427") {
            tileKey = "five";
          }

          if (!tileKey) tileKey = "unknown";
          var elementId = "homeTile_" + tileKey;

          tile.addEventListener("click", function (e) {
            // Если клик был по кнопке внутри, счётчик для карточки не дублируем
            if (e && e.target && typeof e.target.closest === "function") {
              if (e.target.closest(".homeTileBtn")) {
                return;
              }
            }
            sendClickEvent(elementId);
          });

          var btn = tile.querySelector(".homeTileBtn");
          if (btn) {
            btn.addEventListener("click", function () {
              sendClickEvent(elementId);
            });
          }
        });
      }
    } catch (e) {
      safeLog("GA click tracking: failed to bind home tiles", e);
    }
  });
})();

