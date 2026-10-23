import React, { useState } from "react";
import { SIZES, formatPrice } from "../data/products";

export default function ProductQuickView({ product, onClose, onAdd }) {
  const [size, setSize] = useState("L");
  const [front, setFront] = useState(false);
  if (!product) return null;
  return <div className="modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="detail-modal" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <button className="icon-btn detail-close" onClick={onClose} aria-label="Close product details">×</button>
      <img src={front ? product.frontImage : product.image} alt={product.name} />
      <div className="detail-copy"><p className="eyebrow gold">{product.badge}</p><h3>{product.name}</h3><strong>{formatPrice(product.price)}</strong><p>{product.description}</p><p><em>“{product.quote}”</em></p>
        <div className="swatches"><button className={`swatch ${product.category === "White" ? "sw-white" : "sw-black"}${!front ? " active" : ""}`} onClick={() => setFront(false)} aria-label="Back view" /><button className={`swatch ${product.category === "White" ? "sw-black" : "sw-white"}${front ? " active" : ""}`} onClick={() => setFront(true)} aria-label="Front view" /></div>
        <p className="eyebrow" style={{ marginTop: 22 }}>Choose your size</p><div className="size-row">{SIZES.map((s) => <button key={s} className={`size-chip${size === s ? " active" : ""}`} onClick={() => setSize(s)} aria-pressed={size === s}>{s}</button>)}</div>
        <button className="btn-primary" style={{ marginTop: 25, width: "100%" }} onClick={() => { onAdd(product, size, 1); onClose(); }}>Add to bag — {formatPrice(product.price)} <span className="arrow">→</span></button>
      </div>
    </section>
  </div>;
}
