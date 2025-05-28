// components/Header.js
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css'; // Menggunakan module CSS yang sama untuk konsistensi

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <img src="/logo.png" alt="Logo" className={styles.logoImage} />
            AirdropID Foundation
          </Link>
        </div>
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/airdrops" className={styles.navLink}>
            Airdrops
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/promote" className={styles.navLink}>
            Collab Promotions
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
        </nav>
        <button className={styles.hamburger} onClick={toggleMenu} aria-expanded={isOpen}>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>
    </header>
  );
}