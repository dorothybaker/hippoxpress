import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { API } from "../utils/makeRequest";

function Fooddisplay({ category }) {
  const { data: food_list, isLoading } = useQuery({
    queryKey: ["food_list"],
    queryFn: async () => {
      try {
        const res = await API.get("/food/list");

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-6 flex flex-col gap-3">
      <h2 className="text-xl">Top dishes near you</h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        {isLoading
          ? [1, 2, 3, 4].map((idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="lg:h-[230px] md:h-[290px] h-[250px] w-full rounded-xl bg-gray-200" />
                <div className="h-7 w-full rounded-xl bg-gray-200" />
                <div className="h-10 w-full rounded-xl bg-gray-200" />
              </div>
            ))
          : category === "All"
          ? food_list?.map((food) => <Card food={food} key={food._id} />)
          : food_list
              ?.filter((food) => food.category === category)
              ?.map((food) => <Card food={food} key={food._id} />)}
      </div>
    </section>
  );
}

export default Fooddisplay;
