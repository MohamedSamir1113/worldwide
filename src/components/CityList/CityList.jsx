import City from "../City/City";
import CityItem from "../CityItem/CityItem";
import Spinner from "../Spinner/Spinner";
import styles from "./CityList.module.css";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city, i) => <CityItem city={city} key={i}/>)}
    </ul>
  );
}

export default CityList;
