const RestaurantInfo = ({ info }) => {
  const {
    id,
    name,
    cuisines,
    avgRating,
    costForTwo,
    totalRatingsString,
    locality,
  } = info;
  return (
    <div className=" px-96 pt-12">
      <div className="flex">
        <div className="mr-auto">
          <h1 className="text-xl font-semibold ">{name}</h1>
          <h2 className="text-lg text-gray-500">{cuisines?.join(", ")}</h2>
          <h1 className="text-base  text-gray-500">{locality}</h1>
        </div>
        <div className="w-20 text-center border border-solid border-gray-400 rounded flex flex-col justify-center gap-2">
          <h1
            className={`${
              avgRating >= 4
                ? "text-green-600 before:text-green-600x font-[icomoon]"
                : "text-orange-400"
            } font-bold w-full `}
          >
            ⭐{avgRating}
          </h1>
          <hr className="w-2/3 mx-auto text-center border-gray-400" />
          <h1 className="text-xs text-gray-400 font-semibold">
            {totalRatingsString}
          </h1>
        </div>
      </div>
      <br />
      <hr className="border-2 border-dashed border-gray-400" />
    </div>
  );
};
export default RestaurantInfo;
