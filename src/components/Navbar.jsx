const navItems = ["Home", "Features", "About", "Pricing", "Resources"];

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">H</span>
        </div>
        <span className="text-white font-semibold text-xl">haven</span>
      </div>

      {/* Navigation Menu */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-gray-700 hover:text-gray-600 transition text-sm font-medium"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Log In Button */}
      <button className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded-full hover:bg-gray-100 transition font-medium">
        Log in
      </button>
    </header>
  );
}
