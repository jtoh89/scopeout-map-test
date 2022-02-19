import styles from "./HorizontalContentSection.module.css";
import Image from "next/image";

const HorizontalContentSection = ({ header, description, imagesrc, overrideHeight, showimageright }) => {
  if (showimageright) {
    return (
      <div className={styles.outerContainer} style={{ minHeight: overrideHeight }}>
        <div className={styles.innerContainer}>
          <div className={styles.contentTextContainer}>
            <div className={styles.contentText}>
              <h1>{header}</h1>
              <p>{description}</p>
            </div>
          </div>
          <div className={styles.contentImgContainer}>
            <Image placeholder="blur" src={imagesrc} layout="fill" objectFit="scale-down" alt="" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.outerContainer} style={{ minHeight: overrideHeight }}>
      <div className={styles.innerContainer}>
        <div className={styles.contentImgContainer}>
          <Image placeholder="blur" src={imagesrc} layout="fill" objectFit="scale-down" alt="" />
        </div>
        <div className={styles.contentTextContainer}>
          <div className={styles.contentText}>
            <h1>{header}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalContentSection;
