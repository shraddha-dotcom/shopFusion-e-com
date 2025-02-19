
import Slider from 'react-slick'

const TestimonialData = [
    {
        id: 1,
        name: "Shraddha",
        text: "I was amazed by the quality of the products and the fast delivery! The customer service team was super helpful.",
        img: "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA",
    },
    {
        id: 2,
        name: "Amit",
        text: "This app has simplified my daily tasks like never before. The seamless integration with my workflow saves me hours every week. An absolute must-have!",
        img: "https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g",
    },
    {
        id: 3,
        name: "Pratiksha",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas maxime tenetur impedit fugit aliquam maiores.",
        img: "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
    },
    {
        id: 4,
        name: "Mamta",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas maxime tenetur impedit fugit aliquam maiores.",
        img: "https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc",
    },
    {
        id: 5,
        name: "Dhruvin",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas maxime tenetur impedit fugit aliquam maiores.",
        img: "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
    },
]

const Testimonial = () => {

    var settings = {
        dots: true,
        arrows: false,
        Infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoPlay: true,
        autoPlaySpeed: 2000,
        caseease: "linear",
        pauseOnhover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    Infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                },
            },
        ]
    }

    return (
        <div className='py-10 mb-10'>
            <div className='container'>
                {/* header section */}
                <div className='text-center mb-10 
                         max-w-[600px] mx-auto'>
                    <p data-aos="fade-up" className='text-sm text-primary'>
                        What our customers are saying
                    </p>
                    <h1
                        data-aos="fade-up"
                        className='text-3xl font-bold'>
                        Testimonials
                    </h1>
                    <p
                        data-aos="fade-up"
                        className='text-xs text-gray-400'>
                        Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Itaque, dolor.
                    </p>
                </div>
                {/* testimonial cards */}
                <div data-aos="zoom-in">
                    <Slider {...settings}>{
                        TestimonialData.map((data) => (
                            <div key={data.id} className='my-6'>
                                <div

                                    className='flex flex-col gap-4
                            shadow-lg py-8 px-6 mx-4 rounded-xl
                            dark:bg-gray-800 bg-primary/10 relative'
                                >
                                    <div className='mb-4' key={data.id}>
                                        <img src={data.img} alt=""
                                            className='rounded-full w-20 h-20' />
                                    </div>
                                    <div className='flex flex-col items-center gap-4'>
                                        <div className='space-y-3'>
                                            <p className='text-xs text-gray-500'>{data.text}</p>
                                            <h1 className='text-xl font-bold
                                                 text-black/80 dark:text-white'
                                            >
                                                {data.name}
                                            </h1>

                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-black/20 text-9xl
                                font-serif absolute top-0 right-0 dark:text-gray-300'
                                        >,,

                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Testimonial
