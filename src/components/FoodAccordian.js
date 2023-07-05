import { useState } from 'react';
import FoodCard from './FoodCard';
import { ToastContainer, Slide } from 'react-toastify';

const FoodAccordian = ({ item }) => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className='accordion'>
      <ToastContainer transition={Slide} />
      <div className='accordion-item'>
        <div
          className={`flex cursor-pointer justify-between bg-emerald-400 px-5 py-3 align-middle text-xl font-bold`}
          onClick={() => setIsActive(!isActive)}
        >
          <div className=''>{item?.title}</div>
          <div>{isActive ? '^' : 'V'}</div>
        </div>
        {isActive &&
          Array.isArray(item?.itemCards) &&
          item?.itemCards.map((item) => {
            return <FoodCard key={item?.card?.info?.id} item={item} />;
          })}
        {!isActive ? <div className='h-3 w-full bg-gray-300'></div> : <></>}
        <br />
      </div>
    </div>
  );
};

export default FoodAccordian;
