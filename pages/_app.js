// pages/_app.js
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="appLayout">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
