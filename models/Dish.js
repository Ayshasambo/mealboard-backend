const mongoose = require('mongoose');
const dishSchema = new mongoose.Schema({
  name: {
      type: String
   },
   mealcategory:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
   },
   description:{
    type:String
   }
},
{ timestamps: true }
)

module.exports = mongoose.model('Dish', dishSchema);