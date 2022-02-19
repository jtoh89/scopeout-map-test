import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/layout/navbar/NavBar";
import Footer from "../components/layout/footer/Footer";
import NeighborhoodContextProvider from "../context/NeighborhoodContext";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const googleMapApi = process.env.GOOGLEMAPAPIKEY;
  const source = `https://maps.googleapis.com/maps/api/js?key=${googleMapApi}&libraries=places`;
  return (
    <NeighborhoodContextProvider>
      <NavBar />
      <Script type="text/javascript" src={source} strategy="beforeInteractive" />
      <Component {...pageProps} />
      <Footer />
    </NeighborhoodContextProvider>
  );
}

export default MyApp;
