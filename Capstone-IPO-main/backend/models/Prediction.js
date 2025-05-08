import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
  result: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Prediction', predictionSchema);
