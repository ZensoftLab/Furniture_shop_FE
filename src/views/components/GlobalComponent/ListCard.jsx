// src/views/components/GlobalComponent/ListCard.jsx
import React, { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function ListCard({ item }) {
    const [added, setAdded] = useState(false);
    const { addItem } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();

        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 1300);
    };

    const priceOld = item.priceOld ?? null; // optional
    const badge = item.badge ?? "New";      // optional
    const isHot = String(badge).toLowerCase() === "hot";

    return (
        <Link
            to={`/item/${item.id}`}
            className="
        group relative block
        rounded-2xl border border-gray-200/70 bg-white/70
        shadow-sm hover:shadow-xl hover:shadow-gray-200
        transition-all duration-300 ease-out
        overflow-hidden backdrop-blur supports-backdrop-filter:backdrop-blur-md
        will-change-transform hover:-translate-y-0.5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
      "
        >
            {/* Image */}
            <div className="relative aspect-4/3 overflow-hidden">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    loading="lazy"
                />

                {/* Top badges */}
                <div className="absolute left-3 top-3 flex items-center gap-2">
                    {badge && (
                        <span
                            className={`
                rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur
                ${isHot ? "bg-red-600" : "bg-green-500"}
              `}
                        >
                            {badge}
                        </span>
                    )}
                    {priceOld && (
                        <span className="rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold text-white">
                            -{Math.max(5, Math.min(60, Math.round(((priceOld - item.price) / priceOld) * 100)))}%
                        </span>
                    )}
                </div>

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover actions (responsive, stays in-bounds) */}
                <div
                    className="
            absolute left-3 right-3 bottom-3
            flex flex-wrap items-center justify-center
            gap-2 sm:gap-[clamp(8px,1.4vw,14px)]
            opacity-0 translate-y-3
            transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0
          "
                >
                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        className="
              inline-flex items-center justify-center gap-2
              rounded-xl bg-black text-white shadow
              hover:bg-gray-700 hover:shadow-md active:scale-[0.98] transition
              w-full sm:w-auto
              px-[clamp(10px,1.8vw,16px)]
              py-[clamp(6px,1vw,10px)]
              text-[clamp(11px,1.7vw,14px)] leading-none
              min-w-0
            "
                        aria-label="Add to cart"
                    >
                        <ShoppingCart
                            className="
                h-[clamp(14px,2vw,18px)]
                w-[clamp(14px,2vw,18px)]
                shrink-0
              "
                        />
                        <span className="truncate">Add to Cart</span>
                    </button>

                    {/* View details (click-through to parent Link) */}
                    <span
                        className="
              inline-flex items-center justify-center gap-2
              rounded-xl bg-red-600 text-white shadow
              hover:bg-red-700 transition
              w-full sm:w-auto
              px-[clamp(10px,1.8vw,16px)]
              py-[clamp(6px,1vw,10px)]
              text-[clamp(11px,1.7vw,14px)] leading-none
              min-w-0
            "
                        aria-hidden="true"
                    >
                        <Eye
                            className="
                h-[clamp(16px,2.2vw,20px)]
                w-[clamp(16px,2.2vw,20px)]
                shrink-0
              "
                        />
                        <span className="truncate">View details</span>
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900">{item.name}</h3>
                <div className="flex items-end gap-2">
                    <p className="text-2xl font-bold text-gray-900">৳{item.price}</p>
                    {priceOld && <p className="text-sm text-gray-500 line-through">৳{priceOld}</p>}
                </div>
            </div>

            {/* Toast */}
            {added && (
                <div
                    className="
            pointer-events-none absolute right-4 top-4
            rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white
            shadow-lg animate-[bounce_0.9s_ease-in-out_1]
          "
                >
                    Added to cart
                </div>
            )}
        </Link>
    );
}
