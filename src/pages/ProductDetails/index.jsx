
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CartButton from '../Cart';
import WishlistButton from '../Wishlist';
import { FaStar } from 'react-icons/fa';
import { fetchAllProducts } from '../../redux/action';
import { useEffect } from 'react';


const ProductDetails = () => {
  const { id, category } = useParams();
  // console.log("Category:", category);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.AllProducts || [])

  // Fetch products if not loaded
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);  // Prevent infinite loops by checking .length

  // Find the product after products are loaded
  const product = products.length > 0
    ? products.find((item) => item.id.toString() === id)
    : null;  // Prevents search on an empty array

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl font-semibold">
          {products.length === 0 ? "Loading product details..." : "Product not found."}
        </p>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-10 bg-gradient-to-r from-orange-100 to-orange-200 min-h-screen mt-20">
      <div className="flex flex-col md:flex-row bg-orange-50 shadow-lg rounded-lg m-6 overflow-hidden">
        {/* Left Side - Product Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-orange-50 p-6">
          <img
            src={product?.images?.[0] || product?.thumbnail}
            alt={product?.title}
            className="w-80 h-80 md:w-96 md:h-96 object-contain rounded-lg shadow-md border border-gray-200"
          />
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full md:w-1/2 px-6 py-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4" data-testid="title">{product?.title}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-2" data-testid="price">${product?.price}</p>
          <p className="text-gray-600 text-lg mb-2">Category: {category}</p>

          {/* Rating Section */}
          <div className="flex items-center gap-1 mb-3">
            <FaStar className="text-yellow-400 size-4" />
            <span className="text-gray-600 text-lg">{product?.rating || "No Ratings"}</span>
          </div>

          {/* Availability Status */}
          <p className={`mb-4 text-lg font-semibold ${product?.stock > 0 ? "text-green-600" : "text-red-500"}`} data-testid="stock">
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Description (Multiline Support) */}
          <p className="text-gray-500 text-lg mb-6 whitespace-pre-wrap leading-relaxed" data-testid="description">
            {product?.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3" data-testid="cart-wishlist-button">
            <CartButton product={product} />
            <WishlistButton product={product} />
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-400 transition font-semibold shadow-md">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-gradient-to-r from-orange-100 to-orange-200 shadow-lg rounded-lg p-6 m-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
        {product?.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              <p className="text-lg font-semibold">{review.name}</p>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                ))}
                <span className="text-gray-600 text-sm">({review.rating} / 5)</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <p>{product.reviewerName}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;



