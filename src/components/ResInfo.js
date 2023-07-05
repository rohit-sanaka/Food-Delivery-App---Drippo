const RestaurantInfo = ({ info }) => {
  const {
    id,
    name,
    cuisines,
    avgRating,
    costForTwo,
    totalRatingsString,
    locality,
  } = info;
  return (
    <div className=' px-96 pt-12'>
      <div className='flex'>
        <div className='mr-auto'>
          <h1 className='text-xl font-semibold '>{name}</h1>
          <h2 className='text-lg text-gray-500'>{cuisines?.join(', ')}</h2>
          <h1 className='text-base  text-gray-500'>{locality}</h1>
        </div>
        <div className='flex w-20 flex-col justify-center gap-2 rounded border border-solid border-gray-400 text-center'>
          <h1
            className={`${
              avgRating >= 4
                ? 'before:text-green-600x font-[icomoon] text-green-600'
                : 'text-orange-400'
            } w-full font-bold `}
          >
            ⭐{avgRating}
          </h1>
          <hr className='mx-auto w-2/3 border-gray-400 text-center' />
          <h1 className='text-xs font-semibold text-gray-400'>
            {totalRatingsString}
          </h1>
        </div>
      </div>
      <br />
      <hr className='border-2 border-dashed border-gray-400' />
    </div>
  );
};
export default RestaurantInfo;
