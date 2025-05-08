import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  username: { type: String, required: true },
  company: { type: String, required: true },
  registrationNumber: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)

export default User
