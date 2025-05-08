import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import registerRoute from './routes/register.js'
import loginRoute from './routes/login.js'
import inputRoute from './routes/inputs.js'
import resultRoute from './routes/results.js'
import predictRoute from './routes/predict.js'
import { auth } from './middleware/authMiddleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err))

// Public routes
app.use('/api', registerRoute)
app.use('/api', loginRoute)

// Protected routes
app.use('/api', auth, inputRoute)
app.use('/api', auth, resultRoute)
app.use('/api', auth, predictRoute)

// Root route
app.get('/', (req, res) => {
  res.send('Capstone-IPO Backend is running!')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
