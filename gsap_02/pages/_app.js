import { useState, useEffect } from 'react';
import Header from '../components/Header';
import PageTransitions from '../components/PageTransitions';
import GlobalStyle from '../styles/global-style';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }) => {
  const [routingPageOffset, setRoutingPageOffset] = useState(0);
  const router = useRouter();
  // ページのスクロール位置を取得
  useEffect(() => {
    const pageChange = () => {
      setRoutingPageOffset(window.scrollY);
    };
    router.events.on('routeChangeStart', pageChange);
  }, [router.events]); //routerイベントでpageChangeが発火

  return (
    <>
      <Header />
      <PageTransitions route={router.asPath} routingPageOffset={routingPageOffset}>
        <Component {...pageProps} />
      </PageTransitions>
      <GlobalStyle />
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
            Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export default MyApp;
