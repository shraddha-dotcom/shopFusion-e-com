
import img1 from '../../assets/images/img1.PNG'
import img2 from '../../assets/images/img.PNG'
import img3 from '../../assets/images/Shopping.PNG'
import Slider from 'react-slick';


const imageList = [
    {
        id: 1,
        img: img1,
        title: "Exclusive Women's Collection",
        description:
            "Discover the latest trends in women's fashion. Enjoy up to 50% off on selected items. Shop now and refresh your wardrobe!",
    },
    {
        id: 2,
        img: img2,
        title: "Men's Fashion Deals",
        description: "Find adorable outfits for your little ones. Get up to 50% off on our exclusive kids' clothing range. Shop the best now!",

    },

    {
        id: 3,
        img: img3,
        title: "Trendy Kids' Wear",
        description:
            "Find adorable outfits for your little ones. Get up to 50% off on our exclusive kids' clothing range. Shop the best now!",
    },

]

const Hero = () => {

    var settings = {
        dots: false,
        arrorws: false,
        infinite: true,
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,

    }
    return (
        <div className='relative overflow-hidden min-h-[550px]
                         sm:min-h-[700px] bg-gray-100 dark:bg-gray-950 flex justify-center
                         items-center dark:text-white pt-[4rem] sm:pt-[6rem] duration-200 '>
            {/* bacground pattern */}
            <div className='h-[750px] w-[750px] bg-primary/30 
                     absolute -top-1/3 right-0 rounded-lg rotate-45 -z[10] blur-xl'>

            </div>
            {/* hero section */}
            <div className='container pb-8 sm:pb-0'>
                {/* image slider */}
                <Slider {...settings}
                    accessibility={true} // Ensures proper focus handling
                    focusOnSelect={true} // Allows focusing on slides
                    infinite={false} // Prevents hidden slides from being focused
                >
                    {imageList.map((data, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-1 sm:grid-cols-2
                            gap-6 sm:gap-12 items-center'>

                                {/* text content section */}
                                <div className='flex flex-col justify-center gap-4 text-center
                                    sm:text-left order-2 sm:order-1 z-10'>
                                    <h1 className='text-4xl sm:text-6xl lg:text-7xl font-bold m-4 leading-tight'
                                        data-aos="zoom-out"
                                        data-aos-duration="500"
                                        data-aos-once="true"

                                    >{data.title}
                                    </h1>
                                    <p
                                        className='text-base sm:text-lg m-4 text-gray-700 dark:text-gray-300'
                                        data-aos="fade-up"
                                        data-aos-duration="500"
                                        data-aos-delay="100"
                                    >
                                        {data.description}
                                    </p>
                                    <div
                                        data-aos="fade-up"
                                        data-aos-duration="500"
                                        data-aos-delay="300"                                    >
                                        <button className='bg-gradient-to-r from-primary to-secondary 
                                            hover:scale-105 duration-200 
                                             text-white py-3 px-6 rounded-full shadow-lg'>
                                            Order Now
                                        </button>
                                    </div>
                                </div>

                                {/* img content */}
                                <div className='order-1 sm:order-2'>
                                    <div className='relative z-10 flex justify-center'>
                                        <img src={data.img} alt="product"
                                            className='w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] 
                                            lg:w-[450px] lg:h-[450px] sm:scale-110 lg:scale-100 
                                            object-contain drop-shadow-lg ' />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                </Slider>

            </div>
        </div>

    )
}

export default Hero   