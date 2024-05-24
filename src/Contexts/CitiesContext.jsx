import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        let response = await fetch("http://localhost:9001/cities");
        let data = await response.json();
        setCities(data);
        console.log(data);
      } catch {
        console.log("error");
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      let response = await fetch(`http://localhost:9001/cities/${id}`);
      let data = await response.json();
      setCurrentCity(data);
    } catch {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <CitiesContext.Provider value={{ cities, isLoading ,currentCity,getCity}}>
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
