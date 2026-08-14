import { createOrder } from "../services/cashfreeServices.js";

export const processPayment = async (req, res) => {
  // orderId,
  // orderAmount,
  // orderCurrency = "IND",
  // customerID,
  // CustomerPhone,
  const orderId = Date.now();
  const orderAmount = 2000;
  const orderCurrency = "INR";
  const customerID = "1";
  const CustomerPhone = "9876543210";

  try {
    const paymentSessionId = await createOrder(
      orderId,
      orderAmount,
      orderCurrency,
      customerID,
      CustomerPhone,
    );

    return res.json({
      success:true,
      paymentSessionId
    })
  } catch (error) {
    console.log(error.message);
    return res.json({
      success:false,
      message:error.message
    })
  }
};
