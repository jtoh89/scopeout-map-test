import Head from "next/head";
import MapView from "../../components/maps/MapView";
import MapBoxMap from "../../components/maps/MapBoxMap";
import { connectToMarketMapsDatabase } from "../../lib/mongoclient";
import { initializePolygons } from "./sampleCoordinates";

export default function MarketMap({ mapprofile }) {
  console.log("Rendering MarketMap", mapprofile);

  const polygonData = initializePolygons(mapprofile.zipprofiles);

  // console.log("polygonData: ", polygonData);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <h1>Market Map</h1>
      <MapBoxMap mapprofile={mapprofile} polygonData={polygonData} />
      {/* <MapView mapprofile={mapprofile} polygonData={polygonData} /> */}
    </div>
  );
}

export async function getStaticPaths() {
  const { db } = await connectToMarketMapsDatabase();

  let fullmarketlist = [];

  let marketlist = await db
    .collection("MarketMapsTest")
    .find({})
    .project({
      urlslug: 1,
      _id: 0,
    })
    .toArray();

  marketlist.forEach((market) => fullmarketlist.push({ params: { marketname: market.urlslug } }));

  return {
    fallback: true,
    paths: fullmarketlist,
  };
}

export async function getStaticProps(context) {
  const { marketname } = context.params;

  const { db } = await connectToMarketMapsDatabase();

  let mapprofile = await db.collection("MarketMapsTest").findOne({ urlslug: marketname });
  delete mapprofile["_id"];

  return {
    props: {
      mapprofile: mapprofile,
    },
  };
}
