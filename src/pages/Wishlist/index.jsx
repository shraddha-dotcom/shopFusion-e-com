import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist, addToWishlist } from '../../redux/action';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const WishlistButton = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist); // Get wishlist from Redux store
  const [notification, setNotification] = useState(null);
  const isUserLoggedIn = Cookies.get("user");

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleWishlist = () => {
    if (!isUserLoggedIn) {
      showNotification("Please login to add items to wishlist");
      return;
    }

    if (wishlist.some((item) => item.id === product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="">
      {notification && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md animate-fadeIn">
          {notification}
        </div>
      )}

      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 text-xl"
      >
        {wishlist.some((item) => item.id === product.id) ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-red-500 transition" />
        )}
      </button>


    </div>
  );
};

WishlistButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string, // Assuming the product has a name
    price: PropTypes.number, // Assuming price is optional
  }).isRequired,
};

export default WishlistButton;





