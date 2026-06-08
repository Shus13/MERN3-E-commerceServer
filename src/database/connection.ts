import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";

const sequelize = new Sequelize(envConfig.connectionString as string, {
  models : [__dirname + '/models']
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
  console.log("Local change injected to db Successfullt")
})

connectDB();

export default sequelize;