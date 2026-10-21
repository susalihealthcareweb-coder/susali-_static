
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollReset from '@/components/ScrollReset';

import { LanguageProvider } from '@/context/LanguageContext';

// Google Analytics 4
import { GoogleAnalytics } from '@next/third-parties/google';

// Microsoft Clarity
import Script from 'next/script';

import './globals.css';

// =========================================================
// GOOGLE ANALYTICS 4
// =========================================================

const GOOGLE_ANALYTICS_ID = 'G-62J2X7S21T';

// =========================================================
// MICROSOFT CLARITY
// =========================================================

const MICROSOFT_CLARITY_ID = 'z1b28tv5sa';

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
          {/* Scroll reset */}
          <ScrollReset />

          {/* Optional scroll progress */}
          {/* <ScrollProgress /> */}

          {/* Website Header */}
          <Header />

          {/* Main Content */}
          <main>{children}</main>

          {/* Website Footer */}
          <Footer />
        </LanguageProvider>

        {/* ==========================================
            GOOGLE ANALYTICS 4
           ========================================== */}

        <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />

        {/* ==========================================
            MICROSOFT CLARITY
           ========================================== */}

        <Script
          id="microsoft-clarity-script"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){
                    (c[a].q=c[a].q||[]).push(arguments)
                };
                t=l.createElement(r);
                t.async=1;
                t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${MICROSOFT_CLARITY_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}
