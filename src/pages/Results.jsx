import { useEffect, useState } from 'react'

function Results() {
  const [result, setResult] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('prediction')
    if (stored) {
      setResult(JSON.parse(stored))
    }
  }, [])

  if (!result) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>No prediction found. Please fill out the form first.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Prediction Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg font-medium text-gray-700">
        <div className="bg-blue-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500 mb-1">Predicted Offer Price</p>
          <p className="text-2xl font-bold text-green-600">${result.offerPrice}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500 mb-1">Day 1 Closing Price</p>
          <p className="text-2xl font-bold text-blue-600">${result.day1Close}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded shadow">
          <p className="text-sm text-gray-500 mb-1">Risk Score</p>
          <p className="text-2xl font-bold text-red-600">{result.riskScore}%</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        These predictions are generated based on your IPO input data.
      </p>
    </div>
  )
}

export default Results
