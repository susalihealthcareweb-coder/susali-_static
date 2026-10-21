
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollReset from '@/components/ScrollReset';

import { LanguageProvider } from '@/context/LanguageContext';

// Google Analytics 4
import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';

// =========================================================
// GOOGLE ANALYTICS 4
// =========================================================

const GOOGLE_ANALYTICS_ID = 'G-62J2X7S21T';

// =========================================================
// WEBSITE METADATA
// =========================================================

export const metadata = {
  title: {
    default: 'SUSALI | Healthcare, Better Connected',
    template: '%s | SUSALI',
  },

  description:
    'SUSALI — Better Affiliations. Better Healthcare.',

  robots: {
    index: true,
    follow: true,
  },
};

// =========================================================
// ROOT LAYOUT
// =========================================================

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <LanguageProvider>
          {/* Reset scroll position on route changes */}
          <ScrollReset />

          {/* Optional scroll progress indicator */}
          {/* <ScrollProgress /> */}

          {/* Website Header */}
          <Header />

          {/* Main Page Content */}
          <main>{children}</main>

          {/* Website Footer */}
          <Footer />
        </LanguageProvider>

        {/* =================================================
            GOOGLE ANALYTICS 4
            Measurement ID: G-62J2X7S21T
           ================================================= */}
        <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
      </body>
    </html>
  );
}
