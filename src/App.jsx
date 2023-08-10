import React, { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Cargando from "./components/Cargando";

const Weather = lazy(() => import("./components/Weather"));
const InputCity = lazy(() => import("./components/InputCity"));
const NightMode = lazy(() => import("./components/NightMode"));

function App() {
  const [showComponent, setShowComponent] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const successWeather = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const API_KEY = "18b4907c11a6b1c90339695521a475f7";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=es`;

      axios
        .get(url)
        .then(({ data }) => {
          setWeatherInfo(data);
        })
        .catch((err) => console.log(err));
    };

    navigator.geolocation.getCurrentPosition(successWeather);
  }, []);

  const iconCode = weatherInfo?.weather[0].icon;
  const handleCityChange = (cityData) => {
    setCity(cityData);
    setWeatherInfo(cityData);
  };

  useEffect(() => {
    // Simulación de retraso de 2 segundos
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 1400);

    return () => clearTimeout(timeout);
  }, []);

  const weatherBg = iconCode ? `/images/background/${iconCode}.jpg` : "";


  return (
    <main
      className="bg-cover bg-center min-h-screen text-white font-lato flex flex-col justify-center items-center px-3"
      style={{
        backgroundImage: iconCode ? `url(${weatherBg})` : "none",
      }}
    >
      <div className=" fixed bg-cover bg-center dark:bg-[#0000006c] w-full h-[1000px]"/>
      <Suspense fallback={<Cargando />}>
        {showComponent ? (
          <>
            <NightMode />
            <InputCity handleCityChange={handleCityChange} />
            <Weather weatherInfo={weatherInfo} city={city} />
          </>
        ) : (
          <Cargando/>
        )}
      </Suspense>
    </main>
  );
}

export default App;



