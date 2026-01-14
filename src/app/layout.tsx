import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import StyledComponentsRegistry from "../lib/registry";
import { ThemeProvider } from "@/lib/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";
// import { GoogleTagManager } from '@next/third-parties/google';
// import { GoogleAnalytics } from '@next/third-parties/google';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Explore EcoLink Ceiling Fans | energy-efficient BLDC Fans | Decorative Fans ",
  },
  description:
    "EcoLink offers wide range of energy efficient BLDC ceiling fans designed for performance & style. Explore premium fans with modern design & powerful airflow.",
  
  authors: [{ name: "Signify Innovations" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fans.ecolinklighting.in/",
    siteName: "EcoLink",
    title: "Explore EcoLink Ceiling Fans | energy-efficient BLDC Fans | Decorative Fans",
    description:
      "EcoLink offers wide range of energy efficient BLDC ceiling fans designed for performance & style. Explore premium fans with modern design & powerful airflow.",
    images: [
      {
        url: "/home/sliders/desktop/01.png",
        width: 1200,
        height: 630,
        alt: "EcoLink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore EcoLink Ceiling Fans | energy-efficient BLDC Fans | Decorative Fans",
    description:
      "EcoLink offers wide range of energy efficient BLDC ceiling fans designed for performance & style. Explore premium fans with modern design & powerful airflow.",
    images: ["/home/sliders/desktop/01.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/faviconn.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <meta name="google-site-verification" content="BWa3OMaHceLvtv-ioEACqZkqTI-0AkX9j6x6TxquzK8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  const root = document.documentElement;
                  
                  if (theme === 'system') {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    root.classList.add(systemTheme);
                  } else {
                    root.classList.add(theme);
                  }
                } catch (error) {
                  // Default to dark theme if localStorage is not available
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Facebook Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s) {
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '316453551413128');
                fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=316453551413128&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Tag Manager scripts moved to next/script components */}
      </head>
      <body className="antialiased">
        <ScrollToTop />
        <StyledComponentsRegistry>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
          </ThemeProvider>
        </StyledComponentsRegistry>
        
        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10956281123"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10956281123');
            gtag('event', 'conversion', {'send_to': 'AW-10956281123/ug4zCKbnj7UZEKOqrugo'});
          `}
        </Script>

        {/* Google Ads Tag (AW-17871754184) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17871754184"
          strategy="afterInteractive"
        />
        <Script id="google-ads-new" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17871754184');
          `}
        </Script>
        
        {/* Google Analytics G-GXSYMY0S6X */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GXSYMY0S6X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GXSYMY0S6X');
          `}
        </Script>

        {/* Next.js official Google integrations */}
        {/* <GoogleTagManager gtmId="GTM-XXXXXXX" />
        <GoogleAnalytics gaId="G-XXXXXXXXXX" /> */}
      </body>
    </html>
  );
}
