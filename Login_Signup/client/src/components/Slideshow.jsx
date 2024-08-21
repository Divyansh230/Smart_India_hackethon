import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// src/components/Slideshow.js
import React from 'react';
import Slider from 'react-slick';
import './Slideshow.css';

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    pauseOnHover: true,
  };

  const services = [
    { title: 'Aadhaar Enrollment', imageUrl: 'https://uidai.gov.in/images/capturing_demographic_and_biometric.png' },
    { title: 'Update Aadhaar', imageUrl: 'https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/aadhaar-card-correction.jpg' },
    { title: 'Download Aadhaar', imageUrl: 'https://media.lendingkart.com/wp-content/uploads/2020/01/Aadhar-Card-Download.jpg' },
    { title: 'Verify Aadhaar', imageUrl: 'https://static.bankbazaar.com/images/india/infographic/aadhar-verification1.webp' },
  ];

  return (
    <div className="slideshow">
      <Slider {...settings}>
        {services.map((service, index) => (
          <div key={index} className="slide">
            <img src={service.imageUrl} alt={service.title} />
            <h3>{service.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
