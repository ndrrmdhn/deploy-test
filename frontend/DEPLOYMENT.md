# Deployment

This folder contains a static SPA ready to be deployed to Vercel.

Quick steps:

- Locally preview: open `frontend/index.html` in a browser (or use a static server)
- Deploy to Vercel: `vercel --prod` in the `frontend` folder or connect the repository and set root to `frontend`.

Notes:

- The app uses hash routing, so no server rewrites are required.
- Data is served from `data/*.json` and stored in `localStorage` for orders and auth.
- The order confirmation route uses `#/success/:id` and the dashboard reads local order history.
