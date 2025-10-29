import React, { useState } from "react";
import emailjs from "emailjs-com";
import TopNavbar from "../components/GlobalComponent/TopNavbar";
import Footer from "../components/GlobalComponent/Footer";

function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        location: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Use EmailJS to send the form data
        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID
                e.target,
                import.meta.env.VITE_EMAILJS_USER_ID // User ID
            )
            .then(
                (response) => {
                    console.log("Email sent successfully", response);
                    setIsSubmitting(false);
                    setSubmitSuccess(true);
                },
                (error) => {
                    console.error("Error sending email", error);
                    setIsSubmitting(false);
                    setSubmitSuccess(false);
                }
            );
    };

    return (
        <>
            <div className="relative z-60 overflow-visible lg:px-[60px]">
                <TopNavbar />
            </div>

            <div className="p-6 ">
                <h1 className="text-center text-4xl font-bold mb-6">Contact Us</h1>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto border border-gray-300 rounded-lg p-6 shadow-lg bg-white">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                required
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter your location"
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Enter subject"
                                required
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">Message</label>
                            <textarea
                                rows="5"
                                name="message"
                                placeholder="Enter your message"
                                required
                                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`bg-black px-4 text-white font-medium py-3 rounded-md hover:bg-gray-600 transition-colors mt-4 ${isSubmitting ? "disabled:opacity-50" : ""
                                }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>

                        {submitSuccess !== null && (
                            <div
                                className={`mt-4 text-center font-semibold ${submitSuccess ? "text-green-500" : "text-red-500"
                                    }`}
                            >
                                {submitSuccess
                                    ? "Your message was sent successfully!"
                                    : "There was an error sending your message."}
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <div className="lg:px-[60px]">
                <Footer />
            </div>

        </>
    );
}

export default ContactUsPage;
