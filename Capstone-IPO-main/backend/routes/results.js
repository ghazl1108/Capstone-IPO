import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

// Schema for AI predictions
const resultSchema = new mongoose.Schema({
  userId: String, // optional for now
  offerPrice: Number,
  day1Close: Number,
  riskScore: Number
})

const Result = mongoose.model('Result', resultSchema)

// Save prediction results
router.post('/results', async (req, res) => {
  try {
    const newResult = new Result(req.body)
    await newResult.save()
    res.status(201).json({ message: 'Result saved successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to save result' })
  }
})

// Get latest prediction (mock)
router.get('/results/latest', async (req, res) => {
  try {
    const latest = await Result.findOne().sort({ _id: -1 })
    res.json(latest)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch result' })
  }
})

export default router
