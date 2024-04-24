import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="home-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6 p-3">
            <div className="intro-left rounded-5 d-flex justify-content-center align-items-center">
              <img src='logo.png' alt='logo' className='col-6 rounded-circle' />
            </div>
          </div>
          <div className="col-md-6 p-3">
            <div className="intro-right pb-5 d-flex flex-column justify-content-center align-items-center">
              <img src='logo.png' alt='logo' className='col-1 d-none d-md-flex rounded-circle' />
              <h1 className='p-2 pb-5 text-white'><strong> Weatherist </strong></h1>
              <Link to='/dashboard' className='bg-primary text-white text-decoration-none p-2 rounded-5 col-5 text-center'>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
