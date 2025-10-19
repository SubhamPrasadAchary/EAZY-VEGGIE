# Eazy Veggie (React + Vite)

A modern React-based version of the Eazy Veggie shopping cart with image previews, responsive layout, and improved UI.

## Getting Started

Requirements: Node.js 18+

```bash
# install dependencies
npm install

# start dev server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

Open the app at the URL Vite prints (default http://localhost:5173).

## Project Structure

- `src/App.jsx` – Main UI: vegetable grid and cart summary
- `src/components/VegetableItem.jsx` – Card for each vegetable with qty input
- `src/components/CartSummary.jsx` – Cart items list and billing
- `src/assets/styles.css` – Global styles

## Notes

- Image elements include a fallback placeholder via `onError`.
- Tax: 18%, Delivery: ₹49, logic mirrors the original project.
