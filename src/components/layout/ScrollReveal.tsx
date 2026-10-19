import { useEffect } from "react";

const publicSectionSelector = ".public-main section, .public-main article";
const standaloneSelector = ".site-footer, .site-invoice-shell, .site-invoice-loading, .admin-auth-card";
const adminRevealSelector = [
  ".admin-content > *",
  ".admin-content .admin-page-heading",
  ".admin-content .finance-page-heading",
  ".admin-content .admin-metrics-grid",
  ".admin-content .admin-dashboard-grid",
  ".admin-content .finance-metrics-grid",
  ".admin-content .finance-overview-grid",
  ".admin-content .admin-panel",
  ".admin-content .finance-panel",
  ".admin-content .finance-table-panel",
  ".admin-content .finance-total-card",
  ".admin-content .admin-metric-card",
  ".admin-content .finance-metric-card",
  ".admin-content .finance-client-card",
  ".admin-content .finance-service-card",
  ".admin-content .grid > [class*='bg-white'][class*='rounded']",
].join(", ");
const staggerSelector = ".admin-metric-card, .finance-metric-card, .finance-client-card, .finance-service-card";

function isTopLevelPublicContent(element: Element) {
  if (!element.matches(publicSectionSelector) || element.matches(".site-hero")) return false;
  return !element.parentElement?.closest(".public-main section, .public-main article");
}

export default function ScrollReveal() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches || !("IntersectionObserver" in window) || !("MutationObserver" in window)) return;

    const root = document.documentElement;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });

    const setStaggerDelay = (element: Element) => {
      if (!element.matches(staggerSelector) || !element.parentElement) return;
      const siblings = Array.from(element.parentElement.children).filter((child) => child.matches(staggerSelector));
      const index = Math.max(0, siblings.indexOf(element));
      (element as HTMLElement).style.setProperty("--motion-delay", `${Math.min(index, 4) * 55}ms`);
    };

    const observeElement = (element: Element) => {
      if (element.closest("[data-motion-reveal='off']")) return;
      if (element.matches(publicSectionSelector) && !isTopLevelPublicContent(element)) return;
      setStaggerDelay(element);
      if (element.classList.contains("motion-reveal")) return;
      element.classList.add("motion-reveal");
      revealObserver.observe(element);
    };

    const collect = (node: Node) => {
      const queryRoot = node instanceof Element ? node : node === document ? document : null;
      if (!queryRoot) return;

      if (node instanceof Element) {
        if (node.matches(publicSectionSelector) || node.matches(standaloneSelector) || node.matches(adminRevealSelector)) observeElement(node);
      }

      queryRoot.querySelectorAll(`${publicSectionSelector}, ${standaloneSelector}, ${adminRevealSelector}`).forEach(observeElement);
    };

    root.classList.add("motion-scroll-ready");
    collect(document);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(collect));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      root.classList.remove("motion-scroll-ready");
      document.querySelectorAll(".motion-reveal").forEach((element) => element.classList.add("is-visible"));
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };

    motionPreference.addEventListener("change", handleMotionPreference);
    return () => {
      root.classList.remove("motion-scroll-ready");
      revealObserver.disconnect();
      mutationObserver.disconnect();
      motionPreference.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return null;
}
