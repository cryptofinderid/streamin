import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiSearch, FiSun, FiMoon, FiHome, FiExternalLink } from 'react-icons/fi';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setSearchOpen(false);
      setMenuOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <div>Streamin</div>
          <div className={styles.subtitle}>Oleh Fuad Hasyim</div>
        </div>

        {/* Desktop: Search + Nav grouped on right */}
        {!isMobile && (
          <div className={styles.rightGroup}>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <input
                type="search"
                ref={inputRef}
                placeholder="Cari anime..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                aria-label="Search anime"
              />
            </form>
            <nav className={styles.nav}>
              <Link href="/"
                className={styles.navIcon}><FiHome /></Link>
              <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
                {theme === 'light' ? <FiMoon /> : <FiSun />}
              </button>
            </nav>
          </div>
        )}

        {/* Mobile controls */}
        {isMobile && (
          <div className={styles.controls}>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Toggle theme"
              type="button"
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={styles.searchToggle}
              aria-label="Toggle search"
              type="button"
            >
              <FiSearch />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={styles.menuToggle}
              aria-label="Toggle menu"
              type="button"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Search Form */}
      {isMobile && searchOpen && (
        <form onSubmit={handleSearchSubmit} className={styles.mobileSearchForm}>
          <input
            type="search"
            ref={inputRef}
            placeholder="Cari anime..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.mobileSearchInput}
            autoFocus
            aria-label="Search anime"
          />
        </form>
      )}

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <nav className={`${styles.nav} ${styles.mobileNav}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </nav>
      )}
    </header>
  );
}
