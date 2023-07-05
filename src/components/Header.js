import { NavLink, Link } from 'react-router-dom';

import favicon from '../../Images/logo/favicon.png';
import { useSelector } from 'react-redux';

export default Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <header className='sticky top-0 z-10 flex h-20 items-center justify-between bg-white px-44 shadow-md'>
      <Link to='/' className='inline-flex h-full items-center'>
        <img src={favicon} className='h-full' alt='logo' />
        <h1 className='inline h-auto text-4xl font-bold italic text-red-500'>
          ZORRO
        </h1>
      </Link>
      <nav className='flex gap-10 text-2xl'>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? 'text-red-500'
              : 'hover:text-red-300 focus:outline-red-500';
          }}
          to='.'
          end
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive
              ? 'text-red-500'
              : 'hover:text-red-300 focus:outline-red-500';
          }}
          to='offers'
        >
          Offers
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive
              ? 'text-red-500'
              : 'hover:text-red-300 focus:outline-red-500';
          }}
          to='help'
        >
          Help
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive
              ? 'text-red-500'
              : 'hover:text-red-300 focus:outline-red-500';
          }}
          to='profile'
        >
          Profile
        </NavLink>

        <NavLink
          noofitems={cartItems.length}
          className={({ isActive }) => {
            return `relative before:absolute before:-right-5 before:-top-5 before:h-8 before:w-8  before:rounded-full before:bg-red-500 before:text-center before:text-white before:content-[attr(noofitems)]
              ${
                isActive
                  ? 'text-red-500'
                  : 'hover:text-red-300 focus:outline-red-500'
              } `;
          }}
          to='cart'
        >
          Cart
        </NavLink>
      </nav>
    </header>
  );
};
