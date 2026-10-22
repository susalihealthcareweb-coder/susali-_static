
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollReset from '@/components/ScrollReset';

import { LanguageProvider } from '@/context/LanguageContext';

// Business information
import { site } from '@/data/site';

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
// WEBSITE SEO METADATA
// =========================================================

export const metadata = {
  metadataBase: new URL(site.url),

  applicationName: site.companyName,

  title: {
    default: site.seoTitle,
    template: '%s | SUSALI Healthcare Services',
  },

  description: site.seoDescription,

  keywords: [
    'SUSALI',
    'SUSALI Healthcare',
    'SUSALI Healthcare Services',
    'SUSALI Health Care Services',
    'patient healthcare coordination',
    'hospital appointment assistance',
    'patient doctor connection',
    'healthcare referrals',
    'digital health profiles',
    'digital medical records',
    'hospital coordination',
    'continued healthcare',
  ],

  authors: [
    {
      name: site.companyName,
    },
  ],

  creator: site.companyName,
  publisher: site.companyName,

  category: 'healthcare',

  // ==========================================
  // SEARCH ENGINE CRAWLING
  // ==========================================

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // ==========================================
  // OPEN GRAPH
  // ==========================================

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: site.companyName,
    title: site.seoTitle,
    description: site.seoDescription,
  },

  // ==========================================
  // SOCIAL SHARING
  // ==========================================

  twitter: {
    card: 'summary',
    title: site.seoTitle,
    description: site.seoDescription,
  },
};

// =========================================================
// ORGANIZATION STRUCTURED DATA
// =========================================================

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',

  name: site.companyName,
  legalName: site.legalName,

  url: site.url,
  logo: `${site.url}/logo.png`,

  email: site.email,

  description: site.seoDescription,
};

// =========================================================
// ROOT LAYOUT
// =========================================================

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {/* ========================================
            ORGANIZATION STRUCTURED DATA
           ======================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationSchema
            ).replace(/</g, '\\u003c'),
          }}
        />

        {/* ========================================
            WEBSITE LAYOUT
           ======================================== */}

        <LanguageProvider>
          {/* Reset scroll after navigation */}
          <ScrollReset />

          {/* Optional scroll progress */}
          {/* <ScrollProgress /> */}

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main>{children}</main>

          {/* Footer */}
          <Footer />
        </LanguageProvider>

        {/* ========================================
            GOOGLE ANALYTICS 4
           ======================================== */}

        <GoogleAnalytics
          gaId={GOOGLE_ANALYTICS_ID}
        />

        {/* ========================================
            MICROSOFT CLARITY
           ======================================== */}

        <Script
          id="microsoft-clarity-script"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){
                (c[a].q=c[a].q||[]).push(arguments);
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
