import dotenv from "dotenv";
import { User, sequelize } from "./models/index.js";

dotenv.config();

const createUsers = async () => {
  try {
    await sequelize.authenticate();

    // 🔹 Admin
    const adminExists = await User.findOne({
      where: { email: "admin@example.com" },
    });

    if (!adminExists) {
      await User.create({
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      });
      console.log("Admin user created");
    }

    // 🔹 Regular user
    const userExists = await User.findOne({
      where: { email: "user@example.com" },
    });

    if (!userExists) {
      await User.create({
        email: "user@example.com",
        password: "user123",
        role: "user",
      });
      console.log("Regular user created");
    }

  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    process.exit();
  }
};

createUsers();