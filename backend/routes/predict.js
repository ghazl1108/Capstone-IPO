import express from 'express';
import Prediction from '../models/Prediction.js';

const router = express.Router();

router.post('/predict', async (req, res) => {
  try {
    const { userId, formId, result } = req.body;

    const newPrediction = new Prediction({
      userId,
      formId,
      result
    });

    await newPrediction.save();
    res.status(201).json({ message: 'Prediction saved', predictionId: newPrediction._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
