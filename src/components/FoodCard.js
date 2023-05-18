import { FODD_ITEM_IMG_URL } from "../utils/constants";
import veg from "../../Images/veg.png";
import nonveg from "../../Images/nonveg.jpg";
import { useDispatch } from "react-redux";
import cartSlice, { addItem } from "../utils/cartSlice";

const FoodCard = ({ item }) => {
  const { name, price, isVeg, imageId, description } = item?.card?.info;
  console.log(item);

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItem(item?.card?.info));
  };
  return (
    <div>
      <div className="food-card relative -z-0">
        <div className="flex my-5 py-5 px-5 ">
          <div className="mr-auto my-auto">
            {isVeg ? (
              <img className="h-5" src={veg} />
            ) : (
              <img className="h-5" src={nonveg} />
            )}
            <h2 className="font-semibold text-lg">{name}</h2>
            <p>{`₹${price / 100}`}</p>
            <br className="h-1" />
            <p>{description}</p>
          </div>
          <div>
            <img
              className="w-28 h-24 rounded-xl"
              src={FODD_ITEM_IMG_URL + imageId}
              alt="Food Image"
            />
          </div>
        </div>
        <button
          className="w-24 h-10 bg-white border-gray-500 border shadow-md cursor-pointer text-green-400 rounded-lg absolute bottom-7 right-7"
          type="submit"
          onClick={() => addToCart()}
        >
          ADD
        </button>
      </div>
    </div>
  );
};
export default FoodCard;
