'use client';

import { useTheme } from "./ThemeProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, forwardRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ShortSummery = () => {

    const { colors } = useTheme();
    const container = useRef(null);

    useGSAP(() => {
        gsap.fromTo(".summary-text", 
            { 
                opacity: 0, 
                y: -250 
            },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: container });

    return (
        <section 
            ref={container}
            className="absolute md:top-0 lg:top-4 right-0 z-50"
        >
            <div 
                className="summary-card rounded-lg p-2 lg:mt-4 max-w-md md:max-w-xl overflow-hidden mr-4"
                style={{ backgroundColor: colors.secondaryBackground }}
            >
                {/* Background image positioned behind text */}
                <img 
                    src="/doodle_arrow2-fotor-2.png" 
                    alt="Decorative Arrow"
                    className="absolute top-0 right-0 md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] -mt-8 md:-mt-8 -mr-14 md:mr-20 lg:mr-20 object-contain opacity-80 pointer-events-none "
                    style={{ transform: 'rotate(-145deg)', zIndex: 0, position: 'absolute' }}
                />

                {/* Text content */}
                <div 
                    className="summary-text font-nata text-thin text-lg md:text-3xl w-[300px] md:w-[490px] text-right leading-relaxed relative z-10"
                    style={{ color: colors.accent }}
                >
                <p>
                    {"In blind cricket, vision is not seen through the eyes, but through courage, teamwork, and the unyielding spirit to play."}
                </p>
                </div>
            </div>
        </section>
    )
}

export default ShortSummery;