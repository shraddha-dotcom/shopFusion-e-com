
import image from '../../assets/images/img6.jpg'


const bannerImg = {
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
}
const Subscribe = () => {
    return (
        <div
            data-aos="zoom-in"
            className='bg-gray-100 dark:bg-gray-800
                  mb-20'
            style={bannerImg}
        >
            <div className='container backdrop-blur-sm py-10'>
                <div className='space-y-6 max-w-xl mx-auto'>
                    <h1 className='text-2xl !text-center sm:text-left
                sm:text-4xl font-semibold mb-2'
                    >Get Notified About New Produts</h1>
                    <input
                        data-aos="fade-up"
                        type='text'
                        placeholder='Enter your email'
                        className='w-full p-3'


                    />
                </div>

            </div>
        </div>
    )
}

export default Subscribe
