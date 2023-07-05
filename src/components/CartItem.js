import { FODD_ITEM_IMG_URL } from '../utils/constants';
import veg from '../../Images/veg.png';
import nonveg from '../../Images/nonveg.jpg';
import { useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../utils/cartSlice';

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
    <div className='relative border border-gray-100'>
      <div className='flex p-5 '>
        <div className='my-auto mr-auto'>
          {isVeg ? (
            <img className='h-5' src={veg} />
          ) : (
            <img className='h-5' src={nonveg} />
          )}
          <h2 className='text-lg font-bold'>{name}</h2>
          <p className='text-base font-semibold'>{`Price : ₹${price / 100}`}</p>
          <p className='text-base font-semibold'>{`Total : ₹${
            (price / 100) * quantity
          }`}</p>
        </div>
        <div>
          <img
            className='h-24 w-32 rounded-xl'
            src={FODD_ITEM_IMG_URL + imageId}
            alt='Food Image'
          />
        </div>
      </div>
      <div className='absolute bottom-1 right-7 flex h-10 w-28 justify-between border border-gray-500 bg-white align-middle shadow-md'>
        <button
          className='w-1/3 bg-gray-100'
          type='submit'
          onClick={() => RemoveFromCart()}
        >
          -
        </button>
        <h1 className='p-2'>{quantity}</h1>

        <button
          className='w-1/3 bg-gray-100'
          type='submit'
          onClick={() => addToCart()}
        >
          +
        </button>
      </div>
    </div>
  );
};
export default CartItem;
