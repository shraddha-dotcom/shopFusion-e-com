import { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { fetchAllProducts } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';


// Debounce function to delay API calls while typing
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Searchbar = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const allProducts = useSelector((state) => state.AllProducts || []);
    // console.log("allproducts", allProducts)
    // const [filteredProducts, setFilteredProducts] = useState([]);
    // console.log("Filtered Products:", filteredProducts);

    const searchContainer = useRef(null);
    const dispatch = useDispatch();



    useEffect(() => {
        if (allProducts.length === 0) {
            dispatch(fetchAllProducts()); // Fetch all products initially
        }
    }, [dispatch, allProducts.length]);

    // Debounce search term to avoid excessive API calls
    const debouncedSearch = useDebounce(searchTerm, 500);

    // Update filtered products locally when search term changes
    const filteredProducts = useMemo(() => {
        if (!debouncedSearch.trim()) return [];
        return allProducts.filter(product =>
            product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [debouncedSearch, allProducts]);


    const handleSearchButtonClick = () => {
        setIsSearching(true);
        setTimeout(() => {
            document.getElementById("search-input")?.focus();
        }, 0);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (!isSearching) setIsSearching(true);
    };

    const handleClickOutside = (e) => {
        if (!searchContainer.current) return;
        if (searchContainer.current.contains(e.target)) return;

        setIsSearching(false);
        setSearchTerm("");
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={searchContainer}>
            <Suspense fallback={<ColorRing visible={true} height="10" width="10" />} />

            {/* Search Icon */}
            {!isSearching && (
                <IoMdSearch
                    className="text-gray-500 cursor-pointer text-2xl"
                    onClick={handleSearchButtonClick}
                    data-testid="search-button"
                />
            )}

            {/* Search Input Field */}
            {isSearching && (
                <div className="relative flex items-center border border-gray-300 rounded-full px-3 py-1 focus-within:border-primary transition-all w-[250px] sm:w-[300px]">
                    <input
                        id="search-input"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search"
                        className="w-full bg-transparent outline-none pl-2 pr-8 py-1 text-black"
                    />
                    <IoMdSearch className="text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
            )}

            {/* Search Results Dropdown */}
            {isSearching && searchTerm && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg mt-1 rounded-lg z-50">
                    {filteredProducts.length > 0 ? (
                        <ul className="max-h-60 overflow-y-auto" data-testid="search-menu">
                            {filteredProducts.map((product, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200 text-black"
                                    onClick={() => {
                                        setSearchTerm(product.title);
                                        setIsSearching(false);
                                    }}
                                >
                                    <Link to={`/product/${product.category}/${product.id}`}>
                                        {product.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-2 text-gray-500">No products found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Searchbar;



