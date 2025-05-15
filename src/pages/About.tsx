import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{ padding: '20px', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <h1>About Our Organization</h1>
      <p>Welcome to our organization, where innovation meets impact. Our mission is to drive change and foster a sustainable future through cutting-edge research and community engagement. We value integrity, collaboration, and excellence in all our endeavors.</p>

      <h2>Our Mission</h2>
      <p>We aim to:</p>
      <ul>
        <li>Advance scientific knowledge and innovation.</li>
        <li>Empower communities through education and outreach.</li>
        <li>Promote sustainable practices and solutions.</li>
      </ul>

      <h2>History & Impact</h2>
      <ul>
        <li><strong>2005:</strong> Founded with a vision to innovate.</li>
        <li><strong>2010:</strong> Launched our first community outreach program.</li>
        <li><strong>2015:</strong> Recognized for excellence in research.</li>
        <li><strong>2020:</strong> Expanded global partnerships.</li>
      </ul>

      <h2>Our Partners</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '20px' }}>
        <img src="/path/to/logo1.png" alt="Partner 1" style={{ width: '100px' }} />
        <img src="/path/to/logo2.png" alt="Partner 2" style={{ width: '100px' }} />
        <img src="/path/to/logo3.png" alt="Partner 3" style={{ width: '100px' }} />
      </div>
    </div>
  );
};

export default About;
