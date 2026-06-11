import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";

const sequelize = new Sequelize(envConfig.connectionString as string, {
  models : [User, Product]
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

connectDB();

export default sequelize;