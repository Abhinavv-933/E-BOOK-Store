const { placeAnOrder, getOrderByUser } = require('../../services/customer/orderService');

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderDescription, address } = req.body;
    
    const response = await placeAnOrder(userId, orderDescription, address);
    res.status(response.status).json({order : response.data});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchOrderByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await getOrderByUser(userId);
    res.status(response.status).json({orders : response.data});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { placeOrder, fetchOrderByUser };