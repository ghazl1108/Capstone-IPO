import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    company: '',
    registrationNumber: '',
  })

  const navigate = useNavigate()

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      console.log('Form Data:', formData) // Later: send to backend
      navigate('/inputs')
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {step === 1 && (
        <>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
        </>
      )}

      {step === 2 && (
        <>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block mb-2">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
        </>
      )}

      {step === 3 && (
        <div className="text-center text-gray-600">
          <p>You're all set! Click submit to continue.</p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {step === 3 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  )
}

export default Register
