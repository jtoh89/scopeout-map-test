import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    // const googleMapApi = process.env.GOOGLEMAPAPIKEY;

    return (
      <Html>
        <Head>
          <link rel="icon" href="/images/scopeout-favicon.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
