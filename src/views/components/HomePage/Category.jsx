// Category.js
import React from 'react';
import CategoryCard from '../GlobalComponent/CategoryCard';

// Mimicking an API call with a static list of categories (for now)
const categoryData = [
    {
        id: 1,
        name: "Home Furniture",
        imageUrl: "/images/card-1.jpg",  // Corrected image path
        link: "/page1",
    },
    {
        id: 2,
        name: "Office Furniture",
        imageUrl: "/images/card-2.jpg",  // Corrected image path
        link: "/page2",
    },
    {
        id: 3,
        name: "Academic Furniture",
        imageUrl: "/images/card-3.jpg",  // Corrected image path
        link: "/page3",
    },
    {
        id: 4,
        name: "Restaurant Furniture",
        imageUrl: "/images/card-4.jpg",  // Corrected image path
        link: "/page4",
    },
];

function Category() {
    return (
        <>
            <h1 className="text-center text-5xl font-bold my-8">Collections</h1>
            {/* <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-4 p-4 justify-items-center"> */}
            <div className="grid grid-cols-2 lg:grid-cols-2  2xl:grid-cols-4 gap-4 p-4 justify-items-center">
                {categoryData.map((category) => (
                    <div
                        key={category.id}
                        className="relative w-full h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]"
                    >
                        <CategoryCard category={category} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Category;
