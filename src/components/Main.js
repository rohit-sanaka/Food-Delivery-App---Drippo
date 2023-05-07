import RestaurentCard from "./RestaurentCard";
import resData from "/data";
export default Main = () => {
  return (
    <main className="main">
      <div className="search-sort-filter-section">
        {/* <Search /> */}
        {/* <Sort /> */}
        {/* <Filter /> */}
        <h2>Search</h2>
        <h2>Sort</h2>
        <h2>Filter</h2>
      </div>
      <div className="restro-container">
        <RestaurentCard resData={resData} />
      </div>
    </main>
  );
};
