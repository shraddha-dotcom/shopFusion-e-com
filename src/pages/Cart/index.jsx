import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';
import { addToCart, removeFromCart, updateQuantity } from '../../redux/action';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import PropTypes from 'prop-types';

const CartButton = ({ product }) => {
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart || []);
  const isUserLoggedIn = Cookies.get("user");
  const location = useLocation();

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const cartItem = product ? cart.find((item) => item.id === product.id) : null;

  const handleAddToCart = () => {
    if (!isUserLoggedIn) {
      showNotification("Please login to add items to the cart.");
      return;
    }
    dispatch(addToCart(product));
  };

  const handleIncreaseQuantity = () => {

    if (!cartItem) return; // Prevent error if product isn't found
    dispatch(addToCart(product));
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(updateQuantity(product.id, cartItem.quantity - 1))
    } else {
      dispatch(removeFromCart(product.id))
    }


  };

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow">
          {notification}
        </div>
      )}

      {/* Show 'Add to Cart' button if product is not in cart */}
      {!cartItem ? (

        <button
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>


      ) : (
        /* If product is in cart, show quantity controls */
        <div className="flex items-center gap-2">
          {/* Decrement button */}
          <button className="text-black text-3xl hover:text-gray-600 transition-all" onClick={handleDecreaseQuantity}>
            <CiSquareMinus data-testid="CiSquareMinus" />
          </button>

          {/* Display quantity */}
          <span className="px-2 text-2xl">{cartItem.quantity}</span>

          {/* Increment button */}
          <button className="text-black text-3xl hover:text-gray-600 transition-all" onClick={handleIncreaseQuantity}>
            <CiSquarePlus data-testid="CiSquarePlus" />
          </button>

          {/* "Go to Cart" Button */}

          {location.pathname !== "/cart-page" && (
            <Link
              to="/cart-page"
              className="bg-primary text-sm text-white p-1 rounded-md hover:bg-orange-400 transition-all"
            >
              Go to Cart
            </Link>
          )}

        </div>

      )}
    </div>
  );
};
CartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number,
  }).isRequired,
};


export default CartButton;


