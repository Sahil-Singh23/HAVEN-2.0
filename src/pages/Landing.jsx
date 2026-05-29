import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div 
      className="w-full min-h-screen"
      style={{
        backgroundColor: "#F9F9FB"
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center mt-12 px-4 text-center">
          {/* Star Icon */}
          <div className="mb-12">
            <div className="inline-block">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="text-blue-400"
              >
                <path
                  d="M20 2L24.47 15.53H38.54L27.54 23.47L32 37L20 29.06L8 37L12.46 23.47L1.46 15.53H15.53L20 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl leading-tight"
          >
            A virtual workspace<br />
            that feels refreshingly human
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl leading-relaxed"
          >
            Meet, chat, and work together like you're in person.<br />
            No scheduling needed for quick interactions.
          </p>

          {/* CTA Button */}
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl">
            Join space
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
