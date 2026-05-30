import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Canvas3D from "../components/Canvas3D";

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
          <button className="w-16 h-16 bg-black text-white rounded-full hover:bg-gray-800 transition font-semibold flex items-center justify-center shadow-lg hover:shadow-xl">
            <ArrowRight size={24} />
          </button>
          </div>

          {/* Right Content - 3D Model */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center" }} className="hidden lg:flex">
            <Canvas3D />
            {/* <div className="sketchfab-embed-wrapper" style={{ 
  width: '100%', 
  height: '600px', 
  position: 'relative', 
  overflow: 'hidden',
  pointerEvents: 'none' 
}}>
  <iframe 
    title="Cozy Isometric Room" 
    frameBorder="0" 
    allowFullScreen 
    mozallowfullscreen="true" 
    webkitallowfullscreen="true" 
    allow="autoplay; fullscreen; xr-spatial-tracking" 
    execution-while-out-of-viewport="true" 
    execution-while-not-rendered="true" 
    web-share="true" 
    src="https://sketchfab.com/models/30523d6505db43a887eed8c040971146/embed?transparent=1&ui_infos=0&ui_controls=0&ui_watermark=0&ui_stop=0&ui_inspector=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_related=0&ui_hint=0&autostart=1"
    style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%', 
      height: '650px', 
      border: 'none',
      background: '#F9F9FB'
    }}
  />
</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
