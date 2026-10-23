# 3RINITY CULTURE Storefront

A React + Vite storefront prototype based on the supplied `christclub.jsx`.

## Run locally

1. Install Node.js (LTS).
2. In this directory run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.
4. Run `npm run build` to create a production build.

## Included

- Responsive storefront with collection navigation and search/filter controls
- Reusable header, brand, product cards, quick view, cart drawer, checkout preview and footer
- Size and front/back view selection
- Persistent cart using localStorage
- Quantity updates and remove-from-bag actions
- Demo checkout form and confirmation flow
- Extracted product images in `public/images`

## Before taking real orders

This is a frontend prototype. Checkout deliberately does not charge customers or submit personal data. To launch, connect a backend/catalog/inventory, order storage, shipping and tax calculation, transactional email, and a payment provider such as Stripe. Add privacy, terms, shipping and returns policies, and verify product claims and prices.
