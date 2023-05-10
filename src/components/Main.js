import RestaurentCard from "./RestaurentCard";
import { RESTRO_DATA_CDN } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import Shimmer from "./Shimmer";

export default Main = () => {
  const [rawData, setRawData] = useState([]);
  const [resData, setResData] = useState([]);
  const [seachText, setSeachText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(16);

  const ratingAssending = useRef();
  const distanceAssending = useRef();
  const root = document.getElementById("root");

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const getRestaurants = async () => {
    if (offset > 180) return []; //setting max offset to 180
    console.log(offset);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.409063&lng=78.398308&offset=${offset}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`
      );
      const JsonData = await response.json();

      const cards = JsonData?.data?.cards;
      console.log(cards);

      setResData((prevItems) => [...prevItems, ...cards]);
      setOffset((prevOffset) => prevOffset + 16);
      setRawData([...prevItems, ...cards]);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    console.log("handleScroll");
    if (
      Math.floor(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight - 1 ||
      isLoading
    ) {
      return;
    }
    getRestaurants();
  };

  return (
    <main className="px-48 ">
      <div className="my-2 px-8 py-5 bg-slate-400 flex justify-between ">
        <div>
          <input
            className="h-10 w-52 rounded-md text-2xl align-center inline-flex align-middle"
            value={seachText}
            onChange={(event) => {
              setSeachText(event.target.value);
            }}
            type="text"
            name="searchbox"
            id="searchbox"
          />

          <button
            className="bg-red-100 p-2 rounded-md ml-3"
            onClick={() => {
              data1 = rawData.filter((restaurant) => {
                const name = restaurant?.data?.name.toLowerCase();
                return name.includes(seachText.toLowerCase());
              });
              setResData(data1);
            }}
          >
            Search
          </button>
        </div>

        <div className="flex gap-10">
          <button
            className="bg-red-100 p-2 rounded-md"
            onClick={() => {
              const data1 = [...resData];

              if (ratingAssending.current) {
                ratingAssending.current = false;
                data1.sort((a, b) => a?.data?.avgRating - b?.data?.avgRating);
              } else {
                ratingAssending.current = true;
                data1.sort((a, b) => b?.data?.avgRating - a?.data?.avgRating);
              }
              setResData(data1);
            }}
          >
            {`Sort by Rating ${ratingAssending.current ? `⬇️` : `⬆️`}`}
          </button>
          <button
            className="bg-red-100 p-2 rounded-md"
            onClick={() => {
              const data1 = [...resData];

              if (distanceAssending.current) {
                distanceAssending.current = false;
                data1.sort(
                  (a, b) => a?.data?.deliveryTime - b?.data?.deliveryTime
                );
              } else {
                distanceAssending.current = true;
                data1.sort(
                  (a, b) => b?.data?.deliveryTime - a?.data?.deliveryTime
                );
              }
              setResData(data1);
            }}
          >
            {`Sort by DeliveryTime ${distanceAssending.current ? `⬇️` : `⬆️`}`}
          </button>

          <button
            className="bg-red-100 p-2 rounded-md"
            onClick={() => {
              const TopRatedRestaurants = resData.filter(
                (res) => res?.data?.avgRating > 4
              );
              setResData(TopRatedRestaurants);
            }}
          >
            <h2>Show Top Rated</h2>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {resData.length > 0 ? (
          <RestaurentCard resData={resData} />
        ) : (
          <Shimmer />
        )}
        {isLoading && resData.length > 0 && <Shimmer />}
      </div>
    </main>
  );
};
