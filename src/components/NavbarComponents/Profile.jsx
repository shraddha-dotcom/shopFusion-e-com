import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaCartShopping } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import DarkMode from "../DarkMode";


const Profile = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();



    useEffect(() => {
        const userData = Cookies.get("user")
        if (userData) {
            setUser({ name: userData });
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const logout = () => {
        Cookies.remove("user");
        setUser(null);
        setIsUserLoggedIn(false);
        setMenuOpen(false);
        navigate("/login")
    };
    const UpperMenu = [
        { label: "Dark Mode", icon: <DarkMode />, link: "/#" },
        { label: "Profile", icon: <FaRegUserCircle />, link: "/Home" },
        { label: "Your Cart", icon: <FaCartShopping />, link: "/cart-page" },
        { label: "your Wishlist", icon: <FaHeart />, link: "/wishlist-page" },
        { label: "Account Settings", icon: <FiSettings />, link: "#" },
    ];


    return (
        <div className="relative">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label="Profile menu"
                className="rounded-full text-3xl text-gray-500 hover:text-amber-500 transition"
                data-testid="profile-button"
            >
                <FaRegUserCircle />
            </button>


            {menuOpen && (
                <div
                    ref={menuRef}
                    className="absolute text-base top-12 right-0 bg-white shadow-lg rounded-lg z-10 w-72 "
                    role="menu"
                >
                    <div className="p-5">
                        {isUserLoggedIn && user && (
                            <p className="mb-4 text-base text-gray-800 font-semibold">
                                Hello,{" "}
                                <span data-testid="user-name" className="text-red-500">
                                    {user.name}
                                </span>
                            </p>
                        )}
                        <ul data-testid="profile-menu">
                            {UpperMenu.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center mb-4  text-gray-700 hover:text-amber-500 transition"
                                >
                                    <span className="mr-3 text-xl">{item.icon}</span>
                                    <Link to={item.link} onClick={() => setMenuOpen(false)}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div>
                            {isUserLoggedIn ? (


                                <button
                                    data-testid="logout-button"
                                    onClick={logout}
                                    className=" text-white font-medium rounded-lg block w-full p-3 bg-red-500  hover:bg-red-300 transition"
                                >
                                    <IoMdLogOut className="inline-block mr-2" />
                                    Logout
                                </button>

                            ) : (
                                <div className="flex items-center justify-between">
                                    <button className="block me-2 p-2 w-1/2 text-center text-white bg-primary rounded-lg hover:bg-amber-500 transition">
                                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                                            Login
                                        </Link>
                                    </button>
                                    <button className="block p-2 w-1/2 text-center text-orange-500 border border-orange-500 rounded-lg hover:bg-gray-300 transition">
                                        <Link to="/signup" onClick={() => setMenuOpen(false)}>
                                            Sign Up
                                        </Link>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Profile;
