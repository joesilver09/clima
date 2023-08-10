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
    <div className=" z-10 text-shadow ml-2 sm:ml-3">
      {weatherInfo?.wind.speed !== null && !isNaN(weatherInfo?.wind.speed) ? (
        <section className=" text-center my-5 pb-8 text-black dark:text-[white]">
          <h2 className=" text-shadow pb-6 text-2xl font-bold sm:text-4xl">
            {weatherInfo?.name}, {countryInfo?.translations.spa.common}
          </h2>
          <section className="grid gap-3 sm:grid-cols-[auto_auto] sm:mt-8 sm:mb-12">
            {/* superior */}
            <section className="shadow-md bg-[#e9e5e580] dark:bg-[#84848480] mb-2 p-2 rounded-[38px] grid grid-cols-3 items-center sm:max-w-md sm:mb-0 sm:p-0 sm:mr-3">
              <h4 className="text-shadow text-[1.2rem] font-medium capitalize mt-3 col-span-3 sm:text-[1.6rem] sm:mt-6">
                {weatherInfo?.weather[0].description}
              </h4>
              <span className="text-shadow text-[5rem] transform scale-y-110 font-extralight mb-7 mt-3 col-span-2 sm:text-[6.3rem] sm:mb-9 sm:mt-1 sm:ml-2 pl-5">
                {tempConversion}
              </span>
              <div className="w-32 h-32 mr-4 mb-4 sm:mr-0 sm:mb-6 translate-x-[-1rem]">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@4x.png`}
                  alt=""
                />
              </div>
            </section>
            {/* inferior */}
            <section className="shadow-md bg-[#E0E0E080] dark:bg-[#84848480] text-[0.95] font-bold scale-y-110 mb-3 divide-x-2 py-4 divide-[#0000003B] dark:divide-[#ffffff56] rounded-3xl grid grid-cols-[1fr,1fr,1fr] sm:grid-cols-1 sm:p-5 sm:mb-0 sm:py-0 sm:scale-y-100 sm:w-[10rem] sm:divide-x-0 sm:divide-y-2 sm:font-black sm:text-xl">
              <article className="flex items-center justify-center py-4 sm:py-0 sm:justify-start">
                <div className="w-[1.15rem] ml-4 sm:w-7 sm:ml-0">
                  <img src="/images/wind.png" alt="" className="dark:hidden" />
                  <img
                    src="/images/windn.png"
                    alt=""
                    className="hidden dark:block"
                  />
                </div>
                <span className="text-shadow ml-2 sm:ml-3">
                  {weatherInfo?.wind.speed}m/s
                </span>
              </article>

              <article className="flex items-center justify-center sm:justify-start">
                <div className="w-[1.10rem] ml-2 sm:w-7 sm:ml-0">
                  <img
                    src="/images/humidity.png"
                    alt=""
                    className="dark:hidden"
                  />
                  <img
                    src="/images/humidityn.png"
                    alt=""
                    className="hidden dark:block"
                  />
                </div>
                <span className="text-shadow ml-4 sm:ml-6">
                  {weatherInfo?.main.humidity}%
                </span>
              </article>

              <article className="flex items-center justify-center sm:justify-start">
                <div className="w-[1.15rem] sm:w-7">
                  <img
                    src="/images/pressure.png"
                    alt=""
                    className="dark:hidden"
                  />
                  <img
                    src="/images/pressuren.png"
                    alt=""
                    className="hidden dark:block"
                  />
                </div>
                <span className="text-shadow ml-2">
                  {weatherInfo?.main.pressure}hPa
                </span>
              </article>
            </section>
          </section>
          <button
            onClick={handleChangeUnitTemp}
            className="mt-6 mb-7 box-shadow bg-white text-[#4580BA] dark:text-white dark:bg-[#4580BA] py-1 px-7 rounded-2xl translate-y-[-0.8rem] sm:text-xl sm:mb-14"
          >
            Cambiar a {cambiarA}
          </button>
        </section>
      )
    :( <h2 className="text-center sm:text-4xl  text-lg p-3 m-3 bg-gradient-to-r from-[#1b0e2970] to-[#379bec70] rounded-full mb-20">
      "Porfavor abilita tu ubicación o ingresa una ciudad para continuar" 
      <div className="-z-10 fixed inset-0 flex items-center justify-center"><img src="images/95.png" alt="" style={{ height: "400px", width: "100vw", opacity: 0.4 }} /></div>
      <div className="-z-20 top-0 right-0 fixed h-full w-full bg-cover bg-[url(images/background/02n.jpg)]"></div>
      </h2>)}
    </div>
  );
};
export default Weather;
