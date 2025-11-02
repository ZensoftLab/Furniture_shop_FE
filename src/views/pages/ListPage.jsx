import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListCard from "../components/GlobalComponent/ListCard";
import TopNavbar from "../components/GlobalComponent/TopNavbar";
import Footer from "../components/GlobalComponent/Footer";

/** ---------------------------
 * Fake API (simulated backend) — FURNITURE DEMO
 * --------------------------*/
const FURNITURE_CATEGORIES = ["Sofas", "Chairs", "Beds", "Tables", "Wardrobes", "Desks", "Shelves", "Outdoor"];

const CAT_IMAGES = {
    Sofas: [
        "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://cdn.pixabay.com/photo/2017/03/28/12/11/living-room-2181960_1280.jpg",
        "https://burst.shopifycdn.com/photos/bright-living-room.jpg?width=1200",
    ],
    Chairs: [
        "https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://cdn.pixabay.com/photo/2016/11/29/03/53/armchair-1866369_1280.jpg",
        "https://burst.shopifycdn.com/photos/modern-chair.jpg?width=1200",
    ],
    Beds: [
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://cdn.pixabay.com/photo/2016/11/18/14/27/bedroom-1835910_1280.jpg",
        "https://burst.shopifycdn.com/photos/cozy-modern-bedroom.jpg?width=1200",
    ],
    Tables: [
        "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://cdn.pixabay.com/photo/2016/11/21/16/01/wooden-1846053_1280.jpg",
        "https://burst.shopifycdn.com/photos/wood-dining-table-set.jpg?width=1200",
    ],
    Wardrobes: [
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://cdn.pixabay.com/photo/2015/07/17/22/43/wardrobe-849997_1280.jpg",
        "https://burst.shopifycdn.com/photos/minimalist-closet.jpg?width=1200",
    ],
    Desks: [
        "https://images.pexels.com/photos/4065897/pexels-photo-4065897.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://cdn.pixabay.com/photo/2015/09/05/21/51/desk-925827_1280.jpg",
        "https://burst.shopifycdn.com/photos/home-office-with-laptop.jpg?width=1200",
    ],
    Shelves: [
        "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://cdn.pixabay.com/photo/2016/11/29/07/29/bookshelf-1869616_1280.jpg",
        "https://burst.shopifycdn.com/photos/minimal-shelves.jpg?width=1200",
    ],
    Outdoor: [
        "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://cdn.pixabay.com/photo/2016/11/29/09/32/patio-1868372_1280.jpg",
        "https://burst.shopifycdn.com/photos/patio-furniture-set.jpg?width=1200",
    ],
};

const nameFor = (cat, idx) => {
    const base = ["Classic", "Urban", "Scandi", "Oak", "Walnut", "Cloud", "Zen", "Metro", "Cozy", "Vista", "Nova"];
    return `${base[idx % base.length]} ${cat.slice(0, -1)}`; // e.g., "Classic Sofa"
};

const PRICE_RANGE = {
    Sofas: [300, 1800],
    Chairs: [40, 350],
    Beds: [250, 1500],
    Tables: [80, 900],
    Wardrobes: [200, 1200],
    Desks: [90, 800],
    Shelves: [40, 400],
    Outdoor: [60, 700],
};

const randBetween = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

const FAKE_DB = Array.from({ length: 60 }).map((_, i) => {
    const cat = FURNITURE_CATEGORIES[i % FURNITURE_CATEGORIES.length];
    const [lo, hi] = PRICE_RANGE[cat];
    const price = randBetween(lo, hi);
    const popular = Math.random() > 0.6;
    const imgs = CAT_IMAGES[cat];
    const imageUrl = imgs[i % imgs.length];
    const priceOld = Math.random() > 0.5 ? price + randBetween(20, Math.min(300, Math.floor(price * 0.3))) : null;

    return {
        id: i + 1,
        name: `${nameFor(cat, i)} #${i + 1}`,
        category: cat,
        price,
        priceOld,
        badge: popular ? "Hot" : Math.random() > 0.7 ? "New" : null,
        popular,
        imageUrl,
    };
});

const fakeApi = {
    getCategories: () =>
        new Promise((res) => setTimeout(() => res([...new Set(FAKE_DB.map((p) => p.category))]), 400)),
    getProducts: (params) =>
        new Promise((res) => {
            setTimeout(() => {
                const {
                    page = 1,
                    pageSize = 15,
                    minPrice = 0,
                    maxPrice = Number.MAX_SAFE_INTEGER,
                    categories = [],
                    popularOnly = false,
                    sort = "price_asc",
                } = params || {};

                let data = FAKE_DB.filter(
                    (p) =>
                        p.price >= minPrice &&
                        p.price <= maxPrice &&
                        (categories.length ? categories.includes(p.category) : true) &&
                        (popularOnly ? p.popular : true)
                );

                if (sort === "price_asc") data.sort((a, b) => a.price - b.price);
                if (sort === "price_desc") data.sort((a, b) => b.price - a.price);

                const total = data.length;
                const start = (page - 1) * pageSize;
                const items = data.slice(start, start + pageSize);
                const hasMore = start + pageSize < total;

                res({ items, total, hasMore });
            }, 600);
        }),
};

/** ---------------------------
 * Sidebar
 * --------------------------*/
function Sidebar({ categories, filters, onApply, onReset }) {
    const [local, setLocal] = useState(filters);

    useEffect(() => setLocal(filters), [filters]);

    const handleRange = (key, val) => setLocal((s) => ({ ...s, [key]: Number(val) || 0 }));
    const toggleCat = (cat) =>
        setLocal((s) => {
            const set = new Set(s.categories);
            set.has(cat) ? set.delete(cat) : set.add(cat);
            return { ...s, categories: Array.from(set) };
        });

    return (
        <aside className="w-full lg:w-72 lg:shrink-0 bg-white rounded-2xl border border-gray-200/70 shadow-sm p-5 h-max">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Filters</h3>

            <div className="mb-6">
                <p className="font-semibold text-gray-800 mb-3">Price range</p>
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Min"
                        value={local.minPrice}
                        onChange={(e) => handleRange("minPrice", e.target.value)}
                        min={0}
                    />
                    <span className="text-gray-500">—</span>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Max"
                        value={local.maxPrice}
                        onChange={(e) => handleRange("maxPrice", e.target.value)}
                        min={0}
                    />
                </div>
            </div>

            <div className="mb-6">
                <p className="font-semibold text-gray-800 mb-3">Category</p>
                <div className="max-h-48 overflow-auto pr-1 space-y-2">
                    {categories.map((c) => (
                        <label key={c} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={local.categories.includes(c)}
                                onChange={() => toggleCat(c)}
                            />
                            <span className="text-sm text-gray-700">{c}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        className="toggle toggle-sm"
                        checked={local.popularOnly}
                        onChange={(e) => setLocal((s) => ({ ...s, popularOnly: e.target.checked }))}
                    />
                    <span className="text-sm text-gray-800">Popular only</span>
                </label>
            </div>

            <div className="mb-6">
                <p className="font-semibold text-gray-800 mb-3">Sort by price</p>
                <select
                    className="select select-bordered w-full"
                    value={local.sort}
                    onChange={(e) => setLocal((s) => ({ ...s, sort: e.target.value }))}
                >
                    <option value="price_asc">Low to High</option>
                    <option value="price_desc">High to Low</option>
                </select>
            </div>

            <div className="flex gap-3">
                <button className="btn btn-primary btn-sm flex-1" onClick={() => onApply(local)}>
                    Apply
                </button>
                <button className="btn btn-ghost btn-sm" onClick={onReset}>
                    Reset
                </button>
            </div>
        </aside>
    );
}

/** ---------------------------
 * Main Page with Drawer Sidebar
 * --------------------------*/
export default function ListPage() {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get("category"); // e.g., "Chairs"

    const [items, setItems] = useState([]);
    const [visible, setVisible] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const [page, setPage] = useState(1);
    const pageSize = 15;
    const [hasMore, setHasMore] = useState(false);

    const [filters, setFilters] = useState(() => ({
        minPrice: 0,
        maxPrice: 3000,
        categories: categoryParam ? [categoryParam] : [],
        popularOnly: false,
        sort: "price_asc",
    }));

    // Initial load
    useEffect(() => {
        let mounted = true;
        Promise.all([fakeApi.getCategories(), fakeApi.getProducts({ page: 1, pageSize, ...filters })])
            .then(([cats, res]) => {
                if (!mounted) return;
                setCategories(cats);
                setItems(res.items);
                setVisible(res.items);
                setHasMore(res.hasMore);
            })
            .finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // React to ?category= changes while staying on the page
    useEffect(() => {
        if (!categoryParam) return;
        const next = { ...filters, categories: [categoryParam] };
        applyFilters(next);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryParam]);

    const applyFilters = async (next) => {
        setLoading(true);
        setFilters(next);
        setPage(1);
        const res = await fakeApi.getProducts({ page: 1, pageSize, ...next });
        setItems(res.items);
        setVisible(res.items);
        setHasMore(res.hasMore);
        setLoading(false);
    };

    const resetFilters = async () => {
        await applyFilters({
            minPrice: 0,
            maxPrice: 3000,
            categories: [],
            popularOnly: false,
            sort: "price_asc",
        });
    };

    const handleShowMore = async () => {
        if (!hasMore) return;
        setLoadingMore(true);
        const nextPage = page + 1;
        const res = await fakeApi.getProducts({ page: nextPage, pageSize, ...filters });
        setItems((p) => [...p, ...res.items]);
        setVisible((p) => [...p, ...res.items]);
        setHasMore(res.hasMore);
        setPage(nextPage);
        setLoadingMore(false);
    };

    const filterSummary = useMemo(() => {
        const chunks = [];
        if (filters.minPrice || filters.maxPrice !== 3000) chunks.push(`৳${filters.minPrice}–৳${filters.maxPrice}`);
        if (filters.categories.length) chunks.push(filters.categories.join(", "));
        if (filters.popularOnly) chunks.push("popular");
        chunks.push(filters.sort === "price_asc" ? "low→high" : "high→low");
        return chunks.join(" · ");
    }, [filters]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-500 animate-pulse">Loading...</p>
            </div>
        );
    }

    return (
        <>
            {/* Only add px-[60px] on lg+ */}
            <div className="relative z-60 overflow-visible px-0 lg:px-[60px]">
                <TopNavbar />
            </div>

            <section className="py-10 min-h-screen">
                <div className="px-0 sm:px-4 lg:px-[60px]">
                    <div className="drawer lg:drawer-open">
                        <input id="filters-drawer" type="checkbox" className="drawer-toggle" />

                        {/* Main content */}
                        <div className="drawer-content">
                            <div className="mb-6 flex items-end justify-between px-4 sm:px-0">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Product List</h1>
                                    <p className="text-sm text-gray-500 mt-1">{filterSummary}</p>
                                </div>

                                <label htmlFor="filters-drawer" className="btn btn-outline btn-sm lg:hidden">
                                    Filters
                                </label>
                            </div>

                            {visible.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 px-4 sm:px-0">
                                        {visible.map((item) => (
                                            <ListCard key={item.id} item={item} />
                                        ))}
                                    </div>

                                    {hasMore && (
                                        <div className="flex justify-center mt-10 px-4 sm:px-0">
                                            <button
                                                onClick={handleShowMore}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                                disabled={loadingMore}
                                            >
                                                {loadingMore ? "Loading..." : "Show More"}
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center text-gray-500 px-4 sm:px-0">
                                    No products found with current filters.
                                </div>
                            )}
                        </div>

                        {/* Drawer side (sidebar) */}
                        <div className="drawer-side z-40">
                            <label htmlFor="filters-drawer" className="drawer-overlay" aria-label="close sidebar" />
                            <div className="w-80 sm:w-96 bg-base-100 min-h-full p-4">
                                <Sidebar
                                    categories={categories}
                                    filters={filters}
                                    onApply={(f) => {
                                        applyFilters(f);
                                        const el = document.getElementById("filters-drawer");
                                        if (el && !window.matchMedia("(min-width: 1024px)").matches) el.checked = false;
                                    }}
                                    onReset={() => {
                                        resetFilters();
                                        const el = document.getElementById("filters-drawer");
                                        if (el && !window.matchMedia("(min-width: 1024px)").matches) el.checked = false;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
