import React, { useState, useRef, useEffect } from 'react';
import {
  ABOUT_LINKS,
  HELP_LINKS,
  PRIVACY_LINKS,
  SOCIAL_LINKS
} from '../constants';

import FooterSelect from './FooterSelect';

const registerObserver = (ref: any, setShowFooter: any) => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      setShowFooter(true);
      observer.disconnect();
    });
  });
  observer.observe(ref);
}

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    registerObserver(footerRef.current, setShowFooter)
  }, []);

  if (showFooter) {
    return (
      <footer className="footer">
        <div className="content">
          <div className="footer__top">
            <div className="footer__main">
              <div className="footer__logo-container">
                <img
                  className="footer__logo"
                  src={require('../styles/img/logo-white.svg')}
                  alt="Uber Eats"
                />
                <FooterSelect />
              </div>
              <div className="footer__mobile-apps">
                <a href="https://apps.apple.com/us/app/uber-eats-order-food-delivery/id1058959277" className="footer__mobile-app">
                  <img
                    src={require('../styles/img/apple-store.png')}
                    alt="Apple Store">
                  </img>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.ubercab.eats&hl=ru" className="footer__mobile-app">
                  <img
                    src={require('../styles/img/google-play.png')}
                    alt="Google Play">
                  </img>
                </a>
              </div>
            </div>
            <div className="footer__top-links links">
              <h3 className="links__header">
                About Uber Eats
              </h3>
              <ul>
                {ABOUT_LINKS.map(link => (
                  <li key={link} className="links__item">
                    <a href="!#" className="links__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__top-links links">
              <h3 className="links__header">
                Get help
              </h3>
              <ul>
                {HELP_LINKS.map(link => (
                  <li key={link} className="links__item">
                    <a href="!#" className="links__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">
              © 2019 Uber Technologies Inc.
            </p>
            <div className="footer__misc">
              <div className="footer__bottom-links links">
                <ul>
                  {PRIVACY_LINKS.map(link => (
                    <li key={link} className="links__item">
                      <a href="!#" className="links__link">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer__social social">
                {SOCIAL_LINKS.map(link => (
                  <a href="!#" className="social__link" key={link}>
                    <img src={require(`../styles/img/${link}.svg`)} alt={link} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return <footer ref={footerRef} className="footer"></footer>
}

export default Footer;
