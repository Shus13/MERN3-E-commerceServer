import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";
import Order from "./models/orderModel.js";
import OrderDetails from "./models/orderDetails.js";
import Payment from "./models/paymentModel.js";
import Cart from "./models/cartModel.js";

const sequelize = new Sequelize(envConfig.connectionString as string, {
  models : [User, Product, Category, Order, OrderDetails, Payment, Cart]
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

sequelize.sync({force : false, alter : true}).then(()=>{
  console.log("Synced!!!")
})

Category.hasOne(Product, {foreignKey:'categoryId'})
Product.belongsTo(Category, {foreignKey:'categoryId'})

User.hasMany(Order, {foreignKey:'userId'})
Order.belongsTo(User, {foreignKey:'userId'})

Order.hasOne(Payment, {foreignKey : 'orderId'})
Payment.belongsTo(Order, {foreignKey : 'orderId'})

Order.hasOne(OrderDetails, {foreignKey: 'orderId'})
OrderDetails.belongsTo(Order, {foreignKey : 'orderId'})

Product.hasMany(OrderDetails, {foreignKey : 'productId'})
OrderDetails.belongsTo(Product, {foreignKey : 'productId'})

// cart -> user
Cart.belongsTo(User, {foreignKey : "userId"})
User.hasOne(Cart, {foreignKey : "userId"})

// cart -> product
Cart.belongsTo(Product, {foreignKey : "productId"})
Product.hasMany(Cart, {foreignKey : "productId"})

connectDB();

export default sequelize;