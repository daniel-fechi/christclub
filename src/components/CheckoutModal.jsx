import React, { useState } from "react";
import { formatPrice } from "../data/products";

export default function CheckoutModal({ open, items, onClose, onComplete }) {
  const [submitted, setSubmitted] = useState(false);
  if (!open) return null;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };
  const finish = () => { onComplete(); setSubmitted(false); };
  return (
    <div className="modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { onClose(); setSubmitted(false); } }}>
      <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <div style={{ display: "flex", justifyContent: "flex-end" }}><button className="icon-btn" onClick={() => { onClose(); setSubmitted(false); }} aria-label="Close checkout">×</button></div>
        {submitted ? <div className="checkout-success"><div className="success-mark">✓</div><p className="eyebrow gold">Demo order complete</p><h3 id="checkout-title">You’re on the list.</h3><p>This is a storefront prototype. No order has been sent and no payment has been taken. Connect a backend and payment provider to accept real orders.</p><button className="btn-primary" onClick={finish}>Back to the collection <span className="arrow">→</span></button></div> :
          <>
            <p className="eyebrow gold">Checkout</p><h3 id="checkout-title">Almost yours.</h3><p>Enter your details to preview the checkout flow. This demo does not transmit or store the form data.</p>
            <div className="subtotal-row" style={{ marginTop: 20 }}><span>Order subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <form onSubmit={submit} className="checkout-form">
              <div className="field"><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" autoComplete="given-name" required /></div>
              <div className="field"><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" autoComplete="family-name" required /></div>
              <div className="field full"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
              <div className="field full"><label htmlFor="address">Delivery address</label><input id="address" name="address" autoComplete="street-address" required /></div>
              <div className="field"><label htmlFor="city">Town / city</label><input id="city" name="city" autoComplete="address-level2" required /></div>
              <div className="field"><label htmlFor="postcode">Postcode / ZIP</label><input id="postcode" name="postcode" autoComplete="postal-code" required /></div>
              <div className="field full"><label htmlFor="country">Country</label><select id="country" name="country" defaultValue="United Kingdom"><option>United Kingdom</option><option>United States</option><option>Canada</option><option>Nigeria</option><option>Other</option></select></div>
              <div className="field full"><label><input type="checkbox" required style={{ width: "auto", marginRight: 8 }} />I understand this is a demo checkout, not a real order.</label></div>
              <div className="field full"><p>Payment integration is not connected. Do not enter card details.</p></div>
              <div className="checkout-actions field full"><button type="button" className="btn-secondary" onClick={() => { onClose(); setSubmitted(false); }}>Back to bag</button><button type="submit" className="btn-primary">Place demo order <span className="arrow">→</span></button></div>
            </form>
          </>
        }
      </section>
    </div>
  );
}
