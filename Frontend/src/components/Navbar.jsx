import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef(null);

  // Sync input with ?search= query param if on /shop
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchVal = params.get('search');
    if (location.pathname === '/shop' && searchVal !== null) {
      setQuery(searchVal);
    }
  }, [location]);

  // Fetch products once for fast instant client-side autocomplete
  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();
        if (isMounted && Array.isArray(data)) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to load products for search preview:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    setIsOpen(false);
    if (trimmed) {
      navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/shop');
    }
  };

  const handleSelectProduct = (productId) => {
    setIsOpen(false);
    navigate(`/product/${productId}`);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    if (location.pathname === '/shop') {
      navigate('/shop');
    }
  };

  // Filter products for the live preview dropdown
  const trimmedQuery = query.trim().toLowerCase();
  const matchingProducts = trimmedQuery
    ? products.filter(
        (p) =>
          p.name?.toLowerCase().includes(trimmedQuery) ||
          p.category?.toLowerCase().includes(trimmedQuery) ||
          p.description?.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const previewResults = matchingProducts.slice(0, 5);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img
            src="/SnapMartLogo.png"
            alt="SnapMart"
            style={{
              height: '36px',
              width: '36px',
              borderRadius: '8px',
              objectFit: 'cover',
              filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))'
            }}
          />
          SnapMart
        </Link>
      </div>

      {/* Product Search Section */}
      <div className="navbar-search" ref={searchContainerRef}>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <button type="submit" className="search-icon-btn" aria-label="Search">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search products, brands, categories..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (query.trim().length > 0) setIsOpen(true);
            }}
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </form>

        {/* Live Search Autocomplete Dropdown */}
        {isOpen && trimmedQuery.length > 0 && (
          <div className="search-dropdown">
            {previewResults.length > 0 ? (
              <>
                <div className="search-dropdown-header">
                  <span>Suggested Products ({matchingProducts.length})</span>
                </div>
                <ul className="search-dropdown-list">
                  {previewResults.map((product) => (
                    <li
                      key={product._id}
                      className="search-result-item"
                      onClick={() => handleSelectProduct(product._id)}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="search-result-img"
                      />
                      <div className="search-result-info">
                        <div className="search-result-name">{product.name}</div>
                        <div className="search-result-meta">
                          <span className="search-result-category">{product.category}</span>
                          <span className="search-result-price">
                            ₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="search-dropdown-footer">
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Showing top {previewResults.length} of {matchingProducts.length}
                  </span>
                  <button type="button" onClick={handleSearchSubmit}>
                    View all in Shop →
                  </button>
                </div>
              </>
            ) : (
              <div className="search-empty">
                No products found for "<strong>{query}</strong>"
                <span>Try searching with a different keyword or category.</span>
              </div>
            )}
          </div>
        )}
      </div>

      <ul className="navbar-links">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        {user ? (
          <>
            <li><Link to="/profile">Hi, {user.name}</Link></li>
            {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;