# Remembering Muzammil

A memorial and fundraising website for Muzammil's family, built with React (Vite), Tailwind CSS, Express and MongoDB.
Contributions go **directly to the family's UPI account**. The site does not process, verify or hold any payment.

## What's inside

```
client/   React + Vite + Tailwind frontend
  src/components, pages, hooks, utils, assets (photos + PhonePe QR)
server/   Express API + MongoDB (Mongoose)
  models, routes, controllers, middleware, config, utils, tests
```

- **Public API:** `GET /api/campaign` returns `{ targetAmount, collectedAmount, status, updates, lastUpdated }`
- **Admin API:** `PUT /api/campaign` (header `x-admin-secret: <ADMIN_SECRET>`) updates target, collected amount, status and updates
- **Admin page:** `/admin` on the website, a small form that uses the API above
- No target or collected amount is shown until the admin sets both. Until then the page says
  *"Fundraising details will be updated here."*
- Progress is `collected / target * 100`, capped at 100%.

## Setup

Requires Node.js 18+ and a MongoDB database (a free MongoDB Atlas cluster works well).

```bash
npm install                       # installs client and server (npm workspaces)
cp server/.env.example server/.env
```

Edit `server/.env`:

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/muzammil-memorial
PORT=5000
ADMIN_SECRET=<a long random value, 16+ characters>
```

Generate a secret with: `node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"`

```bash
npm run dev      # API on :5000, website on http://localhost:5173
npm test         # server API tests + UPI link tests
```

If MongoDB is unreachable the website still works; the campaign section shows its "will be updated" message and the
server retries the connection every 15 seconds.

## Updating the fundraising figures

Open `/admin`, enter the `ADMIN_SECRET`, then set the target and collected amount. Or with curl:

```bash
curl -X PUT https://YOUR-SITE/api/campaign \
  -H "Content-Type: application/json" -H "x-admin-secret: YOUR_SECRET" \
  -d '{"targetAmount": 500000, "collectedAmount": 125000}'
```

Because payments go straight to the family's UPI account, **the collected amount is entered by hand**. The page says so.
Set `status` to `paused` or `completed` to hide the donation options.

## Changing family details

All family-provided details (UPI ID, recipient name, phone numbers, preset amounts) are in
`client/src/utils/constants.js`, and the exact UPI base link is in `client/src/utils/upi.js`.
Photos are in `client/src/assets/photos`; the PhonePe QR is `client/src/assets/upi-qr.png`.

## Deployment

### Option A: one service (recommended, e.g. Render, Railway, a VPS)

1. Push this folder to GitHub.
2. Create a Web Service with:
   - Build command: `npm install && VITE_SITE_URL=https://your-domain npm run build`
   - Start command: `npm start`
3. Add environment variables: `MONGODB_URI`, `ADMIN_SECRET`, `NODE_ENV=production`, `TRUST_PROXY=1`.
4. In MongoDB Atlas, allow your host's IP under Network Access (or `0.0.0.0/0` with a strong database password).

The Express server serves the built React app and the API from the same domain, so no CORS setup is needed.

### Option B: split hosting (e.g. Vercel/Netlify + Render)

- Deploy `server/` as the API with `CLIENT_ORIGIN=https://your-frontend-domain`.
- Build the client with `VITE_API_BASE_URL=https://your-api-domain` and `VITE_SITE_URL=https://your-frontend-domain`.
- Add a rewrite of all routes to `/index.html` so `/admin` works.

### Before sharing the link

- Set `VITE_SITE_URL` at build time so WhatsApp/Facebook previews get an absolute image URL (`/og-image.jpg`).
- Ask the family to confirm the UPI ID, recipient name and phone numbers.
- Make a test payment of ₹1 yourself and confirm it reaches the family.

## Notes on privacy and honesty

- No donor information is collected or stored. There is no payment tracking.
- Phone numbers appear only in the "Need More Information?" section. The UPI ID itself contains the father's number,
  because that is how the account is registered.
- The site never claims to verify payments. Nothing on the page is invented: no dates, causes, figures, names or quotes.
