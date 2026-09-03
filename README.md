# 1Fi Marketplace

A full-stack product marketplace built for the 1Fi SDE Intern assignment. The application provides a 1Fi-inspired shopping experience with product variants and mutual-fund-backed EMI plans.

## Live Demo
 https://1fi-assignment-eight.vercel.app/

## GitHub Repository
https://github.com/Pathaksandeep2505/1fi-assignment

## Features

* 1Fi-inspired responsive UI
* Dedicated Shop page
* Top Brands section
* Nearby Stores section
* 1Fi Marketplace
* Dynamic product data from PostgreSQL
* Multiple variants for each product
* Product detail pages with unique URLs
* EMI plans with tenure, interest and cashback
* Mutual-fund-backed EMI information
* Product images and pricing
* Responsive design

## Tech Stack

**Frontend**

* React.js
* Vite
* React Router
* JavaScript
* CSS

**Backend**

* Node.js
* Express.js
* REST API

**Database**

* PostgreSQL

**Tools**

* Git
* GitHub
* VS Code

## Project Structure

```text
1fi-assignment/
├── client/
│   ├── public/
│   └── src/
│       ├── api.js
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── db/
│   │   ├── schema.sql
│   │   └── seed.sql
│   └── src/
│       ├── db.js
│       ├── index.js
│       └── routes.js
│
├── docker-compose.yml
└── README.md
```

## API Endpoints

### Get All Products

```http
GET /api/products
```

Returns all products with their available variants.

### Get Product Details

```http
GET /api/products/:slug
```

Example:

```http
GET /api/products/iphone-17-pro
```

Returns product details, variants and EMI plans.

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

## Database

The PostgreSQL database contains three main tables:

* `products`
* `variants`
* `emi_plans`

All product and EMI information is stored in the database and retrieved through backend APIs.

## Products

The seeded database contains:

* Apple iPhone 17 Pro
* Samsung Galaxy S24 Ultra
* Google Pixel 9 Pro

Each product has multiple variants and EMI plans.

## Marketplace Flow

```text
Shop
  ↓
1Fi Marketplace
  ↓
Select Product
  ↓
Select Variant
  ↓
Choose EMI Plan
  ↓
Proceed
```

## Local Setup

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd 1fi-assignment
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onefi
PORT=5000
```

Create the database and run:

```bash
psql -U postgres -d onefi -f db/schema.sql
psql -U postgres -d onefi -f db/seed.sql
```

Start the server:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Routes

```text
/
 /shop
 /products/iphone-17-pro
 /products/galaxy-s24-ultra
 /products/pixel-9-pro
```

## Assignment Requirements

* React frontend — Completed
* Node.js + Express backend — Completed
* PostgreSQL database — Completed
* Dynamic API data — Completed
* 3+ products — Completed
* Multiple variants — Completed
* EMI plans — Completed
* Unique product URLs — Completed
* 1Fi Marketplace — Completed
* Top Brands section — Completed
* Nearby Stores section — Completed

## Author

**Sandeep Pathak**

B.Tech — Computer Science & Engineering

GitHub: `github.com/pathaksandeep2505`
