// NewProductList.js
import { Link, NavLink } from "react-router-dom";
import React, { useRef, useCallback } from "react";
import CategoryCard from "../GlobalComponent/CategoryCard";

// Mock 10 products
const products = [
    { id: 1, name: "Ergo Chair", imageUrl: "/images/card-1.jpg", link: "/p/ergo-chair" },
    { id: 2, name: "Minimal Desk", imageUrl: "/images/card-2.jpg", link: "/p/minimal-desk" },
    { id: 3, name: "Bookshelf XL", imageUrl: "/images/card-3.jpg", link: "/p/bookshelf-xl" },
    { id: 4, name: "Coffee Table", imageUrl: "/images/card-4.jpg", link: "/p/coffee-table" },
    { id: 5, name: "Lounge Sofa", imageUrl: "/images/hero-1.jpg", link: "/p/lounge-sofa" },
    { id: 6, name: "Task Lamp", imageUrl: "/images/hero-2.jpg", link: "/p/task-lamp" },
    { id: 7, name: "Bar Stool", imageUrl: "/images/hero-1.jpg", link: "/p/bar-stool" },
    { id: 8, name: "Dining Set", imageUrl: "/images/hero-2.jpg", link: "/p/dining-set" },
    { id: 9, name: "Sideboard", imageUrl: "/images/card-2.jpg", link: "/p/sideboard" },
    { id: 10, name: "Patio Chair", imageUrl: "/images/card-3.jpg", link: "/p/patio-chair" },
];

function NewProductList() {
    const trackRef = useRef(null);

    // Scroll by exactly one card (+ gap) based on first child width
    const scrollByOne = useCallback((dir) => {
        const track = trackRef.current;
        if (!track) return;
        const item = track.querySelector("[data-card]");
        if (!item) return;

        const gap = 16; // Tailwind gap-4 ≈ 16px
        const delta = (item.offsetWidth + gap) * (dir === "next" ? 1 : -1);
        track.scrollBy({ left: delta, behavior: "smooth" });
    }, []);

    return (
        <>
            <h1 className="text-center text-5xl font-bold my-8">
                New Products{" "}
                <NavLink
                    to="/view-list"
                    className="font-normal text-2xl pl-4 text-blue-300 hover:text-blue-500 transition-colors duration-200"
                >
                    View All
                </NavLink>
            </h1>

            <div className="relative w-full px-10">
                {/* Prev button */}
                <button
                    type="button"
                    aria-label="Previous"
                    className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 btn btn-circle"
                    onClick={() => scrollByOne("prev")}
                >
                    ❮
                </button>

                {/* Next button */}
                <button
                    type="button"
                    aria-label="Next"
                    className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 btn btn-circle"
                    onClick={() => scrollByOne("next")}
                >
                    ❯
                </button>

                {/* Track */}
                <div
                    ref={trackRef}
                    className="
            flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory
            px-4 py-2
          "
                >
                    {products.map((p) => (
                        <div
                            key={p.id}
                            data-card
                            className="
                snap-start shrink-0
                w-[220px] h-[220px]
                sm:w-[280px] sm:h-[280px]
                md:w-80 md:h-80
                lg:w-[360px] lg:h-[360px]
              "
                        >
                            {/* Make the whole card clickable to /item/:id just like PopularChoice */}
                            <Link to={`/item/${p.id}`} className="block w-full h-full focus:outline-none">
                                <CategoryCard category={p} />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Mobile nav (compact, overlays bottom) */}
                <div className="sm:hidden flex justify-center gap-6 mt-3">
                    <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => scrollByOne("prev")}
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => scrollByOne("next")}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default NewProductList;
