// // // // const Category=require("../models/category.model.js");
// // // // const Product=require("../models/product.model.js");

// // // // async function createProduct(reqData) {
// // // //     console.log('Request Data:', reqData);


// // // //     let topLevel=await Category.findOne({name:reqData.topLevelCategory});

// // // //     if(!topLevel){
// // // //         topLevel = new Category({
// // // //             name:reqData.topLevelCategory,
// // // //             level:1
// // // //         })
// // // //         console.log('Top Level Category:', topLevel);
// // // //         console.log("Creating top-level category with name:", reqData.topLevelCategory);


// // // //         try {
// // // //             await topLevel.save();
// // // //         } catch (error) {
// // // //             console.error("Error saving topLevel:", error.message);
// // // //         }
    
// // // //     }

// // // //     let secondLevel=await Category.findOne({
// // // //         name:reqData.secondLevelCategory,
// // // //         parentCategory:topLevel._id,
// // // //     })

// // // //     if(!secondLevel){
// // // //         secondLevel=new Category({
// // // //             name:reqData.secondLevelCategory,
// // // //             parentCategory:topLevel._id,
// // // //             level:2
// // // //         }) 
// // // //         console.log('Second Level Category:', secondLevel);

// // // //         try {
// // // //             await secondLevel.save();
// // // //         } catch (error) {
// // // //             console.error("Error saving topLevel:", error.message);
// // // //         }
        
// // // //     }

// // // //     let thirdLevel=await Category.findOne({
// // // //         name:reqData.thirdLevelCategory,
// // // //         parentCategory:secondLevel._id,
// // // //     })

// // // //     if(!thirdLevel){
// // // //         thirdLevel=new Category({ 
// // // //         name:reqData.thirdLevelCategory,
// // // //         parentCategory:secondLevel._id,
// // // //         level:3
// // // //         })

// // // //         console.log('Third Level Category:', thirdLevel);

// // // //         try {
// // // //             await thirdLevel.save();
// // // //         } catch (error) {
// // // //             console.error("Error saving topLevel:", error.message);
// // // //         }

// // // //     }

// // // //     console.log(reqData.thirdLevelCategory,"thirdLevel category",thirdLevel);


// // // //     const product = new Product({
// // // //         title:reqData.title,
// // // //         color:reqData.color,
// // // //         description:reqData.description,
// // // //         discountedPrice:reqData.discountedPrice,
// // // //         discountedPercent:reqData.discountedPercent,
// // // //         imageUrl:reqData.imageUrl,
// // // //         brand:reqData.brand,
// // // //         price:reqData.price,
// // // //         size:reqData.size,
// // // //         quantity:reqData.quantity,
// // // //         category:thirdLevel._id,

// // // //     })

// // // //     const savedProduct= await product.save();
// // // //     console.log("savedProduct",savedProduct)

// // // //     const findProduct=await Product.findById(savedProduct._id).populate("category");
// // // //     return findProduct;

// // // // }

// // // // async function deleteProduct(productId) {
// // // //     const product=await findProductById(productId);

// // // //     await Product.findByIdAndDelete(productId);
// // // //     return "Product has been deleted"
    
// // // // }

// // // // async function updateProduct(productId,reqData) {
// // // //     const updateProduct=await Product.findByIdAndUpdate(productId,reqData);
// // // //     console.log("Updating Product ID:", productId);
// // // //     console.log("Request Data for Update:", reqData);

// // // //     if (reqData.sizes) {
// // // //         console.log("Updated Sizes:", reqData.sizes);
// // // //     }

// // // // }

// // // // async function findProductById(id) {
// // // //     const product =await Product.findById(id).populate("category").exec();
    
// // // //     if(!product){
// // // //         throw new Error("Product not found" + id);
// // // //     }
 
// // // //     return product;
// // // // }

// // // // async function getAllProducts(reqQuery) {

// // // //     let {category,color,sizes,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize}=reqQuery;    
    
// // // //     pageNumber = pageNumber || 1;
// // // //     pageSize=pageSize || 10;

// // // //     let query=Product.find().populate("category"); 

// // // //     if(category){
// // // //         console.log("exist category",category)
// // // //         const existCategory=await Category.findOne({name:category});

// // // //         console.log("exist category",existCategory)

// // // //         if(existCategory){
// // // //             query=query.where("category").equals(existCategory._id);            
// // // //         }
// // // //         else{
// // // //             return {content:[],currentPage:pageNumber,totalPages:0}
// // // //         }
// // // //     }

// // // //     if(color){
// // // //         const colorSet = new Set(color.split(",").map(color=>color.trim().toLowerCase()));

// // // //         const colorRegex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null;

// // // //         query=query.where("color").regex(colorRegex);
// // // //     }

// // // //     if(sizes){
// // // //         const sizeSet=new Set(sizes);
// // // //         query=query.where("size").in([...sizeSet]);

// // // //     }

// // // //     if(minPrice && maxPrice){
// // // //         query=await query.where('discountedPrice').gte(minPrice).lte(maxPrice);
// // // //     }
                                                                        
// // // //     if(minDiscount){
// // // //         query=await query.where("discountedPercent").gt(minDiscount);
// // // //     }

// // // //     if(stock){
// // // //         if(stock=="in_stock"){
// // // //             query=query.where("quantity").gt("0")
// // // //         }

// // // //         else if(stock=="out_of_stock"){
// // // //             query=query.where("quantity").lt("1");
// // // //         }
// // // //     }

// // // //     if(sort){
// // // //         const sortDirection=sort==="Price_high"?-1:1;
// // // //         query=query.sort({discountedPrice:sortDirection})
// // // //     }

// // // //     const totalProducts=await Product.countDocuments(query);

// // // //     const skip=(pageNumber-1)*pageSize;

// // // //     query=query.skip(skip).limit(pageSize);

// // // //     const products= await query.exec();

// // // //     const totalPages=Math.ceil(totalProducts/pageSize);

// // // //     return {content:products,currentPage:pageNumber,totalPages,}

// // // // }
// // // //     async function createMultipleProduct(products) {
// // // //         for(let product of products){
// // // //             await createProduct(product);
// // // //         }
        
// // // //     }

// // // //     module.exports={
// // // //         createProduct,
// // // //         deleteProduct,
// // // //         updateProduct,
// // // //         getAllProducts,
// // // //         findProductById,
// // // //         createMultipleProduct
// // // //     }

// // // const Category = require("../models/category.model.js");
// // // const Product = require("../models/product.model.js");

// // // async function createProduct(reqData) {
// // //     console.log('Request Data:', reqData);

// // //     // Check and create top-level category
// // //     let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
// // //     if (!topLevel) {
// // //         topLevel = new Category({
// // //             name: reqData.topLevelCategory,
// // //             level: 1
// // //         });
// // //         console.log("Creating top-level category:", reqData.topLevelCategory);
// // //         try {
// // //             await topLevel.save();
// // //         } catch (error) {
// // //             console.error("Error saving top-level category:", error.message);
// // //             throw new Error("Failed to create top-level category");
// // //         }
// // //     }

// // //     // Check and create second-level category
// // //     let secondLevel = await Category.findOne({
// // //         name: reqData.secondLevelCategory,
// // //         parentCategory: topLevel._id,
// // //     });
// // //     if (!secondLevel) {
// // //         secondLevel = new Category({
// // //             name: reqData.secondLevelCategory,
// // //             parentCategory: topLevel._id,
// // //             level: 2
// // //         });
// // //         console.log("Creating second-level category:", reqData.secondLevelCategory);
// // //         try {
// // //             await secondLevel.save();
// // //         } catch (error) {
// // //             console.error("Error saving second-level category:", error.message);
// // //             throw new Error("Failed to create second-level category");
// // //         }
// // //     }

// // //     // Check and create third-level category
// // //     let thirdLevel = await Category.findOne({
// // //         name: reqData.thirdLevelCategory,
// // //         parentCategory: secondLevel._id,
// // //     });
// // //     if (!thirdLevel) {
// // //         thirdLevel = new Category({
// // //             name: reqData.thirdLevelCategory,
// // //             parentCategory: secondLevel._id,
// // //             level: 3
// // //         });
// // //         console.log("Creating third-level category:", reqData.thirdLevelCategory);
// // //         try {
// // //             await thirdLevel.save();
// // //         } catch (error) {
// // //             console.error("Error saving third-level category:", error.message);
// // //             throw new Error("Failed to create third-level category");
// // //         }
// // //     }

// // //     console.log("Final third-level category:", thirdLevel);

// // //     // Create and save the product
// // //     const product = new Product({
// // //         title: reqData.title,
// // //         color: reqData.color,
// // //         description: reqData.description,
// // //         discountedPrice: reqData.discountedPrice,
// // //         discountedPercent: reqData.discountedPercent,
// // //         imageUrl: reqData.imageUrl,
// // //         brand: reqData.brand,
// // //         price: reqData.price,
// // //         size: reqData.size,
// // //         quantity: reqData.quantity,
// // //         category: thirdLevel._id, // Link product to the third-level category
// // //     });

// // //     try {
// // //         const savedProduct = await product.save();
// // //         console.log("Product saved successfully:", savedProduct);
        
// // //         // Populate category details in the saved product
// // //         const findProduct = await Product.findById(savedProduct._id).populate("category");
// // //         return findProduct;
// // //     } catch (error) {
// // //         console.error("Error saving product:", error.message);
// // //         throw new Error("Failed to create product");
// // //     }
// // // }

// // // async function deleteProduct(productId) {
// // //         const product=await findProductById(productId);
    
// // //         await Product.findByIdAndDelete(productId);
// // //         return "Product has been deleted"
        
// // //     }
    
// // //     async function updateProduct(productId,reqData) {
// // //         const updateProduct=await Product.findByIdAndUpdate(productId,reqData);
// // //         console.log("Updating Product ID:", productId);
// // //         console.log("Request Data for Update:", reqData);
    
// // //         if (reqData.sizes) {
// // //             console.log("Updated Sizes:", reqData.sizes);
// // //         }
    
// // //     }
    
// // //     async function findProductById(id) {
// // //         const product =await Product.findById(id).populate("category").exec();
        
// // //         if(!product){
// // //             throw new Error("Product not found" + id);
// // //         }
     
// // //         return product;
// // //     }
    
// // //     async function getAllProducts(reqQuery) {
    
// // //         let {category,color,sizes,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize}=reqQuery;    
        
// // //         pageNumber = pageNumber || 1;
// // //         pageSize=pageSize || 10;
    
// // //         let query=Product.find().populate("category"); 
    
// // //         if(category){
// // //             console.log("exist category",category)
// // //             const existCategory=await Category.findOne({name:category});
    
// // //             console.log("exist category",existCategory)
    
// // //             if(existCategory){
// // //                 query=query.where("category").equals(existCategory._id);            
// // //             }
// // //             else{
// // //                 return {content:[],currentPage:pageNumber,totalPages:0}
// // //             }
// // //         }
    
// // //         if(color){
// // //             const colorSet = new Set(color.split(",").map(color=>color.trim().toLowerCase()));
    
// // //             const colorRegex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null;
    
// // //             query=query.where("color").regex(colorRegex);
// // //         }
    
// // //         if(sizes){
// // //             const sizeSet=new Set(sizes);
// // //             query=query.where("size").in([...sizeSet]);
    
// // //         }
    
// // //         if(minPrice && maxPrice){
// // //             query=await query.where('discountedPrice').gte(minPrice).lte(maxPrice);
// // //         }
                                                                            
// // //         if(minDiscount){
// // //             query=await query.where("discountedPercent").gt(minDiscount);
// // //         }
    
// // //         if(stock){
// // //             if(stock=="in_stock"){
// // //                 query=query.where("quantity").gt("0")
// // //             }
    
// // //             else if(stock=="out_of_stock"){
// // //                 query=query.where("quantity").lt("1");
// // //             }
// // //         }
    
// // //         if(sort){
// // //             const sortDirection=sort==="Price_high"?-1:1;
// // //             query=query.sort({discountedPrice:sortDirection})
// // //         }
    
// // //         const totalProducts=await Product.countDocuments(query);
    
// // //         const skip=(pageNumber-1)*pageSize;
    
// // //         query=query.skip(skip).limit(pageSize);
    
// // //         const products= await query.exec();
    
// // //         const totalPages=Math.ceil(totalProducts/pageSize);
    
// // //         return {content:products,currentPage:pageNumber,totalPages,}
    
// // //     }
// // //         async function createMultipleProduct(products) {
// // //             for(let product of products){
// // //                 await createProduct(product);
// // //             }
            
// // //         }
    

// // // module.exports = {
// // //     createProduct,
// // //     deleteProduct, 
// // //     updateProduct,
// // //     getAllProducts,
// // //     findProductById,
// // //     createMultipleProduct
// // // };

// // // const Category = require("../models/category.model.js");
// // // const Product = require("../models/product.model.js");

// // // // Create Product
// // // async function createProduct(reqData) {
// // //     console.log('Request Data:', reqData);

// // //     // Check and create top-level category
// // //     let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
// // //     if (!topLevel) {
// // //         topLevel = new Category({
// // //             name: reqData.topLevelCategory,
// // //             level: 1
// // //         });
// // //         console.log("Creating top-level category:", reqData.topLevelCategory);
// // //         try {
// // //             await topLevel.save();
// // //         } catch (error) {
// // //             console.error("Error saving top-level category:", error.message);
// // //             throw new Error("Failed to create top-level category");
// // //         }
// // //     }

// // //     // Check and create second-level category
// // //     let secondLevel = await Category.findOne({
// // //         name: reqData.secondLevelCategory,
// // //         parentCategory: topLevel._id,
// // //     });
// // //     if (!secondLevel) {
// // //         secondLevel = new Category({
// // //             name: reqData.secondLevelCategory,
// // //             parentCategory: topLevel._id,
// // //             level: 2
// // //         });
// // //         console.log("Creating second-level category:", reqData.secondLevelCategory);
// // //         try {
// // //             await secondLevel.save();
// // //         } catch (error) {
// // //             console.error("Error saving second-level category:", error.message);
// // //             throw new Error("Failed to create second-level category");
// // //         }
// // //     }

// // //     // Check and create third-level category
// // //     let thirdLevel = await Category.findOne({
// // //         name: reqData.thirdLevelCategory,
// // //         parentCategory: secondLevel._id,
// // //     });
// // //     if (!thirdLevel) {
// // //         thirdLevel = new Category({
// // //             name: reqData.thirdLevelCategory,
// // //             parentCategory: secondLevel._id,
// // //             level: 3
// // //         });
// // //         console.log("Creating third-level category:", reqData.thirdLevelCategory);
// // //         try {
// // //             await thirdLevel.save();
// // //         } catch (error) {
// // //             console.error("Error saving third-level category:", error.message);
// // //             throw new Error("Failed to create third-level category");
// // //         }
// // //     }

// // //     console.log("Final third-level category:", thirdLevel);

// // //     // Create and save the product
// // //     const product = new Product({
// // //         title: reqData.title,
// // //         color: reqData.color,
// // //         description: reqData.description,
// // //         discountedPrice: reqData.discountedPrice,
// // //         discountedPercent: reqData.discountedPercent,
// // //         imageUrl: reqData.imageUrl,
// // //         brand: reqData.brand,
// // //         price: reqData.price,
// // //         size: reqData.size,
// // //         quantity: reqData.quantity,
// // //         category: thirdLevel._id, // Link product to the third-level category
// // //     });

// // //     try {
// // //         const savedProduct = await product.save();
// // //         console.log("Product saved successfully:", savedProduct);
        
// // //         // Populate category details in the saved product
// // //         const findProduct = await Product.findById(savedProduct._id).populate("category");
// // //         return findProduct;
// // //     } catch (error) {
// // //         console.error("Error saving product:", error.message);
// // //         throw new Error("Failed to create product");
// // //     }
// // // }

// // // // Delete Product
// // // async function deleteProduct(productId) {
// // //     const product = await findProductById(productId);
// // //     if (!product) throw new Error("Product not found");

// // //     await Product.findByIdAndDelete(productId);
// // //     return "Product has been deleted";
// // // }

// // // // Update Product
// // // async function updateProduct(productId, reqData) {
// // //     const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, { new: true });
// // //     if (!updatedProduct) throw new Error("Product not found");

// // //     console.log("Product updated successfully:", updatedProduct);
// // //     return updatedProduct;
// // // }

// // // // Find Product by ID
// // // async function findProductById(id) {
// // //     const product = await Product.findById(id).populate("category").exec();
// // //     if (!product) {
// // //         throw new Error("Product not found with ID " + id);
// // //     }
// // //     return product;
// // // }

// // // // Get All Products with Filtering, Sorting, and Pagination
// // // async function getAllProducts(reqQuery) {
// // //     let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

// // //     pageNumber = pageNumber || 1;
// // //     pageSize = pageSize || 10;

// // //     let query = Product.find().populate("category");

// // //     if (category) {
// // //         const existCategory = await Category.findOne({ name: category });
// // //         if (existCategory) {
// // //             query = query.where("category").equals(existCategory._id);
// // //         } else {
// // //             return { content: [], currentPage: pageNumber, totalPages: 0 };
// // //         }
// // //     }

// // //     if (color) {
// // //         const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
// // //         const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
// // //         query = query.where("color").regex(colorRegex);
// // //     }

// // //     if (sizes) {
// // //         const sizeSet = new Set(sizes.split(","));
// // //         query = query.where("size").in([...sizeSet]);
// // //     }

// // //     if (minPrice && maxPrice) {
// // //         query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
// // //     }

// // //     if (minDiscount) {
// // //         query = query.where("discountedPercent").gt(minDiscount);
// // //     }

// // //     if (stock) {
// // //         if (stock === "in_stock") {
// // //             query = query.where("quantity").gt(0);
// // //         } else if (stock === "out_of_stock") {
// // //             query = query.where("quantity").lt(1);
// // //         }
// // //     }

// // //     if (sort) {
// // //         const sortDirection = sort === "Price_high" ? -1 : 1;
// // //         query = query.sort({ discountedPrice: sortDirection });
// // //     }

// // //     const totalProducts = await Product.countDocuments(query);
// // //     const skip = (pageNumber - 1) * pageSize;
// // //     query = query.skip(skip).limit(pageSize);

// // //     const products = await query.exec();
// // //     const totalPages = Math.ceil(totalProducts / pageSize);

// // //     return { content: products, currentPage: pageNumber, totalPages };
// // // }

// // // // Create Multiple Products
// // // async function createMultipleProducts(products) {
// // //     for (let product of products) {
// // //         await createProduct(product);
// // //     }
// // // }

// // // module.exports = {
// // //     createProduct,
// // //     deleteProduct,
// // //     updateProduct,
// // //     findProductById,
// // //     getAllProducts,
// // //     createMultipleProducts
// // // };

// // const Category = require("../models/category.model.js");
// // const Product = require("../models/product.model.js");

// // // Create Product
// // async function createProduct(reqData) {
// //     console.log('Request Data:', reqData);

// //     // Check and create top-level category
// //     let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
// //     if (!topLevel) {
// //         topLevel = new Category({
// //             name: reqData.topLevelCategory,
// //             level: 1
// //         });
// //         console.log("Creating top-level category:", reqData.topLevelCategory);
// //         try {
// //             await topLevel.save();
// //         } catch (error) {
// //             console.error("Error saving top-level category:", error.message);
// //             throw new Error("Failed to create top-level category");
// //         }
// //     }

// //     // Check and create second-level category
// //     let secondLevel = await Category.findOne({
// //         name: reqData.secondLevelCategory,
// //         parentCategory: topLevel._id,
// //     });
// //     if (!secondLevel) {
// //         secondLevel = new Category({
// //             name: reqData.secondLevelCategory,
// //             parentCategory: topLevel._id,
// //             level: 2
// //         });
// //         console.log("Creating second-level category:", reqData.secondLevelCategory);
// //         try {
// //             await secondLevel.save();
// //         } catch (error) {
// //             console.error("Error saving second-level category:", error.message);
// //             throw new Error("Failed to create second-level category");
// //         }
// //     }

// //     // Check and create third-level category
// //     let thirdLevel = await Category.findOne({
// //         name: reqData.thirdLevelCategory,
// //         parentCategory: secondLevel._id,
// //     });
// //     if (!thirdLevel) {
// //         thirdLevel = new Category({
// //             name: reqData.thirdLevelCategory,
// //             parentCategory: secondLevel._id,
// //             level: 3
// //         });
// //         console.log("Creating third-level category:", reqData.thirdLevelCategory);
// //         try {
// //             await thirdLevel.save();
// //         } catch (error) {
// //             console.error("Error saving third-level category:", error.message);
// //             throw new Error("Failed to create third-level category");
// //         }
// //     }

// //     console.log("Final third-level category:", thirdLevel);

// //     // Create and save the product
// //     const product = new Product({
// //         title: reqData.title,
// //         color: reqData.color,
// //         description: reqData.description,
// //         discountedPrice: reqData.discountedPrice,
// //         discountedPercent: reqData.discountedPercent,
// //         imageUrl: reqData.imageUrl,
// //         price: reqData.price,
// //         quantity: reqData.quantity,
// //         sizes: reqData.sizes, // Assuming sizes is passed as an array
// //         category: thirdLevel._id, // Link product to the third-level category
// //     });

// //     try {
// //         const savedProduct = await product.save();
// //         console.log("Product saved successfully:", savedProduct);
        
// //         // Populate category details in the saved product
// //         const findProduct = await Product.findById(savedProduct._id).populate("category");
// //         return findProduct;
// //     } catch (error) {
// //         console.error("Error saving product:", error.message);
// //         throw new Error("Failed to create product");
// //     }
// // }

// // // Delete Product
// // async function deleteProduct(productId) {
// //     const product = await findProductById(productId);
// //     if (!product) throw new Error("Product not found");

// //     await Product.findByIdAndDelete(productId);
// //     return "Product has been deleted";
// // }

// // // Update Product
// // async function updateProduct(productId, reqData) {
// //     const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, { new: true });
// //     if (!updatedProduct) throw new Error("Product not found");

// //     console.log("Product updated successfully:", updatedProduct);
// //     return updatedProduct;
// // }

// // // Find Product by ID
// // async function findProductById(id) {
// //     const product = await Product.findById(id).populate("category").exec();
// //     if (!product) {
// //         throw new Error("Product not found with ID " + id);
// //     }
// //     return product;
// // }

// // // Get All Products with Filtering, Sorting, and Pagination
// // // async function getAllProducts(reqQuery) {
// // //     let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

// // //     pageNumber = pageNumber || 1;
// // //     pageSize = pageSize || 10;

// // //     let query = Product.find().populate("category");

// // //     if (category) {
// // //         const existCategory = await Category.findOne({ name: category });
// // //         if (existCategory) {
// // //             query = query.where("category").equals(existCategory._id);
// // //         } else {
// // //             return { content: [], currentPage: pageNumber, totalPages: 0 };
// // //         }
// // //     }

// // //     if (color) {
// // //         const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
// // //         const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
// // //         query = query.where("color").regex(colorRegex);
// // //     }

// // //     if (sizes) {
// // //         const sizeSet = new Set(sizes.split(","));
// // //         query = query.where("sizes").in([...sizeSet]); // Update field to "sizes"
// // //     }

// // //     if (minPrice && maxPrice) {
// // //         query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
// // //     }

// // //     if (minDiscount) {
// // //         query = query.where("discountedPercent").gt(minDiscount);
// // //     }

// // //     if (stock) {
// // //         if (stock === "in_stock") {
// // //             query = query.where("quantity").gt(0);
// // //         } else if (stock === "out_of_stock") {
// // //             query = query.where("quantity").lt(1);
// // //         }
// // //     }

// // //     if (sort) {
// // //         const sortDirection = sort === "Price_high" ? -1 : 1;
// // //         query = query.sort({ discountedPrice: sortDirection });
// // //     }

// // //     const totalProducts = await Product.countDocuments(query);
// // //     const skip = (pageNumber - 1) * pageSize;
// // //     query = query.skip(skip).limit(pageSize);

// // //     const products = await query.exec();
// // //     const totalPages = Math.ceil(totalProducts / pageSize);

// // //     return { content: products, currentPage: pageNumber, totalPages };
// // // }

// // async function getAllProducts(reqQuery) {
// //     let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

// //     pageNumber = parseInt(pageNumber) || 1; // Ensure these are integers
// //     pageSize = parseInt(pageSize) || 10;

// //     let query = Product.find().populate("category");

// //     // Category filtering
// //     if (category) {
// //         const existCategory = await Category.findOne({ name: category });
// //         if (existCategory) {
// //             query = query.where("category").equals(existCategory._id);
// //         } else {
// //             return { content: [], currentPage: pageNumber, totalPages: 0 };
// //         }
// //     }

// //     // Color filtering
// //     if (color) {
// //         const colorSet = new Set(color.split(",").map(c => c.trim().toLowerCase()));
// //         const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
// //         if (colorRegex) {
// //             query = query.where("color").regex(colorRegex);
// //         }
// //     }

// //     // Sizes filtering
// //     if (sizes) {
// //         const sizeSet = new Set(sizes.split(",").map(size => size.trim()));
// //         query = query.where("sizes").in([...sizeSet]); // Ensure the field name is correct
// //     }

// //     // Price filtering
// //     if (minPrice || maxPrice) {
// //         if (minPrice) query = query.where("discountedPrice").gte(parseFloat(minPrice));
// //         if (maxPrice) query = query.where("discountedPrice").lte(parseFloat(maxPrice));
// //     }

// //     // Discount filtering
// //     if (minDiscount) {
// //         query = query.where("discountedPercent").gt(parseFloat(minDiscount));
// //     }

// //     // Stock filtering
// //     if (stock) {
// //         if (stock === "in_stock") {
// //             query = query.where("quantity").gt(0);
// //         } else if (stock === "out_of_stock") {
// //             query = query.where("quantity").lt(1);
// //         }
// //     }

// //     // Sorting
// //     if (sort) {
// //         const sortDirection = sort === "Price_high" ? -1 : 1;
// //         query = query.sort({ discountedPrice: sortDirection });
// //     }

// //     // Count total products
// //     const totalProducts = await Product.countDocuments(query);
// //     const skip = (pageNumber - 1) * pageSize;
// //     query = query.skip(skip).limit(pageSize);

// //     const products = await query.exec();
// //     const totalPages = Math.ceil(totalProducts / pageSize);

// //     return { content: products, currentPage: pageNumber, totalPages };
// // }


// // // Create Multiple Products
// // async function createMultipleProducts(products) {
// //     for (let product of products) {
// //         await createProduct(product);
// //     }
// // }

// // module.exports = {
// //     createProduct,
// //     deleteProduct,
// //     updateProduct,
// //     findProductById,
// //     getAllProducts,
// //     createMultipleProducts
// // };


// const Category = require("../models/category.model.js");
// const Product = require("../models/product.model.js");

// // Create Product
// async function createProduct(reqData) {
//     console.log('Request Data:', reqData);

//     // Check and create top-level category
//     let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
//     if (!topLevel) {
//         topLevel = new Category({
//             name: reqData.topLevelCategory,
//             level: 1
//         });
//         console.log("Creating top-level category:", reqData.topLevelCategory);
//         try {
//             await topLevel.save();
//         } catch (error) {
//             console.error("Error saving top-level category:", error.message);
//             // Return structured error to the frontend
//             return { success: false, message: "Failed to create top-level category", error: error.message };
//         }
//     }

//     // Check and create second-level category
//     let secondLevel = await Category.findOne({
//         name: reqData.secondLevelCategory,
//         parentCategory: topLevel._id,
//     });
//     if (!secondLevel) {
//         secondLevel = new Category({
//             name: reqData.secondLevelCategory,
//             parentCategory: topLevel._id,
//             level: 2
//         });
//         console.log("Creating second-level category:", reqData.secondLevelCategory);
//         try {
//             await secondLevel.save();
//         } catch (error) {
//             console.error("Error saving second-level category:", error.message);
//             // Return structured error to the frontend
//             return { success: false, message: "Failed to create second-level category", error: error.message };
//         }
//     }

//     // Check and create third-level category
//     let thirdLevel = await Category.findOne({
//         name: reqData.thirdLevelCategory,
//         parentCategory: secondLevel._id,
//     });
//     if (!thirdLevel) {
//         thirdLevel = new Category({
//             name: reqData.thirdLevelCategory,
//             parentCategory: secondLevel._id,
//             level: 3
//         });
//         console.log("Creating third-level category:", reqData.thirdLevelCategory);
//         try {
//             await thirdLevel.save();
//         } catch (error) {
//             console.error("Error saving third-level category:", error.message);
//             // Return structured error to the frontend
//             return { success: false, message: "Failed to create third-level category", error: error.message };
//         }
//     }

//     console.log("Final third-level category:", thirdLevel);

//     // Create and save the product
//     const product = new Product({
//         title: reqData.title,
//         color: reqData.color,
//         description: reqData.description,
//         discountedPrice: reqData.discountedPrice,
//         discountedPercent: reqData.discountedPercent,
//         imageUrl: reqData.imageUrl,
//         price: reqData.price,
//         quantity: reqData.quantity,
//         sizes: reqData.sizes, // Assuming sizes is passed as an array
//         category: thirdLevel._id, // Link product to the third-level category
//     });

//     try {
//         const savedProduct = await product.save();
//         console.log("Product saved successfully:", savedProduct);
        
//         // Populate category details in the saved product
//         const findProduct = await Product.findById(savedProduct._id).populate("category");
        
//         // Return the saved product along with success status to frontend
//         return { success: true, product: findProduct };
//     } catch (error) {
//         console.error("Error saving product:", error.message);
//         // Return structured error to the frontend
//         return { success: false, message: "Failed to create product", error: error.message };
//     }
// }

// // Delete Product
// async function deleteProduct(productId) {
//     const product = await findProductById(productId);
//     if (!product) throw new Error("Product not found");

//     await Product.findByIdAndDelete(productId);
//     return "Product has been deleted";
// }

// // Update Product
// async function updateProduct(productId, reqData) {
//     const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, { new: true });
//     if (!updatedProduct) throw new Error("Product not found");

//     console.log("Product updated successfully:", updatedProduct);
//     return updatedProduct;
// }

// // Find Product by ID
// async function findProductById(id) {
//     const product = await Product.findById(id).populate("category").exec();
//     if (!product) {
//         throw new Error("Product not found with ID " + id);
//     }
//     return product;
// }

// // Get All Products with Filters
// // async function getAllProducts(reqQuery) {
// //     let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

// //     pageNumber = parseInt(pageNumber) || 1; // Ensure these are integers
// //     pageSize = parseInt(pageSize) || 10;

// //     let query = Product.find().populate("category");

// //     // Category filtering
// //     if (category) {
// //         const existCategory = await Category.findOne({ name: category });
// //         if (existCategory) {
// //             query = query.where("category").equals(existCategory._id);
// //         } else {
// //             return { content: [], currentPage: pageNumber, totalPages: 0 };
// //         }
// //     }

// //     // Color filtering
// //     if (color) {
// //         const colorSet = new Set(color.split(",").map(c => c.trim().toLowerCase()));
// //         const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
// //         if (colorRegex) {
// //             query = query.where("color").regex(colorRegex);
// //         }
// //     }

// //     // Sizes filtering
// //     if (sizes) {
// //         const sizeSet = new Set(sizes.split(",").map(size => size.trim()));
// //         query = query.where("sizes").in([...sizeSet]); // Ensure the field name is correct
// //     }

// //     // Price filtering
// //     if (minPrice || maxPrice) {
// //         if (minPrice) query = query.where("discountedPrice").gte(parseFloat(minPrice));
// //         if (maxPrice) query = query.where("discountedPrice").lte(parseFloat(maxPrice));
// //     }

// //     // Discount filtering
// //     if (minDiscount) {
// //         query = query.where("discountedPercent").gt(parseFloat(minDiscount));
// //     }

// //     // Stock filtering
// //     if (stock) {
// //         if (stock === "in_stock") {
// //             query = query.where("quantity").gt(0);
// //         } else if (stock === "out_of_stock") {
// //             query = query.where("quantity").lt(1);
// //         }
// //     }

// //     // Sorting
// //     if (sort) {
// //         const sortDirection = sort === "Price_high" ? -1 : 1;
// //         query = query.sort({ discountedPrice: sortDirection });
// //     }

// //     // Count total products
// //     const totalProducts = await Product.countDocuments(query);
// //     const skip = (pageNumber - 1) * pageSize;
// //     query = query.skip(skip).limit(pageSize);

// //     const products = await query.exec();
// //     const totalPages = Math.ceil(totalProducts / pageSize);

// //     return { content: products, currentPage: pageNumber, totalPages };
// // }

// async function getAllProducts(reqQuery) {
//     try {
//         let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

//         // Default values for pagination
//         pageNumber = parseInt(pageNumber) || 1;
//         pageSize = parseInt(pageSize) || 10;

//         // Base query for Product with category populated
//         let query = Product.find().populate({ path: "category", select: "name" });

//         // Category filtering
//         if (category && category.trim() !== "") {
//             const existCategory = await Category.findOne({ name: category });
//             if (existCategory) {
//                 query = query.where("category").equals(existCategory._id);
//             } else {
//                 return { content: [], currentPage: pageNumber, totalPages: 0 };
//             }
//         }

//         // Color filtering using regex for flexible matching
//         if (color && color.trim() !== "") {
//             const colorSet = new Set(color.split(",").map(c => c.trim().toLowerCase()));
//             const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
//             if (colorRegex) {
//                 query = query.where("color").regex(colorRegex);
//             }
//         }

//         // Size filtering
//         if (sizes && sizes.trim() !== "") {
//             const sizeSet = new Set(sizes.split(",").map(size => size.trim()));
//             query = query.where("sizes").in([...sizeSet]);
//         }

//         // Price filtering
//         if (minPrice || maxPrice) {
//             if (minPrice) query = query.where("discountedPrice").gte(parseFloat(minPrice));
//             if (maxPrice) query = query.where("discountedPrice").lte(parseFloat(maxPrice));
//         }

//         // Discount filtering
//         if (minDiscount) {
//             query = query.where("discountedPercent").gt(parseFloat(minDiscount));
//         }

//         // Stock filtering (in stock or out of stock)
//         if (stock && stock.trim() !== "") {
//             if (stock === "in_stock") {
//                 query = query.where("quantity").gt(0);
//             } else if (stock === "out_of_stock") {
//                 query = query.where("quantity").lt(1);
//             }
//         }

//         // Sorting
//         if (sort) {
//             const sortDirection = sort === "Price_high" ? -1 : 1;
//             query = query.sort({ discountedPrice: sortDirection });
//         } else {
//             // Default sort by newest products
//             query = query.sort({ createdAt: -1 });
//         }

//         // Count total products that match the query
//         const totalProducts = await Product.countDocuments(query);

//         // Pagination: skip and limit
//         const skip = (pageNumber - 1) * pageSize;
//         query = query.skip(skip).limit(pageSize);

//         // Execute the query to get products
//         const products = await query.exec();

//         // Calculate total pages
//         const totalPages = Math.ceil(totalProducts / pageSize);

//         // Return paginated result
//         return { content: products, currentPage: pageNumber, totalPages };

//     } catch (error) {
//         console.error("Error in getAllProducts:", error);
//         throw new Error("Failed to fetch products.");
//     }
// }




// // Create Multiple Products
// async function createMultipleProducts(products) {
//     for (let product of products) {
//         await createProduct(product);
//     }
// }

// module.exports = {
//     createProduct,
//     deleteProduct,
//     updateProduct,
//     findProductById,
//     getAllProducts,
//     createMultipleProducts
// };


const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");

// Create Product
async function createProduct(reqData) {
    console.log('Request Data:', reqData);

    // Check and create top-level category
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        });
        console.log("Creating top-level category:", reqData.topLevelCategory);
        try {
            await topLevel.save();
        } catch (error) {
            console.error("Error saving top-level category:", error.message);
            return { success: false, message: "Failed to create top-level category", error: error.message };
        }
    }

    // Check and create second-level category
    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    });
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        });
        console.log("Creating second-level category:", reqData.secondLevelCategory);
        try {
            await secondLevel.save();
        } catch (error) {
            console.error("Error saving second-level category:", error.message);
            return { success: false, message: "Failed to create second-level category", error: error.message };
        }
    }

    // Check and create third-level category
    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
    });
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        });
        console.log("Creating third-level category:", reqData.thirdLevelCategory);
        try {
            await thirdLevel.save();
        } catch (error) {
            console.error("Error saving third-level category:", error.message);
            return { success: false, message: "Failed to create third-level category", error: error.message };
        }
    }

    console.log("Final third-level category:", thirdLevel);

    // Create and save the product
    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountedPercent: reqData.discountedPercent,
        imageUrl: reqData.imageUrl,
        price: reqData.price,
        quantity: reqData.quantity,
        sizes: reqData.sizes, // Assuming sizes is passed as an array
        category: thirdLevel._id, // Link product to the third-level category
    });

    try {
        const savedProduct = await product.save();
        console.log("Product saved successfully:", savedProduct);
        
        // Populate category details in the saved product
        const findProduct = await Product.findById(savedProduct._id).populate("category");
        
        // Return the saved product along with success status to frontend
        return { success: true, product: findProduct };
    } catch (error) {
        console.error("Error saving product:", error.message);
        return { success: false, message: "Failed to create product", error: error.message };
    }
}

// Delete Product
async function deleteProduct(productId) {
    const product = await findProductById(productId);
    if (!product) throw new Error("Product not found");

    await Product.findByIdAndDelete(productId);
    return "Product has been deleted";
}

// Update Product
async function updateProduct(productId, reqData) {
    const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, { new: true });
    if (!updatedProduct) throw new Error("Product not found");

    console.log("Product updated successfully:", updatedProduct);
    return updatedProduct;
}

// Find Product by ID
// async function findProductById(id) {
//     const product = await Product.findById(id).populate("category").exec();
//     if (!product) {
//         throw new Error("Product not found with ID " + id);
//     }
//     return product;
// }

async function findProductById(id) {
    const product = await Product.findOne({ id: id }).populate('category').exec();
    if (!product) {
        throw new Error("Product not found with ID " + id);
    }
    return product;
}


// Get All Products with Filters
async function getAllProducts(reqQuery) {
    try {
        let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

        // Default values for pagination
        pageNumber = parseInt(pageNumber) || 1;
        pageSize = parseInt(pageSize) || 10;

        // Base query for Product with category populated
        let query = Product.find().populate({ path: "category", select: "name" });

        // Category filtering
        if (category && category.trim() !== "") {
            const existCategory = await Category.findOne({ name: category });
            if (existCategory) {
                query = query.where("category").equals(existCategory._id);
            } else {
                return { content: [], currentPage: pageNumber, totalPages: 0 };
            }
        }

        // Color filtering using regex for flexible matching
        if (color && color.trim() !== "") {
            const colorSet = new Set(color.split(",").map(c => c.trim().toLowerCase()));
            const colorRegex = colorSet.size > 0 ? Array.from(colorSet).map(c => new RegExp(c, 'i')) : [];
            query = query.where({ color: { $in: colorRegex } });
        }

        // Size filtering using regex for flexible matching
        if (sizes && sizes.trim() !== "") {
            const sizesSet = new Set(sizes.split(",").map(s => s.trim().toLowerCase()));
            const sizeRegex = sizesSet.size > 0 ? Array.from(sizesSet).map(s => new RegExp(s, 'i')) : [];
            query = query.where({ sizes: { $in: sizeRegex } });
        }

        // Price filtering
        if (minPrice) {
            query = query.where("price").gte(minPrice);
        }
        if (maxPrice) {
            query = query.where("price").lte(maxPrice);
        }

        // Discount filtering
        if (minDiscount) {
            query = query.where("discountedPercent").gte(minDiscount);
        }

        // Stock filtering
        if (stock) {
            query = query.where("quantity").gt(0);
        }

        // Sorting
        if (sort) {
            const sortOrder = sort === "asc" ? 1 : -1;
            query = query.sort({ price: sortOrder });
        }

        // Pagination
        const skip = (pageNumber - 1) * pageSize;
        const totalCount = await Product.countDocuments(query);
        const products = await query.skip(skip).limit(pageSize);

        return { content: products, currentPage: pageNumber, totalPages: Math.ceil(totalCount / pageSize) };
    } catch (error) {
        console.error("Error fetching products:", error.message);
        throw new Error("Error fetching products");
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts
};
