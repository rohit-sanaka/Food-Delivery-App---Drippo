import FoodAccordian from "./FoodAccordian";

const MenuItems = ({ items }) => {
  return (
    <div className=" px-96 pt-6">
      {Array.isArray(items) &&
        items.map((item) => {
          return <FoodAccordian key={item?.title} item={item} />;
        })}
    </div>
  );
};
export default MenuItems;
