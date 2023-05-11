import RestaurentCard from "./RestaurentCard";
import backToTop from "../../Images/back-to-top.png";
import { useEffect, useRef, useState } from "react";
import Shimmer from "./Shimmer";

export default Main = () => {
  const [rawData, setRawData] = useState([]);
  const [resData, setResData] = useState([]);
  const [seachText, setSeachText] = useState("");
  const [scrollTopVisibility, setScrollTopVisibility] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(15);

  const ratingAssending = useRef();
  const distanceAssending = useRef();
  const activeSort = useRef(0);
  const totalNoOfRestaurants = useRef(0);

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollTopVisibility);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const getRestaurants = async () => {
    console.log(offset);
    if (offset >= totalNoOfRestaurants) return []; //setting max offset to 180

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.409063&lng=78.398308&offset=${offset}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`
      );
      const JsonData = await response.json();

      totalNoOfRestaurants.current = JsonData?.data?.totalSize;

      const cards = JsonData?.data?.cards;

      setResData((prevItems) => [...prevItems, ...cards]);
      setRawData((prevItems) => [...prevItems, ...cards]);
      setOffset((prevOffset) => prevOffset + 16);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollTopVisibility = () => {
    window.scrollY > 500
      ? setScrollTopVisibility(true)
      : setScrollTopVisibility(false);
  };

  const handleScroll = () => {
    // console.log("handleScroll");
    // console.log(window.innerHeight);
    // console.log(document.documentElement.scrollTop);
    console.log(window.innerHeight + document.documentElement.scrollTop);
    console.log(document.documentElement.offsetHeight);

    if (
      !(
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) ||
      isLoading
    ) {
      return;
    }
    getRestaurants();
  };

  return (
    <main className="px-48 ">
      <div className="my-2 px-8 py-5 flex justify-between border-b-2 border-b-violet-50">
        <div className="align-center inline-flex align-middle">
          <input
            className="h-10 w-52 rounded-md text-2xl outline-1 outline-slate-600 outline"
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
                const name = restaurant?.data?.data?.name.toLowerCase();
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
            className={
              activeSort.current === 0
                ? "border-b-4 border-solid border-red-500 box-border "
                : "border-b-4 border-transparent"
            }
            onClick={() => {
              activeSort.current = 0;
              setResData([...rawData]);
            }}
          >
            Relevence
          </button>

          <button
            className={
              activeSort.current === 1
                ? "border-b-4 border-solid border-red-500 box-border "
                : "border-b-4 border-transparent"
            }
            onClick={() => {
              activeSort.current = 1;
              const data1 = [...resData];
              if (ratingAssending.current) {
                ratingAssending.current = false;
                data1.sort(
                  (a, b) => a?.data?.data?.avgRating - b?.data?.data?.avgRating
                );
              } else {
                ratingAssending.current = true;
                data1.sort(
                  (a, b) => b?.data?.data?.avgRating - a?.data?.data?.avgRating
                );
              }
              setResData(data1);
            }}
          >
            {`Rating ${ratingAssending.current ? `⬆️` : `⬇️`}`}
          </button>

          <button
            className={
              activeSort.current === 2
                ? "border-b-4 border-solid border-red-500 box-border "
                : "border-b-4 border-transparent"
            }
            onClick={() => {
              activeSort.current = 2;
              const data1 = [...resData];

              if (distanceAssending.current) {
                distanceAssending.current = false;
                data1.sort(
                  (a, b) =>
                    a?.data?.data?.deliveryTime - b?.data?.data?.deliveryTime
                );
              } else {
                distanceAssending.current = true;
                data1.sort(
                  (a, b) =>
                    b?.data?.data?.deliveryTime - a?.data?.data?.deliveryTime
                );
              }
              setResData(data1);
            }}
          >
            {`Delivery Time ${distanceAssending.current ? `⬆️` : `⬇️`}`}
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

      {scrollTopVisibility ? (
        <button
          className="w-20 fixed bottom-12 right-12"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={backToTop} alt="back-to-top" />
        </button>
      ) : (
        <>""</>
      )}
    </main>
  );
};
