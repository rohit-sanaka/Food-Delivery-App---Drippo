import RestaurentCard from "./RestaurentCard";
import backToTop from "../../Images/back-to-top.png";
import { SORT_TYPE } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import Shimmer from "./Shimmer";
import useOnline from "../utils/useOnline";

//-------------------------------------------

export default Main = () => {
  const [resData, setResData] = useState([]);
  const [searchText, setSeachText] = useState("");
  const [scrollTopVisibility, setScrollTopVisibility] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isOnline = useOnline();

  // -----------------------------------------------------------

  const offsetRef = useRef(15);
  const activeSortRef = useRef(0);

  const totalNoOfRestaurantsRef = useRef(0);

  // ------------------------------------------------------------

  const handleScroll = () => {
    //To handle the scrolltop button visibility.
    window.scrollY > 500
      ? setScrollTopVisibility(true)
      : setScrollTopVisibility(false);

    if (
      window.innerHeight + document.documentElement.scrollTop <=
        document.documentElement.offsetHeight - 150 ||
      isLoading ||
      offsetRef.current >= totalNoOfRestaurantsRef.current
    ) {
      return;
    } else {
      getNextRestaurants();
    }
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const filteredData = handleFilter(resData);
  //   setResData([...filteredData]);
  // };

  // const handleFilter = (data) => {
  //   if (!searchText) {
  //     return data;
  //   }
  //   return data.filter((restro) => {
  //     const name = restro?.data?.data?.name.toLowerCase();
  //     const searchtext = searchText.toLowerCase();
  //     return name.includes(searchtext);
  //   });
  // };

  const getNextRestaurants = async () => {
    console.log("getNextRestaurants");
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.409063&lng=78.398308&offset=${
          offsetRef.current
        }&sortBy=${
          SORT_TYPE[activeSortRef.current]
        }&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`
      );

      const JsonData = await response.json();
      cards = JsonData.data.cards.map((card) => card.data);

      setResData([...resData, ...cards]);

      offsetRef.current = offsetRef.current + 16;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRestaurants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.3030246&lng=80.4322826&sortBy=${
          SORT_TYPE[activeSortRef.current]
        }&page_type=DESKTOP_WEB_LISTING`
      );

      const JsonData = await response.json();

      const cards =
        activeSortRef.current == 0
          ? [...JsonData?.data?.cards[2]?.data?.data?.cards]
          : [...JsonData?.data?.cards[0]?.data?.data?.cards];
      console.log(cards);

      setResData([...cards]);

      totalNoOfRestaurantsRef.current =
        activeSortRef.current == 0
          ? JsonData?.data?.cards[2]?.data?.data?.totalOpenRestaurants
          : JsonData?.data?.cards[0]?.data?.data?.totalOpenRestaurants;
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
    <main className="px-40 ">
      <div className="shadow-md my-2  px-10 pt-3 flex justify-between border-b-2 border-b-violet-50 sticky top-20 bg-slate-100">
        {/* <form onSubmit={handleSearch}>
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
        </form> */}

        <div>
          <h2 className="font-bold text-3xl pb-3">
            {resData.length > 0
              ? totalNoOfRestaurantsRef.current + " Restaurants"
              : "Finding Restaurants... "}
          </h2>
        </div>

        <div className="flex gap-10">
          <button
            className={
              activeSortRef.current === 0
                ? "border-b-4 border-solid border-red-500 box-border text-xl"
                : "border-b-4 border-transparent text-xl text-gray-600"
            }
            onClick={() => {
              activeSortRef.current = 0;
              window.scrollTo({ top: 0, behavior: "smooth" });
              setResData([]);
              offsetRef.current = 15;
              getRestaurants();
            }}
          >
            Relevence
          </button>

          <button
            className={
              activeSortRef.current === 1
                ? "border-b-4 border-solid border-red-500 box-border text-xl"
                : "border-b-4 border-transparent text-xl text-gray-600"
            }
            onClick={() => {
              activeSortRef.current = 1;
              window.scrollTo({ top: 0, behavior: "smooth" });
              setResData([]);
              offsetRef.current = 15;
              getRestaurants();
            }}
          >
            Rating
          </button>

          <button
            className={
              activeSortRef.current === 2
                ? "border-b-4 border-solid border-red-500 box-border text-xl"
                : "border-b-4 border-transparent text-xl text-gray-600"
            }
            onClick={() => {
              activeSortRef.current = 2;
              window.scrollTo({ top: 0, behavior: "smooth" });
              setResData([]);
              offsetRef.current = 15;
              getRestaurants();
            }}
          >
            Delivery Time
          </button>

          <button
            className={
              activeSortRef.current === 3
                ? "border-b-4 border-solid border-red-500 box-border text-xl"
                : "border-b-4 border-transparent text-xl text-gray-600"
            }
            onClick={() => {
              activeSortRef.current = 3;
              window.scrollTo({ top: 0, behavior: "smooth" });
              setResData([]);
              offsetRef.current = 15;
              getRestaurants();
            }}
          >
            Cost : Low to High
          </button>
          <button
            className={
              activeSortRef.current === 4
                ? "border-b-4 border-solid border-red-500 box-border text-xl"
                : "border-b-4 border-transparent text-xl text-gray-600"
            }
            onClick={() => {
              activeSortRef.current = 4;
              window.scrollTo({ top: 0, behavior: "smooth" });
              setResData([]);
              offsetRef.current = 15;
              getRestaurants();
            }}
          >
            Cost : High to Low
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Array.isArray(resData) && resData.length > 0 ? (
          resData.map((card) => {
            return <RestaurentCard key={card.data.id} cardData={card} />;
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
