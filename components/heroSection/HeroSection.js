import React from "react";
import styles from "./HeroSection.module.css";
import GoogleSearchBar from "../googleSearchBar/GoogleSearchBar";
import heroImage from "../../public/images/hero-image.jpg";
import Image from "next/image";

const HeroSection = ({ noSearchResults }) => {
  return (
    <div className={styles.heroContainer}>
      <Image
        priority
        placeholder="blur"
        className={styles.heroImage}
        src={heroImage}
        alt="Single family neighborhood"
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.heroText}>
        <h1>Before you invest,</h1>
        <h1>Scope out the neighborhood.</h1>
      </div>

      <div className={styles.heroSearch}>
        <GoogleSearchBar noSearchResults={noSearchResults} />
      </div>
    </div>
  );
};

export default HeroSection;
