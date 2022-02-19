import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import styles from "./MapView.module.css";
import { initializePolygonsMultiple, createCoordinates, sampleCoordinates2 } from "./testCoordinates";

const MapView = ({ mapprofile, polygonData }) => {
  // console.log("Render MapView. polygonData: ");

  const sampleCoordinatesTest = createCoordinates();
  // console.log("sampleCoordinates: ", sampleCoordinates);
  // console.log("sampleCoordinates2: ", sampleCoordinates2);

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
    setCoordinates({
      lat: e.center.lat(),
      lng: e.center.lng(),
    });
  };

  // const handleMouseOver = (polygonOptions, setPolygonOptions) => {
  //   setPolygonOptions({ ...polygonOptions, fillColor: "#FFFF00" });
  // };

  // const handleMouseOut = (polygonOptions, setPolygonOptions) => {
  //   setPolygonOptions({ ...polygonOptions, fillColor: polgyonColor });
  // };

  const polygonDataMultiple = initializePolygonsMultiple(mapprofile.zipprofiles);

  return (
    <div className={styles.dashboardContainer}>
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCoordinates} yesIWantToUseGoogleMapApiInternals zoom={10} onLoad={handleLoad}>
        {/* {polygonData.map((polygon, i) => (
          <Polygon
            key={i}
            onMouseOver={() => handleMouseOver(polygon.polygonOptions, polygon.setPolygonOptions)}
            onMouseOut={() => handleMouseOut(polygon.polygonOptions, polygon.setPolygonOptions)}
            path={polygon.geometry[0]}
            options={polygon.polygonOptions}
            onClick={() => {
              handleClick(polygon.zipcode);
            }}
          />
        ))} */}

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
                    onMouseOver={() => handleMouseOver(polygon.polygonOptions, polygon.setPolygonOptions)}
                    onMouseOut={() => handleMouseOut(polygon.polygonOptions, polygon.setPolygonOptions)}
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

        {/* <Polygon
          key={0}
          path={sampleCoordinatesTest}
          options={{
            fillColor: "#0033EF",
            fillOpacity: 0.2,
            strokeColor: "#0033EF",
            strokeOpacity: 1,
            strokeWeight: 0,
            draggable: false,
            geodesic: false,
            zIndex: 1,
          }}
        /> */}
      </GoogleMap>
      <div className={styles.infoSection}>Zipcode: {displayZipcode}</div>
    </div>
  );
};

export default MapView;
