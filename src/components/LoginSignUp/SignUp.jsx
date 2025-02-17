import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { addUser } from '../../redux/action';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const users = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateName = (name) => {
        if (!name.trim()) return setNameError('Please enter your name');
        if (name.trim().length < 3) return setNameError('Please enter your full name');
        setNameError('');
    };

    const validateEmail = (email) => {
        const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!regex.test(email)) return setEmailError('Please enter a valid email');
        setEmailError('');
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!regex.test(password)) return setPasswordError('Password must have at least 8 characters, including digits, uppercase & lowercase letters');
        setPasswordError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nameError && !emailError && !passwordError && fullName && email && password) {
            if (users.some((user) => user.email === email)) {
                toast.error('Email is already registered.', { autoClose: 3000 });
            } else {
                dispatch(addUser({ fullName, email, password }));
                setFullName('');
                setEmail('');
                setPassword('');
                toast.success('Account Created Successfully!', { autoClose: 3000 });
                setTimeout(() => navigate('/login'), 3000);
            }
        }
    };


    const handleSkip = () => {
        // Navigate to the home page 
        navigate('/');
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-r from-orange-300 via-red-300 to-yellow-200 '>
            <ToastContainer />
            <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold text-center text-gray-800'>Create Your Account</h1>
                <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
                    <div className='flex items-center p-3 bg-gray-200 rounded-md'>
                        <FaUser className='text-gray-600' />
                        <input
                            type='text'
                            placeholder='Enter Name'
                            className='w-full ml-2 bg-transparent outline-none'
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                                validateName(e.target.value);
                            }}
                        />
                    </div>
                    {nameError && <p className='text-xs text-red-500'>{nameError}</p>}

                    <div className='flex items-center p-3 bg-gray-200 rounded-md'>
                        <MdOutlineEmail className='text-gray-600' />
                        <input
                            type='email'
                            placeholder='Enter Email'
                            className='w-full ml-2 bg-transparent outline-none'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                        />
                    </div>
                    {emailError && <p className='text-xs text-red-500'>{emailError}</p>}

                    <div className='flex items-center p-3 bg-gray-200 rounded-md'>
                        <RiLockPasswordLine className='text-gray-600' />
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full ml-2 bg-transparent outline-none'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                        />
                    </div>
                    {passwordError && <p className='text-xs text-red-500'>{passwordError}</p>}

                    <button
                        type='submit'
                        className='w-full p-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700'
                    >
                        Sign Up
                    </button>
                </form>

                <p className='mt-4 text-center text-gray-600'>
                    Already have an account?{' '}
                    <Link to='/login' className='text-indigo-600 hover:underline'>Login</Link>
                </p>
                <button
                    onClick={handleSkip}
                    className='text-indigo-600 hover:underline'
                >
                    Skip
                </button>
            </div>
        </div>
    );
};

export default SignUp;
