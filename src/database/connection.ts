import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";

const sequelize = new Sequelize(envConfig.connectionString as string, {
  models : [User, Product, Category]
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

sequelize.sync({force : false, alter : false}).then(()=>{
  console.log("Synced!!!")
})

Product.belongsTo(Category, {foreignKey:'categoryId'})
Category.hasOne(Product, {foreignKey:'categoryId'})

connectDB();

export default sequelize;