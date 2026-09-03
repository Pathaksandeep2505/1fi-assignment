CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  description TEXT,
  mrp NUMERIC(12,2) NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  image_url TEXT NOT NULL,
  badge VARCHAR(80),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL,
  type VARCHAR(50) NOT NULL,
  value VARCHAR(100) NOT NULL,
  mrp NUMERIC(12,2) NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS emi_plans (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tenure_months INTEGER NOT NULL,
  interest_rate NUMERIC(5,2) NOT NULL,
  monthly_payment NUMERIC(12,2) NOT NULL,
  cashback NUMERIC(12,2) DEFAULT 0,
  label VARCHAR(100),
  backed_by VARCHAR(100) DEFAULT 'Mutual Funds'
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_variants_product ON variants(product_id);
CREATE INDEX IF NOT EXISTS idx_emi_product ON emi_plans(product_id);