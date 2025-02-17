import { useEffect, useState } from 'react'
import lightPng from '../assets/images/light-mode-button.png';
import darkPng from '../assets/images/dark-mode-button1.png'

const DarkMode = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    )



    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    return (
        <div className='relative'>
            <img src={lightPng} alt="" onClick={() => setTheme(theme === "light" ? "dark" : "light")}

                className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 ${theme === "dark" ? "opacity-40" : "opacity-100"
                    }`} />
            <img src={darkPng} alt="" onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className='w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300' />
        </div>
    )
}

export default DarkMode
