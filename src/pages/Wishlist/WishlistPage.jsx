import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, addToCart } from "../../redux/action";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);

    const handleMoveToCart = (product) => {
        dispatch(addToCart(product));
        dispatch(removeFromWishlist(product.id));
    };

    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen bg-orange-50" data-testid="wishlist">
            <h1 className="text-3xl font-bold text-center mb-6 mt-4 pt-24 text-gray-800">
                Your Wishlist ❤️
            </h1>

            {wishlist.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p className="text-lg" data-testid="empty-message">Your wishlist is empty.</p>
                    <Link to="/Home" className="text-blue-500 hover:underline text-lg">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="hidden md:block">
                        <table className="w-full text-center" data-testid="wishlist-table">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-lg">
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4">Add to Cart</th>
                                    <th className="p-4">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((product) => (
                                    <tr key={product.id} className="border-b last:border-none hover:bg-gray-50 transition"
                                        data-testid={`wishlist-item-${product.id}`}>
                                        <td className="p-4">
                                            <Link to={`/product/${product.id}`}>
                                                <img
                                                    src={product.images[0] || product.thumbnail}
                                                    alt={product.title}
                                                    className="w-20 h-20 object-cover rounded-md shadow-md"
                                                />
                                            </Link>
                                        </td>
                                        <td className="p-4 text-lg font-semibold">{product.title}</td>
                                        <td className="p-4 text-gray-600 text-lg">${product.price}</td>
                                        <td className="p-4 text-lg font-semibold">
                                            <span className={product?.stock > 0 ? "text-green-600" : "text-red-500"}>
                                                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </td>
                                        <td className="p-4 justify-center">
                                            <button
                                                onClick={() => handleMoveToCart(product)}
                                                className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-amber-400 transition"
                                            >
                                                Move to Cart
                                            </button>
                                        </td>
                                        <td className="p-4 justify-center">
                                            <button
                                                onClick={() => handleRemoveFromWishlist(product.id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 transition"
                                                data-testid={`remove-item-${product.id}`}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Responsive Card Layout */}
                    <div className="md:hidden flex flex-col gap-4">
                        {wishlist.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={product.images[0] || product.thumbnail}
                                        alt={product.title}
                                        className="w-32 h-32 object-cover rounded-md shadow-md"
                                    />
                                </Link>
                                <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
                                <p className="text-gray-600 text-lg">${product.price}</p>
                                <p className={product?.stock > 0 ? "text-green-600" : "text-red-500"}>
                                    {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                                </p>
                                <button
                                    onClick={() => handleMoveToCart(product)}
                                    className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-amber-400 transition w-full mt-2"
                                >
                                    Move to Cart
                                </button>
                                <button
                                    onClick={() => handleRemoveFromWishlist(product.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 transition w-full mt-2"
                                    data-testid={`remove-item-${product.id}`}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;


























