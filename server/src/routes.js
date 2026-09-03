import { Router } from 'express';
import { pool } from './db.js';

const router = Router();

router.get('/products', async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        p.id,
        p.slug,
        p.name,
        p.brand,
        p.description,
        p.mrp,
        p.price,
        p.image_url,
        p.badge,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', v.id,
              'name', v.name,
              'type', v.type,
              'value', v.value,
              'mrp', v.mrp,
              'price', v.price,
              'image_url', v.image_url
            )
          ) FILTER (WHERE v.id IS NOT NULL),
          '[]'
        ) AS variants
      FROM products p
      LEFT JOIN variants v ON v.product_id = p.id
      GROUP BY p.id
      ORDER BY p.id;
    `);

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Unable to load products'
    });
  }
});

router.get('/products/:slug', async (req, res) => {
  try {
    const product = await pool.query(
      'SELECT * FROM products WHERE slug = $1',
      [req.params.slug]
    );

    if (!product.rowCount) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    const variants = await pool.query(
      `
      SELECT
        id,
        name,
        type,
        value,
        mrp,
        price,
        image_url
      FROM variants
      WHERE product_id = $1
      ORDER BY id
      `,
      [product.rows[0].id]
    );

    const plans = await pool.query(
      `
      SELECT
        id,
        tenure_months,
        interest_rate,
        monthly_payment,
        cashback,
        label,
        backed_by
      FROM emi_plans
      WHERE product_id = $1
      ORDER BY tenure_months
      `,
      [product.rows[0].id]
    );

    res.json({
      ...product.rows[0],
      variants: variants.rows,
      emiPlans: plans.rows
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Unable to load product'
    });
  }
});

router.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');

    res.json({
      status: 'ok',
      database: 'connected'
    });
  } catch {
    res.status(503).json({
      status: 'error'
    });
  }
});

export default router;