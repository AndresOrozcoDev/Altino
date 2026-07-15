"use strict";

(() => {
  if (window.__altinoMainLoaded) {
    return;
  }
  window.__altinoMainLoaded = true;

  function installPageSkeleton() {
    const root = document.documentElement;
    root.classList.add("altino-loading");

    const mount = () => {
      if (document.getElementById("altino-page-skeleton")) return;
      const overlay = document.createElement("div");
      overlay.id = "altino-page-skeleton";
      overlay.setAttribute("aria-hidden", "true");
      overlay.innerHTML = `
        <div class="sk-block"></div>
        <div class="sk-block"></div>
        <div class="sk-grid">
          <div class="sk-card"></div>
          <div class="sk-card"></div>
          <div class="sk-card"></div>
        </div>
      `;
      document.body.appendChild(overlay);
    };

    if (document.body) mount();
    else document.addEventListener("DOMContentLoaded", mount, { once: true });

    let done = false;
    const hide = () => {
      if (done) return;
      done = true;
      root.classList.remove("altino-loading");
      const overlay = document.getElementById("altino-page-skeleton");
      if (overlay) {
        overlay.classList.add("is-hiding");
        setTimeout(() => overlay.remove(), 220);
      }
    };

    window.addEventListener("load", hide, { once: true });
    setTimeout(hide, 9e3);
  }

  function ensureIndexMobileMenu() {
    const navInner = document.querySelector('header nav[aria-label="Principal"] > div');
    if (!navInner || navInner.querySelector(".altino-mobile")) {
      return;
    }

    const linksContainer = navInner.querySelector("div:last-child");
    if (!linksContainer) {
      return;
    }

    linksContainer.classList.add("altino-links-desktop");

    const details = document.createElement("details");
    details.className = "altino-mobile";

    const summary = document.createElement("summary");
    summary.setAttribute("aria-label", "Abrir menu principal");
    summary.innerHTML =
      '<span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>' +
      '<span class="menu-label-sr">Menu</span>';
    details.appendChild(summary);

    const panel = document.createElement("div");
    panel.className = "altino-mobile-panel";

    const links = linksContainer.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
      const a = links[i];
      const mobileA = a.cloneNode(true);
      const isWa = a.href && a.href.indexOf("wa.me") !== -1;
      mobileA.className = isWa ? "altino-mobile-wa" : "altino-mobile-link";
      mobileA.removeAttribute("style");
      mobileA.addEventListener("click", () => {
        details.open = false;
      });
      panel.appendChild(mobileA);
    }

    navInner.appendChild(details);
    navInner.appendChild(panel);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function resolvePath(scope, expr) {
    const path = String(expr || "").trim();
    if (!path) return undefined;
    const parts = path.split(".");
    let cur = scope;
    for (let i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  const ONLY_MUSTACHE_RE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;
  const ANY_MUSTACHE_RE = /\{\{\s*([^}]+?)\s*\}\}/g;

  function evaluateMustache(raw, scope) {
    const only = String(raw || "").match(ONLY_MUSTACHE_RE);
    if (only) return resolvePath(scope, only[1]);
    return String(raw || "").replace(ANY_MUSTACHE_RE, (_, expr) => {
      const val = resolvePath(scope, expr);
      return val == null ? "" : String(val);
    });
  }

  function interpolateText(raw, scope) {
    return String(raw || "").replace(ANY_MUSTACHE_RE, (_, expr) => {
      const val = resolvePath(scope, expr);
      return val == null ? "" : escapeHtml(String(val));
    });
  }

  const VOID_TAGS = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
  ]);

  const BOOLEAN_ATTRS = new Set([
    "checked", "disabled", "selected", "readonly", "required", "multiple", "autofocus"
  ]);

  class DCLogic {
    constructor() {
      if (this.state == null || typeof this.state !== "object") {
        this.state = {};
      }
      this.__runtime = null;
    }

    setState(next) {
      const patch = typeof next === "function" ? next(this.state) : next;
      if (patch && typeof patch === "object") {
        this.state = { ...this.state, ...patch };
      }
      if (this.__runtime) this.__runtime.update();
    }

    renderVals() {
      return {};
    }
  }

  function renderNodes(nodes, scope, ctx) {
    let html = "";
    for (const node of nodes) {
      html += renderNode(node, scope, ctx);
    }
    return html;
  }

  function renderNode(node, scope, ctx) {
    if (node.nodeType === Node.TEXT_NODE) {
      return interpolateText(node.textContent || "", scope);
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }

    const tag = node.tagName.toLowerCase();

    if (tag === "sc-for") {
      const listExpr = node.getAttribute("list");
      const listValue = evaluateMustache(listExpr || "", scope);
      const list = Array.isArray(listValue) ? listValue : [];
      const alias = (node.getAttribute("as") || "item").trim() || "item";
      let out = "";
      for (let i = 0; i < list.length; i++) {
        const childScope = Object.assign({}, scope);
        childScope[alias] = list[i];
        childScope.$index = i;
        out += renderNodes(Array.from(node.childNodes), childScope, ctx);
      }
      return out;
    }

    if (tag === "sc-if") {
      const condExpr = node.getAttribute("value");
      const ok = !!evaluateMustache(condExpr || "", scope);
      return ok ? renderNodes(Array.from(node.childNodes), scope, ctx) : "";
    }

    const attrs = [];
    const eventMap = {};
    let hoverStyle = "";
    let focusStyle = "";

    for (const attr of Array.from(node.attributes)) {
      const name = attr.name;
      const raw = attr.value;

      if (name === "style-hover") {
        const value = evaluateMustache(raw, scope);
        hoverStyle = value == null ? "" : String(value);
        continue;
      }

      if (name === "style-focus") {
        const value = evaluateMustache(raw, scope);
        focusStyle = value == null ? "" : String(value);
        continue;
      }

      if (name === "onClick" || name === "onChange" || name === "onSubmit" || name === "onInput" || name === "onBlur" || name === "onFocus") {
        const handler = evaluateMustache(raw, scope);
        if (typeof handler === "function") {
          const eventName = name.slice(2).toLowerCase();
          eventMap[eventName] = handler;
        }
        continue;
      }

      const value = evaluateMustache(raw, scope);

      if (BOOLEAN_ATTRS.has(name)) {
        if (value) attrs.push(name);
        continue;
      }

      if (value == null) continue;
      attrs.push(`${name}="${escapeHtml(String(value))}"`);
    }

    const hasBinding = Object.keys(eventMap).length > 0 || hoverStyle || focusStyle;
    let eventId = null;
    if (hasBinding) {
      eventId = `dc_${++ctx.counter}`;
      attrs.push(`data-dc-id="${eventId}"`);
      ctx.bindings[eventId] = { events: eventMap, hoverStyle, focusStyle };
    }

    const openTag = attrs.length > 0 ? `<${tag} ${attrs.join(" ")}>` : `<${tag}>`;

    if (VOID_TAGS.has(tag)) {
      return openTag;
    }

    const children = renderNodes(Array.from(node.childNodes), scope, ctx);
    return `${openTag}${children}</${tag}>`;
  }

  function applyInteractiveStyles(element, hoverStyle, focusStyle) {
    if (hoverStyle) {
      element.addEventListener("mouseenter", () => {
        element.__dcPrevStyleHover = element.getAttribute("style") || "";
        const base = element.__dcPrevStyleHover.trim();
        const next = base ? `${base};${hoverStyle}` : hoverStyle;
        element.setAttribute("style", next);
      });
      element.addEventListener("mouseleave", () => {
        element.setAttribute("style", element.__dcPrevStyleHover || "");
      });
    }

    if (focusStyle) {
      element.addEventListener("focus", () => {
        element.__dcPrevStyleFocus = element.getAttribute("style") || "";
        const base = element.__dcPrevStyleFocus.trim();
        const next = base ? `${base};${focusStyle}` : focusStyle;
        element.setAttribute("style", next);
      }, true);
      element.addEventListener("blur", () => {
        element.setAttribute("style", element.__dcPrevStyleFocus || "");
      }, true);
    }
  }

  function applyHelmetOnce(rootFragment) {
    const helmet = rootFragment.querySelector("helmet");
    if (!helmet) return;

    for (const child of Array.from(helmet.children)) {
      const tag = child.tagName.toLowerCase();
      if (tag === "title") {
        document.title = child.textContent || "";
      } else {
        document.head.appendChild(child.cloneNode(true));
      }
    }

    helmet.remove();
  }

  function boot() {
    const dc = document.querySelector("x-dc");
    if (!dc) return;

    const scriptEl = document.querySelector("script[data-dc-script]");
    const source = document.createElement("template");
    source.innerHTML = dc.innerHTML;

    applyHelmetOnce(source.content);

    const host = document.createElement("div");
    host.id = "dc-root";
    dc.replaceWith(host);

    let ComponentClass = class extends DCLogic {};
    if (scriptEl && scriptEl.textContent && scriptEl.textContent.trim()) {
      try {
        ComponentClass = new Function("DCLogic", `${scriptEl.textContent}\nreturn Component;`)(DCLogic);
      } catch (err) {
        console.error("[dc] error compiling Component:", err);
      }
    }

    let component;
    try {
      component = new ComponentClass();
    } catch (err) {
      console.error("[dc] error constructing Component:", err);
      component = new DCLogic();
    }

    const runtime = {
      update() {
        const vals = component && typeof component.renderVals === "function" ? component.renderVals() : {};
        const scope = vals && typeof vals === "object" ? vals : {};
        const ctx = { counter: 0, bindings: {} };
        const html = renderNodes(Array.from(source.content.childNodes), scope, ctx);
        host.innerHTML = html;

        const nodes = host.querySelectorAll("[data-dc-id]");
        for (const el of nodes) {
          const id = el.getAttribute("data-dc-id");
          const binding = ctx.bindings[id];
          if (!binding) continue;

          const entries = Object.entries(binding.events || {});
          for (const [eventName, fn] of entries) {
            if (typeof fn === "function") {
              el.addEventListener(eventName, (ev) => fn.call(component, ev));
            }
          }

          applyInteractiveStyles(el, binding.hoverStyle, binding.focusStyle);
        }
      }
    };

    component.__runtime = runtime;
    runtime.update();
  }

  installPageSkeleton();

  if (document.readyState !== "loading") {
    ensureIndexMobileMenu();
    boot();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      ensureIndexMobileMenu();
      boot();
    }, { once: true });
  }
})();
