import { animate } from "motion";
import { useEffect } from "react";

const ENTRANCE_EASE = [0.22, 1, 0.36, 1];
const FLOAT_EASE = "ease-in-out";

function registerPlayback(cleanups, control) {
  if (!control) return;

  if (typeof control === "function") {
    cleanups.push(control);
    return;
  }

  if (typeof control.stop === "function") {
    cleanups.push(() => control.stop());
  }
}

function animateStaggered(elements, keyframes, options, stepDelay, cleanups) {
  const nodes = Array.from(elements);

  nodes.forEach((element, index) => {
    registerPlayback(
      cleanups,
      animate(element, keyframes, {
        ...options,
        delay: (options.delay ?? 0) + index * stepDelay,
      }),
    );
  });
}

export default function HomeMotion({ runtimeQuery = false }) {
  useEffect(() => {
    if (runtimeQuery && new URLSearchParams(window.location.search).get("motion") !== "1") {
      document.documentElement.classList.remove("home-motion");
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.remove("home-motion");
      return undefined;
    }

    const cleanups = [];
    const root = document.documentElement;

    registerPlayback(
      cleanups,
      animate(
        "#hero img[fetchpriority='high']",
        { opacity: [0.2, 1], scale: [1.5, 1.35], y: [36, 0] },
        { duration: 1.6, ease: ENTRANCE_EASE },
      ),
    );

    registerPlayback(
      cleanups,
      animate(
        "#header",
        { opacity: [0, 1], y: [-16, 0] },
        { duration: 0.75, ease: ENTRANCE_EASE },
      ),
    );

    registerPlayback(
      cleanups,
      animate(
        "#hero .bg-gradient-to-t",
        { opacity: [0, 1], y: [40, 0] },
        { duration: 1, delay: 0.15, ease: ENTRANCE_EASE },
      ),
    );

    animateStaggered(
      document.querySelectorAll("#hero .bg-gradient-to-t > *"),
      { opacity: [0, 1], y: [24, 0] },
      { duration: 0.85, ease: ENTRANCE_EASE, delay: 0.22 },
      0.11,
      cleanups,
    );

    registerPlayback(
      cleanups,
      animate(
        "#date",
        { opacity: [0, 1], y: [36, 0] },
        { duration: 0.9, delay: 0.28, ease: ENTRANCE_EASE },
      ),
    );

    animateStaggered(
      document.querySelectorAll("#date > .max-w-3xl > *"),
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.7, ease: ENTRANCE_EASE, delay: 0.38 },
      0.08,
      cleanups,
    );

    registerPlayback(
      cleanups,
      animate(
        "#date .my-6",
        { opacity: [0, 1], scale: [0.75, 1] },
        { duration: 0.8, delay: 0.55, ease: ENTRANCE_EASE },
      ),
    );

    animateStaggered(
      document.querySelectorAll("#date .mt-4.w-full > * > *"),
      { opacity: [0, 1], y: [18, 0], scale: [0.92, 1] },
      { duration: 0.65, ease: ENTRANCE_EASE, delay: 0.62 },
      0.06,
      cleanups,
    );

    registerPlayback(
      cleanups,
      animate(
        "#hero img[fetchpriority='high']",
        { y: [0, -10, 0], scale: [1.35, 1.38, 1.35] },
        { duration: 6.5, delay: 1.4, repeat: Infinity, ease: FLOAT_EASE },
      ),
    );

    const releaseInitialState = window.requestAnimationFrame(() => {
      root.classList.remove("home-motion");
    });

    cleanups.push(() => {
      window.cancelAnimationFrame(releaseInitialState);
      root.classList.remove("home-motion");
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
