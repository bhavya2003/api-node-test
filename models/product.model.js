// const  mongoose=require('mongoose');
// const { Schema } = mongoose;

// const productSchema =new Schema({ 
//     title:{
//       type:String,
//       required:true,
//     },
//     description:{
//         type:String,
//         required:true,
//     },
//     price:{
//         type:Number,
//         required:true,
//     },
//     discountedPrice:{
//         type:Number,
//     },
//     discountedPercent:{
//         type:Number,
//     },
//     quantity:{
//         type:Number,
//         required:true,
//     },
//     color:{
//         type:String
//     },
//     sizes:[{
//         name:{type:String},
//         quantity:{type:Number}
//     }],
//     imageUrl:{
//         type: String,
//     },
//     ratings:[{
//         type:String,
//         ref:'ratings',
//     }],
//     reviews:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'reviews',
//     }],
//     numRatings:{
//         type:Number,
//         default:0,
//     },
//     category:{
//         type: String,
//         enum: ['tops', 'bottomwear', 'casuals', 'formals', 'rings', 'bracelet', 'earrings', 'necklaces'], // Specify allowed categories
//         required: true,
//     },
// });

// productSchema.index({ category: 1 });
// productSchema.index({ price: 1 }); 
// productSchema.index({ name: "text" });



// const Product = mongoose.model('products', productSchema);
// module.exports= Product;


const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
  id: {
    type: Number, // Define your numeric ID field here
    required: true,
    unique: true, // Ensure it is unique
},
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountedPrice: {
    type: Number,
    min: 0,
  },
  discountedPercent: {
    type: Number,
    min: 0,
  },
  
  size: [sizeSchema],
  
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

productSchema.index({ category: 1 });
productSchema.index({ price: 1 }); 
productSchema.index({ name: "text" });


module.exports = mongoose.model('Product', productSchema);


