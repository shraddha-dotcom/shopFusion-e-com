import { useState, useEffect } from "react";


const FlashSale = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date("2025-03-29T00:00:00"); // Replace with your end date
        const now = new Date();
        const difference = targetDate - now;

        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

    return (
        <div
            data-aos="zoom-in"
            className="text-center bg-gradient-to-r from-red-300 via-orange-300 to-yellow-500
                 pt-12 pr-5 border-2 ">
            <h1 className="text-3xl sm:text-4xl font-bold text-white" >Flash Sale Ending Soon!</h1>
            <p className="text-lg mt-8 text-white">Unbeatable deals on your favorite items. Shop now before the clock runs out!</p>
            <div className="flex justify-center gap-4 mt-8">
                <div className="time-box p-4 border-1 shadow-xl text-center text-white">
                    <span className="time-value text-3xl ">{timeLeft.days}</span><br />
                    <span className="time-label">Days</span>
                </div>
                <div className=" p-4 border-1 text-center shadow-xl text-white">
                    <span className="time-value text-3xl">{timeLeft.hours}</span><br />
                    <span className="time-label">Hours</span>
                </div>
                <div className="border-1 text-center p-4 shadow-xl text-white">
                    <span className="time-value text-3xl">{timeLeft.minutes}</span><br />
                    <span className="time-label">Minutes</span>
                </div>
                <div className=" p-4 border-1 text-center shadow-xl text-white">
                    <span className="time-value text-3xl">{timeLeft.seconds}</span><br />
                    <span className="time-label">Seconds</span>
                </div>
            </div>
            <button className="text-white py-4 px-6 m-4
                 text-xl border-1 cursor-pointer bg-orange-500
                 rounded-full
                  hover:bg-orange-700">Grab Deals Now</button>
        </div>
    );
};

export default FlashSale;
