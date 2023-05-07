import { RESTRO_CDN } from "../utils/constants";

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
    } = restaurant.data.data;

    return (
      <div key={id} className="restro-card">
        <img
          className="restro-logo"
          src={RESTRO_CDN + cloudinaryImageId}
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
    );
  }));
}
