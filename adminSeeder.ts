import { envConfig } from "./src/config/config.js";
import User from "./src/database/models/userModel.js";
import bcrypt from 'bcrypt'

const adminSeeder = async () => {
  const [data] = await User.findAll({
    where: {
      email: envConfig.adminEmail,
    },
  });
  if (!data) {
    await User.create({
      username: envConfig.adminUsername,
      password: bcrypt.hashSync(envConfig.adminPassword as string, 12),
      email: envConfig.adminEmail,
      role: "admin",
    });
    console.log("Admin seeded");
  } else {
    console.log("Admin already registered");
  }
};

export default adminSeeder;
