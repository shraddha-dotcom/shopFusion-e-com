import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import PropTypes from "prop-types";

const FilterProducts = ({ allProducts }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});
    const [initialProducts, setInitialProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const flattenProducts = (productsData = {}) => {
        if (!productsData || typeof productsData !== "object") {
            return [];
        }

        return Object.entries(productsData).reduce((acc, [category, data]) => {
            const products = data?.products || [];
            return acc.concat(products);
        }, []);
    };

    useEffect(() => {
        const flattened = Array.isArray(allProducts) ? allProducts : flattenProducts(allProducts);
        setFilteredProducts(flattened);
        setInitialProducts(flattened);
    }, [allProducts]);

    const isCategorySelected = Object.keys(selectedCategories).length > 0;
    const isSizeSelected = Object.keys(selectedSizes).length > 0;

    let filteredByCategory = isCategorySelected
        ? filteredProducts.filter((product) => selectedCategories[product.category])
        : filteredProducts;

    let filteredBySize = isSizeSelected
        ? filteredByCategory.filter((product) => selectedSizes[product.size])
        : filteredByCategory;

    const handleSortByPrice = (order) => {
        setFilteredProducts((prevProducts) =>
            [...prevProducts].sort((a, b) => (order === "asc" ? a.price - b.price : b.price - a.price))
        );
    };

    const handleSortByRating = () => {
        setFilteredProducts((prevProducts) => [...prevProducts].sort((a, b) => b.rating - a.rating));
    };

    const handleResetFilters = () => {
        setFilteredProducts(initialProducts);
        setSelectedCategories({});
        setSelectedSizes({});
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
    };


    return (
        <div className="relative w-full">
            <div className="flex justify-end px-4 py-4">
                <button
                    onClick={() => setShowFilters(true)}
                    className="bg-primary text-white px-6 py-2 rounded-full shadow-lg hover:bg-amber-500 transition mt-10"
                    data-testid="apply-filter-btn"
                >
                    Apply Filter
                </button>
            </div>

            {showFilters && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        data-testid="filter-sidebar"
                        onClick={() => setShowFilters(false)}></div>
                    <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 p-6 transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Filters</h2>
                            <button onClick={() => setShowFilters(false)} className="text-red-500 font-semibold border-2 rounded-md border-red-500 px-3">
                                Close
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            <button onClick={() => handleSortByPrice("asc")}
                                data-testid="sort-price-asc"
                                className="w-full bg-orange-200 px-4 py-2 rounded-lg hover:bg-orange-300">
                                Price: Low to High
                            </button>
                            <button onClick={() => handleSortByPrice("desc")} className="w-full bg-orange-200 px-4 py-2 rounded-lg hover:bg-orange-300">
                                Price: High to Low
                            </button>
                            <button onClick={handleSortByRating}
                                data-testid="sort-by-rating"
                                className="w-full bg-lime-200 px-4 py-2 rounded-lg hover:bg-lime-300">
                                Sort by Rating
                            </button>
                            <button onClick={handleResetFilters}
                                data-testid="clear-filters"
                                className="w-full bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
                                Clear Filters
                            </button>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-3">Filter by Category:</h3>
                            <div className="space-y-2">
                                {Array.isArray(allProducts) ? (
                                    [...new Set(allProducts.map((product) => product.category))].map((category) => (
                                        <label key={category} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleCategoryChange(category)}
                                                checked={selectedCategories[category] || false}
                                                className="h-5 w-5 text-blue-500"
                                                data-testid={`category-checkbox-${category}`}
                                            />
                                            <span className="ml-3 text-gray-700">{category}</span>
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No categories available</p>
                                )}
                            </div>
                        </div>

                    </div>
                </>
            )}

            <div className="grid gap-8 mt-12" data-testid="filtered-product-list">
                {filteredBySize.length > 0 ? (
                    <ProductList products={filteredBySize} />
                ) : (
                    <div data-testid="no-products-message">No products found</div>
                )}
            </div>


        </div>
    );
};

FilterProducts.propTypes = {
    allProducts: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                category: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                rating: PropTypes.number,
            })
        ),
        PropTypes.object, // In case products are stored as objects 
    ]).isRequired,
};

export default FilterProducts;

