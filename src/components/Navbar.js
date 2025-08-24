import React from 'react';
import { Logo } from '../assets/logo';

const Navbar = () => {
  return (
    <nav style={{
      position: 'relative',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Black circle in the navbar */}
      <div style={{
        position: 'absolute',
        top: '-262px',
        left: '-183px',
        width: '500px',
        height: '500px',
        backgroundColor: '#000000',
        borderRadius: '50%',
        zIndex: '0'
      }} />
      
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: '1' }}>
        <Logo />
        <h1 style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Samriddhi</h1>
      </div>
      <div style={{ display: 'flex', gap: '20px', zIndex: '1' }}>
        <button style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer' }}>To Rent</button>
        <button style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer' }}>Services</button>
        <button style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer' }}>Pricing</button>
      </div>
      <div style={{ display: 'flex', gap: '10px', zIndex: '1' }}>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: 'transparent',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}>
          Log In
        </button>
        <button style={{ 
          padding: '8px 16px', 
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '4px'
        }}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
