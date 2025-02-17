import { Suspense, useEffect, useRef, useState } from 'react'
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
            clearTimeout(handler); // Cleanup on component unmount or when value changes
        };
    }, [value, delay]);

    return debouncedValue;
};

const Searchbar = () => {

    const [isSearching, setIsSearching] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    // console.log("isSearching:", isSearching, "searchTerm:", searchTerm);

    const [filteredProducts, setFilteredProducts] = useState([])
    const searchContainer = useRef(null)
    // console.log(search);
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.products || []);

    // Fetch all products on component mount
    useEffect(() => {
        if (allProducts.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, allProducts.length]);


    // Use debouncing to wait for user to stop typing before filtering
    const debouncedSearch = useDebounce(searchTerm, 500);
    // console.log('Debounced Search:', debouncedSearch);
    const handleSearchButtonClick = () => {
        setIsSearching(true);
        setTimeout(() => {
            document.getElementById("search-input")?.focus();
        }, 0);
    };

    // Handle the search query change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (!isSearching) setIsSearching(true);
    };

    // update Filtered products based on search query
    useEffect(() => {
        // Only update filtered products if the search term has changed
        if (debouncedSearch.trim() !== "") {
            const filtered = allProducts.filter(product =>
                product?.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [debouncedSearch, allProducts]); // Dependencies are debouncedSearch and allProducts



    const handleClickOutside = (e) => {
        if (!searchContainer.current) return;

        if (searchContainer.current.contains(e.target)
        ) {
            // console.log("Click inside search bar");
            return;
        }

        // console.log("Clicked outside! Closing search menu...");
        setIsSearching(false);
        setSearchTerm("");
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // console.log("Removing event listener");
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])



    return (
        <div className='relative' ref={searchContainer}>
            <Suspense fallback={<ColorRing visible={true} height="10" width="10" />} />

            {/* Search Icon */}
            {!isSearching && (
                <IoMdSearch
                    className="text-gray-500 cursor-pointer text-2xl"
                    // onClick={() => setIsSearching(true)}
                    onClick={handleSearchButtonClick}
                    data-testid="search-button"
                />
            )}

            {/* Search Input Field (Only Shows When Searching) */}
            {isSearching && (
                <div className="relative flex items-center border border-gray-300 rounded-full px-3 py-1 focus-within:border-primary transition-all w-[250px] sm:w-[300px]">
                    <input
                        id="search-button"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search"
                        className="w-full bg-transparent outline-none pl-2 pr-8 py-1 text-black"
                    />
                    <IoMdSearch
                        className="text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    />
                </div>
            )}

            {/* Search Results Dropdown */}
            {
                isSearching && searchTerm && (
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
                )
            }
        </div >
    );
};

export default Searchbar

