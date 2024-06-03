import { useState } from "react";
import ExploreMenu from "../components/ExploreMenu";
import Hero from "../components/Hero";
import Fooddisplay from "../components/Fooddisplay";
import App from "../components/App";

function Home() {
  const [category, setCategory] = useState("All");

  return (
    <div className="flex flex-col gap-5">
      <Hero />
      <ExploreMenu category={category} setCategory={setCategory} />
      <Fooddisplay category={category} />
      <App />
    </div>
  );
}

export default Home;
