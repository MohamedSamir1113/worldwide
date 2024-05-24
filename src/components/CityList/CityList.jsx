import { useCities } from "../../Contexts/CitiesContext";
import City from "../City/City";
import CityItem from "../CityItem/CityItem";
import Spinner from "../Spinner/Spinner";
import styles from "./CityList.module.css";

function CityList() {
  const {isLoading,cities}=useCities()
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city, i) => <CityItem city={city} key={i}/>)}
    </ul>
  );
}

export default CityList;
