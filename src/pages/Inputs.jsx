import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Inputs() {
  const navigate = useNavigate()

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
    commonEquity_1: '',
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
    exchange_encoded: ''
  })

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://ipo-backend.onrender.com/api/predict', formData)

      localStorage.setItem('prediction', JSON.stringify(res.data))
      navigate('/results')
    } catch (err) {
      console.error(err)
      alert('Failed to get prediction from AI model')
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">IPO Input Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Checkboxes */}
        {[
          'egc',
          'highTech',
          'blueSky',
          'vc',
          'priorFinancing'
        ].map((field) => (
          <label key={field} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={field}
              checked={formData[field]}
              onChange={handleChange}
            />
            <span>{field}</span>
          </label>
        ))}

        {/* Number inputs */}
        {[
          'patRatio', 'age', 'year', 'nUnderwriters', 'sharesOfferedPerc', 'investmentReceived',
          'amountOnProspectus', 'commonEquity', 'sp2weeksBefore', 'managementFee', 'commonEquity_1',
          'bookValue', 'totalAssets', 'totalRevenue', 'netIncome', 'roa', 'leverage', 'pe',
          'prominence', 'nVCs', 'nExecutives', 'reputationLeadMax', 'reputationAvg', 'nPatents'
        ].map((field) => (
          <input
            key={field}
            type="number"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder={field}
            required
          />
        ))}

        {/* Dropdown */}
        <label className="md:col-span-2">
          Exchange Encoded:
          <select
            name="exchange_encoded"
            value={formData.exchange_encoded}
            onChange={handleChange}
            className="w-full p-2 border mt-1 rounded"
            required
          >
            <option value="">Select exchange</option>
            <option value="0">NASDAQ</option>
            <option value="1">NYSE</option>
            <option value="2">AMEX</option>
          </select>
        </label>

        <button
          type="submit"
          className="mt-6 md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit for Prediction
        </button>
      </form>
    </div>
  )
}

export default Inputs
