import React from 'react';

const GetInvolved: React.FC = () => {
  return (
    <div style={{ padding: '20px', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h1>Support Our Research</h1>
      <p>Your donations play a crucial role in advancing our mission and supporting impactful projects that drive innovation and change. Join us in making a difference.</p>

      <h2>Why Support Us?</h2>
      <ul>
        <li>We are committed to groundbreaking research and innovation.</li>
        <li>Our recent achievements include [insert achievements].</li>
        <li>Your donations directly contribute to our projects and initiatives.</li>
      </ul>

      <h2>Donation Options</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
          One-Time Donation
        </button>
        <button style={{ padding: '10px 20px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '5px' }}>
          Recurring Donation
        </button>
      </div>
      <h2>Transparency</h2>
      <p>We ensure that your contributions are used effectively to maximize impact. Our financial reports and project updates are available to all donors.</p>
    </div>
  );
};

export default GetInvolved;
