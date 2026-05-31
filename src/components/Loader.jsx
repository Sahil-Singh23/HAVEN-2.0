import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Loader({ onFinished }) {
  const { active, progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Smoothly increment the loader from 0 to 100
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        // Ensure display progress doesn't exceed actual progress
        const targetProgress = Math.max(progress, prev);
        
        // If we reached 100 and model loading has completed, wrap it up
        if (prev >= 100) {
          clearInterval(timer);
          // Small pause before starting the fade-out for visual polish
          setTimeout(() => setShouldFadeOut(true), 300);
          return 100;
        }

        // Calculate increment step to make progress count smoothly
        let increment = 1;
        if (targetProgress - prev > 15) {
          // Accelerate if actual loading is much further ahead
          increment = Math.ceil((targetProgress - prev) / 10);
        }
        
        const next = prev + increment;
        
        // Hold at 99 until Three.js signals that loading is fully active = false & progress >= 100
        if (next >= 100) {
          if (progress >= 100 && !active) {
            return 100;
          }
          return 99;
        }
        
        return next;
      });
    }, 20); // ~50fps

    return () => clearInterval(timer);
  }, [progress, active]);

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
        {/* Giant Progress Number in the bottom left */}
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
