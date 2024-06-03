function App() {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-8">
      <div className="flex flex-col gap-5 items-center justify-center text-center">
        <h1 className="md:text-4xl sm:text-3xl text-2xl flex flex-col gap-2">
          <span>For Better Experience Download </span>
          <span>
            <span className="text-primary">Hippoxpress</span> App
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <img
            src="https://app-food-tomato.netlify.app/assets/play_store-B2tFv0Hy.png"
            alt=""
            className="max-w-[30vw] min-[120px] cursor-pointer"
          />
          <img
            src="https://app-food-tomato.netlify.app/assets/app_store-C8O_cY6s.png"
            alt=""
            className="max-w-[30vw] min-[120px] cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}

export default App;
