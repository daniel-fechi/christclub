
import React, { useState } from "react";
import { SIZES, formatPrice } from "../data/products";

export default function ProductCard({ product, onAdd, onQuickView }) {
  const [size, setSize] = useState("L");
  const [view, setView] = useState("back");
  const [quantity] = useState(1);

  const image = view === "front" ? product.frontImage : product.image;

  return (
    <article className="prod-card reveal">
      <div
        className="prod-media"
        onClick={() => onQuickView(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onQuickView(product);
          }
        }}
        aria-label={`Quick view ${product.name}`}
      >
        <span className="prod-num">
          No. {product.id === "psalms-91" ? "91" : "04"}
        </span>

        <img
          src={image}
          alt={`${product.name}, ${view} view`}
          loading="lazy"
        />

        <span className="product-badge">{product.badge}</span>
      </div>

      <div className="prod-info">
        <div>
          <div className="prod-title">{product.name}</div>
          <p className="prod-verse">
            {product.color} · {product.quote}
          </p>
        </div>

        <div className="prod-price">{formatPrice(product.price)}</div>
      </div>

      <div className="swatches" aria-label="Choose jersey view">
        <span className="view-label">View:</span>

        <div className="view-toggle" role="group" aria-label="Jersey front or back">
          <button
            type="button"
            className={`view-option${view === "front" ? " active" : ""}`}
            onClick={() => setView("front")}
            aria-pressed={view === "front"}
          >
            Front
          </button>

          <button
            type="button"
            className={`view-option${view === "back" ? " active" : ""}`}
            onClick={() => setView("back")}
            aria-pressed={view === "back"}
          >
            Back
          </button>
        </div>

        <span className="stock-note">In stock · ships with care</span>
      </div>

      <div className="size-row" role="group" aria-label={`Choose size for ${product.name}`}>
        {SIZES.map((option) => (
          <button
            key={option}
            type="button"
            className={`size-chip${size === option ? " active" : ""}`}
            onClick={() => setSize(option)}
            aria-pressed={size === option}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="add-row">
        <button
          type="button"
          className="btn-add"
          onClick={() => onAdd(product, size, quantity)}
        >
          Add to bag — {formatPrice(product.price * quantity)}
        </button>
      </div>

      <div className="sr-only" aria-live="polite">
        Showing jersey {view}. Selected size {size}.
      </div>
    </article>
  );
}
