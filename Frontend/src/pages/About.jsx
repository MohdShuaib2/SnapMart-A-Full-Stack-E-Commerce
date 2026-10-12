import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 40px -5px rgba(15, 23, 42, 0.08)',
    textAlign: 'center'
  };

  const socialBtnStyle = {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    background: '#f8fafc',
    color: '#0f172a',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid #cbd5e1',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <img
        src="/dp.jpg"
        alt="@MohdShuaib"
        style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f97316', marginBottom: '20px', boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)' }}
      />
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#0f172a' }}>About Me</h2>
      <h3 style={{ fontSize: '1.5rem', color: '#ea580c', marginBottom: '15px' }}>MohdShuaib (@MohdShuaib)</h3>

      <p style={{ color: '#475569', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 30px auto' }}>
        <strong>Join the community and grow together!</strong> Welcome to my platform where we build, deploy, and scale highly engineered systems.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <a href="https://youtube.com/@mohdshuaib1005?si=61eAKuOeiopXnoME" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: '#fef2f2', borderColor: '#fca5a5', color: '#dc2626' }}>📺 YouTube</a>
        <a href="https://www.instagram.com/shuaib_turk__?igsh=bmpoaGdudDFhdWVl" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: '#fdf2f8', borderColor: '#f9a8d4', color: '#db2777' }}>📸 Instagram</a>
        <a href="https://www.linkedin.com/in/mohd-shuaib2" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: '#eff6ff', borderColor: '#93c5fd', color: '#2563eb' }}>💼 LinkedIn</a>
        <a href="https://x.com/MohdShuaib09" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: '#f8fafc', borderColor: '#cbd5e1', color: '#0f172a' }}>✖️ X (Twitter)</a>
        <a href="https://wa.me/917599817616" target="_blank" rel="noreferrer" style={{ ...socialBtnStyle, background: '#f0fdf4', borderColor: '#86efac', color: '#16a34a' }}>💬 WhatsApp</a>
      </div>
    </div>
  );
};
export default About;
