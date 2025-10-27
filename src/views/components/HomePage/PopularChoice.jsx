import React from "react";
import CategoryCard from "../GlobalComponent/CategoryCard";

const categoryData = [
    { id: 1, name: "Category 1", imageUrl: "/images/hero-1.jpg", link: "/page1" },
    { id: 2, name: "Category 2", imageUrl: "/images/hero-2.jpg", link: "/page2" },
    { id: 3, name: "Category 3", imageUrl: "/images/card-3.jpg", link: "/page3" },
    { id: 4, name: "Category 4", imageUrl: "/images/card-2.jpg", link: "/page4" },
    { id: 5, name: "Category 5", imageUrl: "/images/card-1.jpg", link: "/page5" },
];

function PopularChoice() {
    return (
        <>
            <h1 className="text-center text-5xl font-bold my-8  ">Popular Choice</h1>

            {/* ---------- Mobile & Tablet (non-desktop) ---------- */}
            <div className="p-4 lg:hidden">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2">
                    {categoryData.slice(1).map((category) => (
                        <div
                            key={category.id}
                            className="relative w-full h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]"
                        >
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ---------- Desktop Only Layout ---------- */}
            <div className="hidden lg:flex lg:gap-8 lg:justify-center p-4">
                {/* Left Large Card */}
                <div className="w-[850px] h-[850px] shrink-0">
                    <CategoryCard category={categoryData[0]} />
                </div>

                {/* Right 2x2 Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {categoryData.slice(1).map((category) => (
                        <div
                            key={category.id}
                            className="w-[400px] h-[400px]"
                        >
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PopularChoice;
