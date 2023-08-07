import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "./components/Weather";
import InputCity from "./components/InputCity";
import NightMode from "./components/NightMode";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [city, setCity] = useState(null);
  const successWeather = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const API_KEY = "18b4907c11a6b1c90339695521a475f7";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=es`;

    axios
      .get(url)
      .then(({ data }) => setWeatherInfo(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successWeather);
  }, []);

  const handleCityChange = (cityData) => {
    setCity(cityData);
    setWeatherInfo(cityData);
  };
  const iconCode = weatherInfo?.weather[0].icon
  // console.log(iconCode)
  return (
    <>
    <main
      className={`bg-cover bg-center bg-[url('/images/background/${iconCode}.jpg')] min-h-screen text-white font-lato flex flex-col justify-center items-center px-3`}
    >
      {/* lo comentado es para comprobar errores */}
      {/* <h2 className="text-red-600">{weatherInfo?.weather[0].icon}</h2>
      <h2 className="text-red-400">{iconCode}</h2> */}
      <NightMode />
      <InputCity handleCityChange={handleCityChange} />
      <Weather weatherInfo ={weatherInfo} city={city} />
    </main>
    </>
  );
}

export default App;
