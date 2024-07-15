const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

let history = [];

router.post('/bmicalculator', (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);
  const age = parseInt(req.body.age);
  const gender = req.body.gender;
  const unit = req.body.unit;

  console.log('Height:', height, 'Weight:', weight, 'Age:', age, 'Gender:', gender, 'Unit:', unit);

  let heightInMeters = height;
  let weightInKg = weight;

  if (unit === 'imperial') {
    heightInMeters = height * 0.0254;
    weightInKg = weight * 0.453592;
  } else if (unit === 'metric'){
    heightInMeters = height / 100;
  }

  const bmi = weightInKg / (heightInMeters ** 2);
  let result = '';

  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (bmi < 24.9) {
    result = 'Normal weight';
  } else if (bmi < 29.9) {
    result = 'Overweight';
  } else {
    result = 'Obese';
  }
  history.push({ bmi: bmi.toFixed(2), result, timestamp: new Date() });
  res.send(`Your BMI is ${bmi.toFixed(2)}, which is considered ${result}.`);
});

router.get('/history', (req, res) => {
    res.json(history);
  });
  
module.exports = router;
