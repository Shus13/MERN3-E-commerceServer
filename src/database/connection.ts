import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";
import User from "./models/userModel.js";

const sequelize = new Sequelize(envConfig.connectionString as string, {
  models : [User]
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

sequelize.sync({force : false}).then(()=>{
  console.log("Synced!!!")
})

connectDB();

export default sequelize;