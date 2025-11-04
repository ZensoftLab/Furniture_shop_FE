// src/views/pages/CheckoutPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../components/GlobalComponent/TopNavbar";
import Footer from "../components/GlobalComponent/Footer";
import { useCart } from "../components/Context/CartContext";
import { Trash2, ArrowRight, Tag, Truck, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
    const { items, subtotal, inc, dec, remove, clear } = useCart();

    // UX helpers (no backend logic)
    const FREE_SHIP_THRESHOLD = 5000;
    const progress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));
    const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

    return (
        <>
            <div className="relative z-60 overflow-visible lg:px-[60px]">
                <TopNavbar />
            </div>

            <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,#eef2ff_0%,transparent_60%),radial-gradient(1000px_600px_at_110%_-20%,#fdf2f8_0%,transparent_55%)] text-black">
                <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
                    {/* Header */}
                    <div className="mb-6 lg:mb-10">
                        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Your Cart</h1>
                        <p className="mt-2 text-slate-600">Review your items and adjust quantities before checkout.</p>
                    </div>

                    {/* Free shipping banner */}
                    <div className="mb-6 lg:mb-8 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-4 lg:p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-slate-700">
                            <Truck className="h-5 w-5" />
                            {remaining > 0 ? (
                                <span>
                                    You’re <span className="font-semibold text-slate-900">৳{remaining.toFixed(2)}</span> away from{" "}
                                    <span className="font-semibold text-slate-900">free shipping</span>.
                                </span>
                            ) : (
                                <span className="font-semibold text-emerald-700">You’ve unlocked free shipping!</span>
                            )}
                        </div>
                        <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-green-300 to-green-700 transition-[width] duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Empty state */}
                    {items.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-10 text-center shadow-sm">
                            <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-slate-100 flex items-center justify-center shadow-inner">
                                <ShieldCheck className="h-10 w-10 text-slate-400" />
                            </div>
                            <p className="text-lg font-semibold mb-2">Your cart is empty</p>
                            <p className="text-slate-600 mb-6">Browse products and add them to your cart.</p>
                            <Link
                                to="/view-list"
                                className="btn bg-black text-white hover:bg-gray-700 active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                            {/* Items */}
                            <section className="lg:col-span-2 space-y-4">
                                {items.map((x) => (
                                    <div
                                        key={x.id}
                                        className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm hover:shadow-md transition-all"
                                    >
                                        {/* IMAGE -> link to details */}
                                        <div className="relative">
                                            <Link to={`/item/${x.id}`} aria-label={`View details for ${x.name}`}>
                                                <img
                                                    src={x.imageUrl}
                                                    alt={x.name}
                                                    className="h-24 w-24 lg:h-28 lg:w-28 rounded-xl object-cover border border-slate-200"
                                                />
                                                {/* Elegant subtle glow on hover */}
                                                <span className="pointer-events-none absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-indigo-100 transition" />
                                            </Link>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    {/* NAME -> link to details */}
                                                    <h3 className="truncate text-base lg:text-lg font-semibold text-slate-900">
                                                        <Link
                                                            to={`/item/${x.id}`}
                                                            className="hover:underline decoration-indigo-500/70 underline-offset-4"
                                                        >
                                                            {x.name}
                                                        </Link>
                                                    </h3>

                                                    <div className="mt-1 text-sm text-slate-600">
                                                        Unit price: <span className="font-medium text-slate-900">৳{Number(x.price).toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <button
                                                    className="btn btn-ghost btn-sm text-red-600 hover:text-red-700 hover:bg-red-50 active:scale-[0.98] transition-all"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        remove(x.id);
                                                    }}
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between">
                                                {/* Qty controls */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 transition-all"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            dec(x.id);
                                                        }}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        −
                                                    </button>

                                                    <span className="px-3 py-1 rounded-xl border border-slate-200 bg-white text-sm shadow-inner">
                                                        {x.qty}
                                                    </span>

                                                    <button
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 transition-all"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            inc(x.id);
                                                        }}
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Line total */}
                                                <div className="text-right">
                                                    <div className="text-base lg:text-lg font-semibold">
                                                        ৳{(x.qty * Number(x.price)).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center justify-between">
                                    <button
                                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white font-bold bg-red-700  border border-transparent hover:border-red-200 hover:bg-red-500 active:scale-[0.98] transition-all"
                                        onClick={clear}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Clear cart
                                    </button>

                                    <Link
                                        to="/view-list"
                                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-slate-200 bg-black hover:bg-gray-700 text-white hover:shadow-sm active:scale-[0.98] transition-all"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </section>

                            {/* Summary */}
                            <aside className="lg:sticky lg:top-6 h-fit">
                                <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-5 shadow-sm">
                                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                                    {/* Coupon UI */}
                                    <div className="mb-4">
                                        <label className="label pb-1">
                                            <span className="label-text text-slate-700 flex items-center gap-2">
                                                <Tag className="h-4 w-4" /> Coupon code
                                            </span>
                                        </label>
                                        <div className="join w-full">
                                            <input
                                                type="text"
                                                placeholder="Enter code"
                                                className="input input-bordered join-item w-full focus:input-primary"
                                            />
                                            <button
                                                className="btn join-item bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] transition-all"
                                                type="button"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">
                                            Demo only — connect your promo API to enable.
                                        </p>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Subtotal</span>
                                            <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Shipping</span>
                                            <span className="text-slate-600">Calculated at next step</span>
                                        </div>
                                    </div>

                                    <div className="my-4 border-t border-slate-200" />

                                    <div className="flex justify-between items-center text-base lg:text-lg font-bold">
                                        <span>Total</span>
                                        <span>৳{subtotal.toFixed(2)}</span>
                                    </div>

                                    <Link
                                        to="/payment"
                                        className="group btn w-full mt-5 bg-black text-white hover:bg-gray-700 active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            Proceed to Payment
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                        </span>
                                    </Link>

                                    <div className="mt-4 text-xs text-slate-500 flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4" />
                                        Secure checkout. We never store your card details on our servers.
                                    </div>
                                </div>
                            </aside>
                        </div>
                    )}
                </div>

                {/* Sticky mobile checkout bar */}
                {items.length > 0 && (
                    <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur">
                        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                            <div className="text-sm">
                                <div className="text-slate-500">Total</div>
                                <div className="text-lg font-semibold">৳{subtotal.toFixed(2)}</div>
                            </div>

                            <Link
                                to="/payment"
                                className="btn bg-black text-white hover:bg-gray-700 active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}
