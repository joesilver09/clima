import axios from "axios";

const InputCity = ({ handleCityChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const cityName = event.target.cityName.value;
    const API_KEY = "18b4907c11a6b1c90339695521a475f7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&lang=es`;

    axios
      .get(url)
      .then(({ data }) => {
        handleCityChange(data); // Llama a la función para pasar los datos de la ciudad a App
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Valor inválido: No se pudo obtener información para la ciudad especificada."
        );
      });
  };

  return (
    <div className="z-10">
      <form className="text-black shadow-sm dark:text-[#fffdfd] mt-4 sm:mt-7 sm:mb-3 " onSubmit={handleSubmit}>
        <input
          className="rounded-l-full py-1 px-2  bg-[#E0E0E080] dark:bg-[#84848480] placeholder-gray-600 dark:placeholder-[#ffffff8c] outline-none
          sm:text-xl"
          id="cityName"
          type="text"
          placeholder="Escribe una ciudad..."
          autoComplete="off"
        />

        <button className="text-white p-1 bg-gradient-to-t from-blue-950/70 to-sky-300/40 rounded-r-full translate-y-[0.36rem] sm:translate-y-[0.42rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 27 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 sm:w-7 sm:h-[1.8rem]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputCity;
