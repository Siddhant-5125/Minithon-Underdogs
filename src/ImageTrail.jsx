// ImageTrail.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}
function getLocalPointerPos(e, rect) {
  let clientX = 0,
    clientY = 0;
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return { x: clientX - rect.left, y: clientY - rect.top };
}
function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

export default function ImageTrail({ items = [], variant = 1 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const imgEls = Array.from(container.querySelectorAll(".content__img"));
    const imageItems = imgEls.map((el) => {
      return {
        el,
        inner: el.querySelector(".content__img-inner"),
        rect: el.getBoundingClientRect(),
      };
    });

    const updateRects = () => {
      imageItems.forEach((i) => {
        i.rect = i.el.getBoundingClientRect();
      });
    };
    window.addEventListener("resize", updateRects);

    let imgPosition = 0;
    let zIndexVal = 1;
    let activeImagesCount = 0;
    const maxActiveImages = 3; // Limit the number of active images at one time
    let isIdle = true;
    const threshold = 80; // Further increased threshold for less frequent image spawning

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };
    let cacheMousePos = { x: 0, y: 0 };

    const handlePointerMove = (ev) => {
      const rect = container.getBoundingClientRect();
      mousePos = getLocalPointerPos(ev, rect);
    };

    const initRender = (ev) => {
      const rect = container.getBoundingClientRect();
      mousePos = getLocalPointerPos(ev, rect);
      cacheMousePos = { ...mousePos };
      rafId = requestAnimationFrame(render);
      container.removeEventListener("mousemove", initRender);
      container.removeEventListener("touchmove", initRender);
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("touchmove", handlePointerMove);
    container.addEventListener("mousemove", initRender);
    container.addEventListener("touchmove", initRender);

    let rafId = null;
    function render() {
      let distance = getMouseDistance(mousePos, lastMousePos);
      cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.1);
      cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.1);

      if (distance > threshold && activeImagesCount < maxActiveImages) {
        showNextImage();
        lastMousePos = { ...mousePos };
      }

      if (isIdle && zIndexVal !== 1) {
        zIndexVal = 1;
      }

      rafId = requestAnimationFrame(render);
    }

    function showNextImage() {
      ++zIndexVal;
      imgPosition = imgPosition < imageItems.length - 1 ? imgPosition + 1 : 0;
      const img = imageItems[imgPosition];
      img.rect = img.el.getBoundingClientRect();

      gsap.killTweensOf(img.el);
      gsap
        .timeline({
          onStart: () => {
            activeImagesCount++;
            isIdle = false;
          },
          onComplete: () => {
            activeImagesCount--;
            if (activeImagesCount === 0) isIdle = true;
          },
        })
        .fromTo(
          img.el,
          {
            opacity: 1,
            scale: 1,
            zIndex: zIndexVal,
            x: cacheMousePos.x - img.rect.width / 2,
            y: cacheMousePos.y - img.rect.height / 2,
          },
          {
            duration: 0.4,
            ease: "power1",
            x: mousePos.x - img.rect.width / 2,
            y: mousePos.y - img.rect.height / 2,
          },
          0
        )
        .to(
          img.el,
          {
            duration: 0.4,
            ease: "power3",
            opacity: 0,
            scale: 0.2,
          },
          0.4
        );
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("touchmove", handlePointerMove);
      container.removeEventListener("mousemove", initRender);
      container.removeEventListener("touchmove", initRender);
      window.removeEventListener("resize", updateRects);

      imageItems.forEach((i) => {
        gsap.killTweensOf(i.el);
        try {
          gsap.set(i.el, { opacity: 0, scale: 1 });
        } catch (e) {}
      });
    };
  }, [items, variant]);

  return (
    <div style={{ position: 'relative', width: "100%", height: "100%", overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: 'auto', // Enable pointer events for the container
        }}
      >
        <style>{`
          .content__img {
            position: absolute;
            top: 0;
            left: 0;
            width: 120px;
            height: 120px;
            pointer-events: none;
            opacity: 0;
            will-change: transform, opacity;
            transform-origin: center center;
          }
          .content__img-inner {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
          }
        `}</style>

        {items.map((url, i) => (
          <div className="content__img" key={i} aria-hidden>
            <div
              className="content__img-inner"
              style={{ backgroundImage: `url(${url})` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
