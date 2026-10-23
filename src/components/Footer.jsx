import React, { useState } from "react";
import Brand from "./Brand";

export default function Footer({ onToast }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    setSubscribed(true);
    onToast("Thanks — you’re on the list for the next drop.");
    setEmail("");
  };
  return <footer className="tc-footer">
    <div className="wrap">
      <div className="foot-top">
        <div className="foot-brand"><Brand /><p>3RINITY CULTURE is the apparel arm of Christ Club — faith and football, worn the same way it’s lived: out loud, on the field, off the bench.</p>
          <form className="newsletter-form" onSubmit={submit}><label className="sr-only" htmlFor="newsletter-email">Email for collection updates</label><input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required /><button type="submit">Join the list</button></form><p className="newsletter-note">{subscribed ? "You're signed up in this demo." : "Get first notice of new verses and future drops."}</p>
        </div>
        <div className="foot-col"><h5>Shop</h5><a href="#drop">The Drop</a><a href="#verses">The Verses</a><a href="#sizing">Size Guide</a></div>
        <div className="foot-col"><h5>Club</h5><a href="#story">Our Story</a><a href="#details">Faith &amp; Football</a><a href="#story">The Culture</a></div>
        <div className="foot-col"><h5>Support</h5><a href="mailto:hello@3rinityculture.example">Contact</a><a href="#sizing">Sizing help</a><a href="#shipping">Shipping &amp; returns</a></div>
      </div>
      <div className="foot-bottom"><span>© {new Date().getFullYear()} 3RINITY CULTURE — Saved By Grace</span><span>Designed for Christ Club · Faith &amp; Football</span></div>
    </div>
  </footer>;
}
