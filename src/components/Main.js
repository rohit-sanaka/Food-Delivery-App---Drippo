import RestaurentCard from "./RestaurentCard";
import { RESTRO_CDN_START, RESTRO_CDN2_END } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";

export default Main = () => {
  const [rawData, setRawData] = useState([]);
  const [resData, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [seachText, setSeachText] = useState("");

  console.log(offset);
  useEffect(() => {
    getRestaurants();
    console.log("useEffect...");
  }, []);

  const getRestaurants = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = RESTRO_CDN_START + offset + RESTRO_CDN2_END;
      const response = await fetch(url);
      const data = await response.json();

      const cards = data?.data?.cards;
      const filterDataWithoutId = cards.filter((card) => {
        return card.data.data.id && card.data.data.cloudinaryImageId;
      });
      setResData((prevItems) => [...prevItems, ...filterDataWithoutId]);

      setRawData((prevItems) => [...prevItems, ...filterDataWithoutId]);

      setOffset((prevOffset) => prevOffset + 16);
    } catch (error) {
      setError(error);
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
                const name = restaurant.data.data.name.toLowerCase();
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
            data1.sort((a, b) => b.data.data.avgRating - a.data.data.avgRating);
            setResData(data1);
          }}
        >
          <h2>Sort by Rating</h2>
        </button>

        <button
          onClick={() => {
            const TopRatedRestaurants = resData.filter(
              (res) => res?.data.data?.avgRating > 4
            );
            setResData(TopRatedRestaurants);
          }}
        >
          <h2>Top Rated</h2>
        </button>
      </div>
      <InfiniteScroll
        dataLength={resData.length / 5}
        next={getRestaurants}
        hasMore={offset < 60 ? true : false} // Replace with a condition based on your data source
        loader={<Shimmer />}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="restro-container">
          {resData.length > 0 ? (
            <RestaurentCard resData={resData} />
          ) : (
            <Shimmer />
          )}
        </div>
      </InfiniteScroll>
    </main>
  );
};
