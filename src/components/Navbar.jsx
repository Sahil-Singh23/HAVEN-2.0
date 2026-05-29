const navItems = ["About", "Research & Insights", "Marble Labs", "API", "Spark", "Careers"];

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-16 py-4" style={{ backgroundColor: "#F9F9FB", fontFamily: "'ES Build', sans-serif" }}>
      {/* Logo */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 40 40"
          fill="none"
          style={{ color: "#6B8E23" }}
        >
          <path
            d="M20 2L24.47 15.53H38.54L27.54 23.47L32 37L20 29.06L8 37L12.46 23.47L1.46 15.53H15.53L20 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
        <span className="text-gray-900 font-bold text-2xl" style={{ fontWeight: 600 }}>Haven</span>
      </div>

      {/* Navigation Menu - Centered */}
      <nav className="hidden lg:flex items-center gap-12">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="nav-item text-sm"
            style={{ fontWeight: 400, fontFamily: '"roobert", "roobert Fallback", sans-serif' }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* CTA Button */}
      <button className="px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition text-sm flex-shrink-0" style={{ fontWeight: 600, fontFamily: '"roobert", "roobert Fallback", sans-serif' }}>
        Get Started
      </button>
    </header>
  );
}
