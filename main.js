(function () {
  var doc = document.documentElement;

  /* mobile drawer */
  var t = document.getElementById("mob-toggle"),
    d = document.getElementById("mob-drawer"),
    o = document.getElementById("mob-overlay"),
    c = document.getElementById("drawer-close");
  function openDrawer() {
    d.removeAttribute("hidden");
    o.classList.add("visible");
    t.setAttribute("aria-expanded", "true");
    t.setAttribute("aria-label", "Close navigation menu");
    doc.style.overflow = "hidden";
  }
  function closeDrawer() {
    d.setAttribute("hidden", "");
    o.classList.remove("visible");
    t.setAttribute("aria-expanded", "false");
    t.setAttribute("aria-label", "Open navigation menu");
    doc.style.overflow = "";
  }
  if (t && d && o) {
    t.addEventListener("click", function () {
      if (t.getAttribute("aria-expanded") === "true") { closeDrawer(); } else { openDrawer(); }
    });
    if (c) { c.addEventListener("click", closeDrawer); }
    o.addEventListener("click", closeDrawer);
    d.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeDrawer); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 768) { closeDrawer(); } });
    d.querySelectorAll(".drawer-toggle").forEach(function (b) {
      b.addEventListener("click", function () {
        var g = b.parentNode;
        var isOpen = g.classList.toggle("open");
        b.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });
  }

  /* FAQ accordion (max-height toggle) */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentNode;
      var isOpen = item.classList.toggle("open");
      q.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  /* tabs: progressive enhancement, all panels stay readable without JS */
  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var btns = box.querySelectorAll('[role="tab"]');
    var panels = box.querySelectorAll('[role="tabpanel"]');
    function show(i) {
      btns.forEach(function (b, k) {
        b.setAttribute("aria-selected", k === i ? "true" : "false");
        b.setAttribute("tabindex", k === i ? "0" : "-1");
      });
      panels.forEach(function (p, k) {
        if (k === i) { p.removeAttribute("hidden"); } else { p.setAttribute("hidden", ""); }
      });
    }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { show(i); });
      b.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { show((i + 1) % btns.length); btns[(i + 1) % btns.length].focus(); }
        if (e.key === "ArrowLeft") { show((i + btns.length - 1) % btns.length); btns[(i + btns.length - 1) % btns.length].focus(); }
      });
    });
    show(0);
  });
})();
