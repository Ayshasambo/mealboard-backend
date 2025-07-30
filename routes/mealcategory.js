const express = require('express')
const router = express.Router()
const Meal = require('../models/Mealcategory.js')

// POST a Meal
router.post('/', async (req, res) => {
    try {
      const {category} = req.body;
      const newMeal = new Meal({ 
        category
       });
      await newMeal.save();
      res.status(201).json(newMeal);
    }catch (error) {
       res.status(500).json({ message: 'Error posting Meal', error: error.message });
    }
});

// GET a meal
router.get('/:id', async (req, res) => {
    try {
      const getMeal = await Meal.findById(req.params.id);
      if (!getMeal) {
        return res.status(404).json({ message: 'Meal not found' });
      }
      res.status(200).json(getMeal);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Meal', error: error.message });
    }
});

//GET Meal
router.get('/', async (req, res) => {
    try{
       const getMeal = await Meal.find();
        res.json(getMeal)
    }
    catch(err){
      res.json({message:err});
    }
});

//DELETE meal
router.delete('/:id', async (req, res) => {
    try {
      const deleteMeal = await Meal.findByIdAndDelete(req.params.id);
      if (!deleteMeal) {
        return res.status(404).json({ message: 'meal not found' });
      }
      res.json({ message: 'meal deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router