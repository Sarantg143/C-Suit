// Footer.jsx
import React, { useEffect } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebookF, faSquareInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import footerlogo from '../Header/Asset/brand-footer.png';
import Aos from "aos";
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router';

function Footer() {
  let navigate = useNavigate();

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <div className='footer' id='footer'>
        <section data-aos="fade-up" className='section1'>
          <img src={footerlogo} alt="" width={"120px"}/>
          <p>Practical-based learning platform to enhance skills</p>
          <h6>Follow Us on</h6>
          <div className='sociallinks'>
            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://www.facebook.com/your-profile" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faSquareInstagram} />
            </a>
            <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </section>

        <section data-aos="fade-up" className='section2'>
          <h5>About LMS</h5>
          <a>Pricing</a>
          <a>Features</a>
          <a>Integrations</a>
          <a>Events</a>
          <a>Reviews</a>
        </section>

        <section data-aos="fade-up" className='section3'>
          <h5>Support</h5>
          <a>Contact Us</a>
          <a>Help Desk</a>
          <a>Customer Support</a>
          <a>Professional Services</a>
          <a onClick={(e) => { e.preventDefault(); navigate('/admin/login');}}>Administrative service</a>
        </section>

        <section data-aos="fade-up" className='section4'>
          <h4>Become an Instructor</h4>
          <p>We only work with the best companies around the globe</p>
          <form className='instructoremail'>
            <input className="emailinput" type="email" placeholder='Enter Your Email'/>
            <input className='registernow' type="submit" value="Register Now" />
          </form>
        </section>
      </div>

      <div className='copyright-section'>
        <div className='copyright-text'>
          © {new Date().getFullYear()} LMS. All Rights Reserved.
        </div>
        <div className='copyright-links'>
          <a href="/disclaimer">Disclaimer</a>
          <a href="/terms">Terms and Conditions</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/refund">Refund Policy</a>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </>
  );
}

export default Footer;