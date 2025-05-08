export default function SiteHeader() {
    return (
      <header className="w-full bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">IPO Advisory Tool</h1>
        <nav className="space-x-4 text-gray-600">
          <a href="/" className="hover:text-blue-500">Home</a>
          <a href="/register" className="hover:text-blue-500">Register</a>
          <a href="/inputs" className="hover:text-blue-500">Inputs</a>
        </nav>
      </header>
    );
  }
  