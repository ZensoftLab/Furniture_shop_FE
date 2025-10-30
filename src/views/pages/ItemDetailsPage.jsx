import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TopNavbar from "../components/GlobalComponent/TopNavbar";
import Footer from "../components/GlobalComponent/Footer";

// Mock API to simulate fetching product data
const fetchProductData = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: productId,
                name: "CloudSeat",
                price: 1000,
                regularPrice: 1200,
                discountText: "Discount Tk 200",
                brand: "Non Brand",
                status: "In stock", // Change this to "Out of stock" to test
                images: [
                    "/images/hero-1.jpg",
                    "/images/hero-2.jpg",
                    "/images/hero-0.jpg",
                ],
                sizes: ["S", "M", "L"],
            });
        }, 1000); // Simulating an API delay
    });
};

function ItemDetailsPage() {
    const { id } = useParams();
    const productId = Number(id);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Fetch the product data when the component mounts
    useEffect(() => {
        const getProduct = async () => {
            const productData = await fetchProductData(productId);
            setProduct(productData);
            setLoading(false); // Set loading to false once data is fetched
        };
        getProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="p-6 text-black bg-white flex justify-center items-center min-h-screen">
                {/* Loading spinner */}
                <div className="text-xl font-semibold text-gray-700">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="p-6 text-black bg-white">
                <p className="text-red-600 font-semibold">Product not found.</p>
                <Link to="/" className="text-blue-600 underline">Go back</Link>
            </div>
        );
    }

    const nextImage = () => setSelectedIndex((i) => (i + 1) % product.images.length);
    const prevImage = () => setSelectedIndex((i) => (i - 1 + product.images.length) % product.images.length);

    const isOutOfStock = product.status !== "In stock";

    return (
        <>
            <div className="relative z-60 overflow-visible lg:px-[60px]">
                <TopNavbar />
            </div>
            <div className="flex justify-center items-center text-black p-8 min-h-screen bg-white">
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
                    {/* Left Side: Images */}
                    <div className="flex-1">
                        {/* Main Image with arrows */}
                        <div className="relative rounded-xl border border-gray-300 bg-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:scale-105">
                            <img
                                src={product.images[selectedIndex]}
                                alt="Product"
                                className="w-full h-[624px] object-cover transition-all duration-300 ease-in-out transform hover:scale-105"
                                loading="lazy"
                            />
                            <button
                                onClick={prevImage}
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-xl flex items-center justify-center opacity-75 hover:opacity-100 transition-all"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M15 6l-6 6 6 6"></path>
                                </svg>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-xl flex items-center justify-center opacity-75 hover:opacity-100 transition-all"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 6l6 6-6 6"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="mt-3 flex gap-3 overflow-x-auto">
                            {product.images.map((src, idx) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt={`Thumbnail ${idx + 1}`}
                                    onClick={() => setSelectedIndex(idx)}
                                    className={`h-24 w-24 object-cover rounded-xl border cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-125 ${idx === selectedIndex ? "border-black" : "border-transparent"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Product Details */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold tracking-tight text-black">{product.name}</h1>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-xl">
                            <span className="px-8 py-3 rounded-full bg-gray-800 text-white font-semibold">
                                Price Tk {product.price.toFixed(2)}
                            </span>
                            <span className="px-5 py-2 rounded bg-gray-200 text-[15px] line-through text-neutral-700">
                                Regular Price Tk {product.regularPrice.toFixed(2)}
                            </span>
                            <span className="ml-2 px-8 py-2 rounded-full bg-red-600 text-white text-[15px] font-semibold">
                                {product.discountText}
                            </span>
                        </div>

                        <div className="mt-5 flex items-center gap-6 text-lg">
                            <div>
                                <span className="font-semibold">Brand: </span>
                                {product.brand}
                            </div>
                            <span className="h-5 w-px bg-neutral-400"></span>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Status: </span>
                                <span
                                    className={`px-3 py-1 rounded ${product.status === "In stock"
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                        }`}
                                >
                                    {product.status}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="text-[15px] font-semibold">Select Size</div>
                            <div className="mt-4 flex gap-4">
                                {product.sizes.map((s) => (
                                    <button
                                        key={s}
                                        className="h-12 min-w-[50px] rounded-full border text-[16px] bg-white text-black transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="text-[15px] font-semibold">Quantity</div>
                            <div className="mt-4 flex items-center gap-5">
                                <button className="h-12 w-12 border rounded-full text-[16px] font-semibold transition-all duration-300 ease-in-out hover:bg-gray-100 focus:outline-none" disabled={isOutOfStock}>
                                    –
                                </button>
                                <div className="px-4 py-2 border rounded-full text-[16px] font-semibold">
                                    1
                                </div>
                                <button className="h-12 w-12 border rounded-full text-[16px] font-semibold transition-all duration-300 ease-in-out hover:bg-gray-100 focus:outline-none" disabled={isOutOfStock}>
                                    +
                                </button>

                                <button
                                    className={`ml-5 h-14 w-56 px-8 rounded-full ${isOutOfStock ? "bg-gray-400" : "bg-black text-white"} text-[16px] inline-flex items-center gap-3 transition-all duration-300 ease-in-out hover:bg-gray-800 focus:outline-none`}
                                    disabled={isOutOfStock}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M3 3h2l.4 2M7 13h10l3-8H6.4"></path>
                                        <circle cx="9" cy="20" r="1.5"></circle>
                                        <circle cx="18" cy="20" r="1.5"></circle>
                                    </svg>
                                    Add to Cart
                                </button>

                                <button
                                    className={`h-14 w-40 px-10 rounded-full ${isOutOfStock ? "bg-gray-400" : "bg-amber-400 text-white"} text-[16px] inline-flex items-center gap-3 transition-all duration-300 ease-in-out hover:bg-linear-to-l focus:outline-none`}
                                    disabled={isOutOfStock}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-4 text-[16px]">
                            <div className="rounded-xl px-5 py-4 bg-blue-500 text-white text-center transition-transform duration-300 ease-in-out transform hover:scale-105">
                                Cash on Delivery
                            </div>
                            <div className="rounded-xl px-5 py-4 bg-blue-500 text-white text-center transition-transform duration-300 ease-in-out transform hover:scale-105">
                                Fast Delivery
                            </div>
                            <div className="rounded-xl px-5 py-4 bg-blue-500 text-white text-center transition-transform duration-300 ease-in-out transform hover:scale-105">
                                Easy Return
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ItemDetailsPage;
