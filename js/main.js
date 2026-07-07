(function () {
  "use strict";

  const rupiah = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");

  const ICONS = {
    store:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9"/><path d="M9 20v-6h6v6"/></svg>',
    traffic:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/></svg>',
    customers:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
    repeat:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    whatsapp:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.86.505 3.605 1.383 5.104L2 22l5.03-1.352A9.958 9.958 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.111c-1.655 0-3.194-.487-4.489-1.322l-.322-.198-2.988.803.813-2.909-.211-.328A8.086 8.086 0 013.889 12c0-4.472 3.64-8.111 8.112-8.111 4.471 0 8.111 3.639 8.111 8.111 0 4.472-3.64 8.111-8.111 8.111z"/></svg>',
  };

  /* ---------- header / nav ---------- */

  function renderSocialIcons(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML =
      '<a class="ig" href="' +
      CONTENT.instagramUrl +
      '" target="_blank" rel="noopener" aria-label="Instagram Natzach">' +
      ICONS.instagram +
      "</a>" +
      '<a class="wa" href="' +
      CONTENT.whatsappUrl +
      '" target="_blank" rel="noopener" aria-label="WhatsApp Natzach">' +
      ICONS.whatsapp +
      "</a>";
  }

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

    renderSocialIcons("socialIcons");
    renderSocialIcons("socialIconsMobile");
    renderSocialIcons("socialIconsFooter");

    ["navCta", "navCtaMobile", "heroCta", "finalCta"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = CONTENT.ctaLabel;
        el.addEventListener("click", openModal);
      }
    });

    const waFloat = document.getElementById("waFloat");
    if (waFloat) waFloat.href = CONTENT.whatsappUrl;

    const toggle = document.getElementById("navToggle");
    const mobile = document.getElementById("navMobile");
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    mobile.querySelectorAll("nav a").forEach((a) =>
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
        '<div class="bento-icon">' +
        (ICONS[tile.icon] || "") +
        '</div><h3 class="bento-tile-title">' +
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

  /* ---------- pain grid ---------- */

  function renderPainGrid() {
    document.getElementById("painEyebrow").textContent = CONTENT.painGrid.eyebrow;
    document.getElementById("painTitle").textContent = CONTENT.painGrid.title;
    const grid = document.getElementById("painGrid");

    CONTENT.painGrid.items.forEach((item) => {
      const el = document.createElement("div");
      el.className = "pain-card reveal";
      el.innerHTML =
        '<div class="pain-stat">' +
        item.stat +
        '</div><h3 class="pain-card-title">' +
        item.title +
        '</h3><p class="pain-card-body">' +
        item.body +
        '</p><span class="pain-tag">' +
        item.tag +
        "</span>" +
        (item.source ? '<p class="pain-card-source">' + item.source + "</p>" : "");
      grid.appendChild(el);
    });
  }

  /* ---------- calculator ---------- */

  function renderCalc() {
    const c = CONTENT.calc;
    document.getElementById("calcEyebrow").textContent = c.eyebrow;
    document.getElementById("calcTitle").textContent = c.title;
    document.getElementById("calcInputLabel").textContent = c.inputLabel;
    document.getElementById("calcMarketLabel").textContent = c.marketLabel;
    document.getElementById("calcOwnedLabel").textContent = c.ownedLabel;
    document.getElementById("calcSavingsLabel").textContent = c.savingsLabel;
    document.getElementById("calcNote").textContent = c.note;

    const input = document.getElementById("calcInput");

    function formatInput(raw) {
      const digits = raw.replace(/\D/g, "");
      return digits ? Number(digits).toLocaleString("id-ID") : "";
    }

    function compute() {
      const digits = input.value.replace(/\D/g, "");
      const revenue = Number(digits) || 0;

      const marketLow = revenue * c.marketplaceLowPct;
      const marketHigh = revenue * c.marketplaceHighPct;
      const owned = revenue * c.ownedPct;
      const savingsLow = Math.max(0, marketLow - owned);
      const savingsHigh = Math.max(0, marketHigh - owned);
      const savingsYear = ((savingsLow + savingsHigh) / 2) * 12;

      document.getElementById("calcMarketValue").textContent =
        rupiah(marketLow) + " – " + rupiah(marketHigh);
      document.getElementById("calcOwnedValue").textContent = rupiah(owned);
      document.getElementById("calcSavingsValue").textContent =
        rupiah(savingsLow) + " – " + rupiah(savingsHigh);
      document.getElementById("calcSavingsYear").textContent =
        c.savingsYearPrefix + rupiah(savingsYear) + c.savingsYearSuffix;
    }

    input.value = Number(c.defaultValue).toLocaleString("id-ID");
    input.addEventListener("input", () => {
      const caretAtEnd = input.selectionStart === input.value.length;
      input.value = formatInput(input.value);
      if (caretAtEnd) input.setSelectionRange(input.value.length, input.value.length);
      compute();
    });

    compute();
  }

  /* ---------- lead-gate modal ---------- */

  function renderModal() {
    const lf = CONTENT.leadForm;
    document.getElementById("modalEyebrow").textContent = lf.eyebrow;
    document.getElementById("modalTitle").textContent = lf.title;
    document.getElementById("modalSub").textContent = lf.sub;
    document.getElementById("lblName").textContent = lf.fields.name.label;
    document.getElementById("lblBrand").textContent = lf.fields.brand.label;
    document.getElementById("lblWhatsapp").textContent = lf.fields.whatsapp.label;
    document.getElementById("lblRevenue").textContent = lf.fields.revenue.label;
    document.getElementById("lblChannel").textContent = lf.fields.channel.label;
    document.getElementById("fName").placeholder = lf.fields.name.placeholder;
    document.getElementById("fBrand").placeholder = lf.fields.brand.placeholder;
    document.getElementById("fWhatsapp").placeholder = lf.fields.whatsapp.placeholder;

    const revenueSel = document.getElementById("fRevenue");
    lf.fields.revenue.options.forEach((opt) => {
      const o = document.createElement("option");
      o.textContent = opt;
      revenueSel.appendChild(o);
    });

    const channelSel = document.getElementById("fChannel");
    lf.fields.channel.options.forEach((opt) => {
      const o = document.createElement("option");
      o.textContent = opt;
      channelSel.appendChild(o);
    });

    document.getElementById("leadSubmit").textContent = lf.submitLabel;
    const fallback = document.getElementById("modalFallback");
    fallback.textContent = lf.fallbackLabel;
    fallback.href = CONTENT.ctaUrl;

    document.getElementById("leadForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("fName").value.trim();
      const brand = document.getElementById("fBrand").value.trim();
      const whatsapp = document.getElementById("fWhatsapp").value.trim();
      const revenue = document.getElementById("fRevenue").value;
      const channel = document.getElementById("fChannel").value;

      const message =
        "Halo Natzach, saya mau konsultasi gratis.\n\n" +
        "Nama: " + name + "\n" +
        "Brand: " + brand + "\n" +
        "Omzet bulanan: " + revenue + "\n" +
        "Jualan di: " + channel + "\n" +
        "WhatsApp saya: " + whatsapp;

      const waLink = CONTENT.whatsappUrl + "?text=" + encodeURIComponent(message);
      window.open(waLink, "_blank", "noopener");
      closeModal();
      e.target.reset();
    });
  }

  function openModal(e) {
    if (e) e.preventDefault();
    const overlay = document.getElementById("modalOverlay");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const overlay = document.getElementById("modalOverlay");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function initModal() {
    const overlay = document.getElementById("modalOverlay");
    document.getElementById("modalClose").addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
    });
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
    renderModal();
    initModal();
    renderNav();
    renderHero();
    renderLeak();
    renderCalc();
    renderPainGrid();
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
