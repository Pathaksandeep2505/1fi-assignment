TRUNCATE emi_plans, variants, products RESTART IDENTITY CASCADE;

INSERT INTO products
(slug, name, brand, description, mrp, price, image_url, badge)
VALUES
(
  'iphone-17-pro',
  'iPhone 17 Pro',
  'Apple',
  'Pro camera system, A19 Pro chip and a premium titanium design.',
  134900,
  119999,
  '/iphone.avif',
  '0% EMI available'
),
(
  'galaxy-s24-ultra',
  'Galaxy S24 Ultra',
  'Samsung',
  'Galaxy AI, S Pen and a 200MP camera in a flagship titanium body.',
  149999,
  109999,
  '/samsung.jpeg',
  'Best value'
),
(
  'pixel-9-pro',
  'Pixel 9 Pro',
  'Google',
  'Google Tensor G4 with an advanced pro camera and clean Android experience.',
  109999,
  89999,
  '/pixel.jpeg',
  'Popular'
);

INSERT INTO variants
(product_id, name, type, value, mrp, price, image_url)
VALUES

-- iPhone 17 Pro
(
  1,
  '256 GB / Natural Titanium',
  'Storage / Finish',
  '256 GB / Natural Titanium',
  134900,
  119999,
  '/iphone.avif'
),
(
  1,
  '512 GB / Black Titanium',
  'Storage / Finish',
  '512 GB / Black Titanium',
  144900,
  129999,
  '/iphone-black.jpeg'
),
(
  1,
  '1 TB / Desert Titanium',
  'Storage / Finish',
  '1 TB / Desert Titanium',
  154900,
  139999,
  '/iphone-desert.jpeg'
),

-- Samsung Galaxy S24 Ultra
(
  2,
  '256 GB / Titanium Gray',
  'Storage / Finish',
  '256 GB / Titanium Gray',
  149999,
  109999,
  '/samsung.jpeg'
),
(
  2,
  '512 GB / Titanium Black',
  'Storage / Finish',
  '512 GB / Titanium Black',
  159999,
  119999,
  '/samsung-black.jpeg'
),
(
  2,
  '1 TB / Titanium Blue',
  'Storage / Finish',
  '1 TB / Titanium Blue',
  169999,
  129999,
  '/samsung-blue.jpeg'
),

-- Google Pixel 9 Pro
(
  3,
  '128 GB / Obsidian',
  'Storage / Finish',
  '128 GB / Obsidian',
  109999,
  89999,
  '/pixel.jpeg'
),
(
  3,
  '256 GB / Porcelain',
  'Storage / Finish',
  '256 GB / Porcelain',
  119999,
  99999,
  '/pixel-porcelain.jpeg'
);

INSERT INTO emi_plans
(product_id, tenure_months, interest_rate, monthly_payment, cashback, label)
VALUES

(1, 6, 0, 19999, 3000, '0% No-cost EMI'),
(1, 9, 10.5, 14510, 2500, 'Flexi EMI'),
(1, 12, 10.5, 10535, 2000, 'Long tenure'),

(2, 6, 0, 18333, 2500, '0% No-cost EMI'),
(2, 9, 10.5, 13300, 2000, 'Flexi EMI'),
(2, 12, 10.5, 9658, 1500, 'Long tenure'),

(3, 6, 0, 14999, 2000, '0% No-cost EMI'),
(3, 9, 10.5, 10880, 1500, 'Flexi EMI'),
(3, 12, 10.5, 7908, 1000, 'Long tenure');