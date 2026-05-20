# AE$R Holdings — Premium Cleaning Services Website

Full-stack website for **AE$R Holdings**, a premium cleaning services company based in Rutherford, NJ.

- **Phone:** 1(973)937-2289  
- **Address:** 5 Sylvan Street, Rutherford, NJ 07070

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | FastAPI, SQLAlchemy (SQLite), Pydantic v2 |
| Auth | JWT (python-jose) + bcrypt |
| Deployment | Docker + Railway |

---

## Project Structure

```
AE-R_Holdings/
├── frontend/          # Next.js 14 application
│   ├── app/           # App Router pages
│   ├── components/    # Reusable UI components
│   ├── lib/           # API client (axios)
│   └── Dockerfile
├── backend/           # FastAPI application
│   ├── app/
│   │   ├── models/    # SQLAlchemy models
│   │   ├── schemas/   # Pydantic schemas
│   │   ├── routes/    # API route handlers
│   │   ├── auth/      # JWT + dependencies
│   │   └── core/      # Config / settings
│   └── Dockerfile
├── docker-compose.yml # Local development
└── .env.example
```

---

## Local Development

### Prerequisites
- Node.js 20+ (for frontend)
- Python 3.11+ (for backend)

### Backend
```bash
cd backend
cp ../.env.example .env   # edit as needed
pip install -r requirements.txt
uvicorn app.main:app --reload
# API:  http://localhost:8000
# Docs: http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
# .env.local already set to http://localhost:8000
npm install
npm run dev
# Site: http://localhost:3000
```

### Docker (full stack)
```bash
cp .env.example .env   # update SECRET_KEY and passwords
docker-compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
```

---

## Admin Access

| | Value |
|--|--|
| URL | `/admin/login` |
| Email | `admin@aerholdings.com` |
| Password | `Admin@2024!` |

> Change these credentials via environment variables before deploying to production.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Services, Why Choose Us, Testimonials |
| `/about` | Company story, values, team, process |
| `/services` | All 6 service offerings in detail |
| `/booking` | Booking / Request Quote form |
| `/testimonials` | Customer testimonials grid |
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
| GET | `/api/bookings` | ✓ | List bookings |
| PATCH | `/api/bookings/{id}` | ✓ | Update status |
| DELETE | `/api/bookings/{id}` | ✓ | Delete booking |
| POST | `/api/contact` | — | Submit contact message |
| GET | `/api/messages` | ✓ | List messages |
| GET | `/api/testimonials` | — | Published testimonials |
| GET | `/api/services` | — | Active services |
| GET | `/health` | — | Health check |

---

## Railway Deployment

Each service (frontend / backend) has its own `railway.toml`. Deploy them as separate Railway services and set the following environment variables:

**Backend:**
```
SECRET_KEY=<random 256-bit key>
ADMIN_EMAIL=admin@aerholdings.com
ADMIN_PASSWORD=<strong password>
CORS_ORIGINS=["https://your-frontend.up.railway.app"]
```

**Frontend:**
```
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
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
