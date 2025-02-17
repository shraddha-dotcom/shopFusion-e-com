const About = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
            {/* About Us Section */}
            <div className="text-center max-w-3xl mb-12">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg">
                    Welcome to <span className="text-primary font-semibold">ShopFusion</span>, your one-stop shop for
                    the best fashion and electronics. We are committed to providing high-quality products with
                    top-notch customer service.
                </p>
            </div>

            {/* What We Sell Section */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto space-y-6">
                <h2 className="text-3xl font-semibold text-center text-primary">What We Sell</h2>
                <p className="text-lg text-center text-gray-600">
                    At ShopFusion, we provide a wide range of products designed to meet all your needs.
                    Whether you're looking for the latest fashion trends or cutting-edge electronics, we've got you covered!
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">Free Returns</h3>
                        <p className="text-gray-600">
                            Shop with confidence! We offer hassle-free returns on all orders, ensuring you have peace of mind with every purchase.
                        </p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">Free Shipping</h3>
                        <p className="text-gray-600">
                            Enjoy fast and free shipping on all orders. No minimum required – get your products delivered to your doorstep at no extra cost.
                        </p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">24/7 Support</h3>
                        <p className="text-gray-600">
                            Our support team is available around the clock to assist you with any questions or concerns. We're here to help!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
