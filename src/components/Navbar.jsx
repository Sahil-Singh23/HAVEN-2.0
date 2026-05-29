const navItems = ["About", "Research & Insights", "Marble Labs", "API", "Spark", "Careers"];

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-16 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">⚡</span>
        </div>
        <span className="text-gray-900 font-bold text-lg">Haven</span>
      </div>

      {/* Navigation Menu - Centered */}
      <nav className="hidden lg:flex items-center gap-12">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-gray-600 hover:text-gray-900 transition text-sm font-medium"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* CTA Button */}
      <button className="px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition font-medium text-sm flex-shrink-0">
        Get Started
      </button>
    </header>
  );
}
