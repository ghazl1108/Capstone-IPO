import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

// Define prediction schema
const predictionSchema = new mongoose.Schema({
  inputData: Object, // store original input
  offerPrice: Number,
  day1Close: Number,
  riskScore: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
})

const Prediction = mongoose.model('Prediction', predictionSchema)

// POST /api/predict
router.post('/predict', async (req, res) => {
  const input = req.body

  // Mock AI logic (replace later)
  const result = {
    offerPrice: parseFloat((Math.random() * 40 + 10).toFixed(2)),
    day1Close: parseFloat((Math.random() * 50 + 20).toFixed(2)),
    riskScore: Math.floor(Math.random() * 50 + 30)
  }

  try {
    const prediction = new Prediction({
      inputData: input,
      offerPrice: result.offerPrice,
      day1Close: result.day1Close,
      riskScore: result.riskScore
    })

    await prediction.save()

    res.status(200).json(result)
  } catch (err) {
    console.error('Error saving prediction:', err)
    res.status(500).json({ message: 'Failed to save prediction' })
  }
})

export default router
