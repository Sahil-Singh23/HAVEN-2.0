import { useEffect, useState, useRef } from "react";

export default function SketchFabLoader({ progress, active, onFinished }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Track if model loading phase has completed
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  
  // Refs to hold the starting values for the final 2800ms delay phase
  const startProgressValRef = useRef(0);
  const startTimeRef = useRef(0);

  // Monitor when the model actually finishes loading
  useEffect(() => {
    if (progress >= 100 && !active && !isModelLoaded) {
      setIsModelLoaded(true);
    }
  }, [progress, active, isModelLoaded]);

  // Main animation effect
  useEffect(() => {
    let timer;

    if (!isModelLoaded) {
      // Phase 1: Model is downloading. Target is capped at 80%
      timer = setInterval(() => {
        setDisplayProgress((prev) => {
          const target = Math.floor(progress * 0.8);
          if (prev >= target) return prev;
          
          let increment = 1;
          if (target - prev > 15) {
            increment = Math.ceil((target - prev) / 10);
          }
          return Math.min(80, prev + increment);
        });
      }, 20);
    } else {
      // Phase 2: Model is loaded. Count from current progress to 100 over exactly 3000ms
      startProgressValRef.current = displayProgress;
      startTimeRef.current = Date.now();

      timer = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const totalDuration = 0; // Delay duration (allows player UI to hide)

        if (elapsed >= totalDuration) {
          clearInterval(timer);
          setDisplayProgress(100);
          // Start the fade out transition immediately upon reaching 100
          setShouldFadeOut(true);
        } else {
          const ratio = elapsed / totalDuration;
          const startVal = startProgressValRef.current;
          const nextVal = Math.floor(startVal + (100 - startVal) * ratio);
          setDisplayProgress(Math.min(99, nextVal));
        }
      }, 16); // update at ~60fps for ultra-smooth transition
    }

    return () => clearInterval(timer);
  }, [isModelLoaded, progress]);

  useEffect(() => {
    if (shouldFadeOut) {
      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
        if (onFinished) onFinished();
      }, 600); // Syncs with transition-all duration-600
      return () => clearTimeout(fadeTimer);
    }
  }, [shouldFadeOut, onFinished]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end p-3 md:p-8 transition-all duration-600 ease-in-out ${
        shouldFadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundColor: "#F9F9FB",
        fontFamily: "'ES Build', sans-serif",
      }}
    >
      <div className="select-none">
        {/* Progress Number in the bottom left */}
        <div 
          className="text-[70px] md:text-[100px] font-medium leading-none tracking-tight"
          style={{ color: "#2E2E38" }}
        >
          {displayProgress}
        </div>
      </div>
    </div>
  );
}
