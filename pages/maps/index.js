import Head from "next/head";
import MapList from "../../components/maps/MapList";

export default function Maps({ marketlist }) {
  return (
    <div>
      <Head>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <MapList marketlist={marketlist} />
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      marketlist: [{ id: "test", marketname: "Phoenix" }],
    },
  };
}