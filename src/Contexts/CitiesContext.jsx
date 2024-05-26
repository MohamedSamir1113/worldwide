import { createContext, useEffect, useContext, useReducer, useCallback } from "react";

const CitiesContext = createContext();
const intitialState = { cities: [], isLoading: false, currentCity: {} };

function reducer(currState, action) {
  switch (action.type) {
    case "setCities":
      return { ...currState, cities: action.payload };
    case "setIsLoading":
      return { ...currState, isLoading: action.payload };
    case "setCurrentCity":
      return { ...currState, currentCity: action.payload };

    default:
      throw new Error("error dispatching");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    intitialState
  );

  useEffect(function () {
    async function getCities() {
      try {
        dispatch({ type: "setIsLoading", payload: true });
        let response = await fetch("http://localhost:9001/cities");
        let data = await response.json();

        dispatch({ type: "setCities", payload: data });
        console.log(data);
      } catch {
        console.log("error");
      } finally {
        dispatch({ type: "setIsLoading", payload: false });
      }
    }
    getCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    try {
      dispatch({ type: "setIsLoading", payload: true });
      let response = await fetch(`http://localhost:9001/cities/${id}`);
      let data = await response.json();
      dispatch({ type: "setCurrentCity", payload: data });
    } catch {
      console.log("error");
    } finally {
      dispatch({ type: "setIsLoading", payload: false });
    }
  },[])
  async function createCity(newCity) {
    try {
      dispatch({ type: "setIsLoading", payload: true });
      let response = await fetch(`http://localhost:9001/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
   
      
      dispatch({ type: "setCities", payload: [...cities, data] });
    } catch {
      console.log("error");
    } finally {
      dispatch({ type: "setIsLoading", payload: false });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "setIsLoading", payload: true });
      await fetch(`http://localhost:9001/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: "setCities",
        payload: cities.filter((city) => city.id !== id),
      });
    } catch {
      console.log("error");
    } finally {
      dispatch({ type: "setIsLoading", payload: false });
    }
  }

  return (
    <>
      <CitiesContext.Provider
        value={{
          cities,
          isLoading,
          currentCity,
          getCity,
          createCity,
          deleteCity,
        }}
      >
        {children}
      </CitiesContext.Provider>
    </>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("context out of provider");
  return context;
}

export { CitiesProvider, useCities };
