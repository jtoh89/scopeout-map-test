import React, { useEffect, useRef, useState } from "react";
import styles from "./MapBoxMap.module.css";
import geojsondata from "./test_zip2.json";
import mapboxgl from "mapbox-gl";

const zipMapId = "zipmapid";
const zipMapHighlight = "zipMapHighlight";
const zipMapSource = "zipmapsource";

const MapBoxMap = ({ mapprofile, polygonData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mapboxkey = process.env.MAPBOXKEY;
  mapboxgl.accessToken = mapboxkey;
  const mapContainer = useRef(null);
  const [long, setLong] = useState(-117.9371885);
  const [lat, setLat] = useState(33.9363687);
  const [zoom, setZoom] = useState(9);
  const [hoveredDistrict, _setHoveredDistrict] = useState(null);
  const hoveredDistrictRef = useRef(hoveredDistrict);

  const setHoveredDistrict = (data) => {
    hoveredDistrictRef.current = data;
    _setHoveredDistrict(data);
  };

  useEffect(() => {
    let map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [long, lat],
      zoom: zoom,
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    map.once("load", function () {
      map.addSource(zipMapSource, {
        type: "geojson",
        data: geojsondata,
      });

      map.addLayer(
        {
          id: zipMapId,
          type: "fill",
          source: zipMapSource,
          layout: {},
          paint: {
            "fill-color": [
              "match",
              ["get", "ZIP_CODE"],
              "90001",
              "#5AA5D7",
              "90002",
              "#02735E",
              "90003",
              "#00E0EF",
              "90040",
              "#84D0D9",
              "90043",
              "#202359",
              "90746",
              "#CE7529",
              "90806",
              "#00AE6C",
              "92683",
              "#0056A3",
              "92705",
              "#0056A3",
              /* other */ "#ffffff",
            ],
            "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.8, 0.5],
            //   "fill-outline-color": ["case", ["boolean", ["feature-state", "click"], false], "#eb3434"],
          },
        },
        "settlement-label"
      );

      map.on("click", zipMapId, function (e) {
        if (e.features.length > 0) {
          if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
            map.setFeatureState(
              { source: zipMapSource, id: hoveredDistrictRef.current },
              { hover: false }
            );
          }

          let _hoveredDistrict = e.features[0].id;

          console.log("What is _hoveredDistrict: ", _hoveredDistrict);

          const bbox = [
            [e.point.x - 1, e.point.y - 1],
            [e.point.x + 1, e.point.y + 1],
          ];
          const selectedFeatures = map.queryRenderedFeatures(bbox, {
            layers: [zipMapId],
          });
          const zipcode = selectedFeatures.map((feature) => feature.properties.ZIP_CODE);

          console.log("Selected zipcode: ", zipcode);
          map.setFilter(zipMapHighlight, ["in", "ZIP_CODE", ...zipcode]);

          //   map.setFeatureState({ source: zipMapSource, id: _hoveredDistrict }, { hover: true });
          map.setFeatureState({ source: zipMapSource, id: _hoveredDistrict }, { click: true });

          setHoveredDistrict(_hoveredDistrict);
        }
      });

      map.addLayer(
        {
          id: zipMapHighlight,
          type: "fill",
          source: zipMapSource,
          paint: {
            "fill-outline-color": "#f5f242",
            "fill-color": "#f5f242",
            "fill-opacity": 1,
          },
          filter: ["in", "ZIP_CODE", ""],
        },
        "settlement-label"
      );

      map.on("mousemove", zipMapId, function (e) {
        map.getCanvas().style.cursor = "pointer";
        if (e.features.length > 0) {
          if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
            map.setFeatureState(
              { source: zipMapSource, id: hoveredDistrictRef.current },
              { hover: false }
            );
          }

          let _hoveredDistrict = e.features[0].id;

          console.log("What is _hoveredDistrict: ", _hoveredDistrict);

          map.setFeatureState({ source: zipMapSource, id: _hoveredDistrict }, { hover: true });

          setHoveredDistrict(_hoveredDistrict);
        }
      });

      map.on("mouseleave", zipMapId, function () {
        if (hoveredDistrictRef.current) {
          map.setFeatureState(
            { source: zipMapSource, id: hoveredDistrictRef.current },
            { hover: false }
          );
        }
        setHoveredDistrict(null);
      });
    });
  }, []);

  return (
    <div className="district-map-wrapper">
      <div className={styles.info}>
        Current hovered district: <strong>{hoveredDistrict ? hoveredDistrict : ""}</strong>
      </div>
      <div id="districtDetailMap" className={styles.map}>
        <div style={{ height: "100%" }} ref={mapContainer}></div>
      </div>
    </div>
  );
};

export default MapBoxMap;
