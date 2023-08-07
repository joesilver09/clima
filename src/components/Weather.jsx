import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ weatherInfo }) => {
  const [tempCelsius, setTempCelsius] = useState(true);
  const [countryInfo, setCountryInfo] = useState(null); // Estado para almacenar el nombre del país

  const kelvinToCelsius = (tempKelvin) => {
    return (tempKelvin - 273.15).toFixed(0);
  };

  const kelvinToFahrenheit = (tempKelvin) => {
    return (((tempKelvin - 273.15) * 9) / 5 + 32).toFixed(0);
  };

  const handleChangeUnitTemp = () => {
    setTempCelsius(!tempCelsius);
  };

  const tempConversion = tempCelsius
    ? `${kelvinToCelsius(weatherInfo?.main.temp)}°C`
    : `${kelvinToFahrenheit(weatherInfo?.main.temp)}°F`;
  const cambiarA = tempCelsius ? "°F" : "°C";

  const countryCode = weatherInfo?.sys.country;

  useEffect(() => {
    if (countryCode) {
      const restCountriesUrl = `https://restcountries.com/v3.1/alpha/${countryCode}`;
      axios
        .get(restCountriesUrl)
        .then((countryResponse) => {
          const countryData = countryResponse.data;
          setCountryInfo(countryData[0]); // Guardar toda la información del país
        })
        .catch((error) => {
          console.error("Error al obtener datos de REST Countries:", error);
        });
    }
  }, [countryCode]);

  return (
    <section className="text-center my-5 pb-8 text-black">
      <h2 className="pb-6 text-2xl font-bold sm:text-4xl">
        {weatherInfo?.name}, {countryInfo?.translations.spa.common}
      </h2>
      <section className="grid gap-3 sm:grid-cols-[auto_auto] sm:mt-8 sm:mb-12">
        {/* superior */}
        <section className="bg-[#e9e5e580] mb-2 p-2 rounded-[38px] grid grid-cols-3 items-center sm:max-w-md sm:mb-0 sm:p-0 sm:mr-3">
          <h4 className=" text-[1.2rem] font-medium capitalize mt-3 col-span-3 sm:text-[1.6rem] sm:mt-6">
            {weatherInfo?.weather[0].description}
          </h4>
          <span className="text-[5rem] transform scale-y-110 font-extralight mb-7 mt-3 col-span-2 sm:text-[7rem] sm:mb-9 sm:mt-1">
            {tempConversion}
          </span>
          <div className="mr-4 mb-4 sm:mr-0 sm:mb-6 translate-x-[-1rem]">
            <img
              src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@4x.png`}
              alt=""
            />
          </div>
        </section>
        {/* inferior */}
        <section className="bg-[#E0E0E080] text-[0.95] font-bold scale-y-110 p-5 mb-3 divide-x-2 py-3 divide-[#0000003B] rounded-3xl grid grid-cols-[1fr,1fr,1fr] sm:grid-cols-1 sm:p-5 sm:mb-0 sm:py-0 sm:scale-y-100 sm:w-[9rem] sm:divide-x-0 sm:divide-y-2">
          <article className="flex items-center justify-center py-5 sm:py-0 sm:justify-start">
            <div className="w-5">
              <img src="/images/wind.png" alt="" />
            </div>
            <span className="ml-2 sm:ml-0">{weatherInfo?.wind.speed}m/s</span>
          </article>

          <article className="flex items-center justify-center sm:justify-start">
            <div className="w-5">
              <img src="/images/humidity.png" alt="" />
            </div>
            <span className="ml-2 sm:ml-0">{weatherInfo?.main.humidity}%</span>
          </article>

          <article className="flex items-center justify-center pl-1 ml-3  sm:pl-0 sm:ml-0 sm:justify-start">
            <div className="w-5">
              <img src="/images/pressure.png" alt="" />
            </div>
            <span>{weatherInfo?.main.pressure}hPa</span>
          </article>
        </section>
      </section>
      <button
        onClick={handleChangeUnitTemp}
        className="mt-6 mb-7 shadow-lg bg-white text-blue-500 py-1 px-7 rounded-2xl translate-y-[-0.8rem] sm:text-xl sm:mb-14"
      >
        Cambiar a {cambiarA}
      </button>
    </section>
  );
};
export default Weather;
