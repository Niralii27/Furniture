import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import sofa from '../../images/sofa.png';

function FurnitureWebsite() {
  return (
    <div className="furniture-website">
      {/* Main content area with newsletter and chair image */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={8}>
            <div className="newsletter-section mb-5">
              <div className="d-flex align-items-center mb-3">
                <i className="far fa-envelope me-2 text-secondary"></i>
                <h5 className="mb-0 text-secondary">Subscribe to Newsletter</h5>
              </div>
              
              <Form className="d-flex">
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name" 
                  className="me-2 rounded-1"
                />
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email" 
                  className="me-2 rounded-1"
                />
                <Button variant="dark" className="px-4 rounded-1 light-brown-btn">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
              </Form>
            </div>
            
            <h2 className="text mb-4">𝕌𝕣𝕓𝕒𝕟𝕎𝕠𝕠𝕕</h2>
            
            <p className="text-muted">
            Find the perfect blend of style and comfort with our premium furniture collection. Shop online for high-quality, durable pieces that elevate your space. Fast delivery and hassle-free shopping at your fingertips!            </p>
            
            <div className="social-icons mt-4">
              <Button variant="light" className="rounded-circle me-2 light-brown-btn">
                <FontAwesomeIcon icon={faFacebookF} />
              </Button>
              <Button variant="light" className="rounded-circle me-2 light-brown-btn">
                <FontAwesomeIcon icon={faTwitter} />
              </Button>
              <Button variant="light" className="rounded-circle me-2 light-brown-btn">
                <FontAwesomeIcon icon={faInstagram} />
              </Button>
              <Button variant="light" className="rounded-circle me-2 light-brown-btn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Button>
            </div>
          </Col>
          <Col md={4} className="text-end">
            <Image src={sofa} alt="Teal Armchair" fluid />
          </Col>
        </Row>
      </Container>
      
      {/* Footer links section */}
      <Container className="py-5">
        <Row>
          <Col md={3} sm={6} className="mb-4">
            <h6 className="text-dark mb-3">About us</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Fast&Free Shipping</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">24/7 Support</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Easy to Shop</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Hassle Free Returns</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h6 className="text-dark mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Return & Refund Policies</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Shipping Delivery</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">FAQs</a></li>

            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h6 className="text-dark mb-3">Shop Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Living Room Furniture</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Bedroom Furniture</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Office Furniture</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Outdoor Furniture</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h6 className="text-dark mb-3">Policies & Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Terms & Conditions</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
      
      {/* Copyright section */}
      <Container className="border-top py-4">
        <Row className="align-items-center">
          <Col md={6}>
            <small className="text-muted">
              Copyright ©2025. All Rights Reserved by 𝕌𝕣𝕓𝕒𝕟𝕎𝕠𝕠𝕕
            </small>
          </Col>
          <Col md={6} className="text-md-end">
           
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FurnitureWebsite;