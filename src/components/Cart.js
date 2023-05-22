import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totoalprice);
  console.log(totalPrice);

  return (
    <section className="border border-gray-400 flex gap-10 px-44">
      <div className="w-2/3 h-[75vh] m-10">
        {cart.length > 0 ? (
          cart.map((item) => {
            return <CartItem key={item?.id} item={item} />;
          })
        ) : (
          <div className="text-3xl text-center h-full">
            <h1 className="w-fit m-2">No Items in the cart</h1>
            <Link
              to="/"
              className="p-2 w-fit  block rounded-lg bg-red-500 text-white cursor-pointer"
            >
              See Restaurants Near You
            </Link>
          </div>
        )}
      </div>

      <div className="w-1/3">
        <p className="text-3xl bg-gray-400 text-white w-full text-center mt-10 mb-5 p-2">
          Order Details
        </p>
        {cart.map((item) => {
          var totalPrice = totalPrice + (item.price / 100) * item.quantity;
          return (
            <div key={item.name} className="flex align-middle w-full px-5 py-2">
              <p className="w-9/12">{`${item.name}    x     ${item.quantity}`}</p>
              <p className="w-1/12 text-center"> {`=`} </p>
              <p className="w-2/12 text-right">{`₹${
                (item.price / 100) * item.quantity
              }`}</p>
            </div>
          );
        })}
        <hr className="w-[90%] m-auto" />
        <div className="flex align-middle w-full px-5 py-2">
          <p className="w-9/12">Grand Total </p>
          <p className="w-1/12 text-center"> = </p>
          <p className="w-2/12 text-right">{totalPrice}</p>
        </div>
        <button className="text-3xl bg-black text-white w-full rounded-lg text-center my-2 p-2">
          check Out
        </button>
      </div>
    </section>
  );
};
