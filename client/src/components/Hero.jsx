function Hero() {
  return (
    <section className="max-w-7xl mx-auto w-full my-10">
      <div className="flex flex-col items-center justify-center text-center p-4 gap-4">
        <h2 className="md:text-6xl sm:text-4xl text-3xl text-primary">
          Order your favorite food here!
        </h2>
        <p className="text-[#49557e] leading-6">
          Choose from a deverse menu featuring a delectable array of dishes
          crafted with the love and passion from our chefs.
        </p>
        <button className="bg-primary text-white px-6 py-2 font-light rounded-lg">
          View Menu
        </button>
      </div>
    </section>
  );
}

export default Hero;
