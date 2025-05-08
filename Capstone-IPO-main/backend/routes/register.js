import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password, username, company, registrationNumber } = req.body

    // Check if user already exists
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already registered' })

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create and save new user
    const newUser = new User({
      email,
      passwordHash,
      username,
      company,
      registrationNumber
    })

    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
