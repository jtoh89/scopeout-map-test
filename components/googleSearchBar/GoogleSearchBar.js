import React, { useState } from "react";
import styles from "./GoogleSearchBar.module.css";
import axios from "axios";
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete";
import { useRouter } from "next/router";
import axiosRetry from "axios-retry";
import { Spinner } from "reactstrap";

const GoogleSearch = ({ noSearchResults }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  let showErrorFlag = false;

  if (noSearchResults) {
    showErrorFlag = true;
  }

  const [addressSearchState, setAddressSearchState] = useState({
    address: "",
    searchButtonEnabled: true,
    searchResultError: showErrorFlag,
    searchErrorMsg: "Could not find any results for the address submitted.",
  });

  const handleAddressSearch = async () => {
    setLoading(true);
    setAddressSearchState({
      ...addressSearchState,
      searchButtonEnabled: false,
    });
    const geocodedInfo = await geocodeAddressGoogle(addressSearchState.address);
    console.log("Google geocodedInfo result: ", geocodedInfo);

    if (geocodedInfo == null || geocodedInfo.status === "error") {
      setLoading(false);
      setAddressSearchState({
        ...addressSearchState,
        searchResultError: true,
        searchButtonEnabled: true,
      });
    } else {
      const geocodeLatLngResults = await getFCCGeocoder({
        lat_y: geocodedInfo.lat_y,
        lon_x: geocodedInfo.lon_x,
      });

      if (geocodeLatLngResults.status == 400) {
        console.log("getFCCGeocoder returned error. Status: 0, ", geocodeLatLngResults.status);
        setLoading(false);
        setAddressSearchState({
          searchResultError: true,
          searchButtonEnabled: true,
          searchErrorMsg: "Something went wrong with the search, please try again. If issue persists, please reach out to support@scopeout.io",
        });
      } else if (geocodeLatLngResults.status !== 200) {
        console.log("getFCCGeocoder returned error. Status: 0, ", geocodeLatLngResults.status);
        setLoading(false);
        setAddressSearchState({
          searchResultError: true,
          searchButtonEnabled: true,
          searchErrorMsg: "Something went wrong with the search, please try again. If issue persists, please reach out to support@scopeout.io",
        });
      } else {
        console.log("FCC Geocode success");

        const tractid = geocodeLatLngResults.tractid.substring(0, 11);
        const countyfullcode = tractid.substring(0, 5);

        setAddressSearchState({
          ...addressSearchState,
          searchResultError: false,
          searchButtonEnabled: true,
        });

        router.push(
          `/neighborhood?nptractid=${tractid}&npcountyid=${countyfullcode}&searchaddress=${addressSearchState.address}&lat_y=${geocodedInfo.lat_y}&lon_x=${geocodedInfo.lon_x}`,
          undefined,
          {
            shallow: true,
          }
        );
      }
    }
  };

  const getFCCGeocoder = async ({ lat_y, lon_x }) => {
    axiosRetry(axios, { retries: 5 });
    const GEOCODE_URL = `https://geo.fcc.gov/api/census/area?lat=${lat_y}&lon=${lon_x}&format=json`;

    // console.log("Sending FCC Geocode call: ", GEOCODE_URL);

    return await axios
      .get(GEOCODE_URL)
      .then((response) => {
        if (response.data.results[0].block_fips === undefined) {
          throw Error("Could not find tract id");
        }
        return {
          status: response.status,
          tractid: response.data.results[0].block_fips,
        };
      })
      .catch((error) => {
        console.log("axios error: ", error);

        return {
          status: 400,
          tractid: null,
        };
      });
  };

  const handleAddressChange = (address) => {
    setAddressSearchState({
      ...addressSearchState,
      address: address,
      searchResultError: false,
    });
  };

  const handleSelect = async (address) => {
    setAddressSearchState({
      ...addressSearchState,
      address: address,
      searchResultError: false,
    });
  };

  const geocodeAddressGoogle = async (address) => {
    return await geocodeByAddress(address)
      .then((results) => {
        if (!["street_address", "premise", "route"].includes(results[0].types[0])) {
          console.log("Google geo area not included: ", results[0].types[0]);
          return { status: "error" };
        }

        console.log("Google geocode results: ", results[0].address_components);

        let postalcode;
        for (var i = results[0].address_components.length - 1; i >= 0; i--) {
          if (results[0].address_components[i].types[0] === "postal_code") {
            postalcode = results[0].address_components[i].short_name;
            break;
          }
        }

        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        return {
          status: "ok",
          lat_y: lat,
          lon_x: lng,
          postalcode: postalcode,
          fulladdress: results[0].formatted_address,
        };
      })
      .catch((error) => console.log("Error", error));
  };

  const searchOptions = {
    componentRestrictions: { country: "us" },
    types: ["address"],
  };

  return (
    <>
      <div className={styles.searchForm}>
        <PlacesAutocomplete value={addressSearchState.address} onChange={handleAddressChange} onSelect={handleSelect} searchOptions={searchOptions}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Enter an address ...",
                  className: `${styles.locationSearchInput}`,
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, i) => {
                  const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#dbdbdb", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={i}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <button className={styles.searchButton} onClick={handleAddressSearch} disabled={!addressSearchState.searchButtonEnabled}>
          {/* Submit */}
          {loading ? <Spinner type="border" color="secondary" /> : <>Submit</>}
        </button>
      </div>
      {addressSearchState.searchResultError ? (
        <div className={styles.addressError}>
          <p>{addressSearchState.searchErrorMsg}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default GoogleSearch;
