import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <h1>Slack Clone</h1>
      </div>
      <div className="navbar__links">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
};
