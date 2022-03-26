import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import styles from "./MapView.module.css";
import * as geojsondata from "./test_zip.json";

const MapView = ({ mapprofile, polygonData }) => {
  // console.log("Render MapView. polygonData: ");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "50vh",
    margin: "auto",
  };

  const polgyonColor = "#FF7700";

  const [displayZipcode, setDisplayZipcode] = useState(12345);

  const handleClick = (zipcode) => {
    console.log("onClick zipcode: ", zipcode);
    setDisplayZipcode(zipcode);
  };

  const [defaultCoordinates, setCoordinates] = useState({
    lat: 33.9363687,
    lng: -117.9371885,
  });

  const handleLoad = (e) => {
    console.log("handleLoad: ", e.center);
    console.log("e: ", e);

    // e.data.addGeoJson(geojsondata);

    setCoordinates({
      lat: e.center.lat(),
      lng: e.center.lng(),
    });
  };

  return (
    <div className={styles.dashboardContainer}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCoordinates}
        yesIWantToUseGoogleMapApiInternals
        zoom={10}
        onLoad={handleLoad}
      >
        {polygonData.map((polygon, i) => {
          const handleMouseOver = (polygonOptions, setPolygonOptions) => {
            setPolygonOptions({ ...polygonOptions, fillColor: "#FFFF00" });
          };

          const handleMouseOut = (polygonOptions, setPolygonOptions) => {
            setPolygonOptions({ ...polygonOptions, fillColor: polgyonColor });
          };

          if (polygon.zipcode === 92683) {
            console.log("polygon.geometry.length: ", polygon.geometry.length);
          }

          return (
            <React.Fragment key={i}>
              {polygon.geometry.map((polysubgeo, i2) => {
                return (
                  <Polygon
                    key={i2}
                    onMouseOver={() =>
                      handleMouseOver(polygon.polygonOptions, polygon.setPolygonOptions)
                    }
                    onMouseOut={() =>
                      handleMouseOut(polygon.polygonOptions, polygon.setPolygonOptions)
                    }
                    path={polysubgeo}
                    options={polygon.polygonOptions}
                    onClick={() => {
                      handleClick(polygon.zipcode);
                    }}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </GoogleMap>
      <div className={styles.infoSection}>Zipcode: {displayZipcode}</div>
    </div>
  );
};

export default MapView;
