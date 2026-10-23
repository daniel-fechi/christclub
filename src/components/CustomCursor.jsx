
import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (!finePointer.matches) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;

    if (!cursor || !glow) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let glowX = targetX;
    let glowY = targetY;
    let animationFrame;

    const moveCursor = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      cursor.style.left = `${targetX}px`;
      cursor.style.top = `${targetY}px`;

      glow.style.opacity = "1";
      cursor.style.opacity = "1";
    };

    const animateGlow = () => {
      glowX += (targetX - glowX) * 0.14;
      glowY += (targetY - glowY) * 0.14;

      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;

      animationFrame = window.requestAnimationFrame(animateGlow);
    };

    const hideCursor = () => {
      cursor.style.opacity = "0";
      glow.style.opacity = "0";
    };

    const showCursor = () => {
      cursor.style.opacity = "1";
      glow.style.opacity = "1";
    };

    const handlePointerOver = (event) => {
      if (
        event.target.closest(
          "a, button, input, textarea, select, [role='button']"
        )
      ) {
        cursor.classList.add("custom-cursor-hover");
        glow.classList.add("custom-glow-hover");
      } else {
        cursor.classList.remove("custom-cursor-hover");
        glow.classList.remove("custom-glow-hover");
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handlePointerOver);
    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseleave", hideCursor);

    animationFrame = window.requestAnimationFrame(animateGlow);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handlePointerOver);
      document.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("mouseleave", hideCursor);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="custom-cursor-glow"
        aria-hidden="true"
      />

      <div
        ref={cursorRef}
        className="custom-cursor-cross"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 40"
          width="28"
          height="36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2H20V13H30V21H20V38H12V21H2V13H12Z"
            fill="#101012"
          />
        </svg>
      </div>
    </>
  );
}
