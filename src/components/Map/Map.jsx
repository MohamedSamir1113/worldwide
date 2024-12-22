import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { memo, useEffect, useState } from "react";
import { useCities } from "../../Contexts/CitiesContext";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import Button from "../Button/Button";
import { useURLPosition } from "../../hooks/useURLPositon";
function Map() {
  const [mapLat,mapLng]=useURLPosition();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  
  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: geoPosition,
  } = useGeoLocation();

  const { cities } = useCities();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
    },
    [geoPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoPosition&&<Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "loading..." : "use your position"}
      </Button>}
      <MapContainer
        center={mapPosition}
        className={styles.map}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;

const ChangeCenter=memo( function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
})

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
