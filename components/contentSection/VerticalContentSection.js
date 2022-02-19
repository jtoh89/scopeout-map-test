import styles from "./VerticalContentSection.module.css";
import Image from "next/image";

const VerticalContentSection = ({ header, description, imagesrc, overrideHeight }) => {
  return (
    <>
      <div className={styles.verticalOuterContainer} style={{ minHeight: overrideHeight }}>
        <div className={styles.verticalInnerContainer}>
          <div className={styles.contentTextContainer}>
            <div className={styles.contentText}>
              <h1>{header}</h1>
              <p>{description}</p>
            </div>
          </div>
          <div className={styles.contentImgOuterContainer}>
            <div className={styles.contentImgContainer}>
              <Image placeholder="blur" className={styles.contentSectionImage2} src={imagesrc} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalContentSection;
