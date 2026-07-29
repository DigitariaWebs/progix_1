"use client";

import { useEffect } from "react";

/**
 * Scroll-in reveal for the document body, ported from the source's
 * `componentDidMount`: each section block fades/rises as it enters the viewport,
 * with a stagger across grid children. Sets the hidden state in JS (so the page
 * is fully visible without JS) and honors prefers-reduced-motion.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.querySelector("[data-devis-root]");
    if (!root) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const hide = (el: HTMLElement, dy: number, delay: number) => {
      el.style.opacity = "0";
      el.style.transform = `translateY(${dy}px)`;
      el.style.transition = "opacity .7s ease, transform .8s cubic-bezier(.16,.84,.44,1)";
      el.style.transitionDelay = `${delay}ms`;
      el.style.willChange = "opacity, transform";
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    const observed: HTMLElement[] = [];
    root.querySelectorAll("[data-dc-section] > div").forEach((container) => {
      Array.from(container.children).forEach((node) => {
        const block = node as HTMLElement;
        if (getComputedStyle(block).display === "grid") {
          Array.from(block.children).forEach((childNode, index) => {
            const child = childNode as HTMLElement;
            hide(child, 16, Math.min(index, 5) * 70);
            io.observe(child);
            observed.push(child);
          });
        } else {
          hide(block, 22, 0);
          io.observe(block);
          observed.push(block);
        }
      });
    });

    return () => {
      io.disconnect();
      observed.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
        el.style.transition = "";
        el.style.transitionDelay = "";
        el.style.willChange = "";
      });
    };
  }, []);

  return null;
}
