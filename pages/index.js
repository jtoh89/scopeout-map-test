import Head from "next/head";
import HeroSection from "../components/heroSection/HeroSection";
import HorizontalContentSection from "../components/contentSection/HorizontalContentSection";
import VerticalContentSection from "../components/contentSection/VerticalContentSection";
import imagesrc from "../public/images/home-page-2.png";
import imagesrc2 from "../public/images/product-img-1.png";
import { useRouter } from "next/router";

export default function Home() {
  const header = "Better information, better decisions";
  const description = "Get data-driven insights on property neighborhoods. Save time by getting all the information you need in one click.";

  const header2 = "Analyze a neighborhood, in seconds";
  const description2 = "Get the facts about the demographics, economy, and housing market of a neighborhood.";

  const Router = useRouter();
  const { noSearchResults } = Router.query;

  return (
    <div>
      <Head>
        <title>ScopeOut</title>
        <meta name="description" content="Demographic, housing, real estate data for neighborhoods in the United States." />
      </Head>
      <HeroSection noSearchResults={noSearchResults} />
      <HorizontalContentSection header={header} description={description} imagesrc={imagesrc} showimageright={true} />
      <VerticalContentSection header={header2} description={description2} imagesrc={imagesrc2} />
    </div>
  );
}
