import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getElectronicProducts } from "../../redux/action";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const TopSale = () => {
    const dispatch = useDispatch();
    const electronicProducts = useSelector(state => state.products || []);
    const [trendingProducts, setTrendingProducts] = useState([]);

    useEffect(() => {
        dispatch(getElectronicProducts());
    }, [dispatch]);

    // Update state when products are fetched
    useEffect(() => {
        if (electronicProducts.length > 0) {
            setTrendingProducts(electronicProducts.slice(0, 12)); // Get only 12 products
        }
    }, [electronicProducts]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 data-aos="fade-up" className="text-4xl font-bold text-center mb-8">
                Top Selling Products
            </h1>

            {trendingProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 
                    md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {trendingProducts.map((product) => (
                        <div key={product.id}
                            data-aos="fade-up"
                            data-aos-delay={product.aosDelay}
                            className="flex flex-col items-center 
                                border p-4 rounded-2xl shadow-xl
                                dark:bg-black hover:bg-gray-200 dark:hover:bg-primary
                                hover:text-white relative duration-300 group max-w-[300px]">
                            <Link to={`/product/${product.category}/${product.id}`} className="w-full">
                                <div className="w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    <img
                                        src={product.images?.[0] || product.thumbnail}
                                        alt={product.title}
                                        className="w-full h-full object-contain transform group-hover:scale-105 transition duration-200"
                                        loading="lazy"
                                    />
                                </div>
                            </Link>
                            <h3 className="text-center text-sm font-semibold mt-3 dark:text-white">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                Price: <span className="font-medium text-black dark:text-white">${product.price}</span>
                            </p>
                            <div className="flex gap-1 items-center mt-1">
                                <FaStar className="text-yellow-400 size-4" />
                                <span className="text-gray-500 dark:text-white text-sm">
                                    {product.rating}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </div>
    );
};

export default TopSale;
