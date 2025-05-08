import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

// Define the schema for IPO inputs
const inputSchema = new mongoose.Schema({
  egc: Boolean,
  patRatio: Number,
  highTech: Boolean,
  age: Number,
  year: Number,
  nUnderwriters: Number,
  sharesOfferedPerc: Number,
  investmentReceived: Number,
  amountOnProspectus: Number,
  commonEquity: Number,
  sp2weeksBefore: Number,
  blueSky: Boolean,
  managementFee: Number,
  commonEquity_1: Number,
  bookValue: Number,
  totalAssets: Number,
  totalRevenue: Number,
  netIncome: Number,
  roa: Number,
  leverage: Number,
  vc: Boolean,
  pe: Number,
  prominence: Number,
  nVCs: Number,
  nExecutives: Number,
  priorFinancing: Boolean,
  reputationLeadMax: Number,
  reputationAvg: Number,
  nPatents: Number,
  exchange_encoded: Number
})

const Input = mongoose.model('Input', inputSchema)

router.post('/inputs', async (req, res) => {
  try {
    const newInput = new Input(req.body)
    await newInput.save()
    res.status(201).json({ message: 'Inputs submitted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error saving input data' })
  }
})

export default router
