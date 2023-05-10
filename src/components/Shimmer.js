export default Shimmer = () => {
  // create an array with empty elements of 16 size
  return Array(10)
    .fill("")
    .map((ele, index) => {
      return (
        <div key={index}>
          <div className="mx-10 mt-5 pb-0 h-40 w-64 bg-gray-200"></div>
          <div className="mx-10 mt-5 h-5 w-64 bg-gray-200"></div>
          <div className="mx-10 mt-5 h-5 w-52 bg-gray-200"></div>
        </div>
      );
    });
};
