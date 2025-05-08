import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import registerRoute from './routes/register.js'
import inputRoute from './routes/inputs.js'
import resultRoute from './routes/results.js'
import predictRoute from './routes/predict.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err))

// Middleware
app.use(cors())
app.use('/api', registerRoute)
app.use(express.json())

// Routes
app.use('/api', registerRoute)
app.use('/api', inputRoute)
app.use('/api', resultRoute)
app.use('/api', predictRoute)

// Root route
app.get('/', (req, res) => {
  res.send('Capstone-IPO Backend is running!')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
