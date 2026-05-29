const navItems = ["About", "Research & Insights", "Marble Labs", "API", "Spark", "Careers"];

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-16 py-4" style={{ backgroundColor: "#F9F9FB", fontFamily: "'ES Build', sans-serif" }}>
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <img src="/logo.png" alt="Haven Logo" className="w-12 h-12" />
        <span className="text-gray-900 font-bold text-2xl" style={{ fontWeight: 600 }}>Haven</span>
      </div>
        <div className="flex gap-10">
      {/* Navigation Menu - Centered */}
      <nav className="hidden lg:flex items-center gap-10">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="nav-item text-[14px]"
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
      </div>
    </header>
  );
}
