import React from 'react'
import dotsYellow from '../../images/dots-yellow.svg';
import contactimg from '../../images/contact.jpg';


function About() {
  return (
<div>
    <div className="hero-section position-relative" style={{
        backgroundImage: `url(${contactimg})`,
            backgroundPosition: 'center',
            height: '50vh',
            position: 'relative'
          }}>
            <div className="overlay position-absolute w-100 h-100" style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}></div>
            <div className="container h-100 d-flex flex-column justify-content-center align-items-center position-relative">
              <h1 className="text-white text-center mb-2">About us</h1>
              <p className="text-white text-center">Designed for Life, Built to Last</p>
            </div>
    </div>
    <section className="why-choose-us py-5" style={{ backgroundColor: '#f7f7f7' }}>
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="content-wrapper pe-lg-5">
            <h2 className="section-title mb-4" style={{ color: '#333', fontSize: '2.5rem', fontWeight: '700' }}>
              Why Choose Us
            </h2>
            <p className="text-muted mb-5">
            Premium quality, fast shipping, hassle-free returns, and 24/7 support – furniture shopping made easy!
            </p>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="feature-item d-flex">
                  <div className="icon-wrapper me-3" style={{ 
                    backgroundColor: '#e6f2f2', 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 19L12 21L16 19" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15L12 21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 9H4C2.89543 9 2 8.10457 2 7V4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V7C22 8.10457 21.1046 9 20 9Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 13H22" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="feature-title mb-2" style={{ fontSize: '1.25rem', fontWeight: '600' }}>Fast & Free Shipping</h4>
                    <p className="text-muted mb-0">
                    From Our Door to Yours, Lightning Fast & Absolutely Free! Speedy Delivery, Zero Extra Cost – Free Shipping Just for You!"
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="feature-item d-flex">
                  <div className="icon-wrapper me-3" style={{ 
                    backgroundColor: '#e6f2f2', 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="feature-title mb-2" style={{ fontSize: '1.25rem', fontWeight: '600' }}>Easy to Shop</h4>
                    <p className="text-muted mb-0">
                    Click, Buy, Relax – Shopping Made Simple!🛍️ No Stress, Just Shopping!
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="feature-item d-flex">
                  <div className="icon-wrapper me-3" style={{ 
                    backgroundColor: '#e6f2f2', 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12L14 14" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="feature-title mb-2" style={{ fontSize: '1.25rem', fontWeight: '600' }}>24/7 Support</h4>
                    <p className="text-muted mb-0">
                    Questions? We've Got Answers – Anytime You Need! 📞 We're Here for You – Anytime, Anywhere!                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="feature-item d-flex">
                  <div className="icon-wrapper me-3" style={{ 
                    backgroundColor: '#e6f2f2', 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 10L12 14L8 10" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="feature-title mb-2" style={{ fontSize: '1.25rem', fontWeight: '600' }}>Hassle Free Returns</h4>
                    <p className="text-muted mb-0">
                    Returning Made Easy – Because Your Satisfaction Matters! 📦 Simple, Fast & Easy Returns                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 position-relative">
          {/* Dotted background pattern */}
          <div className="dotted-pattern position-absolute" style={{ 
            top: '0', 
            right: '0', 
           
            zIndex: '1'
          }}>
            <img 
              src={dotsYellow}
              alt="Modern interior with furniture" 
              className="img-fluid" 
              
            />
          </div>

          {/* Main image */}
          <div className="image-container" style={{ 
            borderRadius: '8px', 
            top: '80px',
            right: '-15px',
            overflow: 'hidden', 
            position: 'relative', 
            zIndex: '9', 
          }}>
            <img 
              src={contactimg}
              alt="Modern interior with furniture" 
              className="img-fluid" 
              style={{ 
                width: '80%', 
                height: 'auto', 
                objectFit: 'cover', 
                objectPosition: 'center'
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  </section> 
  </div>
   )
}

export default About