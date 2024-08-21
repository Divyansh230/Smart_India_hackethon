// src/components/Services.js
import React from 'react';
import './Services.css';

function Services() {
  const services = [
    { title: 'Aadhaar Enrollment', description: 'Enroll for a new Aadhaar.' },
    { title: 'Update Aadhaar', description: 'Update your Aadhaar details.' },
    { title: 'Download Aadhaar', description: 'Download your Aadhaar card.' },
    { title: 'Verify Aadhaar', description: 'Verify your Aadhaar number.' },
  ];

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
