import { useState, createContext } from "react";
// import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer";

export const neighborhoodContext = createContext();

const NeighborhoodContextProvider = (props) => {
  const [neighborhoodView, setNeighborhoodView] = useState("Overview");

  return (
    <neighborhoodContext.Provider
      value={{
        neighborhoodView,
        setNeighborhoodView,
      }}
    >
      {props.children}
    </neighborhoodContext.Provider>
  );
};

export default NeighborhoodContextProvider;
