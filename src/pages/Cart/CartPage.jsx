
import { useDispatch, useSelector } from 'react-redux';
import { removeAllfromcart } from '../../redux/action';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import CartButton from '.';

const CartPage = () => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart || []);
    // console.log("Cart State:", cart); 


    const handleRemoveFromCart = (productId) => {
        dispatch(removeAllfromcart(productId));
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (


        <div className="container mx-auto px-4 py-8 min-h-screen bg-orange-50">
            <h1 className="text-3xl font-bold text-center mb-6 mt-4 pt-24">Your Shopping Cart</h1>

            {cart?.length > 0 ? (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="hidden md:block">
                        <table className="w-full text-center" data-testid="cart-table">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-lg">
                                    <th className="p-3 text-left">Image</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Price</th>
                                    <th className="p-3 text-left">Quantity</th>
                                    <th className="p-3 text-left">Total</th>
                                    <th className="p-3 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product) => (
                                    <tr key={product.id} className="border-b last:border-none">
                                        <td className="p-3">
                                            <img
                                                src={product?.images?.[0] || product?.thumbnail}
                                                alt={product?.title}
                                                className="w-20 h-20 object-cover rounded-md shadow-md"
                                            />
                                        </td>
                                        <td className="p-3 text-left text-lg font-semibold" data-testid="cart-item-1">{product?.title}</td>
                                        <td className="p-3 text-left text-lg text-gray-600" data-testid="cart-itme-2">${product?.price}</td>
                                        <td className="p-3 text-left">
                                            <CartButton product={product} />
                                        </td>
                                        <td className="p-3 text-lg font-semibold">${(product.price * product.quantity).toFixed(2)}</td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleRemoveFromCart(product.id)}
                                                className="text-red-500 text-xl hover:text-red-700 transition"
                                                data-testid={`remove-btn-${product.id}`}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Responsive Card Layout */}
                    <div className="md:hidden flex flex-col gap-4">
                        {cart.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                                <img
                                    src={product?.images?.[0] || product?.thumbnail}
                                    alt={product?.title}
                                    className="w-32 h-32 object-cover rounded-md shadow-md"
                                />
                                <h2 className="mt-2 text-lg font-semibold">{product?.title}</h2>
                                <p className="text-gray-600 text-lg">${product?.price}</p>
                                <p className="text-lg font-semibold">Total: ${(product.price * product.quantity).toFixed(2)}</p>
                                <CartButton product={product} />
                                <button
                                    onClick={() => handleRemoveFromCart(product.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-500 transition w-full mt-2"
                                    data-testid={`remove-btn-${product.id}`}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Total Price Section */}
                    <div className="mt-6 flex justify-end">
                        <h2 className="text-2xl font-bold bg-gray-100 px-6 py-3 rounded-lg shadow-md">
                            Total: ${totalPrice.toFixed(2)}
                        </h2>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-2xl mb-5" data-testid="Empty-message">
                        Your cart is empty
                    </p>
                    <div className="flex gap-2 justify-center">
                        <Link
                            to="/"
                            className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition"
                        >
                            Continue Shopping
                        </Link>
                        <button className="bg-primary text-white px-6 py-2 rounded shadow hover:bg-amber-400 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
