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
    } = restaurant?.data;
    return (
      <Link className="restro-card" key={id} to={`/restaurant/${id}`}>
        <div>
          <img
            className="restro-logo"
            src={RESTRO_IMG_CDN + cloudinaryImageId}
            alt="Restaurant-img"
          />
          <h3>{name}</h3>
          <p>{cuisines?.join(", ")}</p>
          <div className="restro-card-details">
            <span>{"⭐" + avgRating}</span>.
            <span>₹{costForTwo / 100} FOR TWO</span>.
            <span>{deliveryTime}Mins</span>
          </div>
        </div>
      </Link>
    );
  }));
}
