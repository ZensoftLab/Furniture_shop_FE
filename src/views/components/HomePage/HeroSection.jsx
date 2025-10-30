import React, { useEffect, useState, useRef } from "react";

const slides = [
    { src: "/images/hero-0.jpg", alt: "Hero 1" },
    { src: "/images/hero-1.jpg", alt: "Hero 2" },
    { src: "/images/hero-2.jpg", alt: "Hero 3" },
];

// Simulate API data for the texts for each slide
const texts = [
    { title: "Cozy vibes", subtitle: "Endless dreams" },
    { title: "Relax and unwind", subtitle: "Your perfect comfort zone" },
    { title: "Create memories", subtitle: "In the heart of your home" },
];

function HeroSection() {
    const base = slides;
    const tripled = [...base, ...base, ...base];
    const BASE_LEN = base.length;
    const START = BASE_LEN; // start in the middle block

    const [index, setIndex] = useState(START);
    const [currentText, setCurrentText] = useState(texts[START % BASE_LEN]); // Initialize text for the first slide
    const [withTransition, setWithTransition] = useState(true);
    const autoplayRef = useRef(null);

    // Handlers
    // const next = () => setIndex((i) => (i + 1) % tripled.length); // Loop to the next index
    // const prev = () => setIndex((i) => (i - 1 + tripled.length) % tripled.length); // Loop to the previous index

    // Autoplay every 5s
    useEffect(() => {
        const play = () => {
            autoplayRef.current = setInterval(() => setIndex((i) => (i + 1) % tripled.length), 5000);
        };
        play();
        return () => clearInterval(autoplayRef.current);
    }, [tripled.length]);

    // Pause on tab hidden; resume on visible
    useEffect(() => {
        const onVis = () => {
            clearInterval(autoplayRef.current);
            if (document.visibilityState === "visible") {
                autoplayRef.current = setInterval(() => setIndex((i) => (i + 1) % tripled.length), 5000);
            }
        };
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, [tripled.length]);

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

    // Update the text after 50% of the transition (simulate API data)
    useEffect(() => {
        const updateText = () => {
            // Get the current text based on the index
            setCurrentText(texts[index % BASE_LEN]);
        };

        // Trigger text change after 50% of transition time (use setTimeout to simulate delay)
        const timer = setTimeout(updateText, 350); // Wait before updating text

        return () => clearTimeout(timer); // Clean up the timer
    }, [BASE_LEN, index]);

    // Inline styles for transform
    const trackStyle = {
        transform: `translateX(-${index * 100}%)`,
        transition: withTransition ? "transform 700ms ease-in-out" : "none",
        willChange: "transform",
    };

    return (
        <div className="relative w-full h-[500px] sm:h-[400px] md:h-[80vh] z-0 overflow-hidden">
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

                        {/* Overlay with dynamic text */}
                        <div className="absolute inset-0 w-1/2 bg-black opacity-50 flex justify-center items-center">
                            <div className="text-center text-white">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">{currentText.title}</h1>
                                <p className="mt-4 text-lg sm:text-xl md:text-2xl">{currentText.subtitle}</p>
                            </div>
                        </div>

                        {/* Arrows */}
                        {/* <div className="pointer-events-none absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
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
                        </div> */}
                    </div>
                ))}
            </div>

            {/* Indicators (optional, synced to base index) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {base.map((_, i) => {
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

