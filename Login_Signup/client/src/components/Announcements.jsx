// src/components/Announcements.js
import React from 'react';
import './Announcements.css';

function Announcements() {
  const announcements = [
    'New Aadhaar update centers opened in your city.',
    'Aadhaar verification made easier.',
    'UIDAI launches new mobile app.',
  ];

  return (
    <section id="announcements" className="announcements">
      <h2>Announcements</h2>
      <ul>
        {announcements.map((announcement, index) => (
          <li key={index}>{announcement}</li>
        ))}
      </ul>
    </section>
  );
}

export default Announcements;
