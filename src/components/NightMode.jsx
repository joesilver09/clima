import { useState, useEffect } from "react";

const NightMode = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
     setTheme(theme === "dark" ? "light" : "dark");
  };
 
  return (
    <label
      htmlFor="check"
      className="bg-white shadow-lg relative w-14 h-6 rounded-full mt-3 sm:mt-6"
      
    >
      <input type="checkbox" id="check" className="sr-only peer" onClick={handleThemeSwitch} />
      <span
        className="w-5 h-5 bg-blue-300 absolute rounded-full right-1 top-[0.15rem] peer-checked:bg-purple-800 peer-checked:right-8 transition-all duration-500"
      ></span>
    </label>
  );
};
export default NightMode;
