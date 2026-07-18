const Razorpay = require('razorpay');
const crypto = require('crypto');

const createOrder = async (req, res) => {
  try {
    // TEMP TEST PAYMENT: bypass Razorpay order creation when TEST_PAYMENT=true.
    if (process.env.TEST_PAYMENT === 'true') {
      const timestamp = Date.now();
      return res.json({
        id: `order_test_${timestamp}`,
        amount: req.body.amount * 100,
        currency: "INR",
        key: process.env.RAZORPAY_KEY_ID,
        testPayment: true,
        paymentId: `pay_test_${timestamp}`
      });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    // Razorpay accepts amount in paise
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };
    
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.json({ ...order, key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).send(error);
  }
};

const verifyPayment = async (req, res) => {
  try {
    // TEMP TEST PAYMENT: skip Razorpay signature verification when TEST_PAYMENT=true.
    if (process.env.TEST_PAYMENT === 'true') {
      return res.status(200).json({ message: "Payment verified successfully" });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createOrder, verifyPayment };
