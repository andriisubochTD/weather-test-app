const express = require('express');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { Subscription } = require('../models');
const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const { email, city, frequency } = req.body;
  console.log('Request body:', req.body);

  if (!email || !city || !frequency || !['hourly', 'daily'].includes(frequency)) {
    console.log('Invalid input:', { email, city, frequency });
    return res.status(400).json({ error: 'Invalid input' });
  }

  const token = uuidv4();
  try {
    const existingSubscription = await Subscription.findOne({ where: { email } });
    console.log('Existing subscription:', existingSubscription);

    if (existingSubscription) {
      console.log('Email already subscribed:', email);
      return res.status(409).json({ error: 'Email already subscribed' });
    }

    const subscription = await Subscription.create({ email, city, frequency, token });
    console.log('New subscription created:', subscription.toJSON());

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirm your subscription',
      text: `Click here to confirm: http://localhost:3000/api/confirm/${token}`,
    }).catch(emailError => {
      console.error('Email sending failed:', emailError);
      throw emailError;
    });

    res.json({ message: 'Subscription successful. Confirmation email sent.' });
  } catch (error) {
    console.error('Subscription error:', error.name, error.message);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already subscribed' });
    }
    res.status(400).json({ error: 'Failed to subscribe: ' + error.message });
  }
});

router.get('/confirm/:token', async (req, res) => {
  const { token } = req.params;
  const subscription = await Subscription.findOne({ where: { token } });
  if (!subscription) return res.status(404).json({ error: 'Token not found' });
  subscription.confirmed = true;
  await subscription.save();
  res.json({ message: 'Subscription confirmed successfully' });
});

router.get('/unsubscribe/:token', async (req, res) => {
  const { token } = req.params;
  const subscription = await Subscription.findOne({ where: { token } });
  if (!subscription) return res.status(404).json({ error: 'Token not found' });
  await subscription.destroy();
  res.json({ message: 'Unsubscribed successfully' });
});

module.exports = router;
