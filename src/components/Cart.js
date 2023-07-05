import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totoalprice);
  console.log(totalPrice);

  return (
    <section className='flex gap-10 border border-gray-400 px-44'>
      <div className='m-10 h-[75vh] w-2/3'>
        {cart.length > 0 ? (
          cart.map((item) => {
            return <CartItem key={item?.id} item={item} />;
          })
        ) : (
          <div className='h-full text-center text-3xl'>
            <h1 className='m-2 w-fit'>No Items in the cart</h1>
            <Link
              to='/'
              className='block w-fit  cursor-pointer rounded-lg bg-red-500 p-2 text-white'
            >
              See Restaurants Near You
            </Link>
          </div>
        )}
      </div>

      <div className='w-1/3'>
        <p className='mb-5 mt-10 w-full bg-gray-400 p-2 text-center text-3xl text-white'>
          Order Details
        </p>
        {cart.map((item) => {
          var totalPrice = totalPrice + (item.price / 100) * item.quantity;
          return (
            <div key={item.name} className='flex w-full px-5 py-2 align-middle'>
              <p className='w-9/12'>{`${item.name}    x     ${item.quantity}`}</p>
              <p className='w-1/12 text-center'> {`=`} </p>
              <p className='w-2/12 text-right'>{`₹${
                (item.price / 100) * item.quantity
              }`}</p>
            </div>
          );
        })}
        <hr className='m-auto w-[90%]' />
        <div className='flex w-full px-5 py-2 align-middle'>
          <p className='w-9/12'>Grand Total </p>
          <p className='w-1/12 text-center'> = </p>
          <p className='w-2/12 text-right'>{totalPrice}</p>
        </div>
        <button className='my-2 w-full rounded-lg bg-black p-2 text-center text-3xl text-white'>
          check Out
        </button>
      </div>
    </section>
  );
};
