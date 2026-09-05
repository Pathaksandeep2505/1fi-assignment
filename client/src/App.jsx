import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./index.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="nav-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">
            <span className="logo-inner">↑Fi</span>
          </span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <a href="/#how-it-works">How it works</a>
          <a href="/#benefits">Benefits</a>
        </nav>

        <button className="shop-btn" onClick={() => navigate("/shop")}>
          Shop Now →
        </button>
      </div>
    </header>
  );
}

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${API}/products`);
        const list = await res.json();

        const detailed = await Promise.all(
          list.map(async (product) => {
            try {
              const detailRes = await fetch(`${API}/products/${product.slug}`);
              if (!detailRes.ok) return product;
              return await detailRes.json();
            } catch {
              return product;
            }
          })
        );

        setProducts(detailed);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  const heroProduct =
    products.find((item) => item.slug === "iphone-17-pro") || products[0];

  const heroPlan = useMemo(() => {
    if (!heroProduct?.emiPlans?.length) return null;

    return heroProduct.emiPlans.reduce((lowest, current) =>
      Number(current.monthly_payment) < Number(lowest.monthly_payment)
        ? current
        : lowest
    );
  }, [heroProduct]);

  const heroVariant = heroProduct?.variants?.[0];

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">SMARTER WAY TO SHOP</span>

            <h1>
              Buy what you love.
              <br />
              <span>Pay at your pace.</span>
            </h1>

            <p className="hero-description">
              Get premium products with flexible EMI plans backed by mutual
              funds. Choose your product, select a plan and enjoy a simpler
              way to pay.
            </p>

            <div className="hero-actions">
              <a href="#products" className="primary-btn large-btn">
                Explore Products →
              </a>

              <a href="#how-it-works" className="secondary-btn">
                How it works
              </a>
            </div>

            <div className="hero-trust-row">
              <div className="hero-trust">
                <span>✓</span>
                <div>
                  <strong>0% EMI</strong>
                  <small>No-cost plans available</small>
                </div>
              </div>

              <div className="hero-trust">
                <span>◈</span>
                <div>
                  <strong>Mutual Fund Backed</strong>
                  <small>Smarter financing</small>
                </div>
              </div>

              <div className="hero-trust">
                <span>🔒</span>
                <div>
                  <strong>Secure</strong>
                  <small>Protected checkout</small>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-card">
            {heroPlan && (
              <div className="floating-tag">
                From ₹{Number(heroPlan.monthly_payment).toLocaleString()}/month
              </div>
            )}

            <div className="hero-product-glow"></div>

            {heroProduct ? (
              <img
                className="hero-product-image"
                src={heroVariant?.image_url || heroProduct.image_url}
                alt={heroProduct.name}
              />
            ) : (
              <div className="hero-loading">Loading...</div>
            )}

            {heroProduct && (
              <div className="hero-payment">
                <div>
                  <span>{heroProduct.brand}</span>
                  <strong>{heroProduct.name}</strong>
                </div>

                {heroPlan && (
                  <div className="hero-payment-right">
                    <span>Monthly EMI</span>
                    <strong>
                      ₹{Number(heroPlan.monthly_payment).toLocaleString()}
                    </strong>
                    <small>
                      {heroPlan.tenure_months} months ·{" "}
                      {Number(heroPlan.interest_rate)}% interest
                    </small>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FEATURED PRODUCTS</span>
              <h2>Choose what you love.</h2>
              <p>
                Premium smartphones with flexible variants and EMI plans
                designed around your budget.
              </p>
            </div>

            <span className="products-count">
              {products.length} Products
            </span>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section" id="how-it-works">
          <div className="section-heading centered">
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>Three simple steps.</h2>
            <p>Everything stays simple from selection to checkout.</p>
          </div>

          <div className="steps">
            <div className="step-card">
              <div className="step-number">01</div>
              <span className="step-icon">📱</span>
              <h3>Choose a product</h3>
              <p>
                Select your favourite smartphone and choose the variant that
                fits you best.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <span className="step-icon">💳</span>
              <h3>Select EMI</h3>
              <p>
                Compare monthly payments, tenures, interest rates and cashback
                before selecting your plan.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <span className="step-icon">✓</span>
              <h3>Confirm & enjoy</h3>
              <p>
                Confirm your selected plan and continue towards your purchase
                with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="benefits-section" id="benefits">
          <div className="benefit-content">
            <span className="eyebrow">WHY 1FI</span>
            <h2>Premium purchases. Smarter payments.</h2>
            <p>
              1Fi brings product discovery and flexible financing together in
              one simple shopping experience.
            </p>

            <div className="benefit-list">
              <div>
                <span>✓</span>
                <p>
                  <strong>Transparent EMI plans</strong>
                  <br />
                  Know your monthly payment, tenure and total payable amount.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  <strong>Multiple flexible tenures</strong>
                  <br />
                  Pick a monthly plan that fits comfortably within your budget.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  <strong>Mutual fund backed</strong>
                  <br />
                  A smarter approach to financing your purchase.
                </p>
              </div>
            </div>
          </div>

          {heroProduct && heroPlan && (
            <div className="benefit-box">
              <span className="benefit-label">YOUR PURCHASE</span>

              <h3>{heroProduct.name}</h3>

              <strong className="benefit-price">
                ₹
                {Number(
                  heroVariant?.price || heroProduct.price
                ).toLocaleString()}
              </strong>

              <div className="benefit-line"></div>

              <div className="mini-row">
                <span>Monthly EMI</span>
                <b>₹{Number(heroPlan.monthly_payment).toLocaleString()}</b>
              </div>

              <div className="mini-row">
                <span>Tenure</span>
                <b>{heroPlan.tenure_months} months</b>
              </div>

              <div className="mini-row">
                <span>Interest</span>
                <b>{Number(heroPlan.interest_rate)}%</b>
              </div>

              <div className="cashback-mini">
                + ₹{Number(heroPlan.cashback).toLocaleString()} cashback
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

/* =========================
   SHOP PAGE
========================= */

function Shop() {
  const [activeTab, setActiveTab] = useState("marketplace");

  return (
    <>
      <Header />

      <main className="shop-page">
        <section className="shop-hero">
          <span className="eyebrow">1FI SHOP</span>

          <h1>
            Shop smarter with <span>1Fi.</span>
          </h1>

          <p>
            Explore products and flexible EMI options designed around your
            budget.
          </p>
        </section>

        <section className="shop-tabs-section">
          <div className="shop-tabs">
            <button
              className={activeTab === "brands" ? "active" : ""}
              onClick={() => setActiveTab("brands")}
            >
              <span>🏷️</span>
              <strong>Top Brands</strong>
              <small>Explore popular brands</small>
            </button>

            <button
              className={activeTab === "stores" ? "active" : ""}
              onClick={() => setActiveTab("stores")}
            >
              <span>📍</span>
              <strong>Nearby Stores</strong>
              <small>Find stores near you</small>
            </button>

            <button
              className={activeTab === "marketplace" ? "active" : ""}
              onClick={() => setActiveTab("marketplace")}
            >
              <span>🛍️</span>
              <strong>1Fi Marketplace</strong>
              <small>Shop products on EMI</small>
            </button>
          </div>

          {activeTab === "brands" && (
            <div className="shop-empty">
              <div className="shop-empty-icon">🏷️</div>
              <h2>Top Brands</h2>
              <p>Brand discovery will be available here soon.</p>
            </div>
          )}

          {activeTab === "stores" && (
            <div className="shop-empty">
              <div className="shop-empty-icon">📍</div>
              <h2>Nearby Stores</h2>
              <p>Nearby store discovery will be available here soon.</p>
            </div>
          )}

          {activeTab === "marketplace" && <Marketplace />}
        </section>
      </main>

      <Footer />
    </>
  );
}

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/products`);

      if (!res.ok) {
        throw new Error("Unable to load products");
      }

      const list = await res.json();

      const detailed = await Promise.all(
        list.map(async (product) => {
          try {
            const detailRes = await fetch(
              `${API}/products/${product.slug}`
            );

            if (!detailRes.ok) return product;

            return await detailRes.json();
          } catch {
            return product;
          }
        })
      );

      setProducts(detailed);
    } catch (err) {
      console.error(err);
      setProducts([]);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="marketplace">
      <div className="marketplace-heading">
        <div>
          <span className="eyebrow">1FI MARKETPLACE</span>

          <h2>Products made easier to pay for.</h2>

          <p>
            Choose a product, select your variant and pick an EMI plan
            backed by mutual funds.
          </p>
        </div>

        {!loading && !error && (
          <span className="products-count">
            {products.length} Products
          </span>
        )}
      </div>

      {loading && (
        <div className="marketplace-status">
          <div className="loading-spinner"></div>
          <h3>Loading products...</h3>
          <p>Fetching the latest products and EMI options.</p>
        </div>
      )}

      {!loading && error && (
        <div className="marketplace-status error-state">
          <div className="status-icon">!</div>
          <h3>Unable to load products</h3>
          <p>Please check your connection and try again.</p>

          <button
            className="retry-btn"
            onClick={loadProducts}
          >
            Try Again →
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="marketplace-status">
          <h3>No products available</h3>
          <p>Please check back again later.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  const firstVariant = product.variants?.[0];

  const lowestPlan = product.emiPlans?.length
    ? product.emiPlans.reduce((lowest, current) =>
        Number(current.monthly_payment) < Number(lowest.monthly_payment)
          ? current
          : lowest
      )
    : null;

  const price = Number(firstVariant?.price || product.price);
  const mrp = Number(firstVariant?.mrp || product.mrp);
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <Link to={`/products/${product.slug}`} className="product-card">
      <div className="product-image-wrap">
        <img
          src={firstVariant?.image_url || product.image_url}
          alt={product.name}
        />

        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
      </div>

      <div className="product-info">
        <div className="product-card-top">
          <span className="product-brand">{product.brand}</span>

          <span className="variant-count">
            {product.variants?.length || 0}+ variants
          </span>
        </div>

        <h3>{product.name}</h3>

        <p className="product-short-description">
          {product.description}
        </p>

        <div className="price-row">
          <strong>₹{price.toLocaleString()}</strong>
          <del>₹{mrp.toLocaleString()}</del>
          <span>{discount}% off</span>
        </div>

        {lowestPlan && (
          <div className="emi-preview">
            <div>
              <span>Starting EMI</span>

              <small>
                {lowestPlan.tenure_months} months ·{" "}
                {Number(lowestPlan.interest_rate)}% interest
              </small>
            </div>

            <strong>
              ₹{Number(lowestPlan.monthly_payment).toLocaleString()}
              <small>/mo</small>
            </strong>
          </div>
        )}

        <span className="card-link">View product details →</span>
      </div>
    </Link>
  );
}

function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [planId, setPlanId] = useState(null);
  const [pincode, setPincode] = useState("");
  const [delivery, setDelivery] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    setProduct(null);
    setVariantIndex(0);
    setImageIndex(0);
    setPlanId(null);

    fetch(`${API}/products/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);

        if (data.emiPlans?.length) {
          setPlanId(data.emiPlans[0].id);
        }
      })
      .catch(() => navigate("/"));
  }, [slug, navigate]);

  const variant = product?.variants?.[variantIndex];

  const plan = product?.emiPlans?.find((p) => p.id === planId);

  const gallery = useMemo(() => {
    if (!product) return [];

    const images = [
      product.image_url,
      ...(product.variants || []).map((v) => v.image_url),
    ].filter(Boolean);

    return [...new Set(images)];
  }, [product]);

  if (!product) {
    return (
      <>
        <Header />

        <div className="loading">
          <div className="loading-spinner"></div>
          Loading product...
        </div>
      </>
    );
  }

  const selectedPrice = Number(variant?.price || product.price);
  const selectedMrp = Number(variant?.mrp || product.mrp);

  const savings = selectedMrp - selectedPrice;

  const discountPercent = Math.round(
    (savings / selectedMrp) * 100
  );

  const cashback = Number(plan?.cashback || 0);

  const totalPayable =
    Number(plan?.monthly_payment || 0) *
    Number(plan?.tenure_months || 0);

  const afterCashback = Math.max(totalPayable - cashback, 0);

  const maxCashback = product.emiPlans?.length
    ? Math.max(
        ...product.emiPlans.map((item) => Number(item.cashback || 0))
      )
    : 0;

  const previousImage = () => {
    setImageIndex((current) =>
      current === 0 ? gallery.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setImageIndex((current) =>
      current === gallery.length - 1 ? 0 : current + 1
    );
  };

  const checkDelivery = () => {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setDelivery("Please enter a valid 6-digit pincode.");
      return;
    }

    setDelivery(`Great! Delivery available to ${pincode}.`);
  };

  const continuePurchase = () => {
    if (!plan) return;
    setShowConfirm(true);
  };

  const confirmPurchase = () => {
    const ref = `1FI-EMI-${Math.floor(10000 + Math.random() * 90000)}`;

    setReferenceId(ref);
    setShowConfirm(false);
    setShowSuccess(true);
  };

  return (
    <>
      <Header />

      <main className="product-page">
        <div className="product-top-actions">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to products
          </button>

          <Link to="/" className="home-product-link">
            Home
          </Link>
        </div>

        <div className="breadcrumb">
          Home <span>/</span> {product.brand} <span>/</span>{" "}
          {product.name}
        </div>

        {/* MAIN PRODUCT */}
        <section className="product-main">
          {/* GALLERY */}
          <div className="gallery-section">
            <div className="main-image">
              <button
                className="gallery-arrow left"
                onClick={previousImage}
              >
                ‹
              </button>

              <img
                src={gallery[imageIndex] || product.image_url}
                alt={product.name}
              />

              <button
                className="gallery-arrow right"
                onClick={nextImage}
              >
                ›
              </button>

              <span className="image-counter">
                {imageIndex + 1} / {gallery.length}
              </span>

              <span className="gallery-label">
                Premium product view
              </span>
            </div>

            <div className="thumbnail-row">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={`thumbnail ${
                    imageIndex === index ? "active" : ""
                  }`}
                  onClick={() => setImageIndex(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="product-details">
            <div className="title-row">
              <div>
                <span className="product-brand">{product.brand}</span>
                <h1>{product.name}</h1>
              </div>

              {product.badge && (
                <span className="detail-badge">{product.badge}</span>
              )}
            </div>

            <div className="rating-row">
              <span className="rating">★ 4.8</span>
              <span>1,248 ratings</span>
              <span>•</span>
              <span>Best seller</span>
            </div>

            <p className="product-description">
              {product.description}
            </p>

            {/* PRICE */}
            <div className="price-block">
              <strong>₹{selectedPrice.toLocaleString()}</strong>
              <del>₹{selectedMrp.toLocaleString()}</del>
              <span>{discountPercent}% off</span>
            </div>

            <div className="saving-text">
              You save ₹{savings.toLocaleString()} on this variant
            </div>

            {/* SELLER */}
            <div className="seller-note">
              <span>✓</span>

              <div>
                <strong>Sold by 1Fi Marketplace</strong>

                <small>
                  Trusted seller · Secure purchase · Genuine products
                </small>
              </div>
            </div>

            {/* VARIANT */}
            <div className="selection-box">
              <div className="selection-title">
                <strong>Select variant</strong>
                <span>{variant?.type}</span>
              </div>

              <div className="variant-grid">
                {product.variants.map((item, index) => (
                  <button
                    key={item.id}
                    className={`variant-btn ${
                      variantIndex === index ? "selected" : ""
                    }`}
                    onClick={() => {
                      setVariantIndex(index);

                      const foundIndex = gallery.findIndex(
                        (image) => image === item.image_url
                      );

                      setImageIndex(foundIndex >= 0 ? foundIndex : 0);
                    }}
                  >
                    <span>{item.value}</span>

                    <strong>
                      ₹{Number(item.price).toLocaleString()}
                    </strong>
                  </button>
                ))}
              </div>
            </div>

            {/* EMI */}
            <div className="emi-section">
              <div className="emi-heading">
                <div>
                  <span className="eyebrow">FLEXIBLE PAYMENTS</span>
                  <h2>Choose your EMI</h2>
                  <p>Select the plan that fits your monthly budget.</p>
                </div>

                <span className="mutual-badge">
                  ◈ Backed by Mutual Funds
                </span>
              </div>

              <div className="emi-grid">
                {product.emiPlans.map((item) => (
                  <button
                    key={item.id}
                    className={`emi-card ${
                      planId === item.id ? "selected" : ""
                    }`}
                    onClick={() => setPlanId(item.id)}
                  >
                    <div className="emi-check">
                      {planId === item.id ? "✓" : ""}
                    </div>

                    <span className="emi-label">{item.label}</span>

                    <strong>
                      ₹{Number(item.monthly_payment).toLocaleString()}
                      <small>/month</small>
                    </strong>

                    <div className="emi-meta">
                      <span>{item.tenure_months} months</span>

                      <span>
                        {Number(item.interest_rate)}% interest
                      </span>
                    </div>

                    <div className="cashback">
                      + ₹{Number(item.cashback).toLocaleString()} cashback
                    </div>

                    <small className="emi-backed">
                      {item.backed_by || "Mutual Funds"}
                    </small>
                  </button>
                ))}
              </div>

              {plan && (
                <div className="emi-summary">
                  <div>
                    <span>Monthly EMI</span>

                    <strong>
                      ₹{Number(plan.monthly_payment).toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>Tenure</span>
                    <strong>{plan.tenure_months} months</strong>
                  </div>

                  <div>
                    <span>Total payable</span>

                    <strong>
                      ₹{totalPayable.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>After cashback</span>

                    <strong className="green">
                      ₹{afterCashback.toLocaleString()}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* DELIVERY */}
            <div className="delivery-box">
              <div>
                <strong>🚚 Check delivery availability</strong>

                <span>
                  Enter your pincode to check delivery availability.
                </span>
              </div>

              <div className="pincode-row">
                <input
                  value={pincode}
                  maxLength={6}
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter pincode"
                />

                <button onClick={checkDelivery}>Check</button>
              </div>

              {delivery && (
                <p
                  className={
                    delivery.startsWith("Great")
                      ? "success-text"
                      : "error-text"
                  }
                >
                  {delivery}
                </p>
              )}
            </div>

            <button
              className="continue-btn"
              onClick={continuePurchase}
            >
              Continue with EMI →
            </button>

            <div className="confidence-row">
              <div>🔒 Secure checkout</div>
              <div>↻ Easy returns</div>
              <div>✓ Trusted payment</div>
            </div>
          </div>
        </section>

        {/* PRODUCT HIGHLIGHTS */}
        <section className="highlights-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">AT A GLANCE</span>
              <h2>Product highlights.</h2>
              <p>
                Everything important about this product in one place.
              </p>
            </div>
          </div>

          <div className="highlight-grid">
            <div className="highlight-card">
              <span>💰</span>

              <div>
                <small>Current price</small>
                <strong>₹{selectedPrice.toLocaleString()}</strong>
              </div>
            </div>

            <div className="highlight-card">
              <span>🏷️</span>

              <div>
                <small>You save</small>
                <strong>₹{savings.toLocaleString()}</strong>
              </div>
            </div>

            <div className="highlight-card">
              <span>📦</span>

              <div>
                <small>Available variants</small>
                <strong>{product.variants.length} options</strong>
              </div>
            </div>

            <div className="highlight-card">
              <span>💳</span>

              <div>
                <small>EMI plans</small>
                <strong>{product.emiPlans.length} plans</strong>
              </div>
            </div>

            <div className="highlight-card">
              <span>🎁</span>

              <div>
                <small>Maximum cashback</small>
                <strong>₹{maxCashback.toLocaleString()}</strong>
              </div>
            </div>

            <div className="highlight-card">
              <span>◈</span>

              <div>
                <small>Financing</small>
                <strong>Mutual Funds</strong>
              </div>
            </div>
          </div>
        </section>

        {/* INFORMATION */}
        <section className="info-section">
          <div className="info-card">
            <span className="info-icon">🚚</span>

            <div>
              <h3>Shipping & Delivery</h3>
              <p>
                Fast and reliable doorstep delivery with order tracking.
              </p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">🛡️</span>

            <div>
              <h3>Shop with Confidence</h3>
              <p>
                Secure payments, transparent pricing and trusted sellers.
              </p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">💳</span>

            <div>
              <h3>Flexible EMI</h3>
              <p>
                Compare multiple tenures and select the payment that works
                best for you.
              </p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">🎁</span>

            <div>
              <h3>Cashback Benefits</h3>
              <p>
                Selected EMI plans can include attractive cashback benefits.
              </p>
            </div>
          </div>
        </section>

        {/* SPECIFICATIONS */}
        <section className="details-section">
          <div className="details-title">
            <span className="eyebrow">PRODUCT DETAILS</span>
            <h2>Everything you need to know.</h2>
            <p>
              Detailed information about your selected product and payment
              options.
            </p>
          </div>

          <div className="details-layout">
            <div className="details-panel">
              <h3>Product information</h3>

              <div className="details-grid">
                <div>
                  <span>Brand</span>
                  <strong>{product.brand}</strong>
                </div>

                <div>
                  <span>Product</span>
                  <strong>{product.name}</strong>
                </div>

                <div>
                  <span>Selected variant</span>
                  <strong>{variant?.value}</strong>
                </div>

                <div>
                  <span>Original MRP</span>
                  <strong>₹{selectedMrp.toLocaleString()}</strong>
                </div>

                <div>
                  <span>Current price</span>
                  <strong>₹{selectedPrice.toLocaleString()}</strong>
                </div>

                <div>
                  <span>Discount</span>
                  <strong>{discountPercent}% off</strong>
                </div>

                <div>
                  <span>Available variants</span>
                  <strong>{product.variants.length}</strong>
                </div>

                <div>
                  <span>Payment method</span>
                  <strong>Flexible EMI</strong>
                </div>
              </div>
            </div>

            <div className="details-panel">
              <h3>Payment information</h3>

              {plan ? (
                <div className="payment-details">
                  <div>
                    <span>Selected EMI</span>

                    <strong>
                      ₹{Number(plan.monthly_payment).toLocaleString()}/month
                    </strong>
                  </div>

                  <div>
                    <span>Tenure</span>
                    <strong>{plan.tenure_months} months</strong>
                  </div>

                  <div>
                    <span>Interest rate</span>

                    <strong>
                      {Number(plan.interest_rate)}%
                    </strong>
                  </div>

                  <div>
                    <span>Cashback</span>

                    <strong className="green">
                      ₹{Number(plan.cashback).toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>Total payable</span>

                    <strong>
                      ₹{totalPayable.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>After cashback</span>

                    <strong className="green">
                      ₹{afterCashback.toLocaleString()}
                    </strong>
                  </div>
                </div>
              ) : (
                <p>Select an EMI plan to see payment details.</p>
              )}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews-section">
          <div className="review-heading">
            <div>
              <span className="eyebrow">CUSTOMER REVIEWS</span>
              <h2>Loved by shoppers.</h2>
              <p>
                See what customers think about the shopping experience.
              </p>
            </div>

            <div className="review-score">
              <strong>4.8</strong>
              <span>★★★★★</span>
              <small>1,248 ratings</small>
            </div>
          </div>

          <div className="review-grid">
            <Review
              name="Rahul Sharma"
              text="The EMI process was really simple and the pricing was transparent."
            />

            <Review
              name="Priya Singh"
              text="Loved the clean checkout experience. Selecting the EMI was very easy."
            />

            <Review
              name="Aman Verma"
              text="Good product options and the cashback information was clearly shown."
            />
          </div>
        </section>
      </main>

      <Footer />

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="modal-close"
              onClick={() => setShowConfirm(false)}
            >
              ×
            </button>

            <div className="modal-icon">✓</div>

            <span className="eyebrow">CONFIRM ORDER</span>
            <h2>Ready to continue?</h2>

            <div className="modal-summary">
              <div>
                <span>Product</span>
                <strong>{product.name}</strong>
              </div>

              <div>
                <span>Variant</span>
                <strong>{variant?.value}</strong>
              </div>

              <div>
                <span>EMI</span>
                <strong>
                  ₹{Number(plan.monthly_payment).toLocaleString()}/month
                </strong>
              </div>

              <div>
                <span>Tenure</span>
                <strong>{plan.tenure_months} months</strong>
              </div>
            </div>

            <button
              className="continue-btn"
              onClick={confirmPurchase}
            >
              Confirm & Proceed
            </button>

            <button
              className="cancel-btn"
              onClick={() => setShowConfirm(false)}
            >
              Go back
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal success-modal">
            <div className="success-icon">✓</div>

            <span className="eyebrow">ORDER CONFIRMED</span>

            <h2>You're all set! 🎉</h2>

            <p>
              Your EMI selection has been successfully confirmed.
            </p>

            <div className="reference-box">
              <span>REFERENCE ID</span>
              <strong>{referenceId}</strong>
            </div>

            <div className="success-details">
              <div>
                <span>Product</span>
                <strong>{product.name}</strong>
              </div>

              <div>
                <span>Monthly EMI</span>
                <strong>
                  ₹{Number(plan.monthly_payment).toLocaleString()}
                </strong>
              </div>
            </div>

            <button
              className="continue-btn"
              onClick={() => {
                setShowSuccess(false);
                navigate("/");
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Review({ name, text }) {
  return (
    <div className="review-card">
      <div className="review-stars">★★★★★</div>
      <p>"{text}"</p>
      <strong>{name}</strong>
      <span>Verified buyer</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span className="logo-mark">
              <span className="logo-inner">↑Fi</span>
            </span>
          </Link>

          <p>
            Smarter purchases with flexible EMI plans backed by mutual funds.
          </p>

          <div className="store-buttons">
            <a
              href="#"
              className="store-btn"
              onClick={(e) => e.preventDefault()}
            >
              <span className="play-logo">▶</span>

              <span>
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </span>
            </a>

            <a
              href="#"
              className="store-btn"
              onClick={(e) => e.preventDefault()}
            >
              <span className="apple-logo">●</span>

              <span>
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <a href="/#how-it-works">How it works</a>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <a href="/#benefits">About ↑Fi</a>
          <a href="/#benefits">Benefits</a>
          <Link to="/shop">Shop</Link>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <a href="/#products">Help Centre</a>
          <a href="/#products">Contact us</a>
          <a href="/#products">Terms</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 1Fi. All rights reserved.</span>
        <span>Built for smarter shopping.</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:slug" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}