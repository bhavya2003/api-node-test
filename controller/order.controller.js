const orderService=require("../services/order.service.js");

const createOrder=async(req,res)=>{
    const user=req.user;
    try{
      let createdOrder= await orderService.createOrder(user,req.body);
      res.status(201).send(createdOrder);
    }
    catch(error){
      return res.status(500).send({error:error.message})

    }
} 

// const findOrderById=async(req,res)=>{
//   const user=req.user;
//   try{
//     let createdOrder= await orderService.findOrderById(req.params.id);
//     res.status(201).send(createdOrder);
//   }
//   catch(error){
//     return res.status(500).send({error:error.message})

//   }
// } 


const findOrderById = async (req, res) => {
  const user = req.user;
  const orderId = req.params.id; // Get the orderId from the URL parameter

  console.log("Request received to fetch order by ID:", orderId); // Log the received orderId

  try {
      let createdOrder = await orderService.findOrderById(orderId);
      
      if (!createdOrder) {
          console.log("Order not found in service.");
          return res.status(404).send({ error: "Order not found." });
      }

      res.status(200).send(createdOrder);
  } catch (error) {
      console.error("Error fetching order by ID:", error.message);
      return res.status(500).send({ error: error.message });
  }
};




const orderHistory=async(req,res)=>{
  const user=req.user;
  try{
    let createdOrder= await orderService.usersOrderHistory(user._id);
    res.status(201).send(createdOrder);
  }
  catch(error){
    return res.status(500).send({error:error.message})

  }
} 

module.exports={
  createOrder,
  findOrderById,
  orderHistory,
}