import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "../components/DarkMode";
import Searchbar from "./NavbarComponents/Searchbar";
import logo from "../assets/images/logoimage.png";
import Profile from "./NavbarComponents/Profile";


const Menu = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Home Decor", link: "/HomeDecor" },
    { id: 3, name: "Men", link: "/Men" },
    { id: 4, name: "Women", link: "/Women" },
    { id: 5, name: "Kids", link: "/Kids" },
    { id: 6, name: "Electronics", link: "/Electronics" },
];

const Navbar = () => {
    // const user = JSON.parse(localStorage.getItem("user"));

    const [menuOpen, setMenuOpen] = useState(false);
    const cart = useSelector((state) => state.cart || []);
    // console.log("Cart State in Navbar:", cart);
    const wishlist = useSelector((state) => state.wishlist || [])
    const wishlistItems = wishlist.reduce((total, product) => total + product.quantity, 0)
    console.log("wishlist item", wishlist)

    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
    // console.log("Total Items in Cart:", totalItems);



    const toggleMenu = () => setMenuOpen((prev) => !prev);


    return (
        <nav data-testid="navbar"
            className="shadow-md bg-white dark:bg-gray-900 dark:text-white transition-all duration-300 fixed w-full z-50">


            {/* Upper Navbar */}
            <div className="bg-primary/40 py-3 px-6 md:px-10 flex justify-between items-center ">
                <div className="container flex justify-between items-center">

                    <Link to="/"
                        className="font-bold text-xl sm:text-2xl flex items-center gap-2"
                        aria-label="Homepage">
                        <img src={logo} alt="Logo" className="w-14 sm:w-16" data-testid="logo" />
                        <span className="hidden sm:block">ShopFusion</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        {/* search button */}

                        <Searchbar data-testid="search-button" />
                        {/* profile */}
                        <Profile
                            isOpen={menuOpen === "profile"}
                            toggle={() => toggleMenu("profile")}
                            className="text-2xl cursor-pointer"
                            data-testid="profile-button"
                        />
                        {/* wishlist icon */}
                        <Link to="/wishlist-page">
                            <button
                                className="hidden lg:block text-red-500 hover:text-red-700 transition size-6 relative"
                                data-testid="wishlist-button"
                            >
                                <FaHeart size={22} />
                                {wishlistItems > 0 && (
                                    <span className="absolute top-0 right-0 text-white font-semibold text-s h-2 w-2 flex items-center justify-center">
                                        {wishlistItems}
                                    </span>
                                )}
                            </button>
                        </Link>

                        {/* shopping cart */}
                        <Link to="/cart-page">
                            <button
                                className="hidden lg:flex bg-gradient-to-r from-primary to-secondary
                                     text-white py-1 px-4 rounded-full items-center"
                                data-testid="cart-button"
                            >
                                <FaCartShopping />
                                {totalItems > 0 && <span data-testid="cart-badge">{totalItems}</span>}

                            </button>
                        </Link>
                        {/* dark mode */}
                        <div className="hidden lg:block">
                            <DarkMode />
                        </div>
                        {/* mobile menu button */}
                        <button className="sm:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)} data-testid="menu-button">
                            {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
                        </button>

                    </div>
                </div>
            </div>

            {/* Lower Navbar (desktop)*/}
            <div className="hidden sm:flex justify-centerr items-center bg-gray-100 dark:bg-gray-200 py-2" data-testid="navbar-desktop">
                <ul className="flex gap-6 font-medium">
                    {Menu.map((data) => (
                        <li key={data.id}>
                            <Link to={data.link}
                                className="px-4 text-gray-700 hover:text-primary transition duration-200">
                                {data.name}
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>

            {/* Mobile Menu overlay */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 
                 background-blur-md flex justify-center items-center"
                    data-testid="navbar-mobile">
                    <div className="bg-white dark:bg-gray-900 w-11/12 max-w-sm rounded-lg p-6 shadow-lg">
                        <button
                            className="absolute top-8 right-8 text-gray-600 dark:text-gray-300 text-2xl"
                            onClick={() => setMenuOpen(false)}
                            data-testid="close-button"
                        >
                            <FaTimes />
                        </button>

                        <ul className="flex flex-col mt-4 gap-6 text-lg">
                            {Menu.map((data) => (
                                <li key={data.id}>
                                    <Link
                                        to={data.link}
                                        className="block text-gray-800 dark:text-gray-200
                                     hover:text-primary text-center"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {data.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

