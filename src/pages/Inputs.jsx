import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Inputs() {
  const [formData, setFormData] = useState({
    egc: false,
    patRatio: '',
    highTech: false,
    age: '',
    year: '',
    nUnderwriters: '',
    sharesOfferedPerc: '',
    investmentReceived: '',
    amountOnProspectus: '',
    commonEquity: '',
    sp2weeksBefore: '',
    blueSky: false,
    managementFee: '',
    "commonEquity.1": '',
    bookValue: '',
    totalAssets: '',
    totalRevenue: '',
    netIncome: '',
    roa: '',
    leverage: '',
    vc: false,
    pe: '',
    prominence: '',
    nVCs: '',
    nExecutives: '',
    priorFinancing: false,
    reputationLeadMax: '',
    reputationAvg: '',
    nPatents: '',
    exchange_encoded: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/predict`, formData);
      setMessage(`✅ Prediction: ${res.data.result || 'Success'}`);
    } catch (err) {
      setMessage('❌ Error: ' + (err.response?.data?.message || 'Something went wrong.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white p-8 shadow-md border rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">IPO Data Submission Form</h2>

        {message && (
          <div className="text-center mb-4 text-sm font-medium text-blue-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Render each field */}
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block font-medium mb-1 capitalize">
                {key.replaceAll(/[_\.]/g, ' ').replace('encoded', '').trim()}
              </label>
              {typeof value === 'boolean' ? (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={key}
                    checked={value}
                    onChange={handleChange}
                    className="h-5 w-5"
                  />
                  <span>{value ? 'Yes' : 'No'}</span>
                </div>
              ) : key === 'exchange_encoded' ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Exchange</option>
                  <option value="0">NASDAQ</option>
                  <option value="1">NYSE</option>
                  <option value="2">Other</option>
                </select>
              ) : (
                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              )}
            </div>
          ))}

          <div className="sm:col-span-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? 'Submitting...' : 'Submit Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
