const express = require('express');
const PaymentController=require('../controller/payment.controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Route to create a payment link
router.post('/:orderId',authenticate ,PaymentController.createPaymentLink);

// Route to update the payment status
router.get('/update/status', authenticate,PaymentController.updatePaymentStatus);

module.exports = router;
