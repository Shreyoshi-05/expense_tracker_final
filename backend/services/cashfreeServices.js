// import { Cashfree, CFEnvironment } from "cashfree-pg";
import axios from "axios";

// const cashfree = new Cashfree(
//   CFEnvironment.SANDBOX,
//   "TEST430329ae80e0f32e41a393d78b923034",
//   "TESTaf195616268bd6202eeb3bf8dc458956e7192a85",
// );

export const createOrder = async (
  orderId,
  orderAmount,
  orderCurrency = "INR",
  customerID,
  CustomerPhone,
) => {
  try {
    const expiryDate = new Date(Date.now() + 60 + 60 + 1000);

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      {
        order_id: orderId.toString(),
        order_amount: orderAmount,
        order_currency: orderCurrency,
        customer_details: {
          customer_id: customerID,
          customer_phone: CustomerPhone,
        },
        order_meta: {
          return_url: "http://localhost:5173/pay/success",
        },
      },
      {
        headers:{
          "Content-Type": "application/json",
          "x-api-version": "2022-09-01",
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        }
      }
    );
    return response.data.payment_session_id;

  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};
