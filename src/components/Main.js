import RestaurentCard from "./RestaurentCard";
// import { ShimmerSkeletion } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
let rawData = [];

let Skeletion1 = [];
for (let i = 0; i < 15; i++) {
  Skeletion1.push(
    <div
      key={i}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        marginTop: 0,
      }}
    >
      <Skeleton
        animation="wave"
        height={300}
        width={250}
        style={{ padding: 0, marginTop: 0 }}
      />
      <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={20} width="80%" />
    </div>
  );
}

export default Main = () => {
  const [resData, setResData] = useState([]);
  const [seachText, setSeachText] = useState("");

  console.log("rendering Skeleton...");
  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.3030246&lng=80.4322826&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await data.json();
    rawData = jsonData?.data?.cards[2]?.data?.data?.cards;
    setResData(jsonData?.data?.cards[2]?.data?.data?.cards);
  }

  return (
    <main className="main">
      <div className="search-sort-filter-section">
        <div>
          <input
            value={seachText}
            onChange={(event) => {
              setSeachText(event.target.value);
            }}
            type="text"
            name="searchbox"
            id="searchbox"
          />
          <button
            onClick={() => {
              data1 = rawData.filter((restaurant) => {
                const name = restaurant.data.name.toLowerCase();
                console.log(name);
                return name.includes(seachText.toLowerCase());
              });
              setResData(data1);
            }}
          >
            Search
          </button>
        </div>

        <button
          onClick={() => {
            const data1 = [...resData];
            data1.sort((a, b) => b.data.avgRating - a.data.avgRating);
            setResData(data1);
          }}
        >
          <h2>Sort by Rating</h2>
        </button>

        <button
          onClick={() => {
            const TopRatedRestaurants = resData.filter(
              (res) => res?.data?.avgRating > 4
            );
            setResData(TopRatedRestaurants);
          }}
        >
          <h2>Top Rated</h2>
        </button>
      </div>

      <div className="restro-container">
        {resData.length > 0 ? <RestaurentCard resData={resData} /> : Skeletion1}
      </div>
    </main>
  );
};
