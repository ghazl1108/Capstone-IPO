import express from 'express';
import Form from '../models/Form.js';

const router = express.Router();

router.post('/form', async (req, res) => {
  try {
    const { userId, inputs } = req.body;

    const newForm = new Form({
      userId,
      inputs
    });

    await newForm.save();
    res.status(201).json({ message: 'Form submitted', formId: newForm._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
