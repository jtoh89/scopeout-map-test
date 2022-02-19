import styles from "./MapList.module.css";
import Link from "next/link";

const MapList = ({ marketlist }) => {
  console.log("marketlist: ", marketlist);

  return (
    <div className={styles.marketListContainer}>
      <h1>Real Estate Market Trends</h1>
      <ul className={styles.marketList}>
        {marketlist.map((market) => (
          <li key={market.id} className={styles.marketListLink}>
            <Link passHref href={`/maps/${market.id}`}>
              <h2 className={styles.marketListLink}>{market.marketname}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapList;
