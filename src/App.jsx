import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Inputs from './pages/Inputs.jsx'
import Results from './pages/Results.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx' // ✅ add this

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inputs" element={<Inputs />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <SiteFooter /> {/* ✅ footer appears at bottom */}
      </div>
    </Router>
  )
}

export default App
