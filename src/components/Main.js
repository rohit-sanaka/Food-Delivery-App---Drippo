import RestaurentCard from "./RestaurentCard";
import { RESTRO_DATA_CDN } from "../utils/constants";
import { useEffect, useState } from "react";

export default Main = () => {
  const [rawData, setRawData] = useState([]);
  const [resData, setResData] = useState([]);
  const [seachText, setSeachText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

        <button
          onClick={() => {
            const data1 = [...resData];
            data1.sort((a, b) => b?.data?.avgRating - a?.data?.avgRating);
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
        {resData.length > 0 ? (
          <RestaurentCard resData={resData} />
        ) : (
          isLoading && <h1>Loading</h1>
        )}
      </div>
    </main>
  );
};
