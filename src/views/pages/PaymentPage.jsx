// src/views/pages/PaymentPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../components/GlobalComponent/TopNavbar";
import Footer from "../components/GlobalComponent/Footer";
import { useCart } from "../components/Context/CartContext";
import "../styles/PaymentPage.css";
import {
    Wallet,
    ArrowLeft,
    ShieldCheck,
    Truck,
    MapPin,
    User as UserIcon,
    Phone as PhoneIcon,
    Store,
    Home,
    CheckCircle2,
} from "lucide-react";

/**
 * Replace this with your real API call.
 * Expected endpoint to accept ?zone=dhaka|outside and return { price: number }
 */
async function fetchDeliveryChargeFromAPI(zone) {
    // Example real call:
    // const res = await fetch(`/api/shipping?zone=${encodeURIComponent(zone)}`);
    // if (!res.ok) throw new Error("Failed to load shipping price");
    // const data = await res.json();
    // return Number(data.price);

    // Fallback demo values (remove when wiring backend)
    await new Promise((r) => setTimeout(r, 350));
    return zone === "dhaka" ? 80 : 150;
}

export default function PaymentPage() {
    const { items, subtotal } = useCart();

    // ===== Configs =====
    const FREE_SHIP_THRESHOLD = 5000; // same threshold as CheckoutPage banner

    // ===== UI State =====
    const [zone, setZone] = useState("dhaka");             // 'dhaka' | 'outside'
    const [pickupOption, setPickupOption] = useState("home"); // 'home' | 'shop'
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [loadingCharge, setLoadingCharge] = useState(false);
    const [chargeError, setChargeError] = useState("");

    // Customer details
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Partial pay
    const [usePartial, setUsePartial] = useState(false);
    const [partialAmount, setPartialAmount] = useState("");

    // Derived
    const cleanPartial = useMemo(() => {
        const n = Number(partialAmount);
        return Number.isFinite(n) && n > 0 ? n : 0;
    }, [partialAmount]);

    const freeShipUnlocked = pickupOption === "home" && subtotal >= FREE_SHIP_THRESHOLD;

    // We still fetch the zone price (to show strike-through), but apply discount if unlocked
    const effectiveDelivery =
        pickupOption === "shop" ? 0 : freeShipUnlocked ? 0 : deliveryCharge;

    const grandTotal = useMemo(
        () => subtotal + effectiveDelivery,
        [subtotal, effectiveDelivery]
    );

    const dueOnDelivery = useMemo(
        () => Math.max(0, grandTotal - cleanPartial),
        [grandTotal, cleanPartial]
    );

    // Load delivery price by zone (if home delivery)
    useEffect(() => {
        let mounted = true;

        if (pickupOption === "shop") {
            setDeliveryCharge(0);
            setLoadingCharge(false);
            setChargeError("");
            return () => {
                mounted = false;
            };
        }

        setLoadingCharge(true);
        setChargeError("");
        fetchDeliveryChargeFromAPI(zone)
            .then((price) => {
                if (!mounted) return;
                setDeliveryCharge(Number(price) || 0);
            })
            .catch(() => {
                if (!mounted) return;
                setChargeError("Could not load delivery charge. Please try again.");
                setDeliveryCharge(0);
            })
            .finally(() => mounted && setLoadingCharge(false));

        return () => {
            mounted = false;
        };
    }, [zone, pickupOption]);

    // Basic client-side guard (demo)
    const handleConfirm = () => {
        if (!customerName.trim()) return alert("Please enter customer name.");
        if (!phone.trim()) return alert("Please enter phone number.");
        if (pickupOption === "home" && !address.trim()) return alert("Please enter delivery address.");

        const payload = {
            customerName,
            phone,
            address: pickupOption === "home" ? address : null,
            pickupOption, // 'home' | 'shop'
            zone, // 'dhaka' | 'outside'
            freeShipUnlocked,
            deliveryChargeOriginal: deliveryCharge,
            deliveryChargeApplied: effectiveDelivery,
            subtotal,
            grandTotal,
            usePartial,
            partialAmount: cleanPartial,
            dueOnDelivery,
            paymentMethod: "COD",
            items: items.map(({ id, qty, price }) => ({ id, qty, price })),
        };

        console.log("CREATE_ORDER_DEMO", payload);

        alert(
            `Order placed!\n\n` +
            `Customer: ${customerName}\nPhone: ${phone}\n` +
            `Fulfilment: ${pickupOption === "home" ? "Deliver to Home" : "Pickup from Shop"}\n` +
            (pickupOption === "home" ? `Zone: ${zone === "dhaka" ? "Dhaka" : "Outside Dhaka"}\n` : "") +
            (pickupOption === "home"
                ? `Delivery: ${freeShipUnlocked ? `~৳${deliveryCharge.toFixed(2)}~ ৳0 (Free)` : `৳${effectiveDelivery.toFixed(2)}`}\n`
                : `Delivery: ৳0.00\n`) +
            `Subtotal: ৳${subtotal.toFixed(2)}\n` +
            `Total: ৳${grandTotal.toFixed(2)}\n` +
            (usePartial ? `Partial: ৳${cleanPartial.toFixed(2)}\n` : "") +
            `Due on Delivery: ৳${dueOnDelivery.toFixed(2)}`
        );
    };

    return (
        <>
            <div className="relative z-60 overflow-visible lg:px-[60px]">
                <TopNavbar />
            </div>

            <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_8%_-10%,#eef2ff_0%,transparent_60%),radial-gradient(1000px_600px_at_110%_-20%,#fdf2f8_0%,transparent_55%)] text-black">
                <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
                    {/* Header */}
                    <div className="mb-6 lg:mb-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Payment</h1>
                            <p className="mt-2 text-slate-600">Cash on Delivery with optional partial advance.</p>
                        </div>
                        <Link
                            to="/checkout"
                            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-slate-200 bg-white hover:bg-black hover:text-white hover:shadow-sm active:scale-[0.98] transition"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Cart
                        </Link>
                    </div>

                    {/* Free shipping unlocked banner */}
                    {pickupOption === "home" && freeShipUnlocked && (
                        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-medium">
                                You’ve unlocked <b>Free Home Delivery</b> for orders over ৳{FREE_SHIP_THRESHOLD.toLocaleString()}!
                            </span>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left: Customer + Fulfilment + COD */}
                        <section className="lg:col-span-2 space-y-6">
                            {/* Customer info */}
                            <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-5 shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Customer Details</h2>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label pb-1">
                                            <span className="label-text text-slate-700">Customer Name</span>
                                        </label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                            <input
                                                className="input input-bordered w-full pl-10"
                                                placeholder="e.g., Md. Rahim"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label pb-1">
                                            <span className="label-text text-slate-700">Phone No</span>
                                        </label>
                                        <div className="relative">
                                            <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                            <input
                                                className="input input-bordered w-full pl-10"
                                                placeholder="01XXXXXXXXX"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Fulfilment */}
                            <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-5 shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Pickup / Delivery</h2>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPickupOption("shop")}
                                        className={`h-12 rounded-xl border px-4 flex items-center justify-center gap-2 transition ${pickupOption === "shop"
                                            ? "bg-black text-white font-bold"
                                            : "border-slate-200 bg-white hover:bg-slate-50"
                                            }`}
                                    >
                                        <Store className="h-4 w-4" />
                                        Pickup from Shop
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPickupOption("home")}
                                        className={`h-12 rounded-xl border px-4 flex items-center justify-center gap-2 transition ${pickupOption === "home"
                                            ? "border-white-500 bg-black text-white font-bold"
                                            : "border-slate-200 bg-white hover:bg-slate-50"
                                            }`}
                                    >
                                        <Home className="h-4 w-4" />
                                        Deliver to Home
                                    </button>
                                </div>

                                {/* Zone + Address only if home delivery */}
                                {pickupOption === "home" && (
                                    <div className="mt-5 grid sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-1">
                                            <label className="label pb-1">
                                                <span className="label-text text-slate-700">Delivery Zone</span>
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setZone("dhaka")}
                                                    className={`h-11 rounded-xl border transition ${zone === "dhaka"
                                                        ? "bg-black text-white font-bold"
                                                        : "border-slate-200 bg-white hover:bg-slate-50"
                                                        }`}
                                                >
                                                    Dhaka
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setZone("outside")}
                                                    className={`h-11 rounded-xl border transition ${zone === "outside"
                                                        ? "bg-black text-white font-bold"
                                                        : "border-slate-200 bg-white hover:bg-slate-50"
                                                        }`}
                                                >
                                                    Outside Dhaka
                                                </button>
                                            </div>
                                            <div className="mt-2 text-xs text-slate-500">
                                                {loadingCharge ? (
                                                    <span className="inline-flex items-center gap-2">
                                                        <span className="loading loading-spinner loading-xs" /> Loading delivery charge…
                                                    </span>
                                                ) : chargeError ? (
                                                    <span className="text-red-600">{chargeError}</span>
                                                ) : freeShipUnlocked ? (
                                                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                                                        <Truck className="h-3.5 w-3.5" />
                                                        Free delivery applied (over ৳{FREE_SHIP_THRESHOLD.toLocaleString()})
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-slate-600">
                                                        <Truck className="h-3.5 w-3.5" />
                                                        Current delivery charge: <b>৳{deliveryCharge.toFixed(2)}</b>
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-1">
                                            <label className="label pb-1">
                                                <span className="label-text text-slate-700">Address</span>
                                            </label>
                                            <textarea
                                                className="textarea resize-none textarea-bordered w-full min-h-28"
                                                placeholder="House, road, area"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* If shop pickup, show note */}
                                {pickupOption === "shop" && (
                                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                                        <MapPin className="inline-block mr-2 h-4 w-4 text-indigo-600" />
                                        You chose <b>Pickup from Shop</b>. Delivery charge is <b>৳0</b>. We’ll SMS you when it’s ready.
                                    </div>
                                )}
                            </div>

                            {/* COD only + Partial pay */}
                            <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-5 shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                                <label
                                    className={`
                    flex items-start gap-3 rounded-2xl border p-4 transition
                    border-gray-500 ring-2 ring-indigo-200 bg-indigo-50/40
                  `}
                                >
                                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5">
                                        <Wallet className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Cash on Delivery (COD)</div>
                                        <div className="text-sm text-slate-600">
                                            Pay the due amount to the delivery agent on arrival.
                                        </div>
                                    </div>
                                </label>

                                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <div className="font-semibold">Partial Pay (optional)</div>
                                            <p className="text-sm text-slate-600">
                                                Reserve your order by paying a small advance now. The rest will be due on delivery.
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-[black]"
                                            checked={usePartial}
                                            onChange={(e) => setUsePartial(e.target.checked)}
                                        />
                                    </div>

                                    {usePartial && (
                                        <div className="mt-4 grid sm:grid-cols-3 gap-3">
                                            <div className="sm:col-span-2">
                                                <label className="label pb-1">
                                                    <span className="label-text text-slate-700">Advance amount (৳)</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="input input-bordered w-full no-spinner"
                                                    value={partialAmount}
                                                    onChange={(e) => setPartialAmount(e.target.value)}
                                                    placeholder="e.g., 200"
                                                />
                                                <p className="mt-1 text-xs text-slate-500">
                                                    Demo only — connect a payment gateway to actually collect this advance.
                                                </p>
                                            </div>

                                            <div className="sm:col-span-1">
                                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 h-full flex flex-col justify-center">
                                                    <div className="text-xs text-slate-600">Grand Total</div>
                                                    <div className="text-lg font-bold">৳{grandTotal.toFixed(2)}</div>
                                                    <div className="mt-1 text-xs text-slate-600">Due after advance</div>
                                                    <div className="text-lg font-bold text-emerald-700">৳{dueOnDelivery.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Right: Summary */}
                        <aside className="lg:sticky lg:top-6 h-fit">
                            <div className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur p-6 lg:p-7 shadow-md">
                                <div className="mb-5 flex items-center justify-between">
                                    <h2 className="text-2xl font-extrabold tracking-tight">Order Summary</h2>
                                    <Link
                                        to="/checkout"
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4"
                                    >
                                        Edit cart
                                    </Link>
                                </div>

                                {/* Items list (taller & with thumbnail) */}
                                <div className="max-h-72 overflow-auto rounded-xl border border-slate-200 divide-y bg-white">
                                    {items.map((x) => (
                                        <div key={x.id} className="flex items-center gap-3 p-3">
                                            {x.imageUrl ? (
                                                <img
                                                    src={x.imageUrl}
                                                    alt={x.name}
                                                    className="h-12 w-12 rounded-lg object-cover border border-slate-200"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200" />
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <div className="truncate text-sm font-medium text-slate-900">{x.name}</div>
                                                <div className="text-xs text-slate-600">
                                                    Qty {x.qty} × ৳{Number(x.price).toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="text-sm font-semibold text-slate-900">
                                                ৳{(x.qty * Number(x.price)).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Cost breakdown */}
                                <div className="mt-5 space-y-2 text-[15px]">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Subtotal</span>
                                        <span className="font-semibold text-slate-900">৳{subtotal.toFixed(2)}</span>
                                    </div>

                                    <div className="flex items-start justify-between">
                                        <span className="text-slate-600 inline-flex items-center gap-1">
                                            <Truck className="h-4 w-4" />
                                            {pickupOption === "home"
                                                ? `Delivery (${zone === "dhaka" ? "Dhaka" : "Outside Dhaka"})`
                                                : "Pickup from Shop"}
                                        </span>

                                        {/* charge + discount visualization */}
                                        <span className="font-semibold text-slate-900">
                                            {pickupOption === "shop" ? (
                                                "৳0.00"
                                            ) : loadingCharge ? (
                                                "…"
                                            ) : freeShipUnlocked ? (
                                                <span className="inline-flex items-center gap-2">
                                                    <span className="line-through text-slate-500">
                                                        ৳{deliveryCharge.toFixed(2)}
                                                    </span>
                                                    <span className="text-emerald-700 font-bold">৳0</span>
                                                </span>
                                            ) : (
                                                `৳${deliveryCharge.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>

                                    {/* Show explicit discount row if unlocked */}
                                    {pickupOption === "home" && !loadingCharge && freeShipUnlocked && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-emerald-700">Shipping discount</span>
                                            <span className="text-emerald-700 font-semibold">
                                                − ৳{deliveryCharge.toFixed(2)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="my-5 border-t border-slate-200" />

                                {/* Grand total + optional partial */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-lg lg:text-xl font-extrabold">
                                        <span>Total</span>
                                        <span>৳{grandTotal.toFixed(2)}</span>
                                    </div>

                                    {/* Partial pay summary (only when enabled) */}
                                    {usePartial && (
                                        <div className="mt-1 space-y-1 text-[15px]">
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Partial (advance)</span>
                                                <span className="font-semibold text-emerald-700">
                                                    − ৳{cleanPartial.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between font-bold">
                                                <span>Due on Delivery</span>
                                                <span>৳{dueOnDelivery.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Delivery estimate hint */}
                                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm">
                                    <div className="font-medium text-slate-900">Estimated delivery</div>
                                    <div className="text-slate-600">
                                        {pickupOption === "shop"
                                            ? "Pickup within 24–48 hours. You’ll receive an SMS when it’s ready."
                                            : zone === "dhaka"
                                                ? "Inside Dhaka: usually 1–3 business days."
                                                : "Outside Dhaka: usually 3–7 business days."}
                                    </div>
                                </div>

                                <button
                                    className="group btn w-full mt-6 h-12 text-base bg-black text-white hover:bg-gray-700 active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
                                    type="button"
                                    onClick={handleConfirm}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        Confirm Order
                                        <ShieldCheck className="h-4 w-4" />
                                    </span>
                                </button>

                                <p className="mt-3 text-[11px] text-slate-500 flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" />
                                    Your order details are protected. We do not store card data.
                                </p>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
