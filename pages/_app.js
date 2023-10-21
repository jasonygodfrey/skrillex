import '../styles/globals.css';

// This is the custom App component that wraps your pages
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp