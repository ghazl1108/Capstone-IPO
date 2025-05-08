import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Welcome to the <span className="text-blue-600">IPO Advisory Tool</span>
        </h1>
        <p className="text-lg text-gray-600">
          Predict your company’s IPO success with smart AI-driven insights. Analyze key financials, performance metrics, and market indicators.
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-600 text-white px-6 py-3 text-lg font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}


