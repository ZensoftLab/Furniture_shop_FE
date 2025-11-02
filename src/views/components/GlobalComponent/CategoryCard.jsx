function CategoryCard({ category }) {
    return (
        <div
            className="relative flex items-center justify-center w-full h-full bg-cover bg-center rounded-lg shadow-lg hover:scale-105 transition-transform"
            style={{
                backgroundImage: `url(${category.imageUrl})`,
                backgroundSize: 'cover',
            }}
        >
            <a
                href={category.link}
                className="absolute inset-0 flex items-end pb-6 justify-center bg-opacity-50 text-white text-2xl font-semibold rounded-lg hover:bg-opacity-70"
            >
                <p className="bg-black/50 px-5 rounded-full p-2 ">{category.name}</p>
            </a>
        </div>
    );
}

export default CategoryCard;



// function CategoryCard({ category }) {
//     return (
//         <div
//             className="relative flex flex-col justify-end w-full h-80 bg-cover bg-center rounded-xl shadow-lg overflow-hidden group transition-transform hover:scale-105"
//             style={{
//                 backgroundImage: `url(${category.imageUrl})`,
//                 backgroundSize: "cover",
//             }}
//         >
//             {/* Overlay for better contrast */}
//             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>

//             {/* Bottom Info Bar */}
//             <div className="relative flex justify-between items-end px-4 text-white z-10 mb-2">
//                 <span className="text-lg font-semibold">${category.price}</span>
//                 <p className="text-lg font-medium">{category.name}</p>
//             </div>

//             {/* Action Buttons */}
//             <div className="relative flex justify-center gap-4 pb-4 z-10">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition">
//                     Add to Cart
//                 </button>
//                 <a
//                     href={category.link}
//                     className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition"
//                 >
//                     View Details
//                 </a>
//             </div>
//         </div>
//     );
// }

// export default CategoryCard;
