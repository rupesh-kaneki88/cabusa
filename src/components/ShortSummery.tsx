'use client';

import { useTheme } from "./ThemeProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ShortSummery = () => {

    const { colors, fontSizes } = useTheme();
    const container = useRef(null);
    const cardRef = useRef(null);

    useGSAP(() => {
        // Initial state - card only shows 40px
        gsap.set(cardRef.current, {
            height: "80px",
            overflow: "hidden"
        });

        // Scroll trigger animation
        gsap.to(cardRef.current, {
            height: "auto",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Text reveal animation
        gsap.fromTo(".summary-text", 
            { 
                opacity: 0, 
                y: 30 
            },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6,
                delay: 0.2,
                scrollTrigger: {
                    trigger: cardRef.current,
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
            className="w-full px-4 lg:px-12 md:px-8"
            style={{ backgroundColor: colors.background }}
        >
            <div className="container mx-auto max-w-4xl overflow-hidden">
                <div 
                    ref={cardRef}
                    className="summary-card mx-auto  -mt-14 rounded-lg p-6 md:p-8 transition-all duration-300"
                    style={{ 
                        backgroundColor: '#1B2A3A',
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)`,
                        border: `1px solid ${colors.text}30`,
                        minHeight: '40px'
                    }}
                >
                    <div className="summary-text text-lg text-center leading-relaxed" style={{ color: colors.text }}>
                        <p>
                            {
                                "Cricket for the blind is an adapted version of the sport designed to be fully accessible to visually impaired players. Using an audible ball filled with bearings and specific rules to support safety and fairness, the game emphasizes teamwork, skill, and inclusion. It offers visually impaired athletes an opportunity to compete at national and international levels, proving that passion for sport knows no boundaries."
                            }
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShortSummery;