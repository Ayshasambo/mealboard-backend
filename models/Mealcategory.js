const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    
  category: {
      type: String
   },
},
{ timestamps: true }
)

module.exports = mongoose.model('Meal', mealSchema);