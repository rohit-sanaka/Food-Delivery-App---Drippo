import { FODD_ITEM_IMG_URL } from "../utils/constants";
import veg from "../../Images/veg.png";
import nonveg from "../../Images/nonveg.jpg";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodCard = ({ item }) => {
  const { name, price, isVeg, imageId, description } = item?.card?.info;
  const dispatch = useDispatch();
  const addToCart = () => {
    item.card.info.quantity = 1;
    dispatch(addItem(item?.card?.info));
    notify();
  };

  const notify = () =>
    toast.success("Item added to cart successfully...", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 800,
    });
  return (
    <div>
      <div className="food-card -z-0">
        <div className="m-2 flex justify-center p-5 align-middle ">
          <div className="w-10/12">
            {isVeg ? (
              <img className="h-5" src={veg} />
            ) : (
              <img className="h-5" src={nonveg} />
            )}
            <h2 className="text-lg font-semibold">{name}</h2>
            <p>{`₹${price / 100}`}</p>
            <br className="h-1" />
            <p>{description}</p>
          </div>
          <div className="w-2/12">
            {imageId && (
              <img
                className="m-auto h-28 w-32 rounded-lg"
                src={FODD_ITEM_IMG_URL + imageId}
                alt="Food Image"
              />
            )}
            <button
              className="m-auto block h-10 w-24 cursor-pointer rounded-md border border-gray-500 bg-white font-bold text-green-400 shadow-md"
              type="submit"
              onClick={() => {
                addToCart();
              }}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default FoodCard;
