const express = require('express')
const router = express.Router()
const Dish = require('../models/Dish.js')
const Mealcategory = require('../models/Mealcategory')

// POST a Dish
router.post('/', async (req, res) => {
    try {
      const {name, mealcategory, description} = req.body;

      const populatedMealcategory = await Mealcategory.findById(mealcategory);

      if (!populatedMealcategory) {
        return res.status(404).json({ error: 'Meal category not found' });
      }
      const newDish = new Dish({ 
        name, 
        description, 
        mealcategory:{
            id: populatedMealcategory._id,
            category:populatedMealcategory.category
        },
       });
      await newDish.save();
      res.status(201).json(newDish);
    }catch (error) {
       res.status(500).json({ message: 'Error posting Dish', error: error.message });
    }
});

// GET a Dish
router.get('/:id', async (req, res) => {
    try {
      const getDish = await Dish.findById(req.params.id);
      if (!getDish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      res.status(200).json(getDish);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Dish', error: error.message });
    }
});

//GET Dish
router.get('/', async (req, res) => {
    try{
       const getDish = await Dish.find();
        res.json(getDish)
    }
    catch(err){
      res.json({message:err});
    }
});

//DELETE Dish
router.delete('/:id', async (req, res) => {
    try {
      const deleteDish = await Dish.findByIdAndDelete(req.params.id);
      if (!deleteDish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      res.json({ message: 'Dish deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// GET all beneficiaries
router.get('/',  async (req, res) => {
    try {
      const query = {};
  
      // Check if 'station' query parameter is provided
      if (req.query.stationName) {
        query['station.name'] = req.query.stationName;
      }
  
      if (req.query.stationType) {
        query['station.type'] = req.query.stationType;
      }
  
      if (req.query.individual) {
        query.individual = req.query.individual;
      }
  
      if (req.query.state) {
        query.state = req.query.state;
      }
  
      if (req.query.lga) {
        query.lga = req.query.lga;
      }
  
      if (req.query.month) {
        const startOfMonth = new Date(req.query.month);
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        
        query.createdAt = {
          $gte: startOfMonth,
          $lt: endOfMonth,
        };
      }
  
      const beneficiaries = await Beneficiary.find(query).sort({ createdAt: -1 });
  
      let men = 0;
      let women = 0;
      let children = 0;
  
      beneficiaries.forEach((beneficiary) => {
        if (beneficiary.individual === 'male') {
          men += 1;
        } else if (beneficiary.individual === 'female') {
          women += 1;
        } else {
          children += 1;
        }
      });
  
      const totalBeneficiaries = men + women + children;
  
      res.json({
        beneficiaries,
        men,
        women,
        children,
        totalBeneficiaries
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router