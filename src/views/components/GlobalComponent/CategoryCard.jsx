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
                className="absolute inset-0 flex items-center justify-center bg-opacity-50 text-white text-xl font-semibold rounded-lg hover:bg-opacity-70"
            >
                <p className="bg-black/30 p-2">{category.name}</p>
            </a>
        </div>
    );
}

export default CategoryCard;
