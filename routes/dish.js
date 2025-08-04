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
        mealcategory:populatedMealcategory._id,
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

// //GET Dish
// router.get('/', async (req, res) => {
//     try{
//        const getDish = await Dish.find().populate('mealcategory');
//         res.json(getDish)
//     }
//     catch(err){
//       res.json({message:err});
//     }
// });

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

// router.get('/', async (req, res) => {
//     try {
//       const dishes = await Dish.find()
//         .populate('mealcategory') // this is the likely cause of failure
//         .sort({ createdAt: -1 });
  
//       if (dishes.length === 0) {
//         return res.status(404).json({ message: 'No dishes found' });
//       }
  
//       res.json(dishes);
//     } catch (error) {
//       console.error('GET /api/dish failed:', error); // ✅ Add this line
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  

router.get('/', async (req, res) => {
    try {
      let query = {};
  
      if (req.query.mealCategory) {
        const category = await Mealcategory.findOne({ category: req.query.mealCategory });
        if (!category) {
          return res.status(404).json({ message: 'Meal category not found' });
        }
        query.mealcategory = category._id;
      }
  
      const dishes = await Dish.find(query)
        .populate('mealcategory')
        .sort({ createdAt: -1 });
  
      if (dishes.length === 0) {
        return res.status(404).json({ message: 'No matching dishes found' });
      }
  
      res.json(dishes);
    } catch (error) {
      console.error('Error fetching dishes:', error); // This will help you debug
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

// GET all beneficiaries
// router.get('/',  async (req, res) => {
//     try {
//       const query = {};
//       if (req.query.mealCategory) {
//         query['mealcategory.category'] = req.query.mealCategory;
//       }
//       const dish = await Dish.find(query).sort({ createdAt: -1 });
//       if (!dish) {
//         return res.status(404).json({ message: 'Dish not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

module.exports = router