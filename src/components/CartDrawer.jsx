import React from "react";
import { formatPrice } from "../data/products";

export default function CartDrawer({ open, items, onClose, onChangeQty, onRemove, onCheckout }) {
  if (!open) return null;
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="cart-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="drawer-head"><div><p className="eyebrow gold">Your selection</p><h3>Your bag <span style={{ color: "var(--steel)" }}>({count})</span></h3></div><button className="icon-btn" onClick={onClose} aria-label="Close bag">×</button></div>
        <div className="drawer-body">
          {items.length === 0 ? <div className="empty-cart"><div className="symbol">♧</div><h3>Your bag is waiting.</h3><p>Find the verse that speaks to you and bring it into your rotation.</p><button className="btn-primary" onClick={onClose}>Explore the drop <span className="arrow">→</span></button></div> :
            items.map((item) => <div className="cart-line" key={item.key}>
              <img src={item.image} alt={item.name} />
              <div><h4>{item.name}</h4><div className="cart-meta">Color: {item.color}<br />Size: {item.size}<br />{formatPrice(item.price)} each</div>
                <div className="qty-control"><button onClick={() => onChangeQty(item.key, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => onChangeQty(item.key, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div>
                <div><button className="remove-btn" onClick={() => onRemove(item.key)}>Remove</button></div>
              </div><strong style={{ fontSize: 12 }}>{formatPrice(item.price * item.quantity)}</strong>
            </div>)
          }
        </div>
        {items.length > 0 && <div className="drawer-foot"><div className="subtotal-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><p className="shipping-note">Shipping and any applicable taxes are calculated at checkout.</p><button className="btn-primary" onClick={onCheckout}>Continue to checkout <span className="arrow">→</span></button><p className="shipping-note" style={{ marginTop: 12, marginBottom: 0 }}>Secure checkout preview · No payment is collected in this demo.</p></div>}
      </aside>
    </div>
  );
}
