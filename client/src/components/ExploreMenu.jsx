function ExploreMenu({ category, setCategory }) {
  const menuList = [
    {
      menu_name: "Salad",
      menu_image:
        "https://app-food-tomato.netlify.app/assets/menu_1-CpSfC1Ff.png",
    },
    {
      menu_name: "Spring rolls",
      menu_image:
        "https://app-food-tomato.netlify.app/assets/menu_2-6QL_uDtg.png",
    },
    {
      menu_name: "Dessert",
      menu_image:
        "https://app-food-tomato.netlify.app/assets/menu_3-2xw_iDUH.png",
    },
    {
      menu_name: "Sandwich",
      menu_image:
        "https://app-food-tomato.netlify.app/assets/menu_4-CpXAwO71.png",
    },
    {
      menu_name: "Cakes",
      menu_image:
        "https://app-food-tomato.netlify.app/assets/menu_5-BLqPAi9S.png",
    },
    {
      menu_name: "Vegetarian",
      menu_image:
        "https://app-food-tomato.netlify.app/assets/menu_6-BAKCTvIj.png",
    },
    {
      menu_name: "Pasta",
      menu_image:
        "https://app-food-tomato.netlify.app/assets/menu_7-Dbn_MJmR.png",
    },
    {
      menu_name: "Noodles",
      menu_image:
        "https://app-food-tomato.netlify.app/assets/menu_8-D3TIbU8x.png",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto w-full p-4 flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl text-[#262626]">Explore our menu</h2>
          <p className="text-[#49557e] lg:max-w-[70%] leading-6">
            Choose from a diverse menu featuring a delectable array of dishes.
            <span className="sm:block hidden">
              Our mission is to satisfy your cravings and elevate your dinning
              experience, one deliciuos meal at a time!
            </span>
          </p>
        </div>
        <div className="flex gap-7 items-center justify-between overflow-x-scroll overflow-y-hidden">
          {menuList.map((menu) => (
            <div
              key={menu.menu_name}
              className="flex items-center text-center flex-col gap-1 cursor-pointer"
              onClick={() =>
                setCategory((prev) =>
                  prev === menu.menu_name ? "All" : menu.menu_name
                )
              }
            >
              <div>
                <img
                  src={menu.menu_image}
                  alt=""
                  className={`w-[9vw] min-w-[100px] ${
                    category === menu.menu_name &&
                    "border-[3px] border-[#ff6347] rounded-full p-1"
                  }`}
                />
              </div>
              <p
                className={`whitespace-nowrap ${
                  category === menu.menu_name
                    ? "text-primary"
                    : "text-[#747474]"
                }`}
              >
                {menu.menu_name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[2px] bg-gray-300" />
    </section>
  );
}

export default ExploreMenu;
