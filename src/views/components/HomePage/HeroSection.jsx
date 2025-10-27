import React, { useEffect, useRef, useState } from "react";

const slides = [
    { src: "/images/hero-1.jpg", alt: "Hero 1" },
    { src: "/images/hero-2.jpg", alt: "Hero 2" },
    { src: "/images/hero-1.jpg", alt: "Hero 3" }, // replace with hero-3 if you have it
];

function HeroSection() {
    // Tripled list for seamless infinite loop
    const base = slides;
    const tripled = [...base, ...base, ...base];
    const BASE_LEN = base.length;
    const START = BASE_LEN; // start in the middle block

    const [index, setIndex] = useState(START);
    const [withTransition, setWithTransition] = useState(true);
    const autoplayRef = useRef(null);

    // Handlers
    const next = () => setIndex((i) => i + 1);
    const prev = () => setIndex((i) => i - 1);

    // Autoplay every 5s
    useEffect(() => {
        const play = () => {
            autoplayRef.current = setInterval(() => setIndex((i) => i + 1), 5000);
        };
        play();
        return () => clearInterval(autoplayRef.current);
    }, []);

    // Pause on tab hidden; resume on visible
    useEffect(() => {
        const onVis = () => {
            clearInterval(autoplayRef.current);
            if (document.visibilityState === "visible") {
                autoplayRef.current = setInterval(() => setIndex((i) => i + 1), 5000);
            }
        };
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    // Seamless reset after crossing edges
    const onTransitionEnd = () => {
        if (index >= BASE_LEN * 2) {
            setWithTransition(false);
            setIndex((i) => i - BASE_LEN); // snap back by one block
        }
        if (index < BASE_LEN) {
            setWithTransition(false);
            setIndex((i) => i + BASE_LEN); // snap forward by one block
        }
    };

    // Re-enable transition one tick after a snap
    useEffect(() => {
        if (!withTransition) {
            const id = requestAnimationFrame(() => setWithTransition(true));
            return () => cancelAnimationFrame(id);
        }
    }, [withTransition]);

    // Inline styles for transform
    const trackStyle = {
        transform: `translateX(-${index * 100}%)`,
        transition: withTransition ? "transform 700ms ease-in-out" : "none",
        willChange: "transform",
    };

    return (
        // Lower z-index so navbar/dropdowns render above
        <div className="relative w-full h-[500px] sm:h-[400px] md:h-[750px] z-0 overflow-hidden">
            {/* Track */}
            <div
                className="flex w-full h-full"
                style={trackStyle}
                onTransitionEnd={onTransitionEnd}
            >
                {tripled.map((s, idx) => (
                    <div key={`${s.src}-${idx}`} className="relative w-full h-full shrink-0">
                        <img
                            src={s.src}
                            alt={s.alt}
                            className="w-full h-full object-cover"
                            draggable="false"
                        />

                        {/* Arrows */}
                        <div className="pointer-events-none absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <button
                                type="button"
                                className="btn btn-circle pointer-events-auto"
                                onClick={prev}
                                aria-label="Previous slide"
                            >
                                ❮
                            </button>
                            <button
                                type="button"
                                className="btn btn-circle pointer-events-auto"
                                onClick={next}
                                aria-label="Next slide"
                            >
                                ❯
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicators (optional, synced to base index) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {base.map((_, i) => {
                    // Normalize current position inside the middle block
                    const logical = ((index - START) % BASE_LEN + BASE_LEN) % BASE_LEN;
                    const active = logical === i;
                    return (
                        <button
                            key={i}
                            className={`btn btn-xs btn-circle ${active ? "" : "btn-outline"}`}
                            onClick={() => setIndex(START + i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default HeroSection;
