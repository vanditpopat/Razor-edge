import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/styles/theme/themes/mytheme/theme.scss';
import '@/styles/styles.css';
import GoogleAnalytics from '@/component/GoogleAnalytics';
import CookieBanner from '@/component/CookieBanner';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <PrimeReactProvider>
      <Head>
        <title>Razor Edge</title>
        <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" 
            rel="stylesheet" 
          />
        <meta charset="UTF-8"></meta>
        <meta name="description" content="This a Salon marketing website"></meta>
        <meta name="keywords" content="Salon, salon haircut, bodycare, salon, barber website, skin care"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <GoogleAnalytics GA_MEASUREMENT_ID='G-KP0KHV37L5'/>
      <Component {...pageProps} />
      <CookieBanner/>
    </PrimeReactProvider>
  )
}