import React from "react";
import TopNavbar from "../components/GlobalComponent/TopNavbar";
import Footer from "../components/GlobalComponent/Footer";
import { Link } from "react-router-dom";

function AboutUsPage() {
  return (
    <>
      <div className="relative z-60 overflow-visible lg:px-[60px]">
        <TopNavbar />
      </div>

      {/* Main section */}
      <div className="bg-gray-200 text-black p-16 sm:p-24">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
            About Us
          </h1>
          <p className="text-xl sm:text-2xl mb-10">
            We are a passionate team of experts dedicated to bringing you the best furniture designs to elevate your living and working spaces.
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="w-full sm:w-1/3 p-4 transform transition duration-300 hover:scale-105">
              <div className="bg-white text-black p-6 rounded-xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-lg">
                  To provide stylish, functional, and sustainable furniture solutions for homes and offices, creating spaces that inspire.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/3 p-4 transform transition duration-300 hover:scale-105">
              <div className="bg-white text-black p-6 rounded-xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-lg">
                  To become the leading provider of high-quality furniture, offering innovative designs that cater to every customer’s needs.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/3 p-4 transform transition duration-300 hover:scale-105">
              <div className="bg-white text-black p-6 rounded-xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
                <p className="text-lg">
                  Integrity, quality, and customer satisfaction drive our work. We focus on building long-lasting relationships with our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-8 sm:px-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-black mb-12">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            We bring years of expertise to the table, ensuring top-tier designs and exceptional customer service for every project.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-black text-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12H3" />
                  <path d="M12 3v18" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Expert Craftsmanship</h3>
              <p className="text-lg text-gray-600">
                Our furniture is designed with precision and skill, crafted to meet the highest standards of quality and durability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-black text-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12H3" />
                  <path d="M12 3v18" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sustainable Practices</h3>
              <p className="text-lg text-gray-600">
                We are committed to environmentally-friendly practices, using sustainable materials and production processes to minimize our footprint.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-black text-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12H3" />
                  <path d="M12 3v18" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer-Centered</h3>
              <p className="text-lg text-gray-600">
                We prioritize your needs by offering personalized furniture solutions that match your vision, style, and space.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us CTA */}
      <div className="bg-black text-white text-center py-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Ready to Furnish Your Space?</h2>
        <p className="text-xl mb-6">Let us help you bring your vision to life. Reach out today to start your furniture journey with us.</p>
        <Link
          to="/contact-us"
          className="bg-orange-700 text-white py-3 px-8 rounded-md text-lg hover:bg-gray-500 transition-all"
        >
          Contact Us Now
        </Link>
      </div>

      <div className="lg:px-[60px]">
        <Footer />
      </div>
    </>
  );
}

export default AboutUsPage;
