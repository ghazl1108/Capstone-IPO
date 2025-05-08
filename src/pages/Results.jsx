import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);

  // Get result from location state or simulate fetch
  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
      setLoading(false);
    } else {
      setResult('No result data received. Please resubmit the form.');
      setLoading(false);
    }
  }, [location]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border shadow-md rounded-xl p-8 w-full max-w-xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Prediction Result</h2>

        {loading ? (
          <p className="text-blue-600 text-lg">Loading...</p>
        ) : (
          <div>
            <p className="text-xl font-semibold text-green-700 mb-6">
              {result}
            </p>
            <button
              onClick={() => navigate('/inputs')}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Try Another Input
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
