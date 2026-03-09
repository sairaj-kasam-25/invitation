import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Details', href: '#reception' },
  { label: 'Venue', href: '#venue' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        <a href="#home" className={styles.logo} onClick={(e) => handleNav(e, '#home')}>
          <span className={styles.logoText}>G</span>
          <span className={styles.logoAmp}>&</span>
          <span className={styles.logoText}>M</span>
        </a>

        <ul className={styles.links}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.link}
                onClick={(e) => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.burgerLine} ${menuOpen ? styles.open1 : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.open2 : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.open3 : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={(e) => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
