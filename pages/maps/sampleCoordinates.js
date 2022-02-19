import { useState } from "react";

export const initializePolygons = (sampleCoordinatesList) => {
  var polygonArray = new Array();

  sampleCoordinatesList.forEach((polygonObject, i) => {
    // console.log("generate geometry: ", polygonObject.geometry);

    const [polygonOptions, setPolygonOptions] = useState({
      fillColor: "#FF7700",
      fillOpacity: 0.5,
      strokeColor: "#FF7700",
      strokeOpacity: 1,
      strokeWeight: 0,
      draggable: false,
      geodesic: false,
      zIndex: 1,
    });

    polygonArray[i] = {
      zipcode: polygonObject.zipcode,
      geometry: polygonObject.geometry,
      setPolygonOptions: setPolygonOptions,
      polygonOptions: polygonOptions,
    };
  });

  return polygonArray;
};
