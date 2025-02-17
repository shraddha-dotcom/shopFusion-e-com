import { useState } from "react";

const faqs = [
    {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, MasterCard, PayPal, and Apple Pay.",
    },
    {
        question: "How long does shipping take?",
        answer: "Shipping typically takes 5-7 business days depending on your location.",
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy. Items must be unused and in original packaging.",
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship worldwide with additional shipping charges.",
    },
    {
        question: "How can I track my order?",
        answer: "After your order is shipped, we will send you a tracking link via email.",
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
            <h1 className="text-4xl font-bold mb-6 text-primary">Frequently Asked Questions</h1>
            <div className="w-full max-w-2xl">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-4 border-b border-gray-300">
                        <button
                            className="w-full text-left font-semibold py-3 flex justify-between items-center focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                        </button>
                        {openIndex === index && (
                            <p className="text-gray-700 px-3 pb-3">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
