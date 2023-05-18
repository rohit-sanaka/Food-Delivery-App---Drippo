import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantInfo from "./ResInfo";
import MenuItems from "./MenuItems";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState({});
  const [menuItems, setMenuItems] = useState({});
  const { id } = useParams();

  // const axios = require("axios");
  // useEffect(() => {
  //   console.log(id);
  // }, []);

  const getRestarauntMenu = async () => {
    try {
      const response = await axios.get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.409063&lng=78.398308&restaurantId=${id}`
      );

      setResInfo(response?.data?.data?.cards[0]?.card?.card?.info);

      const MenuItems =
        response?.data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(
          1,
          -2
        );

      const extractTitles = [];
      MenuItems.forEach((item) => {
        if (item?.card?.card?.itemCards) {
          extractTitles.push(item?.card?.card);
        } else {
          if (item?.card?.card?.categories) {
            for (let i = 0; i < item?.card?.card?.categories.length; i++) {
              extractTitles.push(item?.card?.card?.categories[i]);
            }
          }
        }
      });

      setMenuItems([...extractTitles]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRestarauntMenu();
  }, []);

  return (
    <div>
      <RestaurantInfo info={resInfo} />
      <MenuItems items={menuItems} />
    </div>
  );
};

export default RestaurantMenu;
