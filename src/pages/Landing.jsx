import { ArrowRight } from "lucide-react";

const navItems = ["Home", "Features", "About", "Pricing", "Resources"];

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.png')",
          filter: "saturate(0.75) brightness(0.95)"
        }}
      >
        {/* Subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/15"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Header */}
        <header className="flex items-center justify-between px-8 py-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
              <span className="text-blue-600 font-bold text-lg">H</span>
            </div>
            <span className="text-gray-900 font-semibold text-xl" style={{ textShadow: "0 1px 3px rgba(255, 255, 255, 0.2)" }}>haven</span>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 hover:text-gray-600 transition text-sm font-medium"
                style={{ textShadow: "0 1px 2px rgba(255, 255, 255, 0.1)" }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Log In Button */}
          <button className="px-6 py-2 border-2 border-gray-800 text-gray-900 rounded-full hover:bg-gray-100 transition font-medium" style={{ textShadow: "0 1px 2px rgba(255, 255, 255, 0.1)" }}>
            Log in
          </button>
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          {/* Star Icon */}
          <div className="mb-12">
            <div className="inline-block">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="text-blue-500"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" }}
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
            style={{
              textShadow: "0 2px 8px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)"
            }}
          >
            A virtual workspace<br />
            that feels refreshingly human
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl leading-relaxed"
            style={{
              textShadow: "0 2px 6px rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15)"
            }}
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
