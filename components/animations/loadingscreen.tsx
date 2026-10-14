"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline } from "animejs";

export default function LoadingScreen() {
    const [isVisible,setIsVisible] = useState(true);

    const screenRef = useRef<HTMLDivElement>(null);
    const hexagonRef = useRef<SVGPathElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const percentageRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const screen = screenRef.current;
        const hexagon = hexagonRef.current;
        const progress = progressRef.current;
        const percentage = percentageRef.current;

        if (!screen || !hexagon || !progress || !percentage) return;

        const length = hexagon.getTotalLength();

        // Il bordo arancione parte nascosto.
        hexagon.style.strokeDasharray = `${length}`;
        hexagon.style.strokeDashoffset = `${length}`;

        const counter = { value: 0 };

        const timeline = createTimeline({
        defaults: {
            ease: "inOut(2)",
        },
        onComplete: () => {
            setIsVisible(false);
        },
        });

        // L'arancione percorre tutto il contorno esagonale.
        timeline.add(hexagon,{strokeDashoffset: [length, 0],duration: 2400,ease: "linear",},0,
        );

        // Barra di caricamento sincronizzata.
        timeline.add(progress,{scaleX: [0, 1],duration: 2400,ease: "linear",},0,);

        // Percentuale sincronizzata con il bordo.
        timeline.add(counter,{
            value: 100,
            duration: 2400,ease: "linear",
            onUpdate: () => {percentage.textContent = `${Math.round(counter.value)}%`;},},0,);

        // Breve pausa e uscita della schermata.
        timeline.add(screen,{translateY: "-100%",duration: 750,ease: "inOut(3)",},2750,);

        return () => {
        timeline.cancel();
        };
    }, []);

    if (!isVisible) return null

        return (
        <div
        ref={screenRef}
        className="loading-screen"
        role="status"
        aria-label="Caricamento del sito"
        >
        <div className="loading-content">
            <svg
            viewBox="0 0 120 120"
            width="120"
            height="120"
            className="hexagon-logo"
            aria-hidden="true"
            >
            {/* Esagono vuoto */}
            <path
                className="hexagon-base"
                d="M60 7 L106 33.5 L106 86.5 L60 113 L14 86.5 L14 33.5 Z"
            />

            {/* Esagono Pieno */}
            <path
                ref={hexagonRef}
                className="hexagon-active"
                d="M60 7 L106 33.5 L106 86.5 L60 113 L14 86.5 L14 33.5 Z"
            />
            {/* Lettera G */}
            <text x="60" y="80" textAnchor="middle" className="logo-g">
                G
            </text>
            </svg>

            <p className="loading-label">SYS / 01 — INITIALIZING</p>

            <div className="progress-track">
            <div ref={progressRef} className="progress-fill" />
            </div>

            <div className="progress-info">
            <span>SYSTEM BOOT</span>
            <span ref={percentageRef}>0%</span>
            </div>
        </div>
        </div>
    );
    }
