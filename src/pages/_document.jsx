import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="icon" href="/gcs-logo-blacknwhite.png" />
        <link rel="apple-touch-icon" href="/gcs-logo-blacknwhite.png" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" 
              integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" 
              crossOrigin="" />
        <meta name="description" content="Geolink Consulting and Services (GCS) - Solutions géomatiques en Haïti" />
        <meta name="theme-color" content="#1A365D" />
        
        {/* Simple background approach */}
        <link rel="stylesheet" href="/background.css" />
        <link rel="stylesheet" href="/contrast-improvements.css" />
        <link rel="stylesheet" href="/footer-styles.css" />
        <link rel="stylesheet" href="/text-visibility.css" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
