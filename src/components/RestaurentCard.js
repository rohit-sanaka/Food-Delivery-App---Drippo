import { RESTRO_IMG_CDN } from "../utils/constants";
import { Link } from "react-router-dom";

export default function RestaurentCard({ resData }) {
  return (RestaurantCradArray = resData.map((restaurant) => {
    const {
      cloudinaryImageId,
      name,
      cuisines,
      avgRating,
      costForTwo,
      deliveryTime,
      id,
      uuid,
    } = restaurant?.data?.data;
    return (
      <Link
        className="m-4 mb-0 p-4 hover:shadow-2xl hover:shadow-black/50 hover:outline-1 hover:outline-red-500 hover:outline  "
        key={uuid}
        to={`/restaurant/${id}`}
      >
        <div>
          <img
            className=""
            src={RESTRO_IMG_CDN + cloudinaryImageId}
            alt="Restaurant-img"
          />
          <h3 className="font-bold text-xl mt-2 break-words">{name}</h3>
          <p className=" mt-2">{cuisines?.join(", ")}</p>
          <div className="mt-2 flex justify-between">
            <span>{"⭐" + avgRating}</span>.
            <span>₹{costForTwo / 100} FOR TWO</span>.
            <span>{deliveryTime}Mins</span>
          </div>
        </div>
      </Link>
    );
  }));
}
