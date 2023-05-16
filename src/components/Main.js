import RestaurentCard from "./RestaurentCard";
import backToTop from "../../Images/back-to-top.png";
import { useEffect, useRef, useState } from "react";
import Shimmer from "./Shimmer";
import useOnline from "../utils/useOnline";
export default Main = () => {
  const [rawData, setRawData] = useState([]);
  const [resData, setResData] = useState([]);
  const [searchText, setSeachText] = useState("");
  const [scrollTopVisibility, setScrollTopVisibility] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isOnline = useOnline();
  // -----------------------------------------------------------
  const offsetRef = useRef(15);
  const totalNoOfRestaurantsRef = useRef(0);

  const activeSortRef = useRef(0);

  const ratingAssendingRef = useRef(true);
  const distanceAssendingRef = useRef(true);
  const isOnlineRef = useRef(false);
  // ------------------------------------------------------------
  const handleScroll = () => {
    //To handle the scrolltop button visibility.
    window.scrollY > 500
      ? setScrollTopVisibility(true)
      : setScrollTopVisibility(false);

    //To call the api when scrolled to the borrom of the page.
    if (
      window.innerHeight + document.documentElement.scrollTop <=
        document.documentElement.offsetHeight - 100 ||
      isLoading ||
      offsetRef.current >= totalNoOfRestaurantsRef.current
    ) {
      return;
    } else {
      getRestaurants();
    }
  };

  const handleSort = (currentSort, sortBy, isAssending) => {
    activeSortRef.current = currentSort;
    const data = [...resData];

    if (isAssending.current) {
      isAssending.current = false;
      data.sort((a, b) => a?.data?.data[sortBy] - b?.data?.data[sortBy]);
    } else {
      isAssending.current = true;
      data.sort((a, b) => b?.data?.data[sortBy] - a?.data?.data[sortBy]);
    }
    return data;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = handleFilter(rawData);
    setResData([...filteredData]);
  };

  const handleFilter = (data) => {
    if (!searchText) {
      return data;
    }
    return data.filter((restro) => {
      const name = restro?.data?.data?.name.toLowerCase();
      const searchtext = searchText.toLowerCase();
      return name.includes(searchtext);
    });
  };

  const getUniqueRestaurants = (data) => {
    var map = new Map();
    return data.filter((restro) => {
      if (map.get(restro?.data?.data?.id)) {
        return false;
      }
      map.set(restro?.data?.data?.id, restro);
      return true;
    });
  };

  const getRestaurants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.409063&lng=78.398308&offset=${offsetRef.current}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`
      );

      const JsonData = await response.json();

      //getting the total number of restaurants
      //to limit the offset to the number of restaurant
      totalNoOfRestaurantsRef.current = JsonData?.data?.totalSize;

      const cards = [...resData, ...JsonData?.data?.cards];

      const uniqueRestaurants = getUniqueRestaurants(cards);
      const filteredRestaurants = handleFilter(uniqueRestaurants);

      setRawData([...uniqueRestaurants]);
      setResData([...filteredRestaurants]);
      offsetRef.current = offsetRef.current + 16;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  if (!isOnline) {
    return (
      <div className="text-center">
        It seems you are OFFLINE!!! please check your internet connection!!!
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">{`${error.code} : ${error.message}`}</div>
    );
  }

  if (!resData) {
    return (
      <div className="text-center">
        <h1>No data found</h1>
      </div>
    );
  }

  return (
    <main className="px-48 ">
      <div className="shadow-md my-2 pb-3 px-8 py-5 flex justify-between border-b-2 border-b-violet-50 sticky top-20 bg-slate-100">
        <form onSubmit={handleSearch}>
          <div className="align-center inline-flex align-middle">
            <input
              className="h-10 w-52 rounded-md text-2xl outline-1 outline-slate-600 outline"
              value={searchText}
              onChange={(event) => {
                setSeachText(event.target.value);
              }}
              type="text"
              name="searchbox"
              id="searchbox"
            />

            <button
              className="bg-red-100 p-2 rounded-md ml-3"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex gap-10">
          <button
            className={
              activeSortRef.current === 0
                ? "border-b-4 border-solid border-red-500 box-border "
                : "border-b-4 border-transparent"
            }
            onClick={() => {
              activeSortRef.current = 0;
              setResData([...rawData]);
            }}
          >
            Relevence
          </button>

          <button
            className={
              activeSortRef.current === 1
                ? "border-b-4 border-solid border-red-500 box-border "
                : "border-b-4 border-transparent"
            }
            onClick={() => {
              const sorteddata = handleSort(1, "avgRating", ratingAssendingRef);
              setResData([...sorteddata]);
            }}
          >
            {`Rating ${ratingAssendingRef.current ? `⬆️` : `⬇️`}`}
          </button>

          <button
            className={
              activeSortRef.current === 2
                ? "border-b-4 border-solid border-red-500 box-border "
                : "border-b-4 border-transparent"
            }
            onClick={() => {
              const sorteddata = handleSort(
                2,
                "deliveryTime",
                distanceAssendingRef
              );
              setResData([...sorteddata]);
            }}
          >
            {`Delivery Time ${distanceAssendingRef.current ? `⬆️` : `⬇️`}`}
          </button>
        </div>
      </div>

      <div className="text-center w-full">
        {rawData.length > 0 &&
          Array.isArray(resData) &&
          resData.length === 0 && (
            <h1 className="text-center">No Restaurants found!!!</h1>
          )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Array.isArray(resData) && resData.length > 0 ? (
          resData.map((card) => {
            return <RestaurentCard key={card?.data.id} cardData={card} />;
          })
        ) : (
          <Shimmer />
        )}

        {isLoading && offsetRef.current <= totalNoOfRestaurantsRef.current && (
          <Shimmer />
        )}
      </div>

      <button
        className="w-20 fixed bottom-12 right-12"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        {scrollTopVisibility ? (
          <img src={backToTop} alt="back-to-top" />
        ) : (
          <></>
        )}
      </button>
    </main>
  );
};
