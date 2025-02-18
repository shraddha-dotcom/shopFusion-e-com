import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Wishlist from "../Wishlist";
import Cart from "../Cart"
import PropTypes from 'prop-types';

const ProductList = ({ products = [] }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Slice products based on the current page
    const startIndex = currentPage * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);



    return (

        <div className="container mx-auto p-4">
            <ul data-testid="product-list" className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <li
                            key={product.id}
                            data-testid="product-item"
                            className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 
                        rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2"
                        >
                            <Link to={`/product/${product.category?.toLowerCase().trim()}/${product.id}`} className="block">
                                <div className="relative overflow-hidden rounded-lg">
                                    <img
                                        src={product.images?.[1] || product.images?.[0] || "default-image.jpg"}
                                        alt={product.title || "Product Image"}
                                        className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 transform hover:scale-110"
                                        loading="lazy"
                                        data-testid="product-image"
                                    />
                                </div>

                                <div className="text-center mt-4">
                                    <h3
                                        data-testid="product-title"
                                        className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[200px] mx-auto"
                                    >
                                        {product.name || product.title || "Unnamed Product"}
                                    </h3>
                                    <p
                                        data-testid="product-price"
                                        className="text-indigo-600 font-bold text-lg mt-2"
                                    >
                                        ${product.price?.toFixed(2)}
                                    </p>
                                    <p
                                        data-testid="product-category"
                                        className="text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        {product.category || "Unknown Category"}
                                    </p>
                                    <div className="flex justify-center items-center mt-2">
                                        <span className="text-yellow-500 text-lg">
                                            {"★".repeat(Math.round(product.rating || 0))}
                                            {"☆".repeat(5 - Math.round(product.rating || 0))}
                                        </span>
                                        <p
                                            data-testid="product-rating"
                                            className="ml-2 text-gray-700 dark:text-gray-300"
                                        >
                                            ({product.rating ? product.rating.toFixed(1) : "No rating"} / 5)
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* Wishlist and Cart Buttons */}
                            <div className="flex justify-center space-x-4 mt-4" data-testid="wishlist-cart-button">
                                <Wishlist product={product} />
                                <Cart product={product} />
                            </div>
                        </li>
                    ))
                ) : (
                    <p data-testid="no-products-message" className="text-center text-gray-600">
                        No products found.
                    </p>
                )}
            </ul>

            {/* Pagination Buttons */}
            {totalPages > 1 && (
                <ReactPaginate
                    previousLabel={"← Prev"}
                    nextLabel={"Next →"}
                    pageCount={totalPages}
                    onPageChange={handlePageClick}
                    containerClassName={"flex justify-center mt-4 space-x-2"}
                    pageClassName={"px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"}
                    activeClassName={"bg-primary text-white"}
                    previousClassName={"px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"}
                    nextClassName={"px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"}
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                />
            )}
        </div>
    );
};

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string,
            title: PropTypes.string,
            price: PropTypes.number,
            category: PropTypes.string,
            images: PropTypes.arrayOf(PropTypes.string),
            rating: PropTypes.number,
        })
    ),
};


export default ProductList;
//         <div className="container mx-auto p-4">
//             <ul data-testid="product-list" className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
//                 {currentProducts.length > 0 ? (
//                     currentProducts.map((product) => (
//                         <li key={product.id} data-testid="product-item" className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
//                             <Link to={`/product/${product.category?.toLowerCase().trim()}/${product.id}`} className="block">
//                                 <div className="relative overflow-hidden rounded-lg">
//                                     <img
//                                         src={product.images?.[1] || product.images?.[0] || "default-image.jpg"}
//                                         alt={product.title || "Product Image"}
//                                         className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 transform hover:scale-110"
//                                         loading="lazy"
//                                         data-testid="product-image"
//                                     />
//                                 </div>

//                                 <div className="text-center mt-4">
//                                     <h3 data-testid="product-title" className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[200px] mx-auto">
//                                         {product.name || product.title || "Unnamed Product"}
//                                     </h3>
//                                     <p data-testid="product-price" className="text-indigo-600 font-bold text-lg mt-2">
//                                         ${product.price?.toFixed(2)}
//                                     </p>
//                                     <p data-testid="product-category" className="text-sm text-gray-600 dark:text-gray-400">
//                                         {product.category || "Unknown Category"}
//                                     </p>
//                                     <div className="flex justify-center items-center mt-2">
//                                         <span className="text-yellow-500 text-lg">
//                                             {"★".repeat(Math.round(product.rating || 0))}
//                                             {"☆".repeat(5 - Math.round(product.rating || 0))}
//                                         </span>
//                                         <p data-testid="product-rating" className="ml-2 text-gray-700 dark:text-gray-300">
//                                             ({product.rating ? product.rating.toFixed(1) : "No rating"} / 5)
//                                         </p>
//                                     </div>
//                                 </div>
//                             </Link>

//                             <div className="flex justify-center space-x-4 mt-4" data-testid="wishlist-cart-button">
//                                 <Wishlist product={product} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full hover:opacity-80 transition-all" />
//                                 <Cart product={product} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:opacity-80 transition-all" />
//                             </div>
//                         </li>
//                     ))
//                 ) : (
//                     <p data-testid="no-products-message" className="text-center text-gray-600">
//                         No products found.
//                     </p>
//                 )}
//             </ul>

//             {/* Pagination Buttons */}
//             {totalPages > 1 && (
//                 <ReactPaginate
//                     previousLabel={"← Prev"}
//                     nextLabel={"Next →"}
//                     pageCount={totalPages}
//                     onPageChange={handlePageClick}
//                     containerClassName={"flex justify-center mt-4 space-x-2"}
//                     pageClassName={"px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"}
//                     activeClassName={"bg-primary text-white"}
//                     previousClassName={"px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"}
//                     nextClassName={"px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"}
//                     disabledClassName={"opacity-50 cursor-not-allowed"}
//                 />
//             )}
//         </div>
//     );
// };

// ProductList.propTypes = {
//     products: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//             name: PropTypes.string,
//             title: PropTypes.string,
//             price: PropTypes.number,
//             category: PropTypes.string,
//             images: PropTypes.arrayOf(PropTypes.string),
//             rating: PropTypes.number,
//         })
//     ),
// };


