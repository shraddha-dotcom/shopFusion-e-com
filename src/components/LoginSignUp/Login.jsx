import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const users = useSelector((state) => state.user);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regex.test(email)) {
            setEmailError("Please enter a valid email.");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!regex.test(password)) {
            setPasswordError("Password must be at least 8 characters with uppercase, lowercase, and a number.");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");  // Reset general form error

        if (!validateEmail(email) || !validatePassword(password)) {
            toast.error("Please fix the errors before submitting.", { position: "top-right", autoClose: 3000 });
            return;
        }

        const user = users.find((user) => user.email === email);
        if (!user) {
            setFormError("This email is not registered. Please sign up.");
            toast.error("This email is not registered. Please create an account first.", { position: "top-right", autoClose: 3000 });
            return;
        }

        if (user.password !== password) {
            setFormError("Invalid password.");
            toast.error("Invalid password...", { position: "top-right", autoClose: 3000 });
            return;
        }
        // Successful login
        Cookies.set("user", user.fullName, { expires: 7 });

        toast.success("Successfully Logged In", { position: "top-right", autoClose: 3000 });

        setEmail("");
        setPassword("");

        setTimeout(() => navigate("/Home"), 0);
    };


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-300 via-red-300 to-yellow-200 px-4'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center'>
                <h1 className='text-2xl font-bold text-gray-800'>Welcome Back</h1>
                <p className='text-gray-600'>Login To Access Your Account</p>
                <div className='w-16 h-1 bg-indigo-500 mx-auto my-4 rounded-full'></div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex items-center bg-gray-100 rounded-md px-4 py-3'>
                        <MdOutlineEmail className='text-gray-500' />
                        <input
                            type='text'
                            id='email'
                            placeholder='Enter Email'
                            className='bg-transparent flex-1 outline-none ml-3 text-gray-700'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {emailError && <p className='text-red-500 text-xs'>{emailError}</p>}

                    <div className='flex items-center bg-gray-100 rounded-md px-4 py-3'>
                        <RiLockPasswordLine className='text-gray-500' />
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle password visibility
                            id='password'
                            placeholder='Enter Password'
                            className='bg-transparent flex-1 outline-none ml-3 text-gray-700'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={handleShowPassword} className="ml-2 text-gray-500">
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>
                    {passwordError && <p className='text-red-500 text-xs'>{passwordError}</p>}

                    {formError && <p className='text-red-500 text-sm'>{formError}</p>}

                    <button
                        type='submit'
                        className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300'
                    >
                        Login
                    </button>
                </form>

                <div className='mt-4'>
                    <p className='text-sm text-gray-600'>Forgot Password? <span className='text-blue-600 cursor-pointer hover:text-blue-800'>Click here!</span></p>
                    <p className='text-sm text-gray-600 mt-2'>
                        New here? <Link to='/signup' className='text-blue-600 hover:underline'>Create an account</Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
