import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '40px 20px',
      marginTop: 'auto',
      boxShadow: '0 -2px 10px rgba(15, 23, 42, 0.02)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ color: '#ea580c', marginBottom: '8px', fontSize: '1.4rem' }}>SnapMart</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Premium E-Commerce Platform.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="/about" style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>About Us</Link>
          <Link to="/return" style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Return Policy</Link>
          <Link to="/disclaimer" style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>Disclaimer</Link>
        </div>
        
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} SnapMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;