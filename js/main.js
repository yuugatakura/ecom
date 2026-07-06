(function () {
  "use strict";

  const rupiah = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");

  /* ---------- header / nav ---------- */

  function renderNav() {
    const navDesktop = document.getElementById("navDesktop");
    const navMobileLinks = document.getElementById("navMobileLinks");

    CONTENT.nav.forEach((item) => {
      const a1 = document.createElement("a");
      a1.href = item.href;
      a1.textContent = item.label;
      navDesktop.appendChild(a1);

      const a2 = document.createElement("a");
      a2.href = item.href;
      a2.textContent = item.label;
      navMobileLinks.appendChild(a2);
    });

    [
      "navCta",
      "navCtaMobile",
      "heroCta",
      "finalCta",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.href = CONTENT.ctaUrl;
        el.textContent = CONTENT.ctaLabel;
      }
    });

    const toggle = document.getElementById("navToggle");
    const mobile = document.getElementById("navMobile");
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    mobile.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- hero ---------- */

  function renderHero() {
    document.getElementById("heroHeadline").textContent = CONTENT.hero.headline;
    document.getElementById("heroSub").textContent = CONTENT.hero.sub;
    document.getElementById("heroMicrocopy").textContent = CONTENT.hero.ctaMicrocopy;

    const secondary = document.getElementById("heroSecondary");
    secondary.textContent = CONTENT.hero.secondaryLabel + " ↓";
    secondary.href = CONTENT.hero.secondaryHref;
  }

  /* ---------- leak visualization ---------- */

  function renderLeak() {
    const leak = CONTENT.hero.leak;
    document.getElementById("leakTitle").textContent = leak.title;
    document.getElementById("leakCaption").textContent = leak.caption;
    document.getElementById("leakCallout").textContent = leak.callout;
    document.getElementById("leakCalloutSource").textContent = "— " + leak.calloutSource;
    document.getElementById("leakOwnedNote").textContent = leak.ownedNote;

    const deducted = leak.segments.reduce((s, seg) => s + seg.amount, 0);
    const net = leak.base - deducted;

    const bar = document.getElementById("leakBarMarket");
    const legend = document.getElementById("leakLegend");
    const greys = [
      "rgba(255,255,255,0.07)",
      "rgba(255,255,255,0.11)",
      "rgba(255,255,255,0.15)",
      "rgba(255,255,255,0.19)",
    ];

    leak.segments.forEach((seg, i) => {
      const segEl = document.createElement("div");
      segEl.className = "leak-seg";
      segEl.style.flexGrow = seg.amount;
      segEl.style.background = greys[i % greys.length];
      bar.appendChild(segEl);

      const li = document.createElement("li");
      const swatch = greys[i % greys.length];
      li.innerHTML =
        '<span class="leak-legend-label"><span class="leak-legend-swatch" style="background:' +
        swatch +
        '"></span>' +
        seg.label +
        '<span class="leak-legend-source">' +
        seg.source +
        "</span></span>" +
        '<span class="leak-legend-amount tnum">' +
        rupiah(seg.amount) +
        "</span>";
      legend.appendChild(li);
    });

    const netSeg = document.createElement("div");
    netSeg.className = "leak-seg leak-seg-net";
    netSeg.style.flexGrow = net;
    netSeg.innerHTML =
      "<span>" + leak.netLabel + "</span><span class=\"tnum\">" + rupiah(net) + "</span>";
    bar.appendChild(netSeg);

    document.getElementById("leakOwnedValue").textContent = rupiah(leak.base);
  }

  /* ---------- bento ---------- */

  function renderBento() {
    document.getElementById("bentoEyebrow").textContent = CONTENT.bento.eyebrow;
    document.getElementById("bentoTitle").textContent = CONTENT.bento.title;
    const grid = document.getElementById("bentoGrid");

    CONTENT.bento.tiles.forEach((tile) => {
      const el = document.createElement("div");
      el.className = "bento-tile reveal" + (tile.anchor ? " anchor" : "");
      el.innerHTML =
        '<h3 class="bento-tile-title">' +
        tile.title +
        '</h3><p class="bento-tile-body">' +
        tile.body +
        "</p>";
      grid.appendChild(el);
    });
  }

  /* ---------- proof ---------- */

  function renderProof() {
    document.getElementById("proofEyebrow").textContent = CONTENT.proof.eyebrow;
    document.getElementById("proofTitle").textContent = CONTENT.proof.title;

    const intro = document.createElement("p");
    intro.className = "proof-intro";
    intro.textContent = CONTENT.proof.intro;
    document.getElementById("proofTitle").insertAdjacentElement("afterend", intro);

    const grid = document.getElementById("proofGrid");
    CONTENT.proof.cards.forEach((card) => {
      const el = document.createElement("div");
      el.className = "proof-card reveal" + (card.open ? " open" : "");
      el.innerHTML =
        '<div class="proof-card-mock">' +
        (card.open ? '<span class="proof-card-mock-plus">+</span>' : "") +
        '</div><div class="proof-card-body"><p class="proof-card-tag">' +
        card.tag +
        '</p><h3 class="proof-card-title">' +
        card.title +
        '</h3><p class="proof-card-desc">' +
        card.body +
        "</p></div>";
      grid.appendChild(el);
    });
  }

  /* ---------- why ---------- */

  function renderWhy() {
    document.getElementById("whyEyebrow").textContent = CONTENT.why.eyebrow;
    document.getElementById("whyTitle").textContent = CONTENT.why.title;
    const grid = document.getElementById("whyGrid");

    CONTENT.why.items.forEach((item) => {
      const el = document.createElement("div");
      el.className = "why-item reveal";
      el.innerHTML =
        '<h3 class="why-item-title">' +
        item.title +
        '</h3><p class="why-item-body">' +
        item.body +
        "</p>";
      grid.appendChild(el);
    });
  }

  /* ---------- testimonials ---------- */

  function renderTestimonials() {
    document.getElementById("testiEyebrow").textContent = CONTENT.testimonials.eyebrow;
    document.getElementById("testiTitle").textContent = CONTENT.testimonials.title;
    const grid = document.getElementById("testiGrid");

    CONTENT.testimonials.items.forEach((t) => {
      const el = document.createElement("div");
      el.className = "testi-card reveal";
      el.innerHTML =
        '<p class="testi-quote">' +
        t.quote +
        '</p><p class="testi-attribution">' +
        t.attribution +
        '</p><p class="testi-source">' +
        t.source +
        "</p>";
      grid.appendChild(el);
    });
  }

  /* ---------- metrics ---------- */

  function renderMetrics() {
    document.getElementById("metricsEyebrow").textContent = CONTENT.metrics.eyebrow;
    document.getElementById("metricsTitle").textContent = CONTENT.metrics.title;
    const grid = document.getElementById("metricsGrid");

    CONTENT.metrics.items.forEach((m) => {
      const el = document.createElement("div");
      el.className = "metric reveal";
      el.innerHTML =
        '<div class="metric-value tnum">' +
        m.value +
        m.unit +
        '</div><p class="metric-label">' +
        m.label +
        '</p><p class="metric-source">' +
        m.source +
        "</p>";
      grid.appendChild(el);
    });
  }

  /* ---------- operator ---------- */

  function renderOperator() {
    const op = CONTENT.operator;
    document.getElementById("operatorEyebrow").textContent = op.eyebrow;
    document.getElementById("operatorTitle").textContent = op.title;
    document.getElementById("operatorName").textContent = op.name + " — " + op.role;
    document.getElementById("operatorPhoto").textContent = op.photoPlaceholder
      ? op.photoNote
      : "";

    const list = document.getElementById("operatorPrinciples");
    op.principles.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p;
      list.appendChild(li);
    });
  }

  /* ---------- faq ---------- */

  function renderFaq() {
    document.getElementById("faqEyebrow").textContent = CONTENT.faq.eyebrow;
    document.getElementById("faqTitle").textContent = CONTENT.faq.title;
    const list = document.getElementById("faqList");

    CONTENT.faq.items.forEach((item, i) => {
      const el = document.createElement("div");
      el.className = "faq-item reveal";
      el.dataset.open = "false";
      const qid = "faq-answer-" + i;
      el.innerHTML =
        '<button class="faq-question" aria-expanded="false" aria-controls="' +
        qid +
        '"><span>' +
        item.q +
        '</span><span class="faq-icon" aria-hidden="true"></span></button>' +
        '<div class="faq-answer" id="' +
        qid +
        '"><div class="faq-answer-inner"><p>' +
        item.a +
        "</p></div></div>";
      list.appendChild(el);

      const btn = el.querySelector(".faq-question");
      btn.addEventListener("click", () => {
        const isOpen = el.dataset.open === "true";
        el.dataset.open = String(!isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  /* ---------- final cta ---------- */

  function renderFinalCta() {
    document.getElementById("finalHeadline").textContent = CONTENT.finalCta.headline;
    document.getElementById("finalSub").textContent = CONTENT.finalCta.sub;
    const steps = document.getElementById("finalSteps");
    CONTENT.finalCta.steps.forEach((s, i) => {
      const li = document.createElement("li");
      li.innerHTML = "<span>" + (i + 1) + "</span>" + s;
      steps.appendChild(li);
    });
  }

  /* ---------- footer ---------- */

  function renderFooter() {
    document.getElementById("footerTagline").textContent = CONTENT.footer.tagline;
  }

  /* ---------- scroll reveal ---------- */

  function initReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- boot ---------- */

  function init() {
    renderNav();
    renderHero();
    renderLeak();
    renderBento();
    renderProof();
    renderWhy();
    renderTestimonials();
    renderMetrics();
    renderOperator();
    renderFaq();
    renderFinalCta();
    renderFooter();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
