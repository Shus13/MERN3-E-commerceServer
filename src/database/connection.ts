import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";

const sequelize = new Sequelize(envConfig.connectionString as string);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

connectDB();

export default sequelize;