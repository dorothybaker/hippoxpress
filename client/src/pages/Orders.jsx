import { useQuery } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";

import momemt from "moment";

function Orders() {
  const { data, isLoading } = useQuery({
    queryKey: ["orderData"],
    queryFn: async () => {
      try {
        const res = await API.get("/order/user");

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
    <section className="max-w-7xl mx-auto px-4 py-7 flex flex-col gap-3">
      <p className="text-xl">Your orders</p>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center text-center text-2xl text-gray-400 w-full lg:col-span-3 sm:col-span-2 col-span-1">
            Loading your orders...
          </div>
        ) : data.length > 0 ? (
          data?.map((order) => (
            <div
              key={order._id}
              className="odd:bg-gray-100/50 sm:px-5 p-3 flex flex-col gap-1"
            >
              <p>
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <h1 className="text-lg font-semibold">
                {momemt(order.createdAt).format("Do MMMM, YYYY")}
              </h1>
              <div className="flex flex-col gap-0.5">
                <h1 className="font-semibold">Items</h1>
                <div className="flex flex-col">
                  {order.items.map((item) => (
                    <span>
                      {item.name} ({item.quantity})
                    </span>
                  ))}
                </div>
              </div>

              <p>
                <span className="font-semibold">Name:</span>{" "}
                {order.user.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {order.user.email}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {order.status}
              </p>
            </div>
          ))
        ) : (
          <div className="min-h-[300px] flex items-center justify-center text-center text-2xl text-gray-400 w-full lg:col-span-3 sm:col-span-2 col-span-1">
            You don't have any orders!
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
