import { Link } from 'react-router-dom'

function SiteHeader() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Capstone-IPO
        </Link>
        <nav className="flex gap-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/inputs">Inputs</Link>
          <Link to="/results">Results</Link>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
