export default RestaurentCard = ({ resData }) => (
  <>
    {resData.map((restaurant) => (
      <div key={restaurant.data.data.id} className="restro-card">
        <img
          className="restro-logo"
          src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${restaurant.data.data.cloudinaryImageId}`}
          alt="Restaurant-img"
        />
        <h3>{restaurant.data.data.name}</h3>
        <p>{restaurant.data.data.cuisines.join(", ")}</p>
        <div className="restro-card-details">
          <span>{"⭐" + restaurant.data.data.avgRating}</span>.
          <span>₹{restaurant.data.data.costForTwo / 100}FOR TWO</span>.
          <span>{restaurant.data.data.deliveryTime}Mins</span>
        </div>
      </div>
    ))}
  </>
);
