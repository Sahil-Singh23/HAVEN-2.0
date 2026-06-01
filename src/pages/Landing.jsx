import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Canvas3D from "../components/Canvas3D";
import SketchFabModel from "../components/SkectchFabModel";

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
        <div className="flex-1 flex items-start mt-20 px-16 text-left gap-12 overflow-hidden">
          {/* Left Content */}
          <div className="flex flex-col flex-1 mt-34" style={{ minWidth: 0 }}>
          {/* Main Heading */}
          <h1 
            className="text-5xl md:text-[85px] leading-tight -mb-8"
            style={{ color: "#2E2E38", fontFamily: "'Gilda Display', serif", fontWeight: 200, letterSpacing: "-4px" }}
          >
            Haven
          </h1>

          {/* Subtitle */}
          <h2 
            className="text-5xl md:text-[80px] leading-tight mt-2"
            style={{ color: "#9494A9", fontFamily: "'Gilda Display', serif", fontWeight: 200, letterSpacing: "-4px" }}
          >
            Interactive world
          </h2>

          {/* Description */}
          <p 
            className="text-lg md:text-xl max-w-2xl ml-1 leading-relaxed mb-8 text-justify"
            style={{ color: "#9494A9", fontFamily: '"roobert", "roobert Fallback", sans-serif' }}
          >
            Haven is a virtual workspace designed for seamless collaboration — one where you can meet, chat, and work together naturally, as if you're in the same room.
          </p>

          {/* CTA Button */}
          <a href="https://haven-interactive-world.vercel.app/">
            <button className="w-16 h-16 bg-black text-white rounded-full hover:bg-gray-800 transition font-semibold flex items-center justify-center shadow-lg hover:shadow-xl" >
              <ArrowRight size={24} />
            </button>
          </a>
          </div>

          {/* Right Content - 3D Model */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center" }} className="hidden lg:flex">
            {/* <Canvas3D /> */}
            <SketchFabModel/>
          </div>
        </div>
      </div>
    </div>
  );
}
