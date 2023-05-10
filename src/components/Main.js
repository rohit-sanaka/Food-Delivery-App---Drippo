import RestaurentCard from "./RestaurentCard";
import { RESTRO_DATA_CDN } from "../utils/constants";
import { useEffect, useRef, useState } from "react";

export default Main = () => {
  const [rawData, setRawData] = useState([]);
  const [resData, setResData] = useState([]);
  const [seachText, setSeachText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const ratingAssending = useRef();
  const distanceAssending = useRef();
  console.log(ratingAssending.current);

  useEffect(() => {
    getRestaurants();
  }, []);
  const getRestaurants = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(RESTRO_DATA_CDN);
      const data = await response.json();

      const cards = data?.data?.cards[2]?.data?.data?.cards;
      setResData([...cards]);

      setRawData([...cards]);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
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
                console.log(name);
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
              console.log(ratingAssending.current);
              const data1 = [...resData];

              if (ratingAssending.current) {
                console.log("desending");
                ratingAssending.current = false;
                data1.sort((a, b) => a?.data?.avgRating - b?.data?.avgRating);
              } else {
                console.log("assending");
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
              console.log(distanceAssending.current);
              const data1 = [...resData];

              if (distanceAssending.current) {
                console.log("desending");
                distanceAssending.current = false;
                data1.sort(
                  (a, b) => a?.data?.deliveryTime - b?.data?.deliveryTime
                );
              } else {
                console.log("assending");
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
          isLoading && <h1>Loading</h1>
        )}
      </div>
    </main>
  );
};
