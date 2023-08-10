const Cargando = () => {

    return (
  
  
  <div className="z-10 fixed w-screen h-screen bg-[#373839]">
    <div className="grid place-items-center gap-5 sm:gap-6 translate-y-52 sm:translate-y-64">
    <div className="w-42 col-start-2">
        <img src="/images/carga1.png" alt="Imagen" />
      </div>
      <div className="mb-4 w-44 col-span-3 sm:w-48">
        <img src="/images/carga2.png" alt="Imagen" />
      </div>
      <div className="transform translate-y-[-1.3rem] w-[20.5rem] col-span-3 sm:w-[23rem]">
        <img src="/images/loader.gif" alt="Imagen" />
      </div>
    </div>
    </div>
    );
  };
  
  export default Cargando;