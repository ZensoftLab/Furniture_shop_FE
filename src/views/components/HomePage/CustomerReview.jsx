import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const reviews = [
    { id: 1, username: "Ayesha Rahman", productImageUrl: "/images/card-1.jpg", rating: 5, comment: "Absolutely love the quality! The finish is premium and delivery was quick." },
    { id: 2, username: "Tanvir Hasan", productImageUrl: "/images/card-2.jpg", rating: 4, comment: "Solid build and comfy to use. Packaging could be better, but product is great." },
    { id: 3, username: "Nusrat Jahan", productImageUrl: "/images/card-3.jpg", rating: 5, comment: "Exceeded expectations—looks even better in person. Highly recommended!" },
    { id: 4, username: "Imran Hossain", productImageUrl: "/images/card-4.jpg", rating: 4, comment: "Great value for money. Assembly was straightforward and the fit is perfect." },
];

function StarRating({ value = 0, outOf = 5 }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: outOf }).map((_, i) => (
                <span key={i} className={i < value ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
        </div>
    );
}

function ReviewCard({ review }, ref) {
    return (
        <div
            ref={ref}
            data-review-card
            className="card bg-base-100 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all w-[300px] sm:w-[350px] md:w-[400px] shrink-0"
        >
            <div className="w-full aspect-4/3 bg-base-200">
                <img
                    src={review.productImageUrl}
                    alt={`Product reviewed by ${review.username}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <StarRating value={review.rating} />
                <p className="mt-2 text-sm text-base-content/80 leading-relaxed">“{review.comment}”</p>
                <p className="mt-3 text-sm font-semibold">— {review.username}</p>
            </div>
        </div>
    );
}
const ForwardReviewCard = React.forwardRef(ReviewCard);

export default function CustomerReview() {
    const base = reviews;
    const tripled = [...base, ...base, ...base];
    const baseLen = base.length;
    const START = baseLen;

    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const firstCardRef = useRef(null);

    const GAP = 16;

    const [cardW, setCardW] = useState(300);
    const [isDesktop, setIsDesktop] = useState(false);
    const cardsPerView = isDesktop ? 4 : 1;

    const [index, setIndex] = useState(START);
    const [withTransition, setWithTransition] = useState(true);

    // desktop detection
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    // measure card width
    useLayoutEffect(() => {
        const measure = () => {
            const w = firstCardRef.current?.offsetWidth || 300;
            setCardW(w);
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (firstCardRef.current) ro.observe(firstCardRef.current);
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("resize", measure);
            ro.disconnect();
        };
    }, []);

    // set viewport width to show N cards per view
    useEffect(() => {
        if (viewportRef.current) {
            const totalGap = GAP * (cardsPerView - 1);
            viewportRef.current.style.width = `${cardsPerView * cardW + totalGap}px`;
        }
    }, [cardW, cardsPerView]);

    // translate track
    const offsetX = -(index * (cardW + GAP));

    // seamless reset
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const onEnd = () => {
            if (index >= baseLen * 2) {
                setWithTransition(false);
                setIndex((prev) => prev - baseLen);
            }
            if (index < baseLen) {
                setWithTransition(false);
                setIndex((prev) => prev + baseLen);
            }
        };
        el.addEventListener("transitionend", onEnd);
        return () => el.removeEventListener("transitionend", onEnd);
    }, [index, baseLen]);

    // re-enable transition after snap
    useEffect(() => {
        if (!withTransition) {
            const id = requestAnimationFrame(() => setWithTransition(true));
            return () => cancelAnimationFrame(id);
        }
    }, [withTransition]);

    // autoplay one card at a time
    useEffect(() => {
        const id = setInterval(() => setIndex((i) => i + 1), 3000);
        return () => clearInterval(id);
    }, []);

    // swipe/drag
    useEffect(() => {
        const vp = viewportRef.current;
        if (!vp) return;
        let startX = 0;
        let dragging = false;

        const getX = (e) => e.clientX ?? e.touches?.[0]?.clientX ?? 0;

        const onDown = (e) => {
            dragging = true;
            startX = getX(e);
            setWithTransition(false);
        };
        const onMove = (e) => {
            if (!dragging) return;
            const dx = getX(e) - startX;
            if (trackRef.current) {
                trackRef.current.style.transform = `translateX(${offsetX + dx}px)`;
            }
        };
        const onUp = (e) => {
            if (!dragging) return;
            dragging = false;
            const dx = getX(e) - startX;
            setWithTransition(true);
            if (dx < -50) setIndex((i) => i + 1);
            else if (dx > 50) setIndex((i) => i - 1);
            else setIndex((i) => i);
        };

        vp.addEventListener("mousedown", onDown);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);

        vp.addEventListener("touchstart", onDown, { passive: true });
        window.addEventListener("touchmove", onMove, { passive: true });
        window.addEventListener("touchend", onUp);

        return () => {
            vp.removeEventListener("mousedown", onDown);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
            vp.removeEventListener("touchstart", onDown);
            window.removeEventListener("touchmove", onMove);
            window.removeEventListener("touchend", onUp);
        };
    }, [offsetX]);

    return (
        <>
            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            <h2 className="text-center text-3xl md:text-5xl font-bold my-8">Customer Reviews</h2>

            <div className="flex justify-center">
                <div ref={viewportRef} className="relative overflow-hidden no-scrollbar">
                    <div
                        ref={trackRef}
                        className="flex items-stretch"
                        style={{
                            gap: `${GAP}px`,
                            transform: `translateX(${offsetX}px)`,
                            transition: withTransition ? "transform 500ms ease" : "none",
                            willChange: "transform",
                        }}
                    >
                        {tripled.map((r, idx) => (
                            <ForwardReviewCard
                                key={`${r.id}-${idx}`}
                                review={r}
                                ref={idx === START ? firstCardRef : undefined}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
