import { useState } from "react";
import FoodCard from "./FoodCard";

const FoodAccordian = ({ item }) => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="accordion">
      <div className="accordion-item">
        <div
          className={`flex justify-between align-middle cursor-pointer bg-emerald-400 py-3 px-5 text-xl font-bold`}
          onClick={() => setIsActive(!isActive)}
        >
          <div className="">{item?.title}</div>
          <div>{isActive ? "^" : "V"}</div>
        </div>
        {isActive &&
          Array.isArray(item?.itemCards) &&
          item?.itemCards.map((item) => {
            return <FoodCard key={item?.card?.info?.id} item={item} />;
          })}
        {!isActive ? <div className="h-3 w-full bg-gray-300"></div> : <></>}
        <br />
      </div>
    </div>
  );
};

export default FoodAccordian;
