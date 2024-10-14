require('dotenv').config(); 
const Razorpay = require('razorpay');
const OrderService=require('../services/order.service')
 // Load environment variables

// Log to check if environment variables are loaded
// console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID); 
// console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);

// Controller functions
const createPaymentLink = async (req, res) => {
  try {
    // Fetch the order details from the database using order ID
    const { orderId } = req.params;
    console.log('createPaymentLink called with orderId:', orderId);
    const order = await OrderService.findOrderById(orderId);
    console.log('Order fetched:', order); 

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Initialize Razorpay client with credentials from .env
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // Create payment link request
    const paymentLinkRequest = {
      amount: order.totalPrice * 100, // Amount in paise (multiply by 100)
      currency: "INR",
      customer: {
        name: order.user.firstName,
        contact: order.user.mobile,
        email: order.user.email
      },
      notify: {
        sms: true,
        email: true
      },
      callback_url: `http://localhost:4200/payment-success?order_id=${order.id}`,
      callback_method: 'get'
    };

    // Create the payment link
    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

    // Extract payment link details
    const paymentLinkId = paymentLink.id;
    const paymentLinkUrl = paymentLink.short_url;

    // Log the payment link information
    console.log('Payment Link ID:', paymentLinkId);
    console.log('Payment Link URL:', paymentLinkUrl);

    // Send the response with payment link details
    res.status(201).json({
      payment_link_id: paymentLinkId,
      payment_link_url: paymentLinkUrl
    });
  } catch (error) {
    console.error('Error creating payment link:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.query;

    // Fetch the order details using the order ID
    const order = await OrderService.findOrderById(order_id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Initialize Razorpay client
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // Fetch the payment details from Razorpay
    const payment = await razorpay.payments.fetch(payment_id);

    // Check if payment is captured
    if (payment.status === 'captured') {
      order.orderStatus = 'PLACED';
      order.paymentDetails.paymentId = payment_id;
      order.paymentDetails.status = 'COMPLETED';

      // Save the updated order
      await order.save();

      // Log the success message
      console.log('Payment captured successfully:', payment_id);

      return res.status(200).json({ message: 'Your order has been placed successfully :)' });
    } else {
      return res.status(400).json({ message: 'Payment not captured' });
    }
  } catch (error) {
    console.error('Error updating payment status:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentStatus
};
