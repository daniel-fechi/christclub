
import React, { useEffect, useState } from "react";
import Brand from "./Brand";

const LINKS = [
  ["The Drop", "#drop"],
  ["The Verses", "#verses"],
  ["Details", "#details"],
  ["Sizing", "#sizing"],
];

export default function Header({ cartCount = 0, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (window.scrollY > 100) {
        setMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={`nav${scrolled ? " scrolled" : ""}${
        menuOpen ? " menu-open" : ""
      }`}
    >
      <div
        className="nav-row"
        style={{
          paddingTop: scrolled ? 12 : 20,
          paddingBottom: scrolled ? 12 : 20,
        }}
      >
        <Brand />

        <nav className="nav-links" aria-label="Main navigation">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-cart"
            onClick={() => {
              closeMenu();
              onOpenCart?.();
            }}
            aria-label={`Open shopping bag with ${cartCount} items`}
          >
            <span>Bag</span>
            <span className="count">{cartCount}</span>
          </button>

          <button
            type="button"
            className={`burger menu-trigger${menuOpen ? " active" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />

          <nav
            id="mobile-navigation"
            className="mobile-menu"
            aria-label="Mobile navigation"
          >
            <div className="mobile-menu-heading">
              <div>
                <span className="mobile-menu-eyebrow">
                  3RINITY CULTURE
                </span>

                <h2>Explore the collection.</h2>
              </div>
            </div>

            <div className="mobile-menu-links">
              {LINKS.map(([label, href], index) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  style={{ "--menu-index": index }}
                >
                  <span className="mobile-menu-number">
                    0{index + 1}
                  </span>

                  <span className="mobile-menu-link-label">
                    {label}
                  </span>

                  <span className="mobile-menu-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <a
              className="mobile-menu-shop"
              href="#drop"
              onClick={closeMenu}
            >
              <span>SHOP THE COLLECTION</span>
              <span aria-hidden="true">↗</span>
            </a>

            <div className="mobile-menu-footer">
              <span>FAITH. CULTURE. IDENTITY.</span>
              <span>EST. IN PURPOSE.</span>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
