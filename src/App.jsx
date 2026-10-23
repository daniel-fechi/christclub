import React, { useEffect, useMemo, useRef, useState } from "react";

import { PRODUCTS, formatPrice } from "./data/products";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import ProductQuickView from "./components/ProductQuickView";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import "./styles.css";
import "./layout-fixes.css";

const CART_STORAGE_KEY = "3rinity-culture-cart-v1";

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    root.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [rootRef]);
}

function Hero() {
  const [heroIn, setHeroIn] = useState(false);
  const [headlineSweep, setHeadlineSweep] = useState(false);
  const headlineRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroIn(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline || !("IntersectionObserver" in window)) return;

    let resetTimer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(resetTimer);
          setHeadlineSweep(false);

          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => setHeadlineSweep(true));
          });
        } else {
          resetTimer = window.setTimeout(
            () => setHeadlineSweep(false),
            180
          );
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(headline);

    return () => {
      observer.disconnect();
      window.clearTimeout(resetTimer);
    };
  }, []);

  const features = [
    {
      number: "01",
      title: "V-Neck Collar",
      description:
        "Two-tone ribbed trim inspired by classic match-day kits.",
    },
    {
      number: "02",
      title: "Christ Club Crest",
      description:
        "The dove and club emblems represent faith, identity and community.",
    },
    {
      number: "03",
      title: "Book & Chapter",
      description:
        "Scripture takes centre stage with a bold football-inspired back print.",
    },
    {
      number: "04",
      title: "Saved By Grace",
      description:
        "A finishing detail that carries the message beyond the pitch.",
    },
  ];

  return (
    <>
      <section className="hero redesigned-hero" id="top">
        <div className="hero-top redesigned-hero-top">
          <div>
            <p className="eyebrow gold">Faith &amp; Football Collection</p>

            <h1
              ref={headlineRef}
              className={`hero-glass-headline${
                headlineSweep ? " hero-glass-headline-sweep" : ""
              }`}
            >
              Wear the <em>Word</em>
              <br />
              on your back.
            </h1>
          </div>

          <div className="redesigned-hero-intro">
            <p className="hero-sub">
              Match-day energy. Eternal message. Two statement jerseys created
              for the culture, the congregation and everywhere in between.
            </p>

            <a href="#drop" className="hero-text-link">
              EXPLORE THE COLLECTION{" "}
              <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>

        <div className={`hero-showcase${heroIn ? " hero-showcase-in" : ""}`}>
          <div className="hero-showcase-grid" aria-hidden="true" />

          <article className="hero-edition hero-edition-white">
            <div className="hero-edition-heading">
              <span className="hero-edition-number">
                01 / THE WHITE EDITION
              </span>

              <span className="hero-edition-colour">
                <span className="hero-colour-dot white-dot" /> WHITE / BLACK
              </span>
            </div>

            <div className="hero-shirt-frame hero-shirt-frame-white">
              <img
                src="/images/whiteFront.jpg"
                alt="White Christ Club football jersey"
              />
            </div>

            <div className="hero-edition-copy">
              <div>
                <p className="eyebrow">PSALMS 91</p>
                <h2>The Protection Verse.</h2>
                <p>
                  A reminder of refuge, protection and the faith that stays
                  with you through every season.
                </p>
              </div>

              <a
                href="#verses"
                aria-label="Discover the Psalms 91 jersey"
              >
                DISCOVER <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article className="hero-edition hero-edition-black">
            <div className="hero-edition-heading">
              <span className="hero-edition-number">
                02 / THE BLACK EDITION
              </span>

              <span className="hero-edition-colour">
                <span className="hero-colour-dot black-dot" /> BLACK / WHITE
              </span>
            </div>

            <div className="hero-shirt-frame hero-shirt-frame-black">
              <img
                src="/images/philBack.jpg"
                alt="Black Philippians 4 football jersey"
              />
            </div>

            <div className="hero-edition-copy">
              <div>
                <p className="eyebrow">PHILIPPIANS 4</p>
                <h2>Strength in Every Season.</h2>
                <p>
                  A statement of strength, contentment and the power of Christ
                  through every challenge.
                </p>
              </div>

              <a
                href="#verses"
                aria-label="Discover the Philippians 4 jersey"
              >
                DISCOVER <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <div className="hero-showcase-index" aria-hidden="true">
            <span>3RINITY CULTURE</span>
            <span>FAITH IN EVERY DETAIL — EST. IN PURPOSE</span>
          </div>
        </div>

        <div className="hero-feature-strip">
          <div className="hero-feature-heading">
            <p className="eyebrow gold">The Details</p>
            <h2>More than a jersey.</h2>
            <p>Every element carries a message.</p>
          </div>

          <div className="hero-feature-list">
            {features.map((feature) => (
              <div className="hero-feature" key={feature.number}>
                <span className="hero-feature-number">{feature.number}</span>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-bottom-bar">
          <span className="hero-scroll-label">
            <span className="dot" /> MADE FOR THE CULTURE
          </span>

          <div className="hero-bottom-cta">
            <span className="price-tag">
              FROM <b>{formatPrice(68)}</b>{" "}
              <span>· TWO COLORWAYS</span>
            </span>

            <a href="#drop" className="btn-primary">
              Shop the drop <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Ticker() {
  const items = [
    "Faith & Football",
    "Saved By Grace",
    "3RINITY Culture",
    "Christ Club",
    "Faith & Football",
    "Saved By Grace",
    "3RINITY Culture",
    "Christ Club",
  ];

  return (
    <div className="ticker" aria-label="Faith and football">
      <div className="ticker-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function VerseSection() {
  return (
    <section
      className="section"
      id="verses"
      style={{
        background: "var(--paper-hi)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <div className="verse-split reveal" style={{ marginBottom: 110 }}>
          <div className="verse-media">
            <img
              src="/images/whiteFront.jpg"
              alt="White Psalms jersey front"
            />

            <div className="tag">
              <span className="dot" /> Style 01 / White
            </div>
          </div>

          <div className="verse-copy">
            <div className="num">91</div>
            <h3>The Protection Verse</h3>

            <p>
              Psalm 91 is the one believers reach for before kickoff, before
              exams, before anything that feels bigger than they are — a psalm
              about shelter, refuge, and being covered. We put the number on
              the back the way a team retires a jersey: so nobody forgets what
              it stands for.
            </p>

            <p className="small">
              Book: Psalms · Chapter 91 · Colorway: White / Black trim
            </p>
          </div>
        </div>

        <div className="verse-split reveal">
          <div className="verse-copy">
            <div className="num">04</div>
            <h3>The Strength Verse</h3>

            <p>
              Philippians 4 carries the line athletes tape inside their
              lockers — “I can do all things through Christ who strengthens
              me.” It’s a chapter about contentment under pressure, which is
              why it reads right on the back of a football shirt: worn under
              lights, in every kind of weather.
            </p>

            <p className="small">
              Book: Philippians · Chapter 4 · Colorway: Black / White trim
            </p>
          </div>

          <div className="verse-media">
            <img
              src="/images/blackFront.jpg"
              alt="Black Philippians jersey front"
            />

            <div className="tag">
              <span className="dot" /> Style 02 / Black
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailsSection() {
  const details = [
    [
      "01",
      "Oversized Fit",
      "Cut long and wide off an athletic block, sized to layer — true to size runs roomy, so most riders size down.",
    ],
    [
      "02",
      "Two-Tone Trim",
      "Contrast rib collar and cuffs flip per colorway — black trim on white, white trim on black.",
    ],
    [
      "03",
      "Dual Crest",
      "Dove emblem on the left chest, Christ Club “Faith & Football” badge on the right — screen printed for durability.",
    ],
    [
      "04",
      "Scoreboard Back",
      "Blackletter book name over a numeral block, printed the way a name-and-number set is applied on match day.",
    ],
  ];

  return (
    <section className="section" id="details">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <p className="eyebrow">Built Like Kit</p>
            <h2>
              Details that hold up
              <br />
              past the final whistle.
            </h2>
          </div>

          <p>
            Every piece is built off an authentic match-jersey block — nothing
            about it is watered down for streetwear.
          </p>
        </div>

        <div className="details-grid reveal">
          {details.map(([number, title, description]) => (
            <div className="detail-cell" key={number}>
              <div className="di">{number}</div>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SizingSection() {
  const rows = [
    ["S", "44", "27"],
    ["M", "46", "28"],
    ["L", "48", "29"],
    ["XL", "50", "30"],
    ["2XL", "52", "31"],
  ];

  return (
    <section
      className="section tight"
      id="sizing"
      style={{
        background: "var(--paper-hi)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <p className="eyebrow">Sizing</p>
            <h2>Find your fit.</h2>
          </div>
        </div>

        <div className="size-wrap reveal">
          <table className="sizetable">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (in)</th>
                <th>Length (in)</th>
              </tr>
            </thead>

            <tbody>
              {rows.map(([size, chest, length]) => (
                <tr key={size}>
                  <td>{size}</td>
                  <td>{chest}</td>
                  <td>{length}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="fit-note">
            <p className="eyebrow gold">Fit Note</p>

            <p>
              Modeled on an oversized athletic block — same silhouette as the
              match jerseys this design is built from. If you want it fitted,
              size down one.
            </p>

            <p>
              100% recycled mesh polyester · moisture-wicking · true match
              weight · machine wash cold, inside out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const rootRef = useRef(null);
  const toastTimer = useRef(null);

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState({ show: false, text: "" });

  // Restore the saved theme, defaulting to light mode.
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("3rinity-theme") || "light";
    } catch {
      return "light";
    }
  });

  useReveal(rootRef);

  // Apply and persist the selected theme.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem("3rinity-theme", theme);
    } catch {
      // Theme still works when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage can be disabled.
    }
  }, [cart]);

  useEffect(() => {
    return () => window.clearTimeout(toastTimer.current);
  }, []);

  const visibleProducts = useMemo(() => {
    const selectedFilter = normalize(filter);
    const query = normalize(search);

    return PRODUCTS.filter((product) => {
      const productCategory = normalize(product.category);

      const matchesFilter =
        selectedFilter === "all" || productCategory === selectedFilter;

      const searchableFields = [
        product.name,
        product.verse,
        product.category,
        product.color,
        product.quote,
        product.description,
      ];

      const matchesSearch =
        !query ||
        searchableFields.some((field) => normalize(field).includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (text) => {
    setToast({ show: true, text });
    window.clearTimeout(toastTimer.current);

    toastTimer.current = window.setTimeout(
      () => setToast((current) => ({ ...current, show: false })),
      2500
    );
  };

  const addToCart = (product, size, quantity = 1) => {
    const key = `${product.id}:${size}`;

    setCart((items) => {
      const existing = items.find((item) => item.key === key);

      if (existing) {
        return items.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...items,
        {
          key,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          frontImage: product.frontImage,
          color: product.color,
          size,
          quantity,
        },
      ];
    });

    showToast(`${product.name} · ${size} added to your bag`);
  };

  const changeQty = (key, quantity) => {
    setCart((items) =>
      quantity < 1
        ? items.filter((item) => item.key !== key)
        : items.map((item) =>
            item.key === key
              ? { ...item, quantity: Math.min(quantity, 20) }
              : item
          )
    );
  };

  const completeDemoOrder = () => {
    setCheckoutOpen(false);
    setCartOpen(false);
    setCart([]);
    showToast("Demo order complete — no payment was taken.");
  };

  return (
    <div className="tc-root" ref={rootRef}>
      <CustomCursor />

      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Floating light / dark mode switch */}
      <button
        type="button"
        className="theme-toggle"
        onClick={() =>
          setTheme((current) =>
            current === "light" ? "dark" : "light"
          )
        }
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        aria-pressed={theme === "dark"}
      >
        <span className="theme-toggle-icon" aria-hidden="true">
          {theme === "light" ? "☾" : "☀"}
        </span>
        {theme === "light" ? "Dark mode" : "Light mode"}
      </button>

      <main>
        <Hero />
        <Ticker />

        <section className="section" id="drop">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <p className="eyebrow">The Drop</p>
                <h2>
                  Two colorways.
                  <br />
                  One testimony.
                </h2>
              </div>

              <p>
                Same cut, same crest — the black tells Philippians, the white
                tells Psalms. Pick your verse.
              </p>
            </div>

            <div className="shop-tools">
              <div
                className="filter-row"
                role="group"
                aria-label="Filter products"
              >
                {["All", "White", "Black"].map((category) => {
                  const isActive =
                    normalize(filter) === normalize(category);

                  return (
                    <button
                      key={category}
                      type="button"
                      className={`filter-chip${isActive ? " active" : ""}`}
                      aria-pressed={isActive}
                      onClick={() => setFilter(category)}
                    >
                      {category === "All"
                        ? "All jerseys"
                        : `${category} colorway`}
                    </button>
                  );
                })}
              </div>

              <label className="search-box">
                <span aria-hidden="true">⌕</span>
                <span className="sr-only">Search the collection</span>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search the collection…"
                />
              </label>

              <span className="result-count">
                {visibleProducts.length}{" "}
                {visibleProducts.length === 1 ? "style" : "styles"}
              </span>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="drop-grid">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={addToCart}
                    onQuickView={setQuickView}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-cart" style={{ padding: "40px 0" }}>
                <h3>No jerseys found.</h3>
                <p>Try a different search or clear the colorway filter.</p>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setSearch("");
                    setFilter("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <VerseSection />
        <DetailsSection />
        <SizingSection />

        <section className="section tight" id="story">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <p className="eyebrow gold">More than a kit</p>
                <h2>
                  Faith you can wear.
                  <br />
                  Culture you can live.
                </h2>
              </div>

              <p>
                3RINITY CULTURE sits where match day meets message — designed
                for the pitch, the stands, and every day in between.
              </p>
            </div>
          </div>
        </section>

        <section
          id="shipping"
          className="section tight"
          style={{
            borderTop: "1px solid var(--line)",
            background: "var(--paper-hi)",
          }}
        >
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <p className="eyebrow">Shipping &amp; returns</p>
                <h2>Made for your rotation.</h2>
              </div>

              <p>
                This preview storefront does not yet process orders. Before
                launch, add confirmed delivery rates, dispatch timelines, a
                returns policy, and customer support details.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer onToast={showToast} />
      <ScrollToTop />

      <div
        className={`toast${toast.show ? " show" : ""}`}
        role="status"
        aria-live="polite"
      >
        <span className="dot" />
        <span>{toast.text}</span>
      </div>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={(key) =>
          setCart((items) => items.filter((item) => item.key !== key))
        }
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        items={cart}
        onClose={() => setCheckoutOpen(false)}
        onComplete={completeDemoOrder}
      />

      <ProductQuickView
        product={quickView}
        onClose={() => setQuickView(null)}
        onAdd={addToCart}
      />
    </div>
  );
}