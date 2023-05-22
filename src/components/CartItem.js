import { FODD_ITEM_IMG_URL } from "../utils/constants";
import veg from "../../Images/veg.png";
import nonveg from "../../Images/nonveg.jpg";
import { useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";

const CartItem = ({ item }) => {
  const { name, price, isVeg, imageId, description, quantity } = item;

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItem(item));
  };
  const RemoveFromCart = () => {
    dispatch(removeItem(item));
  };
  return (
    <div className="relative border border-gray-100">
      <div className="flex p-5 ">
        <div className="mr-auto my-auto">
          {isVeg ? (
            <img className="h-5" src={veg} />
          ) : (
            <img className="h-5" src={nonveg} />
          )}
          <h2 className="font-bold text-lg">{name}</h2>
          <p className="font-semibold text-base">{`Price : ₹${price / 100}`}</p>
          <p className="font-semibold text-base">{`Total : ₹${
            (price / 100) * quantity
          }`}</p>
        </div>
        <div>
          <img
            className="w-32 h-24 rounded-xl"
            src={FODD_ITEM_IMG_URL + imageId}
            alt="Food Image"
          />
        </div>
      </div>
      <div className="w-28 h-10 bg-white border-gray-500 border shadow-md absolute bottom-1 right-7 flex justify-between align-middle">
        <button
          className="bg-gray-100 w-1/3"
          type="submit"
          onClick={() => RemoveFromCart()}
        >
          -
        </button>
        <h1 className="p-2">{quantity}</h1>

        <button
          className="bg-gray-100 w-1/3"
          type="submit"
          onClick={() => addToCart()}
        >
          +
        </button>
      </div>
    </div>
  );
};
export default CartItem;
