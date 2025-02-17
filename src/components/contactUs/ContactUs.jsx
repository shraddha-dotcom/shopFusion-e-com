

const ContactUs = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-center mb-4">
                Have questions? We’d love to hear from you! Reach out via email or call us.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="font-semibold">📧 Email: support@shopfusion.com</p>
                <p className="font-semibold">📞 Phone: +1 234 567 890</p>
                <p className="font-semibold">📍 Address: 123 E-Commerce St, Shopping City</p>
            </div>
        </div>
    );
};

export default ContactUs;
