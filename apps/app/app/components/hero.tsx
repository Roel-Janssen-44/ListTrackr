"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Hero() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-4">
      {/* HERO SECTION */}
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="max-w-[767px] text-center text-3xl leading-[1.1]">
          Task management <br />
          made <span className="text-pink">fun</span>
        </h1>
        <p className="max-w-[467px] text-center">
          Make the hard parts simple, and life becomes more fun.
        </p>
      </div>

      {/* ILLUSTRATION CANVAS */}
      <div className="pointer-events-none absolute inset-0 z-10 h-screen w-full overflow-hidden">
        <Illustrations illustrations={illustrations} />
      </div>

      {/* SECOND SECTION */}
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="max-w-[767px] text-center">
          Whats in the <span className="text-pink">box?</span>
        </h1>
        <p className="max-w-[467px] text-center">
          Make the hard parts simple, and life becomes more fun.
        </p>
      </div>
    </div>
  );
}

function Illustrations({ illustrations }: { illustrations: any[] }) {
  const [progress, setProgress] = useState(0); // value 0 → 1

  useEffect(() => {
    const handleScroll = () => {
      // measure scroll from first → second section
      const maxScroll = window.innerHeight; // adjust if needed
      const p = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setProgress(p);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {illustrations.map((ill, i) => (
        <Illustration
          key={i}
          illustration={ill.illustration}
          // hiddenPosition={ill.hiddenPosition}
          initialPosition={ill.initialPosition}
          finalPosition={ill.finalPosition}
          size={ill.size}
          progress={progress}
          duration={ill.duration}
        />
      ))}
    </>
  );
}
function Illustration({
  illustration,
  initialPosition,
  finalPosition,
  size,
  progress,
  duration = 1.2,
}: {
  illustration: string;
  initialPosition: { x: string; y: string };
  finalPosition: { x: string; y: string };
  size: number;
  progress: number;
  duration?: number;
}) {
  const [introDone, setIntroDone] = useState(false);

  const fromLeft = parseFloat(initialPosition.x) < 50;

  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIntroProgress(1);
      setIntroDone(true);
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  const blendedProgress = Math.max(progress, introProgress * 0.001);

  const introOffsetX = fromLeft ? -300 : 300;
  const introOffsetY = 0;

  return (
    <>
      <div
        className="fixed z-50"
        style={{
          top: initialPosition.y,
          left: initialPosition.x,
        }}
      >
        {illustration}
      </div>
      <motion.img
        src={`/illustrations/${illustration}.svg`}
        width={size}
        height={size}
        className="fixed -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, x: introOffsetX, y: introOffsetY }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration, ease: "easeOut" }}
        style={{
          top: `calc(${initialPosition.y} + (${blendedProgress} * (${finalPosition.y} - ${initialPosition.y})))`,
          left: `calc(${initialPosition.x} + (${blendedProgress} * (${finalPosition.x} - ${initialPosition.x})))`,
        }}
      />
    </>
  );
}

const illustrations = [
  {
    illustration: "1",
    hiddenPosition: { x: "0%", y: "50%" },
    initialPosition: { x: "5%", y: "25%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 400,
    duration: 2.2,
  },
  {
    illustration: "2",
    hiddenPosition: { x: "100%", y: "50%" },
    initialPosition: { x: "72.5%", y: "37.5%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 50,
    duration: 0.5,
  },
  {
    illustration: "3",
    hiddenPosition: { x: "0%", y: "50%" },
    initialPosition: { x: "1%", y: "12%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 60,
    duration: 2.1,
  },
  {
    illustration: "4",
    hiddenPosition: { x: "100%", y: "50%" },
    initialPosition: { x: "75%", y: "55%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 150,
    duration: 0.6,
  },
  {
    illustration: "5",
    hiddenPosition: { x: "0%", y: "50%" },
    initialPosition: { x: "16%", y: "46%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 180,
    duration: 1.4,
  },
  {
    illustration: "6",
    hiddenPosition: { x: "0%", y: "50%" },
    initialPosition: { x: "12%", y: "60%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 90,
    duration: 1.2,
  },
  {
    illustration: "7",
    hiddenPosition: { x: "-3%", y: "55%" },
    initialPosition: { x: "-2%", y: "55%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 300,
    duration: 2.0,
  },
  {
    illustration: "8",
    hiddenPosition: { x: "0%", y: "50%" },
    initialPosition: { x: "0%", y: "85%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 220,
    duration: 1.9,
  },
  {
    illustration: "9",
    hiddenPosition: { x: "0%", y: "50%" },
    initialPosition: { x: "17.5%", y: "73%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 250,
    duration: 1.5,
  },
  {
    illustration: "10",
    hiddenPosition: { x: "100%", y: "50%" },
    initialPosition: { x: "75%", y: "25%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 180,
    duration: 0.9,
  },
  {
    illustration: "11",
    hiddenPosition: { x: "0%", y: "50%" },
    initialPosition: { x: "25%", y: "55%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 60,
    duration: 0.7,
  },
  {
    illustration: "12",
    hiddenPosition: { x: "100%", y: "50%" },
    initialPosition: { x: "88%", y: "62%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 40,
    duration: 1.6,
  },
  {
    illustration: "13",
    hiddenPosition: { x: "0%", y: "50%" },
    initialPosition: { x: "25%", y: "37.5%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 50,
    duration: 0.8,
  },
  {
    illustration: "14",
    hiddenPosition: { x: "100%", y: "50%" },
    initialPosition: { x: "82.5%", y: "15%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 30,
    duration: 1,
  },
  {
    illustration: "15",
    hiddenPosition: { x: "100%", y: "50%" },
    initialPosition: { x: "86%", y: "28%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 60,
    duration: 1.1,
  },
  {
    illustration: "16",
    hiddenPosition: { x: "100%", y: "50%" },
    initialPosition: { x: "94%", y: "80%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 400,
    duration: 1.7,
  },
  {
    illustration: "17",
    hiddenPosition: { x: "0%", y: "50%" },
    initialPosition: { x: "15%", y: "22%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 200,
    duration: 1.3,
  },
  {
    illustration: "18",
    hiddenPosition: { x: "100%", y: "50%" },
    initialPosition: { x: "100%", y: "15%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 450,
    duration: 1.8,
  },
  {
    illustration: "19",
    hiddenPosition: { x: "100%", y: "50%" },
    initialPosition: { x: "90%", y: "50%" },
    finalPosition: { x: "50%", y: "50%" },
    size: 200,
    duration: 1.7,
  },
];
