import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParams, setSerachParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
const navigate =useNavigate()
  return (
    <div className={styles.mapContainer} onClick={()=>{navigate("form")}}>
      <div className={styles.map}>
        <h1>Map</h1>
        <h1>position: {lat} {lng}</h1>
      </div>
    </div>
  );
}

export default Map;
