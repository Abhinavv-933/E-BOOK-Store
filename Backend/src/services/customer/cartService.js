const Book = require('../../models/Book');
const Order = require('../../models/Order');
const User = require('../../models/user');       
const CartItem = require('../../models/Cartitem'); // ✅ added

const addBookToCart = async (userId, bookId) => {
  let activeOrder = await Order.findOne({ user: userId, orderStatus: 'PENDING' }).populate('cartItem');

  // ✅ Auto-create order if none exists
  if (!activeOrder) {
    activeOrder = await new Order({
      user: userId,
      orderStatus: 'PENDING',
      amount: 0,
      cartItem: []
    }).save();
  }

  // ✅ Fixed casing: cartItem (lowercase)
  if (activeOrder.cartItem.some(item => item.book.toString() === bookId))
    return { status: 409, data: 'Book already exists in cart' };

  const [book, user] = await Promise.all([
    Book.findById(bookId),
    User.findById(userId)  // ✅ User now imported
  ]);

  if (!book || !user) return { status: 404, data: 'Book or user not found' };

  const savedCartItem = await new CartItem({
    order: activeOrder,
    user,
    book,
    price: book.price,
    quantity: 1
  }).save();

  activeOrder.amount += book.price;
  activeOrder.cartItem.push(savedCartItem);
  await activeOrder.save();

  return { status: 201, data: 'Book added to cart successfully' };
};

const fetchCartByUser = async (userId) => {
  let activeOrder = await Order.findOne({ user: userId, orderStatus: 'PENDING' })
  .populate({
      path:'cartItem',
      populate: { path: 'book' }
  });

  // ✅ Auto-create order if none exists
  if (!activeOrder) {
    activeOrder = await new Order({
      user: userId,
      orderStatus: 'PENDING',
      amount: 0,
      cartItem: []
    }).save();
  }
  
  if(!activeOrder) return {status : 404,data: 'Active order not found'};

  return { status: 200, data: activeOrder };
};

module.exports = { addBookToCart, fetchCartByUser };