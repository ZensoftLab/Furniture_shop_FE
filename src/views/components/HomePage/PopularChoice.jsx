import React from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../GlobalComponent/CategoryCard";
import { PRODUCTS } from "../../../data/products";

const categoryData = [
    { id: 1, name: "CloudSeat", imageUrl: "/images/hero-1.jpg", link: "/page1" },
    { id: 2, name: "Urban Throne", imageUrl: "/images/hero-2.jpg", link: "/page2" },
    { id: 3, name: "EduSeat", imageUrl: "/images/card-3.jpg", link: "/page3" },
    { id: 4, name: "ZenPod", imageUrl: "/images/card-2.jpg", link: "/page4" },
    { id: 5, name: "CosmoLounge", imageUrl: "/images/card-1.jpg", link: "/page5" },
];

function PopularChoice() {
    return (
        <>
            <h1 className="text-center text-5xl font-bold my-8">Popular Choice</h1>

            {/* Mobile & Tablet */}
            <div className="p-4 lg:hidden">
                {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2"> */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2 justify-items-center place-items-center">

                    {categoryData.slice(1).map((category) => (
                        <div
                            key={category.id}
                            className="relative w-full h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] shrink-2"
                        >
                            <Link to={`/item/${category.id}`}>
                                <CategoryCard category={category} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex 2xl:visible lg:gap-8 lg:justify-center p-4 ">

                {/* Left Large Card (id=1) */}
                <div className="w-[850px] h-[850px] shrink-2">
                    <Link to={`/item/${categoryData[0].id}`}>
                        <CategoryCard category={categoryData[0]} />
                    </Link>
                </div>

                {/* Right 2x2 Grid */}
                <div className="grid grid-cols-2 gap-4 shrink-2">
                    {categoryData.slice(1).map((category) => (
                        <div key={category.id} className="w-[400px] h-[400px]">
                            <Link to={`/item/${category.id}`}>
                                <CategoryCard category={category} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PopularChoice;
