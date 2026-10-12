import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleClear = () => {
    setSearch('');
    setSearchParams({});
  };

  const filteredProducts = products.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="shop-container">
      {search.trim() ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
          <div>
            <h2 style={{ margin: 0 }}>Search Results</h2>
            <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '0.95rem' }}>
              Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'} for "<strong>{search}</strong>"
            </p>
          </div>
          <button 
            onClick={handleClear} 
            className="btn" 
            style={{ padding: '8px 18px', fontSize: '0.9rem', background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1', boxShadow: 'none' }}
          >
            Clear Search & View All
          </button>
        </div>
      ) : (
        <h2>All Products</h2>
      )}

      {loading ? (
        <div style={{ color: '#ea580c', textAlign: 'center', margin: '40px 0' }}>Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '20px' }}>
            No products found matching "<strong>{search}</strong>".
          </p>
          <button onClick={handleClear} className="btn">
            View All Products
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;