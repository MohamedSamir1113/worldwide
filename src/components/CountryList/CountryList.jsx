import Spinner from "../Spinner/Spinner";
import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";
import { useCities } from "../../Contexts/CitiesContext";
function CountryList() {
  const {isLoading,cities}=useCities();
  if (isLoading) return <Spinner />;
  const countries = cities.reduce((currArray, city) => {
    if (!currArray.map((el) => el.country).includes(city.country)) {
        return [...currArray, { emoji: city.emoji, country: city.country }];
    } else {
        return currArray;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;

