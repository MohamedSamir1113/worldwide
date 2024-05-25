// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useURLPosition } from "../../hooks/useURLPositon";
import { useCities } from "../../Contexts/CitiesContext";
import Message from "../Message/Message"
import { type } from "@testing-library/user-event/dist/type";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const intitialState = {
  isGeoLoading: false,
  cityName: "",
  country: "",
  date: formatDate(new Date()),
  notes: "",
  emoji: "",
  geoCodingError: "",
};

function reducer(currState, action) {
  switch (action.type) {
    case "setCityName":
      return { ...currState, cityName: action.payload };
    case "setIsGeoLoading":
      return { ...currState, isGeoLoading: action.payload };
    case "setCountry":
      return { ...currState, country: action.payload };
    case "setDate":
      return { ...currState, date: action.payload };
    case "setNotes":
      return { ...currState, notes: action.payload };
    case "setEmoji":
      return { ...currState, emoji: action.payload };
    case "setGeoCodingError":
      return { ...currState, geoCodingError: action.payload };

    default:
      throw new Error("shit happened in action sent from dispatch");
  }
}
function Form() {
  const [lat, lng] = useURLPosition();

  const [
    { isGeoLoading, cityName, country, date, emoji, notes, geoCodingError },
    dispatch,
  ] = useReducer(reducer, intitialState);

  const { addCity } = useCities();
  const navigate = useNavigate();

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          dispatch({ type: "setIsGeoLoading", payload: true });
          dispatch({ type: "setGeoCodingError", payload: "" });
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "this doesn't seem to be a city ,click somewhere else"
            );
          dispatch({
            type: "setCityName",
            payload: data.city || data.locality,
          });
          dispatch({ type: "setCountry", payload: data.countryName });
          dispatch({
            type: "setEmoji",
            payload: convertToEmoji(data.countryCode),
          });

          console.log(data);
        } catch (error) {
          dispatch({ type: "setGeoCodingError", payload: error.message });
        } finally {
          dispatch({ type: "setIsGeoLoading", payload: false });
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if(geoCodingError) return <Message message={geoCodingError}/>
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "setCityName", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) =>
            dispatch({ type: "setDate", payload: e.target.value })
          }
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "setNotes", payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
