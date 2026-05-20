# AE$R Holdings — Premium Cleaning Services

Full-stack monolithic website for **AE$R Holdings**, a premium cleaning services company.

- **Phone:** 1(973)937-2289
- **Address:** 5 Sylvan Street, Rutherford, NJ 07070

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | FastAPI, SQLAlchemy (SQLite), Pydantic v2 |
| Auth | JWT (python-jose) + bcrypt |
| Deployment | Docker (monolithic) + Railway |

---

## Project Structure

```
AE-R_Holdings/
├── app/               # Next.js App Router pages
│   ├── layout.tsx     # Root layout (Navbar + Footer)
│   ├── page.tsx       # Home page
│   ├── about/
│   ├── services/
│   ├── booking/
│   ├── testimonials/
│   ├── faq/
│   ├── contact/
│   └── admin/
│       ├── login/
│       └── dashboard/
├── components/        # React UI components
│   ├── layout/        # Navbar, Footer, ConditionalLayout
│   ├── home/          # Hero, TrustBar, Services, WhyChooseUs, Testimonials, ContactCTA
│   └── admin/         # AdminSidebar, AdminDashboard
├── lib/
│   └── api.ts         # Axios client for all API calls
├── api/               # FastAPI Python backend
│   ├── main.py        # App factory, startup seeding, CORS
│   ├── database.py    # SQLAlchemy engine + session
│   ├── core/config.py # Pydantic settings
│   ├── auth/          # JWT + dependencies
│   ├── models/        # SQLAlchemy ORM models
│   ├── schemas/       # Pydantic request/response schemas
│   └── routes/        # API route handlers
├── package.json       # Node.js dependencies
├── requirements.txt   # Python dependencies
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── Dockerfile         # Monolithic multi-stage build
├── docker-compose.yml
├── railway.toml
├── start.sh           # Starts both Next.js + FastAPI
├── seed.py            # Dev data seeder
└── .env.example
```

---

## Local Development

### Prerequisites
- Node.js 20+ (via nvm recommended)
- Python 3.11+

### Backend only
```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
# API docs: http://localhost:8000/docs
```

### Frontend only
```bash
npm install
npm run dev
# Site: http://localhost:3000
```

### Both together (Docker)
```bash
cp .env.example .env   # update SECRET_KEY etc.
docker-compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
```

---

## Admin Access

| Field | Value |
|-------|-------|
| URL | `/admin/login` |
| Email | `admin@aerholdings.com` |
| Password | `Admin@2024!` |

> Change via `ADMIN_EMAIL` / `ADMIN_PASSWORD` environment variables before deploying.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Services, Why Choose Us, Testimonials |
| `/about` | Company story, values, team, process |
| `/services` | All 6 service offerings |
| `/booking` | Booking / Request Quote form |
| `/testimonials` | Customer testimonials |
| `/faq` | Accordion FAQ |
| `/contact` | Contact form + info |
| `/admin/login` | Admin authentication |
| `/admin/dashboard` | Protected admin panel |

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | — | Admin login → JWT |
| GET | `/api/auth/me` | ✓ | Current admin |
| POST | `/api/bookings` | — | Submit booking |
| GET | `/api/bookings` | ✓ | List all bookings |
| PATCH | `/api/bookings/{id}` | ✓ | Update booking status |
| DELETE | `/api/bookings/{id}` | ✓ | Delete booking |
| POST | `/api/contact` | — | Submit contact form |
| GET | `/api/messages` | ✓ | List messages |
| GET | `/api/testimonials` | — | Published testimonials |
| GET | `/api/services` | — | Active services |
| GET | `/health` | — | Health check |

---

## Railway Deployment

```toml
# railway.toml (already configured)
[build]
builder = "DOCKERFILE"

[deploy]
startCommand = "./start.sh"
```

Set these environment variables on Railway:
```
SECRET_KEY=<random 256-bit key>
ADMIN_EMAIL=admin@aerholdings.com
ADMIN_PASSWORD=<strong password>
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
```

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0F172A` | Primary text, headers, nav |
| White | `#FFFFFF` | Backgrounds |
| Sky Blue | `#EAF6FF` | Section backgrounds |
| Teal | `#2DD4BF` | Buttons, accents, CTAs |
| Green | `#22C55E` | Success states, eco badges |
