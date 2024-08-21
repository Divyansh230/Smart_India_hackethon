// src/App.js
import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Services from './components/Services';
import Announcements from './components/Announcements';
import Footer from './components/Footer';
import Slideshow from './components/Slideshow';
import './Home.css';


function Home() {
  return (
    <div className="App">
      <div><Header />
      <Banner />
      <Slideshow/>
      <Slideshow/>
      <Announcements />
      <Footer/></div>
    </div>
  );
}

export default Home;
